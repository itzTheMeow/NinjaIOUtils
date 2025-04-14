import { Client, EventDispatcher, Game, MemberMenu, PlayerDropdown, PVPClient } from "lib";
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
  STEP = "st", // called every render frame
  PLAYER_JOINED = "pj",
  PLAYER_MUTED = "pm",
  GAMEPLAY_STOPPED = "gameplayStopped",
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

    const originalOnLogout = MemberMenu.prototype.onLogout;
    MemberMenu.prototype.onLogout = function () {
      originalOnLogout.call(this);
      ninja.mods.forEach((mod) => {
        if (mod.details.noGuests && mod.loaded) {
          mod.unload();
        }
      });
    };

    //@ts-ignore
    App.prototype.realInitGameMode = App.prototype.initGameMode;
    App.prototype.initGameMode = function (data) {
      this.realInitGameMode(data);
      this.game.on(Game.MATCH_START, () =>
        ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.GAME_START))
      );
    };
    //@ts-ignore
    Game.prototype._endGame = Game.prototype.endGame;
    Game.prototype.endGame = function (data) {
      ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.GAME_END, data));
      return this._endGame(data);
    };

    //@ts-ignore
    Game.prototype._playerJoined = Game.prototype.playerJoined;
    Game.prototype.playerJoined = function (data, extra) {
      ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.PLAYER_JOINED, { detail: data }));
      return this._playerJoined(data, extra);
    };

    //@ts-ignore
    PlayerDropdown.prototype._onMute = PlayerDropdown.prototype.onMute;
    PlayerDropdown.prototype.onMute = function () {
      ninja.events.dispatchEvent(
        new CustomEvent(NinjaEvents.PLAYER_MUTED, {
          detail: { sid: this.target.sid, name: this.target.name },
        })
      );
      return this._onMute();
    };

    //@ts-ignore
    App.prototype.realLeaveGame = App.prototype.leaveGame;
    App.prototype.leaveGame = async function () {
      await this.realLeaveGame();
      ninja.events.dispatchEvent(new CustomEvent(NinjaEvents.GAMEPLAY_STOPPED));
    };

    const stepper = app.stepCallback;
    app.stepCallback = (...d) => {
      this.events.dispatchEvent(new CustomEvent(NinjaEvents.STEP));
      return stepper(...d);
    };

    App.Stats.realSetPing = App.Stats.setPing;
    App.Stats.setPing = function (ping) {
      ninja.serverLatency = ping;
      return App.Stats.realSetPing(ping);
    };

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

    hookModMenu();

    this.mods.forEach((m) => m.isInstalled() && m.loadon == "appstart" && m.load());
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
