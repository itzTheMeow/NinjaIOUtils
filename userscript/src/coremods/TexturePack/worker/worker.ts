/// <reference lib="webworker" />
import { ZipFS } from "@zip.js/zip.js";
import {
  TexWorkerIn,
  TexWorkerOutBase,
  TexWorkerOutError,
  TexWorkerOutMap,
  TexWorkerReq,
} from "./protocol";

self.onmessage = async <T extends TexWorkerReq>(e: MessageEvent) => {
  const msg = <TexWorkerIn<T>>e.data,
    base: TexWorkerOutBase = {
      id: msg.id,
      type: msg.type,
      err: false,
    };
  function respond(payload: TexWorkerOutMap[T]) {
    self.postMessage({ ...base, ...payload });
  }

  try {
    switch (msg.type) {
      case TexWorkerReq.BaseZip:
        respond({ zip: await handleBaseZip(msg) });
        break;
    }
  } catch (err) {
    self.postMessage({
      ...base,
      err: true,
      msg: err.message,
    } satisfies TexWorkerOutError);
  }
};

async function handleBaseZip(req: TexWorkerIn<TexWorkerReq.BaseZip>) {
  const zip = new ZipFS();

  for (const atlas of req.atlases) {
    const delim = atlas.type[0];

    // init canvas
    const bmp = await createImageBitmap(atlas.png),
      canvas = new OffscreenCanvas(bmp.width, bmp.height),
      ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(bmp, 0, 0);

    // add meta files
    zip.addText(`_meta_${delim}.json`, JSON.stringify(atlas.json));
    zip.addBlob(`_original_${delim}.png`, await canvas.convertToBlob());

    // process frames
    for (const [name, frame] of Object.entries(atlas.json.frames)) {
      const size = frame.rotated
        ? { w: frame.frame.h, h: frame.frame.w }
        : frame.frame;
      const img = ctx.getImageData(
        frame.frame.x,
        frame.frame.y,
        size.w,
        size.h,
      );
      const can = new OffscreenCanvas(img.width, img.height);
      can.getContext("2d")!.putImageData(img, 0, 0);
      zip.addBlob(`${delim}_${name}.png`, await can.convertToBlob());
    }
  }

  return await zip.exportBlob();
}
