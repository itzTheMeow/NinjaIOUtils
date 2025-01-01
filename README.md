# NinjaIOUtils Repository

This is the repo for all things NinjaIOUtils related.

This contains the source code and build tools for the extension, as well as a texture (un)packer.

A simple script for ninja.io that adds some QOL features.

## PLEASE DO NOT REPORT UTILS BUGS IN THE NINJA DISCORD, [CREATE AN ISSUE HERE](https://github.com/itzTheMeow/NinjaIOUtils/issues/new)

# [DOWNLOAD THE USERSCRIPT HERE](https://greasyfork.org/en/scripts/458005-ninjaioutils)

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

You can use a texture pack via the in-game texture pack browser. If you have created a texture pack and would like to use it, DM me on discord/revolt or follow the instructions below:

#### [How to Add a Texture Pack](https://github.com/itzTheMeow/NinjaIOUtils/blob/master/docs/Texture%20Packs.md#texture-packs)

### Stat Tracker (disabled)

This script is used for my [stat tracker](https://itsmeow.cat/ninja). In order to start tracking your stats, log in [here](https://itsmeow.cat/manage) and copy the API key. Go to the settings page on ninja, NinjaIOUtils tab, and paste in the api key. (this is the api key FOR MY WEBSITE. you DO NOT need to give your ninja login details)

Now go [here](https://itsmeow.cat/addninja) and link your account. (the account you are using this script with) You can view linked accounts [here](https://itsmeow.cat/myninja).

Now whenever you finish a game, the script will upload your score to the tracker. You can view your match history by clicking 'View' on your account.

## Credits

<sub><sup>_A list of people who helped in any way with the project._</sup></sub>

- Meow (Main Programmer)
- Gazerme (Tester)
- Velo (Tester & Idea Man)
- Dark Master (Tester & Idea Man)
- Also thanks to everyone who made a texture pack!
