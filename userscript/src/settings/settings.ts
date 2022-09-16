/* Set up and load the settings. */

interface Settings {
  showFPS: boolean;
  texturePack: string | null;
  typewriter: boolean;
  apiKey: string;
  appearOnline: boolean;
}
const settingsKey = "ninjaioutils";

export const SETTINGS: Settings = {
  ...{
    showFPS: true,
    texturePack: null,
    typewriter: false,
    apiKey: "",
    appearOnline: true,
  },
  ...JSON.parse(localStorage.getItem(settingsKey) || "{}"),
};
export const saveSettings = () => localStorage.setItem(settingsKey, JSON.stringify(SETTINGS));
