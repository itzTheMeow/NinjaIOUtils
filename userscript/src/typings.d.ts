interface EventDispatcher {
  addListener(event: string, callback: (...args: any) => any): void;
  on(event: string, callback: (...args: any) => any): void;
  emit(event: string, ...args: any[]): void;
  _events: {
    mousedown: any[];
  };
}
declare var EventDispatcher: EventDispatcher & {
  new (): EventDispatcher;
};
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
  addChild(child: Container): Container;
  removeChild(child: Container): void;
  removeChildren(): void;
  destroy(): void;
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
  ): Container;
}
declare var PIXI: {
  Text: Text;
  Container: Container & { new (): Container };
  Graphics(): void;
};

declare var SettingsPanel: {
  new (w: number, h: number): any;
  Tabs: {
    GRAPHICS: string;
    CONTROLS: string;
    SOUND: string;
    UTIL: string;
  };
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

interface ButtonEvents {
  BUTTON_RELEASED: string;
  BUTTON_PRESSED: string;
}
interface Button extends Container {
  setTint(tint: number): void;
  selected: boolean;
}
declare var Button: Container &
  ButtonEvents & {
    new (id: string): Button;
  };

interface ImgButton extends Container {}
declare var ImgButton: Container & {
  new (): ImgButton;
  CLICK: string;
};
interface MemberMenuButton extends Button {
  setActive(active: 0 | 1): void;
}
declare var MemberMenuButton: MemberMenuButton &
  ButtonEvents & {
    new (
      text: string,
      color: number,
      fontSize: number,
      sprite: string,
      noBG: boolean
    ): MemberMenuButton;
  };

interface Checkbox extends Container {}
declare var Checkbox: Container & {
  new (id: string, text: string, checked: boolean): Checkbox;
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
declare var Protocol: {
  DISCONNECT: string;
};
declare var Client: {
  decompress(data: any): {
    type: string;
    data: {
      type: string;
      t: string;
      info: string;
      msg: string;
    };
  };
  prototype: {
    onMessage(data: { data: any }): void;
  };
};
declare var app: {
  menu: Container & {
    joinButton: Container;
    partyButton: MemberMenuButton;
    container: Container;
    settingsPanel: Container & {
      displayTab(tab: string): void;
      controlsTab: Container & {
        forceRefresh: boolean;
      };
      graphicsTabButtonBackground: Container;
      controlsTabButtonBackground: Container;
      soundTabButtonBackground: Container;
      utilTabButtonBackground: Container;
    };
    resize(): void;
  };
  status: { updating?: boolean; message?: string };
  credential: {
    accounttype: "guest" | "user";
    playerid: string;
    id: string;
    username: string;
  };
  matchStarted: boolean;
  client: EventDispatcher & {
    socket?: WebSocket;
    mapID: string;
    server: { id: string };
  };
  showMenu(): void;
  _showMenu(): void;
  stepCallback(delta: number): any;
  _stepCallback(delta: number): any;
  onResize(): void;
};
declare var App: {
  DevicePixelRatio: number;
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
    memberMenu: Container & { playButton: MemberMenuButton };
    partyMenu: Container & { show(): void; reposition(): void };
    loadingMenu: Container & {
      title: Container;
      container: Container;
      joinButton: Button;
      cancelButton: Button;
      cancelButton2: Button;
      show(): void;
      setTitle(title: string): void;
      cancelCount: number;
    };
    mainMenuHides: Container[];
    features: Container[];
    hideFeature(feature: Container): void;
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
