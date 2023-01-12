import { APIClient, Protocol } from "lib";
import { APIMap } from "../../../shared";
import Mod from "../api/Mod";
import Ninja from "../api/Ninja";

export class StatTrackerMod extends Mod {
  constructor() {
    super({
      id: "StatTracker",
      name: "Stat Tracker",
      description: "Tracks your stats.",
      author: "Meow",
      icon: "",
      draft: true,
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
    super.load();
  }
}
