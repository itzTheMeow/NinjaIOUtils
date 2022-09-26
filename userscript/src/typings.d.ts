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
interface Container extends EventDispatcher {
  x: number;
  y: number;
  width: number;
  height: number;
  parent: Container;
  interactive: boolean;
  anchor: { x: number; y: number };
  scale: { x: number; y: number };
  visible: boolean;
  text: string;
  tint: number;
  alpha: number;
  children: Container[];
  setText(txt: string): void;
  addChild(child: Container): Container;
  removeChild(...child: Container[]): void;
  removeChildren(): void;
  destroy(): void;
  hitArea?: Rectangle;
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
declare interface Rectangle {}
declare interface Graphics extends Container {
  clear(): void;
  beginFill(arg0: number, arg1: number): void;
  drawRoundedRect(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number): void;
  endFill(): void;
  drawCircle(arg0: number, arg1: number, arg2: number): void;
  interactive: boolean;
  lineStyle(arg0: number, arg1: number, arg2: number, arg3: number): void;
  drawRect(arg0: number, arg1: number, arg2: number, arg3: number): void;
  hitArea: Rectangle;
}
declare interface Sprite extends Container {}

declare var PIXI: {
  Text: Text;
  Container: Container & { new (): Container };
  Graphics: Container & { new (): Graphics };
  Sprite: Container & { new (name: string): Sprite };
  Rectangle: { new (x: number, y: number, width: number, height: number): Rectangle };
  BitmapText: Container & {
    new (text: string, opts?: Partial<{ fontName: string; fontSize: number }>): Container;
  };
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
  backgroundEnabled: Container;
  icon: Container;
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

interface Checkbox extends Container {
  setChecked(checked: boolean): void;
}
declare var Checkbox: Container & {
  new (id: string, text: string, checked: boolean): Checkbox;
  CHANGE: string;
};
interface Slider extends Container {
  valueLabel: Container;
}
declare var Slider: Container & {
  new (id: string, label: string, value: number, max: number, min?: number): Slider;
  CHANGE: string;
};

declare var CustomizationMenu: {
  new (): Container;
  PLAYER: string;
  WEAPONS: string;
};
declare var ProfileMenu: {
  new (): Container;
  TAB_OVERVIEW: string;
  TAB_CLAN: string;
  TAB_ACCOUNT: string;
  TAB_SETTINGS: string;
};

interface SocialMenuProto extends Container {
  maskInvitationList(scrollDist: number): void;
  _maskFriendList(scrollDist: number): void;
  maskFriendList(scrollDist: number): void;
  friendScrollRatio: number;
  mode: "friends" & string;
  loadFriends(): Promise<void>;
  onlineFriends: string[];
  friends: FriendItem[];
  container: Container;
  clanButton: Button;
  clanChatButton: Button;
  onClanChatButtonReleased: () => any;
  dropdownButton: Button;
  recMenu: Container;
}
declare var SocialMenu: SocialMenuProto & {
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
  ACCESS_PROFILE: string;
  SHOW_FRIEND_DROPDOWN: string;
};

declare interface FriendItem extends Container {}
declare class FriendItem {
  seen: Date;
  name: string;
  id: string;
}

declare interface Feature extends Container {
  ox: number;
  oy: number;
  w: number;
  h: number;
  show(): void;
  hide(): void;
}
declare class Feature {
  container: Container;
}
declare var UserInput: EventDispatcher & {
  WHEEL: string;
};
declare var APIClient: {
  realPostCreateGame(...args: any): void;
  postCreateGame(...args: any): void;
  getUserProfile(id: string): Promise<{ experience: string }>;
  postFriendMessage(friendID: string, message: string, auth: string): Promise<void>;
  getMessages(auth: string): Promise<string>;
};
declare var Manager: {
  prototype: {
    applySettings(data: any): any;
    _applySettings(data: any): any;
  };
};
declare var Layer: {
  Events: {
    DISCONNECT: "disconnect";
    LOGIN_ACCESS: "login_access";
    LOGIN_SUBMIT: "login_submit";
    LOGIN_CANCEL: "login_cancel";
    LOGOUT: "logout";
    RECOVER_ACCESS: "recover_access";
    RECOVER_SUBMIT: "recover_submit";
    RECOVER_CANCEL: "recover_cancel";
    REGISTER_ACCESS: "register_access";
    REGISTER_SUBMIT: "register_submit";
    REGISTER_CANCEL: "register_cancel";
    PROFILE_ACCESS: "profile_access";
    PROFILE_CANCEL: "profile_cancel";
    PROFILE_RENAME: "profile_rename";
    HIDE_MENU: "hide_menu";
    SHOW_MENU: "show_menu";
    UPDATE_CREDENTIAL: "update_credential";
    CUSTOMIZATION_ACCESS: "customization_access";
    CUSTOMIZATION_CANCEL: "customization_cancel";
    USER_ACCESS: "user_access";
    USER_CANCEL: "user_cancel";
    USER_UNFRIEND: "user_unfriend";
    RANKING_ACCESS: "ranking_access";
    RANKING_CANCEL: "ranking_cancel";
    MEMBER_ACCESS: "member_access";
    MEMBER_CANCEL: "member_cancel";
    NEWS_ACCESS: "news_access";
    NEWS_CANCEL: "news_cancel";
    PARTNER_ACCESS: "partner_access";
    PARTNER_CANCEL: "partner_cancel";
    LEAVE_CLAN: "leave_clan";
    CREATE_CLAN: "create_clan";
    JOIN_CLAN: "join_clan";
    JOIN_GAME: "join_game";
    JOIN_GAME_FAIL: "join_game_fail";
    JOIN_SERVER: "join_server";
    CREATE_SERVER: "create_server";
    SERVER_LIST_REFRESH: "server_list_refresh";
    SERVER_LIST_CANCEL: "server_list_cancel";
    SERVER_CREATION_CANCEL: "server_creation_cancel";
    SERVER_CREATION_INIT: "server_creation_init";
    SERVER_CREATION_REGION: "server_creation_region";
    SERVER_CREATION_JOIN_LOBBY: "server_creation_join_lobby";
    SERVER_CREATION_SESSION_INIT: "server_creation_session_init";
    SERVER_CREATED: "server_created";
    CLAN_CHAT_ACCESS: "clan_chat_access";
    CLAN_CHAT_CANCEL: "clan_chat_cancel";
    LOADING_CANCEL: "loading_cancel";
    CLAN_BROWSER_ACCESS: "clan_browser_access";
    CLAN_BROWSER_CANCEL: "clan_browser_cancel";
    CLAN_ACCESS: "clan_access";
    CLAN_CANCEL: "clan_cancel";
    RENAME_ACCESS: "rename_access";
    RENAME_SUBMIT: "rename_submit";
    RENAME_CANCEL: "rename_cancel";
    RENAME_COMPLETED: "rename_completed";
    LOGOUT_CANCEL: "logout_cancel";
    LOGOUT_ACCESS: "logout_access";
    JOYSTICK_MOVE_STATE: "joystick_move_state";
    JOYSTICK_TARGET_STATE: "joystick_target_state";
    DISPLAY_HELP: "display_help";
    MUTE_TOGGLE: "mute_toggle";
    SERVER_DETAIL_ACCESS: "server_detail_access";
    SERVER_DETAIL_CANCEL: "server_detail_cancel";
    MENU_ACCESS: "menu_access";
    GUEST_PROFILE_ACCESS: "guest_profile_access";
    GUEST_PROFILE_HIDE: "guest_profile_hide";
    SETTINGS_ACCESS: "settings_access";
    SETTINGS_HIDE: "settings_hide";
    ESCAPE_MENU_ACCESS: "escape_menu_access";
    REWARDS_ACCESS: "rewards_access";
    REWARDS_CLAIMED: "rewards_claimed";
    REWARDS_CANCEL: "rewards_cancel";
  };
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
    backgroundImage: Container;
    joinButton: Container;
    partyButton: MemberMenuButton;
    container: Container;
    serverListButton: Container;
    serverCreateButton: Container;
    onlineOption: Checkbox;
    serverContainer: Container;
    modeContainer: Container;
    settingsPanel: Container & {
      displayTab(tab: string): void;
      controlsTab: Container & {
        forceRefresh: boolean;
      };
      graphicsTab: Container & {
        enableAA: Container;
        uiScaler: Slider;
      };
      graphicsTabButtonBackground: Container;
      controlsTabButtonBackground: Container;
      soundTabButtonBackground: Container;
      utilTabButtonBackground: Container;
      selectedTab: string;
    };
    resize(): void;
    _resize(): void;
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
  onShowMenu(cb: () => any): void;
  stepCallback(delta: number): any;
  _stepCallback(delta: number): any;
  onResize(win?: boolean): void;
  proceed(): void;
};
declare var App: {
  CombinedTextures: { [key: string]: string };
  Renderer: {
    view: HTMLCanvasElement;
  };
  NUIScale: number;
  ClientVersion: string;
  DevicePixelRatio: number;
  Console: {
    log(txt: string, color?: number): void;
    consoleInput: InputField;
  };
  Stats: Container & {
    ping: number;
    setPing(ping: number): void;
    realSetPing(ping: number): void;
  };
  Layer: Container & {
    customizationMenu: Container & {
      playerCustomizationButton: Graphics;
      weaponCustomizationButton: Graphics;
      display: string;
    };
    profileMenu: Container & {
      _openTab(tab: string, audio?: boolean): void;
      openTab(tab: string, audio?: boolean): void;
      curTab: string;
    };
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
    socialMenu: SocialMenuProto;
    hideFeature(feature: Container): void;
    userMenu: Feature & {
      id: string;
      load(id: string, type: string): Promise<void>;
      _load(id: string, type: string): Promise<void>;
      onCloseButtonReleased(): void;
    };
  };
  RemovePreloader(): void;
  Scale: number;
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
declare var Howler: any;
