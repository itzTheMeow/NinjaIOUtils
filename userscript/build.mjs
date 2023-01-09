import { build } from "esbuild";
import fs from "fs";
import { createServer } from "http";

const ver = fs.readFileSync("../version.json").toString().replace(/"/g, "").trim();

function postBuild() {
  const meta = JSON.parse(fs.readFileSync("./meta.json").toString());
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
  fs.writeFileSync(
    "dev.js",
    metaString +
      `/* This script is used for development testing. */
fetch("http://localhost:8000").then(r => r.text()).then(r => eval(r))\n`
  );

  console.log(`NinjaIOUtils v${ver} built successfully!`);
}

const scriptPath = "NinjaIOUtils.js",
  isDev = process.argv.includes("--dev");
console.log("Building utils...");
build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outfile: scriptPath,
  external: ["lib", "typings"],
  watch: isDev
    ? {
        onRebuild: () => postBuild(),
      }
    : undefined,
}).then(() => postBuild());

if (isDev) {
  const server = createServer();
  server.on("request", (req, res) => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    res.end(fs.readFileSync(scriptPath));
  });
  server.listen(8000, () => {
    console.log("Script server listening on port 8000.");
  });
}
