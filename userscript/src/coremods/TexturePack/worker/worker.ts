/// <reference lib="webworker" />
import { configure, ZipFileEntry, ZipFS } from "@zip.js/zip.js";
import {
  TexWorkerIn,
  TexWorkerInMap,
  TexWorkerOutBase,
  TexWorkerOutError,
  TexWorkerOutMap,
  TexWorkerReq,
} from "./protocol";

// zipjs shouldnt use web workers because its only ever used in one
configure({ useWebWorkers: false });

self.onmessage = async (e: MessageEvent) => {
  const msg = <TexWorkerIn>e.data,
    base: TexWorkerOutBase = {
      id: msg.id,
      type: msg.type,
      err: false,
    };
  function respond<T extends TexWorkerReq>(payload: TexWorkerOutMap[T]) {
    self.postMessage({ ...base, ...payload });
  }

  try {
    switch (msg.type) {
      case TexWorkerReq.BaseZip:
        respond<TexWorkerReq.BaseZip>({
          zip: await handleBaseZip(msg.payload),
        });
        break;
      case TexWorkerReq.ExtractZip:
        respond<TexWorkerReq.ExtractZip>({
          files: await handleExtractZip(msg.payload),
        });
        break;
      case TexWorkerReq.GenerateAtlas:
        respond<TexWorkerReq.GenerateAtlas>({
          atlas: await handleGenerateAtlas(msg.payload),
        });
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

async function handleBaseZip(req: TexWorkerInMap[TexWorkerReq.BaseZip]) {
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

/** Extracts a pack zip into flat name/Blob list. */
async function handleExtractZip(req: TexWorkerInMap[TexWorkerReq.ExtractZip]) {
  const files: TexWorkerOutMap[TexWorkerReq.ExtractZip]["files"] = {},
    zip = new ZipFS();
  await zip.importBlob(req.zip);

  for (const entry of zip.entries) {
    if (!entry || !(entry instanceof ZipFileEntry)) continue;
    const name = entry.name.split("/").pop() || "";
    if (!name.startsWith(".") && !entry.name.includes("__MACOSX"))
      files[name] = await entry.getBlob();
  }
  return files;
}

async function handleGenerateAtlas(
  req: TexWorkerInMap[TexWorkerReq.GenerateAtlas],
) {
  // extract all the zips and drop any that fail
  const extractedZips = (
    await Promise.allSettled(req.zips.map((zip) => handleExtractZip({ zip })))
  )
    .filter((z) => z.status == "fulfilled")
    .map(({ value }) => value);

  /** The global override list. What each texture is overwritten with. */
  let overrides: { [name: string]: Blob } = {};
  /** Special image that gets applied first if present. */
  let special: { mode: "pixel" | "image"; blob: Blob } | null = null;

  for (const files of extractedZips) {
    let packSpecial: typeof special = null;
    const packOverrides: { [name: string]: Blob } = {};
    for (const [name, blob] of Object.entries(files)) {
      if (name == "_usepixel.png") packSpecial = { mode: "pixel", blob };
      else if (name == "_useimg.png") packSpecial = { mode: "image", blob };
      else if (name.startsWith(`${req.type[0]}_`) && name.endsWith(".png"))
        packOverrides[name.slice(req.type[0].length + 1, -4)] = blob;
    }
    // only accept the first special image
    // the special image does not overwrite any future overrides we encounter
    if (!special && packSpecial) special = packSpecial;
    else overrides = { ...overrides, ...packOverrides };
  }

  // load canvas and original texture image
  const bmp = await createImageBitmap(req.original),
    canvas = new OffscreenCanvas(req.json.meta.size.w, req.json.meta.size.h),
    ctx = canvas.getContext("2d")!;
  ctx.drawImage(bmp, 0, 0);

  // load special image if present
  const specialBMP = special ? await createImageBitmap(special.blob) : null;
  // if we have a special image, then we have to iterate over all frames
  // otherwise only iterate the ones we specifically override
  const names = special ? Object.keys(req.json.frames) : Object.keys(overrides);
  for (const name of names) {
    const frame = req.json.frames[name];
    if (!frame) continue;

    // determine the size of the area we need to write
    const size = frame.rotated
        ? { ...frame.frame, w: frame.frame.h, h: frame.frame.w }
        : frame.frame,
      // use the override and fall back to the special image
      src = overrides[name]
        ? await createImageBitmap(overrides[name])
        : specialBMP;
    if (!src) continue;

    // erase that section entirely and rewrite it
    ctx.clearRect(size.x, size.y, size.w, size.h);
    ctx.drawImage(src, size.x, size.y, size.w, size.h);
  }
  return canvas.convertToBlob({ type: "image/png" });
}
