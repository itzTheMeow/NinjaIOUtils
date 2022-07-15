import { Socket } from "socket.io-client";
import config from "./config";
import reposItems from "./repositionItems";
import { saveSettings, SETTINGS } from "./settings";
import { SocketTypes } from "./typings";
import { io } from "./utils";

let failedOnline = false;
let onlineSocket: Socket;
export function goOnline() {
  failedOnline = false;
  if (onlineSocket) onlineSocket.disconnect();
  onlineSocket = io(config.api);
  onlineSocket.on("connect", () =>
    onlineSocket.emit("init", SocketTypes.online, app.credential.username)
  );
  onlineSocket.on("success", () => {
    App.Console.log("Successfully went online!");
  });
  onlineSocket.on("fail", (msg) => {
    failedOnline = true;
    App.Console.log(`Failed to go online: ${msg}`);
  });
  onlineSocket.on("disconnect", () => {
    onlineSocket = null;
    App.Console.log("Went offline.");
  });
}
export function goOffline() {
  if (onlineSocket) {
    onlineSocket.emit("dc");
    onlineSocket.disconnect();
  }
}

export default function initOnlineOptionHook() {
  function doOnlineStatusOption() {
    app.menu.onlineOption = new Checkbox("appearOnline", "Appear Online", true);
    app.menu.onlineOption.on(Checkbox.CHANGE, function (b) {
      SETTINGS.appearOnline = b;
      saveSettings();
      if (SETTINGS.appearOnline) goOnline();
      else goOffline();
    });
    app.menu.onlineOption.scale.x = app.menu.onlineOption.scale.y = 1.1;
    app.menu.container.addChild(app.menu.onlineOption);
    app.menu.onlineOption.setChecked(SETTINGS.appearOnline);
    reposItems();
  }
  doOnlineStatusOption();
  app.onShowMenu(() => doOnlineStatusOption());

  if (SETTINGS.appearOnline) goOnline();
  setInterval(() => SETTINGS.appearOnline && !onlineSocket && !failedOnline && goOnline(), 1000);
}
