import { App } from "typings";
import config from "../config";
import Mod from "./Mod";
import Settings from "./Settings";

export default new (class Ninja {
  public settings = new Settings<{
    enabledMods: string[];
  }>(config.settingsKey, {
    enabledMods: [],
  });

  constructor() {}

  public ready = false;
  public get GameVersion() {
    return (
      document
        .querySelector<HTMLScriptElement>(`script[src*="game.js"]`)
        ?.src.split("/")
        .pop()
        ?.split("?v=")?.[1] ||
      (() => {
        try {
          return App.ClientVersion;
        } catch {
          return "unknown";
        }
      })()
    );
  }
  public mods: Mod[] = [];

  public registerMod(mod: Mod) {
    this.mods.push(mod);
    if (mod.details.core) this.loadMod(mod.id);
  }
  public loadMod(id: string) {
    const mod = this.mods.find((m) => m.id == id);
    if (!mod || mod.loaded) return;
    if (this.ready && mod.loadon == "appstart") mod.load();
    else if (mod.loadon == "pagestart") mod.load();
  }

  public log(text: string, color?: number) {
    if (this.ready) App.Console.log(text, color);
    else console.log(text);
  }
})();
