import { AudioEffects, InputField } from "lib";
import { App } from "typings";
import Mod from "../api/Mod";

export class SoundEffectsMod extends Mod {
  constructor() {
    super({
      id: "SoundEffects",
      name: "Sounds++",
      description: "Adds additional sound effects to the game.",
      author: "Meow",
      icon: "unmute_icon",
    });
  }

  public load() {
    App.Console.consoleInput.addListener(InputField.CHANGE, this.consoleTyped);
    super.load();
  }
  public unload() {
    App.Console.consoleInput.removeListener(InputField.CHANGE, this.consoleTyped);
    super.unload();
  }

  private _consoleTyped() {
    AudioEffects.ButtonHover.audio.play();
  }
  private consoleTyped = this._consoleTyped.bind(this);
}
