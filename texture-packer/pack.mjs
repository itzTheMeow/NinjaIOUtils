// THIS SCRIPT IS NO LONGER MAINTAINED
// THIS IS ALL DONE SERVERSIDE NOW

import fs from "fs";
import { Canvas, loadImage } from "canvas";
import path from "path";

const pack = async (arg) => {
  const start = Date.now();
  console.log(`Starting ${arg} packer...`);

  const packed = path.join(process.cwd(), `${arg}.png`);

  console.log("Finding files...");
  const splitDir = path.join(process.cwd(), `split_${arg}`);
  if (!fs.existsSync(splitDir))
    return console.log(`Please put your files in the split_${arg} folder!`);
  const metaFile = path.join(splitDir, "_meta.json");
  if (!fs.existsSync(metaFile))
    return console.log("No _meta.json file was found! Run the unpacker again.");
  const texJSON = JSON.parse(fs.readFileSync(metaFile));
  const texfiles = fs.readdirSync(splitDir).filter((f) => f.endsWith(".png") && !f.startsWith("_"));
  console.log(`Found ${texfiles.length.toLocaleString()} files to pack.`);

  console.log(`Packing ${arg}...`);
  const tex = new Canvas(texJSON.meta.size.w, texJSON.meta.size.h);
  const texCanvas = tex.getContext("2d");
  await Promise.all(
    Object.keys(texJSON.frames).map(async (key) => {
      const file = path.join(splitDir, `${key}.png`);
      if (!fs.existsSync(file)) return console.log(`Image not found for ${key}.`);
      const img = await loadImage(file);
      const dim = texJSON.frames[key];
      const size = dim.rotated ? { w: dim.frame.h, h: dim.frame.w } : dim.frame;
      texCanvas.drawImage(img, dim.frame.x, dim.frame.y, size.w, size.h);
    })
  );
  if (fs.existsSync(packed)) fs.unlinkSync(packed);
  tex
    .createPNGStream()
    .pipe(fs.createWriteStream(packed))
    .on("close", () => {
      console.log(`Packed ${arg} into ${packed}! Took ${Date.now() - start}ms.`);
    });
};

pack("textures").then(() => pack("terrain"));
