import { delay } from "es-toolkit";
import {
  APIClient,
  app,
  LevelBar,
  numberWithPeriods,
  UITheme,
  XPProgression,
} from "lib";
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
  private startingXP = 0;

  public load() {
    this.startingXP = 0;
    Ninja.events.addListener(NinjaEvents.GAME_START, this.gamestart);
    Ninja.events.addListener(NinjaEvents.GAME_END, this.gameend);
    super.load();
  }
  public unload() {
    Ninja.events.removeListener(NinjaEvents.GAME_START, this.gamestart);
    Ninja.events.removeListener(NinjaEvents.GAME_END, this.gameend);
    super.unload();
  }

  private async onGameStart() {
    this.startingXP = 0;
    this.startingXP = Number(
      (await APIClient.getUserProfile(app.credential.playerid)).experience,
    );
  }
  private gamestart = this.onGameStart.bind(this);

  private async onGameEnd() {
    if (!this.startingXP) return;
    // polling for the new XP value
    for (let attempt = 0; attempt < 4; attempt++) {
      if (attempt > 0) await delay(1000 * attempt);
      const xp =
        Number(
          (await APIClient.getUserProfile(app.credential.playerid))?.experience,
        ) || 0;
      if (xp > this.startingXP) {
        this.reportGain(this.startingXP, xp);
        break;
      }
    }
    this.startingXP = 0;
  }
  private gameend = this.onGameEnd.bind(this);

  private reportGain(startingLevel: number, xp: number) {
    if (!xp) return;
    const prev_level = XPProgression.levelFromXP(startingLevel),
      level = XPProgression.levelFromXP(xp);
    /** {@link LevelBar.prototype.load} */
    const xpNeeded =
      15.625 * Math.pow((level + 1) / 0.2, 2) -
      (1 === level ? 0 : 15.625 * Math.pow(level / 0.2, 2));

    const gain = xp - startingLevel;
    Ninja.log(
      `You gained ${numberWithPeriods(gain)} (${
        Math.round((gain / xpNeeded) * 1000) / 10
      }%) experience this round!`,
      UITheme.MenuColors.success,
    );
    if (level > prev_level)
      Ninja.log(
        `You leveled up! You are now level ${level}.`,
        UITheme.MenuColors.accent,
      );
  }
}
