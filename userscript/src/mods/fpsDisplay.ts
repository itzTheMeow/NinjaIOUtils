import Mod from "../api/Mod";

export class FPSDisplayMod extends Mod<{
  showTime: boolean;
}> {
  constructor() {
    super({
      id: "FPSDisplay",
      name: "FPS Display",
      author: "Meow",
      description: "Displays your FPS and ping at the top of the screen.",
      icon: "energy_icon",
    });
    this.implementConfig({
      showTime: false,
    });
  }
  public load() {
    super.load();
  }
}
