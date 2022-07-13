// ==UserScript==
// @name         Ninja.io Utils
// @namespace    https://itsmeow.cat
// @version      0.22
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

(function () {
  "use strict";

  let savedPass = "";
  function clearSaved() {
    window.location.hash = "";
    savedPass = "";
  }

  /* Your ping is tracked in the upper right, but not accessible from any variables. */
  App.Stats.realSetPing = App.Stats.setPing;
  App.Stats.setPing = function (ping) {
    App.Stats.ping = ping;
    return App.Stats.realSetPing(ping);
  };

  /* Typing sounds. */
  App.Console.consoleInput.addListener(InputField.CHANGE, () => {
    if (SETTINGS.typewriter) AudioEffects.ButtonHover.audio.play();
  });

  /* Store your game information in the URL. */
  function setHash(id, name, pass) {
    window.location.hash = pass
      ? `${id}&${encodeURIComponent(name)}&${encodeURIComponent(pass)}`
      : `${id}&${encodeURIComponent(name)}`;
  }

  /* Hook into the match settings. */
  Manager.prototype._applySettings = Manager.prototype.applySettings;
  Manager.prototype.applySettings = function (s) {
    this.isRanked = s.ranked;
    return this._applySettings(s);
  };

  /* Hook into the game end function. */
  Game.prototype._endGame = Game.prototype.endGame;
  Game.prototype.endGame = function (data) {
    // example - points is now omitted
    /*{
        mode: 1,
        winner: 1,
        leaderboard: {
          id: ["9", "4", "c", "0", "7", "2", "d", "a", "3", "6", "b", "8"],
          points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          kills: [21, 19, 13, 9, 8, 5, 2, 1, 1, 0, 0, -1],
          deaths: [6, 7, 7, 2, 11, 18, 3, 1, 1, 1, 0, 2],
        },
        countdown: 24,
        completed: 0,
      }*/

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
            caps: data.leaderboard.points ? data.leaderboard.points[leaderIndex] : 0,
          };

          /* Uploads your match stats to the tracker. */
          fetch(`${config.api}/ninja/submit?key=${SETTINGS.apiKey}`, {
            method: "POST",
            body: JSON.stringify(statModel),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.err) {
                App.Console.log(`Failed to upload match score! ERR_${res.err}`);
                App.Console.log(`Error: ${res.message}`);
              } else {
                App.Console.log("Successfully uploaded match score!");
              }
            })
            .catch((err) => {
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

    return this._endGame(data);
  };

  /* Add party manager button. */

  class PartyMenu extends Feature {
    constructor() {
      super();
      this.memberList = [];
      this.readyState = false;

      this.background = new PIXI.Graphics();
      this.background.interactive = !0;
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
      this.closeButton = new ImgButton();
      this.closeButton.x = this.background.width - 40;
      this.closeButton.y = this.oy - 6;
      this.closeButton.scale.x = this.closeButton.scale.y = 0.8;
      this.closeButton.on(ImgButton.CLICK, () =>
        App.Layer.memberMenu.emit(Layer.Events.MENU_ACCESS)
      );
      this.container.addChild(this.closeButton);
      this.pmTitle = new PIXI.Text("Party Manager", {
        fontName: "Arial",
        fontSize: 19,
        lineHeight: 16,
        fill: Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.pmTitle.x = 0.5 * this.width - 20;
      this.pmTitle.y = this.oy - 4;
      this.pmTitle.anchor.x = 0.5;
      this.container.addChild(this.pmTitle);
      this.container.x = 0.5 * -this.width;

      this.startContainer = new PIXI.Container();
      this.container.addChild(this.startContainer);
      this.partyCodeText = new PIXI.Text("Enter a party code:", {
        fontName: "Arial",
        fontSize: 16,
        fill: Colors.yellow,
        strokeThickness: 2,
        lineJoin: "round",
      });
      this.startContainer.addChild(this.partyCodeText);
      this.codeInput = new InputField("code_input", false, 24);
      this.codeInput.setDimensions(190, 35);
      this.codeInput.forceLowerCase = false;
      this.codeInput.setMaxChars(16);
      this.codeInput.setFilter("abcdefghijklmnopqrstuvwxyz.");
      this.codeInput.addListener(InputField.SUBMIT, () => this.joinParty());
      this.startContainer.addChild(this.codeInput);
      this.joinPartyButton = new Button("join_party");
      this.joinPartyButton.setText("Join Party");
      this.joinPartyButton.scale.x = this.joinPartyButton.scale.y = 0.75;
      this.joinPartyButton.addListener(Button.BUTTON_RELEASED, () => this.joinParty());
      this.startContainer.addChild(this.joinPartyButton);

      this.loadingContainer = new PIXI.Container();
      this.container.addChild(this.loadingContainer);
      this.loadingContainer.visible = false;
      this.loadingText = new PIXI.Text("", {
        fontName: "Arial",
        fontSize: 16,
        fill: Colors.yellow,
        strokeThickness: 2,
        lineJoin: "round",
      });
      this.loadingContainer.addChild(this.loadingText);

      this.preGameContainer = new PIXI.Container();
      this.container.addChild(this.preGameContainer);
      this.preGameContainer.visible = false;
      this.preGameContainer.addChild((this.preGameMemberList = new PIXI.Container()));
      this.partyCodeListText = new PIXI.Text("Party Code: ", {
        fontName: "Arial",
        fontSize: 18,
        fill: Colors.yellow,
        strokeThickness: 2,
        lineJoin: "round",
      });
      this.preGameContainer.addChild(this.partyCodeListText);

      this.readyButton = new Button("join_party");
      this.readyButton.setText("Ready");
      this.readyButton.setTint(Colors.green);
      this.readyButton.scale.x = this.readyButton.scale.y = 0.75;
      this.readyButton.addListener(Button.BUTTON_RELEASED, () =>
        this.socket.emit("isReady", !this.readyState)
      );
      this.preGameContainer.addChild(this.readyButton);

      this.leaveButton = new Button("leave_party");
      this.leaveButton.setText("Leave Party");
      this.leaveButton.setTint(Colors.red);
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
      this.joinPartyButton.x =
        this.marginLeft + this.codeInput.width + this.joinPartyButton.width / 6;
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
      this.startContainer.visible =
        this.loadingContainer.visible =
        this.preGameContainer.visible =
          false;
    }
    show() {}
    joinParty() {
      const code = this.codeInput.getText();
      if (!code.trim()) return this.codeInput.markInvalid(), this.codeInput.setFocus(true);
      this.startLoading("Joining party...");
      this.socket = io(`${config.api.replace(/^http/, "ws")}`);
      this.socket.once("connect", () => {
        this.socket.emit("init", code, app.credential.username);
        this.socket.once("denyJoin", () => this.startLoading("Invalid party code."));
        this.socket.once("joinedParty", (code) => {
          this.code = code;
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
          this.readyButton.setTint(this.readyState ? Colors.red : Colors.green);
          this.reposition();
        }
        const text = new PIXI.Text(m.name + (m.ready ? " (Ready)" : " (Not Ready)"), {
          fontName: "Arial",
          fontSize: 16,
          fill: m.ready ? Colors.green : Colors.white,
          strokeThickness: 2,
          lineJoin: "round",
        });
        text.x = this.preGameMemberList.x;
        text.y = this.preGameMemberList.y + 14 + 18 * (i || -0.5);
        this.preGameMemberList.addChild(text);

        if (this.isPartyOwner() && i) {
          const banBtn = new Button(`ban_mem`);
          banBtn.setText("Ban");
          banBtn.setTint(Colors.red);
          banBtn.scale.x = banBtn.scale.y = 0.5;
          banBtn.x = text.x + text.width + 12;
          banBtn.y = text.y;
          banBtn.addListener(Button.BUTTON_RELEASED, () => this.socket.emit("banMem", m.name));
          this.preGameMemberList.addChild(banBtn);
        }
      });
    }
  }
  App.Layer.mainMenuHides.push((App.Layer.partyMenu = new PartyMenu()));
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
    "guestProfileMenu",
  ].forEach((e) => App.Layer[e].hides.push(App.Layer.partyMenu));
  App.Layer.features.push(App.Layer.partyMenu);

  app.menu.partyButton = new MemberMenuButton("Party", Colors.yellow, 18, "head_alpha", false);
  app.menu.partyButton.on(MemberMenuButton.BUTTON_PRESSED, function () {
    App.Layer.mainMenuHides.forEach(function (c) {
      return App.Layer.hideFeature(c);
    });
    App.Layer.memberMenu.playButton.setActive(0);
    App.Layer.partyMenu.show();
    App.Layer.addChild(App.Layer.partyMenu);
    App.Layer.emit(Layer.Events.HIDE_MENU);
    app.onResize();
  });
  app.menu.partyButton.width *= 0.8;
  app.menu.partyButton.height *= 0.8;
  BETA && app.menu.container.addChild(app.menu.partyButton);

  function reposItems() {
    app.menu.partyButton.x = app.menu.joinButton.x + app.menu.joinButton.width + 2;
    app.menu.partyButton.y = app.menu.joinButton.y;
    App.Layer.partyMenu.reposition();
  }
  reposItems();
  window.addEventListener("resize", () => reposItems());

  /* Hook into the create game function. */
  APIClient.realPostCreateGame = APIClient.postCreateGame;
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
    savedPass = serverPass;
    setHash(serverID, serverName, serverPass);

    return APIClient.realPostCreateGame(
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

  /* Hooks into join_game event and sets your URL to the game you are in. */
  App.Layer.on("join_game", (name, id, pass) => {
    savedPass = pass || "";
    setHash(id, name, pass);
  });

  function customTab() {
    function UtilTab() {
      const tab = this;
      PIXI.Container.call(this);
      EventDispatcher.call(this);
      this.marginLeft = 40;
      this.marginTop = 52;
      this.off = this.marginTop + 6;

      /* ============= Title ============= */
      this.utilTitle = new PIXI.Text("NinjaIOUtils settings", {
        fontName: "Arial",
        fontSize: 18,
        lineHeight: 18,
        fill: Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.utilTitle.x = this.marginLeft - 5;
      this.utilTitle.y = this.off;
      this.addChild(this.utilTitle);

      /* ============= FPS Display ============= */
      this.showFPS = new Checkbox("showFPS", "Show FPS Display", true);
      this.showFPS.x = this.marginLeft;
      this.showFPS.y = this.off += 34;
      this.showFPS.on(Checkbox.CHANGE, function (b) {
        SETTINGS.showFPS = b;
        saveSettings();
        if (frameDisplay.style.display == "none" && SETTINGS.showFPS) initFPS();
      });
      this.addChild(this.showFPS);
      this.showFPS.setChecked(SETTINGS.showFPS);

      /* ============= Typewriter ============= */
      this.typewriter = new Checkbox("typewriter", "Enable Typing Noise", true);
      this.typewriter.x = this.marginLeft;
      this.typewriter.y = this.off += 34;
      this.typewriter.on(Checkbox.CHANGE, function (b) {
        SETTINGS.typewriter = b;
        saveSettings();
      });
      this.addChild(this.typewriter);
      this.typewriter.setChecked(SETTINGS.typewriter);

      /* ============= Texture Pack ============= */
      this.texTitle = new PIXI.Text("Texture Pack URL", {
        fontName: "Arial",
        fontSize: 16,
        lineHeight: 18,
        fill: Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.texTitle.x = this.marginLeft - 5;
      this.texTitle.y = this.off += 38;
      this.addChild(this.texTitle);

      this.texHint = new PIXI.Text(
        "See the userscript page for instructions. (make sure to click save)",
        {
          fontName: "Arial",
          fontSize: 14,
          fill: Colors.white,
          strokeThickness: 2,
          lineJoin: "round",
        }
      );
      this.texHint.x = this.marginLeft - 5;
      this.texHint.y = this.off += 24;
      this.addChild(this.texHint);

      this.texField = new InputField("tex_field", false, 24);
      this.texField.setDimensions(370, 35);
      this.texField.forceLowerCase = false;
      this.texField.setMaxChars(128);
      if (SETTINGS.texturePack) this.texField.setText(SETTINGS.texturePack);
      this.texField.x = this.marginLeft;
      this.texField.y = this.off += 24;
      this.texField.setFilter(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890:/?._"
      );
      this.texField.addListener(InputField.CHANGE, function (d) {
        d = d.data.value || null;
        SETTINGS.texturePack = d;
        app.menu.settingsPanel.controlsTab.forceRefresh = true;
        saveSettings();
      });
      this.addChild(this.texField);

      this.pasteTexButton = new Button("paste_tex");
      this.pasteTexButton.selected = true;
      this.pasteTexButton.setText("Paste");
      this.pasteTexButton.scale.x = this.pasteTexButton.scale.y = 0.75;
      this.pasteTexButton.addListener(Button.BUTTON_RELEASED, function () {
        navigator.clipboard.readText().then(function (d) {
          tab.texField.setText(d);
          SETTINGS.texturePack = d;
          app.menu.settingsPanel.controlsTab.forceRefresh = true;
          saveSettings();
        });
      });
      this.pasteTexButton.x = this.marginLeft + this.texField.width + this.pasteTexButton.width / 4;
      this.pasteTexButton.y = this.off + 4;
      this.addChild(this.pasteTexButton);

      this.clearTexButton = new Button("clear_tex");
      this.clearTexButton.selected = true;
      this.clearTexButton.setText("Clear");
      this.clearTexButton.scale.x = this.clearTexButton.scale.y = 0.75;
      this.clearTexButton.addListener(Button.BUTTON_RELEASED, function () {
        tab.texField.setText("");
        SETTINGS.texturePack = null;
        app.menu.settingsPanel.controlsTab.forceRefresh = true;
        saveSettings();
      });
      this.clearTexButton.x =
        this.marginLeft +
        this.texField.width +
        this.pasteTexButton.width +
        this.clearTexButton.width / 4 +
        4;
      this.clearTexButton.y = this.off + 4;
      this.addChild(this.clearTexButton);

      /* ============= API Key ============= */
      this.keyTitle = new PIXI.Text("API Key", {
        fontName: "Arial",
        fontSize: 16,
        lineHeight: 18,
        fill: Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      this.keyTitle.x = this.marginLeft - 5;
      this.keyTitle.y = this.off += 42;
      this.addChild(this.keyTitle);

      this.keyHint = new PIXI.Text(
        "The API key for uploading to the stat tracker.\nSee the userscript page for instructions.",
        {
          fontName: "Arial",
          fontSize: 14,
          fill: Colors.white,
          strokeThickness: 2,
          lineJoin: "round",
        }
      );
      this.keyHint.x = this.marginLeft - 5;
      this.keyHint.y = this.off += 24;
      this.addChild(this.keyHint);

      this.keyField = new InputField("key_field", false, 24);
      this.keyField.setDimensions(370, 35);
      this.keyField.forceLowerCase = false;
      this.keyField.setMaxChars(128);
      if (SETTINGS.apiKey) this.keyField.setText(SETTINGS.apiKey);
      this.keyField.x = this.marginLeft;
      this.keyField.y = this.off += 42;
      this.keyField.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
      this.keyField.addListener(InputField.CHANGE, function (d) {
        d = d.data.value || "";
        SETTINGS.apiKey = d;
        saveSettings();
      });
      this.addChild(this.keyField);

      this.pasteKeyButton = new Button("paste_key");
      this.pasteKeyButton.selected = true;
      this.pasteKeyButton.setText("Paste");
      this.pasteKeyButton.scale.x = this.pasteKeyButton.scale.y = 0.75;
      this.pasteKeyButton.addListener(Button.BUTTON_RELEASED, function () {
        navigator.clipboard.readText().then(function (d) {
          tab.keyField.setText(d);
          SETTINGS.apiKey = d;
          saveSettings();
        });
      });
      this.pasteKeyButton.x = this.marginLeft + this.keyField.width + this.pasteKeyButton.width / 4;
      this.pasteKeyButton.y = this.off + 4;
      this.addChild(this.pasteKeyButton);

      this.clearKeyButton = new Button("clear_key");
      this.clearKeyButton.selected = true;
      this.clearKeyButton.setText("Clear");
      this.clearKeyButton.scale.x = this.clearKeyButton.scale.y = 0.75;
      this.clearKeyButton.addListener(Button.BUTTON_RELEASED, function () {
        tab.keyField.setText("");
        SETTINGS.apiKey = "";
        saveSettings();
      });
      this.clearKeyButton.x =
        this.marginLeft +
        this.keyField.width +
        this.pasteKeyButton.width +
        this.clearKeyButton.width / 4 +
        4;
      this.clearKeyButton.y = this.off + 4;
      this.addChild(this.clearKeyButton);
    }
    UtilTab.prototype = Object.create(PIXI.Container.prototype);
    UtilTab.prototype.constructor = UtilTab;
    EventDispatcher.call(UtilTab.prototype);

    function SettingsPanelNew(w, h) {
      let pan = new SettingsPanel(w, h);

      pan.utilTab = new UtilTab();
      pan.utilTabButton = new PIXI.Text("NinjaIOUtils", {
        fontName: "Arial",
        fontSize: 18,
        lineHeight: 18,
        fill: Colors.yellow,
        strokeThickness: 3,
        lineJoin: "round",
      });
      pan.utilTabButton.resolution = 1.5 * App.DevicePixelRatio;
      pan.utilTabButton.anchor.x = pan.utilTabButton.anchor.y = 0.5;
      pan.utilTabButton.x = 358;
      pan.utilTabButton.y = 28;
      pan.addChild(pan.utilTabButton);
      pan.utilTabButtonBackground = new PIXI.Graphics();
      pan.utilTabButtonBackground.beginFill(16777215, 0.1);
      pan.utilTabButtonBackground.drawRoundedRect(0, 0, 112, 30, 2);
      pan.utilTabButtonBackground.endFill();
      pan.utilTabButtonBackground.x = 302;
      pan.utilTabButtonBackground.y = 12;
      pan.utilTabButtonBackground.interactive = !0;
      pan.utilTabButtonBackground.on(
        "touchstart",
        pan.displayTab.bind(pan, SettingsPanel.Tabs.UTIL)
      );
      pan.utilTabButtonBackground.on(
        "mousedown",
        pan.displayTab.bind(pan, SettingsPanel.Tabs.UTIL)
      );
      pan.utilTabButtonBackground.on("mouseover", function () {
        pan.utilTabButtonBackground.tint = 11184810;
      });
      pan.utilTabButtonBackground.on("mouseout", function () {
        pan.utilTabButtonBackground.tint = 16777215;
      });
      pan.addChild(pan.utilTabButtonBackground);

      return pan;
    }
    SettingsPanel.Tabs.UTIL = "util";
    const oldX = app.menu.settingsPanel.x,
      oldY = app.menu.settingsPanel.y;
    app.menu.settingsPanel.destroy();
    app.menu.settingsPanel = SettingsPanelNew(660, 524);
    app.menu.settingsPanel.x = oldX;
    app.menu.settingsPanel.y = oldY;
    app.menu.resize();

    app.menu.settingsPanel.displayTab = function (a) {
      AudioEffects.ButtonClick.audio.play();
      saveSettings();
      switch (a) {
        case SettingsPanel.Tabs.GRAPHICS:
          this.controlsTab.parent && this.removeChild(this.controlsTab);
          this.soundTab.parent && this.removeChild(this.soundTab);
          this.utilTab.parent && this.removeChild(this.utilTab);
          this.addChild(this.graphicsTab);
          this.soundTabButtonBackground.alpha = 1;
          this.graphicsTabButtonBackground.alpha = 0;
          this.controlsTabButtonBackground.alpha = 1;
          this.utilTabButtonBackground.alpha = 1;
          break;
        case SettingsPanel.Tabs.CONTROLS:
          this.graphicsTab.parent && this.removeChild(this.graphicsTab);
          this.soundTab.parent && this.removeChild(this.soundTab);
          this.utilTab.parent && this.removeChild(this.utilTab);
          this.soundTabButtonBackground.alpha = 1;
          this.graphicsTabButtonBackground.alpha = 1;
          this.controlsTabButtonBackground.alpha = 0;
          this.utilTabButtonBackground.alpha = 1;
          this.addChild(this.controlsTab);
          break;
        case SettingsPanel.Tabs.SOUND:
          this.graphicsTab.parent && this.removeChild(this.graphicsTab);
          this.controlsTab.parent && this.removeChild(this.controlsTab);
          this.utilTab.parent && this.removeChild(this.utilTab);
          this.soundTabButtonBackground.alpha = 0;
          this.graphicsTabButtonBackground.alpha = 1;
          this.controlsTabButtonBackground.alpha = 1;
          this.utilTabButtonBackground.alpha = 1;
          this.addChild(this.soundTab);
          break;
        case SettingsPanel.Tabs.UTIL:
          this.graphicsTab.parent && this.removeChild(this.graphicsTab);
          this.controlsTab.parent && this.removeChild(this.controlsTab);
          this.soundTab.parent && this.removeChild(this.soundTab);
          this.soundTabButtonBackground.alpha = 1;
          this.graphicsTabButtonBackground.alpha = 1;
          this.controlsTabButtonBackground.alpha = 1;
          this.utilTabButtonBackground.alpha = 0;
          this.addChild(this.utilTab);
          break;
      }
    };
    [
      [app.menu.settingsPanel.graphicsTabButtonBackground, SettingsPanel.Tabs.GRAPHICS],
      [app.menu.settingsPanel.controlsTabButtonBackground, SettingsPanel.Tabs.CONTROLS],
      [app.menu.settingsPanel.soundTabButtonBackground, SettingsPanel.Tabs.SOUND],
      [app.menu.settingsPanel.utilTabButtonBackground, SettingsPanel.Tabs.UTIL],
    ].forEach((d) => {
      d[0].on("mousedown", app.menu.settingsPanel.displayTab.bind(app.menu.settingsPanel, d[1]));
      d[0]._events.mousedown.shift();
    });
  }
  customTab();
  /*
   * All of the above code is just copied from the main bundle, with the new settings tab added.
   * I couldn't really see a better way to do this, so this is how it's done for now.
   * This could break in the future if a new settings tab is added.
   */
  App.Console.log("Successfully injected settings tab.");

  Client.prototype.onMessage = function (a) {
    a = Client.decompress(a.data);
    // console.log(a);
    /* Hooks into the join message and gets the server name you join using. */
    if (
      a.type == packetTypeMap.data &&
      a.data.type == packetTypeMap.joinedMessage &&
      a.data.info.startsWith("You joined ")
    ) {
      let roomName = a.data.info.substring("You joined ".length);
      setHash(app.client.server.id, roomName, savedPass);
    }
    const repFail = () => App.Console.log(`# Failed to identify map. Please report to Meow.`);
    const repSuccess = (id, name) => App.Console.log(`# Identified map as ${name} (ID: ${id}).`);
    if (
      a.type == packetTypeMap.data2 &&
      a.data.t == packetTypeMap.systemMessage &&
      a.data.msg.startsWith("Joining ")
    ) {
      const mapName = (a.data.msg.match(/(?: - )(.*)(?: by)/) || [])[1];
      this.mapID = 0;
      if (mapName) {
        const mapID = MapIDs[mapName];
        if (mapID) {
          repSuccess(mapID, mapName);
          this.mapID = mapID;
        } else repFail();
      } else repFail();
    } else if (
      a.type == packetTypeMap.data2 &&
      a.data.t == packetTypeMap.systemMessage &&
      a.data.msg.startsWith("loading map: ")
    ) {
      const mapName = a.data.msg.substring("loading map: ".length);
      this.mapID = 0;
      if (mapName) {
        const mapID = MapIDs[mapName];
        if (mapID) {
          repSuccess(mapID, mapName);
          this.mapID = mapID;
        } else repFail();
      } else repFail();
    }
    this.dispatchEvent(a);
  };
  /* Upon disconnect, remove the saved server. */
  app.client.addListener(Protocol.DISCONNECT, function (c) {
    clearSaved();
    customTab();
  });

  /* Hook for improved fullscreen. */
  window.addEventListener("keydown", (e) => {
    if (e.key == "F11") {
      e.preventDefault();
      if (document.fullscreenElement) document.exitFullscreen();
      else document.querySelector("html").requestFullscreen();
    }
  });

  App.Console.log(`NinjaIOUtils ${config.ver} Loaded Successfully!`);

  if (!roomDetails) return;
  /* Extract room details from URL. */
  const [id, name, pass] = roomDetails.split("&").map(decodeURIComponent);
  if (!id || !name) return;
  App.Console.log(`Attempting to join room ${name}...`);
  const loadingMenu = App.Layer.loadingMenu;

  /* Shows loading menu. */
  App.Layer.addChild(loadingMenu);
  loadingMenu.show();
  loadingMenu.setTitle(`Click to join server.\n${name}`);
  loadingMenu.cancelCount = -1;

  loadingMenu.joinButton = new Button("join");
  loadingMenu.joinButton.selected = true;
  loadingMenu.joinButton.setText("Join");
  loadingMenu.joinButton.scale.x = loadingMenu.joinButton.scale.y = 0.8;
  loadingMenu.joinButton.addListener(Button.BUTTON_RELEASED, function () {
    removeJoinStuff();
    loadingMenu.show();
    /* Joins the game using the specified details. */
    App.Layer.emit("join_game", name, id, pass || "");
  });
  loadingMenu.joinButton.x =
    loadingMenu.title.x + 0.5 * (loadingMenu.title.width - loadingMenu.joinButton.width);
  loadingMenu.joinButton.y = loadingMenu.title.y + 40;
  loadingMenu.joinButton.setTint(Colors.green);
  loadingMenu.container.addChild(loadingMenu.joinButton);

  loadingMenu.cancelButton2 = new Button("cancel2");
  loadingMenu.cancelButton2.setText("Cancel");
  loadingMenu.cancelButton2.scale.x = loadingMenu.cancelButton2.scale.y = 0.8;
  loadingMenu.cancelButton2.addListener(Button.BUTTON_RELEASED, function () {
    removeJoinStuff();
    clearSaved();
    return loadingMenu.emit(Layer.Events.LOADING_CANCEL);
  });
  loadingMenu.cancelButton2.x = loadingMenu.joinButton.x + loadingMenu.joinButton.width + 8;
  loadingMenu.cancelButton2.y = loadingMenu.title.y + 40;
  loadingMenu.cancelButton2.setTint(Colors.red);
  loadingMenu.container.addChild(loadingMenu.cancelButton2);

  loadingMenu.title.y -= 36;

  function removeJoinStuff() {
    loadingMenu.title.y += 36;
    loadingMenu.container.removeChild(loadingMenu.joinButton);
    loadingMenu.container.removeChild(loadingMenu.cancelButton2);
  }
})();
