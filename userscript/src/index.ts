import { APIClient } from "lib";
import { app } from "typings";
import Ninja from "./api/Ninja";
import config from "./config";
import * as CoreMods from "./coremods/index";
import * as Mods from "./mods/index";

(<any>window).Ninja = Ninja;

/* Hook for improved fullscreen. */
window.addEventListener("keydown", (e) => {
  if (e.key == "F11") {
    e.preventDefault();
    if (document.fullscreenElement) document.exitFullscreen();
    else document.querySelector("html").requestFullscreen();
  }
});

Object.values(CoreMods).forEach((mod) => Ninja.registerMod(new mod()));
Object.values(Mods).forEach((mod) => Ninja.registerMod(new mod()));

Ninja.mods.forEach((m) => m.loadon == "pagestart" && !m.loaded && m.load());

const tester = setInterval(() => {
  try {
    if (
      !app ||
      !app.menu ||
      !app.menu.joinButton ||
      JSON.stringify(app.status) == "{}" ||
      !APIClient ||
      !APIClient.postCreateGame
    )
      return;
  } catch {
    return;
  }
  clearInterval(tester);

  Ninja.log("Loading NinjaIOUtils...");
  Ninja.init();

  if (Ninja.isGuest())
    alert(
      `NinjaIOUtils works best when you are logged in!
No support will be provided to logged out users experiencing issues, sorry.`
    );

  Ninja.log(`NinjaIOUtils ${config.ver} Loaded Successfully!`);
  Ninja.log(`This is a beta version of NinjaIOUtils. Not all features are implemented.`);
});
