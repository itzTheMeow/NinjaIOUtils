/* Set up and load the settings. */
import { Settings } from "../../../shared";

const settingsKey = "ninjaioutils";

export const settingsApiKey = localStorage.getItem("niou_apikey");

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
  },
  ...JSON.parse(localStorage.getItem(settingsKey) || "{}"),
};
export const saveSettings = () => {
  localStorage.setItem(settingsKey, JSON.stringify(SETTINGS));
};
