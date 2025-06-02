import { app } from "typings";
import Mod from "../api/Mod";
import Ninja, { NinjaEvents } from "../api/Ninja";

export class SpectateMod extends Mod {
  constructor() {
    super({
      id: "Spectate",
      name: "Spectate",
      description: "Allows you to spectate non-1v1 games.",
      author: "Meow",
      icon: "face_shades",
    });
  }

  public load() {
    Ninja.events.addListener(NinjaEvents.GAME_JOIN, this.joinedGame);
    Ninja.hookMethod(app, "onLayerDisconnect", {
      priority: -10,
      callback: this.exitedGame,
    });
    super.load();
  }
  public unload() {
    this.reset();
    Ninja.unhookMethod(app.onLayerDisconnect, this.exitedGame);
    super.unload();
  }
  private reset() {
    Ninja.events.removeListener(NinjaEvents.GAME_JOIN, this.joinedGame);
  }

  private _joinedGame() {
    app.game.hud.applySpecSetup();
  }
  private joinedGame = this._joinedGame.bind(this);

  // user is kicked
  private _leftGame() {}
  private leftGame = this._leftGame.bind(this);

  // user leaves the game on purpose
  private _exitedGame() {
    this.reset();
  }
  private exitedGame = this._exitedGame.bind(this);
}
