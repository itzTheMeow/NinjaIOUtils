import Ninja from "./api/Ninja";
import hookModMenu from "./hookModMenu";

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
