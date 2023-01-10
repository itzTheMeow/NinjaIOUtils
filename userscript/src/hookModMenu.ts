import { Button, Checkbox, Feature, ImgButton, InputField, MemberMenuButton } from "lib";
import { app, App, FontStyle, Layer, PIXI } from "typings";
import Mod from "./api/Mod";
import Ninja from "./api/Ninja";
import config from "./config";
import Scrollbar from "./ui/scrollbar";

export default function hookModMenu() {
  const menu = App.Layer.memberMenu;

  menu.memberButton.parent.removeChild(menu.memberButton);
  menu.clanButton.parent.removeChild(menu.clanButton);

  let menuClanState: 0 | 1 | 2 = 0;
  const memberclanButton = new MemberMenuButton("", 16763904, 18);
  memberclanButton.x = 0;
  memberclanButton.y = menu.rankingButton.y + 70;
  memberclanButton.on(MemberMenuButton.BUTTON_PRESSED, () => {
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
      memberclanButton.setActive(n);
      if (!n) title1.style.fill = FontStyle.MenuTitle.fill;
    }
  };
  menu.clanButton.setActive = (n) => {
    if (menuClanState == 2 || (!menuClanState && !n)) {
      memberclanButton.setActive(n);
      if (!n) title2.style.fill = FontStyle.MenuTitle.fill;
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
  ico1.tint = ico2.tint = config.Colors.white;
  ico1.y = ico2.y = 0.37 * memberclanButton.rectHeight;
  const icosep = new PIXI.Text("/", {
    ...FontStyle.MenuTitle,
    fontSize: 16,
    fill: config.Colors.white,
  });
  icosep.x = 0.5 * memberclanButton.rectWidth;
  icosep.y = 0.37 * memberclanButton.rectHeight;
  icosep.anchor.x = icosep.anchor.y = 0.5;
  memberclanButton.addChild(icosep);

  const title1 = new PIXI.Text("Players", {
    ...FontStyle.MenuTitle,
    fontSize: 10,
  });
  title1.x = 0.25 * memberclanButton.rectWidth;
  memberclanButton.addChild(title1);
  const title2 = new PIXI.Text("Clans", {
    ...FontStyle.MenuTitle,
    fontSize: 14,
  });
  title2.x = 0.75 * memberclanButton.rectWidth;
  memberclanButton.addChild(title2);
  const titlesep = new PIXI.Text("/", {
    ...FontStyle.MenuTitle,
    fontSize: 14,
    fill: config.Colors.white,
  });
  titlesep.x = 0.5 * memberclanButton.rectWidth;
  memberclanButton.addChild(titlesep);
  title1.y = title2.y = titlesep.y = 0.7 * memberclanButton.rectHeight;
  title1.anchor.x =
    title1.anchor.y =
    title2.anchor.x =
    title2.anchor.y =
    titlesep.anchor.x =
    titlesep.anchor.y =
      0.5;
  menu.container.addChild(memberclanButton);

  const setActive = menu.clanButton.setActive.bind(menu.clanButton);
  menu.clanButton.setActive = (n) => {
    setActive(n);
    if (!n) utilsButton.setActive(false);
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
    shownConfig: Mod | null = null;

    background = new PIXI.Graphics();
    closeButton = new ImgButton();
    titleText = new PIXI.Text("Mods", FontStyle.MediumOrangeText);
    modContainer = new PIXI.Container();
    configContainer = new PIXI.Container();
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
      this.closeButton.on("mousedown", () =>
        this.shownConfig ? this.show() : App.Layer.onMenuAccess()
      );
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

      this.configContainer.x = this.marginLeft + 4;
      this.configContainer.y = this.marginTop;
      this.container.addChild(this.configContainer);

      this.marginTop += 8;
      this.modContainer.x = this.marginLeft;
      this.modContainer.y = this.marginTop + this.filterBox.height;
      this.container.addChild(this.modContainer);

      this.scroller.x = this.width - this.scroller.width * 1.75;
      this.scroller.y = this.titleText.height * 3 + 2;
      this.scroller.on(Scrollbar().SCROLL, (prog: number) => {
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
    constructModItem(mod: Mod) {
      const iconSize = 52,
        maxDesc = 150,
        container = new PIXI.Graphics();
      container.beginFill(mod.isInstalled() ? config.Colors.green : config.Colors.white, 0.1);
      container.drawRoundedRect(0, 0, 620 - this.scroller.width, this.modItemHeight, 6);
      container.endFill();

      let pl = 0,
        pt = 0;

      const icon = new PIXI.Graphics();
      icon.beginFill(config.Colors.black, 0.2);
      icon.drawRoundedRect((pl += 10), (pt = pl), iconSize, iconSize, 8);
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
      const authorLabel = new PIXI.Text(
        mod.details.author == "builtin" ? "Built-In" : "by " + mod.details.author,
        { ...FontStyle.SmallMenuTextYellow, fontSize: 20 }
      );
      authorLabel.x = pl + label.width + 4;
      authorLabel.y = pt + 5;
      container.addChild(authorLabel);

      const description = new PIXI.Text(
        (
          mod.details.description.slice(0, maxDesc) +
          (mod.details.description.length > maxDesc ? "..." : "")
        ).trim(),
        { ...FontStyle.SmallMenuTextWhite2, wordWrap: true, wordWrapWidth: 600 }
      );
      description.x = pl = 12;
      description.y = pt += iconSize - 2;
      container.addChild(description);

      pt = 12;
      pl = container.width;
      if (!mod.details.core) {
        const button = new Button("installer");
        button.setText(mod.isInstalled() ? "Uninstall" : "Install");
        button.setTint(mod.isInstalled() ? config.Colors.red : config.Colors.green);
        button.scale.x = button.scale.y = 0.7;
        button.x = pl -= button.width;
        button.y = pt;
        button.addListener(Button.BUTTON_RELEASED, () => {
          mod.doInstall(!mod.isInstalled());
          this.indexList();
        });
        container.addChild(button);
      }
      if (mod.isInstalled() && mod.config) {
        const button = new Button("settings");
        button.scale.x = button.scale.y = 0.7;
        button.setText("");
        button.x = pl -= button.width + 8;
        button.y = pt;
        button.width = button.height;
        button.addListener(Button.BUTTON_RELEASED, () => {
          this.showConfig(mod);
        });
        const ico = new PIXI.Sprite(App.CombinedTextures["menu_icon_settings"]);
        ico.width = button.width - 4;
        ico.height = button.height - 4;
        ico.anchor.x = ico.anchor.y = 0.5;
        ico.x = 6;
        ico.y = button.height / 2 + 3;
        button.addChild(ico);
        container.addChild(button);
      }

      return container;
    }

    scrollTop = 0;
    maxMods = 3;
    show() {
      this.shownConfig = null;
      this.titleText.text = "Mods";
      this.modContainer.visible = this.filterBox.visible = this.scroller.visible = true;
      this.configContainer.visible = false;
      this.scroller.enableWheel();
      this.indexList();
    }
    indexList() {
      const mods = Ninja.mods.filter((m) => (this.showInstalled ? m.isInstalled() : true)),
        top = Math.round((mods.length - this.maxMods) * this.scrollTop);
      this.modContainer.removeChildren();
      mods
        .sort((m1, m2) => (m1.name.toLowerCase() > m2.name.toLowerCase() ? 1 : -1))
        .slice(top, top + this.maxMods)
        .forEach((m, i) => {
          const item = this.constructModItem(m);
          item.y = (this.modItemHeight + 8) * i;
          this.modContainer.addChild(item);
        });
    }
    hide() {
      this.scroller.disableWheel();
    }
    showConfig(mod: Mod) {
      this.shownConfig = mod;
      this.scroller.disableWheel();
      this.modContainer.visible = this.filterBox.visible = this.scroller.visible = false;
      this.configContainer.visible = true;
      this.titleText.text = mod.name + " Config";
      this.configContainer.removeChildren();

      let off = 0;
      const mnu = this;
      function doKeys(store: [string, any][]) {
        const name = (key: string): string => {
          const n = mod.configNames[key];
          if (!n) return key;
          else return Array.isArray(n) ? n[0] : n;
        };
        store
          .sort((e1, e2) => (name(e1[0]).toLowerCase() > name(e2[0]).toLowerCase() ? 1 : -1))
          .forEach(([key, value]) => {
            const cfgname = mod.configNames[key],
              item = mnu.constructConfigItem(
                mod,
                typeof value == "boolean"
                  ? {
                      type: "bool",
                      name: name(key),
                      key,
                      value,
                    }
                  : typeof value == "number"
                  ? {
                      type: "num",
                      name: name(key),
                      key,
                      value,
                    }
                  : {
                      type: "str",
                      name: name(key),
                      key,
                      value,
                      maxLength: typeof cfgname == "object" ? cfgname.maxLength || 0 : 0,
                    }
              );
            item.y = off;
            off += item.height;
            mnu.configContainer.addChild(item);
          });
      }
      doKeys(
        Object.entries(mod.configNames)
          .filter((e) => typeof e[1] == "object")
          .map(([k]) => [k, mod.config.get(k)])
      );
      doKeys(
        Object.entries(mod.configNames)
          .filter((e) => typeof e[1] !== "object")
          .map(([k]) => [k, mod.config.get(k)])
      );
    }

    constructConfigItem(
      mod: Mod,
      data: { name: string; key: string; maxLength?: number } & (
        | { type: "bool"; value: boolean }
        | { type: "num"; value: number }
        | { type: "str"; value: string }
      )
    ) {
      const container = new PIXI.Container();
      switch (data.type) {
        case "bool": {
          const box = new Checkbox(`config_${data.key}`, data.name, data.value);
          box.addEventListener(Checkbox.CHANGE, () => {
            mod.config.set(<any>data.key, box.checked);
            mod.configChanged(<any>data.key);
          });
          container.addChild(box);
          break;
        }
        case "str":
        case "num": {
          const isNum = data.type == "num";
          const label = new PIXI.Text(data.name, {
            fontSize: 18,
            lineHeight: 16,
            fill: 16763904,
            strokeThickness: 2,
            lineJoin: "round",
          });
          label.y = 6;
          container.addChild(label);
          const input = new InputField(`config${data.key}`);
          input.x = Math.ceil(label.width / 15) * 15 + 4;
          input.setDimensions(370, 34);
          input.setMaxChars(data.maxLength || Infinity);
          input.setText(String(data.value));
          input.setFilter(
            isNum
              ? "0123456789-"
              : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/.",
            false
          );
          input.addListener(InputField.CHANGE, function (d) {
            const val = d.data.value || "";
            mod.config.set(<any>data.key, isNum ? Number(val) : val);
            mod.configChanged(<any>data.key);
          });
          container.addChild(input);
        }
      }
      return container;
    }
  }

  const modsMenu = new ModsMenu();
  App.Layer.mainMenuHides.push(<any>modsMenu);
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
  ].forEach((e) => App.Layer[e].hides.push(modsMenu));
  App.Layer.features.push(<any>modsMenu);
}
