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
import type { TexturePackManifestEntry } from "../../../../shared";
import Mod from "../../api/Mod";
import Ninja from "../../api/Ninja";
import config from "../../config";
import { paintListRow } from "../../utils";
import {
  CustomPack,
  ensureAtlasURL,
  getCustomPack,
  isAtlasURL,
  setCustomPack,
} from "./engine";
import { getManifest } from "./manifest";
import { TexturePackModWorker } from "./worker";
import { textureAtlasFetchJSON, TextureAtlasType } from "./utils";

declare module "lib" {
  interface ContentMenu {
    texButton: ContentMenuTab;
    texLabel: PIXI.Text;
    texContainer: PIXI.Container;
  }
}

const MAX_PACKS = 6;

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
  private texTab: ReturnType<typeof createTexTab> | null = null;

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
    const activePacks: string[] = Ninja.settings.get("texturePacks") || [];

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
        const orig = data?.data?.[0];
        if (
          activePacks.length &&
          !(window as any).SKIP_TEX_LOAD &&
          !data?.bypass &&
          data?.id == "loadImageBitmap" &&
          typeof orig == "string"
        ) {
          const kind = isAtlasURL(orig, "combined")
            ? "combined"
            : isAtlasURL(orig, "seamless")
              ? "seamless"
              : null;
          if (kind) {
            ensureAtlasURL(kind, activePacks)
              .then((url) => {
                data.data[0] = url;
                this._postMessage(data, ...args);
              })
              .catch((err) => {
                console.error("texture pack failed, using vanilla", err);
                this._postMessage(data, ...args);
              });
            return;
          }
        }
        this._postMessage(data, ...args);
      }
    }
    window.Worker = Worker = WorkerNew;
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
    packList: TexturePackManifestEntry[] = [];
    packIndex = 0;
    custom: CustomPack | null | undefined;
    hadPacks: PIXI.ContainerChild[] = [];
    scroller = new MemberBrowserScrollbar(386);
    uploadBtn = new Button("tex_uploader");
    downloadBtn = new Button("tex_template");
    /** Amount of space to leave for the buttons at the top. */
    packsTop = 36;
    rowWidth = 745;

    selectedTab: (typeof texTabViewID)[number] = "installed";
    viewTabs: {
      background: PIXI.Graphics;
      label: PIXI.Text;
    }[] = [];

    constructor() {
      super();
      this.scroller.x = 757;
      this.scroller.y = 0;
      this.scroller.on(MemberBrowserScrollbar.SCROLL, (prog: number) => {
        this.packIndex = Math.round((this.packList.length - MAX_PACKS) * prog);
        this.runPacks();
      });
      this.addChild(this.scroller);

      // title style copied from the maps content tab
      const title = new PIXI.Text("Texture Packs", FontStyle.MediumOrangeText);
      title.tint = 16763904;
      title.resolution = 2;
      this.addChild(title);

      const names = ["Installed", "Marketplace"] as const;
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
                png = await (await fetch(pngURL)).blob();
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
      this.runPacks();
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
    }

    async runPacks() {
      try {
        let y = this.packsTop;
        this.hadPacks.forEach((p) => p.destroy());
        this.hadPacks = [];
        if (!this.packList.length) {
          try {
            this.packList = (await getManifest()).packs;
          } catch (err) {
            console.error(err);
          }
        }
        this.custom =
          this.custom === null
            ? null
            : (this.custom ?? (await getCustomPack()));

        const active = Ninja.settings.get("texturePacks") || [];
        const packRows = [...this.packList]
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
          )
          .slice(this.packIndex, this.packIndex + MAX_PACKS);

        if (this.custom) {
          const files = this.custom.files;
          packRows.unshift({
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
          });
          this.uploadBtn.setText("Delete");
          this.uploadBtn.setTint(UITheme.MenuColors.danger);
        } else {
          this.uploadBtn.setTint(UITheme.MenuColors.success);
        }
        this.uploadBtn.edge.stroke({ color: 0xffffff, width: 1.5 });

        if (!packRows.length) {
          const failed = new PIXI.Text("Failed to load texture packs.", <any>{
            fontFamily: "Teko",
            fontSize: 16,
            fill: UITheme.MenuColors.textMuted,
          });
          failed.y = y;
          this.addChild(failed);
          this.hadPacks.push(failed);
          return;
        }

        packRows.forEach((pak, i) => {
          const hasPack = active[0] == pak.id;
          const row = new PIXI.Graphics();
          const edgeColor = hasPack
            ? UITheme.MenuColors.success
            : UITheme.MenuColors.accent;
          const paint = (hovered: boolean) =>
            paintListRow(
              row,
              this.rowWidth,
              44,
              this.packIndex + i,
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
          y += 46;

          const flags = [];
          if (pak.hasCombined) flags.push("textures");
          if (pak.hasSeamless) flags.push("terrain");
          const packName = new PIXI.Text(
            `${pak.name || "Texture Pack"} (by ${pak.author || "Unnamed"})`,
            <any>{
              fontFamily: "Teko",
              fontSize: 16,
              fill: UITheme.MenuColors.text,
            },
          );
          packName.x = 12;
          packName.y = 2;
          row.addChild(packName);
          const packDescription = new PIXI.Text(
            `${pak.description || "No Description."}${
              flags.length ? ` (${flags.join(", ")})` : ""
            }`,
            <any>{
              fontFamily: "Teko",
              fontSize: 14,
              fill: UITheme.MenuColors.textMuted,
            },
          );
          packDescription.x = 12;
          packDescription.y = 21;
          row.addChild(packDescription);

          const packButton = new Button(`pack_btn_${pak.id}`);
          packButton.setText(hasPack ? "Remove" : "Use");
          packButton.setTint(
            hasPack ? UITheme.MenuColors.danger : UITheme.MenuColors.success,
          );
          packButton.edge.stroke({ color: 0xffffff, width: 1.5 });
          packButton.scale.set(0.5);
          packButton.x = this.rowWidth - packButton.width - 10;
          packButton.y = 6;
          packButton.addListener(Button.BUTTON_RELEASED, async () => {
            // single-select for now - the engine already layers arrays
            Ninja.settings.set("texturePacks", hasPack ? [] : [pak.id]);
            this.runPacks();
          });
          row.addChild(packButton);

          this.addChild(row);
          this.hadPacks.push(row);
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
              this.custom = await setCustomPack(f);
            } catch (err) {
              console.error(err);
            }
            this.runPacks();
          }
        });
      };
    }

    onHide() {
      this.scroller.disableWheel();
    }
  })();
