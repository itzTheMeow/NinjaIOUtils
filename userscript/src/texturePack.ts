import { getSavedPack, SETTINGS } from "./settings/settings";
import { XMLHttpRequest } from "./typings";

class ImageNew extends Image {
  constructor(w?: number, h?: number) {
    super(w, h);
    this.crossOrigin = "anonymous";
    textureImages.push(this);
  }
}
window.Image = ImageNew;
const textureImages: ImageNew[] = [];

export function hookTextureLoader() {
  return App.Console.log("Texture packs are disabled!");
  XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m: string, url: string) {
    //if (url.includes("combined.png")) url = ``;
    return this._open(m, url);
  };

  /* Replace the texture URLs for the texture packs. */
  if (SETTINGS.texturePack) {
    const saved = getSavedPack();
    if (saved[0]) {
      const imgtest = setInterval(function () {
        textureImages.forEach((i) => {
          if (i.src.includes("ninja.io") && i.src.includes("combined.png")) {
            const originalsrc = i.src;
            i.onerror = function () {
              i.src = originalsrc;
            };
            i.src = saved[0];
            clearInterval(imgtest);
          }
        });
      });
    }
    if (saved[1]) {
      const imgtest2 = setInterval(function () {
        textureImages.forEach((i) => {
          if (i.src.includes("ninja.io") && i.src.includes("seamless-min.png")) {
            const originalsrc = i.src;
            i.onerror = function () {
              i.src = originalsrc;
            };
            i.src = saved[1];
            clearInterval(imgtest2);
          }
        });
      });
    }
  }
}
