import config from "../../userscript/src/config";
import { SETTINGS } from "./settings/settings";

export default function hookPlayerData() {
  Manager.prototype._createLocalPlayer = Manager.prototype.createLocalPlayer;
  Manager.prototype.createLocalPlayer = function (...d) {
    const plr = this._createLocalPlayer(...d);
    this.localPlayer.update(null, null, null, true);
    return plr;
  };
  Player.prototype._update = Player.prototype.update;
  Player.prototype.update = function (...d: any[]) {
    const doForce = d[3] == true;
    const upd = !doForce ? this._update(...d) : null;
    if (SETTINGS.helpfulUI) {
      const isLocal = doForce || this.id == app.game.manager.getLocalPlayer()?.id,
        hideHUD = this.alive && (isLocal || !this.prone) && !app.game.gameover;
      const hpbar: typeof HealthBar = this.hpbar || (this.hpbar = new HealthBar());
      if (!hpbar.parent) {
        this.visual.addChild(hpbar);
        hpbar.scale.x = hpbar.scale.y = 0.25;
        hpbar.x = -hpbar.width / 2;
        hpbar.y = isLocal ? -65 : -50;
        hpbar.background.visible = false;
      }
      if (hpbar.getValue() !== this.health) hpbar.setValue(this.health);
      hpbar.visible = hideHUD;
      if (isLocal) {
        const jetbar: typeof JetBar = this.jetbar || (this.jetbar = new JetBar());
        if (!jetbar.parent) {
          this.visual.addChild(jetbar);
          jetbar.scale.x = jetbar.scale.y = 0.25;
          jetbar.x = -jetbar.width / 2;
          jetbar.y = -50;
          jetbar.background.visible = false;
        }
        this.jetLeft = app.game.hud.jetBar.getValue();
        if (jetbar.getValue() !== this.jetLeft) jetbar.setValue(this.jetLeft);
        if (!app.game.hud.jetBar._setValue) {
          app.game.hud.jetBar._setValue = app.game.hud.jetBar.setValue;
          app.game.hud.jetBar.setValue = (v: number) => {
            jetbar.maxValue = app.game.hud.jetBar.maxValue;
            jetbar.setValue(v);
            return app.game.hud.jetBar._setValue(v);
          };
        }
        jetbar.visible = hideHUD;
        const ammobar: Graphics & {
          value: number;
          max: number;
          update(): void;
          lastUpdate: number;
          reloadTime: number;
          item: string | null;
        } = this.ammobar || (this.ammobar = new PIXI.Graphics());
        if (!ammobar.parent) {
          app.game.reticle.addChild(ammobar);
          ammobar.x = -18;
          ammobar.y = 26;
          ammobar.scale.x = ammobar.scale.y = 0.3;
          ammobar.rotation = -Math.PI / 2;
        }
        this.ammoLeft = app.game.hud.ammoBar.getValue();
        if (ammobar.value !== this.ammoLeft) ammobar.value = this.ammoLeft;
        (ammobar.update =
          ammobar.update ||
          (() => {
            const delta = Date.now() - ammobar.lastUpdate,
              maxReload =
                config.WeaponReloadTimes[
                  Object.entries(ItemList).find((e) => e[1] == ammobar.item)?.[0]
                ] || 0;
            if (ammobar.reloadTime) ammobar.reloadTime = ammobar.reloadTime - delta || -1;
            else ammobar.reloadTime = maxReload;
            ammobar.lastUpdate = Date.now();
            ammobar.value = app.game.hud.ammoBar.getValue();
            ammobar.max = app.game.hud.ammoBar.maxValue;
            if (!maxReload || ammobar.value > 0) ammobar.reloadTime = 0;
            const w = 12,
              r = 30,
              clr = ammobar.value > 0 ? config.Colors.yellow : config.Colors.red;
            ammobar.clear();
            ammobar.lineStyle(w, clr, 0.2);
            ammobar.arc(0, 0, r, 0, Math.PI * 2);
            ammobar.lineStyle(w, clr);
            ammobar.arc(
              0,
              0,
              r,
              0,
              Math.PI *
                2 *
                (ammobar.value > 0
                  ? ammobar.value / ammobar.max
                  : ammobar.reloadTime > 0
                  ? ammobar.reloadTime / Math.max(0, maxReload) || ammobar.reloadTime
                  : 1)
            );
            ammobar.endFill();
            if (ammobar.reloadTime > 0) setTimeout(() => ammobar.update(), 10);
          }))();
        if (!app.game.hud.ammoBar._update) {
          app.game.hud.ammoBar._update = app.game.hud.ammoBar.update;
          app.game.hud.ammoBar.update = () => {
            app.game.hud.ammoBar._update();
            ammobar.update();
          };
        }
        if (!app.game.hud.ammoBar._setValue) {
          app.game.hud.ammoBar._setValue = app.game.hud.ammoBar.setValue;
          app.game.hud.ammoBar.setValue = (v: number) => {
            app.game.hud.ammoBar._setValue(v);
            ammobar.update();
          };
        }
        if (!app.game.hud.ammoBar._setItem) {
          app.game.hud.ammoBar._setItem = app.game.hud.ammoBar.setItem;
          app.game.hud.ammoBar.setItem = (i) => {
            app.game.hud.ammoBar._setItem(i);
            ammobar.item = i ? i.t : null;
          };
        }
        const beltbar: Container & {
          item: string | null;
          value: number;
          update(): void;
        } = this.beltbar || (this.beltbar = new PIXI.Container());
        if (!beltbar.parent) {
          app.game.reticle.addChild(beltbar);
          beltbar.x = 10;
          beltbar.y = 26;
        }
        (beltbar.update =
          beltbar.update ||
          (() => {
            beltbar.removeChildren();
            beltbar.value = app.game.hud.ammoBar.beltAmmoAmount;
            if (beltbar.value <= 0) beltbar.item = null;
            if (beltbar.item) {
              for (let i = beltbar.value; i--; i > 0) {
                const beltIcon = new SpriteMap[beltbar.item]();
                beltIcon.anchor.x = beltIcon.anchor.y = 0;
                beltIcon.x = i * 16;
                beltIcon.y = 0;
                beltIcon.width = beltIcon.height = 0.15;
                beltbar.addChild(beltIcon);
              }
            }
          }))();
        if (!app.game.hud.ammoBar._setBeltItem) {
          app.game.hud.ammoBar._setBeltItem = app.game.hud.ammoBar.setBeltItem;
          app.game.hud.ammoBar.setBeltItem = (i) => {
            app.game.hud.ammoBar._setBeltItem(i);
            beltbar.item = i ? i.t.substring(1) : null;
            beltbar.update();
          };
        }
        if (!app.game.hud.ammoBar._decrementBeltValue) {
          app.game.hud.ammoBar._decrementBeltValue = app.game.hud.ammoBar.decrementBeltValue;
          app.game.hud.ammoBar.decrementBeltValue = () => {
            app.game.hud.ammoBar._decrementBeltValue();
            beltbar.update();
          };
        }
        app.game.reticle.children.forEach((c) => (c.visible = doForce || hideHUD));
      }
    }
    return upd;
  };
}
