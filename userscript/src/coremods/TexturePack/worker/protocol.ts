import { TextureAtlasJSON, TextureAtlasType } from "../utils";

export enum TexWorkerReq {
  /** Returns the base texture zip file for download. */
  BaseZip,
}

export interface TexWorkerInBase {
  id: number;
  type: TexWorkerReq;
}
export type TexWorkerInMap = {
  [TexWorkerReq.BaseZip]: {
    atlases: {
      type: TextureAtlasType;
      png: Blob;
      json: TextureAtlasJSON;
    }[];
  };
};
export type TexWorkerIn<T extends TexWorkerReq = TexWorkerReq> =
  TexWorkerInBase & {
    type: T;
  } & TexWorkerInMap[T];

export interface TexWorkerOutBase {
  id: number;
  err: false;
  type: TexWorkerReq;
}
export interface TexWorkerOutError extends Omit<TexWorkerOutBase, "err"> {
  err: true;
  msg: string;
}
export type TexWorkerOutMap = {
  [TexWorkerReq.BaseZip]: {
    zip: Blob;
  };
};
export type TexWorkerOut<T extends TexWorkerReq = TexWorkerReq> =
  TexWorkerOutBase & {
    type: T;
  } & TexWorkerOutMap[T];
