# Texture Packs

## Guidelines

There are no specific rules for packs, just don't make it NSFW.

## How to Create a Texture Pack

If you know how, you can just clone the repository and use your own editor. If you're less technically inclined:

First open [the web editor](https://github.dev/itzTheMeow/NinjaIOUtils). It should look like this:

Right click on `texturepacks` and create a new folder. Make sure the folder name doesn't contain spaces or special characters. It should also be relevant to your pack name.

You can then right click your folder you created and create a new file called `_meta.json`. This will hold your pack information. Use this template:

```json
{
  "name": "Texture Pack Name",
  "author": "My Name",
  "description": "Such a cool pack!"
}
```

- name: a relevant pack name
- author: can be your nickname or ninja username if you want
- description: describe what your pack changes (keep it under 80 characters)

You can now drag and drop your images into your folder! Main texture images should start with `c_` and terrain start with `s_`, this makes sure they will load properly.

When you're done, click the "Source Control" button on the left.

Click the + by Changes to add your changes.

Put a short description of what you did (added/updated pack) and click the checkmark at the top.

