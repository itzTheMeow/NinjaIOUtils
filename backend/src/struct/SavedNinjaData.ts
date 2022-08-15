import NinjaGame from "./Game";

export default interface SavedNinjaData {
  id: string;
  memberSince: number;
  matchHistory: NinjaGame[];
}
