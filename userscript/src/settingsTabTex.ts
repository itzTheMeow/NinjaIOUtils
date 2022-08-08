import config from "./config";
import { frameDisplay, showFPS } from "./fpsCounter";
import { fetchTexturePacks, getTextureImage, TexturePack } from "./GitHub";
import { savePackData, saveSettings, SETTINGS } from "./settings";

export default function getTexTab() {
  function TexTab() {
    const tab = this;
    PIXI.Container.call(this);
    EventDispatcher.call(this);
    this.marginLeft = 40;
    this.marginTop = 52;
    this.off = this.marginTop + 6;

    /* ============= Title ============= */
    this.texTitle = new PIXI.Text("Texture packs", {
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

    this.upButton = new Button("pak_up");
    this.upButton.setText("Up");
    this.upButton.scale.x = this.upButton.scale.y = 0.5;
    this.upButton.x = this.texHint.x + this.texHint.width + 10;
    this.upButton.y = this.off + 2;
    this.upButton.addListener(Button.BUTTON_RELEASED, () => {
      this.packIndex = Math.max(0, this.packIndex - 1);
      this.runPacks();
    });
    this.addChild(this.upButton);
    this.downButton = new Button("pak_down");
    this.downButton.setText("Down");
    this.downButton.scale.x = this.downButton.scale.y = 0.5;
    this.downButton.x = this.upButton.x + this.upButton.width + 2;
    this.downButton.y = this.off + 2;
    this.downButton.addListener(Button.BUTTON_RELEASED, () => {
      this.packIndex = Math.min(this.packList.length - 4, this.packIndex + 1);
      this.runPacks();
    });
    this.addChild(this.downButton);

    const off = this.off;
    this.packIndex = 0;
    !(this.runPacks = async () => {
      this.off = off;
      if (this.hadPacks) this.hadPacks.map((p) => p.destroy());
      this.hadPacks = [];
      const packs: TexturePack[] = this.packList || (this.packList = await fetchTexturePacks());
      packs
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .slice(this.packIndex, this.packIndex + 6)
        .forEach((pak) => {
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
          if (pak.textureURL) flags.push("textures");
          if (pak.terrainURL) flags.push("terrain");
          const packDescription = new PIXI.Text(
            `${pak.supportedVersion !== config.packVersion ? "OUTDATED PACK! " : ""}${
              pak.description || "No Description."
            } (${flags.join(", ")})`,
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
            if (hasPack) {
              SETTINGS.texturePack = null;
              savePackData("", "");
            } else {
              SETTINGS.texturePack = pak.id;
              savePackData(
                await getTextureImage(pak.textureURL),
                await getTextureImage(pak.terrainURL)
              );
            }
            app.menu.settingsPanel.controlsTab.forceRefresh = true;
            saveSettings();
            this.runPacks();
          });
          this.hadPacks.push(this.addChild(packButton));
        });
    })();
  }
  TexTab.prototype = Object.create(PIXI.Container.prototype);
  TexTab.prototype.constructor = TexTab;
  EventDispatcher.call(TexTab.prototype);
  return TexTab;
}
