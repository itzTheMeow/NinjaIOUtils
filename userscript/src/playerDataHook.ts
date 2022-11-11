import { SETTINGS } from "./settings/settings";

export default function hookPlayerData() {
  Player.prototype._update = Player.prototype.update;
  Player.prototype.update = function (...d) {
    const upd = this._update(...d);
    if (SETTINGS.helpfulUI) {
      const isLocal = this.id == app.game.manager.getLocalPlayer()?.id;
      const hpbar: typeof HealthBar = this.hpbar || (this.hpbar = new HealthBar());
      if (!hpbar.parent) {
        this.visual.addChild(hpbar);
        hpbar.scale.x = hpbar.scale.y = 0.25;
        hpbar.x = -hpbar.width / 2;
        hpbar.y = isLocal ? -65 : -50;
        hpbar.background.visible = false;
      }
      if (hpbar.getValue() !== this.health) hpbar.setValue(this.health);
      hpbar.visible = this.alive && (isLocal || !this.prone);
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
      }
    }
    return upd;
  };
}
