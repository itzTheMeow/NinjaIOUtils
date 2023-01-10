import { CustomizationMenu, ProfileMenu, SettingsPanel } from "lib";
import { app, App, Layer } from "typings";
import Mod from "../api/Mod";
import Ninja from "../api/Ninja";
import { clickContainer } from "../utils";

enum HashPaths {
  menu = "",
  profile = "profile",
  shop = "shop",
  ranks = "ranks",
  players = "players",
  clans = "clans",
  settings = "settings",
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
    menu.addListener(Layer.Events.MENU_ACCESS, () => this.switchHash(HashPaths.menu));
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
    }

    super.load();
  }

  public switchHash(path: HashPaths, ...extra: string[]) {
    window.location.hash = `/${[path, ...extra].filter((e) => e).join("/")}`;
  }
}
