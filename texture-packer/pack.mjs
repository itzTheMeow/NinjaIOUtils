import config from "./config.json" assert { type: "json" };
import fs from "fs";
import { Canvas, loadImage } from "canvas";
import path from "path";

(async () => {
  const start = Date.now();
  console.log("Starting texture packer...");

  const packed = path.join(process.cwd(), "packed.png");

  console.log("Finding files...");
  const splitDir = path.join(process.cwd(), "split_textures");
  if (!fs.existsSync(splitDir))
    return console.log("Please put your files in the split_textures folder!");
  const metaFile = path.join(splitDir, "_meta.json");
  if (!fs.existsSync(metaFile))
    return console.log("No _meta.json file was found! Run the unpacker again.");
  const texJSON = JSON.parse(fs.readFileSync(metaFile));
  const texfiles = fs.readdirSync(splitDir).filter((f) => f.endsWith(".png") && !f.startsWith("_"));
  console.log(`Found ${texfiles.length.toLocaleString()} files to pack.`);

  console.log("Packing textures...");
  const tex = new Canvas(texJSON.meta.size.w, texJSON.meta.size.h);
  const texCanvas = tex.getContext("2d");
  await Promise.all(
    Object.keys(texJSON.frames).map(async (key) => {
      const file = path.join(splitDir, `${key}.png`);
      if (!fs.existsSync(file)) return console.log(`Image not found for ${key}.`);
      const img = await loadImage(file);
      const dim = texJSON.frames[key].frame;
      texCanvas.drawImage(img, dim.x, dim.y, dim.w, dim.h);
    })
  );
  if (fs.existsSync(packed)) fs.unlinkSync(packed);
  fs.writeFileSync(packed, tex.toBuffer());
  console.log(`Packed into ${packed}! Took ${Date.now() - start}ms.`);
})();
