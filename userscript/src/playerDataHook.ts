import config from "./config";
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
            if (jetbar.maxValue !== app.game.hud.jetBar.maxValue)
              jetbar.setMaxValue(app.game.hud.jetBar.maxValue);
            jetbar.setValue(v);
            return app.game.hud.jetBar._setValue(v);
          };
        }
        jetbar.visible = hideHUD;
        const ammobar: Graphics & {
          value: number;
          max: number;
          update(): void;
        } = this.ammobar || (this.ammobar = new PIXI.Graphics());
        if (!ammobar.parent) {
          app.game.reticle.addChild(ammobar);
          ammobar.x = -18;
          ammobar.y = 26;
          ammobar.scale.x = ammobar.scale.y = 0.3;
        }
        this.ammoLeft = app.game.hud.ammoBar.getValue();
        if (ammobar.value !== this.ammoLeft) ammobar.value = this.ammoLeft;
        (ammobar.update =
          ammobar.update ||
          (() => {
            const w = 12,
              r = 30;
            ammobar.clear();
            ammobar.lineStyle(w, config.Colors.yellow, 0.2);
            ammobar.arc(0, 0, r, 0, Math.PI * 2);
            ammobar.lineStyle(w, ammobar.value > 0 ? config.Colors.yellow : config.Colors.red);
            ammobar.arc(
              0,
              0,
              r,
              0,
              Math.PI * 2 * (ammobar.value > 0 ? ammobar.value / ammobar.max : 1),
              true
            );
            ammobar.endFill();
          }))();
        if (!app.game.hud.ammoBar._setValue) {
          app.game.hud.ammoBar._setValue = app.game.hud.ammoBar.setValue;
          app.game.hud.ammoBar.setValue = (v: number) => {
            if (ammobar.max !== app.game.hud.ammoBar.maxValue)
              ammobar.max = app.game.hud.ammoBar.maxValue;
            ammobar.value = v;
            ammobar.update();
            return app.game.hud.ammoBar._setValue(v);
          };
        }
        app.game.reticle.children.forEach((c) => (c.visible = doForce || hideHUD));
      }
    }
    return upd;
  };
}
