import { APIClient, Protocol } from "lib";
import { app } from "typings";
import { APIMap } from "../../../shared";
import Mod from "../api/Mod";
import Ninja, { NinjaEvents } from "../api/Ninja";
import config from "../config";

export class StatTrackerMod extends Mod {
  constructor() {
    super({
      id: "StatTracker",
      name: "Stat Tracker",
      description: "Tracks your stats.",
      author: "Meow",
      icon: "",
      draft: true,
      recommend: true,
    });
  }
  public load() {
    Ninja.onClientPacket((type, a) => {
      /** Identify map and server details on join. */
      const testMap = async (name: string) => {
        Ninja.activeClient().mapID = 0;
        const maps: APIMap[] = await APIClient.getMaps();
        const map = maps.find((m) => m.name == name);
        if (map) {
          Ninja.activeClient().mapID = Number(map.id);
          Ninja.log(`# Identified map as ${map.name} (ID: ${map.id}).`);
        } else Ninja.log(`# Failed to identify map. (name: ${name}) Please report to Meow.`);
      };
      if (a.type == Protocol.GAME && a.data.t == Protocol.Game.INFO) {
        if (a.data.msg.startsWith("Joining "))
          testMap((a.data.msg.match(/(?: - )(.*)(?: by)/) || [])[1]);
        else if (a.data.msg.startsWith("loading map: "))
          testMap(a.data.msg.substring("loading map: ".length));
      }
    });
    Ninja.events.addListener(NinjaEvents.GAME_END, ({ data }) => {
      // example - points can now be omitted
      /*{
          mode: 1,
          winner: 0,
          leaderboard: {
            id: ["7", "d", "9", "4", "5", "b", "2", "c", "6", "0", "8"],
            points: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            kills: [31, 41, 21, 8, 8, 5, 5, 2, 0, -2, -6],
            deaths: [11, 16, 8, 27, 22, 16, 8, 2, 0, 11, 23],
            name: [
              "sheep",
              ".Frost.Killer",
              "ALEXMEOW4560",
              "rtyty",
              "NinjaBK730",
              "NinjaPH74",
              "NinjaPL529",
              "NinjaBD919",
              "saldapaga",
              "NinjaXO395",
              "NinjaTA163",
            ],
          },
          countdown: 24,
          completed: 0,
        };*/

      if ("apiKey") {
        Ninja.log("Attempting to upload match score...");

        if (app.game.manager.isRanked) {
          try {
            const leaderIndex = data.leaderboard.id.indexOf(app.game.sessionId);
            const statModel = {
              id: app.credential.playerid,
              map: Ninja.activeClient().mapID,
              mode: app.game.mode,
              kills: data.leaderboard.kills[leaderIndex],
              deaths: data.leaderboard.deaths[leaderIndex],
              caps: data.leaderboard.points ? data.leaderboard.points[leaderIndex] : 0,
            };

            /* Uploads your match stats to the tracker. */
            fetch(`${config.api}/submit?key=${"APIKEY"}`, {
              method: "POST",
              body: JSON.stringify(statModel),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((res: { err?: boolean; message?: string }) => {
                if (res.err) {
                  Ninja.log(`Failed to upload match score! ERR_${res.err}`);
                  Ninja.log(`Error: ${res.message}`);
                } else {
                  Ninja.log("Successfully uploaded match score!");
                }
              })
              .catch((err) => {
                Ninja.log("Failed to upload match score! (check console for errors)");
                console.error(err);
              });
          } catch (err) {
            Ninja.log("Failed to upload match score! (check console for errors)");
            console.error(err);
          }
        } else {
          Ninja.log("Match is unranked or custom, scores not uploaded.");
        }
      }
    });
    super.load();
  }
}
