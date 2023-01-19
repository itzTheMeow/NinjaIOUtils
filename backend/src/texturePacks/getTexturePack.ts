import canvas from "canvas";
import fs from "fs";
import path from "path";
import { TexturePack } from "../../../shared";
import { getTextureURLs } from "./textureURLs";

export function getAllTexturePacks() {
  return fs
    .readdirSync(path.join(process.cwd(), "../texturepacks"))
    .map((pak) => getTexturePack(pak)?.meta)
    .filter((p) => p);
}

export default function getTexturePack(pack: string) {
  const packFolder = pack.startsWith("::")
    ? pack.substring(2)
    : path.join(process.cwd(), "../texturepacks", pack);
  if (!fs.existsSync(packFolder)) return null;
  const images = fs.readdirSync(packFolder);
  if (!images.includes("_meta.json")) return null;
  const hasSinglePixel = !!images.find((i) => i == "_usepixel.png");
  if (!images.find((i) => i.startsWith("c_") || i.startsWith("s_")) && !hasSinglePixel) return null;
  const packMeta = JSON.parse(fs.readFileSync(path.join(packFolder, "_meta.json")).toString());

  return {
    meta: {
      ...packMeta,
      id: pack,
      hasCombined: hasSinglePixel || !!images.find((i) => i.startsWith("c_")),
      hasSeamless: hasSinglePixel || !!images.find((i) => i.startsWith("s_")),
    } as TexturePack,
    /* Combined (Main) Textures */
    combined: async () => {
      const textures = await getTextureURLs();
      const combinedCanvas = canvas.createCanvas(
        textures.combined.meta.size.w,
        textures.combined.meta.size.h
      );
      const combined = combinedCanvas.getContext("2d");
      if (!hasSinglePixel) combined.drawImage(await canvas.loadImage(textures.combinedURL), 0, 0);
      const pix = hasSinglePixel
        ? await canvas.loadImage(path.join(packFolder, "_usepixel.png"))
        : null;
      for (const img of pix
        ? Object.keys(textures.combined.frames).map((k) => `c_${k}.png`)
        : images.filter((i) => i.startsWith("c_"))) {
        const id = img.match(/.*?_(.*?).png/)?.[1];
        const tex = textures.combined.frames[id];
        if (!tex) continue;
        const size = tex.rotated ? { ...tex.frame, w: tex.frame.h, h: tex.frame.w } : tex.frame;
        combined.clearRect(size.x, size.y, size.w, size.h);
        combined.drawImage(
          pix || (await canvas.loadImage(path.join(packFolder, img))),
          size.x,
          size.y,
          size.w,
          size.h
        );
      }
      return combinedCanvas.toBuffer();
    },
    /* Seamless (Terrain) Textures */
    seamless: async () => {
      const textures = await getTextureURLs();
      const seamlessCanvas = canvas.createCanvas(
        textures.seamless.meta.size.w,
        textures.seamless.meta.size.h
      );
      const seamless = seamlessCanvas.getContext("2d");
      if (!hasSinglePixel) seamless.drawImage(await canvas.loadImage(textures.seamlessURL), 0, 0);
      const pix = hasSinglePixel
        ? await canvas.loadImage(path.join(packFolder, "_usepixel.png"))
        : null;
      for (const img of pix
        ? Object.keys(textures.seamless.frames).map((k) => `s_${k}.png`)
        : images.filter((i) => i.startsWith("s_"))) {
        const id = img.match(/.*?_(.*?).png/)?.[1];
        const tex = textures.seamless.frames[id];
        if (!tex) continue;
        const size = tex.rotated ? { ...tex.frame, w: tex.frame.h, h: tex.frame.w } : tex.frame;
        seamless.clearRect(size.x, size.y, size.w, size.h);
        seamless.drawImage(
          pix || (await canvas.loadImage(path.join(packFolder, img))),
          size.x,
          size.y,
          size.w,
          size.h
        );
      }
      return seamlessCanvas.toBuffer();
    },
  };
}
