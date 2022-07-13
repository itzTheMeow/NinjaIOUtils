import config from "./config.json" assert { type: "json" };
import fs from "fs";
import axios from "axios";
import { Canvas, loadImage } from "canvas";
import path from "path";

(async () => {
  const start = Date.now();
  let last = start;
  console.log("Starting texture unpacker...");

  const splitDir = path.join(process.cwd(), "split_textures");
  if (!fs.existsSync(splitDir)) fs.mkdirSync(splitDir);

  console.log("Downloading files...");
  const textures = await loadImage(config.textures.png);
  const textureJSON = (await axios.get(config.textures.json)).data;
  fs.writeFileSync(path.join(splitDir, "_meta.json"), JSON.stringify(textureJSON));
  console.log(`Files downloaded in ${-last + (last = Date.now())}ms.`);

  console.log("Unpacking textures...");
  const tx = new Canvas(textures.width, textures.height);
  const textureCanvas = tx.getContext("2d");
  textureCanvas.drawImage(textures, 0, 0);
  tx.createPNGStream().pipe(fs.createWriteStream(path.join(splitDir, "_original.png")));
  Object.keys(textureJSON.frames).forEach((key) => {
    const file = path.join(splitDir, `${key}.png`);
    if (!config.replace && fs.existsSync(file))
      return config.verbose && console.log(`Ignoring ${key}, already exists.`);
    const dim = textureJSON.frames[key].frame;
    const img = textureCanvas.getImageData(dim.x, dim.y, dim.w, dim.h);
    const can = new Canvas(img.width, img.height);
    can.getContext("2d").putImageData(img, 0, 0);
    fs.writeFileSync(file, can.toBuffer());
    if (config.verbose) console.log(`Unpacked ${key} in ${-last + (last = Date.now())}ms.`);
  });
  console.log(`Done unpacking into ${splitDir}! Took ${Date.now() - start}ms.`);
})();
