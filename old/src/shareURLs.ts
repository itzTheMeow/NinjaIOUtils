import config from "./config";

export let gameLinkData = { id: "", name: "", pass: "" };
function clearSaved() {
  window.location.hash = "";
  gameLinkData.id = gameLinkData.name = gameLinkData.pass = "";
}
export function tryJoinLink(args?: [string, string, string]) {
  /* Extract room details from URL. */
  const [id, name, pass] =
    args || window.location.hash.substring(1)?.split("&").map(decodeURIComponent) || [];
  if (!id || !name) return;
  App.Console.log(`Attempting to join room ${name}...`);
  const loadingMenu = App.Layer.loadingMenu;

  /* Shows loading menu. */
  App.Layer.addChild(loadingMenu);
  loadingMenu.show();
  loadingMenu.setTitle(`Click to join server.\n${name}`);
  loadingMenu.cancelCount = -1;

  loadingMenu.joinButton = new Button("join");
  loadingMenu.joinButton.selected = true;
  loadingMenu.joinButton.setText("Join");
  loadingMenu.joinButton.scale.x = loadingMenu.joinButton.scale.y = 0.8;
  loadingMenu.joinButton.addListener(Button.BUTTON_RELEASED, function () {
    removeJoinStuff();
    loadingMenu.show();
    /* Joins the game using the specified details. */
    App.Layer.emit("join_game", name, id, pass || "");
  });
  loadingMenu.joinButton.x =
    loadingMenu.title.x + 0.5 * (loadingMenu.title.width - loadingMenu.joinButton.width);
  loadingMenu.joinButton.y = loadingMenu.title.y + 40;
  loadingMenu.joinButton.setTint(config.Colors.green);
  loadingMenu.container.addChild(loadingMenu.joinButton);

  loadingMenu.cancelButton2 = new Button("cancel2");
  loadingMenu.cancelButton2.setText("Cancel");
  loadingMenu.cancelButton2.scale.x = loadingMenu.cancelButton2.scale.y = 0.8;
  loadingMenu.cancelButton2.addListener(Button.BUTTON_RELEASED, function () {
    removeJoinStuff();
    clearSaved();
    return loadingMenu.emit(Layer.Events.LOADING_CANCEL);
  });
  loadingMenu.cancelButton2.x = loadingMenu.joinButton.x + loadingMenu.joinButton.width + 8;
  loadingMenu.cancelButton2.y = loadingMenu.title.y + 40;
  loadingMenu.cancelButton2.setTint(config.Colors.red);
  loadingMenu.container.addChild(loadingMenu.cancelButton2);

  loadingMenu.title.y -= 36;

  function removeJoinStuff() {
    loadingMenu.title.y += 36;
    loadingMenu.container.removeChild(loadingMenu.joinButton);
    loadingMenu.container.removeChild(loadingMenu.cancelButton2);
  }
}
