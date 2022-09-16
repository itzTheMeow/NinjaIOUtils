# NinjaIOUtils Repository

This is the repo for all things NinjaIOUtils related.

This contains the source code and build tools for the extension, as well as a texture (un)packer.

A simple script for ninja.io that adds some QOL features.
For support DM `Meow#4567` on discord!

# [DOWNLOAD THE USERSCRIPT HERE](https://greasyfork.org/en/scripts/441245-ninja-io-utils)

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

### Online Mode

When the "Appear Online" checkbox is checked, you will appear online and using utils to other users also using utils. Users using utils are marked with a green dot now, and users who are online but not using utils are orange.

**IF YOU APPEAR ONLINE, FRIENDS USING UTILS CAN JOIN YOUR _PUBLIC_ GAMES**

Other people can not join your games if you do not appear online or your game has a password. Only friends can join your games.

### Texture Packs

You can use a texture pack via the in-game texture pack browser. If you have created a texture pack and would like to use it, DM me on discord or follow the instructions below:

#### How to Add a Texture Pack

[Fork](https://github.com/itzTheMeow/NinjaIOUtils/fork) this repository and create files in the texturepacks folder. There are no rules for packs, just don't make it NSFW.

Your pack needs a unique id, for example `TransparentVignette`.

You need to create a folder for your texture pack in the `texturepacks` folder using your ID from earlier. (ex. texturepacks/TransparentVignette)

You can then create an `_meta.json` file containing the following information:

Fill this out and put it in the file: (ex: texturepacks/TransparentVignette/\_meta.json)

```json
{
  "name": "Texture Pack Name", // example: Transparent Vignette
  "author": "My Name", // example: Meow
  "description": "Such a cool pack!" // just describe what it does
}
```

Your description should not be more than 80 characters long. **Make sure you remove the `//` and text after them. (highlighted red)**

Now you can upload your image files! Use the [texture unpacker](#texture-unpacking) to get the image files to edit. Edit the ones you want to change and put them in your folder. (**DO NOT UPLOAD IMAGES THAT YOU DIDN'T CHANGE**)

You can now [create a pull request](https://github.com/itzTheMeow/NinjaIOUtils/compare) and your pack will be added.

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
- **The texture packer is depreciated and doesn't need to be used to make a texture pack. Just unpack your files and edit them, then follow [the instructions](#how-to-add-a-texture-pack) to add your pack.**

#### Setup

- [Download](https://github.com/itzTheMeow/NinjaIOUtils/archive/refs/heads/master.zip) the latest version of the repository.
- [Install node.js](https://nodejs.org/en/) if you havent already. (just pick 'current') (you shouldnt need the extra chocolatey utilities)

#### Usage

- To unpack the image files, run `unpack.bat`.
- You can then edit your files in the `split_textures` and `split_terrain` folders.

## Credits

<sub><sup>_A list of people who helped in any way with the project._</sup></sub>

- Meow (Main Programmer)
- Gazerme (Tester)
- Velo (Tester & Idea Man)
- Dark Master (Tester & Idea Man)
- Also thanks to everyone who made a texture pack!
