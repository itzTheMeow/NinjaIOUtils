import { AudioEffects, Button, EventDispatcher, SettingsPanel } from "lib";
import localForage from "localforage";
import { App, app, PIXI } from "typings";
import type { TexturePack } from "../../../shared";
import Mod from "../api/Mod";
import Ninja from "../api/Ninja";
import config from "../config";
import Scrollbar from "../ui/scrollbar";

export class TexturePackMod extends Mod {
  constructor() {
    super({
      id: "TexturePack",
      name: "Texture Packs",
      description: "Adds in the texture pack settings tab and allows packs to load.",
      author: "builtin",
      icon: "menu_icon_settings",
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
        data: { bypass?: boolean; data: [string | Request]; uuid: number; id: "loadImageBitmap" },
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
                    orig.includes("ninja.io") &&
                    orig.includes("combined") &&
                    orig.endsWith(".png")
                  )
                    data.data[0] = `${config.api}/packs/${texturePack}/combined.png?v=${Ninja.GameVersion}`;
                  if (
                    (pack.hasSeamless || isCustom) &&
                    orig.includes("ninja.io") &&
                    orig.includes("seamless") &&
                    orig.endsWith(".png")
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
    // retry panel inject if failed
    if (!app.menu?.settingsPanel) return setTimeout(() => this.init(), 500);
    function SettingsPanelNew(w: number, h: number) {
      const pan = new SettingsPanel(w, h);
      function newTab(
        title: string,
        name: string,
        x: number,
        tab: {
          new (): void;
          prototype: any;
        }
      ) {
        name = `${name}Tab`;
        pan[name] = new tab();
        pan[`${name}Button`] = new PIXI.Text(title, {
          fontSize: 18,
          lineHeight: 18,
          fill: config.Colors.yellow,
          strokeThickness: 3,
          lineJoin: "round",
        });
        pan[`${name}Button`].resolution = 1.5 * App.DevicePixelRatio;
        pan[`${name}Button`].anchor.x = pan[`${name}Button`].anchor.y = 0.5;
        pan[`${name}Button`].x = x + 56;
        pan[`${name}Button`].y = 28;
        pan.addChild(pan[`${name}Button`]);
        pan[`${name}ButtonBackground`] = new PIXI.Graphics();
        pan[`${name}ButtonBackground`].beginFill(16777215, 0.1);
        pan[`${name}ButtonBackground`].drawRoundedRect(0, 0, 112, 30, 2);
        pan[`${name}ButtonBackground`].endFill();
        pan[`${name}ButtonBackground`].x = x;
        pan[`${name}ButtonBackground`].y = 12;
        pan[`${name}ButtonBackground`].interactive = !0;
        pan[`${name}ButtonBackground`].on(
          "touchstart",
          pan.displayTab.bind(pan, SettingsPanel.Tabs.TEXTURES)
        );
        pan[`${name}ButtonBackground`].on(
          "mousedown",
          pan.displayTab.bind(pan, SettingsPanel.Tabs.TEXTURES)
        );
        pan[`${name}ButtonBackground`].on("mouseover", function () {
          pan[`${name}ButtonBackground`].tint = 11184810;
        });
        pan[`${name}ButtonBackground`].on("mouseout", function () {
          pan[`${name}ButtonBackground`].tint = 16777215;
        });
        pan.addChild(pan[`${name}ButtonBackground`]);
      }
      newTab("Texture Pack", "tex", 302, getTexTab());
      return pan;
    }
    //@ts-ignore
    SettingsPanel.Tabs.TEXTURES = "tex";
    const oldX = app.menu.settingsPanel.x,
      oldY = app.menu.settingsPanel.y;
    // remove the old settings panel and add our own
    app.menu.settingsPanel.destroy();
    app.menu.settingsPanel = SettingsPanelNew(660, 524);
    app.menu.settingsPanel.x = oldX;
    app.menu.settingsPanel.y = oldY;
    app.menu.resize();

    app.menu.settingsPanel.displayTab = function (name) {
      AudioEffects.ButtonClick.audio.play();
      Object.values(SettingsPanel.Tabs)
        .filter((t) => t !== name) // gets all the other tabs and "closes" them
        .forEach((i) => {
          const t = this[`${i}Tab`];
          if (t.parent) {
            if (t.onHide) t.onHide();
            this.removeChild(t);
          }
          this[`${i}TabButtonBackground`].alpha = 1;
        });

      const t = this[`${name}Tab`];
      this[`${name}TabButtonBackground`].alpha = 0;
      this.addChild(t);
      if (t.onShow) t.onShow();
      app.menu.settingsPanel.selectedTab = name;
      App.Layer.memberMenu.emit(<any>"open_tab", name);
    };
    Object.values(SettingsPanel.Tabs).forEach((d) => {
      // add our new mousedown listener and remove the old one (because we removed the old settings panel)
      const tab = app.menu.settingsPanel[`${d}TabButtonBackground`];
      tab.on("mousedown", app.menu.settingsPanel.displayTab.bind(app.menu.settingsPanel, d));
      tab._events.mousedown.shift();
    });
  }
}

function getTexTab() {
  const maxPacks = 6;

  const FileUploader = document.createElement("input");
  FileUploader.type = "file";
  FileUploader.accept = "application/zip";
  FileUploader.multiple = false;
  FileUploader.style.display = "none";
  document.body.appendChild(FileUploader);

  class TexTab extends (PIXI.Container as any) {
    constructor() {
      super();
      const tab = this;
      EventDispatcher.call(this);
      this.marginLeft = 40;
      this.marginTop = 52;
      this.off = this.marginTop + 6;

      /* ============= Title ============= */
      this.texTitle = new PIXI.Text("Texture Packs", {
        fontSize: 18,
        lineHeight: 18,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.texTitle.x = this.marginLeft - 5;
      this.texTitle.y = this.off;
      this.addChild(this.texTitle);

      this.texHint = new PIXI.Text("(make sure to click save)", {
        fontSize: 14,
        fill: config.Colors.white,
        strokeThickness: 2,
        lineJoin: "round",
      });
      this.texHint.x = this.texTitle.x + this.texTitle.width + 3;
      this.texHint.y = this.off + 2;
      this.addChild(this.texHint);
      this.off += 30;

      const customTitle = new PIXI.Text("Custom Pack (read docs for tutorial)", {
        fontSize: 16,
        fill: config.Colors.white,
        strokeThickness: 2,
        lineJoin: "round",
      });
      customTitle.x = this.marginLeft;
      customTitle.y = this.off;
      this.addChild(customTitle);
      this.off += 20;

      const customDesc = new PIXI.Text("Upload a zip file containing your textures.", {
        fontSize: 14,
        fill: config.Colors.yellow,
        strokeThickness: 2,
        lineJoin: "round",
      });
      customDesc.x = this.marginLeft;
      customDesc.y = this.off;
      this.addChild(customDesc);
      this.off += 24;

      const uploader = new Button("uploader");
      uploader.addListener(Button.BUTTON_RELEASED, async () => {
        if (await localForage.getItem("custom_pack")) {
          await localForage.removeItem("custom_pack");
          delete this.hasCust;
          this.runPacks();
        } else {
          FileUploader.click();
        }
      });
      uploader.x = this.marginLeft + 8;
      uploader.y = this.off;
      uploader.scale.x = uploader.scale.y = 0.75;
      this.addChild(uploader);
      this.off += 12;

      const off = this.off;
      this.packIndex = 0;
      !(this.runPacks = async () => {
        try {
          this.off = off;
          if (this.hadPacks) this.hadPacks.map((p) => p.destroy());
          this.hadPacks = [];
          const packs: TexturePack[] =
            this.packList ||
            (this.packList = (await fetch(`${config.api}/packs`).then((r) => r && r.json())) || []);
          const custom: File | true =
            this.hasCust || (this.hasCust = (await localForage.getItem("custom_pack")) || true);
          const packList = packs
            .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
            .slice(this.packIndex, this.packIndex + maxPacks);

          if (custom && custom !== true) {
            packList.unshift({
              id: config.customDelimiter,
              name: "Custom Pack",
              description: "Custom texture pack: " + custom.name,
              author: "You!",
              hasCombined: false,
              hasSeamless: false,
            });
            uploader.setText("Delete");
            uploader.setTint(config.Colors.red);
          } else {
            uploader.setText("Upload");
            uploader.setTint(config.Colors.grey);
          }

          packList.forEach((pak) => {
            const hasPack = Ninja.settings.get("texturePack") == pak.id;
            const packName = new PIXI.Text(
              `${pak.name || "Texture Pack"} (by ${pak.author || "Unnamed"})`,
              {
                fontSize: 16,
                fill: config.Colors.white,
                strokeThickness: 2,
                lineJoin: "round",
              }
            );
            packName.x = this.marginLeft;
            packName.y = this.off += 28;
            this.hadPacks.push(this.addChild(packName));
            const flags = [];
            if (pak.hasCombined) flags.push("textures");
            if (pak.hasSeamless) flags.push("terrain");
            const packDescription = new PIXI.Text(
              `${pak.description || "No Description."}${
                flags.length ? ` (${flags.join(", ")})` : ""
              }`,
              {
                fontSize: 14,
                fill: config.Colors.white,
                strokeThickness: 2,
                lineJoin: "round",
              }
            );
            packDescription.x = this.marginLeft;
            packDescription.y = this.off += packName.height + 2;
            this.hadPacks.push(this.addChild(packDescription));
            const packButton = new Button(`pack_btn_${pak.id}`);
            packButton.x = packName.x + packName.width + 12;
            packButton.y = this.off - packName.height;
            packButton.setText(hasPack ? "Remove" : "Use");
            packButton.setTint(hasPack ? config.Colors.red : config.Colors.green);
            packButton.scale.x = packButton.scale.y = 0.5;
            packButton.addListener(Button.BUTTON_RELEASED, async () => {
              Ninja.settings.set("texturePack", hasPack ? "" : pak.id);
              app.menu.settingsPanel.controlsTab.forceRefresh = true;
              this.runPacks();
            });
            this.hadPacks.push(this.addChild(packButton));
          });
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }
  TexTab.prototype.onShow = function () {
    if (!this.scroller) {
      const off = this.parent.texTabButton.height + 32;
      this.scroller = new (Scrollbar())(
        this.parent.height - off - 12 - this.parent.applyButton.height
      );
      this.scroller.x = this.parent.width - this.scroller.width * 1.75;
      this.scroller.y = off;
      this.scroller.on(Scrollbar().SCROLL, (prog: number) => {
        this.packIndex = Math.round((this.packList.length - maxPacks) * prog);
        this.runPacks();
      });
      this.addChild(this.scroller);
    }
    this.scroller.enableWheel();
    const tab = this;
    FileUploader.onchange = () => {
      [...FileUploader.files].forEach(async (f) => {
        if (f.type.startsWith("application/") && f.type.includes("zip")) {
          await localForage.setItem("custom_pack", f);
          delete tab.hasCust;
          tab.runPacks();
          app.menu.settingsPanel.controlsTab.forceRefresh = true;
        }
      });
    };
  };
  TexTab.prototype.onHide = function () {
    this.scroller.disableWheel();
  };
  return TexTab;
}
