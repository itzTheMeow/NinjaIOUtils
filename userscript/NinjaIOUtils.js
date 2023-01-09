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
  var __defProp = Object.defineProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/index.ts
  
  

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
    registerMod(mod) {
      this.mods.push(mod);
      if (mod.details.core)
        this.loadMod(mod.id);
    }
    loadMod(id) {
      const mod = this.mods.find((m) => m.id == id);
      if (!mod || mod.loaded)
        return;
      if (this.ready && mod.loadon == "appstart")
        mod.load();
      else if (mod.loadon == "pagestart")
        mod.load();
    }
    log(text, color) {
      if (this.ready)
        App.Console.log(text, color);
      else
        console.log(text);
    }
  }();

  // src/coremods/index.ts
  var coremods_exports = {};
  __export(coremods_exports, {
    ShareURLMod: () => ShareURLMod
  });

  // src/api/Mod.ts
  var Mod = class {
    constructor(details) {
      this.details = details;
    }
    get id() {
      return this.details.id;
    }
    get name() {
      return this.details.name;
    }
    loaded = false;
    loadon = "appstart";
    load() {
      this.log(`Loaded successfully!`);
      this.loaded = true;
    }
    log(text, color) {
      Ninja_default.log(`[${this.id}] ${text}`, color);
    }
  };

  // src/coremods/shareURLs.ts
  var ShareURLMod = class extends Mod {
    constructor() {
      super({
        id: "ShareURL",
        name: "Share URLs",
        description: "Allows other players to join your game by providing a link.",
        author: "builtin",
        icon: "menu_icon_players",
        core: true
      });
    }
  };

  // src/hookModMenu.ts
  
  

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
    const memberclanButton = new MemberMenuButton("", 16763904, 18);
    memberclanButton.x = 0;
    memberclanButton.y = menu.rankingButton.y + 70;
    memberclanButton.on(MemberMenuButton.BUTTON_PRESSED, () => {
      if (!["member", "clan"].includes(App.Layer.memberMenu.mode))
        menuClanState = 0;
      menuClanState++;
      if (menuClanState == 3)
        menuClanState = 0;
      title1.style.fill = title2.style.fill = FontStyle.MenuTitle.fill;
      switch (menuClanState) {
        case 0:
          menu.emit(Layer.Events.MENU_ACCESS);
          break;
        case 1:
          menu.emit(Layer.Events.MEMBER_ACCESS);
          title1.style.fill = config_default.Colors.white;
          break;
        case 2:
          menu.emit(Layer.Events.CLAN_BROWSER_ACCESS);
          title2.style.fill = config_default.Colors.white;
          break;
      }
    });
    menu.memberButton.setActive = (n) => {
      if (menuClanState == 1 || !menuClanState && !n) {
        memberclanButton.setActive(n);
        if (!n)
          title1.style.fill = FontStyle.MenuTitle.fill;
      }
    };
    menu.clanButton.setActive = (n) => {
      if (menuClanState == 2 || !menuClanState && !n) {
        memberclanButton.setActive(n);
        if (!n)
          title2.style.fill = FontStyle.MenuTitle.fill;
      }
    };
    const ico1 = new PIXI.Sprite(App.CombinedTextures["menu_icon_players"]);
    ico1.x = 0.25 * memberclanButton.rectWidth;
    memberclanButton.addChild(ico1);
    const ico2 = new PIXI.Sprite(App.CombinedTextures["menu_icon_clans"]);
    ico2.x = 0.75 * memberclanButton.rectWidth;
    memberclanButton.addChild(ico2);
    ico1.scale.x = ico1.scale.y = ico2.scale.x = ico2.scale.y = 0.25;
    ico1.anchor.x = ico1.anchor.y = ico2.anchor.x = ico2.anchor.y = 0.5;
    ico1.tint = ico2.tint = config_default.Colors.white;
    ico1.y = ico2.y = 0.37 * memberclanButton.rectHeight;
    const icosep = new PIXI.Text("/", {
      ...FontStyle.MenuTitle,
      fontSize: 16,
      fill: config_default.Colors.white
    });
    icosep.x = 0.5 * memberclanButton.rectWidth;
    icosep.y = 0.37 * memberclanButton.rectHeight;
    icosep.anchor.x = icosep.anchor.y = 0.5;
    memberclanButton.addChild(icosep);
    const title1 = new PIXI.Text("Players", {
      ...FontStyle.MenuTitle,
      fontSize: 10
    });
    title1.x = 0.25 * memberclanButton.rectWidth;
    memberclanButton.addChild(title1);
    const title2 = new PIXI.Text("Clans", {
      ...FontStyle.MenuTitle,
      fontSize: 14
    });
    title2.x = 0.75 * memberclanButton.rectWidth;
    memberclanButton.addChild(title2);
    const titlesep = new PIXI.Text("/", {
      ...FontStyle.MenuTitle,
      fontSize: 14,
      fill: config_default.Colors.white
    });
    titlesep.x = 0.5 * memberclanButton.rectWidth;
    memberclanButton.addChild(titlesep);
    title1.y = title2.y = titlesep.y = 0.7 * memberclanButton.rectHeight;
    title1.anchor.x = title1.anchor.y = title2.anchor.x = title2.anchor.y = titlesep.anchor.x = titlesep.anchor.y = 0.5;
    menu.container.addChild(memberclanButton);
    const setActive = menu.clanButton.setActive.bind(menu.clanButton);
    menu.clanButton.setActive = (n) => {
      setActive(n);
      if (!n)
        utilsButton.setActive(false);
    };
    const utilsButton = new MemberMenuButton("Mods", 16763904, 15, "gears_icon");
    utilsButton.x = 0;
    utilsButton.y = menu.memberButton.y + 70;
    utilsButton.on(MemberMenuButton.BUTTON_PRESSED, () => {
      if (utilsButton.active) {
        utilsButton.setActive(false);
        menu.emit(Layer.Events.MENU_ACCESS);
        return;
      }
      menu.emit(Layer.Events.MENU_ACCESS);
      menu.playButton.setActive(false);
      utilsButton.setActive(true);
      modsMenu.show();
      App.Layer.addChild(modsMenu);
      App.Layer.emit(Layer.Events.HIDE_MENU);
      app.onResize();
    });
    utilsButton.icon.scale.x = utilsButton.icon.scale.y = 0.7;
    menu.container.addChild(utilsButton);
    class ModsMenu extends Feature {
      ox = 40;
      oy = 20;
      marginTop = 0;
      marginLeft = 0;
      background = new PIXI.Graphics();
      closeButton = new ImgButton();
      titleText = new PIXI.Text("Mods", FontStyle.MediumOrangeText);
      modContainer = new PIXI.Container();
      modItemContainer = new PIXI.Container();
      modItemTitle = new PIXI.Text("Mod Title", { ...FontStyle.MediumOrangeText, fontSize: 32 });
      modItemAuthor = new PIXI.Text("By Author", FontStyle.ButtonTitle);
      modItemDescription = new PIXI.Text("Long description text.", FontStyle.SmallMenuTextWhite);
      constructor() {
        super();
        this.background.x = 0;
        this.background.y = 40;
        this.background.lineStyle(1, 16777215, 0.1, 0);
        this.background.beginFill(3355443, 1);
        this.background.drawRect(0, 0, 660, 524);
        this.background.endFill();
        this.background.beginFill(0, 0.3);
        this.background.drawRect(10, 10, 640, 504);
        this.background.endFill();
        this.background.drawRect(15, 42, 630, 2);
        this.container.addChild(this.background);
        this.titleText.x = 0.5 * this.width - 20;
        this.titleText.y = this.oy + 36;
        this.titleText.anchor.x = 0.5;
        this.titleText.resolution = 2;
        this.container.addChild(this.titleText);
        this.closeButton = new ImgButton();
        this.closeButton.x = this.background.width - 40;
        this.closeButton.y = this.oy + 34;
        this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
        this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.RANKING_CANCEL));
        this.container.addChild(this.closeButton);
        this.container.x = 0.5 * -this.width;
        this.marginLeft += 12;
        this.marginTop = this.titleText.height * 4;
        this.modContainer.x = this.marginLeft;
        this.modContainer.y = this.marginTop;
        this.container.addChild(this.modContainer);
        this.modItemContainer.x = this.marginLeft;
        this.modItemContainer.y = this.marginTop;
        this.modItemContainer.visible = false;
        this.modItemContainer.x = this.marginLeft;
        this.container.addChild(this.modItemContainer);
        this.container.addChild(this.modItemTitle);
        this.container.addChild(this.modItemAuthor);
        this.container.addChild(this.modItemDescription);
        this.reposition();
      }
      reposition() {
        this.marginTop = 0;
      }
      constructModItem(mod) {
        const container = new PIXI.Graphics();
        container.beginFill(config_default.Colors.white, 0.1);
        container.drawRoundedRect(0, 0, 630, 50, 4);
        container.endFill();
        const label = new PIXI.Text(mod.name, FontStyle.ProfileTabText);
        container.addChild(label);
        return container;
      }
      show() {
        this.modContainer.visible = true;
        this.modItemContainer.visible = false;
        this.modContainer.removeChildren();
        Ninja_default.mods.forEach((m) => this.modContainer.addChild(this.constructModItem(m)));
      }
      showMod(mod) {
        this.modItemContainer.visible = true;
        this.modContainer.visible = false;
        this.modItemTitle.text = mod.name + (mod.details.core ? " (Built-In)" : "");
        this.modItemDescription.text = mod.details.description;
        this.modItemAuthor.text = `By ${mod.details.author}`;
      }
    }
    const modsMenu = new ModsMenu();
    App.Layer.mainMenuHides.push(modsMenu);
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
    ].forEach((e) => App.Layer[e].hides.push(modsMenu));
    App.Layer.features.push(modsMenu);
  }

  // src/index.ts
  Object.values(coremods_exports).forEach((mod) => Ninja_default.registerMod(new mod()));
  Ninja_default.mods.forEach((m) => m.loadon == "pagestart" && m.load());
  var tester = setInterval(() => {
    try {
      if (!app || !app.menu || !app.menu.joinButton || JSON.stringify(app.status) == "{}" || !APIClient || !APIClient.postCreateGame)
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
