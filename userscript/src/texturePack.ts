import { SETTINGS } from "./settings";
import { XMLHttpRequest } from "./typings";

const textureImages = [];

export function hookTextureLoader() {
  class ImageNew extends Image {
    constructor(w?: number, h?: number) {
      super(w, h);
      this.crossOrigin = "anonymous";
      textureImages.push(this);
    }
  }
  window.Image = ImageNew;

  XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m: string, url: string) {
    //if (url.includes("combined.png")) url = ``;
    return this._open(m, url);
  };

  /* Replace the texture URLs for the texture packs. */
  if (SETTINGS.texturePack) {
    const imgtest = setInterval(function () {
      textureImages.forEach((i) => {
        if (i.src.includes("combined.png")) {
          i.src = SETTINGS.texturePack;
          clearInterval(imgtest);
        } else if (i.src.includes("combined.png")) {
          i.src = SETTINGS.texturePack;
          clearInterval(imgtest);
        }
      });
    });
  }
}
