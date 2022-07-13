# NinjaIOUtils Repository

This is the repo for all things NinjaIOUtils related.

This contains the source code and build tools for the extension, as well as a texture (un)packer.

A simple script for ninja.io that adds some QOL features.
For support DM `Meow#4567` on discord!

## How to Use

Just install the script and open [ninja.io](https://ninja.io)!
In order to join someone else's game, you both need the script installed. Have them send you their join link (just copy the URL) and once you click it, you'll automatically join.

## Feature List

- Adds new settings tab for script settings.
- Adds toggleable FPS/ping display.
- Adds better (dedicated) fullscreen. (press F11)
- Allows you to share game links to other users. (they need the script installed to join)
- Fixes not being able to paste to input fields on Firefox.
- Adds support for texture packs.
- Adds chat typing sound option.
- Adds search bar to friend request list. (highlights matches)
- Tells you the map name when joining a match.
- Lets you track your stats and match history.

## Explanations

### Share Link

When you join a game, your url will look like this (something similar):

```
https://ninja.io/#8&NA%203%20Ranked%20%2314
```

Anyone you send this to (with the script) can join your server! This includes the server password for private servers.
If the game is full, the script will hang and you can't join the server. (working on notifying you if the server is full)

### Texture Packs

**TEXTURE PACKS ARE DISABLED UNTIL FURTHER NOTICE**
Texture packs are specified via URL. This url should be imgur so there are no CORS issues.

You can make a texture pack by modifying the [combined-min.png](https://ninja.io/assets/combined/combined-min.png) texture atlas. Upload it to imgur then copy the image link (i.imgur.com/etc.png) and paste it in the input box. Make sure you press save and if you did everything right your new textures will be loaded!

List of texture packs:

**All White** - An all-white image. Great for a challenge. - `https://i.imgur.com/0nAJlbk.png` - by Meow

**All White (no cursor)** - All White but without the crosshair. (turn off "display reticle line" in display settings) - `https://i.imgur.com/jhgir2e.png` - by Meow

**Transparent Vignette** - Makes the red vignette that shows up when you die more transparent. - `https://i.imgur.com/LzktYHO.png` - by Meow

**Invisible** - Just floating bodies and UI components. - `https://i.imgur.com/A1tUIdN.png` - by Meow

**MS Paint** - Just ms paint. - `https://i.imgur.com/I2gk5no.png` - by Dark Master

<sub><sup>If you want yours added here, DM me on discord.</sup></sub>

### Stat Tracker

This script is used for my [stat tracker](https://itsmeow.cat/ninja). In order to start tracking your stats, log in [here](https://itsmeow.cat/manage) and copy the API key. Go to the settings page on ninja, NinjaIOUtils tab, and paste in the api key. (this is the api key FOR MY WEBSITE. you DO NOT need to give your ninja login details)

Now go [here](https://itsmeow.cat/addninja) and link your account. (the account you are using this script with) You can view linked accounts [here](https://itsmeow.cat/myninja).

Now whenever you finish a game, the script will upload your score to the tracker. You can view your match history by clicking 'View' on your account.

## Texture (Un)packing

These instructions assume windows as your operating system. If you are using linux, you shouldn't have a hard time adapting them.

#### Details

- The unpacker automatically downloads the image file from ninja.io
- The unpacker automatically downloads the image metadata from ninja.io
- If the URLs are incorrect, you can change it in config.json
- You can change `replace` to `true` in config.json in order to replace existing files. (change it to false to keep files and not overwrite them)
- Replacing files WILL overwrite them, so save your texture pack elsewhere if you don't want to have to re-edit the old files.
- You can change `verbose` to `false` in config.json to disable the extra output from the commands.
- This will (un)pack both game and terrain textures. (you dont have to edit or distribute both)

#### Setup

- [Download](https://github.com/itzTheMeow/NinjaIOUtils/archive/refs/heads/master.zip) the latest version of the repository.
- [Install node.js](https://nodejs.org/en/) if you havent already. (just pick 'current') (you shouldnt need the extra chocolatey utilities)

#### Usage

- To unpack the image files, run `unpack.bat`.
- You can then edit your files in the `split_textures` and `split_terrain` folders.

- To pack your files once you are done, run `pack.bat`.
- This will take the images from the `split_textures`/`split_terrain` folders and re-pack them into `textures.png` and `terrain.png` which you can then distribute as your texture pack(s).
