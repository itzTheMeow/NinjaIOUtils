import { Client, Protocol } from "lib";
import Mod from "../api/Mod";
import Ninja from "../api/Ninja";

export class HotkeyMessagesMod extends Mod<{
  keyA: string;
  keyS: string;
  keyD: string;
  keyQ: string;
  keyW: string;
  keyE: string;
}> {
  lastSent = Date.now();

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

  public load() {
    document.addEventListener("keydown", this.keydown);
    super.load();
  }
  public unload() {
    document.removeEventListener("keydown", this.keydown);
    super.unload();
  }

  public handleKeyDown(e: KeyboardEvent) {
    if (e.repeat) return;
    const message = this.config.get(<any>`key${e.key.toUpperCase()}`);
    if (e.altKey && message) this.sendChatMessage(message);
  }
  public keydown = this.handleKeyDown.bind(this);

  public sendChatMessage(msg: string) {
    if (!Ninja.inGame() || this.lastSent >= Date.now()) return;

    const binaryChatMessage = Client.compress({
      t: Protocol.Game.MESSAGE,
      msg,
    });

    Ninja.activeClient().socket.send(binaryChatMessage);
    this.lastSent = Date.now() + 1000 * 1.4; // 1.4sec
  }
}
