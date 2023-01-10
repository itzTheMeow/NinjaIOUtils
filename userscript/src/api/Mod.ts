import Ninja from "./Ninja";
import Settings from "./Settings";

export interface ModDetails {
  /** The mod name, abbreviated if needed and without spaces. (keep capitalization) */
  id: string;
  /** The short, descriptive name of the mod. */
  name: string;
  /** The longer, more descriptive description for the mod. */
  description: string;
  /** The name of the mod's creator. */
  author: string;
  /** A ninja texture keyname used as an icon. */
  icon: string;
  /** Determines if the mod is built-in. You should not need to use this. */
  core?: boolean;
}

export default class Mod<cfg = any> {
  public get id() {
    return this.details.id;
  }
  public get name() {
    return this.details.name;
  }
  public loaded = false;
  /** Use pagestart for the mod to be loaded before the game does. */
  public loadon: "pagestart" | "appstart" = "appstart";
  public config: Settings<cfg> | null = null;
  public configNames: Partial<{
    [key in keyof cfg]: string | { name: string; priority?: boolean; maxLength?: number };
  }>;

  constructor(public readonly details: ModDetails) {}

  public isInstalled() {
    return this.details.core || Ninja.settings.get("enabledMods").includes(this.id);
  }
  public doInstall(add = true) {
    const list = new Set(Ninja.settings.get("enabledMods"));
    if (add) {
      list.add(this.id);
      if (!this.loaded) this.load();
    } else {
      list.delete(this.id);
      if (this.loaded) this.unload();
    }
    Ninja.settings.set("enabledMods", [...list]);
    return add;
  }
  public load() {
    this.log(`Loaded successfully!`);
    this.loaded = true;
  }
  public configChanged(key: string) {}
  public unload() {
    this.log(`Unloaded mod.`);
    this.loaded = false;
  }
  public log(text: string, color?: number) {
    Ninja.log(`[${this.id}] ${text}`, color);
  }
  public implementConfig(defaults: cfg, names?: typeof this.configNames) {
    this.config = new Settings(`modconfig_${this.id}`, defaults);
    this.configNames = names;
  }
}
