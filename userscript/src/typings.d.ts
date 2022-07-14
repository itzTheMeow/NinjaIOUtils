interface EventDispatcher {
  addListener(event: string, callback: (...args: any) => any): void;
  on(event: string, callback: (...args: any) => any): void;
}
interface Container extends EventDispatcher {
  x: number;
  y: number;
  width: number;
  height: number;
  parent: Container;
  addChild(child: Container): void;
  removeChild(child: Container): void;
}
interface Text extends Container {}
declare var PIXI: {
  Text: Text;
  Container: Container;
};

interface InputField extends Container {
  forceLowerCase: boolean;
  setDimensions(w: number, h: number): void;
  setMaxChars(max: number): void;
  setFilter(filter: string): void;
  setText(txt: string): void;
  getText(): string;
}
declare var InputField: {
  new (id: string, noBackground: boolean, fontSize: number): InputField;
  CHANGE: string;
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

declare var APIClient: {
  postCreateGame(): void;
};
declare var Manager: {
  prototype: {
    applySettings(data: any): any;
    _applySettings(data: any): any;
  };
};
declare var app: {
  menu: Container & { joinButton: Container };
  status: { updating?: boolean; message?: string };
  credential: {
    accounttype: "guest" | "user";
    playerid: string;
    id: string;
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
