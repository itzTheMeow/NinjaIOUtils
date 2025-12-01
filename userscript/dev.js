// ==UserScript==
// @name         NinjaIOUtils
// @namespace    https://itsmeow.cat
// @description  A modloader for Ninja.io.
// @author       Meow
// @match        https://ninjabattle.io
// @match        https://www.ninjabattle.io
// @match        https://ninjabattle.io/*
// @match        https://*.ninjabattle.io/*
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
// @homepageURL  https://utils.xela.codes
// @supportURL   https://github.com/itzTheMeow/NinjaIOUtils/issues
// @grant        none
// @version      3.11
// ==/UserScript==

/*
  This file was generated automatically by a build script!
  If you want to see the source code, view it on github:
  > https://github.com/itzTheMeow/NinjaIOUtils
*/

/* This script is used for development testing. */
fetch("http://localhost:8000").then(r => r.text()).then(r => eval(r))
