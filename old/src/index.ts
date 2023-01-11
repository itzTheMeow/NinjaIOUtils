import applySettingsHook from "./applySettingsHook";
import config from "./config";
import initFriendOnlineHook, { updateFriendList } from "./friendOnlineHook";
import { socialMenuHook } from "./friendSearch";
import hookUtilsMenu from "./hookUtilsMenu";
import hookJoinGameButton from "./joinGameHook";
import initMapIdentifier from "./mapIdentifier";
import matchEndHook from "./matchEndHook";
import matchStartHook from "./matchStartHook";
import initOnlineOptionHook from "./onlineStatus";
import hookPlayerData from "./playerDataHook";
import hookPreloader from "./preloaderHook";
import reposItems from "./repositionItems";
import { initShareURLHook, tryJoinLink } from "./shareURLs";
import hookSocialMenu from "./socialMenuHook";
import { hookTextureLoader } from "./texturePack";
import checkUpdate from "./updateChecker";

config; // ensures config is at the top of the compiled file

hookTextureLoader();
/* Fixes pasting in firefox. */
if (!navigator.clipboard.readText) {
  navigator.clipboard.readText = function () {
    return new Promise((res) => res(prompt("Paste text now.") || ""));
  };
}
hookPreloader();

(window as any).NIOUCheckReload = () => {
  if (!app.game) return "Enter a game...";
  let reloadTime = 0,
    times = [];
  //@ts-ignore
  if (!app.game.hud.ammoBar.__setValue)
    //@ts-ignore
    app.game.hud.ammoBar.__setValue = app.game.hud.ammoBar.setValue;
  app.game.hud.ammoBar.setValue = (v) => {
    if (v <= 0 && !reloadTime) reloadTime = Date.now();
    if (reloadTime && v > 0) {
      const t = Date.now() - reloadTime;
      times.push(t);
      const avg = (num: number) => {
        const total = times.slice(-num);
        return Math.round(total.reduce((t, c) => t + c, 0) / total.length);
      };
      console.log(`Time to reload: ${t}ms
Last 5 avg: ${avg(5)}ms
Last 10 avg: ${avg(10)}ms
Last 15 avg: ${avg(15)}ms`);
      reloadTime = 0;
    }
    //@ts-ignore
    app.game.hud.ammoBar.__setValue(v);
  };
  return "Shoot gun till reload. Reload the page to disable this logging.";
};

let socialMenuDone = false;
/* Test to make sure game is fully loaded. */
const testing = setInterval(() => {
  if (!socialMenuDone) {
    try {
      if (SocialMenu && FriendItem) {
        socialMenuHook();
        initFriendOnlineHook();
        socialMenuDone = true;
      } else return;
    } catch {
      return;
    }
  }

  app._showMenu = app.showMenu;
  const menuListeners: (() => any)[] = [];
  app.onShowMenu = (cb: () => any) => {
    menuListeners.push(cb);
  };
  app.showMenu = function () {
    app._showMenu();
    menuListeners.forEach((l) => l());
    reposItems();
  };

  matchStartHook();
  matchEndHook();
  applySettingsHook();
  initShareURLHook();
  initOnlineOptionHook();
  initMapIdentifier();
  hookSocialMenu();
  window.addEventListener("resize", () => reposItems());
  window.addEventListener("focus", () => setTimeout(() => reposItems(), 50));
  setInterval(() => reposItems(), 100);

  updateFriendList();
  hookJoinGameButton();
  setTimeout(() => updateFriendList(), 2000);
  setInterval(() => updateFriendList(), 60000);
  checkUpdate();
  hookUtilsMenu();
  //hookRenderer();
  hookPlayerData();

  tryJoinLink();
}, 50);
