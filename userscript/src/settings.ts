/* Set up and load the settings. */

interface Settings {
  showFPS: boolean;
  texturePack: string | null;
  customPack: string | null;
  typewriter: boolean;
  apiKey: string;
}
const settingsKey = "ninjaioutils";
const packKey = "DONTEDIT_ninja_custompack";

export const SETTINGS: Settings = {
  ...{
    showFPS: true,
    texturePack: null,
    customPack: null,
    typewriter: false,
    apiKey: "",
  },
  ...JSON.parse(localStorage.getItem(settingsKey) || "{}"),
};
export const saveSettings = () => localStorage.setItem(settingsKey, JSON.stringify(SETTINGS));

export const getSavedPack = () =>
  JSON.parse(localStorage.getItem(packKey) || '["",""]') as [string, string];
export const savePackData = (tex: string, ter: string) =>
  localStorage.setItem(packKey, JSON.stringify([tex, ter]));
