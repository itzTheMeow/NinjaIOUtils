import { Layer } from "lib";

/** Runtime extension of the game's Layer.Events registry. */
declare module "lib" {
  namespace Layer {
    interface Events {
      MODS_ACCESS: string;
    }
  }
}

Layer.Events.MODS_ACCESS = "-utils_mods_access";
