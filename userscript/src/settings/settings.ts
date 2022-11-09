/* Set up and load the settings. */
type hotkeyMessage = [hotkey: string, message: string];

interface Settings {
  uiScale: number;
  showFPS: boolean;
  texturePack: string | null;
  typewriter: boolean;
  apiKey: string;
  appearOnline: boolean;
  enableHotkeyMessages: boolean;
  hotkeyMessages: Array<hotkeyMessage>;
  helpfulUI: boolean;
}
const settingsKey = "ninjaioutils";

export const SETTINGS: Settings = {
  ...{
    uiScale: 0,
    showFPS: true,
    texturePack: null,
    typewriter: false,
    apiKey: "",
    appearOnline: true,
    enableHotkeyMessages: true,
    hotkeyMessages: [],
    helpfulUI: true,
  },
  ...JSON.parse(localStorage.getItem(settingsKey) || "{}"),
};
export const saveSettings = () => {
  localStorage.setItem(settingsKey, JSON.stringify(SETTINGS));
};
