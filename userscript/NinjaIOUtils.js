// ==UserScript==
// @name         Ninja.io Utils
// @namespace    https://itsmeow.cat
// @version      1.27
// @description  Some small QOL improvements to ninja.io!
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
// @grant        none
// ==/UserScript==

/*
  This file was generated automatically by a build script!
  If you want to see the source code, view it on github:
  > https://github.com/itzTheMeow/NinjaIOUtils
*/

(() => {
  // src/config.ts
  var config_default = {
    ver: "1.27",
    api: "https://nutils.itsmeow.cat",
    customDelimiter: "__custom",
    actualGameVersion: document.querySelector(`script[src*="game.js"]`)?.src.split("/").pop()?.split("?v=")?.[1] || (() => {
      try {
        return App.ClientVersion;
      } catch {
        return "unknown";
      }
    })(),
    PacketTypeMap: {
      systemMessage: "w",
      chatSend: "x",
      findMatch: "h",
      joinMatch: "j",
      data: "d",
      data2: "p",
      joinedMessage: "i"
    },
    Colors: {
      green: 8978312,
      red: 12603201,
      yellow: 16763904,
      white: 13421772,
      dotGreen: 65280,
      dotOrange: 16757012,
      dotGrey: 8947848
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
    }
  };

  // src/applySettingsHook.ts
  function applySettingsHook() {
    Manager.prototype._applySettings = Manager.prototype.applySettings;
    Manager.prototype.applySettings = function(s) {
      this.isRanked = s.ranked;
      return this._applySettings(s);
    };
  }

  // src/settings/settings.ts
  var settingsKey = "ninjaioutils";
  var SETTINGS = {
    ...{
      uiScale: 0,
      showFPS: true,
      texturePack: null,
      typewriter: false,
      apiKey: "",
      appearOnline: true,
      enableHotkeyMessages: true,
      hotkeyMessages: []
    },
    ...JSON.parse(localStorage.getItem(settingsKey) || "{}")
  };
  var saveSettings = () => {
    localStorage.setItem(settingsKey, JSON.stringify(SETTINGS));
  };

  // src/settings/settingsTabGraphics.ts
  function hookGraphicsSettingsTab() {
    app.menu.settingsPanel.graphicsTab.addChild(app.menu.settingsPanel.graphicsTab.fpsDisplay = new Checkbox("showFPS", "Show FPS Display", true));
    app.menu.settingsPanel.graphicsTab.fpsDisplay.x = app.menu.settingsPanel.graphicsTab.enableAA.x;
    app.menu.settingsPanel.graphicsTab.fpsDisplay.y = app.menu.settingsPanel.graphicsTab.enableAA.y + app.menu.settingsPanel.graphicsTab.enableAA.height + 14;
    app.menu.settingsPanel.graphicsTab.fpsDisplay.on(Checkbox.CHANGE, function(b) {
      SETTINGS.showFPS = b;
      saveSettings();
      if (frameDisplay.style.display == "none" && SETTINGS.showFPS)
        showFPS();
    });
    app.menu.settingsPanel.graphicsTab.fpsDisplay.setChecked(SETTINGS.showFPS);
    app.menu.settingsPanel.graphicsTab.addChild(app.menu.settingsPanel.graphicsTab.uiScaler = new Slider("chatOpacity", "UI scale", SETTINGS.uiScale || 0.4, 2, 0.4));
    if (!SETTINGS.uiScale)
      app.menu.settingsPanel.graphicsTab.uiScaler.valueLabel.text = "default";
    app.menu.settingsPanel.graphicsTab.uiScaler.x = app.menu.settingsPanel.graphicsTab.fpsDisplay.x;
    app.menu.settingsPanel.graphicsTab.uiScaler.y = app.menu.settingsPanel.graphicsTab.fpsDisplay.y + app.menu.settingsPanel.graphicsTab.fpsDisplay.height + 14;
    app.menu.settingsPanel.graphicsTab.uiScaler.on(Slider.CHANGE, (b) => {
      b = Math.round(b * 10) / 10;
      if (b == 0.4) {
        app.menu.settingsPanel.graphicsTab.uiScaler.valueLabel.text = "default";
        b = 0;
      }
      if (b == SETTINGS.uiScale)
        return;
      App.NUIScale = SETTINGS.uiScale = b;
      saveSettings();
      app.onResize();
      const conf = document.createElement("div");
      const confy = document.createElement("button");
      confy.innerHTML = "OK";
      confy.onclick = () => conf.remove();
      conf.appendChild(confy);
      const confn = document.createElement("button");
      confn.innerHTML = "Undo";
      confn.onclick = () => {
        App.NUIScale = SETTINGS.uiScale = 0;
        saveSettings();
        app.onResize();
        conf.remove();
      };
      confn.style.marginLeft = "0.3rem";
      conf.appendChild(confn);
      conf.style.position = "absolute";
      conf.style.top = "50%";
      conf.style.left = "50%";
      conf.style.transform = "translate(-50%,-50%)";
      conf.style.backgroundColor = "rgba(0,0,0,0.8)";
      conf.style.padding = "0.5rem";
      document.body.appendChild(conf);
    });
  }

  // src/settings/settingsTabSound.ts
  function hookSoundSettingsTab() {
    app.menu.settingsPanel.soundTab.addChild(app.menu.settingsPanel.soundTab.typewriter = new Checkbox("typewriter", "Enable Typing Noise", true));
    app.menu.settingsPanel.soundTab.typewriter.x = app.menu.settingsPanel.soundTab.volumeSlider.x;
    app.menu.settingsPanel.soundTab.typewriter.y = app.menu.settingsPanel.soundTab.volumeSlider.y + app.menu.settingsPanel.soundTab.volumeSlider.height + 14;
    app.menu.settingsPanel.soundTab.typewriter.on(Checkbox.CHANGE, function(b) {
      SETTINGS.typewriter = b;
      saveSettings();
    });
    app.menu.settingsPanel.soundTab.typewriter.setChecked(SETTINGS.typewriter);
  }

  // src/Scrollbar.ts
  function getScrollbar() {
    class _Scrollbar extends PIXI.Container {
      constructor(h, start = 0) {
        super();
        this.h = h;
        this.start = start;
        this.scrolling = false;
        this.oy = 0;
        this.scrollBar = new PIXI.Graphics();
        this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
        this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
        this.scrollBar.endFill();
        this.scrollBar.x = 0;
        this.scrollBar.y = 0;
        this.scrollBar.interactive = true;
        this.scrollBar.alpha = 0.5;
        this.addChild(this.scrollBar);
        this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
        this.scrollButton = new PIXI.Graphics();
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
      scrollBar;
      scrollButton;
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
          this.emit(Scrollbar.SCROLL, 1 / this.h * (b + 3) * c);
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
    const Scrollbar = _Scrollbar;
    Scrollbar.SCROLL = "scroll";
    return Scrollbar;
  }

  // src/settings/settingsTabTex.ts
  function getTexTab() {
    const maxPacks = 5;
    class TexTab extends PIXI.Container {
      constructor() {
        super();
        const tab = this;
        EventDispatcher.call(this);
        this.marginLeft = 40;
        this.marginTop = 52;
        this.off = this.marginTop + 6;
        this.texTitle = new PIXI.Text("Texture packs", {
          fontName: "Arial",
          fontSize: 18,
          lineHeight: 18,
          fill: config_default.Colors.yellow,
          strokeThickness: 3,
          lineJoin: "round"
        });
        this.texTitle.x = this.marginLeft - 5;
        this.texTitle.y = this.off;
        this.addChild(this.texTitle);
        this.texHint = new PIXI.Text("(make sure to click save)", {
          fontName: "Arial",
          fontSize: 14,
          fill: config_default.Colors.white,
          strokeThickness: 2,
          lineJoin: "round"
        });
        this.texHint.x = this.texTitle.x + this.texTitle.width + 3;
        this.texHint.y = this.off + 2;
        this.addChild(this.texHint);
        this.off += 4;
        const off = this.off;
        this.packIndex = 0;
        !(this.runPacks = async () => {
          this.off = off;
          if (this.hadPacks)
            this.hadPacks.map((p) => p.destroy());
          this.hadPacks = [];
          const packs = this.packList || (this.packList = await fetch(`${config_default.api}/packs`).then((r) => r.json()));
          packs.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).slice(this.packIndex, this.packIndex + maxPacks).forEach((pak) => {
            const hasPack = SETTINGS.texturePack == pak.id;
            const packName = new PIXI.Text(`${pak.name || "Texture Pack"} (by ${pak.author || "Unnamed"})`, {
              fontName: "Arial",
              fontSize: 16,
              fill: config_default.Colors.white,
              strokeThickness: 2,
              lineJoin: "round"
            });
            packName.x = this.marginLeft;
            packName.y = this.off += 28;
            this.hadPacks.push(this.addChild(packName));
            const flags = [];
            if (pak.hasCombined)
              flags.push("textures");
            if (pak.hasSeamless)
              flags.push("terrain");
            const packDescription = new PIXI.Text(`${pak.description || "No Description."} (${flags.join(", ")})`, {
              fontName: "Arial",
              fontSize: 14,
              fill: config_default.Colors.white,
              strokeThickness: 2,
              lineJoin: "round"
            });
            packDescription.x = this.marginLeft;
            packDescription.y = this.off += packName.height + 2;
            this.hadPacks.push(this.addChild(packDescription));
            const packButton = new Button(`pack_btn_${pak.id}`);
            packButton.x = packName.x + packName.width + 12;
            packButton.y = this.off - packName.height;
            packButton.setText(hasPack ? "Remove" : "Use");
            packButton.setTint(hasPack ? config_default.Colors.red : config_default.Colors.green);
            packButton.scale.x = packButton.scale.y = 0.5;
            packButton.addListener(Button.BUTTON_RELEASED, async () => {
              SETTINGS.texturePack = hasPack ? null : pak.id;
              app.menu.settingsPanel.controlsTab.forceRefresh = true;
              saveSettings();
              this.runPacks();
            });
            this.hadPacks.push(this.addChild(packButton));
          });
        })();
      }
    }
    TexTab.prototype.onShow = function() {
      if (!this.scroller) {
        const off = this.parent.texTabButton.height + 32;
        this.scroller = new (getScrollbar())(this.parent.height - off - 12 - this.parent.applyButton.height);
        this.scroller.x = this.parent.width - this.scroller.width * 1.75;
        this.scroller.y = off;
        this.scroller.on(getScrollbar().SCROLL, (prog) => {
          this.packIndex = Math.round((this.packList.length - maxPacks) * prog);
          this.runPacks();
        });
        this.addChild(this.scroller);
      }
      this.scroller.enableWheel();
    };
    TexTab.prototype.onHide = function() {
      this.scroller.disableWheel();
    };
    return TexTab;
  }

  // src/hotkeyMessages.ts
  var isRateLimited = false;
  var registeredHotkeyMessages = new Map(SETTINGS.hotkeyMessages);
  async function handleKeyDown(e) {
    if (e.repeat)
      return;
    const isAltPressed = UserInput.pressed[18];
    const message = registeredHotkeyMessages.get(e.key);
    if (message && isAltPressed && SETTINGS.enableHotkeyMessages)
      sendChatMessage(message);
  }
  async function sendChatMessage(message) {
    if (!app.client.socket || isRateLimited)
      return;
    const binaryChatMessage = Client.compress({
      t: config_default.PacketTypeMap.chatSend,
      msg: message
    });
    app.client.socket.send(binaryChatMessage);
    isRateLimited = true;
    setTimeout(() => isRateLimited = false, 1e3 * 1.4);
  }

  // src/settings/settingsTabHotkeyMsgs.ts
  function getHotkeyMsgsTab() {
    class HotkeyMessagesTab extends PIXI.Container {
      constructor() {
        super();
        const tab = this;
        EventDispatcher.call(this);
        this.marginLeft = 40;
        this.marginTop = 52;
        this.off = this.marginTop + 6;
        this.hkmTitle = new PIXI.Text("Hotkey Messages", {
          fontName: "Arial",
          fontSize: 18,
          lineHeight: 18,
          fill: config_default.Colors.yellow,
          strokeThickness: 3,
          lineJoin: "round"
        });
        this.hkmTitle.x = this.marginLeft - 5;
        this.hkmTitle.y = this.off;
        this.addChild(this.hkmTitle);
        this.hkmHint = new PIXI.Text("(Use fullscreen to avoid conflics with browser hotkeys)", {
          fontName: "Arial",
          fontSize: 14,
          fill: config_default.Colors.white,
          strokeThickness: 2,
          lineJoin: "round"
        });
        this.hkmHint.x = this.hkmTitle.x + this.hkmTitle.width + 3;
        this.hkmHint.y = this.off + 2;
        this.addChild(this.hkmHint);
        this.enableHKM = new Checkbox("enableHKM", "Enable Hotkey Messages", true);
        this.enableHKM.x = this.marginLeft;
        this.enableHKM.y = this.off += 34;
        this.enableHKM.on(Checkbox.CHANGE, function(b) {
          SETTINGS.enableHotkeyMessages = b;
          saveSettings();
        });
        this.addChild(this.enableHKM);
        this.enableHKM.setChecked(SETTINGS.enableHotkeyMessages);
        const doHotkey = (key) => {
          const keyLabel = new PIXI.Text(`ALT + ${key.toUpperCase()}`, {
            fontName: "Arial",
            fontSize: 16,
            fill: config_default.Colors.yellow,
            strokeThickness: 3,
            lineJoin: "round"
          });
          keyLabel.x = this.marginLeft;
          keyLabel.y = this.off += 55;
          this.addChild(keyLabel);
          const keyText = new InputField(`${key}_hotkey`, false, 24);
          keyText.setDimensions(370, 35);
          keyText.forceLowerCase = false;
          keyText.setMaxChars(40);
          if (registeredHotkeyMessages.get(key))
            keyText.setText(registeredHotkeyMessages.get(key));
          keyText.x = 125;
          keyText.y = this.off - 6;
          keyText.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/.");
          keyText.addListener(InputField.CHANGE, function(d) {
            const message = d.data.value || "";
            registeredHotkeyMessages.set(key, message);
            SETTINGS.hotkeyMessages = [...registeredHotkeyMessages];
            saveSettings();
          });
          this.addChild(keyText);
        };
        ["a", "s", "d", "q", "w", "e"].forEach((k) => doHotkey(k));
      }
    }
    return HotkeyMessagesTab;
  }

  // src/settings/settingsTab.ts
  function settingsTab() {
    SettingsPanel.OPEN_TAB = "opened_settings_tab";
    if (!app.menu?.settingsPanel)
      return setTimeout(() => settingsTab(), 500);
    function SettingsPanelNew(w, h) {
      const pan = new SettingsPanel(w, h);
      function newTab(title, name, x, tab) {
        name = `${name}Tab`;
        pan[name] = new tab();
        pan[`${name}Button`] = new PIXI.Text(title, {
          fontName: "Arial",
          fontSize: 18,
          lineHeight: 18,
          fill: config_default.Colors.yellow,
          strokeThickness: 3,
          lineJoin: "round"
        });
        pan[`${name}Button`].resolution = 1.5 * App.DevicePixelRatio;
        pan[`${name}Button`].anchor.x = pan[`${name}Button`].anchor.y = 0.5;
        pan[`${name}Button`].x = x + 56;
        pan[`${name}Button`].y = 28;
        pan.addChild(pan[`${name}Button`]);
        pan[`${name}ButtonBackground`] = new PIXI.Graphics();
        pan[`${name}ButtonBackground`].beginFill(16777215, 0.1);
        pan[`${name}ButtonBackground`].drawRoundedRect(0, 0, 112, 30, 2);
        pan[`${name}ButtonBackground`].endFill();
        pan[`${name}ButtonBackground`].x = x;
        pan[`${name}ButtonBackground`].y = 12;
        pan[`${name}ButtonBackground`].interactive = true;
        pan[`${name}ButtonBackground`].on("touchstart", pan.displayTab.bind(pan, SettingsPanel.Tabs.UTIL));
        pan[`${name}ButtonBackground`].on("mousedown", pan.displayTab.bind(pan, SettingsPanel.Tabs.UTIL));
        pan[`${name}ButtonBackground`].on("mouseover", function() {
          pan[`${name}ButtonBackground`].tint = 11184810;
        });
        pan[`${name}ButtonBackground`].on("mouseout", function() {
          pan[`${name}ButtonBackground`].tint = 16777215;
        });
        pan.addChild(pan[`${name}ButtonBackground`]);
      }
      newTab("Texture Pack", "tex", 302, getTexTab());
      newTab("Messages", "hkm", 418, getHotkeyMsgsTab());
      return pan;
    }
    SettingsPanel.Tabs.TEX = "tex";
    SettingsPanel.Tabs.HKM = "hkm";
    const oldX = app.menu.settingsPanel.x, oldY = app.menu.settingsPanel.y;
    app.menu.settingsPanel.destroy();
    app.menu.settingsPanel = SettingsPanelNew(660, 524);
    app.menu.settingsPanel.x = oldX;
    app.menu.settingsPanel.y = oldY;
    app.menu.resize();
    app.menu.settingsPanel.displayTab = function(name) {
      AudioEffects.ButtonClick.audio.play();
      saveSettings();
      Object.values(SettingsPanel.Tabs).filter((t2) => t2 !== name).forEach((i) => {
        const t2 = this[`${i}Tab`];
        if (t2.parent) {
          if (t2.onHide)
            t2.onHide();
          this.removeChild(t2);
        }
        this[`${i}TabButtonBackground`].alpha = 1;
      });
      const t = this[`${name}Tab`];
      this[`${name}TabButtonBackground`].alpha = 0;
      this.addChild(t);
      if (t.onShow)
        t.onShow();
      app.menu.settingsPanel.selectedTab = name;
      App.Layer.memberMenu.emit(SettingsPanel.OPEN_TAB, name);
    };
    Object.values(SettingsPanel.Tabs).forEach((d) => {
      const tab = app.menu.settingsPanel[`${d}TabButtonBackground`];
      tab.on("mousedown", app.menu.settingsPanel.displayTab.bind(app.menu.settingsPanel, d));
      tab._events.mousedown.shift();
    });
    hookSoundSettingsTab();
    hookGraphicsSettingsTab();
  }

  // src/shareURLs.ts
  var gameLinkData = { id: "", name: "", pass: "" };
  function clearSaved() {
    window.location.hash = "";
    gameLinkData.id = gameLinkData.name = gameLinkData.pass = "";
  }
  function initShareURLHook() {
    App.Layer.on("join_game", (name, id, pass) => {
      setHash(id, name, pass);
    });
    app.client.addListener(Protocol.DISCONNECT, () => {
      clearSaved();
      settingsTab();
    });
    APIClient.realPostCreateGame = APIClient.postCreateGame;
    APIClient.postCreateGame = function(serverID, settings, mode, time, serverName, serverPass, customData, auth) {
      setHash(serverID, serverName, serverPass);
      return APIClient.realPostCreateGame(serverID, settings, mode, time, serverName, serverPass, customData, auth);
    };
  }
  function tryJoinLink(args) {
    const [id, name, pass] = args || window.location.hash.substring(1)?.split("&").map(decodeURIComponent) || [];
    if (!id || !name)
      return;
    App.Console.log(`Attempting to join room ${name}...`);
    const loadingMenu = App.Layer.loadingMenu;
    App.Layer.addChild(loadingMenu);
    loadingMenu.show();
    loadingMenu.setTitle(`Click to join server.
${name}`);
    loadingMenu.cancelCount = -1;
    loadingMenu.joinButton = new Button("join");
    loadingMenu.joinButton.selected = true;
    loadingMenu.joinButton.setText("Join");
    loadingMenu.joinButton.scale.x = loadingMenu.joinButton.scale.y = 0.8;
    loadingMenu.joinButton.addListener(Button.BUTTON_RELEASED, function() {
      removeJoinStuff();
      loadingMenu.show();
      App.Layer.emit("join_game", name, id, pass || "");
    });
    loadingMenu.joinButton.x = loadingMenu.title.x + 0.5 * (loadingMenu.title.width - loadingMenu.joinButton.width);
    loadingMenu.joinButton.y = loadingMenu.title.y + 40;
    loadingMenu.joinButton.setTint(config_default.Colors.green);
    loadingMenu.container.addChild(loadingMenu.joinButton);
    loadingMenu.cancelButton2 = new Button("cancel2");
    loadingMenu.cancelButton2.setText("Cancel");
    loadingMenu.cancelButton2.scale.x = loadingMenu.cancelButton2.scale.y = 0.8;
    loadingMenu.cancelButton2.addListener(Button.BUTTON_RELEASED, function() {
      removeJoinStuff();
      clearSaved();
      return loadingMenu.emit(Layer.Events.LOADING_CANCEL);
    });
    loadingMenu.cancelButton2.x = loadingMenu.joinButton.x + loadingMenu.joinButton.width + 8;
    loadingMenu.cancelButton2.y = loadingMenu.title.y + 40;
    loadingMenu.cancelButton2.setTint(config_default.Colors.red);
    loadingMenu.container.addChild(loadingMenu.cancelButton2);
    loadingMenu.title.y -= 36;
    function removeJoinStuff() {
      loadingMenu.title.y += 36;
      loadingMenu.container.removeChild(loadingMenu.joinButton);
      loadingMenu.container.removeChild(loadingMenu.cancelButton2);
    }
  }

  // src/utils.ts
  var inGame = () => app.matchStarted && app.client.socket && app.client.socket.readyState == WebSocket.OPEN;
  function setHash(id, name, pass) {
    gameLinkData.id = id;
    gameLinkData.name = name;
    gameLinkData.pass = pass || "";
    window.location.hash = pass ? `${id}&${encodeURIComponent(name)}&${encodeURIComponent(pass)}` : `${id}&${encodeURIComponent(name)}`;
  }
  function io(url) {
    return window.io(url);
  }

  // src/fpsCounter.ts
  var frameDisplay = document.createElement("div");
  Object.entries({
    padding: "0.3rem 0.4rem",
    font: "16px Arial",
    display: "none",
    position: "fixed",
    top: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    pointerEvents: "none",
    userSelect: "none"
  }).forEach((e) => {
    frameDisplay.style[e[0]] = e[1];
  });
  frameDisplay.textContent = "...";
  document.body.appendChild(frameDisplay);
  function showFPS() {
    let lastUpdate = Date.now(), frames = 0;
    if (SETTINGS.showFPS)
      frameDisplay.style.display = "block";
    function updateCounter() {
      const now = Date.now(), elapsed = now - lastUpdate;
      if (elapsed < 500) {
        frames++;
      } else {
        let fps = `${Math.round(frames / (elapsed / 1e3))} FPS`;
        if (inGame())
          fps += ` - ${App.Stats.ping || 0}ms`;
        if (frameDisplay.innerText !== fps)
          frameDisplay.innerText = fps;
        frames = 0;
        lastUpdate = now;
        frameDisplay.style.display = "block";
      }
      if (!SETTINGS.showFPS)
        return frameDisplay.style.display = "none";
    }
    app._stepCallback = app._stepCallback || app.stepCallback;
    app.stepCallback = function(...d) {
      try {
        updateCounter();
      } catch (err) {
        console.error(err);
      }
      return app._stepCallback(...d);
    };
  }

  // src/friendSearch.ts
  function socialMenuHook() {
    SocialMenu.prototype.maskInvitationList = function(scrollDist) {
      const pl = "Type to search.";
      const pad = 8;
      if (!this.listSearch) {
        this.listSearch = new InputField("list_search", false, SocialMenu.ItemHeight / 1.5);
        this.listSearch.setDimensions(this.listContainer.width, SocialMenu.ItemHeight);
        this.listSearch.forceLowerCase = false;
        this.listSearch.setMaxChars(128);
        this.listSearch.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890:/?.#-_ ");
        this.listSearch.x = pad;
        this.listSearch.y = this.height - this.listSearch.height - pad / 2 - this.infoText.height;
        this.listSearch.setText(pl);
        const ls = this;
        this.listSearch.addListener(InputField.CHANGE, function(d2) {
          d2 = d2.data.value || "";
          if (d2.startsWith(pl) || d2 == pl.slice(0, pl.length - 1)) {
            d2 = d2.substring(pl.length);
            ls.listSearch.setText(d2);
          }
          ls.maskInvitationList(ls.inviteScrollRatio);
        });
      }
      this.listContainer.removeChildren = () => {
        this.listContainer.removeChild(...this.listContainer.children);
        this.container.removeChild(this.listSearch);
      };
      const searchTerm = this.listSearch.getText() || "";
      const filtered = searchTerm && searchTerm !== pl ? this.invites.filter((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase())) : null;
      this.invites.forEach((i) => {
        i.alpha = 1;
        i.isRed = false;
        if (!i.redReady) {
          i.redReady = true;
          i.on("mouseout", function() {
            i.tint = i.isRed ? config_default.Colors.red : 12303291;
          });
        }
      });
      if (!this.listSearch.parent)
        this.container.addChild(this.listSearch);
      const listHeight = SocialMenu.ListHeight - this.listSearch.height - pad / 2;
      const itemDisplayCount = Math.floor(listHeight / SocialMenu.ItemHeight);
      if (this.invites.length <= itemDisplayCount) {
        this.listContainer.y = 0;
      } else {
        this.invites.forEach((i) => this.listContainer.removeChild(i));
        this.listContainer.y = -(scrollDist * (this.invites.length * SocialMenu.ItemHeight - (listHeight - SocialMenu.ItemHeight)));
        for (var d = Math.round(Math.abs(this.listContainer.y / SocialMenu.ItemHeight)), displayOffset = 0; displayOffset < itemDisplayCount; displayOffset++) {
          const inv = this.invites[d + displayOffset];
          this.listContainer.addChild(inv);
          let g;
          if (0 === displayOffset) {
            g = d * SocialMenu.ItemHeight + this.listContainer.y;
            inv.alpha = 0 <= g ? 1 : 1 - 1 / (0.5 * SocialMenu.ItemHeight) * Math.abs(g);
          } else {
            displayOffset === itemDisplayCount - 1 ? (g = d * SocialMenu.ItemHeight + this.listContainer.y, inv.alpha = 0 > g ? 1 : 1 - 1 / (0.5 * SocialMenu.ItemHeight) * Math.abs(g)) : inv.alpha = 1;
          }
        }
        this.inviteScrollRatio = scrollDist;
      }
      this.listSearch.y = this.height - this.listSearch.height - pad / 2 - this.infoText.height;
      this.invites.forEach((i) => {
        i.tint = 12303291;
        if (!filtered)
          return;
        if (filtered.includes(i)) {
          i.tint = 12603201;
          i.alpha = 1;
          i.isRed = true;
        } else {
          i.alpha *= 0.5;
        }
      });
    };
  }

  // src/matchStartHook.ts
  var startingLevel = { l: 0 };
  function matchStartHook() {
    App.prototype.realInitGameMode = App.prototype.initGameMode;
    App.prototype.initGameMode = function(data) {
      this.realInitGameMode(data);
      this.game.on(Game.MATCH_START, async function() {
        startingLevel.l = 0;
        startingLevel.l = Number((await APIClient.getUserProfile(app.credential.playerid)).experience);
      });
    };
  }

  // src/matchEndHook.ts
  function matchEndHook() {
    Game.prototype._endGame = Game.prototype.endGame;
    Game.prototype.endGame = function(data) {
      if (SETTINGS.apiKey) {
        App.Console.log("Attempting to upload match score...");
        if (this.manager.isRanked) {
          try {
            const leaderIndex = data.leaderboard.id.indexOf(this.sessionId);
            const statModel = {
              id: app.credential.playerid,
              map: app.client.mapID,
              mode: this.mode,
              kills: data.leaderboard.kills[leaderIndex],
              deaths: data.leaderboard.deaths[leaderIndex],
              caps: data.leaderboard.points ? data.leaderboard.points[leaderIndex] : 0
            };
            fetch(`${config_default.api}/submit?key=${SETTINGS.apiKey}`, {
              method: "POST",
              body: JSON.stringify(statModel),
              headers: {
                "Content-Type": "application/json"
              }
            }).then((res) => res.json()).then((res) => {
              if (res.err) {
                App.Console.log(`Failed to upload match score! ERR_${res.err}`);
                App.Console.log(`Error: ${res.message}`);
              } else {
                App.Console.log("Successfully uploaded match score!");
              }
            }).catch((err) => {
              App.Console.log("Failed to upload match score! (check console for errors)");
              console.error(err);
            });
          } catch (err) {
            App.Console.log("Failed to upload match score! (check console for errors)");
            console.error(err);
          }
        } else {
          App.Console.log("Match is unranked or custom, scores not uploaded.");
        }
      }
      (async () => {
        const xp = Number((await APIClient.getUserProfile(app.credential.playerid))?.experience) || 0;
        if (xp && startingLevel.l) {
          const plevel = Math.min(Math.max(Math.floor(0.2 * Math.sqrt(startingLevel.l / 15.625)), 1), 160);
          const level = Math.min(Math.max(Math.floor(0.2 * Math.sqrt(xp / 15.625)), 1), 160);
          const xpNeeded = 15.625 * Math.pow((level + 1) / 0.2, 2) - (1 === level ? 0 : 15.625 * Math.pow(level / 0.2, 2));
          const gain = xp - startingLevel.l;
          App.Console.log(`You gained ${gain.toLocaleString()} (${Math.round(gain / xpNeeded * 1e3) / 10}%) experience this round!`, config_default.Colors.green);
          if (level > plevel)
            App.Console.log(`You leveled up! You are now level ${level}.`, config_default.Colors.yellow);
        }
        startingLevel.l = 0;
      })();
      return this._endGame(data);
    };
  }

  // src/texturePack.ts
  function hookTextureLoader() {
    class WorkerNew extends Worker {
      _postMessage;
      constructor(url, opts) {
        super(url, opts);
        this._postMessage = this.postMessage;
        this.postMessage = this.newPostMessage;
      }
      newPostMessage(data, ...args) {
        if (SETTINGS.texturePack && !window.SKIP_TEX_LOAD && !data?.bypass) {
          fetch(`${config_default.api}/packs/${SETTINGS.texturePack}`).then((r) => r.json()).then((pack) => {
            if (pack && data.id == "loadImageBitmap" && typeof data.data[0] == "string" && SETTINGS.texturePack) {
              if (pack.hasCombined && data.data[0].includes("ninja.io") && data.data[0].includes("combined") && data.data[0].endsWith(".png"))
                data.data[0] = `${config_default.api}/packs/${SETTINGS.texturePack}/combined.png?v=${config_default.actualGameVersion}`;
              if (pack.hasSeamless && data.data[0].includes("ninja.io") && data.data[0].includes("seamless") && data.data[0].endsWith(".png"))
                data.data[0] = `${config_default.api}/packs/${SETTINGS.texturePack}/seamless.png?v=${config_default.actualGameVersion}`;
            }
            this._postMessage(data, ...args);
          }).catch(() => {
            this._postMessage(data, ...args);
          });
        } else
          this._postMessage(data, ...args);
      }
    }
    window.Worker = Worker = WorkerNew;
  }

  // src/repositionItems.ts
  function reposItems() {
    if (!app.menu)
      return;
    try {
      App.Layer.partyMenu.reposition();
      app.menu.joinButton.x = app.menu.backgroundImage.x + 28;
      app.menu.serverListButton.x = app.menu.joinButton.x + app.menu.joinButton.width + 26;
      app.menu.serverListButton.y = app.menu.joinButton.y;
      app.menu.serverCreateButton.x = app.menu.serverListButton.x - (app.menu.serverCreateButton.width - app.menu.serverListButton.width);
      app.menu.serverCreateButton.y = app.menu.serverListButton.y + app.menu.serverListButton.height + 14;
      app.menu.partyButton.x = app.menu.serverCreateButton.x - (app.menu.partyButton.backgroundEnabled.width - 10);
      app.menu.partyButton.y = app.menu.serverCreateButton.y - 4;
      app.menu.onlineOption.x = app.menu.joinButton.x + (app.menu.partyButton.x - app.menu.joinButton.x - app.menu.onlineOption.width) * 0.75;
      app.menu.onlineOption.y = app.menu.serverCreateButton.y + app.menu.serverCreateButton.height / 2 - app.menu.onlineOption.height / 2 + 2;
    } catch {
    }
  }
  function reindexItems() {
    app.menu.modeContainer.parent.addChild(app.menu.modeContainer);
    app.menu.serverContainer.parent.addChild(app.menu.serverContainer);
  }

  // src/fullscreenHook.ts
  function hookFullscreen() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "F11") {
        e.preventDefault();
        if (document.fullscreenElement)
          document.exitFullscreen();
        else
          document.querySelector("html").requestFullscreen();
      }
    });
  }

  // src/partyMenu.ts
  function initPartyMenu() {
    class PartyMenu extends Feature {
      ox = 0;
      oy = 0;
      off = 0;
      marginLeft = 0;
      memberList = [];
      readyState = false;
      socket;
      code = "";
      background = new PIXI.Graphics();
      closeButton = new ImgButton();
      pmTitle = new PIXI.Text("Party Manager", {
        fontName: "Arial",
        fontSize: 19,
        lineHeight: 16,
        fill: config_default.Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round"
      });
      startContainer = new PIXI.Container();
      partyCodeText = new PIXI.Text("Enter a party code:", {
        fontName: "Arial",
        fontSize: 16,
        fill: config_default.Colors.yellow,
        strokeThickness: 2,
        lineJoin: "round"
      });
      codeInput = new InputField("code_input", false, 24);
      joinPartyButton = new Button("join_party");
      loadingContainer = new PIXI.Container();
      loadingText = new PIXI.Text("", {
        fontName: "Arial",
        fontSize: 16,
        fill: config_default.Colors.yellow,
        strokeThickness: 2,
        lineJoin: "round"
      });
      preGameContainer = new PIXI.Container();
      preGameMemberList = new PIXI.Container();
      partyCodeListText = new PIXI.Text("Party Code: ", {
        fontName: "Arial",
        fontSize: 18,
        fill: config_default.Colors.yellow,
        strokeThickness: 2,
        lineJoin: "round"
      });
      readyButton = new Button("join_party");
      leaveButton = new Button("leave_party");
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
        this.container.addChild(this.startContainer);
        this.startContainer.addChild(this.partyCodeText);
        this.codeInput.setDimensions(190, 35);
        this.codeInput.forceLowerCase = false;
        this.codeInput.setMaxChars(16);
        this.codeInput.setFilter("abcdefghijklmnopqrstuvwxyz.");
        this.codeInput.addListener(InputField.SUBMIT, () => this.joinParty());
        this.startContainer.addChild(this.codeInput);
        this.joinPartyButton.setText("Join Party");
        this.joinPartyButton.scale.x = this.joinPartyButton.scale.y = 0.75;
        this.joinPartyButton.addListener(Button.BUTTON_RELEASED, () => this.joinParty());
        this.startContainer.addChild(this.joinPartyButton);
        this.container.addChild(this.loadingContainer);
        this.loadingContainer.visible = false;
        this.loadingContainer.addChild(this.loadingText);
        this.container.addChild(this.preGameContainer);
        this.preGameContainer.visible = false;
        this.preGameContainer.addChild(this.preGameMemberList);
        this.preGameContainer.addChild(this.partyCodeListText);
        this.readyButton.setText("Ready");
        this.readyButton.setTint(config_default.Colors.green);
        this.readyButton.scale.x = this.readyButton.scale.y = 0.75;
        this.readyButton.addListener(Button.BUTTON_RELEASED, () => this.socket.emit("isReady", !this.readyState));
        this.preGameContainer.addChild(this.readyButton);
        this.leaveButton.setText("Leave Party");
        this.leaveButton.setTint(config_default.Colors.red);
        this.leaveButton.scale.x = this.leaveButton.scale.y = 0.75;
        this.leaveButton.addListener(Button.BUTTON_RELEASED, () => this.socket.emit("leave"));
        this.preGameContainer.addChild(this.leaveButton);
        this.reposition();
      }
      reposition() {
        this.off = 0;
        this.startContainer.x = this.ox;
        this.startContainer.y = this.oy;
        this.partyCodeText.x = this.marginLeft = this.ox + 10;
        this.partyCodeText.y = this.off = this.oy;
        this.codeInput.x = this.marginLeft;
        this.codeInput.y = this.off += 24;
        this.joinPartyButton.x = this.marginLeft + this.codeInput.width + this.joinPartyButton.width / 6;
        this.joinPartyButton.y = this.off + 4;
        this.off = 0;
        this.loadingContainer.x = this.ox;
        this.loadingContainer.y = this.oy;
        this.loadingText.x = this.marginLeft = this.ox + 10;
        this.loadingText.y = this.off = this.oy;
        this.off = 0;
        this.preGameContainer.x = this.ox;
        this.preGameContainer.y = this.oy;
        this.partyCodeListText.x = this.marginLeft = this.ox + 10;
        this.partyCodeListText.y = this.off += 38;
        this.preGameMemberList.x = this.ox;
        this.preGameMemberList.y = this.off += 4;
        this.readyButton.x = this.width - this.readyButton.width - 34;
        this.readyButton.y = this.height - this.readyButton.height * 2 - 6;
        this.leaveButton.x = this.ox + 10;
        this.leaveButton.y = this.readyButton.y;
      }
      setTitle(text = "Party Manager") {
        this.pmTitle.setText(text);
      }
      startLoading(text) {
        this.hideAllWindows();
        this.loadingContainer.visible = true;
        this.loadingText.text = text;
      }
      hideAllWindows() {
        this.startContainer.visible = this.loadingContainer.visible = this.preGameContainer.visible = false;
      }
      show() {
      }
      joinParty() {
        const code = this.codeInput.getText();
        if (!code.trim())
          return this.codeInput.markInvalid(), this.codeInput.setFocus(true);
        this.startLoading("Joining party...");
        this.socket = io(config_default.api);
        this.socket.once("connect", () => {
          this.socket.emit("init", 1 /* party */, code, app.credential.username);
          this.socket.once("denyJoin", () => this.startLoading("Invalid party code."));
          this.socket.once("joinedParty", (code2) => {
            this.code = code2;
            this.hideAllWindows();
            this.preGameContainer.visible = true;
            this.partyCodeListText.text = `Party Code: ${this.code}`;
          });
          this.socket.on("updateMembers", (m) => this.updateMembers(m));
        });
        this.socket.on("joinErr", (err) => {
          this.socket.disconnect();
          this.startLoading(err);
          setTimeout(() => {
            this.hideAllWindows();
            this.startContainer.visible = true;
          }, 2500);
        });
        this.socket.on("disconnect", () => {
          this.socket.disconnect();
          this.hideAllWindows();
          this.startContainer.visible = true;
          this.memberList = [];
        });
        this.socket.on("connect_error", () => {
          this.socket.disconnect();
          this.startLoading("Error connecting to socket.");
          setTimeout(() => {
            this.hideAllWindows();
            this.startContainer.visible = true;
          }, 2500);
        });
      }
      isPartyOwner() {
        return this.memberList[0].me;
      }
      updateMembers(list) {
        this.memberList = list;
        this.preGameMemberList.removeChildren();
        this.reposition();
        this.memberList.forEach((m, i) => {
          if (m.me) {
            this.readyState = m.ready;
            this.readyButton.setText(this.readyState ? "Not Ready" : "Ready");
            this.readyButton.setTint(this.readyState ? config_default.Colors.red : config_default.Colors.green);
            this.reposition();
          }
          const text = new PIXI.Text(m.name + (m.ready ? " (Ready)" : " (Not Ready)"), {
            fontName: "Arial",
            fontSize: 16,
            fill: m.ready ? config_default.Colors.green : config_default.Colors.white,
            strokeThickness: 2,
            lineJoin: "round"
          });
          text.x = this.preGameMemberList.x;
          text.y = this.preGameMemberList.y + 14 + 18 * (i || -0.5);
          this.preGameMemberList.addChild(text);
          if (this.isPartyOwner() && i) {
            const banBtn = new Button(`ban_mem`);
            banBtn.setText("Ban");
            banBtn.setTint(config_default.Colors.red);
            banBtn.scale.x = banBtn.scale.y = 0.5;
            banBtn.x = text.x + text.width + 12;
            banBtn.y = text.y;
            banBtn.addListener(Button.BUTTON_RELEASED, () => this.socket.emit("banMem", m.name));
            this.preGameMemberList.addChild(banBtn);
          }
        });
      }
    }
    function doPartyButton() {
      App.Layer.mainMenuHides.push(App.Layer.partyMenu = new PartyMenu());
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
      ].forEach((e) => App.Layer[e].hides.push(App.Layer.partyMenu));
      App.Layer.features.push(App.Layer.partyMenu);
      app.menu.partyButton = new MemberMenuButton("Party", config_default.Colors.yellow, 18, "head_alpha", false);
      app.menu.partyButton.on(MemberMenuButton.BUTTON_PRESSED, function() {
        App.Layer.mainMenuHides.forEach(function(c) {
          return App.Layer.hideFeature(c);
        });
        App.Layer.memberMenu.playButton.setActive(0);
        App.Layer.partyMenu.show();
        App.Layer.addChild(App.Layer.partyMenu);
        App.Layer.emit(Layer.Events.HIDE_MENU);
        app.onResize();
      });
      app.menu.partyButton.scale = { x: 0.8, y: 0.8 };
      app.menu.partyButton.icon.scale = { x: 0.6, y: 0.6 };
      app.menu.container.addChild(app.menu.partyButton);
      reindexItems();
    }
    doPartyButton();
    app.onShowMenu(() => doPartyButton());
    app.menu._resize = app.menu.resize;
    app.menu.resize = () => {
      app.menu._resize();
      reposItems();
    };
  }

  // src/mapIdentifier.ts
  function initMapIdentifier() {
    Client.prototype.onMessage = function(_a) {
      const a = Client.decompress(_a.data);
      try {
        if (a.type == config_default.PacketTypeMap.data && a.data.type == config_default.PacketTypeMap.joinedMessage && a.data.info.startsWith("You joined ")) {
          let roomName = a.data.info.substring("You joined ".length);
          setHash(app.client.server.id, roomName, gameLinkData.pass);
        }
        const repFail = () => App.Console.log(`# Failed to identify map. Please report to Meow.`);
        const repSuccess = (id, name) => App.Console.log(`# Identified map as ${name} (ID: ${id}).`);
        if (a.type == config_default.PacketTypeMap.data2 && a.data.t == config_default.PacketTypeMap.systemMessage && a.data.msg.startsWith("Joining ")) {
          const mapName = (a.data.msg.match(/(?: - )(.*)(?: by)/) || [])[1];
          this.mapID = 0;
          if (mapName) {
            const mapID = config_default.MapIDs[mapName];
            if (mapID) {
              repSuccess(mapID, mapName);
              this.mapID = mapID;
            } else
              repFail();
          } else
            repFail();
        } else if (a.type == config_default.PacketTypeMap.data2 && a.data.t == config_default.PacketTypeMap.systemMessage && a.data.msg.startsWith("loading map: ")) {
          const mapName = a.data.msg.substring("loading map: ".length);
          this.mapID = 0;
          if (mapName) {
            const mapID = config_default.MapIDs[mapName];
            if (mapID) {
              repSuccess(mapID, mapName);
              this.mapID = mapID;
            } else
              repFail();
          } else
            repFail();
        }
      } catch (err) {
        console.error(err);
      }
      this.dispatchEvent(a);
    };
  }

  // src/userCommunicationProtocol.ts
  var commConfig = {
    prefix: "$NIOU",
    sep: "|"
  };
  var commPackets = {
    gameLink: "requestGameLink"
  };
  function decodeUserCommunication(message) {
    if (!message.startsWith(commConfig.prefix))
      return null;
    const args = message.split(commConfig.sep);
    if (!Object.values(commPackets).includes(args[1]))
      return null;
    return {
      packet: args[1],
      args: args.slice(2)
    };
  }
  async function communicateUser(id, packetID, args) {
    await APIClient.postFriendMessage(id, [commConfig.prefix, packetID, ...args].join(commConfig.sep), app.credential.id);
    return true;
  }

  // src/onlineStatus.ts
  var failedOnline = false;
  var onlineSocket;
  function goOnline() {
    if (app.credential.accounttype == "guest") {
      if (failedOnline)
        return;
      failedOnline = true;
      return App.Console.log("Failed to go online: You are not logged in!");
    }
    failedOnline = false;
    if (onlineSocket)
      onlineSocket.disconnect();
    onlineSocket = io(config_default.api);
    onlineSocket.on("connect", () => onlineSocket.emit("init", 0 /* online */, app.credential.playerid));
    onlineSocket.on("success", () => {
      App.Console.log("Successfully went online!");
    });
    onlineSocket.on("fail", (msg) => {
      failedOnline = true;
      App.Console.log(`Failed to go online: ${msg}`);
    });
    onlineSocket.on("disconnect", () => {
      onlineSocket = null;
      App.Console.log("Went offline.");
    });
    onlineSocket.on("needsLink", async (requestID) => {
      const messages = JSON.parse(await APIClient.getMessages(app.credential.id))?.messages;
      const msg = messages?.find((m) => decodeUserCommunication(m.message)?.packet == commPackets.gameLink);
      if (msg && decodeUserCommunication(msg.message)?.args[0] == requestID) {
        if (!inGame())
          onlineSocket.emit("gotLink", requestID, false);
        else if (gameLinkData.pass)
          onlineSocket.emit("gotLink", requestID, true);
        else
          onlineSocket.emit("gotLink", requestID, [
            gameLinkData.id,
            gameLinkData.name,
            gameLinkData.pass
          ]);
      } else
        onlineSocket.emit("gotLink", requestID, null);
    });
  }
  function goOffline() {
    if (onlineSocket) {
      onlineSocket.emit("dc");
      onlineSocket.disconnect();
    }
  }
  function initOnlineOptionHook() {
    function doOnlineStatusOption() {
      app.menu.onlineOption = new Checkbox("appearOnline", "Appear Online", true);
      app.menu.onlineOption.setChecked(SETTINGS.appearOnline);
      app.menu.onlineOption.on(Checkbox.CHANGE, function(b) {
        SETTINGS.appearOnline = b;
        saveSettings();
        if (SETTINGS.appearOnline)
          goOnline();
        else
          goOffline();
      });
      app.menu.onlineOption.scale.x = app.menu.onlineOption.scale.y = 1.1;
      app.menu.container.addChild(app.menu.onlineOption);
      reindexItems();
      reposItems();
    }
    doOnlineStatusOption();
    app.onShowMenu(() => doOnlineStatusOption());
    if (SETTINGS.appearOnline)
      goOnline();
    setInterval(() => SETTINGS.appearOnline && !onlineSocket && !failedOnline && goOnline(), 1e3);
  }

  // src/friendOnlineHook.ts
  function initFriendOnlineHook() {
    SocialMenu.prototype._maskFriendList = SocialMenu.prototype.maskFriendList;
    SocialMenu.prototype.maskFriendList = function(scrollDist) {
      this.friends.sort((f1, f2) => f2.seen.getTime() - f1.seen.getTime()).forEach((f, fi) => f.y = 47 + fi * SocialMenu.ItemHeight);
      this._maskFriendList(scrollDist);
    };
    FriendItem = class FriendItem extends PIXI.Graphics {
      id;
      name;
      seen;
      clan;
      nameLabel;
      onlineNow;
      constructor(id, name, seen, clan) {
        super();
        this.id = id;
        this.name = name;
        this.seen = new Date(Date.parse(seen) - 6e4 * new Date().getTimezoneOffset());
        this.onlineNow = !!App.Layer.socialMenu.onlineFriends?.includes(this.id);
        if (this.onlineNow)
          this.seen = new Date();
        this.clan = clan;
        this.beginFill(16777215, 0.15);
        this.drawRoundedRect(0, 0, 340, 26, 4);
        this.endFill();
        this.interactive = true;
        this.tint = 12303291;
        this.on("mouseover", () => {
          this.tint = 16777215;
        });
        this.on("mouseout", () => {
          this.tint = 12303291;
        });
        this.on("mousedown", () => this.emit(SocialMenu.ACCESS_PROFILE, this.id));
        this.on("rightdown", () => this.emit(SocialMenu.SHOW_FRIEND_DROPDOWN, this.id));
        this.beginFill(this.onlineNow ? config_default.Colors.dotGreen : 30 > Math.round((Date.now() - this.seen.getTime()) / 1e3) ? config_default.Colors.dotOrange : config_default.Colors.dotGrey, 1);
        this.drawCircle(320, 13, 8);
        this.endFill();
        this.nameLabel = new PIXI.BitmapText(this.name, { fontName: "Open Sans", fontSize: 22 });
        this.nameLabel.x = 8;
        this.nameLabel.y = 2;
        this.addChild(this.nameLabel);
      }
    };
  }
  async function updateFriendList(reload = true) {
    if (App.Layer.socialMenu.mode == "friends") {
      try {
        const friendsOnline = await fetch(`${config_default.api}/onlineplayers`).then((res) => res.json());
        App.Layer.socialMenu.onlineFriends = friendsOnline?.filter((f) => App.Layer.socialMenu.friends.find((fr) => fr.id == f)) || [];
      } catch {
        App.Layer.socialMenu.onlineFriends = [];
      }
      if (reload)
        await App.Layer.socialMenu.loadFriends();
    }
  }

  // src/updateChecker.ts
  async function checkUpdate() {
    try {
      const newest = await fetch(`${config_default.api}/ver`).then((r) => r.text());
      const num = (str) => Number(str.replace(/\./, ""));
      if (num(newest) > num(config_default.ver)) {
        App.Console.log(`Hey! A new version of NinjaIOUtils is available. (${newest})`, config_default.Colors.red);
      }
    } catch {
    }
  }

  // src/preloaderHook.ts
  function hookPreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader)
      return;
    const tst = setInterval(function() {
      try {
        App.RemovePreloader = function() {
          let b = 1;
          preloader.style.pointerEvents = "none";
          const c = setInterval(() => {
            0 < b - 0.05 ? (preloader.style.opacity = String(b), b -= 0.05) : (preloader.remove(), clearInterval(c));
          }, 1e3 / 60);
        };
        clearInterval(tst);
      } catch {
      }
    }, 10);
    const st = document.createElement("style");
    st.innerHTML = "#preloader{cursor:default!important;}#texresetbtn{cursor:pointer!important;}";
    document.head.appendChild(st);
    preloader.style.top = preloader.style.left = "0px";
    const reset = document.createElement("button");
    reset.id = "texresetbtn";
    Object.entries({
      backgroundColor: "#FF0000",
      border: "1px solid rgba(255,255,255,0.7)",
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
      opacity: "0.5",
      borderRadius: "6px",
      padding: "2px",
      color: "white"
    }).forEach((s) => {
      reset.style[s[0]] = s[1];
    });
    reset.innerText = "Skip Loading Texture Packs";
    reset.onclick = () => {
      app.proceed();
      window.SKIP_TEX_LOAD = true;
      reset.remove();
    };
    preloader.appendChild(reset);
  }

  // src/joinGameHook.ts
  function hookJoinGameButton() {
    const btn = new Button("usr_join");
    btn.setText("Join Game");
    btn.scale.x = btn.scale.y = 0.75;
    const repos = () => btn.x = App.Layer.userMenu.ox + App.Layer.userMenu.w - btn.width - 30;
    repos();
    btn.y = App.Layer.userMenu.h - 10;
    btn.visible = false;
    btn.addListener(Button.BUTTON_PRESSED, async () => {
      btn.setText("Requesting link...");
      repos();
      const rej = (msg) => {
        btn.setText(msg);
        repos();
        setTimeout(() => (btn.setText("Join Game"), repos()), 4e3);
      };
      const req = String(Date.now());
      await communicateUser(App.Layer.userMenu.id, commPackets.gameLink, [req]);
      const res = (await fetch(`${config_default.api}/requestlink?id=${req}&userid=${App.Layer.userMenu.id}`).then((r) => r.json()))?.[0];
      if (res == false)
        rej("User not in game.");
      else if (res == true)
        rej("User in private game.");
      else if (Array.isArray(res)) {
        btn.setText("Join Game");
        repos();
        App.Layer.userMenu.onCloseButtonReleased();
        tryJoinLink([res[0], res[1], res[2]]);
      } else
        return rej("User not online.");
    });
    App.Layer.userMenu.container.addChild(btn);
    App.Layer.userMenu._load = App.Layer.userMenu.load;
    App.Layer.userMenu.load = async (id, type) => {
      btn.visible = false;
      await App.Layer.userMenu._load(id, type);
      await updateFriendList(false);
      btn.visible = App.Layer.socialMenu.onlineFriends.includes(App.Layer.userMenu.id);
    };
  }

  // src/socialMenuHook.ts
  function hookSocialMenu() {
    const menu = App.Layer.socialMenu;
    class RecordingMenu extends Feature {
      mx = 0;
      my = 0;
      down = false;
      dragging = false;
      title;
      background;
      closeButton;
      startButton;
      dlWEBM;
      dlMP4;
      donedl;
      previd;
      recordingSince = 0;
      preContainer;
      postContainer;
      constructor() {
        super();
        this.background = new PIXI.Graphics();
        this.background.lineStyle(1, 16777215, 0.1, 0);
        this.background.beginFill(3355443, 0.9);
        this.background.drawRoundedRect(0, 0, 400, 320, 4);
        this.background.interactive = true;
        this.container.addChild(this.background);
        this.background.on("mousedown", (a) => {
          a.stopPropagation();
          this.down = true;
          this.ox = a.data.global.x;
          this.oy = a.data.global.y;
        });
        this.background.on("mouseup", (a) => {
          a.stopPropagation();
          this.down = this.dragging = false;
        });
        this.background.on("mousemove", (a) => {
          if (this.down) {
            let b = a.data.global.x;
            a = a.data.global.y;
            let c = b - this.ox, d = a - this.oy;
            this.x += c;
            this.y += d;
            this.ox = b;
            this.oy = a;
            0 < Math.sqrt(c * c + d * d) && (this.dragging = true);
          }
        });
        this.title = new PIXI.BitmapText("Screen Recorder", {
          fontName: "Open Sans",
          fontSize: 28
        });
        this.title.x = this.mx = 8;
        this.title.y = this.my = 6;
        this.title.tint = config_default.Colors.red;
        this.container.addChild(this.title);
        setInterval(() => this.updateTitle(), 900);
        this.closeButton = new PIXI.Sprite(App.CombinedTextures.exit);
        this.closeButton.scale.x = this.closeButton.scale.y = 0.8;
        this.closeButton.alpha = 0.5;
        this.closeButton.interactive = true;
        this.closeButton.x = this.width - 28;
        this.closeButton.y = 2;
        this.closeButton.on("mousedown", (a) => {
          this.closeButton.alpha = 0.5;
          this.parent.removeChild(this);
          AudioEffects.ButtonClick.audio.play();
        });
        this.closeButton.on("mouseover", (a) => {
          this.closeButton.alpha = 1;
          AudioEffects.ButtonHover.audio.play();
        });
        this.closeButton.on("mouseout", (a) => {
          this.closeButton.alpha = 0.5;
        });
        this.container.addChild(this.closeButton);
        this.container.addChild(this.preContainer = new PIXI.Container());
        this.container.addChild(this.postContainer = new PIXI.Container());
        this.postContainer.visible = false;
        this.startButton = new Button("start_rec");
        this.setupStartButton();
        this.startButton.scale.x = this.startButton.scale.y = 0.75;
        this.startButton.x = this.mx + 10;
        this.startButton.y = this.my += this.title.height + 10;
        this.startButton.addListener(Button.BUTTON_RELEASED, () => {
          if (this.recordingSince && this.recorder)
            this.recorder.stop();
          else
            this.onRecStart();
        });
        this.preContainer.addChild(this.startButton);
        this.mx = 18;
        this.my = this.title.height + 16;
        this.donedl = new Button("dl_done");
        this.donedl.setText("Done");
        this.donedl.setTint(config_default.Colors.yellow);
        this.donedl.scale.x = this.donedl.scale.y = 0.7;
        this.donedl.x = this.mx;
        this.donedl.y = this.my;
        this.donedl.addListener(Button.BUTTON_RELEASED, () => {
          this.preContainer.visible = true;
          this.postContainer.visible = false;
          this.stream = this.recorder = this.recordedChunks = null;
        });
        this.postContainer.addChild(this.donedl);
        this.previd = new Button("dl_prev");
        this.previd.setText("Preview");
        this.previd.setTint(config_default.Colors.green);
        this.previd.scale.x = this.previd.scale.y = 0.7;
        this.previd.x = this.donedl.x + this.donedl.width + 6;
        this.previd.y = this.my;
        this.previd.addListener(Button.BUTTON_RELEASED, () => window.open(URL.createObjectURL(new Blob(this.recordedChunks, { type: "video/webm" })), "_blank"));
        this.postContainer.addChild(this.previd);
        this.dlWEBM = new Button("dl_webm");
        this.dlWEBM.setText("Download WEBM");
        this.dlWEBM.scale.x = this.dlWEBM.scale.y = 0.7;
        this.dlWEBM.x = this.mx;
        this.dlWEBM.y = this.my += this.donedl.height + 8;
        this.dlWEBM.addListener(Button.BUTTON_RELEASED, () => {
          this.dlBlob(new Blob(this.recordedChunks, { type: "video/webm" }));
        });
        this.postContainer.addChild(this.dlWEBM);
        this.dlMP4 = new Button("dl_mp4");
        this.dlMP4.setText("Convert to MP4 (slow)");
        this.dlMP4.scale.x = this.dlMP4.scale.y = 0.7;
        this.dlMP4.x = this.dlWEBM.x + this.dlWEBM.width + 6;
        this.dlMP4.y = this.dlWEBM.y;
        this.dlMP4.addListener(Button.BUTTON_RELEASED, async () => {
          try {
            this.dlMP4.setText("Starting...");
            const worker = new Worker(URL.createObjectURL(new Blob([await fetch(`${config_default.api}/ffmpeg.js`).then((r) => r.text())], {
              type: "application/javascript"
            })));
            worker.onmessage = async (e) => {
              try {
                const msg = e.data;
                switch (msg.type) {
                  case "ready":
                    this.dlMP4.setText("Converting...");
                    console.log(`[ConversionWorker] Worker ready!`);
                    worker.postMessage({
                      bypass: true,
                      type: "run",
                      arguments: [
                        "-i",
                        "video.webm",
                        "-vf",
                        "crop=trunc(iw/2)*2:trunc(ih/2)*2",
                        "-preset",
                        "ultrafast",
                        "vid.mp4"
                      ],
                      MEMFS: [
                        {
                          name: "video.webm",
                          data: await new Blob(this.recordedChunks, {
                            type: "video/webm"
                          }).arrayBuffer()
                        }
                      ]
                    });
                    break;
                  case "stdout":
                  case "stderr":
                    console.log(`[ConversionWorker.${msg.type}] ${msg.data}`);
                    if (msg.data == "Conversion failed!") {
                      this.dlMP4.setText("Error!");
                    }
                    break;
                  case "done":
                    this.dlMP4.setText("Convert to MP4 (slow)");
                    if (typeof msg.data !== "string" && msg.data.MEMFS) {
                      this.dlBlob(new Blob([msg.data.MEMFS[0].data], { type: "video/mp4" }));
                    }
                    break;
                }
              } catch (err) {
                alert(`Error with conversion: ${err}, ${err.stack}`);
              }
            };
          } catch (err) {
            alert(`Error creating conversion worker: ${err}, ${err.stack}`);
          }
        });
        this.postContainer.addChild(this.dlMP4);
      }
      updateTitle() {
        const timeRec = Math.floor((Date.now() - this.recordingSince) / 1e3);
        this.title.text = this.recordingSince ? `Recording... (${Math.floor(timeRec / 60).toString().padStart(2, "0")}:${Math.floor(timeRec % 60).toString().padStart(2, "0")})` : `Screen Recorder`;
      }
      setupStartButton() {
        this.startButton.setText("Start Recording");
        this.startButton.setTint(config_default.Colors.green);
      }
      stream;
      recorder;
      recordedChunks;
      onRecStart() {
        this.recordingSince = Date.now();
        this.updateTitle();
        this.startButton.setText("Stop Recording");
        this.startButton.setTint(config_default.Colors.red);
        try {
          this.stream = new MediaStream();
          const howlStream = Howler.ctx.createMediaStreamDestination();
          Howler.masterGain.connect(howlStream);
          const vid = App.Renderer.view.captureStream();
          this.stream.addTrack(howlStream.stream.getTracks()[0]);
          this.stream.addTrack(vid.getTracks()[0]);
          this.recordedChunks = [];
          this.recorder = new MediaRecorder(this.stream, { bitsPerSecond: 4e7 });
          this.recorder.ondataavailable = (e) => this.recordedChunks.push(e.data);
          this.recorder.onstop = () => this.onRecStop();
          this.recorder.start();
        } catch (err) {
          alert(`Error starting recording: ${err}, ${err.stack}`);
        }
      }
      onRecStop() {
        this.recordingSince = 0;
        this.updateTitle();
        this.setupStartButton();
        this.preContainer.visible = false;
        this.postContainer.visible = true;
        this.dlMP4.setText("Convert to MP4 (slow)");
      }
      dlBlob(blob) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `NinjaRecording-${new Date().toISOString().split(".")[0].replace("T", "-").replace(/:/g, ".")}.${blob.type.split("/").pop()}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    }
    class SocialMenuDropdown extends PIXI.Container {
      background;
      constructor() {
        super();
        this.background = new PIXI.Graphics();
        this.background.clear();
        this.background.lineStyle(1, 16777215, 0.4, 0.3);
        this.background.beginFill(5592405, 0.9);
        this.background.drawRoundedRect(0, 0, 110, 64, 4);
        this.background.endFill();
        this.addChild(this.background);
        const clanChatBtn = new SocialMenuDropdownActionRow("Clan Chat", () => menu.onClanChatButtonReleased.bind(menu)(), config_default.Colors.white);
        const recordBtn = new SocialMenuDropdownActionRow("Record", () => {
          menu.addChild(menu.recMenu);
          menu.recMenu.x = -Math.abs(menu.width - menu.recMenu.width) / 2;
          menu.recMenu.y = -Math.abs(menu.height - menu.recMenu.height) / 2;
        }, config_default.Colors.red);
        clanChatBtn.x = 10;
        clanChatBtn.y = 4;
        recordBtn.x = 10;
        recordBtn.y = 34;
        this.addChild(clanChatBtn);
        this.addChild(recordBtn);
      }
    }
    class SocialMenuDropdownActionRow extends PIXI.Container {
      actionText;
      constructor(text, onclick, color) {
        super();
        this.text = text;
        this.actionText = new PIXI.BitmapText(this.text, { fontName: "Open Sans", fontSize: 24 });
        this.hitArea = new PIXI.Rectangle(0, 0, 100, 30);
        this.actionText.tint = color;
        this.actionText.alpha = 0.7;
        this.interactive = true;
        this.on("mouseover", () => this.actionText.alpha = 1);
        this.on("mouseout", () => this.actionText.alpha = 0.7);
        this.on("mousedown", (e) => {
          e.stopPropagation();
          onclick();
        });
        this.addChild(this.actionText);
      }
    }
    menu.clanChatButton.destroy();
    const dropdownMenu = new SocialMenuDropdown();
    menu.recMenu = new RecordingMenu();
    menu.dropdownButton = new Button("drop");
    menu.dropdownButton.setText("V");
    menu.dropdownButton.scale.x = menu.dropdownButton.scale.y = 0.7;
    menu.dropdownButton.addListener(Button.BUTTON_RELEASED, () => {
      if (dropdownMenu.parent)
        return menu.container.removeChild(dropdownMenu);
      menu.container.addChild(dropdownMenu);
      dropdownMenu.x = menu.dropdownButton.x - dropdownMenu.width + menu.dropdownButton.width;
      dropdownMenu.y = menu.dropdownButton.y + menu.dropdownButton.parent.y + menu.dropdownButton.height;
    });
    menu.dropdownButton.x = menu.clanButton.x + menu.clanButton.width + 6;
    menu.dropdownButton.y = 8;
    menu.container.addChild(menu.dropdownButton);
  }

  // src/hookUtilsMenu.ts
  function hookUtilsMenu() {
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
    menu.utilsButton = new MemberMenuButton("NinjaIOUtils", 16763904, 15, "gears_icon");
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
      App.Layer.utilsMenu.show();
      App.Layer.addChild(App.Layer.utilsMenu);
      App.Layer.emit(Layer.Events.HIDE_MENU);
      app.onResize();
    });
    menu.utilsButton.icon.scale.x = menu.utilsButton.icon.scale.y = 0.7;
    menu.container.addChild(menu.utilsButton);
    class UtilsMenu extends Feature {
      ox = 0;
      oy = 0;
      off = 0;
      marginLeft = 0;
      background = new PIXI.Graphics();
      closeButton = new ImgButton();
      pmTitle = new PIXI.Text("NinjaIOUtils", {
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
    App.Layer.mainMenuHides.push(App.Layer.utilsMenu = new UtilsMenu());
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
    ].forEach((e) => App.Layer[e].hides.push(App.Layer.utilsMenu));
    App.Layer.features.push(App.Layer.utilsMenu);
  }

  // src/index.ts
  hookTextureLoader();
  if (!navigator.clipboard.readText) {
    navigator.clipboard.readText = function() {
      return new Promise((res) => res(prompt("Paste text now.") || ""));
    };
  }
  hookPreloader();
  var socialMenuDone = false;
  var testing = setInterval(() => {
    if (!socialMenuDone) {
      try {
        if (SocialMenu && FriendItem) {
          socialMenuHook();
          initFriendOnlineHook();
          socialMenuDone = true;
        } else
          return;
      } catch {
        return;
      }
    }
    try {
      if (!app || !app.menu || !app.menu.joinButton || typeof app.status.updating !== "boolean" || !APIClient || !APIClient.postCreateGame)
        return;
    } catch {
      return;
    }
    clearInterval(testing);
    App.Console.log("Loading NinjaIOUtils...");
    if (app.credential.accounttype == "guest")
      alert(`NinjaIOUtils works best when you are logged in!
No support will be provided to logged out users experiencing issues, sorry.`);
    app._showMenu = app.showMenu;
    const menuListeners = [];
    app.onShowMenu = (cb) => {
      menuListeners.push(cb);
    };
    app.showMenu = function() {
      app._showMenu();
      menuListeners.forEach((l) => l());
      reposItems();
    };
    showFPS();
    matchStartHook();
    matchEndHook();
    applySettingsHook();
    initShareURLHook();
    App.Stats.realSetPing = App.Stats.setPing;
    App.Stats.setPing = function(ping) {
      App.Stats.ping = ping;
      return App.Stats.realSetPing(ping);
    };
    App.Console.consoleInput.addListener(InputField.CHANGE, () => {
      if (SETTINGS.typewriter)
        AudioEffects.ButtonHover.audio.play();
    });
    initOnlineOptionHook();
    initPartyMenu();
    App.Console.log("Successfully injected party menu button.");
    settingsTab();
    App.Console.log("Successfully injected settings tab.");
    hookFullscreen();
    reposItems();
    initMapIdentifier();
    hookSocialMenu();
    window.addEventListener("resize", () => reposItems());
    window.addEventListener("focus", () => setTimeout(() => reposItems(), 50));
    setInterval(() => reposItems(), 100);
    document.addEventListener("keydown", handleKeyDown);
    updateFriendList();
    hookJoinGameButton();
    setTimeout(() => updateFriendList(), 2e3);
    setInterval(() => updateFriendList(), 6e4);
    checkUpdate();
    hookUtilsMenu();
    app.onResize = window.eval(`(function ${app.onResize.toString().replace(`App.Scale=b`, `b=App.NUIScale||b,App.Scale=b`)})`);
    App.NUIScale = SETTINGS.uiScale;
    app.onResize();
    App.Console.log(`NinjaIOUtils ${config_default.ver} Loaded Successfully!`);
    tryJoinLink();
  }, 50);
})();
