import config from "./config";
import { startingLevel } from "./matchStartHook";

export default function matchEndHook() {
  Game.prototype._endGame = Game.prototype.endGame;
  Game.prototype.endGame = function (data) {
    app.game.reticle.children.forEach((c) => (c.visible = false));

    (async () => {
      const xp = Number((await APIClient.getUserProfile(app.credential.playerid))?.experience) || 0;
      if (xp && startingLevel.l) {
        const plevel = Math.min(
          Math.max(Math.floor(0.2 * Math.sqrt(startingLevel.l / 15.625)), 1),
          160
        );
        const level = Math.min(Math.max(Math.floor(0.2 * Math.sqrt(xp / 15.625)), 1), 160);
        const xpNeeded =
          15.625 * Math.pow((level + 1) / 0.2, 2) -
          (1 === level ? 0 : 15.625 * Math.pow(level / 0.2, 2));
        const gain = xp - startingLevel.l;
        App.Console.log(
          `You gained ${gain.toLocaleString()} (${
            Math.round((gain / xpNeeded) * 1000) / 10
          }%) experience this round!`,
          config.Colors.green
        );
        if (level > plevel)
          App.Console.log(`You leveled up! You are now level ${level}.`, config.Colors.yellow);
      }
      startingLevel.l = 0;
    })();

    return this._endGame(data);
  };
}
