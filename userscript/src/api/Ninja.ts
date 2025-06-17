import { Client, EventDispatcher, Game, PlayerDropdown, PVPClient } from "lib";
import { app, App, Layer } from "typings";
import config from "../config";
import hookModMenu from "../hookModMenu";
import Mod from "./Mod";
import Settings from "./Settings";

export type Listener = () => any;
export type PacketListener = (type: "game" | "pvp", packet: any) => any;

export enum NinjaEvents {
  GAME_START = "gs",
  GAME_END = "ge",
  /** Current player joined the game. */
  GAME_JOIN = "gj",
  STEP = "st", // called every render frame
  /** Any player joined the game. */
  PLAYER_JOINED = "pj",
  PLAYER_MUTED = "pm",
  PLAYER_UNMUTED = "pum",
  GAMEPLAY_START = "gameplayStarted",
  /** When the game is left. */
  GAMEPLAY_STOPPED = "gameplayStopped",
}

export interface NinjaHookState {
  /** The original state of the function. */
  original: CallableFunction;
  /** The new state of the hooked function. */
  hook: CallableFunction;
  /** The set hooks to run with the function. */
  callbacks: NinjaHook[];
}
export interface NinjaHookPayload {
  /** Original function args. */
  args: any[];
  /** Current return value of the hook. */
  returnValue: any;
}
export interface NinjaHook {
  /**
   * Callback to run for the hook.
   * If the callback returns anything but `void`, the return value will be passed to the original function in order of priority. (the original return value will be ignored)
   */
  callback: (payload: NinjaHookPayload) => { returnValue: any } | void;
  /**
   * Lower numbers are ran first. 0 is the original function.
   * This means use a negative number to run before the original, and a positive number or 0 to run after.
   * Try to use a multiple of 10 where possible to allow other mods to override.
   */
  priority: number;
}

