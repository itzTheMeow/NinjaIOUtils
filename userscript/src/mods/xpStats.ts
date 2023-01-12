import Mod from "../api/Mod";

export class XPStatsMod extends Mod {
  constructor() {
    super({
      id: "XPStats",
      name: "XP Stats",
      description: "Shows how much XP you gained after finishing a match.",
      author: "Meow",
      icon: "10xp",
      draft: true,
    });
  }

  public load() {
    super.load();
  }
}
