import { app, App } from "typings";
import config from "../config";
import hookModMenu from "../hookModMenu";
import Mod from "./Mod";
import Settings from "./Settings";

export type Listener = () => any;

export default new (class Ninja {
  public settings = new Settings<{
    enabledMods: string[];
  }>(config.settingsKey, {
    enabledMods: [],
  });

  constructor() {}
  public init() {
    const ninja = this;
    this.ready = true;

    const stepper = app.stepCallback;
    app.stepCallback = function (...d) {
      try {
        ninja.stepListeners.forEach((l) => l());
      } catch (err) {
        console.error(err);
      }
      return stepper(...d);
    };

    hookModMenu();

    this.mods.forEach((m) => m.isInstalled() && m.loadon == "appstart" && m.load());
  }

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
  public serverLatency = 0;
  public mods: Mod[] = [];

  public registerMod(mod: Mod<any>) {
    this.mods.push(mod);
    if (mod.isInstalled()) this.loadMod(mod.id);
  }
  public loadMod(id: string) {
    const mod = this.mods.find((m) => m.id == id);
    if (!mod || mod.loaded || !mod.isInstalled()) return;
    if (this.ready && mod.loadon == "appstart") mod.load();
    else if (mod.loadon == "pagestart") mod.load();
  }

  public log(text: string, color?: number) {
    if (this.ready) App.Console.log(text, color);
    else console.log(text);
  }

  private stepListeners: Listener[] = [];
  public onstep(l: Listener) {
    this.stepListeners.push(l);
    return l;
  }
  public offstep(l: Listener) {
    const i = this.stepListeners.indexOf(l);
    if (i >= 0) this.stepListeners.splice(i, 1);
  }

  public inGame() {
    return (
      app.matchStarted &&
      ((app.gameClient.socket && app.gameClient.socket.readyState == WebSocket.OPEN) ||
        (app.pvpClient.socket && app.pvpClient.socket.readyState == WebSocket.OPEN))
    );
  }
})();
