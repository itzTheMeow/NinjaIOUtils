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
  

  // src/config.ts
  var config_default = {
    ver: "2.0",
    api: "https://nutils.itsmeow.cat",
    customDelimiter: "__custom",
    settingsKey: "nutils_settings",
    Colors: {
      black: 0,
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

  // src/api/Settings.ts
  var Settings = class {
    constructor(key = "niou_settings", defaults) {
      this.key = key;
      this.defaults = defaults;
    }
    getStore() {
      return JSON.parse(localStorage.getItem(this.key) || "{}");
    }
    get(key) {
      return this.getStore()[key] ?? this.defaults[key];
    }
    set(key, value) {
      return localStorage.setItem(this.key, JSON.stringify({ ...this.getStore(), [key]: value }));
    }
  };

  // src/api/Ninja.ts
  var Ninja_default = new class Ninja {
    settings = new Settings(config_default.settingsKey, {
      enabledMods: []
    });
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
    isInstalled() {
      return this.details.core || Ninja_default.settings.get("enabledMods").includes(this.id);
    }
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
  
  

  // src/ui/scrollbar.ts
  
  
  function Scrollbar() {
    class _Scrollbar extends PIXI.Container {
      constructor(h, start = 0) {
        super();
        this.h = h;
        this.start = start;
        this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
        this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
        this.scrollBar.endFill();
        this.scrollBar.x = 0;
        this.scrollBar.y = 0;
        this.scrollBar.interactive = true;
        this.scrollBar.alpha = 0.5;
        this.addChild(this.scrollBar);
        this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
        this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
        this.scrollButton.beginFill(16777215, 0.2);
        this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
        this.scrollButton.endFill();
        this.scrollButton.hitArea = new PIXI.Rectangle(0, 0, 0, 0);
        this.addChild(this.scrollButton);
        this.scrollButton.x = 2;
        this.scrollButton.y = -3 + (this.h - 39) * this.start;
        this.scrollBar.on("mouseover", () => {
          this.scrollBar.alpha = 1;
        });
        this.scrollBar.on("mouseout", () => {
          this.scrollBar.alpha = 0.5;
        });
        this.scrollBar.on("mouseupoutside", () => {
          this.scrolling = false;
        });
        this.scrollBar.on("mousedown", (c) => {
          c.stopPropagation();
          this.scrolling = true;
          this.oy = c.data.global.y / App.Scale;
        });
        this.scrollBar.on("mouseup", (c) => {
          c.stopPropagation();
          this.scrolling = false;
        });
        this.scrollBar.on("mousemove", (c) => {
          this.scroll(c.data.global.y / App.Scale);
        });
        this.scrollBar.on("pointerup", () => {
          this.scrolling = false;
        });
        this.scrollBar.on("pointerupoutside", () => {
          this.scrolling = false;
        });
        this.scrollBar.on("pointerdown", (c) => {
          this.scrolling = true;
          this.oy = c.data.global.y / App.Scale;
          this.scroll(c.data.global.y / App.Scale);
        });
        this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
        this.wheelListener = (c) => {
          this.scrolling = true;
          this.scroll(this.oy + 0.2 * c.data.delta);
          this.scrolling = false;
        };
      }
      scrolling = false;
      oy = 0;
      scrollBar = new PIXI.Graphics();
      scrollButton = new PIXI.Graphics();
      wheelListener;
      enableWheel() {
        UserInput.hasListener(UserInput.WHEEL, this.wheelListener) || UserInput.addListener(UserInput.WHEEL, this.wheelListener);
      }
      disableWheel() {
        UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
      }
      scroll(a) {
        if (this.scrolling) {
          let b = this.scrollButton.y + (a - this.oy);
          -3 > b ? b = -3 : b > this.h - 39 && (b = this.h - 39);
          let c = this.h / (this.h - 39);
          this.scrollButton.y = b;
          this.oy = a;
          this.emit(Scrollbar2.SCROLL, 1 / this.h * (b + 3) * c);
        }
      }
      reset() {
        this.scrollButton.y = -3 + (this.h - 39) * this.start;
      }
      onMouseOver() {
        this.scrollButton.alpha = 1;
      }
      onMouseOut() {
        this.scrollButton.alpha = 0.5;
      }
    }
    const Scrollbar2 = _Scrollbar;
    Scrollbar2.SCROLL = "scroll";
    return Scrollbar2;
  }

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
      showInstalled = false;
      modItemHeight = 110;
      background = new PIXI.Graphics();
      closeButton = new ImgButton();
      titleText = new PIXI.Text("Mods", FontStyle.MediumOrangeText);
      modContainer = new PIXI.Container();
      filterBox = new Checkbox("filter", "Show Installed", this.showInstalled);
      scroller = new (Scrollbar())(460);
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
        this.marginLeft += 20;
        this.marginTop = this.titleText.height * 3.25;
        this.filterBox.x = this.marginLeft + 6;
        this.filterBox.y = this.marginTop;
        this.filterBox.addEventListener(Checkbox.CHANGE, () => {
          this.showInstalled = this.filterBox.checked;
          this.indexList();
        });
        this.container.addChild(this.filterBox);
        this.marginTop += this.filterBox.height + 8;
        this.modContainer.x = this.marginLeft;
        this.modContainer.y = this.marginTop;
        this.container.addChild(this.modContainer);
        this.scroller.x = this.width - this.scroller.width * 1.75;
        this.scroller.y = this.titleText.height * 3 + 2;
        this.scroller.on(Scrollbar().SCROLL, (prog) => {
          this.scrollTop = prog;
          this.indexList();
        });
        this.container.addChild(this.scroller);
        this.container.x = 0.5 * -this.width;
        this.reposition();
      }
      reposition() {
        this.marginTop = 0;
      }
      constructModItem(mod) {
        const iconSize = 52, maxDesc = 150, container = new PIXI.Graphics();
        container.beginFill(config_default.Colors.white, 0.1);
        container.drawRoundedRect(0, 0, 620 - this.scroller.width, this.modItemHeight, 6);
        container.endFill();
        let pl = 0, pt = 0;
        const icon = new PIXI.Graphics();
        icon.beginFill(config_default.Colors.black, 0.2);
        icon.drawRoundedRect(pl += 10, pt = pl, iconSize, iconSize, 8);
        icon.endFill();
        const iconSprite = new PIXI.Sprite(App.CombinedTextures[mod.details.icon]);
        iconSprite.width = iconSprite.height = iconSize - 10;
        iconSprite.anchor.x = iconSprite.anchor.y = 0.5;
        iconSprite.x = iconSize / 2 + pl;
        iconSprite.y = iconSize / 2 + pt;
        icon.addChild(iconSprite);
        container.addChild(icon);
        const label = new PIXI.Text(mod.name, { ...FontStyle.ClanTitle, fontSize: 30 });
        label.x = pl += iconSize + 4;
        label.y = pt += 8;
        container.addChild(label);
        const authorLabel = new PIXI.Text(mod.details.author == "builtin" ? "(Built-In)" : "by " + mod.details.author, { ...FontStyle.SmallMenuTextYellow, fontSize: 20 });
        authorLabel.x = pl + label.width + 4;
        authorLabel.y = pt + 5;
        container.addChild(authorLabel);
        const description = new PIXI.Text((mod.details.description.slice(0, maxDesc) + (mod.details.description.length > maxDesc ? "..." : "")).trim(), { ...FontStyle.SmallMenuTextWhite2, wordWrap: true, wordWrapWidth: 600 });
        description.x = pl = 12;
        description.y = pt += iconSize - 2;
        container.addChild(description);
        return container;
      }
      scrollTop = 0;
      maxMods = 3;
      show() {
        this.scroller.enableWheel();
        this.indexList();
      }
      indexList() {
        const mods = Ninja_default.mods.filter((m) => this.showInstalled ? m.isInstalled() : true), top = Math.round((mods.length - this.maxMods) * this.scrollTop);
        this.modContainer.removeChildren();
        mods.sort((m1, m2) => m1.name.toLowerCase() > m2.name.toLowerCase() ? 1 : -1).slice(top, top + this.maxMods).forEach((m, i) => {
          const item = this.constructModItem(m);
          item.y = (this.modItemHeight + 8) * i;
          this.modContainer.addChild(item);
        });
      }
      hide() {
        this.scroller.disableWheel();
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

  // src/mods/index.ts
  var mods_exports = {};
  __export(mods_exports, {
    FPSDisplayMod: () => FPSDisplayMod,
    HotkeyMessagesMod: () => HotkeyMessagesMod
  });

  // src/mods/fpsDisplay.ts
  var FPSDisplayMod = class extends Mod {
    constructor() {
      super({
        id: "FPSDisplay",
        name: "FPS Display",
        author: "Meow",
        description: "Displays your FPS and ping at the top of the screen.",
        icon: "energy_icon"
      });
    }
  };

  // src/mods/hotkeyMessages.ts
  var HotkeyMessagesMod = class extends Mod {
    constructor() {
      super({
        id: "HotkeyMessages",
        name: "Hotkey Messages",
        author: "Anna",
        description: "Lets you send pre-defined messages in chat using hotkeys.",
        icon: "chat-ingame"
      });
    }
  };

  // src/index.ts
  Object.values(coremods_exports).forEach((mod) => Ninja_default.registerMod(new mod()));
  Object.values(mods_exports).forEach((mod) => Ninja_default.registerMod(new mod()));
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
