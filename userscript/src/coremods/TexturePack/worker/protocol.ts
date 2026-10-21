import { TextureAtlasJSON, TextureAtlasType } from "../utils";

export enum TexWorkerReq {
  /** Returns the base texture zip file for download. */
  BaseZip,
  /** Extracts a zip file to an object with blobs. */
  ExtractZip,
  /** Generates an overridden texture atlas given files. */
  GenerateAtlas,
}

export interface TexWorkerInMap {
  [TexWorkerReq.BaseZip]: {
    atlases: {
      type: TextureAtlasType;
      png: Blob;
      json: TextureAtlasJSON;
    }[];
  };
  [TexWorkerReq.ExtractZip]: {
    zip: Blob;
  };
  [TexWorkerReq.GenerateAtlas]: {
    /** The type of atlas to generate. */
    type: TextureAtlasType;
    /** The original PNG of the textures. */
    original: Blob;
    /** The JSON sprite metadata. */
    json: TextureAtlasJSON;
    /** Ordered list of zip files to apply. Zips will be applied in ascending order. (higher index has priority) */
    zips: Blob[];
  };
}

export interface TexWorkerOutMap {
  [TexWorkerReq.BaseZip]: {
    zip: Blob;
  };
  [TexWorkerReq.ExtractZip]: {
    files: Record<string, Blob>;
  };
  [TexWorkerReq.GenerateAtlas]: {
    atlas: Blob;
  };
}

export interface TexWorkerInBase<T extends TexWorkerReq = TexWorkerReq> {
  id: number;
  type: T;
}
export interface TexWorkerOutBase<
  T extends TexWorkerReq = TexWorkerReq,
> extends TexWorkerInBase<T> {
  err: false;
}
export interface TexWorkerOutError<
  T extends TexWorkerReq = TexWorkerReq,
> extends TexWorkerInBase<T> {
  err: true;
  msg: string;
}

export type TexWorkerIn<T extends TexWorkerReq = TexWorkerReq> = {
  [K in T]: TexWorkerInBase<K> & {
    payload: TexWorkerInMap[K];
  };
}[T];

export type TexWorkerOut<T extends TexWorkerReq = TexWorkerReq> = {
  [K in T]: TexWorkerOutBase<K> & {
    payload: TexWorkerOutMap[K];
  };
}[T];
