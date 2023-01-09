import Ninja from "./api/Ninja";
import * as CoreMods from "./coremods/index";
import hookModMenu from "./hookModMenu";

Object.values(CoreMods).forEach((mod) => Ninja.registerMod(new mod()));

Ninja.mods.forEach((m) => m.loadon == "pagestart" && m.load());

const tester = setInterval(() => {
  try {
    if (
      !app ||
      !app.menu ||
      !app.menu.joinButton ||
      typeof app.status.updating !== "boolean" ||
      !APIClient ||
      !APIClient.postCreateGame
    )
      return;
  } catch {
    return;
  }
  clearInterval(tester);
  Ninja.ready = true;

  hookModMenu();

  Ninja.mods.forEach((m) => m.loadon == "appstart" && m.load());
});
