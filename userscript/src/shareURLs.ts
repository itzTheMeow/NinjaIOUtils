import settingsTab from "./settingsTab";
import { setHash } from "./utils";

let savedPass = "";
function clearSaved() {
  window.location.hash = "";
  savedPass = "";
}

export function initShareURLHook() {
  /* Hooks into join_game event and sets your URL to the game you are in. */
  App.Layer.on("join_game", (name, id, pass) => {
    savedPass = pass || "";
    setHash(id, name, pass);
  });
  /* Upon disconnect, remove the saved server. */
  app.client.addListener(Protocol.DISCONNECT, () => {
    clearSaved();
    settingsTab();
  });

  /* Hook into the create game function. */
  APIClient.realPostCreateGame = APIClient.postCreateGame;
  APIClient.postCreateGame = function (
    serverID,
    settings,
    mode,
    time,
    serverName,
    serverPass,
    customData,
    auth
  ) {
    /* Saves created info to URL. */
    savedPass = serverPass;
    setHash(serverID, serverName, serverPass);
    return APIClient.realPostCreateGame(
      serverID,
      settings,
      mode,
      time,
      serverName,
      serverPass,
      customData,
      auth
    );
  };
}
