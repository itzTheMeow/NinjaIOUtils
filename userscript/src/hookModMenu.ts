import config from "./config";

export default function hookModMenu() {
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
    title1.style.fill = title2.style.fill = FontStyle.MenuTitle.fill;
    switch (menuClanState) {
      case 0:
        menu.emit(Layer.Events.MENU_ACCESS);
        break;
      case 1:
        menu.emit(Layer.Events.MEMBER_ACCESS);
        title1.style.fill = config.Colors.white;
        break;
      case 2:
        menu.emit(Layer.Events.CLAN_BROWSER_ACCESS);
        title2.style.fill = config.Colors.white;
        break;
    }
  });
  menu.memberButton.setActive = (n) => {
    if (menuClanState == 1 || (!menuClanState && !n)) {
      menu.memberclanButton.setActive(n);
      if (!n) title1.style.fill = FontStyle.MenuTitle.fill;
    }
  };
  menu.clanButton.setActive = (n) => {
    if (menuClanState == 2 || (!menuClanState && !n)) {
      menu.memberclanButton.setActive(n);
      if (!n) title2.style.fill = FontStyle.MenuTitle.fill;
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
    ...FontStyle.MenuTitle,
    fontSize: 16,
    fill: config.Colors.white,
  });
  icosep.x = 0.5 * menu.memberclanButton.rectWidth;
  icosep.y = 0.37 * menu.memberclanButton.rectHeight;
  icosep.anchor.x = icosep.anchor.y = 0.5;
  menu.memberclanButton.addChild(icosep);

  const title1 = new PIXI.Text("Players", {
    ...FontStyle.MenuTitle,
    fontSize: 10,
  });
  title1.x = 0.25 * menu.memberclanButton.rectWidth;
  menu.memberclanButton.addChild(title1);
  const title2 = new PIXI.Text("Clans", {
    ...FontStyle.MenuTitle,
    fontSize: 14,
  });
  title2.x = 0.75 * menu.memberclanButton.rectWidth;
  menu.memberclanButton.addChild(title2);
  const titlesep = new PIXI.Text("/", {
    ...FontStyle.MenuTitle,
    fontSize: 14,
    fill: config.Colors.white,
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
  //title1.tint = title2.tint = config.Colors.yellow;
  menu.container.addChild(menu.memberclanButton);

  const setActive = menu.clanButton.setActive.bind(menu.clanButton);
  menu.clanButton.setActive = (n) => {
    setActive(n);
    if (!n) menu.utilsButton.setActive(0);
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
    ox = 40;
    oy = 20;
    off = 0;
    marginLeft = 0;

    background = new PIXI.Graphics();
    closeButton = new ImgButton();
    titleText = new PIXI.Text("Mods", FontStyle.MediumOrangeText);

    constructor() {
      super();

      this.background.x = 0;
      this.background.y = 40;
      this.background.lineStyle(1, 16777215, 0.1, 0);
      this.background.beginFill(3355443, 1);
      this.background.drawRect(0, 0, 660, 524, 10);
      this.background.endFill();
      this.background.beginFill(0, 0.3);
      this.background.drawRect(10, 10, 640, 504, 10);
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

      this.reposition();
      this.container.x = 0.5 * -this.width;
    }
    reposition() {
      this.off = 0;
    }
    show() {}
  }

  App.Layer.mainMenuHides.push((App.Layer.modsMenu = new ModsMenu()));
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
  ].forEach((e) => App.Layer[e].hides.push(App.Layer.modsMenu));
  App.Layer.features.push(App.Layer.modsMenu);
}
