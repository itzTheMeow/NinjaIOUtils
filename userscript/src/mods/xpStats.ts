import { APIClient, LevelBar } from "lib";
import { app } from "typings";
import Mod from "../api/Mod";
import Ninja, { NinjaEvents } from "../api/Ninja";
import config from "../config";

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
    this.startingLevel = 0;
    Ninja.events.addListener(NinjaEvents.GAME_START, this.gamestart);
    Ninja.events.addListener(NinjaEvents.GAME_END, this.gameend);
    super.load();
  }
  public unload() {
    Ninja.events.removeListener(NinjaEvents.GAME_START, this.gamestart);
    Ninja.events.removeListener(NinjaEvents.GAME_END, this.gameend);
    super.unload();
  }

  public async onGameStart() {
    this.startingLevel = 0;
    this.startingLevel = Number(
      (await APIClient.getUserProfile(app.credential.playerid)).experience
    );
  }
  public gamestart = this.onGameStart.bind(this);

  public async onGameEnd() {
    const xp = Number((await APIClient.getUserProfile(app.credential.playerid))?.experience) || 0;
    if (xp && this.startingLevel) {
      const plevel = LevelBar.XPToLevel(this.startingLevel);
      const level = LevelBar.XPToLevel(xp);
      const xpNeeded =
        15.625 * Math.pow((level + 1) / 0.2, 2) -
        (1 === level ? 0 : 15.625 * Math.pow(level / 0.2, 2));
      const gain = xp - this.startingLevel;
      Ninja.log(
        `You gained ${gain.toLocaleString()} (${
          Math.round((gain / xpNeeded) * 1000) / 10
        }%) experience this round!`,
        config.Colors.green
      );
      if (level > plevel)
        Ninja.log(`You leveled up! You are now level ${level}.`, config.Colors.yellow);
    }
    this.startingLevel = 0;
  }
  public gameend = this.onGameEnd.bind(this);
}
