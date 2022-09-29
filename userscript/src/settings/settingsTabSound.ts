import { saveSettings, SETTINGS } from "./settings";

export default function hookSoundSettingsTab() {
  app.menu.settingsPanel.soundTab.addChild(
    (app.menu.settingsPanel.soundTab.typewriter = new Checkbox(
      "typewriter",
      "Enable Typing Noise",
      true
    ))
  );
  app.menu.settingsPanel.soundTab.typewriter.x = app.menu.settingsPanel.soundTab.volumeSlider.x;
  app.menu.settingsPanel.soundTab.typewriter.y =
    app.menu.settingsPanel.soundTab.volumeSlider.y +
    app.menu.settingsPanel.soundTab.volumeSlider.height +
    14;
  app.menu.settingsPanel.soundTab.typewriter.on(Checkbox.CHANGE, function (b) {
    SETTINGS.typewriter = b;
    saveSettings();
  });
  app.menu.settingsPanel.soundTab.typewriter.setChecked(SETTINGS.typewriter);
}
