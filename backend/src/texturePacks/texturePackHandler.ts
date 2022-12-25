import AdmZip from "adm-zip";
import cors from "cors";
import { Application } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { config } from "../server";
import getTexturePack, { getAllTexturePacks } from "./getTexturePack";
import { getTextureURLs } from "./textureURLs";
import unpackZip from "./unpackZip";

export default function texturePackHandler(app: Application) {
  const custom_packs = path.join(process.cwd(), "custom_packs");
  if (fs.existsSync(custom_packs)) fs.rmSync(custom_packs, { recursive: true, force: true });

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

  const upload = multer();
  async function custom(file: Buffer) {
    try {
      if (!fs.existsSync(custom_packs)) fs.mkdirSync(custom_packs);
      const location = path.join(custom_packs, String(Math.floor(Date.now() * Math.random())));
      const zip = new AdmZip(file);
      zip.extractAllTo(location);
      const pak = getTexturePack("::" + location);
      if (!pak) return null;
      return {
        ...pak,
        delete() {
          fs.rmSync(location, { recursive: true, force: true });
        },
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  app.post(
    `/packs/${config.customDelimiter}/combined.png`,
    cors({
      origin: "*",
    }),
    upload.single("zip"),
    async (req, res) => {
      res.set("Cache-Control", "no-store");
      if (
        !req.file ||
        !req.file.mimetype.startsWith("application/") ||
        !req.file.mimetype.includes("zip")
      )
        return res.send("NO_ZIP");
      const pack = await custom(req.file.buffer);
      if (!pack) return res.send("ERR");
      res.contentType("png").end(await pack.combined());
      pack.delete();
    }
  );
  app.post(
    `/packs/${config.customDelimiter}/seamless.png`,
    cors({
      origin: "*",
    }),
    upload.single("zip"),
    async (req, res) => {
      res.set("Cache-Control", "no-store");
      if (
        !req.file ||
        !req.file.mimetype.startsWith("application/") ||
        !req.file.mimetype.includes("zip")
      )
        return res.send("NO_ZIP");
      const pack = await custom(req.file.buffer);
      if (!pack) return res.send("ERR");
      res.contentType("png").end(await pack.seamless());
      pack.delete();
    }
  );
}
