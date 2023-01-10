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

export default class Mod<cfg = {}> {
  public get id() {
    return this.details.id;
  }
  public get name() {
    return this.details.name;
  }
  public loaded = false;
  public loadon: "pagestart" | "appstart" = "appstart";
  public config: Settings<cfg> | null = null;

  constructor(public readonly details: ModDetails) {}

  public isInstalled() {
    return this.details.core || Ninja.settings.get("enabledMods").includes(this.id);
  }
  public load() {
    this.log(`Loaded successfully!`);
    this.loaded = true;
  }
  public log(text: string, color?: number) {
    Ninja.log(`[${this.id}] ${text}`, color);
  }
  public implementConfig(defaults: cfg) {
    this.config = new Settings(`modconfig_${this.id}`, defaults);
  }
}
