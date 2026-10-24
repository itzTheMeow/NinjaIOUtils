import { app, UITheme } from "lib";
import Mod from "../api/Mod";
import Ninja from "../api/Ninja";

// add our custom ui scale var
declare module "lib" {
  interface App {
    _uiscalemodUIScale?: number;
  }
}

interface Config {
  uiScale: number;
}

export class UIScaleMod extends Mod<Config> {
  private originalOnResize: (() => void) | null = null;

  constructor() {
    super({
      id: "UIScale",
      name: "UI Scale",
      description: "Overrides the scale of the game's UI.",
      author: "Meow",
      icon: "spectate",
    });
    this.implementConfig(
      {
        uiScale: 0,
      },
      {
        uiScale: "UI Scale (0 = default)",
      },
    );
  }

  public override loadConfig(key: keyof Config) {
    switch (key) {
      case "uiScale":
        app._uiscalemodUIScale = this.config.get("uiScale") || 0;
        break;
    }
  }

  public load() {
    this.patchOnResize();
    super.load();
  }

  public unload() {
    if (this.originalOnResize) {
      app.onResize = this.originalOnResize;
      this.originalOnResize = null;
    }
    delete app._uiscalemodUIScale;
    app.onResize();
    super.unload();
  }

  /** Rewrites `App.Scale=<var>` inside the minified `app.onResize` source. */
  private patchOnResize() {
    const source = app.onResize.toString();
    const patched = source.replace(
      /App\.Scale\s*=\s*([a-z])/,
      "$1=app._uiscalemodUIScale||$1,App.Scale=$1",
    );
    if (patched == source) {
      console.warn(
        "UIScale: failed to patch app.onResize, no 'App.Scale=' target found. Skipping.",
        source,
      );
      this.log("Failed to apply UI Scale setting.", UITheme.MenuColors.warning);
      return;
    }
    this.originalOnResize = app.onResize;
    app.onResize = window.eval(`(function ${patched})`);
    app.onResize();
  }
}
