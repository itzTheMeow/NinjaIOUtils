import {
  App,
  AudioEffects,
  Button,
  ContentMenu,
  FontStyle,
  MemberBrowserScrollbar,
  PIXI,
  UITheme,
} from "lib";
import Mod from "../../api/Mod";
import Ninja from "../../api/Ninja";
import { fetchBlob, paintListRow } from "../../utils";
import { TexturePackModManifest } from "./manifest";
import { TexturePackModWorker } from "./worker";
import {
  textureAtlasFetchJSON,
  TextureAtlasType,
  TexturePackManifestEntry,
} from "./utils";
import { InstalledPack, TexturePackModStore } from "./store";
import { attemptAsync } from "es-toolkit";

declare module "lib" {
  interface ContentMenu {
    texButton: ContentMenuTab;
    texLabel: PIXI.Text;
    texContainer: PIXI.Container;
  }
}

const FileUploader = document.createElement("input");
FileUploader.type = "file";
FileUploader.accept = "application/zip";
FileUploader.multiple = false;
FileUploader.style.display = "none";
document.body.appendChild(FileUploader);

export class TexturePackMod extends Mod {
  constructor() {
    super({
      id: "TexturePack",
      name: "Texture Packs",
      description: "Adds a texture pack tab to the content menu.",
      author: "builtin",
      icon: "gears_icon",
      core: true,
    });
    this.loadon = "pagestart";
  }

  public worker = new TexturePackModWorker();
  public store = new TexturePackModStore(this);
  public manifest = new TexturePackModManifest(this);
  public texTab: ReturnType<typeof createTexTab> | null = null;

  public load() {
    // worker hook should be the very first thing
    this.hookWorkerGlobal();
    // also create our zip worker
    this.worker.init();

    super.load();
    Ninja.onready(() => this.init());
  }

  /** Hooks the `Worker` global. */
  private hookWorkerGlobal() {
    const mod = this;

    class WorkerNew extends Worker {
      _postMessage: typeof this.postMessage;
      constructor(url: string | URL, opts?: any) {
        super(url, opts);
        this._postMessage = this.postMessage;
        this.postMessage = this.newPostMessage;
      }
      // expected data, must be validated - example data:
      // {"data":["https://ninja.io/assets-dev/combined/combined.png"],"uuid":0,"id":"loadImageBitmap"}
      newPostMessage(
        data: {
          bypass?: boolean;
          data: [string | Request];
          uuid: number;
          id: "loadImageBitmap";
        },
        ...args: any
      ) {
        const originalURL = data?.data?.[0];
        if (
          !(window as any).SKIP_TEX_LOAD &&
          !data?.bypass &&
          data?.id == "loadImageBitmap" &&
          typeof originalURL == "string"
        ) {
          // figure out which atlas type this URL is
          const atlasType = Object.values(TextureAtlasType).find(
            (t) =>
              originalURL.includes(window.location.hostname) &&
              originalURL.includes(t) &&
              originalURL.includes(".png"),
          );
          if (atlasType) {
            mod.store
              .getAtlas(atlasType)
              .then((atlas) => {
                if (atlas) data.data[0] = URL.createObjectURL(atlas);
                this._postMessage(data, ...args);
              })
              .catch((err) => {
                console.error("texture pack injection failed", err);
                this._postMessage(data, ...args);
              });
            return;
          }
        }
        this._postMessage(data, ...args);
      }
    }
    window.Worker = Worker = WorkerNew;
    console.debug("hooked worker global!");
  }

