import { frameDisplay, showFPS } from "../fpsCounter";
import { saveSettings, SETTINGS } from "./settings";

export default function hookGraphicsSettingsTab() {
  app.menu.settingsPanel.graphicsTab.addChild(
    (app.menu.settingsPanel.graphicsTab.fpsDisplay = new Checkbox(
      "showFPS",
      "Show FPS Display",
      true
    ))
  );
  app.menu.settingsPanel.graphicsTab.fpsDisplay.x = app.menu.settingsPanel.graphicsTab.enableAA.x;
  app.menu.settingsPanel.graphicsTab.fpsDisplay.y =
    app.menu.settingsPanel.graphicsTab.enableAA.y +
    app.menu.settingsPanel.graphicsTab.enableAA.height +
    14;
  app.menu.settingsPanel.graphicsTab.fpsDisplay.on(Checkbox.CHANGE, function (b) {
    SETTINGS.showFPS = b;
    saveSettings();
    if (frameDisplay.style.display == "none" && SETTINGS.showFPS) showFPS();
  });
  app.menu.settingsPanel.graphicsTab.fpsDisplay.setChecked(SETTINGS.showFPS);

  app.menu.settingsPanel.graphicsTab.addChild(
    (app.menu.settingsPanel.graphicsTab.uiScaler = new Slider(
      "chatOpacity",
      "UI scale",
      SETTINGS.uiScale || 0.4,
      2,
      0.4
    ))
  );
  if (!SETTINGS.uiScale) app.menu.settingsPanel.graphicsTab.uiScaler.valueLabel.text = "default";
  app.menu.settingsPanel.graphicsTab.uiScaler.x = app.menu.settingsPanel.graphicsTab.fpsDisplay.x;
  app.menu.settingsPanel.graphicsTab.uiScaler.y =
    app.menu.settingsPanel.graphicsTab.fpsDisplay.y +
    app.menu.settingsPanel.graphicsTab.fpsDisplay.height +
    14;
  app.menu.settingsPanel.graphicsTab.uiScaler.on(Slider.CHANGE, (b: number) => {
    b = Math.round(b * 10) / 10;
    if (b == 0.4) {
      app.menu.settingsPanel.graphicsTab.uiScaler.valueLabel.text = "default";
      b = 0;
    }
    if (b == SETTINGS.uiScale) return;
    App.NUIScale = SETTINGS.uiScale = b;
    saveSettings();
    app.onResize();

    const conf = document.createElement("div");
    const confy = document.createElement("button");
    confy.innerHTML = "OK";
    confy.onclick = () => conf.remove();
    conf.appendChild(confy);
    const confn = document.createElement("button");
    confn.innerHTML = "Undo";
    confn.onclick = () => {
      App.NUIScale = SETTINGS.uiScale = 0;
      saveSettings();
      app.onResize();
      conf.remove();
    };
    confn.style.marginLeft = "0.3rem";
    conf.appendChild(confn);
    conf.style.position = "absolute";
    conf.style.top = "50%";
    conf.style.left = "50%";
    conf.style.transform = "translate(-50%,-50%)";
    conf.style.backgroundColor = "rgba(0,0,0,0.8)";
    conf.style.padding = "0.5rem";
    document.body.appendChild(conf);
  });
}
