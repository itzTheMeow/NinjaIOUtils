import config from "./config.json" assert { type: "json" };
import fs from "fs";
import axios from "axios";
import { Canvas, loadImage } from "canvas";
import path from "path";

console.log("Starting texture unpacker...");
(async () => {
  console.log("Fetching current image metadata.");
  const packMeta = (await axios.get(config.meta)).data;
  if (!packMeta) return console.error("Failed to fetch pack metadata. Try again later.");

  const unpack = async (arg) => {
    const start = Date.now();
    let last = start;
    console.log(`Starting ${arg} unpacker...`);

    const splitDir = path.join(process.cwd(), `split_${arg}`);
    if (!fs.existsSync(splitDir)) fs.mkdirSync(splitDir);

    const rawarg = arg == "terrain" ? "seamless" : "combined";
    console.log("Downloading files...");
    const textures = await loadImage(packMeta[`${rawarg}URL`]).catch((err) => {
      console.error(err);
      console.error("Failed to download image. Are your config.json URLs correct?");
      process.exit();
    });
    const textureJSON = (await axios.get(packMeta[`${rawarg}JSONURL`])).data;
    fs.writeFileSync(path.join(splitDir, "_meta.json"), JSON.stringify(textureJSON));
    console.log(`Files downloaded in ${-last + (last = Date.now())}ms.`);

    console.log(`Unpacking ${arg}...`);
    const tx = new Canvas(textures.width, textures.height);
    const textureCanvas = tx.getContext("2d");
    textureCanvas.drawImage(textures, 0, 0);
    tx.createPNGStream().pipe(fs.createWriteStream(path.join(splitDir, "_original.png")));
    Object.keys(textureJSON.frames).forEach((key) => {
      const file = path.join(
        splitDir,
        `${arg == "textures" ? "c" : arg == "terrain" ? "s" : "x"}_${key}.png`
      );
      if (!config.replace && fs.existsSync(file))
        return config.verbose && console.log(`Ignoring ${key}, already exists.`);
      const dim = textureJSON.frames[key];
      const size = dim.rotated ? { w: dim.frame.h, h: dim.frame.w } : dim.frame;
      const img = textureCanvas.getImageData(dim.frame.x, dim.frame.y, size.w, size.h);
      const can = new Canvas(img.width, img.height);
      can.getContext("2d").putImageData(img, 0, 0);
      fs.writeFileSync(file, can.toBuffer());
      if (config.verbose) console.log(`Unpacked ${key} in ${-last + (last = Date.now())}ms.`);
    });
    console.log(`Done unpacking ${arg} into ${splitDir}! Took ${Date.now() - start}ms.`);
  };

  await unpack("textures");
  await unpack("terrain");
  console.log("Done unpacking files!");
})();
