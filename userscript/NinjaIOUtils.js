// ==UserScript==
// @name         NinjaIOUtils
// @namespace    https://itsmeow.cat
// @description  A modloader for Ninja.io.
// @author       Meow
// @match        https://ninja.io/*
// @match        https://ninja.io
// @match        http://ninja.io/*
// @match        http://ninja.io
// @match        https://*.ninja.io/*
// @match        http://*.ninja.io/*
// @match        https://*.ninja.io
// @match        http://*.ninja.io
// @icon         https://www.google.com/s2/favicons?domain=ninja.io
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.1/socket.io.min.js
// @homepageURL  https://nutils.itsmeow.cat
// @supportURL   https://github.com/itzTheMeow/NinjaIOUtils/issues
// @grant        none
// @version      2.0
// ==/UserScript==

/*
  This file was generated automatically by a build script!
  If you want to see the source code, view it on github:
  > https://github.com/itzTheMeow/NinjaIOUtils
*/

(() => {
  // src/api/Ninja.ts
  var Ninja_default = new class Ninja {
    constructor() {
    }
    ready = false;
    get GameVersion() {
      return document.querySelector(`script[src*="game.js"]`)?.src.split("/").pop()?.split("?v=")?.[1] || (() => {
        try {
          return App.ClientVersion;
        } catch {
          return "unknown";
        }
      })();
    }
    mods = [];
  }();

  // src/config.ts
  var config_default = {
    ver: "2.0",
    api: "https://nutils.itsmeow.cat",
    customDelimiter: "__custom",
    Colors: {
      dotGreen: 65280,
      dotGrey: 8947848,
      dotOrange: 16757012,
      green: 8978312,
      grey: 16777215,
      red: 12603201,
      white: 13421772,
      yellow: 16763904
    },
    MapIDs: {
      Hull: 1,
      Igloo: 2,
      Temple: 3,
      DragonsDen: 4,
      dm_Arena1: 5,
      Elysium: 6,
      Tobruk: 7,
      ColdFusion: 8,
      TwinFaces: 9,
      KodysIsland: 10,
      Canyon: 11,
      Hill364: 12,
      Stasis: 13,
      ctf_Evening: 14,
      ArcticDusk: 15,
      Cathedral: 16,
      ctf_Lambda: 17,
      Aerial: 18,
      ctf_FacingWorlds: 19,
      ctf_Ash: 20,
      ctf_Naom: 21,
      dm_Hunter: 22,
      Tribal: 23,
      Kiwi: 24,
      Webb: 26,
      dm_Sleet: 27,
      SpaceStation: 28,
      Sinkhole: 29,
      LonelyIsland: 30,
      dm_Nexus: 31
    },
    WeaponReloadTimes: {
      Fists: 0,
      Shotgun: 0,
      SubmachineGun: 0,
      NadeLauncher: 2e3,
      Barrett: 2500,
      ShockRifle: 0,
      PulseGun: 0,
      FlameThrower: 0,
      RPG: 4e3,
      Rifle: 2e3,
      LaserGun: 0,
      LinkGun: 0,
      AK47: 0,
      Chainsaw: 0,
      DesertEagle: 0,
      Minigun: 0,
      X75: 0,
      MAC10: 0,
      Bow: 300,
      RocketLauncher: 0,
      Carbine: 0,
      BoomerangGun: 0,
      M60: 4e3,
      Uzi: 0,
      Bouncyball: 0
    }
  };

  // src/hookModMenu.ts
  function hookModMenu() {
    const menu = App.Layer.memberMenu;
    menu.memberButton.parent.removeChild(menu.memberButton);
    menu.clanButton.parent.removeChild(menu.clanButton);
    let menuClanState = 0;
    menu.memberclanButton = new MemberMenuButton("", 16763904, 18);
    menu.memberclanButton.x = 0;
    menu.memberclanButton.y = menu.rankingButton.y + 70;
    menu.memberclanButton.on(MemberMenuButton.BUTTON_PRESSED, () => {
      if (!["member", "clan"].includes(App.Layer.memberMenu.mode))
        menuClanState = 0;
      menuClanState++;
      if (menuClanState == 3)
        menuClanState = 0;
      title1.tint = title2.tint = config_default.Colors.yellow;
      switch (menuClanState) {
        case 0:
          menu.emit(Layer.Events.MENU_ACCESS);
          break;
        case 1:
          menu.emit(Layer.Events.MEMBER_ACCESS);
          title1.tint = config_default.Colors.green;
          break;
        case 2:
          menu.emit(Layer.Events.CLAN_BROWSER_ACCESS);
          title2.tint = config_default.Colors.green;
          break;
      }
    });
    menu.memberButton.setActive = (n) => {
      if (menuClanState == 1 || !menuClanState && !n) {
        menu.memberclanButton.setActive(n);
        if (!n)
          title1.tint = config_default.Colors.yellow;
      }
    };
    menu.clanButton.setActive = (n) => {
      if (menuClanState == 2 || !menuClanState && !n) {
        menu.memberclanButton.setActive(n);
        if (!n)
          title2.tint = config_default.Colors.yellow;
      }
    };
    const ico1 = new PIXI.Sprite(App.CombinedTextures["menu_icon_players"]);
    ico1.x = 0.25 * menu.memberclanButton.rectWidth;
    menu.memberclanButton.addChild(ico1);
    const ico2 = new PIXI.Sprite(App.CombinedTextures["menu_icon_clans"]);
    ico2.x = 0.75 * menu.memberclanButton.rectWidth;
    menu.memberclanButton.addChild(ico2);
    ico1.scale.x = ico1.scale.y = ico2.scale.x = ico2.scale.y = 0.25;
    ico1.anchor.x = ico1.anchor.y = ico2.anchor.x = ico2.anchor.y = 0.5;
    ico1.tint = ico2.tint = config_default.Colors.white;
    ico1.y = ico2.y = 0.37 * menu.memberclanButton.rectHeight;
    const icosep = new PIXI.Text("/", {
      fontSize: 16,
      fontName: "Arial",
      fill: config_default.Colors.white,
      lineJoin: "round",
      strokeThickness: 3
    });
    icosep.x = 0.5 * menu.memberclanButton.rectWidth;
    icosep.y = 0.37 * menu.memberclanButton.rectHeight;
    icosep.anchor.x = icosep.anchor.y = 0.5;
    menu.memberclanButton.addChild(icosep);
    const title1 = new PIXI.Text("Players", {
      fontSize: 11,
      fontName: "Arial",
      fill: config_default.Colors.white,
      lineJoin: "round",
      strokeThickness: 2
    });
    title1.x = 0.25 * menu.memberclanButton.rectWidth;
    menu.memberclanButton.addChild(title1);
    const title2 = new PIXI.Text("Clans", {
      fontSize: 14,
      fontName: "Arial",
      fill: config_default.Colors.white,
      lineJoin: "round",
      strokeThickness: 2
    });
    title2.x = 0.75 * menu.memberclanButton.rectWidth;
    menu.memberclanButton.addChild(title2);
    const titlesep = new PIXI.Text("/", {
      fontSize: 16,
      fontName: "Arial",
      fill: config_default.Colors.white,
      lineJoin: "round",
      strokeThickness: 3
    });
    titlesep.x = 0.5 * menu.memberclanButton.rectWidth;
    menu.memberclanButton.addChild(titlesep);
    title1.y = title2.y = titlesep.y = 0.7 * menu.memberclanButton.rectHeight;
    title1.anchor.x = title1.anchor.y = title2.anchor.x = title2.anchor.y = titlesep.anchor.x = titlesep.anchor.y = 0.5;
    title1.tint = title2.tint = config_default.Colors.yellow;
    menu.container.addChild(menu.memberclanButton);
    const setActive = menu.clanButton.setActive.bind(menu.clanButton);
    menu.clanButton.setActive = (n) => {
      setActive(n);
      if (!n)
        menu.utilsButton.setActive(0);
    };
    menu.utilsButton = new MemberMenuButton("Mods", 16763904, 15, "gears_icon");
    menu.utilsButton.x = 0;
    menu.utilsButton.y = menu.memberButton.y + 70;
    menu.utilsButton.on(MemberMenuButton.BUTTON_PRESSED, () => {
      if (menu.utilsButton.active) {
        menu.utilsButton.setActive(0);
        menu.emit(Layer.Events.MENU_ACCESS);
        return;
      }
      menu.emit(Layer.Events.MENU_ACCESS);
      menu.playButton.setActive(0);
      menu.utilsButton.setActive(1);
      App.Layer.modsMenu.show();
      App.Layer.addChild(App.Layer.modsMenu);
      App.Layer.emit(Layer.Events.HIDE_MENU);
      app.onResize();
    });
    menu.utilsButton.icon.scale.x = menu.utilsButton.icon.scale.y = 0.7;
    menu.container.addChild(menu.utilsButton);
    class ModsMenu extends Feature {
      ox = 0;
      oy = 0;
      off = 0;
      marginLeft = 0;
      background = new PIXI.Graphics();
      closeButton = new ImgButton();
      pmTitle = new PIXI.Text("Mods", {
        fontName: "Arial",
        fontSize: 19,
        lineHeight: 16,
        fill: config_default.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round"
      });
      constructor() {
        super();
        this.background.interactive = true;
        this.background.x = 0;
        this.background.y = 40;
        this.background.lineStyle(1, 16777215, 0.1, 0);
        this.background.beginFill(3355443, 0.9);
        this.background.drawRect(0, 0, 660, 524);
        this.background.endFill();
        this.background.beginFill(0, 0.3);
        this.background.drawRect(10, 10, 640, 504);
        this.background.endFill();
        this.background.drawRect(15, 42, 630, 2);
        this.container.addChild(this.background);
        this.ox = 10;
        this.oy = 60;
        this.closeButton.x = this.background.width - 40;
        this.closeButton.y = this.oy - 6;
        this.closeButton.scale.x = this.closeButton.scale.y = 0.8;
        this.closeButton.on(ImgButton.CLICK, () => App.Layer.memberMenu.emit(Layer.Events.MENU_ACCESS));
        this.container.addChild(this.closeButton);
        this.pmTitle.x = 0.5 * this.width - 20;
        this.pmTitle.y = this.oy - 4;
        this.pmTitle.anchor.x = 0.5;
        this.container.addChild(this.pmTitle);
        this.container.x = 0.5 * -this.width;
        this.reposition();
      }
      reposition() {
        this.off = 0;
      }
      show() {
      }
    }
    App.Layer.mainMenuHides.push(App.Layer.modsMenu = new ModsMenu());
    [
      "loginMenu",
      "memberBrowserMenu",
      "clanBrowserMenu",
      "registerMenu",
      "upResetMenu",
      "profileMenu",
      "userMenu",
      "rankingMenu",
      "newsMenu",
      "partnerMenu",
      "serverListMenu",
      "clanMenu",
      "serverCreationMenu",
      "renameMenu",
      "logoutMenu",
      "guestProfileMenu"
    ].forEach((e) => App.Layer[e].hides.push(App.Layer.modsMenu));
    App.Layer.features.push(App.Layer.modsMenu);
  }

  // src/index.ts
  Ninja_default.mods.forEach((m) => m.loadon == "pagestart" && m.load());
  var tester = setInterval(() => {
    try {
      if (!app || !app.menu || !app.menu.joinButton || typeof app.status.updating !== "boolean" || !APIClient || !APIClient.postCreateGame)
        return;
    } catch {
      return;
    }
    clearInterval(tester);
    Ninja_default.ready = true;
    hookModMenu();
    Ninja_default.mods.forEach((m) => m.loadon == "appstart" && m.load());
  });
})();
