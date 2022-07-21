import config from "./config";
import { startingLevel } from "./matchStartHook";
import { SETTINGS } from "./settings";

export default function matchEndHook() {
  Game.prototype._endGame = Game.prototype.endGame;
  Game.prototype.endGame = function (data) {
    // example - points can now be omitted
    /*{
      mode: 1,
      winner: 1,
      leaderboard: {
        id: ["9", "4", "c", "0", "7", "2", "d", "a", "3", "6", "b", "8"],
        points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        kills: [21, 19, 13, 9, 8, 5, 2, 1, 1, 0, 0, -1],
        deaths: [6, 7, 7, 2, 11, 18, 3, 1, 1, 1, 0, 2],
      },
      countdown: 24,
      completed: 0,
    }*/

    if (SETTINGS.apiKey) {
      App.Console.log("Attempting to upload match score...");

      if (this.manager.isRanked) {
        try {
          const leaderIndex = data.leaderboard.id.indexOf(this.sessionId);
          const statModel = {
            id: app.credential.playerid,
            map: app.client.mapID,
            mode: this.mode,
            kills: data.leaderboard.kills[leaderIndex],
            deaths: data.leaderboard.deaths[leaderIndex],
            caps: data.leaderboard.points ? data.leaderboard.points[leaderIndex] : 0,
          };

          /* Uploads your match stats to the tracker. */
          fetch(`${config.api}/ninja/submit?key=${SETTINGS.apiKey}`, {
            method: "POST",
            body: JSON.stringify(statModel),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res: { err?: boolean; message?: string }) => {
              if (res.err) {
                App.Console.log(`Failed to upload match score! ERR_${res.err}`);
                App.Console.log(`Error: ${res.message}`);
              } else {
                App.Console.log("Successfully uploaded match score!");
              }
            })
            .catch((err) => {
              App.Console.log("Failed to upload match score! (check console for errors)");
              console.error(err);
            });
        } catch (err) {
          App.Console.log("Failed to upload match score! (check console for errors)");
          console.error(err);
        }
      } else {
        App.Console.log("Match is unranked or custom, scores not uploaded.");
      }
    }

    (async () => {
      const xp = Number((await APIClient.getUserProfile(app.credential.playerid))?.experience) || 0;
      if (xp && startingLevel.l) {
        const level = Math.min(Math.max(Math.floor(0.2 * Math.sqrt(xp / 15.625)), 1), 160);
        const xpNeeded =
          15.625 * Math.pow((level + 1) / 0.2, 2) -
          (1 === level ? 0 : 15.625 * Math.pow(level / 0.2, 2));
        const gain = xp - startingLevel.l;
        App.Console.log(
          `You gained ${gain.toLocaleString()} (${(xpNeeded / gain).toFixed(
            2
          )}%) experience this round!`,
          config.Colors.green
        );
      }
      startingLevel.l = 0;
    })();

    return this._endGame(data);
  };
}
