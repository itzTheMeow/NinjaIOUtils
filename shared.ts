export enum SocketTypes {
  online,
  party,
}
export interface TexturePack {
  id: string;
  name: string;
  author: string;
  description: string;
  hasCombined: boolean;
  hasSeamless: boolean;
}

export interface APIMap {
  id: string;
  title: string;
  name: string;
  author: string;
  mode: "deathmatch" | "captureTheFlag" | "dodgeball";
  enabled: "0" | "1";
  version: string;
}
