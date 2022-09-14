export default function reposItems() {
  if (!app.menu) return;
  try {
    App.Layer.partyMenu.reposition();
    app.menu.joinButton.x = app.menu.backgroundImage.x + 28;
    app.menu.serverListButton.x = app.menu.joinButton.x + app.menu.joinButton.width + 26;
    app.menu.serverListButton.y = app.menu.joinButton.y;
    app.menu.serverCreateButton.x =
      app.menu.serverListButton.x -
      (app.menu.serverCreateButton.width - app.menu.serverListButton.width);
    app.menu.serverCreateButton.y =
      app.menu.serverListButton.y + app.menu.serverListButton.height + 14;
    app.menu.partyButton.x =
      app.menu.serverCreateButton.x - (app.menu.partyButton.backgroundEnabled.width - 10);
    app.menu.partyButton.y = app.menu.serverCreateButton.y - 4;
    app.menu.onlineOption.x =
      app.menu.joinButton.x +
      (app.menu.partyButton.x - app.menu.joinButton.x - app.menu.onlineOption.width) * 0.75;
    app.menu.onlineOption.y =
      app.menu.serverCreateButton.y +
      app.menu.serverCreateButton.height / 2 -
      app.menu.onlineOption.height / 2 +
      2;
  } catch {}
}
export function reindexItems() {
  app.menu.modeContainer.parent.addChild(app.menu.modeContainer);
  app.menu.serverContainer.parent.addChild(app.menu.serverContainer);
}
