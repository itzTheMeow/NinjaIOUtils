import Mod from "./Mod";

export default new (class Ninja {
  constructor() {}

  public ready = false;
  public get GameVersion() {
    return (
      document
        .querySelector<HTMLScriptElement>(`script[src*="game.js"]`)
        ?.src.split("/")
        .pop()
        ?.split("?v=")?.[1] ||
      (() => {
        try {
          return App.ClientVersion;
        } catch {
          return "unknown";
        }
      })()
    );
  }
  public mods: Mod[] = [];
})();
