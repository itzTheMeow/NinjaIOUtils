import config from "./config";

export default function hookUtilsMenu() {
  const menu = App.Layer.memberMenu;

  menu.memberButton.parent.removeChild(menu.memberButton);
  menu.clanButton.parent.removeChild(menu.clanButton);

  let menuClanState: 0 | 1 | 2 = 0;
  menu.memberclanButton = new MemberMenuButton("", 16763904, 18);
  menu.memberclanButton.x = 0;
  menu.memberclanButton.y = menu.rankingButton.y + 70;
  menu.memberclanButton.on(MemberMenuButton.BUTTON_PRESSED, () => {
    if (!["member", "clan"].includes(App.Layer.memberMenu.mode)) menuClanState = 0;
    menuClanState++;
    if (menuClanState == 3) menuClanState = 0;
    title1.tint = title2.tint = config.Colors.yellow;
    switch (menuClanState) {
      case 0:
        menu.emit(Layer.Events.MENU_ACCESS);
        break;
      case 1:
        menu.emit(Layer.Events.MEMBER_ACCESS);
        title1.tint = config.Colors.green;
        break;
      case 2:
        menu.emit(Layer.Events.CLAN_BROWSER_ACCESS);
        title2.tint = config.Colors.green;
        break;
    }
  });
  menu.memberButton.setActive = (n) => {
    if (menuClanState == 1 || (!menuClanState && !n)) {
      menu.memberclanButton.setActive(n);
      if (!n) title1.tint = config.Colors.yellow;
    }
  };
  menu.clanButton.setActive = (n) => {
    if (menuClanState == 2 || (!menuClanState && !n)) {
      menu.memberclanButton.setActive(n);
      if (!n) title2.tint = config.Colors.yellow;
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
  ico1.tint = ico2.tint = config.Colors.white;
  ico1.y = ico2.y = 0.37 * menu.memberclanButton.rectHeight;
  const icosep = new PIXI.Text("/", {
    fontSize: 16,
    fontName: "Arial",
    fill: config.Colors.white,
    lineJoin: "round",
    strokeThickness: 3,
  });
  icosep.x = 0.5 * menu.memberclanButton.rectWidth;
  icosep.y = 0.37 * menu.memberclanButton.rectHeight;
  icosep.anchor.x = icosep.anchor.y = 0.5;
  menu.memberclanButton.addChild(icosep);

  const title1 = new PIXI.Text("Players", {
    fontSize: 11,
    fontName: "Arial",
    fill: config.Colors.white,
    lineJoin: "round",
    strokeThickness: 2,
  });
  title1.x = 0.25 * menu.memberclanButton.rectWidth;
  menu.memberclanButton.addChild(title1);
  const title2 = new PIXI.Text("Clans", {
    fontSize: 14,
    fontName: "Arial",
    fill: config.Colors.white,
    lineJoin: "round",
    strokeThickness: 2,
  });
  title2.x = 0.75 * menu.memberclanButton.rectWidth;
  menu.memberclanButton.addChild(title2);
  const titlesep = new PIXI.Text("/", {
    fontSize: 16,
    fontName: "Arial",
    fill: config.Colors.white,
    lineJoin: "round",
    strokeThickness: 3,
  });
  titlesep.x = 0.5 * menu.memberclanButton.rectWidth;
  menu.memberclanButton.addChild(titlesep);
  title1.y = title2.y = titlesep.y = 0.7 * menu.memberclanButton.rectHeight;
  title1.anchor.x =
    title1.anchor.y =
    title2.anchor.x =
    title2.anchor.y =
    titlesep.anchor.x =
    titlesep.anchor.y =
      0.5;
  title1.tint = title2.tint = config.Colors.yellow;
  menu.container.addChild(menu.memberclanButton);

  const setActive = menu.clanButton.setActive.bind(menu.clanButton);
  menu.clanButton.setActive = (n) => {
    setActive(n);
    if (!n) menu.utilsButton.setActive(0);
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
      fill: config.Colors.yellow,
      strokeThickness: 3,
      lineJoin: "round",
    });

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

      this.reposition();
    }
    reposition() {
      this.off = 0;
    }
    show() {}
  }

  App.Layer.mainMenuHides.push((App.Layer.utilsMenu = new UtilsMenu()));
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
  ].forEach((e) => App.Layer[e].hides.push(App.Layer.utilsMenu));
  App.Layer.features.push(App.Layer.utilsMenu);
}
