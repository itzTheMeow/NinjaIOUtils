import { NinjaGamemodes } from "./Gamemode";
import { NinjaMaps } from "./Maps";

export default interface NinjaGame {
  time: number;
  map: keyof typeof NinjaMaps;
  mode: NinjaGamemodes;
  kills: number;
  deaths: number;
  kdr: number;
  captures?: number;
}
export interface IncomingNinjaGame {
  id: string;
  map: keyof typeof NinjaMaps;
  mode: string;
  kills: number;
  deaths: number;
  caps: number;
}
