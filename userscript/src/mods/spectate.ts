import { app } from "typings";
import Mod from "../api/Mod";
import Ninja from "../api/Ninja";

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
    Ninja.hookMethod(app, "initGameMode", this.initGame);
    super.load();
  }
  public unload() {
    Ninja.unhookMethod(app.initGameMode, this.initGame);
    super.unload();
  }

  private _initGame() {
    // hook
  }
  private initGame = this._initGame.bind(this);

  private _joinedGame(packet: any) {
    app.game.hud.applySpecSetup();
    //app.game.hud.displayWeaponMenu(false);
  }
  private joinedGame = this._joinedGame.bind(this);

  // user is kicked
  private _leftGame() {}
  private leftGame = this._leftGame.bind(this);

  // user leaves the game on purpose
  private _exitedGame() {}
  private exitedGame = this._exitedGame.bind(this);
}
