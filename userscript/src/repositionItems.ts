export default function reposItems() {
  app.menu.partyButton.x = app.menu.joinButton.x + app.menu.joinButton.width + 2;
  app.menu.partyButton.y = app.menu.joinButton.y;
  App.Layer.partyMenu.reposition();
}
