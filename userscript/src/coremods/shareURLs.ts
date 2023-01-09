import Mod from "../api/Mod";

export class ShareURLMod extends Mod {
  constructor() {
    super({
      id: "ShareURL",
      name: "Share URLs",
      description: "Allows other players to join your game by providing a link.",
      author: "builtin",
      icon: "menu_icon_players",
      core: true,
    });
  }
}
