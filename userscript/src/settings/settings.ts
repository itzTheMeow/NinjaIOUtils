/* Set up and load the settings. */

interface Settings {
  uiScale: number;
  showFPS: boolean;
  texturePack: string | null;
  typewriter: boolean;
  apiKey: string;
  appearOnline: boolean;
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
  },
  ...JSON.parse(localStorage.getItem(settingsKey) || "{}"),
};
export const saveSettings = () => localStorage.setItem(settingsKey, JSON.stringify(SETTINGS));
