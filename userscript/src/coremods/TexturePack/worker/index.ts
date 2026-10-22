import composerSource from "virtual:tex-worker";
import Ninja from "../../../api/Ninja";
import { UITheme } from "lib";
import {
  TexWorkerInBase,
  TexWorkerInMap,
  TexWorkerOut,
  TexWorkerOutError,
  TexWorkerReq,
} from "./protocol";

export class TexturePackModWorker {
  private reqID = 0;
  private worker: Worker | null = null;
  private pending = new Map<
    number,
    { res: (p: any) => any; rej: (p: any) => any }
  >();
  constructor() {}

  public init() {
    try {
      this.worker = new Worker(
        URL.createObjectURL(
          new Blob([composerSource], { type: "text/javascript" }),
        ),
      );
    } catch (err) {
      console.error("Failed to init texture pack worker.", err);
      Ninja.log(
        "Failed to initialize texture pack worker. Texture packs will be disabled.",
        UITheme.Colors.danger,
      );
    }
    if (!this.worker) return;

    this.worker.onerror = (event) => {
      // reject all pending requests if the worker crashes somehow
      console.error("texture pack worker error", event);
      const rejection = `Texture pack worker crashed: ${event.message}`;
      for (const [, pend] of this.pending) pend.rej(rejection);
      this.pending.clear();
    };

    this.worker.onmessage = (event) => {
      const msg = <TexWorkerOut | TexWorkerOutError>event.data,
        pend = this.pending.get(msg.id);
      if (!pend)
        return console.error(
          "Failed to respond to tex worker message, not pending.",
          msg,
        );

      this.pending.delete(msg.id);
      if (msg.err) pend.rej(msg.msg);
      else pend.res(msg);
    };
  }

  public req<T extends TexWorkerReq>(type: T, payload: TexWorkerInMap[T]) {
    return new Promise<TexWorkerOut<T>>((res, rej) => {
      if (!this.worker) {
        rej("No service worker loaded.");
        return;
      }
      const id = ++this.reqID;
      this.pending.set(id, { res, rej });
      const base = { id, type } satisfies TexWorkerInBase;
      this.worker.postMessage({ ...base, payload });
    });
  }

  /** Generates a zip of the base game textures. */
  public async baseTextureZip(data: TexWorkerInMap[TexWorkerReq.BaseZip]) {
    const res = await this.req(TexWorkerReq.BaseZip, data);
    return res.payload.zip;
  }

  /** Extracts a zip file into a flat object. */
  public async extractZip(data: TexWorkerInMap[TexWorkerReq.ExtractZip]) {
    const res = await this.req(TexWorkerReq.ExtractZip, data);
    return res.payload.files;
  }

  /** Generate a texture atlas. */
  public async generateAtlas(data: TexWorkerInMap[TexWorkerReq.GenerateAtlas]) {
    const res = await this.req(TexWorkerReq.GenerateAtlas, data);
    return res.payload.atlas;
  }
}
