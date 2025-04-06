# Texture Packs

## Guidelines

There are no specific rules for packs, just don't make it NSFW.

## How to Create a Texture Pack

### Editing Files

[You can download the textures here](https://utils.xela.codes/pack_meta/textures.zip) and edit the ones you want. Once you're finished, put the files you changed somewhere and continue below. **Don't upload any files that you didnt change.**

### Uploading Your Pack

If you know how, you can just clone the repository and use your own editor. If you're less technically inclined:

First open [the web editor](https://github.dev/itzTheMeow/NinjaIOUtils). It should look like this:

![image](https://user-images.githubusercontent.com/50887230/191050852-834a961a-978a-4d6c-bd94-f83d1b1435b3.png)

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

### Testing Your Pack

If you would like to test your pack, you can put all of the images and (download) the .json file onto your computer. Put them in a zip folder like so:

![image](https://user-images.githubusercontent.com/50887230/209454065-a7ae1338-a426-4254-b7a4-08cf51e0be86.png)

You can then upload your zip to the settings page (make sure you've updated the script) and click Use on the custom pack, then click Save. Please note that **_the game will load SLOWER with a custom zip pack installed_**, especially with bigger packs as the backend has to unzip your textures before assembling them.

---

When you're done testing, go back to Code and click the "Source Control" button on the left.

![image](https://user-images.githubusercontent.com/50887230/191046784-bd748d18-43ce-4fd1-b610-533c8223fe8a.png)

Click the + by Changes to add your changes.

![image](https://user-images.githubusercontent.com/50887230/191046607-5740c265-c4ed-4bb0-8272-ee4e1af8945d.png)

Put a short description of what you did (added/updated pack) and click the checkmark at the top.

![image](https://user-images.githubusercontent.com/50887230/191046681-0f0dcaa1-ead0-4ff4-913f-958a85bfdfbf.png)

Click Fork Repository when prompted.

![image](https://user-images.githubusercontent.com/50887230/191047103-a7d77744-609b-48dd-85ac-8635cf51df82.png)

You can choose whatever branch name you want.

![image](https://user-images.githubusercontent.com/50887230/191047202-febf12dd-d02a-4bf2-934f-2073328b5883.png)

You can then switch to your fork.

![image](https://user-images.githubusercontent.com/50887230/191047245-dcd5cd4a-4383-4a38-8b69-e3fbcdf8b2b9.png)

Go back to Source Control and click to create a pull request.

![image](https://user-images.githubusercontent.com/50887230/191047336-bd9e85fe-6289-4917-8058-c71b35b5aedb.png)

You should see this neat little panel, change the title to your pack name and give a short description of the pack. Click Create.

![image](https://user-images.githubusercontent.com/50887230/191047613-38d625df-f00d-435d-9cd7-a7ce9d14c08d.png)

That's it! You're done and now wait for the pack to be added or additional questions to be asked.

![image](https://user-images.githubusercontent.com/50887230/191047686-9c66a51d-db96-4bd0-ada8-fd45e807d80c.png)

**If you're updating your pack, follow the same steps above and use a different branch name.**
