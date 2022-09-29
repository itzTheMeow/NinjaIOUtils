import config from "./config";
import { SETTINGS } from "./settings/settings";

let isRateLimited = false;

export const registeredHotkeyMessages = new Map(SETTINGS.hotkeyMessages);

export async function handleKeyDown(e: KeyboardEvent) {
  if (e.repeat) return;

  const isAltPressed = UserInput.pressed[18];
  const message = registeredHotkeyMessages.get(e.key);

  if (message && isAltPressed && SETTINGS.enableHotkeyMessages)
    sendChatMessage(message);
}

async function sendChatMessage(message: string) {
  if (!app.client.socket || isRateLimited) return;

  const binaryChatMessage = Client.compress({
    t: config.PacketTypeMap.chatSend,
    msg: message,
  });

  app.client.socket.send(binaryChatMessage);
  isRateLimited = true;
  setTimeout(() => (isRateLimited = false), 1000 * 1.4); //1.4 seconds
}
