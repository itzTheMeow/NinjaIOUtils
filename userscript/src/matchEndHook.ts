import config from "./config";
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

    return this._endGame(data);
  };
}
