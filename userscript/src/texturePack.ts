import { TexturePack } from "../../shared";
import config from "./config";
import { SETTINGS } from "./settings/settings";

export function hookTextureLoader() {
  class WorkerNew extends Worker {
    _postMessage: any;
    constructor(url: string, opts: any) {
      super(url, opts);
      this._postMessage = this.postMessage;
      this.postMessage = this.newPostMessage;
    }
    // expected data, must be validated - example data:
    // {"data":["https://ninja.io/assets-dev/combined/combined.png"],"uuid":0,"id":"loadImageBitmap"}
    newPostMessage(
      data: { bypass?: boolean; data: [string]; uuid: number; id: "loadImageBitmap" },
      ...args: any
    ) {
      if (SETTINGS.texturePack && !(window as any).SKIP_TEX_LOAD && !data?.bypass) {
        fetch(`${config.api}/packs/${SETTINGS.texturePack}`)
          .then((r) => r.json())
          .then((pack: TexturePack) => {
            if (
              pack &&
              data.id == "loadImageBitmap" &&
              typeof data.data[0] == "string" &&
              SETTINGS.texturePack
            ) {
              if (
                pack.hasCombined &&
                data.data[0].includes("ninja.io") &&
                data.data[0].includes("combined") &&
                data.data[0].endsWith(".png")
              )
                data.data[0] = `${config.api}/packs/${SETTINGS.texturePack}/combined.png`;
              if (
                pack.hasSeamless &&
                data.data[0].includes("ninja.io") &&
                data.data[0].includes("seamless") &&
                data.data[0].endsWith(".png")
              )
                data.data[0] = `${config.api}/packs/${SETTINGS.texturePack}/seamless.png`;
            }
            this._postMessage(data, ...args);
          })
          .catch(() => {
            this._postMessage(data, ...args);
          });
      } else this._postMessage(data, ...args);
    }
  }
  window.Worker = Worker = WorkerNew;
}
