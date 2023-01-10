import { APIClient } from "lib";
import { app } from "typings";
import Ninja from "./api/Ninja";
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

  Ninja.init();
});
