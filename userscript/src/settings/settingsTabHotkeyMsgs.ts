import config from "../config";
import { saveSettings, SETTINGS } from "./settings";
import { registeredHotkeyMessages } from "../hotkeyMessages";

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

      this.hkmHint = new PIXI.Text(
        "(Use fullscreen to avoid conflics with browser hotkeys)",
        {
          fontName: "Arial",
          fontSize: 14,
          fill: config.Colors.white,
          strokeThickness: 2,
          lineJoin: "round",
        }
      );
      this.hkmHint.x = this.hkmTitle.x + this.hkmTitle.width + 3;
      this.hkmHint.y = this.off + 2;
      this.addChild(this.hkmHint);

      /* ============= Enable HKM ============= */
      this.enableHKM = new Checkbox(
        "enableHKM",
        "Enable Hotkey Messages",
        true
      );
      this.enableHKM.x = this.marginLeft;
      this.enableHKM.y = this.off += 34;
      this.enableHKM.on(Checkbox.CHANGE, function (b) {
        SETTINGS.enableHotkeyMessages = b;
        saveSettings();
      });
      this.addChild(this.enableHKM);
      this.enableHKM.setChecked(SETTINGS.enableHotkeyMessages);

      /* ============= 'ALT + A' Hotkey ============= */
      this.aLabel = new PIXI.Text("ALT + A", {
        fontName: "Arial",
        fontSize: 16,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.aLabel.x = this.marginLeft;
      this.aLabel.y = this.off += 55;
      this.addChild(this.aLabel);

      this.aHotkey = new InputField("a_hotkey", false, 24);
      this.aHotkey.setDimensions(370, 35);
      this.aHotkey.forceLowerCase = false;
      this.aHotkey.setMaxChars(40);
      if (registeredHotkeyMessages.get("a"))
        this.aHotkey.setText(registeredHotkeyMessages.get("a"));
      this.aHotkey.x = this.aLabel.width + 60;
      this.aHotkey.y = this.off - 6;
      this.aHotkey.setFilter(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/."
      );
      this.aHotkey.addListener(InputField.CHANGE, function (d) {
        const message = d.data.value || "";
        registeredHotkeyMessages.set("a", message);
        SETTINGS.hotkeyMessages = [...registeredHotkeyMessages];
        saveSettings();
      });
      this.addChild(this.aHotkey);

      /* ============= 'ALT + S' Hotkey ============= */
      this.sLabel = new PIXI.Text("ALT + S", {
        fontName: "Arial",
        fontSize: 16,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.sLabel.x = this.marginLeft;
      this.sLabel.y = this.off += 55;
      this.addChild(this.sLabel);

      this.sHotkey = new InputField("s_hotkey", false, 24);
      this.sHotkey.setDimensions(370, 35);
      this.sHotkey.forceLowerCase = false;
      this.sHotkey.setMaxChars(40);
      if (registeredHotkeyMessages.get("s"))
        this.sHotkey.setText(registeredHotkeyMessages.get("s"));
      this.sHotkey.x = this.aLabel.width + 60;
      this.sHotkey.y = this.off - 6;
      this.sHotkey.setFilter(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/."
      );
      this.sHotkey.addListener(InputField.CHANGE, function (d) {
        const message = d.data.value || "";
        registeredHotkeyMessages.set("s", message);
        SETTINGS.hotkeyMessages = [...registeredHotkeyMessages];
        saveSettings();
      });
      this.addChild(this.sHotkey);

      /* ============= 'ALT + D' Hotkey ============= */
      this.dLabel = new PIXI.Text("ALT + D", {
        fontName: "Arial",
        fontSize: 16,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.dLabel.x = this.marginLeft;
      this.dLabel.y = this.off += 55;
      this.addChild(this.dLabel);

      this.dHotkey = new InputField("d_hotkey", false, 24);
      this.dHotkey.setDimensions(370, 35);
      this.dHotkey.forceLowerCase = false;
      this.dHotkey.setMaxChars(40);
      if (registeredHotkeyMessages.get("d"))
        this.dHotkey.setText(registeredHotkeyMessages.get("d"));
      this.dHotkey.x = this.aLabel.width + 60;
      this.dHotkey.y = this.off - 6;
      this.dHotkey.setFilter(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/."
      );
      this.dHotkey.addListener(InputField.CHANGE, function (d) {
        const message = d.data.value || "";
        registeredHotkeyMessages.set("d", message);
        SETTINGS.hotkeyMessages = [...registeredHotkeyMessages];
        saveSettings();
      });
      this.addChild(this.dHotkey);

      /* ============= 'ALT + Q' Hotkey ============= */
      this.qLabel = new PIXI.Text("ALT + Q", {
        fontName: "Arial",
        fontSize: 16,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.qLabel.x = this.marginLeft;
      this.qLabel.y = this.off += 55;
      this.addChild(this.qLabel);

      this.qHotkey = new InputField("q_hotkey", false, 24);
      this.qHotkey.setDimensions(370, 35);
      this.qHotkey.forceLowerCase = false;
      this.qHotkey.setMaxChars(40);
      if (registeredHotkeyMessages.get("q"))
        this.qHotkey.setText(registeredHotkeyMessages.get("q"));
      this.qHotkey.x = this.aLabel.width + 60;
      this.qHotkey.y = this.off - 6;
      this.qHotkey.setFilter(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/."
      );
      this.qHotkey.addListener(InputField.CHANGE, function (d) {
        const message = d.data.value || "";
        registeredHotkeyMessages.set("q", message);
        SETTINGS.hotkeyMessages = [...registeredHotkeyMessages];
        saveSettings();
      });
      this.addChild(this.qHotkey);

      /* ============= 'ALT + W' Hotkey ============= */
      this.wLabel = new PIXI.Text("ALT + W", {
        fontName: "Arial",
        fontSize: 16,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.wLabel.x = this.marginLeft;
      this.wLabel.y = this.off += 55;
      this.addChild(this.wLabel);

      this.wHotkey = new InputField("w_hotkey", false, 24);
      this.wHotkey.setDimensions(370, 35);
      this.wHotkey.forceLowerCase = false;
      this.wHotkey.setMaxChars(40);
      if (registeredHotkeyMessages.get("w"))
        this.wHotkey.setText(registeredHotkeyMessages.get("w"));
      this.wHotkey.x = this.wLabel.width + 60;
      this.wHotkey.y = this.off - 6;
      this.wHotkey.setFilter(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/."
      );
      this.wHotkey.addListener(InputField.CHANGE, function (d) {
        const message = d.data.value || "";
        registeredHotkeyMessages.set("w", message);
        SETTINGS.hotkeyMessages = [...registeredHotkeyMessages];

        saveSettings();
      });
      this.addChild(this.wHotkey);

      /* ============= 'ALT + E' Hotkey ============= */
      this.eLabel = new PIXI.Text("ALT + E", {
        fontName: "Arial",
        fontSize: 16,
        fill: config.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.eLabel.x = this.marginLeft;
      this.eLabel.y = this.off += 55;
      this.addChild(this.eLabel);

      this.eHotkey = new InputField("e_hotkey", false, 24);
      this.eHotkey.setDimensions(370, 35);
      this.eHotkey.forceLowerCase = false;
      this.eHotkey.setMaxChars(40);
      if (registeredHotkeyMessages.get("e"))
        this.eHotkey.setText(registeredHotkeyMessages.get("e"));
      this.eHotkey.x = this.aLabel.width + 60;
      this.eHotkey.y = this.off - 6;
      this.eHotkey.setFilter(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/."
      );
      this.eHotkey.addListener(InputField.CHANGE, function (d) {
        const message = d.data.value || "";
        registeredHotkeyMessages.set("e", message);
        SETTINGS.hotkeyMessages = [...registeredHotkeyMessages];
        saveSettings();
      });
      this.addChild(this.eHotkey);
    }
  }
  return HotkeyMessagesTab;
}
