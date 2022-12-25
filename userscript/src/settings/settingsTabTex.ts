import localForage from "localforage";
import { TexturePack } from "../../../shared";
import config from "../config";
import getScrollbar from "../Scrollbar";
import { saveSettings, SETTINGS } from "./settings";

export default function getTexTab() {
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
        fontName: "Arial",
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
        fontName: "Arial",
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
        fontName: "Arial",
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
        fontName: "Arial",
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
        this.off = off;
        if (this.hadPacks) this.hadPacks.map((p) => p.destroy());
        this.hadPacks = [];
        const packs: TexturePack[] =
          this.packList ||
          (this.packList = await fetch(`${config.api}/packs`).then((r) => r.json()));
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
          const hasPack = SETTINGS.texturePack == pak.id;
          const packName = new PIXI.Text(
            `${pak.name || "Texture Pack"} (by ${pak.author || "Unnamed"})`,
            {
              fontName: "Arial",
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
              fontName: "Arial",
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
            SETTINGS.texturePack = hasPack ? null : pak.id;
            app.menu.settingsPanel.controlsTab.forceRefresh = true;
            saveSettings();
            this.runPacks();
          });
          this.hadPacks.push(this.addChild(packButton));
        });
      })();
    }
  }
  TexTab.prototype.onShow = function () {
    if (!this.scroller) {
      const off = this.parent.texTabButton.height + 32;
      this.scroller = new (getScrollbar())(
        this.parent.height - off - 12 - this.parent.applyButton.height
      );
      this.scroller.x = this.parent.width - this.scroller.width * 1.75;
      this.scroller.y = off;
      this.scroller.on(getScrollbar().SCROLL, (prog: number) => {
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
