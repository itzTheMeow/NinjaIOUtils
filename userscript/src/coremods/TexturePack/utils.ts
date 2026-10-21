import { App } from "lib";

export enum TextureAtlasType {
  Assets = "combined",
  Terrain = "seamless",
}

/** Get the URL to the texture atlas JSON for a specific type. */
export function textureAtlasJSON(type: TextureAtlasType) {
  const folder = String(App.RESOURCE_FOLDER || "./assets").replace(
    /^\.?\//,
    "",
  );
  const entry = App.RESOURCES[type][0];
  const base = `${location.origin}/${folder}/${entry.id}`;
  return { base, url: `${base}/${entry.file}` };
}
/** Returns the texture atlas JSON data and image URL for the specified type. */
export async function textureAtlasFetchJSON(type: TextureAtlasType) {
  const { base, url } = textureAtlasJSON(type),
    data = (await (await fetch(url)).json()) as TextureAtlasJSON;
  return {
    json: data,
    pngURL: `${base}/${data.meta.image}`,
  };
}

export interface TextureAtlasFrame {
  frame: { x: number; y: number; w: number; h: number };
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: { x: number; y: number; w: number; h: number };
  sourceSize: { w: number; h: number };
}

export interface TextureAtlasJSON {
  animations: { [key: string]: string[] };
  frames: { [key: string]: TextureAtlasFrame };
  meta: {
    app: string;
    version: string;
    image: string;
    format: string;
    size: { w: number; h: number };
    scale: string;
  };
}

/** A texture pack as-defined in the repo. */
export interface TexturePack {
  id: string;
  name: string;
  author: string;
  description: string;
  hasCombined: boolean;
  hasSeamless: boolean;
}
/** A texture pack with additional manifest information provided by the compiled repo. */
export interface TexturePackManifestEntry extends TexturePack {
  /** SHA hash of the pack zip. */
  version: string;
  /** Path to the pack's zip file relative to the repo. */
  zip: string;
}
/** The texture pack manifest on the github packs repo. */
export interface TexturePackManifest {
  /** ISO date string of when the manifest was last updated. */
  updated: string;
  packs: TexturePackManifestEntry[];
}
