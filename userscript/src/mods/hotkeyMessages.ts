import Mod from "../api/Mod";

export class HotkeyMessagesMod extends Mod {
  constructor() {
    super({
      id: "HotkeyMessages",
      name: "Hotkey Messages",
      author: "Anna",
      description: "Lets you send pre-defined messages in chat using hotkeys.",
      icon: "chat-ingame",
    });
  }
}
