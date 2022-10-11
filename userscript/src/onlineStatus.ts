import { Socket } from "socket.io-client";
import config from "./config";
import reposItems, { reindexItems } from "./repositionItems";
import { saveSettings, SETTINGS } from "./settings/settings";
import { gameLinkData } from "./shareURLs";
import { SocketTypes } from "../../shared";
import { commPackets, decodeUserCommunication } from "./userCommunicationProtocol";
import { inGame, io } from "./utils";

let failedOnline = false;
let wentOnline = false;
let onlineSocket: Socket;
export function goOnline() {
  if (app.credential.accounttype == "guest") {
    if (failedOnline) return;
    failedOnline = true;
    return App.Console.log("Failed to go online: You are not logged in!");
  }
  failedOnline = false;
  if (onlineSocket) onlineSocket.disconnect();
  onlineSocket = io(config.api);
  onlineSocket.on(
    "connect",
    () => onlineSocket && onlineSocket.emit("init", SocketTypes.online, app.credential.playerid)
  );
  onlineSocket.on("success", () => {
    App.Console.log("Successfully went online!");
    wentOnline = true;
  });
  onlineSocket.on("fail", (msg) => {
    wentOnline = false;
    failedOnline = true;
    App.Console.log(`Failed to go online: ${msg}`);
  });
  onlineSocket.on("disconnect", () => {
    onlineSocket = null;
    if (wentOnline) App.Console.log("Went offline.");
    wentOnline = false;
  });
  onlineSocket.on("needsLink", async (requestID) => {
    const messages = JSON.parse(await APIClient.getMessages(app.credential.id))?.messages as {
      // this is the official game api
      id: string;
      message: string;
      target: string; // author id
      created: string;
      system: "0" | "1";
    }[];

    const msg = messages?.find(
      (m) => decodeUserCommunication(m.message)?.packet == commPackets.gameLink
    );
    if (msg && decodeUserCommunication(msg.message)?.args[0] == requestID) {
      if (!inGame()) onlineSocket.emit("gotLink", requestID, false);
      else if (gameLinkData.pass) onlineSocket.emit("gotLink", requestID, true);
      else
        onlineSocket.emit("gotLink", requestID, [
          gameLinkData.id,
          gameLinkData.name,
          gameLinkData.pass,
        ]);
    } else onlineSocket.emit("gotLink", requestID, null);
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
    app.menu.onlineOption.setChecked(SETTINGS.appearOnline);
    app.menu.onlineOption.on(Checkbox.CHANGE, function (b) {
      SETTINGS.appearOnline = b;
      saveSettings();
      if (SETTINGS.appearOnline) goOnline();
      else goOffline();
    });
    app.menu.onlineOption.scale.x = app.menu.onlineOption.scale.y = 1.1;
    app.menu.container.addChild(app.menu.onlineOption);
    reindexItems();
    reposItems();
  }
  doOnlineStatusOption();
  app.onShowMenu(() => doOnlineStatusOption());

  if (SETTINGS.appearOnline) goOnline();
  setInterval(() => SETTINGS.appearOnline && !onlineSocket && !failedOnline && goOnline(), 1000);
}
