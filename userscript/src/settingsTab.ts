import config from "./config";
import { frameDisplay, showFPS } from "./fpsCounter";
import { saveSettings, SETTINGS } from "./settings";

export default function settingsTab() {
  function UtilTab() {
    const tab = this;
    PIXI.Container.call(this);
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

    /* ============= Texture Pack ============= */
    this.texTitle = new PIXI.Text("Texture Pack URL", {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 18,
      fill: config.Colors.yellow,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.texTitle.x = this.marginLeft - 5;
    this.texTitle.y = this.off += 38;
    this.addChild(this.texTitle);

    this.texHint = new PIXI.Text(
      "See the userscript page for instructions. (make sure to click save)",
      {
        fontName: "Arial",
        fontSize: 14,
        fill: config.Colors.white,
        strokeThickness: 2,
        lineJoin: "round",
      }
    );
    this.texHint.x = this.marginLeft - 5;
    this.texHint.y = this.off += 24;
    this.addChild(this.texHint);

    this.texField = new InputField("tex_field", false, 24);
    this.texField.setDimensions(370, 35);
    this.texField.forceLowerCase = false;
    this.texField.setMaxChars(128);
    if (SETTINGS.texturePack) this.texField.setText(SETTINGS.texturePack);
    this.texField.x = this.marginLeft;
    this.texField.y = this.off += 24;
    this.texField.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890:/?._");
    this.texField.addListener(InputField.CHANGE, function (d) {
      d = d.data.value || null;
      SETTINGS.texturePack = d;
      app.menu.settingsPanel.controlsTab.forceRefresh = true;
      saveSettings();
    });
    this.addChild(this.texField);

    this.pasteTexButton = new Button("paste_tex");
    this.pasteTexButton.selected = true;
    this.pasteTexButton.setText("Paste");
    this.pasteTexButton.scale.x = this.pasteTexButton.scale.y = 0.75;
    this.pasteTexButton.addListener(Button.BUTTON_RELEASED, function () {
      navigator.clipboard.readText().then(function (d) {
        tab.texField.setText(d);
        SETTINGS.texturePack = d;
        app.menu.settingsPanel.controlsTab.forceRefresh = true;
        saveSettings();
      });
    });
    this.pasteTexButton.x = this.marginLeft + this.texField.width + this.pasteTexButton.width / 4;
    this.pasteTexButton.y = this.off + 4;
    this.addChild(this.pasteTexButton);

    this.clearTexButton = new Button("clear_tex");
    this.clearTexButton.selected = true;
    this.clearTexButton.setText("Clear");
    this.clearTexButton.scale.x = this.clearTexButton.scale.y = 0.75;
    this.clearTexButton.addListener(Button.BUTTON_RELEASED, function () {
      tab.texField.setText("");
      SETTINGS.texturePack = null;
      app.menu.settingsPanel.controlsTab.forceRefresh = true;
      saveSettings();
    });
    this.clearTexButton.x =
      this.marginLeft +
      this.texField.width +
      this.pasteTexButton.width +
      this.clearTexButton.width / 4 +
      4;
    this.clearTexButton.y = this.off + 4;
    this.addChild(this.clearTexButton);

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
    this.keyTitle.y = this.off += 42;
    this.addChild(this.keyTitle);

    this.keyHint = new PIXI.Text(
      "The API key for uploading to the stat tracker.\nSee the userscript page for instructions.",
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
    this.keyField.y = this.off += 42;
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
  UtilTab.prototype = Object.create(PIXI.Container.prototype);
  UtilTab.prototype.constructor = UtilTab;
  EventDispatcher.call(UtilTab.prototype);

  function SettingsPanelNew(w: number, h: number) {
    let pan = new SettingsPanel(w, h);

    pan.utilTab = new UtilTab();
    pan.utilTabButton = new PIXI.Text("NinjaIOUtils", {
      fontName: "Arial",
      fontSize: 18,
      lineHeight: 18,
      fill: config.Colors.yellow,
      strokeThickness: 3,
      lineJoin: "round",
    });
    pan.utilTabButton.resolution = 1.5 * App.DevicePixelRatio;
    pan.utilTabButton.anchor.x = pan.utilTabButton.anchor.y = 0.5;
    pan.utilTabButton.x = 358;
    pan.utilTabButton.y = 28;
    pan.addChild(pan.utilTabButton);
    pan.utilTabButtonBackground = new PIXI.Graphics();
    pan.utilTabButtonBackground.beginFill(16777215, 0.1);
    pan.utilTabButtonBackground.drawRoundedRect(0, 0, 112, 30, 2);
    pan.utilTabButtonBackground.endFill();
    pan.utilTabButtonBackground.x = 302;
    pan.utilTabButtonBackground.y = 12;
    pan.utilTabButtonBackground.interactive = !0;
    pan.utilTabButtonBackground.on("touchstart", pan.displayTab.bind(pan, SettingsPanel.Tabs.UTIL));
    pan.utilTabButtonBackground.on("mousedown", pan.displayTab.bind(pan, SettingsPanel.Tabs.UTIL));
    pan.utilTabButtonBackground.on("mouseover", function () {
      pan.utilTabButtonBackground.tint = 11184810;
    });
    pan.utilTabButtonBackground.on("mouseout", function () {
      pan.utilTabButtonBackground.tint = 16777215;
    });
    pan.addChild(pan.utilTabButtonBackground);

    return pan;
  }
  SettingsPanel.Tabs.UTIL = "util";
  const oldX = app.menu.settingsPanel.x,
    oldY = app.menu.settingsPanel.y;
  app.menu.settingsPanel.destroy();
  app.menu.settingsPanel = SettingsPanelNew(660, 524);
  app.menu.settingsPanel.x = oldX;
  app.menu.settingsPanel.y = oldY;
  app.menu.resize();

  app.menu.settingsPanel.displayTab = function (a) {
    AudioEffects.ButtonClick.audio.play();
    saveSettings();
    switch (a) {
      case SettingsPanel.Tabs.GRAPHICS:
        this.controlsTab.parent && this.removeChild(this.controlsTab);
        this.soundTab.parent && this.removeChild(this.soundTab);
        this.utilTab.parent && this.removeChild(this.utilTab);
        this.addChild(this.graphicsTab);
        this.soundTabButtonBackground.alpha = 1;
        this.graphicsTabButtonBackground.alpha = 0;
        this.controlsTabButtonBackground.alpha = 1;
        this.utilTabButtonBackground.alpha = 1;
        break;
      case SettingsPanel.Tabs.CONTROLS:
        this.graphicsTab.parent && this.removeChild(this.graphicsTab);
        this.soundTab.parent && this.removeChild(this.soundTab);
        this.utilTab.parent && this.removeChild(this.utilTab);
        this.soundTabButtonBackground.alpha = 1;
        this.graphicsTabButtonBackground.alpha = 1;
        this.controlsTabButtonBackground.alpha = 0;
        this.utilTabButtonBackground.alpha = 1;
        this.addChild(this.controlsTab);
        break;
      case SettingsPanel.Tabs.SOUND:
        this.graphicsTab.parent && this.removeChild(this.graphicsTab);
        this.controlsTab.parent && this.removeChild(this.controlsTab);
        this.utilTab.parent && this.removeChild(this.utilTab);
        this.soundTabButtonBackground.alpha = 0;
        this.graphicsTabButtonBackground.alpha = 1;
        this.controlsTabButtonBackground.alpha = 1;
        this.utilTabButtonBackground.alpha = 1;
        this.addChild(this.soundTab);
        break;
      case SettingsPanel.Tabs.UTIL:
        this.graphicsTab.parent && this.removeChild(this.graphicsTab);
        this.controlsTab.parent && this.removeChild(this.controlsTab);
        this.soundTab.parent && this.removeChild(this.soundTab);
        this.soundTabButtonBackground.alpha = 1;
        this.graphicsTabButtonBackground.alpha = 1;
        this.controlsTabButtonBackground.alpha = 1;
        this.utilTabButtonBackground.alpha = 0;
        this.addChild(this.utilTab);
        break;
    }
  };
  (
    [
      [app.menu.settingsPanel.graphicsTabButtonBackground, SettingsPanel.Tabs.GRAPHICS],
      [app.menu.settingsPanel.controlsTabButtonBackground, SettingsPanel.Tabs.CONTROLS],
      [app.menu.settingsPanel.soundTabButtonBackground, SettingsPanel.Tabs.SOUND],
      [app.menu.settingsPanel.utilTabButtonBackground, SettingsPanel.Tabs.UTIL],
    ] as [Container, string][]
  ).forEach((d) => {
    d[0].on("mousedown", app.menu.settingsPanel.displayTab.bind(app.menu.settingsPanel, d[1]));
    d[0]._events.mousedown.shift();
  });
}
/*
 * All of the above code is just copied from the main bundle, with the new settings tab added.
 * I couldn't really see a better way to do this, so this is how it's done for now.
 * This could break in the future if a new settings tab is added.
 */