export default new (class Ninja {
  public settings = new Settings<{
    enabledMods: string[];
    texturePack: string;
    uiScale: number;
  }>(config.settingsKey, {
    enabledMods: [],
    texturePack: "",
    uiScale: 0,
  });
  public events: EventDispatcher;

  constructor() {}
  public init() {
    const ninja = this;
    this.ready = true;
    this.events = new EventDispatcher();

    this.hookMethod(app, "initGameMode", {
      priority: 10,
      callback() {
        ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.GAMEPLAY_START));
        app.game.on(Game.MATCH_START, () =>
          ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.GAME_START))
        );
      },
    });
    ninja.hookMethod(Game.prototype, "playerJoined", {
      priority: 10,
      callback({ args }) {
        ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.PLAYER_JOINED, { detail: args[0] }));
        if (args[0]?.sid == app.game.sessionId)
          ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.GAME_JOIN));
      },
    });
    ninja.hookMethod(Game.prototype, "endGame", {
      priority: -10,
      callback({ args }) {
        ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.GAME_END, args[0]));
      },
    });

    this.hookMethod(PlayerDropdown.prototype, "onMute", {
      priority: 10,
      callback() {
        ninja.events.dispatchEvent( new CustomEvent(NinjaEvents.PLAYER_MUTED, {detail: { sid: this.target.sid, name: this.target.name } }));
      },
    });

    this.hookMethod(PlayerDropdown.prototype, "onUnmute", {
      priority: 10,
      callback() {
        ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.PLAYER_UNMUTED, { detail: { name: this.target.name } }));
      },
    });

    this.hookMethod(App.prototype, "leaveGame", {
      priority: 10,
      callback() {
        ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.GAMEPLAY_STOPPED));
      },
    });

    this.hookMethod(app, "stepCallback", {
      priority: -10,
      callback() {
        ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.STEP));
      },
    });
    this.hookMethod(App.Stats, "setPing", {
      priority: -10,
      callback({ args }) {
        ninja.serverLatency = args[0];
      },
    });

    app.onResize = window.eval(
      `(function ${app.onResize
        .toString()
        .replace(`App.Scale=b`, `b=Ninja.settings.get("uiScale")||b,App.Scale=b`)})`
    );
    app.onResize();

    Client.prototype.onMessage = function (_a) {
      const a: any = Client.decompress(_a.data);
      try {
        ninja.clientPacketListeners.forEach((l) => l("game", a));
      } catch (err) {
        console.error(err);
      }
      this.dispatchEvent(a);
    };
    PVPClient.prototype.onMessage = function (_a) {
      const a: any = PVPClient.decompress(_a.data);
      try {
        ninja.clientPacketListeners.forEach((l) => l("pvp", a));
      } catch (err) {
        console.error(err);
      }
      this.dispatchEvent(a);
    };

    this.hookMethod(App.Layer.memberMenu, "onLogout", {
      priority: -10,
      callback() {
        ninja.mods.forEach((mod) => {
          if (mod.details.noGuests && mod.loaded) mod.unload();
        });
      },
    });

    hookModMenu();

    this.mods.forEach(
      (m) =>
        m.isInstalled() &&
        m.loadon == "appstart" &&
        !(m.details.noGuests && this.isGuest()) &&
        m.load()
    );
    this.readyListeners.forEach((l) => l());
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
    if (mod.details.draft) return;
    this.mods.push(mod);
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

  private readyListeners: Listener[] = [];
  public onready(l: Listener) {
    this.readyListeners.push(l);
    return l;
  }
  public offready(l: Listener) {
    const i = this.readyListeners.indexOf(l);
    if (i >= 0) this.readyListeners.splice(i, 1);
  }

  private clientPacketListeners: PacketListener[] = [];
  public onClientPacket(l: PacketListener) {
    this.clientPacketListeners.push(l);
    return l;
  }
  public offClientPacket(l: PacketListener) {
    const i = this.clientPacketListeners.indexOf(l);
    if (i >= 0) this.clientPacketListeners.splice(i, 1);
  }

  private hooks: NinjaHookState[] = [];
  private findHookReference(method: CallableFunction) {
    return this.hooks.find((h) => h.hook === method);
  }
  private runHook(hook: NinjaHookState, scope: any, args: any[]): any {
    const sortedCallbacks = hook.callbacks.sort((a, b) => a.priority - b.priority);
    let returnValue: any = void 0;
    // run "lower" priority first
    for (const { callback } of sortedCallbacks.filter((cb) => cb.priority < 0)) {
      const res = callback.call(scope, { args, returnValue });
      if (typeof res == "object" && "returnValue" in res) returnValue = res.returnValue;
    }
    // run original function and catch the return value if needed
    const response = (<any>hook.original).call(scope, ...args);
    if (returnValue === void 0) returnValue = response;
    for (const { callback } of sortedCallbacks.filter((cb) => cb.priority >= 0)) {
      const res = callback.call(scope, { args, returnValue });
      if (typeof res == "object" && "returnValue" in res) returnValue = res.returnValue;
    }
    return returnValue;
  }
  public hookMethod<T extends any>(scope: T, methodName: keyof T, hook: NinjaHook): void {
    const method = scope[methodName];
    if (typeof method !== "function") {
      console.warn(
        `Failed to hook method ${String(methodName)}, not found or is not function.`,
        method,
        scope
      );
      return void 0;
    }
    const ref = this.findHookReference(method);
    if (ref) ref.callbacks.push(hook);
    else {
      const ninja = this;
      const state: NinjaHookState = {
        original: method,
        hook: (scope[methodName] = <any>function (...args: any[]) {
          ninja.runHook(state, this, args);
        }),
        callbacks: [hook],
      };
      console.debug(`Hooked method ${String(methodName)}.`, scope);
    }
  }
  public unhookMethod(method: CallableFunction, callback: CallableFunction): void {
    // we don't need the scope to unhook because the hook can be found using the function reference
    const ref = this.findHookReference(method);
    if (ref) {
      const hookIndex = ref.callbacks.findIndex((cb) => cb.callback === callback);
      if (hookIndex == -1)
        return console.warn(`Failed to unhook method, callback not found.`, method);
      ref.callbacks.splice(hookIndex, 1);
      if (ref.callbacks.length == 0) {
        const refIndex = this.hooks.indexOf(ref);
        if (refIndex == -1)
          console.warn(`Failed to unhook method, hook not found in state.`, method);
        else this.hooks.splice(refIndex, 1);
      }
    } else {
      console.warn(`Failed to unhook method, hook not found.`, method);
    }
  }

  public gamePassword = "";
  public isGuest() {
    return App.Layer.setup == Layer.SETUP_GUEST;
  }
  public activeMenu() {
    return this.isGuest() ? App.Layer.guestMenu : App.Layer.memberMenu;
  }
  public activeClient() {
    return app.gameClient.socket ? app.gameClient : app.pvpClient.socket ? app.pvpClient : null;
  }
  public inGame() {
    const active = this.activeClient();
    return app.matchStarted && active && active.socket.readyState == WebSocket.OPEN;
  }
})();
