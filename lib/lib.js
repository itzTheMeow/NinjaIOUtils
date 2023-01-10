import * as PIXI from "pixi.js";

class ServiceBase {
  xhrGet(a) {
    const b = new XMLHttpRequest();
    return new Promise((c, d) => {
      b.addEventListener("load", () => {
        200 === b.status ? c(b.responseText) : d(this.xhrError(b.status, a));
      });
      b.open("GET", ServiceBase.API_URL + a);
      b.setRequestHeader("Client-Version", App.ClientVersion);
      b.send();
    });
  }
  xhrPost(a, b) {
    const c = new XMLHttpRequest();
    return new Promise((d, e) => {
      c.addEventListener("load", () => {
        if (200 === c.status) return d(c.responseText);
        e(this.xhrError(c.status, a));
      });
      c.open("POST", ServiceBase.API_URL + a);
      c.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      c.setRequestHeader("Client-Version", App.ClientVersion);
      c.send(JSON.stringify(b));
    });
  }
  xhrError(a, b) {
    return "xhr request " + ServiceBase.API_URL + b + " failed with status " + a;
  }
}
const urlParams = new URLSearchParams(window.location.search),
  myParam = urlParams.get("dev"),
  loc = window.location
    .toString()
    .replace(/(^\w+:|^)\/\//, "")
    .trim()
    .replace(/\/$/, "");
ServiceBase.API_URL =
  "site.ninja.local" === loc ? "http://api.ninja.local/" : "https://api2.ninja.io/";
var userservice = {};
class UserService extends ServiceBase {
  constructor() {
    super();
  }
  async getRanking() {
    const a = await this.xhrGet("user/ranking");
    return JSON.parse(a);
  }
  async getRankingType(a, b) {
    a = await this.xhrGet("user/ranking/" + a + "/limit/" + b);
    return JSON.parse(a);
  }
  async getWeaponRanking() {
    const a = await this.xhrGet("user/weapon-ranking");
    return JSON.parse(a);
  }
  async getWeaponRankingType(a) {
    a = await this.xhrGet("user/weapon-ranking/" + a);
    return JSON.parse(a);
  }
  async getGuestCredentials(a) {
    a = await this.xhrGet("user/guest/" + a);
    return JSON.parse(a);
  }
  async getCredentials(a) {
    a = await this.xhrGet("user/credential/" + a);
    return JSON.parse(a);
  }
  async getProfile(a) {
    return await this.xhrGet("user/profile/" + a);
  }
  async getUserProfile(a) {
    a = await this.xhrGet("user/profile/" + a + "/view");
    return JSON.parse(a);
  }
  async getUserProfileByName(a) {
    a = await this.xhrGet("user/profile/" + a + "/view-name");
    return JSON.parse(a);
  }
  async getUserSearch(a) {
    a = await this.xhrGet("user/search/" + a);
    return JSON.parse(a);
  }
  async getUserWeaponStats(a) {
    return await this.xhrGet("user/" + a + "/weapon-stats");
  }
  async getChallenge() {
    return await this.xhrGet("user/challenge");
  }
  async getCustomization(a) {
    return await this.xhrGet("user/customization/" + a);
  }
  async getFriends(a) {
    return await this.xhrGet("user/friends/" + a);
  }
  async getMessages(a) {
    return await this.xhrGet("user/messages/" + a);
  }
  async getCurrency(a) {
    a = await this.xhrGet("user/currency/" + a);
    return JSON.parse(a);
  }
  async getSettings(a) {
    a = await this.xhrGet("user/settings/" + a);
    return JSON.parse(a);
  }
  async getInvitations(a) {
    return await this.xhrGet("user/invitations/" + a);
  }
  async getInvitees(a) {
    return await this.xhrGet("user/invitees/" + a);
  }
  async getRewardsAvailable(a) {
    a = await this.xhrGet("user/rewards-available/" + a);
    return JSON.parse(a);
  }
  async getRewards(a) {
    a = await this.xhrGet("user/rewards/" + a);
    return JSON.parse(a);
  }
  async getLastResult(a, b) {
    a = await this.xhrGet("user/last-result/" + a);
    return JSON.parse(a);
  }
  async getMatchHistory(a) {
    a = await this.xhrGet("user/" + a + "/match-history");
    return JSON.parse(a);
  }
  async postClaimShopReward(a) {
    a = await this.xhrPost("user/reward-shop", { id: a });
    return JSON.parse(a);
  }
  async postClaimRewards(a) {
    a = await this.xhrPost("user/reward-claim", { id: a });
    return JSON.parse(a);
  }
  async postLogin(a, b) {
    a = await this.xhrPost("user/login", { name: a, password: b });
    return JSON.parse(a);
  }
  async postAutoRegister() {
    const a = await this.xhrPost("user/auto-register", {});
    return JSON.parse(a);
  }
  async postRegister(a, b, c) {
    a = await this.xhrPost("user/register", { name: a, email: b, password: c });
    return JSON.parse(a);
  }
  async postSettings(a, b) {
    a = await this.xhrPost("user/settings", { settings: a, id: b });
    return JSON.parse(a);
  }
  async postRecovery(a, b, c) {
    a = await this.xhrPost("user/recover", { email: a, type: b, challenge: c });
    return JSON.parse(a);
  }
  async postRenewPassword(a, b, c) {
    a = await this.xhrPost("user/renewpassword", { newPassword: a, oldPassword: b, id: c });
    return JSON.parse(a);
  }
  async postDeactivateAccount(a, b) {
    a = await this.xhrPost("user/deactivate", { password: a, id: b });
    return JSON.parse(a);
  }
  async postCustomization(a, b) {
    a = await this.xhrPost("user/customization", { customization: a, id: b });
    return JSON.parse(a);
  }
  async postAutogenRename(a, b, c) {
    a = await this.xhrPost("user/autogen-rename", { name: a, password: b, id: c });
    return JSON.parse(a);
  }
  async postFriendInvite(a, b) {
    a = await this.xhrPost("user/invite", { name: a, id: b });
    return JSON.parse(a);
  }
  async postAcceptFriend(a, b) {
    a = await this.xhrPost("user/accept", { friendId: a, id: b });
    return JSON.parse(a);
  }
  async postDeclineFriend(a, b) {
    a = await this.xhrPost("user/decline", { friendId: a, id: b });
    return JSON.parse(a);
  }
  async postUnfriend(a, b) {
    a = await this.xhrPost("user/unfriend", { friendId: a, id: b });
    return JSON.parse(a);
  }
  async postFriendMessage(a, b, c) {
    a = await this.xhrPost("user/message", { friendId: a, message: b, id: c });
    return JSON.parse(a);
  }
  async postPurchase(a, b, c) {
    a = await this.xhrPost("user/purchase", { productType: a, productId: b, id: c });
    return JSON.parse(a);
  }
  async postUsername(a, b, c) {
    a = await this.xhrPost("user/rename", { name: a, password: b, id: c });
    return JSON.parse(a);
  }
  async postFriendGold(a, b, c) {
    a = await this.xhrPost("user/gold", { friendId: a, amount: b, id: c });
    return JSON.parse(a);
  }
  async postCreateGame(a, b, c, d, e, f, g, h) {
    a = await this.xhrPost("user/game/create", {
      gameId: a,
      type: b,
      mode: c,
      duration: d,
      name: e,
      password: f,
      customization: g,
      id: h,
    });
    return JSON.parse(a);
  }
  async postSocial(a, b, c) {
    a = await this.xhrPost("user/social", { type: a, url: b, id: c });
    return JSON.parse(a);
  }
}
var serverservice = {};
class ServerService extends ServiceBase {
  constructor() {
    super();
  }
  async getNews() {
    const a = await this.xhrGet("news");
    return JSON.parse(a);
  }
  async getServers() {
    const a = await this.xhrGet("server");
    return JSON.parse(a);
  }
  async getGames() {
    const a = await this.xhrGet("game");
    return JSON.parse(a);
  }
  async getMaps() {
    const a = await this.xhrGet("map");
    return JSON.parse(a);
  }
  async getItemDrops() {
    const a = await this.xhrGet("item-drop");
    return JSON.parse(a);
  }
}
var clanservice = {};
class ClanService extends ServiceBase {
  constructor() {
    super();
  }
  async getClanByClanId(a) {
    a = await this.xhrGet("clan/" + a + "/clan-id");
    return JSON.parse(a);
  }
  async getClanByAccountId(a) {
    a = await this.xhrGet("clan/" + a + "/account-id");
    return JSON.parse(a);
  }
  async getClanList() {
    const a = await this.xhrGet("clan/list");
    return JSON.parse(a);
  }
  async getClanSearch(a) {
    a = await this.xhrGet("clan/search/" + a);
    return JSON.parse(a);
  }
  async getClanMembers(a) {
    a = await this.xhrGet("clan/" + a + "/members");
    return JSON.parse(a);
  }
  async getClanInvitations(a) {
    a = await this.xhrGet("clan/invitations/" + a);
    return JSON.parse(a);
  }
  async postCreate(a, b) {
    a = await this.xhrPost("clan", { name: a, id: b });
    return JSON.parse(a);
  }
  async postLeaveMember(a) {
    a = await this.xhrPost("clan/leave", { id: a });
    return JSON.parse(a);
  }
  async postInviteMember(a, b) {
    a = await this.xhrPost("clan/invite", { targetId: a, id: b });
    return JSON.parse(a);
  }
  async postAcceptMember(a, b) {
    a = await this.xhrPost("clan/accept", { clanId: a, id: b });
    return JSON.parse(a);
  }
  async postDeclineMember(a, b) {
    a = await this.xhrPost("clan/decline", { clanId: a, id: b });
    return JSON.parse(a);
  }
  async postRemoveMember(a, b) {
    a = await this.xhrPost("clan/remove", { targetId: a, id: b });
    return JSON.parse(a);
  }
  async postPromoteMember(a, b) {
    a = await this.xhrPost("clan/promote", { targetId: a, id: b });
    return JSON.parse(a);
  }
  async postDemoteMember(a, b) {
    a = await this.xhrPost("clan/demote", { targetId: a, id: b });
    return JSON.parse(a);
  }
  async postBanner(a, b) {
    a = await this.xhrPost("clan/banner", { data: a, id: b });
    return JSON.parse(a);
  }
}
var apiclient = {};
export class APIClient {
  static async getNews() {
    return await new ServerService().getNews();
  }
  static async getServers() {
    return await new ServerService().getServers();
  }
  static async getGames() {
    return await new ServerService().getGames();
  }
  static async getMaps() {
    return await new ServerService().getMaps();
  }
  static async getItemDrops() {
    return await new ServerService().getItemDrops();
  }
  static async getRanking() {
    return await new UserService().getRanking();
  }
  static async getRankingType(a, b) {
    return await new UserService().getRankingType(a, b);
  }
  static async getWeaponRanking() {
    return await new UserService().getWeaponRanking();
  }
  static async getWeaponRankingType(a) {
    return await new UserService().getWeaponRankingType(a);
  }
  static async getGuestCredentials(a) {
    return await new UserService().getGuestCredentials(a);
  }
  static async getCredentials(a) {
    return await new UserService().getCredentials(a);
  }
  static async getProfile(a) {
    return await new UserService().getProfile(a);
  }
  static async getUserProfile(a) {
    return await new UserService().getUserProfile(a);
  }
  static async getUserProfileByName(a) {
    return await new UserService().getUserProfileByName(a);
  }
  static async getUserSearch(a) {
    return await new UserService().getUserSearch(a);
  }
  static async getUserWeaponStats(a) {
    return await new UserService().getUserWeaponStats(a);
  }
  static async getChallenge() {
    return await new UserService().getChallenge();
  }
  static async getFriends(a) {
    return await new UserService().getFriends(a);
  }
  static async getMessages(a) {
    return await new UserService().getMessages(a);
  }
  static async getCurrency(a) {
    return await new UserService().getCurrency(a);
  }
  static async getSettings(a) {
    return await new UserService().getSettings(a);
  }
  static async getInvitations(a) {
    return await new UserService().getInvitations(a);
  }
  static async getInvitees(a) {
    return await new UserService().getInvitees(a);
  }
  static async getRewardsAvailable(a) {
    return await new UserService().getRewardsAvailable(a);
  }
  static async getRewards(a) {
    return await new UserService().getRewards(a);
  }
  static async getLastResult(a, b) {
    return await new UserService().getLastResult(a, b);
  }
  static async getMatchHistory(a) {
    return await new UserService().getMatchHistory(a);
  }
  static async postClaimShopReward(a) {
    return await new UserService().postClaimShopReward(a);
  }
  static async postClaimRewards(a) {
    return await new UserService().postClaimRewards(a);
  }
  static async postLogin(a, b) {
    return await new UserService().postLogin(a, b);
  }
  static async postAutoRegistration() {
    return await new UserService().postAutoRegister();
  }
  static async postRegistration(a, b, c) {
    return await new UserService().postRegister(a, b, c);
  }
  static async postSettings(a, b) {
    return await new UserService().postSettings(a, b);
  }
  static async postRecovery(a, b, c) {
    return await new UserService().postRecovery(a, b, c);
  }
  static async postCustomization(a, b) {
    return await new UserService().postCustomization(a, b);
  }
  static async postAutogenRename(a, b, c) {
    return await new UserService().postAutogenRename(a, b, c);
  }
  static async renewPassword(a, b, c) {
    return await new UserService().postRenewPassword(a, b, c);
  }
  static async deactivateAccount(a, b) {
    return await new UserService().postDeactivateAccount(a, b);
  }
  static async getCustomization(a) {
    return await new UserService().getCustomization(a);
  }
  static async postInviteFriend(a, b) {
    return await new UserService().postFriendInvite(a, b);
  }
  static async postAcceptFriend(a, b) {
    return await new UserService().postAcceptFriend(a, b);
  }
  static async postDeclineFriend(a, b) {
    return await new UserService().postDeclineFriend(a, b);
  }
  static async postUnfriend(a, b) {
    return await new UserService().postUnfriend(a, b);
  }
  static async postFriendMessage(a, b, c) {
    return await new UserService().postFriendMessage(a, b, c);
  }
  static async postPurchase(a, b, c) {
    return await new UserService().postPurchase(a, b, c);
  }
  static async postUsername(a, b, c) {
    return await new UserService().postUsername(a, b, c);
  }
  static async postFriendGold(a, b, c) {
    return await new UserService().postFriendGold(a, b, c);
  }
  static async postCreateGame(a, b, c, d, e, f, g, h) {
    return await new UserService().postCreateGame(a, b, c, d, e, f, g, h);
  }
  static async postSocial(a, b, c) {
    return await new UserService().postSocial(a, b, c);
  }
  static async getClanByClanId(a) {
    return await new ClanService().getClanByClanId(a);
  }
  static async getClanByAccountId(a) {
    return await new ClanService().getClanByAccountId(a);
  }
  static async getClanList() {
    return await new ClanService().getList();
  }
  static async getClanSearch(a) {
    return await new ClanService().getClanSearch(a);
  }
  static async getClanMembers(a) {
    return await new ClanService().getClanMembers(a);
  }
  static async getClanInvitations(a) {
    return await new ClanService().getClanInvitations(a);
  }
  static async postCreateClan(a, b) {
    return await new ClanService().postCreate(a, b);
  }
  static async postLeaveMember(a) {
    return await new ClanService().postLeaveMember(a);
  }
  static async postInviteMember(a, b) {
    return await new ClanService().postInviteMember(a, b);
  }
  static async postAcceptInviteMember(a, b) {
    return await new ClanService().postAcceptMember(a, b);
  }
  static async postDeclineInviteMember(a, b) {
    return await new ClanService().postDeclineMember(a, b);
  }
  static async postRemoveMember(a, b) {
    return await new ClanService().postRemoveMember(a, b);
  }
  static async postPromoteMember(a, b) {
    return await new ClanService().postPromoteMember(a, b);
  }
  static async postDemoteMember(a, b) {
    return await new ClanService().postDemoteMember(a, b);
  }
  static async postBanner(a, b) {
    return await new ClanService().postBanner(a, b);
  }
}
APIClient.ChallengeURL = ServiceBase.API_URL + "user/challenge";
var eventdispatcher = {};
export function EventDispatcher() {
  this._listeners = {};
  this.addListener = function (a, b) {
    void 0 === this._listeners[a] ? (this._listeners[a] = [b]) : this._listeners[a].push(b);
  };
  this.removeListener = function (a, b) {
    if (void 0 !== this._listeners[a])
      for (let c = 0, d = this._listeners[a].length; c < d; c++)
        if (
          this._listeners[a][c] === b &&
          (this._listeners[a].splice(c, 1), 0 === this._listeners[a].length)
        ) {
          delete this._listeners[a];
          break;
        }
  };
  this.dispatchEvent = function (a) {
    let b = this._listeners[a.type];
    if (void 0 !== b)
      if (1 === b.length) b[0](a);
      else for (let c = 0, d = b.length; c < d; c++) b[c](a);
  };
  this.hasListener = function (a, b) {
    if (void 0 !== this._listeners[a]) {
      if (void 0 === b) return !0;
      a = this._listeners[a];
      for (let c = 0, d = a.length; c < d; c++) if (a[c] === b) return !0;
    }
    return !1;
  };
  return this;
}
var client = {};
export class Client extends EventDispatcher {
  constructor() {
    super();
    this.pinger = this.socket = null;
    this.time = 0;
    this.serverSwitch = !1;
    this.onCloseForImmediateReconnect = null;
    this.server = Client.DefaultServer;
    this.connectionTimeout = null;
    this.allowNextAttempt = !0;
  }
  setServer(a) {
    this.server = a;
  }
  connect() {
    if (this.allowNextAttempt) {
      this.allowNextAttempt = !1;
      null !== this.connectionTimeout &&
        (clearTimeout(this.connectionTimeout), (this.connectionTimeout = null));
      this.connectionTimeout = setTimeout(() => {
        this.allowNextAttempt = !0;
      }, 1e3);
      var a = LZString.compressToEncodedURIComponent(JSON.stringify(App.Credential));
      a =
        ("1" === this.server.secure ? "wss" : "ws") +
        "://" +
        this.server.domain +
        ":" +
        this.server.port +
        "/ws?auth=" +
        a;
      this.socket &&
        this.socket.readyState !== WebSocket.CLOSED &&
        this.socket.readyState !== WebSocket.CLOSING &&
        this.socket.readyState !== WebSocket.CONNECTING &&
        this.disconnect();
      this.socket = new WebSocket(a, ["ninja.io"]);
      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onmessage = this.onMessage.bind(this);
      this.socket.onclose = this.onClose.bind(this);
      this.socket.onerror = this.onError.bind(this);
      this.socket.binaryType = "arraybuffer";
    }
  }
  disconnect(a = !1) {
    this.serverSwitch = a;
    this.socket.close();
    clearInterval(this.pinger);
    this.pinger = null;
    this.dispatchEvent({ type: Client.DISCONNECT });
  }
  onOpen(a) {
    this.addListener(Protocol.ECHO_RESP, this.onEchoResponse.bind(this));
    this.dispatchEvent({ type: Client.CONNECT });
    null !== this.pinger && (clearInterval(this.pinger), (this.pinger = null));
    this.pinger = setInterval(() => {
      this.time = DateUTC();
      this.emit({ type: Protocol.ECHO });
    }, 8e3);
  }
  onError(a) {
    this.dispatchEvent({ type: Client.CONNECTION_ERROR });
    console.log("Game server connection error", a);
  }
  onMessage(a) {
    a = Client.decompress(a.data);
    this.dispatchEvent(a);
  }
  onClose(a) {
    switch (a.code) {
      case Client.CODE_AUTH_FAILED:
        App.Console.log("Invalid credentials.", 16711680);
        this.dispatchEvent({ type: Client.AUTH_FAILED });
        break;
      case Client.CODE_MAX_CLIENTS:
        App.Console.log("This region is full.", 16711680);
        App.Console.log("Retry later or select a different region.", 16763904);
        this.dispatchEvent({ type: Client.SERVER_FULL });
        return;
      case Client.CODE_DUPLICATE_CLIENT:
        App.Console.log("This account is already connected.", 16711680);
    }
    if (this.serverSwitch) {
      if (((this.serverSwitch = !1), this.onCloseForImmediateReconnect))
        this.onCloseForImmediateReconnect();
    } else this.dispatchEvent({ type: Protocol.DISCONNECT });
  }
  emit(a) {
    this.socket.readyState === WebSocket.OPEN && ((a = Client.compress(a)), this.socket.send(a));
  }
  isConnected() {
    return null !== this.socket && this.socket.readyState === WebSocket.OPEN;
  }
  onEchoResponse() {
    let a = Date.now() - this.time;
    App.Stats.setPing(a);
  }
}
Client.compress = function (a) {
  let b = JSON.stringify(a),
    c = Client.SendBuffer.subarray(0, b.length + 1);
  c[0] = a.t ? 1 : 0;
  for (let d = 1, e = b.length; d < e + 1; d++) c[d] = b.charCodeAt(d - 1);
  return c;
};
Client.decompress = function (a) {
  a = new Uint8Array(a);
  let b;
  if (128 === a[0]) {
    b = Protocol.GAME_BIN;
    var c = Client.unpackGameData(a);
  } else {
    let d;
    switch (a[0]) {
      case 0:
        c = a.length - 1;
        for (d = Array(c); 0 < c--; ) d[c] = String.fromCharCode(a[c + 1]);
        c = JSON.parse(d.join(""));
        b = c.type;
        c = c.data;
        break;
      case 1:
        b = Protocol.GAME;
        c = a.length - 1;
        for (d = Array(c); 0 < c--; ) d[c] = String.fromCharCode(a[c + 1]);
        c = JSON.parse(d.join(""));
    }
  }
  return { data: c, type: b };
};
Client.unpackGameData = function (a) {
  return {
    t: Protocol.Game.UPDATE,
    d: JSON.parse(LZString.decompressFromUint8Array_Fast(a.subarray(1))),
  };
};
Client.SendBuffer = new Uint8Array(2048);
Client.CONNECT = "connect";
Client.DISCONNECT = "disconnect";
Client.AUTH_FAILED = "auth_failed";
Client.SERVER_FULL = "server_full";
Client.CONNECTION_ERROR = "connection_error";
Client.CODE_AUTH_FAILED = 1;
Client.CODE_MAX_CLIENTS = 2;
Client.CODE_DUPLICATE_CLIENT = 3;
Client.DefaultServer = {
  id: "6",
  uid: "EKWnN6sr",
  name: "NA 1",
  domain: "ca1.ninja.io",
  title: "North America 1",
  address: "167.114.144.181",
  port: "58391",
  secure: "1",
  region: "na_east",
  status: "online",
  players: "0",
  games: "0",
  modes: { deathmatch: "0", teamDeathmatch: "0", captureTheFlag: "0", dodgeball: "0" },
};
class Menu extends PIXI.Container {
  constructor() {
    super();
    this.container = new PIXI.Container();
    this.active = !0;
    this.updating = this.guestMode = !1;
    this.backgroundImage = new PIXI.Graphics();
    this.backgroundImage.y = 40;
    this.backgroundImage.lineStyle(1, 16777215, 0.1, 0);
    this.backgroundImage.beginFill(3355443, 0.9);
    this.backgroundImage.drawRect(0, 0, 660, 524, 10);
    this.backgroundImage.endFill();
    this.backgroundImage.interactive = !0;
    this.container.addChild(this.backgroundImage);
    this.backgroundGraphics = new PIXI.Graphics();
    this.backgroundGraphics.lineStyle(1, 16777215, 0.1, 0);
    this.backgroundGraphics.beginFill(0, 0.3);
    this.backgroundGraphics.drawRect(-8, 0, 408, 292, 10);
    this.backgroundGraphics.endFill();
    this.backgroundGraphics.beginFill(0, 0.05);
    this.backgroundGraphics.lineStyle(3, 16777215, 0.05, 0);
    this.backgroundGraphics.drawRect(-8, 0, 408, 74, 10);
    this.backgroundGraphics.endFill();
    this.backgroundGraphics.beginFill(16777215, 0.02);
    this.backgroundGraphics.lineStyle(1, 16777215, 0.05, 0);
    this.backgroundGraphics.drawRect(-7, 82, 406, 40, 10);
    this.backgroundGraphics.endFill();
    this.backgroundGraphics.beginFill(16777215, 0.02);
    this.backgroundGraphics.lineStyle(1, 16777215, 0.05, 0);
    this.backgroundGraphics.drawRect(-7, 122, 406, 40, 10);
    this.backgroundGraphics.endFill();
    this.container.addChild(this.backgroundGraphics);
    this.backgroundGraphics.y = 48;
    this.settingsBackgroundGraphics = new PIXI.Graphics();
    this.settingsBackgroundGraphics.lineStyle(1, 16777215, 0.1, 0);
    this.settingsBackgroundGraphics.beginFill(0, 0.3);
    this.settingsBackgroundGraphics.drawRect(0, 0, 220, 290, 10);
    this.settingsBackgroundGraphics.endFill();
    this.container.addChild(this.settingsBackgroundGraphics);
    this.settingsBackgroundGraphics.y = 48;
    this.settingsPanel = new SettingsPanel(660, 524);
    this.settingsPanel.y = 40;
    this.backgroundNewsGraphics = new PIXI.Graphics();
    this.backgroundNewsGraphics.lineStyle(1, 16777215, 0.1, 0);
    this.backgroundNewsGraphics.beginFill(0, 0.3);
    this.backgroundNewsGraphics.drawRect(-8, 0, 640, 204, 10);
    this.backgroundNewsGraphics.endFill();
    this.container.addChild(this.backgroundNewsGraphics);
    this.backgroundNewsGraphics.x = 0.5 * App.ReferenceWidth - 290;
    this.backgroundNewsGraphics.y = 350;
    this.snowman = new PIXI.Sprite(App.CombinedTextures.ship);
    this.snowman.y = 375;
    this.snowman.interactive = !0;
    this.container.addChild(this.snowman);
    this.snowman.tint = 11184810;
    this.snowman.scale.x = this.snowman.scale.y = 0.7;
    this.poseImage = new PIXI.Sprite(App.CombinedTextures.pose);
    this.poseImage.y = 350;
    this.poseImage.anchor.x = 0.5;
    this.poseImage.scale.x = this.poseImage.scale.y = 0.775;
    this.poseImage.alpha = 0.7;
    this.container.addChild(this.poseImage);
    this.darkNewsBackground = new PIXI.Graphics();
    this.darkNewsBackground.x = 100;
    this.darkNewsBackground.y = 340;
    this.darkNewsBackground.beginFill(0, 0.2);
    this.darkNewsBackground.lineStyle(1, 16777215, 0.05, 0);
    this.darkNewsBackground.drawRect(20, 20, 400, 100);
    this.darkNewsBackground.endFill();
    this.container.addChild(this.darkNewsBackground);
    this.infoText = new PIXI.Text("Version 0.3.2 dev - 26/12/22", {
      fontSize: 14,
      fontFamily: "Arial",
      fill: 16777215,
      lineJoin: "round",
      strokeThickness: 1,
      align: "left",
    });
    this.infoText.tint = 16763904;
    this.infoText.resolution = 2;
    this.infoText.x = this.darkNewsBackground.x + 26;
    this.infoText.y = this.darkNewsBackground.y + 24;
    this.infoText.interactive = !0;
    this.container.addChild(this.infoText);
    this.infoTextDisc = new PIXI.Text("- 1 vs 1 matchmaking\nThis is a development version.", {
      fontSize: 12,
      fontFamily: "Arial",
      fill: 16777215,
      lineJoin: "round",
      strokeThickness: 1,
      align: "left",
    });
    this.infoTextDisc.tint = 11184810;
    this.infoTextDisc.resolution = 2;
    this.infoTextDisc.x = this.darkNewsBackground.x + 30;
    this.infoTextDisc.y = this.darkNewsBackground.y + 50;
    this.infoTextDisc.interactive = !0;
    this.container.addChild(this.infoTextDisc);
    this.newsIcon = new PIXI.Sprite(App.CombinedTextures.menu_icon_news);
    this.newsIcon.y = 520;
    this.newsIcon.interactive = !0;
    this.container.addChild(this.newsIcon);
    this.newsIcon.tint = 13421772;
    this.newsIcon.scale.x = this.newsIcon.scale.y = 0.5;
    this.newsText = new PIXI.Text("News", {
      fontSize: 16,
      fontFamily: "Arial",
      fill: 16763904,
      lineJoin: "round",
      strokeThickness: 4,
      align: "left",
      fontStyle: "italic",
      fontWeight: "bold",
      padding: 2,
    });
    this.newsText.tint = 13421772;
    this.newsText.resolution = 2;
    this.newsText.y = this.newsIcon.y + 3;
    this.newsText.interactive = !0;
    this.container.addChild(this.newsText);
    this.wikiIcon = new PIXI.Sprite(App.CombinedTextures.fandom);
    this.wikiIcon.y = 520;
    this.wikiIcon.interactive = !0;
    this.wikiIcon.tint = 13421772;
    this.wikiIcon.scale.x = this.wikiIcon.scale.y = 0.4;
    this.wikiText = new PIXI.Text("Wiki", {
      fontSize: 16,
      fontFamily: "Arial",
      fill: 16763904,
      lineJoin: "round",
      strokeThickness: 3,
      align: "left",
      fontStyle: "italic",
      fontWeight: "bold",
      padding: 2,
    });
    this.wikiText.tint = 13421772;
    this.wikiText.resolution = 2;
    this.wikiText.y = this.wikiIcon.y + 4;
    this.wikiText.interactive = !0;
    App.WhiteLabel !== App.WhiteLabel_POKI &&
      (this.container.addChild(this.wikiIcon),
      this.container.addChild(this.wikiText),
      this.wikiIcon.on("mousedown", () => window.open("https://ninjaio.fandom.com/", "_blank")),
      this.wikiText.on("mousedown", () => window.open("https://ninjaio.fandom.com/", "_blank")),
      this.wikiText.on("mouseover", () => (this.wikiIcon.tint = this.wikiText.tint = 16777215)),
      this.wikiText.on("mouseout", () => (this.wikiIcon.tint = this.wikiText.tint = 13421772)),
      this.wikiIcon.on("mouseover", () => (this.wikiIcon.tint = this.wikiText.tint = 16777215)),
      this.wikiIcon.on("mouseout", () => (this.wikiIcon.tint = this.wikiText.tint = 13421772)));
    this.versionText = new PIXI.Text("v" + App.ClientVersion + App.MinVersion, {
      fontSize: 12,
      fontFamily: "Arial",
      fill: 8947848,
      lineJoin: "round",
      strokeThickness: 2,
      align: "left",
    });
    this.versionText.y = 514;
    this.versionText.anchor.x = 1;
    this.versionText.resolution = 2;
    this.container.addChild(this.versionText);
    this.newsDescription = new PIXI.Text("", {
      fontSize: 14,
      fontFamily: "Arial",
      fill: 11184810,
      lineJoin: "round",
      strokeThickness: 2,
      align: "left",
    });
    this.newsDescription.y = 493;
    this.newsDescription.resolution = 2;
    this.newsDescription.interactive = !0;
    this.newsIcon.on("mousedown", () => this.emit(Menu.NEWS_ACCESS));
    this.newsText.on("mousedown", () => this.emit(Menu.NEWS_ACCESS));
    this.newsText.on("mouseover", () => (this.newsIcon.tint = this.newsText.tint = 16777215));
    this.newsText.on("mouseout", () => (this.newsIcon.tint = this.newsText.tint = 11184810));
    this.newsIcon.on("mouseover", () => (this.newsIcon.tint = this.newsText.tint = 16777215));
    this.newsIcon.on("mouseout", () => (this.newsIcon.tint = this.newsText.tint = 11184810));
    this.newsDescription.tint = 11184810;
    this.newsDescription.on(
      "mouseover",
      () => (this.newsIcon.tint = this.newsDescription.tint = 16777215)
    );
    this.newsDescription.on(
      "mouseout",
      () => (this.newsIcon.tint = this.newsDescription.tint = 11184810)
    );
    this.newsDescription.on("mousedown", () => this.emit(Menu.NEWS_ACCESS));
    this.icon = new PIXI.Sprite(App.CombinedTextures.gamelogo);
    this.icon.y = 46;
    this.icon.scale.x = this.icon.scale.y = 0.5;
    this.container.addChild(this.icon);
    this.contactInfo = new PIXI.Text("Contact: dev@ninja.io", {
      fontSize: 13,
      fontFamily: "Arial",
      fill: 13421772,
      lineJoin: "round",
      strokeThickness: 3,
      align: "left",
    });
    this.contactInfo.resolution = 2;
    this.contactInfo.anchor.x = 1;
    this.contactInfo.y = 531;
    this.contactInfo.interactive = !0;
    App.WhiteLabel !== App.WhiteLabel_POKI &&
      (this.contactInfo.on("mousedown", () => (location.href = "mailto:dev@ninja.io")),
      this.contactInfo.on("touchstart", () => (location.href = "mailto:dev@ninja.io")),
      this.contactInfo.on(
        "mouseover",
        () => (this.contactInfo.scale.x = this.contactInfo.scale.y = 1.1)
      ),
      this.contactInfo.on(
        "mouseout",
        () => (this.contactInfo.scale.x = this.contactInfo.scale.y = 1)
      ));
    this.contactInfo.alpha = 0.8;
    this.container.addChild(this.contactInfo);
    this.gameStatsTitle = new PIXI.Text("Status", {
      fontSize: 15,
      fontFamily: "Arial",
      fill: 16763904,
      lineJoin: "round",
      strokeThickness: 2,
      align: "right",
      fontStyle: "italic",
    });
    this.gameStatsTitle.resolution = 2;
    this.gameStatsTitle.y = 60;
    this.gameStatsTitle.anchor.x = 1;
    this.container.addChild(this.gameStatsTitle);
    this.gameStats = new PIXI.Text("", {
      fontSize: 13,
      fontFamily: "Arial",
      fill: 13421772,
      lineJoin: "round",
      strokeThickness: 2,
      align: "right",
      padding: 2,
      fontStyle: "italic",
    });
    this.gameStats.resolution = 2;
    this.gameStats.y = 78;
    this.gameStats.anchor.x = 1;
    this.container.addChild(this.gameStats);
    this.newsFlash = new PIXI.Text("Initializing...", {
      fontSize: 14,
      fontFamily: "Arial",
      fill: 16777215,
      lineJoin: "round",
      strokeThickness: 3,
      align: "left",
      padding: 2,
    });
    this.newsFlash.y = 12;
    this.newsFlash.resolution = 2;
    this.newsFlash.anchor.x = 0.5;
    this.container.addChild(this.newsFlash);
    this.registerHintTitle = new PIXI.Text("Register to customize", {
      fontName: "Arial",
      fontSize: 17,
      lineHeight: 16,
      fill: 16755200,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.registerHintTitle.y = 230;
    this.registerHintTitle.resolution = 2;
    this.registerHintTitle.visible = !1;
    this.visualizer = new Visualizer(200, 200, !0, !0, !1);
    this.visualizer.y = 56;
    this.visualizer.interactive = !0;
    this.visualizer.on("mousedown", () => {
      this.guestMode ||
        (this.emit(Menu.CUSTOMIZATION_ACCESS), AudioEffects.ButtonClick.audio.play());
    });
    this.visualizer.on("touchstart", () => {
      this.guestMode ||
        (this.emit(Menu.CUSTOMIZATION_ACCESS), AudioEffects.ButtonClick.audio.play());
    });
    this.visualizer.on("mouseover", () => {
      this.registerHintTitle.visible = !0;
      AudioEffects.ButtonHover.audio.play();
    });
    this.visualizer.on("mouseout", () => (this.registerHintTitle.visible = !1));
    this.container.addChild(this.visualizer);
    this.modeTitle = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 22,
      align: "left",
    });
    this.modeTitle.y = 106;
    this.modeTitle.tint = 16755200;
    this.container.addChild(this.modeTitle);
    this.modeTitle.visible = !1;
    this.rewardButton = new PIXI.Sprite(App.CombinedTextures.claim_reward);
    this.rewardButton.y = 210;
    this.rewardButton.interactive = !0;
    this.rewardButton.hitArea = new PIXI.Rectangle(
      -5,
      -5,
      this.rewardButton.width + 10,
      this.rewardButton.height + 13
    );
    this.rewardButton.scale.x = this.rewardButton.scale.y = 0.67;
    this.container.addChild(this.rewardButton);
    this.treasureIcon = new PIXI.Sprite(App.CombinedTextures.treasure);
    this.treasureIcon.y = 200;
    this.treasureIcon.interactive = !1;
    this.container.addChild(this.treasureIcon);
    this.rewardButton.on("mouseover", () => {
      this.rewardButton.scale.x = this.rewardButton.scale.y = 0.69;
      this.treasureIcon.scale.x = this.treasureIcon.scale.y = 1.04;
    });
    this.rewardButton.on("mouseout", () => {
      this.rewardButton.scale.x = this.rewardButton.scale.y = 0.67;
      this.treasureIcon.scale.x = this.treasureIcon.scale.y = 1;
    });
    this.rewardButton.on("mousedown", () => {
      this.emit(Menu.REWARDS_ACCESS);
    });
    this.rewardButton.on("touchstart", () => {
      this.emit(Menu.REWARDS_ACCESS);
    });
    this.menuShuriken = new PIXI.Sprite(App.CombinedTextures.menu_shuriken);
    this.menuShuriken.y = 275;
    this.menuShuriken.scale.x = this.menuShuriken.scale.y = 0.7;
    this.menuShuriken.anchor.x = this.menuShuriken.anchor.y = 0.5;
    this.container.addChild(this.menuShuriken);
    this.serverListButton = new Button(
      "list",
      App.CombinedTextures.gamelist,
      App.CombinedTextures.gamelist_hover
    );
    this.serverListButton.y = 226;
    this.serverListButton.selected = !0;
    this.serverListButton.setText("");
    this.serverListButton.setTint(16763904);
    this.serverListButton.scale.x = 0.52;
    this.serverListButton.scale.y = 0.52;
    this.serverListButton.addListener(
      Button.BUTTON_RELEASED,
      this.onServerListButtonReleased.bind(this)
    );
    this.container.addChild(this.serverListButton);
    this.serverCreateButton = new Button(
      "create",
      App.CombinedTextures.creategame,
      App.CombinedTextures.creategame_hover
    );
    this.serverCreateButton.y = this.serverListButton.y + this.serverListButton.height + 4;
    this.serverCreateButton.selected = !0;
    this.serverCreateButton.setText("");
    this.serverCreateButton.disable();
    this.serverCreateButton.setTint(16763904);
    this.serverCreateButton.scale.x = this.serverCreateButton.scale.y = 0.52;
    this.serverCreateButton.addListener(
      Button.BUTTON_RELEASED,
      this.onServerCreateButtonReleased.bind(this)
    );
    this.container.addChild(this.serverCreateButton);
    this.regionData = new PIXI.Text("Loading..", FontStyle.MenuData1);
    this.regionData.resolution = 2;
    this.regionData.pivot.x = 0.5 * this.regionData.width;
    this.regionData.y = 142;
    this.container.addChild(this.regionData);
    this.modeData = new PIXI.Text("Loading..", FontStyle.MenuData1);
    this.modeData.resolution = 2;
    this.modeData.pivot.x = 0.5 * this.modeData.width;
    this.modeData.y = 182;
    this.container.addChild(this.modeData);
    this.interactive = !0;
    this.nameTitle = new PIXI.Text("", {
      fontSize: 18,
      fontFamily: "Arial",
      fill: 16763904,
      lineJoin: "round",
      strokeThickness: 3,
      align: "center",
      padding: 2,
    });
    this.nameTitle.anchor.x = 0.5;
    this.nameTitle.resolution = 2;
    this.nameTitle.y = 264;
    this.container.addChild(this.nameTitle);
    this.levelIcon = new PIXI.Sprite();
    this.levelIcon.y = 48;
    this.levelIcon.scale.x = this.levelIcon.scale.y = 0.8;
    this.container.addChild(this.levelIcon);
    this.skillIcon = new PIXI.Sprite();
    this.skillIcon.y = 58;
    this.skillIcon.scale.x = this.skillIcon.scale.y = 0.7;
    this.container.addChild(this.skillIcon);
    this.nameField = new InputField("guest_name", !1, 32, !1);
    this.nameField.setDimensions(210, 35);
    this.nameField.forceLowerCase = !1;
    this.nameField.setMaxChars(18);
    this.nameField.hideBorders();
    this.nameField.y = 294;
    this.nameField.centerInput = !0;
    this.nameField.on(InputField.FOCUS, (a) => this.onNamefieldFocus(a));
    this.nameField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-().[]"
    );
    this.skillText = new PIXI.Text("", {
      fontSize: 16,
      fontFamily: "Arial",
      fill: 13421772,
      lineJoin: "round",
      strokeThickness: 3,
      align: "center",
    });
    this.skillText.resolution = 2;
    this.skillText.y = 290;
    this.skillText.anchor.x = 0.5;
    this.container.addChild(this.skillText);
    this.clanText = new PIXI.Text("", {
      fontSize: 16,
      fontFamily: "Arial",
      fill: 16755200,
      lineJoin: "round",
      strokeThickness: 3,
      align: "center",
    });
    this.clanText.resolution = 2;
    this.clanText.y = 310;
    this.clanText.anchor.x = 0.5;
    this.clanText.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.clanText);
    this.joinButton = new Button(
      "join",
      App.CombinedTextures.playbutton,
      App.CombinedTextures.playbutton_hover,
      1e3
    );
    this.joinButton.y = 216;
    this.joinButton.selected = !0;
    this.joinButton.setText("");
    this.container.addChild(this.joinButton);
    this.joinButton.scale.x = this.joinButton.scale.y = 0.63;
    this.joinButton.addListener(Button.BUTTON_RELEASED, this.onJoinButtonReleased.bind(this));
    this.joinButton.setTint(16763904);
    this.joinButton.onMouseOver();
    this.joinButton.disable();
    this.pvpButton = new Button(
      "ranked",
      App.CombinedTextures.ranked_button,
      App.CombinedTextures.ranked_button_hover,
      1e3
    );
    this.pvpButton.y = this.joinButton.y + this.joinButton.height + 2;
    this.pvpButton.scale.x = this.pvpButton.scale.y = 0.63;
    this.pvpButton.interactive = !0;
    this.pvpButton.addListener(Button.BUTTON_RELEASED, () => this.emit(Menu.PVP_ACCESS));
    this.pvpButton.disable();
    this.container.addChild(this.pvpButton);
    this.modeContainer = new PIXI.Container();
    this.modeContainer.y = 116;
    this.container.addChild(this.modeContainer);
    this.serverContainer = new PIXI.Container();
    this.serverContainer.y = 80;
    this.container.addChild(this.serverContainer);
    this.serverList = new Dropdown("serverSelect", "Region", 200, 256);
    this.modeList = new Dropdown("modeSelect", "Mode", 200, 220, !0);
    this.setMode(Menu.MODE_MAIN);
    this.addChild(this.container);
    this.particleContainer = new ParticleContainer();
    this.container.addChild(this.particleContainer);
    this.resize();
  }
  showSettings() {
    this.container.addChild(this.settingsPanel);
    this.settingsPanel.show();
  }
  hideSettings() {
    this.settingsPanel.parent && this.container.removeChild(this.settingsPanel);
  }
  setServerHeadline(a) {
    this.newsDescription.text !== a.description && (this.newsDescription.text = a.description);
  }
  setServerStatus(a) {
    a.message !== this.newsFlash.text && (this.newsFlash.text = a.message);
    (this.updating = a.updating) && 360 !== parseInt(App.Credential.playerid)
      ? (this.serverCreateButton.disable(), (this.newsFlash.tint = 16711680))
      : ((this.newsFlash.tint = 16777215),
        this.guestMode || (this.serverCreateButton.enable(), this.pvpButton.enable()));
  }
  setServerData(a) {
    null === this.joinButton.clickTimeout && this.joinButton.enable();
    this.serverList.clear();
    let b = 0,
      c = 0,
      d = a.length;
    for (var e = 0; e < d; e++) {
      let f = a[e];
      b += parseInt(f.games);
      c += parseInt(f.players);
      this.serverList.addItem(f.title, f.id, f.players + " players");
      ((null !== App.SelectedServer && f.uid === App.SelectedServer.uid) ||
        null === App.SelectedServer) &&
        this.serverList.setValue(f.id);
    }
    this.gameStats.text = b + " games in progress\n" + c + " players online";
    0 < d && this.setLobbyDataText();
    this.serverList.draw();
  }
  setLobbyDataText() {
    if (null === App.SelectedServer)
      (this.regionData.text = "Loading..."), (this.modeData.text = "Loading...");
    else {
      var a = App.SelectedServer.modes[App.SelectedMode];
      this.regionData.text =
        (void 0 !== App.SelectedServer ? App.SelectedServer.players : "0") + " players";
      this.modeData.text = (void 0 !== a ? a.toString() : "0") + " players";
    }
  }
  selectServer(a) {
    this.serverList.setValue(a);
  }
  onServerListButtonReleased() {
    this.emit(Menu.SERVER_LISTING_ACCESS);
  }
  onServerCreateButtonReleased() {
    this.emit(Menu.SERVER_CREATION_ACCESS);
  }
  setPlayerData(a) {
    var b = App.Autogen && null !== App.Credential.id;
    a.guest
      ? ((this.guestMode = !0),
        (this.levelIcon.visible = !1),
        (this.skillText.visible = !1),
        (this.skillIcon.visible = !1),
        (this.clanText.visible = !1),
        (this.nameTitle.text = "Playing as guest"),
        (this.nameTitle.scale.x = this.nameTitle.scale.y = 1),
        (this.nameTitle.y = 264),
        this.nameField.parent || this.container.addChild(this.nameField),
        this.nameField.setText(a.name),
        this.registerHintTitle.parent || this.container.addChild(this.registerHintTitle),
        this.serverCreateButton.disable(),
        this.pvpButton.disable())
      : ((this.guestMode = !1),
        (this.levelIcon.visible = !0),
        (this.skillIcon.visible = !0),
        b
          ? ((this.clanText.visible = !1),
            (this.skillText.visible = !1),
            (this.nameTitle.text = "Playing as"),
            (this.nameTitle.scale.x = this.nameTitle.scale.y = 1),
            (this.nameTitle.y = 264),
            this.nameField.parent || this.container.addChild(this.nameField),
            this.nameField.setText(a.name))
          : ((this.skillText.visible = !0),
            (this.clanText.visible = !0),
            this.nameField.parent && this.container.removeChild(this.nameField),
            (this.nameTitle.text = a.name),
            (this.nameTitle.scale.x = this.nameTitle.scale.y = 1.3),
            (this.nameTitle.y = 260)),
        this.registerHintTitle.parent && this.container.removeChild(this.registerHintTitle),
        (this.updating && 360 !== parseInt(App.Credential.playerid)) ||
          (this.serverCreateButton.enable(), this.pvpButton.enable()),
        (this.levelIcon.texture =
          App.CombinedTextures[
            "skill_icon_" + Math.max(Math.floor((App.Credential.level / 240) * 15) + 1)
          ]),
        (this.skillIcon.texture =
          App.CombinedTextures["rank_icon_" + (Game.MapSkillToIndex(a.skill) + 1)]),
        (b = Game.MapSkillToTitle(App.Credential.skill)),
        (this.skillText.text = b + ", level " + App.Credential.level),
        (this.clanText.text =
          -1 !== App.Credential.clan_id && null !== App.Credential.clan_id
            ? "Clan " + App.Credential.clan_role + " of " + App.Credential.clan_name
            : "Freelancer"));
    this.visualizer.applyCustomization(a.customization);
  }
  init() {
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_DM],
      Game.MODE_DM,
      "",
      App.CombinedTextures.dm_icon_notxt
    );
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_TDM],
      Game.MODE_TDM,
      "",
      App.CombinedTextures.tdm_icon_notxt
    );
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_CTF],
      Game.MODE_CTF,
      "",
      App.CombinedTextures.ctf_icon_notxt
    );
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_DB],
      Game.MODE_DB,
      "",
      App.CombinedTextures.db_icon_notxt
    );
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_TR],
      Game.MODE_TR,
      "",
      App.CombinedTextures.tr_icon_notxt
    );
    this.modeList.addListener(Button.BUTTON_RELEASED, this.onModeButtonReleased.bind(this));
    this.modeList.draw();
    this.modeList.setValue(App.SelectedMode);
    this.modeContainer.addChild(this.modeList);
    this.modeContainer.x = 0.5 * App.ReferenceWidth - 224;
    this.modeList.x = -90;
    this.modeList.y = 65;
    this.serverContainer.addChild(this.serverList);
    this.serverList.addListener(Button.BUTTON_RELEASED, this.onServerButtonReleased.bind(this));
    this.serverList.draw();
    this.serverList.x = -90;
    this.serverList.y = 60;
    this.serverContainer.x = 0.5 * App.ReferenceWidth - 224;
    this.checkRewards();
  }
  showRewardButton() {
    this.rewardButton.visible = !0;
    this.treasureIcon.visible = !0;
  }
  hideRewardButton() {
    this.rewardButton.visible = !1;
    this.treasureIcon.visible = !1;
  }
  async checkRewards(a = !1) {
    App.HadRewards || this.hideRewardButton();
    "guest" === App.Credential.accounttype
      ? this.hideRewardButton()
      : (!a && 6e4 > Date.now() - App.LastRewardCheck) ||
        ((a = await APIClient.getRewardsAvailable(App.Credential.id)),
        (App.LastRewardCheck = Date.now()),
        (App.HadRewards = !1),
        a &&
          a.available &&
          0 < parseInt(a.available, 10) &&
          (this.showRewardButton(), (App.HadRewards = !0)));
  }
  setMode(a, b) {
    if (void 0 === b || !1 !== b.success)
      (this.mode = a),
        (this.serverList.visible = !0),
        (this.regionData.visible = !0),
        (this.modeData.visible = !0),
        (this.joinButton.visible = !0),
        (this.modeContainer.visible = !0),
        (this.serverContainer.visible = !0),
        (this.modeTitle.visible = !1);
  }
  onJoinButtonReleased() {
    this.emit(Menu.JOIN_GAME_MODE, App.SelectedMode);
  }
  onMainMenuButtonReleased() {
    this.setMode(Menu.MODE_MAIN);
  }
  onModeButtonReleased(a) {
    App.SelectedMode = a.data.value;
    this.setLobbyDataText();
  }
  onServerButtonReleased(a) {
    a = a.data.value;
    let b = { modes: {} };
    for (let c = 0; c < App.Servers.length; c++)
      if (App.Servers[c].id === a) {
        b = App.Servers[c];
        break;
      }
    this.emit(Menu.JOIN_SERVER, b, this.setLobbyDataText.bind(this));
  }
  resize() {
    this.nameTitle.x = 0.5 * App.ReferenceWidth + 208;
    this.nameField.x = 0.5 * App.ReferenceWidth + 100;
    this.skillText.x = 0.5 * App.ReferenceWidth + 208;
    this.clanText.x = 0.5 * App.ReferenceWidth + 208;
    this.levelIcon.x = 0.5 * App.ReferenceWidth + 106;
    this.skillIcon.x = 0.5 * App.ReferenceWidth + 260;
    this.regionData.x = 0.5 * App.ReferenceWidth;
    this.modeData.x = 0.5 * App.ReferenceWidth;
    this.modeContainer.x = 0.5 * App.ReferenceWidth - 224;
    this.serverContainer.x = 0.5 * App.ReferenceWidth - 224;
    this.icon.x = 0.5 * App.ReferenceWidth - 316;
    this.gameStats.x = 0.5 * App.ReferenceWidth + 78;
    this.gameStatsTitle.x = this.gameStats.x;
    this.newsFlash.x = 0.5 * App.ReferenceWidth;
    this.joinButton.x = this.modeContainer.x - 80;
    this.pvpButton.x = this.modeContainer.x - 80;
    this.menuShuriken.x = 0.5 * App.ReferenceWidth - 52;
    this.modeTitle.x = 0.5 * App.ReferenceWidth - 302;
    this.backgroundGraphics.x = 0.5 * App.ReferenceWidth - 312;
    this.backgroundNewsGraphics.x = 0.5 * App.ReferenceWidth - 312;
    this.settingsBackgroundGraphics.x = 0.5 * App.ReferenceWidth + 100;
    this.contactInfo.x = 0.5 * App.ReferenceWidth + 314;
    this.poseImage.x = 0.5 * App.ReferenceWidth;
    this.snowman.x = 0.5 * App.ReferenceWidth - 320;
    this.newsIcon.x = 0.5 * App.ReferenceWidth - 318;
    this.newsText.x = this.newsIcon.x + this.newsIcon.width;
    this.wikiIcon.x = 0.5 * App.ReferenceWidth - 230;
    this.wikiText.x = this.wikiIcon.x + this.wikiIcon.width + 2;
    this.newsDescription.x = 0.5 * App.ReferenceWidth - 250;
    this.versionText.x = 0.5 * App.ReferenceWidth + 313;
    this.serverListButton.x = 0.5 * App.ReferenceWidth - 51;
    this.serverCreateButton.x = this.serverListButton.x;
    this.visualizer.x = 0.5 * App.ReferenceWidth + 110;
    this.rewardButton.x = this.visualizer.x + 24;
    this.treasureIcon.x = this.visualizer.x + 8;
    this.registerHintTitle.x =
      this.visualizer.x + 0.5 * (this.visualizer.width - this.registerHintTitle.width);
    this.backgroundImage.x = 0.5 * App.ReferenceWidth - 0.5 * this.backgroundImage.width;
    this.settingsPanel.x = 0.5 * App.ReferenceWidth - 330;
  }
  hideItems() {
    this.removeChild(this.container);
  }
  showItems() {
    this.addChild(this.container);
  }
  onNamefieldFocus(a) {
    a && App.Autogen && null !== App.Credential.id
      ? (this.nameField.setFocus(!1), this.emit(Menu.RENAME_ACCESS))
      : a ||
        ((a = this.nameField.getText()),
        4 > a.length && this.nameField.setText("Ninja" + Math.floor(1e3 * Math.random())),
        this.nameField.previousText !== a &&
          this.emit(Menu.GUEST_NAME_CHANGE, this.nameField.getText()));
  }
  step() {
    this.visualizer.update();
    if (this.treasureIcon.visible) {
      let a = ParticleEffects.GoldGlitter;
      a.x = this.treasureIcon.x + 0.5 * this.treasureIcon.width;
      a.y = this.treasureIcon.y + 0.5 * this.treasureIcon.height;
      a.vx = -0.5 + 1 * Math.random();
      a.vy = -0.5 + 1 * Math.random();
      a.vr = -0.3 + 0.6 * Math.random();
      a.a = 1;
      this.particleContainer.spawn(a);
    }
    this.particleContainer.update();
  }
}
Menu.JOIN_GAME_MODE = "JoinGameMode";
Menu.JOIN_SERVER = "joinServer";
Menu.MODE_MAIN = "mainMenu";
Menu.GUEST_NAME_CHANGE = "guestNameChange";
Menu.PROFILE_ACCESS = "profileAccess";
Menu.RENAME_ACCESS = "renameAccess";
Menu.CUSTOMIZATION_ACCESS = "customizationAccess";
Menu.SERVER_LISTING_ACCESS = "serverListingAccess";
Menu.SERVER_CREATION_ACCESS = "serverCreationAccess";
Menu.REWARDS_ACCESS = "rewardsAccess";
Menu.NEWS_ACCESS = "newsAccess";
Menu.PVP_ACCESS = "pvpAccess";
function User() {
  this.name = "anonymous";
  this.skill = 0;
  this.premium = this.admin = !1;
  this.team = 0;
  this.customization = { hair: "original", energy: "#ffffff" };
}
var commandconsole = {};
class CommandConsole extends PIXI.Container {
  constructor() {
    super();
    this.settings = Registry.Instance[Registry.Key.SETTINGS].graphics;
    this.maxLines = void 0 !== this.settings.chatLines ? this.settings.chatLines : 20;
    this.alpha = this.targetAlpha =
      void 0 !== this.settings.chatOpacity ? this.settings.chatOpacity : 1;
    this.interactiveChildren = !1;
    this.messages = [];
    this.lines = [];
    this.interpreters = [];
    this.active = !1;
    this.consoleInput = new InputField("consoleInput", !0, 24, !1);
    this.consoleInput.filterEnabled = !1;
    this.consoleInput.setDimensions(0.8 * App.ClientWidth, 26);
    this.consoleInput.setMaxChars(80);
    this.consoleInput.x = 5;
    this.consoleInput.y = 200;
    this.onConsoleInputFocus(!1);
    this.consoleInput.addListener(InputField.SUBMIT, this.onConsoleInput.bind(this));
    this.addChild(this.consoleInput);
    this.fadeInterval = this.fadeTimeout = null;
    this.setActive(!1);
  }
  log(a, b) {
    this.cancelFade();
    a = new PIXI.Text(a, FontStyle.ConsoleText);
    a.tint = void 0 === b ? 15658734 : b;
    a.resolution = 2;
    this.messages.length === this.maxLines &&
      0 < this.maxLines &&
      (this.removeChild(this.messages[0]), this.messages.shift());
    this.messages.push(a);
    this.addChild(a);
    this.update();
    this.consoleInput.visible
      ? (this.consoleInput.y =
          0 < this.messages.length ? this.messages[this.messages.length - 1].y + 20 : 200)
      : this.startFade();
    this.active || ((b = this.messages.length), (this.y = 200 < 20 * b ? 200 - 20 * b : 0));
  }
  cancelFade(a = !0) {
    null !== this.fadeTimeout && (clearTimeout(this.fadeTimeout), (this.fadeTimeout = null));
    null !== this.fadeInterval && (clearInterval(this.fadeInterval), (this.fadeInterval = null));
    a && (this.alpha = this.targetAlpha);
  }
  update() {
    var a = this.messages.length;
    let b = 20 * a - 20,
      c = 0;
    for (--a; 0 <= a; a--) {
      let d = this.messages[a];
      d.x = 5;
      d.y = b - 20 * c;
      c++;
    }
  }
  startFade() {
    this.alpha = this.targetAlpha;
    null !== this.fadeTimeout && clearTimeout(this.fadeTimeout);
    this.fadeTimeout = setTimeout(() => this.startInterval(), 3e3);
  }
  startInterval() {
    clearTimeout(this.fadeTimeout);
    this.fadeTimeout = null;
    this.fadeDelay = 0;
    null !== this.fadeInterval && clearInterval(this.fadeInterval);
    this.fadeInterval = setInterval(() => this.step(), 100);
  }
  step() {
    this.fadeDelay--;
    0.21 < this.alpha && (this.alpha -= 0.1);
    -8 >= this.fadeDelay &&
      (clearInterval(this.fadeInterval),
      (this.fadeInterval = null),
      (this.alpha = 0.2 > this.targetAlpha ? this.targetAlpha : 0.2));
  }
  isActive() {
    return this.active;
  }
  setActive(a) {
    let b = this.messages.length;
    a
      ? ((this.consoleInput.visible = !0),
        this.emit(CommandConsole.SHOW),
        this.onConsoleInputFocus(!0),
        (this.y = 0),
        (this.consoleInput.y =
          0 < this.messages.length ? this.messages[this.messages.length - 1].y + 20 : 200),
        this.cancelFade(!1),
        (this.alpha = 1))
      : ((this.consoleInput.visible = !1),
        this.emit(CommandConsole.HIDE),
        this.onConsoleInputFocus(!1),
        (this.y = 200 < 20 * b ? 200 - 20 * b : 0),
        this.startFade());
    this.active = a;
    this.consoleInput.setFocus(a);
  }
  onConsoleInputFocus(a) {}
  onConsoleInput(a) {
    this.consoleInput.setText("");
    for (var b = 0, c = this.interpreters.length; b < c; b++)
      this.interpreters[b].parse(a.data.value);
    this.onConsoleInputFocus(!1);
    this.setActive(!1);
  }
  addInputString(a) {
    this.consoleInput.setText(this.consoleInput.getText() + a);
  }
  reset() {}
  linkInterpreter(a) {
    this.interpreters.push(a);
  }
  unlinkInterpreter(a) {
    for (var b = 0, c = this.interpreters.length; b < c; b++)
      this.interpreters[b] === a && this.interpreters.splice(b, 1);
  }
}
CommandConsole.FontMessage = { fontName: "Open Sans", fontSize: 25 };
CommandConsole.INPUT = "input";
CommandConsole.SHOW = "show";
CommandConsole.HIDE = "hide;";
export class Feature extends PIXI.Graphics {
  constructor() {
    super();
    this.hides = [];
    this.on("mousedown", (a) => a.stopPropagation());
    this.container = new PIXI.Container();
    this.addChild(this.container);
  }
  show() {}
  hide() {}
  resize(a, b) {
    this.x = 0.5 * a;
    this.y = -8;
  }
  update() {}
}
var gamemenu = {};
export class GameMenu extends Feature {
  constructor() {
    super();
    this.discButtonBackground = new PIXI.Graphics();
    this.discButtonBackground.beginFill(0, 0.35);
    this.discButtonBackground.drawRoundedRect(0, 0, 60, 20, 2);
    this.discButtonBackground.endFill();
    this.discButtonBackground.scale.x = this.discButtonBackground.scale.y = 1.2;
    this.discButtonBackground.x = App.ClientWidth - 89;
    this.discButtonBackground.y = 3;
    this.discButtonBackground.interactive = !0;
    this.discButtonBackground.hitArea = new PIXI.Rectangle(0, 0, 60, 20);
    this.addChild(this.discButtonBackground);
    this.discTitle = new PIXI.Text("Menu", {
      fontName: "Arial",
      fontSize: 18,
      fill: 16777215,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.discTitle.scale.x = this.discTitle.scale.y = 1.2;
    this.discTitle.x =
      this.discButtonBackground.x + 0.5 * (this.discButtonBackground.width - this.discTitle.width);
    this.discTitle.y = this.discButtonBackground.y - 2;
    this.discTitle.hitArea = new PIXI.Rectangle();
    this.discTitle.resolution = 2;
    this.discTitle.alpha = 0.9;
    this.discTitle.tint = 16763904;
    this.addChild(this.discTitle);
    this.discButtonBackground.on("mouseover", () => {
      this.discTitle.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.discButtonBackground.on("mouseout", () => {
      this.discTitle.alpha = 0.9;
    });
    this.discButtonBackground.on("mousedown", () => {
      this.emit(Layer.Events.ESCAPE_MENU_ACCESS);
      AudioEffects.ButtonClick.audio.play();
    });
    this.discButtonBackground.on("touchstart", () => {
      this.emit(Layer.Events.ESCAPE_MENU_ACCESS);
      AudioEffects.ButtonClick.audio.play();
    });
    this.helpButtonBackground = new PIXI.Graphics();
    this.helpButtonBackground.beginFill(0, 0.35);
    this.helpButtonBackground.drawRoundedRect(0, 0, 80, 20, 2);
    this.helpButtonBackground.endFill();
    this.helpButtonBackground.x = App.ClientWidth - 180;
    this.helpButtonBackground.y = 3;
    this.helpButtonBackground.scale.x = this.helpButtonBackground.scale.y = 1.2;
    this.helpButtonBackground.interactive = !0;
    this.helpButtonBackground.hitArea = new PIXI.Rectangle(0, 0, 80, 20);
    this.addChild(this.helpButtonBackground);
    this.helpTitle = new PIXI.Text("Controls", {
      fontName: "Arial",
      fontSize: 18,
      fill: 16777215,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.helpTitle.scale.x = this.helpTitle.scale.y = 1.2;
    this.helpTitle.x =
      this.helpButtonBackground.x + 0.5 * (this.helpButtonBackground.width - this.helpTitle.width);
    this.helpTitle.y = this.helpButtonBackground.y - 2;
    this.helpTitle.hitArea = new PIXI.Rectangle();
    this.helpTitle.resolution = 2;
    this.helpTitle.alpha = 0.7;
    this.helpTitle.tint = 65280;
    this.addChild(this.helpTitle);
    this.helpButtonBackground.on("mouseover", () => {
      this.helpTitle.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.helpButtonBackground.on("mouseout", () => {
      this.helpTitle.alpha = 0.7;
    });
    this.helpButtonBackground.on("mousedown", () => {
      this.emit(Layer.Events.DISPLAY_HELP);
      AudioEffects.ButtonClick.audio.play();
    });
    this.helpButtonBackground.on("touchstart", () => {
      this.emit(Layer.Events.DISPLAY_HELP);
      AudioEffects.ButtonClick.audio.play();
    });
    App.IsMobile &&
      ((this.movementJoystick = new MovementJoystick()),
      this.movementJoystick.on(Layer.Events.JOYSTICK_MOVE_STATE, (a) =>
        this.emit(Layer.Events.JOYSTICK_MOVE_STATE, a)
      ),
      this.addChild(this.movementJoystick),
      (this.targetingJoystick = new TargetingJoystick()),
      this.targetingJoystick.on(Layer.Events.JOYSTICK_TARGET_STATE, (a) =>
        this.emit(Layer.Events.JOYSTICK_TARGET_STATE, a)
      ),
      this.addChild(this.targetingJoystick));
    App.WhiteLabel !== App.WhiteLabel_POKI &&
      ((this.minmax = new PIXI.Sprite(App.CombinedTextures.max_screen)),
      (this.minmax.x = App.ClientWidth - 200),
      (this.minmax.y = 12),
      (this.minmax.anchor.x = this.minmax.anchor.y = 0.5),
      (this.minmax.alpha = 1),
      (this.minmax.scale.x = this.minmax.scale.y = 0.4),
      (this.minmax.interactive = !0),
      this.minmax.on("mousedown", () => {
        let a = window.document,
          b = a.documentElement,
          c =
            b.requestFullscreen ||
            b.mozRequestFullScreen ||
            b.webkitRequestFullScreen ||
            b.msRequestFullscreen,
          d =
            a.exitFullscreen ||
            a.mozCancelFullScreen ||
            a.webkitExitFullscreen ||
            a.msExitFullscreen;
        a.fullscreenElement ||
        a.mozFullScreenElement ||
        a.webkitFullscreenElement ||
        a.msFullscreenElement
          ? (d.call(a), (this.minmax.texture = App.CombinedTextures.max_screen))
          : (c.call(b), (this.minmax.texture = App.CombinedTextures.min_screen));
      }),
      this.addChild(this.minmax));
    App.IsMobile &&
      setInterval(() => {
        this.resize(App.ClientWidth, App.ClientHeight);
      }, 3e3);
  }
  show() {
    super.show();
    this.resize(App.ClientWidth, App.ClientHeight);
  }
  resize(a, b) {
    this.y = this.x = 0;
    var c = 0.9 > App.Scale ? 0.9 : App.Scale;
    this.discButtonBackground.scale.x = this.discButtonBackground.scale.y = 1.2 / c;
    this.discTitle.scale.x = this.discTitle.scale.y = 1.2 / c;
    let d = this.toLocal(new PIXI.Point(a - 190 * c, 3 * c), App.Stage);
    this.helpButtonBackground.scale.x = this.helpButtonBackground.scale.y = 1.2 / c;
    this.helpTitle.scale.x = this.helpTitle.scale.y = 1.2 / c;
    this.helpButtonBackground.x = d.x;
    this.helpTitle.x =
      this.helpButtonBackground.x + 0.5 * (this.helpButtonBackground.width - this.helpTitle.width);
    this.minmax &&
      this.minmax.parent &&
      ((this.minmax.scale.x = this.minmax.scale.y = 0.5 / c),
      (c = this.toLocal(new PIXI.Point(a - 210 * c, 13 * c), App.Stage)),
      (this.minmax.x = c.x));
    this.discButtonBackground.x = this.helpButtonBackground.x + this.helpButtonBackground.width + 6;
    this.discTitle.x =
      this.discButtonBackground.x + 0.5 * (this.discButtonBackground.width - this.discTitle.width);
    App.IsMobile &&
      ((c = this.toLocal(new PIXI.Point(0.15 * a, 0.8 * b), App.Stage)),
      (a = this.toLocal(new PIXI.Point(0.85 * a, 0.8 * b), App.Stage)),
      (this.movementJoystick.x = c.x),
      (this.movementJoystick.y = c.y),
      (this.targetingJoystick.x = a.x),
      (this.targetingJoystick.y = a.y));
    this.discTitle.y = this.discButtonBackground.y - 2;
    this.helpTitle.y = this.helpButtonBackground.y - 2;
  }
}
var guestmenu = {};
export class GuestMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = -6;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(100, 14, 164, 32, 10);
    this.background.endFill();
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 46, 100, 524);
    this.background.endFill();
    this.container.addChild(this.background);
    this.discordButton = new PIXI.Sprite(App.CombinedTextures.discord);
    this.discordButton.y = 8;
    this.discordButton.scale.x = this.discordButton.scale.y = 0.25;
    this.joinDiscordText = new PIXI.Text("Discord", {
      fontSize: 18,
      fontFamily: "Arial",
      fill: 16763904,
      lineJoin: "round",
      strokeThickness: 2,
    });
    this.joinDiscordText.y = this.discordButton.y + 6;
    this.joinDiscordText.tint = 16776960;
    this.joinDiscordText.resolution = 2;
    this.joinDiscordText.interactive = !0;
    this.joinDiscordText.hitArea = new PIXI.Rectangle(-30, 0, 94, 24);
    this.joinDiscordText.on("mouseover", () => {
      this.discordButton.scale.x = this.discordButton.scale.y = 0.27;
      this.joinDiscordText.scale.x = this.joinDiscordText.scale.y = 1.1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.joinDiscordText.on("mouseout", () => {
      this.discordButton.scale.x = this.discordButton.scale.y = 0.25;
      this.joinDiscordText.scale.x = this.joinDiscordText.scale.y = 1;
    });
    this.joinDiscordText.on("mousedown", () => {
      window.open("https://discord.gg/yAYmSWZ", "_blank");
    });
    this.zapperButton = new PIXI.Sprite(App.CombinedTextures.zapper);
    this.zapperButton.y = App.ClientHeight - 35;
    this.zapperButton.scale.x = this.zapperButton.scale.y = 0.29;
    this.getZapperText = new PIXI.BitmapText("Play Zapper.io", {
      fontName: "Open Sans",
      fontSize: 24,
    });
    this.getZapperText.y = App.ClientHeight - 26;
    this.getZapperText.tint = 16776960;
    App.WhiteLabel !== App.WhiteLabel_POKI &&
      (this.addChild(this.discordButton), this.addChild(this.joinDiscordText));
    this.getZapperText.interactive = !0;
    this.getZapperText.hitArea = new PIXI.Rectangle(-30, 0, 220, 32);
    this.getZapperText.on("mouseover", () => {
      this.zapperButton.scale.x = this.zapperButton.scale.y = 0.32;
      this.getZapperText.scale.x = this.getZapperText.scale.y = 1.1;
    });
    this.getZapperText.on("mouseout", () => {
      this.zapperButton.scale.x = this.zapperButton.scale.y = 0.29;
      this.getZapperText.scale.x = this.getZapperText.scale.y = 1;
    });
    this.getZapperText.on("mousedown", () => {
      window.open(
        App.WhiteLabel === App.WhiteLabel_CG
          ? "https://www.crazygames.com/game/zapper-io"
          : "https://zapper.io",
        "_blank"
      );
    });
    this.loginButton = new PIXI.Graphics();
    this.loginButton.interactive = !0;
    this.loginButton.lineStyle(1, 16777215, 0.3, 0);
    this.loginButton.beginFill(16777215, 0.15);
    this.loginButton.drawRect(0, 0, 70, 25);
    this.loginButton.setActive = (a = !1) => {
      this.loginButton.tint = a ? 16777215 : 5592405;
    };
    this.loginButton.on("mousedown", () => {
      this.emit(Layer.Events.LOGIN_ACCESS);
    });
    this.loginButton.on("touchstart", () => {
      this.emit(Layer.Events.LOGIN_ACCESS);
    });
    this.loginButton.x = 110;
    this.loginButton.y = 14;
    this.loginButton.tint = 5592405;
    this.container.addChild(this.loginButton);
    this.loginText = new PIXI.Text("Login", FontStyle.SmallLabelText2);
    this.loginText.x = this.loginButton.x + 0.5 * (this.loginButton.width - this.loginText.width);
    this.loginText.y = this.loginButton.y + 2;
    this.loginText.resolution = 2;
    this.loginText.alpha = 0.8;
    this.loginText.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.loginText);
    this.loginButton.on("mouseover", () => {
      this.loginText.alpha = 1;
    });
    this.loginButton.on("mouseout", () => {
      this.loginText.alpha = 0.8;
    });
    this.registerButton = new PIXI.Graphics();
    this.registerButton.interactive = !0;
    this.registerButton.lineStyle(1, 16777215, 0.3, 0);
    this.registerButton.beginFill(16777215, 0.15);
    this.registerButton.drawRect(0, 0, 70, 25);
    this.registerButton.setActive = (a = !1) => {
      this.registerButton.tint = a ? 16777215 : 5592405;
    };
    this.registerButton.on("mousedown", () => {
      this.emit(Layer.Events.REGISTER_ACCESS);
    });
    this.registerButton.on("touchstart", () => {
      this.emit(Layer.Events.REGISTER_ACCESS);
    });
    this.registerButton.x = this.loginButton.x + 74;
    this.registerButton.y = this.loginButton.y;
    this.registerButton.tint = 5592405;
    this.container.addChild(this.registerButton);
    this.registerText = new PIXI.Text("Register", FontStyle.SmallLabelText2);
    this.registerText.x =
      this.registerButton.x + 0.5 * (this.registerButton.width - this.registerText.width);
    this.registerText.y = this.registerButton.y + 2;
    this.registerText.resolution = 2;
    this.registerText.alpha = 0.8;
    this.registerText.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.registerText);
    this.registerButton.on("mouseover", () => {
      this.registerText.alpha = 1;
    });
    this.registerButton.on("mouseout", () => {
      this.registerText.alpha = 0.8;
    });
    this.playButton = new GuestMenuButton("Play", 16763904, 18, "menu_icon_play");
    this.playButton.x = 0;
    this.playButton.y = 47;
    this.playButton.on(GuestMenuButton.BUTTON_PRESSED, () => this.emit(Layer.Events.MENU_ACCESS));
    this.container.addChild(this.playButton);
    this.profileButton = new GuestMenuButton("Profile", 16763904, 18, "menu_icon_profile");
    this.profileButton.x = 0;
    this.profileButton.y = this.playButton.y + 70;
    this.profileButton.on(GuestMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.GUEST_PROFILE_ACCESS)
    );
    this.container.addChild(this.profileButton);
    this.shopButton = new GuestMenuButton("Shop", 16763904, 18, "menu_icon_shop");
    this.shopButton.x = 0;
    this.shopButton.y = this.profileButton.y + 70;
    this.shopButton.on(GuestMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.CUSTOMIZATION_ACCESS)
    );
    this.container.addChild(this.shopButton);
    this.rankingButton = new GuestMenuButton("Ranking", 16763904, 18, "menu_icon_ranking");
    this.rankingButton.x = 0;
    this.rankingButton.y = this.shopButton.y + 70;
    this.rankingButton.on(GuestMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.RANKING_ACCESS)
    );
    this.container.addChild(this.rankingButton);
    this.memberButton = new GuestMenuButton("Players", 16763904, 18, "menu_icon_players");
    this.memberButton.x = 0;
    this.memberButton.y = this.rankingButton.y + 70;
    this.memberButton.on(GuestMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.MEMBER_ACCESS)
    );
    this.container.addChild(this.memberButton);
    this.clanButton = new GuestMenuButton("Clans", 16763904, 18, "menu_icon_clans");
    this.clanButton.x = 0;
    this.clanButton.y = this.memberButton.y + 70;
    this.clanButton.on(GuestMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.CLAN_BROWSER_ACCESS)
    );
    this.container.addChild(this.clanButton);
    this.settingsButton = new GuestMenuButton("Settings", 16763904, 18, "menu_icon_settings", !1);
    this.settingsButton.x = 0;
    this.settingsButton.y = this.clanButton.y + 70;
    this.settingsButton.on(GuestMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.SETTINGS_ACCESS)
    );
    this.container.addChild(this.settingsButton);
    this.setMode(GuestMenu.MODE_NONE);
  }
  setMode(a) {
    this.mode = a;
    this.playButton.setActive(a === GuestMenu.MODE_NONE);
    this.loginButton.setActive(a === GuestMenu.MODE_LOGIN);
    this.registerButton.setActive(a === GuestMenu.MODE_REGISTER);
    this.rankingButton.setActive(a === GuestMenu.MODE_RANKING);
    this.memberButton.setActive(a === GuestMenu.MODE_MEMBER);
    this.clanButton.setActive(a === GuestMenu.MODE_CLAN);
    this.shopButton.setActive(a === GuestMenu.MODE_SHOP);
    this.profileButton.setActive(a === GuestMenu.MODE_GUEST_PROFILE);
    this.settingsButton.setActive(a === GuestMenu.MODE_SETTINGS);
  }
  resize(a, b) {
    this.x = 0.5 * a - 430;
    this.y = -8;
    this.discordButton.x = 0;
    this.joinDiscordText.x = this.discordButton.x + this.discordButton.width + 2;
    this.zapperButton.x = 0.5 * -a + 0.5 * this.container.width + 5;
    this.getZapperText.x = this.zapperButton.x + this.zapperButton.width + 9;
    this.zapperButton.y = App.ClientHeight - 35;
    this.getZapperText.y = App.ClientHeight - 26;
  }
}
GuestMenu.MODE_NONE = "none";
GuestMenu.MODE_LOGIN = "login";
GuestMenu.MODE_REGISTER = "register";
GuestMenu.MODE_RANKING = "ranking";
GuestMenu.MODE_MEMBER = "member";
GuestMenu.MODE_CLAN = "clan";
GuestMenu.MODE_SHOP = "shop";
GuestMenu.MODE_PARTNER = "partner";
GuestMenu.MODE_GUEST_PROFILE = "guest_profile";
GuestMenu.MODE_SETTINGS = "settings";
export class GuestMenuButton extends PIXI.Graphics {
  constructor(a = "", b, c, d = null, e = !0) {
    super();
    this.interactive = !0;
    this.active = !1;
    this.rectWidth = 98;
    this.rectHeight = 70;
    this.hitArea = new PIXI.Rectangle(0, 0, this.rectWidth, this.rectHeight);
    this.backgroundEnabled = new PIXI.Graphics();
    this.backgroundEnabled.lineStyle(1, 16763904, 0.8, 0);
    this.backgroundEnabled.beginFill(6710886, 0.4);
    this.backgroundEnabled.drawRoundedRect(4, 3, 92, 69, 6);
    this.backgroundEnabled.endFill();
    e &&
      (this.backgroundEnabled.lineStyle(1, 16777215, 0.1, 0),
      this.backgroundEnabled.moveTo(8, 70),
      this.backgroundEnabled.lineTo(92, 70));
    this.backgroundDisabled = new PIXI.Graphics();
    this.backgroundDisabled.drawRect(0, 1, 100, 69);
    e &&
      (this.backgroundDisabled.lineStyle(1, 16777215, 0.1, 0),
      this.backgroundDisabled.moveTo(8, 72),
      this.backgroundDisabled.lineTo(92, 72));
    this.addChild(this.backgroundDisabled);
    this.backgroundHover = new PIXI.Graphics();
    this.backgroundHover.beginFill(0, 0.2);
    this.backgroundHover.drawRect(4, 1, 92, 69);
    this.backgroundHover.visible = !1;
    this.addChild(this.backgroundHover);
    this.activeBackground = this.backgroundDisabled;
    d &&
      ((this.icon = new PIXI.Sprite(App.CombinedTextures[d])),
      (this.icon.x = 0.5 * this.rectWidth),
      (this.icon.y = 0.37 * this.rectHeight),
      (this.icon.tint = 13421772),
      (this.icon.scale.x = this.icon.scale.y = 0.35),
      (this.icon.anchor.x = this.icon.anchor.y = 0.5),
      this.addChild(this.icon));
    this.label = new PIXI.Text(a, FontStyle.MenuTitle);
    this.label.resolution = 2;
    this.label.x = 0.5 * (this.rectWidth - this.label.width);
    this.label.y = 42;
    this.addChild(this.label);
    this.on("mousedown", () => {
      this.emit(GuestMenuButton.BUTTON_PRESSED);
      this.backgroundHover.visible = !1;
      AudioEffects.ButtonClick.audio.play();
    });
    this.on("touchstart", () => {
      this.emit(GuestMenuButton.BUTTON_PRESSED);
      AudioEffects.ButtonClick.audio.play();
    });
    this.on("mouseover", () => {
      this.active || (this.backgroundHover.visible = !0);
      AudioEffects.ButtonHover.audio.play();
    });
    this.on("mouseout", () => {
      this.backgroundHover.visible = !1;
    });
  }
  setActive(a = !0) {
    (this.active = a)
      ? (this.backgroundDisabled.parent && this.removeChild(this.backgroundDisabled),
        this.addChildAt(this.backgroundEnabled, 0),
        (this.activeBackground = this.backgroundEnabled))
      : (this.backgroundEnabled.parent && this.removeChild(this.backgroundEnabled),
        this.addChildAt(this.backgroundDisabled, 0),
        (this.activeBackground = this.backgroundDisabled));
  }
}
GuestMenuButton.BUTTON_PRESSED = "button_pressed";
var membermenu = {};
export class MemberMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = -6;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(100, 14, 120, 32, 10);
    this.background.endFill();
    this.background.lineStyle(2, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 46, 100, 524);
    this.background.endFill();
    this.container.addChild(this.background);
    this.discordButton = new PIXI.Sprite(App.CombinedTextures.discord);
    this.discordButton.y = 8;
    this.discordButton.scale.x = this.discordButton.scale.y = 0.25;
    this.joinDiscordText = new PIXI.Text("Discord", {
      fontSize: 18,
      fontFamily: "Arial",
      fill: 16763904,
      lineJoin: "round",
      strokeThickness: 2,
    });
    this.joinDiscordText.y = this.discordButton.y + 6;
    this.joinDiscordText.tint = 16776960;
    this.joinDiscordText.resolution = 2;
    this.joinDiscordText.interactive = !0;
    this.joinDiscordText.hitArea = new PIXI.Rectangle(-30, 0, 94, 24);
    this.joinDiscordText.on("mouseover", () => {
      this.discordButton.scale.x = this.discordButton.scale.y = 0.27;
      this.joinDiscordText.scale.x = this.joinDiscordText.scale.y = 1.1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.joinDiscordText.on("mouseout", () => {
      this.discordButton.scale.x = this.discordButton.scale.y = 0.25;
      this.joinDiscordText.scale.x = this.joinDiscordText.scale.y = 1;
    });
    this.joinDiscordText.on("mousedown", () => {
      window.open("https://discord.gg/yAYmSWZ", "_blank");
    });
    this.zapperButton = new PIXI.Sprite(App.CombinedTextures.zapper);
    this.zapperButton.y = App.ClientHeight - 35;
    this.zapperButton.scale.x = this.zapperButton.scale.y = 0.29;
    this.getZapperText = new PIXI.BitmapText("Play Zapper.io", {
      fontName: "Open Sans",
      fontSize: 24,
    });
    this.getZapperText.y = App.ClientHeight - 26;
    this.getZapperText.tint = 16776960;
    App.WhiteLabel !== App.WhiteLabel_POKI &&
      (this.addChild(this.discordButton), this.addChild(this.joinDiscordText));
    this.getZapperText.interactive = !0;
    this.getZapperText.hitArea = new PIXI.Rectangle(-30, 0, 220, 32);
    this.getZapperText.on("mouseover", () => {
      this.zapperButton.scale.x = this.zapperButton.scale.y = 0.32;
      this.getZapperText.scale.x = this.getZapperText.scale.y = 1.1;
    });
    this.getZapperText.on("mouseout", () => {
      this.zapperButton.scale.x = this.zapperButton.scale.y = 0.29;
      this.getZapperText.scale.x = this.getZapperText.scale.y = 1;
    });
    this.getZapperText.on("mousedown", () => {
      window.open(
        App.WhiteLabel === App.WhiteLabel_CG
          ? "https://www.crazygames.com/game/zapper-io"
          : "https://zapper.io",
        "_blank"
      );
    });
    this.logoutButton = new PIXI.Graphics();
    this.logoutButton.interactive = !0;
    this.logoutButton.lineStyle(1, 16777215, 0.3, 0);
    this.logoutButton.beginFill(16777215, 0.15);
    this.logoutButton.drawRect(0, 0, 100, 25);
    this.logoutButton.setActive = () => {};
    this.logoutButton.on("mousedown", () => this.onLogout());
    this.logoutButton.on("touchstart", () => this.onLogout());
    this.logoutButton.x = 110;
    this.logoutButton.y = 14;
    this.logoutButton.tint = 5592405;
    this.container.addChild(this.logoutButton);
    this.logoutIcon = new PIXI.Sprite(App.CombinedTextures.logout);
    this.logoutIcon.x = this.logoutButton.x + this.logoutButton.width - 24;
    this.logoutIcon.y = this.logoutButton.y + 0.1 * this.logoutButton.height;
    this.logoutIcon.scale.x = this.logoutIcon.scale.y = 0.4;
    this.logoutIcon.interactive = !1;
    this.logoutIcon.alpha = 0.7;
    this.container.addChild(this.logoutIcon);
    this.logoutText = new PIXI.Text("Logout", FontStyle.SmallLabelText2);
    this.logoutText.x =
      this.logoutButton.x + 0.5 * (this.logoutButton.width - this.logoutText.width) - 10;
    this.logoutText.y = this.logoutButton.y + 2;
    this.logoutText.resolution = 2;
    this.logoutText.alpha = 0.7;
    this.logoutText.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.logoutText);
    this.logoutButton.on("mouseover", () => {
      this.logoutText.alpha = this.logoutIcon.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.logoutButton.on("mouseout", () => {
      this.logoutText.alpha = this.logoutIcon.alpha = 0.7;
    });
    this.playButton = new MemberMenuButton("Play", 16763904, 18, "menu_icon_play");
    this.playButton.x = 0;
    this.playButton.y = 47;
    this.playButton.on(MemberMenuButton.BUTTON_PRESSED, () => this.emit(Layer.Events.MENU_ACCESS));
    this.container.addChild(this.playButton);
    this.profileButton = new MemberMenuButton("Profile", 16763904, 18, "menu_icon_profile");
    this.profileButton.x = 0;
    this.profileButton.y = this.playButton.y + 70;
    this.profileButton.on(MemberMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.PROFILE_ACCESS)
    );
    this.container.addChild(this.profileButton);
    this.shopButton = new MemberMenuButton("Shop", 16763904, 18, "menu_icon_shop");
    this.shopButton.x = 0;
    this.shopButton.y = this.profileButton.y + 70;
    this.shopButton.on(MemberMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.CUSTOMIZATION_ACCESS)
    );
    this.container.addChild(this.shopButton);
    this.rankingButton = new MemberMenuButton("Ranking", 16763904, 18, "menu_icon_ranking");
    this.rankingButton.x = 0;
    this.rankingButton.y = this.shopButton.y + 70;
    this.rankingButton.on(MemberMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.RANKING_ACCESS)
    );
    this.container.addChild(this.rankingButton);
    this.memberButton = new MemberMenuButton("Players", 16763904, 18, "menu_icon_players");
    this.memberButton.x = 0;
    this.memberButton.y = this.rankingButton.y + 70;
    this.memberButton.on(MemberMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.MEMBER_ACCESS)
    );
    this.container.addChild(this.memberButton);
    this.clanButton = new MemberMenuButton("Clans", 16763904, 18, "menu_icon_clans");
    this.clanButton.x = 0;
    this.clanButton.y = this.memberButton.y + 70;
    this.clanButton.on(MemberMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.CLAN_BROWSER_ACCESS)
    );
    this.container.addChild(this.clanButton);
    this.settingsButton = new MemberMenuButton("Settings", 16763904, 18, "menu_icon_settings", !1);
    this.settingsButton.x = 0;
    this.settingsButton.y = this.clanButton.y + 70;
    this.settingsButton.on(MemberMenuButton.BUTTON_PRESSED, () =>
      this.emit(Layer.Events.SETTINGS_ACCESS)
    );
    this.container.addChild(this.settingsButton);
    this.setMode(MemberMenu.MODE_NONE);
  }
  setMode(a) {
    this.mode = a;
    this.playButton.setActive(a === MemberMenu.MODE_NONE);
    this.logoutButton.setActive(a === MemberMenu.MODE_LOGIN);
    this.rankingButton.setActive(a === MemberMenu.MODE_RANKING);
    this.memberButton.setActive(a === MemberMenu.MODE_MEMBER);
    this.clanButton.setActive(a === MemberMenu.MODE_CLAN);
    this.shopButton.setActive(a === MemberMenu.MODE_SHOP);
    this.profileButton.setActive(a === MemberMenu.MODE_PROFILE);
    this.settingsButton.setActive(a === MemberMenu.MODE_SETTINGS);
  }
  resize(a, b) {
    this.x = 0.5 * a - 430;
    this.y = -8;
    this.discordButton.x = 0;
    this.joinDiscordText.x = this.discordButton.x + this.discordButton.width + 2;
    this.zapperButton.x = 0.5 * -a + 0.5 * this.container.width + 5 - 300 * (1 - App.Scale);
    this.getZapperText.x = this.zapperButton.x + this.zapperButton.width + 9;
    this.zapperButton.y = App.ClientHeight - 35 + 500 * (1 - App.Scale);
    this.getZapperText.y = App.ClientHeight - 26 + 500 * (1 - App.Scale);
    this.getZapperText.visible = 860 > App.ClientWidth || 560 > App.ClientHeight ? !1 : !0;
  }
  onLogout() {
    App.Autogen ? this.emit(Layer.Events.LOGOUT_ACCESS) : this.emit(Layer.Events.LOGOUT);
  }
}
MemberMenu.MODE_NONE = "none";
MemberMenu.MODE_RANKING = "ranking";
MemberMenu.MODE_SHOP = "shop";
MemberMenu.MODE_MEMBER = "member";
MemberMenu.MODE_CLAN = "clan";
MemberMenu.MODE_PROFILE = "profile";
MemberMenu.MODE_SETTINGS = "settings";
export class MemberMenuButton extends PIXI.Graphics {
  constructor(a = "", b, c, d = null, e = !0) {
    super();
    this.interactive = !0;
    this.active = !1;
    this.rectWidth = 98;
    this.rectHeight = 70;
    this.hitArea = new PIXI.Rectangle(0, 0, this.rectWidth, this.rectHeight);
    this.backgroundEnabled = new PIXI.Graphics();
    this.backgroundEnabled.lineStyle(2, 16763904, 0.5, 0);
    this.backgroundEnabled.beginFill(6710886, 0.4);
    this.backgroundEnabled.drawRect(4, 3, 92, 69);
    this.backgroundEnabled.endFill();
    e &&
      (this.backgroundEnabled.lineStyle(2, 16777215, 0.1, 0),
      this.backgroundEnabled.moveTo(8, 72),
      this.backgroundEnabled.lineTo(92, 72));
    this.backgroundDisabled = new PIXI.Graphics();
    this.backgroundDisabled.drawRect(0, 1, 100, 69);
    e &&
      (this.backgroundDisabled.lineStyle(1, 16777215, 0.1, 0),
      this.backgroundDisabled.moveTo(8, 70),
      this.backgroundDisabled.lineTo(92, 70));
    this.addChild(this.backgroundDisabled);
    this.backgroundHover = new PIXI.Graphics();
    this.backgroundHover.beginFill(0, 0.2);
    this.backgroundHover.drawRect(4, 1, 92, 69);
    this.backgroundHover.visible = !1;
    this.addChild(this.backgroundHover);
    this.activeBackground = this.backgroundDisabled;
    d &&
      ((this.icon = new PIXI.Sprite(App.CombinedTextures[d])),
      (this.icon.x = 0.5 * this.rectWidth),
      (this.icon.y = 0.37 * this.rectHeight),
      (this.icon.tint = 13421772),
      (this.icon.scale.x = 0.35),
      (this.icon.scale.y = 0.35),
      (this.icon.anchor.x = 0.5),
      (this.icon.anchor.y = 0.5),
      this.addChild(this.icon));
    this.label = new PIXI.Text(a, FontStyle.MenuTitle);
    this.label.resolution = 2;
    this.label.x = 0.5 * (this.rectWidth - this.label.width);
    this.label.y = 42;
    this.addChild(this.label);
    this.on("mousedown", () => {
      this.emit(MemberMenuButton.BUTTON_PRESSED);
      this.backgroundHover.visible = !1;
      AudioEffects.ButtonClick.audio.play();
    });
    this.on("touchstart", () => {
      this.emit(MemberMenuButton.BUTTON_PRESSED);
      AudioEffects.ButtonClick.audio.play();
    });
    this.on("mouseover", () => {
      this.active || (this.backgroundHover.visible = !0);
      AudioEffects.ButtonHover.audio.play();
    });
    this.on("mouseout", () => {
      this.backgroundHover.visible = !1;
    });
  }
  setActive(a = !0) {
    (this.active = a)
      ? (this.backgroundDisabled.parent && this.removeChild(this.backgroundDisabled),
        this.addChildAt(this.backgroundEnabled, 0),
        (this.activeBackground = this.backgroundEnabled))
      : (this.backgroundEnabled.parent && this.removeChild(this.backgroundEnabled),
        this.addChildAt(this.backgroundDisabled, 0),
        (this.activeBackground = this.backgroundDisabled));
  }
}
MemberMenuButton.BUTTON_PRESSED = button_pressed;
var memberbrowsermenu = {};
export class MemberBrowserMenu extends Feature {
  constructor() {
    super();
    this.searchTimeout = null;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.container.addChild(this.background);
    this.ox = 40;
    this.oy = 20;
    this.searchValue = "";
    this.titleText = new PIXI.Text("Players", FontStyle.MediumOrangeText);
    this.titleText.x = 0.5 * this.width - 20;
    this.titleText.y = this.oy + 36;
    this.titleText.anchor.x = 0.5;
    this.titleText.resolution = 2;
    this.container.addChild(this.titleText);
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.MEMBER_CANCEL));
    this.container.addChild(this.closeButton);
    this.container.x = 0.5 * -this.width;
    this.usernameTitle = new PIXI.Text("Name search:", FontStyle.InputFieldTitle1);
    this.usernameTitle.x = this.ox - 12;
    this.usernameTitle.y = this.oy + 78;
    this.usernameTitle.resolution = 2;
    this.container.addChild(this.usernameTitle);
    this.searchField = new InputField("name_search");
    this.searchField.setDimensions(300, 35);
    this.searchField.forceLowerCase = !1;
    this.searchField.setMaxChars(18);
    this.searchField.x = this.ox + 100;
    this.searchField.y = this.oy + 76;
    this.searchField.scale.x = this.searchField.scale.y = 0.8;
    this.searchField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#^&*-._:=[]"
    );
    this.container.addChild(this.searchField);
    this.searchField.addListener(InputField.CHANGE, (a) => {
      this.searchValue = a.data.value;
      this.onSearch();
    });
    this.loaderText = new PIXI.Text("Search results will appear here.", {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 16,
      fill: 13421772,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.loaderText.x = this.ox + 20;
    this.loaderText.y = this.oy + 139;
    this.loaderText.resolution = 2;
    this.container.addChild(this.loaderText);
    this.nameText = new PIXI.Text("Name", FontStyle.SmallRankingTextOrange);
    this.nameText.x = this.ox + 20;
    this.nameText.y = this.oy + 109;
    this.nameText.resolution = 2;
    this.container.addChild(this.nameText);
    this.skillRankingText = new PIXI.Text("Skill rank", FontStyle.SmallRankingTextOrange);
    this.skillRankingText.x = this.ox + 275;
    this.skillRankingText.y = this.oy + 109;
    this.skillRankingText.resolution = 2;
    this.container.addChild(this.skillRankingText);
    this.rankingText = new PIXI.Text("Experience rank", FontStyle.SmallRankingTextOrange);
    this.rankingText.x = this.ox + 400;
    this.rankingText.y = this.oy + 109;
    this.rankingText.resolution = 2;
    this.container.addChild(this.rankingText);
    this.nameFieldTableContainerMask = new PIXI.Graphics();
    this.nameFieldTableContainerMask.beginFill(16777215, 1);
    this.nameFieldTableContainerMask.drawRect(-10, 150, 640, 390);
    this.nameFieldTableContainerMask.endFill();
    this.nameFieldTableContainerMask.x = 10;
    this.container.addChild(this.nameFieldTableContainerMask);
    this.nameFieldTableContainer = new PIXI.Container();
    this.nameFieldTableContainer.x = 10;
    this.nameFieldTableContainer.mask = this.nameFieldTableContainerMask;
    this.container.addChild(this.nameFieldTableContainer);
    this.nameFieldScrollbar = new MemberBrowserScrollbar(404);
    this.nameFieldScrollbar.x = 625;
    this.nameFieldScrollbar.y = 150;
    this.container.addChild(this.nameFieldScrollbar);
    this.nameFieldScrollbar.on(MemberBrowserScrollbar.SCROLL, (a) => {
      this.nameFieldTableContainer.height > this.nameFieldTableContainerMask.height &&
        (this.nameFieldTableContainer.y = -(
          a *
          (this.nameFieldTableContainer.height - this.nameFieldTableContainerMask.height)
        ));
    });
  }
  show() {
    this.nameFieldScrollbar.enableWheel();
  }
  hide() {
    this.nameFieldScrollbar.disableWheel();
  }
  async onSearch() {
    this.nameFieldTableContainer.removeChildren();
    this.loaderText.visible = !0;
    0 === this.searchValue.trim().length
      ? (this.loaderText.text = "No results.")
      : (null !== this.searchTimeout && clearTimeout(this.searchTimeout),
        (this.loaderText.text = "Searching.."),
        (this.searchTimeout = setTimeout(() => this.search(), 750)));
  }
  async search() {
    var a = this.searchValue;
    null !== this.searchTimeout && (clearTimeout(this.searchTimeout), (this.searchTimeout = null));
    if (4 > a.trim().length) this.loaderText.text = "Name too short. Enter at least 4 characters.";
    else {
      var b = await APIClient.getUserSearch(a);
      this.nameFieldTableContainer.removeChildren();
      if (0 === a.trim().length) this.loaderText.text = "No results.";
      else if (b.success) {
        0 === b.users.length
          ? (this.loaderText.text = "No results.")
          : (this.loaderText.visible = !1);
        for (a = 0; a < b.users.length; a++) {
          const c = b.users[a],
            d = new MemberTableRow(a, c.id, c.name, parseInt(c.level), c.ranking, c.skill_ranking);
          d.x = this.ox + 20;
          d.y = this.oy + 36 * a + 130;
          d.on("mousedown", () => {
            this.emit(Layer.Events.USER_ACCESS, c.id, !1);
            AudioEffects.ButtonClick.audio.play();
          });
          this.nameFieldTableContainer.addChild(d);
        }
        this.nameFieldScrollbar.reset();
        this.nameFieldTableContainer.y = 0;
      } else this.loaderText.text = "No results (" + b.error + ").";
    }
  }
}
export class MemberTableRow extends PIXI.Container {
  constructor(a, b, c, d, e, f) {
    super();
    this.index = a;
    this.interactive = !0;
    a = Math.max(Math.floor((d / 240) * 15) + 1);
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.1);
    this.background.drawRect(-10, 2, 560, 32);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    });
    this.addChild(this.background);
    this.icon = new PIXI.Sprite(App.CombinedTextures["skill_icon_" + a]);
    this.icon.x = -48;
    this.icon.y = -2;
    this.icon.scale.x = this.icon.scale.y = 0.5;
    this.addChild(this.icon);
    this.nameText = new PIXI.BitmapText(c, { fontName: "Open Sans", fontSize: 22 });
    this.nameText.x = 0;
    this.nameText.y = 9;
    this.addChild(this.nameText);
    this.skillRankText = new PIXI.BitmapText(f.toString(), { fontName: "Open Sans", fontSize: 22 });
    this.skillRankText.x = 250;
    this.skillRankText.y = 9;
    this.skillRankText.tint = 16763904;
    this.addChild(this.skillRankText);
    this.rankText = new PIXI.BitmapText(e.toString(), { fontName: "Open Sans", fontSize: 22 });
    this.rankText.x = 375;
    this.rankText.y = 9;
    this.rankText.tint = 16763904;
    this.addChild(this.rankText);
  }
}
export class MemberBrowserScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      -3 > b ? (b = -3) : b > this.h - 39 && (b = this.h - 39);
      let c = this.h / (this.h - 39);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(MemberBrowserScrollbar.SCROLL, (1 / this.h) * (b + 3) * c);
    }
  }
  reset() {
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
MemberBrowserScrollbar.SCROLL = "scroll";
var util = {};
Math.PI05 = 0.5 * Math.PI;
Base62Charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
Clamp = function (a, b, c) {
  return c < a ? a : c > b ? b : c;
};
ToPrecision = function (a, b) {
  a *= Math.pow(10, a);
  return Math.round(b * a) / a;
};
ShortAngle = function (a, b) {
  if (b > a) {
    var c = b - a;
    a = c < Math.PI ? c : -1 * (2 * Math.PI - b + a);
  } else (c = a - b), (a = c < Math.PI ? -1 * c : 2 * Math.PI - a + b);
  return a;
};
fastSplice = function (a, b) {
  const c = a.length - 1;
  b < c && (a[b] = a[c]);
  a.pop();
};
numberWithPeriods = function (a) {
  return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
polyAreaTri = function (a, b, c) {
  return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
};
polyArea = function (a) {
  for (var b = 0, c = 0, d = a.length; c < d; c++) {
    var e = (c + 1) % d;
    b += a[e].x * a[c].y - a[c].x * a[e].y;
  }
  return b / 2;
};
polyCenter = function (a) {
  for (var b = { x: 0, y: 0 }, c = a.length, d = 0; d < c; d++) (b.x += a[d].x), (b.y += a[d].y);
  b.x /= c;
  b.y /= c;
  return b;
};
polyScaleCenter = function (a, b) {
  for (var c = polyCenter(a), d = a.length, e = 0; e < d; e++) {
    var f = a[e].y - c.y;
    a[e].x += (a[e].x - c.x) * (b - 1);
    a[e].y += f * (b - 1);
  }
};
polyScaleUnitCenter = function (a, b) {
  for (var c = polyCenter(a), d = a.length, e = 0; e < d; e++) {
    var f = a[e].x - c.x,
      g = a[e].y - c.y,
      h = Math.sqrt(f * f + g * g);
    a[e].x += (f / h) * b;
    a[e].y += (g / h) * b;
  }
};
polyCenterArr = function (a) {
  for (var b = { x: 0, y: 0 }, c = a.length, d = 0; d < c; d += 2) (b.x += a[d]), (b.y += a[d + 1]);
  b.x /= 0.5 * c;
  b.y /= 0.5 * c;
  return b;
};
polyRotate = function (a, b, c) {
  c = c || { x: 0, y: 0 };
  for (var d = a.length, e = 0; e < d; e++) {
    var f = a[e].x - c.x,
      g = a[e].y - c.y,
      h = Math.sqrt(f * f + g * g);
    f = Math.atan2(g, f);
    a[e].x = h * Math.cos(f + b) + c.x;
    a[e].y = h * Math.sin(f + b) + c.y;
  }
  return a;
};
polyRotateCopy = function (a, b, c) {
  c = c || { x: 0, y: 0 };
  for (var d = a.length, e = [], f = 0; f < d; f++) {
    var g = a[f].x - c.x,
      h = a[f].y - c.y,
      k = Math.sqrt(g * g + h * h);
    g = Math.atan2(h, g);
    e[f] = { x: k * Math.cos(g + b) + c.x, y: k * Math.sin(g + b) + c.y };
  }
  return e;
};
function getDir(a, b, c) {
  return 0 > (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) ? -1 : 1;
}
function fastAtan2(a, b) {
  var c = Math.PI;
  if (0 === b) return 0 < a ? c / 2 : 0 === a ? 0 : -c / 2;
  var d = a / b;
  if (-1 > d || 1 < d) {
    if (((d = c / 2 - d / (d * d + 0.28)), 0 > a)) return d - c;
  } else if (((d /= 1 + 0.28 * d * d), 0 > b)) return 0 > a ? d - c : d + c;
  return d;
}
function Intersect(a, b, c, d, e, f, g, h, k) {
  c -= a;
  d -= b;
  g -= e;
  var m = h - f;
  h = (-d * (a - e) + c * (b - f)) / (-g * d + c * m);
  e = (g * (b - f) - m * (a - e)) / (-g * d + c * m);
  return 0 <= h && 1 >= h && 0 <= e && 1 >= e ? ((k.x = a + e * c), (k.y = b + e * d), !0) : !1;
}
function Intersect3(a, b, c, d, e, f, g, h) {
  var k = d - b,
    m = a - c,
    n = c * b - a * d;
  if (0 < (k * e + m * f + n) * (k * g + m * h + n)) return -1;
  var l = h - f;
  var p = e - g;
  n = g * f - e * h;
  g = l * a + p * b + n;
  h = l * c + p * d + n;
  return 0 < g * h ? -1 : 0 === k * p - l * m ? 0 : 1;
}
polyRotateFast = function (a, b) {
  for (var c = 0, d = a.length; c < d; c++) {
    var e = a[c].x,
      f = a[c].y,
      g = Math.sqrt(e * e + f * f);
    e = fastAtan2(f, e);
    a[c].x = g * Math.cos(e + b);
    a[c].y = g * Math.sin(e + b);
  }
};
polyRotateCopyFast = function (a, b) {
  for (var c = [], d = 0, e = a.length; d < e; d++) {
    var f = a[d].x,
      g = a[d].y,
      h = Math.sqrt(f * f + g * g);
    f = fastAtan2(g, f);
    c[d] = { x: h * Math.cos(f + b), y: h * Math.sin(f + b) };
  }
  return c;
};
polyBounds = function (a, b) {
  let c = { x: 0, y: 0, width: 0, height: 0 };
  for (let e = 0, f = a.length; e < f; e++) {
    var d = a[e].x;
    let g = a[e].y;
    d < c.x ? (c.x = d) : d > c.width && (c.width = d);
    g < c.y ? (c.y = g) : g > c.height && (c.height = g);
  }
  c.width -= c.x;
  c.height -= c.y;
  b &&
    ((a = b.x < c.x ? b.x : c.x),
    (d = b.y < c.y ? b.y : c.y),
    (c.width = (b.x + b.width < c.x + c.width ? c.x + c.width : b.x + b.width) - a),
    (c.height = (b.y + b.height < c.y + c.height ? c.y + c.height : b.y + b.height) - d),
    (c.x = a),
    (c.y = d));
  return c;
};
uintToVec4 = function (a) {
  return {
    w: parseInt(a[0] + a[1], 16) / 255,
    x: parseInt(a[2] + a[3], 16) / 255,
    y: parseInt(a[4] + a[5], 16) / 255,
    z: parseInt(a[6] + a[7], 16) / 255,
  };
};
uintToArr = function (a, b) {
  return [
    (parseInt(a[2] + a[3], 16) / 255) * b,
    (parseInt(a[4] + a[5], 16) / 255) * b,
    (parseInt(a[6] + a[7], 16) / 255) * b,
    (parseInt(a[0] + a[1], 16) / 255) * b,
  ];
};
DateUTC = function () {
  var a = new Date();
  return Date.UTC(
    a.getUTCFullYear(),
    a.getUTCMonth(),
    a.getUTCDate(),
    a.getUTCHours(),
    a.getUTCMinutes(),
    a.getUTCSeconds(),
    a.getUTCMilliseconds()
  );
};
dp = function (a, b) {
  return a.x * b.x + a.y * b.y;
};
perp = function (a, b) {
  var c = { x: 0, y: 0 };
  b ? ((c.x = -a.y), (c.y = a.x)) : ((c.x = a.y), (c.y = -a.x));
  return c;
};
mag = function (a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};
norm = function (a) {
  var b = mag(a),
    c = { x: 0, y: 0 };
  if (0 === b) return c;
  c.x = a.x / b;
  c.y = a.y / b;
  return c;
};
project = function (a, b) {
  var c = norm(b),
    d = mag(a),
    e = mag(b);
  a = dp(a, b) / (0 === d * e ? 1e-4 : d * e);
  d *= a;
  c.x *= d;
  c.y *= d;
  return c;
};
RandomBrightColor = function () {
  return (
    ((64 + Math.floor(192 * Math.random())) << 16) |
    ((64 + Math.floor(192 * Math.random())) << 8) |
    (64 + Math.floor(192 * Math.random()))
  );
};
xorshift128_seed = function (a) {
  xorshift128.s[0] = a;
  xorshift128.s[1] = (a << 1) ^ a;
};
xorshift128 = function () {
  var a = xorshift128.s[0],
    b = xorshift128.s[1],
    c = a + b;
  xorshift128.s[0] = a;
  b ^= b << 23;
  xorshift128.s[1] = b ^ a ^ (b >> 17) ^ (a >> 26);
  return c;
};
xorshift128.s = [55403919, 12823250];
Base62Encode = function (a) {
  if (0 === a) return Base62Charset[0];
  let b = "";
  for (; 0 < a; ) (b = Base62Charset[a % 62] + b), (a = Math.floor((a / 62) >>> 0));
  return b;
};
Base62Decode = function (a) {
  var b = 0,
    c = a.length,
    d;
  for (d = 0; d < c; d++) {
    var e = a.charCodeAt(d);
    e = 58 > e ? e - 48 : 91 > e ? e - 29 : e - 87;
    b += e * Math.pow(62, c - d - 1);
  }
  return b;
};
setCookie = function (a, b, c) {
  var d = "";
  c && ((d = new Date()), d.setTime(d.getTime() + 864e5 * c), (d = "; expires=" + d.toUTCString()));
  document.cookie = a + "=" + (b || "") + d + "; path=/; domain=ninja.io";
};
var clanbrowsermenu = {};
export class ClanBrowserMenu extends Feature {
  constructor() {
    super();
    this.searchTimeout = null;
    this.lastRefresh = 0;
    this.clans = [];
    this.clanPropSort = "members";
    this.clanPropDir = { name: 1, skill: 1, members: -1, experience: 1 };
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.container.addChild(this.background);
    this.ox = 40;
    this.oy = 20;
    this.searchValue = "";
    this.titleText = new PIXI.Text("Clans", FontStyle.MediumOrangeText);
    this.titleText.x = 0.5 * this.width - 20;
    this.titleText.y = this.oy + 36;
    this.titleText.anchor.x = 0.5;
    this.titleText.resolution = 2;
    this.container.addChild(this.titleText);
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.CLAN_BROWSER_CANCEL));
    this.container.addChild(this.closeButton);
    this.container.x = 0.5 * -this.width;
    this.clanNameTitle = new PIXI.Text("Name search:", FontStyle.InputFieldTitle1);
    this.clanNameTitle.x = this.ox - 12;
    this.clanNameTitle.y = this.oy + 78;
    this.clanNameTitle.resolution = 2;
    this.container.addChild(this.clanNameTitle);
    this.searchField = new InputField("name_search");
    this.searchField.setDimensions(300, 35);
    this.searchField.forceLowerCase = !1;
    this.searchField.setMaxChars(18);
    this.searchField.x = this.ox + 100;
    this.searchField.y = this.oy + 76;
    this.searchField.scale.x = this.searchField.scale.y = 0.8;
    this.searchField.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ");
    this.container.addChild(this.searchField);
    this.searchField.addListener(InputField.CHANGE, (a) => {
      this.searchValue = a.data.value;
      this.onSearch();
    });
    this.loaderText = new PIXI.Text("Search results will appear here.", {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 16,
      fill: 13421772,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.loaderText.x = this.ox + 20;
    this.loaderText.y = this.oy + 139;
    this.loaderText.resolution = 2;
    this.container.addChild(this.loaderText);
    this.nameText = new PIXI.Text("Name", FontStyle.SmallClanBrowserText);
    this.nameText.x = this.ox + 20;
    this.nameText.y = this.oy + 109;
    this.nameText.tint = 16755200;
    this.nameText.interactive = !0;
    this.nameText.resolution = 2;
    this.nameText.hitArea = new PIXI.Rectangle(0, 0, this.nameText.width, this.nameText.height);
    this.container.addChild(this.nameText);
    this.nameText.on("mouseover", () => {
      this.nameText.tint = 16776960;
    });
    this.nameText.on("mouseout", () => {
      this.nameText.tint = 16755200;
    });
    this.nameText.on("mousedown", () => {
      this.clanPropSort = "name";
      this.clanPropDir[this.clanPropSort] *= -1;
      this.sortClans(this.clanPropSort, this.clanPropDir[this.clanPropSort]);
      AudioEffects.ButtonClick.audio.play();
    });
    this.membersText = new PIXI.Text("Members", FontStyle.SmallClanBrowserText);
    this.membersText.x = this.ox + 220;
    this.membersText.y = this.oy + 109;
    this.membersText.tint = 16755200;
    this.membersText.resolution = 2;
    this.membersText.interactive = !0;
    this.membersText.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.membersText.width,
      this.membersText.height
    );
    this.container.addChild(this.membersText);
    this.membersText.on("mouseover", () => {
      this.membersText.tint = 16776960;
    });
    this.membersText.on("mouseout", () => {
      this.membersText.tint = 16755200;
    });
    this.membersText.on("mousedown", () => {
      this.clanPropSort = "members";
      this.clanPropDir[this.clanPropSort] *= -1;
      this.sortClans(this.clanPropSort, this.clanPropDir[this.clanPropSort]);
      AudioEffects.ButtonClick.audio.play();
    });
    this.skillRankingText = new PIXI.Text("Avg. skill", FontStyle.SmallClanBrowserText);
    this.skillRankingText.x = this.ox + 340;
    this.skillRankingText.y = this.oy + 109;
    this.skillRankingText.tint = 16755200;
    this.skillRankingText.resolution = 2;
    this.skillRankingText.interactive = !0;
    this.skillRankingText.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.skillRankingText.width,
      this.skillRankingText.height
    );
    this.container.addChild(this.skillRankingText);
    this.skillRankingText.on("mouseover", () => {
      this.skillRankingText.tint = 16776960;
    });
    this.skillRankingText.on("mouseout", () => {
      this.skillRankingText.tint = 16755200;
    });
    this.skillRankingText.on("mousedown", () => {
      this.clanPropSort = "skill";
      this.clanPropDir[this.clanPropSort] *= -1;
      this.sortClans(this.clanPropSort, this.clanPropDir[this.clanPropSort]);
      AudioEffects.ButtonClick.audio.play();
    });
    this.experienceRankingText = new PIXI.Text("Avg. experience", FontStyle.SmallClanBrowserText);
    this.experienceRankingText.x = this.ox + 440;
    this.experienceRankingText.y = this.oy + 109;
    this.experienceRankingText.tint = 16755200;
    this.experienceRankingText.resolution = 2;
    this.experienceRankingText.interactive = !0;
    this.experienceRankingText.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.experienceRankingText.width,
      this.experienceRankingText.height
    );
    this.container.addChild(this.experienceRankingText);
    this.experienceRankingText.on("mouseover", () => {
      this.experienceRankingText.tint = 16776960;
    });
    this.experienceRankingText.on("mouseout", () => {
      this.experienceRankingText.tint = 16755200;
    });
    this.experienceRankingText.on("mousedown", () => {
      this.clanPropSort = "experience";
      this.clanPropDir[this.clanPropSort] *= -1;
      this.sortClans(this.clanPropSort, this.clanPropDir[this.clanPropSort]);
      AudioEffects.ButtonClick.audio.play();
    });
    this.nameFieldTableContainerMask = new PIXI.Graphics();
    this.nameFieldTableContainerMask.beginFill(16777215, 1);
    this.nameFieldTableContainerMask.drawRect(-10, 150, 640, 390);
    this.nameFieldTableContainerMask.endFill();
    this.nameFieldTableContainerMask.x = 10;
    this.container.addChild(this.nameFieldTableContainerMask);
    this.nameFieldTableContainer = new PIXI.Container();
    this.nameFieldTableContainer.x = 10;
    this.nameFieldTableContainer.mask = this.nameFieldTableContainerMask;
    this.container.addChild(this.nameFieldTableContainer);
    this.nameFieldScrollbar = new ClanBrowserScrollbar(404);
    this.nameFieldScrollbar.x = 625;
    this.nameFieldScrollbar.y = 150;
    this.container.addChild(this.nameFieldScrollbar);
    this.nameFieldScrollbar.on(ClanBrowserScrollbar.SCROLL, (a) => {
      this.nameFieldTableContainer.height > this.nameFieldTableContainerMask.height &&
        (this.nameFieldTableContainer.y = -(
          a *
          (this.nameFieldTableContainer.height - this.nameFieldTableContainerMask.height)
        ));
    });
  }
  show() {
    super.show();
    let a = Date.now();
    6e4 < a - this.lastRefresh && ((this.lastRefresh = a), this.onSearch(!1));
    this.nameFieldScrollbar.enableWheel();
  }
  hide() {
    this.nameFieldScrollbar.disableWheel();
  }
  onSearch(a = !0) {
    this.nameFieldTableContainer.removeChildren();
    this.loaderText.visible = !0;
    null !== this.searchTimeout && clearTimeout(this.searchTimeout);
    this.loaderText.text = "Searching..";
    a ? (this.searchTimeout = setTimeout(async () => this.search(), 750)) : this.search();
  }
  async search() {
    this.clans = [];
    var a = this.searchValue;
    null !== this.searchTimeout && (clearTimeout(this.searchTimeout), (this.searchTimeout = null));
    0 === a.trim().length && (a = "*");
    a = await APIClient.getClanSearch(a);
    if (a.success) {
      0 === a.clans.length
        ? (this.loaderText.text = "No results.")
        : (this.loaderText.visible = !1);
      this.clans = a.clans;
      for (let b = 0; b < a.clans.length; b++) {
        const c = a.clans[b],
          d = new ClanTableRow(b, c.id, c.name, c.members, c.skill, c.experience, c.level);
        d.x = this.ox + 20;
        d.y = this.oy + 36 * b + 130;
        d.on("mousedown", () => {
          this.emit(Layer.Events.CLAN_ACCESS, c.id);
          AudioEffects.ButtonClick.audio.play();
        });
        c.row = d;
        this.nameFieldTableContainer.addChild(d);
      }
      this.sortClans(this.clanPropSort, this.clanPropDir[this.clanPropSort]);
      this.nameFieldScrollbar.reset();
      this.nameFieldTableContainer.y = 0;
    } else this.loaderText.text = "No results (error).";
  }
  sortClans(a, b = 1) {
    "name" === a
      ? this.clans.sort((c, d) =>
          c[a].toLowerCase() < d[a].toLowerCase()
            ? -b
            : c[a].toLowerCase() > d[a].toLowerCase()
            ? b
            : 0
        )
      : this.clans.sort((c, d) =>
          parseInt(c[a]) < parseInt(d[a]) ? -b : parseInt(c[a]) > parseInt(d[a]) ? b : 0
        );
    for (let c = 0; c < this.clans.length; c++)
      (this.clans[c].row.y = this.oy + 36 * c + 130), this.clans[c].row.setIndex(c);
  }
}
export class ClanTableRow extends PIXI.Container {
  constructor(a, b, c, d, e, f, g) {
    super();
    this.index = a;
    this.interactive = !0;
    b = Math.max(Math.floor((parseInt(g) / 240) * 15) + 1);
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.1);
    this.background.drawRect(-10, 2, 560, 32);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    });
    this.addChild(this.background);
    this.setIndex(a);
    this.icon = new PIXI.Sprite(App.CombinedTextures["skill_icon_" + b]);
    this.icon.x = -48;
    this.icon.y = -2;
    this.icon.scale.x = this.icon.scale.y = 0.5;
    this.addChild(this.icon);
    this.nameText = new PIXI.Text(c, FontStyle.RankingItem);
    this.nameText.x = 0;
    this.nameText.y = 9;
    this.nameText.tint = 16763904;
    this.nameText.hitArea = new PIXI.Rectangle();
    this.nameText.resolution = 2;
    this.addChild(this.nameText);
    this.membersText = new PIXI.Text(numberWithPeriods(parseInt(d)), FontStyle.RankingItem);
    this.membersText.x = 195;
    this.membersText.y = 9;
    this.membersText.hitArea = new PIXI.Rectangle();
    this.membersText.resolution = 2;
    this.addChild(this.membersText);
    this.skillText = new PIXI.Text(numberWithPeriods(parseInt(e)), FontStyle.RankingItem);
    this.skillText.x = 315;
    this.skillText.y = 9;
    this.skillText.hitArea = new PIXI.Rectangle();
    this.skillText.resolution = 2;
    this.addChild(this.skillText);
    this.experienceText = new PIXI.Text(numberWithPeriods(parseInt(f)), FontStyle.RankingItem);
    this.experienceText.x = 415;
    this.experienceText.y = 9;
    this.experienceText.hitArea = new PIXI.Rectangle();
    this.experienceText.resolution = 2;
    this.addChild(this.experienceText);
  }
  setIndex(a = -1) {
    -1 !== a && (this.index = a);
    this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
  }
}
export class ClanBrowserScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      -3 > b ? (b = -3) : b > this.h - 39 && (b = this.h - 39);
      let c = this.h / (this.h - 39);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(ClanBrowserScrollbar.SCROLL, (1 / this.h) * (b + 3) * c);
    }
  }
  reset() {
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
ClanBrowserScrollbar.SCROLL = "scroll";
var button = {};
export class Button extends PIXI.Graphics {
  constructor(a, b = null, c = null, d = null) {
    super();
    EventDispatcher.call(this);
    this.id = a || "button";
    this.value = "";
    this.interactive = this.enabled = !0;
    this.pressed = !1;
    this.clickInterval = d;
    this.hoverImage = this.image = this.clickTimeout = null;
    null !== b && ((this.image = new PIXI.Sprite(b)), this.addChild(this.image));
    null !== c &&
      ((this.hoverImage = new PIXI.Sprite(c)),
      (this.hoverImage.visible = !1),
      this.addChild(this.hoverImage));
    this.edge = new PIXI.Graphics();
    this.on("mousedown", (e) => this.onMouseDown(e));
    this.on("mouseup", (e) => this.onMouseUp(e));
    this.on("mouseover", () => this.onMouseOver());
    this.on("mouseout", () => this.onMouseOut());
    this.on("touchstart", (e) => this.onMouseDown(e));
    this.on("pointerup", (e) => this.onMouseUp(e));
  }
  setText(a, b, c) {
    this.text ? (this.text.text = a) : (this.text = new PIXI.Text(a, FontStyle.ButtonTitle));
    this.text.resolution = 2;
    this.addChild(this.text);
    this.text.x = b || 0;
    this.text.y = c || 5;
    this.draw();
  }
  redraw() {}
  draw() {
    this.image ||
      (this.clear(),
      this.lineStyle(3, 16777215, 0.2, 1),
      this.beginFill(11184810, 0.3),
      this.drawRect(-10, 0, this.text.width + 21, 36, 6),
      this.endFill(),
      this.edge.clear(),
      this.edge.lineStyle(3, 16777215, 0.4, 1),
      this.edge.drawRect(-10, 0, this.text.width + 21, 36, 6));
  }
  withinClickInterval() {
    if (null === this.clickInterval) return !1;
    if (null !== this.clickTimeout) return !0;
    this.clickTimeout = setTimeout(() => {
      this.clickTimeout = null;
      this.enable();
    }, this.clickInterval);
    this.disable();
    return !1;
  }
  onMouseDown(a) {
    a.stopPropagation();
    this.interactive &&
      !this.pressed &&
      (this.dispatchEvent(new CustomEvent(Button.BUTTON_PRESSED, { id: this.id })),
      (this.pressed = !0),
      AudioEffects.ButtonClick.audio.play());
  }
  onMouseUp(a) {
    a.stopPropagation();
    this.interactive &&
      !this.withinClickInterval() &&
      this.pressed &&
      (this.dispatchEvent(new CustomEvent(Button.BUTTON_RELEASED, { id: this.id })),
      (this.pressed = !1));
  }
  onMouseOver() {
    this.interactive &&
      (this.edge.parent || this.addChild(this.edge),
      AudioEffects.ButtonHover.audio.play(),
      this.image && this.hoverImage && ((this.image.visible = !1), (this.hoverImage.visible = !0)));
  }
  onMouseOut() {
    this.interactive &&
      (this.edge.parent && this.removeChild(this.edge),
      this.image && this.hoverImage && ((this.image.visible = !0), (this.hoverImage.visible = !1)));
  }
  disable() {
    this.alpha = 0.5;
    this.enabled = this.interactive = !1;
  }
  enable() {
    this.alpha = 1;
    this.enabled = this.interactive = !0;
  }
  setValue(a) {
    this.value = a;
  }
  setSize(a, b) {
    this.text.x = 0.25 * (a - this.text.width);
    this.text.y = 0.24 * (b - this.text.height);
  }
  setTint(a) {
    this.tint = a;
    this.text && (this.text.tint = a);
    this.image ||
      (this.edge.clear(),
      this.edge.lineStyle(3, this.tint, 0.4, 1),
      this.edge.drawRect(-10, 0, this.text.width + 21, 36, 6));
  }
}
Button.BUTTON_PRESSED = buttonPressed;
Button.BUTTON_RELEASED = buttonReleased;
var loginmenu = {};
export class LoginMenu extends Feature {
  constructor() {
    super();
    this.storeCredentialFlag = !0;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.background.beginFill(0, 0.3);
    this.background.drawRect(130, 53, 400, 451);
    this.background.endFill();
    this.container.addChild(this.background);
    this.ox = 160;
    this.oy = 40;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 14;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.LOGIN_CANCEL));
    this.container.addChild(this.closeButton);
    this.loginTitle = new PIXI.Text("Login", FontStyle.MediumOrangeText);
    this.loginTitle.x = 0.5 * this.width - 0.5 * this.loginTitle.width;
    this.loginTitle.y = this.oy + 16;
    this.loginTitle.resolution = 2;
    this.container.addChild(this.loginTitle);
    this.usernameTitle = new PIXI.Text("Username", FontStyle.SmallMenuTextOrange4);
    this.usernameTitle.x = this.ox;
    this.usernameTitle.y = this.oy + 80;
    this.usernameTitle.resolution = 2;
    this.container.addChild(this.usernameTitle);
    this.passwordTitle = new PIXI.Text("Password", FontStyle.SmallMenuTextOrange4);
    this.passwordTitle.x = this.ox;
    this.passwordTitle.y = this.oy + 140;
    this.passwordTitle.resolution = 2;
    this.container.addChild(this.passwordTitle);
    this.errorMessage = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 19,
      fill: 16711680,
      strokeThickness: 3,
      lineJoin: "round",
      wordWrap: !0,
      wordWrapWidth: 360,
    });
    this.errorMessage.x = this.ox;
    this.errorMessage.y = this.oy + 280;
    this.errorMessage.resolution = 2;
    this.recoverTitle = new PIXI.Text("Recover username / password", {
      fontName: "Arial",
      fontSize: 17,
      fill: 16777215,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.recoverTitle.x = this.ox;
    this.recoverTitle.y = this.oy + 480;
    this.recoverTitle.resolution = 2;
    this.recoverTitle.tint = 16746496;
    App.WhiteLabel !== App.WhiteLabel_POKI && this.container.addChild(this.recoverTitle);
    this.recoverTitle.interactive = !0;
    this.recoverTitle.hitArea = this.recoverTitle.getLocalBounds();
    this.recoverTitle.on("mousedown", () => {
      this.recoverTitle.tint = 16746496;
      this.emit(Layer.Events.RECOVER_ACCESS);
    });
    this.recoverTitle.on("mouseover", () => (this.recoverTitle.tint = 16763904));
    this.recoverTitle.on("mouseout", () => (this.recoverTitle.tint = 16746496));
    this.nameField = new InputField("login_name");
    this.nameField.setDimensions(300, 35);
    this.nameField.forceLowerCase = !1;
    this.nameField.setMaxChars(18);
    this.nameField.x = this.ox;
    this.nameField.y = this.oy + 100;
    this.nameField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#^&*-._:=[]"
    );
    this.container.addChild(this.nameField);
    this.passwordField = new InputField("login_password");
    this.passwordField.setDimensions(300, 35);
    this.passwordField.forceLowerCase = !1;
    this.passwordField.setMaxChars(32);
    this.passwordField.setPassword(!0);
    this.passwordField.x = this.ox;
    this.passwordField.y = this.oy + 160;
    this.passwordField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.@!#$%^&*()[]"
    );
    this.container.addChild(this.passwordField);
    this.storeCredential = new Checkbox("storeCredential", "Stay logged in", !0);
    this.storeCredential.x = this.ox;
    this.storeCredential.y = this.oy + 204;
    this.storeCredential.setChecked(this.storeCredentialFlag);
    this.storeCredential.on(Checkbox.CHANGE, (a) => (this.storeCredentialFlag = a));
    this.container.addChild(this.storeCredential);
    this.submitButton = new Button("login");
    this.submitButton.selected = !0;
    this.submitButton.setText("Login");
    this.submitButton.scale.x = this.submitButton.scale.y = 0.8;
    this.submitButton.addListener(Button.BUTTON_RELEASED, this.onSubmitButtonReleased.bind(this));
    this.submitButton.x = this.ox + 11;
    this.submitButton.y = this.oy + 244;
    this.submitButton.setTint(16763904);
    this.container.addChild(this.submitButton);
    this.loadingContainer = new PIXI.Container();
    this.loadingBackground = new PIXI.Graphics();
    this.loadingBackground.x = 0;
    this.loadingBackground.y = 0;
    this.loadingBackground.lineStyle(3, 11184810, 0.5, 0);
    this.loadingBackground.beginFill(0, 0.8);
    this.loadingBackground.drawRoundedRect(0, 0, 300, 80, 10);
    this.loadingBackground.endFill();
    this.loadingContainer.addChild(this.loadingBackground);
    this.loadingText = new PIXI.Text("Processing login...", FontStyle.MediumOrangeText);
    this.loadingText.x = 0.5 * this.loadingBackground.width;
    this.loadingText.y = 0.5 * this.loadingBackground.height;
    this.loadingText.anchor.x = this.loadingText.anchor.y = 0.5;
    this.loadingText.resolution = 2;
    this.loadingContainer.addChild(this.loadingText);
    this.loadingContainer.x = 0.5 * -this.loadingBackground.width;
    this.loadingContainer.y = 0.5 * this.container.height - 0.5 * this.loadingBackground.height;
    this.completedContainer = new PIXI.Container();
    this.completedBackground = new PIXI.Graphics();
    this.completedBackground.x = 0;
    this.completedBackground.y = 0;
    this.completedBackground.lineStyle(3, 11184810, 0.5, 0);
    this.completedBackground.beginFill(0, 0.8);
    this.completedBackground.drawRoundedRect(0, 0, 360, 130, 10);
    this.completedBackground.endFill();
    this.completedContainer.addChild(this.completedBackground);
    this.completedText = new PIXI.Text("", FontStyle.MediumOrangeText);
    this.completedText.x = 0.5 * this.completedBackground.width;
    this.completedText.y = 0.3 * this.completedBackground.height;
    this.completedText.anchor.x = this.completedText.anchor.y = 0.5;
    this.completedText.resolution = 2;
    this.completedContainer.addChild(this.completedText);
    this.completedButton = new Button("continue");
    this.completedButton.selected = !0;
    this.completedButton.setText("Continue");
    this.completedButton.scale.x = this.completedButton.scale.y = 0.8;
    this.completedButton.addListener(
      Button.BUTTON_RELEASED,
      this.onCompletedButtonReleased.bind(this)
    );
    this.completedButton.x =
      0.5 * this.completedBackground.width - 0.5 * this.completedButton.width;
    this.completedButton.y = this.completedBackground.height - (this.completedButton.height + 16);
    this.completedContainer.addChild(this.completedButton);
    this.completedContainer.x = 0.5 * -this.completedBackground.width;
    this.completedContainer.y = 0.5 * this.container.height - 0.5 * this.completedBackground.height;
    this.container.x = 0.5 * -this.width;
  }
  show() {
    this.container.interactiveChildren = !0;
    this.submitButton.enable();
    this.container.alpha = 1;
  }
  reset() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.completedContainer.parent && this.removeChild(this.completedContainer);
    this.passwordField.setText("");
    this.container.interactiveChildren = !0;
    this.submitButton.enable();
    this.container.alpha = 1;
  }
  validateForm() {
    let a = !0,
      b = "",
      c = this.nameField.getText(),
      d = this.passwordField.getText();
    4 > c.length
      ? ((a = !1), (b = "Invalid username."), this.nameField.markInvalid())
      : this.nameField.markNone();
    a && 8 > d.length
      ? ((a = !1), (b = "Invalid password."), this.passwordField.markInvalid())
      : this.passwordField.markNone();
    return { valid: a, error: b };
  }
  onSubmitButtonReleased() {
    const a = this.validateForm();
    a.valid
      ? (this.displayErrorMessage(""),
        this.displayLoadingMessage(),
        this.emit(Layer.Events.LOGIN_SUBMIT, {
          name: this.nameField.text.text,
          password: this.passwordField.text.text,
          store: this.storeCredentialFlag,
        }))
      : this.displayErrorMessage(a.error);
  }
  displayLoadingMessage() {
    this.container.interactiveChildren = !1;
    this.addChild(this.loadingContainer);
    this.submitButton.disable();
    this.container.alpha = 0.5;
  }
  displayCompletedMessage() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.container.interactiveChildren = !1;
    this.addChild(this.completedContainer);
    this.submitButton.disable();
    this.container.alpha = 0.5;
    this.completedText.text = "Logged in as " + this.nameField.getText();
  }
  onCompletedButtonReleased() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.completedContainer.parent && this.removeChild(this.completedContainer);
    this.passwordField.setText("");
    this.emit(Layer.Events.LOGIN_CANCEL);
  }
  onCancelButtonReleased() {
    this.emit(Layer.Events.LOGIN_CANCEL);
  }
  displayErrorMessage(a) {
    this.errorMessage.text = a;
    this.errorMessage.parent || this.container.addChild(this.errorMessage);
  }
}
var checkbox = {};
export class Checkbox extends PIXI.Container {
  constructor(id, label, checked) {
    super();
    this.id = id;
    this.labelText = label;
    this.checked = checked || !1;
    this.tex_unchecked = App.CombinedTextures.checkbox;
    this.tex_checked = App.CombinedTextures.checkbox_checked;
    this.icon = new PIXI.Sprite(this.checked ? this.tex_checked : this.tex_unchecked);
    this.icon.scale.x = this.icon.scale.y = 0.4;
    this.interactive = !0;
    this.label = new PIXI.Text(this.labelText, {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 16,
      fill: 16763904,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.label.x = this.icon.x + 34;
    this.label.y = this.icon.y + 3;
    this.label.resolution = 2;
    this.pointerDownListener = this.mouseDownListener = null;
    this.addChild(this.icon);
    this.addChild(this.label);
    this.setEnabled(!0);
  }
  onMouseDown(a) {
    this.checked = !this.checked;
    this.icon.texture = this.checked ? this.tex_checked : this.tex_unchecked;
    this.emit(Checkbox.CHANGE, this.checked);
    AudioEffects.ButtonClick.audio.play();
  }
  setChecked(a, b = !0) {
    this.checked = a;
    this.icon.texture = this.checked ? this.tex_checked : this.tex_unchecked;
    b && this.emit(Checkbox.CHANGE, this.checked);
  }
  setEnabled(a) {
    a
      ? (null === this.mouseDownListener &&
          ((this.mouseDownListener = this.onMouseDown.bind(this)),
          this.on("mousedown", this.mouseDownListener),
          (this.pointerDownListener = this.onMouseDown.bind(this)),
          this.on("touchstart", this.pointerDownListener)),
        (this.alpha = 1))
      : (null !== this.mouseDownListener &&
          (this.removeListener("mousedown", this.mouseDownListener),
          (this.mouseDownListener = null),
          this.removeListener("touchstart", this.pointerDownListener),
          (this.pointerDownListener = null)),
        (this.alpha = 0.25));
  }
  setTint(a) {
    this.label.tint = a;
  }
}
Checkbox.CHANGE = "checkbox_change";
var registermenu = {};
export class RegisterMenu extends Feature {
  constructor() {
    super();
    let a = App.WhiteLabel === App.WhiteLabel_POKI ? -96 : 0;
    this.challengeTexture = null;
    this.hasVerifiedEmail = !1;
    this.emailDisabled = !0;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.background.beginFill(0, 0.3);
    this.background.drawRect(100, 53, 460, 451);
    this.background.endFill();
    this.container.addChild(this.background);
    this.ox = 130;
    this.oy = 40;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 14;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.REGISTER_CANCEL));
    this.container.addChild(this.closeButton);
    this.registerTitle = new PIXI.Text("Register", FontStyle.MediumOrangeText);
    this.registerTitle.x = 0.5 * this.width - 0.5 * this.registerTitle.width;
    this.registerTitle.y = this.oy + 16;
    this.registerTitle.resolution = 2;
    this.container.addChild(this.registerTitle);
    this.emailCheck = new Checkbox("email_check", "Register without email", !0);
    this.emailCheck.x = this.ox;
    this.emailCheck.y = this.oy + 84;
    this.emailCheck.setChecked(!0);
    this.emailCheck.on(Checkbox.CHANGE, (b) => {
      this.emailTitle.alpha = b ? 0.3 : 1;
      this.emailField.alpha = b ? 0.3 : 1;
      this.emailField.interactive = b ? !1 : !0;
      this.emailDisabled = b;
    });
    this.emailTitle = new PIXI.Text("Email", FontStyle.SmallMenuTextOrange4);
    this.emailTitle.x = this.ox;
    this.emailTitle.y = this.oy + 118;
    this.emailTitle.resolution = 2;
    App.WhiteLabel !== App.WhiteLabel_POKI &&
      (this.container.addChild(this.emailCheck), this.container.addChild(this.emailTitle));
    this.usernameTitle = new PIXI.Text("Username", FontStyle.SmallMenuTextOrange4);
    this.usernameTitle.x = this.ox;
    this.usernameTitle.y = this.oy + 180 + a;
    this.usernameTitle.resolution = 2;
    this.container.addChild(this.usernameTitle);
    this.passwordTitle = new PIXI.Text("Password", FontStyle.SmallMenuTextOrange4);
    this.passwordTitle.x = this.ox;
    this.passwordTitle.y = this.oy + 240 + a;
    this.passwordTitle.resolution = 2;
    this.container.addChild(this.passwordTitle);
    this.errorMessage = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 16,
      fill: 16711680,
      strokeThickness: 2,
      lineJoin: "round",
      wordWrap: !0,
      wordWrapWidth: 380,
    });
    this.errorMessage.x = this.ox;
    this.errorMessage.y = this.oy + 350 + a;
    this.emailField = new InputField("register_email");
    this.emailField.setDimensions(300, 35);
    this.emailField.forceLowerCase = !1;
    this.emailField.setMaxChars(64);
    this.emailField.x = this.ox;
    this.emailField.y = this.oy + 140 + a;
    this.emailField.alpha = 0.3;
    this.emailField.interactive = !1;
    this.emailField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@.+_-"
    );
    App.WhiteLabel !== App.WhiteLabel_POKI && this.container.addChild(this.emailField);
    this.nameField = new InputField("register_name");
    this.nameField.setDimensions(300, 35);
    this.nameField.forceLowerCase = !1;
    this.nameField.setMaxChars(18);
    this.nameField.x = this.ox;
    this.nameField.y = this.oy + 200 + a;
    this.nameField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-().[]!"
    );
    this.container.addChild(this.nameField);
    this.passwordField = new InputField("register_password");
    this.passwordField.setDimensions(300, 35);
    this.passwordField.forceLowerCase = !1;
    this.passwordField.setMaxChars(32);
    this.passwordField.setPassword(!0);
    this.passwordField.x = this.ox;
    this.passwordField.y = this.oy + 260 + a;
    this.passwordField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.@!#$%^&*()[]"
    );
    this.container.addChild(this.passwordField);
    this.submitButton = new Button("register");
    this.submitButton.selected = !0;
    this.submitButton.setText("Register");
    this.submitButton.scale.x = this.submitButton.scale.y = 0.8;
    this.submitButton.addListener(Button.BUTTON_RELEASED, this.onSubmitButtonReleased.bind(this));
    this.submitButton.x = this.ox + 11;
    this.submitButton.y = this.oy + 314 + a;
    this.submitButton.setTint(16763904);
    this.container.addChild(this.submitButton);
    this.loadingContainer = new PIXI.Container();
    this.loadingBackground = new PIXI.Graphics();
    this.loadingBackground.x = 0;
    this.loadingBackground.y = 0;
    this.loadingBackground.lineStyle(3, 11184810, 0.5, 0);
    this.loadingBackground.beginFill(0, 0.8);
    this.loadingBackground.drawRoundedRect(0, 0, 300, 80, 10);
    this.loadingBackground.endFill();
    this.loadingContainer.addChild(this.loadingBackground);
    this.loadingText = new PIXI.BitmapText("Processing registration...", {
      fontName: "Open Sans",
      fontSize: 26,
      align: "left",
    });
    this.loadingText.x = 0.5 * this.loadingBackground.width;
    this.loadingText.y = 0.5 * this.loadingBackground.height;
    this.loadingText.tint = 16763904;
    this.loadingText.anchor.x = this.loadingText.anchor.y = 0.5;
    this.loadingContainer.addChild(this.loadingText);
    this.loadingContainer.x = 0.5 * -this.loadingBackground.width;
    this.loadingContainer.y = 0.5 * this.container.height - 0.5 * this.loadingBackground.height;
    this.emailVerificationContainer = new PIXI.Container();
    this.emailVerificationBackground = new PIXI.Graphics();
    this.emailVerificationBackground.x = 0;
    this.emailVerificationBackground.y = 0;
    this.emailVerificationBackground.lineStyle(3, 11184810, 0.5, 0);
    this.emailVerificationBackground.beginFill(0, 0.8);
    this.emailVerificationBackground.drawRoundedRect(0, 0, 440, 240, 10);
    this.emailVerificationBackground.endFill();
    this.emailVerificationContainer.addChild(this.emailVerificationBackground);
    this.emailVerificationContainer.x = 0.5 * -this.emailVerificationContainer.width;
    this.emailVerificationContainer.y =
      0.5 * this.container.height - 0.5 * this.emailVerificationContainer.height;
    this.emailVerificationText = new PIXI.BitmapText("Verify email address", {
      fontName: "Open Sans",
      fontSize: 26,
      align: "center",
      multiline: !0,
    });
    this.emailVerificationText.x = 0.5 * this.emailVerificationContainer.width;
    this.emailVerificationText.y = 40;
    this.emailVerificationText.tint = 16763904;
    this.emailVerificationText.anchor.x = this.emailVerificationText.anchor.y = 0.5;
    this.emailVerificationContainer.addChild(this.emailVerificationText);
    this.emailVerificationWarning = new PIXI.BitmapText(
      "Enter your email address again to verify",
      { fontName: "Open Sans", fontSize: 22, align: "left" }
    );
    this.emailVerificationWarning.x = 0.5 * this.emailVerificationContainer.width;
    this.emailVerificationWarning.y = 66;
    this.emailVerificationWarning.tint = 16733440;
    this.emailVerificationWarning.anchor.x = this.emailVerificationText.anchor.y = 0.5;
    this.emailVerificationContainer.addChild(this.emailVerificationWarning);
    this.emailVerificationField = new InputField("verify_email");
    this.emailVerificationField.setDimensions(380, 35);
    this.emailVerificationField.forceLowerCase = !1;
    this.emailVerificationField.setMaxChars(64);
    this.emailVerificationField.x =
      0.5 * (this.emailVerificationContainer.width - this.emailVerificationField.width);
    this.emailVerificationField.y = 90;
    this.emailVerificationField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@.+_-"
    );
    this.emailVerificationContainer.addChild(this.emailVerificationField);
    this.verifyBox = new Checkbox("verify", "", !0);
    this.verifyBox.x = 28;
    this.verifyBox.y = 140;
    this.verifyBox.setChecked(this.hasVerifiedEmail);
    this.verifyBox.on(Checkbox.CHANGE, (b) => (this.hasVerifiedEmail = b));
    this.emailVerificationContainer.addChild(this.verifyBox);
    this.verificationBoxWarning = new PIXI.BitmapText(
      "Verify that you own this email address.\nYou cannot access this account without it.",
      { fontName: "Open Sans", fontSize: 22, align: "left" }
    );
    this.verificationBoxWarning.x = 60;
    this.verificationBoxWarning.y = this.verifyBox.y - 6;
    this.verificationBoxWarning.tint = 16776960;
    this.verificationBoxWarning.anchor.x = this.verificationBoxWarning.anchor.y = 0;
    this.emailVerificationContainer.addChild(this.verificationBoxWarning);
    this.emailVerificationButton = new Button("verify_email");
    this.emailVerificationButton.selected = !0;
    this.emailVerificationButton.setText("Verify");
    this.emailVerificationButton.scale.x = this.emailVerificationButton.scale.y = 0.6;
    this.emailVerificationButton.addListener(
      Button.BUTTON_RELEASED,
      this.onEmailVerificationButtonReleased.bind(this)
    );
    this.emailVerificationButton.x =
      0.5 * (this.emailVerificationContainer.width - this.emailVerificationButton.width) - 50;
    this.emailVerificationButton.y = 190;
    this.emailVerificationContainer.addChild(this.emailVerificationButton);
    this.emailVerificationCancelButton = new Button("verify_cancel_email");
    this.emailVerificationCancelButton.selected = !1;
    this.emailVerificationCancelButton.setText("Cancel");
    this.emailVerificationCancelButton.scale.x = this.emailVerificationCancelButton.scale.y = 0.6;
    this.emailVerificationCancelButton.addListener(
      Button.BUTTON_RELEASED,
      this.onCancelEmailVerificationButtonReleased.bind(this)
    );
    this.emailVerificationCancelButton.x =
      0.5 * (this.emailVerificationContainer.width - this.emailVerificationCancelButton.width) + 50;
    this.emailVerificationCancelButton.y = 190;
    this.emailVerificationContainer.addChild(this.emailVerificationCancelButton);
    this.completedContainer = new PIXI.Container();
    this.completedBackground = new PIXI.Graphics();
    this.completedBackground.x = 0;
    this.completedBackground.y = 0;
    this.completedBackground.lineStyle(3, 11184810, 0.5, 0);
    this.completedBackground.beginFill(0, 0.8);
    this.completedBackground.drawRoundedRect(0, 0, 400, 280, 10);
    this.completedBackground.endFill();
    this.completedContainer.addChild(this.completedBackground);
    this.completedText = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 26,
      align: "center",
      multiline: !0,
    });
    this.completedText.x = 0.5 * this.completedBackground.width;
    this.completedText.y = 0.35 * this.completedBackground.height;
    this.completedText.tint = 16763904;
    this.completedText.anchor.x = this.completedText.anchor.y = 0.5;
    this.completedContainer.addChild(this.completedText);
    this.completedButton = new Button("continue");
    this.completedButton.selected = !0;
    this.completedButton.setText("Continue");
    this.completedButton.scale.x = this.completedButton.scale.y = 0.6;
    this.completedButton.addListener(
      Button.BUTTON_RELEASED,
      this.onCompletedButtonReleased.bind(this)
    );
    this.completedButton.x =
      0.5 * this.completedBackground.width - 0.5 * this.completedButton.width;
    this.completedButton.y = this.completedBackground.height - (this.completedButton.height + 16);
    this.completedContainer.addChild(this.completedButton);
    this.completedContainer.x = 0.5 * -this.completedBackground.width;
    this.completedContainer.y = 0.5 * this.container.height - 0.5 * this.completedBackground.height;
    this.container.x = 0.5 * -this.width;
  }
  validateForm() {
    let a = !0,
      b = "";
    const c = this.emailField.getText(),
      d = this.nameField.getText(),
      e = this.passwordField.getText();
    if (!this.emailDisabled)
      if (
        (a &&
          (3 > c.length ||
            !c.match(
              /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/g
            ))) ||
        -1 !== c.indexOf("@gmai.") ||
        -1 !== c.indexOf("@gamil.") ||
        -1 !== c.indexOf("@gmial.") ||
        -1 !== c.indexOf("@gail.") ||
        -1 !== c.indexOf("@gmali.") ||
        -1 !== c.indexOf("@mgail.") ||
        ".ed" === c.substr(-3) ||
        "ocm" === c.substr(-3) ||
        "cmo" === c.substr(-3) ||
        -1 !== c.indexOf("@gnail.") ||
        -1 !== c.indexOf(".gmail.") ||
        -1 !== c.indexOf("@hayoo") ||
        -1 !== c.indexOf("gmail.com.") ||
        -1 !== c.indexOf("@gmail.org") ||
        (-1 !== c.indexOf("@gmail.") && "com" !== c.substr(-3)) ||
        -1 !== c.indexOf("@youtube.com") ||
        -1 !== c.indexOf("@example.com") ||
        -1 !== c.indexOf("@example.org")
      )
        (b = "Invalid email address."), (a = !1), this.emailField.markInvalid();
      else {
        let f = !1;
        for (let g = 0; g < RegisterMenu.EmailWhitelist.length; g++)
          if (-1 !== c.indexOf(RegisterMenu.EmailWhitelist[g])) {
            f = !0;
            break;
          }
        f
          ? this.emailField.markValid()
          : ((b =
              "This email provider is not supported.\nPlease use Gmail or another major email provider."),
            (a = !1),
            this.emailField.markInvalid());
      }
    a && 4 > d.length
      ? ((b = "Username is too short."), (a = !1), this.nameField.markInvalid())
      : a && this.nameField.markValid();
    a && 8 > e.length
      ? (this.passwordField.setText(""),
        (b = "Password must be at least 8 characters long."),
        (a = !1),
        this.passwordField.markInvalid())
      : a && this.passwordField.markValid();
    a && this.passwordField.markValid();
    return { valid: a, error: b };
  }
  onSubmitButtonReleased() {
    const a = this.validateForm();
    a.valid
      ? (this.displayErrorMessage(""),
        this.emailDisabled
          ? this.submitForm("", this.nameField.getText(), this.passwordField.getText())
          : this.displayEmailVerification())
      : (this.nameField.markInvalid(), this.displayErrorMessage(a.error));
  }
  reset() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.completedContainer.parent && this.removeChild(this.completedContainer);
    this.container.interactiveChildren = !0;
    this.submitButton.enable();
    this.container.alpha = 1;
    this.hasVerifiedEmail = !1;
    this.verifyBox.setChecked(!1);
    this.verificationBoxWarning.tint = 16776960;
    this.emailField.markNone();
    this.nameField.markNone();
    this.passwordField.markNone();
  }
  show() {}
  hide() {}
  resetRobotChallenge() {
    this.challengeTexture && PIXI.Texture.removeFromCache(this.challengeTexture);
    this.challengeTexture = PIXI.Texture.from(
      APIClient.ChallengeURL + "?cache_id=" + Math.random()
    );
    this.robotChallenge.texture = this.challengeTexture;
  }
  onCancelButtonReleased() {
    this.submitButton.enable();
    this.emit(Layer.Events.REGISTER_CANCEL);
  }
  onCompletedButtonReleased() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.completedContainer.parent && this.removeChild(this.completedContainer);
    this.emit(Layer.Events.REGISTER_CANCEL);
  }
  onCancelEmailVerificationButtonReleased() {
    this.emailField.setText("");
    this.emailVerificationField.setText("");
    this.emailField.visible = !0;
    this.hasVerifiedEmail = !1;
    this.verifyBox.setChecked(!1);
    this.emailVerificationContainer.parent && this.removeChild(this.emailVerificationContainer);
    this.reset();
  }
  onEmailVerificationButtonReleased() {
    this.hasVerifiedEmail = !1;
    if (this.verifyBox.checked) {
      this.emailField.visible = !0;
      var a = this.emailField.getText().toLowerCase(),
        b = this.emailVerificationField.getText().toLowerCase();
      this.emailVerificationField.setText("");
      a !== b
        ? (this.emailField.setText(""),
          this.emailVerificationContainer.parent &&
            this.removeChild(this.emailVerificationContainer),
          this.reset(),
          this.displayErrorMessage("Email verification failed. Please try again."))
        : (this.emailVerificationContainer.parent &&
            this.removeChild(this.emailVerificationContainer),
          this.displayLoadingMessage(),
          this.submitForm(
            this.emailField.getText(),
            this.nameField.getText(),
            this.passwordField.getText()
          ));
    } else this.verificationBoxWarning.tint = 16711680;
  }
  submitForm(a, b, c) {
    this.emit(Layer.Events.REGISTER_SUBMIT, { email: a, name: b, password: c });
  }
  displayLoadingMessage() {
    this.container.interactiveChildren = !1;
    this.addChild(this.loadingContainer);
    this.submitButton.disable();
    this.container.alpha = 0.5;
  }
  displayEmailVerification() {
    this.emailField.visible = !1;
    this.container.interactiveChildren = !1;
    this.addChild(this.emailVerificationContainer);
    this.submitButton.disable();
    this.container.alpha = 0.5;
  }
  displayCompletedMessage(a = !0) {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.passwordField.setText("");
    this.container.interactiveChildren = !1;
    this.addChild(this.completedContainer);
    this.submitButton.disable();
    this.container.alpha = 0.5;
    a
      ? ((this.completedButton.visible = !0),
        (this.completedText.text =
          "A verification email has been sent to\n " +
          this.emailField.getText() +
          "\n(Check your spam folder)\n\nImportant: Click the verification link in\nthis email to activate your account!"))
      : ((this.completedButton.visible = !1),
        (this.completedText.text =
          "Your Ninja.io account has been created.\n\nLogging in as " + this.nameField.getText()));
  }
  displayErrorMessage(a) {
    this.submitButton.enable();
    this.errorMessage.text = a;
    this.errorMessage.parent || this.container.addChild(this.errorMessage);
  }
}
RegisterMenu.EmailWhitelist =
  "@gmail.com @icloud.com @yahoo.com @hotmail.com @mail.ru @outlook.com @comcast.net @inbox.ru @yandex.ru @wp.pl @protonmail.com @aol.com @googlemail.com @volny.cz @sdale.org @pdsb.net".split(
    " "
  );
var upresetmenu = {};
export class UPResetMenu extends Feature {
  constructor() {
    super();
    this.challengeTexture = null;
    this.preferredCheck = UPResetMenu.CHECK_NAME;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.container.addChild(this.background);
    this.ox = 40;
    this.oy = 20;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.onCancelButtonReleased());
    this.container.addChild(this.closeButton);
    this.accountRecoveryTitle = new PIXI.Text("Account recovery", FontStyle.MediumOrangeText);
    this.accountRecoveryTitle.x = 0.5 * this.width - 0.5 * this.accountRecoveryTitle.width;
    this.accountRecoveryTitle.y = this.oy + 36;
    this.accountRecoveryTitle.resolution = 2;
    this.container.addChild(this.accountRecoveryTitle);
    this.emailTitle = new PIXI.Text("Email", FontStyle.SmallMenuTextOrange4);
    this.emailTitle.x = this.ox;
    this.emailTitle.y = this.oy + 80;
    this.emailTitle.resolution = 2;
    this.container.addChild(this.emailTitle);
    this.recoverTitle = new PIXI.Text("Recover", FontStyle.SmallMenuTextOrange4);
    this.recoverTitle.x = this.ox;
    this.recoverTitle.y = this.oy + 145;
    this.recoverTitle.resolution = 2;
    this.container.addChild(this.recoverTitle);
    this.captchaTitle = new PIXI.Text("Captcha", FontStyle.SmallMenuTextOrange4);
    this.captchaTitle.x = this.ox;
    this.captchaTitle.y = this.oy + 204;
    this.captchaTitle.resolution = 2;
    this.container.addChild(this.captchaTitle);
    this.errorMessage = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 16,
      fill: 16711680,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.errorMessage.x = this.ox;
    this.errorMessage.y = this.oy + 310;
    this.errorMessage.resolution = 2;
    this.errorMessage.maxWidth = 380;
    this.container.x = 0.5 * -this.width;
    this.emailField = new InputField("register_email");
    this.emailField.setDimensions(300, 35);
    this.emailField.forceLowerCase = !1;
    this.emailField.setMaxChars(64);
    this.emailField.x = this.ox;
    this.emailField.y = this.oy + 100;
    this.emailField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@.+_-"
    );
    this.container.addChild(this.emailField);
    this.nameCheck = new Checkbox("name_check", "Username", !0);
    this.nameCheck.x = this.ox;
    this.nameCheck.y = this.oy + 168;
    this.nameCheck.setChecked(!0);
    this.container.addChild(this.nameCheck);
    this.passwordCheck = new Checkbox("password_check", "Password", !0);
    this.passwordCheck.x = this.ox + 150;
    this.passwordCheck.y = this.oy + 168;
    this.passwordCheck.setChecked(!1);
    this.passwordCheck.on(Checkbox.CHANGE, (a) => {
      a && (this.preferredCheck = UPResetMenu.CHECK_PASSWORD);
    });
    this.container.addChild(this.passwordCheck);
    this.nameCheck.on(Checkbox.CHANGE, (a) => {
      a && (this.passwordCheck.setChecked(!1), (this.preferredCheck = UPResetMenu.CHECK_NAME));
    });
    this.passwordCheck.on(Checkbox.CHANGE, (a) => {
      a && (this.nameCheck.setChecked(!1), (this.preferredCheck = UPResetMenu.CHECK_PASSWORD));
    });
    this.robotChallengeField = new InputField("register_name");
    this.robotChallengeField.setDimensions(100, 35);
    this.robotChallengeField.forceUpperCase = !0;
    this.robotChallengeField.setMaxChars(5);
    this.robotChallengeField.x = this.ox;
    this.robotChallengeField.y = this.oy + 228;
    this.robotChallengeField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-().[]"
    );
    this.container.addChild(this.robotChallengeField);
    this.robotChallengeField.on("mousedown", () => {
      this.emailField.interactive = !1;
      this.emailField.alpha = 0.3;
    });
    this.robotChallengeContainer = new PIXI.Container();
    this.robotChallengeContainer.interactive = !0;
    this.robotChallengeContainer.interactiveChildren = !1;
    this.robotChallengeContainer.buttonMode = !0;
    this.robotChallengeContainer.x = this.ox + 142;
    this.robotChallengeContainer.y = this.oy + 245;
    this.container.addChild(this.robotChallengeContainer);
    (async () => {
      this.robotChallenge = new PIXI.Sprite();
      this.robotChallenge.anchor.x = this.robotChallenge.anchor.y = 0.5;
      this.robotChallenge.scale.x = this.robotChallenge.scale.y = 2;
      this.robotChallengeContainer.addChild(this.robotChallenge);
      this.robotChallenge.interactive = !1;
    })();
    this.robotChallengeContainer.hitArea = new PIXI.Rectangle(-40, -20, 80, 40);
    this.robotChallengeContainer.on("mousedown", () => this.resetRobotChallenge());
    this.robotChallengeContainer.on(
      "mouseover",
      () => (this.robotChallenge.scale.x = this.robotChallenge.scale.y = 2.5)
    );
    this.robotChallengeContainer.on(
      "mouseout",
      () => (this.robotChallenge.scale.x = this.robotChallenge.scale.y = 2)
    );
    this.submitButton = new Button("recover");
    this.submitButton.selected = !0;
    this.submitButton.setText("Recover");
    this.submitButton.scale.x = this.submitButton.scale.y = 0.8;
    this.submitButton.addListener(Button.BUTTON_RELEASED, this.onSubmitButtonReleased.bind(this));
    this.submitButton.x = this.ox + 11;
    this.submitButton.y = this.oy + 274;
    this.submitButton.setTint(16763904);
    this.container.addChild(this.submitButton);
    this.loadingContainer = new PIXI.Container();
    this.loadingBackground = new PIXI.Graphics();
    this.loadingBackground.x = 0;
    this.loadingBackground.y = 0;
    this.loadingBackground.lineStyle(3, 11184810, 0.5, 0);
    this.loadingBackground.beginFill(0, 0.8);
    this.loadingBackground.drawRoundedRect(0, 0, 300, 80, 10);
    this.loadingBackground.endFill();
    this.loadingContainer.addChild(this.loadingBackground);
    this.loadingText = new PIXI.Text("Processing request...", {
      fontName: "Arial",
      fontSize: 20,
      fill: 16763904,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.loadingText.x = 0.5 * this.loadingBackground.width;
    this.loadingText.y = 0.5 * this.loadingBackground.height;
    this.loadingText.anchor.x = this.loadingText.anchor.y = 0.5;
    this.loadingContainer.addChild(this.loadingText);
    this.loadingContainer.x = 0.5 * -this.loadingBackground.width;
    this.loadingContainer.y = 0.5 * this.container.height - 0.5 * this.loadingBackground.height;
    this.completedContainer = new PIXI.Container();
    this.completedBackground = new PIXI.Graphics();
    this.completedBackground.x = 0;
    this.completedBackground.y = 0;
    this.completedBackground.lineStyle(3, 11184810, 0.5, 0);
    this.completedBackground.beginFill(0, 0.8);
    this.completedBackground.drawRoundedRect(0, 0, 400, 130, 10);
    this.completedBackground.endFill();
    this.completedContainer.addChild(this.completedBackground);
    this.completedText = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 20,
      fill: 16763904,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.completedText.x = 0.5 * this.completedBackground.width;
    this.completedText.y = 0.3 * this.completedBackground.height;
    this.completedText.anchor.x = this.completedText.anchor.y = 0.5;
    this.completedContainer.addChild(this.completedText);
    this.completedButton = new Button("continue");
    this.completedButton.selected = !0;
    this.completedButton.setText("Continue");
    this.completedButton.scale.x = this.completedButton.scale.y = 0.8;
    this.completedButton.addListener(
      Button.BUTTON_RELEASED,
      this.onCompletedButtonReleased.bind(this)
    );
    this.completedButton.x =
      0.5 * this.completedBackground.width - 0.5 * this.completedButton.width;
    this.completedButton.y = this.completedBackground.height - (this.completedButton.height + 16);
    this.completedContainer.addChild(this.completedButton);
    this.completedContainer.x = 0.5 * -this.completedBackground.width;
    this.completedContainer.y = 0.5 * this.container.height - 0.5 * this.completedBackground.height;
  }
  show() {
    this.resetRobotChallenge();
  }
  hide() {}
  resetRobotChallenge() {
    this.robotChallengeField.setText("");
    this.challengeTexture && PIXI.Texture.removeFromCache(this.challengeTexture);
    this.challengeTexture = PIXI.Texture.from(
      APIClient.ChallengeURL + "?cache_id=" + Math.random()
    );
    this.robotChallenge.texture = this.challengeTexture;
  }
  validateForm() {
    let a = !0,
      b = "";
    const c = this.emailField.getText(),
      d = this.robotChallengeField.getText();
    a &&
    (3 > c.length ||
      !c.match(
        /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/g
      ))
      ? ((b = "Invalid email address."), (a = !1), this.emailField.markInvalid())
      : this.emailField.markValid();
    a && 5 > d.length
      ? (this.robotChallengeField.markInvalid(), (b = "Robot challenge incomplete."), (a = !1))
      : a && this.robotChallengeField.markNone();
    return { valid: a, error: b };
  }
  onSubmitButtonReleased() {
    const a = this.validateForm();
    a.valid
      ? (this.displayErrorMessage(""),
        this.displayLoadingMessage(),
        this.emit(Layer.Events.RECOVER_SUBMIT, {
          email: this.emailField.getText(),
          type: this.preferredCheck,
          challenge: this.robotChallengeField.getText(),
        }))
      : this.displayErrorMessage(a.error);
  }
  displayLoadingMessage() {
    this.container.interactiveChildren = !1;
    this.addChild(this.loadingContainer);
    this.submitButton.disable();
    this.container.alpha = 0.5;
  }
  displayCompletedMessage() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.container.interactiveChildren = !1;
    this.addChild(this.completedContainer);
    this.submitButton.disable();
    this.container.alpha = 0.5;
    this.completedText.text = "A recovery email has been sent to\n " + this.emailField.getText();
  }
  onCompletedButtonReleased() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.completedContainer.parent && this.removeChild(this.completedContainer);
    this.container.interactiveChildren = !0;
    this.submitButton.enable();
    this.container.alpha = 1;
    this.emailField.markNone();
    this.emailField.setText("");
    this.robotChallengeField.setText("");
    this.emit(Layer.Events.RECOVER_CANCEL);
  }
  onCancelButtonReleased() {
    this.submitButton.enable();
    this.emit(Layer.Events.RECOVER_CANCEL);
  }
  displayErrorMessage(a) {
    this.submitButton.enable();
    this.errorMessage.text = a;
    this.errorMessage.parent || this.container.addChild(this.errorMessage);
  }
  reset() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.completedContainer.parent && this.removeChild(this.completedContainer);
    this.resetRobotChallenge();
    this.container.interactiveChildren = !0;
    this.submitButton.enable();
    this.container.alpha = 1;
    this.emailField.markNone();
  }
}
UPResetMenu.CHECK_NAME = "name";
UPResetMenu.CHECK_PASSWORD = "password";
var visualizer = {};
export class Visualizer extends PIXI.Container {
  constructor(a, b, c = !0, d = !0, e = !0, f = "alpha") {
    super();
    this.renderBackground = c;
    this.interactive = d;
    this.displayAura = e;
    this.customExtra = this.customFace = this.customAura = !1;
    this.w = a;
    this.h = b;
    this.s = 0.004 * this.w;
    this.team = f;
    this.numParticles = 64;
    this.customization = {};
    this.customAuraFx = {};
    this.customFaceFx = {};
    this.customExtraFx = {};
    this.initialize();
    this.offsetY = this.offsetX = this.time = 0;
    this.head = new PIXI.Sprite();
    this.head.x = this.head.ox = -2;
    this.head.y = this.head.oy = 0.179 * -this.h;
    this.head.scale.x = this.head.scale.y = this.s;
    this.head.anchor.x = 0.5;
    this.head.anchor.y = 0.75;
    this.head.rotation = this.head.or = -0.15;
    this.face = new PIXI.Sprite();
    this.face.rotation = this.face.or = -0;
    this.torsoUpper = new PIXI.Sprite();
    this.torsoUpper.scale.x = this.torsoUpper.scale.y = 1.2 * this.s;
    this.torsoUpper.x = this.torsoUpper.ox = 0;
    this.torsoUpper.y = this.torsoUpper.oy = 0.105 * -this.h;
    this.torsoUpper.anchor.x = 0.5;
    this.torsoUpper.anchor.y = 0.4;
    this.torsoUpper.rotation = this.torsoUpper.or = -0.1;
    this.torsoLower = new PIXI.Sprite();
    this.torsoLower.x = this.torsoLower.ox = 2;
    this.torsoLower.y = this.torsoLower.oy = 0.03 * -this.h;
    this.torsoLower.scale.x = this.torsoLower.scale.y = 1 * this.s;
    this.torsoLower.anchor.x = 0.5;
    this.torsoLower.anchor.y = 0.4;
    this.torsoLower.rotation = this.torsoLower.or = -0.1;
    this.armLeftUpper = new PIXI.Sprite();
    this.armLeftUpper.x = this.armLeftUpper.ox = -12;
    this.armLeftUpper.y = this.armLeftUpper.oy = 0.14 * -this.h;
    this.armLeftUpper.scale.x = this.armLeftUpper.scale.y = 1 * this.s;
    this.armLeftUpper.anchor.x = 0.6;
    this.armLeftUpper.anchor.y = 0.23;
    this.armLeftUpper.rotation = this.armLeftUpper.or = -0.05;
    this.armLeftLower = new PIXI.Sprite();
    this.armLeftLower.x = this.armLeftLower.ox = -17;
    this.armLeftLower.y = this.armLeftLower.oy = 0.02 * this.h;
    this.armLeftLower.scale.x = this.armLeftLower.scale.y = 0.95 * this.s;
    this.armLeftLower.anchor.x = 0.6;
    this.armLeftLower.anchor.y = 0.23;
    this.armLeftLower.rotation = this.armLeftLower.or = 0.55 * Math.PI;
    this.armRightUpper = new PIXI.Sprite();
    this.armRightUpper.x = this.armRightUpper.ox = 15;
    this.armRightUpper.y = this.armRightUpper.oy = 0.17 * -this.h;
    this.armRightUpper.scale.x = this.armRightUpper.scale.y = 1 * this.s;
    this.armRightUpper.anchor.x = 0.55;
    this.armRightUpper.anchor.y = 0.23;
    this.armRightUpper.rotation = this.armRightUpper.or = -0.3;
    this.armRightLower = new PIXI.Sprite();
    this.armRightLower.x = this.armRightLower.ox = 22;
    this.armRightLower.y = this.armRightLower.oy = 0.02 * -this.h;
    this.armRightLower.scale.x = 0.95 * -this.s;
    this.armRightLower.scale.y = 0.95 * this.s;
    this.armRightLower.anchor.x = 0.66;
    this.armRightLower.anchor.y = 0.23;
    this.armRightLower.rotation = this.armRightLower.or = 0.26 * Math.PI;
    this.legLeftUpper = new PIXI.Sprite();
    this.legLeftUpper.x = this.legLeftUpper.ox = -1;
    this.legLeftUpper.y = this.legLeftUpper.oy = 0.085 * this.h;
    this.legLeftUpper.scale.x = this.legLeftUpper.scale.y = 1 * this.s;
    this.legLeftUpper.anchor.x = 0.55;
    this.legLeftUpper.anchor.y = 0.31;
    this.legLeftUpper.rotation = this.legLeftUpper.or = 0.23 * Math.PI;
    this.legLeftLower = new PIXI.Sprite();
    this.legLeftLower.x = this.legLeftLower.ox = 10;
    this.legLeftLower.y = this.legLeftLower.oy = 0.25 * this.h;
    this.legLeftLower.scale.x = this.legLeftLower.scale.y = 1 * this.s;
    this.legLeftLower.anchor.x = 0.58;
    this.legLeftLower.anchor.y = 0.36;
    this.legLeftLower.rotation = this.legLeftLower.or = 0.3 * -Math.PI;
    this.legRightUpper = new PIXI.Sprite();
    this.legRightUpper.x = this.legRightUpper.ox = 9;
    this.legRightUpper.y = this.legRightUpper.oy = 0.07 * this.h;
    this.legRightUpper.scale.x = this.legRightUpper.scale.y = 1 * this.s;
    this.legRightUpper.anchor.x = 0.55;
    this.legRightUpper.anchor.y = 0.3;
    this.legRightUpper.rotation = this.legRightUpper.or = 0.01 * Math.PI;
    this.legRightLower = new PIXI.Sprite();
    this.legRightLower.x = this.legRightLower.ox = -19;
    this.legRightLower.y = this.legRightLower.oy = 0.21 * this.h;
    this.legRightLower.scale.x = this.legRightLower.scale.y = 1 * this.s;
    this.legRightLower.anchor.x = 0.58;
    this.legRightLower.anchor.y = 0.36;
    this.legRightLower.rotation = this.legRightLower.or = 0.22 * -Math.PI;
    this.bandana = new PIXI.Sprite(App.CombinedTextures["bandana_team_" + this.team]);
    this.bandana.x = this.bandana.ox = this.head.x + 13;
    this.bandana.y = this.bandana.oy = this.head.y - 16;
    this.bandana.rotation = this.bandana.or = 0.32 * Math.PI;
    this.bandana.scale.x = 0.9 * this.s;
    this.bandana.scale.y = 0.5 * this.s;
    this.bandana.anchor.x = 0;
    this.bandana.anchor.y = 0.5;
    this.bandana.tint = 12255232;
    this.extra = new PIXI.Container();
    this.ninja = new PIXI.Container();
    this.ninja.x = 0.5 * this.w;
    this.ninja.y = 0.5 * this.h;
    this.marker = new PIXI.Graphics();
    this.marker.alpha = 0;
    this.marker.lineStyle(4, 0, 0.5, 0);
    this.marker.drawRoundedRect(0, 0, this.w, this.h, 8);
    this.marker.endFill();
    this.addChild(this.marker);
    this.aura = new PIXI.Sprite();
    this.aura.x = 0;
    this.aura.y = 0;
    this.aura.scale.x = this.aura.scale.y = 1.4;
    this.aura.anchor.x = this.aura.anchor.y = 0.5;
    this.aura.visible = this.displayAura;
    this.aura.rotation = Math.PI;
    this.on("mouseover", () => {
      this.marker.alpha = 1;
      this.aura.visible = !this.customAura;
      this.drawBackground(!1);
    });
    this.on("mouseout", () => {
      this.marker.alpha = 0;
      this.aura.visible = !1;
      this.drawBackground(!0);
    });
    this.ninja.addChild(this.aura);
    this.ninja.addChild(this.bandana);
    this.ninja.addChild(this.legRightLower);
    this.ninja.addChild(this.legLeftUpper);
    this.ninja.addChild(this.legLeftLower);
    this.ninja.addChild(this.legRightUpper);
    this.ninja.addChild(this.armLeftUpper);
    this.ninja.addChild(this.armLeftLower);
    this.ninja.addChild(this.torsoLower);
    this.ninja.addChild(this.torsoUpper);
    this.ninja.addChild(this.armRightLower);
    this.ninja.addChild(this.armRightUpper);
    this.ninja.addChild(this.head);
    this.ninja.addChild(this.extra);
    this.head.addChild(this.face);
    this.bodyparts = [
      this.head,
      this.armLeftUpper,
      this.armLeftLower,
      this.torsoLower,
      this.torsoUpper,
      this.armRightUpper,
      this.armRightLower,
      this.legLeftUpper,
      this.legLeftLower,
      this.legRightUpper,
      this.legRightLower,
      this.bandana,
    ];
    this.addChild(this.ninja);
    this.topParticles = new PIXI.ParticleContainer(1024, { position: !0, rotation: !0, tint: !0 });
    this.addChild(this.topParticles);
  }
  generateCharacter() {
    this.extra.removeChildren();
    this.foregroundParticles.removeChildren();
    this.topParticles.removeChildren();
    this.customAuraFx = {};
    const a = App.CombinedTextures;
    var b = this.customization;
    this.aura.tint = void 0 === b.orb ? 16777215 : b.orb.data.energy;
    this.face.rotation = 0;
    this.face.vr = 0;
    let c = "head_" + this.team;
    if (b.hair) {
      var d = !1;
      b.face && b.face.cdata && !1 === b.face.cdata.hair && (d = !0);
      d ? (c += "_slick") : 0 < b.hair.texture.length && (c += "_" + b.hair.texture);
    }
    var e = "torsoupper";
    b.torso && 0 < b.torso.texture.length && (e += "_" + b.torso.texture);
    d = "energy_shell";
    this.customAura = !1;
    this.aura.visible = this.displayAura;
    b.orb &&
      (b.orb.cdata && b.orb.cdata.custom
        ? ((this.customAura = b.orb.cdata.custom),
          (this.aura.visible = !1),
          this.initializeCustomEnergyFx())
        : 0 < b.orb.texture.length && (d += "_" + b.orb.texture));
    var f = "torsolower";
    this.torsoLower.x = this.torsoLower.ox = 2;
    this.torsoLower.y = this.torsoLower.oy = 0.03 * -this.h;
    this.torsoLower.anchor.x = 0.5;
    this.torsoLower.anchor.y = 0.4;
    if (b.belt && 0 < b.belt.texture.length) {
      f += "_" + b.belt.texture;
      var g = b.belt.cdata;
      void 0 !== g &&
        (void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.torsoLower.anchor.x = g.ax), (this.torsoLower.anchor.y = g.ay)),
        void 0 !== g.ox &&
          void 0 !== g.ox &&
          ((this.torsoLower.x = g.ox), (this.torsoLower.y = g.oy)),
        void 0 !== g.s && (this.torsoLower.scale.x = this.torsoLower.scale.y = this.s * g.s));
    }
    var h = "armleftlower";
    this.armLeftLower.x = -17;
    this.armLeftLower.y = 0.02 * this.h;
    this.armLeftLower.anchor.x = 0.6;
    this.armLeftLower.anchor.y = 0.23;
    b.armleftlower &&
      0 < b.armleftlower.texture.length &&
      ((h += "_" + b.armleftlower.texture),
      (g = b.armleftlower.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.armLeftLower.x = this.armLeftLower.ox = g.ox),
          (this.armLeftLower.y = this.armLeftLower.oy = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.armLeftLower.anchor.x = g.ax), (this.armLeftLower.anchor.y = g.ay))));
    var k = "armleftupper";
    this.armLeftUpper.x = this.armLeftUpper.ox = -13;
    this.armLeftUpper.y = this.armLeftUpper.oy = 0.14 * -this.h;
    this.armLeftUpper.anchor.x = 0.55;
    this.armLeftUpper.anchor.y = 0.23;
    b.armleftupper &&
      0 < b.armleftupper.texture.length &&
      ((k += "_" + b.armleftupper.texture),
      (g = b.armleftupper.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.armLeftUpper.x = this.armLeftUpper.ox = g.ox),
          (this.armLeftUpper.y = this.armLeftUpper.oy = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.armLeftUpper.anchor.x = g.ax), (this.armLeftUpper.anchor.y = g.ay))));
    var m = "armrightupper";
    this.armRightUpper.x = this.armRightUpper.ox = 15;
    this.armRightUpper.y = this.armRightUpper.oy = 0.17 * -this.h;
    this.armRightUpper.anchor.x = 0.55;
    this.armRightUpper.anchor.y = 0.23;
    b.armrightupper &&
      0 < b.armrightupper.texture.length &&
      ((m += "_" + b.armrightupper.texture),
      (g = b.armrightupper.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.armRightUpper.x = this.armRightUpper.ox = g.ox),
          (this.armRightUpper.y = this.armRightUpper.oy = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.armRightUpper.anchor.x = g.ax), (this.armRightUpper.anchor.y = g.ay))));
    var n = "armrightlower";
    this.armRightLower.x = 22;
    this.armRightLower.y = 0.02 * -this.h;
    this.armRightLower.anchor.x = 0.66;
    this.armRightLower.anchor.y = 0.23;
    b.armrightlower &&
      0 < b.armrightlower.texture.length &&
      ((n += "_" + b.armrightlower.texture),
      (g = b.armrightlower.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.armRightLower.x = this.armRightLower.ox = g.ox),
          (this.armRightLower.y = this.armRightLower.oy = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.armRightLower.anchor.x = g.ax), (this.armRightLower.anchor.y = g.ay))));
    var l = "legleftlower";
    this.legLeftLower.x = this.legLeftLower.ox = 10;
    this.legLeftLower.y = this.legLeftLower.oy = 0.25 * this.h;
    this.legLeftLower.anchor.x = 0.58;
    this.legLeftLower.anchor.y = 0.36;
    b.legleftlower &&
      (0 < b.legleftlower.texture.length && (l += "_" + b.legleftlower.texture),
      (g = b.legleftlower.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.legLeftLower.x = this.legLeftLower.ox = g.ox),
          (this.legLeftLower.y = this.legLeftLower.oy = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.legLeftLower.anchor.x = g.ax), (this.legLeftLower.anchor.y = g.ay))));
    g = "legrightlower";
    this.legRightLower.x = this.legRightLower.ox = -19;
    this.legRightLower.y = this.legRightLower.oy = 0.21 * this.h;
    this.legRightLower.anchor.x = 0.58;
    this.legRightLower.anchor.y = 0.36;
    if (b.legrightlower) {
      0 < b.legrightlower.texture.length && (g += "_" + b.legrightlower.texture);
      var p = b.legrightlower.cdata;
      void 0 !== p &&
        (void 0 !== p.ox &&
          void 0 !== p.oy &&
          ((this.legRightLower.x = this.legRightLower.ox = p.ox),
          (this.legRightLower.y = this.legRightLower.oy = p.oy)),
        void 0 !== p.ax &&
          void 0 !== p.ay &&
          ((this.legRightLower.anchor.x = p.ax), (this.legRightLower.anchor.y = p.ay)));
    }
    let r = "legleftupper";
    this.legLeftUpper.x = this.legLeftUpper.ox = -1;
    this.legLeftUpper.y = this.legLeftUpper.oy = 0.085 * this.h;
    this.legLeftUpper.anchor.x = 0.55;
    this.legLeftUpper.anchor.y = 0.31;
    b.legleftupper &&
      (0 < b.legleftupper.texture.length && (r += "_" + b.legleftupper.texture),
      (p = b.legleftupper.cdata),
      void 0 !== p &&
        (void 0 !== p.ox &&
          void 0 !== p.oy &&
          ((this.legLeftUpper.x = this.legLeftUpper.ox = p.ox),
          (this.legLeftUpper.y = this.legLeftUpper.oy = p.oy)),
        void 0 !== p.ax &&
          void 0 !== p.ay &&
          ((this.legLeftUpper.anchor.x = p.ax), (this.legLeftUpper.anchor.y = p.ay))));
    p = "legrightupper";
    this.legRightUpper.x = this.legRightUpper.ox = 9;
    this.legRightUpper.y = this.legRightUpper.oy = 0.07 * this.h;
    this.legRightUpper.anchor.x = 0.55;
    this.legRightUpper.anchor.y = 0.3;
    if (b.legrightupper) {
      0 < b.legrightupper.texture.length && (p += "_" + b.legrightupper.texture);
      var q = b.legrightupper.cdata;
      void 0 !== q &&
        (void 0 !== q.ox &&
          void 0 !== q.oy &&
          ((this.legRightUpper.x = this.legRightUpper.ox = q.ox),
          (this.legRightUpper.y = this.legRightUpper.oy = q.oy)),
        void 0 !== q.ax &&
          void 0 !== q.ay &&
          ((this.legRightUpper.anchor.x = q.ax), (this.legRightUpper.anchor.y = q.ay)));
    }
    this.customFace = !1;
    if (b.face)
      if (b.face.cdata && b.face.cdata.custom)
        (this.customFace = b.face.cdata.custom),
          this.initializeCustomFaceFx(),
          (this.face.visible = !1);
      else if (0 < b.face.texture.length) {
        if (
          ((this.face.texture = a["face_" + b.face.texture]),
          (this.face.visible = !0),
          (q = b.face.cdata))
        )
          void 0 !== q.ax && void 0 !== q.ay
            ? ((this.face.anchor.x = q.ax), (this.face.anchor.y = q.ay))
            : ((this.face.anchor.x = 0), (this.face.anchor.y = 0)),
            void 0 !== q.ox && void 0 !== q.ox
              ? ((this.face.x = q.ox), (this.face.y = q.oy))
              : ((this.face.x = 0), (this.face.y = 0)),
            q.vr && (this.face.vr = 0),
            void 0 !== q.s && (this.face.scale.x = this.face.scale.y = 0.78 * q.s);
      } else this.face.visible = !1;
    else this.face.visible = !1;
    this.customExtra = !1;
    b.extra &&
      b.extra.cdata &&
      b.extra.cdata.custom &&
      ((this.customExtra = b.extra.cdata.custom), this.initializeCustomExtraFx());
    b = a[e];
    f = a[f];
    e = a[k];
    h = a[h];
    m = a[m];
    n = a[n];
    k = a[r];
    l = a[l];
    p = a[p];
    g = a[g];
    d = a[d];
    this.head.texture = a[c];
    this.torsoUpper.texture = b;
    this.torsoLower.texture = f;
    this.armLeftUpper.texture = e;
    this.armLeftLower.texture = h;
    this.armRightUpper.texture = m;
    this.armRightLower.texture = n;
    this.legLeftUpper.texture = k;
    this.legLeftLower.texture = l;
    this.legRightUpper.texture = p;
    this.legRightLower.texture = g;
    this.aura.texture = d;
  }
  initialize() {
    if (this.renderBackground) {
      this.maskGraphic = new PIXI.Graphics();
      this.maskGraphic.beginFill(16777215, 1);
      this.maskGraphic.drawRoundedRect(0, 0, this.w, this.h, 8);
      this.maskGraphic.endFill();
      this.addChild(this.maskGraphic);
      this.gradientTexture = this.generateGradientTexture();
      this.background = new PIXI.Graphics();
      this.drawBackground();
      this.addChild(this.background);
      this.backgroundParticles = new PIXI.Container();
      this.backgroundParticles.mask = this.maskGraphic;
      for (let a = 0; a < this.numParticles; a++) {
        const b = new PIXI.Sprite(App.CombinedTextures.streak);
        b.delta = 20 * Math.random();
        b.theta = Math.random() * Math.PI * 2;
        b.x = 0.5 * this.w + b.delta * Math.cos(b.theta) * Math.random() * this.w * 0.5;
        b.y = 0.5 * this.h + b.delta * Math.sin(b.theta) * Math.random() * this.h * 0.5;
        b.scale.x = 0.1;
        b.scale.y = 0.2;
        b.alpha = 0;
        b.anchor.x = 0;
        b.anchor.y = 0.5;
        b.rotation = Math.atan2(b.theta + Math.PI);
        b.tint = 0;
        this.backgroundParticles.addChild(b);
      }
      this.addChild(this.backgroundParticles);
    }
    this.foregroundParticles = new PIXI.ParticleContainer(1024, {
      position: !0,
      rotation: !0,
      tint: !0,
    });
    this.addChild(this.foregroundParticles);
  }
  drawBackground(a = !0) {
    !1 !== this.gradientTexture &&
      (this.background.clear(),
      this.background.lineStyle(3, 0, 0.2, 0),
      this.background.beginTextureFill({ texture: this.gradientTexture }),
      this.background.drawRoundedRect(0, 0, this.w, this.h, 8),
      this.background.endFill(),
      a &&
        (this.background.lineStyle(0, 0, 0),
        this.background.beginFill(16777215, 0.1),
        this.background.drawCircle(0.5 * this.w, 0.5 * this.h, 0.4 * this.w),
        this.background.endFill()));
  }
  applyCustomization(a) {
    this.customization = {};
    a && (this.customization = a);
    this.generateCharacter();
    this.update();
  }
  generateGradientTexture() {
    const a = document.createElement("canvas");
    a.width = this.w;
    a.height = this.h;
    const b = a.getContext("2d");
    if (null === b) return !1;
    let c = b.createLinearGradient(0, 0, 0, this.h);
    c.addColorStop(0, "#729fcf");
    c.addColorStop(1, "#204a87");
    b.fillStyle = c;
    b.fillRect(0, 0, this.w, this.h);
    return PIXI.Texture.from(a);
  }
  hide() {
    this.ninja.visible = !1;
  }
  show() {
    this.ninja.visible = !0;
  }
  update() {
    var a = this.customization.face;
    a &&
      a.cdata &&
      ((a = a.cdata),
      a.fr && (this.face.rotation = -this.head.rotation),
      a.vr && ((this.face.vr += a.vr), (this.face.rotation += this.face.vr)));
    this.offsetX = 2 * Math.sin(0.01 * this.time);
    this.offsetY = 6 * Math.sin(0.04 * this.time);
    this.updateCustom();
    this.aura.alpha = 1;
    this.aura.rotation = 2 * Math.PI * Math.random();
    for (a = 0; a < this.bodyparts.length; a++) {
      var b = this.bodyparts[a];
      b.x = b.ox + this.offsetX;
      b.y = b.oy - this.offsetY;
      b.rotation =
        b.or +
        0.04 *
          Math.cos(0.04 * this.time + 0.1 * a) *
          (2 === a || 6 === a || 7 === a || 9 === a ? -1 : 1);
    }
    this.aura.x = this.offsetX;
    this.aura.y = -this.offsetY;
    if (this.renderBackground)
      for (a = this.backgroundParticles.children, b = 0; b < this.numParticles; b++) {
        const c = a[b];
        c.delta += 5;
        c.delta *= 0.5;
        c.theta += -0.08 + 0.16 * Math.random();
        c.x += c.delta * Math.cos(c.theta);
        c.y += c.delta * Math.sin(c.theta);
        c.scale.x = 0.01 + 0.05 * c.delta;
        c.rotation = c.theta + Math.PI;
        1 > c.alpha && (c.alpha += 0.02 * Math.random());
        if (c.x > this.w + 8 || -8 > c.x || c.y > this.h + 8 || -8 > c.y)
          (c.x = 0.5 * this.w), (c.y = 0.5 * this.h), (c.alpha = -0.05);
      }
    this.time += 1;
  }
  initializeCustomEnergyFx() {
    switch (this.customAura) {
      case EnergyJetFeet.ID:
        this.customAuraFx.particles = [];
        break;
      case EnergyJetFeet2.ID:
        this.customAuraFx.counter = 0;
        this.customAuraFx.particles1 = [];
        this.customAuraFx.particles2 = [];
        this.customAuraFx.update = () => {
          this.customAuraFx.counter++;
        };
        break;
      case EnergyVacuum.ID:
        this.customAuraFx.rotation = 0;
        this.customAuraFx.index = 0;
        this.customAuraFx.particles = [];
        this.customAuraFx.update = () => {
          this.customAuraFx.rotation -= 0.03;
          this.customAuraFx.index =
            8 === this.customAuraFx.index + 1 ? 0 : this.customAuraFx.index + 1;
        };
        break;
      case EnergyDragon.ID:
        (this.customAuraFx.rotation = 0),
          (this.customAuraFx.particles = []),
          (this.customAuraFx.update = () => {
            this.customAuraFx.rotation -= 0.1;
          });
    }
  }
  initializeCustomFaceFx() {
    this.customFaceFx = {};
    this.customFaceFx.update = () => {};
    switch (this.customFace) {
      case FaceRedFireEyes.ID:
        this.customFaceFx.tint = 16711680;
        this.customFaceFx.particles = [];
        break;
      case FaceFireEyes.ID:
        this.customFaceFx.tint = 16777215;
        this.customFaceFx.particles = [];
        break;
      case FacePinkFireEyes.ID:
        this.customFaceFx.tint = 16738740;
        this.customFaceFx.particles = [];
        break;
      case FaceGreenFireEyes.ID:
        this.customFaceFx.tint = 65280;
        this.customFaceFx.particles = [];
        break;
      case FaceBlueFireEyes.ID:
        this.customFaceFx.tint = 255;
        this.customFaceFx.particles = [];
        break;
      case FaceYellowFireEyes.ID:
        this.customFaceFx.tint = 16776960;
        this.customFaceFx.particles = [];
        break;
      case FaceOrangeFireEyes.ID:
        (this.customFaceFx.tint = 16753920), (this.customFaceFx.particles = []);
    }
  }
  initializeCustomExtraFx() {
    this.customExtraFx = {};
    switch (this.customExtra) {
      case RedCape.ID:
      case GreenCape.ID:
      case BlackCape.ID:
      case YellowCape.ID:
      case BlueCape.ID:
      case PinkCape.ID:
      case OrangeCape.ID:
      case CamoCape.ID:
      case CamoCapeJungle.ID:
      case CamoCapeWinter.ID:
      case CamoCapeDesert.ID:
        let b = [];
        for (var a = 0; 6 > a; a++) b.push(new PIXI.Point(0, 20 * a));
        a = new Player();
        a.torsoupper.p.vx = -1.5;
        let c = new Extra.Map[this.customExtra](App.CombinedTextures[this.customExtra], a);
        c.scale.x = c.scale.y = c.targetScale = 0.9;
        this.customExtraFx.player = a;
        this.customExtraFx.counter = 0;
        this.customExtraFx.cape = c;
        this.customExtraFx.particles = [];
        this.customExtraFx.points = b;
        this.customExtraFx.update = () => {};
        this.extra.addChild(c);
        this.extra.scale.x = -1;
    }
  }
  updateCustom() {
    switch (this.customFace) {
      case FaceFireEyes.ID:
      case FaceRedFireEyes.ID:
      case FacePinkFireEyes.ID:
      case FaceGreenFireEyes.ID:
      case FaceBlueFireEyes.ID:
      case FaceYellowFireEyes.ID:
      case FaceOrangeFireEyes.ID:
        this.updateFireEyes();
    }
    switch (this.customAura) {
      case EnergyJetFeet.ID:
        this.updateJetFeet();
        break;
      case EnergyJetFeet2.ID:
        this.updateJetFeet2();
        break;
      case EnergyVacuum.ID:
        this.updateVacuum();
        break;
      case EnergyDragon.ID:
        this.updateDragon();
    }
    switch (this.customExtra) {
      case RedCape.ID:
      case GreenCape.ID:
      case BlackCape.ID:
      case YellowCape.ID:
      case BlueCape.ID:
      case PinkCape.ID:
      case OrangeCape.ID:
      case CamoCape.ID:
      case CamoCapeJungle.ID:
      case CamoCapeWinter.ID:
      case CamoCapeDesert.ID:
        this.updateCape();
    }
  }
  updateJetFeet() {
    var a = new PIXI.Sprite(App.CombinedTextures[ParticleEffects.EnergyJetFeet.tex]);
    let b = 0.5 > Math.random() ? this.legLeftLower : this.legRightLower;
    a.tint = this.aura.tint;
    a.anchor.x = a.anchor.y = 0.5;
    a.x = this.ninja.x + 35 + b.x + 10 * Math.cos(b.rotation - 0.5 * Math.PI);
    a.y = this.ninja.y + 35 + b.y + 10 * Math.sin(b.rotation - 0.5 * Math.PI);
    a.scale.x = a.scale.y = 1.5;
    a.rotation = Math.random() * Math.PI * 2;
    a.vx = 1 * Math.random();
    a.vy = 1 * Math.random();
    a.ttl = ParticleEffects.EnergyJetFeet.ttl;
    this.foregroundParticles.addChild(a);
    this.customAuraFx.particles.push(a);
    for (let c = 0, d = this.customAuraFx.particles.length; c < d; c++)
      (a = this.customAuraFx.particles[c]),
        (a.x += a.vx),
        (a.y += a.vy),
        (a.scale.x -= 0.03),
        (a.scale.y -= 0.03),
        0 === --a.ttl &&
          (this.foregroundParticles.removeChild(a),
          fastSplice(this.customAuraFx.particles, c),
          d--,
          c--);
  }
  updateJetFeet2() {
    let a, b;
    this.customAuraFx.update();
    if (0 === this.customAuraFx.counter % 2) {
      var c =
        this.ninja.x +
        35 +
        this.legLeftLower.x +
        25 * Math.cos(this.legLeftLower.rotation - 0.5 * Math.PI) +
        8;
      a =
        this.ninja.y +
        35 +
        this.legLeftLower.y +
        25 * Math.sin(this.legLeftLower.rotation - 0.5 * Math.PI) -
        3;
      b = this.legLeftLower.rotation;
    } else
      (c =
        this.ninja.x +
        35 +
        this.legRightLower.x +
        25 * Math.cos(this.legRightLower.rotation - 0.5 * Math.PI) -
        4),
        (a =
          this.ninja.y +
          35 +
          this.legRightLower.y +
          25 * Math.sin(this.legRightLower.rotation - 0.5 * Math.PI) +
          8),
        (b = this.legRightLower.rotation);
    let d = new PIXI.Sprite(App.CombinedTextures[ParticleEffects.EnergyJetFeet2.tex]);
    d.tint = this.aura.tint;
    d.anchor.x = d.anchor.y = 0.5;
    d.scale.x = d.scale.y = 2.5;
    d.rotation = b;
    d.vx = -8 * Math.cos(b - 0.5 * Math.PI);
    d.vy = -12 * Math.sin(b - 0.5 * Math.PI);
    d.x = c - d.vx;
    d.y = a - d.vy;
    d.alpha = 1.2;
    d.ttl = ParticleEffects.EnergyJetFeet2.ttl;
    this.foregroundParticles.addChild(d);
    this.customAuraFx.particles1.push(d);
    d = new PIXI.Sprite(App.CombinedTextures[ParticleEffects.EnergyJetGlow.tex]);
    d.anchor.x = d.anchor.y = 0.5;
    d.x = c;
    d.y = a;
    d.scale.x = d.scale.y = 1;
    d.rotation = Math.random() * Math.PI * 2;
    d.vx = 2 + (-1 + 2 * Math.random());
    d.vy = 3 + (-1.5 + 3 * Math.random());
    d.ttl = ParticleEffects.EnergyJetGlow.ttl;
    this.foregroundParticles.addChild(d);
    this.customAuraFx.particles2.push(d);
    for (let e = 0, f = this.customAuraFx.particles2.length; e < f; e++)
      (c = this.customAuraFx.particles2[e]),
        (c.x += c.vx),
        (c.y += c.vy),
        (c.scale.x -= 0.1),
        (c.scale.y -= 0.1),
        (c.alpha -= 0.05),
        0 === --c.ttl &&
          (this.foregroundParticles.removeChild(c),
          fastSplice(this.customAuraFx.particles2, e),
          f--,
          e--);
    for (let e = 0, f = this.customAuraFx.particles1.length; e < f; e++)
      (c = this.customAuraFx.particles1[e]),
        (c.x += c.vx),
        (c.y += c.vy),
        (c.scale.x -= 0.4),
        (c.scale.y -= 0.4),
        (c.alpha -= 0.2),
        0 === --c.ttl &&
          (this.foregroundParticles.removeChild(c),
          fastSplice(this.customAuraFx.particles1, e),
          f--,
          e--);
  }
  updateVacuum() {
    var a = App.CombinedTextures[ParticleEffects.EnergyVacuum.tex];
    this.customAuraFx.update();
    a = new PIXI.Sprite(a);
    a.tint = this.aura.tint;
    a.anchor.x = a.anchor.y = 0.5;
    a.alpha = 0.01;
    let b = (this.customAuraFx.index * Math.PI) / 4 + this.customAuraFx.rotation;
    a.x = this.ninja.x + 90 * Math.cos(b);
    a.y = this.ninja.y + 90 * Math.sin(b);
    a.scale.x = a.scale.y = 1.5;
    a.rotation = Math.random() * Math.PI * 2;
    a.vx = 0.02 * (0.5 * this.w - a.x);
    a.vy = 0.02 * (0.5 * this.h - a.y);
    a.ttl = ParticleEffects.EnergyVacuum.ttl;
    this.foregroundParticles.addChild(a);
    this.customAuraFx.particles.push(a);
    for (let c = 0, d = this.customAuraFx.particles.length; c < d; c++)
      (a = this.customAuraFx.particles[c]),
        (a.x += a.vx),
        (a.y += a.vy),
        (a.scale.x -= 0.05),
        (a.scale.y -= 0.05),
        (a.alpha += 0.033),
        0 === --a.ttl &&
          (this.foregroundParticles.removeChild(a),
          this.customAuraFx.particles.splice(c, 1),
          d--,
          c--);
  }
  updateDragon() {
    var a = App.CombinedTextures[ParticleEffects.EnergyDragonball.tex];
    this.customAuraFx.update();
    for (let b = 0; 3 > b; b++) {
      let c = new PIXI.Sprite(a);
      c.tint = this.aura.tint;
      c.anchor.x = c.anchor.y = 0.5;
      let d = this.customAuraFx.rotation + (b * Math.PI) / 1.5;
      c.x = this.ninja.x + 80 * Math.cos(d);
      c.y = this.ninja.y + 80 * Math.sin(d);
      c.scale.x = c.scale.y = 1.25;
      c.rotation = Math.random() * Math.PI * 2;
      c.ttl = 10;
      this.foregroundParticles.addChild(c);
      this.customAuraFx.particles.push(c);
    }
    for (let b = 0, c = this.customAuraFx.particles.length; b < c; b++)
      (a = this.customAuraFx.particles[b]),
        (a.scale.x -= 0.1),
        (a.scale.y -= 0.1),
        (a.alpha -= 0.1),
        0 === --a.ttl &&
          (this.foregroundParticles.removeChild(a),
          this.customAuraFx.particles.splice(b, 1),
          c--,
          b--);
  }
  updateFireEyes() {
    var a = App.CombinedTextures[ParticleEffects.FireEyes.tex];
    this.customFaceFx.update();
    let b = new PIXI.Sprite(a);
    b.tint = void 0 !== this.customFaceFx.tint ? this.customFaceFx.tint : 16777215;
    b.anchor.x = b.anchor.y = 0.5;
    b.alpha = 1.1;
    b.x = this.ninja.x + this.head.x - 17;
    b.y = this.ninja.y + this.head.y - 9;
    b.scale.x = b.scale.y = 0.5;
    b.rotation = Math.random() * Math.PI * 2;
    b.vx = 2 + 1 * Math.random();
    b.vy = -1.5 + 1 * Math.random();
    b.ttl = 20;
    this.topParticles.addChild(b);
    this.customFaceFx.particles.push(b);
    b = new PIXI.Sprite(a);
    b.tint = 16777215;
    b.anchor.x = b.anchor.y = 0.5;
    b.alpha = 1.1;
    b.x = this.ninja.x + this.head.x - 17;
    b.y = this.ninja.y + this.head.y - 9;
    b.scale.x = b.scale.y = 0.3;
    b.rotation = Math.random() * Math.PI * 2;
    b.vx = 1.5 + 0.75 * Math.random();
    b.vy = -1 + 0.75 * Math.random();
    b.ttl = 5;
    this.topParticles.addChild(b);
    this.customFaceFx.particles.push(b);
    for (let c = 0, d = this.customFaceFx.particles.length; c < d; c++)
      (a = this.customFaceFx.particles[c]),
        (a.x += a.vx),
        (a.y += a.vy),
        (a.scale.x -= 0.025),
        (a.scale.y -= 0.025),
        (a.alpha -= 0.05),
        0 === --a.ttl &&
          (this.topParticles.removeChild(a), this.customFaceFx.particles.splice(c, 1), d--, c--);
  }
  updateCape() {
    this.customExtraFx.counter += 0.8;
    this.customExtraFx.player.torsoupper.p.vx = 1.5;
    this.customExtraFx.player.torsoupper.p.vy = 10 * Math.sin(0.1 * this.torsoUpper.y + 1.5);
    this.customExtraFx.cape.update();
    this.extra.x = this.torsoUpper.x + 20;
    this.extra.y = this.torsoUpper.y - 20;
  }
}
var accounttab = {};
export class AccountTab extends Feature {
  constructor(a, b) {
    super();
    this.w = a;
    this.h = b;
    this.ox = 20;
    this.oy = 126;
    this.sections = 3;
    this.currentSection = 0;
    this.accountSettingsTitle = new PIXI.Text("Account settings", FontStyle.MediumOrangeText);
    this.accountSettingsTitle.x = this.ox - 4;
    this.accountSettingsTitle.y = 100;
    this.accountSettingsTitle.tint = 16763904;
    this.accountSettingsTitle.resolution = 2;
    this.addChild(this.accountSettingsTitle);
    this.tableContainerMask = new PIXI.Graphics();
    this.tableContainerMask.beginFill(16777215, 1);
    this.tableContainerMask.drawRect(0, 100, 638, 390);
    this.tableContainerMask.endFill();
    this.tableContainerMask.x = 11;
    this.container.addChild(this.tableContainerMask);
    this.container.mask = this.tableContainerMask;
    this.scrollLeftButton = new Button("scroll_right");
    this.scrollLeftButton.selected = !0;
    this.scrollLeftButton.setText("<< Previous setting");
    this.scrollLeftButton.setTint(16763989);
    this.scrollLeftButton.scale.x = this.scrollLeftButton.scale.y = 0.7;
    this.scrollLeftButton.disable();
    this.scrollLeftButton.addListener(Button.BUTTON_RELEASED, () => {
      for (let c = 0; c < this.container.children.length; c++)
        this.container.children[c] !== this.tableContainerMask &&
          (this.container.children[c].x += 318);
      0 < this.currentSection && this.currentSection--;
      0 === this.currentSection &&
        (this.scrollLeftButton.disable(), 2 < this.sections && this.scrollRightButton.enable());
    });
    this.scrollLeftButton.x = 23;
    this.scrollLeftButton.y = 128;
    this.addChild(this.scrollLeftButton);
    this.scrollRightButton = new Button("scroll_right");
    this.scrollRightButton.selected = !0;
    this.scrollRightButton.setText("Next setting >>");
    this.scrollRightButton.setTint(16763989);
    this.scrollRightButton.scale.x = this.scrollRightButton.scale.y = 0.7;
    this.scrollRightButton.addListener(Button.BUTTON_RELEASED, () => {
      for (let c = 0; c < this.container.children.length; c++)
        this.container.children[c] !== this.tableContainerMask &&
          (this.container.children[c].x -= 318);
      this.currentSection < this.sections - 2 && this.currentSection++;
      this.currentSection >= this.sections - 2 &&
        (this.scrollRightButton.disable(), 2 < this.sections && this.scrollLeftButton.enable());
    });
    this.scrollRightButton.x = 520;
    this.scrollRightButton.y = 128;
    this.addChild(this.scrollRightButton);
    this.passwordBackground = new PIXI.Graphics();
    this.passwordBackground.x = this.ox - 6;
    this.passwordBackground.y = this.oy + 32;
    this.passwordBackground.beginFill(6710886, 0.3);
    this.passwordBackground.drawRoundedRect(0, 0, 314, 336, 8);
    this.passwordBackground.endFill();
    this.container.addChild(this.passwordBackground);
    this.passwordResetTitle = new PIXI.BitmapText("Change password", {
      fontName: "Open Sans",
      fontSize: 26,
    });
    this.passwordResetTitle.x = this.ox;
    this.passwordResetTitle.y = this.oy + 40;
    this.passwordResetTitle.tint = 16746496;
    this.container.addChild(this.passwordResetTitle);
    this.oldPasswordTitle = new PIXI.BitmapText("Current password", {
      fontName: "Open Sans",
      fontSize: 22,
    });
    this.oldPasswordTitle.x = this.ox;
    this.oldPasswordTitle.y = this.oy + 78;
    this.oldPasswordTitle.tint = 16777215;
    this.container.addChild(this.oldPasswordTitle);
    this.newPasswordTitle = new PIXI.BitmapText("New password", {
      fontName: "Open Sans",
      fontSize: 22,
    });
    this.newPasswordTitle.x = this.ox;
    this.newPasswordTitle.y = this.oy + 143;
    this.newPasswordTitle.tint = 16777215;
    this.container.addChild(this.newPasswordTitle);
    this.repeatPasswordTitle = new PIXI.BitmapText("Repeat new password", {
      fontName: "Open Sans",
      fontSize: 22,
    });
    this.repeatPasswordTitle.x = this.ox;
    this.repeatPasswordTitle.y = this.oy + 208;
    this.repeatPasswordTitle.tint = 16777215;
    this.container.addChild(this.repeatPasswordTitle);
    this.savePasswordButton = new Button("save_password");
    this.savePasswordButton.selected = !0;
    this.savePasswordButton.setText("Change password");
    this.savePasswordButton.setTint(16763904);
    this.savePasswordButton.scale.x = this.savePasswordButton.scale.y = 0.8;
    this.savePasswordButton.addListener(
      Button.BUTTON_RELEASED,
      this.onSavePasswordButtonReleased.bind(this)
    );
    this.savePasswordButton.x = this.ox + 10;
    this.savePasswordButton.y = this.oy + 284;
    this.container.addChild(this.savePasswordButton);
    this.oldPasswordField = new InputField("old_password");
    this.oldPasswordField.setDimensions(300, 35);
    this.oldPasswordField.forceLowerCase = !1;
    this.oldPasswordField.setMaxChars(32);
    this.oldPasswordField.setPassword(!0);
    this.oldPasswordField.x = this.ox;
    this.oldPasswordField.y = this.oy + 100;
    this.oldPasswordField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.@!#$%^&*()[]"
    );
    this.container.addChild(this.oldPasswordField);
    this.newPasswordField = new InputField("new_password");
    this.newPasswordField.setDimensions(300, 35);
    this.newPasswordField.forceLowerCase = !1;
    this.newPasswordField.setMaxChars(32);
    this.newPasswordField.setPassword(!0);
    this.newPasswordField.x = this.ox;
    this.newPasswordField.y = this.oy + 165;
    this.newPasswordField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.@!#$%^&*()[]"
    );
    this.container.addChild(this.newPasswordField);
    this.repeatPasswordField = new InputField("repeat_password");
    this.repeatPasswordField.setDimensions(300, 35);
    this.repeatPasswordField.forceLowerCase = !1;
    this.repeatPasswordField.setMaxChars(32);
    this.repeatPasswordField.setPassword(!0);
    this.repeatPasswordField.x = this.ox;
    this.repeatPasswordField.y = this.oy + 230;
    this.repeatPasswordField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.@!#$%^&*()[]"
    );
    this.container.addChild(this.repeatPasswordField);
    this.errorMessage = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 22,
      align: "left",
      multiline: !0,
    });
    this.errorMessage.x = this.ox;
    this.errorMessage.y = this.oy + 320;
    this.errorMessage.tint = 16711680;
    this.errorMessage.maxWidth = 300;
    this.container.addChild(this.errorMessage);
    this.successMessage = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 22,
      align: "left",
      multiline: !0,
    });
    this.successMessage.x = this.ox;
    this.successMessage.y = this.oy + 320;
    this.successMessage.tint = 65280;
    this.successMessage.maxWidth = 300;
    this.container.addChild(this.successMessage);
    this.changeNameBackground = new PIXI.Graphics();
    this.changeNameBackground.x = this.ox + 312;
    this.changeNameBackground.y = this.oy + 32;
    this.changeNameBackground.beginFill(6710886, 0.3);
    this.changeNameBackground.drawRoundedRect(0, 0, 314, 336, 8);
    this.changeNameBackground.endFill();
    this.container.addChild(this.changeNameBackground);
    this.changeNameTitle = new PIXI.BitmapText("Change username", {
      fontName: "Open Sans",
      fontSize: 26,
    });
    this.changeNameTitle.x = this.ox + 318;
    this.changeNameTitle.y = this.oy + 40;
    this.changeNameTitle.tint = 16746496;
    this.container.addChild(this.changeNameTitle);
    this.newPasswordTitle = new PIXI.BitmapText("Username", {
      fontName: "Open Sans",
      fontSize: 22,
    });
    this.newPasswordTitle.x = this.ox + 318;
    this.newPasswordTitle.y = this.oy + 78;
    this.newPasswordTitle.tint = 16777215;
    this.container.addChild(this.newPasswordTitle);
    this.nameField = new InputField("username");
    this.nameField.setDimensions(300, 35);
    this.nameField.forceLowerCase = !1;
    this.nameField.setMaxChars(32);
    this.nameField.x = this.ox + 318;
    this.nameField.y = this.oy + 100;
    this.nameField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-().[]!"
    );
    this.nameField.setText(App.Credential.username);
    this.container.addChild(this.nameField);
    this.newPasswordTitle = new PIXI.BitmapText("Password", {
      fontName: "Open Sans",
      fontSize: 22,
    });
    this.newPasswordTitle.x = this.ox + 318;
    this.newPasswordTitle.y = this.oy + 143;
    this.newPasswordTitle.tint = 16777215;
    this.container.addChild(this.newPasswordTitle);
    this.verificationPasswordField = new InputField("password");
    this.verificationPasswordField.setDimensions(300, 35);
    this.verificationPasswordField.forceLowerCase = !1;
    this.verificationPasswordField.setMaxChars(32);
    this.verificationPasswordField.setPassword(!0);
    this.verificationPasswordField.x = this.ox + 318;
    this.verificationPasswordField.y = this.oy + 165;
    this.verificationPasswordField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.@!#$%^&*()[]"
    );
    this.container.addChild(this.verificationPasswordField);
    this.usernameInfo = new PIXI.BitmapText(
      "Costs 1.000 gold.\nCan be changed once every 30 days.\n",
      { fontName: "Open Sans", fontSize: 22 }
    );
    this.usernameInfo.x = this.ox + 318;
    this.usernameInfo.y = this.oy + 210;
    this.usernameInfo.tint = 13421772;
    this.container.addChild(this.usernameInfo);
    this.saveUsernameButton = new Button("save_username");
    this.saveUsernameButton.selected = !0;
    this.saveUsernameButton.setText("Change username");
    this.saveUsernameButton.setTint(16763904);
    this.saveUsernameButton.scale.x = this.saveUsernameButton.scale.y = 0.8;
    this.saveUsernameButton.addListener(
      Button.BUTTON_RELEASED,
      this.onSaveUsernameButtonReleased.bind(this)
    );
    this.saveUsernameButton.x = this.ox + 328;
    this.saveUsernameButton.y = this.oy + 284;
    this.container.addChild(this.saveUsernameButton);
    this.goldIcon = new PIXI.Sprite(App.CombinedTextures.gold1);
    this.goldIcon.x = this.saveUsernameButton.x + this.saveUsernameButton.width + 4;
    this.goldIcon.y = this.saveUsernameButton.y;
    this.goldIcon.scale.x = this.goldIcon.scale.y = 0.5;
    this.container.addChild(this.goldIcon);
    this.goldInfo = new PIXI.BitmapText("-1.000", { fontName: "Open Sans", fontSize: 22 });
    this.goldInfo.x = this.goldIcon.x + this.goldIcon.width + 4;
    this.goldInfo.y = this.goldIcon.y + 5;
    this.goldInfo.tint = 16711680;
    this.container.addChild(this.goldInfo);
    this.changeUsernameErrorMessage = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 22,
      align: "left",
      multiline: !0,
    });
    this.changeUsernameErrorMessage.x = this.ox + 328;
    this.changeUsernameErrorMessage.y = this.oy + 320;
    this.changeUsernameErrorMessage.tint = 16711680;
    this.changeUsernameErrorMessage.maxWidth = 300;
    this.container.addChild(this.changeUsernameErrorMessage);
    this.changeUsernameSuccessMessage = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 22,
      align: "left",
      multiline: !0,
    });
    this.changeUsernameSuccessMessage.x = this.ox + 328;
    this.changeUsernameSuccessMessage.y = this.oy + 320;
    this.changeUsernameSuccessMessage.tint = 65280;
    this.changeUsernameSuccessMessage.maxWidth = 300;
    this.container.addChild(this.changeUsernameSuccessMessage);
    this.deactivationBackground = new PIXI.Graphics();
    this.deactivationBackground.x = this.ox + 630;
    this.deactivationBackground.y = this.oy + 32;
    this.deactivationBackground.beginFill(6710886, 0.3);
    this.deactivationBackground.drawRoundedRect(0, 0, 314, 336, 8);
    this.deactivationBackground.endFill();
    this.container.addChild(this.deactivationBackground);
    this.deactivationTitle = new PIXI.BitmapText("Deactivate account", {
      fontName: "Open Sans",
      fontSize: 26,
    });
    this.deactivationTitle.x = this.ox + 638;
    this.deactivationTitle.y = this.oy + 40;
    this.deactivationTitle.tint = 16746496;
    this.container.addChild(this.deactivationTitle);
    this.deactivationInfo = new PIXI.BitmapText(
      "Permanently deactivate this account.\n\nThe email address associated with\nthis account will become available for\nnew account registration.",
      { fontName: "Open Sans", fontSize: 22 }
    );
    this.deactivationInfo.x = this.ox + 636;
    this.deactivationInfo.y = this.oy + 78;
    this.deactivationInfo.tint = 13421772;
    this.container.addChild(this.deactivationInfo);
    this.passwordTitle = new PIXI.BitmapText("Password", { fontName: "Open Sans", fontSize: 22 });
    this.passwordTitle.x = this.ox + 636;
    this.passwordTitle.y = this.oy + 210;
    this.passwordTitle.tint = 16777215;
    this.container.addChild(this.passwordTitle);
    this.passwordField = new InputField("password");
    this.passwordField.setDimensions(300, 35);
    this.passwordField.forceLowerCase = !1;
    this.passwordField.setMaxChars(32);
    this.passwordField.setPassword(!0);
    this.passwordField.x = this.ox + 636;
    this.passwordField.y = this.oy + 230;
    this.passwordField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.@!#$%^&*()[]"
    );
    this.container.addChild(this.passwordField);
    this.deactivateButton = new Button("deactivate_account");
    this.deactivateButton.selected = !0;
    this.deactivateButton.setText("Deactivate account");
    this.deactivateButton.scale.x = this.deactivateButton.scale.y = 0.8;
    this.deactivateButton.addListener(
      Button.BUTTON_RELEASED,
      this.onDeactivateButtonReleased.bind(this)
    );
    this.deactivateButton.x = this.ox + 646;
    this.deactivateButton.y = this.oy + 284;
    this.deactivateButton.setTint(16711680);
    this.container.addChild(this.deactivateButton);
    this.deactivationErrorMessage = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 22,
      align: "left",
      multiline: !0,
    });
    this.deactivationErrorMessage.x = this.ox + 648;
    this.deactivationErrorMessage.y = this.oy + 320;
    this.deactivationErrorMessage.tint = 16711680;
    this.deactivationErrorMessage.maxWidth = 300;
    this.container.addChild(this.deactivationErrorMessage);
  }
  validatePasswordForm() {
    let a = !0,
      b = "";
    const c = this.oldPasswordField.getText(),
      d = this.newPasswordField.getText(),
      e = this.repeatPasswordField.getText();
    8 > c.length
      ? ((a = !1),
        (b = "Password must be at least 8 characters long."),
        this.oldPasswordField.markInvalid())
      : this.oldPasswordField.markNone();
    a && 8 > d.length
      ? ((a = !1),
        (b = "Password must be at least 8 characters long."),
        this.newPasswordField.markInvalid())
      : this.newPasswordField.markNone();
    a && 8 > e.length
      ? ((a = !1),
        (b = "Password must be at least 8 characters long."),
        this.repeatPasswordField.markInvalid())
      : this.repeatPasswordField.markNone();
    a && d !== e
      ? ((a = !1),
        (b = "Passwords do not match."),
        this.newPasswordField.markInvalid(),
        this.repeatPasswordField.markInvalid())
      : (this.newPasswordField.markNone(), this.repeatPasswordField.markNone());
    a && this.displayErrorMessage("");
    this.successMessage.text = "";
    return { valid: a, error: b };
  }
  validateDeactivationForm() {
    let a = !0,
      b = "";
    8 > this.passwordField.getText().length
      ? ((a = !1), (b = "Invalid password."), this.passwordField.markInvalid())
      : this.passwordField.markNone();
    a && this.displayDeactivationErrorMessage("");
    return { valid: a, error: b };
  }
  validateNameChangeForm() {
    let a = !0,
      b = "";
    4 > this.nameField.getText().length
      ? ((b = "Username is too short."), (a = !1), this.nameField.markInvalid())
      : a && this.nameField.markValid();
    const c = this.verificationPasswordField.getText();
    a && 8 > c.length
      ? ((a = !1), (b = "Invalid password."), this.verificationPasswordField.markInvalid())
      : this.verificationPasswordField.markNone();
    a && this.displayUsernameErrorMessage("");
    return { valid: a, error: b };
  }
  async onSavePasswordButtonReleased() {
    this.savePasswordButton.disable();
    var a = this.validatePasswordForm();
    a.valid
      ? ((a = await APIClient.renewPassword(
          this.newPasswordField.getText(),
          this.oldPasswordField.getText(),
          App.Credential.id
        )),
        this.savePasswordButton.enable(),
        !1 === a.success
          ? this.displayErrorMessage(a.error)
          : (this.oldPasswordField.setText(""),
            this.newPasswordField.setText(""),
            this.repeatPasswordField.setText(""),
            (this.successMessage.text = "New password saved.")))
      : (this.displayErrorMessage(a.error), this.savePasswordButton.enable());
  }
  async onSaveUsernameButtonReleased() {
    this.saveUsernameButton.disable();
    var a = this.validateNameChangeForm();
    if (a.valid)
      if (
        ((a = await APIClient.postUsername(
          this.nameField.getText(),
          this.verificationPasswordField.getText(),
          App.Credential.id
        )),
        this.saveUsernameButton.enable(),
        !1 === a.success)
      )
        this.displayUsernameErrorMessage(a.error);
      else {
        a = this.nameField.getText().trim();
        var b = this.verificationPasswordField.getText();
        this.verificationPasswordField.setText("");
        this.changeUsernameSuccessMessage.text = "Username changed.";
        this.saveUsernameButton.disable();
        this.emit(Layer.Events.PROFILE_RENAME, { name: a, password: b });
      }
    else this.displayUsernameErrorMessage(a.error), this.saveUsernameButton.enable();
  }
  async onDeactivateButtonReleased() {
    this.deactivateButton.disable();
    var a = this.validateDeactivationForm();
    a.valid
      ? ((a = await APIClient.deactivateAccount(this.passwordField.getText(), App.Credential.id)),
        this.deactivateButton.enable(),
        !1 === a.success
          ? this.displayDeactivationErrorMessage(a.error)
          : (this.passwordField.setText(""),
            this.displayDeactivationErrorMessage("Account deactivated."),
            Registry.Instance.store(Registry.Key.CREDENTIAL, { available: !1 }),
            setTimeout(() => this.emit(Layer.Events.LOGOUT), 1e3)))
      : (this.displayDeactivationErrorMessage(a.error), this.deactivateButton.enable());
  }
  displayErrorMessage(a) {
    this.errorMessage.text = a;
  }
  displayUsernameErrorMessage(a) {
    this.changeUsernameErrorMessage.text = a;
  }
  displayDeactivationErrorMessage(a) {
    this.deactivationErrorMessage.text = a;
  }
  load() {
    this.nameField.setText(App.Credential.username);
  }
}
AccountTab.LOGOUT = "logout";
var incompleteaccounttab = {};
export class IncompleteAccountTab extends Feature {
  constructor(a, b) {
    super();
    this.w = a;
    this.h = b;
    this.ox = 20;
    this.oy = 126;
    this.accountSettingsTitle = new PIXI.Text("Account settings", FontStyle.MediumOrangeText);
    this.accountSettingsTitle.x = this.ox - 4;
    this.accountSettingsTitle.y = 100;
    this.accountSettingsTitle.tint = 16763904;
    this.accountSettingsTitle.resolution = 2;
    this.addChild(this.accountSettingsTitle);
    this.autogenDescription = new PIXI.Text(
      "Your account does not have a password.\nAccount settings will be available after you set a password for this account.\n\nClick the 'Complete registration' button below to set a password and get full access to account settings.",
      {
        fontSize: 17,
        fontFamily: "Arial",
        fill: 15658734,
        lineJoin: "round",
        strokeThickness: 2,
        lineHeight: 24,
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 600,
      }
    );
    this.autogenDescription.x = this.ox + 10;
    this.autogenDescription.y = 156;
    this.container.addChild(this.autogenDescription);
    this.renameButton = new Button("rename");
    this.renameButton.selected = !0;
    this.renameButton.setText("Complete registration");
    this.renameButton.scale.x = this.renameButton.scale.y = 0.9;
    this.renameButton.addListener(Button.BUTTON_RELEASED, () =>
      this.emit(Layer.Events.RENAME_ACCESS)
    );
    this.renameButton.x = this.ox + 14;
    this.renameButton.y = this.oy + 200;
    this.renameButton.setTint(16763904);
    this.container.addChild(this.renameButton);
  }
}
var levelbar = {};
export class LevelBar extends PIXI.Container {
  constructor() {
    super();
    this.ox = 0;
    this.w = 300;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.1);
    this.background.drawRoundedRect(0, 0, this.w, 16, 8);
    this.background.endFill();
    this.addChild(this.background);
    this.bar = new PIXI.Graphics();
    this.addChild(this.bar);
    this.previousText = new PIXI.BitmapText("", { fontName: "Open Sans", fontSize: 24 });
    this.previousText.x = this.ox - 4;
    this.previousText.y = -4;
    this.previousText.tint = 16755200;
    this.previousText.anchor.x = 1;
    this.addChild(this.previousText);
    this.previousXpText = new PIXI.BitmapText("", { fontName: "Open Sans", fontSize: 22 });
    this.previousXpText.x = this.ox + 24;
    this.previousXpText.y = 18;
    this.previousXpText.tint = 13421772;
    this.previousXpText.anchor.x = 1;
    this.addChild(this.previousXpText);
    this.currentText = new PIXI.BitmapText("", { fontName: "Open Sans", fontSize: 22 });
    this.currentText.x = this.ox;
    this.currentText.y = 32;
    this.currentText.anchor.x = 0.5;
    this.currentText.tint = 16777215;
    this.addChild(this.currentText);
    this.nextText = new PIXI.BitmapText("", { fontName: "Open Sans", fontSize: 24 });
    this.nextText.x = this.w + 4;
    this.nextText.y = -4;
    this.nextText.tint = 16755200;
    this.addChild(this.nextText);
    this.nextXpText = new PIXI.BitmapText("", { fontName: "Open Sans", fontSize: 22 });
    this.nextXpText.x = this.w - 28;
    this.nextXpText.y = 16;
    this.nextXpText.tint = 13421772;
    this.nextXpText.anchor.x = 0;
    this.addChild(this.nextXpText);
  }
  load(a, b, c) {
    let d = LevelBar.XPToLevel(a),
      e = LevelBar.XPToLevel(c),
      f = Math.min((1 / (c - a)) * (this.w - this.ox - 16) * (b - a), this.w - 16);
    this.currentText.x = f;
    this.previousXpText.text = numberWithPeriods(Math.ceil(a));
    this.nextXpText.text = numberWithPeriods(Math.ceil(c));
    this.currentText.text = numberWithPeriods(Math.ceil(b));
    this.previousText.text = numberWithPeriods(d);
    this.nextText.text = numberWithPeriods(e);
    this.bar.clear();
    this.bar.beginFill(16777215, 0.3);
    this.bar.drawRect(8, 5, f, 6);
    this.bar.endFill();
    this.bar.lineStyle(1, 16777215, 1);
    this.bar.moveTo(f + 8, -1);
    this.bar.lineTo(f + 8, 20);
  }
}
LevelBar.XPToLevel = (a) => Math.min(Math.max(Math.floor(0.2 * Math.sqrt(a / 15.625)), 1), 240);
var usermenu = {};
export class UserMenu extends Feature {
  constructor() {
    super();
    this.id = null;
    this.ox = 20;
    this.oy = 50;
    this.playerName = "";
    this.clanId = -1;
    this.weapons = [];
    this.weaponData = [];
    this.history = [];
    this.historyData = [];
    this.twitchUrl = this.youtubeUrl = "";
    this.allowHistoryLoad = !0;
    this.display = UserMenu.GENERAL;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.background.beginFill(6710886, 0.3);
    this.background.drawRoundedRect(20, 22, 620, 270, 8);
    this.background.endFill();
    this.background.beginFill(6710886, 0.3);
    this.background.drawRoundedRect(30, 242, 182, 40, 8);
    this.background.drawRoundedRect(20, 304, 620, 120, 8);
    this.background.endFill();
    this.container.addChild(this.background);
    this.background.interactive = !0;
    this.w = this.width;
    this.h = this.height;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 48;
    this.closeButton.y = this.oy + 14;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.onCloseButtonReleased());
    this.container.addChild(this.closeButton);
    this.generalStatsButton = new PIXI.Graphics();
    this.generalStatsButton.lineStyle(1, 16777215, 0.1, 0);
    this.generalStatsButton.beginFill(16777215, 0.2);
    this.generalStatsButton.drawRect(0, 0, 90, 28, 4);
    this.generalStatsButton.endFill();
    this.generalStatsButton.x = this.ox + 202;
    this.generalStatsButton.y = this.oy + 24;
    this.generalStatsButton.tint = 13421772;
    this.generalStatsButton.interactive = !0;
    this.generalStatsButton.on("mouseover", () => {
      this.generalStatsLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.generalStatsButton.on("mouseout", () => {
      this.generalStatsLabel.alpha = this.display === UserMenu.GENERAL ? 1 : 0.5;
    });
    this.generalStatsButton.on("mousedown", () => {
      this.displayGeneralContainer();
      AudioEffects.ButtonClick.audio.play();
    });
    this.container.addChild(this.generalStatsButton);
    this.generalStatsLabel = new PIXI.Text("General", FontStyle.MediumMenuTextOrange);
    this.generalStatsLabel.x =
      this.generalStatsButton.x +
      0.5 * (this.generalStatsButton.width - this.generalStatsLabel.width);
    this.generalStatsLabel.y = this.generalStatsButton.y + 3;
    this.generalStatsLabel.resolution = 2;
    this.generalStatsLabel.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.generalStatsLabel);
    this.historyButton = new PIXI.Graphics();
    this.historyButton.lineStyle(1, 16777215, 0.1, 0);
    this.historyButton.beginFill(16777215, 0.2);
    this.historyButton.drawRect(0, 0, 90, 28, 4);
    this.historyButton.endFill();
    this.historyButton.x = this.generalStatsButton.x + this.generalStatsButton.width + 5;
    this.historyButton.y = this.oy + 24;
    this.historyButton.tint = 13421772;
    this.historyButton.alpha = 0.5;
    this.historyButton.interactive = !0;
    this.historyButton.on("mouseover", () => {
      this.historyLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.historyButton.on("mouseout", () => {
      this.historyLabel.alpha = this.display === UserMenu.HISTORY ? 1 : 0.5;
    });
    this.historyButton.on("mousedown", () => {
      this.displayHistoryContainer();
      AudioEffects.ButtonClick.audio.play();
    });
    this.container.addChild(this.historyButton);
    this.historyLabel = new PIXI.Text("1v1 Games", FontStyle.MediumMenuTextOrange);
    this.historyLabel.alpha = 1;
    this.historyLabel.x =
      this.historyButton.x + 0.5 * (this.historyButton.width - this.historyLabel.width);
    this.historyLabel.y = this.historyButton.y + 3;
    this.historyLabel.resolution = 2;
    this.historyLabel.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.historyLabel);
    this.weaponStatsButton = new PIXI.Graphics();
    this.weaponStatsButton.lineStyle(1, 16777215, 0.1, 0);
    this.weaponStatsButton.beginFill(16777215, 0.2);
    this.weaponStatsButton.drawRect(0, 0, 90, 28, 4);
    this.weaponStatsButton.endFill();
    this.weaponStatsButton.x = this.historyButton.x + this.historyButton.width + 5;
    this.weaponStatsButton.y = this.oy + 24;
    this.weaponStatsButton.tint = 13421772;
    this.weaponStatsButton.alpha = 0.5;
    this.weaponStatsButton.interactive = !0;
    this.weaponStatsButton.on("mouseover", () => {
      this.weaponStatsLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.weaponStatsButton.on("mouseout", () => {
      this.weaponStatsLabel.alpha = this.display === UserMenu.WEAPONS ? 1 : 0.5;
    });
    this.weaponStatsButton.on("mousedown", () => {
      this.displayWeaponContainer();
      AudioEffects.ButtonClick.audio.play();
    });
    this.container.addChild(this.weaponStatsButton);
    this.weaponStatsLabel = new PIXI.Text("Weapons", FontStyle.MediumMenuTextOrange);
    this.weaponStatsLabel.alpha = 0.5;
    this.weaponStatsLabel.resolution = 2;
    this.weaponStatsLabel.x =
      this.weaponStatsButton.x + 0.5 * (this.weaponStatsButton.width - this.weaponStatsLabel.width);
    this.weaponStatsLabel.y = this.weaponStatsButton.y + 3;
    this.weaponStatsLabel.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.weaponStatsLabel);
    this.contactButton = new PIXI.Graphics();
    this.contactButton.lineStyle(1, 16777215, 0.1, 0);
    this.contactButton.beginFill(16777215, 0.2);
    this.contactButton.drawRect(0, 0, 90, 28, 4);
    this.contactButton.endFill();
    this.contactButton.x = this.weaponStatsButton.x + this.weaponStatsButton.width + 5;
    this.contactButton.y = this.oy + 24;
    this.contactButton.tint = 13421772;
    this.contactButton.alpha = 0.5;
    this.contactButton.interactive = !0;
    this.contactButton.on("mouseover", () => {
      this.contactLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.contactButton.on("mouseout", () => {
      this.contactLabel.alpha = this.display === UserMenu.CONTACT ? 1 : 0.5;
    });
    this.contactButton.on("mousedown", () => {
      this.displayContactContainer();
      AudioEffects.ButtonClick.audio.play();
    });
    this.container.addChild(this.contactButton);
    this.contactLabel = new PIXI.Text("Contact", FontStyle.MediumMenuTextOrange);
    this.contactLabel.alpha = 1;
    this.contactLabel.x =
      this.contactButton.x + 0.5 * (this.contactButton.width - this.contactLabel.width);
    this.contactLabel.y = this.contactButton.y + 3;
    this.contactLabel.resolution = 2;
    this.contactLabel.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.contactLabel);
    this.creationLabel = new PIXI.Text("Created", FontStyle.CreatedText);
    this.creationLabel.x = this.ox;
    this.creationLabel.y = this.h - 20;
    this.creationLabel.resolution = 2;
    this.container.addChild(this.creationLabel);
    this.createdText = new PIXI.Text("Loading..", FontStyle.ActivityText);
    this.createdText.x = this.ox + 62;
    this.createdText.y = this.h - 20;
    this.createdText.resolution = 2;
    this.container.addChild(this.createdText);
    this.activityLabel = new PIXI.Text("Last seen", FontStyle.CreatedText);
    this.activityLabel.x = this.ox;
    this.activityLabel.y = this.h;
    this.activityLabel.resolution = 2;
    this.container.addChild(this.activityLabel);
    this.activityText = new PIXI.Text("Loading..", FontStyle.ActivityText);
    this.activityText.x = this.ox + 72;
    this.activityText.y = this.h;
    this.activityText.tint = 16777215;
    this.activityText.resolution = 2;
    this.container.addChild(this.activityText);
    this.visualizer = new Visualizer(176, 176, !0, !0, !1);
    this.visualizer.x = this.ox + 12;
    this.visualizer.y = this.oy + 54;
    this.visualizer.interactive = !0;
    this.container.addChild(this.visualizer);
    this.overviewTitle = new PIXI.Text("Loading..", FontStyle.OverviewTitle);
    this.overviewTitle.x = this.visualizer.x + 0.5 * this.visualizer.width;
    this.overviewTitle.y = this.oy + 22;
    this.overviewTitle.anchor.x = 0.5;
    this.overviewTitle.resolution = 2;
    this.container.addChild(this.overviewTitle);
    this.clanLabelText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite);
    this.clanLabelText.x = this.visualizer.x + 0.5 * this.visualizer.width;
    this.clanLabelText.y = this.oy + 232;
    this.clanLabelText.anchor.x = 0.5;
    this.clanLabelText.resolution = 2;
    this.clanLabelText.interactive = !0;
    this.clanLabelText.hitArea = new PIXI.Rectangle(
      0.5 * -this.clanLabelText.width,
      0.25 * -this.clanLabelText.height,
      this.clanLabelText.width,
      40
    );
    this.clanLabelText.on("mouseover", () => {
      this.clanLabelText.tint = 16776960;
      this.clanText.tint = 16711680;
    });
    this.clanLabelText.on("mouseout", () => {
      this.clanLabelText.tint = 16777215;
      this.clanText.tint = 16763904;
    });
    this.clanLabelText.on("mousedown", () => {
      -1 !== this.clanId && this.emit(Layer.Events.CLAN_ACCESS, this.clanId);
    });
    this.container.addChild(this.clanLabelText);
    this.clanText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextOrange3);
    this.clanText.x = this.visualizer.x + 0.5 * this.visualizer.width;
    this.clanText.y = this.oy + 251;
    this.clanText.anchor.x = 0.5;
    this.clanText.hitArea = new PIXI.Rectangle();
    this.clanText.resolution = 2;
    this.container.addChild(this.clanText);
    this.generalContainer = new PIXI.Container();
    this.levelLabel = new PIXI.Text("XP Level", FontStyle.SmallMenuTextOrange2);
    this.levelLabel.x = this.ox + 210;
    this.levelLabel.y = this.oy + 60;
    this.levelLabel.resolution = 2;
    this.generalContainer.addChild(this.levelLabel);
    this.levelText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.levelText.x = this.ox + 233;
    this.levelText.y = this.oy + 86;
    this.levelText.resolution = 2;
    this.generalContainer.addChild(this.levelText);
    this.rankLabel = new PIXI.Text("XP Rank", FontStyle.SmallMenuTextOrange2);
    this.rankLabel.x = this.ox + 210;
    this.rankLabel.y = this.oy + 114;
    this.rankLabel.resolution = 2;
    this.generalContainer.addChild(this.rankLabel);
    this.rankText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.rankText.x = this.ox + 210;
    this.rankText.y = this.oy + 138;
    this.rankText.resolution = 2;
    this.generalContainer.addChild(this.rankText);
    this.ratingIcon = new PIXI.Sprite();
    this.ratingIcon.x = this.ox + 368;
    this.ratingIcon.y = this.oy + 96;
    this.ratingIcon.scale.x = this.ratingIcon.scale.y = 0.6;
    this.ratingIcon.anchor.x = this.ratingIcon.anchor.y = 0.5;
    this.generalContainer.addChild(this.ratingIcon);
    this.skillLabel = new PIXI.Text("Skill", FontStyle.SmallMenuTextOrange2);
    this.skillLabel.x = this.ox + 360;
    this.skillLabel.y = this.oy + 60;
    this.skillLabel.resolution = 2;
    this.generalContainer.addChild(this.skillLabel);
    this.skillText = new PIXI.Text("Loading..", {
      fontName: "Arial",
      fontSize: 17,
      lineHeight: 20,
      fill: 16777215,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.skillText.x = this.ox + 386;
    this.skillText.y = this.oy + 86;
    this.skillText.resolution = 2;
    this.generalContainer.addChild(this.skillText);
    this.skillRankLabel = new PIXI.Text("Skill Rank", FontStyle.SmallMenuTextOrange2);
    this.skillRankLabel.x = this.ox + 360;
    this.skillRankLabel.y = this.oy + 114;
    this.skillRankLabel.resolution = 2;
    this.generalContainer.addChild(this.skillRankLabel);
    this.skillRankText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite);
    this.skillRankText.x = this.ox + 360;
    this.skillRankText.y = this.oy + 138;
    this.skillRankText.resolution = 2;
    this.generalContainer.addChild(this.skillRankText);
    this.killsLabel = new PIXI.Text("Kills", FontStyle.SmallMenuTextOrange2);
    this.killsLabel.x = this.ox + 510;
    this.killsLabel.y = this.oy + 60;
    this.killsLabel.resolution = 2;
    this.generalContainer.addChild(this.killsLabel);
    this.killsText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.killsText.x = this.ox + 510;
    this.killsText.y = this.oy + 84;
    this.killsText.resolution = 2;
    this.generalContainer.addChild(this.killsText);
    this.deathsLabel = new PIXI.Text("Deaths", FontStyle.SmallMenuTextOrange2);
    this.deathsLabel.x = this.ox + 510;
    this.deathsLabel.y = this.oy + 114;
    this.deathsLabel.resolution = 2;
    this.generalContainer.addChild(this.deathsLabel);
    this.deathsText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.deathsText.x = this.ox + 510;
    this.deathsText.y = this.oy + 138;
    this.deathsText.resolution = 2;
    this.generalContainer.addChild(this.deathsText);
    this.capsLabel = new PIXI.Text("CTF Caps", FontStyle.SmallMenuTextOrange2);
    this.capsLabel.x = this.ox + 510;
    this.capsLabel.y = this.oy + 168;
    this.capsLabel.resolution = 2;
    this.generalContainer.addChild(this.capsLabel);
    this.capsText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.capsText.x = this.ox + 510;
    this.capsText.y = this.oy + 192;
    this.capsText.tint = 16777215;
    this.capsText.resolution = 2;
    this.generalContainer.addChild(this.capsText);
    this.levelIcon = new PIXI.Sprite();
    this.levelIcon.x = this.ox + 200;
    this.levelIcon.y = this.oy + 76;
    this.levelIcon.scale.x = this.levelIcon.scale.y = 0.5;
    this.generalContainer.addChild(this.levelIcon);
    this.socialTitle = new PIXI.Text("Streaming & video channels", FontStyle.InputFieldTitle1);
    this.socialTitle.x = this.ox + 12;
    this.socialTitle.y = this.oy + 300;
    this.socialTitle.tint = 16777215;
    this.socialTitle.resolution = 2;
    this.container.addChild(this.socialTitle);
    this.youtubeButton = new PIXI.Graphics();
    this.youtubeButton.lineStyle(1, 16777215, 0.1, 0);
    this.youtubeButton.drawRoundedRect(0, 0, 240, 34, 4);
    this.youtubeButton.x = this.ox + 12;
    this.youtubeButton.y = this.oy + 328;
    this.youtubeButton.tint = 13421772;
    this.youtubeButton.interactive = !0;
    this.youtubeButton.on("mouseover", () => {
      this.youtubeTitle.tint = 16777215;
      this.youtubeLogo.tint = 16777215;
    });
    this.youtubeButton.on("mouseout", () => {
      this.youtubeTitle.tint = 13421772;
      this.youtubeLogo.tint = 13421772;
    });
    this.youtubeButton.on("mousedown", () => {
      20 < this.youtubeUrl.length && window.open(this.youtubeUrl, "_blank");
    });
    this.youtubeButton.hitArea = new PIXI.Rectangle(0, 0, 240, 34);
    this.container.addChild(this.youtubeButton);
    this.youtubeLogo = new PIXI.Sprite(App.CombinedTextures.youtube_logo);
    this.youtubeLogo.scale.x = this.youtubeLogo.scale.y = 0.5;
    this.youtubeLogo.x = this.ox + 18;
    this.youtubeLogo.y = this.oy + 333;
    this.youtubeLogo.tint = 13421772;
    this.container.addChild(this.youtubeLogo);
    this.youtubeTitle = new PIXI.Text("YouTube", FontStyle.SmallMenuTextYellow);
    this.youtubeTitle.x = this.ox + 58;
    this.youtubeTitle.y = this.oy + 334;
    this.youtubeTitle.tint = 13421772;
    this.youtubeTitle.hitArea = new PIXI.Rectangle();
    this.youtubeTitle.resolution = 2;
    this.container.addChild(this.youtubeTitle);
    this.twitchButton = new PIXI.Graphics();
    this.twitchButton.lineStyle(1, 16777215, 0.1, 0);
    this.twitchButton.drawRoundedRect(0, 0, 240, 34, 4);
    this.twitchButton.x = this.ox + 12;
    this.twitchButton.y = this.oy + 368;
    this.twitchButton.tint = 13421772;
    this.twitchButton.interactive = !0;
    this.twitchButton.on("mouseover", () => {
      this.twitchTitle.tint = 16777215;
      this.twitchLogo.tint = 16777215;
    });
    this.twitchButton.on("mouseout", () => {
      this.twitchTitle.tint = 13421772;
      this.twitchLogo.tint = 13421772;
    });
    this.twitchButton.on("mousedown", () => {
      20 < this.twitchUrl.length && window.open(this.twitchUrl, "_blank");
    });
    this.twitchButton.hitArea = new PIXI.Rectangle(0, 0, 240, 34);
    this.container.addChild(this.twitchButton);
    this.twitchLogo = new PIXI.Sprite(App.CombinedTextures.twitch_logo);
    this.twitchLogo.scale.x = this.twitchLogo.scale.y = 0.75;
    this.twitchLogo.x = this.ox + 16;
    this.twitchLogo.y = this.oy + 370;
    this.twitchLogo.tint = 13421772;
    this.container.addChild(this.twitchLogo);
    this.twitchTitle = new PIXI.Text("Twitch", FontStyle.SmallMenuTextYellow);
    this.twitchTitle.x = this.ox + 59;
    this.twitchTitle.y = this.oy + 374;
    this.twitchTitle.tint = 13421772;
    this.twitchTitle.hitArea = new PIXI.Rectangle();
    this.twitchTitle.resolution = 2;
    this.container.addChild(this.twitchTitle);
    this.weaponContainer = new PIXI.Container();
    this.weaponTitle = new PIXI.Text("Favorite weapons", FontStyle.SmallMenuTextOrange);
    this.weaponTitle.x = this.ox + 210;
    this.weaponTitle.y = this.oy + 60;
    this.weaponTitle.resolution = 2;
    this.weaponContainer.addChild(this.weaponTitle);
    this.weaponNameLabel = new PIXI.Text("Type", FontStyle.SmallMenuTextOrange3);
    this.weaponNameLabel.x = this.ox + 210;
    this.weaponNameLabel.y = this.oy + 82;
    this.weaponNameLabel.resolution = 2;
    this.weaponContainer.addChild(this.weaponNameLabel);
    this.weaponKillsLabel = new PIXI.Text("Kills", FontStyle.SmallMenuTextOrange3);
    this.weaponKillsLabel.x = this.ox + 480;
    this.weaponKillsLabel.y = this.oy + 82;
    this.weaponKillsLabel.resolution = 2;
    this.weaponContainer.addChild(this.weaponKillsLabel);
    this.listContainer = new PIXI.Container();
    this.listContainer.x = this.ox + 224;
    this.listContainer.y = this.oy + 60;
    this.weaponListContainer = new PIXI.Container();
    this.listContainer.addChild(this.weaponListContainer);
    this.weaponContainer.addChild(this.listContainer);
    this.scrollbar = new WeaponListScrollbar(172);
    this.scrollbar.x = this.ox + 598;
    this.scrollbar.y = this.oy + 102;
    this.scrollbar.on(WeaponListScrollbar.SCROLL, (a) => {
      this.display === UserMenu.WEAPONS && this.maskWeaponList(a);
    });
    this.historyContainer = new PIXI.Container();
    this.historyTitle = new PIXI.Text("1v1 Games", FontStyle.SmallMenuTextOrange);
    this.historyTitle.x = this.ox + 210;
    this.historyTitle.y = this.oy + 60;
    this.historyTitle.resolution = 2;
    this.historyContainer.addChild(this.historyTitle);
    this.resultLabel = new PIXI.Text("Result", FontStyle.SmallMenuTextOrange3);
    this.resultLabel.x = this.ox + 210;
    this.resultLabel.y = this.oy + 82;
    this.resultLabel.resolution = 2;
    this.historyContainer.addChild(this.resultLabel);
    this.opponentNameLabel = new PIXI.Text("Opponent", FontStyle.SmallMenuTextOrange3);
    this.opponentNameLabel.x = this.ox + 285;
    this.opponentNameLabel.y = this.oy + 82;
    this.opponentNameLabel.resolution = 2;
    this.historyContainer.addChild(this.opponentNameLabel);
    this.pointsLabel = new PIXI.Text("Points", FontStyle.SmallMenuTextOrange3);
    this.pointsLabel.x = this.ox + 430;
    this.pointsLabel.y = this.oy + 82;
    this.pointsLabel.resolution = 2;
    this.historyContainer.addChild(this.pointsLabel);
    this.historyListContainer = new PIXI.Container();
    this.historyListContainer.x = this.ox + 224;
    this.historyListContainer.y = this.oy + 60;
    this.matchHistoryListContainer = new PIXI.Container();
    this.historyListContainer.addChild(this.matchHistoryListContainer);
    this.historyContainer.addChild(this.historyListContainer);
    this.historyScrollbar = new WeaponListScrollbar(172);
    this.historyScrollbar.x = this.ox + 598;
    this.historyScrollbar.y = this.oy + 102;
    this.historyScrollbar.on(WeaponListScrollbar.SCROLL, (a) => {
      this.maskHistoryList(a);
    });
    this.contactContainer = new PIXI.Container();
    this.friendInvitationText = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 17,
      fill: 16776960,
      strokeThickness: 2,
      lineJoin: "round",
      padding: 2,
    });
    this.friendInvitationText.resolution = 2;
    this.friendInvitationButton = new Button("connect");
    this.friendInvitationButton.selected = !0;
    this.friendInvitationButton.setText("Send friend invitation");
    this.friendInvitationButton.scale.x = this.friendInvitationButton.scale.y = 0.8;
    this.friendInvitationButton.addListener(Button.BUTTON_RELEASED, async () => {
      this.friendInvitationButton.disable();
      let a = await APIClient.postInviteFriend(this.playerName, App.Credential.id);
      this.friendInvitationText.text = a.success
        ? "Friend invitation sent to " + this.playerName
        : a.error;
    });
    this.friendInvitationButton.x = this.ox + 210;
    this.friendInvitationButton.y = this.oy + 70;
    this.friendInvitationButton.setTint(16763904);
    this.contactContainer.addChild(this.friendInvitationButton);
    this.friendInvitationText.x = this.friendInvitationButton.x - 5;
    this.friendInvitationText.y = this.friendInvitationButton.y + 40;
    this.contactContainer.addChild(this.friendInvitationText);
    this.displayGeneralContainer();
  }
  async load(a, b = "id", c = null) {
    var d = this.id;
    this.clanId = this.id = -1;
    this.youtubeButton.interactive = !1;
    this.youtubeLogo.alpha = 0.4;
    this.youtubeTitle.alpha = 0.4;
    this.youtubeUrl = "";
    this.youtubeTitle.text = "YouTube";
    this.twitchButton.interactive = !1;
    this.twitchLogo.alpha = 0.4;
    this.twitchTitle.alpha = 0.4;
    this.twitchUrl = "";
    this.twitchTitle.text = "Twitch";
    this.friendInvitationButton.disable();
    this.friendInvitationText.text =
      "guest" === App.Credential.accounttype
        ? "Register or login to invite friends.\nFriends can invite you to join their clan."
        : "Friends can invite you to join their clan.";
    this.visualizer.hide();
    this.overviewTitle.text = "Loading..";
    this.levelText.text = "Loading..";
    this.rankText.text = "Loading..";
    this.skillRankText.text = "Loading..";
    this.skillText.text = "Loading..";
    this.killsText.text = "Loading..";
    this.deathsText.text = "Loading..";
    this.capsText.text = "Loading..";
    this.createdText.text = "Loading..";
    this.activityText.text = "Loading..";
    this.clanLabelText.text = "Loading..";
    this.clanText.text = "";
    if (
      (a = "id" === b ? await APIClient.getUserProfile(a) : await APIClient.getUserProfileByName(a))
    ) {
      this.id = a.id;
      "guest" !== App.Credential.accounttype &&
        this.id !== App.Credential.playerid &&
        this.friendInvitationButton.enable();
      c && (this.display = c);
      this.display === UserMenu.HISTORY &&
        (this.id !== d && (this.allowHistoryLoad = !0), this.displayHistoryContainer());
      this.playerName = a.name;
      c = new Date(Date.parse(a.seen));
      d = c.getDate().toString().padStart(2, "0");
      b = (c.getMonth() + 1).toString().padStart(2, "0");
      var e = c.getFullYear();
      c = Date.now() - 864e5 < c.getTime() ? "Today" : d + "-" + b + "-" + e;
      d = new Date(Date.parse(a.created));
      b = d.getDate().toString().padStart(2, "0");
      e = (d.getMonth() + 1).toString().padStart(2, "0");
      var f = d.getFullYear();
      d = Date.now() - 864e5 < d.getTime() ? "Today" : b + "-" + e + "-" + f;
      b = Math.min(Math.max(Math.floor(0.2 * Math.sqrt(parseInt(a.experience) / 15.625)), 1), 240);
      e = Math.max(Math.floor((b / 240) * 15) + 1);
      this.overviewTitle.text = a.name;
      this.overviewTitle.scale.x = this.overviewTitle.scale.y =
        200 < this.overviewTitle.width ? 200 / this.overviewTitle.width : 1;
      this.levelText.text = numberWithPeriods(b);
      this.skillRankText.text =
        numberWithPeriods(a.skill_ranking) + "\n" + Game.MapSkillToTitle(a.skill);
      this.skillText.text = numberWithPeriods(a.skill);
      this.killsText.text = numberWithPeriods(a.kills);
      this.deathsText.text = numberWithPeriods(a.deaths);
      this.capsText.text = numberWithPeriods(a.caps);
      this.createdText.text = d;
      this.activityText.text = c;
      this.rankText.text = numberWithPeriods(a.ranking);
      this.ratingIcon.texture =
        App.CombinedTextures["rank_icon_" + (Game.MapSkillToIndex(a.skill) + 1)];
      this.visualizer.applyCustomization(a.customization);
      this.visualizer.show();
      this.levelIcon.texture = App.CombinedTextures["skill_icon_" + e];
      -1 !== a.clan_id && null !== a.clan_id
        ? ((this.clanId = a.clan_id),
          (this.clanLabelText.text = "Clan " + a.clan_role + " of "),
          (this.clanText.text = a.clan_name),
          (this.clanLabelText.hitArea = new PIXI.Rectangle(
            0.5 * -this.clanLabelText.width,
            0.25 * -this.clanLabelText.height,
            this.clanLabelText.width,
            40
          )))
        : ((this.clanLabelText.text = "Not in a clan."), (this.clanText.text = ""));
      if (App.WhiteLabel !== App.WhiteLabel_POKI)
        for (c = 0; c < a.social.length; c++)
          switch (((d = a.social[c]), d.type)) {
            case "youtube":
              this.youtubeUrl = d.url;
              this.youtubeButton.interactive = !0;
              this.youtubeLogo.alpha = 1;
              this.youtubeTitle.alpha = 1;
              -1 !== d.url.indexOf("youtube.com/user/")
                ? (this.youtubeTitle.text =
                    "YouTube - " + d.url.substring(d.url.indexOf("youtube.com/user/") + 17))
                : (this.youtubeTitle.text = "YouTube - " + a.name);
              break;
            case "twitch":
              (this.twitchUrl = d.url),
                (this.twitchButton.interactive = !0),
                (this.twitchLogo.alpha = 1),
                (this.twitchTitle.alpha = 1),
                -1 !== d.url.indexOf("twitch.tv/")
                  ? (this.twitchTitle.text =
                      "Twitch - " + d.url.substring(d.url.indexOf("twitch.tv/") + 10))
                  : (this.twitchTitle.text = "Twitch - " + a.name);
          }
      if ((a = await APIClient.getUserWeaponStats(this.id))) {
        this.weaponData = JSON.parse(a);
        this.weaponListContainer.removeChildren();
        this.weapons = [];
        a = this.weaponData;
        for (c = 0; c < a.length; c++)
          (d = a[c]),
            (d = new WeaponItem(d.id, d.kills)),
            (d.x = 0),
            (d.y = 47 + c * WeaponListScrollbar.ItemHeight),
            this.weapons.push(d);
        this.weapons.length >
        Math.floor(WeaponListScrollbar.ListHeight / WeaponListScrollbar.ItemHeight)
          ? this.weaponContainer.addChild(this.scrollbar)
          : this.weaponContainer.removeChild(this.scrollbar);
        this.scrollbar.reset();
        this.maskWeaponList(0);
      }
    }
  }
  hide() {
    super.hide();
    this.scrollbar.disableWheel();
    this.historyScrollbar.disableWheel();
  }
  maskWeaponList(a) {
    let b = Math.floor(WeaponListScrollbar.ListHeight / WeaponListScrollbar.ItemHeight);
    this.weaponListContainer.removeChildren();
    if (this.weapons.length <= b)
      for (b = this.weapons.length, this.weaponListContainer.y = 0, a = 0; a < b; a++) {
        var c = this.weapons[a];
        c.x = -20;
        c.alpha = 1;
        this.weaponListContainer.addChild(c);
      }
    else {
      this.weaponListContainer.y = -(
        a *
        (this.weapons.length * WeaponListScrollbar.ItemHeight -
          (WeaponListScrollbar.ListHeight - WeaponListScrollbar.ItemHeight))
      );
      a = this.weaponListContainer.y;
      c = Math.floor(Math.abs(a / WeaponListScrollbar.ItemHeight));
      for (let e = 0; e < b; e++) {
        let f = this.weapons[c + e];
        f.x = -20;
        this.weaponListContainer.addChild(f);
        if (0 === e) {
          var d = c * WeaponListScrollbar.ItemHeight + a;
          f.alpha = 0 <= d ? 1 : 1 - (1 / (0.5 * WeaponListScrollbar.ItemHeight)) * Math.abs(d);
        } else
          e === b - 1
            ? ((d = c * WeaponListScrollbar.ItemHeight + a),
              (f.alpha =
                0 > d ? 1 : 1 - (1 / (0.5 * WeaponListScrollbar.ItemHeight)) * Math.abs(d)))
            : (f.alpha = 1);
      }
    }
  }
  maskHistoryList(a) {
    var b = MatchItem.HEIGHT;
    let c = Math.floor((WeaponListScrollbar.ListHeight - 10) / b);
    this.matchHistoryListContainer.removeChildren();
    if (this.history.length <= c)
      for (c = this.history.length, this.matchHistoryListContainer.y = 0, b = 0; b < c; b++)
        (a = this.history[b]),
          (a.x = -20),
          (a.alpha = 1),
          this.matchHistoryListContainer.addChild(a);
    else {
      this.matchHistoryListContainer.y = -(
        a *
        (this.history.length * b - (WeaponListScrollbar.ListHeight - 10 - b))
      );
      a = this.matchHistoryListContainer.y;
      var d = Math.floor(Math.abs(a / b));
      for (let f = 0; f < c; f++) {
        let g = this.history[d + f];
        g.x = -20;
        this.matchHistoryListContainer.addChild(g);
        if (0 === f) {
          var e = d * b + a;
          g.alpha = 0 <= e ? 1 : 1 - (1 / (0.5 * b)) * Math.abs(e);
        } else
          f === c - 1
            ? ((e = (d + 1) * b + a), (g.alpha = 0 > e ? 1 : 1 - (1 / (0.5 * b)) * Math.abs(e)))
            : (g.alpha = 1);
      }
    }
  }
  displayGeneralContainer() {
    this.generalContainer.parent || this.container.addChild(this.generalContainer);
    this.weaponContainer.parent && this.container.removeChild(this.weaponContainer);
    this.contactContainer.parent && this.container.removeChild(this.contactContainer);
    this.historyContainer.parent && this.container.removeChild(this.historyContainer);
    this.generalStatsLabel.alpha = this.generalStatsButton.alpha = 1;
    this.weaponStatsLabel.alpha = this.weaponStatsButton.alpha = 0.5;
    this.contactLabel.alpha = this.contactButton.alpha = 0.5;
    this.historyLabel.alpha = this.historyButton.alpha = 0.5;
    this.display = UserMenu.GENERAL;
  }
  displayWeaponContainer() {
    this.scrollbar.enableWheel();
    this.weaponContainer.parent || this.container.addChild(this.weaponContainer);
    this.generalContainer.parent && this.container.removeChild(this.generalContainer);
    this.contactContainer.parent && this.container.removeChild(this.contactContainer);
    this.historyContainer.parent && this.container.removeChild(this.historyContainer);
    this.generalStatsLabel.alpha = this.generalStatsButton.alpha = 0.5;
    this.weaponStatsLabel.alpha = this.weaponStatsButton.alpha = 1;
    this.contactLabel.alpha = this.contactButton.alpha = 0.5;
    this.historyLabel.alpha = this.historyButton.alpha = 0.5;
    this.display = UserMenu.WEAPONS;
  }
  async displayHistoryContainer() {
    this.historyScrollbar.enableWheel();
    if (this.allowHistoryLoad) {
      this.historyTitle.text = "1v1 Games - loading...";
      this.matchHistoryListContainer.removeChildren();
      var a = await APIClient.getMatchHistory(this.id);
      if (!a) return;
      this.allowHistoryLoad = !1;
      this.historyData = a.games;
      this.history = [];
      let c = (a = 0);
      for (let d = 0; d < this.historyData.length; d++) {
        var b = this.historyData[d];
        let e, f;
        this.id.toString() === b.aid1
          ? ((e = b.gd.p2_name), (f = b.gd.p1_delta), "win" === b.res && a++)
          : ((e = b.gd.p1_name),
            (f = b.gd.p2_delta),
            "win" === b.res && ((b.res = "loss"), c++),
            "noshow" === b.res && ((b.res = "noshow_self"), c++));
        let g = 0;
        0 < c ? (g = (1 / (a + c)) * a) : 0 < a && (g = 1);
        this.historyTitle.text =
          "1v1 Games - " + (Math.floor(100 * g) + "% win rate in " + (a + c) + " games");
        b = new MatchItem(b.id, e, b.res, f, b.date);
        b.x = 0;
        b.y = 47 + d * MatchItem.HEIGHT;
        this.history.push(b);
      }
      this.history.length >
      Math.floor(WeaponListScrollbar.ListHeight / WeaponListScrollbar.ItemHeight)
        ? this.historyContainer.addChild(this.historyScrollbar)
        : this.historyContainer.removeChild(this.historyScrollbar);
    }
    this.historyScrollbar.reset();
    this.maskHistoryList(0);
    this.weaponContainer.parent && this.container.removeChild(this.weaponContainer);
    this.generalContainer.parent && this.container.removeChild(this.generalContainer);
    this.contactContainer.parent && this.container.removeChild(this.contactContainer);
    this.historyContainer.parent || this.container.addChild(this.historyContainer);
    this.generalStatsLabel.alpha = this.generalStatsButton.alpha = 0.5;
    this.weaponStatsLabel.alpha = this.weaponStatsButton.alpha = 0.5;
    this.contactLabel.alpha = this.contactButton.alpha = 0.5;
    this.historyLabel.alpha = this.historyButton.alpha = 1;
    this.display = UserMenu.HISTORY;
  }
  displayContactContainer() {
    this.generalContainer.parent && this.container.removeChild(this.generalContainer);
    this.weaponContainer.parent && this.container.removeChild(this.weaponContainer);
    this.contactContainer.parent || this.container.addChild(this.contactContainer);
    this.historyContainer.parent && this.container.removeChild(this.historyContainer);
    this.generalStatsLabel.alpha = this.generalStatsButton.alpha = 0.5;
    this.weaponStatsLabel.alpha = this.weaponStatsButton.alpha = 0.5;
    this.contactLabel.alpha = this.contactButton.alpha = 1;
    this.historyLabel.alpha = this.historyButton.alpha = 0.5;
    this.display = UserMenu.CONTACT;
  }
  resize(a, b) {
    this.x = 0.5 * a - 0.5 * this.container.width;
    this.y = -8;
  }
  update() {
    this.visualizer.update();
  }
  onCloseButtonReleased() {
    this.emit(Layer.Events.USER_CANCEL);
  }
}
UserMenu.GENERAL = 1;
UserMenu.WEAPONS = 2;
UserMenu.CONTACT = 3;
UserMenu.HISTORY = 4;
export class WeaponItem extends PIXI.Container {
  constructor(a, b) {
    super();
    var c = Game.MapEventWepToId(a);
    this.id = c;
    this.name = void 0 !== ItemMap[c] ? ItemMap[c].title : this.id;
    this.kills = b;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRoundedRect(0, 0, 392, 38, 4);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0.5;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.5;
    });
    this.addChild(this.background);
    this.icon = Game.MapEventWepToIcon(a);
    this.icon.x = 25;
    this.icon.y = 23;
    this.icon.hitArea = new PIXI.Rectangle();
    a = this.icon.width;
    b = this.icon.height;
    c = a > b ? (24 < a ? 24 : a) : 12 < b ? 12 : b;
    this.icon.scale.x = this.icon.scale.y = a > b ? c / this.icon.width : c / this.icon.height;
    this.icon.rotation = -0.2;
    this.addChild(this.icon);
    this.nameLabel = new PIXI.Text(this.name, FontStyle.SmallMenuTextOrange3);
    this.nameLabel.x = 90;
    this.nameLabel.y = 10;
    this.nameLabel.resolution = 2;
    this.nameLabel.hitArea = new PIXI.Rectangle();
    this.addChild(this.nameLabel);
    this.killsLabel = new PIXI.Text(numberWithPeriods(this.kills), FontStyle.SmallMenuTextWhite);
    this.killsLabel.x = 278;
    this.killsLabel.y = 10;
    this.killsLabel.resolution = 2;
    this.killsLabel.hitArea = new PIXI.Rectangle();
    this.addChild(this.killsLabel);
  }
}
export class WeaponListScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.bh = this.h - 39;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-10, -2, 50, this.h + 30);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, -3, 16, 35, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = this.bh * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      b = 0 > b ? 0 : b > this.bh ? this.bh : b;
      let c = (1 / this.h) * b * (this.h / this.bh);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(WeaponListScrollbar.SCROLL, c);
    }
  }
  reset() {
    this.scrollButton.y = (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
WeaponListScrollbar.SCROLL = "scroll";
WeaponListScrollbar.ListHeight = 200;
WeaponListScrollbar.ItemHeight = 42;
export class MatchItem extends PIXI.Container {
  constructor(a, b, c, d = 0, e) {
    super();
    this.id = a;
    this.name = b;
    this.result = c;
    this.points = d;
    this.date = e;
    e = " vs";
    if ("tbd" === c || "init" === c || "error" === c || "cancelled" === c || "noshow" === c)
      (this.points = 0), (e = ""), void 0 === this.name && (this.name = "");
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRoundedRect(0, 0, 392, 22, 4);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0.5;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.5;
    });
    this.addChild(this.background);
    this.resultLabel = new PIXI.Text(
      MatchItem.ResultLabelMap[this.result] + e,
      FontStyle.SmallLabelText4
    );
    this.resultLabel.x = 10;
    this.resultLabel.y = 2;
    this.resultLabel.resolution = 2;
    this.resultLabel.hitArea = new PIXI.Rectangle();
    this.resultLabel.tint = MatchItem.ResultTintMap[this.result];
    this.addChild(this.resultLabel);
    this.nameLabel = new PIXI.Text(this.name, FontStyle.SmallLabelText4);
    this.nameLabel.x = 82;
    this.nameLabel.y = 2;
    this.nameLabel.resolution = 2;
    this.nameLabel.hitArea = new PIXI.Rectangle();
    this.addChild(this.nameLabel);
    e = (0 < this.points ? "+" : "") + numberWithPeriods(this.points);
    this.pointsLabel = new PIXI.Text(e, FontStyle.SmallLabelText4);
    this.pointsLabel.x = 230;
    this.pointsLabel.y = 2;
    this.pointsLabel.resolution = 2;
    this.pointsLabel.hitArea = new PIXI.Rectangle();
    this.pointsLabel.tint = 0 > parseFloat(this.points) ? 16711680 : 16763904;
    this.addChild(this.pointsLabel);
    e = new Date(Date.parse(this.date));
    c = e.getDate().toString().padStart(2, "0");
    a = (e.getMonth() + 1).toString().padStart(2, "0");
    b = e.getFullYear();
    d = "";
    d = Date.now() - 864e5 < e.getTime() ? "Today" : c + "-" + a + "-" + b;
    this.dateLabel = new PIXI.Text(d, FontStyle.SmallLabelText4);
    this.dateLabel.x = 380;
    this.dateLabel.y = 2;
    this.dateLabel.anchor.x = 1;
    this.dateLabel.resolution = 2;
    this.dateLabel.hitArea = new PIXI.Rectangle();
    this.addChild(this.dateLabel);
  }
}
MatchItem.HEIGHT = 24;
MatchItem.ResultTintMap = {
  win: 16763904,
  init: 13421772,
  tbd: 13421772,
  error: 16711680,
  error2: 16711680,
  cancelled: 11184810,
  noshow: 11184810,
  noshow_self: 16711680,
  draw: 255,
  loss: 16711680,
};
MatchItem.ResultLabelMap = {
  win: "Win",
  init: "Active",
  tbd: "Active",
  error: "Error",
  error2: "Error",
  cancelled: "Cancelled",
  noshow: "NoShow",
  noshow_self: "Left",
  draw: "Draw",
  loss: "Loss",
};
var overviewtab = {};
export class OverviewTab extends Feature {
  constructor(a, b) {
    super();
    this.w = a;
    this.h = b;
    this.ox = 20;
    this.oy = 100;
    this.display = UserMenu.GENERAL;
    this.weapons = [];
    this.weaponData = [];
    this.background = new PIXI.Graphics();
    this.background.x = this.ox - 6;
    this.background.y = this.oy + 4;
    this.background.beginFill(6710886, 0.3);
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.drawRoundedRect(0, 0, 632, 300, 8);
    this.background.drawRoundedRect(0, 304, 632, 96, 8);
    this.background.endFill();
    this.container.addChild(this.background);
    this.background.hitArea = new PIXI.Rectangle();
    this.container.interactive = !0;
    this.generalStatsButton = new PIXI.Graphics();
    this.generalStatsButton.beginFill(16777215, 0.2);
    this.generalStatsButton.lineStyle(1, 16777215, 0.1, 0);
    this.generalStatsButton.drawRect(0, 0, 100, 28, 4);
    this.generalStatsButton.endFill();
    this.generalStatsButton.x = this.ox + 202;
    this.generalStatsButton.y = this.oy + 12;
    this.generalStatsButton.tint = 13421772;
    this.generalStatsButton.interactive = !0;
    this.generalStatsButton.on("mouseover", () => {
      this.generalStatsLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.generalStatsButton.on("mouseout", () => {
      this.generalStatsLabel.alpha = this.display === OverviewTab.GENERAL ? 1 : 0.5;
    });
    this.generalStatsButton.on("mousedown", () => {
      this.displayGeneralContainer();
      AudioEffects.ButtonHover.audio.play();
    });
    this.generalStatsButton.on("touchstart", () => this.displayGeneralContainer());
    this.container.addChild(this.generalStatsButton);
    this.generalStatsLabel = new PIXI.Text("General", FontStyle.MediumMenuTextOrange);
    this.generalStatsLabel.x =
      this.generalStatsButton.x +
      0.5 * (this.generalStatsButton.width - this.generalStatsLabel.width);
    this.generalStatsLabel.y = this.generalStatsButton.y + 3;
    this.generalStatsLabel.resolution = 2;
    this.generalStatsLabel.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.generalStatsLabel);
    this.historyButton = new PIXI.Graphics();
    this.historyButton.lineStyle(1, 16777215, 0.1, 0);
    this.historyButton.beginFill(16777215, 0.2);
    this.historyButton.drawRect(0, 0, 100, 28, 4);
    this.historyButton.endFill();
    this.historyButton.x = this.generalStatsButton.x + this.generalStatsButton.width + 8;
    this.historyButton.y = this.oy + 12;
    this.historyButton.tint = 13421772;
    this.historyButton.alpha = 0.5;
    this.historyButton.interactive = !0;
    this.historyButton.on("mouseover", () => {
      this.historyLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.historyButton.on("mouseout", () => {
      this.historyLabel.alpha = this.display === UserMenu.HISTORY ? 1 : 0.5;
    });
    this.historyButton.on("mousedown", () => {
      this.historyLabel.alpha = 0.5;
      AudioEffects.ButtonClick.audio.play();
      this.emit(Layer.Events.PROFILE_CANCEL);
      this.emit(Layer.Events.USER_ACCESS, App.Credential.playerid, "id", UserMenu.HISTORY);
    });
    this.container.addChild(this.historyButton);
    this.historyLabel = new PIXI.Text("1v1 Games", FontStyle.MediumMenuTextOrange);
    this.historyLabel.alpha = 0.5;
    this.historyLabel.x =
      this.historyButton.x + 0.5 * (this.historyButton.width - this.historyLabel.width);
    this.historyLabel.y = this.historyButton.y + 3;
    this.historyLabel.resolution = 2;
    this.historyLabel.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.historyLabel);
    this.weaponStatsButton = new PIXI.Graphics();
    this.weaponStatsButton.beginFill(16777215, 0.2);
    this.weaponStatsButton.lineStyle(1, 16777215, 0.1, 0);
    this.weaponStatsButton.drawRect(0, 0, 100, 28, 4);
    this.weaponStatsButton.endFill();
    this.weaponStatsButton.x = this.historyButton.x + this.historyButton.width + 8;
    this.weaponStatsButton.y = this.oy + 12;
    this.weaponStatsButton.tint = 13421772;
    this.weaponStatsButton.alpha = 0.5;
    this.weaponStatsButton.interactive = !0;
    this.weaponStatsButton.on("mouseover", () => {
      this.weaponStatsLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.weaponStatsButton.on("mouseout", () => {
      this.weaponStatsLabel.alpha = this.display === OverviewTab.WEAPONS ? 1 : 0.5;
    });
    this.weaponStatsButton.on("mousedown", () => {
      this.displayWeaponContainer();
      AudioEffects.ButtonClick.audio.play();
    });
    this.weaponStatsButton.on("touchstart", () => this.displayWeaponContainer());
    this.container.addChild(this.weaponStatsButton);
    this.weaponStatsLabel = new PIXI.Text("Weapons", FontStyle.MediumMenuTextOrange);
    this.weaponStatsLabel.alpha = 0.5;
    this.weaponStatsLabel.resolution = 2;
    this.weaponStatsLabel.x =
      this.weaponStatsButton.x + 0.5 * (this.weaponStatsButton.width - this.weaponStatsLabel.width);
    this.weaponStatsLabel.y = this.weaponStatsButton.y + 3;
    this.weaponStatsLabel.hitArea = new PIXI.Rectangle();
    this.container.addChild(this.weaponStatsLabel);
    this.creationLabel = new PIXI.Text("Created", FontStyle.CreatedText);
    this.creationLabel.x = this.ox;
    this.creationLabel.y = this.h - 14;
    this.creationLabel.resolution = 2;
    this.container.addChild(this.creationLabel);
    this.createdText = new PIXI.Text("Loading..", FontStyle.ActivityText);
    this.createdText.x = this.ox + 60;
    this.createdText.y = this.h - 14;
    this.createdText.resolution = 2;
    this.container.addChild(this.createdText);
    this.activityLabel = new PIXI.Text("Last seen", FontStyle.CreatedText);
    this.activityLabel.x = this.ox;
    this.activityLabel.y = this.h + 6;
    this.activityLabel.resolution = 2;
    this.container.addChild(this.activityLabel);
    this.activityText = new PIXI.Text("Loading..", FontStyle.ActivityText);
    this.activityText.x = this.ox + 68;
    this.activityText.y = this.h + 6;
    this.activityText.tint = 16777215;
    this.activityText.resolution = 2;
    this.container.addChild(this.activityText);
    this.visualizer = new Visualizer(176, 176, !0, !0, !1);
    this.visualizer.x = this.ox + 12;
    this.visualizer.y = 142;
    this.visualizer.interactive = !0;
    this.container.addChild(this.visualizer);
    this.overviewTitle = new PIXI.Text("Loading..", FontStyle.OverviewTitle);
    this.overviewTitle.x = this.visualizer.x + 0.5 * this.visualizer.width;
    this.overviewTitle.y = this.oy + 9;
    this.overviewTitle.anchor.x = 0.5;
    this.overviewTitle.resolution = 2;
    this.container.addChild(this.overviewTitle);
    this.generalContainer = new PIXI.Container();
    this.levelLabel = new PIXI.Text("XP Level", FontStyle.SmallMenuTextOrange2);
    this.levelLabel.x = this.ox + 210;
    this.levelLabel.y = this.oy + 46;
    this.levelLabel.resolution = 2;
    this.generalContainer.addChild(this.levelLabel);
    this.levelText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.levelText.x = this.ox + 232;
    this.levelText.y = this.oy + 72;
    this.levelText.resolution = 2;
    this.generalContainer.addChild(this.levelText);
    this.rankLabel = new PIXI.Text("XP Rank", FontStyle.SmallMenuTextOrange2);
    this.rankLabel.x = this.ox + 210;
    this.rankLabel.y = this.oy + 100;
    this.rankLabel.resolution = 2;
    this.generalContainer.addChild(this.rankLabel);
    this.rankText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.rankText.x = this.ox + 210;
    this.rankText.y = this.oy + 124;
    this.rankText.resolution = 2;
    this.generalContainer.addChild(this.rankText);
    this.ratingIcon = new PIXI.Sprite();
    this.ratingIcon.x = this.ox + 368;
    this.ratingIcon.y = this.oy + 80;
    this.ratingIcon.scale.x = this.ratingIcon.scale.y = 0.6;
    this.ratingIcon.anchor.x = this.ratingIcon.anchor.y = 0.5;
    this.generalContainer.addChild(this.ratingIcon);
    this.skillLabel = new PIXI.Text("Skill", FontStyle.SmallMenuTextOrange2);
    this.skillLabel.x = this.ox + 360;
    this.skillLabel.y = this.oy + 46;
    this.skillLabel.resolution = 2;
    this.generalContainer.addChild(this.skillLabel);
    this.skillText = new PIXI.Text("Loading..", {
      fontName: "Arial",
      fontSize: 17,
      lineHeight: 20,
      fill: 16777215,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.skillText.x = this.ox + 386;
    this.skillText.y = this.oy + 70;
    this.skillText.resolution = 2;
    this.generalContainer.addChild(this.skillText);
    this.skillRankLabel = new PIXI.Text("Skill Rank", FontStyle.SmallMenuTextOrange2);
    this.skillRankLabel.x = this.ox + 360;
    this.skillRankLabel.y = this.oy + 100;
    this.skillRankLabel.resolution = 2;
    this.generalContainer.addChild(this.skillRankLabel);
    this.skillRankText = new PIXI.Text("Loading..", {
      fontName: "Arial",
      fontSize: 17,
      lineHeight: 20,
      fill: 16777215,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.skillRankText.x = this.ox + 360;
    this.skillRankText.y = this.oy + 124;
    this.skillRankText.resolution = 2;
    this.generalContainer.addChild(this.skillRankText);
    this.killsLabel = new PIXI.Text("Kills", FontStyle.SmallMenuTextOrange2);
    this.killsLabel.x = this.ox + 510;
    this.killsLabel.y = this.oy + 46;
    this.killsLabel.resolution = 2;
    this.generalContainer.addChild(this.killsLabel);
    this.killsText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.killsText.x = this.ox + 510;
    this.killsText.y = this.oy + 70;
    this.killsText.resolution = 2;
    this.generalContainer.addChild(this.killsText);
    this.deathsLabel = new PIXI.Text("Deaths", FontStyle.SmallMenuTextOrange2);
    this.deathsLabel.x = this.ox + 510;
    this.deathsLabel.y = this.oy + 100;
    this.deathsLabel.resolution = 2;
    this.generalContainer.addChild(this.deathsLabel);
    this.deathsText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.deathsText.x = this.ox + 510;
    this.deathsText.y = this.oy + 124;
    this.deathsText.resolution = 2;
    this.generalContainer.addChild(this.deathsText);
    this.capsLabel = new PIXI.Text("CTF Caps", FontStyle.SmallMenuTextOrange2);
    this.capsLabel.x = this.ox + 510;
    this.capsLabel.y = this.oy + 154;
    this.capsLabel.resolution = 2;
    this.generalContainer.addChild(this.capsLabel);
    this.capsText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite2);
    this.capsText.x = this.ox + 510;
    this.capsText.y = this.oy + 178;
    this.capsText.resolution = 2;
    this.generalContainer.addChild(this.capsText);
    this.levelIcon = new PIXI.Sprite();
    this.levelIcon.x = this.ox + 200;
    this.levelIcon.y = this.oy + 62;
    this.levelIcon.scale.x = this.levelIcon.scale.y = 0.5;
    this.generalContainer.addChild(this.levelIcon);
    this.levelBarTitle = new PIXI.Text("Experience Points(XP)", FontStyle.SmallMenuTextOrange3);
    this.levelBarTitle.x = 430;
    this.levelBarTitle.y = 324;
    this.levelBarTitle.anchor.x = 0.5;
    this.levelBarTitle.resolution = 2;
    this.generalContainer.addChild(this.levelBarTitle);
    this.levelBar = new LevelBar();
    this.levelBar.x = 280;
    this.levelBar.y = 350;
    this.generalContainer.addChild(this.levelBar);
    this.goldBackground = new PIXI.Graphics();
    this.goldBackground.x = 36;
    this.goldBackground.y = 324;
    this.goldBackground.beginFill(0, 0.2);
    this.goldBackground.drawRoundedRect(0, 0, 170, 64, 4);
    this.goldBackground.endFill();
    this.container.addChild(this.goldBackground);
    this.goldIcon = new PIXI.Sprite(App.CombinedTextures.gold1);
    this.goldIcon.x = 42;
    this.goldIcon.y = 329;
    this.goldIcon.scale.x = this.goldIcon.scale.y = 0.45;
    this.addChild(this.goldIcon);
    this.goldText = new PIXI.Text("", FontStyle.MediumMenuTextOrange2);
    this.goldText.x = this.goldIcon.x + this.goldIcon.width + 10;
    this.goldText.y = this.goldIcon.y + 3;
    this.goldText.resolution = 2;
    this.addChild(this.goldText);
    this.gemIcon = new PIXI.Sprite(App.CombinedTextures.gem);
    this.gemIcon.x = 45;
    this.gemIcon.y = 360;
    this.gemIcon.scale.x = this.gemIcon.scale.y = 0.37;
    this.addChild(this.gemIcon);
    this.gemText = new PIXI.Text("0", FontStyle.MediumMenuTextOrange2);
    this.gemText.x = this.gemIcon.x + this.gemIcon.width + 10;
    this.gemText.y = this.gemIcon.y + 1;
    this.gemText.resolution = 2;
    this.addChild(this.gemText);
    this.weaponContainer = new PIXI.Container();
    this.weaponTitle = new PIXI.Text("Favorite weapons", FontStyle.SmallMenuTextOrange2);
    this.weaponTitle.x = this.ox + 210;
    this.weaponTitle.y = this.oy + 48;
    this.weaponTitle.resolution = 2;
    this.weaponContainer.addChild(this.weaponTitle);
    this.weaponNameLabel = new PIXI.Text("Type", FontStyle.SmallMenuTextOrange3);
    this.weaponNameLabel.x = this.ox + 210;
    this.weaponNameLabel.y = this.oy + 70;
    this.weaponNameLabel.resolution = 2;
    this.weaponContainer.addChild(this.weaponNameLabel);
    this.weaponKillsLabel = new PIXI.Text("Kills", FontStyle.SmallMenuTextOrange3);
    this.weaponKillsLabel.x = this.ox + 480;
    this.weaponKillsLabel.y = this.oy + 70;
    this.weaponKillsLabel.resolution = 2;
    this.weaponContainer.addChild(this.weaponKillsLabel);
    this.youtubeLogo = new PIXI.Sprite(App.CombinedTextures.youtube_logo);
    this.youtubeLogo.scale.x = this.youtubeLogo.scale.y = 0.5;
    this.youtubeLogo.x = this.ox + 4;
    this.youtubeLogo.y = this.oy + 321;
    this.container.addChild(this.youtubeLogo);
    this.youtubeTitle = new PIXI.Text("YouTube\nchannel", {
      fontName: "Arial",
      fontSize: 15,
      lineHeight: 16,
      fill: 16776960,
      strokeThickness: 2,
    });
    this.youtubeTitle.x = this.ox + 44;
    this.youtubeTitle.y = this.oy + 318;
    this.youtubeTitle.tint = 16776960;
    this.youtubeTitle.resolution = 2;
    this.container.addChild(this.youtubeTitle);
    this.youtubeField = new InputField("youtube_field", !1, 20);
    this.youtubeField.setDimensions(370, 35);
    this.youtubeField.forceLowerCase = !1;
    this.youtubeField.setMaxChars(64);
    this.youtubeField.x = this.ox + 112;
    this.youtubeField.y = this.oy + 318;
    this.youtubeField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890:/?._"
    );
    this.youtubeField.addListener(InputField.CHANGE, (c) => {
      c = c.data.value;
      0 === c.length ||
      0 === c.indexOf("https://www.youtube.com/") ||
      0 === c.indexOf("https://youtube.com/")
        ? (this.youtubeField.markNone(), this.saveYoutubeButton.enable())
        : (this.youtubeField.markInvalid(), this.saveYoutubeButton.disable());
    });
    this.container.addChild(this.youtubeField);
    this.pasteYoutubeButton = new Button("paste_yt");
    this.pasteYoutubeButton.selected = !0;
    this.pasteYoutubeButton.setText("Paste");
    this.pasteYoutubeButton.scale.x = this.pasteYoutubeButton.scale.y = 0.75;
    this.pasteYoutubeButton.addListener(Button.BUTTON_RELEASED, () => {
      navigator.clipboard.readText().then((c) => {
        this.youtubeField.setText(c);
        0 === c.length ||
        0 === c.indexOf("https://www.youtube.com/") ||
        0 === c.indexOf("https://youtube.com/")
          ? (this.youtubeField.markNone(), this.saveYoutubeButton.enable())
          : (this.youtubeField.markInvalid(), this.saveYoutubeButton.disable());
      });
    });
    this.pasteYoutubeButton.x = this.ox + this.youtubeField.x + this.youtubeField.width - 4;
    this.pasteYoutubeButton.y = this.oy + 322;
    this.container.addChild(this.pasteYoutubeButton);
    this.saveYoutubeButton = new Button("save_yt");
    this.saveYoutubeButton.selected = !0;
    this.saveYoutubeButton.setText("Save");
    this.saveYoutubeButton.setTint(16763904);
    this.saveYoutubeButton.scale.x = this.saveYoutubeButton.scale.y = 0.75;
    this.saveYoutubeButton.disable();
    this.saveYoutubeButton.addListener(Button.BUTTON_RELEASED, async () => {
      let c = this.youtubeField.getText();
      this.saveYoutubeButton.disable();
      (await this.submitSocial("youtube", c))
        ? this.youtubeField.markValid()
        : this.youtubeField.markInvalid();
    });
    this.saveYoutubeButton.x = this.pasteYoutubeButton.x + this.pasteYoutubeButton.width + 4;
    this.saveYoutubeButton.y = this.oy + 322;
    this.container.addChild(this.saveYoutubeButton);
    this.twitchLogo = new PIXI.Sprite(App.CombinedTextures.twitch_logo);
    this.twitchLogo.scale.x = this.twitchLogo.scale.y = 0.75;
    this.twitchLogo.x = this.ox + 4;
    this.twitchLogo.y = this.oy + 360;
    this.container.addChild(this.twitchLogo);
    this.twitchTitle = new PIXI.Text("Twitch\nchannel", {
      fontName: "Arial",
      fontSize: 15,
      lineHeight: 16,
      fill: 16776960,
      strokeThickness: 2,
    });
    this.twitchTitle.x = this.ox + 47;
    this.twitchTitle.y = this.oy + 362;
    this.twitchTitle.tint = 16776960;
    this.twitchTitle.resolution = 2;
    this.container.addChild(this.twitchTitle);
    this.twitchField = new InputField("twitch_field", !1, 20);
    this.twitchField.setDimensions(370, 35);
    this.twitchField.forceLowerCase = !1;
    this.twitchField.setMaxChars(64);
    this.twitchField.x = this.ox + 112;
    this.twitchField.y = this.oy + 362;
    this.twitchField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890:/?._"
    );
    this.twitchField.addListener(InputField.CHANGE, (c) => {
      c = c.data.value;
      0 === c.length ||
      0 === c.indexOf("https://www.twitch.tv/") ||
      0 === c.indexOf("https://twitch.tv/")
        ? (this.twitchField.markNone(), this.saveTwitchButton.enable())
        : (this.twitchField.markInvalid(), this.saveTwitchButton.disable());
    });
    this.container.addChild(this.twitchField);
    this.pasteTwitchButton = new Button("paste_tw");
    this.pasteTwitchButton.selected = !0;
    this.pasteTwitchButton.setText("Paste");
    this.pasteTwitchButton.scale.x = this.pasteTwitchButton.scale.y = 0.75;
    this.pasteTwitchButton.addListener(Button.BUTTON_RELEASED, () => {
      navigator.clipboard.readText().then((c) => {
        this.twitchField.setText(c);
        0 === c.length ||
        0 === c.indexOf("https://www.twitch.tv/") ||
        0 === c.indexOf("https://twitch.tv/")
          ? (this.twitchField.markNone(), this.saveTwitchButton.enable())
          : (this.twitchField.markInvalid(), this.saveTwitchButton.disable());
      });
    });
    this.pasteTwitchButton.x = this.ox + this.twitchField.x + this.twitchField.width - 4;
    this.pasteTwitchButton.y = this.oy + 366;
    this.container.addChild(this.pasteTwitchButton);
    this.saveTwitchButton = new Button("save_yt");
    this.saveTwitchButton.selected = !0;
    this.saveTwitchButton.setText("Save");
    this.saveTwitchButton.setTint(16763904);
    this.saveTwitchButton.scale.x = this.saveTwitchButton.scale.y = 0.75;
    this.saveTwitchButton.disable();
    this.saveTwitchButton.addListener(Button.BUTTON_RELEASED, async () => {
      let c = this.twitchField.getText();
      this.saveTwitchButton.disable();
      (await this.submitSocial("twitch", c))
        ? this.twitchField.markValid()
        : this.twitchField.markInvalid();
    });
    this.saveTwitchButton.x = this.pasteTwitchButton.x + this.pasteTwitchButton.width + 4;
    this.saveTwitchButton.y = this.oy + 366;
    this.container.addChild(this.saveTwitchButton);
    this.listContainer = new PIXI.Container();
    this.listContainer.x = this.ox + 204;
    this.listContainer.y = this.oy + 48;
    this.weaponListContainer = new PIXI.Container();
    this.listContainer.addChild(this.weaponListContainer);
    this.weaponContainer.addChild(this.listContainer);
    this.scrollbar = new WeaponListScrollbar(172);
    this.scrollbar.x = this.ox + 598;
    this.scrollbar.y = this.oy + 90;
    this.scrollbar.on(WeaponListScrollbar.SCROLL, (c) => {
      this.maskWeaponList(c);
    });
    this.displayGeneralContainer();
  }
  async submitSocial(a, b) {
    return (await APIClient.postSocial(a, b, App.Credential.id)).success;
  }
  async load() {
    var a = await APIClient.getProfile(App.Credential.id);
    this.visualizer.hide();
    this.overviewTitle.text = "Loading..";
    this.levelText.text = "Loading..";
    this.rankText.text = "Loading..";
    this.skillText.text = "Loading..";
    this.skillRankText.text = "Loading..";
    this.killsText.text = "Loading..";
    this.deathsText.text = "Loading..";
    this.capsText.text = "Loading..";
    this.createdText.text = "Loading..";
    this.activityText.text = "Loading..";
    this.youtubeField.markNone();
    this.twitchField.markNone();
    if (a) {
      a = JSON.parse(a);
      var b = new Date(Date.parse(a.seen)),
        c = b.getDate().toString().padStart(2, "0"),
        d = (b.getMonth() + 1).toString().padStart(2, "0"),
        e = b.getFullYear();
      b = Date.now() - 864e5 < b.getTime() ? "Today" : c + "-" + d + "-" + e;
      c = new Date(Date.parse(a.created));
      d = c.getDate().toString().padStart(2, "0");
      e = (c.getMonth() + 1).toString().padStart(2, "0");
      var f = c.getFullYear();
      d = Date.now() - 864e5 < c.getTime() ? "Today" : d + "-" + e + "-" + f;
      e = Math.min(Math.max(Math.floor(0.2 * Math.sqrt(parseInt(a.experience) / 15.625)), 1), 240);
      c = Math.max(Math.floor((e / 240) * 15) + 1);
      f = 15.625 * Math.pow(e / 0.2, 2);
      var g = 15.625 * Math.pow((e + 1) / 0.2, 2);
      this.levelBar.load(1 === e ? 0 : f, parseInt(a.experience, 10), g);
      this.overviewTitle.text = a.name;
      this.overviewTitle.scale.x = this.overviewTitle.scale.y =
        200 < this.overviewTitle.width ? 200 / this.overviewTitle.width : 1;
      this.levelText.text = numberWithPeriods(e);
      this.skillText.text = numberWithPeriods(a.skill);
      this.skillRankText.text =
        numberWithPeriods(a.skill_ranking) + "\n" + Game.MapSkillToTitle(a.skill);
      this.killsText.text = numberWithPeriods(a.kills);
      this.deathsText.text = numberWithPeriods(a.deaths);
      this.capsText.text = numberWithPeriods(a.caps);
      this.createdText.text = d;
      this.activityText.text = b;
      this.rankText.text = numberWithPeriods(a.ranking);
      this.goldText.text = numberWithPeriods(a.gold);
      this.ratingIcon.texture =
        App.CombinedTextures["rank_icon_" + (Game.MapSkillToIndex(a.skill) + 1)];
      for (b = 0; b < a.social.length; b++)
        switch (((d = a.social[b]), d.type)) {
          case "youtube":
            this.youtubeField.setText(d.url);
            break;
          case "twitch":
            this.twitchField.setText(d.url);
        }
      this.visualizer.show();
      this.visualizer.applyCustomization(a.customization);
      this.levelIcon.texture = App.CombinedTextures["skill_icon_" + c];
      if ((a = await APIClient.getUserWeaponStats(App.Credential.playerid))) {
        this.scrollbar.enableWheel();
        this.weaponData = JSON.parse(a);
        this.weaponListContainer.removeChildren();
        this.weapons = [];
        a = this.weaponData;
        for (b = 0; b < a.length; b++)
          (c = a[b]),
            (c = new WeaponItem(c.id, c.kills)),
            (c.x = 0),
            (c.y = 47 + b * WeaponListScrollbar.ItemHeight),
            this.weapons.push(c);
        this.weapons.length >
        Math.floor(WeaponListScrollbar.ListHeight / WeaponListScrollbar.ItemHeight)
          ? this.weaponContainer.addChild(this.scrollbar)
          : this.weaponContainer.removeChild(this.scrollbar);
        this.scrollbar.reset();
        this.maskWeaponList(0);
      }
    }
  }
  hide() {
    super.hide();
    this.scrollbar.disableWheel();
  }
  maskWeaponList(a) {
    let b = Math.floor(WeaponListScrollbar.ListHeight / WeaponListScrollbar.ItemHeight);
    this.weaponListContainer.removeChildren();
    if (this.weapons.length <= b)
      for (b = this.weapons.length, this.weaponListContainer.y = 0, a = 0; a < b; a++) {
        var c = this.weapons[a];
        c.x = 0;
        c.alpha = 1;
        this.weaponListContainer.addChild(c);
      }
    else {
      this.weaponListContainer.y = -(
        a *
        (this.weapons.length * WeaponListScrollbar.ItemHeight -
          (WeaponListScrollbar.ListHeight - WeaponListScrollbar.ItemHeight))
      );
      a = this.weaponListContainer.y;
      c = Math.floor(Math.abs(a / WeaponListScrollbar.ItemHeight));
      for (let e = 0; e < b; e++) {
        let f = this.weapons[c + e];
        f.x = 0;
        this.weaponListContainer.addChild(f);
        if (0 === e) {
          var d = c * WeaponListScrollbar.ItemHeight + a;
          f.alpha = 0 <= d ? 1 : 1 - (1 / (0.5 * WeaponListScrollbar.ItemHeight)) * Math.abs(d);
        } else
          e === b - 1
            ? ((d = c * WeaponListScrollbar.ItemHeight + a),
              (f.alpha =
                0 > d ? 1 : 1 - (1 / (0.5 * WeaponListScrollbar.ItemHeight)) * Math.abs(d)))
            : (f.alpha = 1);
      }
    }
  }
  displayGeneralContainer() {
    this.generalContainer.parent || this.container.addChild(this.generalContainer);
    this.weaponContainer.parent && this.container.removeChild(this.weaponContainer);
    this.generalStatsLabel.alpha = 1;
    this.generalStatsButton.alpha = 1;
    this.weaponStatsLabel.alpha = 0.5;
    this.weaponStatsButton.alpha = 0.5;
    this.display = OverviewTab.GENERAL;
  }
  displayWeaponContainer() {
    this.weaponContainer.parent || this.container.addChild(this.weaponContainer);
    this.generalContainer.parent && this.container.removeChild(this.generalContainer);
    this.generalStatsLabel.alpha = 0.5;
    this.generalStatsButton.alpha = 0.5;
    this.weaponStatsLabel.alpha = 1;
    this.weaponStatsButton.alpha = 1;
    this.display = OverviewTab.WEAPONS;
  }
  update() {
    this.visualizer.update();
  }
}
OverviewTab.GENERAL = 1;
OverviewTab.WEAPONS = 2;
var clantab = {};
export class ClanTab extends Feature {
  constructor(a, b) {
    super();
    this.w = a;
    this.h = b;
    this.ox = 20;
    this.oy = 126;
    this.members = [];
    this.clanSettingsTitle = new PIXI.Text("Clan", FontStyle.MediumOrangeText);
    this.clanSettingsTitle.x = this.ox - 4;
    this.clanSettingsTitle.y = 100;
    this.clanSettingsTitle.tint = 16763904;
    this.clanSettingsTitle.resolution = 2;
    this.addChild(this.clanSettingsTitle);
    this.creationContainer = new PIXI.Container();
    this.clanCreationBackground = new PIXI.Graphics();
    this.clanCreationBackground.x = this.ox - 6;
    this.clanCreationBackground.y = this.oy;
    this.clanCreationBackground.beginFill(6710886, 0.3);
    this.clanCreationBackground.drawRoundedRect(0, 0, 632, 372, 8);
    this.clanCreationBackground.endFill();
    this.clanCreationBackground.beginFill(6710886, 0.3);
    this.clanCreationBackground.drawRoundedRect(16, 140, 600, 208, 8);
    this.clanCreationBackground.endFill();
    this.creationContainer.addChild(this.clanCreationBackground);
    this.clanSettingsTitle = new PIXI.Text(
      "You are not in a clan. Create your own clan or join an existing clan.\nYou can only be in 1 clan at a time.\nIf you create a clan, you will become the clan leader. Clan leaders can invite\nnew members and promote existing members to the role of 'captain'.\nCaptains can invite new members and remove lower ranking members.\nCreating a clan costs 10.000 gold.",
      {
        fontName: "Arial",
        fontSize: 16,
        fill: 13421772,
        strokeThickness: 2,
        lineJoin: "round",
        wordWrap: !0,
        wordWrapWidth: 640,
      }
    );
    this.clanSettingsTitle.x = this.ox;
    this.clanSettingsTitle.y = this.oy + 5;
    this.creationContainer.addChild(this.clanSettingsTitle);
    this.clanCreationMenuTitle = new PIXI.Text("Create a clan", {
      fontName: "Arial",
      fontSize: 20,
      fill: 16746496,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.clanCreationMenuTitle.x = this.ox + 16;
    this.clanCreationMenuTitle.y = this.oy + 142;
    this.creationContainer.addChild(this.clanCreationMenuTitle);
    this.clanCreationTitle = new PIXI.Text("Clan name", FontStyle.MediumMenuTextOrange2);
    this.clanCreationTitle.x = this.ox + 20;
    this.clanCreationTitle.y = this.oy + 180;
    this.creationContainer.addChild(this.clanCreationTitle);
    this.clanNameField = new InputField("clan_name");
    this.clanNameField.setDimensions(300, 35);
    this.clanNameField.forceLowerCase = !1;
    this.clanNameField.setMaxChars(18);
    this.clanNameField.x = this.ox + 20;
    this.clanNameField.y = this.oy + 208;
    this.clanNameField.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ");
    this.creationContainer.addChild(this.clanNameField);
    this.createClanButton = new Button("create_clan");
    this.createClanButton.selected = !0;
    this.createClanButton.setText("Create");
    this.createClanButton.setTint(16763904);
    this.createClanButton.scale.x = this.createClanButton.scale.y = 0.8;
    this.createClanButton.addListener(
      Button.BUTTON_RELEASED,
      this.onCreateClanButtonReleased.bind(this)
    );
    this.createClanButton.x = this.ox + 30;
    this.createClanButton.y = this.oy + 265;
    this.creationContainer.addChild(this.createClanButton);
    this.goldIcon = new PIXI.Sprite(App.CombinedTextures.gold1);
    this.goldIcon.x = this.createClanButton.x + this.createClanButton.width + 4;
    this.goldIcon.y = this.createClanButton.y;
    this.goldIcon.scale.x = this.goldIcon.scale.y = 0.5;
    this.creationContainer.addChild(this.goldIcon);
    this.goldInfo = new PIXI.Text("-10.000", {
      fontName: "Arial",
      fontSize: 18,
      fill: 16711680,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.goldInfo.x = this.goldIcon.x + this.goldIcon.width + 4;
    this.goldInfo.y = this.goldIcon.y + 6;
    this.goldInfo.resolution = 2;
    this.creationContainer.addChild(this.goldInfo);
    this.createClanErrorMessage = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 19,
      fill: 16711680,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.createClanErrorMessage.x = this.ox + 24;
    this.createClanErrorMessage.y = this.createClanButton.y + 44;
    this.createClanErrorMessage.tint = 16711680;
    this.createClanErrorMessage.maxWidth = 380;
    this.createClanErrorMessage.resolution = 2;
    this.creationContainer.addChild(this.createClanErrorMessage);
    this.displayContainer = new PIXI.Container();
    this.clanOverviewBackground = new PIXI.Graphics();
    this.clanOverviewBackground.x = this.ox - 6;
    this.clanOverviewBackground.y = this.oy;
    this.clanOverviewBackground.beginFill(6710886, 0.3);
    this.clanOverviewBackground.drawRoundedRect(0, 0, 632, 372, 8);
    this.clanOverviewBackground.endFill();
    this.clanOverviewBackground.beginFill(6710886, 0.3);
    this.clanOverviewBackground.drawRoundedRect(321, 160, 305, 196, 8);
    this.clanOverviewBackground.endFill();
    this.clanOverviewBackground.beginFill(6710886, 0.3);
    this.clanOverviewBackground.drawRoundedRect(12, 12, 48, 48, 4);
    this.clanOverviewBackground.endFill();
    this.displayContainer.addChild(this.clanOverviewBackground);
    this.uploadText = new PIXI.Text("Clan\nbanner\ncoming soon", {
      fontName: "Arial",
      fontSize: 12,
      fill: 12303291,
      strokeThickness: 2,
      lineJoin: "round",
      wordWrap: !0,
      wordWrapWidth: 80,
      align: "center",
    });
    this.uploadText.x = this.ox - 6;
    this.uploadText.y = this.oy + 10;
    this.uploadText.resolution = 2;
    this.displayContainer.addChild(this.uploadText);
    this.nameText = new PIXI.Text("", FontStyle.ClanTitle);
    this.nameText.x = this.ox + 68;
    this.nameText.y = this.oy + 20;
    this.nameText.tint = 16776960;
    this.nameText.resolution = 2;
    this.displayContainer.addChild(this.nameText);
    this.memberText = new PIXI.Text("", FontStyle.MediumMenuTextOrange2);
    this.memberText.x = this.ox + 10;
    this.memberText.y = this.oy + 68;
    this.memberText.resolution = 2;
    this.displayContainer.addChild(this.memberText);
    this.roleLabelText = new PIXI.Text("Your role: ", FontStyle.MediumMenuTextOrange2);
    this.roleLabelText.x = this.ox + 10;
    this.roleLabelText.y = this.oy + 98;
    this.roleLabelText.resolution = 2;
    this.displayContainer.addChild(this.roleLabelText);
    this.hintText = new PIXI.Text(
      "Leaders and captains can right-click\nfriends to invite them into their clan.",
      {
        fontName: "Arial",
        fontSize: 15,
        fill: 13421772,
        strokeThickness: 2,
        lineJoin: "round",
        wordWrap: !0,
        wordWrapWidth: 280,
      }
    );
    this.hintText.x = this.ox + 10;
    this.hintText.y = this.oy + 130;
    this.hintText.resolution = 2;
    this.displayContainer.addChild(this.hintText);
    this.roleText = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 18,
      fill: 16777215,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.roleText.x = this.roleLabelText.x + this.roleLabelText.width + 8;
    this.roleText.y = this.roleLabelText.y;
    this.roleText.resolution = 2;
    this.displayContainer.addChild(this.roleText);
    this.createdText = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 15,
      fill: 13412864,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.createdText.x = 478;
    this.createdText.y = this.oy + 5;
    this.createdText.resolution = 2;
    this.displayContainer.addChild(this.createdText);
    this.membersTitle = new PIXI.Text("Members", {
      fontName: "Arial",
      fontSize: 18,
      fill: 16750848,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.membersTitle.x = this.ox + 320;
    this.membersTitle.y = this.oy + 138;
    this.membersTitle.resolution = 2;
    this.displayContainer.addChild(this.membersTitle);
    this.membersHint = new PIXI.Text("(right-click to manage)", {
      fontName: "Arial",
      fontSize: 15,
      fill: 13421772,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.membersHint.x = this.membersTitle.x + this.membersTitle.width + 6;
    this.membersHint.y = this.membersTitle.y + 1;
    this.membersHint.resolution = 2;
    this.displayContainer.addChild(this.membersHint);
    this.listContainer = new PIXI.Container();
    this.listContainer.x = this.ox + 318;
    this.listContainer.y = this.oy + 122;
    this.memberListContainer = new PIXI.Container();
    this.listContainer.addChild(this.memberListContainer);
    this.displayContainer.addChild(this.listContainer);
    this.scrollbar = new MemberListScrollbar(195);
    this.scrollbar.x = this.ox + 598;
    this.scrollbar.y = this.oy + 166;
    this.scrollbar.on(MemberListScrollbar.SCROLL, (c) => {
      this.maskMemberList(c);
    });
    this.memberDropdown = new MemberDropdown();
    this.memberDropdown.on(MemberDropdown.ACTION_PROMOTE, (c) => this.promoteMember(c));
    this.memberDropdown.on(MemberDropdown.ACTION_DEMOTE, (c) => this.demoteMember(c));
    this.memberDropdown.on(MemberDropdown.ACTION_REMOVE, (c) => this.removeMember(c));
    this.leaveClanButton = new Button("leave_clan");
    this.leaveClanButton.setText("Leave clan");
    this.leaveClanButton.setTint(16733525);
    this.leaveClanButton.scale.x = this.leaveClanButton.scale.y = 0.8;
    this.leaveClanButton.addListener(
      Button.BUTTON_RELEASED,
      this.onLeaveClanButtonReleased.bind(this)
    );
    this.leaveClanButton.x = this.ox + 520;
    this.leaveClanButton.y = this.oy + 32;
    this.displayContainer.addChild(this.leaveClanButton);
    this.leaveClanContainer = new PIXI.Container();
    this.leaveClanBackground = new PIXI.Graphics();
    this.leaveClanBackground.x = 0;
    this.leaveClanBackground.y = 0;
    this.leaveClanBackground.lineStyle(3, 11184810, 0.5, 0);
    this.leaveClanBackground.beginFill(0, 0.8);
    this.leaveClanBackground.drawRoundedRect(0, 0, 440, 200, 10);
    this.leaveClanBackground.endFill();
    this.leaveClanBackground.interactive = !0;
    this.leaveClanVerificationText = new PIXI.Text("Are you sure you want to leave this clan?", {
      fontName: "Arial",
      fontSize: 18,
      fill: 16763904,
      strokeThickness: 2,
      lineJoin: "round",
      wordWrap: !0,
      wordWrapWidth: 380,
      align: "center",
    });
    this.leaveClanVerificationText.x = 0.5 * this.leaveClanBackground.width;
    this.leaveClanVerificationText.y = 40;
    this.leaveClanVerificationText.anchor.x = this.leaveClanVerificationText.anchor.y = 0.5;
    this.leaveClanAcceptButton = new Button("leave_clan_accept");
    this.leaveClanAcceptButton.setText("Confirm");
    this.leaveClanAcceptButton.scale.x = this.leaveClanAcceptButton.scale.y = 0.8;
    this.leaveClanAcceptButton.addListener(
      Button.BUTTON_RELEASED,
      this.onLeaveClanAcceptButtonReleased.bind(this)
    );
    this.leaveClanAcceptButton.x =
      0.5 * (this.leaveClanBackground.width - this.leaveClanAcceptButton.width) + 70;
    this.leaveClanAcceptButton.y = 140;
    this.leaveClanAcceptButton.setTint(16711680);
    this.leaveClanDeclineButton = new Button("leave_clan_cancel");
    this.leaveClanDeclineButton.setText("Cancel");
    this.leaveClanDeclineButton.scale.x = this.leaveClanDeclineButton.scale.y = 0.8;
    this.leaveClanDeclineButton.addListener(
      Button.BUTTON_RELEASED,
      this.onleaveClanCancelButtonReleased.bind(this)
    );
    this.leaveClanDeclineButton.x =
      0.5 * (this.leaveClanBackground.width - this.leaveClanDeclineButton.width) - 70;
    this.leaveClanDeclineButton.y = 140;
    this.leaveClanDeclineButton.setTint(16763904);
    this.leaveClanErrorText = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 22,
      align: "center",
      multiline: !0,
    });
    this.leaveClanErrorText.x = 0.5 * this.leaveClanBackground.width;
    this.leaveClanErrorText.y = 186;
    this.leaveClanErrorText.tint = 16711680;
    this.leaveClanErrorText.anchor.x = this.leaveClanErrorText.anchor.y = 0.5;
    this.leaveClanContainer.addChild(this.leaveClanBackground);
    this.leaveClanContainer.addChild(this.leaveClanAcceptButton);
    this.leaveClanContainer.addChild(this.leaveClanDeclineButton);
    this.leaveClanContainer.addChild(this.leaveClanVerificationText);
    this.leaveClanContainer.addChild(this.leaveClanErrorText);
    this.leaveClanContainer.x = 0.5 * (this.w - this.leaveClanContainer.width);
    this.leaveClanContainer.y = 0.5 * (this.h - this.leaveClanContainer.height);
  }
  async load() {
    let a = await APIClient.getClanByAccountId(App.Credential.playerid);
    a && (a.clan.id ? this.displayOverview(a.clan) : this.displayCreate());
  }
  displayCreate() {
    this.creationContainer.parent || this.container.addChild(this.creationContainer);
    this.displayContainer.parent && this.container.removeChild(this.displayContainer);
  }
  async displayOverview(a) {
    this.displayContainer.parent || this.container.addChild(this.displayContainer);
    this.creationContainer.parent && this.container.removeChild(this.creationContainer);
    var b = new Date(Date.parse(a.created)),
      c = b.getFullYear(),
      d = b.getMonth() + 1;
    b = b.getDate();
    c = c.toString() + "-" + d.toString().padStart(2, "0") + "-" + b.toString().padStart(2, "0");
    this.nameText.text = a.name;
    this.memberText.text = a.members + " members";
    this.roleText.text = a.role;
    this.createdText.text = "Founded on " + c;
    c = await APIClient.getClanMembers(a.id);
    if (c.success) {
      this.members = [];
      this.memberListContainer.removeChildren();
      a = a.role;
      c = c.members;
      for (d = 0; d < c.length; d++) {
        b = {};
        let e = !1,
          f = c[d];
        "leader" === a &&
          "member" === f.role &&
          ((b[MemberDropdown.ACTION_PROMOTE] = "Promote"), (e = !0));
        "leader" === a &&
          "captain" === f.role &&
          ((b[MemberDropdown.ACTION_DEMOTE] = "Demote"), (e = !0));
        if (
          ("leader" === a && ("member" === f.role || "captain" === f.role)) ||
          ("captain" === a && "member" === f.role)
        )
          (b[MemberDropdown.ACTION_REMOVE] = "Remove"), (e = !0);
        let g = new MemberItem(f.id, f.name, f.role, b);
        g.x = 0;
        g.y = 47 + d * MemberListScrollbar.ItemHeight;
        g.on(ClanTab.ACCESS_PROFILE, (h) => this.emit(Layer.Events.USER_ACCESS, h));
        if (e && f.id !== App.Credential.playerid)
          g.on(ClanTab.SHOW_DROPDOWN, (h) => this.showDropdown(f.id, g, h));
        this.members.push(g);
        this.members.length <
          Math.floor(MemberListScrollbar.ListHeight / MemberListScrollbar.ItemHeight) &&
          this.memberListContainer.addChild(g);
      }
      this.members.length >
      Math.floor(MemberListScrollbar.ListHeight / MemberListScrollbar.ItemHeight)
        ? this.displayContainer.addChild(this.scrollbar)
        : this.displayContainer.removeChild(this.scrollbar);
      this.scrollbar.reset();
      this.maskMemberList(0);
    }
  }
  showDropdown(a, b, c) {
    this.memberDropdown.id === a && this.memberDropdown.parent
      ? this.container.removeChild(this.memberDropdown)
      : ((this.memberDropdown.id = a),
        (this.memberDropdown.name = b.name),
        this.container.addChild(this.memberDropdown),
        (this.memberDropdown.x = this.listContainer.x + b.x),
        (this.memberDropdown.y =
          this.listContainer.y + this.memberListContainer.y + b.y + b.height),
        this.memberDropdown.display(c, a));
  }
  validateClanCreationForm() {
    let a = !0,
      b = "",
      c = this.clanNameField.getText().trim();
    2 > c.length || 20 < c.field
      ? ((a = !1),
        (b = "Clan names should be longer than 2 and shorter than 21 characters."),
        this.clanNameField.markInvalid())
      : this.clanNameField.markNone();
    a && (this.createClanErrorMessage.text = "");
    return { valid: a, error: b };
  }
  async onCreateClanButtonReleased() {
    this.createClanButton.disable();
    var a = this.validateClanCreationForm();
    a.valid
      ? ((a = this.clanNameField.getText().trim()),
        (a = await APIClient.postCreateClan(a, App.Credential.id)),
        a.success
          ? ((a = await APIClient.getClanByAccountId(App.Credential.playerid)),
            this.displayOverview(a.clan),
            this.maskMemberList(0),
            this.emit(Layer.Events.CREATE_CLAN))
          : ((this.createClanErrorMessage.text = a.error), this.createClanButton.enable()))
      : ((this.createClanErrorMessage.text = a.error), this.createClanButton.enable());
  }
  async onLeaveClanButtonReleased() {
    this.leaveClanContainer.parent || this.displayContainer.addChild(this.leaveClanContainer);
    this.leaveClanButton.disable();
  }
  async onLeaveClanAcceptButtonReleased() {
    (await APIClient.postLeaveMember(App.Credential.id)).success
      ? (this.leaveClanContainer.parent &&
          this.displayContainer.removeChild(this.leaveClanContainer),
        this.emit(Layer.Events.LEAVE_CLAN),
        this.leaveClanButton.enable(),
        this.displayCreate())
      : ((this.leaveClanErrorText.text = "Error: unable to leave clan."),
        this.leaveClanButton.enable());
  }
  async onleaveClanCancelButtonReleased() {
    this.leaveClanContainer.parent && this.displayContainer.removeChild(this.leaveClanContainer);
    this.leaveClanButton.enable();
    this.leaveClanErrorText.text = "";
  }
  maskMemberList(a) {
    let b = Math.floor(MemberListScrollbar.ListHeight / MemberListScrollbar.ItemHeight);
    if (this.members.length <= b) this.memberListContainer.y = 0;
    else {
      this.memberListContainer.removeChildren();
      this.memberListContainer.y = -(
        a *
        (this.members.length * MemberListScrollbar.ItemHeight -
          (MemberListScrollbar.ListHeight - MemberListScrollbar.ItemHeight))
      );
      a = this.memberListContainer.y;
      var c = Math.round(Math.abs(a / MemberListScrollbar.ItemHeight));
      for (let e = 0; e < b; e++) {
        let f = this.members[c + e];
        this.memberListContainer.addChild(f);
        if (0 === e) {
          var d = c * MemberListScrollbar.ItemHeight + a;
          f.alpha = 0 <= d ? 1 : 1 - (1 / (0.5 * MemberListScrollbar.ItemHeight)) * Math.abs(d);
        } else
          e === b - 1
            ? ((d = c * MemberListScrollbar.ItemHeight + a),
              (f.alpha =
                0 > d ? 1 : 1 - (1 / (0.5 * MemberListScrollbar.ItemHeight)) * Math.abs(d)))
            : (f.alpha = 1);
      }
    }
  }
  async promoteMember(a) {
    this.memberDropdown.parent && this.container.removeChild(this.memberDropdown);
    await APIClient.postPromoteMember(a, App.Credential.id);
    (a = await APIClient.getClanByAccountId(App.Credential.playerid)) &&
      this.displayOverview(a.clan);
  }
  async demoteMember(a) {
    this.memberDropdown.parent && this.container.removeChild(this.memberDropdown);
    await APIClient.postDemoteMember(a, App.Credential.id);
    (a = await APIClient.getClanByAccountId(App.Credential.playerid)) &&
      this.displayOverview(a.clan);
  }
  async removeMember(a) {
    this.memberDropdown.parent && this.container.removeChild(this.memberDropdown);
    await APIClient.postRemoveMember(a, App.Credential.id);
    (a = await APIClient.getClanByAccountId(App.Credential.playerid)) &&
      this.displayOverview(a.clan);
  }
}
ClanTab.SHOW_DROPDOWN = "showDropdown";
ClanTab.ACCESS_PROFILE = "accessProfile";
export class MemberListScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.bh = this.h - 39;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-10, -2, 50, this.h + 30);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, -3, 16, 35, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = this.bh * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c));
  }
  scroll(a) {
    if (this.scrolling) {
      a = a.data.global.y / App.Scale;
      let b = this.scrollButton.y + (a - this.oy);
      b = 0 > b ? 0 : b > this.bh ? this.bh : b;
      let c = (1 / this.h) * b * (this.h / this.bh);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(MemberListScrollbar.SCROLL, c);
    }
  }
  reset() {
    this.scrollButton.y = (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
MemberListScrollbar.SCROLL = "scroll";
MemberListScrollbar.ListHeight = 208;
MemberListScrollbar.ItemHeight = 30;
export class MemberItem extends PIXI.Container {
  constructor(a, b, c, d) {
    super();
    this.id = a;
    this.name = b;
    this.role = c;
    this.options = d;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRoundedRect(0, 0, 276, 26, 4);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0.5;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.5;
    });
    this.background.on("mousedown", () => this.emit(ClanTab.ACCESS_PROFILE, this.id));
    this.background.on("rightdown", () => this.emit(ClanTab.SHOW_DROPDOWN, this.options));
    this.addChild(this.background);
    this.nameLabel = new PIXI.Text(this.name, FontStyle.SocialMenuItem);
    this.nameLabel.x = 8;
    this.nameLabel.y = 2;
    this.nameLabel.hitArea = new PIXI.Rectangle();
    this.nameLabel.resolution = 2;
    this.addChild(this.nameLabel);
    if ("captain" === this.role || "leader" === this.role)
      (this.roleLabel = new PIXI.Text(this.role, FontStyle.SocialMenuItem)),
        (this.roleLabel.x = 270 - this.roleLabel.width),
        (this.roleLabel.y = 2),
        (this.roleLabel.hitArea = new PIXI.Rectangle()),
        (this.roleLabel.tint = "leader" === this.role ? 8978312 : 16746632),
        (this.roleLabel.resolution = 2),
        this.addChild(this.roleLabel);
  }
}
export class MemberDropdown extends PIXI.Container {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.addChild(this.background);
    this.itemContainer = new PIXI.Graphics();
    this.addChild(this.itemContainer);
  }
  display(a, b) {
    this.background.clear();
    this.itemContainer.removeChildren();
    let c = 0;
    for (let d in a) {
      let e = new MemberDropdownActionRow(a[d], d, 16777215);
      e.on(d, () => this.emit(d, b));
      e.x = 10;
      e.y = 6 + 30 * c;
      this.itemContainer.addChild(e);
      c++;
    }
    this.background.lineStyle(1, 16777215, 0.4, 0);
    this.background.beginFill(5592405, 0.9);
    this.background.drawRoundedRect(0, 0, 110, 2 + 30 * c, 4);
    this.background.endFill();
  }
}
MemberDropdown.ACTION_PROMOTE = "promote";
MemberDropdown.ACTION_DEMOTE = "demote";
MemberDropdown.ACTION_REMOVE = "remove";
export class MemberDropdownActionRow extends PIXI.Container {
  constructor(a, b, c, d = !0) {
    super();
    this.text = a;
    this.tintValue = c;
    switch (b) {
      case MemberDropdown.ACTION_PROMOTE:
        this.tintValue = 65280;
        break;
      case MemberDropdown.ACTION_DEMOTE:
        this.tintValue = 16776960;
        break;
      case MemberDropdown.ACTION_REMOVE:
        this.tintValue = 16711680;
    }
    this.actionText = new PIXI.Text(this.text, FontStyle.SmallMenuTextWhite);
    this.confirmation = d;
    this.confirming = !1;
    this.interactive = !0;
    this.hitArea = new PIXI.Rectangle(0, 0, 100, 30);
    this.actionText.tint = this.tintValue;
    this.actionText.alpha = 0.7;
    this.on("mouseover", () => {
      this.actionText.alpha = 1;
    });
    this.on("mouseout", () => {
      this.actionText.alpha = 0.7;
      this.confirmation &&
        ((this.confirming = !1),
        (this.actionText.text = this.text),
        (this.actionText.tint = this.tintValue));
    });
    this.on("mousedown", () => {
      this.confirmation
        ? this.confirming
          ? (this.emit(b), (this.actionText.tint = this.tintValue))
          : ((this.actionText.text = "Confirm?"),
            (this.actionText.tint = 16746496),
            (this.confirming = !0))
        : (this.emit(b), (this.actionText.tint = this.tintValue));
    });
    this.addChild(this.actionText);
  }
}
MemberDropdownActionRow.CONFIRM = "confirm";
MemberDropdownActionRow.SELECT = "select";
var settingstab = {};
export class SettingsTab extends Feature {
  constructor(a, b) {
    super();
    this.settings = { allow_invite: !1 };
    this.w = a;
    this.h = b;
    this.ox = 20;
    this.oy = 126;
    this.initialized = !1;
    this.background = new PIXI.Graphics();
    this.background.x = this.ox - 6;
    this.background.y = this.oy + 4;
    this.background.beginFill(6710886, 0.3);
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.drawRoundedRect(0, 0, 632, 300, 8);
    this.background.endFill();
    this.container.addChild(this.background);
    this.settingsTitle = new PIXI.Text("Social preferences", FontStyle.MediumOrangeText);
    this.settingsTitle.x = this.ox - 4;
    this.settingsTitle.y = 100;
    this.settingsTitle.tint = 16763904;
    this.settingsTitle.resolution = 2;
    this.addChild(this.settingsTitle);
    this.allowInviteCheck = new Checkbox(
      "allowInvite",
      "Allow friend invitations",
      this.settings.allow_invite
    );
    this.allowInviteCheck.x = this.ox + 20;
    this.allowInviteCheck.y = this.oy + 40;
    this.allowInviteCheck.on(Checkbox.CHANGE, (c) => (this.settings.allow_invite = c));
    this.container.addChild(this.allowInviteCheck);
    this.allowInviteCheck.setChecked(this.settings.allow_invite);
    this.applyButton = new Button("save");
    this.applyButton.x = this.ox + 20;
    this.applyButton.y = this.background.height - 46;
    this.applyButton.setText("Save preferences");
    this.applyButton.scale.x = this.applyButton.scale.y = 0.8;
    this.applyButton.addListener(Button.BUTTON_RELEASED, this.onApplyButtonReleased.bind(this));
    this.applyButton.setTint(16763904);
    this.container.addChild(this.applyButton);
  }
  async onApplyButtonReleased() {
    this.applyButton.disable();
    await APIClient.postSettings(this.settings, App.Credential.id);
    this.applyButton.enable();
  }
  async load() {
    if (!this.initialized) {
      var a = await APIClient.getSettings(App.Credential.id);
      a.success &&
        ((this.initialized = !0),
        (this.settings = a.settings),
        this.allowInviteCheck.setChecked(this.settings.allow_invite));
    }
  }
}
var profilemenu = {};
export class ProfileMenu extends Feature {
  constructor() {
    super();
    this.tab = null;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.background.lineStyle(2, 16777215, 0.1);
    this.background.moveTo(10, 59);
    this.background.lineTo(650, 59);
    this.container.addChild(this.background);
    this.ox = 0;
    this.oy = 40;
    this.overviewTabButton = new PIXI.Graphics();
    this.overviewTabButton.beginFill(13421772, 0.2);
    this.overviewTabButton.drawRoundedRect(0, 0, 96, 40, 8);
    this.overviewTabButton.endFill();
    this.overviewTabButton.interactive = !0;
    this.overviewTabButton.x = this.ox + 14;
    this.overviewTabButton.y = this.oy + 14;
    this.overviewTabButton.on("mousedown", () => this.openTab(ProfileMenu.TAB_OVERVIEW));
    this.overviewTabButton.on("touchstart", () => this.openTab(ProfileMenu.TAB_OVERVIEW));
    this.container.addChild(this.overviewTabButton);
    this.overviewTabTitle = new PIXI.Text("Overview", FontStyle.ProfileTabText);
    this.overviewTabTitle.scale.x = this.overviewTabTitle.scale.y = 0.9;
    this.overviewTabTitle.anchor.x = this.overviewTabTitle.anchor.y = 0.5;
    this.overviewTabTitle.x = this.overviewTabButton.x + 0.5 * this.overviewTabButton.width;
    this.overviewTabTitle.y = this.overviewTabButton.y + 20;
    this.overviewTabTitle.interactive = !0;
    this.overviewTabTitle.resolution = 2;
    this.overviewTabTitle.on("mouseover", () => {
      this.overviewTabTitle.scale.x = this.overviewTabTitle.scale.y = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.overviewTabTitle.on(
      "mouseout",
      () => (this.overviewTabTitle.scale.x = this.overviewTabTitle.scale.y = 0.9)
    );
    this.overviewTabButton.on(
      "mouseover",
      () => (this.overviewTabTitle.scale.x = this.overviewTabTitle.scale.y = 1)
    );
    this.overviewTabButton.on(
      "mouseout",
      () => (this.overviewTabTitle.scale.x = this.overviewTabTitle.scale.y = 0.9)
    );
    this.overviewTabTitle.on("mousedown", () => this.openTab(ProfileMenu.TAB_OVERVIEW));
    this.overviewTabTitle.on("touchstart", () => this.openTab(ProfileMenu.TAB_OVERVIEW));
    this.container.addChild(this.overviewTabTitle);
    this.clanTabButton = new PIXI.Graphics();
    this.clanTabButton.beginFill(13421772, 0.2);
    this.clanTabButton.drawRoundedRect(0, 0, 96, 40, 8);
    this.clanTabButton.endFill();
    this.clanTabButton.interactive = !0;
    this.clanTabButton.x = this.ox + this.overviewTabButton.x + this.overviewTabButton.width + 4;
    this.clanTabButton.y = this.oy + 14;
    this.clanTabButton.on("mousedown", () => this.openTab(ProfileMenu.TAB_CLAN));
    this.clanTabButton.on("touchstart", () => this.openTab(ProfileMenu.TAB_CLAN));
    this.container.addChild(this.clanTabButton);
    this.clanTabTitle = new PIXI.Text("Clan", FontStyle.ProfileTabText);
    this.clanTabTitle.scale.x = this.clanTabTitle.scale.y = 0.9;
    this.clanTabTitle.anchor.x = this.clanTabTitle.anchor.y = 0.5;
    this.clanTabTitle.x = this.clanTabButton.x + 0.5 * this.clanTabButton.width;
    this.clanTabTitle.y = this.clanTabButton.y + 20;
    this.clanTabTitle.resolution = 2;
    this.clanTabTitle.interactive = !0;
    this.clanTabTitle.on("mouseover", () => {
      this.clanTabTitle.scale.x = this.clanTabTitle.scale.y = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.clanTabTitle.on(
      "mouseout",
      () => (this.clanTabTitle.scale.x = this.clanTabTitle.scale.y = 0.9)
    );
    this.clanTabButton.on(
      "mouseover",
      () => (this.clanTabTitle.scale.x = this.clanTabTitle.scale.y = 1)
    );
    this.clanTabButton.on(
      "mouseout",
      () => (this.clanTabTitle.scale.x = this.clanTabTitle.scale.y = 0.9)
    );
    this.clanTabTitle.on("mousedown", () => this.openTab(ProfileMenu.TAB_CLAN));
    this.clanTabTitle.on("touchstart", () => this.openTab(ProfileMenu.TAB_CLAN));
    this.container.addChild(this.clanTabTitle);
    this.accountTabButton = new PIXI.Graphics();
    this.accountTabButton.beginFill(13421772, 0.2);
    this.accountTabButton.drawRoundedRect(0, 0, 96, 40, 8);
    this.accountTabButton.endFill();
    this.accountTabButton.interactive = !0;
    this.accountTabButton.x = this.ox + this.clanTabButton.x + this.clanTabButton.width + 4;
    this.accountTabButton.y = this.oy + 14;
    this.accountTabButton.on("mousedown", () => this.openTab(ProfileMenu.TAB_ACCOUNT));
    this.accountTabButton.on("touchstart", () => this.openTab(ProfileMenu.TAB_ACCOUNT));
    this.container.addChild(this.accountTabButton);
    this.accountTabTitle = new PIXI.Text("Account", FontStyle.ProfileTabText);
    this.accountTabTitle.scale.x = this.accountTabTitle.scale.y = 0.9;
    this.accountTabTitle.anchor.x = this.accountTabTitle.anchor.y = 0.5;
    this.accountTabTitle.x = this.accountTabButton.x + 0.5 * this.accountTabButton.width;
    this.accountTabTitle.y = this.accountTabButton.y + 20;
    this.accountTabTitle.interactive = !0;
    this.accountTabTitle.alpha = 0.75;
    this.accountTabTitle.resolution = 2;
    this.accountTabTitle.on("mouseover", () => {
      this.accountTabTitle.scale.x = this.accountTabTitle.scale.y = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.accountTabTitle.on(
      "mouseout",
      () => (this.accountTabTitle.scale.x = this.accountTabTitle.scale.y = 0.9)
    );
    this.accountTabTitle.on("mousedown", () => this.openTab(ProfileMenu.TAB_ACCOUNT));
    this.accountTabTitle.on("touchstart", () => this.openTab(ProfileMenu.TAB_ACCOUNT));
    this.accountTabButton.on(
      "mouseover",
      () => (this.accountTabTitle.scale.x = this.accountTabTitle.scale.y = 1)
    );
    this.accountTabButton.on(
      "mouseout",
      () => (this.accountTabTitle.scale.x = this.accountTabTitle.scale.y = 0.9)
    );
    this.container.addChild(this.accountTabTitle);
    this.settingsTabButton = new PIXI.Graphics();
    this.settingsTabButton.beginFill(13421772, 0.2);
    this.settingsTabButton.drawRoundedRect(0, 0, 96, 40, 8);
    this.settingsTabButton.endFill();
    this.settingsTabButton.interactive = !0;
    this.settingsTabButton.x = this.ox + this.accountTabButton.x + this.accountTabButton.width + 4;
    this.settingsTabButton.y = this.oy + 14;
    this.settingsTabButton.on("mousedown", () => this.openTab(ProfileMenu.TAB_SETTINGS));
    this.settingsTabButton.on("touchstart", () => this.openTab(ProfileMenu.TAB_SETTINGS));
    this.container.addChild(this.settingsTabButton);
    this.settingsTabTitle = new PIXI.Text("Settings", FontStyle.ProfileTabText);
    this.settingsTabTitle.scale.x = this.settingsTabTitle.scale.y = 0.9;
    this.settingsTabTitle.anchor.x = this.settingsTabTitle.anchor.y = 0.5;
    this.settingsTabTitle.x = this.settingsTabButton.x + 0.5 * this.settingsTabButton.width;
    this.settingsTabTitle.y = this.settingsTabButton.y + 20;
    this.settingsTabTitle.resolution = 2;
    this.settingsTabTitle.interactive = !0;
    this.settingsTabTitle.on("mouseover", () => {
      this.settingsTabTitle.scale.x = this.settingsTabTitle.scale.y = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.settingsTabTitle.on(
      "mouseout",
      () => (this.settingsTabTitle.scale.x = this.settingsTabTitle.scale.y = 0.9)
    );
    this.settingsTabButton.on(
      "mouseover",
      () => (this.settingsTabTitle.scale.x = this.settingsTabTitle.scale.y = 1)
    );
    this.settingsTabButton.on(
      "mouseout",
      () => (this.settingsTabTitle.scale.x = this.settingsTabTitle.scale.y = 0.9)
    );
    this.settingsTabTitle.on("mousedown", () => this.openTab(ProfileMenu.TAB_SETTINGS));
    this.settingsTabTitle.on("touchstart", () => this.openTab(ProfileMenu.TAB_SETTINGS));
    this.container.addChild(this.settingsTabTitle);
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 14;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.PROFILE_CANCEL));
    this.container.addChild(this.closeButton);
    this.container.x = 0.5 * -this.width;
    this.overviewTab = new OverviewTab(this.width, this.height);
    this.overviewTab.on(Layer.Events.PROFILE_CANCEL, () => this.emit(Layer.Events.PROFILE_CANCEL));
    this.overviewTab.on(Layer.Events.USER_ACCESS, (...a) =>
      this.emit(Layer.Events.USER_ACCESS, ...a)
    );
    this.accountTab = new AccountTab(this.width, this.height);
    this.accountTab.on(Layer.Events.LOGOUT, () => this.emit(Layer.Events.LOGOUT));
    this.accountTab.on(Layer.Events.PROFILE_RENAME, (a) =>
      this.emit(Layer.Events.PROFILE_RENAME, a)
    );
    this.incompleteAccountTab = new IncompleteAccountTab(this.width, this.height);
    this.incompleteAccountTab.on(Layer.Events.RENAME_ACCESS, () =>
      this.emit(Layer.Events.RENAME_ACCESS)
    );
    this.clanTab = new ClanTab(this.width, this.height);
    this.clanTab.on(Layer.Events.USER_ACCESS, (a) => this.emit(Layer.Events.USER_ACCESS, a));
    this.clanTab.on(Layer.Events.LEAVE_CLAN, (a) => this.emit(Layer.Events.LEAVE_CLAN, a));
    this.clanTab.on(Layer.Events.CREATE_CLAN, (a) => this.emit(Layer.Events.CREATE_CLAN, a));
    this.settingsTab = new SettingsTab();
    this.publicProfileButton = new Button("public_profile");
    this.publicProfileButton.setText("View public profile page");
    this.publicProfileButton.setTint(16763904);
    this.publicProfileButton.scale.x = this.publicProfileButton.scale.y = 0.75;
    this.publicProfileButton.addListener(Button.BUTTON_RELEASED, () => {
      this.emit(Layer.Events.PROFILE_CANCEL);
      this.emit(Layer.Events.USER_ACCESS, App.Credential.playerid);
    });
    this.publicProfileButton.x = 0.5 * (this.background.width - this.publicProfileButton.width);
    this.publicProfileButton.y = 515;
    this.container.addChild(this.publicProfileButton);
  }
  openTab(a, b = !0) {
    b && AudioEffects.ButtonClick.audio.play();
    this.tab = a;
    switch (a) {
      case ProfileMenu.TAB_ACCOUNT:
        this.accountTabTitle.alpha = 1;
        this.accountTabButton.alpha = 0.3;
        App.Autogen
          ? (this.accountTab.parent && this.container.removeChild(this.accountTab),
            this.container.addChild(this.incompleteAccountTab))
          : (this.incompleteAccountTab.parent &&
              this.container.removeChild(this.incompleteAccountTab),
            this.container.addChild(this.accountTab),
            this.accountTab.load());
        this.overviewTabTitle.alpha = 0.75;
        this.overviewTabButton.alpha = 1;
        this.overviewTab.parent && this.container.removeChild(this.overviewTab);
        this.clanTabTitle.alpha = 0.75;
        this.clanTabButton.alpha = 1;
        this.clanTab.parent && this.container.removeChild(this.clanTab);
        this.settingsTabTitle.alpha = 0.75;
        this.settingsTabButton.alpha = 1;
        this.settingsTab.parent && this.container.removeChild(this.settingsTab);
        break;
      case ProfileMenu.TAB_CLAN:
        this.clanTabTitle.alpha = 1;
        this.clanTabButton.alpha = 0.3;
        this.container.addChild(this.clanTab);
        this.clanTab.load();
        this.overviewTabTitle.alpha = 0.75;
        this.overviewTabButton.alpha = 1;
        this.overviewTab.parent && this.container.removeChild(this.overviewTab);
        this.accountTabTitle.alpha = 0.75;
        this.accountTabButton.alpha = 1;
        this.accountTab.parent && this.container.removeChild(this.accountTab);
        this.incompleteAccountTab.parent && this.container.removeChild(this.incompleteAccountTab);
        this.settingsTabTitle.alpha = 0.75;
        this.settingsTabButton.alpha = 1;
        this.settingsTab.parent && this.container.removeChild(this.settingsTab);
        break;
      case ProfileMenu.TAB_OVERVIEW:
        this.overviewTabTitle.alpha = 1;
        this.overviewTabButton.alpha = 0.3;
        this.container.addChild(this.overviewTab);
        this.overviewTab.load();
        this.accountTabTitle.alpha = 0.75;
        this.accountTabButton.alpha = 1;
        this.accountTab.parent && this.container.removeChild(this.accountTab);
        this.clanTabTitle.alpha = 0.75;
        this.clanTabButton.alpha = 1;
        this.clanTab.parent && this.container.removeChild(this.clanTab);
        this.incompleteAccountTab.parent && this.container.removeChild(this.incompleteAccountTab);
        this.settingsTabTitle.alpha = 0.75;
        this.settingsTabButton.alpha = 1;
        this.settingsTab.parent && this.container.removeChild(this.settingsTab);
        break;
      case ProfileMenu.TAB_SETTINGS:
        (this.settingsTabTitle.alpha = 1),
          (this.settingsTabButton.alpha = 0.3),
          this.container.addChild(this.settingsTab),
          this.settingsTab.load(),
          (this.overviewTabTitle.alpha = 0.75),
          (this.overviewTabButton.alpha = 1),
          this.overviewTab.parent && this.container.removeChild(this.overviewTab),
          (this.accountTabTitle.alpha = 0.75),
          (this.accountTabButton.alpha = 1),
          this.accountTab.parent && this.container.removeChild(this.accountTab),
          (this.clanTabTitle.alpha = 0.75),
          (this.clanTabButton.alpha = 1),
          this.clanTab.parent && this.container.removeChild(this.clanTab),
          this.incompleteAccountTab.parent && this.container.removeChild(this.incompleteAccountTab);
    }
  }
  update() {
    this.tab === ProfileMenu.TAB_OVERVIEW && this.overviewTab.update();
  }
  show() {
    this.openTab(this.tab, !1);
  }
  hide() {
    super.hide();
    this.overviewTab.hide();
  }
  reset() {}
}
ProfileMenu.TAB_OVERVIEW = "tab_overview";
ProfileMenu.TAB_CLAN = "tab_clan";
ProfileMenu.TAB_ACCOUNT = "tab_account";
ProfileMenu.TAB_SETTINGS = "tab_settings";
var userinput = {},
  UserInput = {
    pressed: {},
    hasFocus: !1,
    setFocus: function (a) {
      this.hasFocus = !0;
      this.onFocus = a;
    },
    releaseFocus: function () {
      this.hasFocus = !1;
      this.onFocus = null;
    },
    emulateKeyDown: function (a) {
      this.dispatchEvent(new CustomEvent(UserInput.KEY_DOWN, a));
    },
    emulateKeyUp: function (a) {
      this.dispatchEvent(new CustomEvent(UserInput.KEY_UP, a));
    },
    onKeyDown: function (a) {
      var b = a.keyCode || a.char,
        c = { char: this.getMappedChar(b, a.shiftKey), code: b, ctrl: a.ctrlKey };
      if (this.onFocus) this.onFocus(new CustomEvent(UserInput.KEY_PRESS, c));
      else
        this.dispatchEvent(new CustomEvent(UserInput.KEY_PRESS, c)),
          this.dispatchEvent(new CustomEvent(UserInput.KEY_DOWN, c));
      this.pressed[b] = !0;
      App.FieldHasFocus || 8 !== a.keyCode || a.preventDefault();
    },
    onKeyUp: function (a) {
      var b = a.keyCode || a.char;
      this.pressed[b] &&
        (this.onFocus ||
          this.dispatchEvent(
            new CustomEvent(UserInput.KEY_UP, { char: this.getMappedChar(b, a.shiftKey), code: b })
          ),
        (this.pressed[b] = !1));
    },
    getMappedChar: function (a, b) {
      8 !== a && 191 !== a && 220 !== a && String.fromCharCode(a);
      return b ? characterMapShift[a] : characterMap[a];
    },
    azertyToQwerty: function (a) {
      var b = azertyMap[a];
      return b ? b : a;
    },
  };
EventDispatcher.call(UserInput);
UserInput.KEY_DOWN = "keyDown";
UserInput.KEY_UP = "keyUp";
UserInput.KEY_PRESS = "keyPress";
UserInput.BACKSPACE = 8;
UserInput.ENTER = 13;
UserInput.NUMERIC = "1234567890";
UserInput.ALPHANUMERIC = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
UserInput.ALPHA_EXT =
  "\u00e4\u00e7\u00eb\u00e9\u00e8\u00ef\u00ed\u00ec\u00f6\u00f3\u00f2\u00df\u00fc\u00fa\u00f9\u00fd\u00ff\u00c4\u00c7\u00cb\u00c9\u00c8\u00cf\u00cd\u00cc\u00d6\u00d3\u00d2\u00a7\u00dc\u00da\u00d9\u00dd";
UserInput.CHAT_SYMBOLS = ",|{}[]~'`\"?:\\/()*&^%$#@!=;-! ._<>+";
UserInput.WHEEL = "wheel";
UserInput.ExclusiveWheel = null;
document.addEventListener("keydown", (a) => UserInput.onKeyDown(a));
document.addEventListener("keyup", (a) => UserInput.onKeyUp(a));
window.addEventListener("keydown", (a) => {
  ["ArrowDown", "ArrowUp", " "].includes(a.key) && a.preventDefault();
});
window.addEventListener(
  "wheel",
  (a) => {
    a.preventDefault();
    null !== UserInput.ExclusiveWheel
      ? UserInput.ExclusiveWheel(new CustomEvent(UserInput.WHEEL, { delta: a.deltaY }))
      : UserInput.dispatchEvent(new CustomEvent(UserInput.WHEEL, { delta: a.deltaY }));
  },
  { passive: !1 }
);
var characterMapCTRL = [];
characterMapCTRL[16] = "SHT";
characterMapCTRL[17] = "CTL";
characterMapCTRL[18] = "ALT";
characterMapCTRL[32] = "SPC";
characterMapCTRL[37] = "LFT";
characterMapCTRL[38] = "UP";
characterMapCTRL[39] = "RGT";
characterMapCTRL[40] = "DWN";
var arrowsInv = { LFT: "A", UP: "W", RGT: "D", DWN: "S" },
  azertyMap = [];
azertyMap[91] = 87;
azertyMap[81] = 65;
azertyMap[83] = 83;
azertyMap[68] = 68;
azertyMap[65] = 81;
azertyMap[87] = 90;
var characterMapShift = [];
characterMapShift[8] = "";
characterMapShift[9] = "";
characterMapShift[13] = "\n";
characterMapShift[16] = "";
characterMapShift[17] = "";
characterMapShift[18] = "";
characterMapShift[19] = "";
characterMapShift[20] = "";
characterMapShift[27] = "";
characterMapShift[32] = " ";
characterMapShift[33] = "";
characterMapShift[34] = "";
characterMapShift[35] = "";
characterMapShift[36] = "";
characterMapShift[37] = "";
characterMapShift[38] = "";
characterMapShift[39] = "";
characterMapShift[40] = "";
characterMapShift[45] = "";
characterMapShift[46] = "";
characterMapShift[48] = ")";
characterMapShift[49] = "!";
characterMapShift[50] = "@";
characterMapShift[51] = "#";
characterMapShift[52] = "$";
characterMapShift[53] = "%";
characterMapShift[54] = "^";
characterMapShift[55] = "&";
characterMapShift[56] = "*";
characterMapShift[57] = "(";
characterMapShift[59] = ":";
characterMapShift[61] = "+";
characterMapShift[65] = "A";
characterMapShift[66] = "B";
characterMapShift[67] = "C";
characterMapShift[68] = "D";
characterMapShift[69] = "E";
characterMapShift[70] = "F";
characterMapShift[71] = "G";
characterMapShift[72] = "H";
characterMapShift[73] = "I";
characterMapShift[74] = "J";
characterMapShift[75] = "K";
characterMapShift[76] = "L";
characterMapShift[77] = "M";
characterMapShift[78] = "N";
characterMapShift[79] = "O";
characterMapShift[80] = "P";
characterMapShift[81] = "Q";
characterMapShift[82] = "R";
characterMapShift[83] = "S";
characterMapShift[84] = "T";
characterMapShift[85] = "U";
characterMapShift[86] = "V";
characterMapShift[87] = "W";
characterMapShift[88] = "X";
characterMapShift[89] = "Y";
characterMapShift[90] = "Z";
characterMapShift[91] = "";
characterMapShift[92] = "";
characterMapShift[93] = "";
characterMapShift[96] = "0";
characterMapShift[97] = "1";
characterMapShift[98] = "2";
characterMapShift[99] = "3";
characterMapShift[100] = "4";
characterMapShift[101] = "5";
characterMapShift[102] = "6";
characterMapShift[103] = "7";
characterMapShift[104] = "8";
characterMapShift[105] = "9";
characterMapShift[106] = "*";
characterMapShift[107] = "+";
characterMapShift[109] = "_";
characterMapShift[107] = "+";
characterMapShift[111] = "/";
characterMapShift[112] = "";
characterMapShift[113] = "";
characterMapShift[114] = "";
characterMapShift[115] = "";
characterMapShift[116] = "";
characterMapShift[117] = "";
characterMapShift[118] = "";
characterMapShift[119] = "";
characterMapShift[120] = "";
characterMapShift[121] = "";
characterMapShift[122] = "";
characterMapShift[123] = "";
characterMapShift[144] = "";
characterMapShift[145] = "";
characterMapShift[186] = ":";
characterMapShift[187] = "+";
characterMapShift[188] = "<";
characterMapShift[189] = "_";
characterMapShift[190] = ">";
characterMapShift[191] = "?";
characterMapShift[192] = "~";
characterMapShift[219] = "{";
characterMapShift[220] = "|";
characterMapShift[221] = "}";
characterMapShift[222] = '"';
var characterMap = [];
characterMap[8] = "";
characterMap[9] = "";
characterMap[13] = "\n";
characterMap[16] = "";
characterMap[17] = "";
characterMap[18] = "";
characterMap[19] = "";
characterMap[20] = "";
characterMap[27] = "";
characterMap[32] = " ";
characterMap[33] = "";
characterMap[34] = "";
characterMap[35] = "";
characterMap[36] = "";
characterMap[37] = "";
characterMap[38] = "";
characterMap[39] = "";
characterMap[40] = "";
characterMap[45] = "";
characterMap[46] = "";
characterMap[48] = "0";
characterMap[49] = "1";
characterMap[50] = "2";
characterMap[51] = "3";
characterMap[52] = "4";
characterMap[53] = "5";
characterMap[54] = "6";
characterMap[55] = "7";
characterMap[56] = "8";
characterMap[57] = "9";
characterMap[59] = ";";
characterMap[61] = "=";
characterMap[65] = "a";
characterMap[66] = "b";
characterMap[67] = "c";
characterMap[68] = "d";
characterMap[69] = "e";
characterMap[70] = "f";
characterMap[71] = "g";
characterMap[72] = "h";
characterMap[73] = "i";
characterMap[74] = "j";
characterMap[75] = "k";
characterMap[76] = "l";
characterMap[77] = "m";
characterMap[78] = "n";
characterMap[79] = "o";
characterMap[80] = "p";
characterMap[81] = "q";
characterMap[82] = "r";
characterMap[83] = "s";
characterMap[84] = "t";
characterMap[85] = "u";
characterMap[86] = "v";
characterMap[87] = "w";
characterMap[88] = "x";
characterMap[89] = "y";
characterMap[90] = "z";
characterMap[91] = "";
characterMap[92] = "";
characterMap[93] = "";
characterMap[96] = "0";
characterMap[97] = "1";
characterMap[98] = "2";
characterMap[99] = "3";
characterMap[100] = "4";
characterMap[101] = "5";
characterMap[102] = "6";
characterMap[103] = "7";
characterMap[104] = "8";
characterMap[105] = "9";
characterMap[106] = "*";
characterMap[107] = "+";
characterMap[109] = "_";
characterMap[107] = "+";
characterMap[111] = "/";
characterMap[112] = "";
characterMap[113] = "";
characterMap[114] = "";
characterMap[115] = "";
characterMap[116] = "";
characterMap[117] = "";
characterMap[118] = "";
characterMap[119] = "";
characterMap[120] = "";
characterMap[121] = "";
characterMap[122] = "";
characterMap[123] = "";
characterMap[144] = "";
characterMap[145] = "";
characterMap[186] = ";";
characterMap[187] = "=";
characterMap[188] = ",";
characterMap[189] = "-";
characterMap[190] = ".";
characterMap[191] = "/";
characterMap[192] = "`";
characterMap[219] = "[";
characterMap[220] = "\\";
characterMap[221] = "]";
characterMap[222] = "'";
var itemoverview = {};
export class ItemOverview extends PIXI.Container {
  constructor() {
    super();
    this.items = [];
    this.title = new PIXI.Text("", FontStyle.CustomizationItem);
    this.title.x = 0;
    this.title.y = 6;
    this.title.resolution = 2;
    this.addChild(this.title);
    this.comingSoon = new PIXI.Text("Coming soon..", FontStyle.CustomizationItem);
    this.comingSoon.x = 4;
    this.comingSoon.y = 58;
    this.comingSoon.visible = !1;
    this.comingSoon.resolution = 2;
    this.addChild(this.comingSoon);
    this.background = new PIXI.Graphics();
    this.background.lineStyle(1, 16777215, 0.2, 0);
    this.background.drawRoundedRect(-5, -5, 250, 370, 4);
    this.background.endFill();
    this.background.x = 0;
    this.background.y = 50;
    this.addChild(this.background);
    this.container = new PIXI.Container();
    this.container.x = 0;
    this.container.y = 50;
    this.containerMask = new PIXI.Graphics();
    this.containerMask.beginFill(16777215, 1);
    this.containerMask.drawRoundedRect(0, 0, 240, 360, 4);
    this.containerMask.endFill();
    this.containerMask.x = 0;
    this.containerMask.y = 50;
    this.scrollbar = new IOScrollbar();
    this.scrollbar.x = 248;
    this.scrollbar.y = 50;
    this.addChild(this.scrollbar);
    this.scrollbar.on(IOScrollbar.SCROLL, (a) => {
      this.container.height > this.containerMask.height &&
        (this.container.y = 50 + a * (this.container.height - this.containerMask.height) * -1);
    });
    this.addChild(this.containerMask);
    this.addChild(this.container);
    this.container.mask = this.containerMask;
  }
  show() {
    this.scrollbar.enableWheel();
  }
  hide() {
    this.scrollbar.disableWheel();
  }
  setTitle(a) {
    this.title.text = a;
  }
  select(a) {
    for (let b = 0; b < this.items.length; b++)
      if (this.items[b].data.id === a) {
        this.items[b].select();
        break;
      }
  }
  loadItems(a, b = "", c, d) {
    this.setTitle(b);
    this.container.removeChildren();
    this.container.y = 50;
    this.scrollbar.reset();
    this.comingSoon.visible = 0 === a.length ? !0 : !1;
    for (b = 0; b < a.length; b++) {
      const e = new IOItem(a[b], d);
      e.x = 0;
      e.y = 70 * b;
      this.items.push(e);
      this.container.addChild(e);
      e.on(IOItem.SELECT, (f) => this.onItemSelected(f));
      e.data.id === c && e.select();
    }
  }
  onItemSelected(a) {
    for (let b = 0; b < this.items.length; b++)
      a.id !== this.items[b].data.id && this.items[b].deselect();
    this.emit(ItemOverview.SELECT, a);
  }
}
ItemOverview.SELECT = "select";
export class IOScrollbar extends PIXI.Container {
  constructor() {
    super();
    this.scrolling = !1;
    this.h = 370;
    this.bh = this.h - 39;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, 370, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-10, -20, 50, 400);
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (a) => {
      this.scrolling = !0;
      this.oy = a.data.global.y / App.Scale;
      this.scroll(a.data.global.y / App.Scale);
    });
    this.scrollBar.on("mouseup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (a) => this.scroll(a.data.global.y / App.Scale));
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (a) => {
      this.scrolling = !0;
      this.oy = a.data.global.y / App.Scale;
      this.scroll(a.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (a) => this.scroll(a.data.global.y / App.Scale));
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
    this.scrollButton.endFill();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = -3;
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.wheelListener = (a) => {
      a = a.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * a);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      b = 0 > b ? 0 : b > this.bh ? this.bh : b;
      let c = (1 / this.h) * b * (this.h / this.bh);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(IOScrollbar.SCROLL, c);
    }
  }
  reset() {
    this.scrollButton.y = -3;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
IOScrollbar.SCROLL = "scroll";
export class IOItem extends PIXI.Container {
  constructor(a, b) {
    super();
    this.selected = !1;
    this.data = a;
    this.itemBackground = new PIXI.Graphics();
    this.itemBackground.lineStyle(1, 16777215, 0.4, 0);
    this.itemBackground.beginFill(16777215, 0.2);
    this.itemBackground.drawRoundedRect(0, 0, 240, 64, 4);
    this.itemBackground.endFill();
    this.itemBackground.alpha = 0.5;
    this.itemBackground.x = 0;
    this.itemBackground.y = 0;
    this.itemBackground.interactive = !0;
    this.itemBackground.on("mouseover", () => this.onMouseOver());
    this.itemBackground.on("mouseout", () => this.onMouseOut());
    this.itemBackground.on("mousedown", () => this.select());
    this.itemBackground.on("pointerdown", () => this.select());
    this.addChild(this.itemBackground);
    var c = a.texture;
    b && 0 < b.length && (c = b + (0 < a.texture.length ? "_" : "") + c);
    b = new PIXI.Sprite(App.CombinedTextures[c]);
    this.timeout = !1;
    c = JSON.parse(a.data);
    let d = 1;
    d = b.height > b.width ? (68 < b.height ? 68 / b.height : 1) : 68 < b.width ? 68 / b.width : 1;
    b.scale.x = d;
    b.scale.y = d;
    b.x = 4;
    b.y = 0.5 * (70 - b.height) - 2;
    b.hitArea = new PIXI.Rectangle();
    this.addChild(b);
    void 0 !== c.tint && (b.tint = parseInt(c.tint, 16));
    c = new PIXI.Text(a.title, FontStyle.CustomizationItem);
    c.x = 72 + (0 < b.width - 68 ? b.width - 68 : 0);
    c.y = 24;
    c.hitArea = new PIXI.Rectangle();
    c.resolution = 2;
    this.addChild(c);
    a = "free" === a.status ? "Free" : a.own ? "Owned" : numberWithPeriods(a.price);
    a = new PIXI.Text(a, FontStyle.CustomizationItem);
    a.x = 185;
    a.y = 5;
    a.hitArea = new PIXI.Rectangle();
    a.resolution = 2;
    a.tint = 16763904;
    this.addChild(a);
  }
  onMouseOver() {
    this.itemBackground.alpha = 1;
    AudioEffects.ButtonHover.audio.play();
  }
  onMouseOut() {
    this.selected || (this.itemBackground.alpha = 0.5);
  }
  select() {
    this.timeout ||
      ((this.timeout = !0),
      setTimeout(() => (this.timeout = !1), 100),
      (this.selected = !0),
      (this.itemBackground.tint = 7864183),
      (this.itemBackground.alpha = 1),
      this.emit(IOItem.SELECT, this.data),
      AudioEffects.ButtonClick.audio.play());
  }
  deselect() {
    this.selected = !1;
    this.itemBackground.tint = 16777215;
    this.itemBackground.alpha = 0.5;
  }
  drawBackground(a, b) {}
}
IOItem.SELECT = "item_select";
var itempicker = {};
export class ItemPicker extends PIXI.Container {
  constructor(a, b, c, d) {
    super();
    this.title = a;
    this.type = b;
    this.data = null;
    this.itemTint = 16777215;
    this.prefix = c;
    this.callback = d;
    this.selected = this.timeout = !1;
    this.interactive = this.interactive = this.owned = !0;
    this.hitArea = new PIXI.Rectangle(0, 0, 64, 64);
    this.on("mousedown", () => {
      this.timeout ||
        (this.callback(),
        this.emit(ItemPicker.SELECT, this.type),
        AudioEffects.ButtonClick.audio.play(),
        (this.timeout = !0),
        setTimeout(() => (this.timeout = !1), 100));
    });
    this.on("pointerdown", () => {
      this.timeout ||
        (this.callback(),
        this.emit(ItemPicker.SELECT, this.type),
        AudioEffects.ButtonClick.audio.play(),
        (this.timeout = !0),
        setTimeout(() => (this.timeout = !1), 100));
    });
    this.on("mouseover", () => {
      this.background.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.on("mouseout", () => {
      this.background.alpha = 0.5;
    });
    this.background = new PIXI.Graphics();
    this.draw();
    this.addChild(this.background);
    this.icon = new PIXI.Sprite();
  }
  select() {
    this.selected = !0;
    this.draw();
  }
  deselect() {
    this.selected = !1;
    this.draw();
    this.background.tint = this.owned ? 16777215 : 16711680;
  }
  draw() {
    this.background.clear();
    this.background.alpha = 0.5;
    this.selected || !this.owned
      ? (this.background.lineStyle(3, 16777215, 1, 0), this.background.beginFill(16777215, 0.4))
      : (this.background.lineStyle(1, 16777215, 0.4, 0), this.background.beginFill(16777215, 0.2));
    this.background.drawRoundedRect(0, 0, 64, 64, 4);
    this.background.endFill();
  }
  displayItem(a, b = !0) {
    this.owned = b || a.own;
    this.background.tint = this.owned ? 16777215 : 16763904;
    this.icon.parent && this.removeChild(this.icon);
    b = a.texture;
    this.prefix &&
      0 < this.prefix.length &&
      (b = this.prefix + (0 < a.texture.length ? "_" : "") + b);
    this.icon = new PIXI.Sprite(App.CombinedTextures[b]);
    this.icon.tint = this.itemTint;
    this.icon.anchor.x = this.icon.anchor.y = 0.5;
    this.icon.x = 32;
    this.icon.y = 32;
    this.data = a;
    a =
      void 0 !== this.data.cdata
        ? this.data.cdata
        : "string" === typeof this.data.data
        ? JSON.parse(this.data.data)
        : this.data.data;
    void 0 !== a &&
      (void 0 !== a.r && (this.icon.rotation = a.r),
      void 0 !== a.h && (this.icon.scale.x = this.icon.scale.y = a.h / this.icon.height),
      void 0 !== a.tint && (this.icon.tint = parseInt(a.tint, 16)));
    64 < this.icon.width &&
      64 < this.icon.height &&
      (this.icon.scale.x = this.icon.scale.y = (1 / this.icon.height) * 54);
    "orb" === this.type && (this.icon.tint = this.itemTint);
    this.addChild(this.icon);
  }
  setTint(a) {
    this.itemTint = a;
    this.icon.tint = a;
  }
}
ItemPicker.SELECT = "select";
var colorpicker = {};
export class ColorPicker extends PIXI.Container {
  constructor(a) {
    super();
    EventDispatcher.call(this);
    this.size = a;
    this.barColors = [];
    this.sliceColors = [];
    this.dragSlice = this.dragBar = !1;
    this.barWidth = Math.floor(this.size / 10);
    this.texSlice = this.texBar = null;
    this.barPointer = new PIXI.Graphics();
    this.barPointer.lineStyle(1, 8947848, 1, 0.5, !0);
    this.barPointer.drawRect(0, -3, this.barWidth, 8);
    this.barPointer.lineStyle(1, 15658734, 1, 0.5, !0);
    this.barPointer.drawRect(-1, -4, this.barWidth, 8);
    this.background = new PIXI.Graphics();
    this.background.beginFill(0, 1e-4);
    this.background.drawRect(-100, -100, this.size + 100, this.size + 100);
    this.background.endFill();
    this.background.interactive = !0;
    this.addChild(this.background);
    this.colorPointer = new PIXI.Graphics();
    this.colorPointer.lineStyle(1, 8947848, 1, 0.5, !0);
    this.colorPointer.drawRect(-3, -3, 8, 8);
    this.colorPointer.lineStyle(1, 15658734, 1, 0.5, !0);
    this.colorPointer.drawRect(-4, -4, 8, 8);
    this.colorPointer.x = 0;
    this.colorPointer.y = 0;
    this.colorSlice = this.drawColorSlice(16711680);
    this.colorBar = this.drawColorBar();
    this.colorBar.on("mousedown", (b) => this.onColorBarDown(b));
    this.colorBar.on("mousemove", (b) => this.onColorBarMove(b));
    this.colorBar.on("touchstart", (b) => this.onColorBarDown(b));
    this.colorBar.on("pointermove", (b) => this.onColorBarMove(b));
    this.colorBar.x = this.size + 4;
    this.addChild(this.colorSlice);
    this.addChild(this.colorBar);
    this.colorBar.addChild(this.barPointer);
    this.canvas = null;
    this.interactive = !0;
    this.on("mouseout", () => this.onMouseUp());
    this.on("mouseup", () => this.onMouseUp());
  }
  drawColorSlice(a) {
    this.sliceColors = [];
    if (this.initContext(this.size, this.size)) {
      var b = this.context.createImageData(this.size, this.size),
        c = b.data,
        d = (a & 16711680) >> 16,
        e = (a & 65280) >> 8;
      a &= 255;
      for (var f, g, h, k, m, n = this.size, l = 0; l < this.size; l++)
        for (var p = 0; p < this.size; p++)
          (m = 4 * (l * n + p)),
            (h = 255 - (255 / n) * p),
            (k = n - l),
            (f = h + (d / n) * p),
            (g = h + (e / n) * p),
            (h += (a / n) * p),
            (c[m] = Math.floor((h / n) * k)),
            (c[m + 1] = Math.floor((g / n) * k)),
            (c[m + 2] = Math.floor((f / n) * k)),
            (c[m + 3] = 255),
            this.sliceColors.push((c[m] << 16) | (c[m + 1] << 8) | c[m + 2]);
      this.context.putImageData(b, 0, 0);
      this.texSlice && this.texSlice.destroy();
      this.texSlice = PIXI.Texture.from(this.canvas);
      b = new PIXI.Sprite(this.texSlice);
      b.interactive = !0;
      b.buttonMode = !0;
      b.addChild(this.colorPointer);
      b.on("mousedown", (r) => this.onColorSliceDown(r));
      b.on("mousemove", (r) => this.onColorSliceMove(r));
      b.on("touchstart", (r) => this.onColorSliceDown(r));
      b.on("pointermove", (r) => this.onColorSliceMove(r));
      return b;
    }
  }
  drawColorBar() {
    this.barColors = [];
    if (this.initContext(this.barWidth, this.size)) {
      for (
        var a = this.context.createImageData(this.barWidth, this.size),
          b = a.data,
          c = Math.ceil(this.size / 6),
          d = ColorPicker.COLORS,
          e,
          f,
          g,
          h,
          k,
          m,
          n,
          l = 0;
        l < this.barWidth;
        l++
      )
        for (var p = 0; p < this.size; p++)
          (n = 4 * (p * this.barWidth + l)),
            (m = Math.floor(p / c)),
            (e = (d[m] & 16711680) >> 16),
            (f = (d[m] & 65280) >> 8),
            (g = d[m] & 255),
            (h = (d[(m + 1) % 7] & 16711680) >> 16),
            (k = (d[(m + 1) % 7] & 65280) >> 8),
            (m = d[(m + 1) % 7] & 255),
            (b[n] = g + ((m - g) / c) * (p % c)),
            (b[n + 1] = f + ((k - f) / c) * (p % c)),
            (b[n + 2] = e + ((h - e) / c) * (p % c)),
            (b[n + 3] = 255),
            l || this.barColors.push(0 | (b[n + 2] << 16) | (b[n + 1] << 8) | b[n]);
      this.context.putImageData(a, 0, 0);
      this.texBar && this.texBar.destroy();
      this.texBar = PIXI.Texture.from(this.canvas);
      a = new PIXI.Sprite(this.texBar);
      a.interactive = !0;
      a.buttonMode = !0;
      return a;
    }
  }
  initContext(a, b) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = a;
    this.canvas.height = b;
    this.context = this.canvas.getContext("2d");
    return null !== this.context;
  }
  onColorBarDown(a) {
    const b = this.toGlobal(new PIXI.Point(this.x, this.y));
    a = Clamp(
      0,
      this.size - 1,
      Math.floor(a.data.global.y / App.Scale - (b.y / App.Scale - this.y))
    );
    this.barPointer.y = a;
    this.updateColorSlice(a);
  }
  onColorBarMove(a) {
    if (this.dragBar) {
      const b = this.toGlobal(new PIXI.Point(this.x, this.y));
      a = Clamp(
        0,
        this.size - 1,
        Math.floor(a.data.global.y / App.Scale - (b.y / App.Scale - this.y))
      );
      this.barPointer.y = a;
      this.updateColorSlice(a);
    }
  }
  updateColorSlice(a, b) {
    this.dragBar = !0;
    this.colorSlice &&
      (this.colorSlice.removeChild(this.colorPointer), this.removeChild(this.colorSlice));
    this.colorSlice = this.drawColorSlice(a < this.barColors.length ? this.barColors[a] : 16711680);
    this.addChild(this.colorSlice);
    a = this.colorPointer.y * this.size + this.colorPointer.x;
    void 0 === b && this.emit(ColorPicker.COLOR_SELECTED, this.sliceColors[a]);
  }
  onColorSliceDown(a) {
    const b = this.toGlobal(new PIXI.Point(this.x, this.y));
    var c = a.data.global.x / App.Scale - (b.x / App.Scale - this.x);
    a = a.data.global.y / App.Scale - (b.y / App.Scale - this.y);
    this.dragSlice = !0;
    c = Clamp(0, this.size - 1, Math.floor(c));
    a = Clamp(0, this.size - 1, Math.floor(a));
    this.colorPointer.x = c;
    this.colorPointer.y = a;
    this.emit(ColorPicker.COLOR_SELECTED, this.sliceColors[a * this.size + c]);
  }
  onColorSliceMove(a) {
    const b = this.toGlobal(new PIXI.Point(this.x, this.y));
    var c = a.data.global.x / App.Scale - (b.x / App.Scale - this.x);
    a = a.data.global.y / App.Scale - (b.y / App.Scale - this.y);
    this.dragSlice &&
      ((c = Clamp(0, this.size - 1, Math.floor(c))),
      (a = Clamp(0, this.size - 1, Math.floor(a))),
      (this.colorPointer.x = c),
      (this.colorPointer.y = a),
      this.emit(ColorPicker.COLOR_SELECTED, this.sliceColors[a * this.size + c]));
  }
  setSelectedColor(a, b, c) {
    var d = this.size / 255,
      e = Math.max(a, b, c),
      f = Math.min(a, b, c);
    c = e === a ? (f === b ? c : b) : f === a ? (c === e ? b : c) : a;
    f = (255 / (0 === e ? 0.001 : e)) * (e - f) * d;
    d *= 255 - e;
    this.colorPointer.x = 511 < Math.floor(f) ? 511 : Math.floor(f);
    this.colorPointer.y = 511 < Math.floor(d) ? 511 : Math.floor(d);
    d = c / e;
    a = Math.ceil(
      (1 / 6) *
        (a === e
          ? b === c
            ? 2 + d
            : 1 - (d - 1)
          : b === e
          ? a === c
            ? 1 - (d - 3)
            : 4 + d
          : b === c
          ? 1 - (d - 5)
          : d) *
        this.size
    );
    this.barPointer.y = a;
    this.updateColorSlice(a, !1);
  }
  onMouseUp(a) {
    this.dragSlice = this.dragBar = !1;
  }
}
ColorPicker.COLOR_SELECTED = "cpColorSelected";
ColorPicker.COLORS = [16711680, 16711935, 255, 65535, 65280, 16776960, 16711680];
var purchasepanel = {};
export class PurchasePanel extends PIXI.Container {
  constructor() {
    super();
    this.container = new PIXI.Container();
    this.w = 330;
    this.h = 220;
    this.activeItem = null;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.beginFill(0, 0.5);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 0.95);
    this.background.drawRoundedRect(0.5 * (660 - this.w), 0.5 * (524 - this.h), this.w, this.h, 10);
    this.background.endFill();
    this.background.beginFill(4473924, 0.95);
    this.background.drawRoundedRect(
      0.5 * (660 - this.w) + 20,
      0.5 * (524 - this.h) + 36,
      290,
      68,
      6
    );
    this.background.endFill();
    this.background.interactive = !0;
    this.background.hitArea = new PIXI.Rectangle(0, 0, 660, 524);
    this.addChild(this.background);
    this.container.x = 0.5 * (this.background.width - this.w);
    this.container.y = 0.5 * (this.background.height - this.h);
    this.title = new PIXI.Text("Purchase item", FontStyle.InputFieldTitle1);
    this.title.x = 20;
    this.title.y = 50;
    this.title.resolution = 2;
    this.container.addChild(this.title);
    this.itemIcon = new PIXI.Sprite();
    this.itemIcon.x = 40;
    this.itemIcon.y = 80;
    this.itemIcon.anchor.x = this.itemIcon.anchor.y = 0.5;
    this.container.addChild(this.itemIcon);
    this.itemName = new PIXI.Text("", FontStyle.SmallMenuTextWhite2);
    this.itemName.x = 100;
    this.itemName.y = 82;
    this.itemName.resolution = 2;
    this.container.addChild(this.itemName);
    this.goldIcon = new PIXI.Sprite(App.CombinedTextures.gold1);
    this.goldIcon.x = 96;
    this.goldIcon.y = 106;
    this.goldIcon.scale.x = this.goldIcon.scale.y = 0.5;
    this.container.addChild(this.goldIcon);
    this.itemPrice = new PIXI.Text("0", FontStyle.SmallMenuTextOrange3);
    this.itemPrice.x = 130;
    this.itemPrice.y = 112;
    this.itemPrice.anchor.x = 0;
    this.itemPrice.resolution = 2;
    this.container.addChild(this.itemPrice);
    this.currentTitle = new PIXI.Text("Current gold:", FontStyle.SmallMenuTextWhite2);
    this.currentTitle.x = 20;
    this.currentTitle.y = 154;
    this.currentTitle.resolution = 2;
    this.container.addChild(this.currentTitle);
    this.currentGold = new PIXI.Text("0", FontStyle.SmallMenuTextOrange3);
    this.currentGold.x = this.currentTitle.x + this.currentTitle.width + 8;
    this.currentGold.y = this.currentTitle.y;
    this.currentGold.anchor.x = 0;
    this.currentGold.resolution = 2;
    this.container.addChild(this.currentGold);
    this.remainingTitle = new PIXI.Text("After purchase:", FontStyle.SmallMenuTextWhite2);
    this.remainingTitle.x = 20;
    this.remainingTitle.y = 180;
    this.remainingTitle.resolution = 2;
    this.container.addChild(this.remainingTitle);
    this.remainingGold = new PIXI.Text("0", FontStyle.SmallMenuTextOrange3);
    this.remainingGold.x = this.remainingTitle.x + this.remainingTitle.width + 8;
    this.remainingGold.y = this.remainingTitle.y;
    this.remainingGold.anchor.x = 0;
    this.remainingGold.resolution = 2;
    this.container.addChild(this.remainingGold);
    this.purchaseButton = new Button("purchase");
    this.purchaseButton.selected = !0;
    this.purchaseButton.setText("Purchase");
    this.purchaseButton.scale.x = this.purchaseButton.scale.y = 0.8;
    this.purchaseButton.addListener(
      Button.BUTTON_RELEASED,
      this.onPurchaseButtonReleased.bind(this)
    );
    this.purchaseButton.x = 24;
    this.purchaseButton.y = this.h - 8;
    this.purchaseButton.setTint(16763904);
    this.container.addChild(this.purchaseButton);
    this.cancelButton = new Button("cancel");
    this.cancelButton.selected = !0;
    this.cancelButton.setText("Cancel");
    this.cancelButton.scale.x = this.cancelButton.scale.y = 0.8;
    this.cancelButton.addListener(Button.BUTTON_RELEASED, this.onCancelButtonReleased.bind(this));
    this.cancelButton.x = this.w - (this.cancelButton.width + 8);
    this.cancelButton.y = this.h - 8;
    this.container.addChild(this.cancelButton);
    this.addChild(this.container);
    this.successContainer = new PIXI.Graphics();
    this.successContainer.lineStyle(1, 16777215, 0.1, 0);
    this.successContainer.beginFill(3355443, 1);
    this.successContainer.drawRoundedRect(0, 0, this.w, this.h, 10);
    this.successContainer.beginFill(0, 0.3);
    this.successContainer.drawRoundedRect(10, 10, this.w - 20, this.h - 20, 10);
    this.successContainer.endFill();
    this.successContainer.interactive = !0;
    this.successContainer.x = 0.5 * (this.background.width - this.successContainer.width);
    this.successContainer.y = 0.5 * (this.background.height - this.successContainer.height) + 40;
    this.successTitle = new PIXI.Text("Processing transaction..", {
      fontName: "Arial",
      fontSize: 18,
      fill: 16763904,
      strokeThickness: 3,
      lineJoin: "round",
      wordWrap: !0,
      wordWrapWidth: 330,
      align: "center",
      fontWeight: "bold",
    });
    this.successTitle.x = 0.5 * this.successContainer.width;
    this.successTitle.y = 0.5 * this.successContainer.height - 70;
    this.successTitle.anchor.x = 0.5;
    this.successTitle.anchor.y = 0.5;
    this.successTitle.resolution = 2;
    this.successContainer.addChild(this.successTitle);
    this.successTitleDesc = new PIXI.Text("...", {
      fontName: "Arial",
      fontSize: 16,
      fill: 16777215,
      strokeThickness: 3,
      lineJoin: "round",
      wordWrap: !0,
      wordWrapWidth: 330,
      align: "center",
    });
    this.successTitleDesc.x = 0.5 * this.successContainer.width;
    this.successTitleDesc.y = this.successTitle.y + 108;
    this.successTitleDesc.anchor.x = 0.5;
    this.successTitleDesc.anchor.y = 0.5;
    this.successTitleDesc.resolution = 2;
    this.successContainer.addChild(this.successTitleDesc);
    this.successContainerItemIcon = new PIXI.Sprite();
    this.successContainerItemIcon.x = 0.5 * this.successContainer.width;
    this.successContainerItemIcon.y = this.successTitle.y + 40;
    this.successContainerItemIcon.anchor.x = this.successContainerItemIcon.anchor.y = 0.5;
    this.successContainer.addChild(this.successContainerItemIcon);
  }
  async display(a) {
    this.activeItem = a;
    this.purchaseButton.disable();
    var b = await APIClient.getCurrency(App.Credential.id);
    b || this.emit(PurchasePanel.CANCEL);
    var c =
      0 < a.prefix.length
        ? a.prefix + (0 < a.data.texture.length ? "_" + a.data.texture : "")
        : a.data.texture;
    this.itemIcon.texture = App.CombinedTextures[c];
    this.successContainerItemIcon.texture = App.CombinedTextures[c];
    b = parseInt(b.currency.gold);
    c = b - parseInt(a.data.price, 10);
    0 <= c
      ? (this.purchaseButton.enable(), (this.remainingGold.tint = 16763904))
      : (this.remainingGold.tint = 16711680);
    this.itemName.text = a.data.title;
    this.itemPrice.text = numberWithPeriods(a.data.price);
    this.currentGold.text = numberWithPeriods(b.toString());
    this.remainingGold.text = numberWithPeriods(c.toString());
    a = 64 / this.itemIcon.width;
    this.itemIcon.x = 56;
    this.itemIcon.y = 110;
    this.itemIcon.scale.x = this.itemIcon.scale.y = 1 < a ? 1 : a;
  }
  onCancelButtonReleased() {
    this.emit(PurchasePanel.CANCEL);
  }
  async onPurchaseButtonReleased() {
    this.successTitle.tint = 16777215;
    this.purchaseButton.disable();
    this.addChild(this.successContainer);
    this.successTitle.text = "Processing transaction..";
    this.successTitleDesc.text = "...";
    (await APIClient.postPurchase("customization", this.activeItem.data.id, App.Credential.id))
      .success
      ? ((this.successTitle.tint = 16763904),
        (this.successTitle.text = "Transaction completed."),
        (this.successTitleDesc.text = "The product has been added to your inventory."))
      : ((this.successTitle.tint = 16711680), (this.successTitle.text = "Transaction failed."));
    setTimeout(() => {
      this.successContainer.parent && this.removeChild(this.successContainer);
      this.emit(PurchasePanel.UPDATE);
    }, 4e3);
  }
}
PurchasePanel.CANCEL = "cancel";
PurchasePanel.UPDATE = "update";
var weaponcontainer = {};
export class WeaponContainer extends PIXI.Graphics {
  constructor() {
    super();
    this.title = new PIXI.Text("Coming soon..", FontStyle.MediumOrangeText);
    this.title.x = 30;
    this.title.y = 100;
    this.title.resolution = 2;
    this.addChild(this.title);
  }
}
var customizationmenu = {};
export class CustomizationMenu extends Feature {
  constructor() {
    super();
    this.initial = !0;
    this.customizationPickers = [];
    this.display = CustomizationMenu.PLAYER;
    this.rewardToken = this.selectedItem = null;
    this.goldAnimation = !1;
    this.ox = 16;
    this.oy = 10;
    this.gold = 0;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(8, 8, 644, 508, 10);
    this.background.endFill();
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(1118481, 0.3);
    this.background.drawRect(14, 45, 632, 422, 10);
    this.background.endFill();
    this.container.addChild(this.background);
    this.playerContainer = new PIXI.Container();
    this.container.addChild(this.playerContainer);
    this.weaponContainer = new WeaponContainer();
    this.weaponContainer.visible = !1;
    this.container.addChild(this.weaponContainer);
    this.container.x = -330;
    this.savedText = new PIXI.Text("Customization saved.", {
      fontName: "Arial",
      fontSize: 18,
      lineHeight: 16,
      fill: 52224,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.savedText.x = this.width - 340;
    this.savedText.y = this.height - 4;
    this.savedText.resolution = 2;
    this.playerContainer.addChild(this.savedText);
    this.savedText.visible = !1;
    this.customizationTitle = new PIXI.Text("Shop", FontStyle.MediumOrangeText);
    this.customizationTitle.x = this.ox + 2;
    this.customizationTitle.y = this.oy + 48;
    this.customizationTitle.resolution = 2;
    this.container.addChild(this.customizationTitle);
    this.errorMessage = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 18,
      lineHeight: 16,
      fill: 16711680,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.errorMessage.x = this.width - 340;
    this.errorMessage.y = this.height - 4;
    this.errorMessage.resolution = 2;
    this.playerContainer.addChild(this.errorMessage);
    this.container.x = 0.5 * -this.width;
    this.goldIcon = new PIXI.Sprite(App.CombinedTextures.gold1);
    this.goldIcon.x = 21;
    this.goldIcon.y = this.height - 10;
    this.goldIcon.scale.x = this.goldIcon.scale.y = 0.5;
    this.playerContainer.addChild(this.goldIcon);
    this.goldText = new PIXI.Text("loading...", FontStyle.MediumOrangeText);
    this.goldText.x = 57;
    this.goldText.y = this.goldIcon.y + 6;
    this.goldText.resolution = 2;
    this.playerContainer.addChild(this.goldText);
    this.goldRewardText = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 19,
      lineHeight: 18,
      fill: 16763904,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.goldRewardText.x = this.goldText.x;
    this.goldRewardText.y = this.goldText.y;
    this.goldRewardText.resolution = 2;
    this.playerContainer.addChild(this.goldRewardText);
    this.goldRewardText.visible = !1;
    this.playerCustomizationButton = new PIXI.Graphics();
    this.playerCustomizationButton.beginFill(16777215, 0.2);
    this.playerCustomizationButton.lineStyle(1, 16777215, 0.1, 0);
    this.playerCustomizationButton.drawRect(0, 0, 100, 28, 4);
    this.playerCustomizationButton.endFill();
    this.playerCustomizationButton.x = this.ox + 112;
    this.playerCustomizationButton.y = this.oy + 48;
    this.playerCustomizationButton.tint = 13421772;
    this.playerCustomizationButton.alpha = 1;
    this.playerCustomizationButton.interactive = !0;
    this.playerCustomizationButton.on("mouseover", () => {
      this.playerCustomizationLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.playerCustomizationButton.on("mouseout", () => {
      this.playerCustomizationLabel.alpha = this.display === CustomizationMenu.PLAYER ? 1 : 0.5;
    });
    this.playerCustomizationButton.on("mousedown", () => {
      this.display = CustomizationMenu.PLAYER;
      this.playerContainer.visible = !0;
      this.weaponContainer.visible = !1;
      this.playerCustomizationLabel.alpha = 1;
      this.weaponCustomizationLabel.alpha = 0.5;
      this.playerCustomizationButton.alpha = 1;
      this.weaponCustomizationButton.alpha = 0.5;
      AudioEffects.ButtonClick.audio.play();
    });
    this.container.addChild(this.playerCustomizationButton);
    this.playerCustomizationLabel = new PIXI.Text("Ninja", FontStyle.SmallMenuTextOrange5);
    this.playerCustomizationLabel.alpha = 1;
    this.playerCustomizationLabel.x =
      this.playerCustomizationButton.x +
      0.5 * (this.playerCustomizationButton.width - this.playerCustomizationLabel.width);
    this.playerCustomizationLabel.y = this.playerCustomizationButton.y + 3;
    this.playerCustomizationLabel.hitArea = new PIXI.Rectangle();
    this.playerCustomizationLabel.resolution = 2;
    this.container.addChild(this.playerCustomizationLabel);
    this.weaponCustomizationButton = new PIXI.Graphics();
    this.weaponCustomizationButton.beginFill(16777215, 0.2);
    this.weaponCustomizationButton.lineStyle(1, 16777215, 0.1, 0);
    this.weaponCustomizationButton.drawRect(0, 0, 100, 28, 4);
    this.weaponCustomizationButton.endFill();
    this.weaponCustomizationButton.x =
      this.playerCustomizationButton.x + this.playerCustomizationButton.width + 8;
    this.weaponCustomizationButton.y = this.oy + 48;
    this.weaponCustomizationButton.tint = 13421772;
    this.weaponCustomizationButton.alpha = 0.5;
    this.weaponCustomizationButton.interactive = !0;
    this.weaponCustomizationButton.on("mouseover", () => {
      this.weaponCustomizationLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.weaponCustomizationButton.on("mouseout", () => {
      this.weaponCustomizationLabel.alpha = this.display === CustomizationMenu.WEAPONS ? 1 : 0.5;
    });
    this.weaponCustomizationButton.on("mousedown", () => {
      this.display = CustomizationMenu.WEAPONS;
      this.playerContainer.visible = !1;
      this.weaponContainer.visible = !0;
      this.playerCustomizationLabel.alpha = 0.5;
      this.weaponCustomizationLabel.alpha = 1;
      this.playerCustomizationButton.alpha = 0.5;
      this.weaponCustomizationButton.alpha = 1;
      AudioEffects.ButtonClick.audio.play();
    });
    this.container.addChild(this.weaponCustomizationButton);
    this.weaponCustomizationLabel = new PIXI.Text("Weapons", FontStyle.SmallMenuTextOrange5);
    this.weaponCustomizationLabel.alpha = 0.5;
    this.weaponCustomizationLabel.x =
      this.weaponCustomizationButton.x +
      0.5 * (this.weaponCustomizationButton.width - this.weaponCustomizationLabel.width);
    this.weaponCustomizationLabel.y = this.weaponCustomizationButton.y + 3;
    this.weaponCustomizationLabel.hitArea = new PIXI.Rectangle();
    this.weaponCustomizationLabel.resolution = 2;
    this.container.addChild(this.weaponCustomizationLabel);
    this.submitButton = new Button("save");
    this.submitButton.selected = !0;
    this.submitButton.setText("Save");
    this.submitButton.scale.x = this.submitButton.scale.y = 0.8;
    this.submitButton.addListener(Button.BUTTON_RELEASED, this.onSubmitButtonReleased.bind(this));
    this.submitButton.x = this.width - (this.submitButton.width + 12);
    this.submitButton.y = this.height - 8;
    this.playerContainer.addChild(this.submitButton);
    this.submitButton.disable();
    this.purchaseButton = new Button("purchase");
    this.purchaseButton.selected = !0;
    this.purchaseButton.setText("Buy");
    this.purchaseButton.scale.x = this.purchaseButton.scale.y = 0.8;
    this.purchaseButton.addListener(
      Button.BUTTON_RELEASED,
      this.onPurchaseButtonReleased.bind(this)
    );
    this.purchaseButton.x = this.width - (this.purchaseButton.width + 84);
    this.purchaseButton.y = this.height - 8;
    this.purchaseButton.setTint(16763904);
    this.playerContainer.addChild(this.purchaseButton);
    this.purchaseButton.disable();
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 36;
    this.closeButton.y = this.oy + 40;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.onCancelButtonReleased());
    this.closeButton.mobileSetup();
    this.container.addChild(this.closeButton);
    this.rewardButton = new PIXI.Sprite(App.CombinedTextures.reward_button);
    this.rewardButton.scale.x = this.rewardButton.scale.y = 0.58;
    this.rewardButton.x = this.ox + 133;
    this.rewardButton.y = this.height - 16;
    this.rewardButton.interactive = !0;
    this.playerContainer.addChild(this.rewardButton);
    this.rewardButton.on("mousedown", () => {
      this.onRewardButtonReleased();
    });
    this.rewardButton.on("mouseover", () => {
      this.rewardButton.texture = App.CombinedTextures.reward_button_down;
    });
    this.rewardButton.on("mouseout", () => {
      this.rewardButton.texture = App.CombinedTextures.reward_button;
    });
    this.errorRewardMessage = new PIXI.Text("Disable AdBlock", {
      fontName: "Arial",
      fontSize: 18,
      lineHeight: 16,
      fill: 16711680,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.errorRewardMessage.x = this.rewardButton.x;
    this.errorRewardMessage.y = this.rewardButton.y + 14;
    this.errorRewardMessage.visible = !1;
    this.errorRewardMessage.resolution = 2;
    this.playerContainer.addChild(this.errorRewardMessage);
    this.countdownMessage = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 18,
      lineHeight: 16,
      fill: 16776960,
      strokeThickness: 4,
      lineJoin: "round",
    });
    this.countdownMessage.x = this.errorRewardMessage.x + 10;
    this.countdownMessage.y = this.errorRewardMessage.y;
    this.countdownMessage.visible = !1;
    this.countdownMessage.resolution = 2;
    this.playerContainer.addChild(this.countdownMessage);
    this.visualizer = new Visualizer(176, 176, !0, !0, !1);
    this.visualizer.x = 0.5 * this.width - 0.5 * this.visualizer.width + 140;
    this.visualizer.y = 0.5 * this.height - 0.5 * this.visualizer.height - 11;
    this.visualizer.interactive = !0;
    this.playerContainer.addChild(this.visualizer);
    this.purchasePanel = new PurchasePanel();
    this.purchasePanel.x = 0.5 * this.width - 0.5 * this.purchasePanel.width;
    this.purchasePanel.y = 0.5 * this.height - 0.5 * this.purchasePanel.height;
    this.purchasePanel.on(PurchasePanel.CANCEL, () => {
      this.playerContainer.removeChild(this.purchasePanel);
      this.purchaseButton.enable();
    });
    this.purchasePanel.on(PurchasePanel.UPDATE, () => {
      this.playerContainer.removeChild(this.purchasePanel);
      this.initial = !0;
      this.customization = null;
      this.show();
      this.onCustomizationSelected(this.selectedItem.data);
    });
    this.itemOverview = new ItemOverview();
    this.itemOverview.x = this.ox + 10;
    this.itemOverview.y = this.oy + 78;
    this.playerContainer.addChild(this.itemOverview);
    this.itemOverview.on(ItemOverview.SELECT, (a) => this.onCustomizationSelected(a));
    this.hairPicker = new ItemPicker("Hair style", "hair", "head_alpha", () =>
      this.itemOverview.loadItems(
        App.Customization.HAIR,
        "Hair style",
        this.activeCustomization.hair ? this.activeCustomization.hair.id : 0,
        "head_alpha"
      )
    );
    this.hairPicker.x = this.visualizer.x + 52;
    this.hairPicker.y = this.visualizer.y - 72;
    this.hairPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.hairPicker);
    this.playerContainer.addChild(this.hairPicker);
    this.beltPicker = new ItemPicker("Belt", "belt", "torsolower", () =>
      this.itemOverview.loadItems(
        App.Customization.BELT,
        "Belt",
        this.activeCustomization.belt ? this.activeCustomization.belt.id : 0,
        "torsolower"
      )
    );
    this.beltPicker.x = this.visualizer.x - 72;
    this.beltPicker.y = this.visualizer.y + 182;
    this.beltPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.beltPicker);
    this.playerContainer.addChild(this.beltPicker);
    this.legLeftUpperPicker = new ItemPicker("Right leg", "legleftupper", "legleftupper", () =>
      this.itemOverview.loadItems(
        App.Customization.LEGLEFTUPPER,
        "Right leg",
        this.activeCustomization.legleftupper ? this.activeCustomization.legleftupper.id : 0,
        "legleftupper"
      )
    );
    this.legLeftUpperPicker.x = this.visualizer.x + 12;
    this.legLeftUpperPicker.y = this.visualizer.y + 182;
    this.legLeftUpperPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.legLeftUpperPicker);
    this.playerContainer.addChild(this.legLeftUpperPicker);
    this.legRightUpperPicker = new ItemPicker("Left leg", "legrightupper", "legrightupper", () =>
      this.itemOverview.loadItems(
        App.Customization.LEGRIGHTUPPER,
        "Left leg",
        this.activeCustomization.legrightupper ? this.activeCustomization.legrightupper.id : 0,
        "legrightupper"
      )
    );
    this.legRightUpperPicker.x = this.visualizer.x + 98;
    this.legRightUpperPicker.y = this.visualizer.y + 182;
    this.legRightUpperPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.legRightUpperPicker);
    this.playerContainer.addChild(this.legRightUpperPicker);
    this.legRightLowerPicker = new ItemPicker("Right foot", "legrightlower", "legrightlower", () =>
      this.itemOverview.loadItems(
        App.Customization.LEGRIGHTLOWER,
        "Right foot",
        this.activeCustomization.legrightlower ? this.activeCustomization.legrightlower.id : 0,
        "legleftlower"
      )
    );
    this.legRightLowerPicker.x = this.visualizer.x + 12;
    this.legRightLowerPicker.y = this.visualizer.y + 263;
    this.legRightLowerPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.legRightLowerPicker);
    this.playerContainer.addChild(this.legRightLowerPicker);
    this.legLeftLowerPicker = new ItemPicker("Left foot", "legleftlower", "legleftlower", () =>
      this.itemOverview.loadItems(
        App.Customization.LEGLEFTLOWER,
        "Left foot",
        this.activeCustomization.legleftlower ? this.activeCustomization.legleftlower.id : 0,
        "legrightlower"
      )
    );
    this.legLeftLowerPicker.x = this.visualizer.x + 98;
    this.legLeftLowerPicker.y = this.visualizer.y + 263;
    this.legLeftLowerPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.legLeftLowerPicker);
    this.playerContainer.addChild(this.legLeftLowerPicker);
    this.torsoPicker = new ItemPicker("Torso", "torso", "torsoupper", () =>
      this.itemOverview.loadItems(
        App.Customization.TORSO,
        "Torso",
        this.activeCustomization.torso ? this.activeCustomization.torso.id : 0,
        "torsoupper"
      )
    );
    this.torsoPicker.x = this.visualizer.x + 132;
    this.torsoPicker.y = this.visualizer.y - 72;
    this.torsoPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.torsoPicker);
    this.playerContainer.addChild(this.torsoPicker);
    this.orbPicker = new ItemPicker("Flight aura", "orb", "energy_shell", () =>
      this.itemOverview.loadItems(
        App.Customization.ORB,
        "Flight aura",
        this.activeCustomization.orb ? this.activeCustomization.orb.id : 0,
        "energy_shell"
      )
    );
    this.orbPicker.x = this.visualizer.x + 182;
    this.orbPicker.y = this.visualizer.y + 182;
    this.orbPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a, !0));
    this.customizationPickers.push(this.orbPicker);
    this.playerContainer.addChild(this.orbPicker);
    this.facePicker = new ItemPicker("Face", "face", "face", () =>
      this.itemOverview.loadItems(
        App.Customization.FACE,
        "Face",
        this.activeCustomization.face ? this.activeCustomization.face.id : 0,
        "face"
      )
    );
    this.facePicker.x = this.visualizer.x - 28;
    this.facePicker.y = this.visualizer.y - 72;
    this.facePicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.facePicker);
    this.playerContainer.addChild(this.facePicker);
    this.armRightUpperPicker = new ItemPicker(
      "Left shoulder",
      "armrightupper",
      "armrightupper",
      () =>
        this.itemOverview.loadItems(
          App.Customization.ARMRIGHTUPPER,
          "Left shoulder",
          this.activeCustomization.armrightupper ? this.activeCustomization.armrightupper.id : 0,
          "armrightupper"
        )
    );
    this.armRightUpperPicker.x = this.visualizer.x + 182;
    this.armRightUpperPicker.y = this.visualizer.y + 15;
    this.armRightUpperPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.armRightUpperPicker);
    this.playerContainer.addChild(this.armRightUpperPicker);
    this.armLeftUpperPicker = new ItemPicker("Right shoulder", "armleftupper", "armleftupper", () =>
      this.itemOverview.loadItems(
        App.Customization.ARMLEFTUPPER,
        "Right shoulder",
        this.activeCustomization.armleftupper ? this.activeCustomization.armleftupper.id : 0,
        "armleftupper"
      )
    );
    this.armLeftUpperPicker.x = this.visualizer.x - 72;
    this.armLeftUpperPicker.y = this.visualizer.y + 15;
    this.armLeftUpperPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.armLeftUpperPicker);
    this.playerContainer.addChild(this.armLeftUpperPicker);
    this.armLeftLowerPicker = new ItemPicker("Right hand", "armleftlower", "armleftlower", () =>
      this.itemOverview.loadItems(
        App.Customization.ARMLEFTLOWER,
        "Right hand",
        this.activeCustomization.armleftlower ? this.activeCustomization.armleftlower.id : 0,
        "armleftlower"
      )
    );
    this.armLeftLowerPicker.x = this.visualizer.x - 72;
    this.armLeftLowerPicker.y = this.visualizer.y + 96;
    this.armLeftLowerPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.armLeftLowerPicker);
    this.playerContainer.addChild(this.armLeftLowerPicker);
    this.armRightLowerPicker = new ItemPicker("Left hand", "armrightlower", "armrightlower", () =>
      this.itemOverview.loadItems(
        App.Customization.ARMRIGHTLOWER,
        "Left hand",
        this.activeCustomization.armrightlower ? this.activeCustomization.armrightlower.id : 0,
        "armrightlower"
      )
    );
    this.armRightLowerPicker.x = this.visualizer.x + 182;
    this.armRightLowerPicker.y = this.visualizer.y + 96;
    this.armRightLowerPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.armRightLowerPicker);
    this.playerContainer.addChild(this.armRightLowerPicker);
    this.extraPicker = new ItemPicker("Extra", "extra", "", () =>
      this.itemOverview.loadItems(
        App.Customization.EXTRA,
        "Extra",
        this.activeCustomization.extra ? this.activeCustomization.extra.id : 0,
        ""
      )
    );
    this.extraPicker.x = this.visualizer.x + 182;
    this.extraPicker.y = this.visualizer.y + 263;
    this.extraPicker.on(ItemPicker.SELECT, (a) => this.onSelectCustomization(a));
    this.customizationPickers.push(this.extraPicker);
    this.playerContainer.addChild(this.extraPicker);
    this.colorPicker = new ColorPicker(178);
    this.colorPicker.x = this.orbPicker.x - 532;
    this.colorPicker.y = this.orbPicker.y - 0;
    this.colorPicker.on(ColorPicker.COLOR_SELECTED, (a) => {
      this.orbPicker.setTint(a);
      if (!this.activeCustomization.orb || Array.isArray(this.activeCustomization.orb.data))
        this.activeCustomization.orb = { id: 32, texture: "energy_shell", data: {} };
      this.activeCustomization.orb.data.energy = "0x" + a.toString(16).padStart(6, "0");
      this.submitButton.enabled || this.submitButton.enable();
      this.visualizer.applyCustomization(this.activeCustomization);
    });
    this.customization = null;
    this.particleContainer = new ParticleContainer();
    this.container.addChild(this.particleContainer);
  }
  async show() {
    this.itemOverview.show();
    this.savedText.visible = !1;
    this.activeCustomization = JSON.parse(JSON.stringify(App.Credential.customization));
    if (this.initial) {
      if (!this.customization) {
        var a = await APIClient.getCustomization(App.Credential.id);
        if (!a) return;
        a = JSON.parse(a);
        a = a.customization;
        for (var b in App.Customization) App.Customization[b] = [];
        for (b = 0; b < a.length; b++) {
          const c = a[b],
            d = App.Customization[c.type.toUpperCase()];
          d && d.push(c);
        }
      }
      this.hairPicker.select();
      this.selectedItem = this.hairPicker;
      this.itemOverview.loadItems(
        App.Customization.HAIR,
        "Hair style",
        App.Credential.customization.hair ? App.Credential.customization.hair.id : null,
        "head_alpha"
      );
    }
    this.activeCustomization.hair
      ? this.hairPicker.displayItem(this.activeCustomization.hair)
      : (this.hairPicker.displayItem({ id: 2, texture: "", data: {} }),
        (this.activeCustomization.hair = { id: 2, texture: "", data: {} }));
    this.activeCustomization.orb
      ? this.orbPicker.displayItem(this.activeCustomization.orb)
      : (this.orbPicker.displayItem({ id: 32, texture: "", data: {} }),
        (this.activeCustomization.orb = { id: 32, texture: "", data: {} }));
    this.activeCustomization.torso
      ? this.torsoPicker.displayItem(this.activeCustomization.torso)
      : (this.torsoPicker.displayItem({ id: 33, texture: "", data: {} }),
        (this.activeCustomization.torso = { id: 33, texture: "", data: {} }));
    this.activeCustomization.belt
      ? this.beltPicker.displayItem(this.activeCustomization.belt)
      : (this.beltPicker.displayItem({ id: 68, texture: "", data: {} }),
        (this.activeCustomization.belt = { id: 68, texture: "", data: {} }));
    this.activeCustomization.face
      ? this.facePicker.displayItem(this.activeCustomization.face)
      : (this.facePicker.displayItem({ id: 45, texture: "", data: {} }),
        (this.activeCustomization.face = { id: 45, texture: "", data: {} }));
    this.activeCustomization.armleftlower
      ? this.armLeftLowerPicker.displayItem(this.activeCustomization.armleftlower)
      : (this.armLeftLowerPicker.displayItem({ id: 52, texture: "", data: {} }),
        (this.activeCustomization.armleftlower = { id: 52, texture: "", data: {} }));
    this.activeCustomization.armrightupper
      ? this.armRightUpperPicker.displayItem(this.activeCustomization.armrightupper)
      : (this.armRightUpperPicker.displayItem({ id: 62, texture: "", data: {} }),
        (this.activeCustomization.armrightupper = { id: 62, texture: "", data: {} }));
    this.activeCustomization.armleftupper
      ? this.armLeftUpperPicker.displayItem(this.activeCustomization.armleftupper)
      : (this.armLeftUpperPicker.displayItem({ id: 60, texture: "", data: {} }),
        (this.activeCustomization.armleftupper = { id: 60, texture: "", data: {} }));
    this.activeCustomization.armrightlower
      ? this.armRightLowerPicker.displayItem(this.activeCustomization.armrightlower)
      : (this.armRightLowerPicker.displayItem({ id: 54, texture: "", data: {} }),
        (this.activeCustomization.armrightlower = { id: 54, texture: "", data: {} }));
    this.activeCustomization.legleftlower
      ? this.legLeftLowerPicker.displayItem(this.activeCustomization.legleftlower)
      : (this.legLeftLowerPicker.displayItem({ id: 58, texture: "", data: {} }),
        (this.activeCustomization.legleftlower = { id: 58, texture: "", data: {} }));
    this.activeCustomization.legrightlower
      ? this.legRightLowerPicker.displayItem(this.activeCustomization.legrightlower)
      : (this.legRightLowerPicker.displayItem({ id: 56, texture: "", data: {} }),
        (this.activeCustomization.legrightlower = { id: 56, texture: "", data: {} }));
    this.activeCustomization.legleftupper
      ? this.legLeftUpperPicker.displayItem(this.activeCustomization.legleftupper)
      : (this.legLeftUpperPicker.displayItem({ id: 64, texture: "", data: {} }),
        (this.activeCustomization.legleftupper = { id: 64, texture: "", data: {} }));
    this.activeCustomization.legrightupper
      ? this.legRightUpperPicker.displayItem(this.activeCustomization.legrightupper)
      : (this.legRightUpperPicker.displayItem({ id: 66, texture: "", data: {} }),
        (this.activeCustomization.legrightupper = { id: 66, texture: "", data: {} }));
    this.activeCustomization.extra
      ? this.extraPicker.displayItem(this.activeCustomization.extra)
      : (this.extraPicker.displayItem({ id: 211, texture: "", data: {} }),
        (this.activeCustomization.extra = { id: 211, texture: "", data: {} }));
    this.initial = !1;
    this.visualizer.applyCustomization(this.activeCustomization);
    App.Credential.customization.orb &&
      this.orbPicker.setTint(parseInt(App.Credential.customization.orb.data.energy, 16));
    this.selectedItem && this.selectedItem.data
      ? (this.selectedItem.select(),
        this.itemOverview.select(this.activeCustomization[this.selectedItem.data.type]))
      : (this.selectedItem.select(),
        this.activeCustomization.hair &&
          this.itemOverview.select(this.activeCustomization.hair.id));
    a = await APIClient.getCurrency(App.Credential.id);
    b = a.currency.gold.toString();
    this.gold = parseInt(a.currency.gold);
    this.goldText.text = numberWithPeriods(b);
  }
  hide() {
    this.itemOverview.hide();
  }
  onSelectCustomization(a, b = !1) {
    var c = !1;
    this.colorPicker.parent && (this.removeChild(this.colorPicker), (c = !0));
    b && !c && (this.colorPicker.parent || this.addChild(this.colorPicker));
    for (b = 0; b < this.customizationPickers.length; b++)
      (c = this.customizationPickers[b]),
        a !== c.type ? c.deselect() : (c.select(), (this.selectedItem = c));
  }
  onCustomizationSelected(a) {
    a.own || "free" === a.status
      ? this.submitButton.enabled || (this.submitButton.enable(), this.purchaseButton.disable())
      : (this.submitButton.disable(), this.purchaseButton.enable());
    for (const b of this.customizationPickers) b.type === a.type && b.displayItem(a, !1);
    this.activeCustomization[a.type] || (this.activeCustomization[a.type] = { data: {} });
    this.activeCustomization[a.type].texture = a.texture;
    this.activeCustomization[a.type].id = a.id;
    this.activeCustomization[a.type].cdata =
      "string" === typeof a.data ? JSON.parse(a.data) : a.data;
    this.visualizer.applyCustomization(this.activeCustomization);
  }
  displayPurchasePopup(a) {
    this.purchasePanel.parent || this.playerContainer.addChild(this.purchasePanel);
    this.purchasePanel.display(a);
  }
  reset() {
    this.initial = !0;
  }
  validateForm() {
    return { valid: !0, error: "" };
  }
  async onSubmitButtonReleased() {
    this.savedText.visible = !1;
    this.validateForm();
    this.submitButton.disable();
    this.displayErrorMessage("");
    let a = await APIClient.postCustomization(this.activeCustomization, App.Credential.id);
    a.success
      ? (this.emit(Layer.Events.UPDATE_CREDENTIAL, a.credential), (this.savedText.visible = !0))
      : (this.submitButton.enable(), this.displayErrorMessage("Invalid customization."));
  }
  onPurchaseButtonReleased() {
    this.colorPicker.parent && this.removeChild(this.colorPicker);
    this.purchaseButton.disable();
    this.displayPurchasePopup(this.selectedItem);
  }
  displayLoadingMessage() {}
  displayCompletedMessage() {}
  onCompletedButtonReleased() {}
  onCancelButtonReleased() {
    this.emit(Layer.Events.CUSTOMIZATION_CANCEL);
  }
  onRewardButtonReleased() {
    this.triggerRewardedBreak();
  }
  disableRewardButton() {
    this.rewardButton.interactive = !1;
    this.rewardButton.alpha = 0.5;
  }
  enableRewardButton() {
    this.rewardButton.interactive = !0;
    this.rewardButton.alpha = 1;
  }
  displayLimitReached() {
    this.rewardButton.alpha = 0.2;
    this.rewardButton.interactive = !1;
    this.countdownMessage.visible = !0;
    this.countdownMessage.text = "Daily limit reached.";
  }
  displayRewardCountdown() {
    this.rewardButton.alpha = 0.2;
    this.rewardButton.interactive = !1;
    this.countdownMessage.visible = !0;
    let a = 59;
    this.countdownMessage.text = "Next in.. 60";
    null !== this.rewardInterval &&
      (clearInterval(this.rewardInterval), (this.rewardInterval = null));
    this.rewardInterval = setInterval(() => {
      this.countdownMessage.text = "Next in.. " + a.toString();
      0 >= a &&
        (clearInterval(this.rewardInterval),
        (this.rewardInterval = null),
        (this.countdownMessage.visible = !1),
        (this.countdownMessage.text = ""),
        this.enableRewardButton());
      a--;
    }, 1e3);
  }
  triggerRewardedBreak() {
    this.disableRewardButton();
    switch (App.WhiteLabel) {
      case App.WhiteLabel_CG:
        App.ShowRewardedShopAd = !0;
        App.CrazySDK.requestAd("rewarded");
        break;
      case App.WhiteLabel_POKI:
      case App.WhiteLabel_POKI_MAIN:
        App.PokiSDK.rewardedBreak().then((a) => {
          a ? this.claimRewards() : this.emit(Layer.Events.REWARDS_CLAIMED, !1, 0);
        });
    }
  }
  async claimRewards() {
    let a = await APIClient.postClaimShopReward(App.Credential.id);
    a.success ? this.displayRewardDialog(a.limit ? !0 : !1) : this.displayWarning(a.error);
  }
  displayRewardDialog(a = !1) {
    AudioEffects.GoldPickup[
      Math.floor(Math.random() * AudioEffects.GoldPickup.length)
    ].audio.play();
    this.goldRewardText.alpha = 1;
    this.goldRewardText.visible = !0;
    this.goldRewardText.x = this.goldText.x + 16;
    this.goldRewardText.y = this.goldText.y;
    this.goldAnimation = !0;
    this.goldRewardText.text = "+100";
    this.gold += 100;
    this.goldText.text = numberWithPeriods(this.gold);
    let b = this.goldIcon.x + 0.5 * this.goldIcon.width,
      c = this.goldIcon.y + 0.5 * this.goldIcon.height;
    for (let d = 0; 20 > d; d++) {
      let e = ParticleEffects.GoldGlitter;
      e.x = b;
      e.y = c;
      e.vx = -2 + 4 * Math.random();
      e.vy = -2 + 4 * Math.random();
      e.vr = -0.3 + 0.6 * Math.random();
      e.a = 0.7;
      let f = e.s;
      e.s = 1;
      this.particleContainer.spawn(e);
      e.s = f;
    }
    setTimeout(() => {
      this.goldAnimation = !1;
    }, 3e3);
    a ? this.displayLimitReached() : this.displayRewardCountdown();
  }
  update() {
    this.visualizer.update();
    this.goldAnimation &&
      ((this.goldRewardText.alpha -= 0.01),
      (this.goldRewardText.y -= 0.5),
      0.01 >= this.goldRewardText.alpha && (this.goldAnimation = !1),
      this.particleContainer.update());
  }
  displayWarning(a = "Disable AdBlock") {
    this.errorRewardMessage.visible = !0;
    this.rewardButton.visible = !1;
    this.errorRewardMessage.text = a;
    setTimeout(() => {
      this.errorRewardMessage.visible = !1;
      this.rewardButton.visible = !0;
      this.enableRewardButton();
    }, 3e3);
  }
  displayErrorMessage(a) {
    this.errorMessage.text = a;
  }
}
CustomizationMenu.PLAYER = "player";
CustomizationMenu.WEAPONS = "weapons";
var inputfield = {};
export class InputField extends PIXI.Container {
  constructor(a, b = !1, c = 26, d = !1) {
    super();
    EventDispatcher.call(this);
    this.id = a || "button";
    this.focus = !1;
    this.marker = new PIXI.Text(">", FontStyle.InputFieldText);
    this.marker.resolution = 2;
    this.text = d
      ? new PIXI.BitmapText("", { fontName: "Open Sans", align: "left", fontSize: c })
      : new PIXI.Text("", FontStyle.InputFieldText);
    this.text.tint = 16777215;
    this.text.anchor.y = 1;
    this.text.resolution = 2;
    this.passwordText = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      align: "left",
      fontSize: c,
    });
    this.passwordText.anchor.y = 1;
    this.previousText = "";
    this.background = new PIXI.Graphics();
    this.background.alpha = 0.3;
    this.markingColor = 16777215;
    this.background.interactive = !0;
    b || this.addChild(this.background);
    this.addChild(this.marker);
    this.addChild(this.text);
    this.addChild(this.passwordText);
    this.minimal = !1;
    this.marker.x = 2;
    this.marker.y = 6;
    this.marker.visible = !1;
    this.marker.tint = 11184810;
    this.text.x = 18 - 0.25 * (26 - c);
    this.text.y = (d ? 30 : 35) - 0.25 * (26 - c);
    this.passwordText.x = 18 - (26 - c);
    this.passwordText.y = (d ? 30 : 34) - 0.25 * (26 - c);
    this.passwordMode = !1;
    this.filterEnabled = !0;
    this.filtered = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    this.inversed = this.mouseOver = !1;
    this.noMouse = b || !1;
    this.interactive = !this.noMouse;
    this.maxChars = 32;
    this.boundGlobalPointerInputListener = this.boundGlobalInputListener = null;
    this.centerInput = this.forceUpperCase = this.forceLowerCase = !1;
    this.configuredWidth = 100;
    this.configuredHeight = 30;
    this.boundOnInput = this.onInput.bind(this);
    this.ignoreMouse ||
      (this.on("mousedown", this.onMouseDown.bind(this)),
      this.on("touchstart", this.onMouseDown.bind(this)),
      this.on("move", this.onMouseOver.bind(this)),
      this.on("mouseover", this.onMouseOver.bind(this)),
      this.on("mouseout", this.onMouseOut.bind(this)),
      this.on("pointerup", this.onMouseOut.bind(this)));
  }
  async onInput(a) {
    let b = this.preProcessInput(a);
    if (this.isFiltered(a)) {
      var c = a.data.char;
      if (a.data.code !== UserInput.ENTER) {
        var d = this.text.text;
        a.data.ctrl && "v" === c
          ? navigator.clipboard.readText().then((e) => {
              this.applyInput(e, "", d, a);
            })
          : this.applyInput(b, c, d, a);
      }
    }
  }
  applyInput(a, b, c, d) {
    0 === a.length && d.data.code === UserInput.BACKSPACE
      ? (this.text.text = "" + b)
      : (a.length >= this.maxChars && (a = a.slice(0, this.maxChars - 1)),
        " " === a && (a = a.slice(0, a.length - 1)),
        " " === b && 0 === a.length && (a = " "),
        (this.text.text =
          a + (this.forceLowerCase ? b.toLowerCase() : this.forceUpperCase ? b.toUpperCase() : b)));
    c !== this.text.text &&
      this.dispatchEvent(new CustomEvent(InputField.CHANGE, { value: this.text.text }));
    this.passwordMode && (this.passwordText.text = "*".repeat(this.text.text.length));
    this.text.scale.x = this.text.scale.y = 1 - 0.006 * this.text.text.length;
    this.passwordMode ||
      (this.text.width + 20 > this.configuredWidth
        ? this.setDimensions(this.text.width + 20, this.configuredHeight, !1)
        : this.setDimensions(this.configuredWidth, this.configuredHeight, !1));
  }
  preProcessInput(a) {
    let b = this.text.text;
    switch (a.data.code) {
      case UserInput.BACKSPACE:
        0 < b.length && (b = b.slice(0, b.length - 1));
        break;
      case UserInput.ENTER:
        " " === b[0] && (b = b.slice(1)),
          (this.text.text = b),
          this.setFocus(!1),
          this.dispatchEvent(new CustomEvent(InputField.SUBMIT, { value: b }));
    }
    return b;
  }
  isFiltered(a) {
    return this.filterEnabled
      ? -1 !== this.filtered.indexOf(a.data.char)
        ? !this.inversed
        : !1
      : !0;
  }
  setFilter(a, b) {
    this.filtered = a;
    this.inversed = b || !1;
  }
  onMouseDown(a) {
    App.Stage.emit("mousedown", a);
    this.interactive &&
      ((this.mouseOver = !0),
      this.setFocus(!0),
      this.dispatchEvent(new CustomEvent(Button.BUTTON_PRESSED, { id: this.id })),
      AudioEffects.ButtonClick.audio.play());
  }
  onGlobalMouseDown(a) {
    this.focus && !this.mouseOver && this.setFocus(!1);
  }
  setFocus(a) {
    (a && UserInput.hasFocus && this.focus) ||
      ((this.focus = a)
        ? (UserInput.setFocus(this.onInput.bind(this)),
          (this.marker.visible = !0),
          UserInput.hasListener(UserInput.KEY_PRESS, this.boundOnInput) ||
            UserInput.addListener(UserInput.KEY_PRESS, this.boundOnInput),
          this.ignoreMouse ||
            null !== this.boundGlobalInputListener ||
            ((this.boundGlobalInputListener = this.onGlobalMouseDown.bind(this)),
            (this.boundGlobalPointerInputListener = this.onGlobalMouseDown.bind(this)),
            App.Stage.on("mousedown", this.boundGlobalInputListener),
            App.Stage.on("touchstart", this.boundGlobalPointerInputListener),
            (this.background.alpha = 0.6)))
        : (UserInput.releaseFocus(this.onInput.bind(this)),
          (this.marker.visible = !1),
          UserInput.hasListener(UserInput.KEY_PRESS, this.boundOnInput) &&
            UserInput.removeListener(UserInput.KEY_PRESS, this.boundOnInput),
          this.ignoreMouse ||
            null === this.boundGlobalInputListener ||
            (App.Stage.removeListener("mousedown", this.boundGlobalInputListener),
            App.Stage.removeListener("touchstart", this.boundGlobalPointerInputListener),
            (this.boundGlobalPointerInputListener = this.boundGlobalInputListener = null),
            (this.background.alpha = 0.3))),
      a && (this.previousText = this.getText()),
      this.emit(InputField.FOCUS, a));
  }
  setPassword(a) {
    (this.passwordMode = a)
      ? ((this.text.visible = !1), (this.passwordText.visible = !0))
      : ((this.text.visible = !0), (this.passwordText.visible = !1));
  }
  onMouseOver(a) {
    this.mouseOver = !0;
    this.background.alpha = this.focus ? 1 : 0.6;
    AudioEffects.ButtonHover.audio.play();
  }
  onMouseOut(a) {
    this.mouseOver = !1;
    this.background.alpha = this.focus ? 0.6 : 0.3;
  }
  setMaxChars(a) {
    this.maxChars = a;
  }
  setText(a) {
    this.previousText = a;
    this.text.text = a;
    this.passwordMode && (this.passwordText.text = "*".repeat(a.length));
    this.text.scale.x = this.text.scale.y = 1 - 0.006 * this.text.text.length;
    this.text.width + 20 > this.configuredWidth
      ? this.setDimensions(this.text.width + 20, this.configuredHeight, !1)
      : this.setDimensions(this.configuredWidth, this.configuredHeight, !1);
  }
  getText() {
    return this.text.text;
  }
  setDimensions(a, b, c = !0) {
    this.ignoreMouse ||
      (c && ((this.configuredWidth = a), (this.configuredHeight = b)),
      this.background.clear(),
      this.minimal || this.background.lineStyle(2, this.markingColor, 1, 0),
      this.background.beginFill(5592405, 1),
      this.background.drawRoundedRect(this.minimal ? 10 : 0, 0, this.minimal ? a - 10 : a, b, 4),
      this.background.endFill(),
      this.centerInput && (this.text.x = 0.5 * (this.width - this.text.width) + 6));
  }
  hideBorders() {
    this.minimal = !0;
    this.setDimensions(this.configuredWidth, this.configuredHeight, !1);
  }
  markNone() {
    this.markingColor = 16777215;
    this.background.tint = 16777215;
    this.setDimensions(this.configuredWidth, this.configuredHeight, !1);
  }
  markValid() {
    this.markingColor = 65280;
    this.background.tint = 65280;
    this.setDimensions(this.configuredWidth, this.configuredHeight, !1);
  }
  markInvalid() {
    this.markingColor = 16711680;
    this.background.tint = 16711680;
    this.setDimensions(this.configuredWidth, this.configuredHeight, !1);
  }
}
InputField.SUBMIT = "submitInput";
InputField.FOCUS = "focusInput";
InputField.CHANGE = "changeInput";
var socialmenu = {};
export class SocialMenu extends Feature {
  constructor() {
    super();
    this.autoCollapsed = this.down = this.dragging = this.collapsed = !1;
    this.friends = [];
    this.friendScrollRatio = 0;
    this.invites = [];
    this.inviteScrollRatio = 0;
    this.members = [];
    this.memberScrollRatio = 0;
    this.clanInvitations = [];
    this.clanInvitationScrollRatio = 0;
    this.autoRefreshFriendsCounter = 60;
    this.ignoreInput = !1;
    this.oy = this.ox = this.friendsLastLoadedDate = 0;
    this.container = new PIXI.Container();
    this.lineStyle(1, 16777215, 0.1, 0);
    this.beginFill(3355443, 0.9);
    this.drawRoundedRect(0, 0, 380, 256, 4);
    this.endFill();
    this.interactive = !0;
    this.listContainer = new PIXI.Container();
    this.scrollbar = new SocialMenuScrollbar(212);
    this.scrollbar.x = 354;
    this.scrollbar.y = 42;
    this.scrollbar.on(SocialMenuScrollbar.SCROLL, (a) => {
      switch (this.mode) {
        case SocialMenu.MODE_FRIENDS:
          this.maskFriendList(a);
          break;
        case SocialMenu.MODE_INVITATIONS:
          this.maskInvitationList(a);
          break;
        case SocialMenu.MODE_CLAN_MEMBERS:
          this.maskMemberList(a);
          break;
        case SocialMenu.MODE_CLAN_INVITATIONS:
          this.maskClanInvitationList(a);
      }
    });
    this.friendsButton = new Button("friends");
    this.friendsButton.setText("Friends");
    this.friendsButton.scale.x = this.friendsButton.scale.y = 0.7;
    this.friendsButton.addListener(Button.BUTTON_RELEASED, this.onFriendsButtonReleased.bind(this));
    this.friendsButton.x = 16;
    this.friendsButton.y = 8;
    this.invitationsButton = new Button("invitations");
    this.invitationsButton.setText("Invitations");
    this.invitationsButton.scale.x = this.invitationsButton.scale.y = 0.7;
    this.invitationsButton.addListener(
      Button.BUTTON_RELEASED,
      this.onInvitationsButtonReleased.bind(this)
    );
    this.invitationsButton.x = this.friendsButton.x + this.friendsButton.width + 6;
    this.invitationsButton.y = 8;
    this.clanButton = new Button("clan");
    this.clanButton.setText("Clan");
    this.clanButton.scale.x = this.clanButton.scale.y = 0.7;
    this.clanButton.addListener(Button.BUTTON_RELEASED, this.onClanButtonReleased.bind(this));
    this.clanButton.x = this.invitationsButton.x + this.invitationsButton.width + 6;
    this.clanButton.y = 8;
    this.clanChatButton = new Button("clan_chat");
    this.clanChatButton.setText("Clan chat");
    this.clanChatButton.scale.x = this.clanChatButton.scale.y = 0.7;
    this.clanChatButton.addListener(
      Button.BUTTON_RELEASED,
      this.onClanChatButtonReleased.bind(this)
    );
    this.clanChatButton.x = this.clanButton.x + this.clanButton.width + 6;
    this.clanChatButton.y = 8;
    this.friendDropdown = new FriendDropdown();
    this.friendDropdown.on(SocialMenu.REFRESH, () => this.refresh());
    this.friendDropdown.on(SocialMenu.SHOW_CHAT, (a) => this.showChat(a));
    this.friendDropdown.on(SocialMenu.SEND_GOLD, (a) => this.showGoldForm(a));
    this.clanDropdown = new SocialMemberDropdown();
    this.clanDropdown.on(SocialMenu.REFRESH, () => this.refresh());
    this.clanDropdown.on(SocialMenu.SHOW_CHAT, (a) => this.showChat(a));
    -1 === parseInt(App.Credential.clan_id) || App.WhiteLabel === App.WhiteLabel_POKI
      ? this.clanChatButton.disable()
      : this.clanChatButton.enable();
    this.friendText = new PIXI.Text(
      "Join a game and right click on a player in the leaderboard to send a friend invitation.",
      {
        fontName: "Arial",
        fontSize: 16,
        lineHeight: 18,
        fill: 13421568,
        strokeThickness: 2,
        lineJoin: "round",
        wordWrap: !0,
        wordWrapWidth: 330,
      }
    );
    this.friendText.x = 10;
    this.friendText.y = 40;
    this.friendText.resolution = 2;
    this.infoText = new PIXI.Text("Right-click friend for more actions.", {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 16,
      fill: 13408512,
      strokeThickness: 2,
      lineJoin: "round",
      fontStyle: "italic",
    });
    this.infoText.x = 10;
    this.infoText.y = 234;
    this.infoText.resolution = 2;
    this.infoText.maxWidth = 350;
    this.collapseButton = new PIXI.Sprite(App.CombinedTextures["chat-hide"]);
    this.collapseButton.scale.x = this.collapseButton.scale.y = 0.6;
    this.collapseButton.interactive = !0;
    this.collapseButton.x = 347;
    this.collapseButton.y = 2;
    this.collapseButton.alpha = 0.7;
    this.on("mousedown", (a) => {
      a.stopPropagation();
      this.down = !0;
      this.ox = a.data.global.x / this.parent.scale.x;
      this.oy = a.data.global.y / this.parent.scale.y;
    });
    this.on("mouseup", (a) => {
      a.stopPropagation();
      this.down = this.dragging = !1;
    });
    this.on("mouseupoutside", (a) => {
      a.stopPropagation();
      this.down = this.dragging = !1;
    });
    this.on("mousemove", (a) => {
      if (this.down && !this.ignoreInput) {
        let b = a.data.global.x / this.parent.scale.x;
        a = a.data.global.y / this.parent.scale.y;
        let c = b - this.ox,
          d = a - this.oy;
        this.x += c;
        this.y += d;
        this.ox = b;
        this.oy = a;
        0 < Math.sqrt(c * c + d * d) &&
          ((this.chatWindow.x -= c),
          (this.chatWindow.y -= d),
          (this.goldWindow.x -= c),
          (this.goldWindow.y -= d),
          (this.dragging = !0));
      }
    });
    this.on("mouseover", () => {
      this.collapsed || this.scrollbar.enableWheel();
    });
    this.on("mouseout", () => this.scrollbar.disableWheel());
    this.collapseButton.on("mouseover", (a) => {
      a.stopPropagation();
      this.collapseButton.alpha = 1;
    });
    this.collapseButton.on("mouseout", (a) => {
      a.stopPropagation();
      this.collapseButton.alpha = 0.7;
    });
    this.collapseButton.on("mousedown", (a) => {
      this.down = !0;
      this.ox = a.data.global.x / App.Scale;
      this.oy = a.data.global.y / App.Scale;
      AudioEffects.ButtonClick.audio.play();
    });
    this.collapseButton.on("mouseup", () => this.collapseMenu());
    this.container.addChild(this.infoText);
    this.container.addChild(this.listContainer);
    this.container.addChild(this.invitationsButton);
    this.container.addChild(this.friendsButton);
    this.container.addChild(this.clanButton);
    this.container.addChild(this.clanChatButton);
    this.addChild(this.container);
    this.addChild(this.collapseButton);
    this.chatWindow = new ChatWindow();
    this.chatWindow.on("rightdown", () => {
      this.chatWindow.active = !1;
      this.removeChild(this.chatWindow);
    });
    this.chatWindow.on(ChatWindow.CLOSE, () => {
      this.chatWindow.active = !1;
      this.removeChild(this.chatWindow);
    });
    this.goldWindow = new GoldWindow();
    this.goldWindow.on("rightdown", () => {
      this.goldWindow.active = !1;
      this.removeChild(this.goldWindow);
    });
    this.goldWindow.on(GoldWindow.CLOSE, () => {
      this.goldWindow.active = !1;
      this.removeChild(this.goldWindow);
    });
    this.resize(void 0, void 0, !0);
    this.loadConversationInterval = null;
    600 > App.ClientHeight && this.collapseMenu();
  }
  repositionForGame() {
    var a = new PIXI.Point(App.ClientWidth, App.ClientHeight);
    a = App.Layer.toLocal(a, App.Stage);
    this.x = this.collapsed ? a.x - 400 * this.scale.x : a.x - 380 * this.scale.x;
    this.y = a.y - (this.height + 20);
  }
  repositionForMenu() {
    let a = new PIXI.Point(App.ClientWidth, App.ClientHeight);
    this.y = App.Layer.toLocal(a, App.Stage).y - 300;
  }
  collapseMenu(a = !1, b = !0) {
    this.autoCollapsed = a;
    this.down = !1;
    if (!this.scrollbar.scrolling)
      if (this.dragging) this.dragging = !1;
      else {
        this.collapsed = !this.collapsed;
        a = this.x;
        var c = this.y;
        this.collapsed
          ? (this.scrollbar.disableWheel(),
            this.clear(),
            this.resize(),
            this.removeChild(this.container),
            (this.collapseButton.alpha = 0.7),
            (this.collapseButton.scale.x = this.collapseButton.scale.y = 0.9),
            (this.collapseButton.texture = App.CombinedTextures.chat))
          : (b && this.scrollbar.enableWheel(),
            this.lineStyle(1, 16777215, 0.1, 0),
            this.beginFill(3355443, 0.9),
            this.drawRoundedRect(0, 0, 380, 256, 4),
            this.endFill(),
            this.addChild(this.container),
            this.setChildIndex(this.collapseButton, this.children.length - 1),
            this.resize(),
            (this.collapseButton.scale.x = this.collapseButton.scale.y = 0.6),
            (this.collapseButton.texture = App.CombinedTextures["chat-hide"]),
            (this.collapseButton.alpha = 1));
        this.chatWindow.x += a - this.x;
        this.chatWindow.y += c - this.y;
        this.chatWindow.parent && this.setChildIndex(this.chatWindow, this.children.length - 1);
      }
  }
  maskFriendList(a) {
    let b = Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight);
    if (this.friends.length <= b) this.listContainer.y = 0;
    else {
      this.listContainer.removeChildren();
      this.listContainer.y = -(
        a *
        (this.friends.length * SocialMenu.ItemHeight -
          (SocialMenu.ListHeight - SocialMenu.ItemHeight))
      );
      var c = this.listContainer.y,
        d = Math.round(Math.abs(c / SocialMenu.ItemHeight));
      for (let f = 0; f < b; f++) {
        let g = this.friends[d + f];
        this.listContainer.addChild(g);
        if (0 === f) {
          var e = d * SocialMenu.ItemHeight + c;
          g.alpha = 0 <= e ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(e);
        } else
          f === b - 1
            ? ((e = d * SocialMenu.ItemHeight + c),
              (g.alpha = 0 > e ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(e)))
            : (g.alpha = 1);
      }
      this.friendScrollRatio = a;
    }
  }
  maskInvitationList(a) {
    let b = Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight);
    if (this.invites.length <= b) this.listContainer.y = 0;
    else {
      this.listContainer.removeChildren();
      this.listContainer.y = -(
        a *
        (this.invites.length * SocialMenu.ItemHeight -
          (SocialMenu.ListHeight - SocialMenu.ItemHeight))
      );
      var c = this.listContainer.y,
        d = Math.round(Math.abs(c / SocialMenu.ItemHeight));
      for (let f = 0; f < b; f++) {
        let g = this.invites[d + f];
        this.listContainer.addChild(g);
        if (0 === f) {
          var e = d * SocialMenu.ItemHeight + c;
          g.alpha = 0 <= e ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(e);
        } else
          f === b - 1
            ? ((e = d * SocialMenu.ItemHeight + c),
              (g.alpha = 0 > e ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(e)))
            : (g.alpha = 1);
      }
      this.inviteScrollRatio = a;
    }
  }
  maskClanInvitationList(a) {
    let b = Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight);
    if (this.clanInvitations.length <= b) this.listContainer.y = 0;
    else {
      this.listContainer.removeChildren();
      this.listContainer.y = -(
        a *
        (this.clanInvitations.length * SocialMenu.ItemHeight -
          (SocialMenu.ListHeight - SocialMenu.ItemHeight))
      );
      var c = this.listContainer.y,
        d = Math.round(Math.abs(c / SocialMenu.ItemHeight));
      for (let f = 0; f < b; f++) {
        let g = this.clanInvitations[d + f];
        this.listContainer.addChild(g);
        if (0 === f) {
          var e = d * SocialMenu.ItemHeight + c;
          g.alpha = 0 <= e ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(e);
        } else
          f === b - 1
            ? ((e = d * SocialMenu.ItemHeight + c),
              (g.alpha = 0 > e ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(e)))
            : (g.alpha = 1);
      }
      this.clanInvitationScrollRatio = a;
    }
  }
  maskMemberList(a) {
    let b = Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight);
    if (this.members.length <= b) this.listContainer.y = 0;
    else {
      this.listContainer.removeChildren();
      this.listContainer.y = -(
        a *
        (this.members.length * SocialMenu.ItemHeight -
          (SocialMenu.ListHeight - SocialMenu.ItemHeight))
      );
      var c = this.listContainer.y,
        d = Math.round(Math.abs(c / SocialMenu.ItemHeight));
      for (let f = 0; f < b; f++) {
        let g = this.members[d + f];
        this.listContainer.addChild(g);
        if (0 === f) {
          var e = d * SocialMenu.ItemHeight + c;
          g.alpha = 0 <= e ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(e);
        } else
          f === b - 1
            ? ((e = d * SocialMenu.ItemHeight + c),
              (g.alpha = 0 > e ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(e)))
            : (g.alpha = 1);
      }
      this.memberScrollRatio = a;
    }
  }
  async refresh() {
    switch (this.mode) {
      case SocialMenu.MODE_FRIENDS:
        this.loadFriends();
        break;
      case SocialMenu.MODE_INVITATIONS:
        this.loadInvitations();
        break;
      case SocialMenu.MODE_CLAN_MEMBERS:
        this.loadClanMembers();
        break;
      case SocialMenu.MODE_CLAN_INVITATIONS:
        this.loadClanInvitations();
    }
  }
  async loadConversations() {
    var a = await APIClient.getMessages(App.Credential.id);
    if ((a = JSON.parse(a)))
      ChatWindow.UpdateConversations(a),
        this.chatWindow.active && this.chatWindow.loadConversation();
  }
  async loadFriends(a = !1) {
    var b = Date.now();
    if (
      !(2e3 > b - this.friendsLastLoadedDate) &&
      ((this.friendsLastLoadedDate = b),
      this.friendsButton.setTint(16763904),
      this.invitationsButton.setTint(16777215),
      this.clanButton.setTint(16777215),
      (this.mode = SocialMenu.MODE_FRIENDS),
      this.friendsButton.disable(),
      (this.friendsButton.interactive = !0),
      (b = await APIClient.getFriends(App.Credential.id)),
      !1 !== b.success)
    ) {
      this.friends = [];
      b = JSON.parse(b);
      this.friendsButton.enable();
      this.listContainer.removeChildren();
      if (b.friends) {
        this.friendText.parent && this.container.removeChild(this.friendText);
        for (let c = 0; c < b.friends.length; c++) {
          const d = b.friends[c];
          let e = new FriendItem(d.id, d.name, d.seen, d.clan_id);
          e.x = 10;
          e.y = 47 + c * SocialMenu.ItemHeight;
          e.on(SocialMenu.REFRESH, () => this.refresh());
          e.on(SocialMenu.ACCESS_PROFILE, (f) => this.emit(Layer.Events.USER_ACCESS, f));
          e.on(SocialMenu.SHOW_FRIEND_DROPDOWN, () => this.showFriendDropdown(d.id, e));
          this.friends.push(e);
          this.friends.length <= Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight) &&
            this.listContainer.addChild(e);
          void 0 === SocialMenu.Friends[d.id] &&
            (SocialMenu.Friends[d.id] = { name: d.name, seen: d.seen });
        }
        b.friends.length > Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight)
          ? this.container.addChild(this.scrollbar)
          : this.container.removeChild(this.scrollbar);
        null === this.loadConversationInterval &&
          (this.loadConversationInterval = setInterval(() => {
            0 < this.friends.length && this.loadConversations();
            this.autoRefreshFriendsCounter--;
            0 >= this.autoRefreshFriendsCounter &&
              (this.collapsed || this.down || this.friendDropdown.parent || this.loadFriends(),
              (this.autoRefreshFriendsCounter = SocialMenu.AutoRefreshFriends));
          }, 4e4));
      } else
        this.container.addChild(this.friendText),
          this.container.removeChild(this.scrollbar),
          null !== this.loadConversationInterval &&
            (clearInterval(this.loadConversationInterval), (this.loadConversationInterval = null));
      this.friendDropdown.parent && this.container.removeChild(this.friendDropdown);
      a && ((this.friendScrollRatio = 0), this.scrollbar.reset());
      this.maskFriendList(this.friendScrollRatio);
    }
  }
  async loadInvitations(a = !1) {
    this.friendText.parent && this.container.removeChild(this.friendText);
    this.friendsButton.setTint(16777215);
    this.invitationsButton.setTint(16763904);
    this.clanButton.setTint(16777215);
    this.mode = SocialMenu.MODE_INVITATIONS;
    this.invitationsButton.disable();
    this.invitationsButton.interactive = !0;
    var b = await APIClient.getInvitations(App.Credential.id);
    if (!1 !== b.success) {
      b = JSON.parse(b);
      this.invites = [];
      this.invitationsButton.enable();
      this.listContainer.removeChildren();
      if (b.invitations) {
        for (let d = 0; d < b.invitations.length; d++) {
          var c = b.invitations[d];
          c = new AcceptInvitationItem(c.id, c.userId, c.name);
          c.x = 10;
          c.y = 40 + d * SocialMenu.ItemHeight;
          c.on(SocialMenu.REFRESH, () => this.refresh());
          c.on(SocialMenu.ACCESS_PROFILE, (e) => this.emit(Layer.Events.USER_ACCESS, e));
          this.invites.push(c);
          this.invites.length <= Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight) &&
            this.listContainer.addChild(c);
        }
        b.invitations.length > Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight)
          ? this.container.addChild(this.scrollbar)
          : this.container.removeChild(this.scrollbar);
      } else this.container.removeChild(this.scrollbar);
      this.friendDropdown.parent && this.container.removeChild(this.friendDropdown);
      a && ((this.inviteScrollRatio = 0), this.scrollbar.reset());
      this.maskInvitationList(this.inviteScrollRatio);
    }
  }
  showFriendDropdown(a, b) {
    this.friendDropdown.id === a && this.friendDropdown.parent
      ? this.container.removeChild(this.friendDropdown)
      : ((this.friendDropdown.id = a),
        (this.friendDropdown.name = b.name),
        this.friendDropdown.update({
          clanInvite:
            null !== b.clan ||
            -1 === parseInt(App.Credential.clan_id) ||
            ("captain" !== App.Credential.clan_role && "leader" !== App.Credential.clan_role)
              ? !1
              : !0,
        }),
        this.container.addChild(this.friendDropdown),
        (this.friendDropdown.x = b.x),
        (this.friendDropdown.y = b.y + b.parent.y + b.height));
  }
  showClanDropdown(a, b) {
    this.clanDropdown.id === a && this.clanDropdown.parent
      ? this.container.removeChild(this.clanDropdown)
      : ((this.clanDropdown.id = a),
        (this.clanDropdown.name = b.name),
        this.container.addChild(this.clanDropdown),
        (this.clanDropdown.x = b.x),
        (this.clanDropdown.y = b.y + b.parent.y + b.height));
  }
  showGoldForm(a) {
    this.goldWindow.load(a);
    this.goldWindow.active = !0;
    this.goldWindow.x = -10;
    this.goldWindow.y = 30;
    this.addChild(this.goldWindow);
    this.setChildIndex(this.goldWindow, this.children.length - 1);
    this.friendDropdown.parent && this.container.removeChild(this.friendDropdown);
  }
  showChat(a, b) {
    this.chatWindow.loadConversation(a);
    this.chatWindow.active = !0;
    this.chatWindow.x = this.x < 0.5 * App.ClientWidth ? 0 : -20;
    this.chatWindow.y = 36;
    this.addChild(this.chatWindow);
    this.setChildIndex(this.chatWindow, this.children.length - 1);
    this.friendDropdown.parent && this.container.removeChild(this.friendDropdown);
  }
  async loadInvitees() {
    this.mode = SocialMenu.MODE_INVITEES;
    !1 !== (await APIClient.getInvitees(App.Credential.id)).success &&
      this.listContainer.removeChildren();
  }
  async loadClanMembers(a = !1) {
    this.friendText.parent && this.container.removeChild(this.friendText);
    this.friendsButton.setTint(16777215);
    this.invitationsButton.setTint(16777215);
    this.clanButton.setTint(16763904);
    this.mode = SocialMenu.MODE_CLAN_MEMBERS;
    this.clanButton.disable();
    this.clanButton.interactive = !0;
    const b = await APIClient.getClanMembers(App.Credential.clan_id);
    if (!1 !== b.success) {
      this.members = [];
      this.clanButton.enable();
      this.listContainer.removeChildren();
      if (b.members) {
        0 < b.members.length && App.WhiteLabel !== App.WhiteLabel_POKI
          ? this.clanChatButton.enable()
          : this.clanChatButton.disable();
        for (let c = 0; c < b.members.length; c++) {
          const d = b.members[c],
            e = new ClanMemberItem(d.id, d.name, d.role);
          e.x = 10;
          e.y = 40 + c * SocialMenu.ItemHeight;
          e.on(SocialMenu.REFRESH, () => this.refresh());
          e.on(SocialMenu.ACCESS_PROFILE, (f) => this.emit(Layer.Events.USER_ACCESS, f));
          if (SocialMenu.Friends[d.id])
            e.on(SocialMenu.SHOW_CLAN_DROPDOWN, () => this.showClanDropdown(d.id, e));
          this.members.push(e);
          this.members.length <= Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight) &&
            this.listContainer.addChild(e);
        }
        b.members.length > Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight)
          ? this.container.addChild(this.scrollbar)
          : this.container.removeChild(this.scrollbar);
      } else this.container.removeChild(this.scrollbar);
      this.friendDropdown.parent && this.container.removeChild(this.friendDropdown);
      a && ((this.memberScrollRatio = 0), this.scrollbar.reset());
      this.maskMemberList(this.memberScrollRatio);
    }
  }
  async loadClanInvitations(a = !1) {
    this.friendText.parent && this.container.removeChild(this.friendText);
    this.friendsButton.setTint(16777215);
    this.invitationsButton.setTint(16777215);
    this.clanButton.setTint(16763904);
    this.mode = SocialMenu.MODE_CLAN_INVITATIONS;
    this.clanButton.disable();
    this.clanButton.interactive = !0;
    const b = await APIClient.getClanInvitations(App.Credential.id);
    if (!1 !== b.success) {
      this.clanInvitations = [];
      this.clanButton.enable();
      this.listContainer.removeChildren();
      if (b.invitations) {
        for (let d = 0; d < b.invitations.length; d++) {
          var c = b.invitations[d];
          c = new AcceptClanInvitationItem(c.clan_id, c.clan_name, c.initiator_name);
          c.x = 10;
          c.y = 40 + d * SocialMenu.ItemHeight;
          c.on(SocialMenu.REFRESH, () => this.refresh());
          c.on(Layer.Events.JOIN_CLAN, () => this.emit(Layer.Events.JOIN_CLAN));
          this.clanInvitations.push(c);
          this.clanInvitations.length <=
            Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight) &&
            this.listContainer.addChild(c);
        }
        b.invitations.length > Math.floor(SocialMenu.ListHeight / SocialMenu.ItemHeight)
          ? this.container.addChild(this.scrollbar)
          : this.container.removeChild(this.scrollbar);
      } else this.container.removeChild(this.scrollbar);
      this.friendDropdown.parent && this.container.removeChild(this.friendDropdown);
      a && ((this.clanInvitationScrollRatio = 0), this.scrollbar.reset());
      this.maskClanInvitationList(this.clanInvitationScrollRatio);
    }
  }
  onInvitationsButtonReleased() {
    this.loadInvitations(!0);
  }
  onFriendsButtonReleased() {
    this.loadFriends(!0);
  }
  onClanButtonReleased() {
    -1 !== parseInt(App.Credential.clan_id)
      ? this.loadClanMembers(!0)
      : this.loadClanInvitations(!0);
  }
  onClanChatButtonReleased() {
    this.emit(Layer.Events.CLAN_CHAT_ACCESS);
  }
  show() {
    this.loadFriends();
  }
  hide() {
    null !== this.loadConversationInterval &&
      (clearInterval(this.loadConversationInterval), (this.loadConversationInterval = null));
    this.scrollbar.disableWheel();
  }
  update() {}
  collapse() {
    this.collapsed = !0;
    this.resize();
    this.scrollbar.disableWheel();
  }
  expand() {
    this.collapsed = !1;
    this.resize();
  }
  resize(a, b, c = !1) {
    this.scale.x = this.scale.y =
      1 < App.Scale ? Math.max(0.7, 0.6 * App.Scale) : 1 + (0.8 - App.Scale);
    a = a ?? App.ClientWidth;
    b = b ?? App.ClientHeight;
    a = new PIXI.Point(a, b);
    a = App.Layer.toLocal(a, App.Stage);
    this.x = this.collapsed ? a.x - 400 * this.scale.x : a.x - 380 * this.scale.x;
    this.y + this.height > a.y
      ? (this.y = a.y - this.height)
      : c && (this.y = a.y - 2.1 * this.height);
  }
}
SocialMenu.REFRESH = "refresh";
SocialMenu.ACCESS_PROFILE = "access_profile";
SocialMenu.MODE_INVITATIONS = "invitations";
SocialMenu.MODE_INVITEES = "invitees";
SocialMenu.MODE_FRIENDS = "friends";
SocialMenu.MODE_CLAN_INVITATIONS = "clan_invitations";
SocialMenu.MODE_CLAN_MEMBERS = "clan_members";
SocialMenu.SHOW_FRIEND_DROPDOWN = "show_dropdown";
SocialMenu.SHOW_CLAN_DROPDOWN = "show_clan_dropdown";
SocialMenu.SHOW_CHAT = "show_chat";
SocialMenu.SEND_GOLD = "send_gold";
SocialMenu.MODE_GAME = !1;
SocialMenu.Friends = {};
SocialMenu.AutoRefreshFriends = 10;
SocialMenu.ListHeight = 208;
SocialMenu.ItemHeight = 30;
export class FriendItem extends PIXI.Graphics {
  constructor(a, b, c, d) {
    super();
    this.id = a;
    this.name = b;
    this.seen = new Date(Date.parse(c) - 6e4 * new Date().getTimezoneOffset());
    this.clan = d;
    this.beginFill(16777215, 0.15);
    this.drawRoundedRect(0, 0, 340, 26, 4);
    this.endFill();
    this.interactive = !0;
    this.tint = 12303291;
    this.on("mouseover", () => {
      this.tint = 16777215;
    });
    this.on("mouseout", () => {
      this.tint = 12303291;
    });
    this.on("mousedown", () => this.emit(SocialMenu.ACCESS_PROFILE, this.id));
    this.on("rightdown", () => this.emit(SocialMenu.SHOW_FRIEND_DROPDOWN, this.id));
    30 > Math.round((Date.now() - this.seen.getTime()) / 1e3)
      ? this.beginFill(65280, 1)
      : this.beginFill(8947848, 1);
    this.drawCircle(320, 13, 8);
    this.endFill();
    this.nameLabel = new PIXI.Text(this.name, FontStyle.SocialMenuItem);
    this.nameLabel.x = 8;
    this.nameLabel.y = 2;
    this.nameLabel.resolution = 2;
    this.addChild(this.nameLabel);
  }
}
export class ClanMemberItem extends PIXI.Graphics {
  constructor(a, b, c) {
    super();
    this.id = a;
    this.name = b;
    this.role = c;
    this.isFriend = !1;
    SocialMenu.Friends[this.id]
      ? ((this.isFriend = !0),
        (this.seen = new Date(
          Date.parse(SocialMenu.Friends[this.id].seen) - 6e4 * new Date().getTimezoneOffset()
        )))
      : (this.seen = this.id === App.Credential.playerid ? new Date() : new Date(0));
    this.beginFill(16777215, 0.15);
    this.drawRoundedRect(0, 0, 340, 26, 4);
    this.endFill();
    this.interactive = !0;
    this.tint = 12303291;
    this.on("mouseover", () => {
      this.tint = 16777215;
    });
    this.on("mouseout", () => {
      this.tint = 12303291;
    });
    this.on("mousedown", () => this.emit(SocialMenu.ACCESS_PROFILE, this.id));
    this.on("rightdown", () => this.emit(SocialMenu.SHOW_CLAN_DROPDOWN, this.id));
    30 > Math.round((Date.now() - this.seen.getTime()) / 1e3)
      ? this.beginFill(65280, 1)
      : this.beginFill(8947848, 1);
    this.drawCircle(320, 13, 8);
    this.endFill();
    this.nameLabel = new PIXI.Text(this.name, FontStyle.SocialMenuItem);
    this.nameLabel.x = 8;
    this.nameLabel.y = 2;
    this.nameLabel.hitArea = new PIXI.Rectangle();
    this.nameLabel.resolution = 2;
    this.addChild(this.nameLabel);
    this.isFriend && (this.nameLabel.tint = 12320699);
    if ("captain" === this.role || "leader" === this.role)
      (this.roleLabel = new PIXI.Text(this.role, FontStyle.SocialMenuItem)),
        (this.roleLabel.x = 300 - this.roleLabel.width),
        (this.roleLabel.y = 2),
        (this.roleLabel.tint = "leader" === this.role ? 8978312 : 16746632),
        (this.roleLabel.hitArea = new PIXI.Rectangle()),
        this.addChild(this.roleLabel);
  }
}
export class AcceptClanInvitationItem extends PIXI.Graphics {
  constructor(a, b, c) {
    super();
    this.id = a;
    this.clanName = b;
    this.initiatorName = c;
    this.beginFill(16777215, 0.15);
    this.drawRoundedRect(0, 0, 340, 26, 4);
    this.endFill();
    this.interactive = !0;
    this.tint = 12303291;
    this.on("mouseover", () => {
      this.tint = 16777215;
    });
    this.on("mouseout", () => {
      this.tint = 12303291;
    });
    this.nameLabel = new PIXI.Text(
      this.clanName + " by " + this.initiatorName,
      FontStyle.SocialMenuItem
    );
    this.nameLabel.x = 8;
    this.nameLabel.y = 2;
    this.nameLabel.resolution = 2;
    this.addChild(this.nameLabel);
    this.acceptButton = new Button("accept");
    this.acceptButton.setText("Accept");
    this.acceptButton.scale.x = this.acceptButton.scale.y = 0.55;
    this.acceptButton.addListener(Button.BUTTON_RELEASED, this.onAccept.bind(this));
    this.acceptButton.x = 225;
    this.acceptButton.y = 3;
    this.acceptButton.setTint(8978312);
    this.addChild(this.acceptButton);
    this.cancelButton = new Button("decline");
    this.cancelButton.setText("Decline");
    this.cancelButton.scale.x = this.cancelButton.scale.y = 0.55;
    this.cancelButton.addListener(Button.BUTTON_RELEASED, this.onDecline.bind(this));
    this.cancelButton.x = 287;
    this.cancelButton.y = 3;
    this.cancelButton.setTint(16746632);
    this.addChild(this.cancelButton);
  }
  async onAccept() {
    this.acceptButton.disable();
    !1 !== (await APIClient.postAcceptInviteMember(this.id, App.Credential.id)).success &&
      (this.acceptButton.enable(),
      this.emit(Layer.Events.JOIN_CLAN),
      this.emit(SocialMenu.REFRESH));
  }
  async onDecline() {
    this.cancelButton.disable();
    !1 !== (await APIClient.postDeclineInviteMember(this.id, App.Credential.id)).success &&
      (this.cancelButton.enable(), this.emit(SocialMenu.REFRESH));
  }
}
export class AcceptInvitationItem extends PIXI.Graphics {
  constructor(a, b, c) {
    super();
    this.id = a;
    this.name = c;
    this.userId = b;
    this.beginFill(16777215, 0.2);
    this.drawRoundedRect(0, 0, 340, 26, 4);
    this.endFill();
    this.interactive = !0;
    this.tint = 12303291;
    this.on("mouseover", () => {
      this.tint = 16777215;
    });
    this.on("mouseout", () => {
      this.tint = 12303291;
    });
    this.on("mousedown", () => this.emit(SocialMenu.ACCESS_PROFILE, b));
    this.nameLabel = new PIXI.Text(this.name, FontStyle.SocialMenuItem);
    this.nameLabel.x = 8;
    this.nameLabel.y = 2;
    this.addChild(this.nameLabel);
    this.acceptButton = new Button("accept");
    this.acceptButton.setText("Accept");
    this.acceptButton.scale.x = this.acceptButton.scale.y = 0.55;
    this.acceptButton.addListener(Button.BUTTON_RELEASED, this.onAccept.bind(this));
    this.acceptButton.x = 225;
    this.acceptButton.y = 3;
    this.acceptButton.setTint(8978312);
    this.addChild(this.acceptButton);
    this.cancelButton = new Button("decline");
    this.cancelButton.setText("Decline");
    this.cancelButton.scale.x = this.cancelButton.scale.y = 0.55;
    this.cancelButton.addListener(Button.BUTTON_RELEASED, this.onDecline.bind(this));
    this.cancelButton.x = 287;
    this.cancelButton.y = 3;
    this.cancelButton.setTint(16746632);
    this.addChild(this.cancelButton);
  }
  async onAccept() {
    this.acceptButton.disable();
    !1 !== (await APIClient.postAcceptFriend(this.userId, App.Credential.id)).success &&
      (this.acceptButton.enable(), this.emit(SocialMenu.REFRESH));
  }
  async onDecline() {
    this.cancelButton.disable();
    !1 !== (await APIClient.postDeclineFriend(this.userId, App.Credential.id)).success &&
      (this.cancelButton.enable(), this.emit(SocialMenu.REFRESH));
  }
}
export class SocialMenuScrollbar extends PIXI.Graphics {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.bh = this.h - 39;
    this.oy = 0;
    this.alpha = 0.5;
    this.lineStyle(1, 16777215, 0.8, 0);
    this.drawRoundedRect(0, -5, 20, this.h, 4);
    this.endFill();
    this.interactive = !0;
    this.hitArea = new PIXI.Rectangle(-10, -4, 32, this.h);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, -3, 16, 35, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = this.bh * this.start;
    this.on("mouseover", () => {
      this.alpha = 0.8;
    });
    this.on("mouseout", () => {
      this.alpha = 0.5;
    });
    this.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.ExclusiveWheel = this.wheelListener;
  }
  disableWheel() {
    UserInput.ExclusiveWheel = null;
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      b = 0 > b ? 0 : b > this.bh ? this.bh : b;
      let c = (1 / this.h) * b * (this.h / this.bh);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(SocialMenuScrollbar.SCROLL, c);
    }
  }
  reset() {
    this.scrollButton.y = (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
SocialMenuScrollbar.SCROLL = "scroll";
export class FriendDropdown extends PIXI.Container {
  constructor() {
    super();
    this.id = null;
    this.background = new PIXI.Graphics();
    this.messageRow = new FriendDropdownActionRow(
      "Message",
      FriendDropdown.Action.MESSAGE,
      16777215
    );
    this.messageRow.on(FriendDropdownActionRow.SELECT, () =>
      this.emit(SocialMenu.SHOW_CHAT, this.id)
    );
    this.unfriendRow = new FriendDropdownActionRow(
      "Unfriend",
      FriendDropdown.Action.UNFRIEND,
      11141120,
      !0
    );
    this.unfriendRow.on(FriendDropdownActionRow.CONFIRM, () => this.onUnfriend());
    this.goldRow = new FriendDropdownActionRow(
      "Send gold",
      FriendDropdown.Action.SEND_GOLD,
      16763904
    );
    this.goldRow.on(FriendDropdownActionRow.SELECT, () => this.emit(SocialMenu.SEND_GOLD, this.id));
    this.clanRow = new FriendDropdownActionRow(
      "Invite to clan",
      FriendDropdown.Action.CLAN_INVITE,
      5635925
    );
    this.clanRow.on(FriendDropdownActionRow.SELECT, () => this.onInviteToClan());
    this.messageRow.x = 10;
    this.messageRow.y = 4;
    this.goldRow.x = 10;
    this.goldRow.y = 34;
    this.unfriendRow.x = 10;
    this.unfriendRow.y = 64;
    this.clanRow.x = 10;
    this.clanRow.y = 64;
    this.addChild(this.background);
    App.WhiteLabel !== App.WhiteLabel_POKI && this.addChild(this.messageRow);
    this.addChild(this.goldRow);
    this.addChild(this.unfriendRow);
    this.update();
  }
  update(a) {
    this.background.clear();
    this.background.lineStyle(1, 16777215, 0.4, 0.3);
    this.background.beginFill(5592405, 0.9);
    a && a.clanInvite
      ? (this.clanRow.parent || this.addChild(this.clanRow),
        this.background.drawRoundedRect(0, 0, 128, 130, 4),
        (this.unfriendRow.y = 94))
      : (this.clanRow.parent && this.removeChild(this.clanRow),
        this.background.drawRoundedRect(0, 0, 110, 94, 4),
        (this.unfriendRow.y = 64));
    this.background.endFill();
  }
  async onUnfriend() {
    (await APIClient.postUnfriend(this.id, App.Credential.id)) && this.emit(SocialMenu.REFRESH);
  }
  async onInviteToClan() {
    let a = await APIClient.postInviteMember(this.id, App.Credential.id);
    a
      ? !1 === a.success
        ? App.Console.log(a.error)
        : (App.Console.log("Clan invitation sent."), this.emit(SocialMenu.REFRESH))
      : App.Console.log("Unable to send clan invitation.");
  }
}
FriendDropdown.Action = {
  MESSAGE: "message",
  SEND_GOLD: "send_gold",
  UNFRIEND: "unfriend",
  CLAN_INVITE: "clanInvite",
};
export class FriendDropdownActionRow extends PIXI.Container {
  constructor(a, b, c, d = !1) {
    super();
    this.text = a;
    this.tintValue = c;
    this.actionText = new PIXI.Text(this.text, FontStyle.SocialDropdownText);
    this.actionText.resolution = 2;
    this.confirmation = d;
    this.confirming = !1;
    this.interactive = !0;
    this.hitArea = new PIXI.Rectangle(0, 0, 100, 30);
    this.actionText.tint = this.tintValue;
    this.actionText.alpha = 0.7;
    this.on("mouseover", () => {
      this.actionText.alpha = 1;
    });
    this.on("mouseout", () => {
      this.actionText.alpha = 0.7;
      this.confirmation && ((this.confirming = !1), (this.actionText.text = this.text));
    });
    this.on("mousedown", () => {
      this.confirmation
        ? this.confirming
          ? this.emit(FriendDropdownActionRow.CONFIRM)
          : ((this.actionText.text = "Confirm?"), (this.confirming = !0))
        : this.emit(FriendDropdownActionRow.SELECT);
    });
    this.addChild(this.actionText);
  }
}
FriendDropdownActionRow.CONFIRM = "confirm";
FriendDropdownActionRow.SELECT = "select";
export class SocialMemberDropdown extends PIXI.Container {
  constructor() {
    super();
    this.id = null;
    this.background = new PIXI.Graphics();
    this.background.lineStyle(1, 16777215, 0.4, 0);
    this.background.beginFill(5592405, 0.9);
    this.background.drawRoundedRect(0, 0, 110, 32, 4);
    this.background.endFill();
    this.messageRow = new SocialMemberDropdownActionRow(
      "Message",
      SocialMemberDropdown.Action.MESSAGE,
      16777215
    );
    this.messageRow.on(SocialMemberDropdownActionRow.SELECT, () =>
      this.emit(SocialMenu.SHOW_CHAT, this.id)
    );
    this.messageRow.x = 10;
    this.messageRow.y = 4;
    this.addChild(this.background);
    App.WhiteLabel !== App.WhiteLabel_POKI && this.addChild(this.messageRow);
  }
  async onUnfriend() {
    (await APIClient.postUnfriend(this.id, App.Credential.id)) && this.emit(SocialMenu.REFRESH);
  }
}
SocialMemberDropdown.Action = { MESSAGE: "message" };
export class SocialMemberDropdownActionRow extends PIXI.Container {
  constructor(a, b, c, d = !1) {
    super();
    this.text = a;
    this.tintValue = c;
    this.actionText = new PIXI.Text(this.text, FontStyle.SocialDropdownText);
    this.confirmation = d;
    this.confirming = !1;
    this.interactive = !0;
    this.hitArea = new PIXI.Rectangle(0, 0, 100, 30);
    this.actionText.tint = this.tintValue;
    this.actionText.alpha = 0.7;
    this.on("mouseover", () => {
      this.actionText.alpha = 1;
    });
    this.on("mouseout", () => {
      this.actionText.alpha = 0.7;
      this.confirmation && ((this.confirming = !1), (this.actionText.text = this.text));
    });
    this.on("mousedown", () => {
      this.confirmation
        ? this.confirming
          ? this.emit(SocialMemberDropdownActionRow.CONFIRM)
          : ((this.actionText.text = "Confirm?"), (this.confirming = !0))
        : this.emit(SocialMemberDropdownActionRow.SELECT);
    });
    this.addChild(this.actionText);
  }
}
SocialMemberDropdownActionRow.CONFIRM = "confirm";
SocialMemberDropdownActionRow.SELECT = "select";
export class GoldWindow extends PIXI.Container {
  constructor() {
    super();
    this.id = null;
    this.dragging = this.active = !1;
    this.interactive = !0;
    this.background = new PIXI.Graphics();
    this.background.lineStyle(1, 16777215, 0.1);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRoundedRect(0, 0, 170, 110, 4);
    this.background.endFill();
    this.addChild(this.background);
    this.on("mousedown", (a) => {
      this.dragging = !0;
      this.ox = a.data.global.x / App.Scale;
      this.oy = a.data.global.y / App.Scale;
    });
    this.on("mouseup", () => {
      this.dragging = !1;
      this.parent.ignoreInput = !1;
    });
    this.on("mouseupoutside", () => {
      this.dragging = !1;
      this.parent.ignoreInput = !1;
    });
    this.on("mousemove", (a) => {
      if (this.dragging) {
        var b = a.data.global.x / App.Scale;
        a = a.data.global.y / App.Scale;
        var c = a - this.oy;
        this.x += b - this.ox;
        this.y += c;
        this.ox = b;
        this.oy = a;
        this.parent && (this.parent.ignoreInput = !0);
      }
    });
    this.title = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 22,
      multiline: !0,
      align: "center",
    });
    this.title.x = 4;
    this.title.y = 3;
    this.title.tint = 16763904;
    this.errorMsg = new PIXI.BitmapText("", { fontName: "Open Sans", fontSize: 22 });
    this.errorMsg.x = 0.5 * this.background.width;
    this.errorMsg.y = 82;
    this.errorMsg.anchor.x = 0.5;
    this.errorMsg.tint = 16746496;
    this.inputField = new InputField("gold_value");
    this.inputField.setDimensions(80, 30);
    this.inputField.forceLowerCase = !1;
    this.inputField.setMaxChars(4);
    this.inputField.x = 0.5 * (this.background.width - this.inputField.width);
    this.inputField.y = 48;
    this.inputField.setFilter(UserInput.NUMERIC);
    this.inputField.addListener(InputField.SUBMIT, (a) => this.onSubmitGold(a.data.value));
    this.addChild(this.background);
    this.addChild(this.title);
    this.addChild(this.errorMsg);
    this.addChild(this.inputField);
  }
  load(a) {
    this.id = a;
    this.title.text = "Send gold to " + SocialMenu.Friends[this.id].name + "\n(max 1000/hour)";
    this.errorMsg.text = "";
    this.inputField.setText("0");
  }
  async onSubmitGold(a) {
    a = parseInt(a, 10);
    1e3 < a && (this.errorMsg.text = "1000 is the maximum.");
    const b = await APIClient.postFriendGold(this.id, a, App.Credential.id);
    b &&
      (b.success
        ? (this.inputField.setText("0"), (this.errorMsg.text = a + " gold sent"))
        : (this.errorMsg.text = b.error));
  }
}
export class ChatWindow extends PIXI.Graphics {
  constructor() {
    super();
    this.id = null;
    this.dragging = !1;
    this.interactive = !0;
    this.active = !1;
    this.convo = null;
    this.messages = [];
    this.oy = this.ox = 0;
    this.lineStyle(1, 16777215, 0.1);
    this.beginFill(3355443, 0.9);
    this.drawRoundedRect(0, 0, 400, 220, 4);
    this.endFill();
    this.on("mousedown", (a) => {
      this.dragging = !0;
      this.ox = a.data.global.x / App.Scale;
      this.oy = a.data.global.y / App.Scale;
    });
    this.on("mouseup", () => {
      this.dragging = !1;
      this.parent.ignoreInput = !1;
    });
    this.on("mouseupoutside", () => {
      this.dragging = !1;
      this.parent.ignoreInput = !1;
    });
    this.on("mousemove", (a) => {
      if (this.dragging) {
        var b = a.data.global.x / App.Scale;
        a = a.data.global.y / App.Scale;
        var c = a - this.oy;
        this.x += b - this.ox;
        this.y += c;
        this.ox = b;
        this.oy = a;
        this.parent && (this.parent.ignoreInput = !0);
      }
    });
    this.title = new PIXI.BitmapText("", { fontName: "Open Sans", fontSize: 22 });
    this.title.x = 4;
    this.title.y = 3;
    this.title.tint = 16763904;
    this.scrollbar = new SocialMenuScrollbar(186, 1);
    this.scrollbar.x = 378;
    this.scrollbar.y = 8;
    this.closeButton = new PIXI.Sprite(App.CombinedTextures.exit);
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.alpha = 0.5;
    this.closeButton.interactive = !0;
    this.closeButton.x = this.width - 28;
    this.closeButton.y = 2;
    this.closeButton.on("mousedown", (a) => {
      this.closeButton.alpha = 0.5;
      this.emit(ChatWindow.CLOSE);
    });
    this.closeButton.on("mouseover", (a) => {
      this.closeButton.alpha = 1;
    });
    this.closeButton.on("mouseout", (a) => {
      this.closeButton.alpha = 0.5;
    });
    this.inputField = new InputField("chat_msg");
    this.inputField.setDimensions(400, 30);
    this.inputField.forceLowerCase = !1;
    this.inputField.setMaxChars(72);
    this.inputField.x = 0;
    this.inputField.y = this.height - 30;
    this.inputField.setFilter(
      UserInput.ALPHANUMERIC + UserInput.CHAT_SYMBOLS + UserInput.ALPHA_EXT
    );
    this.inputField.addListener(InputField.SUBMIT, (a) => this.onSubmitMessage(a.data.value));
    for (let a = 0; a < ChatWindow.MaxMessages; a++) {
      const b = new PIXI.BitmapText("", FontStyle.ChatMessage);
      b.maxWidth = 360;
      b.interactive = !1;
      b.hitArea = new PIXI.Rectangle();
      this.addChild(b);
      this.messages.push(b);
    }
    this.addChild(this.title);
    this.addChild(this.inputField);
    this.addChild(this.closeButton);
  }
  async onSubmitMessage(a) {
    const b = await APIClient.postFriendMessage(this.id, a, App.Credential.id);
    this.inputField.setText("");
    SocialMenu.MODE_GAME || this.inputField.setFocus(!0);
    b.success
      ? ChatWindow.PutMessage({ target: this.id, message: a, created: Date.now() }, !0)
      : ChatWindow.PutMessage(
          { target: this.id, message: b.error, created: Date.now(), error: !0 },
          !0
        );
    this.loadConversation();
  }
  loadConversation(a) {
    void 0 !== a && (this.id = a);
    this.title.text = "Messaging " + SocialMenu.Friends[this.id].name;
    this.convo =
      void 0 === ChatWindow.Conversations[this.id]
        ? (ChatWindow.Conversations[this.id] = { messages: [] })
        : ChatWindow.Conversations[this.id];
    a = 0;
    for (let b = ChatWindow.MaxMessages - 1; 0 <= b; b--) {
      const c = this.convo.messages[b],
        d = this.messages[b];
      c
        ? ((d.text =
            (c.own ? (c.error ? "Error: " : "You: ") : SocialMenu.Friends[this.id].name + ": ") +
            c.text),
          (a += d.height + 4),
          (d.x = 8),
          (d.y = 192 - a),
          (d.tint = c.own ? (c.error ? 16711680 : 13434828) : 13421823),
          (d.alpha = 16 > d.y ? 0 : 1))
        : (d.text = "");
    }
  }
}
ChatWindow.Conversations = {};
ChatWindow.CLOSE = "close";
ChatWindow.PutMessage = (a, b) => {
  let c = ChatWindow.Conversations[a.target];
  void 0 === c && (c = ChatWindow.Conversations[a.target] = { messages: [] });
  c.messages.length === ChatWindow.MaxMessages && c.messages.shift();
  c.messages.push({ own: b, text: a.message, created: a.created, error: a.error ? !0 : !1 });
  b ||
    ("1" === a.system
      ? App.Console.log("[SYS] " + a.message, 16763904)
      : App.Console.log("[PM] " + SocialMenu.Friends[a.target].name + ": " + a.message, 3407667));
};
ChatWindow.UpdateConversations = (a) => {
  for (let b = 0; b < a.messages.length; b++) ChatWindow.PutMessage(a.messages[b], !1);
};
ChatWindow.MaxMessages = 8;
var imgbutton = {};
export class ImgButton extends PIXI.Sprite {
  constructor(a = ImgButton.TYPE_CLOSE, b = !0) {
    let c = null;
    switch (a) {
      case ImgButton.TYPE_CLOSE:
        c = App.CombinedTextures.exit;
    }
    super(c);
    this.type = a;
    this.enabled = b;
    this.interactive = !0;
    this.alpha = this.enabled ? 0.7 : 0.4;
    this.on("mouseover", () => this.onMouseOver());
    this.on("mouseout", () => this.onMouseOut());
    this.on("mousedown", () => this.onMouseDown());
    this.on("touchstart", () => this.onMouseDown());
  }
  mobileSetup() {
    App.IsMobile &&
      this.type === ImgButton.TYPE_CLOSE &&
      ((this.scale.x = this.scale.y *= 1.4), (this.x -= 10), (this.y -= 2));
  }
  onMouseOver() {
    this.enabled && ((this.alpha = 1), AudioEffects.ButtonHover.audio.play());
  }
  onMouseDown() {
    this.enabled &&
      ((this.alpha = 0.7), this.emit(ImgButton.CLICK), AudioEffects.ButtonClick.audio.play());
  }
  onMouseOut() {
    this.enabled && (this.alpha = 0.7);
  }
  setEnabled(a) {
    this.alpha = (this.enabled = a) ? 0.7 : 0.4;
  }
}
ImgButton.TYPE_CLOSE = "close";
ImgButton.CLICK = click;
var rankingmenu = {};
export class RankingMenu extends Feature {
  constructor() {
    super();
    this.lastRefresh = 0;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.container.addChild(this.background);
    this.ox = 40;
    this.oy = 20;
    this.display = RankingMenu.GLOBAL_RANKING;
    this.titleText = new PIXI.Text("Ranking & statistics", FontStyle.MediumOrangeText);
    this.titleText.x = 0.5 * this.width - 20;
    this.titleText.y = this.oy + 36;
    this.titleText.anchor.x = 0.5;
    this.titleText.resolution = 2;
    this.container.addChild(this.titleText);
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.RANKING_CANCEL));
    this.container.addChild(this.closeButton);
    this.globalRankingButton = new PIXI.Graphics();
    this.globalRankingButton.lineStyle(1, 16777215, 0.1, 0);
    this.globalRankingButton.beginFill(16777215, 0.2);
    this.globalRankingButton.drawRect(0, 0, 130, 24, 4);
    this.globalRankingButton.endFill();
    this.globalRankingButton.x = 0.5 * this.background.width - 220;
    this.globalRankingButton.y = this.oy + 68;
    this.globalRankingButton.tint = 13421772;
    this.globalRankingButton.alpha = 0.5;
    this.globalRankingButton.interactive = !0;
    this.globalRankingButton.on("mouseover", () => {
      this.globalRankingLabel.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.globalRankingButton.on("mouseout", () => {
      this.globalRankingLabel.alpha = this.display === RankingMenu.GLOBAL_RANKING ? 1 : 0.5;
    });
    this.globalRankingButton.on("mousedown", () => this.displayGlobalRanking());
    this.globalRankingButton.on("touchstart", () => this.displayGlobalRanking());
    this.container.addChild(this.globalRankingButton);
    this.globalRankingLabel = new PIXI.Text("Experience", FontStyle.SmallMenuTextOrange5);
    this.globalRankingLabel.alpha = 0.7;
    this.globalRankingLabel.x =
      this.globalRankingButton.x +
      0.5 * (this.globalRankingButton.width - this.globalRankingLabel.width);
    this.globalRankingLabel.y = this.globalRankingButton.y + 1;
    this.globalRankingLabel.hitArea = new PIXI.Rectangle();
    this.globalRankingLabel.resolution = 2;
    this.container.addChild(this.globalRankingLabel);
    this.skillRankingButton = new PIXI.Graphics();
    this.skillRankingButton.lineStyle(1, 16777215, 0.1, 0);
    this.skillRankingButton.beginFill(16777215, 0.2);
    this.skillRankingButton.drawRect(0, 0, 130, 24, 4);
    this.skillRankingButton.endFill();
    this.skillRankingButton.x = this.globalRankingButton.x + this.globalRankingButton.width + 8;
    this.skillRankingButton.y = this.globalRankingButton.y;
    this.skillRankingButton.tint = 13421772;
    this.skillRankingButton.alpha = 1;
    this.skillRankingButton.interactive = !0;
    this.skillRankingButton.on("mouseover", () => {
      this.skillRankingLabel.alpha = 1;
    });
    this.skillRankingButton.on("mouseout", () => {
      this.skillRankingLabel.alpha = this.display === RankingMenu.SKILL_RANKING ? 1 : 0.5;
    });
    this.skillRankingButton.on("mousedown", () => this.displaySkillRanking());
    this.skillRankingButton.on("touchstart", () => this.displaySkillRanking());
    this.container.addChild(this.skillRankingButton);
    this.skillRankingLabel = new PIXI.Text("1 vs 1", FontStyle.SmallMenuTextOrange5);
    this.skillRankingLabel.alpha = 1;
    this.skillRankingLabel.x =
      this.skillRankingButton.x +
      0.5 * (this.skillRankingButton.width - this.skillRankingLabel.width);
    this.skillRankingLabel.y = this.skillRankingButton.y + 1;
    this.skillRankingLabel.hitArea = new PIXI.Rectangle();
    this.skillRankingLabel.resolution = 2;
    this.container.addChild(this.skillRankingLabel);
    this.weaponStatsButton = new PIXI.Graphics();
    this.weaponStatsButton.lineStyle(1, 16777215, 0.1, 0);
    this.weaponStatsButton.beginFill(16777215, 0.2);
    this.weaponStatsButton.drawRect(0, 0, 130, 24, 4);
    this.weaponStatsButton.endFill();
    this.weaponStatsButton.x = this.skillRankingButton.x + this.skillRankingButton.width + 8;
    this.weaponStatsButton.y = this.skillRankingButton.y;
    this.weaponStatsButton.tint = 13421772;
    this.weaponStatsButton.alpha = 0.5;
    this.weaponStatsButton.interactive = !0;
    this.weaponStatsButton.on("mouseover", () => {
      this.weaponStatsLabel.alpha = 1;
    });
    this.weaponStatsButton.on("mouseout", () => {
      this.weaponStatsLabel.alpha = this.display === RankingMenu.WEAPON_STATS ? 1 : 0.5;
    });
    this.weaponStatsButton.on("mousedown", () => this.displayWeaponStats());
    this.weaponStatsButton.on("touchstart", () => this.displayWeaponStats());
    this.container.addChild(this.weaponStatsButton);
    this.weaponStatsLabel = new PIXI.Text("Weapons", FontStyle.SmallMenuTextOrange5);
    this.weaponStatsLabel.alpha = 0.5;
    this.weaponStatsLabel.x =
      this.weaponStatsButton.x + 0.5 * (this.weaponStatsButton.width - this.weaponStatsLabel.width);
    this.weaponStatsLabel.y = this.weaponStatsButton.y + 1;
    this.weaponStatsLabel.hitArea = new PIXI.Rectangle();
    this.weaponStatsLabel.resolution = 2;
    this.container.addChild(this.weaponStatsLabel);
    this.globalRankingContainer = new PIXI.Container();
    this.skillRankingContainer = new PIXI.Container();
    this.weaponStatsContainer = new PIXI.Container();
    this.weaponTypeContainer = new PIXI.Container();
    this.nameText = new PIXI.Text("Name", FontStyle.SmallRankingTextOrange);
    this.nameText.x = this.ox + 66;
    this.nameText.y = this.oy + 104;
    this.nameText.resolution = 2;
    this.globalRankingContainer.addChild(this.nameText);
    this.levelText = new PIXI.Text("Level", FontStyle.SmallRankingTextOrange);
    this.levelText.x = this.ox + 246;
    this.levelText.y = this.oy + 104;
    this.levelText.resolution = 2;
    this.globalRankingContainer.addChild(this.levelText);
    this.experienceText = new PIXI.Text("Experience", FontStyle.SmallRankingTextOrange);
    this.experienceText.x = this.ox + 366;
    this.experienceText.y = this.oy + 104;
    this.experienceText.resolution = 2;
    this.globalRankingContainer.addChild(this.experienceText);
    this.socialGlText = new PIXI.Text("Channels", FontStyle.SmallRankingTextOrange);
    this.socialGlText.x = this.ox + 506;
    this.socialGlText.y = this.oy + 104;
    this.socialGlText.resolution = 2;
    this.globalRankingContainer.addChild(this.socialGlText);
    this.globalRankingTableContainerMask = new PIXI.Graphics();
    this.globalRankingTableContainerMask.beginFill(16777215, 1);
    this.globalRankingTableContainerMask.drawRect(-10, 150, 640, 390);
    this.globalRankingTableContainerMask.endFill();
    this.globalRankingTableContainerMask.x = 10;
    this.globalRankingContainer.addChild(this.globalRankingTableContainerMask);
    this.globalRankingTableContainer = new PIXI.Container();
    this.globalRankingTableContainer.x = 10;
    this.globalRankingTableContainer.mask = this.globalRankingTableContainerMask;
    this.globalRankingContainer.addChild(this.globalRankingTableContainer);
    this.globalRanking = new GlobalRankingScrollbar(404);
    this.globalRanking.x = 625;
    this.globalRanking.y = 150;
    this.globalRankingContainer.addChild(this.globalRanking);
    this.globalRanking.on(GlobalRankingScrollbar.SCROLL, (a) => {
      this.globalRankingTableContainer.height > this.globalRankingTableContainerMask.height &&
        (this.globalRankingTableContainer.y = -(
          a *
          (this.globalRankingTableContainer.height - this.globalRankingTableContainerMask.height)
        ));
    });
    this.nameSkillText = new PIXI.Text("Name", FontStyle.SmallRankingTextOrange);
    this.nameSkillText.x = this.ox + 66;
    this.nameSkillText.y = this.oy + 104;
    this.nameSkillText.resolution = 2;
    this.skillRankingContainer.addChild(this.nameSkillText);
    this.skillTitleText = new PIXI.Text("Title", FontStyle.SmallRankingTextOrange);
    this.skillTitleText.x = this.ox + 270;
    this.skillTitleText.y = this.oy + 104;
    this.skillTitleText.resolution = 2;
    this.skillRankingContainer.addChild(this.skillTitleText);
    this.skillText = new PIXI.Text("Skill", FontStyle.SmallRankingTextOrange);
    this.skillText.x = this.ox + 410;
    this.skillText.y = this.oy + 104;
    this.skillText.resolution = 2;
    this.skillRankingContainer.addChild(this.skillText);
    this.socialText = new PIXI.Text("Channels", FontStyle.SmallRankingTextOrange);
    this.socialText.x = this.ox + 506;
    this.socialText.y = this.oy + 104;
    this.socialText.resolution = 2;
    this.skillRankingContainer.addChild(this.socialText);
    this.skillRankingTableContainerMask = new PIXI.Graphics();
    this.skillRankingTableContainerMask.beginFill(16777215, 1);
    this.skillRankingTableContainerMask.drawRect(-10, 150, 640, 390);
    this.skillRankingTableContainerMask.endFill();
    this.skillRankingTableContainerMask.x = 10;
    this.skillRankingContainer.addChild(this.skillRankingTableContainerMask);
    this.skillRankingTableContainer = new PIXI.Container();
    this.skillRankingTableContainer.x = 10;
    this.skillRankingTableContainer.mask = this.skillRankingTableContainerMask;
    this.skillRankingContainer.addChild(this.skillRankingTableContainer);
    this.skillRanking = new SkillRankingScrollbar(404);
    this.skillRanking.x = 625;
    this.skillRanking.y = 150;
    this.skillRankingContainer.addChild(this.skillRanking);
    this.skillRanking.on(SkillRankingScrollbar.SCROLL, (a) => {
      this.skillRankingTableContainer.height > this.skillRankingTableContainerMask.height &&
        (this.skillRankingTableContainer.y = -(
          a *
          (this.skillRankingTableContainer.height - this.skillRankingTableContainerMask.height)
        ));
    });
    this.weaponTypeText = new PIXI.Text("Weapon type", FontStyle.SmallRankingTextOrange);
    this.weaponTypeText.x = this.ox - 4;
    this.weaponTypeText.y = this.oy + 104;
    this.weaponTypeText.resolution = 2;
    this.weaponStatsContainer.addChild(this.weaponTypeText);
    this.weaponKillsText = new PIXI.Text("Kills", FontStyle.SmallRankingTextOrange);
    this.weaponKillsText.x = this.ox + 390;
    this.weaponKillsText.y = this.oy + 104;
    this.weaponKillsText.resolution = 2;
    this.weaponStatsContainer.addChild(this.weaponKillsText);
    this.weaponStatsTableContainerMask = new PIXI.Graphics();
    this.weaponStatsTableContainerMask.beginFill(16777215, 1);
    this.weaponStatsTableContainerMask.drawRect(-10, 150, 640, 390);
    this.weaponStatsTableContainerMask.endFill();
    this.weaponStatsTableContainerMask.x = 10;
    this.weaponStatsContainer.addChild(this.weaponStatsTableContainerMask);
    this.weaponStatsTableContainer = new PIXI.Container();
    this.weaponStatsTableContainer.x = 10;
    this.weaponStatsTableContainer.mask = this.weaponStatsTableContainerMask;
    this.weaponStatsContainer.addChild(this.weaponStatsTableContainer);
    this.weaponStats = new WeaponStatsScrollbar(404);
    this.weaponStats.x = 625;
    this.weaponStats.y = 150;
    this.weaponStatsContainer.addChild(this.weaponStats);
    this.weaponStats.on(WeaponStatsScrollbar.SCROLL, (a) => {
      this.weaponStatsTableContainer.height > this.weaponStatsTableContainerMask.height &&
        (this.weaponStatsTableContainer.y = -(
          a *
          (this.weaponStatsTableContainer.height - this.weaponStatsTableContainerMask.height)
        ));
    });
    this.weaponTypeIcon = null;
    this.weaponTypeLabel = new PIXI.Text("loading...", {
      fontName: "Arial",
      fontSize: 20,
      lineHeight: 16,
      fill: 16763904,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.weaponTypeLabel.x = this.ox + 280;
    this.weaponTypeLabel.y = this.oy + 110;
    this.weaponTypeLabel.resolution = 2;
    this.weaponTypeContainer.addChild(this.weaponTypeLabel);
    this.weaponTypeNameText = new PIXI.Text("Name", FontStyle.SmallRankingTextOrange);
    this.weaponTypeNameText.x = this.ox + 70;
    this.weaponTypeNameText.y = this.oy + 150;
    this.weaponTypeNameText.resolution = 2;
    this.weaponTypeContainer.addChild(this.weaponTypeNameText);
    this.weaponTypeKillsText = new PIXI.Text("Kills", FontStyle.SmallRankingTextOrange);
    this.weaponTypeKillsText.x = this.ox + 390;
    this.weaponTypeKillsText.y = this.oy + 150;
    this.weaponTypeKillsText.resolution = 2;
    this.weaponTypeContainer.addChild(this.weaponTypeKillsText);
    this.weaponTypeTableContainerMask = new PIXI.Graphics();
    this.weaponTypeTableContainerMask.beginFill(16777215, 1);
    this.weaponTypeTableContainerMask.drawRect(-10, 200, 640, 350);
    this.weaponTypeTableContainerMask.endFill();
    this.weaponTypeTableContainerMask.x = 10;
    this.weaponTypeContainer.addChild(this.weaponTypeTableContainerMask);
    this.weaponTypeTableContainer = new PIXI.Container();
    this.weaponTypeTableContainer.x = 10;
    this.weaponTypeTableContainer.y = 50;
    this.weaponTypeTableContainer.mask = this.weaponTypeTableContainerMask;
    this.weaponTypeContainer.addChild(this.weaponTypeTableContainer);
    this.weaponType = new WeaponTypeStatsScrollbar(354);
    this.weaponType.x = 625;
    this.weaponType.y = 200;
    this.weaponTypeContainer.addChild(this.weaponType);
    this.weaponType.on(WeaponTypeStatsScrollbar.SCROLL, (a) => {
      this.weaponTypeTableContainer.height > this.weaponTypeTableContainerMask.height &&
        (this.weaponTypeTableContainer.y =
          -(a * (this.weaponTypeTableContainer.height - this.weaponTypeTableContainerMask.height)) +
          50);
    });
    this.container.x = 0.5 * -this.width;
    this.displaySkillRanking();
  }
  onCloseButtonReleased() {
    this.emit(Layer.Events.RANKING_CANCEL);
  }
  async show() {
    this.globalRanking.disableWheel();
    this.skillRanking.disableWheel();
    this.weaponStats.disableWheel();
    this.weaponType.disableWheel();
    switch (this.display) {
      case RankingMenu.GLOBAL_RANKING:
        this.globalRanking.enableWheel();
        break;
      case RankingMenu.SKILL_RANKING:
        this.skillRanking.enableWheel();
        break;
      case RankingMenu.WEAPON_STATS:
        this.weaponStats.enableWheel();
        break;
      case RankingMenu.WEAPON_USERS:
        this.weaponType.enableWheel();
    }
    var a = Date.now();
    if (
      !(6e4 > a - this.lastRefresh) &&
      ((this.lastRefresh = a),
      (a = await APIClient.getRanking()),
      a.success && a.level_ranking && a.skill_ranking)
    ) {
      this.globalRankingTableContainer.removeChildren();
      for (var b = 0; b < a.level_ranking.length; b++) {
        const d = a.level_ranking[b];
        var c = new GlobalRankingTableRow(b, d.id, d.name, d.level, d.experience, d.tw, d.yt);
        c.x = this.ox + 20;
        c.y = this.oy + 36 * b + 130;
        c.on("mousedown", () => {
          this.emit(Layer.Events.USER_ACCESS, d.account_id, !1);
          AudioEffects.ButtonClick.audio.play();
        });
        c.on("touchstart", () => {
          this.emit(Layer.Events.USER_ACCESS, d.account_id, !1);
          AudioEffects.ButtonClick.audio.play();
        });
        this.globalRankingTableContainer.addChild(c);
      }
      this.skillRankingTableContainer.removeChildren();
      for (b = 0; b < a.skill_ranking.length; b++) {
        const d = a.skill_ranking[b];
        c = new SkillRankingTableRow(
          b,
          d.id,
          d.name,
          Game.MapSkillToTitle(d.skill),
          Math.round(d.skill),
          d.yt,
          d.tw
        );
        c.x = this.ox + 20;
        c.y = this.oy + 36 * b + 130;
        c.on("mousedown", () => {
          this.emit(Layer.Events.USER_ACCESS, d.account_id, !1);
          AudioEffects.ButtonClick.audio.play();
        });
        c.on("touchstart", () => {
          this.emit(Layer.Events.USER_ACCESS, d.account_id, !1);
          AudioEffects.ButtonClick.audio.play();
        });
        this.skillRankingTableContainer.addChild(c);
      }
      a = await APIClient.getWeaponRanking();
      if (a.success && a.ranking)
        for (this.weaponStatsTableContainer.removeChildren(), b = 0; b < a.ranking.length; b++) {
          const d = a.ranking[b];
          c = new WeaponStatsTableRow(b, d.id, d.kills);
          c.x = this.ox - 20;
          c.y = this.oy + 42 * b + 130;
          c.on("mousedown", () => {
            this.displayWeaponUsers(d.id);
            AudioEffects.ButtonClick.audio.play();
          });
          c.on("touchstart", () => {
            this.displayWeaponUsers(d.id);
            AudioEffects.ButtonClick.audio.play();
          });
          this.weaponStatsTableContainer.addChild(c);
        }
    }
  }
  hide() {
    this.globalRanking.disableWheel();
    this.skillRanking.disableWheel();
    this.weaponStats.disableWheel();
    this.weaponType.disableWheel();
  }
  displayGlobalRanking() {
    this.globalRanking.enableWheel();
    this.skillRanking.disableWheel();
    this.weaponStats.disableWheel();
    this.weaponType.disableWheel();
    AudioEffects.ButtonClick.audio.play();
    this.globalRankingContainer.parent || this.container.addChild(this.globalRankingContainer);
    this.weaponStatsContainer.parent && this.container.removeChild(this.weaponStatsContainer);
    this.weaponTypeContainer.parent && this.container.removeChild(this.weaponTypeContainer);
    this.skillRankingContainer.parent && this.container.removeChild(this.skillRankingContainer);
    this.globalRankingButton.alpha = 1;
    this.globalRankingLabel.alpha = 1;
    this.weaponStatsButton.alpha = 0.5;
    this.weaponStatsLabel.alpha = 0.5;
    this.skillRankingButton.alpha = 0.5;
    this.skillRankingLabel.alpha = 0.5;
    this.display = RankingMenu.GLOBAL_RANKING;
  }
  displaySkillRanking() {
    this.globalRanking.disableWheel();
    this.skillRanking.enableWheel();
    this.weaponStats.disableWheel();
    this.weaponType.disableWheel();
    AudioEffects.ButtonClick.audio.play();
    this.skillRankingContainer.parent || this.container.addChild(this.skillRankingContainer);
    this.weaponTypeContainer.parent && this.container.removeChild(this.weaponTypeContainer);
    this.weaponStatsContainer.parent && this.container.removeChild(this.weaponStatsContainer);
    this.globalRankingContainer.parent && this.container.removeChild(this.globalRankingContainer);
    this.globalRankingButton.alpha = 0.5;
    this.globalRankingLabel.alpha = 0.5;
    this.weaponStatsButton.alpha = 0.5;
    this.weaponStatsLabel.alpha = 0.5;
    this.skillRankingButton.alpha = 1;
    this.skillRankingLabel.alpha = 1;
    this.display = RankingMenu.SKILL_RANKING;
  }
  displayWeaponStats() {
    this.globalRanking.disableWheel();
    this.skillRanking.disableWheel();
    this.weaponStats.enableWheel();
    this.weaponType.disableWheel();
    AudioEffects.ButtonClick.audio.play();
    this.weaponStatsContainer.parent || this.container.addChild(this.weaponStatsContainer);
    this.globalRankingContainer.parent && this.container.removeChild(this.globalRankingContainer);
    this.weaponTypeContainer.parent && this.container.removeChild(this.weaponTypeContainer);
    this.skillRankingContainer.parent && this.container.removeChild(this.skillRankingContainer);
    this.globalRankingButton.alpha = 0.5;
    this.globalRankingLabel.alpha = 0.5;
    this.weaponStatsButton.alpha = 1;
    this.weaponStatsLabel.alpha = 1;
    this.skillRankingButton.alpha = 0.5;
    this.skillRankingLabel.alpha = 0.5;
    this.display = RankingMenu.WEAPON_STATS;
  }
  async displayWeaponUsers(a) {
    this.globalRanking.disableWheel();
    this.skillRanking.disableWheel();
    this.weaponStats.disableWheel();
    this.weaponType.enableWheel();
    this.weaponTypeContainer.parent || this.container.addChild(this.weaponTypeContainer);
    this.weaponStatsContainer.parent && this.container.removeChild(this.weaponStatsContainer);
    this.weaponTypeIcon &&
      this.weaponTypeIcon.parent &&
      (this.weaponTypeContainer.removeChild(this.weaponTypeIcon), (this.weaponTypeIcon = null));
    this.weaponTypeIcon = Game.MapEventWepToIcon(a);
    this.weaponTypeIcon.x = this.ox + 190;
    this.weaponTypeIcon.y = this.oy + 130;
    var b = this.weaponTypeIcon.width,
      c = this.weaponTypeIcon.height;
    let d = b > c ? (38 < b ? 38 : b) : 32 < c ? 32 : c;
    this.weaponTypeIcon.scale.x = this.weaponTypeIcon.scale.y =
      b > c ? d / this.weaponTypeIcon.width : d / this.weaponTypeIcon.height;
    this.weaponTypeIcon.rotation = -0.2;
    this.weaponTypeContainer.addChild(this.weaponTypeIcon);
    b = Game.MapEventWepToId(a);
    b = void 0 !== ItemMap[b] ? ItemMap[b].title : a;
    this.weaponTypeLabel.text = "Loading...";
    this.weaponTypeTableContainer.removeChildren();
    a = await APIClient.getWeaponRankingType(a);
    this.weaponTypeTableContainer.removeChildren();
    this.weaponTypeLabel.text = b;
    if (a.success && a.ranking)
      for (b = 0; b < a.ranking.length; b++) {
        const e = a.ranking[b];
        c = new WeaponTypeStatsTableRow(b, e.id, e.name, e.kills);
        c.x = this.ox - 20;
        c.y = this.oy + 42 * b + 130;
        c.on("mousedown", () => {
          this.emit(Layer.Events.USER_ACCESS, e.accountId, !1);
          AudioEffects.ButtonClick.audio.play();
        });
        c.on("touchstart", () => {
          this.emit(Layer.Events.USER_ACCESS, e.accountId, !1);
          AudioEffects.ButtonClick.audio.play();
        });
        this.weaponTypeTableContainer.addChild(c);
      }
  }
}
RankingMenu.GLOBAL_RANKING = "globalRanking";
RankingMenu.SKILL_RANKING = "skillRanking";
RankingMenu.WEAPON_STATS = "weaponStats";
RankingMenu.WEAPON_USERS = "weaponUsers";
export class GlobalRankingTableRow extends PIXI.Container {
  constructor(a, b, c, d, e, f, g) {
    super();
    this.index = a;
    this.interactive = !0;
    a = Math.max(Math.floor((d / 240) * 15) + 1);
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.1);
    this.background.drawRect(-10, 2, 560, 32);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    });
    this.addChild(this.background);
    this.icon = new PIXI.Sprite(App.CombinedTextures["skill_icon_" + a]);
    this.icon.x = -48;
    this.icon.y = -2;
    this.icon.scale.x = this.icon.scale.y = 0.5;
    this.addChild(this.icon);
    this.rankText = new PIXI.Text(b, FontStyle.RankingItem);
    this.rankText.x = 0;
    this.rankText.y = 9;
    this.rankText.hitArea = new PIXI.Rectangle();
    this.rankText.tint = 16763904;
    this.rankText.resolution = 2;
    this.addChild(this.rankText);
    this.nameText = new PIXI.Text(c, FontStyle.RankingItem);
    this.nameText.x = 40;
    this.nameText.y = 9;
    this.nameText.hitArea = new PIXI.Rectangle();
    this.nameText.resolution = 2;
    this.addChild(this.nameText);
    this.levelText = new PIXI.Text(numberWithPeriods(d), FontStyle.RankingItem);
    this.levelText.x = 220;
    this.levelText.y = 9;
    this.levelText.hitArea = new PIXI.Rectangle();
    this.levelText.resolution = 2;
    this.addChild(this.levelText);
    this.experienceText = new PIXI.Text(numberWithPeriods(e), FontStyle.RankingItem);
    this.experienceText.x = 340;
    this.experienceText.y = 9;
    this.experienceText.hitArea = new PIXI.Rectangle();
    this.experienceText.resolution = 2;
    this.addChild(this.experienceText);
    this.ytIcon = new PIXI.Sprite(App.CombinedTextures.youtube_logo);
    this.ytIcon.scale.x = this.ytIcon.scale.y = 0.4;
    this.ytIcon.x = 478;
    this.ytIcon.y = 9;
    this.addChild(this.ytIcon);
    "" !== g
      ? ((this.ytIcon.interactive = !0),
        (this.ytIcon.alpha = 0.8),
        this.ytIcon.on("mouseover", () => (this.ytIcon.alpha = 1)),
        this.ytIcon.on("mouseout", () => (this.ytIcon.alpha = 0.8)),
        this.ytIcon.on("mousedown", (h) => {
          window.open(g, "_blank");
          h.stopPropagation();
        }),
        this.ytIcon.on("touchstart", (h) => {
          window.open(g, "_blank");
          h.stopPropagation();
        }))
      : (this.ytIcon.alpha = 0.1);
    this.twIcon = new PIXI.Sprite(App.CombinedTextures.twitch_logo);
    this.twIcon.scale.x = this.twIcon.scale.y = 0.6;
    this.twIcon.x = 516;
    this.twIcon.y = 5;
    this.addChild(this.twIcon);
    "" !== f
      ? ((this.twIcon.interactive = !0),
        this.twIcon.on("mouseover", () => (this.twIcon.alpha = 1)),
        this.twIcon.on("mouseout", () => (this.twIcon.alpha = 0.8)),
        this.twIcon.on("mousedown", (h) => {
          window.open(f, "_blank");
          h.stopPropagation();
        }),
        this.twIcon.on("touchstart", (h) => {
          window.open(f, "_blank");
          h.stopPropagation();
        }))
      : (this.twIcon.alpha = 0.1);
    App.WhiteLabel === App.WhiteLabel_POKI &&
      ((this.ytIcon.interactive = !1),
      (this.ytIcon.alpha = 0.1),
      (this.twIcon.interactive = !1),
      (this.twIcon.alpha = 0.1));
  }
}
export class GlobalRankingScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
    this.scrollButton.endFill();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      -3 > b ? (b = -3) : b > this.h - 39 && (b = this.h - 39);
      let c = this.h / (this.h - 39);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(GlobalRankingScrollbar.SCROLL, (1 / this.h) * (b + 3) * c);
    }
  }
  reset() {
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
GlobalRankingScrollbar.SCROLL = "scroll";
export class SkillRankingTableRow extends PIXI.Container {
  constructor(a, b, c, d, e, f = "", g = "") {
    super();
    this.index = a;
    this.interactive = !0;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.1);
    this.background.drawRect(-10, 2, 560, 32);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    });
    this.addChild(this.background);
    this.ratingIcon = new PIXI.Sprite(
      App.CombinedTextures["rank_icon_" + (Game.MapSkillToIndex(e) + 1)]
    );
    this.ratingIcon.x = -28;
    this.ratingIcon.y = 20;
    this.ratingIcon.scale.x = this.ratingIcon.scale.y = 0.6;
    this.ratingIcon.anchor.x = this.ratingIcon.anchor.y = 0.5;
    this.addChild(this.ratingIcon);
    this.rankText = new PIXI.Text((a + 1).toString(), FontStyle.RankingItem);
    this.rankText.x = 0;
    this.rankText.y = 9;
    this.rankText.tint = 16763904;
    this.rankText.resolution = 2;
    this.rankText.hitArea = new PIXI.Rectangle();
    this.addChild(this.rankText);
    this.nameText = new PIXI.Text(c, FontStyle.RankingItem);
    this.nameText.x = 40;
    this.nameText.y = 9;
    this.nameText.resolution = 2;
    this.nameText.hitArea = new PIXI.Rectangle();
    this.addChild(this.nameText);
    this.titleText = new PIXI.Text(d, FontStyle.RankingItem);
    this.titleText.x = 232;
    this.titleText.y = 9;
    this.titleText.resolution = 2;
    this.titleText.hitArea = new PIXI.Rectangle();
    this.addChild(this.titleText);
    this.skillText = new PIXI.Text(numberWithPeriods(e), FontStyle.RankingItem);
    this.skillText.x = 372;
    this.skillText.y = 9;
    this.skillText.resolution = 2;
    this.skillText.hitArea = new PIXI.Rectangle();
    this.addChild(this.skillText);
    this.ytIcon = new PIXI.Sprite(App.CombinedTextures.youtube_logo);
    this.ytIcon.scale.x = this.ytIcon.scale.y = 0.4;
    this.ytIcon.x = 478;
    this.ytIcon.y = 9;
    this.addChild(this.ytIcon);
    "" !== f
      ? ((this.ytIcon.interactive = !0),
        (this.ytIcon.alpha = 0.8),
        this.ytIcon.on("mouseover", () => (this.ytIcon.alpha = 1)),
        this.ytIcon.on("mouseout", () => (this.ytIcon.alpha = 0.8)),
        this.ytIcon.on("mousedown", (h) => {
          window.open(f, "_blank");
          h.stopPropagation();
        }),
        this.ytIcon.on("touchstart", (h) => {
          window.open(f, "_blank");
          h.stopPropagation();
        }))
      : (this.ytIcon.alpha = 0.1);
    this.twIcon = new PIXI.Sprite(App.CombinedTextures.twitch_logo);
    this.twIcon.scale.x = this.twIcon.scale.y = 0.6;
    this.twIcon.x = 516;
    this.twIcon.y = 5;
    this.addChild(this.twIcon);
    "" !== g
      ? ((this.twIcon.interactive = !0),
        this.twIcon.on("mouseover", () => (this.twIcon.alpha = 1)),
        this.twIcon.on("mouseout", () => (this.twIcon.alpha = 0.8)),
        this.twIcon.on("mousedown", (h) => {
          window.open(g, "_blank");
          h.stopPropagation();
        }),
        this.twIcon.on("touchstart", (h) => {
          window.open(g, "_blank");
          h.stopPropagation();
        }))
      : (this.twIcon.alpha = 0.1);
    App.WhiteLabel === App.WhiteLabel_POKI &&
      ((this.ytIcon.interactive = !1),
      (this.ytIcon.alpha = 0.1),
      (this.twIcon.interactive = !1),
      (this.twIcon.alpha = 0.1));
  }
}
export class SkillRankingScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      -3 > b ? (b = -3) : b > this.h - 39 && (b = this.h - 39);
      let c = this.h / (this.h - 39);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(SkillRankingScrollbar.SCROLL, (1 / this.h) * (b + 3) * c);
    }
  }
  reset() {
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
SkillRankingScrollbar.SCROLL = "scroll";
export class WeaponStatsTableRow extends PIXI.Container {
  constructor(a, b, c) {
    super();
    var d = Game.MapEventWepToId(b);
    this.id = d;
    d = void 0 !== ItemMap[d] ? ItemMap[d].title : this.id;
    this.index = a.toString();
    this.interactive = !0;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.1);
    this.background.drawRect(-10, 2, 590, 38);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    });
    this.addChild(this.background);
    this.icon = Game.MapEventWepToIcon(b);
    this.icon.x = 20;
    this.icon.y = 23;
    this.icon.hitArea = new PIXI.Rectangle();
    a = this.icon.width;
    b = this.icon.height;
    let e = a > b ? (24 < a ? 24 : a) : 12 < b ? 12 : b;
    this.icon.scale.x = this.icon.scale.y = a > b ? e / this.icon.width : e / this.icon.height;
    this.icon.rotation = -0.2;
    this.addChild(this.icon);
    this.nameText = new PIXI.Text(d, FontStyle.RankingItem);
    this.nameText.x = 86;
    this.nameText.y = 10;
    this.nameText.tint = 16763904;
    this.nameText.hitArea = new PIXI.Rectangle();
    this.nameText.resolution = 2;
    this.addChild(this.nameText);
    this.killsText = new PIXI.Text(numberWithPeriods(c), FontStyle.RankingItem);
    this.killsText.x = 400;
    this.killsText.y = 10;
    this.killsText.hitArea = new PIXI.Rectangle();
    this.killsText.resolution = 2;
    this.addChild(this.killsText);
  }
}
export class WeaponStatsScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      -3 > b ? (b = -3) : b > this.h - 39 && (b = this.h - 39);
      let c = this.h / (this.h - 39);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(WeaponStatsScrollbar.SCROLL, (1 / this.h) * (b + 3) * c);
    }
  }
  reset() {
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
WeaponStatsScrollbar.SCROLL = "scroll";
export class WeaponTypeStatsTableRow extends PIXI.Container {
  constructor(a, b, c, d) {
    super();
    this.index = a;
    this.interactive = !0;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.1);
    this.background.drawRect(-10, 2, 590, 38);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    });
    this.addChild(this.background);
    this.icon = new PIXI.Sprite();
    this.icon.x = 12;
    this.icon.y = 23;
    a = this.icon.width;
    b = this.icon.height;
    let e = a > b ? (24 < a ? 24 : a) : 12 < b ? 12 : b;
    this.icon.scale.x = this.icon.scale.y = a > b ? e / this.icon.width : e / this.icon.height;
    this.icon.rotation = -0.2;
    this.addChild(this.icon);
    this.indexText = new PIXI.Text((this.index + 1).toString(), FontStyle.RankingItem);
    this.indexText.x = 20;
    this.indexText.y = 10;
    this.indexText.tint = 16763904;
    this.indexText.hitArea = new PIXI.Rectangle();
    this.indexText.resolution = 2;
    this.addChild(this.indexText);
    this.nameText = new PIXI.Text(c, FontStyle.RankingItem);
    this.nameText.x = 78;
    this.nameText.y = 10;
    this.nameText.tint = 16763904;
    this.nameText.hitArea = new PIXI.Rectangle();
    this.nameText.resolution = 2;
    this.addChild(this.nameText);
    this.killsText = new PIXI.Text(numberWithPeriods(d), FontStyle.RankingItem);
    this.killsText.x = 400;
    this.killsText.y = 10;
    this.killsText.hitArea = new PIXI.Rectangle();
    this.killsText.resolution = 2;
    this.addChild(this.killsText);
  }
}
export class WeaponTypeStatsScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      -3 > b ? (b = -3) : b > this.h - 39 && (b = this.h - 39);
      let c = this.h / (this.h - 39);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(WeaponTypeStatsScrollbar.SCROLL, (1 / this.h) * (b + 3) * c);
    }
  }
  reset() {
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
WeaponTypeStatsScrollbar.SCROLL = "scroll";
var newsmenu = {};
export class NewsMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.container.addChild(this.background);
    this.ox = 20;
    this.oy = 60;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy - 6;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.NEWS_CANCEL));
    this.container.addChild(this.closeButton);
    this.newsTitle = new PIXI.Text("News", FontStyle.MediumOrangeText);
    this.newsTitle.x = 0.5 * this.width - 20;
    this.newsTitle.y = this.oy - 4;
    this.newsTitle.anchor.x = 0.5;
    this.newsTitle.resolution = 2;
    this.container.addChild(this.newsTitle);
    this.container.x = 0.5 * -this.width;
    this.newsItemContainer = new PIXI.Container();
    this.newsItemContainer.x = this.ox;
    this.newsItemContainer.y = this.oy + 50;
    this.container.addChild(this.newsItemContainer);
  }
  async show() {
    const a = await APIClient.getNews();
    this.newsItemContainer.removeChildren();
    let b = 0;
    for (let d = 0; d < a.length; d++) {
      var c = a[d];
      c = new NewsItem(c.title, c.message, c.created);
      c.x = 5;
      c.y = b;
      this.newsItemContainer.addChild(c);
      b += c.height + 10;
    }
  }
}
export class NewsItem extends PIXI.Container {
  constructor(a, b, c) {
    super();
    c = new Date(Date.parse(c));
    const d = c.getDate().toString().padStart(2, "0"),
      e = (c.getMonth() + 1).toString().padStart(2, "0"),
      f = c.getFullYear();
    c = Date.now() - 864e5 < c.getTime() ? "Today" : d + "-" + e + "-" + f;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 0;
    this.addChild(this.background);
    this.title = new PIXI.Text(c + " - " + a, {
      fontName: "Arial",
      fontSize: 17,
      lineHeight: 16,
      fill: 16746496,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.title.x = 10;
    this.title.y = 0;
    this.title.tint = 16746496;
    this.title.resolution = 2;
    this.addChild(this.title);
    this.message = new PIXI.Text(b, {
      fontName: "Arial",
      fontSize: 14,
      fill: 13421772,
      strokeThickness: 3,
      lineJoin: "round",
      wordWrap: !0,
      wordWrapWidth: 580,
    });
    this.message.x = 10;
    this.message.y = 30;
    this.message.tint = 16777215;
    this.message.resolution = 2;
    this.addChild(this.message);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRoundedRect(0, -10, 600, this.height + 20, 8);
    this.background.endFill();
  }
}
var pvpmenu = {};
export class PVPMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504);
    this.background.endFill();
    this.background.beginFill(2105376, 1);
    this.background.drawRect(18, 140, 624, 245);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(18, 87, 624, 44, 10);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.background.alpha = 0.9;
    this.container.addChild(this.background);
    this.ox = 20;
    this.oy = 60;
    this.startCount = 0;
    this.initializingMatch = this.startingMatch = this.findingMatch = this.errorState = !1;
    this.startInterval = null;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy - 6;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.PVP_CANCEL));
    this.container.addChild(this.closeButton);
    this.pvpTitle = new PIXI.Text("Matchmaking - 1 vs 1 - Ranked", FontStyle.MediumOrangeText);
    this.pvpTitle.x = 0.5 * this.width - 20;
    this.pvpTitle.y = this.oy - 4;
    this.pvpTitle.anchor.x = 0.5;
    this.pvpTitle.resolution = 2;
    this.container.addChild(this.pvpTitle);
    this.container.x = 0.5 * -this.width;
    this.matchButton = new Button(
      "match",
      App.CombinedTextures.match_button,
      App.CombinedTextures.match_button_hover
    );
    this.matchButton.scale.x = this.matchButton.scale.y = 0.7;
    this.matchButton.x = this.ox + 4 + 0.5 * (this.width - this.matchButton.width) - 25;
    this.matchButton.y = this.oy + 400;
    this.matchButton.selected = !0;
    this.matchButton.setText("");
    this.container.addChild(this.matchButton);
    this.matchButton.addListener(Button.BUTTON_RELEASED, this.onMatchButtonReleased.bind(this));
    this.cancelButton = new Button("cancel");
    this.cancelButton.selected = !0;
    this.cancelButton.setText("Cancel search");
    this.cancelButton.scale.x = this.cancelButton.scale.y = 0.8;
    this.cancelButton.addListener(Button.BUTTON_RELEASED, this.onCancelButtonReleased.bind(this));
    this.cancelButton.x =
      this.matchButton.x + 0.5 * (this.matchButton.width - this.cancelButton.width);
    this.cancelButton.y =
      this.matchButton.y + 0.5 * (this.matchButton.height - this.cancelButton.height);
    this.cancelButton.setTint(16763904);
    this.container.addChild(this.cancelButton);
    this.cancelButton.visible = !1;
    this.vsText = new PIXI.Text("VS", FontStyle.VSText);
    this.vsText.x = 0.5 * this.background.width;
    this.vsText.y = this.oy + 230;
    this.vsText.anchor.x = 0.5;
    this.vsText.resolution = 2;
    this.vsText.alpha = 0.5;
    this.container.addChild(this.vsText);
    this.loadingText = new PIXI.Text("Connecting..", FontStyle.VSLoadingText);
    this.loadingText.x = 0.5 * this.background.width;
    this.loadingText.y = this.oy + 330;
    this.loadingText.anchor.x = 0.5;
    this.loadingText.resolution = 2;
    this.loadingText.alpha = 1;
    this.loadingText.visible = !1;
    this.container.addChild(this.loadingText);
    this.rulesText = new PIXI.Text("Read the rules", FontStyle.VSRulesText);
    this.rulesText.x = 0.5 * this.background.width;
    this.rulesText.y = this.oy + 374;
    this.rulesText.anchor.x = 0.5;
    this.rulesText.resolution = 2;
    this.rulesText.alpha = 1;
    this.rulesText.tint = 16755200;
    this.rulesText.interactive = !0;
    this.rulesText.on("mouseover", () => (this.rulesText.tint = 16777215));
    this.rulesText.on("mouseout", () => (this.rulesText.tint = 16755200));
    this.rulesText.on("mousedown", () => {
      this.rulesText.tint = 16777215;
      this.rulesPanel.parent
        ? (this.container.removeChild(this.rulesPanel),
          this.container.removeChild(this.rulesTextDesc),
          this.container.removeChild(this.rulesTextTitle),
          (this.rulesText.text = "Read the rules"))
        : (this.displayRules(), (this.rulesText.text = "Hide the rules"));
    });
    this.container.addChild(this.rulesText);
    this.rulesPanel = new PIXI.Graphics();
    this.rulesPanel.lineStyle(1, 16777215, 0.1, 0);
    this.rulesPanel.beginFill(3355443, 0.9);
    this.rulesPanel.drawRect(0, 80, 460, 224);
    this.rulesPanel.endFill();
    this.rulesPanel.beginFill(0, 0.3);
    this.rulesPanel.drawRect(10, 90, 440, 204, 10);
    this.rulesPanel.endFill();
    this.rulesPanel.beginFill(0, 0.3);
    this.rulesPanel.drawRect(10, 90, 440, 204);
    this.rulesPanel.endFill();
    this.rulesPanel.x = 0.5 * (this.background.width - this.rulesPanel.width);
    this.rulesPanel.y = 0.4 * (this.background.height - this.rulesPanel.height);
    this.rulesPanel.interactive = !0;
    this.rulesPanel.on("mousedown", () => {
      this.rulesText.text = "Read the rules";
      this.container.removeChild(this.rulesTextDesc);
      this.container.removeChild(this.rulesTextTitle);
      this.container.removeChild(this.rulesPanel);
    });
    this.rulesTextTitle = new PIXI.Text("Rules", FontStyle.VSRulesTextItalic);
    this.rulesTextTitle.x = 0.5 * (this.background.width - this.rulesTextTitle.width);
    this.rulesTextTitle.y = 0.44 * (this.background.height - this.rulesTextTitle.height);
    this.rulesTextTitle.resolution = 2;
    this.rulesTextTitle.alpha = 1;
    this.rulesTextTitle.tint = 16763904;
    this.rulesTextTitle.hitArea = new PIXI.Rectangle();
    this.rulesTextDesc = new PIXI.Text(
      "The first player to get 10 kills wins\n\nIf time runs out, the player with the most kills wins\n\nYou leave = you lose!\n\nCheating is not allowed\n\nBehave and be respectful",
      FontStyle.VSRulesDescText
    );
    this.rulesTextDesc.x = 0.5 * (this.background.width - this.rulesTextDesc.width);
    this.rulesTextDesc.y = 0.67 * (this.background.height - this.rulesTextDesc.height);
    this.rulesTextDesc.resolution = 2;
    this.rulesTextDesc.alpha = 1;
    this.rulesTextDesc.hitArea = new PIXI.Rectangle();
    this.startingText = new PIXI.Text("Starting match..", FontStyle.VSStartingText);
    this.startingText.x = 0.5 * this.background.width;
    this.startingText.y = this.oy + 410;
    this.startingText.anchor.x = 0.5;
    this.startingText.resolution = 2;
    this.startingText.alpha = 1;
    this.startingText.visible = !1;
    this.container.addChild(this.startingText);
    this.counterText = new PIXI.Text("3", FontStyle.VSCounterText);
    this.counterText.x = 0.5 * this.background.width;
    this.counterText.y = this.oy + 180;
    this.counterText.anchor.x = 0.5;
    this.counterText.anchor.y = 0.5;
    this.counterText.resolution = 2;
    this.counterText.alpha = 1;
    this.container.addChild(this.counterText);
    this.regionList = new Dropdown("regionSelect", "Region", 200, 200, !0);
    this.regionList.addListener(Button.BUTTON_RELEASED, (a) =>
      this.onRegionListSelect(a.data.value)
    );
    this.regionList.x = this.ox + 4;
    this.regionList.y = this.oy + 80;
    this.regionList.addItem(
      "Europe",
      ServerListMenu.REGION_EU_WEST,
      "",
      App.CombinedTextures.globe_eu,
      0.4,
      4
    );
    this.regionList.scale.x = this.regionList.scale.y = 0.9;
    this.modeList = new Dropdown("modeSelect", "Mode", 200, 200, !0);
    this.modeList.addListener(Button.BUTTON_RELEASED, (a) => this.onModeListSelect(a.data.value));
    this.modeList.x = this.ox + 300;
    this.modeList.y = this.oy + 80;
    this.modeList.addItem(
      "1 vs 1",
      ServerListMenu.MODE_1V1,
      "",
      App.CombinedTextures.dm_icon_notxt
    );
    this.modeList.scale.x = this.modeList.scale.y = 0.9;
    this.visualizer1 = new Visualizer(176, 176, !1, !1, !0);
    this.visualizer1.scale.x = -0.7;
    this.visualizer1.scale.y = 0.7;
    this.visualizer1.x = 260;
    this.visualizer1.y = 230;
    this.container.addChild(this.visualizer1);
    this.p1Name = new PIXI.Text("", FontStyle.VSPlayerLabelText);
    this.p1Name.x = this.visualizer1.x - 60;
    this.p1Name.y = this.visualizer1.y - 40;
    this.p1Name.anchor.x = 0.5;
    this.p1Name.resolution = 2;
    this.container.addChild(this.p1Name);
    this.shadow1 = new PIXI.Graphics();
    this.shadow1.beginFill(16777215, 0.05);
    this.shadow1.drawCircle(0, 0, 50);
    this.shadow1.endFill();
    this.shadow1.x = this.visualizer1.x - 70;
    this.shadow1.y = this.visualizer1.y + 150;
    this.container.addChild(this.shadow1);
    this.visualizer2 = new Visualizer(176, 176, !1, !1, !0, "bravo");
    this.visualizer2.scale.x = 0.7;
    this.visualizer2.scale.y = 0.7;
    this.visualizer2.x = 400;
    this.visualizer2.y = 230;
    this.visualizer2.visible = !1;
    this.container.addChild(this.visualizer2);
    this.p2Name = new PIXI.Text("", FontStyle.VSPlayerLabelText);
    this.p2Name.x = this.visualizer2.x + 60;
    this.p2Name.y = this.visualizer2.y - 40;
    this.p2Name.anchor.x = 0.5;
    this.p2Name.resolution = 2;
    this.container.addChild(this.p2Name);
    this.shadow2 = new PIXI.Graphics();
    this.shadow2.beginFill(16777215, 0.05);
    this.shadow2.drawCircle(0, 0, 50);
    this.shadow2.endFill();
    this.shadow2.x = this.visualizer2.x + 70;
    this.shadow2.y = this.visualizer2.y + 150;
    this.shadow2.visible = !1;
    this.container.addChild(this.shadow2);
    this.ninjaSprite = new PIXI.Sprite(App.CombinedTextures.mystery_ninja);
    this.ninjaSprite.x = this.visualizer2.x + 20;
    this.ninjaSprite.y = this.visualizer2.y + 10;
    this.ninjaSprite.scale.x = this.ninjaSprite.scale.y = 0.4;
    this.ninjaSprite.alpha = 0.8;
    this.container.addChild(this.ninjaSprite);
    this.container.addChild(this.regionList);
    this.container.addChild(this.modeList);
    this.particleContainer = new ParticleContainer();
    this.container.addChild(this.particleContainer);
    this.particles = [];
    this.fxCounter = 0;
    this.disconnectTimeout = null;
  }
  displayRules() {
    this.container.addChild(this.rulesPanel);
    this.container.addChild(this.rulesTextDesc);
    this.container.addChild(this.rulesTextTitle);
  }
  hide() {
    super.hide();
    this.findingMatch && !this.startingMatch && App.PVPClient.disconnect();
  }
  async show() {
    super.show();
    this.p1Name.text = App.Credential.username;
    this.p2Name.text = "";
    this.visualizer1.applyCustomization(App.Credential.customization);
    this.visualizer2.visible = !1;
    this.matchButton.enable();
    this.regionList.enable();
    this.modeList.enable();
    this.matchButton.visible = !0;
    this.startingText.visible = !1;
    this.loadingText.visible = !1;
    this.loadingText.text = "Finding opponent..";
    this.loadingText.text = "Connecting..";
    this.cancelButton.visible = !0;
    this.startingMatch = this.findingMatch = !1;
    this.cancelButton.visible = !1;
    this.counterText.visible = !1;
    this.ninjaSprite.visible = !0;
    this.shadow2.visible = !1;
    this.closeButton.visible = !0;
    this.initializingMatch = !1;
    this.selectedRegion =
      null !== App.SelectedServer ? App.SelectedServer.region : ServerListMenu.REGION_NA_EAST;
    this.regionList.setValue(this.selectedRegion);
  }
  update() {
    this.visualizer1.update();
    this.visualizer2.update();
    var a = Math.sin(0.04 * this.visualizer1.time + Math.PI),
      b = 0.15 * (a + 4);
    this.shadow1.alpha = 0.5 + 0.25 * (a + 1);
    this.shadow1.scale.x = b;
    this.shadow1.scale.y = 0.5 * b;
    this.p1Name.y = this.visualizer1.y - 40 + 20 * b;
    this.startingMatch &&
      0 < this.counterText.scale.x &&
      ((this.counterText.scale.x -= 0.03),
      (this.counterText.scale.y -= 0.03),
      (this.counterText.alpha -= 0.03));
    this.shadow2.visible &&
      ((a = Math.sin(0.04 * this.visualizer2.time + Math.PI)),
      (b = 0.15 * (a + 4)),
      (this.shadow2.alpha = 0.5 + 0.25 * (a + 1)),
      (this.shadow2.scale.x = b),
      (this.shadow2.scale.y = 0.5 * b));
    this.p2Name.y = this.visualizer2.y - 40 + 20 * b;
    if (0 < this.fxCounter) {
      for (a = 0; 4 > a; a++) {
        var c = ((2 * Math.PI) / 10) * a + 0.1 * App.Time;
        b = ParticleEffects.PVPMatch;
        b.x = this.visualizer2.x + 60;
        b.y = this.visualizer2.y + 60;
        b.vx = 3 * Math.cos(c);
        b.vy = 3 * Math.sin(c);
        b.vr = -0.3 + 0.6 * Math.random();
        b.a = 0.7;
        b.tt = 0.1 > Math.random() ? 16777215 : 16711680;
        c = b.s;
        b.s = 0.5 + 0.05 * this.fxCounter;
        this.particleContainer.spawn(b);
        b.s = c;
      }
      this.fxCounter--;
    } else
      this.findingMatch &&
        ((b = ((2 * Math.PI) / 10) * (App.Time % 10)),
        (a = ParticleEffects.RandomGlitter),
        (a.x = this.visualizer2.x + 60 + 60 * Math.cos(b)),
        (a.y = this.visualizer2.y + 65 + 60 * Math.sin(b)),
        (a.vx = Math.cos(b + 0.5 * Math.PI)),
        (a.vy = Math.sin(b + 0.5 * Math.PI)),
        (a.vr = -0.3 + 0.6 * Math.random()),
        (a.a = 1),
        (a.tt = 16777215),
        (b = a.s),
        (a.s = 0.5),
        this.particleContainer.spawn(a),
        (a.s = b));
    this.particleContainer.update();
  }
  displayMatch(a) {
    if (void 0 !== a) {
      var b = a.type;
      a = a.data;
      this.initializingMatch ||
        ((this.closeButton.visible = !1),
        this.emit(Layer.Events.PVP_START_COUNTDOWN),
        (this.initializingMatch = !0));
      this.cancelButton.visible = !1;
      switch (b) {
        case PVPClient.MATCH:
          this.loadingText.text = "Opponent found! Configuring..";
          return;
        case PVPClient.MATCH_REGISTERED:
          this.loadingText.text = "Creating game..";
          return;
        case PVPClient.MATCH_ERROR:
          this.errorState = !0;
          this.loadingText.tint = 16711680;
          this.loadingText.text = "Match aborted. " + (a.error ? a.error : " Try again.");
          App.PVPClient.disconnect();
          this.initializingMatch = !1;
          this.closeButton.visible = !0;
          this.emit(Layer.Events.PVP_CANCEL_COUNTDOWN);
          return;
      }
      AudioEffects.Match.audio.play();
      this.startingMatch = !0;
      this.startCount = 5;
      App.PVPClient.disconnect();
      this.findingMatch = !1;
      this.visualizer1.applyCustomization(App.Credential.customization);
      this.visualizer2.applyCustomization(a.opponents[0].customization);
      this.p2Name.text = a.opponents[0].name;
      this.ninjaSprite.visible = !1;
      this.visualizer2.visible = !0;
      this.startingText.visible = !0;
      this.cancelButton.visible = !1;
      this.closeButton.visible = !1;
      this.counterText.visible = !0;
      this.shadow2.visible = !0;
      this.vsText.alpha = 1;
      this.loadingText.text = "Starting game..";
      this.counterText.text = this.startCount.toString();
      this.fxCounter = 25;
      this.counterText.scale.x = this.counterText.scale.y = 1;
      this.counterText.alpha = 1;
      null !== this.startInterval && clearInterval(this.startInterval);
      this.startInterval = setInterval(this.onStartCount.bind(this, a), 1e3);
    }
  }
  onStartCount(a) {
    this.counterText.scale.x = this.counterText.scale.y = 1;
    this.counterText.alpha = 1;
    0 >= --this.startCount &&
      (null !== this.startInterval &&
        (clearInterval(this.startInterval), (this.startInterval = null)),
      this.emit(Layer.Events.PVP_START, a),
      (this.visualizer2.visible = !1),
      (App.DisplayMatchResultID = a.game_id));
    this.counterText.text = this.startCount.toString();
  }
  onRegionListSelect(a) {
    this.selectedRegion = a;
  }
  onMatchButtonReleased() {
    this.regionList.disable();
    this.modeList.disable();
    this.startingMatch = !1;
    this.loadingText.visible = !0;
    this.loadingText.tint = 16777215;
    this.matchButton.disable();
    this.loadingText.text = "Connecting..";
    this.emit(Layer.Events.PVP_CONNECT);
  }
  attemptConnect() {
    App.PVPClient.connect() ||
      ((this.loadingText.tint = 16711680),
      (this.loadingText.text = "Unable to connect. Try again later."));
  }
  onCancelButtonReleased() {
    App.PVPClient.disconnect();
  }
  onPVPClientConnect() {
    this.matchButton.visible = !1;
    this.findingMatch = !0;
    this.cancelButton.visible = !0;
    this.matchButton.disable();
    this.regionList.disable();
    this.modeList.disable();
    this.loadingText.text = "Finding opponent..";
    App.PVPClient.emit({ type: 1, region: this.selectedRegion });
  }
  onPVPClientDisconnect(a) {
    a &&
      null !== a.data &&
      ((this.errorState = !0),
      (this.loadingText.text = a.data),
      (this.loadingText.tint = 16711680));
    this.findingMatch = !1;
    this.cancelButton.visible = !1;
    this.startingMatch ||
      ((this.matchButton.visible = !0),
      this.matchButton.enable(),
      this.regionList.enable(),
      this.modeList.enable());
    this.errorState
      ? ((this.loadingText.visible = !0), (this.errorState = !1))
      : (this.loadingText.visible = !1);
  }
  onPVPConnectionError() {
    this.loadingText.text = "Connection failed.";
    this.loadingText.tint = 16711680;
    this.errorState = !0;
    this.startingMatch = !1;
    this.loadingText.visible = !0;
    null !== this.disconnectTimeout &&
      (clearTimeout(this.disconnectTimeout), (this.disconnectTimeout = null));
    this.disconnectTimeout = setTimeout(() => {
      this.onPVPClientDisconnect();
      this.disconnectTimeout = null;
    }, 3e3);
  }
}
var partnermenu = {};
export class PartnerMenu extends Feature {
  constructor() {
    super();
    this.partners = [
      { title: "crazygames.com", url: "https://www.crazygames.com/c/io" },
      { title: "silvergames.com", url: "https://www.silvergames.com/" },
      { title: "pacogames.com", url: "https://www.pacogames.com/" },
      { title: "iogames.space", url: "https://www.iogames.space/" },
      { title: "gametop.com", url: "https://www.gametop.com/" },
    ];
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.container.addChild(this.background);
    this.ox = 20;
    this.oy = 60;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy - 6;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.PARTNER_CANCEL));
    this.container.addChild(this.closeButton);
    this.partnerTitle = new PIXI.BitmapText("Partners", { fontName: "Open Sans", fontSize: 30 });
    this.partnerTitle.x = 0.5 * this.width;
    this.partnerTitle.y = this.oy;
    this.partnerTitle.anchor.x = 0.5;
    this.partnerTitle.tint = 16763904;
    this.container.addChild(this.partnerTitle);
    this.container.x = 0.5 * -this.width;
    for (let a = 0; a < this.partners.length; a++) {
      let b = this.partners[a],
        c = new PIXI.BitmapText(b.title, { fontName: "Open Sans", fontSize: 26 });
      c.x = 0.5 * this.width;
      c.y = this.oy + 44 * a + 92;
      c.anchor.x = 0.5;
      c.tint = 16763904;
      c.interactive = !0;
      c.hitArea = new PIXI.Rectangle(0.5 * -c.width, 8, c.width, c.height);
      c.on("mouseover", () => {
        c.scale.x = c.scale.y = 1.1;
      });
      c.on("mouseout", () => {
        c.scale.x = c.scale.y = 1;
      });
      c.on("mousedown", () => window.open(b.url, "_blank"));
      this.background.beginFill(16777215, 0.1);
      this.background.drawRect(200, this.oy + 44 * (a + 1) + 2, 260, 40);
      this.background.endFill();
      this.container.addChild(c);
    }
  }
  show() {}
}
var serverlistmenu = {};
export class ServerListMenu extends Feature {
  constructor() {
    super();
    this.oy = this.ox = 20;
    this.gameList = [];
    this.activeMode = ServerListMenu.MODE_ALL;
    this.activeRegion = ServerListMenu.REGION_ALL;
    this.activePrivate = ServerListMenu.PRIVATE_ALL;
    this.activeRanked = ServerListMenu.RANKED_ALL;
    this.activeCustom = ServerListMenu.CUSTOM_ALL;
    this.sortedCol = ServerListMenu.COL_PLAYERS;
    this.playerSort = this.nameSort = this.regionSort = this.modeSort = ServerListMenu.SORT_DEFAULT;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504);
    this.background.endFill();
    this.background.beginFill(2105376, 1);
    this.background.drawRect(15, 120, 628, 345);
    this.background.endFill();
    this.background.lineStyle(1, 16777215, 0.25);
    this.background.moveTo(18, this.oy + 125);
    this.background.lineTo(612, this.oy + 125);
    this.container.addChild(this.background);
    this.container.x = 0.5 * -this.width;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.SERVER_LIST_CANCEL));
    this.container.addChild(this.closeButton);
    this.serverListingTitle = new PIXI.Text("Game list", FontStyle.MediumOrangeText);
    this.serverListingTitle.x = this.ox;
    this.serverListingTitle.y = this.oy + 40;
    this.serverListingTitle.resolution = 2;
    this.container.addChild(this.serverListingTitle);
    this.passwordLabel = new PIXI.Text("Password", {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 16,
      fill: 16763904,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.passwordLabel.x = this.ox + 267;
    this.passwordLabel.y = this.oy + 107;
    this.passwordLabel.resolution = 2;
    this.container.addChild(this.passwordLabel);
    this.passwordField = new InputField("password");
    this.passwordField.setDimensions(110, 35);
    this.passwordField.forceLowerCase = !1;
    this.passwordField.setMaxChars(8);
    this.passwordField.x = this.ox + 346;
    this.passwordField.y = this.oy + 100;
    this.passwordField.setPassword(!0);
    this.passwordField.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
    this.container.addChild(this.passwordField);
    this.filterPrivate = new Checkbox("private", "Private", !0);
    this.filterPrivate.x = this.ox + 502;
    this.filterPrivate.y = this.oy + 50;
    this.filterPrivate.scale.x = this.filterPrivate.scale.y = 0.9;
    this.filterPrivate.on(Checkbox.CHANGE, (a) =>
      this.filter(
        this.activeMode,
        this.activeRegion,
        a ? ServerListMenu.PRIVATE_ALL : !1,
        this.activeRanked,
        this.activeCustom
      )
    );
    this.container.addChild(this.filterPrivate);
    this.privateIcon = new PIXI.Sprite(App.CombinedTextures.lock_icon);
    this.privateIcon.x = this.ox + 470;
    this.privateIcon.y = this.filterPrivate.y - 3;
    this.privateIcon.scale.x = this.privateIcon.scale.y = 0.4;
    this.container.addChild(this.privateIcon);
    this.filterRanked = new Checkbox("ranked", "Stats", !0);
    this.filterRanked.x = this.ox + 502;
    this.filterRanked.y = this.oy + 80;
    this.filterRanked.scale.x = this.filterRanked.scale.y = 0.9;
    this.filterRanked.on(Checkbox.CHANGE, (a) =>
      this.filter(
        this.activeMode,
        this.activeRegion,
        this.activePrivate,
        a ? ServerListMenu.RANKED_ALL : !1,
        this.activeCustom
      )
    );
    this.container.addChild(this.filterRanked);
    this.rankedIcon = new PIXI.Sprite(App.CombinedTextures.ranked_icon);
    this.rankedIcon.x = this.ox + 470;
    this.rankedIcon.y = this.filterRanked.y - 3;
    this.rankedIcon.scale.x = this.rankedIcon.scale.y = 0.4;
    this.container.addChild(this.rankedIcon);
    this.filterCustom = new Checkbox("custom", "Custom", !0);
    this.filterCustom.x = this.ox + 502;
    this.filterCustom.y = this.oy + 110;
    this.filterCustom.scale.x = this.filterCustom.scale.y = 0.9;
    this.filterCustom.on(Checkbox.CHANGE, (a) =>
      this.filter(
        this.activeMode,
        this.activeRegion,
        this.activePrivate,
        this.activeRanked,
        a ? ServerListMenu.CUSTOM_ALL : !1
      )
    );
    this.container.addChild(this.filterCustom);
    this.customIcon = new PIXI.Sprite(App.CombinedTextures.gears_icon);
    this.customIcon.x = this.ox + 470;
    this.customIcon.y = this.filterCustom.y - 3;
    this.customIcon.scale.x = this.customIcon.scale.y = 0.4;
    this.container.addChild(this.customIcon);
    this.modeText = new PIXI.Text("Mode", FontStyle.ServerListTitle);
    this.modeText.x = this.ox + 15;
    this.modeText.y = this.oy + 144;
    this.modeText.resolution = 2;
    this.container.addChild(this.modeText);
    this.regionText = new PIXI.Text("Region", FontStyle.ServerListTitle);
    this.regionText.x = this.ox + 75;
    this.regionText.y = this.oy + 144;
    this.regionText.resolution = 2;
    this.container.addChild(this.regionText);
    this.nameText = new PIXI.Text("Name", FontStyle.ServerListTitle);
    this.nameText.x = this.ox + 146;
    this.nameText.y = this.oy + 144;
    this.nameText.resolution = 2;
    this.container.addChild(this.nameText);
    this.playersText = new PIXI.Text("Players", FontStyle.ServerListTitle);
    this.playersText.x = this.ox + 360;
    this.playersText.y = this.oy + 144;
    this.playersText.resolution = 2;
    this.container.addChild(this.playersText);
    this.modeSorting = new PIXI.Graphics();
    this.modeSorting.interactive = !0;
    this.modeSorting.x = this.modeText.x - 4;
    this.modeSorting.y = this.modeText.y;
    this.modeSorting.beginFill(16777215, 0.2);
    this.modeSorting.drawRect(0, 0, 54, 22, 8);
    this.modeSorting.endFill();
    this.modeSorting.alpha = 0.5;
    this.modeSorting.on("mouseover", () => (this.modeSorting.alpha = 1));
    this.modeSorting.on("mouseout", () => (this.modeSorting.alpha = 0.5));
    this.modeSorting.on("mousedown", () => {
      this.sortedCol = ServerListMenu.COL_MODE;
      this.modeSort =
        this.modeSort === ServerListMenu.SORT_UP
          ? ServerListMenu.SORT_DOWN
          : ServerListMenu.SORT_UP;
      this.sort(this.modeSort);
    });
    this.container.addChild(this.modeSorting);
    this.regionSorting = new PIXI.Graphics();
    this.regionSorting.interactive = !0;
    this.regionSorting.x = this.regionText.x - 4;
    this.regionSorting.y = this.regionText.y;
    this.regionSorting.beginFill(16777215, 0.2);
    this.regionSorting.drawRect(0, 0, 64, 22, 8);
    this.regionSorting.endFill();
    this.regionSorting.alpha = 0.5;
    this.regionSorting.on("mouseover", () => (this.regionSorting.alpha = 1));
    this.regionSorting.on("mouseout", () => (this.regionSorting.alpha = 0.5));
    this.regionSorting.on("mousedown", () => {
      this.sortedCol = ServerListMenu.COL_REGION;
      this.regionSort =
        this.regionSort === ServerListMenu.SORT_UP
          ? ServerListMenu.SORT_DOWN
          : ServerListMenu.SORT_UP;
      this.sort(ServerListMenu.SORT_DEFAULT, this.regionSort);
    });
    this.container.addChild(this.regionSorting);
    this.nameSorting = new PIXI.Graphics();
    this.nameSorting.interactive = !0;
    this.nameSorting.x = this.nameText.x - 4;
    this.nameSorting.y = this.nameText.y;
    this.nameSorting.beginFill(16777215, 0.2);
    this.nameSorting.drawRect(0, 0, 54, 22, 8);
    this.nameSorting.endFill();
    this.nameSorting.alpha = 0.5;
    this.nameSorting.on("mouseover", () => (this.nameSorting.alpha = 1));
    this.nameSorting.on("mouseout", () => (this.nameSorting.alpha = 0.5));
    this.nameSorting.on("mousedown", () => {
      this.sortedCol = ServerListMenu.COL_NAME;
      this.nameSort =
        this.nameSort === ServerListMenu.SORT_UP
          ? ServerListMenu.SORT_DOWN
          : ServerListMenu.SORT_UP;
      this.sort(ServerListMenu.SORT_DEFAULT, ServerListMenu.SORT_DEFAULT, this.nameSort);
    });
    this.container.addChild(this.nameSorting);
    this.playerSorting = new PIXI.Graphics();
    this.playerSorting.interactive = !0;
    this.playerSorting.x = this.playersText.x - 4;
    this.playerSorting.y = this.playersText.y;
    this.playerSorting.beginFill(16777215, 0.2);
    this.playerSorting.drawRect(0, 0, 68, 22, 8);
    this.playerSorting.endFill();
    this.playerSorting.alpha = 0.5;
    this.playerSorting.on("mouseover", () => (this.playerSorting.alpha = 1));
    this.playerSorting.on("mouseout", () => (this.playerSorting.alpha = 0.5));
    this.playerSorting.on("mousedown", () => {
      this.sortedCol = ServerListMenu.COL_PLAYERS;
      this.playerSort =
        this.playerSort === ServerListMenu.SORT_UP
          ? ServerListMenu.SORT_DOWN
          : ServerListMenu.SORT_UP;
      this.sort(
        ServerListMenu.SORT_DEFAULT,
        ServerListMenu.SORT_DEFAULT,
        ServerListMenu.SORT_DEFAULT,
        this.playerSort
      );
    });
    this.container.addChild(this.playerSorting);
    this.serverInfoText = new PIXI.Text("0 players in 0 servers", {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 16,
      fill: 13421772,
      strokeThickness: 2,
      lineJoin: "round",
      padding: 2,
    });
    this.serverInfoText.x = 36;
    this.serverInfoText.y = this.background.height - 16;
    this.serverInfoText.resolution = 2;
    this.container.addChild(this.serverInfoText);
    this.refreshButton = new Button("refresh");
    this.refreshButton.selected = !0;
    this.refreshButton.setText("Refresh");
    this.refreshButton.scale.x = this.refreshButton.scale.y = 0.8;
    this.refreshButton.addListener(Button.BUTTON_RELEASED, () =>
      this.emit(Layer.Events.SERVER_LIST_REFRESH)
    );
    this.refreshButton.x = this.width - 100;
    this.refreshButton.y = this.height - 10;
    this.refreshButton.setTint(8978312);
    this.container.addChild(this.refreshButton);
    this.serverListContainer = new PIXI.Container();
    this.serverListContainer.y = 36;
    this.serverListTableContainerMask = new PIXI.Graphics();
    this.serverListTableContainerMask.beginFill(16777215, 1);
    this.serverListTableContainerMask.drawRect(-10, 150, 640, 316);
    this.serverListTableContainerMask.endFill();
    this.serverListTableContainerMask.x = 10;
    this.serverListContainer.addChild(this.serverListTableContainerMask);
    this.serverListTableContainer = new PIXI.Container();
    this.serverListTableContainer.x = 0;
    this.serverListTableContainer.mask = this.serverListTableContainerMask;
    this.serverListContainer.addChild(this.serverListTableContainer);
    this.serverListScrollbar = new ServerListScrollbar(318);
    this.serverListScrollbar.x = 615;
    this.serverListScrollbar.y = 154;
    this.serverListContainer.addChild(this.serverListScrollbar);
    this.serverListScrollbar.on(ServerListScrollbar.SCROLL, (a) => {
      this.serverListTableContainer.height > this.serverListTableContainerMask.height &&
        (this.serverListTableContainer.y = -(
          a *
          (this.serverListTableContainer.height - this.serverListTableContainerMask.height)
        ));
    });
    this.container.addChild(this.serverListContainer);
    this.modeList = new Dropdown("modeSelect", "Mode", 200, 200, !0);
    this.modeList.addListener(Button.BUTTON_RELEASED, (a) => this.onModeListSelect(a.data.value));
    this.modeList.x = 26;
    this.modeList.y = 130;
    this.modeList.addItem("All modes", ServerListMenu.MODE_ALL, "");
    this.modeList.addItem(
      "Deathmatch",
      ServerListMenu.MODE_DEATHMATCH,
      "",
      App.CombinedTextures.dm_icon_notxt
    );
    this.modeList.addItem(
      "Team Deathmatch",
      ServerListMenu.MODE_TEAM_DEATHMATCH,
      "",
      App.CombinedTextures.tdm_icon_notxt
    );
    this.modeList.addItem(
      "Capture the flag",
      ServerListMenu.MODE_CAPTURE_THE_FLAG,
      "",
      App.CombinedTextures.ctf_icon_notxt
    );
    this.modeList.addItem(
      "Dodgeball",
      ServerListMenu.MODE_DODGEBALL,
      "",
      App.CombinedTextures.db_icon_notxt
    );
    this.modeList.addItem(
      "Training",
      ServerListMenu.MODE_TRAINING,
      "",
      App.CombinedTextures.tr_icon_notxt
    );
    this.modeList.scale.x = this.modeList.scale.y = 0.9;
    this.container.addChild(this.modeList);
    this.regionList = new Dropdown("regionSelect", "Region", 200, 200, !0);
    this.regionList.addListener(Button.BUTTON_RELEASED, (a) =>
      this.onRegionListSelect(a.data.value)
    );
    this.regionList.x = 26;
    this.regionList.y = 100;
    this.regionList.addItem(
      "All regions",
      ServerListMenu.REGION_ALL,
      "",
      App.CombinedTextures.globe,
      0.4,
      4
    );
    this.regionList.addItem(
      "North America",
      ServerListMenu.REGION_NA_EAST,
      "",
      App.CombinedTextures.globe_na,
      0.4,
      4
    );
    this.regionList.addItem(
      "Europe",
      ServerListMenu.REGION_EU_WEST,
      "",
      App.CombinedTextures.globe_eu,
      0.4,
      4
    );
    this.regionList.addItem(
      "Asia",
      ServerListMenu.REGION_AS_SOUTH,
      "",
      App.CombinedTextures.globe_as,
      0.4,
      4
    );
    this.regionList.scale.x = this.regionList.scale.y = 0.9;
    this.container.addChild(this.regionList);
  }
  onModeListSelect(a) {
    this.filter(a, this.activeRegion, this.activePrivate, this.activeRanked, this.activeCustom);
  }
  onRegionListSelect(a) {
    this.filter(this.activeMode, a, this.activePrivate, this.activeRanked, this.activeCustom);
  }
  show() {
    this.refresh();
    Dropdown.AddInstance(this.regionList);
    Dropdown.AddInstance(this.modeList);
    this.serverListScrollbar.enableWheel();
  }
  hide() {
    this.serverListScrollbar.disableWheel();
  }
  async refresh() {
    this.refreshButton.disable();
    this.gameList = await APIClient.getGames();
    this.sort();
    setTimeout(() => this.refreshButton.enable(), 4e3);
  }
  sort(
    a = ServerListMenu.SORT_DEFAULT,
    b = ServerListMenu.SORT_DEFAULT,
    c = ServerListMenu.SORT_DEFAULT,
    d = ServerListMenu.SORT_DEFAULT
  ) {
    a === ServerListMenu.SORT_DOWN
      ? this.gameList.sort((e, f) => (e.mode < f.mode ? -1 : e.mode > f.mode ? 1 : 0))
      : a === ServerListMenu.SORT_UP &&
        this.gameList.sort((e, f) => (e.mode < f.mode ? 1 : e.mode > f.mode ? -1 : 0));
    b === ServerListMenu.SORT_DOWN
      ? this.gameList.sort((e, f) => (e.region < f.region ? -1 : e.region > f.region ? 1 : 0))
      : b === ServerListMenu.SORT_UP &&
        this.gameList.sort((e, f) => (e.region < f.region ? 1 : e.region > f.region ? -1 : 0));
    c === ServerListMenu.SORT_DOWN
      ? this.gameList.sort((e, f) => (e.name < f.name ? -1 : e.name > f.name ? 1 : 0))
      : c === ServerListMenu.SORT_UP &&
        this.gameList.sort((e, f) => (e.name < f.name ? 1 : e.name > f.name ? -1 : 0));
    d === ServerListMenu.SORT_DOWN
      ? this.gameList.sort((e, f) =>
          parseInt(e.players) < parseInt(f.players)
            ? -1
            : parseInt(e.players) > parseInt(f.players)
            ? 1
            : 0
        )
      : d === ServerListMenu.SORT_UP &&
        this.gameList.sort((e, f) =>
          parseInt(e.players) < parseInt(f.players)
            ? 1
            : parseInt(e.players) > parseInt(f.players)
            ? -1
            : 0
        );
    this.gameList.sort((e, f) =>
      e.agi > f.agi && "0" === e.private ? -1 : e.agi < f.agi || "1" === e.private ? 1 : 0
    );
    this.filter(
      this.activeMode,
      this.activeRegion,
      this.activePrivate,
      this.activeRanked,
      this.activeCustom
    );
  }
  filter(
    a = ServerListMenu.MODE_ALL,
    b = ServerListMenu.REGION_ALL,
    c = ServerListMenu.PRIVATE_ALL,
    d = ServerListMenu.RANKED_ALL,
    e = ServerListMenu.CUSTOM_ALL
  ) {
    let f = 0,
      g = 0,
      h = 0,
      k = !1;
    this.serverListTableContainer.removeChildren();
    this.serverListTableContainer.y = 0;
    this.serverListScrollbar.reset();
    this.activeMode = a;
    this.activeRegion = b;
    this.activePrivate = c;
    this.activeRanked = d;
    this.activeCustom = e;
    for (let n = 0; n < this.gameList.length; n++) {
      const l = this.gameList[n];
      if (a !== ServerListMenu.MODE_ALL && Game.MODE_MAP[l.mode] !== a) {
        k = !0;
        continue;
      }
      if (b !== ServerListMenu.REGION_ALL && l.region !== b) {
        k = !0;
        continue;
      }
      var m = parseInt(l.private);
      let p = parseInt(l.stats),
        r = parseInt(l.custom);
      m && p && r
        ? (k = !(
            c === ServerListMenu.PRIVATE_ALL ||
            d === ServerListMenu.RANKED_ALL ||
            e === ServerListMenu.CUSTOM_ALL
          ))
        : m && p
        ? (k = !(c === ServerListMenu.PRIVATE_ALL || d === ServerListMenu.RANKED_ALL))
        : m && r
        ? (k = !(c === ServerListMenu.PRIVATE_ALL || e === ServerListMenu.CUSTOM_ALL))
        : p && r
        ? (k = !(d === ServerListMenu.RANKED_ALL || e === ServerListMenu.CUSTOM_ALL))
        : m
        ? (k = c !== ServerListMenu.PRIVATE_ALL)
        : p
        ? (k = d !== ServerListMenu.RANKED_ALL)
        : r && (k = e !== ServerListMenu.CUSTOM_ALL);
      if (!k || (!p && (a === Game.MODE_MAP[l.mode]) !== Game.MODE_TR))
        g++,
          (h += parseInt(l.players, 10)),
          f++,
          (m = new ServerListTableRow(
            f + 1,
            ServerListMenu.REGION_MAP[l.region],
            l.server_id,
            l.name,
            l.mode,
            l.players,
            l.map,
            l.private,
            l.stats,
            l.custom
          )),
          (m.x = this.ox + 20),
          (m.y = this.oy + 36 * f + 100),
          m.on(ServerListTableRow.JOIN_GAME, (q) => {
            this.passwordField.markNone();
            let t = this.passwordField.getText().trim();
            1 === parseInt(l.private) && 0 === t.length
              ? this.passwordField.markInvalid()
              : this.emit(Layer.Events.JOIN_GAME, q, l.server_id, t);
          }),
          m.on(ServerListTableRow.DISPLAY_DETAILS, () =>
            this.emit(Layer.Events.SERVER_DETAIL_ACCESS, l)
          ),
          this.serverListTableContainer.addChild(m);
    }
    this.serverInfoText.text = "" + h + " players in " + g + " servers" + (k ? " [filtered]" : "");
  }
  setPasswordInvalid() {
    this.passwordField.markInvalid();
  }
}
ServerListMenu.MODE_ALL = "all";
ServerListMenu.REGION_ALL = "all";
ServerListMenu.PRIVATE_ALL = "all";
ServerListMenu.RANKED_ALL = "all";
ServerListMenu.CUSTOM_ALL = "all";
ServerListMenu.MODE_DEATHMATCH = "dm";
ServerListMenu.MODE_TEAM_DEATHMATCH = "tdm";
ServerListMenu.MODE_CAPTURE_THE_FLAG = "ctf";
ServerListMenu.MODE_DODGEBALL = "db";
ServerListMenu.MODE_TRAINING = "tr";
ServerListMenu.MODE_ZOMBIE_SURVIVAL = "zs";
ServerListMenu.MODE_1V1 = "1v1";
ServerListMenu.REGION_NA_EAST = "na_east";
ServerListMenu.REGION_EU_WEST = "eu_west";
ServerListMenu.REGION_AS_SOUTH = "as_south";
ServerListMenu.REGION_MAP = {
  [ServerListMenu.REGION_NA_EAST]: "na",
  [ServerListMenu.REGION_EU_WEST]: "eu",
  [ServerListMenu.REGION_AS_SOUTH]: "as",
};
ServerListMenu.SORT_UP = "up";
ServerListMenu.SORT_DOWN = "down";
ServerListMenu.SORT_DEFAULT = "default";
ServerListMenu.COL_MODE = "mode";
ServerListMenu.COL_REGION = "region";
ServerListMenu.COL_NAME = "name";
ServerListMenu.COL_PLAYERS = "players";
export class ServerListTableRow extends PIXI.Container {
  constructor(a, b, c, d, e, f, g, h, k, m) {
    super();
    this.id = c;
    this.index = a.toString();
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.1);
    this.background.drawRect(-10, 2, 570, 38);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    this.hitArea = new PIXI.Rectangle(-10, 2, 570, 38);
    this.interactive = !0;
    this.on("mouseover", () => {
      this.background.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.on("mouseout", () => {
      this.background.alpha = 0 === this.index % 2 ? 0.3 : 0;
    });
    this.addChild(this.background);
    this.background.on("mousedown", () => {
      this.emit(ServerListTableRow.DISPLAY_DETAILS);
      AudioEffects.ButtonClick.audio.play();
    });
    this.modeIcon = new PIXI.Sprite(App.CombinedTextures[Game.MODE_MAP[e] + "_icon"]);
    this.modeIcon.x = 0;
    this.modeIcon.y = 5;
    this.modeIcon.scale.x = this.modeIcon.scale.y = 0.5;
    this.modeIcon.hitArea = new PIXI.Rectangle();
    this.addChild(this.modeIcon);
    this.regionIcon = new PIXI.Sprite(App.CombinedTextures["globe_" + b]);
    this.regionIcon.x = 56;
    this.regionIcon.y = 8;
    this.regionIcon.scale.x = this.regionIcon.scale.y = 0.4;
    this.regionIcon.hitArea = new PIXI.Rectangle();
    this.addChild(this.regionIcon);
    this.regionText = new PIXI.BitmapText(b.toUpperCase(), { fontName: "Open Sans", fontSize: 22 });
    this.regionText.x = 84;
    this.regionText.y = 10;
    this.regionText.tint = 16763904;
    this.addChild(this.regionText);
    this.nameText = new PIXI.BitmapText(d, { fontName: "Open Sans", fontSize: 20 });
    this.nameText.x = 132;
    this.nameText.y = 6;
    this.nameText.tint = 16777215;
    this.nameText.hitArea = new PIXI.Rectangle();
    this.addChild(this.nameText);
    220 < this.nameText.width && (this.nameText.width = 220);
    this.mapText = new PIXI.BitmapText(g, { fontName: "Open Sans", fontSize: 14 });
    this.mapText.x = 132;
    this.mapText.y = 22;
    this.mapText.tint = 16763904;
    this.mapText.hitArea = new PIXI.Rectangle();
    this.addChild(this.mapText);
    this.playerText = new PIXI.BitmapText(f + (12 === parseInt(f) ? " (full)" : ""), {
      fontName: "Open Sans",
      fontSize: 22,
    });
    this.playerText.x = 360;
    this.playerText.y = 10;
    this.playerText.tint = 12 === parseInt(f) ? 16763904 : 16777215;
    this.playerText.hitArea = new PIXI.Rectangle();
    this.addChild(this.playerText);
    a = 1 === parseInt(h);
    k = 1 === parseInt(k);
    m = 1 === parseInt(m);
    a &&
      ((this.privateIcon = new PIXI.Sprite(App.CombinedTextures.lock_icon)),
      (this.privateIcon.x = 400),
      (this.privateIcon.y = 8),
      (this.privateIcon.scale.x = this.privateIcon.scale.y = 0.4),
      (this.privateIcon.hitArea = new PIXI.Rectangle()),
      this.addChild(this.privateIcon));
    k &&
      ((this.rankedIcon = new PIXI.Sprite(App.CombinedTextures.ranked_icon)),
      (this.rankedIcon.x = 430),
      (this.rankedIcon.y = 8),
      (this.rankedIcon.scale.x = this.rankedIcon.scale.y = 0.4),
      (this.rankedIcon.hitArea = new PIXI.Rectangle()),
      this.addChild(this.rankedIcon));
    m &&
      ((this.customIcon = new PIXI.Sprite(App.CombinedTextures.gears_icon)),
      (this.customIcon.x = 460),
      (this.customIcon.y = 8),
      (this.customIcon.scale.x = this.customIcon.scale.y = 0.4),
      (this.customIcon.hitArea = new PIXI.Rectangle()),
      this.addChild(this.customIcon));
    this.joinButton = new Button("join");
    this.joinButton.selected = !1;
    this.joinButton.setText("Join");
    this.joinButton.scale.x = this.joinButton.scale.y = 0.7;
    this.joinButton.setTint(16763904);
    this.joinButton.addListener(Button.BUTTON_RELEASED, () => {
      this.emit(ServerListTableRow.JOIN_GAME, d, this.id);
    });
    this.joinButton.x = 514;
    this.joinButton.y = 8;
    this.addChild(this.joinButton);
  }
}
ServerListTableRow.JOIN_GAME = "joinGame";
ServerListTableRow.DISPLAY_DETAILS = "displayDetails";
export class ServerListScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      -3 > b ? (b = -3) : b > this.h - 39 && (b = this.h - 39);
      let c = this.h / (this.h - 39);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(ServerListScrollbar.SCROLL, (1 / this.h) * (b + 3) * c);
    }
  }
  reset() {
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
ServerListScrollbar.SCROLL = "scroll";
var servercustomizationmenu = {};
export class ServerCustomizationMenu extends Feature {
  constructor() {
    super();
    this.ox = 0;
    this.oy = 20;
    this.maps = [];
    this.drops = [];
    this.settings = { maps: [], weapons: [], drops: [], shuriken: !0 };
    this.selectedMode = null;
    this.container.x = 0.5 * -this.width;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(14, 136, 208, 330, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(226, 136, 208, 330, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(438, 136, 208, 330, 10);
    this.background.endFill();
    this.background.interactive = !0;
    this.container.addChild(this.background);
    this.serverCustomizationTitle = new PIXI.Text("Customize game", FontStyle.MediumOrangeText);
    this.serverCustomizationTitle.x = this.ox + 20;
    this.serverCustomizationTitle.y = this.oy + 40;
    this.serverCustomizationTitle.resolution = 2;
    this.container.addChild(this.serverCustomizationTitle);
    this.weaponTypeLabel = new PIXI.Text(
      "Select the weapons and maps that should be available in the server.\n- Deselecting all weapons will disable the weapon menu.\n- Deselecting all maps will enable one random map.",
      FontStyle.SmallLabelText3
    );
    this.weaponTypeLabel.x = this.ox + 24;
    this.weaponTypeLabel.y = this.oy + 70;
    this.weaponTypeLabel.tint = 16777215;
    this.weaponTypeLabel.resolution = 2;
    this.container.addChild(this.weaponTypeLabel);
    this.weaponTypeLabel = new PIXI.Text("Weapons", FontStyle.SmallLabelText);
    this.weaponTypeLabel.x = this.ox + 20;
    this.weaponTypeLabel.y = this.oy + 134;
    this.weaponTypeLabel.resolution = 2;
    this.container.addChild(this.weaponTypeLabel);
    this.mapLabel = new PIXI.Text("Maps", FontStyle.SmallLabelText);
    this.mapLabel.x = this.ox + 230;
    this.mapLabel.y = this.oy + 134;
    this.mapLabel.resolution = 2;
    this.container.addChild(this.mapLabel);
    this.dropLabel = new PIXI.Text("Item drops", FontStyle.SmallLabelText);
    this.dropLabel.x = this.ox + 440;
    this.dropLabel.y = this.oy + 134;
    this.dropLabel.resolution = 2;
    this.container.addChild(this.dropLabel);
    this.acceptButton = new Button("accept");
    this.acceptButton.setText("Apply");
    this.acceptButton.scale.x = this.acceptButton.scale.y = 0.8;
    this.acceptButton.addListener(Button.BUTTON_RELEASED, () => this.onAccept());
    this.acceptButton.x = this.width - 80;
    this.acceptButton.y = this.height - 10;
    this.acceptButton.setTint(16763904);
    this.container.addChild(this.acceptButton);
    this.weaponListContainer = new PIXI.Container();
    this.weaponListContainer.x = 0;
    this.weaponListContainer.y = 32;
    this.weaponListTableContainerMask = new PIXI.Graphics();
    this.weaponListTableContainerMask.beginFill(16777215, 1);
    this.weaponListTableContainerMask.drawRect(20, 148, 180, 320);
    this.weaponListTableContainerMask.endFill();
    this.weaponListTableContainerMask.x = -4;
    this.weaponListContainer.addChild(this.weaponListTableContainerMask);
    this.weaponListTableContainer = new PIXI.Container();
    this.weaponListTableContainer.x = 13;
    this.weaponListTableContainer.mask = this.weaponListTableContainerMask;
    this.weaponListContainer.addChild(this.weaponListTableContainer);
    this.weaponSelectionListScrollbar = new SelectionListScrollbar(322);
    this.weaponSelectionListScrollbar.x = 200;
    this.weaponSelectionListScrollbar.y = 152;
    this.weaponListContainer.addChild(this.weaponSelectionListScrollbar);
    this.weaponSelectionListScrollbar.on(SelectionListScrollbar.SCROLL, (b) => {
      this.weaponListTableContainer.height > this.weaponListTableContainerMask.height &&
        (this.weaponListTableContainer.y = -(
          b *
          (this.weaponListTableContainer.height - this.weaponListTableContainerMask.height)
        ));
    });
    this.container.addChild(this.weaponListContainer);
    let a = 0;
    for (let b in ItemMap) {
      let c = ItemMap[b];
      if (c.equip === ItemMap.Equip.PRIMARY || c.equip === ItemMap.Equip.SECONDARY) {
        this.settings.weapons.push(b);
        const d = new WeaponSelectionListTableRow(a, b, c.title);
        d.x = this.ox + 4;
        d.y = this.oy + 42 * a + 130;
        d.on(WeaponSelectionListTableRow.CHANGE, (e) =>
          this.onWeaponSelectionChange(e, d.selected)
        );
        this.weaponListTableContainer.addChild(d);
        a++;
      }
    }
    this.mapListContainer = new PIXI.Container();
    this.mapListContainer.x = 212;
    this.mapListContainer.y = 32;
    this.mapListTableContainerMask = new PIXI.Graphics();
    this.mapListTableContainerMask.beginFill(16777215, 1);
    this.mapListTableContainerMask.drawRect(20, 148, 180, 320);
    this.mapListTableContainerMask.endFill();
    this.mapListTableContainerMask.x = -4;
    this.mapListContainer.addChild(this.mapListTableContainerMask);
    this.mapListTableContainer = new PIXI.Container();
    this.mapListTableContainer.x = 0;
    this.mapListTableContainer.mask = this.mapListTableContainerMask;
    this.mapListContainer.addChild(this.mapListTableContainer);
    this.mapSelectionListScrollbar = new SelectionListScrollbar(322);
    this.mapSelectionListScrollbar.x = 200;
    this.mapSelectionListScrollbar.y = 152;
    this.mapListContainer.addChild(this.mapSelectionListScrollbar);
    this.mapSelectionListScrollbar.on(SelectionListScrollbar.SCROLL, (b) => {
      this.mapListTableContainer.height > this.mapListTableContainerMask.height &&
        (this.mapListTableContainer.y = -(
          b *
          (this.mapListTableContainer.height - this.mapListTableContainerMask.height)
        ));
    });
    this.container.addChild(this.mapListContainer);
    this.dropListContainer = new PIXI.Container();
    this.dropListContainer.x = 424;
    this.dropListContainer.y = 32;
    this.dropListTableContainerMask = new PIXI.Graphics();
    this.dropListTableContainerMask.beginFill(16777215, 1);
    this.dropListTableContainerMask.drawRect(20, 148, 180, 320);
    this.dropListTableContainerMask.endFill();
    this.dropListTableContainerMask.x = -4;
    this.dropListContainer.addChild(this.dropListTableContainerMask);
    this.dropListTableContainer = new PIXI.Container();
    this.dropListTableContainer.x = 0;
    this.dropListTableContainer.mask = this.dropListTableContainerMask;
    this.dropListContainer.addChild(this.dropListTableContainer);
    this.dropSelectionListScrollbar = new SelectionListScrollbar(322);
    this.dropSelectionListScrollbar.x = 200;
    this.dropSelectionListScrollbar.y = 152;
    this.dropListContainer.addChild(this.dropSelectionListScrollbar);
    this.dropSelectionListScrollbar.on(SelectionListScrollbar.SCROLL, (b) => {
      this.dropListTableContainer.height > this.dropListTableContainerMask.height &&
        (this.dropListTableContainer.y = -(
          b *
          (this.dropListTableContainer.height - this.dropListTableContainerMask.height)
        ));
    });
    this.container.addChild(this.dropListContainer);
    this.setShuriken = new Checkbox("shuriken", "Spawn with Shuriken", !0);
    this.setShuriken.x = this.ox + 32;
    this.setShuriken.y = this.height - 6;
    this.setShuriken.scale.x = this.setShuriken.scale.y = 0.9;
    this.setShuriken.setTint(16776960);
    this.setShuriken.on(Checkbox.CHANGE, (b) => this.onSetShuriken(b));
    this.container.addChild(this.setShuriken);
    this.loadContent();
  }
  show() {
    this.weaponSelectionListScrollbar.enableWheel();
  }
  hide() {
    this.weaponSelectionListScrollbar.disableWheel();
  }
  onSetShuriken(a) {
    this.settings.shuriken = a;
  }
  onWeaponSelectionChange(a, b) {
    b
      ? this.settings.weapons.push(a)
      : this.settings.weapons.splice(this.settings.weapons.indexOf(a), 1);
  }
  onMapSelectionChange(a, b) {
    b ? this.settings.maps.push(a) : this.settings.maps.splice(this.settings.maps.indexOf(a), 1);
  }
  onDropSelectionChange(a, b) {
    b ? this.settings.drops.push(a) : this.settings.drops.splice(this.settings.drops.indexOf(a), 1);
  }
  onAccept() {
    this.emit(ServerCustomizationMenu.ACCEPT, this.settings);
  }
  onCancel() {
    this.emit(ServerCustomizationMenu.CANCEL);
  }
  async loadContent() {
    var a = await APIClient.getItemDrops();
    if (a) {
      this.drops = a;
      this.settings.drops = [];
      this.dropListTableContainer.removeChildren();
      a = 0;
      for (let b = 0; b < this.drops.length; b++) {
        const c = this.drops[b];
        this.settings.drops.push(c.item_id);
        const d = new DropSelectionListTableRow(a, c.item_id, c.prefab_id, c.name);
        d.x = this.ox + 4;
        d.y = this.oy + 42 * a + 130;
        d.on(DropSelectionListTableRow.CHANGE, (e) => this.onDropSelectionChange(e, d.selected));
        this.dropListTableContainer.addChild(d);
        a++;
      }
      if ((a = await APIClient.getMaps())) (this.maps = a), this.filterMaps();
    }
  }
  setMode(a) {
    this.selectedMode !== a && ((this.selectedMode = a), this.filterMaps());
  }
  filterMaps() {
    this.mapSelectionListScrollbar.reset();
    this.mapListTableContainer.y = 0;
    this.settings.maps = [];
    this.mapListTableContainer.removeChildren();
    let a = 0;
    for (let b = 0; b < this.maps.length; b++) {
      const c = this.maps[b];
      if (
        !(
          this.selectedMode === c.mode ||
          (c.mode === Game.MODE_CTF && this.selectedMode === Game.MODE_DM) ||
          (c.mode === Game.MODE_CTF && this.selectedMode === Game.MODE_TDM)
        )
      )
        continue;
      this.settings.maps.push(c.id);
      const d = new MapSelectionListTableRow(a, c.id, c.title, c.mode);
      d.x = this.ox + 4;
      d.y = this.oy + 42 * a + 130;
      d.on(MapSelectionListTableRow.CHANGE, (e) => this.onMapSelectionChange(e, d.selected));
      this.mapListTableContainer.addChild(d);
      a++;
    }
    this.emit(ServerCustomizationMenu.INIT, this.settings);
  }
}
ServerCustomizationMenu.ACCEPT = "cust_accept";
ServerCustomizationMenu.CANCEL = "cust_cancel";
ServerCustomizationMenu.INIT = "cust_init";
ServerCustomizationMenu.SHOW = "cust_show";
export class WeaponSelectionListTableRow extends PIXI.Container {
  constructor(a, b, c) {
    super();
    this.id = b;
    this.index = a;
    this.selected = this.interactive = !0;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRect(0, 2, 200, 38);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.tint = 65280;
    this.background.alpha = 0.6;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.6;
    });
    this.background.on("mousedown", () => {
      this.selected = !this.selected;
      this.background.tint = this.selected ? 65280 : 16777215;
      this.emit(WeaponSelectionListTableRow.CHANGE, this.id);
      AudioEffects.ButtonClick.audio.play();
    });
    this.addChild(this.background);
    this.icon = new SpriteMap[b]();
    this.icon.x = 23;
    this.icon.y = 26;
    a = this.icon.width;
    b = this.icon.height;
    let d = a > b ? (64 <= a ? 64 : a) : 42 <= b ? 42 : b;
    this.icon.scale.x = this.icon.scale.y = a > b ? d / this.icon.width : d / this.icon.height;
    this.icon.rotation = -0.2;
    this.addChild(this.icon);
    this.nameText = new PIXI.Text(c, FontStyle.CustomizationItemTextSmall);
    this.nameText.x = 75;
    this.nameText.y = 12;
    this.nameText.tint = 16777215;
    this.nameText.hitArea = new PIXI.Rectangle();
    this.nameText.resolution = 2;
    this.addChild(this.nameText);
  }
}
WeaponSelectionListTableRow.CHANGE = "wsl_change";
export class MapSelectionListTableRow extends PIXI.Container {
  constructor(a, b, c, d) {
    super();
    this.id = b;
    this.index = a;
    this.selected = this.interactive = !0;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRect(0, 2, 200, 38);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.tint = 65280;
    this.background.alpha = 0.6;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.6;
    });
    this.background.on("mousedown", () => {
      this.selected = !this.selected;
      this.background.tint = this.selected ? 65280 : 16777215;
      this.emit(MapSelectionListTableRow.CHANGE, this.id);
      AudioEffects.ButtonClick.audio.play();
    });
    this.addChild(this.background);
    this.icon = new PIXI.Sprite(App.CombinedTextures[Game.MODE_MAP[d] + "_icon"]);
    this.icon.x = 10;
    this.icon.y = 10;
    a = this.icon.width;
    b = this.icon.height;
    d = a > b ? (32 <= a ? 32 : a) : 32 <= b ? 32 : b;
    this.icon.scale.x = this.icon.scale.y = a > b ? d / this.icon.width : d / this.icon.height;
    this.icon.rotation = -0.2;
    this.addChild(this.icon);
    this.nameText = new PIXI.Text(c, FontStyle.CustomizationItemTextSmall);
    this.nameText.x = 48;
    this.nameText.y = 12;
    this.nameText.hitArea = new PIXI.Rectangle();
    this.nameText.resolution = 2;
    this.addChild(this.nameText);
  }
}
MapSelectionListTableRow.CHANGE = "msl_change";
export class DropSelectionListTableRow extends PIXI.Container {
  constructor(a, b, c, d) {
    super();
    this.id = b;
    this.index = a;
    this.selected = this.interactive = !0;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRect(0, 2, 200, 38);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.tint = 65280;
    this.background.alpha = 0.6;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.6;
    });
    this.background.on("mousedown", () => {
      this.selected = !this.selected;
      this.background.tint = this.selected ? 65280 : 16777215;
      this.emit(DropSelectionListTableRow.CHANGE, this.id);
      AudioEffects.ButtonClick.audio.play();
    });
    this.addChild(this.background);
    this.icon = new SpriteMap[c]();
    this.icon.x = 30;
    this.icon.y = 22;
    a = this.icon.width;
    b = this.icon.height;
    c = a > b ? (10 <= a ? 10 : a) : 10 <= b ? 10 : b;
    this.icon.scale.x = this.icon.scale.y = a > b ? c / this.icon.width : c / this.icon.height;
    this.icon.rotation = 0;
    this.addChild(this.icon);
    this.nameText = new PIXI.Text(d, FontStyle.CustomizationItemTextSmall);
    this.nameText.x = 56;
    this.nameText.y = 12;
    this.nameText.hitArea = new PIXI.Rectangle();
    this.nameText.resolution = 2;
    this.addChild(this.nameText);
  }
}
DropSelectionListTableRow.CHANGE = "dsl_change";
export class SelectionListScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c));
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      a = a.data.global.y / App.Scale;
      let b = this.scrollButton.y + (a - this.oy);
      -3 > b ? (b = -3) : b > this.h - 39 && (b = this.h - 39);
      let c = this.h / (this.h - 39);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(SelectionListScrollbar.SCROLL, (1 / this.h) * (b + 3) * c);
    }
  }
  reset() {
    this.scrollButton.y = -3 + (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
SelectionListScrollbar.SCROLL = "scroll";
var servercreationmenu = {};
export class ServerCreationMenu extends Feature {
  constructor() {
    super();
    this.price = 0;
    this.duration = ServerCreationMenu.DURATION_B;
    this.mode = Game.MODE_DM;
    this.customization = { maps: [], weapons: [], drops: [], shuriken: !0 };
    this.isPrivate = !1;
    this.isRanked = !0;
    this.isCustom = !1;
    this.onClientConnectBinding = this.onClientConnect.bind(this);
    this.createdServerName = "";
    this.createdServerId = -1;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(18, 40, 624, 44, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(18, 120, 624, 104, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(18, 258, 624, 44, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(18, 336, 624, 44, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(18, 414, 624, 44, 10);
    this.background.endFill();
    this.background.interactive = !0;
    this.container.addChild(this.background);
    this.ox = -20;
    this.oy = 20;
    this.container.x = 0.5 * -this.width;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.SERVER_CREATION_CANCEL));
    this.container.addChild(this.closeButton);
    this.customizationMenu = new ServerCustomizationMenu();
    this.customizationMenu.on(ServerCustomizationMenu.ACCEPT, (a) => {
      this.customization = a;
      this.customizationMenu.hide();
      this.container.removeChild(this.customizationMenu);
    });
    this.customizationMenu.on(ServerCustomizationMenu.INIT, (a) => {
      this.customization = a;
    });
    this.customizationMenu.on(ServerCustomizationMenu.CANCEL, () => {
      this.customizationMenu.hide();
      this.container.removeChild(this.customizationMenu);
    });
    this.confirmationBackground = new PIXI.Graphics();
    this.confirmationBackground.beginFill(4473924, 1);
    this.confirmationBackground.drawRect(0, 0, 400, 300);
    this.confirmationBackground.endFill();
    this.confirmationBackground.beginFill(0, 0.3);
    this.confirmationBackground.drawRect(8, 8, 384, 284);
    this.confirmationBackground.endFill();
    this.confirmationBackground.interactive = !0;
    this.confirmationContainer = new PIXI.Container();
    this.confirmationContainer.addChild(this.confirmationBackground);
    this.confirmationContainer.x = 0.5 * (this.container.width - this.confirmationContainer.width);
    this.confirmationContainer.y =
      0.5 * (this.container.height - this.confirmationContainer.height);
    this.confirmationAccept = new Button();
    this.confirmationAccept.setText("Accept & create");
    this.confirmationAccept.scale.x = this.confirmationAccept.scale.y = 0.8;
    this.confirmationAccept.addListener(Button.BUTTON_RELEASED, () => this.onCreateServerConfirm());
    this.confirmationAccept.x = this.confirmationBackground.width - 222;
    this.confirmationAccept.y = this.confirmationBackground.height - 52;
    this.confirmationAccept.setTint(16763904);
    this.confirmationContainer.addChild(this.confirmationAccept);
    this.confirmationDecline = new Button();
    this.confirmationDecline.setText("Cancel");
    this.confirmationDecline.scale.x = this.confirmationDecline.scale.y = 0.8;
    this.confirmationDecline.addListener(Button.BUTTON_RELEASED, () => this.onCreateServerCancel());
    this.confirmationDecline.x = this.confirmationBackground.width - 322;
    this.confirmationDecline.y = this.confirmationBackground.height - 52;
    this.confirmationDecline.setTint(16777215);
    this.confirmationContainer.addChild(this.confirmationDecline);
    this.serverCreationConfirmationTitle = new PIXI.BitmapText("Confirm server creation", {
      fontName: "Open Sans",
      fontSize: 26,
    });
    this.serverCreationConfirmationTitle.x =
      0.5 * (this.confirmationBackground.width - this.serverCreationConfirmationTitle.width);
    this.serverCreationConfirmationTitle.y = 12;
    this.serverCreationConfirmationTitle.tint = 16763904;
    this.confirmationContainer.addChild(this.serverCreationConfirmationTitle);
    this.confirmationInfoTitle = new PIXI.BitmapText(
      "You are about to create a new game server.\nYou can't create a new server until this one ends.\nImportant:\nInappropriate server names can result in\npermanent account closure.",
      { fontName: "Open Sans", fontSize: 22, align: "center" }
    );
    this.confirmationInfoTitle.x =
      0.5 * (this.confirmationBackground.width - this.confirmationInfoTitle.width);
    this.confirmationInfoTitle.y = 42;
    this.confirmationInfoTitle.tint = 16753920;
    this.confirmationContainer.addChild(this.confirmationInfoTitle);
    this.errorMessage = new PIXI.BitmapText("", {
      fontName: "Open Sans",
      fontSize: 22,
      align: "center",
    });
    this.errorMessage.x = 0.5 * (this.confirmationBackground.width - this.errorMessage.width);
    this.errorMessage.y = this.confirmationBackground.height - 124;
    this.errorMessage.tint = 16711680;
    this.confirmationContainer.addChild(this.errorMessage);
    this.successBackground = new PIXI.Graphics();
    this.successBackground.beginFill(4473924, 1);
    this.successBackground.drawRect(0, 0, 400, 200);
    this.successBackground.endFill();
    this.successBackground.beginFill(0, 0.3);
    this.successBackground.drawRect(8, 8, 384, 184);
    this.successBackground.endFill();
    this.successBackground.interactive = !0;
    this.successContainer = new PIXI.Container();
    this.successContainer.addChild(this.successBackground);
    this.successContainer.x = 0.5 * (this.container.width - this.successContainer.width);
    this.successContainer.y = 0.5 * (this.container.height - this.successContainer.height);
    this.serverCreationSuccessTitle = new PIXI.BitmapText("Server created", {
      fontName: "Open Sans",
      fontSize: 26,
    });
    this.serverCreationSuccessTitle.x =
      0.5 * (this.successBackground.width - this.serverCreationSuccessTitle.width);
    this.serverCreationSuccessTitle.y = 12;
    this.serverCreationSuccessTitle.tint = 16763904;
    this.successContainer.addChild(this.serverCreationSuccessTitle);
    this.successInfoTitle = new PIXI.BitmapText(
      "Your server has been created.\nIt will soon be visible in the server lobby.",
      { fontName: "Open Sans", fontSize: 22, align: "center" }
    );
    this.successInfoTitle.x = 0.5 * (this.successBackground.width - this.successInfoTitle.width);
    this.successInfoTitle.y = 42;
    this.successInfoTitle.tint = 16753920;
    this.successContainer.addChild(this.successInfoTitle);
    this.successAccept = new Button();
    this.successAccept.setText("Join game");
    this.successAccept.scale.x = this.successAccept.scale.y = 0.8;
    this.successAccept.addListener(Button.BUTTON_RELEASED, () => this.onSuccessJoinGameAccept());
    this.successAccept.x = 240;
    this.successAccept.y = this.successBackground.height - 52;
    this.successAccept.setTint(16763904);
    this.successContainer.addChild(this.successAccept);
    this.toLobbyAccept = new Button();
    this.toLobbyAccept.setText("Go to lobby");
    this.toLobbyAccept.scale.x = this.toLobbyAccept.scale.y = 0.8;
    this.toLobbyAccept.addListener(Button.BUTTON_RELEASED, () => this.onSuccessToLobbyAccept());
    this.toLobbyAccept.x = 60;
    this.toLobbyAccept.y = this.successBackground.height - 52;
    this.toLobbyAccept.setTint(16763904);
    this.successContainer.addChild(this.toLobbyAccept);
    this.serverCreationTitle = new PIXI.Text("Create game", FontStyle.MediumOrangeText);
    this.serverCreationTitle.x = this.ox + 40;
    this.serverCreationTitle.y = this.oy + 33;
    this.serverCreationTitle.resolution = 2;
    this.container.addChild(this.serverCreationTitle);
    this.serverCreationTypeLabel = new PIXI.BitmapText("Type", {
      fontName: "Open Sans",
      fontSize: 24,
    });
    this.serverCreationTypeLabel.x = this.ox + 44;
    this.serverCreationTypeLabel.y = this.oy + 110;
    this.serverCreationTypeLabel.tint = 16777215;
    this.container.addChild(this.serverCreationTypeLabel);
    this.customizationButton = new Button("customize");
    this.customizationButton.setText("Customize game");
    this.customizationButton.scale.x = this.customizationButton.scale.y = 0.8;
    this.customizationButton.addListener(Button.BUTTON_RELEASED, () =>
      this.onCustomizeServerInit()
    );
    this.customizationButton.x = this.width - 332;
    this.customizationButton.y = this.height - 14;
    this.customizationButton.setTint(8978312);
    this.customizationButton.alpha = 0.5;
    this.customizationButton.interactive = !1;
    this.container.addChild(this.customizationButton);
    this.createButton = new Button("create");
    this.createButton.setText("Create game");
    this.createButton.scale.x = this.createButton.scale.y = 0.8;
    this.createButton.addListener(Button.BUTTON_RELEASED, () => this.onCreateServerInit());
    this.createButton.x = this.width - 150;
    this.createButton.y = this.height - 14;
    this.createButton.setTint(16763904);
    this.container.addChild(this.createButton);
    this.setPrivate = new Checkbox("private", "Private", !1);
    this.setPrivate.x = this.ox + 82;
    this.setPrivate.y = this.oy + 150;
    this.setPrivate.scale.x = this.setPrivate.scale.y = 0.9;
    this.setPrivate.on(Checkbox.CHANGE, (a) => this.onSetPrivate(a));
    this.container.addChild(this.setPrivate);
    this.privateIcon = new PIXI.Sprite(App.CombinedTextures.lock_icon);
    this.privateIcon.x = this.ox + 50;
    this.privateIcon.y = this.setPrivate.y - 3;
    this.privateIcon.scale.x = this.privateIcon.scale.y = 0.4;
    this.container.addChild(this.privateIcon);
    this.setRanked = new Checkbox("ranked", "Stats", !0);
    this.setRanked.x = this.ox + 82;
    this.setRanked.y = this.oy + 180;
    this.setRanked.scale.x = this.setRanked.scale.y = 0.9;
    this.setRanked.on(Checkbox.CHANGE, (a) => this.onSetRanked(a));
    this.container.addChild(this.setRanked);
    this.rankedIcon = new PIXI.Sprite(App.CombinedTextures.ranked_icon);
    this.rankedIcon.x = this.ox + 50;
    this.rankedIcon.y = this.setRanked.y - 3;
    this.rankedIcon.scale.x = this.rankedIcon.scale.y = 0.4;
    this.container.addChild(this.rankedIcon);
    this.setCustom = new Checkbox("custom", "Custom", !1);
    this.setCustom.x = this.ox + 82;
    this.setCustom.y = this.oy + 210;
    this.setCustom.scale.x = this.setCustom.scale.y = 0.9;
    this.setCustom.on(Checkbox.CHANGE, (a) => this.onSetCustom(a));
    this.container.addChild(this.setCustom);
    this.customIcon = new PIXI.Sprite(App.CombinedTextures.gears_icon);
    this.customIcon.x = this.ox + 50;
    this.customIcon.y = this.setCustom.y - 3;
    this.customIcon.scale.x = this.customIcon.scale.y = 0.4;
    this.container.addChild(this.customIcon);
    this.serverCreationPriceLabel = new PIXI.BitmapText("Price", {
      fontName: "Open Sans",
      fontSize: 24,
    });
    this.serverCreationPriceLabel.x = this.ox + 44;
    this.serverCreationPriceLabel.y = this.oy + 330;
    this.serverCreationPriceLabel.tint = 16777215;
    this.container.addChild(this.serverCreationPriceLabel);
    this.goldIcon = new PIXI.Sprite(App.CombinedTextures.gold1);
    this.goldIcon.x = this.ox + 54;
    this.goldIcon.y = this.oy + 366;
    this.goldIcon.scale.x = this.goldIcon.scale.y = 0.4;
    this.container.addChild(this.goldIcon);
    this.serverCreationPriceValue = new PIXI.BitmapText("0", {
      fontName: "Open Sans",
      fontSize: 24,
    });
    this.serverCreationPriceValue.x = this.goldIcon.x + this.goldIcon.width + 8;
    this.serverCreationPriceValue.y = this.goldIcon.y;
    this.serverCreationPriceValue.tint = 16763904;
    this.container.addChild(this.serverCreationPriceValue);
    this.serverCreationNameLabel = new PIXI.BitmapText("Name", {
      fontName: "Open Sans",
      fontSize: 24,
    });
    this.serverCreationNameLabel.x = this.ox + 44;
    this.serverCreationNameLabel.y = this.oy + 406;
    this.serverCreationNameLabel.tint = 16777215;
    this.container.addChild(this.serverCreationNameLabel);
    this.nameField = new InputField("name");
    this.nameField.setDimensions(280, 35);
    this.nameField.forceLowerCase = !1;
    this.nameField.setMaxChars(20);
    this.nameField.x = this.ox + 54;
    this.nameField.y = this.oy + 438;
    this.nameField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-& !*"
    );
    this.container.addChild(this.nameField);
    this.serverCreationPasswordLabel = new PIXI.BitmapText("Password", {
      fontName: "Open Sans",
      fontSize: 24,
    });
    this.serverCreationPasswordLabel.x = this.nameField.x + this.nameField.width + 16;
    this.serverCreationPasswordLabel.y = this.oy + 406;
    this.serverCreationPasswordLabel.tint = 16777215;
    this.container.addChild(this.serverCreationPasswordLabel);
    this.passwordField = new InputField("password");
    this.passwordField.setDimensions(110, 35);
    this.passwordField.forceLowerCase = !1;
    this.passwordField.setMaxChars(8);
    this.passwordField.setPassword(!0);
    this.passwordField.x = this.nameField.x + this.nameField.width + 32;
    this.passwordField.y = this.oy + 438;
    this.passwordField.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
    this.container.addChild(this.passwordField);
    this.serverCreationModeLabel = new PIXI.BitmapText("Mode", {
      fontName: "Open Sans",
      fontSize: 24,
    });
    this.serverCreationModeLabel.x = this.ox + 44;
    this.serverCreationModeLabel.y = this.oy + 250;
    this.serverCreationModeLabel.tint = 16777215;
    this.container.addChild(this.serverCreationModeLabel);
    this.modeList = new Dropdown("modeSelect", "", 200, 200);
    this.modeList.addListener(Button.BUTTON_RELEASED, (a) => this.onModeListSelect(a.data.value));
    this.modeList.x = this.ox - 10;
    this.modeList.y = this.oy + 290;
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_DM],
      Game.MODE_DM,
      "",
      App.CombinedTextures.dm_icon_notxt
    );
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_TDM],
      Game.MODE_TDM,
      "",
      App.CombinedTextures.tdm_icon_notxt
    );
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_CTF],
      Game.MODE_CTF,
      "",
      App.CombinedTextures.ctf_icon_notxt
    );
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_DB],
      Game.MODE_DB,
      "",
      App.CombinedTextures.db_icon_notxt
    );
    this.modeList.addItem(
      Game.MODE_TITLES[Game.MODE_TR],
      Game.MODE_TR,
      "",
      App.CombinedTextures.tr_icon_notxt
    );
    this.modeList.scale.x = this.modeList.scale.y = 0.9;
    this.container.addChild(this.modeList);
    this.serverCreationDurationLabel = new PIXI.BitmapText("Duration", {
      fontName: "Open Sans",
      fontSize: 24,
    });
    this.serverCreationDurationLabel.x = this.ox + 244;
    this.serverCreationDurationLabel.y = this.oy + 250;
    this.serverCreationDurationLabel.tint = 16777215;
    this.container.addChild(this.serverCreationDurationLabel);
    this.durationList = new Dropdown("duration", "", 120, 120);
    this.durationList.addListener(Button.BUTTON_RELEASED, (a) =>
      this.onDurationListSelect(a.data.value)
    );
    this.durationList.x = this.ox + 190;
    this.durationList.y = this.oy + 290;
    this.durationList.addItem("30 min", ServerCreationMenu.DURATION_A, "");
    this.durationList.addItem("1 hour", ServerCreationMenu.DURATION_B, "");
    this.durationList.addItem("1.5 hours", ServerCreationMenu.DURATION_C, "");
    this.durationList.addItem("2 hours", ServerCreationMenu.DURATION_D, "");
    this.durationList.addItem("3 hours", ServerCreationMenu.DURATION_E, "");
    this.durationList.addItem("4 hours", ServerCreationMenu.DURATION_F, "");
    this.durationList.addItem("6 hours", ServerCreationMenu.DURATION_G, "");
    this.durationList.scale.x = this.durationList.scale.y = 0.9;
    this.durationList.setValue(this.duration);
    this.container.addChild(this.durationList);
    this.serverList = new Dropdown("serverSelect", "Region", 180, 256);
    this.serverList.x = this.ox + 40;
    this.serverList.y = this.oy + 70;
    this.serverList.addListener(Button.BUTTON_RELEASED, (a) => {
      this.emit(Layer.Events.SERVER_CREATION_REGION, a.data.value);
    });
    this.container.addChild(this.serverList);
    this.serverList.setTint(16777215);
    this.updatePrice();
  }
  show() {
    super.show();
    Dropdown.AddInstance(this.serverList);
    Dropdown.AddInstance(this.durationList);
    Dropdown.AddInstance(this.modeList);
    this.serverList.clear();
    for (var a = 0; a < App.Servers.length; a++) {
      let b = App.Servers[a];
      this.serverList.addItem(b.title, b.id, b.players + " players");
    }
    0 < App.Servers.length &&
      (void 0 !== App.ConnectedServer.id
        ? this.serverList.setValue(App.ConnectedServer.id)
        : this.serverList.setValue(App.Servers[Math.floor(Math.random() * App.Servers.length)].id));
  }
  onModeListSelect(a) {
    this.mode = a;
    this.updatePrice();
  }
  onDurationListSelect(a) {
    this.duration = a;
    this.updatePrice();
  }
  onSetPrivate(a) {
    this.isPrivate = a;
    this.updatePrice();
  }
  onSetRanked(a) {
    this.isRanked = a;
    this.updatePrice();
  }
  onSetCustom(a) {
    this.isCustom = a;
    this.updatePrice();
    a
      ? ((this.customizationButton.alpha = 1), (this.customizationButton.interactive = !0))
      : ((this.customizationButton.alpha = 0.5), (this.customizationButton.interactive = !1));
  }
  updatePrice() {
    let a = 100;
    this.isPrivate
      ? ((a += 100),
        (this.serverCreationPasswordLabel.alpha = 1),
        (this.passwordField.alpha = 1),
        (this.passwordField.interactive = !0))
      : ((this.serverCreationPasswordLabel.alpha = 0.5),
        (this.passwordField.alpha = 0.5),
        this.passwordField.setText(""),
        (this.passwordField.interactive = !1));
    this.isRanked && (a += 0);
    this.isCustom && (a += 0);
    a += ServerCreationMenu.DURATION_PRICE_MAP[this.duration];
    this.serverCreationPriceValue.text = a.toString();
  }
  onCustomizeServerInit() {
    this.customizationMenu.setMode(this.mode);
    this.container.addChild(this.customizationMenu);
    this.customizationMenu.show();
  }
  onCreateServerCancel() {
    this.enableCreationInput();
    this.hideConfirmationContainer();
  }
  setErrorMessage(a = "") {
    this.errorMessage.text = a;
    this.errorMessage.x = 0.5 * (this.confirmationBackground.width - this.errorMessage.width);
  }
  onClientConnect() {
    this.setErrorMessage("");
  }
  onClientDisconnect() {}
  async onCreateServerInit() {
    this.disableCreationInput();
    this.setErrorMessage();
    this.confirmationAccept.enable();
    this.confirmationDecline.enable();
    this.container.addChild(this.confirmationContainer);
    await App.Layer.updateCredentialsIfExpired();
    App.GameClient.isConnected() ||
      (App.GameClient.hasListener(Client.CONNECT, this.onClientConnect) ||
        App.GameClient.addListener(Client.CONNECT, this.onClientConnectBinding),
      App.GameClient.connect(),
      this.setErrorMessage("Connecting.. please wait."));
  }
  hideConfirmationContainer() {
    this.container.removeChild(this.confirmationContainer);
  }
  disableCreationInput() {
    this.createButton.interactive = !1;
    this.createButton.alpha = 0.5;
    this.closeButton.setEnabled(!1);
    this.modeList.interactive = !1;
    this.modeList.alpha = 0.5;
    this.modeList.collapse();
    this.serverList.interactive = !1;
    this.serverList.alpha = 0.5;
    this.serverList.collapse();
    this.durationList.interactive = !1;
    this.durationList.alpha = 0.5;
    this.durationList.collapse();
    this.nameField.interactive = !1;
    this.nameField.alpha = 0.5;
    this.setPrivate.setEnabled(!1);
    this.setRanked.setEnabled(!1);
    this.setCustom.setEnabled(!1);
    this.isCustom &&
      ((this.customizationButton.interactive = !1), (this.customizationButton.alpha = 0.5));
    this.isPrivate && ((this.passwordField.interactive = !1), (this.passwordField.alpha = 0.5));
  }
  enableCreationInput() {
    this.createButton.interactive = !0;
    this.createButton.alpha = 1;
    this.closeButton.setEnabled(!0);
    this.modeList.interactive = !0;
    this.modeList.alpha = 1;
    this.serverList.interactive = !0;
    this.serverList.alpha = 1;
    this.durationList.interactive = !0;
    this.durationList.alpha = 1;
    this.isCustom &&
      ((this.customizationButton.interactive = !0), (this.customizationButton.alpha = 1));
    this.nameField.interactive = !0;
    this.nameField.alpha = 1;
    this.setPrivate.setEnabled(!0);
    this.setRanked.setEnabled(!0);
    this.setCustom.setEnabled(!0);
    this.isPrivate && ((this.passwordField.interactive = !0), (this.passwordField.alpha = 1));
  }
  async onCreateServerConfirm() {
    if (App.GameClient.isConnected()) {
      this.confirmationAccept.disable();
      this.confirmationDecline.disable();
      var a = App.ConnectedServer.id,
        b =
          (this.isPrivate ? "private," : "") +
          (this.isCustom ? "custom," : "") +
          (this.isRanked ? "stats" : ""),
        c = this.mode,
        d = this.duration,
        e = this.nameField.getText().trim(),
        f = this.passwordField.getText().trim(),
        g = App.Credential.id,
        h = {
          weapons: this.isCustom ? this.customization.weapons.map((k) => k.substring(1)) : [],
          maps: this.customization.maps,
          drops: this.customization.drops,
          shuriken: this.customization.shuriken,
        };
      (a = await APIClient.postCreateGame(a, b, c, d, e, f, h, g)) && !0 === a.success
        ? (this.disableCreationInput(),
          (this.createdServerName = a.token.name),
          (this.createdServerId = a.token.gameId),
          this.emit(Layer.Events.SERVER_CREATION_SESSION_INIT, a.token))
        : (this.setErrorMessage(a.error),
          this.confirmationAccept.enable(),
          this.confirmationDecline.enable());
    } else this.setErrorMessage("Not connected to any server.");
  }
  setCreatedStatus(a) {
    this.confirmationAccept.enable();
    this.confirmationDecline.enable();
    a.success
      ? (this.hideConfirmationContainer(), this.container.addChild(this.successContainer))
      : this.setErrorMessage(a.info);
  }
  onSuccessJoinGameAccept() {
    this.enableCreationInput();
    this.container.removeChild(this.successContainer);
    if (-1 !== this.createdServerId) {
      let a = this.passwordField.getText().trim();
      this.emit(Layer.Events.JOIN_GAME, this.createdServerName, this.createdServerId, a);
      this.createdServerId = -1;
      this.createdServerName = "";
    }
  }
  onSuccessToLobbyAccept() {
    this.enableCreationInput();
    this.container.removeChild(this.successContainer);
    this.emit(Layer.Events.SERVER_CREATION_JOIN_LOBBY);
    this.createdServerId = -1;
    this.createdServerName = "";
  }
}
ServerCreationMenu.DURATION_A = "30m";
ServerCreationMenu.DURATION_B = "60m";
ServerCreationMenu.DURATION_C = "90m";
ServerCreationMenu.DURATION_D = "120m";
ServerCreationMenu.DURATION_E = "180m";
ServerCreationMenu.DURATION_F = "240m";
ServerCreationMenu.DURATION_G = "360m";
ServerCreationMenu.DURATION_PRICE_MAP = {
  [ServerCreationMenu.DURATION_A]: 50,
  [ServerCreationMenu.DURATION_B]: 100,
  [ServerCreationMenu.DURATION_C]: 200,
  [ServerCreationMenu.DURATION_D]: 300,
  [ServerCreationMenu.DURATION_E]: 400,
  [ServerCreationMenu.DURATION_F]: 500,
  [ServerCreationMenu.DURATION_G]: 600,
};
var chatclient = {};
export class ChatClient extends PIXI.utils.EventEmitter {
  constructor() {
    super();
    this.socket = null;
  }
  connect(a) {
    this.socket && this.socket.readyState !== WebSocket.CLOSED && this.disconnect();
    a = -1 === window.location.hostname.indexOf("local") ? !0 : !1;
    let b = btoa(JSON.stringify(App.Credential));
    this.socket = new WebSocket(
      (a ? "wss" : "ws") + "://" + (a ? ChatClient.SERVER_DOMAIN : "localhost") + "?auth=" + b
    );
    this.socket.binaryType = "arraybuffer";
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
  }
  disconnect() {
    this.socket.close();
  }
  onOpen(a) {
    this.emit(ChatClient.CONNECT);
  }
  onMessage(a) {
    let b;
    try {
      b = JSON.parse(a.data);
    } catch (c) {
      return;
    }
    switch (b.type) {
      case ChatClient.TYPE_MSG:
        this.emit(ChatClient.MESSAGE, b);
        break;
      case ChatClient.TYPE_STATUS:
        this.emit(ChatClient.STATUS, b);
    }
  }
  onClose(a) {
    this.emit(ChatClient.DISCONNECT);
  }
  onError(a) {
    console.log("Chat client connection error");
  }
  compose(a = ChatClient.TYPE_MSG, b) {
    a = { type: a };
    void 0 !== b && (a.msg = b);
    return JSON.stringify(a);
  }
  send(a = ChatClient.TYPE_MSG, b) {
    this.socket.readyState === WebSocket.OPEN && ((a = this.compose(a, b)), this.socket.send(a));
  }
  isConnected() {
    return null !== this.socket && this.socket.readyState === WebSocket.OPEN;
  }
}
ChatClient.TYPE_LOCAL = -1;
ChatClient.TYPE_JOIN_CLAN_CHAT = 0;
ChatClient.TYPE_LEAVE_CLAN_CHAT = 1;
ChatClient.TYPE_MSG = 2;
ChatClient.TYPE_STATUS = 3;
ChatClient.MSG_PUBLIC = 0;
ChatClient.MSG_CLAN = 1;
ChatClient.MSG_FRIEND = 2;
ChatClient.SERVER_DOMAIN = "api2.ninja.io:8081";
ChatClient.SERVER_PORT = 8081;
ChatClient.CONNECT = "connect";
ChatClient.DISCONNECT = "disconnect";
ChatClient.MESSAGE = "message";
ChatClient.STATUS = "status";
var clanchatmenu = {};
export class ClanChatMenu extends Feature {
  constructor() {
    super();
    this.client = new ChatClient();
    this.client.on(ChatClient.CONNECT, () => this.onConnect());
    this.client.on(ChatClient.DISCONNECT, () => this.onDisconnect());
    this.client.on(ChatClient.MESSAGE, (a) => this.onMessage(a));
    this.client.on(ChatClient.STATUS, (a) => this.onStatus(a));
    this.messages = [];
    this.lines = [];
    this.down = this.dragging = !1;
    this.background = new PIXI.Graphics();
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRoundedRect(0, 0, 400, 320, 4);
    this.background.interactive = !0;
    this.container.addChild(this.background);
    this.background.on("mousedown", (a) => {
      a.stopPropagation();
      this.down = !0;
      this.ox = a.data.global.x / App.Scale;
      this.oy = a.data.global.y / App.Scale;
    });
    this.background.on("mouseup", (a) => {
      a.stopPropagation();
      this.down = this.dragging = !1;
    });
    this.background.on("mousemove", (a) => {
      if (this.down) {
        let b = a.data.global.x / App.Scale;
        a = a.data.global.y / App.Scale;
        let c = b - this.ox,
          d = a - this.oy;
        this.x += c;
        this.y += d;
        this.ox = b;
        this.oy = a;
        0 < Math.sqrt(c * c + d * d) && (this.dragging = !0);
      }
    });
    this.title = new PIXI.BitmapText(App.Credential.clan_name + " clan chat", {
      fontName: "Open Sans",
      fontSize: 22,
    });
    this.title.x = 4;
    this.title.y = 3;
    this.title.tint = 16763904;
    this.container.addChild(this.title);
    this.inputField = new InputField("chat_msg");
    this.inputField.setDimensions(400, 30);
    this.inputField.forceLowerCase = !1;
    this.inputField.setMaxChars(72);
    this.inputField.x = 0;
    this.inputField.y = this.height - 30;
    this.inputField.setFilter(
      UserInput.ALPHANUMERIC + UserInput.CHAT_SYMBOLS + UserInput.ALPHA_EXT
    );
    this.inputField.addListener(InputField.SUBMIT, (a) => this.onSubmitMessage(a.data.value));
    this.container.addChild(this.inputField);
    this.closeButton = new PIXI.Sprite(App.CombinedTextures.exit);
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.alpha = 0.5;
    this.closeButton.interactive = !0;
    this.closeButton.x = this.width - 28;
    this.closeButton.y = 2;
    this.closeButton.on("mousedown", (a) => {
      this.closeButton.alpha = 0.5;
      this.emit(Layer.Events.CLAN_CHAT_CANCEL);
      AudioEffects.ButtonClick.audio.play();
    });
    this.closeButton.on("mouseover", (a) => {
      this.closeButton.alpha = 1;
      AudioEffects.ButtonHover.audio.play();
    });
    this.closeButton.on("mouseout", (a) => {
      this.closeButton.alpha = 0.5;
    });
    this.container.addChild(this.closeButton);
    for (let a = 0; a < ClanChatMenu.MaxMessages; a++) {
      const b = new PIXI.BitmapText("", {
        fontName: "Open Sans",
        fontSize: 22,
        multiline: !0,
        align: "left",
      });
      b.x = 5;
      b.maxWidth = 360;
      b.interactive = !1;
      b.hitArea = new PIXI.Rectangle();
      this.addChild(b);
      this.lines.push(b);
    }
  }
  async onSubmitMessage(a) {
    a = a.trim();
    0 < a.length && this.client.send(ChatClient.TYPE_MSG, a);
    this.inputField.setText("");
    this.inputField.setFocus(!0);
  }
  onMessage(a) {
    this.addMessage(a);
  }
  onStatus(a) {
    this.title.text = App.Credential.clan_name + " clan chat [" + a.online + " online]";
  }
  addMessage(a) {
    this.messages.length === ClanChatMenu.MaxMessages && this.messages.shift();
    this.messages.push(a);
    this.updateConversation();
  }
  updateConversation() {
    let a = 290;
    for (let b = this.messages.length - 1; 0 <= b; b--) {
      const c = this.messages[b],
        d = this.lines[b];
      -1 === c.id
        ? ((d.text = c.msg), (d.tint = 16776960))
        : -2 === c.id
        ? ((d.text = c.msg), (d.tint = 16711680))
        : ((d.text = c.from + ": " + c.msg), (d.tint = 16777215));
      a -= d.height + 3;
      d.y = a;
      d.alpha = 16 > a ? 0 : 1;
    }
  }
  addLocalInfoMessage(a) {
    this.addMessage({ type: ChatClient.TYPE_LOCAL, from: "local", id: -1, msg: a });
  }
  removeMessages() {
    for (let a = 0; a < this.messages.length; a++) {
      let b = this.messages[a];
      b.msg = "";
      b.id = -1;
      b.from = "";
    }
    this.updateConversation();
  }
  onConnect() {
    this.title.text = App.Credential.clan_name + " clan chat [connected]";
    this.client.send(ChatClient.TYPE_JOIN_CLAN_CHAT);
  }
  onDisconnect() {
    this.title.text = App.Credential.clan_name + " clan chat [disconnected]";
  }
  show() {
    super.show();
    this.title.text = App.Credential.clan_name + " clan chat [connecting]";
    this.client.connect();
  }
  hide() {
    super.hide();
    this.client.disconnect();
    this.removeMessages();
  }
}
ClanChatMenu.MaxMessages = 12;
var clanmenu = {};
export class ClanMenu extends Feature {
  constructor() {
    super();
    this.searchTimeout = null;
    this.members = [];
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.interactive = !0;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504, 10);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.background.beginFill(6710886, 0.3);
    this.background.drawRoundedRect(24, 48, 48, 48, 4);
    this.background.endFill();
    this.background.drawRoundedRect(22, 138, 307, 356, 4);
    this.background.endFill();
    this.background.beginFill(6710886, 0.3);
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.drawRoundedRect(340, 138, 296, 190, 8);
    this.background.endFill();
    this.container.addChild(this.background);
    this.ox = 40;
    this.oy = 20;
    this.searchValue = "";
    this.titleText = new PIXI.Text("Clan profile", FontStyle.MediumOrangeText);
    this.titleText.x = 0.5 * this.width - 20;
    this.titleText.y = this.oy + 36;
    this.titleText.anchor.x = 0.5;
    this.titleText.resolution = 2;
    this.container.addChild(this.titleText);
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.CLAN_CANCEL));
    this.container.addChild(this.closeButton);
    this.uploadText = new PIXI.Text("Clan\nbanner", {
      fontName: "Arial",
      fontSize: 12,
      fill: 12303291,
      strokeThickness: 2,
      lineJoin: "round",
      wordWrap: !0,
      wordWrapWidth: 80,
      align: "center",
    });
    this.uploadText.x = this.ox - 12;
    this.uploadText.y = this.oy + 76;
    this.uploadText.resolution = 2;
    this.container.addChild(this.uploadText);
    this.nameText = new PIXI.Text("Loading..", {
      fontName: "Arial",
      fontSize: 19,
      lineHeight: 16,
      fill: 16776960,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.nameText.x = this.ox + 44;
    this.nameText.y = this.oy + 78;
    this.nameText.resolution = 2;
    this.container.addChild(this.nameText);
    this.memberText = new PIXI.Text("- members", FontStyle.MediumMenuTextOrange2);
    this.memberText.x = this.ox - 14;
    this.memberText.y = this.oy + 128;
    this.memberText.resolution = 2;
    this.container.addChild(this.memberText);
    this.statsText = new PIXI.Text("Clan statistics", FontStyle.MediumMenuTextOrange2);
    this.statsText.x = this.ox + 300;
    this.statsText.y = this.oy + 128;
    this.statsText.resolution = 2;
    this.container.addChild(this.statsText);
    this.levelIcon = new PIXI.Sprite();
    this.levelIcon.x = this.ox + 305;
    this.levelIcon.y = this.oy + 180;
    this.levelIcon.scale.x = this.levelIcon.scale.y = 0.5;
    this.levelIcon.resolution = 2;
    this.container.addChild(this.levelIcon);
    this.levelLabel = new PIXI.Text("Avg. XP Level", FontStyle.SmallMenuTextOrange);
    this.levelLabel.x = this.ox + 314;
    this.levelLabel.y = this.oy + 164;
    this.levelLabel.resolution = 2;
    this.container.addChild(this.levelLabel);
    this.levelText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite);
    this.levelText.x = this.ox + 341;
    this.levelText.y = this.oy + 188;
    this.levelText.resolution = 2;
    this.container.addChild(this.levelText);
    this.levelRankLabel = new PIXI.Text("XP Rank", FontStyle.SmallMenuTextOrange);
    this.levelRankLabel.x = this.ox + 314;
    this.levelRankLabel.y = this.oy + 218;
    this.levelRankLabel.resolution = 2;
    this.container.addChild(this.levelRankLabel);
    this.levelRankText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite);
    this.levelRankText.x = this.ox + 314;
    this.levelRankText.y = this.oy + 242;
    this.levelRankText.resolution = 2;
    this.container.addChild(this.levelRankText);
    this.skillRankLabel = new PIXI.Text("Skill rank", FontStyle.SmallMenuTextOrange);
    this.skillRankLabel.x = this.ox + 314;
    this.skillRankLabel.y = this.oy + 272;
    this.skillRankLabel.resolution = 2;
    this.container.addChild(this.skillRankLabel);
    this.skillRankText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite);
    this.skillRankText.x = this.ox + 314;
    this.skillRankText.y = this.oy + 296;
    this.skillRankText.resolution = 2;
    this.container.addChild(this.skillRankText);
    this.killsLabel = new PIXI.Text("Kills", FontStyle.SmallMenuTextOrange);
    this.killsLabel.x = this.ox + 460;
    this.killsLabel.y = this.oy + 164;
    this.killsLabel.resolution = 2;
    this.container.addChild(this.killsLabel);
    this.killsText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite);
    this.killsText.x = this.ox + 460;
    this.killsText.y = this.oy + 188;
    this.killsText.resolution = 2;
    this.container.addChild(this.killsText);
    this.deathsLabel = new PIXI.Text("Deaths", FontStyle.SmallMenuTextOrange);
    this.deathsLabel.x = this.ox + 460;
    this.deathsLabel.y = this.oy + 218;
    this.container.addChild(this.deathsLabel);
    this.deathsText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite);
    this.deathsText.x = this.ox + 460;
    this.deathsText.y = this.oy + 242;
    this.deathsText.resolution = 2;
    this.container.addChild(this.deathsText);
    this.ctfLabel = new PIXI.Text("CTF caps", FontStyle.SmallMenuTextOrange);
    this.ctfLabel.x = this.ox + 460;
    this.ctfLabel.y = this.oy + 272;
    this.ctfLabel.resolution = 2;
    this.container.addChild(this.ctfLabel);
    this.ctfText = new PIXI.Text("Loading..", FontStyle.SmallMenuTextWhite);
    this.ctfText.x = this.ox + 460;
    this.ctfText.y = this.oy + 296;
    this.ctfText.resolution = 2;
    this.container.addChild(this.ctfText);
    this.createdText = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 15,
      fill: 13412864,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.createdText.x = 478;
    this.createdText.y = this.oy + 72;
    this.createdText.resolution = 2;
    this.container.addChild(this.createdText);
    this.listContainer = new PIXI.Container();
    this.listContainer.x = this.ox - 14;
    this.listContainer.y = this.oy + 122;
    this.memberListContainer = new PIXI.Container();
    this.listContainer.addChild(this.memberListContainer);
    this.container.addChild(this.listContainer);
    this.scrollbar = new ClanMemberListScrollbar(350);
    this.scrollbar.x = this.ox + 265;
    this.scrollbar.y = this.oy + 166;
    this.scrollbar.on(ClanMemberListScrollbar.SCROLL, (a) => {
      this.maskMemberList(a);
    });
    this.container.x = 0.5 * -this.width;
  }
  show(a) {
    super.show();
    this.loadClan(a);
    this.scrollbar.enableWheel();
  }
  hide() {
    this.scrollbar.disableWheel();
  }
  async loadClan(a) {
    var b = await APIClient.getClanByClanId(a);
    if (b.success) {
      var c = b.clan,
        d = new Date(Date.parse(c.created)),
        e = d.getFullYear(),
        f = d.getMonth() + 1;
      d = d.getDate();
      e = e.toString() + "-" + f.toString().padStart(2, "0") + "-" + d.toString().padStart(2, "0");
      f = Math.min(
        Math.max(
          Math.floor(0.2 * Math.sqrt(parseInt(c.experience) / parseInt(b.memberCount) / 15.625)),
          1
        ),
        240
      );
      d = Math.max(Math.floor((f / 240) * 15) + 1);
      this.nameText.text = c.name;
      this.memberText.text = b.memberCount + " members";
      this.createdText.text = "Founded on " + e;
      this.levelText.text = numberWithPeriods(f);
      this.levelIcon.texture = App.CombinedTextures["skill_icon_" + d];
      this.levelRankText.text = c.experience_ranking.toString();
      this.skillRankText.text =
        c.skill_ranking.toString() +
        "\n" +
        Game.MapSkillToTitle(parseInt(c.skill) / parseInt(b.memberCount));
      this.killsText.text = numberWithPeriods(c.kills);
      this.deathsText.text = numberWithPeriods(c.deaths);
      this.ctfText.text = numberWithPeriods(c.caps);
      b = await APIClient.getClanMembers(a);
      if (b.success) {
        this.members = [];
        this.memberListContainer.removeChildren();
        a = b.members;
        for (b = 0; b < a.length; b++)
          (c = a[b]),
            (c = new ClanMemberMenuItem(c.id, c.name, c.role, {})),
            (c.x = 0),
            (c.y = 47 + b * ClanMemberListScrollbar.ItemHeight),
            c.on(ClanMenu.ACCESS_PROFILE, (g) => this.emit(Layer.Events.USER_ACCESS, g)),
            this.members.push(c),
            this.members.length <
              Math.floor(ClanMemberListScrollbar.ListHeight / ClanMemberListScrollbar.ItemHeight) &&
              this.memberListContainer.addChild(c);
        this.members.length >
        Math.floor(ClanMemberListScrollbar.ListHeight / ClanMemberListScrollbar.ItemHeight)
          ? this.container.addChild(this.scrollbar)
          : this.container.removeChild(this.scrollbar);
        this.scrollbar.reset();
        this.maskMemberList(0);
      }
    }
  }
  maskMemberList(a) {
    let b = Math.floor(ClanMemberListScrollbar.ListHeight / ClanMemberListScrollbar.ItemHeight);
    if (this.members.length <= b) this.memberListContainer.y = 0;
    else {
      this.memberListContainer.removeChildren();
      this.memberListContainer.y = -(
        a *
        (this.members.length * ClanMemberListScrollbar.ItemHeight -
          (ClanMemberListScrollbar.ListHeight - ClanMemberListScrollbar.ItemHeight))
      );
      a = this.memberListContainer.y;
      var c = Math.round(Math.abs(a / ClanMemberListScrollbar.ItemHeight));
      for (let e = 0; e < b; e++) {
        let f = this.members[c + e];
        this.memberListContainer.addChild(f);
        if (0 === e) {
          var d = c * ClanMemberListScrollbar.ItemHeight + a;
          f.alpha = 0 <= d ? 1 : 1 - (1 / (0.5 * ClanMemberListScrollbar.ItemHeight)) * Math.abs(d);
        } else
          e === b - 1
            ? ((d = c * ClanMemberListScrollbar.ItemHeight + a),
              (f.alpha =
                0 > d ? 1 : 1 - (1 / (0.5 * ClanMemberListScrollbar.ItemHeight)) * Math.abs(d)))
            : (f.alpha = 1);
      }
    }
  }
}
ClanMenu.ACCESS_PROFILE = "accessProfile";
export class ClanMemberListScrollbar extends PIXI.Container {
  constructor(a, b = 0) {
    super();
    this.scrolling = !1;
    this.start = b;
    this.h = a;
    this.bh = this.h - 39;
    this.oy = 0;
    this.scrollBar = new PIXI.Graphics();
    this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
    this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
    this.scrollBar.endFill();
    this.scrollBar.x = 0;
    this.scrollBar.y = 0;
    this.scrollBar.interactive = !0;
    this.scrollBar.alpha = 0.5;
    this.addChild(this.scrollBar);
    this.scrollBar.hitArea = new PIXI.Rectangle(-10, -2, 50, this.h + 30);
    this.scrollButton = new PIXI.Graphics();
    this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
    this.scrollButton.beginFill(16777215, 0.2);
    this.scrollButton.drawRoundedRect(0, -3, 16, 35, 4);
    this.scrollButton.endFill();
    this.scrollButton.hitArea = new PIXI.Rectangle();
    this.addChild(this.scrollButton);
    this.scrollButton.x = 2;
    this.scrollButton.y = this.bh * this.start;
    this.scrollBar.on("mouseover", () => {
      this.scrollBar.alpha = 1;
    });
    this.scrollBar.on("mouseout", () => {
      this.scrollBar.alpha = 0.5;
    });
    this.scrollBar.on("mouseupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("mousedown", (c) => {
      c.stopPropagation();
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
    });
    this.scrollBar.on("mouseup", (c) => {
      c.stopPropagation();
      this.scrolling = !1;
    });
    this.scrollBar.on("mousemove", (c) => {
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointerup", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerupoutside", () => {
      this.scrolling = !1;
    });
    this.scrollBar.on("pointerdown", (c) => {
      this.scrolling = !0;
      this.oy = c.data.global.y / App.Scale;
      this.scroll(c.data.global.y / App.Scale);
    });
    this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
    this.wheelListener = (c) => {
      c = c.data.delta;
      this.scrolling = !0;
      this.scroll(this.oy + 0.2 * c);
      this.scrolling = !1;
    };
  }
  enableWheel() {
    UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
      UserInput.addListener(UserInput.WHEEL, this.wheelListener);
  }
  disableWheel() {
    UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
  }
  scroll(a) {
    if (this.scrolling) {
      let b = this.scrollButton.y + (a - this.oy);
      b = 0 > b ? 0 : b > this.bh ? this.bh : b;
      let c = (1 / this.h) * b * (this.h / this.bh);
      this.scrollButton.y = b;
      this.oy = a;
      this.emit(ClanMemberListScrollbar.SCROLL, c);
    }
  }
  reset() {
    this.scrollButton.y = (this.h - 39) * this.start;
  }
  onMouseOver() {
    this.scrollButton.alpha = 1;
  }
  onMouseOut() {
    this.scrollButton.alpha = 0.5;
  }
}
ClanMemberListScrollbar.SCROLL = "scroll";
ClanMemberListScrollbar.ListHeight = 355;
ClanMemberListScrollbar.ItemHeight = 30;
export class ClanMemberMenuItem extends PIXI.Container {
  constructor(a, b, c, d) {
    super();
    this.id = a;
    this.name = b;
    this.role = c;
    this.options = d;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRoundedRect(0, 0, 276, 26, 4);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.alpha = 0.5;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.5;
    });
    this.background.on("mousedown", () => this.emit(ClanMenu.ACCESS_PROFILE, this.id));
    this.addChild(this.background);
    this.nameLabel = new PIXI.BitmapText(this.name, {
      fontName: "Open Sans",
      fontSize: 22,
      align: "left",
    });
    this.nameLabel.x = 8;
    this.nameLabel.y = 2;
    this.nameLabel.hitArea = new PIXI.Rectangle();
    this.addChild(this.nameLabel);
    if ("captain" === this.role || "leader" === this.role)
      (this.roleLabel = new PIXI.BitmapText(this.role, {
        fontName: "Open Sans",
        fontSize: 22,
        align: "left",
      })),
        (this.roleLabel.x = 270 - this.roleLabel.width),
        (this.roleLabel.y = 2),
        (this.roleLabel.tint = "leader" === this.role ? 8978312 : 16746632),
        (this.roleLabel.hitArea = new PIXI.Rectangle()),
        this.addChild(this.roleLabel);
  }
}
var loadingmenu = {};
export class LoadingMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 0;
    this.background.beginFill(0, 0);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.lineStyle(3, 3355443, 1, 2);
    this.background.beginFill(0, 0.9);
    this.background.drawRect(130, 100, 400, 140, 8);
    this.background.endFill();
    this.container.addChild(this.background);
    this.background.hitArea = new PIXI.Rectangle(0, 0, 660, 524);
    this.background.interactive = !0;
    this.cancelCount = LoadingMenu.CANCEL_COUNT;
    this.title = new PIXI.Text("Loading...", FontStyle.VSLoadingText);
    this.title.x = 290;
    this.title.y = 150;
    this.title.tint = 16763904;
    this.title.resolution = 2;
    this.container.addChild(this.title);
    this.container.x = 0.5 * -this.container.width;
    this.container.y = 40;
    this.visualizer = new Visualizer(176, 176, !1, !1, !0);
    this.visualizer.scale.x = -0.7;
    this.visualizer.scale.y = 0.7;
    this.visualizer.x = 268;
    this.visualizer.y = 110;
    this.container.addChild(this.visualizer);
    this.cancelButton = new Button("cancel");
    this.cancelButton.selected = !0;
    this.cancelButton.setText("Cancel");
    this.cancelButton.scale.x = this.cancelButton.scale.y = 0.8;
    this.cancelButton.addListener(Button.BUTTON_RELEASED, () =>
      this.emit(Layer.Events.LOADING_CANCEL)
    );
    this.cancelButton.x = this.title.x + 0.5 * (this.title.width - this.cancelButton.width);
    this.cancelButton.y = this.title.y + 40;
    this.cancelButton.setTint(16763904);
    this.container.addChild(this.cancelButton);
    this.cancelButton.visible = !1;
  }
  update() {
    this.visualizer.update();
    0 === this.cancelCount ? (this.cancelButton.visible = !0) : this.cancelCount--;
  }
  show() {
    this.cancelButton.visible = !1;
    this.cancelCount = LoadingMenu.CANCEL_COUNT;
    this.visualizer.applyCustomization(App.Credential.customization);
    this.setTitle("Loading...");
    this.container.x = 0.5 * -this.container.width;
  }
  setTitle(a) {
    this.title.text = a;
  }
}
LoadingMenu.CANCEL_COUNT = 60;
var renamemenu = {};
export class RenameMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.2, 0);
    this.background.beginFill(0, 0.4);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(120, 88, 420, 348, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(130, 97, 400, 330, 10);
    this.background.endFill();
    this.background.interactive = !0;
    this.container.addChild(this.background);
    this.ox = 160;
    this.oy = 108;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 160;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.RENAME_CANCEL));
    this.container.addChild(this.closeButton);
    this.loginTitle = new PIXI.Text("Complete registration", FontStyle.MediumOrangeText);
    this.loginTitle.x = this.ox - 10;
    this.loginTitle.y = this.oy + 48;
    this.container.addChild(this.loginTitle);
    this.renameDescription = new PIXI.Text(
      "Choose a username and a password.\nAll your current progress will be saved.",
      {
        fontSize: 16,
        fontFamily: "Arial",
        fill: 15658734,
        lineJoin: "round",
        strokeThickness: 2,
        lineHeight: 24,
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 380,
      }
    );
    this.renameDescription.x = this.ox - 10;
    this.renameDescription.y = this.oy + 88;
    this.container.addChild(this.renameDescription);
    this.usernameTitle = new PIXI.Text("Username", {
      fontName: "Arial",
      fontSize: 16,
      fill: 16755200,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.usernameTitle.x = this.ox;
    this.usernameTitle.y = this.oy + 140;
    this.container.addChild(this.usernameTitle);
    this.passwordTitle = new PIXI.Text("Password", {
      fontName: "Arial",
      fontSize: 16,
      fill: 16755200,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.passwordTitle.x = this.ox;
    this.passwordTitle.y = this.oy + 200;
    this.container.addChild(this.passwordTitle);
    this.errorMessage = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 16,
      fill: 16711680,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.errorMessage.x = this.ox;
    this.errorMessage.y = this.oy + 310;
    this.nameField = new InputField("rename_name");
    this.nameField.setDimensions(300, 35);
    this.nameField.forceLowerCase = !1;
    this.nameField.setMaxChars(18);
    this.nameField.x = this.ox;
    this.nameField.y = this.oy + 160;
    this.nameField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#^&*-._:=[]"
    );
    this.container.addChild(this.nameField);
    this.passwordField = new InputField("rename_password");
    this.passwordField.setDimensions(300, 35);
    this.passwordField.forceLowerCase = !1;
    this.passwordField.setMaxChars(32);
    this.passwordField.setPassword(!0);
    this.passwordField.x = this.ox;
    this.passwordField.y = this.oy + 220;
    this.passwordField.setFilter(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.@!#$%^&*()[]"
    );
    this.container.addChild(this.passwordField);
    this.submitButton = new Button("rename");
    this.submitButton.selected = !0;
    this.submitButton.setText("Save");
    this.submitButton.scale.x = this.submitButton.scale.y = 0.8;
    this.submitButton.addListener(Button.BUTTON_RELEASED, this.onSubmitButtonReleased.bind(this));
    this.submitButton.x = this.ox + 11;
    this.submitButton.y = this.oy + 274;
    this.submitButton.setTint(16763904);
    this.container.addChild(this.submitButton);
    this.loadingContainer = new PIXI.Container();
    this.loadingBackground = new PIXI.Graphics();
    this.loadingBackground.x = 0;
    this.loadingBackground.y = 0;
    this.loadingBackground.lineStyle(3, 11184810, 0.5, 0);
    this.loadingBackground.beginFill(0, 0.8);
    this.loadingBackground.drawRoundedRect(0, 0, 300, 80, 10);
    this.loadingBackground.endFill();
    this.loadingContainer.addChild(this.loadingBackground);
    this.loadingText = new PIXI.Text("Updating account...", FontStyle.MediumOrangeText);
    this.loadingText.x = 0.5 * this.loadingBackground.width;
    this.loadingText.y = 0.5 * this.loadingBackground.height;
    this.loadingText.anchor.x = this.loadingText.anchor.y = 0.5;
    this.loadingContainer.addChild(this.loadingText);
    this.loadingContainer.x = 0.5 * -this.loadingBackground.width;
    this.loadingContainer.y = 0.5 * this.container.height - 0.5 * this.loadingBackground.height;
    this.completedContainer = new PIXI.Container();
    this.completedBackground = new PIXI.Graphics();
    this.completedBackground.x = 0;
    this.completedBackground.y = 0;
    this.completedBackground.lineStyle(3, 11184810, 0.5, 0);
    this.completedBackground.beginFill(0, 0.8);
    this.completedBackground.drawRoundedRect(0, 0, 260, 140, 10);
    this.completedBackground.endFill();
    this.completedContainer.addChild(this.completedBackground);
    this.completedText = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 19,
      fill: 16763904,
      strokeThickness: 3,
      lineJoin: "round",
      align: "center",
      wordWrap: !0,
      wordWrapWidth: 330,
    });
    this.completedText.x = 0.5 * this.completedBackground.width;
    this.completedText.y = 0.3 * this.completedBackground.height;
    this.completedText.anchor.x = this.completedText.anchor.y = 0.5;
    this.completedContainer.addChild(this.completedText);
    this.completedButton = new Button("continue");
    this.completedButton.selected = !0;
    this.completedButton.setText("Continue");
    this.completedButton.scale.x = this.completedButton.scale.y = 0.8;
    this.completedButton.addListener(
      Button.BUTTON_RELEASED,
      this.onCompletedButtonReleased.bind(this)
    );
    this.completedButton.x =
      0.5 * this.completedBackground.width - 0.5 * this.completedButton.width;
    this.completedButton.y = this.completedBackground.height - (this.completedButton.height + 16);
    this.completedButton.setTint(16763904);
    this.completedContainer.addChild(this.completedButton);
    this.completedContainer.x = 0.5 * -this.completedBackground.width;
    this.completedContainer.y = 0.5 * this.container.height - 0.5 * this.completedBackground.height;
    this.container.x = 0.5 * -this.width;
  }
  show() {
    this.nameField.setText(App.Credential.username);
  }
  reset() {}
  validateForm() {
    let a = !0,
      b = "",
      c = this.nameField.getText(),
      d = this.passwordField.getText();
    4 > c.length
      ? ((a = !1),
        (b = "Username too short. Use at least 4 characters."),
        this.nameField.markInvalid())
      : this.nameField.markNone();
    a && 8 > d.length
      ? ((a = !1),
        (b = "Password too short. Use at least 8 characters."),
        this.passwordField.markInvalid())
      : this.passwordField.markNone();
    return { valid: a, error: b };
  }
  async onSubmitButtonReleased() {
    var a = this.validateForm();
    a.valid
      ? (this.displayErrorMessage(""),
        this.displayLoadingMessage(),
        (a = await APIClient.postAutogenRename(
          this.nameField.text.text,
          this.passwordField.text.text,
          App.Credential.id
        )),
        this.loadingContainer.parent && this.removeChild(this.loadingContainer),
        (this.container.alpha = 1),
        a.success
          ? (Registry.Instance.remove(Registry.Key.AUTOGEN),
            (App.Autogen = !1),
            this.emit(Layer.Events.RENAME_COMPLETED),
            this.displayCompletedMessage())
          : (this.displayErrorMessage(a.error),
            this.submitButton.enable(),
            this.nameField.markInvalid(),
            (this.nameField.interactive = !0),
            (this.passwordField.interactive = !0)))
      : this.displayErrorMessage(a.error);
  }
  displayLoadingMessage() {
    this.addChild(this.loadingContainer);
    this.submitButton.disable();
    this.nameField.interactive = !1;
    this.passwordField.interactive = !1;
  }
  displayCompletedMessage() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.addChild(this.completedContainer);
    this.submitButton.disable();
    this.completedText.text = "Registration completed.";
    this.nameField.interactive = !1;
    this.passwordField.interactive = !1;
  }
  onCompletedButtonReleased() {
    this.loadingContainer.parent && this.removeChild(this.loadingContainer);
    this.completedContainer.parent && this.removeChild(this.completedContainer);
    this.passwordField.setText("");
    this.emit(Layer.Events.RENAME_CANCEL);
  }
  onCancelButtonReleased() {
    this.emit(Layer.Events.RENAME_CANCEL);
  }
  displayErrorMessage(a) {
    this.errorMessage.text = a;
    this.errorMessage.parent || this.container.addChild(this.errorMessage);
  }
}
var logoutmenu = {};
export class LogoutMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.2, 0);
    this.background.beginFill(0, 0.4);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(120, 88, 420, 348, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(130, 97, 400, 330, 10);
    this.background.endFill();
    this.background.interactive = !0;
    this.container.addChild(this.background);
    this.ox = 160;
    this.oy = 108;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 160;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.LOGOUT_CANCEL));
    this.container.addChild(this.closeButton);
    this.loginTitle = new PIXI.Text("Logout", FontStyle.MediumOrangeText);
    this.loginTitle.x = this.ox - 10;
    this.loginTitle.y = this.oy + 48;
    this.loginTitle.resolution = 2;
    this.container.addChild(this.loginTitle);
    this.autogenDescription = new PIXI.Text(
      "Important: No password has been set for this account.\n\nLogging out means you will lose all progress.\n\nClick on 'Complete registration' to save your progress.",
      {
        fontSize: 16,
        fontFamily: "Arial",
        fill: 15658734,
        lineJoin: "round",
        strokeThickness: 2,
        lineHeight: 24,
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 330,
      }
    );
    this.autogenDescription.x = this.ox - 10;
    this.autogenDescription.y = this.oy + 88;
    this.autogenDescription.resolution = 2;
    this.container.addChild(this.autogenDescription);
    this.renameButton = new Button("rename");
    this.renameButton.selected = !0;
    this.renameButton.setText("Complete registration");
    this.renameButton.scale.x = this.renameButton.scale.y = 0.8;
    this.renameButton.addListener(Button.BUTTON_RELEASED, this.onRenameButtonReleased.bind(this));
    this.renameButton.x = this.ox + 4;
    this.renameButton.y = this.oy + 300;
    this.renameButton.setTint(16763904);
    this.container.addChild(this.renameButton);
    this.logoutButton = new Button("logout");
    this.logoutButton.selected = !0;
    this.logoutButton.setText("Logout");
    this.logoutButton.scale.x = this.logoutButton.scale.y = 0.8;
    this.logoutButton.addListener(Button.BUTTON_RELEASED, this.onLogoutButtonReleased.bind(this));
    this.logoutButton.x = this.renameButton.x + this.renameButton.width + 16;
    this.logoutButton.y = this.oy + 300;
    this.logoutButton.setTint(16711680);
    this.container.addChild(this.logoutButton);
    this.container.x = 0.5 * -this.width;
  }
  show() {
    this.loginTitle.text = "Logout - " + App.Credential.username;
  }
  reset() {}
  onRenameButtonReleased() {
    this.emit(Layer.Events.RENAME_ACCESS);
  }
  onLogoutButtonReleased() {
    this.emit(Layer.Events.LOGOUT);
  }
}

var game = {};
export class Game extends PIXI.Container {
  constructor(a) {
    super();
    this.sessionId = a;
    this.settings = Registry.Instance[Registry.Key.SETTINGS];
    this.clients = {};
    this.numClients = 0;
    this.canvas = new Canvas();
    this.manager = new Manager(this.sessionId);
    this.manager.onPlayerSpawn = (b) => this.clients[b];
    this.manager.setCamera(this.canvas.getCamera());
    this.manager.mute(!this.settings.sound.enabled);
    this.manager.on(Protocol.GAME, (b) => this.emit(Protocol.GAME, b));
    this.manager.on(ModelEvent.PLAYER_SPAWN, () => this.onPlayerSpawn());
    this.manager.on(ModelEvent.PLAYER_DEATH, (b) => this.onPlayerDeath(b));
    this.manager.on(ModelEvent.PLAYER_SCORE, (b) => this.onPlayerScore(b));
    this.manager.on(ModelEvent.PLAYER_COMBO, () => this.onPlayerCombo());
    this.manager.on(ModelEvent.PLAYER_SPREE, () => this.onPlayerSpree());
    this.manager.on(ModelEvent.DB_ROUND_END, (b) => this.onDbRoundEnd(b));
    this.manager.on(ModelEvent.UPDATE_ENVIRONMENT, () => this.onUpdateEnvironment());
    this.manager.on(ModelEvent.MESSAGE, (b) => this.onModelMessage(b));
    this.manager.on(ModelEvent.INITIAL, () => this.canvas.initial());
    this.manager.on(ModelEvent.SUBMERGE, (b) => this.canvas.onSubmerge(b));
    this.manager.on(ModelEvent.SURFACE, (b) => this.canvas.onSurface(b));
    this.canvas.on(CanvasEvent.MOUSE_DOWN, () => this.onMouseDown());
    this.canvas.on(CanvasEvent.MOUSE_UP, () => this.onMouseUp());
    this.canvas.on(CanvasEvent.RIGHT_DOWN, () => this.onRightDown());
    this.canvas.on(CanvasEvent.RIGHT_UP, () => this.onRightUp());
    this.canvas.on(CanvasEvent.MOUSE_MOVE, (b) => this.onMouseMove(b));
    this.canvas.on(CanvasEvent.REQUEST_LOCAL_OBJECT, (b) => this.manager.requestLocalObject(b));
    this.canvas.on(CanvasEvent.SCALE, (b) =>
      this.canvas.layers.forEach((c) => (c.scale.x = c.scale.y = b))
    );
    this.onKeyDownListener = (b) => this.onKeyDown(b);
    this.onKeyUpListener = (b) => this.onKeyUp(b);
    this.canvas.setManager(this.manager);
    this.onDisplayAdButton = this.mode = null;
    this.ignoreMovementJoystickViewing = this.readyToSpawn = !1;
    this.lastJoystickNV = { x: 0, y: 0 };
    this.mutePref = !1;
    this.lastSent = "";
    this.hud = new Hud(this.manager);
    this.hud.on(HudEvent.SELECT_ITEM, (b) => this.onSelectItem(b));
    this.hud.on(HudEvent.MUTE_SOUND, (b) => this.onMute(b));
    this.hud.on(HudEvent.EXIT, () => this.emit(Layer.Events.DISCONNECT));
    this.hud.on(HudEvent.SIGNAL_READY, () => this.onCmdReady());
    this.lastInputUpdateTime = 0;
    this.reticle = new PIXI.Sprite(App.CombinedTextures.cursor_def);
    this.reticle.anchor.x = 0.5;
    this.reticle.anchor.y = 0.5;
    this.reticle.alpha = 0.8;
    this.reticle.x = 0.5 * App.ClientWidth;
    this.reticle.y = 0.5 * App.ClientHeight;
    App.IsMobile && (this.reticle.visible = !1);
    this.reticle.hitArea = new PIXI.Rectangle();
    this.animTimeout = this.busyTimeout = null;
    this.canvas.layers.forEach((b) => this.addChild(b));
    this.addChild(this.hud);
    this.settings.graphics.reticleLine &&
      ((this.reticleLine = new PIXI.Sprite(App.CombinedTextures.reticle_line)),
      (this.reticleLine.alpha = 0.4),
      (this.reticleLine.anchor.x = 1),
      (this.reticleLine.anchor.y = 0.5),
      this.addChild(this.reticleLine),
      App.IsMobile && (this.reticleLine.visible = !1));
    this.addChild(this.reticle);
    this.gameover = !1;
    this.input = Player.Input;
    this.interpreter = new Interpreter(this);
    this.interpreter.addCommand(GameCommands.MESSAGE, (b) => this.onCmdMessage(b));
    this.interpreter.addCommand(GameCommands.CLEAR, () => this.onCmdClear());
    this.interpreter.addCommand(GameCommands.SHUTDOWN, () => this.onCmdShutdown());
    this.interpreter.addCommand(GameCommands.LOAD, (b) => this.onCmdLoad(b));
    this.interpreter.addCommand(GameCommands.READY, () => this.onCmdReady());
    this.interpreter.addCommand(GameCommands.SPAWN, () => this.onCmdSpawn());
    this.interpreter.addCommand(GameCommands.PAUSE, () => this.onCmdPause());
    this.interpreter.addCommand(GameCommands.SPECTATE, () => this.onCmdSpectate());
    this.interpreter.addCommand(GameCommands.JOIN, () => this.onCmdJoin());
    this.interpreter.addCommand(GameCommands.KILL, (b) => this.onCmdKill(b));
    this.interpreter.addCommand(GameCommands.LOGIN, (b) => this.onCmdLogin(b));
    this.interpreter.addCommand(GameCommands.CLIENTS, () => this.onCmdClients());
    this.interpreter.addCommand(GameCommands.COMMANDS, () => this.onCmdCommands());
    this.interpreter.addCommand(GameCommands.KICK, (b) => this.onCmdKick(b));
    this.interpreter.addCommand(GameCommands.BALANCE, () => this.onCmdBalance());
    this.interpreter.addCommand(GameCommands.PARAMS, () => this.onCmdParams());
    this.interpreter.addCommand(GameCommands.MEMSTATS, () => this.onCmdMemStats());
    this.interpreter.addCommand(GameCommands.WAVE, () => this.onCmdWave());
    this.interpreter.addCommand(GameCommands.SALUTE, () => this.onCmdSalute());
    this.interpreter.addCommand(GameCommands.MAGIC, () => this.onCmdMagic());
    this.interpreter.addCommand(GameCommands.TOSS, () => this.onCmdToss());
    this.interpreter.addCommand(GameCommands.LOG_PERF, () => this.onCmdLogPerf());
    this.interpreter.addCommand(GameCommands.SPAWN_BOT, (b) => this.onCmdSpawnBot(b));
    this.interpreter.addCommand(GameCommands.IMMORTAL, (b) => this.onCmdImmortal(b));
    this.interpreter.setDefaultCommand(GameCommands.MESSAGE);
    App.Console.on(CommandConsole.SHOW, () => this.onShowConsole());
    App.Console.on(CommandConsole.HIDE, () => this.onHideConsole());
    this.onGameDataMap = {
      [Protocol.Game.INFO]: (b) => this.onInfo(b),
      [Protocol.Game.MESSAGE]: (b) => this.onMessage(b),
      [Protocol.Game.STATUS]: (b) => this.onStatus(b),
    };
    this.gameStatusMap = {
      [GameStatus.Player.JOIN]: (b) => {
        this.playerJoined(b);
      },
      [GameStatus.Player.LEAVE]: (b) => {
        this.playerLeft(b);
      },
      [GameStatus.Player.SPEC]: (b) => {
        b.spec ? this.setSpectator(b.sid) : this.setParticipant(b.sid);
      },
      [GameStatus.Player.LIST]: (b) => {
        for (let c = 0, d = b.players.length; c < d; c++) this.playerJoined(b.players[c], !0);
      },
      [GameStatus.Game.RUNNING]: (b) => {
        this.resumeGame(b);
      },
      [GameStatus.Game.PAUSED]: (b) => {
        this.pauseGame();
      },
      [GameStatus.Game.GAMEOVER]: (b) => {
        this.endGame(b);
      },
      [GameStatus.Game.COUNTDOWN]: (b) => {
        this.onNextGameCountdown(b);
      },
      [GameStatus.Game.LEADER]: (b) => {
        this.onLeaderStatus(b);
      },
      [GameStatus.Game.TEAM]: (b) => {
        this.onTeamStatus(b);
      },
      [GameStatus.Settings.WORLD]: (b) => {
        this.applySettings(b.settings);
        this.applyStats(b.stats);
        b.running ? this.resumeGame(b) : this.pauseGame();
      },
    };
    this.frameCount = 0;
    this.player = null;
    this.timeSinceLastUpdate = 0;
    App.Console.linkInterpreter(this.interpreter);
    UserInput.addListener(UserInput.KEY_DOWN, this.onKeyDownListener);
    UserInput.addListener(UserInput.KEY_UP, this.onKeyUpListener);
  }
  onStatus(a) {
    this.gameStatusMap[a.d.t](a.d.s);
  }
  mute(a) {
    this.manager.mute(a ? !0 : !1);
    this.hud.setMuted(a ? !0 : !1);
  }
  step(a) {
    let b = this.manager.getLocalPlayer();
    if (b && b.alive) {
      if (b.primaryItem) {
        var c = this.reticle.scale.x,
          d = ItemMap[b.primaryItem.itemType];
        if (d.resizeReticle) {
          d = d.resizeReticle;
          let e = 0.01 * (b.p.vx * b.p.vx + b.p.vy * b.p.vy),
            f = d.max - d.min,
            g = App.Time - b.lastInjuredTime;
          2e3 > g && (e += 0.01 * (2e3 - g));
          d.drift && ((e += 5 * b.primaryItem.drift), b.primaryItem.updateDrift(a));
          d = d.min + (e * f > f ? f : e * f);
          this.reticle.scale.x = this.reticle.scale.y += d < c ? 0.1 * -(c - d) : 0.1 * (d - c);
        } else 1 !== c && (this.reticle.scale.x = this.reticle.scale.y = 1);
      }
      b.facingChanged &&
        (this.input.updateFacing(Math.round((16383 / (2 * Math.PI)) * (b.virtualFacing + Math.PI))),
        (b.facingChanged = !1),
        this.reticleLine &&
          this.reticleLine.visible &&
          ((this.reticleLine.x = this.reticle.x),
          (this.reticleLine.y = this.reticle.y),
          (c = 0.5 * App.ClientWidth - this.reticle.x),
          (d = 0.5 * App.ClientHeight - this.reticle.y),
          (c = Math.sqrt(c * c + d * d)),
          (this.reticleLine.scale.x = 0.003 * c),
          (this.reticleLine.alpha = 0.5 < 8e-4 * c ? 0.5 : 8e-4 * c),
          (this.reticleLine.rotation = b.facing + Math.PI)));
    }
    this.manager.update(a);
    this.canvas.update(this.manager.suspended, a);
    this.timeSinceLastUpdate += a;
    this.frameCount++;
    this.timeSinceLastUpdate >= 1e3 / 30 && (this.dispatchInput(), (this.timeSinceLastUpdate = 0));
  }
  showReticleLine() {
    this.reticleLine && (this.reticleLine.visible = !0);
  }
  hideReticleLine() {
    this.reticleLine && (this.reticleLine.visible = !1);
  }
  dispatchInput() {
    let a = Base62Encode(((this.input.b2 << 16) | this.input.b1) >>> 0);
    a !== this.lastSent &&
      (this.emit(Protocol.GAME, { t: Protocol.Game.INPUT, d: a }),
      (this.lastSent = a),
      (this.input.changed = !1));
    this.lastInputUpdateTime = App.Time;
  }
  dispatchInputIfInDelta() {
    33 < App.Time - this.lastInputUpdateTime && this.dispatchInput();
  }
  onBinData(a) {
    this.manager.pushUpdates(a.d);
  }
  onData(a) {
    this.onGameDataMap[a.t](a);
  }
  onInfo(a) {
    App.Console.log("# " + a.msg, 13421772);
  }
  onMessage(a) {
    let b = this.clients[a.sender];
    if (void 0 !== b) {
      if (App.WhiteLabel !== App.WhiteLabel_POKI)
        if ("admin" === b.type) App.Console.log("[admin] " + b.name + ": " + a.msg, 13434624);
        else {
          if (-1 !== Game.Muted.indexOf(b.sid)) return;
          var c = Team.LabelColors[b.team];
          App.Console.log(b.name + ": " + a.msg, c);
        }
      b.spec || this.manager.showPlayerChat(b.sid, a.msg);
    }
  }
  setSpectator(a) {}
  setParticipant(a) {}
  applyStats(a) {
    this.hud.updateTeamStats(a);
  }
  applySettings(a) {
    this.manager.applySettings(a);
    this.mode = a.mode;
    this.hud.setGameMode(this.mode);
    this.hud.setAvailableItems(a.items);
    this.gameover || this.hud.displayWeaponMenu(!0);
  }
  playerJoined(a, b) {
    this.clients[a.sid] = a;
    this.numClients++;
    this.gameover ||
      (a.sid === this.sessionId
        ? ((this.player = a), (a.local = !0), b || void 0 === a.team || this.hud.addClient(a))
        : void 0 !== a.team && this.hud.addClient(a));
  }
  onTeamStatus(a) {
    let b = this.clients[a.sid];
    this.hud.removeClient(b);
    b.team = a.index;
    b.sid === this.sessionId &&
      this.hud.textBarMessage(
        "You have joined team " + Team.Colors[b.team],
        Team.HexColors[b.team]
      );
    this.hud.addClient(b);
  }
  playerLeft(a) {
    let b = this.clients[a.sid];
    void 0 === b
      ? console.log("warning: playerLeft() - client does not exist")
      : (-1 !== Game.Muted.indexOf(b.sid) && Game.Muted.splice(Game.Muted.indexOf(b.sid), 1),
        this.hud.removeClient(b),
        delete this.clients[a.sid],
        this.numClients--);
  }
  shutdown() {
    this.manager.destroy();
    UserInput.removeListener(UserInput.KEY_DOWN, this.onKeyDownListener);
    UserInput.removeListener(UserInput.KEY_UP, this.onKeyUpListener);
    App.Console.unlinkInterpreter(this.interpreter);
    this.hud.cleanup();
  }
  pauseGame() {
    this.reticle.scale.x = this.reticle.scale.y = 1;
    this.gameover || (this.manager.suspend(), App.Console.log("Game paused"));
  }
  resumeGame() {
    this.emit(Game.MATCH_START);
    this.gameover = !1;
    this.canvas.endVictoryAnimation();
    this.manager.resume();
    this.hud.displayWeaponMenu(!0);
    App.Console.log("Game resumed");
  }
  endGame(a) {
    console.log("#### END GAME");
    this.emit(Game.MATCH_END);
    this.reticle.scale.x = this.reticle.scale.y = 1;
    this.gameover = !0;
    this.hideReticleLine();
    if (this.onDisplayAdButton) this.onDisplayAdButton();
    if (!a.skip) {
      var b = "";
      if (1 === a.mode) {
        var c = !1,
          d = this.manager.getLocalPlayer();
        let e;
        switch (this.mode) {
          case Game.MODE_CTF:
            -1 === a.winner
              ? (b = "The game ended in a draw.")
              : ((b = Team.Names[a.winner]),
                (b = b.charAt(0).toUpperCase() + b.slice(1)),
                (b = "Team " + b + " has won the game!"),
                (c = d && a.winner === d.team));
            setTimeout(() => {
              this.manager.suspend();
              (e = this.manager.getLastScoringPlayer()) &&
                this.canvas.initCTFVictoryAnimation(e.torsoupper.id);
            }, 150);
            break;
          case Game.MODE_TDM:
            -1 === a.winner
              ? (b = "The game ended in a draw.")
              : ((b = Team.Names[a.winner]),
                (b = b.charAt(0).toUpperCase() + b.slice(1)),
                (b = "Team " + b + " has won the game!"),
                (c = d && a.winner === d.team));
            setTimeout(() => this.manager.suspend(), 150);
            break;
          case Game.MODE_DM:
            c = this.clients[a.winner];
            b = c.name + " has won the game!";
            setTimeout(() => {
              this.manager.suspend();
              (e = this.manager.getPlayerById(a.winner)) &&
                this.canvas.initDMVictoryAnimation(e.torsoupper.id);
            }, 150);
            c = d && c.id === d.id;
            break;
          case Game.MODE_1V1:
            if (0 <= a.winner)
              (c = this.clients[a.winner])
                ? ((b = c.name + " has won the duel!"),
                  setTimeout(() => {
                    this.manager.suspend();
                    (e = this.manager.getPlayerById(a.winner)) &&
                      this.canvas.initDMVictoryAnimation(e.torsoupper.id);
                  }, 150),
                  (c = d && c.id === d.id))
                : (setTimeout(() => this.manager.suspend(), 150), (b = ""), (c = !1));
            else {
              switch (a.winner) {
                case -3:
                  b = "Game cancelled.";
                  break;
                case -2:
                  b = "Game cancelled.\nThe other player left early.";
                  break;
                case -1:
                  b = "The duel ended in a draw.";
              }
              c = !1;
              setTimeout(() => this.manager.suspend(), 150);
            }
            break;
          case Game.MODE_DB:
            -1 === a.winner
              ? (b = "The game ended in a draw.")
              : ((b = Team.Names[a.winner]),
                (b = b.charAt(0).toUpperCase() + b.slice(1)),
                (b = "Team " + b + " has won the game!"),
                (c = d && a.winner === d.team));
            setTimeout(() => this.manager.suspend(), 150);
            break;
          case Game.MODE_TR:
            (b = "Training match has ended."),
              setTimeout(() => this.manager.suspend(), 150),
              (c = !1);
        }
        if (c)
          switch (App.WhiteLabel) {
            case App.WhiteLabel_CG:
              App.CrazySDK.happytime();
              break;
            case App.WhiteLabel_POKI:
            case App.WhiteLabel_POKI_MAIN:
              App.PokiSDK && App.PokiSDK.happyTime(1);
          }
        a.completed && App.Console.log("This game has completed. Shutting down.", 16766720);
      } else
        (b = a.completed ? "This game has completed. Shutting down." : "Starting next round.."),
          this.manager.suspend();
      this.hud.setGameoverState({ msg: b, countdown: a.countdown, completed: a.completed });
      App.Console.log(b, 16766720);
      if (a.leaderboard) {
        a.leaderboard.name = [];
        for (let e = 0, f = a.leaderboard.id.length; e < f; e++)
          (d = this.clients[a.leaderboard.id[e]]) && a.leaderboard.name.push(d.name);
        this.hud.setLeaderboard(a.leaderboard);
      }
    }
  }
  onStartNewGame() {
    this.reticle.scale.x = this.reticle.scale.y = 1;
    this.readyToSpawn = !1;
    this.manager.clear();
    this.hud.setPlayMode();
    this.hud.emptyLeaderboard();
    this.canvas.endVictoryAnimation();
    this.manager.resume();
    for (let a in this.clients) this.hud.addClient(this.clients[a]);
    this.hud.textBarMessage("Loading map...", 11184810);
  }
  onNextGameCountdown(a) {
    0 === a.count
      ? (this.hud.setGameoverCount(5), this.onStartNewGame())
      : this.hud.setGameoverCount(a.count);
  }
  onLeaderStatus(a) {
    let b = this.clients[a.id];
    b
      ? this.mode === Game.MODE_DM && App.Console.log(b.name + " takes the lead!")
      : console.log("WARNING: onLeaderStatus - client " + a.id + " does not exist");
  }
  focus() {
    this.manager.focus();
  }
  onPlayerSpawn() {
    App.IsMobile || this.showReticleLine();
    App.Console.isActive() &&
      (null !== this.busyTimeout && clearTimeout(this.busyTimeout),
      (this.busyTimeout = setTimeout(() => this.requestDisplayChatBubble(), 400)));
  }
  onPlayerDeath(a) {
    a.killer !== a.victim && this.hud.registerKill(a.killer);
    a.victim.sid === this.player.sid &&
      ((this.reticle.scale.x = this.reticle.scale.y = 1), this.hideReticleLine());
  }
  onPlayerScore(a) {
    this.hud.registerScore(a.player);
  }
  onDbRoundEnd(a) {
    this.hud.registerDbRoundWin(a.team);
  }
  displayHelp() {
    this.hud.displayHelpImage();
  }
  onPlayerCombo() {}
  onPlayerSpree() {}
  onUpdateEnvironment() {}
  onSelectItem(a) {
    a &&
      this.emit(Protocol.GAME, {
        t: Protocol.Game.COMMAND,
        cmd: { name: GameCommands.PREFERENCE, pref: { item: a.itemId } },
      });
    (this.readyToSpawn && a) ||
      ((this.readyToSpawn = !0),
      this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.SPAWN } }));
  }
  onModelMessage(a) {
    this.hud.textBarMessage(a.text, a.color, a.icon);
  }
  onKeyUp(a) {
    if (void 0 !== a.data.char) {
      var b = a.data.char.toUpperCase();
      characterMapCTRL[a.data.code] && (b = characterMapCTRL[a.data.code]);
      this.input.update(b, 0) && this.dispatchInputIfInDelta();
    }
  }
  onMouseDown() {
    App.Console.isActive() && App.Console.setActive(!1);
    this.readyToSpawn
      ? this.input.update("LM", 1) && this.dispatchInputIfInDelta()
      : ((this.readyToSpawn = !0),
        this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.SPAWN } }));
  }
  onMouseUp() {
    this.input.update("LM", 0) &&
      (this.dispatchInputIfInDelta(),
      this.canvas.getCamera().tracking &&
        !this.gameover &&
        this.manager.getLocalPlayer().alive &&
        this.manager.trackPlayer(this.player.sid));
  }
  onMouseMove(a) {
    this.reticle.x = a.x;
    this.reticle.y = a.y;
  }
  onRightDown() {
    this.input.update("RM", 1) && this.dispatchInputIfInDelta();
    this.player && this.player.spec && this.manager.setTrackObject(null);
  }
  onRightUp() {
    this.input.update("RM", 0) && this.dispatchInputIfInDelta();
  }
  onKeyDown(a) {
    if (!App.Console.isActive() && void 0 !== a.data.char) {
      var b = a.data.char.toUpperCase();
      characterMapCTRL[a.data.code] && (b = characterMapCTRL[a.data.code]);
      switch (a.data.code) {
        case 191:
          App.Console.isActive() || (App.Console.setActive(!0), App.Console.addInputString("/"));
          break;
        case 13:
          App.Console.setActive(!0);
          break;
        case 49:
          this.onCmdWave();
          break;
        case 50:
          this.onCmdSalute();
          break;
        case 51:
          this.onCmdMagic();
          break;
        case 52:
          this.onCmdToss();
      }
      this.input.update(b, 1) && this.dispatchInputIfInDelta();
    }
  }
  requestDisplayChatBubble() {
    App.Console.isActive() &&
      (this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.BUSY } }),
      (this.busyTimeout = null));
  }
  requestHideChatBubble() {
    App.Console.isActive() ||
      (this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.DONE } }),
      (this.busyTimeout = null));
  }
  updateJoystickMoveState(a) {
    a.left
      ? (this.input.update("A", 1), this.input.update("D", 0))
      : a.right
      ? (this.input.update("A", 0), this.input.update("D", 1))
      : (this.input.update("A", 0), this.input.update("D", 0));
    a.jump ? this.input.update("W", 1) : this.input.update("W", 0);
    a.fly
      ? (this.input.update("X", 0), this.input.update("S", 0), this.input.update("RM", 1))
      : (a.crouch
          ? (this.input.update("X", 0), this.input.update("S", 1))
          : (a.prone ? this.input.update("X", 1) : this.input.update("X", 0),
            this.input.update("S", 0)),
        this.input.update("RM", 0));
    this.ignoreMovementJoystickViewing ||
      this.canvas.mousePositionFromNormalizedVector({ x: a.nx, y: a.ny }, 0.2);
    this.dispatchInputIfInDelta();
  }
  updateJoystickTargetState(a) {
    a.end
      ? ((this.ignoreMovementJoystickViewing = !1),
        this.canvas.mousePositionFromNormalizedVector({
          x: 0.1 * this.lastJoystickNV.x,
          y: 0.1 * this.lastJoystickNV.y,
        }))
      : ((this.ignoreMovementJoystickViewing = !0),
        this.canvas.mousePositionFromNormalizedVector({ x: a.nx, y: a.ny }),
        (this.lastJoystickNV.x = a.nx),
        (this.lastJoystickNV.y = a.ny));
    a.fire ? this.input.update("LM", 1) : this.input.update("LM", 0);
    a.throw ? this.input.update("E", 1) : this.input.update("E", 0);
    a.switch ? this.input.update("Q", 1) : this.input.update("Q", 0);
    this.dispatchInputIfInDelta();
  }
  onEscapeMenuAccess() {
    this.hud.displayEscapeMenu();
  }
  onMute(a) {
    this.mutePref = a ? !0 : null;
    this.manager.mute(a);
  }
  onCmdMessage(a) {
    0 < a.length && this.emit(Protocol.GAME, { t: Protocol.Game.MESSAGE, msg: a });
  }
  onCmdClear() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.CLEAR } });
  }
  onCmdShutdown() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.SHUTDOWN } });
  }
  onCmdLoad(a) {
    this.emit(Protocol.GAME, {
      t: Protocol.Game.COMMAND,
      cmd: { name: GameCommands.LOAD, map: a },
    });
  }
  onCmdReady() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.READY } });
  }
  onCmdSpawn() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.SPAWN } });
  }
  onCmdPause() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.PAUSE } });
  }
  onCmdSpectate() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.SPECTATE } });
  }
  onCmdJoin() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.JOIN } });
  }
  onCmdKill(a) {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.KILL }, id: a });
  }
  onCmdLogin(a) {
    a &&
      0 < a.length &&
      this.emit(Protocol.GAME, {
        t: Protocol.Game.COMMAND,
        cmd: { name: GameCommands.LOGIN },
        password: a,
      });
  }
  onCmdClients() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.CLIENTS } });
  }
  onCmdCommands() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.COMMANDS } });
  }
  onCmdKick(a) {
    null !== a &&
      0 < a.length &&
      this.emit(Protocol.GAME, {
        t: Protocol.Game.COMMAND,
        cmd: { name: GameCommands.KICK },
        id: a,
      });
  }
  onCmdBalance() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.BALANCE } });
  }
  onCmdParams() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.PARAMS } });
  }
  onCmdMemStats() {
    this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.MEMSTATS } });
  }
  onCmdWave() {
    null === this.animTimeout &&
      (this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.WAVE } }),
      (this.animTimeout = setTimeout(() => (this.animTimeout = null), 2e3)));
  }
  onCmdSalute() {
    null === this.animTimeout &&
      (this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.SALUTE } }),
      (this.animTimeout = setTimeout(() => (this.animTimeout = null), 2e3)));
  }
  onCmdMagic() {
    null === this.animTimeout &&
      (this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.MAGIC } }),
      (this.animTimeout = setTimeout(() => (this.animTimeout = null), 2e3)));
  }
  onCmdToss() {
    null === this.animTimeout &&
      (this.emit(Protocol.GAME, { t: Protocol.Game.COMMAND, cmd: { name: GameCommands.TOSS } }),
      (this.animTimeout = setTimeout(() => (this.animTimeout = null), 2e3)));
  }
  onCmdLogPerf() {
    App.DisplayFrameTime = !App.DisplayFrameTime;
    App.DisplayFrameTime
      ? App.Console.log(
          "# LOGGING PERFORMANCE [ FT = total frame time, L = game logic time, R = render time ]"
        )
      : App.Console.log("# LOGGING STOPPED");
  }
  onCmdSpawnBot(a) {
    this.emit(Protocol.GAME, {
      t: Protocol.Game.COMMAND,
      cmd: { name: GameCommands.SPAWN_BOT },
      num: a,
    });
  }
  onCmdImmortal(a) {
    this.emit(Protocol.GAME, {
      t: Protocol.Game.COMMAND,
      cmd: { name: GameCommands.IMMORTAL },
      enable: a,
    });
  }
  resize() {}
  onShowConsole() {
    null !== this.busyTimeout && clearTimeout(this.busyTimeout);
    this.busyTimeout = setTimeout(() => this.requestDisplayChatBubble(), 400);
  }
  onHideConsole() {
    null !== this.busyTimeout && clearTimeout(this.busyTimeout);
    this.busyTimeout = setTimeout(() => this.requestHideChatBubble(), 400);
  }
}
Game.Muted = [];
Game.MODE_CTF = "captureTheFlag";
Game.MODE_DM = "deathmatch";
Game.MODE_TDM = "teamDeathmatch";
Game.MODE_DB = "dodgeball";
Game.MODE_TR = "training";
Game.MODE_1V1 = "1v1";
Game.MODE_ZS = "zombieSurvival";
Game.MATCH_END = "matchEnd";
Game.MATCH_START = "matchStart";
Game.MODE_MAP = {
  [Game.MODE_CTF]: "ctf",
  [Game.MODE_DM]: "dm",
  [Game.MODE_TDM]: "tdm",
  [Game.MODE_DB]: "db",
  [Game.MODE_TR]: "tr",
  [Game.MODE_1V1]: "1v1",
  [Game.MODE_ZS]: "zs",
};
Game.MODE_TITLES = {
  [Game.MODE_CTF]: "Capture the flag",
  [Game.MODE_DM]: "Deathmatch",
  [Game.MODE_TDM]: "Team deathmatch",
  [Game.MODE_DB]: "Dodgeball",
  [Game.MODE_TR]: "Training",
  [Game.MODE_1V1]: "1 vs 1",
  [Game.MODE_ZS]: "Zombie Survival",
};
Game.EVENT_DEATH = "death";
Game.RankTitles =
  "Newbie Novice Rookie Beginner Initiated Competent Adept Skilled Proficient Advanced Expert Elite Champion Master Grandmaster Ninja".split(
    " "
  );
Game.MapSkillToIndex = function (a) {
  let b = 0;
  500 <= a && 1e3 > a
    ? (b = 1)
    : 1e3 <= a && 1501 > a
    ? (b = 2)
    : 1501 <= a && 1600 > a
    ? (b = 3)
    : 1600 <= a && 1700 > a
    ? (b = 4)
    : 1700 <= a && 1800 > a
    ? (b = 5)
    : 1800 <= a && 1900 > a
    ? (b = 6)
    : 1900 <= a && 2e3 > a
    ? (b = 7)
    : 2e3 <= a && 2100 > a
    ? (b = 8)
    : 2100 <= a && 2200 > a
    ? (b = 9)
    : 2200 <= a && 2300 > a
    ? (b = 10)
    : 2300 <= a && 2400 > a
    ? (b = 11)
    : 2400 <= a && 2500 > a
    ? (b = 12)
    : 2500 <= a && 2600 > a
    ? (b = 13)
    : 2600 <= a && 2700 > a
    ? (b = 14)
    : 2700 <= a && (b = 15);
  return b;
};
Game.MapSkillToTitle = function (a) {
  return Game.RankTitles[Game.MapSkillToIndex(a)];
};
Game.MapEventWepToId = function (a) {
  void 0 !== Game.WeaponMapping[a] &&
    -1 === Game.WeaponMapping[a].indexOf("_") &&
    (a = Game.WeaponMapping[a]);
  return "i" + a;
};
Game.MapEventWepToIcon = function (a) {
  if (void 0 !== Game.WeaponMapping[a]) a = Game.WeaponMapping[a];
  else if (-1 === a) return null;
  if (-3 === a) {
    var b = "900";
    a = 0.25;
  } else (b = "i" + a), (a = 0.35);
  return SpriteMap[b] ? ((b = new SpriteMap[b]()), (b.scale.x *= a), (b.scale.y *= a), b) : null;
};
Game.WeaponMapping = {
  "-1": "0",
  213: "11",
  204: "30",
  24: "31",
  25: "25_",
  22: "21_",
  20: "20_",
  23: "23_",
  26: "32",
  27: "33",
  28: "34",
  21: "21_",
  29: "35",
  30: "36",
  31: "37",
  33: "38",
  34: "39",
  35: "41",
};
var serverdetailmenu = {};
export class ServerDetailMenu extends Feature {
  constructor() {
    super();
    this.isPrivate = !1;
    this.isRanked = !0;
    this.isCustom = !1;
    this.maps = [];
    this.drops = [];
    this.weapons = [];
    this.mode = null;
    this.serverId = this.serverName = "";
    this.oy = this.ox = 20;
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(14, 136, 208, 210, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(226, 136, 208, 210, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(438, 136, 208, 210, 10);
    this.background.endFill();
    this.background.beginFill(3355443, 1);
    this.background.drawRect(14, 60, 632, 36, 10);
    this.background.endFill();
    this.background.interactive = !0;
    this.container.addChild(this.background);
    this.container.x = 0.5 * -this.width;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy + 34;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.SERVER_DETAIL_CANCEL));
    this.container.addChild(this.closeButton);
    this.serverListingTitle = new PIXI.Text("Server details", {
      fontName: "Arial",
      fontSize: 19,
      lineHeight: 16,
      fill: 16763904,
      strokeThickness: 3,
      lineJoin: "round",
      padding: 2,
    });
    this.serverListingTitle.x = this.ox;
    this.serverListingTitle.y = this.oy + 38;
    this.serverListingTitle.resolution = 2;
    this.container.addChild(this.serverListingTitle);
    this.weaponListContainer = new PIXI.Container();
    this.weaponListContainer.x = 0;
    this.weaponListContainer.y = 32;
    this.weaponListTableContainerMask = new PIXI.Graphics();
    this.weaponListTableContainerMask.beginFill(16777215, 1);
    this.weaponListTableContainerMask.drawRect(20, 148, 180, 200);
    this.weaponListTableContainerMask.endFill();
    this.weaponListTableContainerMask.x = -4;
    this.weaponListContainer.addChild(this.weaponListTableContainerMask);
    this.weaponListTableContainer = new PIXI.Container();
    this.weaponListTableContainer.x = 0;
    this.weaponListTableContainer.mask = this.weaponListTableContainerMask;
    this.weaponListContainer.addChild(this.weaponListTableContainer);
    this.weaponSelectionListScrollbar = new SelectionListScrollbar(202);
    this.weaponSelectionListScrollbar.x = 200;
    this.weaponSelectionListScrollbar.y = 152;
    this.weaponListContainer.addChild(this.weaponSelectionListScrollbar);
    this.weaponSelectionListScrollbar.on(SelectionListScrollbar.SCROLL, (a) => {
      this.weaponListTableContainer.height > this.weaponListTableContainerMask.height &&
        (this.weaponListTableContainer.y = -(
          a *
          (this.weaponListTableContainer.height - this.weaponListTableContainerMask.height)
        ));
    });
    this.container.addChild(this.weaponListContainer);
    this.mapListContainer = new PIXI.Container();
    this.mapListContainer.x = 212;
    this.mapListContainer.y = 32;
    this.mapListTableContainerMask = new PIXI.Graphics();
    this.mapListTableContainerMask.beginFill(16777215, 1);
    this.mapListTableContainerMask.drawRect(20, 148, 180, 200);
    this.mapListTableContainerMask.endFill();
    this.mapListTableContainerMask.x = -4;
    this.mapListContainer.addChild(this.mapListTableContainerMask);
    this.mapListTableContainer = new PIXI.Container();
    this.mapListTableContainer.x = 0;
    this.mapListTableContainer.mask = this.mapListTableContainerMask;
    this.mapListContainer.addChild(this.mapListTableContainer);
    this.mapSelectionListScrollbar = new SelectionListScrollbar(202);
    this.mapSelectionListScrollbar.x = 200;
    this.mapSelectionListScrollbar.y = 152;
    this.mapListContainer.addChild(this.mapSelectionListScrollbar);
    this.mapSelectionListScrollbar.on(SelectionListScrollbar.SCROLL, (a) => {
      this.mapListTableContainer.height > this.mapListTableContainerMask.height &&
        (this.mapListTableContainer.y = -(
          a *
          (this.mapListTableContainer.height - this.mapListTableContainerMask.height)
        ));
    });
    this.container.addChild(this.mapListContainer);
    this.dropListContainer = new PIXI.Container();
    this.dropListContainer.x = 424;
    this.dropListContainer.y = 32;
    this.dropListTableContainerMask = new PIXI.Graphics();
    this.dropListTableContainerMask.beginFill(16777215, 1);
    this.dropListTableContainerMask.drawRect(20, 148, 180, 200);
    this.dropListTableContainerMask.endFill();
    this.dropListTableContainerMask.x = -4;
    this.dropListContainer.addChild(this.dropListTableContainerMask);
    this.dropListTableContainer = new PIXI.Container();
    this.dropListTableContainer.x = 0;
    this.dropListTableContainer.mask = this.dropListTableContainerMask;
    this.dropListContainer.addChild(this.dropListTableContainer);
    this.dropSelectionListScrollbar = new SelectionListScrollbar(202);
    this.dropSelectionListScrollbar.x = 200;
    this.dropSelectionListScrollbar.y = 152;
    this.dropListContainer.addChild(this.dropSelectionListScrollbar);
    this.dropSelectionListScrollbar.on(SelectionListScrollbar.SCROLL, (a) => {
      this.dropListTableContainer.height > this.dropListTableContainerMask.height &&
        (this.dropListTableContainer.y = -(
          a *
          (this.dropListTableContainer.height - this.dropListTableContainerMask.height)
        ));
    });
    this.container.addChild(this.dropListContainer);
    this.modeIcon = new PIXI.Sprite();
    this.modeIcon.x = this.ox + 4;
    this.modeIcon.y = this.oy + 83;
    this.modeIcon.scale.x = this.modeIcon.scale.y = 0.5;
    this.container.addChild(this.modeIcon);
    this.regionIcon = new PIXI.Sprite();
    this.regionIcon.x = this.ox + 39;
    this.regionIcon.y = this.oy + 87;
    this.regionIcon.scale.x = this.regionIcon.scale.y = 0.4;
    this.container.addChild(this.regionIcon);
    this.serverTitleLabel = new PIXI.Text("", {
      fontSize: 16,
      fontFamily: "Arial",
      fill: 16777215,
      lineJoin: "round",
      strokeThickness: 2,
      padding: 2,
    });
    this.serverTitleLabel.x = this.ox + 70;
    this.serverTitleLabel.y = this.oy + 90;
    this.serverTitleLabel.resolution = 2;
    this.container.addChild(this.serverTitleLabel);
    this.weaponTypeLabel = new PIXI.Text("Weapons", FontStyle.SmallLabelText);
    this.weaponTypeLabel.x = this.ox + 4;
    this.weaponTypeLabel.y = this.oy + 134;
    this.weaponTypeLabel.resolution = 2;
    this.container.addChild(this.weaponTypeLabel);
    this.mapLabel = new PIXI.Text("Maps", FontStyle.SmallLabelText);
    this.mapLabel.x = this.ox + 214;
    this.mapLabel.y = this.oy + 134;
    this.mapLabel.resolution = 2;
    this.container.addChild(this.mapLabel);
    this.dropLabel = new PIXI.Text("Item drops", FontStyle.SmallLabelText);
    this.dropLabel.x = this.ox + 424;
    this.dropLabel.y = this.oy + 134;
    this.dropLabel.resolution = 2;
    this.container.addChild(this.dropLabel);
    this.privateIcon = new PIXI.Sprite(App.CombinedTextures.lock_icon);
    this.privateIcon.x = this.width - 110;
    this.privateIcon.y = this.serverTitleLabel.y - 5;
    this.privateIcon.scale.x = this.privateIcon.scale.y = 0.4;
    this.container.addChild(this.privateIcon);
    this.rankedIcon = new PIXI.Sprite(App.CombinedTextures.ranked_icon);
    this.rankedIcon.x = this.privateIcon.x + 30;
    this.rankedIcon.y = this.serverTitleLabel.y - 5;
    this.rankedIcon.scale.x = this.rankedIcon.scale.y = 0.4;
    this.container.addChild(this.rankedIcon);
    this.customIcon = new PIXI.Sprite(App.CombinedTextures.gears_icon);
    this.customIcon.x = this.rankedIcon.x + 30;
    this.customIcon.y = this.serverTitleLabel.y - 5;
    this.customIcon.scale.x = this.customIcon.scale.y = 0.4;
    this.container.addChild(this.customIcon);
    this.activePlayersText = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 16,
      fill: 16777215,
      strokeThickness: 2,
      lineJoin: "round",
      align: "right",
      padding: 2,
    });
    this.activePlayersText.x = this.width - 100;
    this.activePlayersText.y = this.serverTitleLabel.y;
    this.activePlayersText.anchor.x = 1;
    this.activePlayersText.resolution = 2;
    this.container.addChild(this.activePlayersText);
    this.shurikenLabel = new PIXI.Text("", FontStyle.SmallLabelText);
    this.shurikenLabel.x = this.ox + 40;
    this.shurikenLabel.y = this.oy + 382;
    this.shurikenLabel.resolution = 2;
    this.container.addChild(this.shurikenLabel);
    this.shurikenIcon = new PIXI.Sprite(App.CombinedTextures.shuriken);
    this.shurikenIcon.x = this.ox + 10;
    this.shurikenIcon.y = this.oy + 380;
    this.shurikenIcon.scale.x = this.shurikenIcon.scale.y = 0.7;
    this.container.addChild(this.shurikenIcon);
    this.passwordLabel = new PIXI.Text("Password", {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 16,
      fill: 16763904,
      strokeThickness: 2,
      lineJoin: "round",
    });
    this.passwordLabel.x = this.ox + 10;
    this.passwordLabel.y = this.oy + 426;
    this.passwordLabel.resolution = 2;
    this.container.addChild(this.passwordLabel);
    this.passwordField = new InputField("password");
    this.passwordField.setDimensions(110, 35);
    this.passwordField.forceLowerCase = !1;
    this.passwordField.setMaxChars(8);
    this.passwordField.x = this.ox + 100;
    this.passwordField.y = this.oy + 420;
    this.passwordField.setPassword(!0);
    this.passwordField.setFilter("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
    this.container.addChild(this.passwordField);
    this.joinButton = new Button("join");
    this.joinButton.selected = !1;
    this.joinButton.setText("Join now");
    this.joinButton.scale.x = this.joinButton.scale.y = 0.8;
    this.joinButton.setTint(16763904);
    this.joinButton.addListener(Button.BUTTON_RELEASED, () => {
      this.joinButton.disable();
      this.emit(Layer.Events.SERVER_DETAIL_CANCEL);
      this.emit(
        Layer.Events.JOIN_GAME,
        this.serverName,
        this.serverId,
        this.passwordField.getText().trim()
      );
    });
    this.joinButton.x = this.width - (this.joinButton.width + 16);
    this.joinButton.y = this.height - 16;
    this.container.addChild(this.joinButton);
  }
  async show(a) {
    super.show();
    this.passwordField.setText("");
    this.weaponListTableContainer.removeChildren();
    this.mapListTableContainer.removeChildren();
    this.weaponSelectionListScrollbar.reset();
    this.weaponListTableContainer.y = 0;
    this.mapSelectionListScrollbar.reset();
    this.mapListTableContainer.y = 0;
    this.mode = a.mode;
    var b = (this.isCustom = 1 === parseInt(a.custom) && void 0 !== a.data) ? a.data.weapons : [];
    let c = this.isCustom ? a.data.maps : [];
    var d = this.isCustom ? a.data.drops : [],
      e = this.isCustom ? a.data.shuriken : !0;
    this.shurikenLabel.text = e ? "Shuriken enabled" : "Shuriken disabled";
    this.serverName = a.name;
    this.serverId = a.server_id;
    this.shurikenLabel.alpha = e ? 1 : 0.3;
    this.shurikenIcon.alpha = e ? 1 : 0.3;
    this.serverTitleLabel.text = a.name;
    this.activePlayersText.text =
      a.players.toString() +
      " player" +
      (1 < parseInt(a.players) ? "s" : 0 === parseInt(a.players) ? "s" : "") +
      " | " +
      (0 < a.map.length ? a.map : "");
    this.activePlayersText.x = this.width - 28;
    this.modeIcon.texture = App.CombinedTextures[Game.MODE_MAP[this.mode] + "_icon"];
    this.regionIcon.texture = App.CombinedTextures["globe_" + ServerListMenu.REGION_MAP[a.region]];
    this.privateIcon.x = this.serverTitleLabel.x + this.serverTitleLabel.width + 10;
    this.rankedIcon.x = this.privateIcon.x + 30;
    this.customIcon.x = this.rankedIcon.x + 30;
    this.privateIcon.alpha = 1 === parseInt(a.private) ? 1 : 0.3;
    this.rankedIcon.alpha = 1 === parseInt(a.stats) ? 1 : 0.3;
    this.customIcon.alpha = 1 === parseInt(a.custom) ? 1 : 0.3;
    0 === parseInt(a.private)
      ? ((this.passwordField.interactive = !1),
        (this.passwordField.alpha = 0.3),
        (this.passwordLabel.alpha = 0.3))
      : ((this.passwordField.interactive = !0),
        (this.passwordField.alpha = 1),
        (this.passwordLabel.alpha = 1));
    a = this.drops;
    if (0 === this.drops.length && ((a = await APIClient.getItemDrops()), !a)) return;
    this.drops = a;
    this.dropListTableContainer.removeChildren();
    a = 0;
    for (e = 0; e < this.drops.length; e++) {
      var f = this.drops[e];
      f = new DropDisplayTableRow(
        a,
        f.item_id,
        f.prefab_id,
        f.name,
        !this.isCustom || (this.isCustom && -1 !== d.indexOf(f.item_id))
      );
      f.x = this.ox + 4;
      f.y = this.oy + 42 * a + 130;
      this.dropListTableContainer.addChild(f);
      a++;
    }
    d = 0;
    for (let g in ItemMap)
      if (
        ((a = ItemMap[g]), a.equip === ItemMap.Equip.PRIMARY || a.equip === ItemMap.Equip.SECONDARY)
      )
        (a = new WeaponDisplayTableRow(
          d,
          g,
          a.title,
          !this.isCustom || (this.isCustom && -1 !== b.indexOf(g.substring(1)))
        )),
          (a.x = this.ox + 4),
          (a.y = this.oy + 42 * d + 130),
          this.weaponListTableContainer.addChild(a),
          d++;
    b = this.maps;
    if (0 === this.maps.length && ((b = await APIClient.getMaps()), !b)) return;
    this.maps = b;
    this.isCustom || (c = this.maps.map((g) => g.id));
    this.filterMaps(c);
    this.joinButton.enable();
  }
  filterMaps(a) {
    let b = 0;
    for (let d = 0; d < this.maps.length; d++) {
      var c = this.maps[d];
      if (
        this.mode === c.mode ||
        (c.mode === Game.MODE_CTF && this.mode === Game.MODE_DM) ||
        (c.mode === Game.MODE_CTF && this.mode === Game.MODE_TDM) ||
        (c.mode === Game.MODE_CTF && this.mode === Game.MODE_TR)
      )
        (c = new MapDisplayTableRow(
          b,
          c.id,
          c.title,
          c.mode,
          !this.isCustom || (this.isCustom && -1 !== a.indexOf(c.id))
        )),
          (c.x = this.ox + 4),
          (c.y = this.oy + 42 * b + 130),
          this.mapListTableContainer.addChild(c),
          b++;
    }
  }
}
export class WeaponDisplayTableRow extends PIXI.Container {
  constructor(a, b, c, d) {
    super();
    this.id = b;
    this.index = a;
    this.interactive = !0;
    this.selected = d;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRect(0, 2, 200, 38);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.tint = this.selected ? 65280 : 16711680;
    this.background.alpha = 0.6;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.6;
    });
    this.addChild(this.background);
    this.icon = new SpriteMap[b]();
    this.icon.x = 23;
    this.icon.y = 26;
    a = this.icon.width;
    b = this.icon.height;
    d = a > b ? (64 <= a ? 64 : a) : 42 <= b ? 42 : b;
    this.icon.scale.x = this.icon.scale.y = a > b ? d / this.icon.width : d / this.icon.height;
    this.icon.rotation = -0.2;
    this.addChild(this.icon);
    this.nameText = new PIXI.Text(c, FontStyle.CustomizationItemTextSmall);
    this.nameText.x = 75;
    this.nameText.y = 12;
    this.nameText.resolution = 2;
    this.nameText.tint = 16777215;
    this.addChild(this.nameText);
  }
}
export class MapDisplayTableRow extends PIXI.Container {
  constructor(a, b, c, d, e) {
    super();
    this.id = b;
    this.index = a;
    this.interactive = !0;
    this.selected = e;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRect(0, 2, 200, 38);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.tint = this.selected ? 65280 : 16711680;
    this.background.alpha = 0.6;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.6;
    });
    this.addChild(this.background);
    this.icon = new PIXI.Sprite(App.CombinedTextures[Game.MODE_MAP[d] + "_icon"]);
    this.icon.x = 10;
    this.icon.y = 10;
    a = this.icon.width;
    b = this.icon.height;
    d = a > b ? (32 <= a ? 32 : a) : 32 <= b ? 32 : b;
    this.icon.scale.x = this.icon.scale.y = a > b ? d / this.icon.width : d / this.icon.height;
    this.icon.rotation = -0.2;
    this.addChild(this.icon);
    this.nameText = new PIXI.Text(c, FontStyle.CustomizationItemTextSmall);
    this.nameText.x = 48;
    this.nameText.y = 12;
    this.nameText.resolution = 2;
    this.addChild(this.nameText);
  }
}
export class DropDisplayTableRow extends PIXI.Container {
  constructor(a, b, c, d, e) {
    super();
    this.id = b;
    this.index = a;
    this.interactive = !0;
    this.selected = e;
    this.background = new PIXI.Graphics();
    this.background.beginFill(16777215, 0.2);
    this.background.drawRect(0, 2, 200, 38);
    this.background.endFill();
    this.background.interactive = !0;
    this.background.tint = this.selected ? 65280 : 16711680;
    this.background.alpha = 0.6;
    this.background.on("mouseover", () => {
      this.background.alpha = 1;
    });
    this.background.on("mouseout", () => {
      this.background.alpha = 0.6;
    });
    this.addChild(this.background);
    this.icon = new SpriteMap[c]();
    this.icon.x = 30;
    this.icon.y = 22;
    a = this.icon.width;
    b = this.icon.height;
    c = a > b ? (10 <= a ? 10 : a) : 10 <= b ? 10 : b;
    this.icon.scale.x = this.icon.scale.y = a > b ? c / this.icon.width : c / this.icon.height;
    this.icon.rotation = 0;
    this.addChild(this.icon);
    this.nameText = new PIXI.Text(d, FontStyle.CustomizationItemTextSmall);
    this.nameText.x = 56;
    this.nameText.y = 12;
    this.nameText.resolution = 2;
    this.addChild(this.nameText);
  }
}
var guestprofilemenu = {};
export class GuestProfileMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.interactive = !0;
    this.background.x = 0;
    this.background.y = 40;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 10, 640, 504);
    this.background.endFill();
    this.background.drawRect(15, 42, 630, 2);
    this.container.addChild(this.background);
    this.ox = 20;
    this.oy = 60;
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = this.oy - 6;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.GUEST_PROFILE_HIDE));
    this.container.addChild(this.closeButton);
    this.guestProfileTitle = new PIXI.Text("Profile", FontStyle.MediumOrangeText);
    this.guestProfileTitle.x = 0.5 * this.width - 20;
    this.guestProfileTitle.y = this.oy - 4;
    this.guestProfileTitle.anchor.x = 0.5;
    this.guestProfileTitle.resolution = 2;
    this.container.addChild(this.guestProfileTitle);
    this.container.x = 0.5 * -this.width;
    this.profileItemContainer = new PIXI.Container();
    this.profileItemContainer.x = this.ox;
    this.profileItemContainer.y = this.oy + 50;
    this.container.addChild(this.profileItemContainer);
    this.registerDesc = new PIXI.Text(
      "You are currently on a guest account.\n\nPlease login or register to get full access to all game features.",
      FontStyle.SmallMenuTextOrange4
    );
    this.registerDesc.x = this.ox + 10;
    this.registerDesc.y = this.oy + 50;
    this.registerDesc.resolution = 2;
    this.container.addChild(this.registerDesc);
    this.loginButton = new Button("login");
    this.loginButton.selected = !0;
    this.loginButton.setText("Login");
    this.loginButton.scale.x = this.loginButton.scale.y = 0.8;
    this.loginButton.addListener(Button.BUTTON_RELEASED, () =>
      this.emit(Layer.Events.LOGIN_ACCESS)
    );
    this.loginButton.x = this.ox + 20;
    this.loginButton.y = this.oy + 140;
    this.loginButton.setTint(16763904);
    this.container.addChild(this.loginButton);
    this.registerButton = new Button("register");
    this.registerButton.selected = !0;
    this.registerButton.setText("Register");
    this.registerButton.scale.x = this.registerButton.scale.y = 0.8;
    this.registerButton.addListener(Button.BUTTON_RELEASED, () =>
      this.emit(Layer.Events.REGISTER_ACCESS)
    );
    this.registerButton.x = this.loginButton.x + this.loginButton.width + 20;
    this.registerButton.y = this.oy + 140;
    this.registerButton.setTint(16763904);
    this.container.addChild(this.registerButton);
  }
  setTitle(a) {
    this.guestProfileTitle.text = a;
  }
  async show() {}
}
var highscoremenu = {};
export class HighscoreMenu extends Feature {
  constructor() {
    super();
    this.display =
      0.5 < Math.random() ? HighscoreMenu.DISPLAY_EXPERIENCE : HighscoreMenu.DISPLAY_SKILL;
    this.skillRanking = [];
    this.experienceRanking = [];
    this.thumbnailContainer = new PIXI.Container();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = -6;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.9);
    this.background.drawRect(0, 46, 100, 524);
    this.background.endFill();
    this.container.addChild(this.background);
    this.topTitle = new PIXI.Text("Top players", {
      fontName: "Arial",
      fontSize: 16,
      lineHeight: 16,
      fill: 16755200,
      strokeThickness: 3,
      lineJoin: "round",
      fontStyle: "italic",
      fontWeight: "bold",
    });
    this.topTitle.x = 50;
    this.topTitle.y = 46;
    this.topTitle.anchor.x = 0.5;
    this.topTitle.resolution = 2;
    this.container.addChild(this.topTitle);
    this.skillButtonBg = new PIXI.Graphics();
    this.skillButtonBg.beginFill(16763904, 0.2);
    this.skillButtonBg.lineStyle(1, 16763904, 0.8, 0);
    this.skillButtonBg.drawRect(0, 0, 96, 22);
    this.container.addChild(this.skillButtonBg);
    this.skillButtonBg.x = 2;
    this.skillButtonBg.y = 80;
    this.skillButtonBg.alpha = this.display === HighscoreMenu.DISPLAY_SKILL ? 1 : 0.5;
    this.skillButtonBg.interactive = !0;
    this.skillButton = new PIXI.Text("Skill", FontStyle.SmallMenuTextYellow);
    this.skillButton.x = 50;
    this.skillButton.y = 81;
    this.skillButton.anchor.x = 0.5;
    this.skillButton.resolution = 2;
    this.skillButton.interactive = !1;
    this.container.addChild(this.skillButton);
    this.skillButton.alpha = this.display === HighscoreMenu.DISPLAY_SKILL ? 1 : 0.5;
    this.skillButton.hitArea = new PIXI.Rectangle();
    this.experienceButtonBg = new PIXI.Graphics();
    this.experienceButtonBg.beginFill(16763904, 0.2);
    this.experienceButtonBg.lineStyle(1, 16763904, 0.8, 0);
    this.experienceButtonBg.drawRect(0, 0, 96, 22);
    this.container.addChild(this.experienceButtonBg);
    this.experienceButtonBg.x = 2;
    this.experienceButtonBg.y = 106;
    this.experienceButtonBg.alpha = this.display === HighscoreMenu.DISPLAY_EXPERIENCE ? 1 : 0.5;
    this.experienceButtonBg.interactive = !0;
    this.experienceButton = new PIXI.Text("Experience", FontStyle.SmallMenuTextYellow);
    this.experienceButton.x = 50;
    this.experienceButton.y = 107;
    this.experienceButton.anchor.x = 0.5;
    this.experienceButton.resolution = 2;
    this.experienceButton.interactive = !1;
    this.container.addChild(this.experienceButton);
    this.experienceButton.alpha = this.display === HighscoreMenu.DISPLAY_EXPERIENCE ? 1 : 0.5;
    this.experienceButton.hitArea = new PIXI.Rectangle();
    this.skillButtonBg.on("mouseover", () => {
      this.skillButton.alpha = 1;
    });
    this.skillButtonBg.on("mouseout", () => {
      this.display !== HighscoreMenu.DISPLAY_SKILL && (this.skillButton.alpha = 0.5);
    });
    this.skillButtonBg.on("mousedown", () => {
      this.display !== HighscoreMenu.DISPLAY_SKILL &&
        ((this.display = HighscoreMenu.DISPLAY_SKILL),
        (this.skillButton.alpha = 1),
        (this.experienceButton.alpha = 0.5),
        (this.skillButtonBg.alpha = 1),
        (this.experienceButtonBg.alpha = 0.5),
        this.refresh());
    });
    this.skillButtonBg.on("touchstart", () => {
      this.display !== HighscoreMenu.DISPLAY_SKILL &&
        ((this.display = HighscoreMenu.DISPLAY_SKILL),
        (this.skillButton.alpha = 1),
        (this.experienceButton.alpha = 0.5),
        (this.skillButtonBg.alpha = 1),
        (this.experienceButtonBg.alpha = 0.5),
        this.refresh());
    });
    this.experienceButtonBg.on("mouseover", () => {
      this.experienceButton.alpha = 1;
    });
    this.experienceButtonBg.on("mouseout", () => {
      this.display !== HighscoreMenu.DISPLAY_EXPERIENCE && (this.experienceButton.alpha = 0.5);
    });
    this.experienceButtonBg.on("mousedown", () => {
      this.display !== HighscoreMenu.DISPLAY_EXPERIENCE &&
        ((this.display = HighscoreMenu.DISPLAY_EXPERIENCE),
        (this.skillButton.alpha = 0.5),
        (this.experienceButton.alpha = 1),
        (this.skillButtonBg.alpha = 0.5),
        (this.experienceButtonBg.alpha = 1),
        this.refresh());
    });
    this.experienceButtonBg.on("touchstart", () => {
      this.display !== HighscoreMenu.DISPLAY_EXPERIENCE &&
        ((this.display = HighscoreMenu.DISPLAY_EXPERIENCE),
        (this.skillButton.alpha = 0.5),
        (this.experienceButton.alpha = 1),
        (this.skillButtonBg.alpha = 0.5),
        (this.experienceButtonBg.alpha = 1),
        this.refresh());
    });
    this.container.addChild(this.thumbnailContainer);
    this.load();
  }
  async load() {
    let a = await APIClient.getRankingType("skill", 10);
    this.skillRanking = a.ranking;
    a = await APIClient.getRankingType("level", 10);
    this.experienceRanking = a.ranking;
    this.refresh();
  }
  refresh() {
    this.thumbnailContainer.removeChildren();
    let a;
    switch (this.display) {
      case HighscoreMenu.DISPLAY_SKILL:
        a = this.skillRanking;
        break;
      case HighscoreMenu.DISPLAY_EXPERIENCE:
        a = this.experienceRanking;
    }
    for (let b = 0; b < a.length; b++) {
      let c = new Thumbnail(200, 200, !0, !1);
      c.applyCustomization(a[b].cust);
      c.x = 65 + (0 !== b % 2 ? 45 : 0);
      c.y = 135 + 38 * b;
      c.scale.x = -0.4;
      c.scale.y = 0.4;
      c.hitArea = new PIXI.Circle(100, 110, 70);
      c.anchor.x = c.anchor.y = 0.5;
      c.on("mouseover", () => {
        c.scale.x = -0.5;
        c.scale.y = 0.5;
        c.x += 10;
        c.y -= 10;
        this.thumbnailContainer.setChildIndex(c, this.thumbnailContainer.children.length - 1);
      });
      c.on("mouseout", () => {
        c.scale.x = -0.4;
        c.scale.y = 0.4;
        c.x -= 10;
        c.y += 10;
      });
      c.on("mousedown", () => {
        this.emit(Layer.Events.USER_ACCESS, a[b].id);
      });
      c.on("touchstart", () => {
        this.emit(Layer.Events.USER_ACCESS, a[b].id);
      });
      this.thumbnailContainer.addChild(c);
    }
  }
  resize(a, b) {
    this.x = 0.5 * a + 330;
    this.y = -8;
  }
}
HighscoreMenu.DISPLAY_SKILL = "skill";
HighscoreMenu.DISPLAY_EXPERIENCE = "experience";
var particlecontainer = {};
export class ParticleContainer extends PIXI.Container {
  constructor() {
    super();
    this.lastUpdate = 0;
  }
  spawnDirect(a) {
    this.addChild(a);
  }
  spawn(a, b) {
    for (b ||= 1; 0 < b--; ) {
      if (a.randV) {
        var c = a.randV;
        if (c.angular) {
          var d = 0;
          c.dir && (d = c.dir);
          d = d + c.minAngle + Math.random() * (c.maxAngle - c.minAngle);
          c = c.minDelta + Math.random() * (c.maxDelta - c.minDelta);
          a.nvx = a.vx + c * Math.cos(d);
          a.nvy = a.vy + c * Math.sin(d);
        } else
          (a.nvx = a.vx + c.minX + Math.random() * c.rangeX),
            (a.nvy = a.vy + c.minY + Math.random() * c.rangeY);
        10 === a._r && (a.r = Math.atan2(a.nvy, a.nvx) + 0.5 * Math.PI);
      }
      c = new PIXI.Sprite(App.CombinedTextures[a.tex]);
      c.startTTL = a.ttl;
      a.anchor
        ? ((c.anchor.x = a.anchor.x), (c.anchor.y = a.anchor.y))
        : (c.anchor.x = c.anchor.y = 0.5);
      c.x = a.x;
      c.y = a.y;
      c.rotation = a.r ?? 0;
      c.alpha = a.a ?? 1;
      c.vx = a.nvx ? a.nvx : a.vx ? a.vx : 0;
      c.vy = a.nvy ? a.nvy : a.vy ? a.vy : 0;
      c.ttl = a.ttl;
      void 0 !== a.s && (c.scale.x = c.scale.y = a.s);
      a.rs &&
        ((d = Math.random() * (a.rs.max - a.rs.min)),
        (c.scale.x *= a.rs.min + d),
        (c.scale.y *= a.rs.min + d));
      a.vat && (c.vat = a.vat);
      a.vs && (c.vs = a.vs);
      a.vr ? (c.vr = a.vr) : 10 === a._r && (c.dr = !0);
      void 0 !== a.va && (c.va = a.va);
      a.gs && (c.gs = a.gs);
      a.collide && (c.collide = a.collide);
      a.appear && ((c.alpha = 0), (c.appear = a.appear));
      void 0 !== a.tt && (c.tint = a.tt);
      this.addChild(c);
    }
  }
  update() {
    var a = App.Time;
    let b = 1;
    var c = a - this.lastUpdate;
    34 < c && (b = 50 < c ? 3 : 2);
    this.lastUpdate = a;
    for (a = this.children.length; 0 < a--; )
      (c = this.children[a]),
        0 >= c.ttl
          ? this.removeChild(c)
          : ((c.x += c.vx),
            (c.y += c.vy),
            c.vr
              ? (c.rotation += c.vr)
              : c.dr && (c.rotation = Math.atan2(c.vy, c.vx) + 0.5 * Math.PI),
            void 0 !== c.va
              ? (c.vat && c.ttl < c.vat
                  ? (c.alpha -= 1 / (c.vat * b))
                  : void 0 !== c.appear
                  ? 0 < c.appear
                    ? ((c.alpha = 0), c.appear--)
                    : 0 === c.appear && ((c.alpha = 0.75), (c.appear = void 0))
                  : (c.alpha += c.va * b),
                (c.alpha = Math.max(c.alpha, 0)))
              : (c.alpha = (1 / c.startTTL) * c.ttl),
            c.vs && ((c.scale.x += c.vs), (c.scale.y += c.vs)),
            c.gs &&
              ((c.vx += (PC.GRAVITY.x / PC.PM_RATIO) * c.gs),
              (c.vy += (PC.GRAVITY.y / PC.PM_RATIO) * c.gs)),
            c.collide && this.checkCollision(c),
            (c.ttl -= b));
  }
  checkCollision(a) {
    var b = a.x + a.vx;
    let c = a.y + a.vy,
      d = ParticleContainer.FB.search(b, c, b + a.vx, c + a.vy),
      e = Math.min(d.length, 8);
    for (let f = 0; f < e; f++) {
      let g = ParticleContainer.Segments[d[f]];
      if (0 <= Intersect3(a.x, a.y, b, c, g.x1, g.y1, g.x1 + g.x2, g.y1 + g.y2)) {
        b = (2 * (a.vx * g.x2 + a.vy * g.y2)) / (g.x2 * g.x2 + g.y2 * g.y2);
        a.vx = 0.5 * (b * g.x2 - a.vx);
        a.vy = 0.5 * (b * g.y2 - a.vy);
        break;
      }
    }
  }
  clear() {
    this.removeChildren();
    ParticleContainer.Segments = [];
    ParticleContainer.FB = { search: () => [] };
  }
}
ParticleContainer.FB = { search: () => [] };
ParticleContainer.Segments = [];
ParticleContainer.AddLineSegment = function (a) {
  ParticleContainer.Segments.push(a);
};
ParticleContainer.ProcessCollisionMesh = function () {
  let a = ParticleContainer.Segments.length;
  if (0 !== a) {
    ParticleContainer.FB = new Flatbush(a);
    for (let b = 0; b < a; b++) {
      let c = ParticleContainer.Segments[b],
        d = c.x1 + c.x2,
        e = c.y1 + c.y2;
      ParticleContainer.FB.add(
        (c.x1 < d ? c.x1 : d) - 8,
        (c.y1 < e ? c.y1 : e) - 8,
        (c.x1 < d ? d : c.x1) + 8,
        (c.y1 < e ? e : c.y1) + 8
      );
      ParticleContainer.Segments[b] = c;
    }
    ParticleContainer.FB.finish();
  }
};
var rewardsmenu = {};
export class RewardsMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 40;
    this.background.beginFill(0, 0.5);
    this.background.drawRect(0, 0, 660, 524);
    this.background.endFill();
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 0.99);
    this.background.drawRect(130, 100, 390, 324);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(140, 110, 370, 304);
    this.background.endFill();
    this.background.drawRect(145, 142, 360, 2);
    this.container.addChild(this.background);
    this.ox = 20;
    this.oy = 60;
    this.title = new PIXI.Text("Rewards", FontStyle.MediumOrangeText);
    this.title.x = 0.5 * (this.background.width - this.title.width);
    this.title.y = 158;
    this.container.addChild(this.title);
    this.rewardsList = new PIXI.Container();
    this.rewardsList.x = 140;
    this.rewardsList.y = 150;
    this.container.addChild(this.rewardsList);
    this.closeButton = new ImgButton();
    this.closeButton.x = 480;
    this.closeButton.y = 154;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.REWARDS_CANCEL));
    this.container.addChild(this.closeButton);
    this.treasureIcon = new PIXI.Sprite(App.CombinedTextures.treasure);
    this.treasureIcon.x = 156;
    this.treasureIcon.y = 400;
    this.treasureIcon.interactive = !1;
    this.container.addChild(this.treasureIcon);
    this.totalAmount = new PIXI.Text("", {
      fontName: "Arial",
      fontSize: 18,
      lineHeight: 16,
      fill: 16763904,
      strokeThickness: 5,
      lineJoin: "round",
    });
    this.totalAmount.x = 180;
    this.totalAmount.y = 422;
    this.totalAmount.anchor.x = 0.5;
    this.container.addChild(this.totalAmount);
    this.warningText = new PIXI.Text("Disable AdBlock to claim reward", {
      fontName: "Arial",
      fontSize: 18,
      lineHeight: 16,
      fill: 16711680,
      strokeThickness: 4,
      lineJoin: "round",
    });
    this.warningText.x = 220;
    this.warningText.y = 412;
    this.warningText.resolution = 2;
    this.container.addChild(this.warningText);
    this.warningText.visible = !1;
    this.rewardButton = new PIXI.Sprite(App.CombinedTextures.reward_button_claim);
    this.rewardButton.scale.x = this.rewardButton.scale.y = 0.58;
    this.rewardButton.x = 220;
    this.rewardButton.y = 394;
    this.rewardButton.interactive = !0;
    this.container.addChild(this.rewardButton);
    this.disableRewardButton();
    this.rewardButton.on("mousedown", () => {
      this.triggerRewardedBreak();
    });
    this.rewardButton.on("mouseover", () => {
      this.rewardButton.texture = App.CombinedTextures.reward_button_claim_down;
    });
    this.rewardButton.on("mouseout", () => {
      this.rewardButton.texture = App.CombinedTextures.reward_button_claim;
    });
    this.rewardContainer = new PIXI.Container();
    this.rewardContainer.visible = !1;
    this.rewardBackground = new PIXI.Graphics();
    this.rewardBackground.beginFill(0, 0.5);
    this.rewardBackground.drawRect(0, 0, 660, 524);
    this.rewardBackground.endFill();
    this.rewardBackground.lineStyle(1, 16777215, 0.1, 0);
    this.rewardBackground.beginFill(3355443, 1);
    this.rewardBackground.drawRoundedRect(165, 150, 330, 220, 10);
    this.rewardBackground.beginFill(0, 0.3);
    this.rewardBackground.drawRoundedRect(175, 160, 310, 200, 10);
    this.rewardBackground.endFill();
    this.rewardBackground.interactive = !0;
    this.rewardContainer.addChild(this.rewardBackground);
    this.rewardBackground.x = 0;
    this.rewardBackground.y = 40;
    this.rewardedAmountCounter = new PIXI.Text("0", {
      fontName: "Arial",
      fontSize: 26,
      lineHeight: 16,
      fill: 16763904,
      strokeThickness: 5,
      lineJoin: "round",
    });
    this.rewardedAmountCounter.resolution = 2;
    this.rewardedAmountCounter.anchor.x = 0.5;
    this.rewardContainer.addChild(this.rewardedAmountCounter);
    this.rewardedTreasureIcon = new PIXI.Sprite(App.CombinedTextures.treasure);
    this.rewardedTreasureIcon.x = 330;
    this.rewardedTreasureIcon.y = 250;
    this.rewardedTreasureIcon.scale.x = this.rewardedTreasureIcon.scale.y = 1.2;
    this.rewardedTreasureIcon.anchor.x = this.rewardedTreasureIcon.anchor.y = 0.5;
    this.rewardedTreasureIcon.interactive = !1;
    this.rewardContainer.addChild(this.rewardedTreasureIcon);
    this.rewardedAmountCounter.x = this.rewardedTreasureIcon.x;
    this.rewardedAmountCounter.y = this.rewardedTreasureIcon.y + 50;
    this.rewardedAmount = new PIXI.Text("Gold added to account!", {
      fontName: "Arial",
      fontSize: 20,
      lineHeight: 16,
      fill: 16763904,
      strokeThickness: 5,
      lineJoin: "round",
    });
    this.rewardedAmount.x = this.rewardedTreasureIcon.x;
    this.rewardedAmount.y = this.rewardedTreasureIcon.y + 100;
    this.rewardedAmount.anchor.x = 0.5;
    this.rewardedAmount.resolution = 2;
    this.rewardContainer.addChild(this.rewardedAmount);
    this.container.x = 0.5 * -this.width;
    this.rewardContainer.x = 0.5 * -this.width;
    this.addChild(this.rewardContainer);
    this.time = 0;
    this.particles = [];
    this.animationContainer = new PIXI.Sprite();
    this.particleContainer = new ParticleContainer();
  }
  update() {
    if (this.rewardContainer.visible) {
      var a = this.rewardedTreasureIcon.x,
        b = this.rewardedTreasureIcon.y;
      for (let d = 0, e = this.particles.length; d < e; d++) {
        var c = this.particles[d];
        let f = a - c.x,
          g = b - c.y;
        10 > Math.sqrt(f * f + g * g)
          ? ((this.rewardedAmountCounter.scale.x += 0.001),
            (this.rewardedAmountCounter.scale.y += 0.001),
            (this.rewardedTreasureIcon.scale.x += 0.001),
            (this.rewardedTreasureIcon.scale.y += 0.001),
            this.animationContainer.removeChild(c),
            this.particles.splice(d, 1),
            d--,
            e--,
            AudioEffects.GoldPickup[
              Math.floor(Math.random() * AudioEffects.GoldPickup.length)
            ].audio.play())
          : ((c.x += 0.02 * f),
            (c.y += 0.04 * g),
            (c.rotation += c.vr),
            (c.vx *= 0.99),
            (c.vy *= 0.99),
            (c.alpha -= 0.004),
            (c.scale.x -= 0.002),
            (c.scale.y -= 0.002));
      }
      5 < this.particles.length &&
        ((c = ParticleEffects.GoldGlitter),
        (c.x = a),
        (c.y = b),
        (c.vx = -2 + 4 * Math.random()),
        (c.vy = -2 + 4 * Math.random()),
        (c.vr = -0.3 + 0.6 * Math.random()),
        (c.a = 0.7),
        (a = c.s),
        (c.s = 1),
        this.particleContainer.spawn(c),
        (c.s = a));
      this.particleContainer.update();
    }
  }
  displayRewardDialog(a) {
    this.container.visible = !1;
    this.rewardContainer.visible = !0;
    this.rewardedTreasureIcon.scale.x = this.rewardedTreasureIcon.scale.y = 1.2;
    this.rewardedAmountCounter.scale.x = this.rewardedAmountCounter.scale.y = 1;
    let b = parseInt(a, 10);
    this.time = 0;
    this.rewardedAmountCounter.text = "0";
    this.rewardContainer.addChild(this.animationContainer);
    this.rewardContainer.addChild(this.particleContainer);
    let c = 0;
    a = Math.round((b / 30) * 1e3);
    let d = this.rewardedTreasureIcon.x,
      e = this.rewardedTreasureIcon.y,
      f = setInterval(() => {
        let g = new PIXI.Sprite(App.CombinedTextures.gold1);
        g.anchor.x = g.anchor.y = 0.5;
        g.x = d + 100 * Math.cos(0.5 * c);
        g.y = e - 150 + 10 * Math.sin(0.5 * c);
        g.scale.x = 0.4;
        g.scale.y = 0.4;
        g.vx = 0;
        g.vy = 0;
        g.vr = 0.5 < Math.random() ? -0.2 : 0.2;
        this.particles.push(g);
        this.animationContainer.addChild(g);
        for (let h = 0; 10 > h; h++) {
          let k = ParticleEffects.GoldGlitter;
          k.x = g.x;
          k.y = g.y;
          k.vx = -1 + 2 * Math.random();
          k.vy = -1 + 2 * Math.random();
          k.vr = -0.3 + 0.6 * Math.random();
          k.a = 0.7;
          let m = k.s;
          k.s = 0.5;
          this.particleContainer.spawn(k);
          k.s = m;
        }
        c++;
        this.rewardedAmountCounter.text = c.toString();
        c >= b && (clearInterval(f), (f = null));
      }, 1e3 / 30);
    setTimeout(() => {
      null !== f && clearInterval(f);
    }, a);
    setTimeout(() => {
      this.emit(Layer.Events.REWARDS_CANCEL);
      this.rewardContainer.removeChild(this.animationContainer);
      this.rewardContainer.removeChild(this.particleContainer);
      this.animationContainer.removeChildren();
      this.particleContainer.clear();
      this.particles = [];
    }, a + 2e3);
  }
  displayRegular() {
    this.rewardContainer.visible = !1;
    this.container.visible = !0;
  }
  displayWarning() {
    this.rewardButton.visible = !1;
    this.warningText.visible = !0;
    setTimeout(() => {
      this.rewardButton.visible = !0;
      this.warningText.visible = !1;
      this.enableRewardButton();
    }, 4e3);
  }
  triggerRewardedBreak() {
    this.disableRewardButton();
    switch (App.WhiteLabel) {
      case App.WhiteLabel_CG:
        App.ShowRewardedAd = !0;
        App.CrazySDK.requestAd("rewarded");
        break;
      case App.WhiteLabel_POKI:
      case App.WhiteLabel_POKI_MAIN:
        App.PokiSDK.rewardedBreak().then((a) => {
          a
            ? this.claimRewards()
            : (this.emit(Layer.Events.REWARDS_CLAIMED, !1, 0), this.displayWarning());
        });
    }
  }
  async claimRewards() {
    let a = await APIClient.postClaimRewards(App.Credential.id);
    a.success
      ? ((App.HadRewards = !1),
        this.emit(Layer.Events.REWARDS_CLAIMED, !0, a.reward),
        this.displayRewardDialog(a.reward))
      : this.emit(Layer.Events.REWARDS_CLAIMED, !1, 0);
  }
  disableRewardButton() {
    this.rewardButton.alpha = 0.5;
    this.rewardButton.interactive = !1;
  }
  enableRewardButton() {
    this.rewardButton.alpha = 1;
    this.rewardButton.interactive = !0;
  }
  async show() {
    this.displayRegular();
    var a = await APIClient.getRewards(App.Credential.id);
    this.rewardsList.removeChildren();
    if (a.success) {
      null === a.rewards && (a.rewards = []);
      a = a.rewards;
      var b = 0,
        c = 0;
      for (let d in RewardRow.TYPE) {
        let e = new RewardRow(d, RewardRow.TYPE_AMOUNT[d]);
        e.x = 14;
        e.y = 54 + 64 * c;
        this.rewardsList.addChild(e);
        e.setInactive();
        for (let f = 0; f < a.length; f++) {
          let g = a[f];
          if (d === g.type) {
            e.setActive();
            b += parseInt(g.reward);
            break;
          }
        }
        c++;
      }
      0 < b && this.enableRewardButton();
      this.totalAmount.text = b.toString();
    }
  }
}
export class RewardRow extends PIXI.Graphics {
  constructor(a, b) {
    super();
    this.lineStyle(1, 16777215, 0.1, 0);
    this.beginFill(3355443, 0.99);
    this.drawRect(0, 0, 340, 60);
    this.endFill();
    this.unlockedTitle = RewardRow.TYPE[a];
    this.goldIcon = new PIXI.Sprite(App.CombinedTextures.gold);
    this.goldIcon.scale.x = this.goldIcon.scale.y = 0.5;
    this.goldIcon.x = 10;
    this.goldIcon.y = 4;
    this.addChild(this.goldIcon);
    this.goldAmount = new PIXI.Text(b, {
      fontName: "Arial",
      fontSize: 15,
      fill: 16763904,
      strokeThickness: 4,
      lineJoin: "round",
    });
    this.goldAmount.x = this.goldIcon.x + 0.5 * this.goldIcon.width + 1;
    this.goldAmount.y = 34;
    this.goldAmount.anchor.x = 0.5;
    this.addChild(this.goldAmount);
    this.title = new PIXI.Text(this.unlockedTitle + " [locked]", FontStyle.MediumMenuTextOrange);
    this.title.x = 50;
    this.title.y = 6;
    this.addChild(this.title);
    this.desc = new PIXI.Text(RewardRow.TYPE_DESC[a], {
      fontName: "Arial",
      fontSize: 15,
      fill: 16777215,
      strokeThickness: 3,
      lineJoin: "round",
    });
    this.desc.x = 50;
    this.desc.y = 33;
    this.addChild(this.desc);
    this.alpha = 0.5;
  }
  setActive() {
    this.alpha = 1;
    this.title.text = this.unlockedTitle;
  }
  setInactive() {
    this.alpha = 0.5;
  }
}
RewardRow.TYPE = { day: "Daily reward", "10m": "10 minutes played", "30m": "30 minutes played" };
RewardRow.TYPE_AMOUNT = { day: 150, "10m": 125, "30m": 150 };
RewardRow.TYPE_DESC = {
  day: "Join every day to get this reward.",
  "10m": "Play for 10 minutes to get this reward.",
  "30m": "Play for 30 minutes to get this reward.",
};
var pvpresultmenu = {};
export class PVPResultMenu extends Feature {
  constructor() {
    super();
    this.background = new PIXI.Graphics();
    this.background.x = 0;
    this.background.y = 0;
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(3355443, 1);
    this.background.drawRect(0, 80, 560, 304);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 90, 540, 284, 10);
    this.background.endFill();
    this.background.beginFill(0, 0.3);
    this.background.drawRect(10, 90, 540, 284);
    this.background.endFill();
    this.background.lineStyle(1, 16777215, 0.1, 0);
    this.background.beginFill(2105376, 1);
    this.background.drawRect(190, 140, 330, 162);
    this.background.endFill();
    this.background.lineStyle(1, 16777215, 0, 0);
    this.background.beginFill(2105376, 1);
    this.background.drawRect(11, 91, 538, 40);
    this.background.endFill();
    this.container.addChild(this.background);
    this.background.interactive = !0;
    this.vsTitle = new PIXI.Text("", FontStyle.PVPVSTitle);
    this.vsTitle.x = 0.5 * this.background.width;
    this.vsTitle.y = 100;
    this.vsTitle.tint = 16755200;
    this.vsTitle.resolution = 2;
    this.vsTitle.anchor.x = 0.5;
    this.container.addChild(this.vsTitle);
    this.title = new PIXI.Text("Result:", FontStyle.PVPResultTitle);
    this.title.x = 200;
    this.title.y = 146;
    this.title.tint = 16763904;
    this.title.resolution = 2;
    this.container.addChild(this.title);
    this.infoText = new PIXI.Text("Loading result..", FontStyle.MediumOrangeText);
    this.infoText.x = this.title.x + this.title.width + 4;
    this.infoText.y = this.title.y;
    this.infoText.tint = 16763904;
    this.infoText.resolution = 2;
    this.container.addChild(this.infoText);
    this.ratingIcon = new PIXI.Sprite(App.CombinedTextures.rating_star);
    this.ratingIcon.x = 200;
    this.ratingIcon.y = 188;
    this.ratingIcon.scale.x = this.ratingIcon.scale.y = 0.5;
    this.container.addChild(this.ratingIcon);
    this.promoBadgeLeft = new PIXI.Sprite();
    this.promoBadgeLeft.x = 40;
    this.promoBadgeLeft.y = 302;
    this.promoBadgeLeft.scale.x = this.promoBadgeLeft.scale.y = 0.7;
    this.container.addChild(this.promoBadgeLeft);
    this.promoBadgeRight = new PIXI.Sprite();
    this.promoBadgeRight.x = 115;
    this.promoBadgeRight.y = 302;
    this.promoBadgeRight.scale.x = this.promoBadgeRight.scale.y = 0.7;
    this.container.addChild(this.promoBadgeRight);
    this.promoText = new PIXI.Text("", FontStyle.PVPResultDataPromo);
    this.promoText.x = 100;
    this.promoText.y = 280;
    this.promoText.resolution = 2;
    this.promoText.anchor.x = 0.5;
    this.container.addChild(this.promoText);
    this.rankText = new PIXI.Text("", FontStyle.PVPResultDataRank);
    this.rankText.x = 100;
    this.rankText.y = 346;
    this.rankText.resolution = 2;
    this.rankText.anchor.x = 0.5;
    this.container.addChild(this.rankText);
    this.ratingText = new PIXI.Text("..", FontStyle.PVPResultData);
    this.ratingText.x = this.ratingIcon.x + this.ratingIcon.width + 5;
    this.ratingText.y = 194;
    this.ratingText.resolution = 2;
    this.container.addChild(this.ratingText);
    this.goldIcon = new PIXI.Sprite(App.CombinedTextures.gold);
    this.goldIcon.x = 200;
    this.goldIcon.y = 227;
    this.goldIcon.scale.x = this.goldIcon.scale.y = 0.43;
    this.container.addChild(this.goldIcon);
    this.goldText = new PIXI.Text("..", FontStyle.PVPResultData);
    this.goldText.x = this.goldIcon.x + this.goldIcon.width + 5;
    this.goldText.y = 232;
    this.goldText.resolution = 2;
    this.container.addChild(this.goldText);
    this.newRatingText = new PIXI.Text("..", FontStyle.PVPResultData);
    this.newRatingText.x = this.goldIcon.x;
    this.newRatingText.y = 270;
    this.newRatingText.resolution = 2;
    this.newRatingText.tint = 16763904;
    this.container.addChild(this.newRatingText);
    this.container.x = 0.5 * -this.container.width;
    this.container.y = 80;
    this.visualizer = new Visualizer(176, 176, !1, !1, !0);
    this.visualizer.scale.x = -0.7;
    this.visualizer.scale.y = 0.7;
    this.visualizer.x = 168;
    this.visualizer.y = 150;
    this.visualizer.applyCustomization(App.Credential.customization);
    this.container.addChild(this.visualizer);
    this.closeButton = new ImgButton();
    this.closeButton.x = this.background.width - 40;
    this.closeButton.y = 93;
    this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
    this.closeButton.on(ImgButton.CLICK, () => this.emit(Layer.Events.PVP_RESULT_CANCEL));
    this.container.addChild(this.closeButton);
    this.cancelButton = new Button("continue");
    this.cancelButton.setText("Continue");
    this.cancelButton.addListener(Button.BUTTON_RELEASED, () =>
      this.emit(Layer.Events.PVP_RESULT_CANCEL)
    );
    this.cancelButton.x = 0.5 * (this.background.width - this.cancelButton.width);
    this.cancelButton.y = 320;
    this.cancelButton.scale.x = this.cancelButton.scale.y = 1;
    this.cancelButton.setTint(16763904);
    this.container.addChild(this.cancelButton);
  }
  update() {
    this.visualizer.update();
  }
  async show() {
    this.infoText.text = "Loading..";
    this.ratingText.text = "";
    this.goldText.text = "";
    this.newRatingText.text = "";
    this.rankText.text = "";
    this.promoText.text = "";
    this.promoBadgeLeft.visible = !1;
    this.promoBadgeRight.visible = !1;
    var a = (await APIClient.getLastResult(App.Credential.id, App.DisplayMatchResultID)).result,
      b = a.account_id1.toString();
    this.infoText.tint = 16763904;
    b = b === App.Credential.playerid.toString();
    switch (a.result) {
      case "init":
      case "tbd":
        this.infoText.text = "Result not available.";
        return;
      case "error":
        this.infoText.text = "Error 1: No result.";
        this.infoText.tint = 16711680;
        return;
      case "error2":
        this.infoText.text = "Error 2: No result.";
        this.infoText.tint = 16711680;
        return;
      case "cancelled":
        this.infoText.text = "Game cancelled.";
        return;
      case "noshow":
        this.infoText.text = b ? "The opponent left the game." : "You left the game.";
        this.infoText.tint = b ? 16763904 : 16711680;
        break;
      case "draw":
        this.infoText.text = "Draw.";
        break;
      case "win":
        (this.infoText.text = b ? "You win!" : "Defeat."),
          (this.infoText.tint = b ? 16763904 : 16711680);
    }
    a = a.gamedata;
    let c, d;
    if (b) {
      var e = parseFloat(a.p1_delta);
      c = Game.MapSkillToIndex(parseFloat(a.p1_rating_old));
      d = Game.MapSkillToIndex(parseFloat(a.p1_rating_new));
      b = c < d ? 1 : c > d ? -1 : 0;
      this.vsTitle.text = a.p1_name + " vs " + a.p2_name;
      this.ratingText.text = (0 <= e ? "+" : "") + a.p1_delta + " points";
      this.ratingText.tint = 0 > e ? 16711680 : 16763904;
      this.newRatingText.text =
        0 !== e ? " New rating: " + a.p1_rating_new : "No change to rating.";
      a = void 0 !== a.p1_reward_gold ? parseInt(a.p1_reward_gold) : 0;
      this.goldText.text = "+" + a + " gold";
      this.goldText.tint = 16763904;
    } else
      (e = parseFloat(a.p2_delta)),
        (c = Game.MapSkillToIndex(parseFloat(a.p2_rating_old))),
        (d = Game.MapSkillToIndex(parseFloat(a.p2_rating_new))),
        (b = c < d ? 1 : c > d ? -1 : 0),
        (this.vsTitle.text = a.p2_name + " vs " + a.p1_name),
        (this.ratingText.text = (0 <= e ? "+" : "") + a.p2_delta + " points"),
        (this.ratingText.tint = 0 > e ? 16711680 : 16763904),
        (this.newRatingText.text =
          0 !== e ? " New rating: " + a.p2_rating_new : "No change to rating."),
        (this.ratingText.text =
          (0 <= e ? "+" : "") +
          a.p2_delta +
          " points." +
          (0 !== e ? " New rating: " + parseFloat(a.p2_rating_new).toFixed(0) : "")),
        (this.ratingText.tint = 0 > e ? 16711680 : 16763904),
        (this.goldText.text = "No gold reward."),
        (this.goldText.tint = 16711680);
    0 < b
      ? ((this.promoBadgeLeft.texture = App.CombinedTextures["rank_icon_" + (c + 1)]),
        (this.promoBadgeLeft.visible = !0),
        (this.promoBadgeRight.texture = App.CombinedTextures["rank_icon_" + (d + 1)]),
        (this.promoBadgeRight.visible = !0),
        (this.promoBadgeRight.x = 115),
        (this.promoBadgeRight.y = 302),
        (this.rankText.y = 346),
        (this.promoText.text = "Promoted!\n\n\u2192"),
        (this.promoText.tint = 16755200))
      : 0 > b
      ? ((this.promoBadgeLeft.texture = App.CombinedTextures["rank_icon_" + (c + 1)]),
        (this.promoBadgeLeft.visible = !0),
        (this.promoBadgeRight.texture = App.CombinedTextures["rank_icon_" + (d + 1)]),
        (this.promoBadgeRight.visible = !0),
        (this.promoBadgeRight.x = 115),
        (this.promoBadgeRight.y = 302),
        (this.rankText.y = 346),
        (this.promoText.text = "Demoted\n\n\u2192"),
        (this.promoText.tint = 16711680))
      : ((this.promoBadgeRight.texture = App.CombinedTextures["rank_icon_" + (d + 1)]),
        (this.promoBadgeRight.visible = !0),
        (this.promoBadgeRight.x = 75),
        (this.promoBadgeRight.y = 277),
        (this.rankText.y = 321),
        (this.promoText.tint = 16755200));
    this.rankText.text = "Rank: " + Game.MapSkillToTitle(d);
    this.rankText.tint = 16755200;
  }
}
var layer = {};
export class Layer extends PIXI.Container {
  constructor() {
    super();
    this.mode = null;
    this.member = !1;
    this.w = App.ReferenceWidth;
    this.h = App.ReferenceHeight;
    this.features = [];
    this.updateFeatures = [];
    this.gameMenu = new GameMenu();
    this.guestMenu = new GuestMenu();
    this.memberMenu = new MemberMenu();
    this.memberBrowserMenu = new MemberBrowserMenu();
    this.clanBrowserMenu = new ClanBrowserMenu();
    this.loginMenu = new LoginMenu();
    this.registerMenu = new RegisterMenu();
    this.upResetMenu = new UPResetMenu();
    this.profileMenu = new ProfileMenu();
    this.customizationMenu = new CustomizationMenu();
    this.userMenu = new UserMenu();
    this.rankingMenu = new RankingMenu();
    this.newsMenu = new NewsMenu();
    this.pvpMenu = new PVPMenu();
    this.partnerMenu = new PartnerMenu();
    this.serverListMenu = new ServerListMenu();
    this.serverCreationMenu = new ServerCreationMenu();
    this.clanMenu = new ClanMenu();
    this.loadingMenu = new LoadingMenu();
    this.renameMenu = new RenameMenu();
    this.logoutMenu = new LogoutMenu();
    this.serverDetailMenu = new ServerDetailMenu();
    this.guestProfileMenu = new GuestProfileMenu();
    this.highscoreMenu = new HighscoreMenu();
    this.rewardsMenu = new RewardsMenu();
    this.pvpResultMenu = new PVPResultMenu();
    this.mainMenuHides = [
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.serverListMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.serverCreationMenu,
      this.renameMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu,
    ];
    this.loginMenu.hides.push(
      this.registerMenu,
      this.upResetMenu,
      this.profileMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.memberBrowserMenu.hides.push(
      this.loginMenu,
      this.registerMenu,
      this.upResetMenu,
      this.profileMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.clanBrowserMenu.hides.push(
      this.loginMenu,
      this.registerMenu,
      this.upResetMenu,
      this.profileMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.registerMenu.hides.push(
      this.loginMenu,
      this.upResetMenu,
      this.profileMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.upResetMenu.hides.push(
      this.loginMenu,
      this.registerMenu,
      this.profileMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.profileMenu.hides.push(
      this.loginMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.userMenu.hides.push(
      this.loginMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.newsMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.rankingMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.newsMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.newsMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.pvpMenu.hides.push(
      this.newsMenu,
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.partnerMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu
    );
    this.partnerMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.serverListMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.serverListMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.serverCreationMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.clanMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.rankingMenu,
      this.newsMenu,
      this.serverCreationMenu,
      this.serverListMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.serverCreationMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.serverListMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.renameMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.renameMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.serverListMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.serverCreationMenu,
      this.logoutMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.logoutMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.serverListMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.serverCreationMenu,
      this.renameMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.guestProfileMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.serverListMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.serverCreationMenu,
      this.renameMenu,
      this.serverDetailMenu,
      this.rewardsMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.pvpResultMenu.hides.push(
      this.loginMenu,
      this.profileMenu,
      this.registerMenu,
      this.upResetMenu,
      this.customizationMenu,
      this.userMenu,
      this.rankingMenu,
      this.newsMenu,
      this.serverListMenu,
      this.loadingMenu,
      this.memberBrowserMenu,
      this.clanBrowserMenu,
      this.clanMenu,
      this.serverCreationMenu,
      this.renameMenu,
      this.serverDetailMenu,
      this.guestProfileMenu,
      this.rewardsMenu
    );
    this.features.push(this.gameMenu);
    this.features.push(this.guestMenu);
    this.features.push(this.memberMenu);
    this.features.push(this.memberBrowserMenu);
    this.features.push(this.clanBrowserMenu);
    this.features.push(this.loginMenu);
    this.features.push(this.registerMenu);
    this.features.push(this.upResetMenu);
    this.features.push(this.profileMenu);
    this.features.push(this.customizationMenu);
    this.features.push(this.userMenu);
    this.features.push(this.rankingMenu);
    this.features.push(this.newsMenu);
    this.features.push(this.pvpMenu);
    this.features.push(this.partnerMenu);
    this.features.push(this.serverListMenu);
    this.features.push(this.serverCreationMenu);
    this.features.push(this.clanMenu);
    this.features.push(this.loadingMenu);
    this.features.push(this.renameMenu);
    this.features.push(this.logoutMenu);
    this.features.push(this.serverDetailMenu);
    this.features.push(this.guestProfileMenu);
    this.features.push(this.highscoreMenu);
    this.features.push(this.rewardsMenu);
    this.features.push(this.pvpResultMenu);
    this.updateFeatures.push(
      this.profileMenu,
      this.userMenu,
      this.loadingMenu,
      this.rewardsMenu,
      this.customizationMenu,
      this.pvpMenu,
      this.pvpResultMenu
    );
    this.cursor = new PIXI.Sprite(App.CombinedTextures.mouse_pointer);
    this.cursor.x = 0.5 * App.ReferenceWidth;
    this.cursor.y = 0.5 * App.ReferenceHeight;
    this.cursor.anchor.x = 0;
    this.cursor.anchor.y = 0;
    this.cursor.scale.x = this.cursor.scale.y = 0.25;
    this.cursor.visible = !1;
    this.cursor.hitArea = new PIXI.Rectangle();
    this.inputOverlay = new PIXI.Sprite(App.CombinedTextures.blank);
    this.inputOverlay.width = App.ClientWidth;
    this.inputOverlay.height = App.ClientHeight;
    this.inputOverlay.interactive = !0;
    this.inputOverlay.tint = 0;
    this.inputOverlay.alpha = 0.5;
    this.inputOverlay.x = 0;
    this.inputOverlay.y = -10;
    this.interactive = !0;
    this.onKeyDownListener = this.onKeyDown.bind(this);
    this.on("mousemove", (a) => {
      this.cursor.x = (a.data.global.x - this.x) / this.scale.x;
      this.cursor.y = (a.data.global.y - this.y) / this.scale.y;
    });
    this.on("mouseover", (a) => {
      this.cursor.visible = !0;
      this.cursor.parent && this.setChildIndex(this.cursor, this.children.length - 1);
    });
    this.on("mouseout", (a) => {
      this.cursor.visible = !1;
    });
    this.on("mousedown", (a) => {
      this.cursor.visible = !0;
      this.cursor.parent && this.setChildIndex(this.cursor, this.children.length - 1);
    });
    this.on("touchstart", (a) => {
      this.cursor.visible = !1;
    });
    this.setupEventRouting();
    switch (new URLSearchParams(window.location.search).get("action")) {
      case "login":
        this.onLoginShow();
    }
  }
  setupEventRouting() {
    this.gameMenu.on(Layer.Events.DISCONNECT, () => this.emit(Layer.Events.DISCONNECT));
    this.gameMenu.on(Layer.Events.JOYSTICK_MOVE_STATE, (a) =>
      this.emit(Layer.Events.JOYSTICK_MOVE_STATE, a)
    );
    this.gameMenu.on(Layer.Events.JOYSTICK_TARGET_STATE, (a) =>
      this.emit(Layer.Events.JOYSTICK_TARGET_STATE, a)
    );
    this.gameMenu.on(Layer.Events.DISPLAY_HELP, () => this.emit(Layer.Events.DISPLAY_HELP));
    this.gameMenu.on(Layer.Events.MUTE_TOGGLE, (a) => this.emit(Layer.Events.MUTE_TOGGLE, a));
    this.gameMenu.on(Layer.Events.ESCAPE_MENU_ACCESS, () =>
      this.emit(Layer.Events.ESCAPE_MENU_ACCESS)
    );
    this.guestMenu.on(Layer.Events.MENU_ACCESS, () => this.onMenuAccess());
    this.guestMenu.on(Layer.Events.LOGIN_ACCESS, () => this.onLoginShow());
    this.guestMenu.on(Layer.Events.REGISTER_ACCESS, () => this.onRegisterShow());
    this.guestMenu.on(Layer.Events.RANKING_ACCESS, () => this.onRankingShow());
    this.guestMenu.on(Layer.Events.CUSTOMIZATION_ACCESS, () => this.onGuestCustomizationAccess());
    this.guestMenu.on(Layer.Events.MEMBER_ACCESS, () => this.onMemberShow());
    this.guestMenu.on(Layer.Events.CLAN_BROWSER_ACCESS, () => this.onClanBrowserShow());
    this.guestMenu.on(Layer.Events.PARTNER_ACCESS, () => this.onPartnerShow());
    this.guestMenu.on(Layer.Events.GUEST_PROFILE_ACCESS, () => this.onGuestProfileAccess());
    this.guestMenu.on(Layer.Events.SETTINGS_ACCESS, () => this.onSettingsAccess());
    this.guestProfileMenu.on(Layer.Events.GUEST_PROFILE_HIDE, () => this.onGuestProfileHide());
    this.guestProfileMenu.on(Layer.Events.LOGIN_ACCESS, () => this.onLoginShow());
    this.guestProfileMenu.on(Layer.Events.REGISTER_ACCESS, () => this.onRegisterShow());
    this.memberMenu.on(Layer.Events.MENU_ACCESS, () => this.onMenuAccess());
    this.memberMenu.on(Layer.Events.LOGOUT, () => this.onLogout());
    this.memberMenu.on(Layer.Events.RANKING_ACCESS, () => this.onRankingShow());
    this.memberMenu.on(Layer.Events.MEMBER_ACCESS, () => this.onMemberShow());
    this.memberMenu.on(Layer.Events.CLAN_BROWSER_ACCESS, () => this.onClanBrowserShow());
    this.memberMenu.on(Layer.Events.CUSTOMIZATION_ACCESS, () => this.onCustomizationShow());
    this.memberMenu.on(Layer.Events.LOGOUT_ACCESS, () => this.onLogoutAccess());
    this.memberMenu.on(Layer.Events.SETTINGS_ACCESS, () => this.onSettingsAccess());
    this.memberMenu.on(Layer.Events.PROFILE_ACCESS, () => this.onProfileAccess());
    this.memberBrowserMenu.on(Layer.Events.MEMBER_CANCEL, () => this.onMemberCancel());
    this.memberBrowserMenu.on(Layer.Events.USER_ACCESS, (a) => this.onUserAccess(a));
    this.clanBrowserMenu.on(Layer.Events.CLAN_ACCESS, (a) => this.onClanAccess(a));
    this.clanBrowserMenu.on(Layer.Events.CLAN_BROWSER_CANCEL, () => this.onClanBrowserCancel());
    this.loginMenu.on(Layer.Events.LOGIN_SUBMIT, (a) => this.onLoginSubmit(a));
    this.loginMenu.on(Layer.Events.LOGIN_CANCEL, () => this.onLoginCancel());
    this.loginMenu.on(Layer.Events.RECOVER_ACCESS, () => this.onRecoverShow());
    this.registerMenu.on(Layer.Events.REGISTER_SUBMIT, (a) => this.onRegisterSubmit(a));
    this.registerMenu.on(Layer.Events.REGISTER_CANCEL, () => this.onRegisterCancel());
    this.upResetMenu.on(Layer.Events.RECOVER_SUBMIT, (a) => this.onRecoverSubmit(a));
    this.upResetMenu.on(Layer.Events.RECOVER_CANCEL, () => this.onRecoverCancel());
    this.profileMenu.on(Layer.Events.PROFILE_ACCESS, () => this.onProfileAccess());
    this.profileMenu.on(Layer.Events.PROFILE_CANCEL, () => this.onProfileCancel());
    this.profileMenu.on(Layer.Events.PROFILE_RENAME, (a) => this.onProfileRename(a));
    this.profileMenu.on(Layer.Events.USER_ACCESS, (a, b = "id", c = null) =>
      this.onUserAccess(a, b, c)
    );
    this.profileMenu.on(Layer.Events.LEAVE_CLAN, () => this.onProfileLeaveClan());
    this.profileMenu.on(Layer.Events.CREATE_CLAN, () => this.onProfileCreateClan());
    this.profileMenu.on(Layer.Events.RENAME_ACCESS, () => this.onRenameAccess());
    this.profileMenu.on(Layer.Events.LOGOUT, () => this.onAccountDeactivateLogout());
    this.customizationMenu.on(Layer.Events.CUSTOMIZATION_CANCEL, () =>
      this.onCustomizationCancel()
    );
    this.customizationMenu.on(Layer.Events.UPDATE_CREDENTIAL, (a) =>
      this.emit(Layer.Events.UPDATE_CREDENTIAL, a, !0)
    );
    this.customizationMenu.on(Layer.Events.REWARDS_CLAIMED, (a) =>
      this.onRewardedShopAdFinished(a)
    );
    this.userMenu.on(Layer.Events.USER_UNFRIEND, () => this.onUserUnfriend());
    this.userMenu.on(Layer.Events.USER_CANCEL, () => this.onUserCancel());
    this.userMenu.on(Layer.Events.CLAN_ACCESS, (a) => this.onClanAccess(a));
    this.rankingMenu.on(Layer.Events.USER_ACCESS, (a) => this.onUserAccess(a));
    this.rankingMenu.on(Layer.Events.RANKING_CANCEL, () => this.onRankingCancel());
    this.newsMenu.on(Layer.Events.NEWS_CANCEL, () => this.onNewsCancel());
    this.pvpMenu.on(Layer.Events.PVP_CANCEL, () => this.onPVPCancel());
    this.pvpMenu.on(Layer.Events.PVP_START, (a) => this.onPVPStart(a));
    this.pvpMenu.on(Layer.Events.PVP_CONNECT, () => this.onPVPTryConnect());
    this.pvpMenu.on(Layer.Events.PVP_START_COUNTDOWN, () => this.onPVPStartCountdown());
    this.pvpMenu.on(Layer.Events.PVP_CANCEL_COUNTDOWN, () => this.onPVPCancelCountdown());
    this.serverListMenu.on(Layer.Events.SERVER_LIST_CANCEL, () => this.onServerListClose());
    this.serverListMenu.on(Layer.Events.JOIN_GAME, (a, b, c) => this.onServerListJoinGame(a, b, c));
    this.serverListMenu.on(Layer.Events.SERVER_LIST_REFRESH, () => this.onServerListRefresh());
    this.serverListMenu.on(Layer.Events.SERVER_DETAIL_ACCESS, (a) => this.onServerDetailAccess(a));
    this.serverCreationMenu.on(Layer.Events.SERVER_CREATION_INIT, () =>
      this.onServerCreationInit()
    );
    this.serverCreationMenu.on(Layer.Events.SERVER_CREATION_CANCEL, () =>
      this.onServerCreationClose()
    );
    this.serverCreationMenu.on(Layer.Events.SERVER_CREATION_REGION, (a) =>
      this.onServerCreationRegion(a)
    );
    this.serverCreationMenu.on(Layer.Events.SERVER_CREATION_JOIN_LOBBY, () =>
      this.onServerCreationJoinLobby()
    );
    this.serverCreationMenu.on(Layer.Events.SERVER_CREATION_SESSION_INIT, (a) =>
      this.onServerCreationInitSession(a)
    );
    this.serverCreationMenu.on(Layer.Events.JOIN_GAME, (a, b, c) =>
      this.onServerCreationJoinGame(a, b, c)
    );
    this.loadingMenu.on(Layer.Events.LOADING_CANCEL, () => this.onLoadingCancel());
    this.partnerMenu.on(Layer.Events.PARTNER_CANCEL, () => this.onPartnerCancel());
    this.clanMenu.on(Layer.Events.CLAN_CANCEL, () => this.onClanCancel());
    this.clanMenu.on(Layer.Events.USER_ACCESS, (a) => this.onUserAccess(a));
    this.renameMenu.on(Layer.Events.RENAME_COMPLETED, () => this.onRenameCompleted());
    this.renameMenu.on(Layer.Events.RENAME_CANCEL, () => this.onRenameCancel());
    this.logoutMenu.on(Layer.Events.LOGOUT, () => this.onLogout());
    this.logoutMenu.on(Layer.Events.LOGOUT_CANCEL, () => this.onLogoutCancel());
    this.logoutMenu.on(Layer.Events.RENAME_ACCESS, () => this.onRenameAccess());
    this.serverDetailMenu.on(Layer.Events.SERVER_DETAIL_CANCEL, () => this.onServerDetailCancel());
    this.serverDetailMenu.on(Layer.Events.JOIN_GAME, (a, b, c) =>
      this.onServerListJoinGame(a, b, c)
    );
    this.highscoreMenu.on(Layer.Events.USER_ACCESS, (a) => this.onUserAccess(a));
    this.rewardsMenu.on(Layer.Events.REWARDS_CANCEL, () => this.onRewardsCancel());
    this.rewardsMenu.on(Layer.Events.REWARDS_CLAIMED, (a, b) => this.onRewardsClaimed(a, b));
    this.pvpResultMenu.on(Layer.Events.PVP_RESULT_CANCEL, () => this.onPVPResultCancel());
  }
  async setMode(a) {
    if (this.mode !== a) {
      switch (a) {
        case Layer.MODE_GAME:
          this.setModeGame();
          break;
        case Layer.MODE_MENU:
          this.setModeMenu();
      }
      this.mode = a;
      await this.updateCredentialsIfExpired();
      this.mode === Layer.MODE_GAME && this.addChild(this.cursor);
    }
  }
  async updateCredentialsIfExpired(a = !1) {
    let b = Registry.Instance.credential;
    void 0 === b || !1 === b.available || void 0 === b.accounttype
      ? this.applyGuestSetup()
      : a || Date.now() > 1e3 * b.ts + 24e4
      ? ((a = await APIClient.getCredentials(App.Credential.id)),
        (b = a.success ? a.credential : { available: !1 }),
        "guest" === b.accounttype
          ? App.Autogen
            ? ((a = Registry.Instance.retrieve(Registry.Key.AUTOGEN)),
              void 0 !== a.name &&
                void 0 !== a.password &&
                ((a = await APIClient.postLogin(a.name, atob(a.password))),
                a.success
                  ? (b = a)
                  : ((a = App.GenerateGuestName()), (b = await APIClient.getGuestCredentials(a))),
                this.emit(Layer.Events.UPDATE_CREDENTIAL, b, !0),
                "guest" !== b.accounttype ? this.applyMemberSetup() : this.applyGuestSetup()))
            : (this.emit(Layer.Events.UPDATE_CREDENTIAL, b, !0), this.applyGuestSetup())
          : (this.emit(Layer.Events.UPDATE_CREDENTIAL, b, !0), this.applyMemberSetup()))
      : "guest" === b.accounttype
      ? this.applyGuestSetup()
      : this.applyMemberSetup();
  }
  onKeyDown(a) {
    if (27 === a.data.code) {
      this.mainMenuHides.forEach((b) => this.hideFeature(b));
      switch (this.setup) {
        case Layer.SETUP_GUEST:
          this.guestMenu.setMode(GuestMenu.MODE_NONE);
          break;
        case Layer.SETUP_MEMBER:
          this.memberMenu.setMode(MemberMenu.MODE_NONE);
      }
      this.emit(Layer.Events.SHOW_MENU);
    }
  }
  setModeGame() {
    UserInput.removeListener(UserInput.KEY_DOWN, this.onKeyDownListener);
    this.guestMenu.parent && this.removeChild(this.guestMenu);
    this.loginMenu.parent && this.removeChild(this.loginMenu);
    this.memberMenu.parent && this.removeChild(this.memberMenu);
    this.registerMenu.parent && this.removeChild(this.registerMenu);
    this.upResetMenu.parent && this.removeChild(this.upResetMenu);
    this.serverListMenu.parent && this.removeChild(this.serverListMenu);
    this.serverCreationMenu.parent && this.removeChild(this.serverCreationMenu);
    this.loadingMenu.parent && this.removeChild(this.loadingMenu);
    this.highscoreMenu.parent && this.removeChild(this.highscoreMenu);
    this.addChild(this.gameMenu);
    this.gameMenu.show();
    SocialMenu.MODE_GAME = !0;
    this.socialMenu &&
      this.socialMenu.parent &&
      (this.socialMenu.collapsed || this.socialMenu.collapseMenu(!0, !1),
      this.socialMenu.repositionForGame());
  }
  setModeMenu() {
    UserInput.addListener(UserInput.KEY_DOWN, this.onKeyDownListener);
    this.gameMenu.parent && this.removeChild(this.gameMenu);
    this.cursor.parent && this.removeChild(this.cursor);
    SocialMenu.MODE_GAME = !1;
    this.socialMenu &&
      this.socialMenu.parent &&
      (this.socialMenu.autoCollapsed && this.socialMenu.collapseMenu(!1, !1),
      this.socialMenu.collapsed || this.socialMenu.repositionForMenu());
  }
  update() {
    for (let a = 0; a < this.updateFeatures.length; a++)
      this.updateFeatures[a].parent && this.updateFeatures[a].update();
  }
  resize(a, b) {
    this.w = a;
    this.h = b;
    this.inputOverlay.parent && ((this.inputOverlay.width = a), (this.inputOverlay.height = b));
    for (let c = 0; c < this.features.length; c++) this.features[c].resize(a, b);
  }
  async onLoginSubmit(a) {
    const b = await APIClient.postLogin(a.name, a.password);
    !1 === b.success
      ? (this.loginMenu.reset(),
        this.loginMenu.displayErrorMessage(
          void 0 !== b.error ? b.error : "Invalid username or password"
        ))
      : (this.emit(Layer.Events.UPDATE_CREDENTIAL, b, a.store),
        this.loginMenu.displayCompletedMessage(),
        this.applyMemberSetup());
  }
  applyGuestSetup() {
    this.setup = Layer.SETUP_GUEST;
    this.memberMenu.parent && this.removeChild(this.memberMenu);
    this.customizationMenu.parent &&
      (this.customizationMenu.hide(),
      this.removeChild(this.customizationMenu),
      this.emit(Layer.Events.SHOW_MENU));
    this.mode === Layer.MODE_MENU &&
      (this.addChild(this.guestMenu),
      this.highscoreMenu.parent || this.addChild(this.highscoreMenu));
    if (this.socialMenu && this.socialMenu.parent) {
      this.socialMenu.hide();
      this.removeChild(this.socialMenu);
      for (let a = 0; a < this.features.length; a++)
        if (this.features[a] === this.socialMenu) {
          this.features.splice(a, 1);
          break;
        }
    }
    if (this.clanChatMenu && this.clanChatMenu.parent) this.onClanChatCancel();
  }
  applyMemberSetup() {
    this.guestMenu.parent && this.removeChild(this.guestMenu);
    this.mode === Layer.MODE_MENU &&
      (this.addChild(this.memberMenu),
      this.highscoreMenu.parent || this.addChild(this.highscoreMenu));
    this.socialMenu &&
      this.socialMenu.parent &&
      this.setChildIndex(this.socialMenu, this.children.length - 1);
    this.setup !== Layer.SETUP_MEMBER &&
      ((this.setup = Layer.SETUP_MEMBER),
      this.socialMenu ||
        ((this.socialMenu = new SocialMenu()),
        this.socialMenu.on(Layer.Events.USER_ACCESS, (a) => this.onUserAccess(a)),
        this.socialMenu.on(Layer.Events.JOIN_CLAN, () => this.onSocialmenuJoinClan()),
        this.socialMenu.on(Layer.Events.CLAN_CHAT_ACCESS, () => this.onClanChatAccess()),
        this.socialMenu.show()),
      this.socialMenu.loadFriends(),
      this.features.push(this.socialMenu),
      App.IsMobile || this.addChild(this.socialMenu),
      this.socialMenu.resize(this.w, this.h),
      this.clanChatMenu ||
        ((this.clanChatMenu = new ClanChatMenu()),
        this.clanChatMenu.on(Layer.Events.CLAN_CHAT_CANCEL, () => this.onClanChatCancel())));
  }
  onClanChatCancel() {
    this.clanChatMenu.hide();
    this.removeChild(this.clanChatMenu);
    for (let a = 0; a < this.features.length; a++)
      if (this.features[a] === this.clanChatMenu) {
        this.features.splice(a, 1);
        break;
      }
  }
  hideFeature(a) {
    this.removeChild(a);
    a.hide();
  }
  onLoginShow() {
    this.loginMenu.hides.forEach((a) => this.hideFeature(a));
    if (this.guestMenu.mode === GuestMenu.MODE_LOGIN) this.onLoginCancel();
    else
      this.loginMenu.show(),
        this.guestMenu.setMode(GuestMenu.MODE_LOGIN),
        this.emit(Layer.Events.HIDE_MENU),
        this.loginMenu.parent || this.addChild(this.loginMenu);
  }
  onLoginCancel() {
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
    this.loginMenu.parent && this.removeChild(this.loginMenu);
    this.emit(Layer.Events.SHOW_MENU);
  }
  onRegisterShow() {
    this.registerMenu.hides.forEach((a) => this.hideFeature(a));
    if (this.guestMenu.mode === GuestMenu.MODE_REGISTER) this.onRegisterCancel();
    else
      this.guestMenu.setMode(GuestMenu.MODE_REGISTER),
        this.emit(Layer.Events.HIDE_MENU),
        this.registerMenu.parent || this.addChild(this.registerMenu),
        this.registerMenu.show();
  }
  onRegisterCancel() {
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
    this.registerMenu.parent && this.removeChild(this.registerMenu);
    this.emit(Layer.Events.SHOW_MENU);
  }
  onLogout() {
    this.memberMenu.setMode(MemberMenu.MODE_NONE);
    this.loginMenu.hides.forEach((b) => this.hideFeature(b));
    const a = { available: !1 };
    Registry.Instance.remove(Registry.Key.AUTOGEN);
    App.Autogen = !1;
    Registry.Instance.store(Registry.Key.CREDENTIAL, a);
    this.applyGuestSetup();
    this.registerMenu.reset();
    this.loginMenu.reset();
    this.customizationMenu.reset();
    this.emit(Layer.Events.UPDATE_CREDENTIAL, a);
    this.memberMenu.setMode(MemberMenu.MODE_NONE);
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
    this.emit(Layer.Events.SHOW_MENU);
  }
  onAccountDeactivateLogout() {
    this.applyGuestSetup();
    this.registerMenu.reset();
    this.loginMenu.reset();
    this.customizationMenu.reset();
    this.profileMenu.parent && this.removeChild(this.profileMenu);
    this.emit(Layer.Events.UPDATE_CREDENTIAL, { available: !1 });
    this.emit(Layer.Events.SHOW_MENU);
  }
  async onRegisterSubmit(a) {
    const b = await APIClient.postRegistration(a.name, a.email, a.password);
    !1 === b.success
      ? (this.registerMenu.reset(), this.registerMenu.displayErrorMessage(b.error))
      : 0 === a.email.length
      ? (this.registerMenu.displayCompletedMessage(!1),
        setTimeout(async () => {
          const c = await APIClient.postLogin(a.name, a.password);
          this.emit(Layer.Events.UPDATE_CREDENTIAL, c, !0);
          this.applyMemberSetup();
          this.onRegisterCancel();
        }, 4e3))
      : this.registerMenu.displayCompletedMessage();
  }
  onRecoverShow() {
    this.upResetMenu.hides.forEach((a) => this.hideFeature(a));
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
    this.upResetMenu.parent || this.addChild(this.upResetMenu);
    this.upResetMenu.show();
  }
  onRecoverCancel() {
    this.onLoginShow();
  }
  async onRecoverSubmit(a) {
    a = await APIClient.postRecovery(a.email, a.type, a.challenge);
    !1 === a.success
      ? (this.upResetMenu.reset(), this.upResetMenu.displayErrorMessage(a.error))
      : this.upResetMenu.displayCompletedMessage();
  }
  onProfileShow() {
    this.profileMenu.hides.forEach((a) => this.hideFeature(a));
    this.profileMenu.parent || this.addChild(this.profileMenu);
    this.profileMenu.show();
    this.emit(Layer.Events.HIDE_MENU);
    null === this.profileMenu.tab && this.profileMenu.openTab(ProfileMenu.TAB_OVERVIEW);
  }
  onGuestProfileAccess() {
    this.guestProfileMenu.hides.forEach((a) => this.hideFeature(a));
    if (this.guestMenu.mode === GuestMenu.MODE_GUEST_PROFILE) this.onGuestProfileHide();
    else
      this.emit(Layer.Events.HIDE_MENU),
        this.guestProfileMenu.parent || this.addChild(this.guestProfileMenu),
        this.guestMenu.setMode(GuestMenu.MODE_GUEST_PROFILE),
        this.guestProfileMenu.setTitle("Profile");
  }
  onGuestCustomizationAccess() {
    this.guestProfileMenu.hides.forEach((a) => this.hideFeature(a));
    if (this.guestMenu.mode === GuestMenu.MODE_SHOP) this.onGuestProfileHide();
    else
      this.emit(Layer.Events.HIDE_MENU),
        this.guestProfileMenu.parent || this.addChild(this.guestProfileMenu),
        this.guestMenu.setMode(GuestMenu.MODE_SHOP),
        this.guestProfileMenu.setTitle("Shop");
  }
  onGuestProfileHide() {
    this.guestProfileMenu.parent && this.removeChild(this.guestProfileMenu);
    this.emit(Layer.Events.SHOW_MENU);
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
  }
  onSettingsAccess() {
    this.mainMenuHides.forEach((a) => this.hideFeature(a));
    if (
      this.guestMenu.mode === GuestMenu.MODE_SETTINGS ||
      this.memberMenu.mode === MemberMenu.MODE_SETTINGS
    )
      this.onSettingsHide();
    else {
      switch (this.setup) {
        case Layer.SETUP_GUEST:
          this.guestMenu.setMode(GuestMenu.MODE_SETTINGS);
          break;
        case Layer.SETUP_MEMBER:
          this.memberMenu.setMode(MemberMenu.MODE_SETTINGS);
      }
      this.emit(Layer.Events.SHOW_MENU);
      this.emit(Layer.Events.SETTINGS_ACCESS);
    }
  }
  onSettingsHide() {
    switch (this.setup) {
      case Layer.SETUP_GUEST:
        this.guestMenu.setMode(GuestMenu.MODE_NONE);
        break;
      case Layer.SETUP_MEMBER:
        this.memberMenu.setMode(MemberMenu.MODE_NONE);
    }
    this.emit(Layer.Events.SETTINGS_HIDE);
    this.emit(Layer.Events.SHOW_MENU);
  }
  onProfileAccess() {
    this.emit(Layer.Events.HIDE_MENU);
    this.profileMenu.hides.forEach((a) => this.hideFeature(a));
    if (this.memberMenu.mode === MemberMenu.MODE_PROFILE) this.onProfileCancel();
    else
      this.profileMenu.parent || this.addChild(this.profileMenu),
        this.memberMenu.setMode(MemberMenu.MODE_PROFILE),
        this.profileMenu.show(),
        null === this.profileMenu.tab && this.profileMenu.openTab(ProfileMenu.TAB_OVERVIEW);
  }
  onProfileCancel() {
    this.profileMenu.parent && this.removeChild(this.profileMenu);
    this.profileMenu.hide();
    this.emit(Layer.Events.SHOW_MENU);
    this.memberMenu.setMode(MemberMenu.MODE_NONE);
  }
  async onProfileRename(a) {
    a = await APIClient.postLogin(a.name, a.password);
    this.emit(Layer.Events.UPDATE_CREDENTIAL, a, !0);
  }
  async onSocialmenuJoinClan() {
    let a = await APIClient.getCredentials(App.Credential.id);
    a.success &&
      ((credential = a.credential), this.emit(Layer.Events.UPDATE_CREDENTIAL, credential, !0));
    this.socialMenu.refresh();
  }
  onClanChatAccess() {
    this.clanChatMenu.parent ||
      (this.addChild(this.clanChatMenu),
      this.clanChatMenu.show(),
      this.clanChatMenu.resize(this.w, this.h),
      (this.clanChatMenu.x =
        this.socialMenu.x + (this.socialMenu.x < 0.5 * App.ReferenceWidth ? 0 : -20)),
      (this.clanChatMenu.y = this.socialMenu.y + 36));
  }
  async onProfileLeaveClan() {
    let a = await APIClient.getCredentials(App.Credential.id);
    a.success &&
      ((credential = a.credential), this.emit(Layer.Events.UPDATE_CREDENTIAL, credential, !0));
    this.socialMenu.refresh();
  }
  async onProfileCreateClan() {
    let a = await APIClient.getCredentials(App.Credential.id);
    a.success &&
      ((credential = a.credential), this.emit(Layer.Events.UPDATE_CREDENTIAL, credential, !0));
    this.socialMenu.refresh();
  }
  onServerCreationShow() {
    this.serverCreationMenu.hides.forEach((a) => this.hideFeature(a));
    this.serverCreationMenu.parent || this.addChild(this.serverCreationMenu);
    this.serverCreationMenu.show();
  }
  onServerCreationInit() {}
  onServerCreationClose() {
    this.serverCreationMenu.parent && this.removeChild(this.serverCreationMenu);
    this.emit(Layer.Events.SHOW_MENU);
  }
  onServerCreationRegion(a) {
    this.emit(Layer.Events.JOIN_SERVER, a);
  }
  onServerCreationJoinLobby() {
    this.onServerListingShow();
  }
  onServerCreationInitSession(a) {
    this.emit(Layer.Events.CREATE_SERVER, a);
  }
  onServerListingShow() {
    this.serverListMenu.hides.forEach((a) => this.hideFeature(a));
    this.serverListMenu.parent || this.addChild(this.serverListMenu);
    this.serverListMenu.show();
  }
  onServerListClose() {
    this.serverListMenu.parent && this.removeChild(this.serverListMenu);
    this.serverListMenu.hide();
    this.emit(Layer.Events.SHOW_MENU);
  }
  onServerListRefresh() {
    this.serverListMenu.refresh();
  }
  async onServerListJoinGame(a, b, c) {
    await this.updateCredentialsIfExpired();
    this.loadingMenu.parent || (this.addChild(this.loadingMenu), this.loadingMenu.show());
    this.emit(Layer.Events.JOIN_GAME, a, b, c);
  }
  onJoinGameMode() {
    this.loadingMenu.parent || (this.addChild(this.loadingMenu), this.loadingMenu.show());
    this.socialMenu &&
      300 > this.socialMenu.y &&
      (this.socialMenu.y =
        App.ReferenceHeight - (100 > this.socialMenu.height ? 200 : this.socialMenu.height));
  }
  onServerCreationJoinGame(a, b, c) {
    this.loadingMenu.parent || (this.addChild(this.loadingMenu), this.loadingMenu.show());
    this.emit(Layer.Events.JOIN_GAME, a, b, c);
  }
  onCustomizationShow() {
    if (
      this.guestMenu.mode === GuestMenu.MODE_SHOP ||
      this.memberMenu.mode === MemberMenu.MODE_SHOP
    )
      this.onCustomizationCancel();
    else
      this.mainMenuHides.forEach((a) => this.hideFeature(a)),
        this.customizationMenu.show(),
        this.addChild(this.customizationMenu),
        this.emit(Layer.Events.HIDE_MENU),
        this.memberMenu.setMode(MemberMenu.MODE_SHOP);
  }
  onCustomizationCancel() {
    this.customizationMenu.hide();
    this.customizationMenu.parent && this.removeChild(this.customizationMenu);
    this.emit(Layer.Events.SHOW_MENU);
    this.memberMenu.setMode(MemberMenu.MODE_NONE);
  }
  onUserAccess(a, b = "id", c = null) {
    this.userMenu.hides.forEach((d) => this.hideFeature(d));
    this.userMenu.hide();
    this.userMenu.load(a, b, c);
    this.addChild(this.userMenu);
    this.emit(Layer.Events.HIDE_MENU);
  }
  onUserCancel() {
    this.userMenu.parent && this.removeChild(this.userMenu);
    this.userMenu.hide();
    this.emit(Layer.Events.SHOW_MENU);
  }
  onUserUnfriend() {
    this.socialMenu.refresh();
  }
  onRankingShow() {
    this.rankingMenu.hides.forEach((a) => this.hideFeature(a));
    if (
      this.guestMenu.mode === GuestMenu.MODE_RANKING ||
      this.memberMenu.mode === MemberMenu.MODE_RANKING
    )
      this.onRankingCancel();
    else {
      switch (this.setup) {
        case Layer.SETUP_GUEST:
          this.guestMenu.setMode(GuestMenu.MODE_RANKING);
          break;
        case Layer.SETUP_MEMBER:
          this.memberMenu.setMode(MemberMenu.MODE_RANKING);
      }
      this.addChild(this.rankingMenu);
      this.emit(Layer.Events.HIDE_MENU);
      this.rankingMenu.show();
    }
  }
  onMemberShow() {
    this.memberBrowserMenu.hides.forEach((a) => this.hideFeature(a));
    if (
      this.guestMenu.mode === GuestMenu.MODE_MEMBER ||
      this.memberMenu.mode === MemberMenu.MODE_MEMBER
    )
      this.onMemberCancel();
    else {
      this.memberBrowserMenu.show();
      this.addChild(this.memberBrowserMenu);
      switch (this.setup) {
        case Layer.SETUP_GUEST:
          this.guestMenu.setMode(GuestMenu.MODE_MEMBER);
          break;
        case Layer.SETUP_MEMBER:
          this.memberMenu.setMode(MemberMenu.MODE_MEMBER);
      }
      this.emit(Layer.Events.HIDE_MENU);
    }
  }
  onMemberCancel() {
    this.memberBrowserMenu.parent && this.removeChild(this.memberBrowserMenu);
    this.memberBrowserMenu.hide();
    this.emit(Layer.Events.SHOW_MENU);
    this.memberMenu.setMode(MemberMenu.MODE_NONE);
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
  }
  onClanBrowserShow() {
    this.clanBrowserMenu.hides.forEach((a) => this.hideFeature(a));
    if (
      this.guestMenu.mode === GuestMenu.MODE_CLAN ||
      this.memberMenu.mode === MemberMenu.MODE_CLAN
    )
      this.onClanBrowserCancel();
    else {
      this.emit(Layer.Events.HIDE_MENU);
      switch (this.setup) {
        case Layer.SETUP_GUEST:
          this.guestMenu.setMode(GuestMenu.MODE_CLAN);
          break;
        case Layer.SETUP_MEMBER:
          this.memberMenu.setMode(MemberMenu.MODE_CLAN);
      }
      this.addChild(this.clanBrowserMenu);
      this.clanBrowserMenu.show();
    }
  }
  onClanBrowserCancel() {
    this.memberMenu.setMode(MemberMenu.MODE_NONE);
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
    this.clanBrowserMenu.parent && this.removeChild(this.clanBrowserMenu);
    this.clanBrowserMenu.hide();
    this.emit(Layer.Events.SHOW_MENU);
  }
  onRankingCancel() {
    this.rankingMenu.parent && this.removeChild(this.rankingMenu);
    this.rankingMenu.hide();
    this.emit(Layer.Events.SHOW_MENU);
    this.memberMenu.setMode(MemberMenu.MODE_NONE);
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
  }
  onLoadingCancel() {
    this.loadingMenu.parent && this.removeChild(this.loadingMenu);
    this.loadingMenu.hide();
    App.GameClient.disconnect();
  }
  onNewsAccess() {
    this.newsMenu.hides.forEach((a) => this.hideFeature(a));
    if (
      this.guestMenu.mode === GuestMenu.MODE_NEWS ||
      this.memberMenu.mode === MemberMenu.MODE_NEWS
    )
      this.onNewsCancel();
    else {
      switch (this.setup) {
        case Layer.SETUP_GUEST:
          this.guestMenu.setMode(GuestMenu.MODE_NEWS);
          break;
        case Layer.SETUP_MEMBER:
          this.memberMenu.setMode(MemberMenu.MODE_NEWS);
      }
      this.newsMenu.show();
      this.addChild(this.newsMenu);
      this.emit(Layer.Events.HIDE_MENU);
    }
  }
  onPVPAccess() {
    this.pvpMenu.hides.forEach((a) => this.hideFeature(a));
    this.pvpMenu.show();
    this.pvpMenu.parent || this.addChild(this.pvpMenu);
    this.emit(Layer.Events.HIDE_MENU);
  }
  onPVPStart(a) {
    this.inputOverlay.parent && this.removeChild(this.inputOverlay);
    this.loadingMenu.parent || (this.addChild(this.loadingMenu), this.loadingMenu.show());
    this.emit(Layer.Events.JOIN_GAME, a.name, a.server_id, "");
    this.onPVPCancel();
  }
  onPVPCancel() {
    this.inputOverlay.parent && this.removeChild(this.inputOverlay);
    this.pvpMenu.parent && this.removeChild(this.pvpMenu);
    this.emit(Layer.Events.SHOW_MENU);
  }
  onPVPConnectionError(a) {
    this.pvpMenu.onPVPConnectionError(a);
  }
  onNewsCancel() {
    this.newsMenu.parent && this.removeChild(this.newsMenu);
    this.emit(Layer.Events.SHOW_MENU);
    this.memberMenu.setMode(MemberMenu.MODE_NONE);
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
  }
  onPartnerShow() {
    this.partnerMenu.hides.forEach((a) => this.hideFeature(a));
    if (this.guestMenu.mode === GuestMenu.MODE_PARTNER) this.onPartnerCancel();
    else
      this.guestMenu.setMode(GuestMenu.MODE_PARTNER),
        this.partnerMenu.show(),
        this.addChild(this.partnerMenu),
        this.emit(Layer.Events.HIDE_MENU);
  }
  onPartnerCancel() {
    this.partnerMenu.parent && this.removeChild(this.partnerMenu);
    this.emit(Layer.Events.SHOW_MENU);
    this.memberMenu.setMode(MemberMenu.MODE_NONE);
    this.guestMenu.setMode(GuestMenu.MODE_NONE);
  }
  onMenuAccess() {
    this.mainMenuHides.forEach((a) => this.hideFeature(a));
    switch (this.setup) {
      case Layer.SETUP_GUEST:
        this.guestMenu.setMode(GuestMenu.MODE_NONE);
        break;
      case Layer.SETUP_MEMBER:
        this.memberMenu.setMode(MemberMenu.MODE_NONE);
    }
    this.emit(Layer.Events.SHOW_MENU);
  }
  onClanAccess(a) {
    if (
      this.guestMenu.mode === GuestMenu.MODE_RANKING ||
      this.memberMenu.mode === MemberMenu.MODE_RANKING
    )
      this.onRankingCancel();
    else if (
      this.guestMenu.mode === GuestMenu.MODE_MEMBER ||
      this.memberMenu.mode === MemberMenu.MODE_MEMBER
    )
      this.onMemberCancel();
    this.clanMenu.hides.forEach((b) => this.hideFeature(b));
    this.clanMenu.show(a);
    this.addChild(this.clanMenu);
    this.emit(Layer.Events.HIDE_MENU);
  }
  onClanCancel() {
    this.clanMenu.parent && this.removeChild(this.clanMenu);
    this.clanMenu.hide();
    this.emit(Layer.Events.SHOW_MENU);
  }
  onServerCreateResult(a) {
    this.serverCreationMenu.setCreatedStatus(a);
  }
  onServerReject(a) {
    switch (a.mode) {
      case 1:
        this.serverListMenu.setPasswordInvalid();
    }
    this.loadingMenu.parent && this.loadingMenu.setTitle(a.info);
  }
  onServerFull() {
    this.loadingMenu.parent && this.loadingMenu.setTitle("This region is full.");
  }
  onConnectionError() {
    this.loadingMenu.parent && this.loadingMenu.setTitle("Connection failed.");
  }
  async onServerAuthFailed() {
    this.loadingMenu.parent && this.loadingMenu.setTitle("Access denied.");
    await this.updateCredentialsIfExpired(!0);
  }
  onRenameAccess() {
    this.renameMenu.hides.forEach((a) => this.hideFeature(a));
    this.addChild(this.renameMenu);
    this.renameMenu.show();
  }
  async onRenameCompleted() {
    let a = await APIClient.getCredentials(App.Credential.id);
    a.success && this.emit(Layer.Events.UPDATE_CREDENTIAL, a.credential, !0);
  }
  onRenameCancel() {
    this.renameMenu.parent && this.removeChild(this.renameMenu);
    this.emit(Layer.Events.SHOW_MENU);
  }
  onLogoutAccess() {
    this.logoutMenu.hides.forEach((a) => this.hideFeature(a));
    this.addChild(this.logoutMenu);
    this.logoutMenu.show();
  }
  onLogoutCancel() {
    this.logoutMenu.parent && this.removeChild(this.logoutMenu);
    this.emit(Layer.Events.SHOW_MENU);
  }
  onServerDetailAccess(a) {
    this.serverDetailMenu.hides.forEach((b) => this.hideFeature(b));
    this.serverDetailMenu.show(a);
    this.addChild(this.serverDetailMenu);
  }
  onServerDetailCancel() {
    this.serverDetailMenu.parent && this.removeChild(this.serverDetailMenu);
  }
  onRewardsAccess() {
    this.rewardsMenu.hides.forEach((a) => this.hideFeature(a));
    this.rewardsMenu.parent || this.addChild(this.rewardsMenu);
    this.rewardsMenu.show();
  }
  onRewardsCancel() {
    this.rewardsMenu.parent && this.removeChild(this.rewardsMenu);
    this.rewardsMenu.hide();
  }
  onRewardsClaimed(a, b) {
    a && this.emit(Layer.Events.REWARDS_CLAIMED, b);
  }
  onRewardedAdFinished(a) {
    a ? this.rewardsMenu.claimRewards() : this.rewardsMenu.displayWarning();
  }
  onRewardedShopAdFinished(a, b = !1) {
    a
      ? b
        ? this.customizationMenu.claimRewards()
        : this.customizationMenu.displayRewardDialog()
      : this.customizationMenu.displayWarning();
  }
  onPVPMatch(a) {
    this.pvpMenu.displayMatch(a);
  }
  async onPVPTryConnect() {
    await this.updateCredentialsIfExpired();
    this.pvpMenu.attemptConnect();
    this.onPVPResultCancel();
  }
  onPVPConnect() {
    this.pvpMenu.onPVPClientConnect();
  }
  onPVPDisconnect(a) {
    this.pvpMenu.onPVPClientDisconnect(a);
  }
  onPVPStartCountdown() {
    this.addInputOverlay();
  }
  onPVPCancelCountdown() {
    this.inputOverlay.parent && this.removeChild(this.inputOverlay);
  }
  onPVPResultAccess() {
    this.onPVPAccess();
    this.pvpResultMenu.hides.forEach((a) => this.hideFeature(a));
    this.pvpResultMenu.show();
    this.pvpResultMenu.parent || this.addChild(this.pvpResultMenu);
  }
  onPVPResultCancel() {
    this.pvpResultMenu.hide();
    this.pvpResultMenu.parent && this.removeChild(this.pvpResultMenu);
  }
  addInputOverlay() {
    this.inputOverlay.width = App.ClientWidth;
    this.inputOverlay.height = App.ClientHeight;
    this.addChild(this.inputOverlay);
    this.setChildIndex(this.pvpMenu, this.children.length - 1);
  }
}
Layer.MODE_MENU = "menu";
Layer.MODE_GAME = "game";
Layer.SETUP_GUEST = "guest_setup";
Layer.SETUP_MEMBER = "member_setup";
Layer.Events = {
  DISCONNECT: disconnect,
  LOGIN_ACCESS: login_access,
  LOGIN_SUBMIT: login_submit,
  LOGIN_CANCEL: login_cancel,
  LOGOUT: logout,
  RECOVER_ACCESS: recover_access,
  RECOVER_SUBMIT: recover_submit,
  RECOVER_CANCEL: recover_cancel,
  REGISTER_ACCESS: register_access,
  REGISTER_SUBMIT: register_submit,
  REGISTER_CANCEL: register_cancel,
  PROFILE_ACCESS: profile_access,
  PROFILE_CANCEL: profile_cancel,
  PROFILE_RENAME: profile_rename,
  HIDE_MENU: hide_menu,
  SHOW_MENU: show_menu,
  UPDATE_CREDENTIAL: update_credential,
  CUSTOMIZATION_ACCESS: customization_access,
  CUSTOMIZATION_CANCEL: customization_cancel,
  USER_ACCESS: user_access,
  USER_CANCEL: user_cancel,
  USER_UNFRIEND: user_unfriend,
  RANKING_ACCESS: ranking_access,
  RANKING_CANCEL: ranking_cancel,
  MEMBER_ACCESS: member_access,
  MEMBER_CANCEL: member_cancel,
  NEWS_ACCESS: news_access,
  NEWS_CANCEL: news_cancel,
  PVP_ACCESS: pvp_access,
  PVP_CANCEL: pvp_cancel,
  PVP_CONNECT: pvp_connect,
  PVP_START: pvp_start,
  PVP_START_COUNTDOWN: pvp_start_countdown,
  PVP_CANCEL_COUNTDOWN: pvp_cancel_countdown,
  PARTNER_ACCESS: partner_access,
  PARTNER_CANCEL: partner_cancel,
  LEAVE_CLAN: leave_clan,
  CREATE_CLAN: create_clan,
  JOIN_CLAN: join_clan,
  JOIN_GAME: join_game,
  JOIN_GAME_FAIL: join_game_fail,
  JOIN_SERVER: join_server,
  CREATE_SERVER: create_server,
  SERVER_LIST_REFRESH: server_list_refresh,
  SERVER_LIST_CANCEL: server_list_cancel,
  SERVER_CREATION_CANCEL: server_creation_cancel,
  SERVER_CREATION_INIT: server_creation_init,
  SERVER_CREATION_REGION: server_creation_region,
  SERVER_CREATION_JOIN_LOBBY: server_creation_join_lobby,
  SERVER_CREATION_SESSION_INIT: server_creation_session_init,
  SERVER_CREATED: server_created,
  CLAN_CHAT_ACCESS: clan_chat_access,
  CLAN_CHAT_CANCEL: clan_chat_cancel,
  LOADING_CANCEL: loading_cancel,
  CLAN_BROWSER_ACCESS: clan_browser_access,
  CLAN_BROWSER_CANCEL: clan_browser_cancel,
  CLAN_ACCESS: clan_access,
  CLAN_CANCEL: clan_cancel,
  RENAME_ACCESS: rename_access,
  RENAME_SUBMIT: rename_submit,
  RENAME_CANCEL: rename_cancel,
  RENAME_COMPLETED: rename_completed,
  LOGOUT_CANCEL: logout_cancel,
  LOGOUT_ACCESS: logout_access,
  JOYSTICK_MOVE_STATE: joystick_move_state,
  JOYSTICK_TARGET_STATE: joystick_target_state,
  DISPLAY_HELP: display_help,
  MUTE_TOGGLE: mute_toggle,
  SERVER_DETAIL_ACCESS: server_detail_access,
  SERVER_DETAIL_CANCEL: server_detail_cancel,
  MENU_ACCESS: menu_access,
  GUEST_PROFILE_ACCESS: guest_profile_access,
  GUEST_PROFILE_HIDE: guest_profile_hide,
  SETTINGS_ACCESS: settings_access,
  SETTINGS_HIDE: settings_hide,
  ESCAPE_MENU_ACCESS: escape_menu_access,
  REWARDS_ACCESS: rewards_access,
  REWARDS_CLAIMED: rewards_claimed,
  REWARDS_CANCEL: rewards_cancel,
  PVP_RESULT_CANCEL: pvp_result_cancel,
};

export const Protocol = {
  CONNECT: "connection",
  CONNECTED: "onconnected",
  DISCONNECT: "disconnect",
  DISCONNECTED: "ondisconnected",
  ECHO: "a",
  ECHO_RESP: "b",
  INFO: "c",
  SESSION: "d",
  Session: {
    REGISTER: "e",
    CREATE: "f",
    CREATE_RESP: "g",
    JOIN_MODE: "h",
    JOIN_RESP: "i",
    JOIN_GAME: "j",
    LEAVE: "k",
    LEAVE_RESP: "l",
    LIST_GAMES: "m",
    LIST_GAMES_RESP: "n",
    CLIENT_AUTH: "o1",
  },
  GAME: "p",
  GAME_BIN: "q",
  Game: {
    UPDATE: "r",
    REQ: "t",
    INPUT: "v",
    INFO: "w",
    MESSAGE: "x",
    COMMAND: "y",
    ACTION: "z",
    STATUS: "aa",
    TRIGGER_RESPAWN: "ab",
  },
  SIGNAL_FULL: "ad",
};
var thumbnail = {};
export class Thumbnail extends PIXI.Sprite {
  constructor(a, b, c = !0, d = !1) {
    super();
    this.interactive = c;
    this.displayAura = d;
    this.w = a;
    this.h = b;
    this.s = 0.004 * this.w;
    this.numParticles = 64;
    this.customization = {};
    this.offsetY = this.offsetX = this.time = 0;
    this.head = new PIXI.Sprite();
    this.head.x = -2;
    this.head.y = 0.179 * -this.h;
    this.head.scale.x = this.head.scale.y = this.s;
    this.head.anchor.x = 0.5;
    this.head.anchor.y = 0.75;
    this.head.rotation = -0.15;
    this.face = new PIXI.Sprite();
    this.face.rotation = -0;
    this.torsoUpper = new PIXI.Sprite();
    this.torsoUpper.scale.x = this.torsoUpper.scale.y = 1.2 * this.s;
    this.torsoUpper.x = 0;
    this.torsoUpper.y = 0.105 * -this.h;
    this.torsoUpper.anchor.x = 0.5;
    this.torsoUpper.anchor.y = 0.4;
    this.torsoUpper.rotation = -0.1;
    this.torsoLower = new PIXI.Sprite();
    this.torsoLower.x = 2;
    this.torsoLower.y = 0.03 * -this.h;
    this.torsoLower.scale.x = this.torsoLower.scale.y = 1 * this.s;
    this.torsoLower.anchor.x = 0.5;
    this.torsoLower.anchor.y = 0.4;
    this.torsoLower.rotation = -0.1;
    this.armLeftUpper = new PIXI.Sprite();
    this.armLeftUpper.x = -12;
    this.armLeftUpper.y = 0.14 * -this.h;
    this.armLeftUpper.scale.x = this.armLeftUpper.scale.y = 1 * this.s;
    this.armLeftUpper.anchor.x = 0.6;
    this.armLeftUpper.anchor.y = 0.23;
    this.armLeftUpper.rotation = -0.05;
    this.armLeftLower = new PIXI.Sprite();
    this.armLeftLower.x = -17;
    this.armLeftLower.y = 0.02 * this.h;
    this.armLeftLower.scale.x = this.armLeftLower.scale.y = 0.95 * this.s;
    this.armLeftLower.anchor.x = 0.6;
    this.armLeftLower.anchor.y = 0.23;
    this.armLeftLower.rotation = 0.55 * Math.PI;
    this.armRightUpper = new PIXI.Sprite();
    this.armRightUpper.x = 15;
    this.armRightUpper.y = 0.17 * -this.h;
    this.armRightUpper.scale.x = this.armRightUpper.scale.y = 1 * this.s;
    this.armRightUpper.anchor.x = 0.55;
    this.armRightUpper.anchor.y = 0.23;
    this.armRightUpper.rotation = -0.3;
    this.armRightLower = new PIXI.Sprite();
    this.armRightLower.x = 22;
    this.armRightLower.y = 0.02 * -this.h;
    this.armRightLower.scale.x = 0.95 * -this.s;
    this.armRightLower.scale.y = 0.95 * this.s;
    this.armRightLower.anchor.x = 0.66;
    this.armRightLower.anchor.y = 0.23;
    this.armRightLower.rotation = 0.26 * Math.PI;
    this.legLeftUpper = new PIXI.Sprite();
    this.legLeftUpper.x = -1;
    this.legLeftUpper.y = 0.085 * this.h;
    this.legLeftUpper.scale.x = this.legLeftUpper.scale.y = 1 * this.s;
    this.legLeftUpper.anchor.x = 0.55;
    this.legLeftUpper.anchor.y = 0.31;
    this.legLeftUpper.rotation = 0.23 * Math.PI;
    this.legLeftLower = new PIXI.Sprite();
    this.legLeftLower.x = 10;
    this.legLeftLower.y = 0.25 * this.h;
    this.legLeftLower.scale.x = this.legLeftLower.scale.y = 1 * this.s;
    this.legLeftLower.anchor.x = 0.58;
    this.legLeftLower.anchor.y = 0.36;
    this.legLeftLower.rotation = 0.3 * -Math.PI;
    this.legRightUpper = new PIXI.Sprite();
    this.legRightUpper.x = 9;
    this.legRightUpper.y = 0.07 * this.h;
    this.legRightUpper.scale.x = this.legRightUpper.scale.y = 1 * this.s;
    this.legRightUpper.anchor.x = 0.55;
    this.legRightUpper.anchor.y = 0.3;
    this.legRightUpper.rotation = 0.01 * Math.PI;
    this.legRightLower = new PIXI.Sprite();
    this.legRightLower.x = -19;
    this.legRightLower.y = 0.21 * this.h;
    this.legRightLower.scale.x = this.legRightLower.scale.y = 1 * this.s;
    this.legRightLower.anchor.x = 0.58;
    this.legRightLower.anchor.y = 0.36;
    this.legRightLower.rotation = 0.22 * -Math.PI;
    this.bandana = new PIXI.Sprite(App.CombinedTextures.bandana_team_alpha);
    this.bandana.x = this.head.x + 13;
    this.bandana.y = this.head.y - 16;
    this.bandana.rotation = 0.32 * Math.PI;
    this.bandana.scale.x = 0.9 * this.s;
    this.bandana.scale.y = 0.5 * this.s;
    this.bandana.anchor.x = 0;
    this.bandana.anchor.y = 0.5;
    this.bandana.tint = 12255232;
    this.ninja = new PIXI.Container();
    this.ninja.x = 0.5 * this.w;
    this.ninja.y = 0.5 * this.h;
    this.aura = new PIXI.Sprite();
    this.aura.x = 0;
    this.aura.y = 0;
    this.aura.scale.x = this.aura.scale.y = 1.4;
    this.aura.anchor.x = this.aura.anchor.y = 0.5;
    this.aura.visible = this.displayAura;
    this.aura.rotation = Math.PI;
    this.on("mouseover", () => {
      this.aura.visible = !0;
    });
    this.on("mouseout", () => {
      this.aura.visible = !1;
    });
    this.ninja.addChild(this.aura);
    this.ninja.addChild(this.bandana);
    this.ninja.addChild(this.legRightLower);
    this.ninja.addChild(this.legLeftUpper);
    this.ninja.addChild(this.legLeftLower);
    this.ninja.addChild(this.legRightUpper);
    this.ninja.addChild(this.armLeftUpper);
    this.ninja.addChild(this.armLeftLower);
    this.ninja.addChild(this.torsoLower);
    this.ninja.addChild(this.torsoUpper);
    this.ninja.addChild(this.armRightLower);
    this.ninja.addChild(this.armRightUpper);
    this.ninja.addChild(this.head);
    this.head.addChild(this.face);
    this.bodyparts = [
      this.head,
      this.armLeftUpper,
      this.armLeftLower,
      this.torsoLower,
      this.torsoUpper,
      this.armRightUpper,
      this.armRightLower,
      this.legLeftUpper,
      this.legLeftLower,
      this.legRightUpper,
      this.legRightLower,
      this.bandana,
    ];
    this.addChild(this.ninja);
  }
  generateCharacter() {
    const a = App.CombinedTextures;
    var b = this.customization;
    this.aura.tint = void 0 === b.orb ? 16777215 : b.orb.data.energy;
    this.face.rotation = 0;
    this.face.vr = 0;
    let c = "head_alpha";
    if (b.hair) {
      var d = !1;
      b.face && b.face.cdata && !1 === b.face.cdata.hair && (d = !0);
      d ? (c += "_slick") : 0 < b.hair.texture.length && (c += "_" + b.hair.texture);
    }
    var e = "torsoupper";
    b.torso && 0 < b.torso.texture.length && (e += "_" + b.torso.texture);
    d = "energy_shell";
    this.aura.alpha = 1;
    b.orb &&
      (b.orb.cdata && b.orb.cdata.custom
        ? ((this.aura.visible = !1), (this.aura.alpha = 0))
        : 0 < b.orb.texture.length && (d += "_" + b.orb.texture));
    var f = "torsolower";
    this.torsoLower.x = 2;
    this.torsoLower.y = 0.03 * -this.h;
    this.torsoLower.anchor.x = 0.5;
    this.torsoLower.anchor.y = 0.4;
    if (b.belt && 0 < b.belt.texture.length) {
      f += "_" + b.belt.texture;
      var g = b.belt.cdata;
      void 0 !== g &&
        (void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.torsoLower.anchor.x = g.ax), (this.torsoLower.anchor.y = g.ay)),
        void 0 !== g.ox &&
          void 0 !== g.ox &&
          ((this.torsoLower.x = g.ox), (this.torsoLower.y = g.oy)),
        void 0 !== g.s && (this.torsoLower.scale.x = this.torsoLower.scale.y = this.s * g.s));
    }
    var h = "armleftlower";
    this.armLeftLower.x = -17;
    this.armLeftLower.y = 0.02 * this.h;
    this.armLeftLower.anchor.x = 0.6;
    this.armLeftLower.anchor.y = 0.23;
    b.armleftlower &&
      0 < b.armleftlower.texture.length &&
      ((h += "_" + b.armleftlower.texture),
      (g = b.armleftlower.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.armLeftLower.x = g.ox), (this.armLeftLower.y = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.armLeftLower.anchor.x = g.ax), (this.armLeftLower.anchor.y = g.ay))));
    var k = "armleftupper";
    this.armLeftUpper.x = -13;
    this.armLeftUpper.y = 0.14 * -this.h;
    this.armLeftUpper.anchor.x = 0.55;
    this.armLeftUpper.anchor.y = 0.23;
    b.armleftupper &&
      0 < b.armleftupper.texture.length &&
      ((k += "_" + b.armleftupper.texture),
      (g = b.armleftupper.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.armLeftUpper.x = g.ox), (this.armLeftUpper.y = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.armLeftUpper.anchor.x = g.ax), (this.armLeftUpper.anchor.y = g.ay))));
    var m = "armrightupper";
    this.armRightUpper.x = 15;
    this.armRightUpper.y = 0.17 * -this.h;
    this.armRightUpper.anchor.x = 0.55;
    this.armRightUpper.anchor.y = 0.23;
    b.armrightupper &&
      0 < b.armrightupper.texture.length &&
      ((m += "_" + b.armrightupper.texture),
      (g = b.armrightupper.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.armRightUpper.x = g.ox), (this.armRightUpper.y = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.armRightUpper.anchor.x = g.ax), (this.armRightUpper.anchor.y = g.ay))));
    var n = "armrightlower";
    this.armRightLower.x = 22;
    this.armRightLower.y = 0.02 * -this.h;
    this.armRightLower.anchor.x = 0.66;
    this.armRightLower.anchor.y = 0.23;
    b.armrightlower &&
      0 < b.armrightlower.texture.length &&
      ((n += "_" + b.armrightlower.texture),
      (g = b.armrightlower.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.armRightLower.x = g.ox), (this.armRightLower.y = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.armRightLower.anchor.x = g.ax), (this.armRightLower.anchor.y = g.ay))));
    var l = "legleftlower";
    this.legLeftLower.x = 10;
    this.legLeftLower.y = 0.25 * this.h;
    this.legLeftLower.anchor.x = 0.58;
    this.legLeftLower.anchor.y = 0.36;
    b.legleftlower &&
      (0 < b.legleftlower.texture.length && (l += "_" + b.legleftlower.texture),
      (g = b.legleftlower.cdata),
      void 0 !== g &&
        (void 0 !== g.ox &&
          void 0 !== g.oy &&
          ((this.legLeftLower.x = g.ox), (this.legLeftLower.y = g.oy)),
        void 0 !== g.ax &&
          void 0 !== g.ay &&
          ((this.legLeftLower.anchor.x = g.ax), (this.legLeftLower.anchor.y = g.ay))));
    g = "legrightlower";
    this.legRightLower.x = -19;
    this.legRightLower.y = 0.21 * this.h;
    this.legRightLower.anchor.x = 0.58;
    this.legRightLower.anchor.y = 0.36;
    if (b.legrightlower) {
      0 < b.legrightlower.texture.length && (g += "_" + b.legrightlower.texture);
      var p = b.legrightlower.cdata;
      void 0 !== p &&
        (void 0 !== p.ox &&
          void 0 !== p.oy &&
          ((this.legRightLower.x = p.ox), (this.legRightLower.y = p.oy)),
        void 0 !== p.ax &&
          void 0 !== p.ay &&
          ((this.legRightLower.anchor.x = p.ax), (this.legRightLower.anchor.y = p.ay)));
    }
    let r = "legleftupper";
    this.legLeftUpper.x = -1;
    this.legLeftUpper.y = 0.085 * this.h;
    this.legLeftUpper.anchor.x = 0.55;
    this.legLeftUpper.anchor.y = 0.31;
    b.legleftupper &&
      (0 < b.legleftupper.texture.length && (r += "_" + b.legleftupper.texture),
      (p = b.legleftupper.cdata),
      void 0 !== p &&
        (void 0 !== p.ox &&
          void 0 !== p.oy &&
          ((this.legLeftUpper.x = p.ox), (this.legLeftUpper.y = p.oy)),
        void 0 !== p.ax &&
          void 0 !== p.ay &&
          ((this.legLeftUpper.anchor.x = p.ax), (this.legLeftUpper.anchor.y = p.ay))));
    p = "legrightupper";
    this.legRightUpper.x = 9;
    this.legRightUpper.y = 0.07 * this.h;
    this.legRightUpper.anchor.x = 0.55;
    this.legRightUpper.anchor.y = 0.3;
    if (b.legrightupper) {
      0 < b.legrightupper.texture.length && (p += "_" + b.legrightupper.texture);
      let q = b.legrightupper.cdata;
      void 0 !== q &&
        (void 0 !== q.ox &&
          void 0 !== q.oy &&
          ((this.legRightUpper.x = q.ox), (this.legRightUpper.y = q.oy)),
        void 0 !== q.ax &&
          void 0 !== q.ay &&
          ((this.legRightUpper.anchor.x = q.ax), (this.legRightUpper.anchor.y = q.ay)));
    }
    b.face
      ? (this.face.removeChildren(),
        (this.face.tint = 16777215),
        b.face.cdata && b.face.cdata.custom && this.initializeCustomFaceFx(b.face.cdata.custom),
        0 < b.face.texture.length
          ? ((this.face.texture = a["face_" + b.face.texture]),
            (this.face.visible = !0),
            (b = b.face.cdata),
            void 0 !== b &&
              (void 0 !== b.ax && void 0 !== b.ay
                ? ((this.face.anchor.x = b.ax), (this.face.anchor.y = b.ay))
                : ((this.face.anchor.x = 0), (this.face.anchor.y = 0)),
              void 0 !== b.ox && void 0 !== b.ox
                ? ((this.face.x = b.ox), (this.face.y = b.oy))
                : ((this.face.x = 0), (this.face.y = 0)),
              b.vr && (this.face.vr = 0),
              void 0 !== b.s && (this.face.scale.x = this.face.scale.y = this.s * b.s * 0.95)))
          : (this.face.visible = !1))
      : (this.face.visible = !1);
    b = a[e];
    f = a[f];
    e = a[k];
    h = a[h];
    m = a[m];
    n = a[n];
    k = a[r];
    l = a[l];
    p = a[p];
    g = a[g];
    d = a[d];
    this.head.texture = a[c];
    this.torsoUpper.texture = b;
    this.torsoLower.texture = f;
    this.armLeftUpper.texture = e;
    this.armLeftLower.texture = h;
    this.armRightUpper.texture = m;
    this.armRightLower.texture = n;
    this.legLeftUpper.texture = k;
    this.legLeftLower.texture = l;
    this.legRightUpper.texture = p;
    this.legRightLower.texture = g;
    this.aura.texture = d;
  }
  initializeCustomFaceFx(a) {
    let b = new PIXI.Sprite(App.CombinedTextures[ParticleEffects.FireEyes.tex]);
    b.scale.x = b.scale.y = 0.5;
    b.x = -30;
    b.y = -33;
    switch (a) {
      case FaceRedFireEyes.ID:
        this.face.tint = 16711680;
        this.face.addChild(b);
        break;
      case FaceFireEyes.ID:
        this.face.tint = 16777215;
        this.face.addChild(b);
        break;
      case FacePinkFireEyes.ID:
        this.face.tint = 16738740;
        this.face.addChild(b);
        break;
      case FaceGreenFireEyes.ID:
        this.face.tint = 65280;
        this.face.addChild(b);
        break;
      case FaceBlueFireEyes.ID:
        this.face.tint = 255;
        this.face.addChild(b);
        break;
      case FaceYellowFireEyes.ID:
        this.face.tintt = 16776960;
        this.face.addChild(b);
        break;
      case FaceOrangeFireEyes.ID:
        (this.face.tint = 16753920), this.face.addChild(b);
    }
  }
  applyCustomization(a) {
    this.customization = {};
    a && (this.customization = a);
    this.generateCharacter();
  }
}
var pvpclient = {};
export class PVPClient extends EventDispatcher {
  constructor() {
    super();
    this.connectionTimeout = this.socket = null;
    this.allowNextAttempt = !0;
    let a = -1 !== window.location.protocol.indexOf("https");
    this.server = { port: 58393, domain: a ? "match.ninja.io" : "match.ninja.local", secure: a };
  }
  setServer(a) {
    this.server = a;
  }
  connect() {
    if (!this.allowNextAttempt) return !1;
    this.allowNextAttempt = !1;
    null !== this.connectionTimeout &&
      (clearTimeout(this.connectionTimeout), (this.connectionTimeout = null));
    this.connectionTimeout = setTimeout(() => (this.allowNextAttempt = !0), 1e3);
    var a = LZString.compressToEncodedURIComponent(JSON.stringify(App.Credential));
    a =
      (this.server.secure ? "wss" : "ws") +
      "://" +
      this.server.domain +
      ":" +
      this.server.port +
      "/ws?auth=" +
      a;
    this.socket &&
      this.socket.readyState !== WebSocket.CLOSED &&
      this.socket.readyState !== WebSocket.CLOSING &&
      this.socket.readyState !== WebSocket.CONNECTING &&
      this.disconnect();
    this.socket = new WebSocket(a, ["ninja.io"]);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.binaryType = "arraybuffer";
    return !0;
  }
  disconnect() {
    this.socket.close();
  }
  onOpen(a) {
    this.dispatchEvent({ type: PVPClient.CONNECT });
  }
  onError(a) {
    this.dispatchEvent({ type: PVPClient.CONNECTION_ERROR });
    console.log("PVP server connection error", a);
  }
  onMessage(a) {
    a = PVPClient.decompress(a.data);
    this.dispatchEvent(a);
  }
  onClose(a) {
    let b = null;
    switch (a.code) {
      case PVPClient.CODE_AUTH_FAILED:
        App.Console.log("Invalid credentials.", 16711680);
        this.dispatchEvent({ type: PVPClient.AUTH_FAILED });
        b = "Invalid credentials.";
        break;
      case PVPClient.CODE_MAX_CLIENTS:
        App.Console.log("This region is full.", 16711680);
        App.Console.log("Retry later or select a different region.", 16763904);
        this.dispatchEvent({ type: PVPClient.SERVER_FULL });
        b = "Region is full.";
        break;
      case PVPClient.CODE_DUPLICATE_CLIENT:
        App.Console.log("This account is already connected.", 16711680),
          (b = "Account already connected.");
    }
    this.dispatchEvent({ type: PVPClient.DISCONNECT, data: b });
  }
  emit(a) {
    this.socket.readyState === WebSocket.OPEN && ((a = PVPClient.compress(a)), this.socket.send(a));
  }
  isConnected() {
    return null !== this.socket && this.socket.readyState === WebSocket.OPEN;
  }
}
PVPClient.compress = function (a) {
  let b = JSON.stringify(a),
    c = PVPClient.SendBuffer.subarray(0, b.length + 1);
  c[0] = a.t ? 1 : 0;
  for (let d = 1, e = b.length; d < e + 1; d++) c[d] = b.charCodeAt(d - 1);
  return c;
};
PVPClient.decompress = function (a) {
  a = new Uint8Array(a);
  let b = Array(a.length);
  for (let c = 0; c < a.length; c++) b[c] = String.fromCharCode(a[c]);
  return JSON.parse(b.join(""));
};
PVPClient.unpackGameData = function (a) {
  return {
    t: Protocol.Game.UPDATE,
    d: JSON.parse(LZString.decompressFromUint8Array_Fast(a.subarray(1))),
  };
};
PVPClient.SendBuffer = new Uint8Array(2048);
PVPClient.CONNECT = "a";
PVPClient.DISCONNECT = "b";
PVPClient.AUTH_FAILED = "c";
PVPClient.SERVER_FULL = "d";
PVPClient.CONNECTION_ERROR = "e";
PVPClient.CODE_AUTH_FAILED = 1;
PVPClient.CODE_MAX_CLIENTS = 2;
PVPClient.CODE_DUPLICATE_CLIENT = 3;
PVPClient.MATCH = 1;
PVPClient.MATCH_REGISTERED = 2;
PVPClient.MATCH_CREATED = 3;
PVPClient.MATCH_ERROR = 4;
PVPClient.MATCH_SEARCH = 5;
PVPClient.MATCH_CANCEL = 6;
export class App extends PIXI.Container {
  constructor() {
    super();
    this.credential = {};
    this.servers = [];
    this.status = {};
    this.stage = this.pixi = null;
    this.settings = {};
    this.gameplayStopped = !0;
    this.threadUpdate = this.hasResized = this.resizeOnLoad = this.matchStarted = !1;
    this.pvpClient = new PVPClient();
    this.pvpClient.addListener(PVPClient.MATCH, (a) => this.onPVPMatch(a));
    this.pvpClient.addListener(PVPClient.MATCH_CREATED, (a) => this.onPVPMatch(a));
    this.pvpClient.addListener(PVPClient.MATCH_REGISTERED, (a) => this.onPVPMatch(a));
    this.pvpClient.addListener(PVPClient.MATCH_ERROR, (a) => this.onPVPMatch(a));
    this.pvpClient.addListener(PVPClient.CONNECT, (a) => this.onPVPConnect(a));
    this.pvpClient.addListener(PVPClient.DISCONNECT, (a) => this.onPVPDisconnect(a));
    this.pvpClient.addListener(PVPClient.CONNECTION_ERROR, (a) => this.onPVPConnectionError(a));
    this.gameClient = new Client();
    App.PVPClient = this.pvpClient;
    App.GameClient = this.gameClient;
    this.gameClient.addListener(Protocol.INFO, (a) => this.onInfo(a.data));
    this.gameClient.addListener(Protocol.DISCONNECT, (a) => this.onDisconnect());
    this.gameClient.addListener(Protocol.SESSION, (a) => this.onSessionData(a.data));
    this.gameClient.addListener(Client.CONNECT, (a) => this.onConnect(a));
    this.gameClient.addListener(Client.AUTH_FAILED, (a) => this.onRegisterFailed(a));
    this.gameClient.addListener(Client.SERVER_FULL, (a) => this.onServerFull(a));
    this.gameClient.addListener(Client.CONNECTION_ERROR, (a) => this.onConnectionError(a));
    this.gameClient.onCloseForImmediateReconnect =
      this.onClientDisconnectForImmediateReconnect.bind(this);
    this.authenticated = !1;
    this.user = new User();
    this.game = null;
    this.matchStarted = !1;
    this.background =
      this.adLoaderBackground =
      this.onConnectRetryMode =
      this.gameOutputListener =
      this.gameBinInputListener =
      this.gameInputListener =
        null;
    this.onMouseDownListener = this.onMouseDown.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);
    this.inCommercialBreak = !1;
    this.startTime = Date.now();
    this.autoJoinGame = null;
    this.autoJoinOnCreate = !1;
    this.checkInterval = null;
    this.lastUpdateTime = Date.now();
    this.hasLoaded = !1;
    this.redrawTimeout = this.adFaderInterval = this.adLoaderTimeout = null;
    this.stepCount = 0;
    this.stepCallback = (a) => (App.DisplayFrameTime ? this.onStepDev(a) : this.onStep(a));
    this.totalFrameTime = [];
    this.logicFrameTime = [];
    this.renderFrameTime = [];
    this.lastServerReload = Date.now();
    this.lastBannerReload = Date.now();
    this.adElement = document.getElementById("adwrapper");
    document.addEventListener("visibilitychange", () => this.setFocus(document.hidden ? !1 : !0));
  }
  async load() {
    switch (App.WhiteLabel) {
      case App.WhiteLabel_CG:
        App.CrazySDK.init();
        App.CrazySDK.addEventListener("adStarted", () => this.adStarted());
        App.CrazySDK.addEventListener("adError", () => this.adError());
        App.CrazySDK.addEventListener("adFinished", () => this.adFinished());
        App.CrazySDK.addEventListener("bannerRendered", (a) => {
          console.log(`Banner for container ${a.containerId} has been rendered!`);
        });
        App.CrazySDK.addEventListener("bannerError", (a) => {
          console.log(`Banner render error: ${a.error}`);
        });
        App.CrazySDK.addEventListener("adblockDetectionExecuted", (a) => {
          App.AdblockDetected = a.hasAdblock ? !0 : !1;
        });
        this.proceed();
        break;
      case App.WhiteLabel_POKI:
      case App.WhiteLabel_POKI_MAIN:
        App.PokiSDK &&
          App.PokiSDK.init()
            .then(() => {
              console.log("Poki SDK successfully initialized");
              App.AdblockDetected = !1;
              App.PokiSDK.gameLoadingStart();
              this.proceed();
            })
            .catch(() => {
              console.log("Initialized, but the user likely has adblock");
              App.AdblockDetected = !0;
              App.PokiSDK.gameLoadingStart();
              this.proceed();
            });
        PokiSDK.setDebug(!1);
        break;
      default:
        this.proceed();
    }
  }
  async proceed() {
    App.UpdatePreloader(0.2);
    var a = Registry.Instance.retrieve(Registry.Key.CREDENTIAL);
    const b = Registry.Instance.retrieve(Registry.Key.MASTER);
    App.FirstRun = b ? b.firstRun : !1;
    try {
      App.FirstRun
        ? ((this.credential = await APIClient.postAutoRegistration()),
          this.credential.credentials
            ? (Registry.Instance.store(Registry.Key.AUTOGEN, {
                name: this.credential.name,
                password: btoa(this.credential.password),
              }),
              (this.credential = this.credential.credentials),
              Registry.Instance.store(Registry.Key.CREDENTIAL, this.credential),
              (Registry.Instance.credential = this.credential))
            : (this.credential = await this.fetchGuestCredential()))
        : (this.credential =
            a &&
            void 0 !== a.accounttype &&
            !1 !== a.available &&
            null !== a.playerid &&
            null !== a.id &&
            void 0 !== a.level
              ? a
              : await this.fetchGuestCredential());
    } catch (c) {
      this.credential = App.DefaultCredential;
    }
    (a = Registry.Instance.retrieve(Registry.Key.AUTOGEN)) && !0 !== a.error && (App.Autogen = !0);
    this.credential || (this.credential = App.DefaultCredential);
    App.Credential = this.credential;
    App.UpdatePreloader(0.3);
    this.settings = Registry.Instance[Registry.Key.SETTINGS];
    this.settings.sound.enabled || Howler.mute(!0);
    a = {
      backgroundColor: 0,
      antialias: this.settings.graphics.aa,
      transparent: !1,
      resolution: App.DevicePixelRatio,
      autoDensity: !0,
      width: App.ClientWidth,
      height: App.ClientHeight,
    };
    PIXI.settings.WRAP_MODE = PIXI.WRAP_MODES.REPEAT;
    PIXI.Mesh.BATCHABLE_SIZE = 65536;
    PIXI.GraphicsGeometry.BATCHABLE_SIZE = 65536;
    this.pixi = new PIXI.Application(a);
    PIXI.Text.defaultResolution = 2;
    PIXI.Text.defaultAutoResolution = !0;
    App.Renderer = this.pixi.renderer;
    App.Renderer.view.oncontextmenu = (c) => c.preventDefault();
    this.view = this.pixi.view;
    this.view.style.display = "block";
    this.view.id = "view";
    App.Stage = this.stage = this.pixi.stage;
    document.body.appendChild(this.view);
    window.onresize = () => this.onResize();
    App.UpdatePreloader(0.4);
    this.interpreter = new Interpreter(this);
    this.interpreter.addCommand(App.CMD_CONNECT, this.onCmdConnect);
    this.interpreter.addCommand(App.CMD_DISCONNECT, this.onCmdDisconnect);
    this.interpreter.addCommand(App.CMD_UNLINK, this.onCmdUnlink);
    this.interpreter.on(Interpreter.INVALID_COMMAND, (c) => this.onCmdInvalid(c));
    a = new AssetLoader(App.Assets, App.RESOURCE_FOLDER);
    a.onProgress = (c) => {
      App.UpdatePreloader(0.4 + 0.6 * c.progress);
    };
    a.onComplete = () => this.start();
    a.load(App.RESOURCES);
  }
  async fetchGuestCredential(a) {
    a = App.GenerateGuestName(a);
    return await APIClient.getGuestCredentials(a);
  }
  async start() {
    switch (App.WhiteLabel) {
      case App.WhiteLabel_POKI:
      case App.WhiteLabel_POKI_MAIN:
        App.PokiSDK && App.PokiSDK.gameLoadingFinished();
    }
    App.RemovePreloader();
    App.CombinedTextures = App.Assets.combined.textures;
    App.GenerateTexturesFromSheet(App.Assets.seamless.textures);
    App.Console = new CommandConsole();
    App.Console.ignoreInput = !0;
    App.Console.linkInterpreter(this.interpreter);
    App.Layer = new Layer();
    App.Layer.on(Layer.Events.DISCONNECT, this.onLayerDisconnect.bind(this));
    App.Layer.on(Layer.Events.HIDE_MENU, this.onLayerHideMenu.bind(this));
    App.Layer.on(Layer.Events.SHOW_MENU, this.onLayerShowMenu.bind(this));
    App.Layer.on(Layer.Events.UPDATE_CREDENTIAL, this.onLayerUpdateCredential.bind(this));
    App.Layer.on(Layer.Events.JOIN_GAME, this.onLayerJoinGame.bind(this));
    App.Layer.on(Layer.Events.JOIN_SERVER, this.onLayerJoinServer.bind(this));
    App.Layer.on(Layer.Events.CREATE_SERVER, this.onLayerCreateServer.bind(this));
    App.Layer.on(Layer.Events.RENAME_COMPLETED, this.onLayerRenameCompleted.bind(this));
    App.Layer.on(Layer.Events.JOYSTICK_MOVE_STATE, this.onJoystickMoveState.bind(this));
    App.Layer.on(Layer.Events.JOYSTICK_TARGET_STATE, this.onJoystickTargetState.bind(this));
    App.Layer.on(Layer.Events.DISPLAY_HELP, this.onLayerDisplayHelp.bind(this));
    App.Layer.on(Layer.Events.MUTE_TOGGLE, this.onLayerMute.bind(this));
    App.Layer.on(Layer.Events.SETTINGS_ACCESS, this.onLayerShowSettings.bind(this));
    App.Layer.on(Layer.Events.SETTINGS_HIDE, this.onLayerHideSettings.bind(this));
    App.Layer.on(Layer.Events.ESCAPE_MENU_ACCESS, this.onEscapeMenuAccess.bind(this));
    App.Layer.on(Layer.Events.REWARDS_CLAIMED, this.onRewardsClaimed.bind(this));
    App.Layer.resize(App.ClientWidth, App.ClientHeight);
    await App.Layer.setMode(Layer.MODE_MENU);
    App.Stats = new Stats();
    App.Stats.x = App.ClientWidth - 12;
    App.Stats.y = 12;
    this.cursor = new PIXI.Sprite(App.CombinedTextures.mouse_pointer);
    this.adLoaderBackground = new PIXI.Sprite(App.CombinedTextures.blank);
    this.adLoaderBackground.width = App.ClientWidth;
    this.adLoaderBackground.height = App.ClientHeight;
    this.adLoaderBackground.interactive = !0;
    this.adLoaderBackground.tint = 0;
    this.adLoaderBackground.on("mousemove", (b) => {
      this.cursor.x = b.data.global.x;
      this.cursor.y = b.data.global.y;
    });
    this.continueButton = new PIXI.Sprite(App.CombinedTextures.blank);
    this.continueButton.tint = 0;
    this.continueButton.alpha = 0.3;
    this.continueButton.interactive = !0;
    this.continueButton.on("mousedown", (b) => {
      this.onTriggerVideoAd();
      b.stopPropagation();
    });
    this.continueButton.on("touchstart", (b) => {
      this.onTriggerVideoAd();
      b.stopPropagation();
    });
    this.continueButtonText = new PIXI.Text("Click here when you're ready", FontStyle.ReadyBarText);
    this.continueButtonText.hitArea = new PIXI.Rectangle();
    this.gradient = new Gradient(App.ClientWidth, App.ClientHeight);
    this.gradient.sc = 1;
    this.gradient.minY = -1e3;
    this.gradient.maxY = 0;
    this.gradient.colors("#FFCC65", "#465eff");
    this.gradient.offset(0);
    this.gradient.interactive = !0;
    this.gradient.on("touchstart", () => {
      this.cursor.visible = !1;
    });
    this.sky = new PIXI.Graphics();
    this.sky.pivot.x = 0.5;
    this.sky.beginFill(16777215, 1);
    for (var a = 0; 300 > a; a++) {
      let b = Math.random() * App.ClientHeight * 0.75;
      this.sky.drawCircle(
        Math.random() * App.ClientWidth,
        b,
        (0.5 + 0.5 * Math.random()) * (1 - (1 / App.ClientHeight) * 0.75 * b) + 0.5
      );
    }
    this.sky.endFill();
    this.sky.beginFill(16777045, 1);
    this.sky.drawCircle(100, 500, 100);
    this.sky.endFill();
    this.background = new Background(6, 5, 600, 150, 50, 50);
    this.background.draw("generic", 5263964);
    this.background.x = 0;
    this.background.y = -200;
    App.WhiteLabel === App.WhiteLabel_POKI_MAIN &&
      App.Domain !== App.WhiteLabel_CG &&
      ((this.pokiLogo = new PIXI.Sprite(App.CombinedTextures["poki-badge"])),
      (this.pokiLogo.scale.x = this.pokiLogo.scale.y = 1 * App.Scale),
      (this.pokiLogo.anchor.x = 1),
      (this.pokiLogo.anchor.y = 1),
      (this.pokiLogo.interactive = !0),
      this.pokiLogo.on("touchstart", () => window.open("https://poki.com/en/g/ninja-io", "_blank")),
      this.pokiLogo.on("mousedown", () => window.open("https://poki.com/en/g/ninja-io", "_blank")),
      this.pokiLogo.on(
        "mouseover",
        () => (this.pokiLogo.scale.x = this.pokiLogo.scale.y = 1.05 * App.Scale)
      ),
      this.pokiLogo.on(
        "mouseout",
        () => (this.pokiLogo.scale.x = this.pokiLogo.scale.y = 1 * App.Scale)
      ));
    this.youtubeLogo = new PIXI.Sprite(App.CombinedTextures.youtube_logo);
    this.youtubeLogo.scale.x = this.youtubeLogo.scale.y = 0.45 * App.Scale;
    this.youtubeLogo.interactive = !0;
    this.youtubeLogo.on("mouseover", () => {
      this.youtubeLogo.scale.x = this.youtubeLogo.scale.y = 0.5 * App.Scale;
      AudioEffects.ButtonHover.audio.play();
    });
    this.youtubeLogo.on(
      "mouseout",
      () => (this.youtubeLogo.scale.x = this.youtubeLogo.scale.y = 0.45 * App.Scale)
    );
    this.youtubeLogo.on("mousedown", () =>
      window.open("https://www.youtube.com/channel/UCET8PfVdLECAMYwDYIUY3rA", "_blank")
    );
    this.youtubeLogo.on("touchstart", () =>
      window.open("https://www.youtube.com/channel/UCET8PfVdLECAMYwDYIUY3rA", "_blank")
    );
    this.twitterLogo = new PIXI.Sprite(App.CombinedTextures.twitter_logo);
    this.twitterLogo.scale.x = this.twitterLogo.scale.y = 0.4 * App.Scale;
    this.twitterLogo.interactive = !0;
    this.twitterLogo.on("mouseover", () => {
      this.twitterLogo.scale.x = this.twitterLogo.scale.y = 0.45 * App.Scale;
      AudioEffects.ButtonHover.audio.play();
    });
    this.twitterLogo.on(
      "mouseout",
      () => (this.twitterLogo.scale.x = this.twitterLogo.scale.y = 0.4 * App.Scale)
    );
    this.twitterLogo.on("mousedown", () =>
      window.open("https://twitter.com/ninjaio_game", "_blank")
    );
    this.twitterLogo.on("touchstart", () =>
      window.open("https://twitter.com/ninjaio_game", "_blank")
    );
    this.redditLogo = new PIXI.Sprite(App.CombinedTextures.reddit_logo);
    this.redditLogo.scale.x = this.redditLogo.scale.y = 0.4 * App.Scale;
    this.redditLogo.interactive = !0;
    this.redditLogo.on("mouseover", () => {
      this.redditLogo.scale.x = this.redditLogo.scale.y = 0.45 * App.Scale;
      AudioEffects.ButtonHover.audio.play();
    });
    this.redditLogo.on(
      "mouseout",
      () => (this.redditLogo.scale.x = this.redditLogo.scale.y = 0.4 * App.Scale)
    );
    this.redditLogo.on("mousedown", () =>
      window.open("https://www.reddit.com/r/ninjaio", "_blank")
    );
    this.redditLogo.on("touchstart", () =>
      window.open("https://www.reddit.com/r/ninjaio", "_blank")
    );
    App.SelectedMode = Registry.GetLocalStorageItem(App.ModePreference);
    App.FirstRun
      ? (App.SelectedMode = Game.MODE_TR)
      : "string" !== App.SelectedMode &&
        ((a = Math.random()),
        (App.SelectedMode =
          0.3 > a ? Game.MODE_TDM : 0.3 <= a && 0.6 > a ? Game.MODE_CTF : Game.MODE_DM));
    this.showMenu();
    this.cursor.x = 0.5 * App.ClientWidth;
    this.cursor.y = 0.5 * App.ClientHeight;
    this.cursor.anchor.x = 0;
    this.cursor.anchor.y = 0;
    this.cursor.scale.x = this.cursor.scale.y = 0.25;
    App.IsMobile
      ? ((this.cursor.visible = !1), setInterval(() => this.onResize(!0), 5e3))
      : this.stage.addChild(App.Console);
    this.stage.addChild(App.Stats);
    this.stage.addChild(App.Layer);
    App.WhiteLabel === App.WhiteLabel_POKI_MAIN &&
      App.Domain !== App.WhiteLabel_CG &&
      this.stage.addChild(this.pokiLogo);
    this.stage.addChild(this.cursor);
    requestAnimationFrame(this.stepCallback);
    this.hasLoaded = !0;
    this.onResize();
    this.menu.resize();
  }
  onMouseDown() {
    Dropdown.CollapseInstances();
    document.hasFocus() || window.focus();
  }
  onMouseMove(a) {
    a.stopPropagation();
    this.cursor.x = a.data.global.x;
    this.cursor.y = a.data.global.y;
    1 > this.scale.x
      ? ((this.background.x =
          700 + 0.02 * (-a.data.global.x - 0.5 * App.ClientWidth) + -400 * (1 - this.scale.x)),
        (this.background.y = -100 + 0.02 * -a.data.global.y),
        (this.sky.x = 0.01 * -a.data.global.x + -400 * (1 - this.scale.x)))
      : ((this.background.x = 700 + 0.02 * (-a.data.global.x - 0.5 * App.ClientWidth)),
        (this.background.y = -100 + 0.02 * -a.data.global.y),
        (this.sky.x = 0.01 * -a.data.global.x));
    this.sky.y = 0.01 * -a.data.global.y;
  }
  showMenu() {
    App.Console.ignoreInput = !0;
    App.Console.onConsoleInputFocus(!1);
    if (App.WhiteLabel !== App.WhiteLabel_NONE || 1300 > App.ClientWidth) App.Console.visible = !1;
    App.Stage.on("mousedown", this.onMouseDownListener);
    App.Stage.on("mousemove", this.onMouseMoveListener);
    this.menu = new Menu(this.servers);
    switch (App.WhiteLabel) {
      case App.WhiteLabel_CG:
        this.adElement &&
          ((this.adElement.style.display = "block"),
          App.CrazySDK.requestResponsiveBanner(["banner-container"]));
        break;
      case App.WhiteLabel_POKI_MAIN:
        this.adElement &&
          App.PokiSDK &&
          ((this.adElement.style.display = "block"),
          App.PokiSDK.displayAd(this.adElement, "728x90"));
        break;
      default:
        this.adElement &&
          window.aiptag &&
          ((this.adElement.style.display = "block"),
          aiptag.cmd.display.push(function () {
            aipDisplayTag.display("ninja-io_300x250");
          }));
    }
    this.menu.on(Menu.GUEST_NAME_CHANGE, (a) => this.onGuestNameChange(a));
    this.menu.on(Menu.CUSTOMIZATION_ACCESS, () => App.Layer.onCustomizationShow());
    this.menu.on(Menu.SERVER_CREATION_ACCESS, () => App.Layer.onServerCreationShow());
    this.menu.on(Menu.SERVER_LISTING_ACCESS, () => App.Layer.onServerListingShow());
    this.menu.on(Menu.RENAME_ACCESS, () => App.Layer.onRenameAccess());
    this.menu.on(Menu.JOIN_GAME_MODE, (a) => this.onRequestJoinGameMode(a));
    this.menu.on(Menu.JOIN_SERVER, (a, b) => this.onRequestChooseServer(a, b));
    this.menu.on(Menu.REWARDS_ACCESS, () => App.Layer.onRewardsAccess());
    this.menu.on(Menu.NEWS_ACCESS, () => App.Layer.onNewsAccess());
    this.menu.on(Menu.PVP_ACCESS, () => App.Layer.onPVPAccess());
    this.menu.setPlayerData({
      name: this.credential.username,
      guest: -1 === this.credential.playerid ? !0 : !1,
      customization: this.credential.customization,
    });
    this.menu.setServerData(this.servers);
    this.menu.setServerStatus(this.status);
    this.menu.init();
    this.stage.addChild(this.gradient);
    this.stage.addChild(this.sky);
    this.stage.addChild(this.background);
    this.stage.addChild(this.menu);
    App.WhiteLabel !== App.WhiteLabel_POKI &&
      ((this.youtubeLogo.x = 0.5 * App.ClientWidth + 320),
      (this.redditLogo.x = 0.5 * App.ClientWidth + 362),
      (this.twitterLogo.x = 0.5 * App.ClientWidth + 400),
      (this.youtubeLogo.y = 7 * App.Scale),
      (this.twitterLogo.y = 4 * App.Scale),
      (this.redditLogo.y = 5 * App.Scale),
      this.stage.addChild(this.youtubeLogo),
      this.stage.addChild(this.twitterLogo),
      this.stage.addChild(this.redditLogo));
    this.onResize();
    App.Console.parent && this.stage.setChildIndex(App.Console, this.stage.children.length - 1);
    App.Layer.parent && this.stage.setChildIndex(App.Layer, this.stage.children.length - 1);
    this.checkInterval ||
      ((this.checkInterval = setInterval(() => {
        let a = Date.now();
        6e4 <= a - this.lastServerReload && ((this.lastServerReload = a), this.requestServerList());
        if (6e4 <= a - this.lastBannerReload)
          switch (((this.lastBannerReload = a), App.WhiteLabel)) {
            case App.WhiteLabel_CG:
              this.adElement &&
                ((this.adElement.style.display = "block"),
                App.CrazySDK.requestResponsiveBanner(["banner-container"]));
          }
      }, App.CheckIntervalRate)),
      this.requestServerList());
    App.WhiteLabel === App.WhiteLabel_POKI_MAIN &&
      App.Domain !== App.WhiteLabel_CG &&
      this.stage.addChild(this.pokiLogo);
  }
  setFocus(a) {
    if ((App.HasFocus = a))
      this.game ? (this.game.focus(), this.game.resize()) : this.menu && this.menu.resize();
  }
  onConnect() {
    this.onConnectRetryMode &&
      (this.onRequestJoinGameMode(this.onConnectRetryMode), (this.onConnectRetryMode = null));
    App.ConnectedServer = App.SelectedServer;
  }
  async onDisconnect() {
    null !== this.game && this.leaveGame(!0);
  }
  onStep(a) {
    const b = a - this.lastUpdateTime;
    0 > b && (this.lastUpdateTime = a);
    App.Time = App.StartTime + a;
    13 < b &&
      ((this.lastUpdateTime = a),
      (App.FrameTime = (60 * b) / 1e3),
      this.game
        ? this.game.step(b)
        : (App.Layer && App.Layer.update(), this.menu && this.menu.active && this.menu.step()),
      App.Renderer && App.Renderer.render(this.stage, { clear: !1 }));
    this.stepCount++;
    requestAnimationFrame(this.stepCallback);
  }
  onStepDev(a) {
    var b = 0,
      c = 0,
      d = 0;
    let e = 0,
      f = 0,
      g = 0;
    b = performance.now();
    c = a - this.lastUpdateTime;
    0 > c && (this.lastUpdateTime = a);
    App.Time = App.StartTime + a;
    13 < c &&
      ((this.lastUpdateTime = a),
      (App.FrameTime = (60 * c) / 1e3),
      this.game
        ? ((d = performance.now()), this.game.step(c), (e = performance.now()))
        : (App.Layer && App.Layer.update(), this.menu && this.menu.active && this.menu.step()),
      (f = performance.now()),
      App.Renderer && App.Renderer.render(this.stage, { clear: !1 }),
      (g = performance.now()));
    c = performance.now();
    20 > a % 1e3 && 60 <= this.totalFrameTime.length
      ? ((a = (this.totalFrameTime.reduce((h, k) => h + k) / this.totalFrameTime.length)
          .toFixed(3)
          .padEnd(4, "0")),
        (b = (this.logicFrameTime.reduce((h, k) => h + k) / this.logicFrameTime.length)
          .toFixed(3)
          .padEnd(4, "0")),
        (d = (this.renderFrameTime.reduce((h, k) => h + k) / this.renderFrameTime.length)
          .toFixed(3)
          .padEnd(4, "0")),
        App.Console.log("FT: " + a + " L: " + b + " R: " + d),
        (this.totalFrameTime = []),
        (this.logicFrameTime = []),
        (this.renderFrameTime = []))
      : (this.totalFrameTime.push(c - b),
        this.logicFrameTime.push(e - d),
        this.renderFrameTime.push(g - f));
    requestAnimationFrame(this.stepCallback);
  }
  async onRequestChooseServer(a, b) {
    await this.applyServerSettings(a);
    b();
  }
  onLayerJoinServer(a) {
    let b = null;
    for (let c = 0; c < this.servers.length; c++)
      if (this.servers[c].id === a) {
        b = this.servers[c];
        break;
      }
    this.applyServerSettings(b);
  }
  async applyServerSettings(a) {
    await App.Layer.updateCredentialsIfExpired();
    App.SelectedServer = a;
    this.gameClient.setServer(App.SelectedServer);
    this.menu.selectServer(a.id);
    Registry.SetLocalStorageItem(App.ServerPreference, App.SelectedServer.uid);
  }
  onLayerCreateServer(a) {
    if (this.gameClient.isConnected())
      this.gameClient.emit({ type: Protocol.Session.CREATE, params: a });
    else
      App.Layer.onServerCreateResult({
        success: !1,
        info: "Server creation failed. \nNot connected to any server.\nGold will be refunded automatically.",
      });
  }
  onLayerRenameCompleted() {
    this.menu.setPlayerData({
      name: this.credential.username,
      guest: -1 === this.credential.playerid ? !0 : !1,
      customization: this.credential.customization,
    });
  }
  onJoystickMoveState(a) {
    this.game && this.game.updateJoystickMoveState(a);
  }
  onJoystickTargetState(a) {
    this.game && this.game.updateJoystickTargetState(a);
  }
  onRegisterFailed() {
    this.authenticated = !1;
    App.Layer.onServerAuthFailed();
  }
  onClientDisconnectForImmediateReconnect() {
    this.gameClient.connect();
  }
  async onRequestJoinGameMode(a) {
    await App.Layer.updateCredentialsIfExpired();
    App.Layer.onJoinGameMode();
    this.gameClient.isConnected()
      ? ((App.SelectedMode = a),
        Registry.SetLocalStorageItem(App.ModePreference, App.SelectedMode),
        this.requestJoinGameMode(a))
      : ((this.onConnectRetryMode = a), this.gameClient.connect());
  }
  async requestServerList() {
    let a;
    try {
      if (((a = await APIClient.getServers()), !a))
        throw "server query failed, fallback to default";
    } catch (d) {
      a = App.DefaultServers;
    }
    this.servers = a.servers;
    this.servers.sort(() => 0.5 - Math.random());
    this.status = a.status;
    let b = this.servers[0];
    if (App.FirstRun) {
      var c = App.GetNearestGeoServer(this.servers);
      c && (b = c);
    }
    if (0 < this.servers.length) {
      if (App.FirstRun) App.SelectedServer = b;
      else {
        c = Registry.GetLocalStorageItem(App.ServerPreference);
        for (let d = 0; d < this.servers.length; d++) {
          let e = this.servers[d];
          if (e.uid === c || null === c) {
            App.SelectedServer = e;
            break;
          }
        }
      }
      App.Servers = this.servers;
    }
    null === App.SelectedServer && (App.SelectedServer = b);
    this.gameClient.setServer(App.SelectedServer);
    null !== this.menu &&
      (0 < this.servers.length && this.menu.setServerData(this.servers),
      this.menu.setServerStatus(this.status),
      this.menu.setServerHeadline(a.headline));
  }
  requestJoinGame(a) {}
  requestJoinGameMode(a) {
    this.autoJoinOnCreate = !0;
    this.gameClient.emit({ type: Protocol.Session.JOIN_MODE, mode: a });
  }
  requestLeaveGame(a) {
    this.gameClient.emit({ type: Protocol.Session.LEAVE });
  }
  onSessionData(a) {
    switch (a.type) {
      case Protocol.Session.CREATE_RESP:
        a.success &&
          this.autoJoinOnCreate &&
          this.gameClient.emit({ type: Protocol.Session.JOIN_GAME, name: a.name });
        this.autoJoinOnCreate || (App.Console.log(a.info), App.Layer.onServerCreateResult(a));
        this.autoJoinOnCreate = !1;
        break;
      case Protocol.Session.JOIN_RESP:
        this.onJoinResp(a);
        this.autoJoinOnCreate = !1;
        break;
      case Protocol.Session.LEAVE_RESP:
        this.onLeaveResp(a);
        break;
      case Protocol.Session.INFO:
        this.onInfo(a);
        break;
      case Protocol.Session.CLIENT_AUTH:
        this.onClientAuth(a);
    }
  }
  onClientAuth(a) {
    App.Console.log("connection established");
    null !== this.autoJoinGame
      ? (App.Console.log("Joining game " + this.autoJoinGame.name + "..."),
        this.gameClient.emit({
          type: Protocol.Session.JOIN_GAME,
          name: this.autoJoinGame.name,
          password: this.autoJoinGame.password,
        }),
        (this.autoJoinGame = null))
      : a.authenticated && (this.authenticated = !0);
  }
  onServerFull() {
    App.Layer.onServerFull();
  }
  onConnectionError() {
    App.Layer.onConnectionError();
  }
  onInfo(a) {
    App.Console.log(a.info);
  }
  onPVPMatch(a) {
    App.Layer.onPVPMatch(a);
  }
  onPVPConnect(a) {
    App.Layer.onPVPConnect();
  }
  onPVPDisconnect(a) {
    App.Layer.onPVPDisconnect(a);
  }
  onPVPConnectionError() {
    App.Layer.onPVPConnectionError();
  }
  onJoinResp(a) {
    if (a.granted) this.initGameMode(a.sid);
    else App.Layer.onServerReject(a);
  }
  onLeaveResp(a) {
    a.granted && this.leaveGame();
  }
  async leaveGame() {
    this.gameInputListener && this.gameClient.removeListener(Protocol.GAME, this.gameInputListener);
    this.gameBinInputListener &&
      this.gameClient.removeListener(Protocol.GAME_BIN, this.gameBinInputListener);
    this.gameOutputListener && this.game.removeListener(Protocol.GAME, this.gameOutputListener);
    this.adLoaderBackground &&
      this.adLoaderBackground.parent &&
      (this.stage.removeChild(this.adLoaderBackground),
      this.stage.removeChild(this.continueButton),
      this.stage.removeChild(this.continueButtonText));
    this.gameOutputListener = this.gameBinInputListener = this.gameInputListener = null;
    this.stage.removeChild(this.game);
    this.game.shutdown();
    this.game = null;
    App.Stage.removeListener("mousedown");
    App.Stage.removeListener("mousemove");
    App.Stage.removeListener("mouseup");
    switch (App.WhiteLabel) {
      case App.WhiteLabel_CG:
        App.CrazySDK.gameplayStop();
        break;
      case App.WhiteLabel_POKI_MAIN:
      case App.WhiteLabel_POKI:
        !this.gameplayStopped &&
          App.PokiSDK &&
          ((this.gameplayStopped = !0), console.log("gameplayStop"), App.PokiSDK.gameplayStop());
    }
    this.adLoaderTimeout && clearTimeout(this.adLoaderTimeout);
    this.adFaderInterval && clearInterval(this.adFaderInterval);
    await App.Layer.setMode(Layer.MODE_MENU);
    this.showMenu();
    this.stage.addChild(this.cursor);
    this.interactive = this.stage.interactive = !1;
    this.gameClient.disconnect();
    -1 !== App.DisplayMatchResultID &&
      (setTimeout(() => App.Layer.onPVPResultAccess(), 1e3), (App.DisplayMatchResultID = -1));
  }
  onGameData(a) {
    this.gameClient.emit(a);
  }
  initGameMode(a) {
    App.Console.visible = !0;
    this.game = new Game(a);
    switch (App.WhiteLabel) {
      case App.WhiteLabel_CG:
        App.CrazySDK.gameplayStart();
        break;
      case App.WhiteLabel_POKI:
      case App.WhiteLabel_POKI_MAIN:
        App.PokiSDK &&
          (this.muteIfRequired(!0),
          (this.adPlaying = !0),
          console.log("commercialBreak"),
          App.PokiSDK.commercialBreak().then(() => {
            this.adPlaying = !1;
            this.muteIfRequired(!1);
            null !== this.game &&
              this.gameplayStopped &&
              ((this.gameplayStopped = !1),
              console.log("gameplayStart"),
              App.PokiSDK.gameplayStart());
          }));
    }
    this.game.onDisplayAdButton = this.onDisplayAdButton.bind(this);
    App.WhiteLabel === App.WhiteLabel_POKI_MAIN &&
      App.PokiSDK &&
      App.PokiSDK.destroyAd(this.adElement);
    this.adElement &&
      (window.aiptag || App.CrazySDK || App.PokiSDK) &&
      (this.adElement.style.display = "none");
    App.Console.ignoreInput = !1;
    this.stage.removeChild(this.gradient);
    this.stage.removeChild(this.sky);
    this.stage.removeChild(this.background);
    App.WhiteLabel !== App.WhiteLabel_POKI &&
      (this.stage.removeChild(this.youtubeLogo),
      this.stage.removeChild(this.twitterLogo),
      this.stage.removeChild(this.redditLogo));
    App.WhiteLabel === App.WhiteLabel_POKI_MAIN &&
      App.Domain !== App.WhiteLabel_CG &&
      this.stage.removeChild(this.pokiLogo);
    this.gameOutputListener = this.onGameData.bind(this);
    this.game.on(Protocol.GAME, this.gameOutputListener);
    this.game.on(Layer.Events.DISCONNECT, () => this.onLayerDisconnect());
    this.game.on(Game.MATCH_START, () => {
      this.matchStarted = !0;
      switch (App.WhiteLabel) {
        case App.WhiteLabel_CG:
          App.CrazySDK.gameplayStart();
          break;
        case App.WhiteLabel_POKI:
        case App.WhiteLabel_POKI_MAIN:
          App.PokiSDK &&
            this.gameplayStopped &&
            !this.adPlaying &&
            ((this.gameplayStopped = !1),
            console.log("gameplayStart"),
            App.PokiSDK.gameplayStart());
      }
    });
    this.game.on(Game.MATCH_END, () => {
      this.matchStarted = !1;
      switch (App.WhiteLabel) {
        case App.WhiteLabel_CG:
          App.CrazySDK.gameplayStop();
          break;
        case App.WhiteLabel_POKI:
        case App.WhiteLabel_POKI_MAIN:
          App.PokiSDK &&
            !this.gameplayStopped &&
            ((this.gameplayStopped = !0), console.log("gameplayStop"), App.PokiSDK.gameplayStop());
      }
    });
    this.gameInputListener = (b) => this.game.onData(b.data);
    this.gameBinInputListener = (b) => this.game.onBinData(b.data);
    this.gameClient.addListener(Protocol.GAME, this.gameInputListener);
    this.gameClient.addListener(Protocol.GAME_BIN, this.gameBinInputListener);
    this.stage.removeChild(this.menu);
    this.stage.removeChild(this.cursor);
    this.menu = null;
    Dropdown.RemoveInstances();
    App.Stage.removeListener("mousedown", this.onMouseDownListener);
    this.stage.addChildAt(this.game, 0);
    this.game.resize();
    this.interactive = this.stage.interactive = !1;
    this.checkInterval && (clearInterval(this.checkInterval), (this.checkInterval = null));
    App.Layer.setMode(Layer.MODE_GAME);
  }
  onCmdConnect() {
    App.Console.log("command not implemented");
  }
  onCmdDisconnect() {
    App.Console.log("command not implemented");
  }
  onCmdUnlink() {
    App.Console.unlinkInterpreter(this.interpreter);
    App.Console.log("command interpreter unlinked");
  }
  onCmdInvalid(a) {}
  onDisplayAdButton() {
    switch (App.WhiteLabel) {
      case App.WhiteLabel_CG:
        App.CrazySDK.gameplayStop();
    }
    this.adLoaderTimeout = setTimeout(() => {
      this.menu ||
        (this.adLoaderBackground.parent ||
          ((this.adLoaderBackground.alpha = 0),
          this.stage.addChild(this.adLoaderBackground),
          this.stage.addChild(this.continueButton),
          this.stage.addChild(this.continueButtonText)),
        this.stage.addChild(this.cursor),
        (this.adFaderInterval = setInterval(() => {
          this.adLoaderBackground.alpha += 0.04;
          0.8 <= this.adLoaderBackground.alpha &&
            (clearInterval(this.adFaderInterval), (this.adLoaderBackground.alpha = 0.8));
        }, 50)));
    }, 5e3);
  }
  onTriggerVideoAd() {
    switch (App.WhiteLabel) {
      case App.WhiteLabel_CG:
        App.CrazySDK.requestAd("midgame");
        break;
      case App.WhiteLabel_POKI:
      case App.WhiteLabel_POKI_MAIN:
        App.PokiSDK &&
          (this.muteIfRequired(!0),
          (this.adPlaying = !0),
          console.log("commercialBreak"),
          App.PokiSDK.commercialBreak().then(() => {
            this.adPlaying = !1;
            console.log("Commercial break finished, proceeding to game");
            this.gameplayStopped &&
              this.matchStarted &&
              ((this.gameplayStopped = !1),
              console.log("gameplayStart"),
              App.PokiSDK.gameplayStart());
            this.muteIfRequired(!1);
          }));
        break;
      default:
        "undefined" !== typeof adplayer &&
          aiptag.cmd.player.push(function () {
            adplayer.startPreRoll();
          });
    }
    this.adLoaderBackground &&
      this.adLoaderBackground.parent &&
      ((this.adLoaderBackground.alpha = 0),
      this.stage.removeChild(this.adLoaderBackground),
      this.stage.removeChild(this.continueButton),
      this.stage.removeChild(this.continueButtonText));
    this.menu ||
      (this.stage.removeChild(this.cursor),
      (this.interactive = !1),
      this.stage.removeChild(this.gradient),
      this.stage.removeChild(this.sky),
      this.stage.removeChild(this.background));
  }
  drawBackground() {
    this.background.setup(6, 5, 600, 150, 50, 50);
    this.background.draw("generic", 5263964);
    this.gradient.resize(App.ClientWidth, App.ClientHeight);
    this.sky.clear();
    this.sky.beginFill(16777215, 1);
    for (let a = 0; 300 > a; a++) {
      let b = Math.random() * App.ClientHeight * 0.75;
      this.sky.drawCircle(
        Math.random() * App.ClientWidth,
        b,
        (0.5 + 0.5 * Math.random()) * (1 - (1 / App.ClientHeight) * 0.75 * b) + 0.5
      );
    }
    this.sky.endFill();
    this.sky.beginFill(16777045, 1);
    this.sky.drawCircle(100, 500, 100);
    this.sky.endFill();
  }
  onResize(a = !1) {
    App.WindowResized = a ? !1 : !0;
    var b = App.ClientWidth;
    let c = App.ClientHeight,
      d = !1;
    this.hasLoaded || (this.resizeOnLoad = !0);
    App.Renderer &&
      (App.IsMobile
        ? ((App.ClientWidth = window.innerWidth), (App.ClientHeight = window.innerHeight))
        : ((App.ClientWidth = window.innerWidth > screen.width ? screen.width : window.innerWidth),
          (App.ClientHeight =
            window.innerHeight > screen.height ? screen.height : window.innerHeight)),
      (d = b !== App.ClientWidth || c !== App.ClientHeight));
    (d || this.resizeOnLoad) &&
      this.hasLoaded &&
      ((App.Console.visible = 1300 > App.ClientWidth && null === this.game ? !1 : !0),
      (this.adLoaderBackground.width = App.ClientWidth),
      (this.adLoaderBackground.height = App.ClientHeight),
      (this.continueButton.x = 0),
      (this.continueButton.y = 0.5 * this.adLoaderBackground.height),
      (this.continueButton.width = App.ClientWidth),
      (this.continueButton.height = 70),
      (this.continueButtonText.x =
        0.5 * (this.continueButton.width - this.continueButtonText.width)),
      (this.continueButtonText.y = this.continueButton.y + 4),
      (b = Math.min(
        App.ClientWidth / App.ReferenceWidth,
        (App.ClientHeight * (App.WhiteLabel === App.WhiteLabel_POKI ? 0.95 : 0.85)) /
          App.ReferenceHeight
      )),
      (App.Scale = b),
      this.menu &&
        ((this.menu.scale.x = this.menu.scale.y = b),
        (this.menu.x = 0.5 * (App.ClientWidth - App.ReferenceWidth * b)),
        (this.menu.y = 7 * (1 - b) - 5)),
      (App.Layer.scale.x = App.Layer.scale.y = b),
      (App.Layer.x =
        -(App.ClientWidth - App.ReferenceWidth) * b * 0.5 +
        0.5 * (App.ClientWidth - App.ReferenceWidth * b)),
      (App.Layer.y = 4),
      App.Layer.resize(App.ClientWidth, App.ClientHeight),
      null !== this.redrawTimeout &&
        (clearTimeout(this.redrawTimeout), (this.redrawTimeout = null)),
      this.hasResized &&
        (this.redrawTimeout = setTimeout(() => {
          this.hasLoaded && null !== this.menu && (a || this.drawBackground());
          this.redrawTimeout = null;
        }, 500)),
      this.hasLoaded &&
        ((this.continueButton.x = 0.5 * (App.ClientWidth - this.continueButton.width)),
        (this.continueButton.y = 0.5 * App.ClientHeight),
        (this.youtubeLogo.y = 7 * App.Scale),
        (this.redditLogo.y = 5 * App.Scale),
        (this.twitterLogo.y = 4 * App.Scale),
        (this.youtubeLogo.x = 0.5 * App.ClientWidth + 320 * App.Scale),
        (this.redditLogo.x = 0.5 * App.ClientWidth + 362 * App.Scale),
        (this.twitterLogo.x = 0.5 * App.ClientWidth + 400 * App.Scale),
        (this.youtubeLogo.scale.x = this.youtubeLogo.scale.y = 0.45 * App.Scale),
        (this.redditLogo.scale.x = this.redditLogo.scale.y = 0.4 * App.Scale),
        (this.twitterLogo.scale.x = this.twitterLogo.scale.y = 0.4 * App.Scale),
        this.pokiLogo &&
          ((this.pokiLogo.x = App.ClientWidth - 4),
          (this.pokiLogo.y = App.ClientHeight - 4),
          (this.pokiLogo.scale.x = this.pokiLogo.scale.y = 1 * App.Scale))),
      App.Renderer.resize(App.ClientWidth, App.ClientHeight));
    App.Stats && (App.Stats.x = App.ClientWidth - 12);
    this.setFocus(!0);
    this.hasResized = !0;
  }
  onLayerDisconnect() {
    this.gameClient.emit({ type: Protocol.Session.LEAVE });
  }
  onLayerShowSettings() {
    this.menu && this.menu.showSettings();
  }
  onLayerHideSettings() {
    this.menu && this.menu.hideSettings();
  }
  onEscapeMenuAccess() {
    if (this.game) this.game.onEscapeMenuAccess();
  }
  onRewardsClaimed() {
    this.menu && this.menu.hideRewardButton();
  }
  onLayerMute(a) {
    this.game &&
      (this.game.mute(a), a && (Registry.Instance[Registry.Key.SETTINGS].sound.enabled = !a));
  }
  onLayerDisplayHelp() {
    this.game && this.game.displayHelp();
  }
  onLayerHideMenu() {
    this.menu && (this.menu.hideItems(), (this.menu.active = !1));
  }
  onLayerShowMenu() {
    this.menu && (this.menu.showItems(), (this.menu.active = !0), this.menu.hideSettings());
  }
  onLayerJoinGame(a, b, c) {
    if (!this.gameClient.isConnected() || (App.SelectedServer && App.SelectedServer.id !== b))
      for (let d = 0; d < this.servers.length; d++) {
        let e = this.servers[d];
        if (e.id === b) {
          App.SelectedServer = e;
          this.autoJoinGame = { name: a, password: c };
          this.menu.selectServer(b);
          this.gameClient.setServer(App.SelectedServer);
          this.gameClient.connect();
          break;
        }
      }
    else
      this.gameClient.setServer(App.SelectedServer),
        this.gameClient.emit({ type: Protocol.Session.JOIN_GAME, name: a, password: c });
  }
  async onGuestNameChange(a) {
    App.Credential = this.credential = await this.fetchGuestCredential(a);
  }
  async onLayerUpdateCredential(a, b) {
    this.credential = !1 === a.available ? await this.fetchGuestCredential() : a;
    App.Credential = this.credential;
    b
      ? (Registry.Instance.store(Registry.Key.CREDENTIAL, a), (Registry.Instance.credential = a))
      : (Registry.Instance.store(Registry.Key.CREDENTIAL, { available: !1 }),
        (Registry.Instance.credential = { available: !1 }));
    this.menu &&
      (this.menu.setPlayerData({
        name: this.credential.username,
        guest: -1 === this.credential.playerid ? !0 : !1,
        customization: this.credential.customization,
      }),
      this.gameClient.isConnected() && this.gameClient.disconnect(!0),
      this.menu.checkRewards(!0));
  }
  adStarted() {
    this.muteIfRequired(!0);
  }
  adFinished() {
    this.muteIfRequired(!1);
    if (App.ShowRewardedAd) App.Layer.onRewardedAdFinished(!0);
    if (App.ShowRewardedShopAd) App.Layer.onRewardedShopAdFinished(!0, !0);
    App.ShowRewardedAd = !1;
    App.ShowRewardedShopAd = !1;
  }
  adError() {
    this.muteIfRequired(!1);
    if (App.ShowRewardedAd) App.Layer.onRewardedAdFinished(!1);
    if (App.ShowRewardedShopAd) App.Layer.onRewardedShopAdFinished(!1, !0);
    App.ShowRewardedAd = !1;
    App.ShowRewardedShopAd = !1;
  }
  muteIfRequired(a) {
    null !== this.game &&
      (a
        ? this.settings && this.settings.sound
          ? this.settings.sound.enabled && this.game.mute(!0)
          : this.game.mute(!0)
        : this.settings && this.settings.sound
        ? this.settings.sound.enabled && this.game.mute(!1)
        : this.game.mutePref || this.game.mute(!1));
  }
}
App.UpdatePreloader = function (a) {
  void 0 !== window.setPreloaderPercentage && window.setPreloaderPercentage(a);
};
App.RemovePreloader = function () {
  const a = document.getElementById("preloader");
  let b = 1;
  const c = setInterval(() => {
    a && (0 < b - 0.025 ? ((a.style.opacity = b), (b -= 0.025)) : (a.remove(), clearInterval(c)));
  }, 1e3 / 60);
};
App.GenerateTexturesFromSheet = function (a) {
  for (let b in a)
    App.CombinedTextures[b] = App.Renderer.generateTexture(new PIXI.Sprite(a[b]), {
      scaleMode: PIXI.SCALE_MODES.LINEAR,
      resolution: 1,
      multisample: PIXI.MSAA_QUALITY.HIGH,
    });
};
App.CrazySDK = null;
App.PokiSDK = null;
App.WhiteLabel_NONE = "ninja.io";
App.WhiteLabel_CG = "cg";
App.WhiteLabel_POKI = "poki";
App.WhiteLabel_POKI_MAIN = "poki_main";
let whitelabel = window.location.host.split(".")[1] ? window.location.host.split(".")[0] : !1;
App.Domain = whitelabel;
switch (whitelabel) {
  case App.WhiteLabel_CG:
    App.WhiteLabel = App.WhiteLabel_POKI_MAIN;
    App.PokiSDK = window.PokiSDK;
    break;
  case App.WhiteLabel_POKI:
    App.WhiteLabel = App.WhiteLabel_POKI;
    window.PokiSDK && (App.PokiSDK = window.PokiSDK);
    break;
  default:
    (App.WhiteLabel = App.WhiteLabel_POKI_MAIN), (App.PokiSDK = window.PokiSDK);
}
"remove" in Element.prototype ||
  (Element.prototype.remove = function () {
    this.parentNode && this.parentNode.removeChild(this);
  });
let mobileDetect = new MobileDetect(navigator.userAgent);
App.IsMobile = mobileDetect.mobile();
App.CMD_CONNECT = "connect";
App.CMD_DISCONNECT = "disconnect";
App.CMD_UNLINK = "unlink";
App.CheckIntervalRate = 1e4;
App.ServerPreference = "server_preference";
App.ModePreference = "mode_preference";
App.Renderer = null;
App.Stage = null;
App.Console = null;
App.Stats = null;
App.Layer = new Layer();
App.ClientVersion = "0.3.2";
App.MinVersion = "";
App.HasFocus = !0;
App.Scale = 1;
App.StartTime = Date.now();
App.Time = App.StartTime;
App.FrameTime = 0;
App.LastRewardCheck = 0;
App.HadRewards = !1;
App.ShowRewardedAd = !1;
App.AdblockDetected = !1;
App.ShowRewardedShopAd = !1;
App.WindowResized = !1;
App.HelpDisplayed = !1;
App.DisplayMatchResultID = -1;
App.ReferenceWidth = 860;
App.ReferenceHeight = 560;
App.DevicePixelRatio = window.devicePixelRatio;
App.ClientWidth = window.innerWidth > screen.width ? screen.width : window.innerWidth;
App.ClientHeight = window.innerHeight > screen.height ? screen.height : window.innerHeight;
App.ConnectedServer = {};
App.Servers = [];
App.SelectedServer = null;
App.SelectedMode = null;
App.TransformedMouseX = 0.5 * App.ClientWidth;
App.TransformedMouseY = 0.5 * App.ClientHeight;
App.GameClient = {};
App.PVPClient = {};
App.AssetTree = {};
App.Assets = {};
App.UIVisible = !1;
App.FieldHasFocus = !1;
App.Autogen = !1;
App.FirstRun = !1;
App.Credential = {};
App.DisplayFrameTime = !1;
App.GenerateGuestName = function (a) {
  return void 0 !== a && null !== a ? a : "Ninja" + Math.floor(1e3 * Math.random());
};
App.Customization = {
  HAIR: [],
  TORSO: [],
  ORB: [],
  FACE: [],
  BELT: [],
  ARMLEFTLOWER: [],
  ARMLEFTUPPER: [],
  ARMRIGHTLOWER: [],
  ARMRIGHTUPPER: [],
  LEGLEFTLOWER: [],
  LEGLEFTUPPER: [],
  LEGRIGHTLOWER: [],
  LEGRIGHTUPPER: [],
  EXTRA: [],
};
App.TimeToColourMap = [
  1381653, 5263964, 6910590, 8557987, 10271433, 10933980, 11331555, 11727327, 10682326, 8650663,
  8650642, 10354563, 10092383, 12123972, 13762089, 14810665, 16514601, 16707113, 16701225, 16691497,
  15234048, 10768128, 7353856, 4267776,
];
App.ContinentMap = { Europe: "eu_west", America: "na_east", Asia: "as_south", Africa: "eu_west" };
App.GetNearestGeoServer = (a) => {
  var b = Intl.DateTimeFormat().resolvedOptions().timeZone;
  b = b.substring(0, b.indexOf("/"));
  b = App.ContinentMap[b];
  void 0 === b && (b = "eu_west");
  let c = null;
  for (let d = 0; d < a.length; d++) {
    let e = a[d];
    if (e.region === b)
      if (null === c) {
        if (((c = e), 100 > parseInt(c.players))) break;
      } else if (100 <= parseInt(c.players) && 100 > parseInt(e.players)) {
        c = e;
        break;
      }
  }
  return c;
};
App.RESOURCE_FOLDER = "./assets";
App.RESOURCES = {
  combined: [{ id: "combined", file: "combined.json" }],
  seamless: [{ id: "seamless", file: "seamless.json" }],
  fonts: [{ id: "opensans", file: "opensans.fnt" }],
};
App.DefaultCredential = JSON.parse(
  LZString.decompressFromBase64(
    "N4IglgJiBcB2CuAbRAaEAXAngBwKYxAGMAnXCXWdMAQ0RDXgGddjZqBbfaEWMWAK2r0Q2RNUwtIMALQBGNIlwA3XHWjyMYdIoIBxeLkbphjANZhkMAAxpqhQgHt4lLHgIBzA0eHZiDiPCE6IwwwAC+aIRM6A7sYABe1FQOsKERRGKwAPpS0HKRmVlsnATChIV+OtzC1BAQxKVhQA"
  )
);
App.DefaultCredential.version = App.ClientVersion;
App.DefaultCredential.ts = Date.now();
App.DefaultServers = JSON.parse(
  LZString.decompressFromBase64(
    "N4IgzgpgTgbtYgFwG1QEsAmSQCYBsIANCAK6bYCiA0gKwDsAtgBoDGAckSAHYCGDE2NgEEAzB2IYA9gx5ou2FjxwA6LnIBWPZWkmcALmj0AbAYhBtJUPQAsABEP5Q0i2yM48MGKBDAIzARgAWQOUcfzplPGVwt2IAB0s9bBoADhEAThxOSBYSb2x/Tm8Acx15M14AfQgeMCTiOp49Ej8QSS4jOQF4ox4AT3hsAFpOYr4fYc4GSQwJxFA9GoYAERqbGT0Wa0mJNesNrZ2QRTjm7wAVawgAMV7iyYBfB8J0LDMcGk4yN5AAWRgUgAJACSYBgABlOLx+IIhDhxCApDI5NguH0WCo1FxNNpdMQDMZTOZEnYHNBnDxbFliB4vD5Wv48BF/EFooEaNERIV4olkmlMtkILl8gEihBSu1UTxqrV6uA9E0Wth2p0uN0QHFegMoK0RsQxvxdVMZnNQCczhBLjc7kdZk19k1DmY9SBFnxVvaDttnSAni8QOR3tTSIGQOoKGB/MCAB7WABCUPG2AAykJ/AikbJyuAeP5VBotDp9IYTNghGA0JTuSBad5fMk83R0tFUtEcAAGTgJKx8jLBnJ5InVkplbC1SpgSQkGzZBXNVoqrpdrWDH368ZG4jTWZ+M08U6Dq23Hj3NeupYe9aO70gF12q+bG8jP2vbBhL6hlgABT6cZYcagQFExhMwKAAVXhThMxRMwIBITEC1xYtCUoPJJDiCAqXcTw6wZQI83SDkaBEaIgi7XkzFSPtBWFIcxQlbM4MqAB3Hw5UaedlQ6Jcen6Vdb1GDcjm3U1z3dPYvVtCTr1tGZiggAAjHgjCMI5zUPK5j1PASXwDH4cECD8fjoFhk2uZMAC0AC88W4JMzGEdMoOkLMFFzfNsULWyCVLBySXsRwKVsata3pAomVIkIgiilJq27JJKP5fshUHAp6NHCppRqOpZ0VBduLVZc+J1I4DTmAStxNXcxJWaTHzU/cLSPG0z3vB16oCTtdNDHBYhDH51ECMCAHEaAUugADNgKJVNIIkFyYJzBDPKQ/ESyJctKywmkcLCyjG2bRk8xZcie0S6iGhSkUQGHcUMprMAJynGcGjnJUzEXQreO1TcQDK36ROqt1as9GSz3Ui5NJairETqp0QBSX1nlfd5O2Ib4UwAYRSL8MExnA+mmygwKc+bkUYkg8yxHEizWlDQLQjDguwul6325Q6A5JtlBENGNQokAqIFS7aLS4gR0lWCSBYtjcs4j6CvVTVit+/7hKqpA9wPSHrRPI5gcvdr4bvOGnyR/0eroIzsF+PpfmBX4mAUtAibMVMxGc8nsDAHgSOprzkN8kBNspPrQrZm6MmUdJm3SPMmVOhLBaSmjUtFcW7slh6nunbZXryrjVSVlcSrPNWz0BzXYdBjqYYN02Gu1y0ob1n0ngAXXz+XQBIOIMCaORTwm5TIC3ekTyJX1iCuDwi6rnyiQAdQgIwWGkTC9EkWwbEwthEJ0Ww4hIBTOhYWwFIgBUAEIoJ8FgnFOe695Wg+0DAWwSC4WYoFsHgWAMOAthZhwCMOhfgXA9DKFsJjK4LAADW28ri2DVMxd+VxvC2AmpYZBEBmIfziGvBgg9MFrEHGAG+TwgA==="
  )
);
App.CombinedTextures = tex;
var _UserInput = {
  pressed: {},
  hasFocus: !1,
  /** @type {() => void} */
  setFocus: function (a) {
    this.hasFocus = !0;
    this.onFocus = a;
  },
  /** @type {() => void} */
  releaseFocus: function () {
    this.hasFocus = !1;
    this.onFocus = null;
  },
  emulateKeyDown: function (a) {
    this.dispatchEvent(new CustomEvent(UserInput.KEY_DOWN, a));
  },
  emulateKeyUp: function (a) {
    this.dispatchEvent(new CustomEvent(UserInput.KEY_UP, a));
  },
  onKeyDown: function (a) {
    var b = a.keyCode || a.char,
      c = { char: this.getMappedChar(b, a.shiftKey), code: b, ctrl: a.ctrlKey };
    if (this.onFocus) this.onFocus(new CustomEvent(UserInput.KEY_PRESS, c));
    else
      this.dispatchEvent(new CustomEvent(UserInput.KEY_PRESS, c)),
        this.dispatchEvent(new CustomEvent(UserInput.KEY_DOWN, c));
    this.pressed[b] = !0;
    App.FieldHasFocus || 8 !== a.keyCode || a.preventDefault();
  },
  onKeyUp: function (a) {
    var b = a.keyCode || a.char;
    this.pressed[b] &&
      (this.onFocus ||
        this.dispatchEvent(
          new CustomEvent(UserInput.KEY_UP, { char: this.getMappedChar(b, a.shiftKey), code: b })
        ),
      (this.pressed[b] = !1));
  },
  getMappedChar: function (a, b) {
    8 !== a && 191 !== a && 220 !== a && String.fromCharCode(a);
    return b ? characterMapShift[a] : characterMap[a];
  },
  azertyToQwerty: function (a) {
    var b = azertyMap[a];
    return b ? b : a;
  },
};
_UserInput.KEY_DOWN = "keyDown";
_UserInput.KEY_UP = "keyUp";
_UserInput.KEY_PRESS = "keyPress";
_UserInput.BACKSPACE = 8;
_UserInput.ENTER = 13;
_UserInput.NUMERIC = "1234567890";
_UserInput.ALPHANUMERIC = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
_UserInput.ALPHA_EXT =
  "\u00e4\u00e7\u00eb\u00e9\u00e8\u00ef\u00ed\u00ec\u00f6\u00f3\u00f2\u00df\u00fc\u00fa\u00f9\u00fd\u00ff\u00c4\u00c7\u00cb\u00c9\u00c8\u00cf\u00cd\u00cc\u00d6\u00d3\u00d2\u00a7\u00dc\u00da\u00d9\u00dd";
_UserInput.CHAT_SYMBOLS = ",|{}[]~'`\"?:\\/()*&^%$#@!=;-! ._<>+";
_UserInput.WHEEL = "wheel";
_UserInput.ExclusiveWheel = null;

/**
 * @type {EventDispatcher & typeof _UserInput}
 */
export var UserInput = null;
