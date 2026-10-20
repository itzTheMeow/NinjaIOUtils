import {
  AudioEffects,
  Button,
  ContentMenu,
  MemberBrowserScrollbar,
  UITheme,
} from "lib";
import localForage from "localforage";
import { App, FontStyle, PIXI } from "lib";
import type { TexturePack } from "../../../shared";
import Mod from "../api/Mod";
import Ninja from "../api/Ninja";
import config from "../config";
import { paintListRow } from "../utils";

ContentMenu.TEXTURES = "tex";
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

  public load() {
    const texturePack = Ninja.settings.get("texturePack");
    class WorkerNew extends Worker {
      _postMessage: typeof this.postMessage;
      constructor(url: string, opts: any) {
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
        if (texturePack && !(window as any).SKIP_TEX_LOAD && !data?.bypass) {
          try {
            fetch(`${config.api}/packs/${texturePack}`)
              .then((r) => r.json())
              .then(async (pack: TexturePack) => {
                if (
                  pack &&
                  data.id == "loadImageBitmap" &&
                  typeof data.data[0] == "string" &&
                  texturePack
                ) {
                  const orig = data.data[0];
                  const isCustom = texturePack == config.customDelimiter;
                  if (
                    (pack.hasCombined || isCustom) &&
                    (orig.includes("ninja.io") ||
                      orig.includes("ninjabattle.io")) &&
                    orig.includes("combined") &&
                    orig.includes(".png")
                  )
                    data.data[0] = `${config.api}/packs/${texturePack}/combined.png?v=${Ninja.GameVersion}`;
                  if (
                    (pack.hasSeamless || isCustom) &&
                    (orig.includes("ninja.io") ||
                      orig.includes("ninjabattle.io")) &&
                    orig.includes("seamless") &&
                    orig.includes(".png")
                  )
                    data.data[0] = `${config.api}/packs/${texturePack}/seamless.png?v=${Ninja.GameVersion}`;

                  if (data.data[0].startsWith(config.api) && isCustom) {
                    const zip: File = await localForage.getItem("custom_pack");
                    if (zip) {
                      const form = new FormData();
                      form.append("zip", zip);
                      const res = await fetch(data.data[0], {
                        method: "POST",
                        body: form,
                      }).then((r) => r.blob());
                      data.data[0] = URL.createObjectURL(res);
                    } else data.data[0] = orig;
                  }
                }
                this._postMessage(data, ...args);
              })
              .catch(() => {
                this._postMessage(data, ...args);
              });
          } catch (err) {
            console.error(err);
            this._postMessage(data, ...args);
          }
        } else this._postMessage(data, ...args);
      }
    }
    window.Worker = Worker = WorkerNew;

    Ninja.onready(() => this.init());
    super.load();
  }

  public init() {
    const content = App.Layer.contentMenu;

    // third tab next to maps/weapons - the pair shrinks to 258 wide to fit
    const texTab = new TexTab();
    content.texContainer = texTab;
    content.texContainer.visible = false;
    content.texContainer.x = 33;
    content.texContainer.y = 152;
    content.container.addChild(content.texContainer);

    content.texButton = new PIXI.Graphics();
    content.texButton.x = 556;
    content.texButton.y = 100;
    content.texButton.on("mouseover", () => {
      content.texLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    content.texButton.on("mouseout", () => {
      content.texLabel.alpha =
        content.display === ContentMenu.TEXTURES ? 1 : 0.5;
    });
    content.texButton.on("mousedown", () => {
      content.display = ContentMenu.TEXTURES;
      content.mapsContainer.visible = false;
      content.mapsContainer.hide();
      content.weaponContainer.visible = false;
      content.mapPublishContainer.visible = false;
      content.publishMapButton.visible = false;
      content.description.visible = false;
      content.texContainer.visible = true;
      texTab.onShow();
      content.updateTabStates();
      AudioEffects.ButtonClick.audio.play();
    });
    content.container.addChild(content.texButton);

    content.texLabel = new PIXI.Text(
      "Texture Packs",
      FontStyle.SmallMenuTextOrange5,
    );
    content.texLabel.hitArea = new PIXI.Rectangle();
    content.texLabel.resolution = 2;
    content.container.addChild(content.texLabel);

    // reposition the tabs to fit 3
    content.weaponButton.x = 290;
    content.mapsButton.menuTab.width = 258;
    content.weaponButton.menuTab.width = 258;
    content.updateTabStates = function () {
      UITheme.styleMenuTab(
        this.mapsButton,
        this.mapsLabel,
        258,
        30,
        this.display === ContentMenu.MAPS,
      );
      UITheme.styleMenuTab(
        this.weaponButton,
        this.weaponLabel,
        258,
        30,
        this.display === ContentMenu.WEAPONS,
      );
      UITheme.styleMenuTab(
        this.texButton,
        this.texLabel,
        258,
        30,
        this.display === ContentMenu.TEXTURES,
      );
    };
    content.updateTabStates();

    // need to hide the tab when other tabs activate
    content.mapsButton.on("mousedown", () => {
      content.texContainer.visible = false;
      texTab.onHide();
    });
    content.weaponButton.on("mousedown", () => {
      content.texContainer.visible = false;
      texTab.onHide();
    });
  }
}

class TexTab extends PIXI.Container {
  packList: TexturePack[] = [];
  packIndex = 0;
  hasCust: File | true | null = null;
  hadPacks: PIXI.ContainerChild[] = [];
  scroller = new MemberBrowserScrollbar(386);
  uploader = new Button("uploader");
  offset = 0;
  packsTop = 0;
  rowWidth = 745;

  constructor() {
    super();
    this.scroller.x = 757;
    this.scroller.y = 0;
    this.scroller.on(MemberBrowserScrollbar.SCROLL, (prog: number) => {
      this.packIndex = Math.round((this.packList.length - MAX_PACKS) * prog);
      this.runPacks();
    });
    this.addChild(this.scroller);

    const title = new PIXI.Text("Texture Packs", <any>{
      fontFamily: "Teko",
      fontSize: 22,
      fontWeight: "500",
      fill: UITheme.MenuColors.accent,
      letterSpacing: 0.5,
    });
    title.y = this.offset;
    this.addChild(title);
    this.offset += 28;

    const customTitle = new PIXI.Text("Custom pack (read docs for tutorial)", <
      any
    >{
      fontFamily: "Teko",
      fontSize: 16,
      fill: UITheme.MenuColors.text,
    });
    customTitle.y = this.offset;
    this.addChild(customTitle);
    this.offset += 20;

    const customDesc = new PIXI.Text(
      "Upload a zip file containing your textures.",
      <any>{
        fontFamily: "Teko",
        fontSize: 14,
        fill: UITheme.MenuColors.textMuted,
      },
    );
    customDesc.y = this.offset;
    this.addChild(customDesc);
    this.offset += 22;

    this.uploader.scale.set(0.75);
    this.uploader.x = 8;
    this.uploader.y = this.offset;
    this.uploader.addListener(Button.BUTTON_RELEASED, async () => {
      if (await localForage.getItem("custom_pack")) {
        await localForage.removeItem("custom_pack");
        this.hasCust = null;
        this.runPacks();
      } else {
        FileUploader.click();
      }
    });
    // hover border - white picks up the button tint
    this.uploader.edge.stroke({ color: 0xffffff, width: 1.5 });
    this.addChild(this.uploader);
    this.offset += 32;
    this.packsTop = this.offset;

    this.runPacks();
  }

  runPacks = async () => {
    try {
      let y = this.packsTop;
      this.hadPacks.forEach((p) => p.destroy());
      this.hadPacks = [];
      const packs: TexturePack[] =
        this.packList.length > 0
          ? this.packList
          : (this.packList =
              (await fetch(`${config.api}/packs`).then((r) => r && r.json())) ||
              []);
      const custom: File | true | null =
        this.hasCust ||
        (this.hasCust = (await localForage.getItem("custom_pack")) || true);
      const packRows = [...packs]
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .slice(this.packIndex, this.packIndex + MAX_PACKS);

      if (custom && custom !== true) {
        packRows.unshift({
          id: config.customDelimiter,
          name: "Custom Pack",
          description: "Custom texture pack: " + custom.name,
          author: "You!",
          hasCombined: false,
          hasSeamless: false,
        });
        this.uploader.setText("Delete");
        this.uploader.setTint(UITheme.MenuColors.danger);
      } else {
        this.uploader.setText("Upload");
        this.uploader.setTint(UITheme.MenuColors.border);
      }
      this.uploader.edge.stroke({ color: 0xffffff, width: 1.5 });

      packRows.forEach((pak, i) => {
        const hasPack = Ninja.settings.get("texturePack") == pak.id;
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
          Ninja.settings.set("texturePack", hasPack ? "" : pak.id);
          this.runPacks();
        });
        row.addChild(packButton);

        this.addChild(row);
        this.hadPacks.push(row);
      });
    } catch (err) {
      console.error(err);
    }
  };

  onShow() {
    this.scroller.enableWheel();
    FileUploader.onchange = () => {
      [...FileUploader.files].forEach(async (f) => {
        if (f.type.startsWith("application/") && f.type.includes("zip")) {
          await localForage.setItem("custom_pack", f);
          this.hasCust = null;
          this.runPacks();
        }
      });
    };
  }

  onHide() {
    this.scroller.disableWheel();
  }
}
