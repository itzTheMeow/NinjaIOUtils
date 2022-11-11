import { getTextureURLs } from "./textureURLs";
import { Canvas, loadImage } from "canvas";
import AdmZip from "adm-zip";

async function unpackTextures(
  arg: "textures" | "terrain",
  packMeta: Awaited<ReturnType<typeof getTextureURLs>>
) {
  const files: { name: string; data: Buffer }[] = [];

  const rawarg = arg == "terrain" ? "seamless" : "combined";
  const delim = arg == "textures" ? "c" : arg == "terrain" ? "s" : "x";
  const textures = await loadImage(packMeta[`${rawarg}URL`]).catch((err) => {
    console.error(err);
    console.error("Failed to download image. Are your config.json URLs correct?");
    process.exit();
  });
  const textureJSON = packMeta[rawarg];
  files.push({
    name: `_meta_${delim}.json`,
    data: Buffer.from(JSON.stringify(textureJSON), "utf8"),
  });

  const tx = new Canvas(textures.width, textures.height);
  const textureCanvas = tx.getContext("2d");
  textureCanvas.drawImage(textures, 0, 0);
  files.push({ name: `_original_${delim}.png`, data: tx.toBuffer() });
  Object.keys(textureJSON.frames).forEach((key) => {
    const dim = textureJSON.frames[key];
    const size = dim.rotated ? { w: dim.frame.h, h: dim.frame.w } : dim.frame;
    const img = textureCanvas.getImageData(dim.frame.x, dim.frame.y, size.w, size.h);
    const can = new Canvas(img.width, img.height);
    can.getContext("2d").putImageData(img, 0, 0);
    files.push({
      name: `${delim}_${key}.png`,
      data: can.toBuffer(),
    });
  });
  return files;
}

export default async function unpackZip() {
  const urls = await getTextureURLs();
  const list = [
    ...(await unpackTextures("textures", urls)),
    ...(await unpackTextures("terrain", urls)),
  ];
  const zip = new AdmZip();
  list.forEach((i) => zip.addFile(i.name, i.data));
  return await zip.toBufferPromise();
}
