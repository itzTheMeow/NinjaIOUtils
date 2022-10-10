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

export interface Settings {
  uiScale: number;
  showFPS: boolean;
  texturePack: string | null;
  typewriter: boolean;
  apiKey: string;
  appearOnline: boolean;
  enableHotkeyMessages: boolean;
  hotkeyMessages: Array<[hotkey: string, message: string]>;
}
