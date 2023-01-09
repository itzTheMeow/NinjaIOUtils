import { buildSync } from "esbuild";
import fs, { readFileSync } from "fs";

const ver = readFileSync("../version.json").toString().replace(/"/g, "").trim();
const scriptPath = "NinjaIOUtils.js";
console.log("Building utils...");
buildSync({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outfile: scriptPath,
  external: ["lib", "typings"],
});

const meta = JSON.parse(readFileSync("./meta.json").toString());
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
fs.writeFileSync(
  scriptPath,
  metaString +
    scriptFile
      // R E G E X - removes the imports for the .d.ts files so the script actually works
      .replace(/import_lib\d*\.?/g, "")
      .replace(/import_typings\d*\.?/g, "")
      .replace(/var  ?= __require\("typings"\);/g, "")
      .replace(/var  ?= __require\("lib"\);/g, "")
);

console.log(`NinjaIOUtils v${ver} built successfully!`);
