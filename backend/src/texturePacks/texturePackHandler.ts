import cors from "cors";
import { Application } from "express";
import getTexturePack, { getAllTexturePacks } from "./getTexturePack";
import { getTextureURLs } from "./textureURLs";
import unpackZip from "./unpackZip";

export default function texturePackHandler(app: Application) {
  app.get(
    "/pack_meta",
    cors({
      origin: "*",
    }),
    async (req, res) => {
      try {
        const texurls = { ...(await getTextureURLs()) };
        delete texurls.combined;
        delete texurls.seamless;
        res.json(texurls);
      } catch {
        res.json({});
      }
    }
  );
  app.get(
    "/pack_meta/textures.zip",
    cors({
      origin: "*",
    }),
    async (req, res) => {
      try {
        const zip = await unpackZip();
        res
          .setHeader("Content-Length", zip.length)
          .setHeader("Cache-Control", "no-store")
          .contentType("zip")
          .end(zip);
      } catch {
        res.json({ error: "Failed to unpack textures. Please try again or contact Meow." });
      }
    }
  );
  app.get(
    "/packs",
    cors({
      origin: "*",
    }),
    async (req, res) => {
      res.set("Cache-Control", "no-store");
      res.json(getAllTexturePacks());
    }
  );
  app.get(
    "/packs/:id",
    cors({
      origin: "*",
    }),
    async (req, res) => {
      res.set("Cache-Control", "no-store");
      const pack = getTexturePack(req.params.id);
      if (!pack) return res.json({ exists: false });
      res.json(pack.meta);
    }
  );
  app.get(
    "/packs/:id/combined.png",
    cors({
      origin: "*",
    }),
    async (req, res) => {
      res.set("Cache-Control", "no-store");
      const pack = getTexturePack(req.params.id);
      if (!pack || !pack.meta.hasCombined) return res.send("DOES_NOT_EXIST");
      res.contentType("png").end(await pack.combined());
    }
  );
  app.get(
    "/packs/:id/seamless.png",
    cors({
      origin: "*",
    }),
    async (req, res) => {
      res.set("Cache-Control", "no-store");
      const pack = getTexturePack(req.params.id);
      if (!pack || !pack.meta.hasSeamless) return res.send("DOES_NOT_EXIST");
      res.contentType("png").end(await pack.seamless());
    }
  );
}
