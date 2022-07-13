# NinjaIOUtils Repository

This is the repo for all things NinjaIOUtils related.

This contains the source code and build tools for the extension, as well as a texture (un)packer.

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
