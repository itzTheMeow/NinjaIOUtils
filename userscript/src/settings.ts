/* Set up and load the settings. */

interface Settings {
  showFPS: boolean;
  texturePack: string | null;
  terrainPack: string | null;
  typewriter: boolean;
  apiKey: string;
}
const settingsKey = "ninjaioutils";

export const SETTINGS: Settings = {
  ...{
    showFPS: true,
    texturePack: null,
    terrainPack: null,
    typewriter: false,
    apiKey: "",
  },
  ...JSON.parse(localStorage.getItem(settingsKey) || "{}"),
};
export const saveSettings = () => localStorage.setItem(settingsKey, JSON.stringify(SETTINGS));
