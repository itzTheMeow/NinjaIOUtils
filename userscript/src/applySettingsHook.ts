export default function applySettingsHook() {
  /* Hook into the match settings. */
  Manager.prototype._applySettings = Manager.prototype.applySettings;
  Manager.prototype.applySettings = function (s) {
    this.isRanked = s.ranked;
    return this._applySettings(s);
  };
}
