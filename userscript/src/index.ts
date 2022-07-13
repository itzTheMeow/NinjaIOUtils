import config from "./config";
import { socialMenuHook } from "./friendSearch";
import { hookTextureLoader } from "./texturePack";

hookTextureLoader();
/* Fixes pasting in firefox. */
if (!navigator.clipboard.readText) {
  navigator.clipboard.readText = function () {
    return new Promise((res) => res(prompt("Paste text now.") || ""));
  };
}
socialMenuHook();
