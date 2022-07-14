// ==UserScript==
// @name         Ninja.io Utils
// @namespace    https://itsmeow.cat
// @version      0.22
// @description  Some small QOL improvements to ninja.io!
// @author       Meow
// @match        https://ninja.io/*
// @match        https://ninja.io
// @match        http://ninja.io/*
// @match        http://ninja.io
// @match        https://*.ninja.io/*
// @match        http://*.ninja.io/*
// @match        https://*.ninja.io
// @match        http://*.ninja.io
// @icon         https://www.google.com/s2/favicons?domain=ninja.io
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.1/socket.io.min.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  Client.prototype.onMessage = function (a) {
    a = Client.decompress(a.data);
    // console.log(a);
    /* Hooks into the join message and gets the server name you join using. */
    if (
      a.type == packetTypeMap.data &&
      a.data.type == packetTypeMap.joinedMessage &&
      a.data.info.startsWith("You joined ")
    ) {
      let roomName = a.data.info.substring("You joined ".length);
      setHash(app.client.server.id, roomName, savedPass);
    }
    const repFail = () => App.Console.log(`# Failed to identify map. Please report to Meow.`);
    const repSuccess = (id, name) => App.Console.log(`# Identified map as ${name} (ID: ${id}).`);
    if (
      a.type == packetTypeMap.data2 &&
      a.data.t == packetTypeMap.systemMessage &&
      a.data.msg.startsWith("Joining ")
    ) {
      const mapName = (a.data.msg.match(/(?: - )(.*)(?: by)/) || [])[1];
      this.mapID = 0;
      if (mapName) {
        const mapID = MapIDs[mapName];
        if (mapID) {
          repSuccess(mapID, mapName);
          this.mapID = mapID;
        } else repFail();
      } else repFail();
    } else if (
      a.type == packetTypeMap.data2 &&
      a.data.t == packetTypeMap.systemMessage &&
      a.data.msg.startsWith("loading map: ")
    ) {
      const mapName = a.data.msg.substring("loading map: ".length);
      this.mapID = 0;
      if (mapName) {
        const mapID = MapIDs[mapName];
        if (mapID) {
          repSuccess(mapID, mapName);
          this.mapID = mapID;
        } else repFail();
      } else repFail();
    }
    this.dispatchEvent(a);
  };

  /* Hook for improved fullscreen. */
  window.addEventListener("keydown", (e) => {
    if (e.key == "F11") {
      e.preventDefault();
      if (document.fullscreenElement) document.exitFullscreen();
      else document.querySelector("html").requestFullscreen();
    }
  });

  App.Console.log(`NinjaIOUtils ${config.ver} Loaded Successfully!`);

  if (!roomDetails) return;
  /* Extract room details from URL. */
  const [id, name, pass] = roomDetails.split("&").map(decodeURIComponent);
  if (!id || !name) return;
  App.Console.log(`Attempting to join room ${name}...`);
  const loadingMenu = App.Layer.loadingMenu;

  /* Shows loading menu. */
  App.Layer.addChild(loadingMenu);
  loadingMenu.show();
  loadingMenu.setTitle(`Click to join server.\n${name}`);
  loadingMenu.cancelCount = -1;

  loadingMenu.joinButton = new Button("join");
  loadingMenu.joinButton.selected = true;
  loadingMenu.joinButton.setText("Join");
  loadingMenu.joinButton.scale.x = loadingMenu.joinButton.scale.y = 0.8;
  loadingMenu.joinButton.addListener(Button.BUTTON_RELEASED, function () {
    removeJoinStuff();
    loadingMenu.show();
    /* Joins the game using the specified details. */
    App.Layer.emit("join_game", name, id, pass || "");
  });
  loadingMenu.joinButton.x =
    loadingMenu.title.x + 0.5 * (loadingMenu.title.width - loadingMenu.joinButton.width);
  loadingMenu.joinButton.y = loadingMenu.title.y + 40;
  loadingMenu.joinButton.setTint(Colors.green);
  loadingMenu.container.addChild(loadingMenu.joinButton);

  loadingMenu.cancelButton2 = new Button("cancel2");
  loadingMenu.cancelButton2.setText("Cancel");
  loadingMenu.cancelButton2.scale.x = loadingMenu.cancelButton2.scale.y = 0.8;
  loadingMenu.cancelButton2.addListener(Button.BUTTON_RELEASED, function () {
    removeJoinStuff();
    clearSaved();
    return loadingMenu.emit(Layer.Events.LOADING_CANCEL);
  });
  loadingMenu.cancelButton2.x = loadingMenu.joinButton.x + loadingMenu.joinButton.width + 8;
  loadingMenu.cancelButton2.y = loadingMenu.title.y + 40;
  loadingMenu.cancelButton2.setTint(Colors.red);
  loadingMenu.container.addChild(loadingMenu.cancelButton2);

  loadingMenu.title.y -= 36;

  function removeJoinStuff() {
    loadingMenu.title.y += 36;
    loadingMenu.container.removeChild(loadingMenu.joinButton);
    loadingMenu.container.removeChild(loadingMenu.cancelButton2);
  }
})();
