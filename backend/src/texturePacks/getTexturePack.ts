import path from "path";
import fs from "fs";
import canvas from "canvas";
import { getTextureURLs } from "./textureURLs";
import { TexturePack } from "../../../shared";

export function getAllTexturePacks() {
  return fs
    .readdirSync(path.join(process.cwd(), "../texturepacks"))
    .map((pak) => getTexturePack(pak)?.meta)
    .filter((p) => p);
}

export default function getTexturePack(pack: string) {
  const packFolder = path.join(process.cwd(), "../texturepacks", pack);
  if (!fs.existsSync(packFolder)) return null;
  const images = fs.readdirSync(packFolder);
  if (!images.includes("_meta.json")) return null;
  if (!images.find((i) => i.startsWith("c_") || i.startsWith("s_"))) return null;
  const packMeta = JSON.parse(fs.readFileSync(path.join(packFolder, "_meta.json")).toString());

  return {
    meta: {
      ...packMeta,
      id: pack,
      hasCombined: !!images.find((i) => i.startsWith("c_")),
      hasSeamless: !!images.find((i) => i.startsWith("s_")),
    } as TexturePack,
    /* Combined (Main) Textures */
    combined: async () => {
      const textures = await getTextureURLs();
      const combinedCanvas = canvas.createCanvas(
        textures.combined.meta.size.w,
        textures.combined.meta.size.h
      );
      const combined = combinedCanvas.getContext("2d");
      combined.drawImage(await canvas.loadImage(textures.combinedURL), 0, 0);
      for (const img of images.filter((i) => i.startsWith("c_"))) {
        const id = img.match(/.*?_(.*?).png/)[1];
        const tex = textures.combined.frames[id];
        if (!tex) continue;
        const size = tex.rotated ? { ...tex.frame, w: tex.frame.h, h: tex.frame.w } : tex.frame;
        combined.clearRect(size.x, size.y, size.w, size.h);
        combined.drawImage(
          await canvas.loadImage(path.join(packFolder, img)),
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
      seamless.drawImage(await canvas.loadImage(textures.seamlessURL), 0, 0);
      for (const img of images.filter((i) => i.startsWith("s_"))) {
        const id = img.match(/.*?_(.*?).png/)[1];
        const tex = textures.seamless.frames[id];
        if (!tex) continue;
        const size = tex.rotated ? { ...tex.frame, w: tex.frame.h, h: tex.frame.w } : tex.frame;
        seamless.clearRect(size.x, size.y, size.w, size.h);
        seamless.drawImage(
          await canvas.loadImage(path.join(packFolder, img)),
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
