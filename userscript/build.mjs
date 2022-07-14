import fs from "fs";
import { buildSync } from "esbuild";
import meta from "./meta.json" assert { type: "json" };
import ver from "./version.json" assert { type: "json" };

const scriptPath = "NinjaIOUtils.js";
console.log("Building utils...");
buildSync({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outfile: scriptPath,
});

meta.version = ver;
const metaString = `// ==UserScript==
${Object.entries(meta)
  .map(
    ([k, v]) =>
      `// @${(k = k.replace(/_/g, ""))}${" ".repeat(
        2 +
          Object.keys(meta)
            .map((a) => a.replace(/_/g, ""))
            .sort((a, b) => b.length - a.length)[0].length -
          k.length
      )}${v}`
  )
  .join("\n")}
// ==/UserScript==

/*
  This file was generated automatically by a build script!
  If you want to see the source code, view it on github:
  > https://github.com/itzTheMeow/NinjaIOUtils
*/\n\n`;
const scriptFile = fs
  .readFileSync(scriptPath)
  .toString()
  .replace(/\$\$version/g, ver);
fs.writeFileSync(scriptPath, metaString + scriptFile);

console.log(`NinjaIOUtils v${ver} built successfully!`);
