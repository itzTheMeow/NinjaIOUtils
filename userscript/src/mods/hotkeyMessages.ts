import Mod from "../api/Mod";

export class HotkeyMessagesMod extends Mod<{
  keyA: string;
  keyS: string;
  keyD: string;
  keyQ: string;
  keyW: string;
  keyE: string;
}> {
  constructor() {
    super({
      id: "HotkeyMessages",
      name: "Hotkey Messages",
      author: "Anna",
      description:
        "Lets you send pre-defined messages in chat using hotkeys. Use fullscreen to avoid conflics with browser hotkeys.",
      icon: "chat-ingame",
    });
    this.implementConfig(
      {
        keyA: "",
        keyS: "",
        keyD: "",
        keyQ: "",
        keyW: "",
        keyE: "",
      },
      {
        keyA: "ALT + A",
        keyS: "ALT + S",
        keyD: "ALT + D",
        keyQ: "ALT + Q",
        keyW: "ALT + W",
        keyE: "ALT + E",
      }
    );
  }
}
