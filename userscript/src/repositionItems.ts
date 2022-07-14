export default function reposItems() {
  try {
    App.Layer.partyMenu.reposition();
    app.menu.partyButton.x = app.menu.joinButton.x + app.menu.joinButton.width + 2;
    app.menu.partyButton.y = app.menu.joinButton.y;
  } catch {}
}
