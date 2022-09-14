import config from "../config";
import { frameDisplay, showFPS } from "../fpsCounter";
import { fetchTexturePacks, getTextureImage, TexturePack } from "../GitHub";
import { savePackData, saveSettings, SETTINGS } from "./settings";

export default function getUtilTab() {
  class UtilTab extends (PIXI.Container as any) {
    constructor() {
      super();
      const tab = this;
      EventDispatcher.call(this);
      this.marginLeft = 40;
      this.marginTop = 52;
      this.off = this.marginTop + 6;

      /* ============= Title ============= */
      this.utilTitle = new PIXI.Text("NinjaIOUtils settings", {
        fontName: "Arial",
        fontSize: 18,
        lineHeight: 18,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.utilTitle.x = this.marginLeft - 5;
      this.utilTitle.y = this.off;
      this.addChild(this.utilTitle);

      /* ============= FPS Display ============= */
      this.showFPS = new Checkbox("showFPS", "Show FPS Display", true);
      this.showFPS.x = this.marginLeft;
      this.showFPS.y = this.off += 34;
      this.showFPS.on(Checkbox.CHANGE, function (b) {
        SETTINGS.showFPS = b;
        saveSettings();
        if (frameDisplay.style.display == "none" && SETTINGS.showFPS) showFPS();
      });
      this.addChild(this.showFPS);
      this.showFPS.setChecked(SETTINGS.showFPS);

      /* ============= Typewriter ============= */
      this.typewriter = new Checkbox("typewriter", "Enable Typing Noise", true);
      this.typewriter.x = this.marginLeft;
      this.typewriter.y = this.off += 34;
      this.typewriter.on(Checkbox.CHANGE, function (b) {
        SETTINGS.typewriter = b;
        saveSettings();
      });
      this.addChild(this.typewriter);
      this.typewriter.setChecked(SETTINGS.typewriter);

      /* ============= API Key ============= */
      this.keyTitle = new PIXI.Text("API Key", {
        fontName: "Arial",
        fontSize: 16,
        lineHeight: 18,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.keyTitle.x = this.marginLeft - 5;
      this.keyTitle.y = this.off += 36;
      this.addChild(this.keyTitle);

      this.keyHint = new PIXI.Text(
        "The API key for uploading to the stat tracker. See the github for instructions.",
        {
          fontName: "Arial",
          fontSize: 14,
          fill: config.Colors.white,
          strokeThickness: 2,
          lineJoin: "round",
        }
      );
      this.keyHint.x = this.marginLeft - 5;
      this.keyHint.y = this.off += 24;
      this.addChild(this.keyHint);

      this.keyField = new InputField("key_field", false, 24);
      this.keyField.setDimensions(370, 35);
      this.keyField.forceLowerCase = false;
      this.keyField.setMaxChars(128);
      if (SETTINGS.apiKey) this.keyField.setText(SETTINGS.apiKey);
      this.keyField.x = this.marginLeft;
      this.keyField.y = this.off += 24;
      this.keyField.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
      this.keyField.addListener(InputField.CHANGE, function (d) {
        d = d.data.value || "";
        SETTINGS.apiKey = d;
        saveSettings();
      });
      this.addChild(this.keyField);

      this.pasteKeyButton = new Button("paste_key");
      this.pasteKeyButton.selected = true;
      this.pasteKeyButton.setText("Paste");
      this.pasteKeyButton.scale.x = this.pasteKeyButton.scale.y = 0.75;
      this.pasteKeyButton.addListener(Button.BUTTON_RELEASED, function () {
        navigator.clipboard.readText().then(function (d) {
          tab.keyField.setText(d);
          SETTINGS.apiKey = d;
          saveSettings();
        });
      });
      this.pasteKeyButton.x = this.marginLeft + this.keyField.width + this.pasteKeyButton.width / 4;
      this.pasteKeyButton.y = this.off + 4;
      this.addChild(this.pasteKeyButton);

      this.clearKeyButton = new Button("clear_key");
      this.clearKeyButton.selected = true;
      this.clearKeyButton.setText("Clear");
      this.clearKeyButton.scale.x = this.clearKeyButton.scale.y = 0.75;
      this.clearKeyButton.addListener(Button.BUTTON_RELEASED, function () {
        tab.keyField.setText("");
        SETTINGS.apiKey = "";
        saveSettings();
      });
      this.clearKeyButton.x =
        this.marginLeft +
        this.keyField.width +
        this.pasteKeyButton.width +
        this.clearKeyButton.width / 4 +
        4;
      this.clearKeyButton.y = this.off + 4;
      this.addChild(this.clearKeyButton);
    }
  }
  return UtilTab;
}
