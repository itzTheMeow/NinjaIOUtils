import { Button, Game, ServerListTableRow } from "lib";
import { App, app, Layer, PIXI } from "typings";
import Mod from "../api/Mod";
import Ninja, { NinjaEvents } from "../api/Ninja";
import config from "../config";

export class SpectateMod extends Mod {
  constructor() {
    super({
      id: "Spectate",
      name: "Spectate",
      description: "Adds a button to spectate non-1v1 games.",
      author: "Meow",
      icon: "cursor_def",
    });
  }

  private currentGame: [any, any, any, any] | null = null;

  public load() {
    Ninja.events.addListener(NinjaEvents.GAMEPLAY_STOPPED, this.leftGame);
    Ninja.hookMethod(app, "onLayerDisconnect", {
      priority: -10,
      callback: this.exitedGame,
    });
    Ninja.hookMethod(ServerListTableRow.prototype, "addChild", {
      priority: 10,
      callback: this.tableRowHook,
    });
    Ninja.hookMethod(App.Layer, "onServerReject", {
      priority: 10,
      callback: this.serverRejectHook,
    });
    Ninja.hookMethod(Game.prototype, "onStartNewGame", {
      priority: 10,
      callback: this.joinedGame,
    });
    super.load();
  }
  public unload() {
    this.reset();
    Ninja.events.removeListener(NinjaEvents.GAMEPLAY_STOPPED, this.leftGame);
    Ninja.unhookMethod(app.onLayerDisconnect, this.exitedGame);
    Ninja.unhookMethod(ServerListTableRow.prototype.addChild, this.tableRowHook);
    Ninja.unhookMethod(App.Layer.onServerReject, this.serverRejectHook);
    Ninja.unhookMethod(Game.prototype.onStartNewGame, this.joinedGame);
    super.unload();
  }
  private reset() {
    this.currentGame = null;
    Ninja.events.removeListener(NinjaEvents.GAME_JOIN, this.joinedGame);
  }
  private serverRejectHook = this.reset.bind(this);

  private _tableRowHook({ args }: { args: [Button] }) {
    const joinButton = args[0];
    // wait for join button to be added
    if (joinButton && joinButton.id !== "join") return;

    const specButton = new Button("__spec");
    specButton.scale.x = specButton.scale.y = joinButton.scale.x;
    specButton.setText("  ");
    specButton.x = joinButton.x + joinButton.width + 4;
    specButton.y = joinButton.y;
    specButton.addListener(Button.BUTTON_RELEASED, () => {
      // listen for game details and store them
      App.Layer.once(Layer.Events.JOIN_GAME, (...args) => {
        this.currentGame = <any>args;
      });
      Ninja.events.addListener(NinjaEvents.GAME_JOIN, this.joinedGame);
      // click the join button
      joinButton.dispatchEvent(<any>new CustomEvent(Button.BUTTON_RELEASED));
    });
    const ico = new PIXI.Sprite(App.CombinedTextures[this.details.icon]);
    ico.width = specButton.width;
    ico.height = specButton.height;
    ico.x = specButton.width * -0.2;
    ico.y = specButton.height * 0.2;
    specButton.addChild(ico);
    joinButton.parent.addChild(specButton);
  }
  private tableRowHook = this._tableRowHook.bind(this);

  private _joinedGame() {
    // enable spectator UI
    app.game.hud.applySpecSetup();
    app.game.player.spec = true;
    // make the game think the player has spawned
    app.game.readyToSpawn = true;
    // block chat messages
    app.game.onCmdMessage = () => {
      this.log("Chat is disabled while spectating!", config.Colors.red);
    };
  }
  private joinedGame = this._joinedGame.bind(this);

  // user is kicked
  private _leftGame() {
    // auto rejoin game
    if (this.currentGame) App.Layer.onServerListJoinGame(...this.currentGame);
  }
  private leftGame = this._leftGame.bind(this);

  // user leaves the game on purpose
  private _exitedGame() {
    this.reset();
  }
  private exitedGame = this._exitedGame.bind(this);
}
