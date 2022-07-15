export default function reposItems() {
  if (!app.menu) return;
  try {
    App.Layer.partyMenu.reposition();
    app.menu.joinButton.x = app.menu.backgroundImage.x + 24;
    app.menu.serverListButton.x = app.menu.joinButton.x + app.menu.joinButton.width + 6;
    app.menu.serverListButton.y = app.menu.joinButton.y;
    app.menu.serverListButton.scale.x = app.menu.serverListButton.scale.y = 1.1;
    app.menu.serverCreateButton.x =
      app.menu.serverListButton.x -
      (app.menu.serverCreateButton.width - app.menu.serverListButton.width);
    app.menu.serverCreateButton.y =
      app.menu.serverListButton.y + app.menu.serverListButton.height + 6;
    app.menu.partyButton.x = app.menu.serverCreateButton.x - app.menu.partyButton.width;
    app.menu.partyButton.y = app.menu.serverCreateButton.y - 4;
  } catch {}
}
