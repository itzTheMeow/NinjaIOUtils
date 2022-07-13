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

declare var app: {
  menu: Container & { joinButton: Container };
  status: { updating?: boolean; message?: string };
};
