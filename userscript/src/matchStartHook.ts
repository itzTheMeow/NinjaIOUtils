export default function matchStartHook() {
  /*
   * Now unused hook into the MATCH_START event.
   * Was going to make some sort of ingame menu (or commands) to show what room you are in.
   * May finish it later, not sure.
   */
  App.prototype.realInitGameMode = App.prototype.initGameMode;
  App.prototype.initGameMode = function (data) {
    this.realInitGameMode(data);
    this.game.on(Game.MATCH_START, function () {
      //App.Console.log("Press / for a help menu.");
    });
  };
}
