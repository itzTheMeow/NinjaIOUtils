import Ninja from "./Ninja";

export interface ModDetails {
  /** The mod name, abbreviated if needed and without spaces. (keep capitalization) */
  id: string;
  /** The short, descriptive name of the mod. */
  name: string;
  /** The longer, more descriptive description for the mod. */
  description: string;
  /** The Ninja.io username of the mod's creator. */
  author: string;
  /** A ninja texture keyname used as an icon. */
  icon: string;
  /** Determines if the mod is built-in. You should not need to use this. */
  core?: boolean;
}

export default class Mod {
  public get id() {
    return this.details.id;
  }
  public get name() {
    return this.details.name;
  }
  public loaded = false;
  public loadon: "pagestart" | "appstart" = "appstart";

  constructor(public readonly details: ModDetails) {}

  public load() {
    this.log(`Loaded successfully!`);
    this.loaded = true;
  }
  public log(text: string, color?: number) {
    Ninja.log(`[${this.id}] ${text}`, color);
  }
}
