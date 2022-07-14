interface EventDispatcher {
  addListener(event: string, callback: (...args: any) => any): void;
  on(event: string, callback: (...args: any) => any): void;
  emit(event: string): void;
}
interface Container extends EventDispatcher {
  x: number;
  y: number;
  width: number;
  height: number;
  parent: Container;
  anchor: { x: number; y: number };
  scale: { x: number; y: number };
  visible: boolean;
  text: string;
  setText(txt: string): void;
  addChild(child: Container): void;
  removeChild(child: Container): void;
  removeChildren(): void;
}
interface Text extends Container {
  new (
    text: string,
    options: Partial<{
      fontName: string;
      fontSize: number;
      lineHeight: number;
      fill: number;
      strokeThickness: number;
      lineJoin: "round";
    }>
  ): Container & {};
}
declare var PIXI: {
  Text: Text;
  Container: Container & { new (): Container };
  Graphics(): void;
};

interface InputField extends Container {
  forceLowerCase: boolean;
  setDimensions(w: number, h: number): void;
  setMaxChars(max: number): void;
  setFilter(filter: string): void;
  getText(): string;
  markInvalid(): void;
  setFocus(focused: boolean): void;
}
declare var InputField: {
  new (id: string, noBackground: boolean, fontSize: number): InputField;
  CHANGE: string;
  SUBMIT: string;
};

interface Button extends Container {
  setTint(tint: number): void;
}
declare var Button: Container & {
  new (id: string): Button;
  BUTTON_RELEASED: string;
};

interface ImgButton extends Container {}
declare var ImgButton: Container & {
  new (): ImgButton;
  CLICK: string;
};

interface SocialMenuProto {
  maskInvitationList: (scrollDist: number) => void;
}
declare var SocialMenu: Container &
  SocialMenuProto & {
    ItemHeight: number;
    ListHeight: number;
    listSearch: InputField;
    listContainer: Container;
    infoText: Text;
    inviteScrollRatio: number;
    invites: (Container & {
      name: string;
      tint: number;
      alpha: number;
      isRed: boolean;
      redReady: boolean;
    })[];
    prototype: SocialMenuProto;
  };

declare interface Feature extends Container {}
declare class Feature {
  container: Container;
}
declare var APIClient: {
  realPostCreateGame(...args: any): void;
  postCreateGame(...args: any): void;
};
declare var Manager: {
  prototype: {
    applySettings(data: any): any;
    _applySettings(data: any): any;
  };
};
declare var Layer: {
  Events: any;
};
declare var app: {
  menu: Container & { joinButton: Container };
  status: { updating?: boolean; message?: string };
  credential: {
    accounttype: "guest" | "user";
    playerid: string;
    id: string;
    username: string;
  };
  matchStarted: boolean;
  client: {
    socket?: WebSocket;
    mapID: string;
  };
  stepCallback(delta: number): any;
  _stepCallback(delta: number): any;
};
declare var App: {
  Console: {
    log(txt: string): void;
    consoleInput: InputField;
  };
  Stats: Container & {
    ping: number;
    setPing(ping: number): void;
    realSetPing(ping: number): void;
  };
  Layer: Container & {
    memberMenu: Container;
  };
  prototype: {
    initGameMode(data: any): any;
    realInitGameMode(data: any): any;
  };
};
interface GameEndData {
  mode: number;
  winner: number;
  leaderboard: {
    id: string[];
    points: number[];
    kills: number[];
    deaths: number[];
  };
  countdown: number;
  completed: number;
}
declare var Game: {
  MATCH_START: string;
  prototype: {
    endGame(data: GameEndData): any;
    _endGame(data: GameEndData): any;
  };
};
declare var AudioEffects: any;