  public init() {
    this.texTab = createTexTab(this);
    const menu = App.Layer.contentMenu;

    // create the new button for the texture pack tab
    menu.texContainer = this.texTab;
    menu.texContainer.visible = false;
    menu.texContainer.x = 33;
    menu.texContainer.y = 152;
    menu.container.addChild(menu.texContainer);

    menu.texButton = new PIXI.Graphics();
    menu.texButton.x = 556;
    menu.texButton.y = 100;
    menu.texButton.on("mouseover", () => {
      menu.texLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    menu.texButton.on("mouseout", () => {
      menu.texLabel.alpha = menu.display === ContentMenu.TEXTURES ? 1 : 0.5;
    });
    menu.texButton.on("mousedown", () => {
      menu.display = ContentMenu.TEXTURES;
      menu.mapsContainer.visible = false;
      menu.mapsContainer.hide();
      menu.weaponContainer.visible = false;
      menu.mapPublishContainer.visible = false;
      menu.publishMapButton.visible = false;
      menu.description.visible = false;
      menu.texContainer.visible = true;
      this.texTab.onShow();
      menu.updateTabStates();
      AudioEffects.ButtonClick.audio.play();
    });
    menu.container.addChild(menu.texButton);

    menu.texLabel = new PIXI.Text(
      "Texture Packs",
      FontStyle.SmallMenuTextOrange5,
    );
    menu.texLabel.hitArea = new PIXI.Rectangle();
    menu.texLabel.resolution = 2;
    menu.container.addChild(menu.texLabel);

    // reposition the tabs to fit 3 across
    const newWidth = 258;
    menu.weaponButton.x = 290;
    menu.mapsButton.menuTab.width = newWidth;
    menu.weaponButton.menuTab.width = newWidth;
    menu.updateTabStates = function () {
      UITheme.styleMenuTab(
        this.mapsButton,
        this.mapsLabel,
        newWidth,
        30,
        this.display === ContentMenu.MAPS,
      );
      UITheme.styleMenuTab(
        this.weaponButton,
        this.weaponLabel,
        newWidth,
        30,
        this.display === ContentMenu.WEAPONS,
      );
      UITheme.styleMenuTab(
        this.texButton,
        this.texLabel,
        newWidth,
        30,
        this.display === ContentMenu.TEXTURES,
      );
    };
    menu.updateTabStates();

    // need to hide our tab when other tabs activate
    menu.mapsButton.on("mousedown", () => {
      menu.texContainer.visible = false;
      this.texTab.onHide();
    });
    menu.weaponButton.on("mousedown", () => {
      menu.texContainer.visible = false;
      this.texTab.onHide();
    });
  }
}

const texTabViewID = ["installed", "marketplace"] as const;

// class has to be wrapped in a function so it doesnt crash the global scope
const createTexTab = (mod: TexturePackMod) =>
  new (class TexTab extends PIXI.Container {
    private scrollIndex = 0;
    private renderedItems: PIXI.ContainerChild[] = [];
    private title: PIXI.Text;
    private scroller = new MemberBrowserScrollbar(386);
    private uploadBtn = new Button("tex_uploader");
    private downloadBtn = new Button("tex_template");

    /** Amount of space to leave for the buttons at the top. */
    private readonly packsTop = 36;
    /** Amount of packs that can be displayed on one screen. */
    private get packsToDisplay() {
      return (
        (this.scroller.height - this.packsTop) /
        (this.rowHeight + this.rowPadding)
      );
    }

    private selectedTab: (typeof texTabViewID)[number] = "installed";
    private viewTabs: {
      background: PIXI.Graphics;
      label: PIXI.Text;
    }[] = [];

    constructor() {
      super();
      this.scroller.x = 757;
      this.scroller.y = 0;
      this.scroller.on(MemberBrowserScrollbar.SCROLL, (prog: number) => {
        this.scrollIndex = Math.max(
          0,
          Math.round(
            ((this.selectedTab == "installed"
              ? this._installed.length
              : this._manifest.length) -
              this.packsToDisplay) *
              prog,
          ),
        );
        this.rerender();
      });
      this.addChild(this.scroller);

      // title style copied from the maps content tab
      this.title = new PIXI.Text("Texture Packs", FontStyle.MediumOrangeText);
      this.title.tint = 16763904;
      this.title.resolution = 2;
      this.addChild(this.title);

      texTabViewID.forEach((id, i) => {
        const tab = new PIXI.Container();
        tab.x = 240 + i * 132;
        tab.y = 0;
        tab.interactive = true;
        tab.cursor = "pointer";

        const background = new PIXI.Graphics();
        tab.addChild(background);

        const label = new PIXI.Text(
          id == "installed" ? "Installed" : "Marketplace",
          FontStyle.SmallMenuTextOrange5,
        );
        label.x = 12;
        label.y = 6;
        label.resolution = 2;
        tab.addChild(label);
        tab.on("pointertap", () => {
          this.selectedTab = id;
          this.updateHeader();
          this.resetScroll();
          AudioEffects.ButtonClick.audio.play();
        });
        this.viewTabs.push({ background, label });
        this.addChild(tab);
      });

      this.downloadBtn.scale.set(0.75);
      this.downloadBtn.y = 0;
      this.downloadBtn.setText("Download");
      this.downloadBtn.setTint(UITheme.MenuColors.accent);
      this.downloadBtn.edge.stroke({ color: 0xffffff, width: 1.5 });
      this.downloadBtn.addListener(Button.BUTTON_RELEASED, async () => {
        this.downloadBtn.setText("Fetching...");
        this.updateHeader();

        try {
          // grab all the atlases and fetch their PNGs
          const atlases = await Promise.all(
            Object.values(TextureAtlasType).map(async (type) => {
              const { json, pngURL } = await textureAtlasFetchJSON(type),
                png = await fetchBlob(pngURL);
              return {
                type,
                json,
                png,
              };
            }),
          );

          this.downloadBtn.setText("Zipping...");
          const url = URL.createObjectURL(
            await mod.worker.baseTextureZip({ atlases }),
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = "textures.zip";
          a.click();
          // clear the zip from memory after a bit
          setTimeout(() => URL.revokeObjectURL(url), 10_000);

          this.downloadBtn.setText("Download");
          this.updateHeader();
        } catch (err) {
          console.error(err);
          this.downloadBtn.setText("Failed!");
          this.updateHeader();
        }
      });
      this.addChild(this.downloadBtn);

      this.uploadBtn.scale.set(0.75);
      this.uploadBtn.y = 0;
      this.uploadBtn.setText("New");
      this.uploadBtn.setTint(UITheme.MenuColors.success);
      this.uploadBtn.addListener(Button.BUTTON_RELEASED, () =>
        FileUploader.click(),
      );
      this.uploadBtn.edge.stroke({ color: 0xffffff, width: 1.5 });
      this.addChild(this.uploadBtn);

      this.updateHeader();
    }

    /** Resets the scrollbar to the top. */
    private resetScroll() {
      this.scroller.reset();
      this.scrollIndex = 0;
      this.rerender();
    }

    /** Reposition/restyle header elements after a change. */
    private updateHeader() {
      // re-style tabs
      this.viewTabs.forEach((tab, i) =>
        UITheme.styleMenuTab(
          tab.background,
          tab.label,
          124,
          24,
          texTabViewID[i] === this.selectedTab,
          true,
        ),
      );

      // reposition buttons
      this.uploadBtn.x = this.rowWidth - this.uploadBtn.width;
      this.downloadBtn.x = this.uploadBtn.x - 8 - this.downloadBtn.width;

      this.rerender();
    }

    private readonly rowWidth = 745;
    private readonly rowHeight = 50;
    private readonly rowPadding = 4;
    private _manifest: TexturePackManifestEntry[] = [];
    private _installed: InstalledPack[] = [];
    private installingManifestPacks = new Set<string>();
    public async rerender() {
      if (this.destroyed) return;
      try {
        const [_, manifest] = await attemptAsync(
          async () => (await mod.manifest.fetchManifest()).packs,
        );
        this._manifest = [...(manifest || [])];
        this._installed = await mod.store.getInstalled();

        const packRows = (
          this.selectedTab == "installed" ? this._installed : this._manifest
        )
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
          )
          .slice(this.scrollIndex, this.scrollIndex + this.packsToDisplay);

        this.title.text = mod.store.lock.isLocked
          ? "Texture Packs (updating...)"
          : "Texture Packs";

        let y = this.packsTop;
        this.renderedItems.forEach((p) => p.destroy());
        this.renderedItems = [];

        if (!packRows.length) {
          const failed = new PIXI.Text(
            this.selectedTab == "installed"
              ? "No installed packs."
              : "Failed to load texture packs.",
            {
              fontFamily: "Teko",
              fontSize: 16,
              fill: UITheme.MenuColors.textMuted,
            },
          );
          failed.y = y;
          this.addChild(failed);
          this.renderedItems.push(failed);
          return;
        }

        packRows.forEach((pak, i) => {
          const isInstalled = this._installed.some((p) => p.id == pak.id),
            isInstalling = this.installingManifestPacks.has(pak.id);
          const row = new PIXI.Graphics();
          const edgeColor = isInstalled
            ? UITheme.MenuColors.success
            : UITheme.MenuColors.accent;
          const paint = (hovered: boolean) =>
            paintListRow(
              row,
              this.rowWidth,
              this.rowHeight,
              this.scrollIndex + i,
              hovered,
              edgeColor,
            );
          paint(false);
          row.eventMode = "static";
          row.on("mouseover", () => {
            paint(true);
            AudioEffects.ButtonHover.audio.play();
          });
          row.on("mouseout", () => paint(false));
          row.y = y;
          y += this.rowHeight + this.rowPadding;

          const flags = [];
          if (pak.hasCombined) flags.push("textures");
          if (pak.hasSeamless) flags.push("terrain");
          const packName = new PIXI.Text(
            `${pak.name || "Texture Pack"} (by ${pak.author || "Unnamed"})`,
            {
              fontFamily: "Teko",
              fontSize: 18,
              fill: UITheme.MenuColors.text,
            },
          );
          packName.x = 12;
          packName.y = 6;
          row.addChild(packName);
          const packDescription = new PIXI.Text(
            `${pak.description || "No Description."}${
              flags.length ? ` (${flags.join(", ")})` : ""
            }`,
            {
              fontFamily: "Teko",
              fontSize: 16,
              fill: UITheme.MenuColors.textMuted,
            },
          );
          packDescription.x = packName.x;
          packDescription.y = packName.y + 20;
          row.addChild(packDescription);

          const manageBtn = new Button(`pack_btn_${pak.id}`);
          manageBtn.setText(
            isInstalling
              ? "Installing..."
              : isInstalled
                ? "Uninstall"
                : "Install",
          );
          manageBtn.setTint(
            isInstalling
              ? UITheme.MenuColors.accent
              : isInstalled
                ? UITheme.MenuColors.danger
                : UITheme.MenuColors.success,
          );
          manageBtn.edge.stroke({ color: 0xffffff, width: 1.5 });
          manageBtn.x = this.rowWidth - manageBtn.width - 8;
          manageBtn.y = this.rowHeight / 2 - manageBtn.height / 2;
          manageBtn.addListener(Button.BUTTON_RELEASED, async () => {
            if (!isInstalled) {
              // install the pack
              if (this.installingManifestPacks.has(pak.id)) return;
              this.installingManifestPacks.add(pak.id);
              this.rerender();
              mod.store
                .installPackFromManifest(pak)
                .catch(() => alert("Failed to install texture pack."))
                .finally(() => {
                  this.installingManifestPacks.delete(pak.id);
                  this.rerender();
                });
            } else {
              await mod.store.uninstallPack(pak.id);
            }
            this.rerender();
          });
          row.addChild(manageBtn);

          if (this.selectedTab == "installed") {
            /*
            const button = new Button("settings");
            button.scale.x = button.scale.y = 0.8;
            button.setText("  ");
            button.x = pl -= button.width + 8;
            button.y = pt;
            button.addListener(Button.BUTTON_RELEASED, () => {
              this.showConfig(mod);
            });
            const ico = new PIXI.Sprite(App.CombinedTextures.gears_icon);
            ico.width = button.width;
            ico.height = button.height;
            ico.x = button.width * -0.2;
            ico.y = button.height * 0.1;
            button.addChild(ico);
            // hover border in the standard button gray
            button.edge.stroke({
              color: UITheme.MenuColors.border,
              width: 1.5,
            });
            container.addChild(button);
            */
          }

          this.addChild(row);
          this.renderedItems.push(row);
        });
      } catch (err) {
        console.error(err);
      }
    }

    onShow() {
      this.scroller.enableWheel();
      FileUploader.onchange = () => {
        [...FileUploader.files].forEach(async (f) => {
          if (f.type.startsWith("application/") && f.type.includes("zip")) {
            try {
              //  this.custom = await setCustomPack(f);
            } catch (err) {
              console.error(err);
            }
            this.rerender();
          }
        });
      };
    }

    onHide() {
      this.scroller.disableWheel();
    }
  })();

/*
  {
    id: config.customDelimiter,
    name: "Custom Pack",
    description: "Custom texture pack: " + this.custom.name,
    author: "You!",
    hasCombined:
      !!files["_usepixel.png"] ||
      !!files["_useimg.png"] ||
      Object.keys(files).some((f) => f.startsWith("c_")),
    hasSeamless:
      !!files["_usepixel.png"] ||
      !!files["_useimg.png"] ||
      Object.keys(files).some((f) => f.startsWith("s_")),
    version: this.custom.hash,
    zip: "",
  }
  */
