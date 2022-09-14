import config from "./config";
import reposItems, { reindexItems } from "./repositionItems";
import type { Socket } from "socket.io-client";
import { io } from "./utils";
import { SocketTypes } from "../../shared";

export default function initPartyMenu() {
  class PartyMenu extends Feature {
    ox = 0;
    oy = 0;
    off = 0;
    marginLeft = 0;
    memberList = [];
    readyState = false;
    socket: Socket;
    code = "";

    background = new PIXI.Graphics();
    closeButton = new ImgButton();
    pmTitle = new PIXI.Text("Party Manager", {
      fontName: "Arial",
      fontSize: 19,
      lineHeight: 16,
      fill: config.Colors.yellow,
      strokeThickness: 3,
      lineJoin: "round",
    });
    startContainer = new PIXI.Container();
    partyCodeText = new PIXI.Text("Enter a party code:", {
      fontName: "Arial",
      fontSize: 16,
      fill: config.Colors.yellow,
      strokeThickness: 2,
      lineJoin: "round",
    });
    codeInput = new InputField("code_input", false, 24);
    joinPartyButton = new Button("join_party");
    loadingContainer = new PIXI.Container();
    loadingText = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 16,
      fill: config.Colors.yellow,
      strokeThickness: 2,
      lineJoin: "round",
    });
    preGameContainer = new PIXI.Container();
    preGameMemberList = new PIXI.Container();
    partyCodeListText = new PIXI.Text("Party Code: ", {
      fontName: "Arial",
      fontSize: 18,
      fill: config.Colors.yellow,
      strokeThickness: 2,
      lineJoin: "round",
    });
    readyButton = new Button("join_party");
    leaveButton = new Button("leave_party");

    constructor() {
      super();

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
      this.closeButton.x = this.background.width - 40;
      this.closeButton.y = this.oy - 6;
      this.closeButton.scale.x = this.closeButton.scale.y = 0.8;
      this.closeButton.on(ImgButton.CLICK, () =>
        App.Layer.memberMenu.emit(Layer.Events.MENU_ACCESS)
      );
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
      this.readyButton.setTint(config.Colors.green);
      this.readyButton.scale.x = this.readyButton.scale.y = 0.75;
      this.readyButton.addListener(Button.BUTTON_RELEASED, () =>
        this.socket.emit("isReady", !this.readyState)
      );
      this.preGameContainer.addChild(this.readyButton);
      this.leaveButton.setText("Leave Party");
      this.leaveButton.setTint(config.Colors.red);
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
    startLoading(text: string) {
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
      this.socket = io(config.api);
      this.socket.once("connect", () => {
        this.socket.emit("init", SocketTypes.party, code, app.credential.username);
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
          this.readyButton.setTint(this.readyState ? config.Colors.red : config.Colors.green);
          this.reposition();
        }
        const text = new PIXI.Text(m.name + (m.ready ? " (Ready)" : " (Not Ready)"), {
          fontName: "Arial",
          fontSize: 16,
          fill: m.ready ? config.Colors.green : config.Colors.white,
          strokeThickness: 2,
          lineJoin: "round",
        });
        text.x = this.preGameMemberList.x;
        text.y = this.preGameMemberList.y + 14 + 18 * (i || -0.5);
        this.preGameMemberList.addChild(text);

        if (this.isPartyOwner() && i) {
          const banBtn = new Button(`ban_mem`);
          banBtn.setText("Ban");
          banBtn.setTint(config.Colors.red);
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

    app.menu.partyButton = new MemberMenuButton(
      "Party",
      config.Colors.yellow,
      18,
      "head_alpha",
      false
    );
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
