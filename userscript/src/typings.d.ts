import type * as PixiJS from "pixi.js/lib/index";
import { App, Layer } from "./lib";
export var PIXI: typeof PixiJS;

type func = (...args: any) => any;

interface EventDispatcher {
  addListener(event: string, callback: func): void;
  hasListener(event: string, callback: func): boolean;
  removeListener(event: string, callback: func): void;
  on(event: string, callback: func): void;
  emit(event: string, ...args: any[]): void;
  _events: {
    mousedown: any[];
  };
}
declare var EventDispatcher: EventDispatcher & {
  new (): EventDispatcher;
};

declare var SettingsPanel: {
  new (w: number, h: number): any;
  OPEN_TAB: string;
  Tabs: {
    GRAPHICS: string;
    CONTROLS: string;
    SOUND: string;
    UTIL: string;
    TEX: string;
    HKM: string;
  };
};

export declare var app: App;
export declare var App: typeof App & { Layer: Layer };
export declare var Layer: typeof Layer;
