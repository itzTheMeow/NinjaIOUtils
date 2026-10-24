// ==UserScript==
// @name         FragUtils (formerly NinjaIOUtils)
// @namespace    https://xela.codes
// @description  A modloader for fragline.com (formerly ninja.io). Direct successor to NinjaIOUtils (Fragline Utils)
// @author       Meow
// @match        https://fragline.com/*
// @match        https://fragline.com
// @match        http://fragline.com/*
// @match        http://fragline.com
// @match        https://*.fragline.com/*
// @match        http://*.fragline.com/*
// @match        https://*.fragline.com
// @match        http://*.fragline.com
// @icon         https://www.google.com/s2/favicons?domain=fragline.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.1/socket.io.min.js
// @homepageURL  https://fragline.xela.codes
// @supportURL   https://forge.xela.codes/xela/NinjaIOUtils/issues
// @grant        none
// @version      0.4b
// ==/UserScript==

/*
  This file was generated automatically by a build script!
  If you want to see the source code, view it on github:
  > https://github.com/itzTheMeow/NinjaIOUtils
*/

/* This script is used for development testing. */
fetch("http://localhost:8080/NinjaIOUtils.js")
  .then((r) => r.text())
  .then((r) => eval(r));
