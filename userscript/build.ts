/// <reference types="bun-types" />
import { build, context } from "esbuild";
import fs from "fs";
import { createServer } from "http";

const DEV_PORT = 8080;

const ver = fs
  .readFileSync("../version.json")
  .toString()
  .replace(/"/g, "")
  .trim();

const scriptPath = "NinjaIOUtils.js",
  isDev = process.argv.includes("--dev");
console.log("Building utils...");
const ctx = await context({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outfile: scriptPath,
  external: ["lib"],
  plugins: [
    // runs our post-build injection for the metadata
    {
      name: "post-build",
      setup(b) {
        b.onEnd((result) => {
          if (result.errors.length) return;

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
          k.length,
      )}${v}`,
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
                .replace(/var  ?= __require\("lib"\);/g, ""),
          );
          fs.writeFileSync(
            "dev.js",
            metaString +
              `/* This script is used for development testing. */
fetch("http://localhost:${DEV_PORT}/NinjaIOUtils.js").then(r => r.text()).then(r => eval(r))\n`,
          );

          console.log(`NinjaIOUtils v${ver} built successfully!`);
        });
      },
    },
    // redirects the texture worker virtual to be bundled inside the script
    {
      name: "tex-worker-source",
      setup(b) {
        b.onResolve({ filter: /^virtual:tex-worker$/ }, (args) => ({
          path: args.path,
          namespace: "tex-worker",
        }));
        b.onLoad({ filter: /.*/, namespace: "tex-worker" }, async () => {
          const res = await build({
            entryPoints: ["src/coremods/TexturePack/worker/worker.ts"],
            bundle: true,
            format: "iife",
            write: false,
          });
          return {
            contents: `export default ${JSON.stringify(res.outputFiles[0].text)};`,
            loader: "js",
          };
        });
      },
    },
  ],
});
if (isDev) {
  await ctx.watch();
} else {
  await ctx.rebuild();
  await ctx.dispose();
}

if (isDev) {
  const server = createServer();
  server.on("request", (req, res) => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    res.end(fs.readFileSync(scriptPath));
  });
  server.listen(DEV_PORT, () => {
    console.log(`Script server listening on port ${DEV_PORT}.`);
  });
}
