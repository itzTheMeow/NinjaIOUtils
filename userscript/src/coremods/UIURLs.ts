import { APIClient, Button, CustomizationMenu, ProfileMenu, Protocol, SettingsPanel } from "lib";
import { app, App, Layer } from "typings";
import Mod from "../api/Mod";
import Ninja from "../api/Ninja";
import config from "../config";
import { clickContainer } from "../utils";

enum HashPaths {
  menu = "",
  clans = "clans",
  game = "play",
  login = "login",
  mods = "mods",
  players = "players",
  profile = "profile",
  ranks = "ranks",
  recover = "recovery",
  register = "register",
  settings = "settings",
  shop = "shop",
}

export class UIURLMod extends Mod {
  constructor() {
    super({
      id: "UIURL",
      name: "UI URLs",
      description:
        "Saves your navigation state between page loads. Also enables joining a game via link.",
      author: "builtin",
      icon: "menu_icon_players",
      core: true,
    });
  }

  public load() {
    const menu = Ninja.activeMenu(),
      ProfilePaths = {
        [ProfileMenu.TAB_OVERVIEW]: "",
        [ProfileMenu.TAB_CLAN]: "clan",
        [ProfileMenu.TAB_ACCOUNT]: "account",
        [ProfileMenu.TAB_SETTINGS]: "settings",
      },
      ShopPaths = {
        [CustomizationMenu.PLAYER]: "self",
        [CustomizationMenu.WEAPONS]: "weapons",
      },
      SettingsPaths = {
        [SettingsPanel.Tabs.CONTROLS]: "controls",
        [SettingsPanel.Tabs.GRAPHICS]: "graphics",
        [SettingsPanel.Tabs.SOUND]: "sound",
        [SettingsPanel.Tabs.TEXTURES || "tex"]: "textures",
      };

    if (!window.location.hash.substring(1)) window.location.hash = "/";

    // Menu
    menu.addListener(Layer.Events.MENU_ACCESS, (m) =>
      this.switchHash(m == "mod" ? HashPaths.mods : HashPaths.menu)
    );
    // Profile
    let profCurTab = "";
    menu.on(Layer.Events.PROFILE_ACCESS, () =>
      this.switchHash(HashPaths.profile, ProfilePaths[profCurTab])
    );
    const openTab = App.Layer.profileMenu.openTab.bind(App.Layer.profileMenu);
    App.Layer.profileMenu.openTab = (tab, audio) => {
      openTab(tab, audio);
      profCurTab = tab;
      this.switchHash(HashPaths.profile, ProfilePaths[tab]);
    };
    // Shop
    menu.on(Layer.Events.CUSTOMIZATION_ACCESS, () =>
      this.switchHash(HashPaths.shop, ShopPaths[App.Layer.customizationMenu.display])
    );
    App.Layer.customizationMenu.playerCustomizationButton.on("mousedown", () =>
      this.switchHash(HashPaths.shop, ShopPaths[CustomizationMenu.PLAYER])
    );
    App.Layer.customizationMenu.weaponCustomizationButton.on("mousedown", () =>
      this.switchHash(HashPaths.shop, ShopPaths[CustomizationMenu.WEAPONS])
    );
    // Ranking
    menu.on(Layer.Events.RANKING_ACCESS, () => this.switchHash(HashPaths.ranks));
    // Players
    menu.on(Layer.Events.MEMBER_ACCESS, () => this.switchHash(HashPaths.players));
    // Clans
    menu.on(Layer.Events.CLAN_BROWSER_ACCESS, () => this.switchHash(HashPaths.clans));
    // Settings
    menu.on(Layer.Events.SETTINGS_ACCESS, () =>
      this.switchHash(
        HashPaths.settings,
        SettingsPaths[app.menu.settingsPanel.selectedTab || SettingsPanel.Tabs.CONTROLS]
      )
    );
    menu.on(<any>"open_tab", (tab: string) =>
      this.switchHash(HashPaths.settings, SettingsPaths[tab])
    );
    // Login / Signup / Recovery
    menu.on(Layer.Events.LOGIN_ACCESS, () => this.switchHash(HashPaths.login));
    menu.on(Layer.Events.REGISTER_ACCESS, () => this.switchHash(HashPaths.register));
    menu.on(Layer.Events.RECOVER_ACCESS, () => this.switchHash(HashPaths.recover));

    const curPath = window.location.hash.substring(2).split("/");
    switch (curPath[0]) {
      case HashPaths.profile: {
        menu.emit(Layer.Events.PROFILE_ACCESS);
        const profPath = Object.entries(ProfilePaths).find((p) => p[1] == curPath[1]);
        if (profPath) App.Layer.profileMenu.openTab(profPath[0], false);
        break;
      }
      case HashPaths.shop: {
        menu.emit(Layer.Events.CUSTOMIZATION_ACCESS);
        clickContainer(
          curPath[1] == ShopPaths[CustomizationMenu.WEAPONS]
            ? App.Layer.customizationMenu.weaponCustomizationButton
            : App.Layer.customizationMenu.playerCustomizationButton
        );
        break;
      }
      case HashPaths.ranks: {
        menu.emit(Layer.Events.RANKING_ACCESS);
        break;
      }
      case HashPaths.players: {
        menu.emit(<any>(Layer.Events.MEMBER_ACCESS + "f"));
        break;
      }
      case HashPaths.clans: {
        menu.emit(<any>(Layer.Events.CLAN_BROWSER_ACCESS + "f"));
        break;
      }
      case HashPaths.settings: {
        menu.emit(Layer.Events.SETTINGS_ACCESS);
        const settPath = Object.entries(SettingsPaths).find((p) => p[1] == curPath[1]);
        if (settPath) app.menu.settingsPanel.displayTab(settPath[0]);
        break;
      }
      case HashPaths.login: {
        menu.emit(Layer.Events.LOGIN_ACCESS);
        break;
      }
      case HashPaths.register: {
        menu.emit(Layer.Events.REGISTER_ACCESS);
        break;
      }
      case HashPaths.recover: {
        menu.emit(Layer.Events.RECOVER_ACCESS);
        break;
      }
      case HashPaths.mods: {
        menu.emit(<any>"modacc");
        break;
      }
    }

    this.hook();

    const [_id, _name, _pass] =
      window.location.hash.substring(1)?.split("&").map(decodeURIComponent) || [];
    if (_id && Number(_id) && _name) this.tryJoin(_id, _name, _pass);
    else if (window.location.hash.startsWith(`#/${HashPaths.game}/`)) {
      const [id, name, pass] = window.location.hash
        .substring(`#/${HashPaths.game}/`.length)
        .split("/")
        .map(decodeURIComponent);
      if (id && name) this.tryJoin(id, name, pass);
    }

    super.load();
  }

