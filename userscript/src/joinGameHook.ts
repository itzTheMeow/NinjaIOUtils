import config from "./config";
import { updateFriendList } from "./friendOnlineHook";
import { tryJoinLink } from "./shareURLs";
import { commPackets, communicateUser } from "./userCommunicationProtocol";

export default function hookJoinGameButton() {
  const btn = new Button("usr_join");
  btn.setText("Join Game");
  btn.scale.x = btn.scale.y = 0.75;
  const repos = () => (btn.x = App.Layer.userMenu.ox + App.Layer.userMenu.w - btn.width - 30);
  repos();
  btn.y = App.Layer.userMenu.h - 10;
  btn.visible = false;
  btn.addListener(Button.BUTTON_PRESSED, async () => {
    btn.setText("Requesting link...");
    repos();
    const rej = (msg: string) => {
      btn.setText(msg);
      repos();
      setTimeout(() => (btn.setText("Join Game"), repos()), 4000);
    };
    const req = String(Date.now());
    await communicateUser(App.Layer.userMenu.id, commPackets.gameLink, [req]);
    const res = (
      await fetch(`${config.api}/ninja/requestlink?id=${req}&userid=${App.Layer.userMenu.id}`).then(
        (r) => r.json()
      )
    )?.[0];
    if (res == false) rej("User not in game.");
    else if (res == true) rej("User in private game.");
    else if (Array.isArray(res)) {
      btn.setText("Join Game");
      repos();
      App.Layer.userMenu.onCloseButtonReleased();
      tryJoinLink([res[0], res[1], res[2]]);
    } else return rej("User not online.");
  });
  App.Layer.userMenu.container.addChild(btn);

  App.Layer.userMenu._load = App.Layer.userMenu.load;
  App.Layer.userMenu.load = async (id: string, type: string) => {
    btn.visible = false;
    await App.Layer.userMenu._load(id, type);
    await updateFriendList(false);
    btn.visible = App.Layer.socialMenu.onlineFriends.includes(App.Layer.userMenu.id);
  };
}
