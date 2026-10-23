import {
  AudioEffects,
  Button,
  Checkbox,
  Feature,
  ImgButton,
  InputField,
  MemberBrowserScrollbar,
  UITheme,
} from "lib";
import { app, App, FontStyle, Layer, PIXI } from "lib";
import Mod from "./api/Mod";
import Ninja from "./api/Ninja";
import { cloneTextStyle, paintListRow } from "./utils";

export default function hookModMenu() {
  let menu = Ninja.activeMenu();

  // just replace the utils button with the mods button
  function hookUtilsButton() {
    if (!app.menu) return;
    app.menu.utilsIcon.label.text = "MODS";
    app.menu.utilsIcon.off("mousedown");
    app.menu.utilsIcon.on("mousedown", () =>
      App.Layer.emit(Layer.Events.MODS_ACCESS),
    );
  }
  // showMenu rebuilds the button every time it runs
  Ninja.hookMethod(App.prototype, "showMenu", {
    priority: 10,
    callback: hookUtilsButton,
  });
  hookUtilsButton();

  App.Layer.on(Layer.Events.MODS_ACCESS, () => {
    menu = Ninja.activeMenu();
    menu.emit(Layer.Events.MENU_ACCESS);
    menu.playButton.setActive(false);
    // the menu hides before mouseout can fire, so un-hover the button
    app.menu?.utilsIcon.draw(false);
    modsMenu.show();
    App.Layer.addChild(modsMenu);
    App.Layer.emit(Layer.Events.HIDE_MENU);
    app.onResize();
  });

  class ModsMenu extends Feature {
    panelWidth = 844;
    panelHeight = 524;
    rowWidth = 750;
    modItemHeight = 110;
    showInstalled = false;
    shownConfig: Mod | null = null;

    background: PIXI.Graphics;
    closeButton = new ImgButton();
    titleText: PIXI.Text;
    modContainer = new PIXI.Container();
    configContainer = new PIXI.Container();
    filterBox = new Checkbox("filter", "Show Installed", this.showInstalled);
    scroller: MemberBrowserScrollbar;

    constructor() {
      super();

      this.background = UITheme.createUIPanel(
        this.panelWidth,
        this.panelHeight,
      );
      this.background.x = 0;
      this.background.y = 40;
      this.container.addChild(this.background);

      const contentPanel = UITheme.createUIPanel(this.panelWidth - 42, 446, 4);
      contentPanel.x = 21;
      contentPanel.y = 104;
      contentPanel.alpha = 0.54;
      this.container.addChild(contentPanel);

      const headerLine = new PIXI.Graphics();
      headerLine
        .rect(24, 92, this.panelWidth - 48, 1)
        .fill({ color: UITheme.MenuColors.panelStroke, alpha: 0.32 });
      this.container.addChild(headerLine);

      this.titleText = new PIXI.Text("Mods", <any>{
        fontFamily: "Teko",
        fontSize: 28,
        fontWeight: "500",
        fill: "#ff9f00",
        letterSpacing: 0.5,
        stroke: { color: 0, width: 2 },
        lineJoin: "round",
      });
      this.titleText.x = 24;
      this.titleText.y = 58;
      this.titleText.resolution = 2;
      this.container.addChild(this.titleText);

      this.closeButton = new ImgButton();
      this.closeButton.x = this.panelWidth - 44;
      this.closeButton.y = 58;
      this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
      this.closeButton.on("mousedown", () =>
        this.shownConfig
          ? this.show()
          : Ninja.activeMenu().emit(Layer.Events.MENU_ACCESS),
      );
      this.container.addChild(this.closeButton);

      // top right, like the name search field on the clan/players pages
      this.filterBox.x = this.panelWidth - this.filterBox.width - 56;
      this.filterBox.y = 62;
      this.filterBox.addEventListener(Checkbox.CHANGE, () => {
        this.showInstalled = this.filterBox.checked;
        this.indexList();
      });
      this.container.addChild(this.filterBox);

      this.configContainer.x = 32;
      this.configContainer.y = 116;
      this.container.addChild(this.configContainer);

      this.modContainer.x = 32;
      this.modContainer.y = 130;
      this.container.addChild(this.modContainer);

      this.scroller = new MemberBrowserScrollbar(390);
      this.scroller.x = this.panelWidth - 54;
      this.scroller.y = 130;
      this.scroller.on(MemberBrowserScrollbar.SCROLL, (prog: number) => {
        this.scrollTop = prog;
        this.indexList();
      });
      this.container.addChild(this.scroller);

      this.container.x = 0.5 * -this.panelWidth;
    }
    constructModItem(mod: Mod, index: number) {
      const iconSize = 52,
        maxDesc = 150,
        container = new PIXI.Graphics();

      const edgeColor = mod.isInstalled()
        ? UITheme.MenuColors.success
        : UITheme.MenuColors.accent;
      const paintRow = (hovered: boolean) =>
        paintListRow(
          container,
          this.rowWidth,
          this.modItemHeight,
          index,
          hovered,
          edgeColor,
        );
      paintRow(false);
      container.eventMode = "static";
      container.on("mouseover", () => {
        paintRow(true);
        AudioEffects.ButtonHover.audio.play();
      });
      container.on("mouseout", () => paintRow(false));

      let pl = 0,
        pt = 0;

      const icon = new PIXI.Graphics();
      icon
        .clear()
        .beginPath()
        .setFillStyle({
          color: UITheme.MenuColors.panelDeep,
          alpha: 0.5,
        })
        .roundRect((pl += 10), (pt = pl), iconSize, iconSize, 8)
        .fill();
      const iconSprite = new PIXI.Sprite(
        App.CombinedTextures[mod.details.icon],
      );
      iconSprite.width = iconSprite.height = iconSize - 10;
      iconSprite.anchor.x = iconSprite.anchor.y = 0.5;
      iconSprite.x = iconSize / 2 + pl;
      iconSprite.y = iconSize / 2 + pt;
      icon.addChild(iconSprite);
      container.addChild(icon);
      iconSprite.scale.set(Math.min(iconSprite.scale.x, iconSprite.scale.y));

      const label = new PIXI.Text({
        text: mod.name,
        style: cloneTextStyle(FontStyle.ClanTitle, { fontSize: 30 }),
      });
      label.x = pl += iconSize + 4;
      label.y = pt += 8;
      container.addChild(label);
      const authorLabel = new PIXI.Text({
        text:
          mod.details.author == "builtin"
            ? "Built-In"
            : "by " + mod.details.author,
        style: cloneTextStyle(FontStyle.SmallMenuTextYellow, { fontSize: 20 }),
      });
      authorLabel.x = pl + label.width + 4;
      authorLabel.y = pt + 5;
      container.addChild(authorLabel);

      const description = new PIXI.Text({
        text: (
          mod.details.description.slice(0, maxDesc) +
          (mod.details.description.length > maxDesc ? "..." : "")
        ).trim(),
        style: cloneTextStyle(FontStyle.SmallMenuTextWhite2, {
          wordWrap: true,
          wordWrapWidth: 640,
        }),
      });
      description.x = pl = 12;
      description.y = pt += iconSize - 2;
      container.addChild(description);

      pt = 12;
      pl = container.width;
      if (!mod.details.core) {
        const button = new Button("installer");
        button.setText(mod.isInstalled() ? "Uninstall" : "Install");
        button.setTint(
          mod.isInstalled()
            ? UITheme.MenuColors.danger
            : UITheme.MenuColors.success,
        );
        button.edge.stroke({ color: 0xffffff, width: 1.5 });
        button.scale.x = button.scale.y = 0.8;
        button.x = pl -= button.width;
        button.y = pt;
        button.addListener(Button.BUTTON_RELEASED, () => {
          mod.doInstall(!mod.isInstalled());
          this.indexList();
        });
        container.addChild(button);
        if (!mod.isInstalled() && mod.details.recommend) {
          const recLabel = new PIXI.Text({
            text: "Recommended",
            style: cloneTextStyle(FontStyle.SmallMenuTextYellow, {
              fontSize: 12,
            }),
          });
          recLabel.x = pl -= recLabel.width + 15;
          recLabel.y = pt + 2;
          container.addChild(recLabel);
        }
        if (mod.details.noGuests) {
          const noGuestsLabel = new PIXI.Text({
            text: "Cannot be used by guests",
            style: cloneTextStyle(FontStyle.SmallMenuTextYellow, {
              fontSize: 12,
              fill: "#ffffff",
            }),
          });
          noGuestsLabel.x = pl - noGuestsLabel.width + button.width - 7;
          noGuestsLabel.y = button.height + pt + 1;
          container.addChild(noGuestsLabel);

          if (!mod.isInstalled() && Ninja.isGuest()) {
            button.disable();
          }
        }
      }
      if (mod.isInstalled() && mod.config) {
        const button = new Button("settings");
        button.scale.x = button.scale.y = 0.8;
        button.setText("  ");
        button.x = pl -= button.width + 8;
        button.y = pt;
        button.addListener(Button.BUTTON_RELEASED, () => {
          this.showConfig(mod);
        });
        const ico = new PIXI.Sprite(App.CombinedTextures.gears_icon);
        ico.width = button.width;
        ico.height = button.height;
        ico.x = button.width * -0.2;
        ico.y = button.height * 0.1;
        button.addChild(ico);
        // hover border in the standard button gray
        button.edge.stroke({
          color: UITheme.MenuColors.border,
          width: 1.5,
        });
        container.addChild(button);
      }

      return container;
    }

    scrollTop = 0;
    maxMods = 3;
    show() {
      this.shownConfig = null;
      this.titleText.text = "Mods";
      this.modContainer.visible =
        this.filterBox.visible =
        this.scroller.visible =
          true;
      this.configContainer.visible = false;
      this.scroller.enableWheel();
      this.indexList();
    }
    indexList() {
      const mods = Ninja.mods.filter((m) =>
          this.showInstalled ? m.isInstalled() : true,
        ),
        top = Math.max(
          0,
          Math.round((mods.length - this.maxMods) * this.scrollTop),
        );
      this.modContainer.removeChildren();
      mods
        .sort((m1, m2) =>
          m1.name.toLowerCase() > m2.name.toLowerCase() ? 1 : -1,
        )
        .slice(top, top + this.maxMods)
        .forEach((m, i) => {
          const item = this.constructModItem(m, top + i);
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
      this.modContainer.visible =
        this.filterBox.visible =
        this.scroller.visible =
          false;
      this.configContainer.visible = true;
      this.titleText.text = mod.name + " Config";
      this.configContainer.removeChildren();

      let off = 0;
      const mnu = this;
      function doKeys(store: [string, any][]) {
        const name = (key: string): string => {
          const n = mod.configNames[key];
          if (!n) return key;
          else return typeof n == "string" ? n : n.name;
        };
        store
          .sort((e1, e2) =>
            name(e1[0]).toLowerCase() > name(e2[0]).toLowerCase() ? 1 : -1,
          )
          .forEach(([key, value]) => {
            const cfgname = mod.configNames[key],
              item = mnu.constructConfigItem(
                mod,
                Array.isArray(value)
                  ? {
                      type: "list",
                      name: name(key),
                      key,
                      value,
                      removableElements:
                        typeof cfgname === "object"
                          ? (cfgname.removableElements ?? false)
                          : false,
                    }
                  : typeof value === "boolean"
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
                          maxLength:
                            typeof cfgname == "object"
                              ? cfgname.maxLength || 0
                              : 0,
                        },
              );
            item.y = off;
            off += item.height + 10;
            mnu.configContainer.addChild(item);
          });
      }
      doKeys(
        Object.entries(mod.configNames)
          .filter((e) => typeof e[1] == "object")
          .map(([k]) => [k, mod.config.get(k)]),
      );
      doKeys(
        Object.entries(mod.configNames)
          .filter((e) => typeof e[1] !== "object")
          .map(([k]) => [k, mod.config.get(k)]),
      );
    }

    constructConfigItem(
      mod: Mod,
      data: { name: string; key: string; maxLength?: number } & (
        | { type: "bool"; value: boolean }
        | { type: "num"; value: number }
        | { type: "str"; value: string }
        | { type: "list"; value: any[]; removableElements: boolean }
      ),
    ) {
      const container = new PIXI.Container();
      switch (data.type) {
        case "bool": {
          const box = new Checkbox(`config_${data.key}`, data.name, data.value);
          box.addEventListener(Checkbox.CHANGE, () => {
            mod.config.set(data.key, box.checked);
            mod.configChanged(data.key);
          });
          container.addChild(box);
          break;
        }
        case "str":
        case "num": {
          const isNum = data.type == "num";
          const label = new PIXI.Text({
            text: data.name,
            style: cloneTextStyle(FontStyle.SmallMenuTextOrange3, {
              fontSize: 16,
            }),
          });
          label.y = 6;
          container.addChild(label);
          const input = new InputField(`config${data.key}`);
          input.x = Math.ceil(label.width / 15) * 15 + 4;
          input.setDimensions(500, 34);
          input.setMaxChars(data.maxLength || Infinity);
          input.setText(String(data.value));
          input.setFilter(
            isNum
              ? "0123456789.-"
              : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/.",
            false,
          );
          input.addListener(InputField.CHANGE, function (d) {
            const val = d.data.value || "";
            mod.config.set(data.key, isNum ? Number(val) : val);
            mod.configChanged(data.key);
          });
          container.addChild(input);
          break;
        }
        case "list": {
          const label = new PIXI.Text({
            text: data.name,
            style: cloneTextStyle(FontStyle.SmallMenuTextOrange3, {
              fontSize: 16,
            }),
          });
          label.y = 6;
          container.addChild(label);

          const listWidth = 300;
          const listHeight = 150;
          const listBackground = new PIXI.Graphics();
          listBackground
            .clear()
            .roundRect(0, 0, listWidth, listHeight, 4)
            .fill({ color: UITheme.MenuColors.panelDeep, alpha: 0.5 })
            .stroke({
              color: UITheme.MenuColors.panelStroke,
              width: 1,
              alpha: 0.34,
            });
          listBackground.y = label.height + 10;
          container.addChild(listBackground);

          const scrollContainer = new PIXI.Container();
          scrollContainer.y = listBackground.y;
          container.addChild(scrollContainer);

          const mask = new PIXI.Graphics();
          mask
            .clear()
            .beginPath()
            .roundRect(0, 0, listWidth - 15, listHeight, 6)
            .fill({ color: 0xffffff });
          mask.x = 0;
          mask.y = 0;
          scrollContainer.addChild(mask);
          scrollContainer.mask = mask;

          const scrollContent = new PIXI.Container();
          scrollContainer.addChild(scrollContent);

          const scrollbar = new MemberBrowserScrollbar(listHeight);
          scrollbar.x = listWidth - scrollbar.width + 5;
          scrollbar.y = listBackground.y + 4;
          container.addChild(scrollbar);
          let scrollProgress = 0;

          scrollbar.on(MemberBrowserScrollbar.SCROLL, (prog) => {
            scrollProgress = prog;
            scrollContent.y = -Math.round(
              (scrollContent.height - listHeight) * prog,
            );
          });

          function refreshList() {
            if (data.type !== "list") return;
            scrollContent.removeChildren();
            let offY = 5;
            data.value.forEach((item, index) => {
              const itemRow = new PIXI.Container();
              itemRow.y = offY;
              const itemName = new PIXI.Text({
                text: item,
                style: cloneTextStyle(FontStyle.SmallMenuTextWhite, {
                  fontSize: 16,
                }),
              });
              itemName.x = 10;
              itemRow.addChild(itemName);

              if (data.removableElements) {
                const removeButton = new Button("remove");
                removeButton.setText("Delete");
                removeButton.setTint(UITheme.MenuColors.danger);
                removeButton.scale.set(0.7);
                removeButton.x = listWidth - removeButton.width - 10;
                removeButton.addListener(Button.BUTTON_RELEASED, () => {
                  data.value.splice(index, 1);
                  mod.config.set(data.key, data.value);
                  mod.configChanged(data.key);
                  refreshList();
                });
                itemRow.addChild(removeButton);
              }

              offY += itemName.height + 8;
              scrollContent.addChild(itemRow);
            });

            if (scrollContent.height > listHeight) {
              scrollbar.enableWheel();
              scrollbar.visible = true;
              scrollContent.y = -Math.round(
                (scrollContent.height - listHeight) * scrollProgress,
              );
            } else {
              scrollbar.disableWheel();
              scrollbar.visible = false;
              scrollContent.y = 0;
              scrollProgress = 0;
            }
          }

          refreshList();
          break;
        }
      }
      return container;
    }
  }

  const modsMenu = new ModsMenu();
  App.Layer.mainMenuHides.push(<any>modsMenu);
  // register as a hide on all features
  for (const feature of Object.values(App.Layer))
    if (feature instanceof Feature) feature.hides.push(modsMenu);
  App.Layer.features.push(<any>modsMenu);
}