  public switchHash(path: HashPaths, ...extra: string[]) {
    return (window.location.hash = `/${[path, ...extra]
      .filter((e) => e)
      .map(encodeURIComponent)
      .join("/")}`);
  }
  public setGameHash(id: string, name: string, password = "") {
    Ninja.gamePassword = password;
    return (window.location.hash =
      this.switchHash(HashPaths.game, id, name, Ninja.gamePassword) + "/");
  }

  public hook() {
    const mod = this;
    Ninja.onClientPacket((type, a) => {
      if (type !== "game") return;
      /* Hooks into the join message and gets the server name you join using. */
      if (
        a.type == Protocol.SESSION &&
        a.data.type == Protocol.Session.JOIN_RESP &&
        a.data.info.startsWith("You joined ")
      )
        mod.setGameHash(
          app.gameClient.server.id,
          a.data.info.substring("You joined ".length),
          Ninja.gamePassword
        );
    });

    App.Layer.on(Layer.Events.JOIN_GAME, (name, id, pass) => {
      this.setGameHash(id, name, pass);
    });
    app.gameClient.addListener(Protocol.DISCONNECT, () => {
      Ninja.gamePassword = "";
      this.switchHash(HashPaths.menu);
    });

    const realPostCreateGame = APIClient.postCreateGame.bind(APIClient);
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
      mod.setGameHash(serverID, serverName, serverPass);
      return realPostCreateGame(
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

  public tryJoin(id: string, name: string, pass?: string) {
    App.Console.log(`Attempting to join server '${name}'...`);
    const loadingMenu = App.Layer.loadingMenu;

    /* Shows loading menu. */
    App.Layer.addChild(loadingMenu);
    loadingMenu.show();
    loadingMenu.setTitle(`Click to join server.\n${name}`);
    loadingMenu.cancelCount = -1;

    const joinButton = new Button("join");
    joinButton.setText("Join");
    joinButton.scale.x = joinButton.scale.y = 0.8;
    joinButton.addListener(Button.BUTTON_RELEASED, function () {
      removeJoinStuff();
      loadingMenu.show();
      /* Joins the game using the specified details. */
      App.Layer.emit(Layer.Events.JOIN_GAME, name, id, pass || "");
    });
    joinButton.x = loadingMenu.title.x + 0.5 * (loadingMenu.title.width - joinButton.width);
    joinButton.y = loadingMenu.title.y + 40;
    joinButton.setTint(config.Colors.green);
    loadingMenu.container.addChild(joinButton);

    const cancelButton = new Button("cancel2");
    cancelButton.setText("Cancel");
    cancelButton.scale.x = cancelButton.scale.y = 0.8;
    cancelButton.addListener(Button.BUTTON_RELEASED, function () {
      removeJoinStuff();
      Ninja.gamePassword = "";
      return loadingMenu.emit(Layer.Events.LOADING_CANCEL);
    });
    cancelButton.x = joinButton.x + joinButton.width + 8;
    cancelButton.y = loadingMenu.title.y + 40;
    cancelButton.setTint(config.Colors.red);
    loadingMenu.container.addChild(cancelButton);

    loadingMenu.title.y -= 36;

    function removeJoinStuff() {
      loadingMenu.title.y += 36;
      loadingMenu.container.removeChild(joinButton);
      loadingMenu.container.removeChild(cancelButton);
    }
  }
}
