import config from "./config";

export default function initFriendOnlineHook() {
  SocialMenu.prototype._maskFriendList = SocialMenu.prototype.maskFriendList;
  SocialMenu.prototype.maskFriendList = function (this: typeof SocialMenu, scrollDist) {
    this.friends
      .sort((f1, f2) => f2.seen.getTime() - f1.seen.getTime())
      .forEach((f, fi) => (f.y = 47 + fi * SocialMenu.ItemHeight));
    this._maskFriendList(scrollDist);
  };

  //@ts-ignore
  FriendItem = class FriendItem extends PIXI.Graphics {
    id: string;
    name: string;
    seen: Date;
    clan: string;
    nameLabel: any;
    onlineNow: boolean;
    constructor(id: string, name: string, seen: string, clan: string) {
      super();
      this.id = id;
      this.name = name;
      this.seen = new Date(Date.parse(seen) - 6e4 * new Date().getTimezoneOffset());
      this.onlineNow = !!App.Layer.socialMenu.onlineFriends?.includes(this.id);
      if (this.onlineNow) this.seen = new Date();
      this.clan = clan;
      this.beginFill(16777215, 0.15);
      this.drawRoundedRect(0, 0, 340, 26, 4);
      this.endFill();
      this.interactive = !0;
      this.tint = 12303291;
      this.on("mouseover", () => {
        this.tint = 16777215;
      });
      this.on("mouseout", () => {
        this.tint = 12303291;
      });
      this.on("mousedown", () => this.emit(SocialMenu.ACCESS_PROFILE, this.id));
      this.on("rightdown", () => this.emit(SocialMenu.SHOW_FRIEND_DROPDOWN, this.id));
      this.beginFill(
        this.onlineNow
          ? config.Colors.dotGreen
          : 30 > Math.round((Date.now() - this.seen.getTime()) / 1e3)
          ? config.Colors.dotOrange
          : config.Colors.dotGrey,
        1
      );
      this.drawCircle(320, 13, 8);
      this.endFill();
      this.nameLabel = new PIXI.BitmapText(this.name, { fontName: "Open Sans", fontSize: 22 });
      this.nameLabel.x = 8;
      this.nameLabel.y = 2;
      this.addChild(this.nameLabel);
    }
  };
}

export async function updateFriendList(reload = true) {
  if (App.Layer.socialMenu.mode == "friends") {
    try {
      const friendsOnline = (await fetch(`${config.api}/onlineplayers`).then((res) =>
        res.json()
      )) as string[];
      App.Layer.socialMenu.onlineFriends =
        friendsOnline?.filter((f) => App.Layer.socialMenu.friends.find((fr) => fr.id == f)) || [];
    } catch {
      App.Layer.socialMenu.onlineFriends = [];
    }
    if (reload) await App.Layer.socialMenu.loadFriends();
  }
}
