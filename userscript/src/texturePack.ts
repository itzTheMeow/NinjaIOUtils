import localForage from "localforage";
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
      data: { bypass?: boolean; data: [string | Request]; uuid: number; id: "loadImageBitmap" },
      ...args: any
    ) {
      if (SETTINGS.texturePack && !(window as any).SKIP_TEX_LOAD && !data?.bypass) {
        fetch(`${config.api}/packs/${SETTINGS.texturePack}`)
          .then((r) => r.json())
          .then(async (pack: TexturePack) => {
            if (
              pack &&
              data.id == "loadImageBitmap" &&
              typeof data.data[0] == "string" &&
              SETTINGS.texturePack
            ) {
              const orig = data.data[0];
              const isCustom = SETTINGS.texturePack == config.customDelimiter;
              if (
                (pack.hasCombined || isCustom) &&
                orig.includes("ninja.io") &&
                orig.includes("combined") &&
                orig.endsWith(".png")
              )
                data.data[0] = `${config.api}/packs/${SETTINGS.texturePack}/combined.png?v=${config.actualGameVersion}`;
              if (
                (pack.hasSeamless || isCustom) &&
                orig.includes("ninja.io") &&
                orig.includes("seamless") &&
                orig.endsWith(".png")
              )
                data.data[0] = `${config.api}/packs/${SETTINGS.texturePack}/seamless.png?v=${config.actualGameVersion}`;

              if (data.data[0].startsWith(config.api)) {
                const zip: File | null = isCustom ? await localForage.getItem("custom_pack") : null;
                if (zip) {
                  const form = new FormData();
                  form.append("zip", zip);
                  const res = await fetch(data.data[0], {
                    method: "POST",
                    body: form,
                  }).then((r) => r.blob());
                  data.data[0] = URL.createObjectURL(res);
                } else data.data[0] = orig;
              }
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
