export default function hookPlayerData() {
  Player.prototype._update = Player.prototype.update;
  Player.prototype.update = function (...d) {
    const upd = this._update(...d);
    const hpbar: typeof HealthBar = this.hpbar || (this.hpbar = new HealthBar());
    if (!hpbar.parent) {
      this.visual.addChild(hpbar);
      hpbar.scale.x = hpbar.scale.y = 0.25;
      hpbar.x = -hpbar.width / 2;
      hpbar.y = -50;
    }
    if (hpbar.getValue() !== this.health) hpbar.setValue(this.health);
    return upd;
  };
}
