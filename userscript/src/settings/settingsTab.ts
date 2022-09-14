import config from "../config";
import { saveSettings } from "./settings";
import getTexTab from "./settingsTabTex";
import getUtilTab from "./settingsTabUtil";

export default function settingsTab() {
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
        fontName: "Arial",
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
        pan.displayTab.bind(pan, SettingsPanel.Tabs.UTIL)
      );
      pan[`${name}ButtonBackground`].on(
        "mousedown",
        pan.displayTab.bind(pan, SettingsPanel.Tabs.UTIL)
      );
      pan[`${name}ButtonBackground`].on("mouseover", function () {
        pan[`${name}ButtonBackground`].tint = 11184810;
      });
      pan[`${name}ButtonBackground`].on("mouseout", function () {
        pan[`${name}ButtonBackground`].tint = 16777215;
      });
      pan.addChild(pan[`${name}ButtonBackground`]);
    }
    newTab("NinjaIOUtils", "util", 302, getUtilTab());
    newTab("Texture Pack", "tex", 418, getTexTab());
    return pan;
  }
  SettingsPanel.Tabs.UTIL = "util";
  SettingsPanel.Tabs.TEX = "tex";
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
    saveSettings();
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
  };
  Object.values(SettingsPanel.Tabs).forEach((d) => {
    // add our new mousedown listener and remove the old one (because we removed the old settings panel)
    const tab = app.menu.settingsPanel[`${d}TabButtonBackground`];
    tab.on("mousedown", app.menu.settingsPanel.displayTab.bind(app.menu.settingsPanel, d));
    tab._events.mousedown.shift();
  });
}
