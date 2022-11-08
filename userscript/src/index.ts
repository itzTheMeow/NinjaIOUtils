import config from "./config";
import applySettingsHook from "./applySettingsHook";
import { showFPS } from "./fpsCounter";
import { socialMenuHook } from "./friendSearch";
import matchEndHook from "./matchEndHook";
import matchStartHook from "./matchStartHook";
import { SETTINGS } from "./settings/settings";
import { initShareURLHook, tryJoinLink } from "./shareURLs";
import { hookTextureLoader } from "./texturePack";
import reposItems from "./repositionItems";
import settingsTab from "./settings/settingsTab";
import hookFullscreen from "./fullscreenHook";
import initPartyMenu from "./partyMenu";
import initMapIdentifier from "./mapIdentifier";
import initOnlineOptionHook from "./onlineStatus";
import initFriendOnlineHook, { updateFriendList } from "./friendOnlineHook";
import checkUpdate from "./updateChecker";
import hookPreloader from "./preloaderHook";
import hookJoinGameButton from "./joinGameHook";
import initHashManager from "./hashManager";
import hookSocialMenu from "./socialMenuHook";
import { handleKeyDown } from "./hotkeyMessages";
import hookUtilsMenu from "./hookUtilsMenu";
import hookRenderer from "./rendererHook";

config; // ensures config is at the top of the compiled file

hookTextureLoader();
/* Fixes pasting in firefox. */
if (!navigator.clipboard.readText) {
  navigator.clipboard.readText = function () {
    return new Promise((res) => res(prompt("Paste text now.") || ""));
  };
}
hookPreloader();

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
  clearInterval(testing);

  App.Console.log("Loading NinjaIOUtils...");
  if (app.credential.accounttype == "guest")
    alert(
      `NinjaIOUtils works best when you are logged in!
No support will be provided to logged out users experiencing issues, sorry.`
    );

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

  showFPS();
  matchStartHook();
  matchEndHook();
  applySettingsHook();
  initShareURLHook();
  /* Your ping is tracked in the upper right, but not accessible from any variables. */
  App.Stats.realSetPing = App.Stats.setPing;
  App.Stats.setPing = function (ping) {
    App.Stats.ping = ping;
    return App.Stats.realSetPing(ping);
  };
  /* Typing sounds. */
  App.Console.consoleInput.addListener(InputField.CHANGE, () => {
    if (SETTINGS.typewriter) AudioEffects.ButtonHover.audio.play();
  });
  initOnlineOptionHook();
  initPartyMenu();
  App.Console.log("Successfully injected party menu button.");
  settingsTab();
  App.Console.log("Successfully injected settings tab.");
  //initHashManager();
  hookFullscreen();
  reposItems();
  initMapIdentifier();
  hookSocialMenu();
  window.addEventListener("resize", () => reposItems());
  window.addEventListener("focus", () => setTimeout(() => reposItems(), 50));
  setInterval(() => reposItems(), 100);

  //Handler for HotkeyMessages
  document.addEventListener("keydown", handleKeyDown);

  updateFriendList();
  hookJoinGameButton();
  setTimeout(() => updateFriendList(), 2000);
  setInterval(() => updateFriendList(), 60000);
  checkUpdate();
  hookUtilsMenu();
  //hookRenderer();

  // replace the app scale setter function
  app.onResize = window.eval(
    `(function ${app.onResize.toString().replace(`App.Scale=b`, `b=App.NUIScale||b,App.Scale=b`)})`
  );
  App.NUIScale = SETTINGS.uiScale;
  app.onResize();

  App.Console.log(`NinjaIOUtils ${config.ver} Loaded Successfully!`);
  tryJoinLink();
}, 50);
