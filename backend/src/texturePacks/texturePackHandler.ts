import { Application } from "express";
import cors from "cors";
import getTexturePack, { getAllTexturePacks } from "./getTexturePack";
import { getTextureURLs } from "./textureURLs";

export default function texturePackHandler(app: Application) {
  app.get(
    "/packs",
    cors({
      origin: "*",
    }),
    async (req, res) => {
      res.json(getAllTexturePacks());
    }
  );
  app.get(
    "/packs/:id",
    cors({
      origin: "*",
    }),
    async (req, res) => {
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
      const pack = getTexturePack(req.params.id);
      if (!pack || !pack.meta.hasSeamless) return res.send("DOES_NOT_EXIST");
      res.contentType("png").end(await pack.seamless());
    }
  );
}
