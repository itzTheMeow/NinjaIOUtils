import config from "../userscript/src/config";
import { registeredHotkeyMessages } from "./src/hotkeyMessages";
import { saveSettings, SETTINGS } from "./src/settings/settings";

export default function getHotkeyMsgsTab() {
  class HotkeyMessagesTab extends (PIXI.Container as any) {
    constructor() {
      super();
      const tab = this;
      EventDispatcher.call(this);
      this.marginLeft = 40;
      this.marginTop = 52;
      this.off = this.marginTop + 6;

      /* ============= Title ============= */
      this.hkmTitle = new PIXI.Text("Hotkey Messages", {
        fontName: "Arial",
        fontSize: 18,
        lineHeight: 18,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.hkmTitle.x = this.marginLeft - 5;
      this.hkmTitle.y = this.off;
      this.addChild(this.hkmTitle);

      this.hkmHint = new PIXI.Text("(Use fullscreen to avoid conflics with browser hotkeys)", {
        fontName: "Arial",
        fontSize: 14,
        fill: config.Colors.white,
        strokeThickness: 2,
        lineJoin: "round",
      });
      this.hkmHint.x = this.hkmTitle.x + this.hkmTitle.width + 3;
      this.hkmHint.y = this.off + 2;
      this.addChild(this.hkmHint);

      /* ============= Enable HKM ============= */
      this.enableHKM = new Checkbox("enableHKM", "Enable Hotkey Messages", true);
      this.enableHKM.x = this.marginLeft;
      this.enableHKM.y = this.off += 34;
      this.enableHKM.on(Checkbox.CHANGE, function (b) {
        SETTINGS.enableHotkeyMessages = b;
        saveSettings();
      });
      this.addChild(this.enableHKM);
      this.enableHKM.setChecked(SETTINGS.enableHotkeyMessages);

      const doHotkey = (key: string) => {
        const keyLabel = new PIXI.Text(`ALT + ${key.toUpperCase()}`, {
          fontName: "Arial",
          fontSize: 16,
          fill: config.Colors.yellow,
          strokeThickness: 3,
          lineJoin: "round",
        });
        keyLabel.x = this.marginLeft;
        keyLabel.y = this.off += 55;
        this.addChild(keyLabel);

        const keyText = new InputField(`${key}_hotkey`, false, 24);
        keyText.setDimensions(370, 35);
        keyText.forceLowerCase = false;
        keyText.setMaxChars(40);
        if (registeredHotkeyMessages.get(key)) keyText.setText(registeredHotkeyMessages.get(key));
        keyText.x = 125; // used to use width but was uneven then
        keyText.y = this.off - 6;
        keyText.setFilter(
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/."
        );
        keyText.addListener(InputField.CHANGE, function (d) {
          const message = d.data.value || "";
          registeredHotkeyMessages.set(key, message);
          SETTINGS.hotkeyMessages = [...registeredHotkeyMessages];
          saveSettings();
        });
        this.addChild(keyText);
      };
      ["a", "s", "d", "q", "w", "e"].forEach((k) => doHotkey(k));
    }
  }
  return HotkeyMessagesTab;
}
