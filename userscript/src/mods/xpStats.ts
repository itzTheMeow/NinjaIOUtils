import { APIClient } from "lib";
import { app } from "typings";
import Mod from "../api/Mod";
import Ninja, { NinjaEvents } from "../api/Ninja";

export class XPStatsMod extends Mod {
  constructor() {
    super({
      id: "XPStats",
      name: "XP Stats",
      description: "Shows how much XP you gained after finishing a match.",
      author: "Meow",
      icon: "10xp",
      recommend: true,
    });
  }

  public startingLevel = 0;

  public load() {
    Ninja.events.addListener(NinjaEvents.GAME_START, async () => {
      this.startingLevel = 0;
      this.startingLevel = Number(
        (await APIClient.getUserProfile(app.credential.playerid)).experience
      );
    });

    super.load();
  }
}
