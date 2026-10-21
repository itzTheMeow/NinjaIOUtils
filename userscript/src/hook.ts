import { ContentMenu, Layer } from "lib";

declare module "lib" {
  namespace Layer {
    interface Events {
      MODS_ACCESS: string;
    }
  }
  namespace ContentMenu {
    var TEXTURES: string;
  }
}
/** Hooks for various coremods that must run early on init. */
export function coremodHooks() {
  Layer.Events.MODS_ACCESS = "-utils_mods_access";
  ContentMenu.TEXTURES = "tex";
}
