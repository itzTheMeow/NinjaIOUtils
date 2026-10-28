import * as PIXI from "pixi.js";
import { Howl } from "howler";
export interface Credential {
    id: string;
    type: string;
    username: string;
    playerid: string;
    level: number;
    title: string;
    skill: number;
    accounttype: string;
    ts: number;
    products: Record<string, any>;
    customization: Record<string, any>;
    ciphertext: string;
    clan_id: number;
    clan_name: string;
    clan_role: string;
    addr: string;
    version: string;
}

export interface SubmenuButton extends PIXI.Container<PIXI.ContainerChild> {
    background: PIXI.Graphics;
    icon: PIXI.Graphics;
    label: any;
    cardWidth: number;
    cardHeight: number;
    draw(hovered?: boolean): void;
}

export interface ContentMenuTab extends PIXI.Graphics {
    menuTab?: {
        label: PIXI.Text;
        width: number;
        height: number;
        active: boolean;
        hovered: boolean;
    };
}

export type CombinedTextureName =
    "10xp" |
    "1v1_icon" |
    "1v1_icon_notxt" |
    "ak47" |
    "ammo_bar_element" |
    "ammo_icon" |
    "armleftlower" |
    "armleftlower_flip" |
    "armleftlower_gore" |
    "armleftupper" |
    "armleftupper_gore" |
    "armrightlower" |
    "armrightlower_flip" |
    "armrightlower_gore" |
    "armrightupper" |
    "armrightupper_gore" |
    "arrow" |
    "ball" |
    "bandana_team_alpha" |
    "bandana_team_bravo" |
    "bandana_team_charlie" |
    "bandana_team_delta" |
    "bandana_team_echo" |
    "bandana_team_foxtrot" |
    "bandana_team_gamma" |
    "bandana_team_hotel" |
    "bandana_team_india" |
    "bandana_team_juliett" |
    "bandana_team_kilo" |
    "bandana_team_lima" |
    "bandana_team_zulu" |
    "barrett" |
    "bluelaser" |
    "boomerang" |
    "boomerang_1" |
    "boomerang_item" |
    "bot" |
    "bounce" |
    "bow1" |
    "bow2" |
    "bow3" |
    "bow4" |
    "bow_item" |
    "bubble" |
    "bullettrail" |
    "bullettrail2" |
    "buymeacoffee-logo" |
    "camocape" |
    "camocape_desert" |
    "camocape_jungle" |
    "camocape_snow" |
    "cape_black" |
    "chainsaw" |
    "chainsaw_gore" |
    "chat" |
    "chat-hide" |
    "chat-ingame" |
    "checkbox" |
    "checkbox_checked" |
    "circle" |
    "clustergrenade" |
    "clusternadebox" |
    "clusternadefragment" |
    "clusternadeparticle" |
    "content" |
    "ctf_icon" |
    "ctf_icon_notxt" |
    "cursor_def" |
    "db_alpha" |
    "db_bravo" |
    "db_icon" |
    "db_icon_notxt" |
    "deagle" |
    "deagle_single" |
    "debris" |
    "debris1" |
    "discord" |
    "dm_icon" |
    "dm_icon_notxt" |
    "dronepiece1" |
    "dronepiece2" |
    "dronepiece3" |
    "dropdown_arrow" |
    "dust1" |
    "dust2" |
    "electricity1" |
    "energy_icon" |
    "energy_shell" |
    "energy_shell_bubble" |
    "energy_shell_chaos" |
    "energy_shell_corona" |
    "energy_shell_dragon" |
    "energy_shell_fractal" |
    "energy_shell_jetfeet" |
    "energy_shell_jetfeet2" |
    "energy_shell_jetfeet_stars" |
    "energy_shell_storm" |
    "energy_shell_tint" |
    "energy_shell_vacuum" |
    "energy_trail_bubble" |
    "energy_trail_electric" |
    "energy_trail_fractal" |
    "energy_trail_storm" |
    "exit" |
    "explosion" |
    "explosion2" |
    "explosion3" |
    "face_shades" |
    "fandom" |
    "favicon.ico" |
    "fists" |
    "flag1" |
    "flag_alpha" |
    "flag_blue" |
    "flag_bravo" |
    "flag_red" |
    "flagpole" |
    "flame1" |
    "flame2" |
    "flame3" |
    "flame4" |
    "flame5" |
    "flame6" |
    "flame7" |
    "flame9" |
    "flamethrower" |
    "flare1" |
    "flash" |
    "fragline-logo-menu" |
    "gears_icon" |
    "gem" |
    "glitter" |
    "glitterglow" |
    "globe" |
    "globe_as" |
    "globe_eu" |
    "globe_na" |
    "glowsquare" |
    "gold" |
    "gold1" |
    "gore1" |
    "gore2" |
    "gore3" |
    "gore4" |
    "gore5" |
    "gore6" |
    "green-exp" |
    "greenlaserimpact" |
    "grf" |
    "handgrenade" |
    "hb_0" |
    "hb_1" |
    "hb_2" |
    "hb_3" |
    "hb_4" |
    "hb_5" |
    "hb_full" |
    "head" |
    "head_gore" |
    "head_hair_short" |
    "healparticle" |
    "health_bar_element" |
    "health_icon" |
    "healthbox" |
    "injury1" |
    "injury2" |
    "jet_bar_element" |
    "jetboot2fx" |
    "jetflame" |
    "key_input" |
    "laser_green" |
    "lasergun" |
    "lasermuzzleflash1" |
    "launcher_nade" |
    "leaderboard_row" |
    "legleftlower" |
    "legleftlower_gore" |
    "legleftupper" |
    "legleftupper_gore" |
    "legrightlower" |
    "legrightlower_gore" |
    "legrightupper" |
    "legrightupper_gore" |
    "link_gun" |
    "link_gun_muzzle_flash" |
    "link_ray_impact" |
    "lock_icon" |
    "login" |
    "logout" |
    "m1carbine" |
    "m60" |
    "m79" |
    "m79_reload_barrel" |
    "m79_reload_stock" |
    "m79cartridge" |
    "mac10" |
    "marker" |
    "max_screen" |
    "menu-close" |
    "min_screen" |
    "minigun" |
    "mode_icon" |
    "mouse_pointer" |
    "mp5" |
    "mute_icon" |
    "muzzleflash1" |
    "muzzleflash2" |
    "muzzleflash3" |
    "mystery_ninja" |
    "nadebox" |
    "nadeparticle" |
    "oil_drum" |
    "oil_drum2" |
    "orbtrail" |
    "pati" |
    "ping_0" |
    "ping_1" |
    "ping_2" |
    "ping_3" |
    "ping_4" |
    "plank1" |
    "plasma1" |
    "plasma_electric" |
    "plasma_exp" |
    "platform_metal" |
    "playercapture" |
    "playerspawn" |
    "precip_dust" |
    "precip_rain" |
    "precip_snow" |
    "precip_star" |
    "pulsegun" |
    "pulsegun_orb" |
    "pulsegun_orb_blue" |
    "pulsegun_orb_trail" |
    "pulsegunmuzzleflash" |
    "questionmark" |
    "rank_icon_1" |
    "rank_icon_10" |
    "rank_icon_11" |
    "rank_icon_12" |
    "rank_icon_13" |
    "rank_icon_14" |
    "rank_icon_15" |
    "rank_icon_16" |
    "rank_icon_2" |
    "rank_icon_3" |
    "rank_icon_4" |
    "rank_icon_5" |
    "rank_icon_6" |
    "rank_icon_7" |
    "rank_icon_8" |
    "rank_icon_9" |
    "ranked_icon" |
    "rating_star" |
    "reddit_logo" |
    "region_icon" |
    "register" |
    "reticle_line" |
    "rifle_m16" |
    "rifle_m16_camo_jungle" |
    "rl_rocket" |
    "rocketlauncher" |
    "rpg" |
    "rpg_backblast" |
    "rpg_rocket" |
    "sandbag1" |
    "sandbag2" |
    "sandbag3" |
    "sandbag4" |
    "shock_rifle_tail" |
    "shockrifle" |
    "shockrifle_orb" |
    "shockrifle_orb2" |
    "shockrifle_orb_impact" |
    "shockriflecartridge" |
    "shockriflemuzzleflash" |
    "shotgun_m2" |
    "shotgun_pellet" |
    "shotgunmuzzleflash" |
    "shuriken" |
    "shurikenbox" |
    "skill_icon_1" |
    "skill_icon_10" |
    "skill_icon_11" |
    "skill_icon_12" |
    "skill_icon_13" |
    "skill_icon_14" |
    "skill_icon_15" |
    "skill_icon_16" |
    "skill_icon_17" |
    "skill_icon_18" |
    "skill_icon_19" |
    "skill_icon_2" |
    "skill_icon_20" |
    "skill_icon_21" |
    "skill_icon_22" |
    "skill_icon_23" |
    "skill_icon_24" |
    "skill_icon_25" |
    "skill_icon_26" |
    "skill_icon_27" |
    "skill_icon_28" |
    "skill_icon_29" |
    "skill_icon_3" |
    "skill_icon_30" |
    "skill_icon_31" |
    "skill_icon_32" |
    "skill_icon_4" |
    "skill_icon_5" |
    "skill_icon_6" |
    "skill_icon_7" |
    "skill_icon_8" |
    "skill_icon_9" |
    "smallcartridge" |
    "smoke1" |
    "smoke2" |
    "smoke3" |
    "smoke4" |
    "snowball" |
    "snowballbox" |
    "snowpuff" |
    "spark" |
    "spark1" |
    "spark2" |
    "sparks2" |
    "spectate" |
    "spectate_hover" |
    "star" |
    "streak" |
    "tdm_alpha" |
    "tdm_bravo" |
    "tdm_icon" |
    "tdm_icon_notxt" |
    "teleport1" |
    "testcross" |
    "tinycartridge" |
    "tinydebris" |
    "tinyrock" |
    "tinyspark" |
    "torsolower" |
    "torsolower_gore" |
    "torsoupper" |
    "torsoupper_gore" |
    "tr_icon" |
    "tr_icon_notxt" |
    "trail" |
    "treasure" |
    "twirl" |
    "twirl_sc" |
    "twitch_logo" |
    "twitter_logo" |
    "unmute_icon" |
    "uzi" |
    "waterbubble" |
    "watersplash" |
    "x75" |
    "youtube_logo" |
    "zs_icon" |
    "zs_icon_notxt";
export type CombinedTexturesMap = { [K in CombinedTextureName]: PIXI.Texture };

declare var analyticsconfig: {};
declare const FraglineAnalyticsConfig: {
    measurementId: string;
    enabled: boolean;
    allowDevelopment: boolean;
    debug: boolean;
    sendPlayerIds: boolean;
    consent: {
        controllerName: string;
        contactEmail: string;
        privacyUrl: string;
    };
};
declare var analyticstracker: {};
declare class AnalyticsTracker {
    transport: any;
    clock: () => number;
    origin: string;
    sendPlayerIds: boolean;
    panel: any;
    state: any;
    accountStatus: string;
    enabled: boolean;
    foreground: boolean;
    suspended: boolean;
    suspendedAt: number;
    matchClosedOnSuspend: boolean;
    last: number;
    panelTimer: {
        start: any;
        active: number;
    } | null;
    stateTimer: {
        start: any;
        active: number;
    } | null;
    auxiliary: Map<any, any>;
    match: {
        start: any;
        active: number;
        key: any;
        played: boolean;
    } | null;
    flow: {
        start: any;
        active: number;
        matchmaking: number;
    } | {
        start: any;
        active: number;
        matchmaking: number;
    } | null;
    reportedPlayTime: number;
    joins: number;
    reportedPlaySession: boolean;
    playerId: number | null;
    newAccounts: Set<any>;
    page: string;
    previousPage: string;
    constructor(a: any, b?: () => number, c?: string, d?: boolean);
    now(): number;
    seconds(a: any): number;
    timer(a: any): {
        start: any;
        active: number;
    };
    tick(): number;
    emit /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    identify(): void;
    setEnabled(a: any): void;
    markNewAccount(a: any): void;
    setAccount(a: any): void;
    setForeground(a: any): void;
    checkpoint(): void;
    reportGameplay(): void;
    menuAvailable(): void;
    matchmaking(): void;
    joinFailed(): void;
    enterMatch /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    endMatch /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    leaveMatch(a: any, b?: boolean): void;
    durations /** @param {any} a @param {any} [b] */(a: any, b?: any): {
        elapsed_seconds: number;
        active_seconds: number;
    };
    endState(a: any): void;
    changeState /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    setPanel(a: any): void;
    closePanel(a: any): void;
    setAuxiliaryPanels(a: any): void;
    openPanel(a?: any): void;
    view(): void;
    terminate(a?: boolean): void;
    restore(): void;
}
declare var analyticsconsent: {};
declare class AnalyticsConsent {
    options: {};
    clock: () => number;
    listeners: Set<any>;
    mounted: boolean;
    channel: BroadcastChannel | null;
    status: HTMLSpanElement | null;
    panel: HTMLElement | null;
    record: any;
    static get(a?: {}): any;
    constructor(a?: {}, b?: () => number);
    get granted(): boolean;
    get hasChoice(): boolean;
    subscribe(a: any): () => boolean;
    start(): void;
    choose(a: any): void;
    open(): void;
    read(): any;
    cookieScope(): string;
    sync(): void;
    clearAnalyticsCookies(): void;
    render(a?: boolean): void;
    mount(): void;
}
declare namespace AnalyticsConsent {
    var Key: string;
    var Lifetime: number;
    var Style: string;
}
declare var analytics: {};
declare class AnalyticsPanels {
    tracker: any;
    root: any;
    entries: Map<any, any>;
    observed: WeakSet<WeakKey>;
    owners: WeakMap<WeakKey, any>;
    scheduled: boolean;
    constructor(a: any, b?: any);
    register /** @param {any} a @param {any} b @param {any} [d] */(a: any, b: any, c?: boolean, d?: any): void;
    registerOwned(a: any, b: any, c: any, d?: boolean, e?: () => boolean): void;
    observe(a: any): void;
    schedule(): void;
    order(a: any): any[] | null;
    refresh(): void;
    unregister(a: any): void;
    release(a: any): void;
}
declare class Analytics {
    config: {
        measurementId: string;
        enabled: boolean;
        allowDevelopment: boolean;
        debug: boolean;
        sendPlayerIds: boolean;
        consent: {
            controllerName: string;
            contactEmail: string;
            privacyUrl: string;
        };
    };
    loaded: boolean;
    started: boolean;
    consent: boolean;
    script: HTMLElement | HTMLScriptElement | null;
    queue: any[];
    pending: boolean;
    heartbeat: number | null;
    paused: boolean;
    disabled: "" | boolean;
    context: {
        page_location: string;
        page_referrer: string;
        page_title: string;
    };
    tracker: AnalyticsTracker;
    consentManager: any;
    gtag: any;
    constructor(a?: {
        measurementId: string;
        enabled: boolean;
        allowDevelopment: boolean;
        debug: boolean;
        sendPlayerIds: boolean;
        consent: {
            controllerName: string;
            contactEmail: string;
            privacyUrl: string;
        };
    });
    getTracker(): AnalyticsTracker;
    stopHeartbeat(): void;
    updateHeartbeat(): void;
    start(): void;
    setConsent(a: any): void;
    clearCookies(): void;
    useInstalledTag(): boolean;
    load(): void;
    enqueue(a: any, b?: boolean): void;
    schedule(): void;
    flush(a?: boolean): void;
    event /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    user(a: any): void;
}
declare var servicebase: {};
declare class ServiceBase {
    xhrGet(a: any): Promise<any>;
    xhrPost(a: any, b: any, c?: boolean, d?: number): Promise<any>;
    xhrError /** @param {any} a @param {any} [b] */(a: any, b?: any): string;
}
declare namespace ServiceBase {
    var API_URL: string;
}
declare function getDomain(a: any): string;
declare const parsedUrl: URL, apiConfig: any, apiDomain: any;
declare var userservice: {};
declare class UserService extends ServiceBase {
    getMaps(a: any): Promise<any>;
    constructor();
    postProcessTicket /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    getRanking(): Promise<any>;
    getRankingType /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    getWeaponRanking(): Promise<any>;
    getWeaponRankingType(a: any): Promise<any>;
    getGuestCredentials(a: any): Promise<any>;
    getCredentials(a: any): Promise<any>;
    getProfile(a: any): Promise<any>;
    getUserProfile(a: any): Promise<any>;
    getUserProfileByName(a: any): Promise<any>;
    getUserSearch(a: any): Promise<any>;
    getUserWeaponStats(a: any): Promise<any>;
    getChallenge(): Promise<any>;
    getCustomization(a: any): Promise<any>;
    getFriends(a: any): Promise<any>;
    getMessages(a: any): Promise<any>;
    getCurrency(a: any): Promise<any>;
    getSettings(a: any): Promise<any>;
    getInvitations(a: any): Promise<any>;
    getInvitees(a: any): Promise<any>;
    getRewardsAvailable(a: any): Promise<any>;
    getRewards(a: any): Promise<any>;
    getLastResult /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    getMatchHistory(a: any): Promise<any>;
    postClaimShopReward(a: any): Promise<any>;
    postClaimRewards(a: any): Promise<any>;
    postLogin /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postAutoRegister(): Promise<any>;
    postRegister /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    postSettings /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postRecovery /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    postRenewPassword /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    getEmailConnection(a: any): Promise<any>;
    postConnectEmail /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postDeactivateAccount /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postCustomization /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postAutogenRename /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    postFriendInvite /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postAcceptFriend /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postDeclineFriend /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postUnfriend /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postFriendMessage /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    postPurchase /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    postUsername /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    postFriendGold /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    postCreateGame /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] @param {any} [h] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): Promise<any>;
    postSocial /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
}
declare var serverservice: {};
declare class ServerService extends ServiceBase {
    constructor();
    getNews(a?: number, b?: number): Promise<any>;
    getServers(): Promise<any>;
    getGames(): Promise<any>;
    getMaps(): Promise<any>;
    getItemDrops(): Promise<any>;
    generateMapImage(a: any): Promise<any>;
    postFeedback /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
}
declare var clanservice: {};
declare class ClanService extends ServiceBase {
    constructor();
    getClanByClanId(a: any): Promise<any>;
    getClanByAccountId(a: any): Promise<any>;
    getClanList(): Promise<any>;
    getClanSearch(a: any): Promise<any>;
    getClanMembers(a: any): Promise<any>;
    getClanInvitations(a: any): Promise<any>;
    postCreate /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postLeaveMember(a: any): Promise<any>;
    postInviteMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postAcceptMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postDeclineMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postRemoveMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postPromoteMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postDemoteMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    postBanner /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
}
declare var apiclient: {};
declare class APIClient {
    static getNews(a?: number, b?: number): Promise<any>;
    static getServers(): Promise<any>;
    static getGames(): Promise<any>;
    static getMaps(): Promise<any>;
    static getItemDrops(): Promise<any>;
    static generateMapImage(a: any): Promise<any>;
    static postFeedback /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static getUserMaps(a: any): Promise<any>;
    static getPublicMaps(): Promise<any>;
    static processTicket /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static getRanking(): Promise<any>;
    static getRankingType /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static getWeaponRanking(): Promise<any>;
    static getWeaponRankingType(a: any): Promise<any>;
    static getGuestCredentials(a: any): Promise<any>;
    static getCredentials(a: any): Promise<any>;
    static getProfile(a: any): Promise<any>;
    static getUserProfile(a: any): Promise<any>;
    static getUserProfileByName(a: any): Promise<any>;
    static getUserSearch(a: any): Promise<any>;
    static getUserWeaponStats(a: any): Promise<any>;
    static getChallenge(): Promise<any>;
    static getFriends(a: any): Promise<any>;
    static getMessages(a: any): Promise<any>;
    static getCurrency(a: any): Promise<any>;
    static getSettings(a: any): Promise<any>;
    static getInvitations(a: any): Promise<any>;
    static getInvitees(a: any): Promise<any>;
    static getRewardsAvailable(a: any): Promise<any>;
    static getRewards(a: any): Promise<any>;
    static getLastResult /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static getMatchHistory(a: any): Promise<any>;
    static postClaimShopReward(a: any): Promise<any>;
    static postClaimRewards(a: any): Promise<any>;
    static postLogin /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postAutoRegistration(): Promise<any>;
    static postRegistration /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static postSettings /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postRecovery /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static postCustomization /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postAutogenRename /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static renewPassword /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static deactivateAccount /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static getEmailConnection(a: any): Promise<any>;
    static postConnectEmail /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static getCustomization(a: any): Promise<any>;
    static postInviteFriend /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postAcceptFriend /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postDeclineFriend /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postUnfriend /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postFriendMessage /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static postPurchase /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static postUsername /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static postFriendGold /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static postCreateGame /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] @param {any} [h] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): Promise<any>;
    static postSocial /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): Promise<any>;
    static getClanByClanId(a: any): Promise<any>;
    static getClanByAccountId(a: any): Promise<any>;
    static getClanList(): Promise<any>;
    static getClanSearch(a: any): Promise<any>;
    static getClanMembers(a: any): Promise<any>;
    static getClanInvitations(a: any): Promise<any>;
    static postCreateClan /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postLeaveMember(a: any): Promise<any>;
    static postInviteMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postAcceptInviteMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postDeclineInviteMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postRemoveMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postPromoteMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postDemoteMember /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
    static postBanner /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<any>;
}
declare namespace APIClient {
    var ChallengeURL: string;
}
declare var textcache: {};
declare class TextCache {
}
declare namespace TextCache {
    export var PrefixCount: number;
    var _a: {};
    export { _a as Cache };
    export var Renderer: any;
    export var GetUniquePrefix: () => string;
    export var UpdateText: (a: any, b?: any, c?: any, d?: any) => void;
    export var GetKeyForStyle: (a: any) => string;
    export var GetText: (a: any, b: any, c?: any, d?: boolean) => any;
    export var GetTextSprite: (a: any) => any;
}
declare var eventdispatcher: {};
declare class EventDispatcher {
    _listeners: {};
    addListener: (a: any, b?: any) => void;
    removeListener: (a: any, b?: any) => void;
    dispatchEvent: (a: any) => void;
    hasListener: (a: any, b?: any) => boolean;
    constructor();
}
declare var client: {};
declare class Client extends EventDispatcher {
    pinger: number | null;
    socket: WebSocket | null;
    roundTripTime: number;
    serverSwitch: boolean;
    onCloseForImmediateReconnect: any;
    server: {
        id: string;
        uid: string;
        name: string;
        domain: string;
        title: string;
        address: string;
        port: string;
        secure: string;
        region: string;
        status: string;
        players: string;
        games: string;
        modes: {
            deathmatch: string;
            teamDeathmatch: string;
            captureTheFlag: string;
            dodgeball: string;
        };
    };
    connectionTimeout: number | null;
    allowNextAttempt: boolean;
    echoNonce: number;
    echoes: Map<any, any>;
    pendingInput: any[];
    inputFlushTimer: number | null;
    jitter: number | undefined;
    constructor();
    setServer(a: any): void;
    connect(): void;
    disconnect(a?: boolean): void;
    onOpen /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onError(a: any): void;
    onMessage(a: any): void;
    discardPendingInput(): void;
    onClose(a: any): void;
    emit(a: any): void;
    scheduleInputFlush(): void;
    isConnected(): boolean;
    onEchoResponse(a: any): void;

    mapID: any;}
declare namespace Client {
    var MAX_BUFFERED_INPUT_BYTES: number;
    var compress: (a: any) => Uint8Array<ArrayBuffer>;
    var decompress: (a: any) => {
        data: {
            t: string;
            d: any;
        };
        type: string;
    };
    var unpackGameData: (a: any) => {
        t: string;
        d: any;
    };
    var SendBuffer: Uint8Array<ArrayBuffer>;
    var Decoder: TextDecoder;
    var Encoder: TextEncoder;
    var INPUT_MARKER: number;
    var INPUT_VERSION: number;
    var INPUT_PACKET_BYTES: number;
    var InputBuffer: Uint8Array<ArrayBuffer>;
    var InputView: DataView<ArrayBuffer>;
    var CONNECT: string;
    var DISCONNECT: string;
    var AUTH_FAILED: string;
    var SERVER_FULL: string;
    var CONNECTION_ERROR: string;
    var CODE_AUTH_FAILED: number;
    var CODE_MAX_CLIENTS: number;
    var CODE_DUPLICATE_CLIENT: number;
    var CODE_BANNED: number;
    var CODE_STATE_UNAVAILABLE: number;
    var getConnectionUrl: (a: any) => string;
    var DefaultServer: {
        id: string;
        uid: string;
        name: string;
        domain: string;
        title: string;
        address: string;
        port: string;
        secure: string;
        region: string;
        status: string;
        players: string;
        games: string;
        modes: {
            deathmatch: string;
            teamDeathmatch: string;
            captureTheFlag: string;
            dodgeball: string;
        };
    };
}
declare var inputstate: {};
declare class InputState {
    oldB: number;
    b2: number;
    b1: number;
    changed: boolean;
    mapping: {} | undefined;
    Q: number;
    R: number;
    F: number;
    X: number;
    E: number;
    D: number;
    S: number;
    A: number;
    W: number;
    RM: number;
    LM: number;
    flagActive: boolean;
    flagHeldKeys: any;
    $: number;
    _: number;
    horizontalHeld: {
        A: number;
        D: number;
    };
    physicalHeld: any;
    touchHeld: any;
    flagBindingKeys: string[] | undefined;
    constructor();
    reset(): void;
    update /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    updateTouch /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    setControl /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    setBindings(a: any): {};
    updateFlagBinding /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    updateHorizontal /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    updateFacing(a: any): void;
    updateBytes(a: any): void;
}
declare namespace InputState {
    var GetMappedCharacter: (a: any, b?: any) => any;
    var InvertMapping: (a: any) => {};
    var ParseBindingKeys: (a: any) => string[];
    var DefaultBindings: {
        QWERTY: {
            ctrl_jump: string;
            ctrl_move_left: string;
            ctrl_move_right: string;
            ctrl_crouch: string;
            ctrl_prone: string;
            ctrl_fire: string;
            ctrl_fly: string;
            ctrl_reload: string;
            ctrl_throw: string;
            ctrl_drop: string;
            ctrl_swap: string;
            ctrl_flag: string;
            ctrl_chat: string;
            ctrl_team_chat: string;
            ctrl_help: string;
            ctrl_weapon: string;
            ctrl_leader: string;
        };
        AZERTY: {
            ctrl_jump: string;
            ctrl_move_left: string;
            ctrl_move_right: string;
            ctrl_crouch: string;
            ctrl_prone: string;
            ctrl_fire: string;
            ctrl_fly: string;
            ctrl_reload: string;
            ctrl_throw: string;
            ctrl_drop: string;
            ctrl_swap: string;
            ctrl_flag: string;
            ctrl_chat: string;
            ctrl_team_chat: string;
            ctrl_help: string;
            ctrl_weapon: string;
            ctrl_leader: string;
        };
    };
    var Descriptions: {
        ctrl_fly: string;
        ctrl_fire: string;
        ctrl_jump: string;
        ctrl_move_left: string;
        ctrl_move_right: string;
        ctrl_crouch: string;
        ctrl_prone: string;
        ctrl_reload: string;
        ctrl_throw: string;
        ctrl_drop: string;
        ctrl_swap: string;
        ctrl_flag: string;
        ctrl_chat: string;
        ctrl_team_chat: string;
        ctrl_help: string;
        ctrl_weapon: string;
        ctrl_leader: string;
    };
}
declare var registry: {};
declare class Registry {
    settings: any;
    constructor();
    store /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    retrieve(a: any): any;
    remove(a: any): void;
}
declare namespace Registry {
    var GetLocalStorageItem: (a: any, b?: boolean) => any;
    var SetLocalStorageItem: (a: any, b: any, c?: boolean) => void;
    var RemoveStorageItem: (a: any) => void;
    var Version: string;
    var Key: {
        MASTER: string;
        SETTINGS: string;
        CREDENTIAL: string;
        AUTOGEN: string;
    };
    var DefaultSettings: {
        controls: {
            keyBindings: {
                ctrl_jump: string;
                ctrl_move_left: string;
                ctrl_move_right: string;
                ctrl_crouch: string;
                ctrl_prone: string;
                ctrl_fire: string;
                ctrl_fly: string;
                ctrl_reload: string;
                ctrl_throw: string;
                ctrl_drop: string;
                ctrl_swap: string;
                ctrl_flag: string;
                ctrl_chat: string;
                ctrl_team_chat: string;
                ctrl_help: string;
                ctrl_weapon: string;
                ctrl_leader: string;
            };
        };
        graphics: {
            reticleLine: boolean;
            aa: boolean;
            fxaa: boolean;
            shockwaveFx: boolean;
            performanceMode: boolean;
            webglFallback: boolean;
            hideOverlayButtons: boolean;
            chatTextSize: number;
            resolution: number;
        };
        sound: {
            enabled: boolean;
            ambientEnabled: boolean;
            volume: number;
        };
    };
    var CloneDefaultSettings: () => any;
    var MergeSettings: (a: any) => any;
    var Instance: Registry;
}
declare var menupanelviewport: {};
declare class MenuPanelViewport extends PIXI.Container {
    content: any;
    panel: any;
    sourcePosition: any;
    sourceScale: any;
    sourceWidth: any;
    sourceHeight: any;
    closeButton: any;
    closeParent: any;
    closePosition: any;
    closeScale: any;
    enabled: boolean;
    frame: PIXI.Graphics;
    eventMode: string;
    viewWidth: number | undefined;
    viewHeight: number | undefined;
    constructor(a: any, b: any, c?: any);
    restoreContentPosition(): void;
    setEnabled(a: any): void;
    layout(): void;
}
declare var feature: {};
declare class Feature extends PIXI.Graphics {
    hides: any[];
    menuViewport: MenuPanelViewport;
    container: PIXI.Container<PIXI.ContainerChild>;
    constructor();
    show(): void;
    hide(): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    update(): void;
}
declare var inputdevice: {};
declare class InputDevice {
    static safeAreaProbe: HTMLDivElement | undefined;
    static detect(a?: Navigator, b?: (c: any) => boolean): boolean;
    static usesTouch(a: any): boolean;
    static touchEnabled(a: any): boolean;
    static safeArea(): {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}
declare var gamemenu: {};
declare class GameMenu extends Feature {
    overlayButtons: PIXI.Container<PIXI.ContainerChild>;
    discButton: PIXI.Container<PIXI.ContainerChild>;
    helpButton: PIXI.Container<PIXI.ContainerChild>;
    minmax: PIXI.Container<PIXI.ContainerChild> | undefined;
    fullscreenIcon: PIXI.Graphics | undefined;
    syncFullscreen: (() => void) | undefined;
    constructor();
    createTopButton /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): PIXI.Container<PIXI.ContainerChild>;
    isFullscreen(): boolean;
    toggleFullscreen(): void;
    drawFullscreenIcon(): void;
    applyDisplaySettings(): void;
    show(): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
}
declare var guestmenu: {};
declare class GuestMenu extends Feature {
    background: PIXI.Graphics;
    discordButton: PIXI.Sprite;
    joinDiscordText: PIXI.Text;
    menuPanel: PIXI.Graphics;
    loginButton: PIXI.Graphics;
    loginText: PIXI.Text;
    registerButton: PIXI.Graphics;
    registerText: PIXI.Text;
    playButton: GuestMenuButton;
    profileButton: GuestMenuButton;
    shopButton: GuestMenuButton;
    rankingButton: GuestMenuButton;
    memberButton: GuestMenuButton;
    clanButton: GuestMenuButton;
    contentButton: GuestMenuButton;
    mode: any;
    constructor();
    setMode(a: any): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
}
declare namespace GuestMenu {
    var MODE_NONE: string;
    var MODE_LOGIN: string;
    var MODE_REGISTER: string;
    var MODE_RANKING: string;
    var MODE_MEMBER: string;
    var MODE_CLAN: string;
    var MODE_SHOP: string;
    var MODE_PARTNER: string;
    var MODE_GUEST_PROFILE: string;
    var MODE_SETTINGS: string;
    var MODE_CONTENT: string;
}
declare class GuestMenuButton extends PIXI.Container {
    interactiveChildren: boolean;
    interactive: boolean;
    hovered: boolean;
    active: boolean;
    rectWidth: number;
    rectHeight: number;
    hitArea: PIXI.Rectangle;
    cursor: string;
    constructor(a: any, b: any, c: any, d?: any, e?: any, f?: any, g?: any);
    setActive(a?: boolean): void;
    updateIconState(): void;
}
declare namespace GuestMenuButton {
    var BUTTON_PRESSED: string;
}
declare var membermenu: {};
declare class MemberMenu extends Feature {
    background: PIXI.Graphics;
    discordButton: PIXI.Sprite;
    joinDiscordText: PIXI.Text;
    logoutButton: PIXI.Graphics;
    logoutIcon: PIXI.Sprite;
    logoutText: PIXI.Text;
    menuPanel: PIXI.Graphics;
    playButton: MemberMenuButton;
    profileButton: MemberMenuButton;
    shopButton: MemberMenuButton;
    rankingButton: MemberMenuButton;
    memberButton: MemberMenuButton;
    clanButton: MemberMenuButton;
    contentButton: MemberMenuButton;
    mode: any;
    constructor();
    setMode(a: any): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onLogout(): void;
}
declare namespace MemberMenu {
    var MODE_NONE: string;
    var MODE_RANKING: string;
    var MODE_SHOP: string;
    var MODE_MEMBER: string;
    var MODE_CLAN: string;
    var MODE_PROFILE: string;
    var MODE_SETTINGS: string;
    var MODE_CONTENT: string;
}
declare class MemberMenuButton extends PIXI.Container {
    interactiveChildren: boolean;
    interactive: boolean;
    hovered: boolean;
    active: boolean;
    rectWidth: number;
    rectHeight: number;
    hitArea: PIXI.Rectangle;
    cursor: string;
    constructor(a: any, b: any, c: any, d?: any, e?: any, f?: any, g?: any);
    setActive(a?: boolean): void;
    updateIconState(): void;
}
declare namespace MemberMenuButton {
    var BUTTON_PRESSED: string;
}
declare var xpprogression: {};
declare class XPProgression {
    static levelFromXP(a: any): number;
    static badgeFromLevel(a: any): number;
}
declare namespace XPProgression {
    var MAX_LEVEL: number;
    var BADGE_COUNT: number;
    var LEVELS_PER_BADGE: number;
}
declare var memberbrowsermenu: {};
declare class MemberBrowserMenu extends Feature {
    searchTimeout: number | null;
    panelWidth: number;
    panelHeight: number;
    resultsPanelX: number;
    resultsPanelWidth: number;
    resultsPanelY: number;
    resultsPanelHeight: number;
    resultsListY: number;
    resultsListHeight: number;
    background: PIXI.Graphics;
    tablePanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    searchValue: string;
    titleText: PIXI.Text;
    closeButton: ImgButton;
    usernameTitle: PIXI.Text;
    searchField: InputField;
    loaderText: PIXI.Text;
    nameText: PIXI.Text;
    skillRankingText: PIXI.Text;
    rankingText: PIXI.Text;
    nameFieldTableContainerMask: PIXI.Graphics;
    nameFieldTableContainer: PIXI.Container<PIXI.ContainerChild>;
    nameFieldScrollbar: MemberBrowserScrollbar;
    constructor();
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    show(): void;
    hide(): void;
    onSearch(): Promise<void>;
    search(): Promise<void>;
}
declare namespace MemberBrowserMenu {
    var paintRowBackground: (a: any, b: any, c: any, d: any, e?: boolean) => void;
    var drawRowBackground: (a: any, b?: any, c?: any, d?: any) => void;
    var drawScrollbar: (a: any, b?: any, c?: any) => void;
}
declare class MemberTableRow extends PIXI.Container {
    index: any;
    interactive: boolean;
    background: PIXI.Graphics;
    icon: PIXI.Sprite;
    nameText: PIXI.Text;
    skillRankText: PIXI.Text;
    rankText: PIXI.Text;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any, f?: any);
}
declare class MemberBrowserScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace MemberBrowserScrollbar {
    var SCROLL: string;
}
declare var util: {};
declare var Base62Charset: string[];
declare const Clamp: (a: any, b?: any, c?: any) => number, ToPrecision: (a: any, b?: any) => number, ShortAngle: (a: any, b?: any) => any, fastSplice: (a: any, b?: any) => void, numberWithPeriods: (a: any) => any, polyAreaTri: (a: any, b?: any, c?: any) => number, polyArea: (a: any) => number, polyCenter: (a: any) => {
    x: number;
    y: number;
}, polyCenterArr: (a: any) => {
    x: number;
    y: number;
}, polyRotateCopy: (a: any, b: any, c?: {
    x: number;
    y: number;
}) => any[], getDir: (a: any, b?: any, c?: any) => -1 | 1;
/** @param {any} a @param {any} [b] */ declare function fastAtan2(a: any, b?: any): number;
/** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] @param {any} [h] @param {any} [k] */ declare function Intersect(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, k?: any): boolean;
/** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] @param {any} [h] */ declare function Intersect3(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): -1 | 0 | 1;
declare var polyBounds: (a: any, b?: any) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
declare const uintToArr: (a: any, b?: any) => number[];
declare var dp: (a: any, b?: any) => number;
declare var perp: (a: any, b?: any) => {
    x: number;
    y: number;
};
declare const mag: (a: any) => number, norm: (a: any) => {
    x: number;
    y: number;
};
declare var project: (a: any, b?: any) => {
    x: number;
    y: number;
};
declare var RandomBrightColor: () => number;
declare var xorshift128_seed: (a: any) => void;
declare var xorshift128: (() => number) & {
    s: number[];
};
declare var Base62Encode: (a: any) => string;
declare var Base62Decode: (a: any) => number;
declare var setCookie: (a: any, b?: any, c?: any) => void;
declare var clanbrowsermenu: {};
declare class ClanBrowserMenu extends Feature {
    searchTimeout: number | null;
    lastRefresh: number;
    clans: any[];
    clanPropSort: string;
    clanPropDir: {
        name: number;
        skill: number;
        members: number;
        experience: number;
    };
    panelWidth: number;
    panelHeight: number;
    resultsPanelX: number;
    resultsPanelWidth: number;
    resultsPanelY: number;
    resultsPanelHeight: number;
    resultsListY: number;
    resultsListHeight: number;
    background: PIXI.Graphics;
    tablePanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    searchValue: string;
    titleText: PIXI.Text;
    closeButton: ImgButton;
    clanNameTitle: PIXI.Text;
    searchField: InputField;
    loaderText: PIXI.Text;
    nameText: PIXI.Text;
    membersText: PIXI.Text;
    skillRankingText: PIXI.Text;
    experienceRankingText: PIXI.Text;
    nameFieldTableContainerMask: PIXI.Graphics;
    nameFieldTableContainer: PIXI.Container<PIXI.ContainerChild>;
    nameFieldScrollbar: ClanBrowserScrollbar;
    constructor();
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    show(): void;
    hide(): void;
    onSearch(a?: boolean): void;
    search(): Promise<void>;
    sortClans(a: any, b?: number): void;
}
declare namespace ClanBrowserMenu {
    var paintRowBackground: (a: any, b: any, c?: boolean) => void;
    var drawRowBackground: (a: any, b?: any) => void;
    var drawScrollbar: (a: any, b?: any, c?: any) => void;
}
declare class ClanTableRow extends PIXI.Container {
    index: any;
    interactive: boolean;
    background: PIXI.Graphics;
    icon: PIXI.Sprite;
    nameText: PIXI.Text;
    membersText: PIXI.Text;
    skillText: PIXI.Text;
    experienceText: PIXI.Text;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any);
    setIndex(a?: number): void;
}
declare class ClanBrowserScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace ClanBrowserScrollbar {
    var SCROLL: string;
}
declare var button: {};
declare class Button extends PIXI.Graphics {
    id: any;
    value: string;
    enabled: boolean;
    interactiveChildren: boolean;
    interactive: boolean;
    pressed: boolean;
    pointerId: any;
    clickInterval: any;
    hoverImage: PIXI.Sprite | null;
    image: PIXI.Sprite | null;
    clickTimeout: number | null;
    edge: PIXI.Graphics;
    text: any;
    themeTint: any;
    constructor(a: any, b?: any, c?: any, d?: any);
    setText /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    redraw(): void;
    draw(): void;
    withinClickInterval(): boolean;
    onMouseDown(a: any): void;
    onMouseUp(a: any): void;
    cancelPress(): void;
    onMouseOver(): void;
    onMouseOut(): void;
    disable(): void;
    enable(): void;
    setValue(a: any): void;
    setSize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    setTint(a: any): void;
}
declare namespace Button {
    var TextCacheKey: string;
    var BUTTON_PRESSED: string;
    var BUTTON_RELEASED: string;
}
declare var loginmenu: {};
declare class LoginMenu extends Feature {
    storeCredentialFlag: boolean;
    panelWidth: number;
    panelHeight: number;
    background: PIXI.Graphics;
    formPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    closeButton: ImgButton;
    loginTitle: PIXI.Text;
    usernameTitle: PIXI.Text;
    passwordTitle: PIXI.Text;
    errorMessage: PIXI.Text;
    recoverTitle: PIXI.Text;
    nameField: InputField;
    passwordField: InputField;
    storeCredential: Checkbox;
    submitButton: LoginActionButton;
    loadingContainer: PIXI.Container<PIXI.ContainerChild>;
    loadingPanelWidth: number;
    loadingPanelHeight: number;
    loadingBackground: PIXI.Graphics;
    loadingText: PIXI.Text;
    completedContainer: PIXI.Container<PIXI.ContainerChild>;
    completedPanelWidth: number;
    completedPanelHeight: number;
    completedBackground: PIXI.Graphics;
    completedText: PIXI.Text;
    completedButton: LoginActionButton;
    constructor();
    drawStatusPanel /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    layoutCompletedPanel(): void;
    show(): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    reset(): void;
    validateForm(): {
        valid: boolean;
        error: string;
    };
    onSubmitButtonReleased(): void;
    displayLoadingMessage(): void;
    displayCompletedMessage(): void;
    onCompletedButtonReleased(): void;
    onCancelButtonReleased(): void;
    displayErrorMessage(a: any): void;
}
declare class LoginActionButton extends PIXI.Container {
    id: any;
    buttonWidth: number;
    buttonHeight: number;
    enabled: boolean;
    hovered: boolean;
    pressed: boolean;
    tintColor: number;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    icon: PIXI.Sprite | null;
    label: PIXI.Text;
    cursor: PIXI.Cursor | (string & {}) | undefined;
    pressPointerId: any;
    constructor(a: any, b?: any);
    setText(a: any): void;
    setTint(a: any): void;
    layoutContent(): void;
    draw(): void;
    onMouseDown(a: any): void;
    onMouseUp(a: any): void;
    onMouseOver(): void;
    onMouseOut(): void;
    disable(): void;
    enable(): void;
}
declare var checkbox: {};
declare class Checkbox extends PIXI.Container {
    id: any;
    labelText: any;
    checked: boolean;
    boxSize: number;
    hover: boolean;
    enabled: boolean;
    labelTint: any;
    interactive: boolean;
    icon: PIXI.Graphics;
    checkMark: PIXI.Graphics;
    label: any;
    mouseOutListener: (() => void) | null;
    mouseOverListener: (() => void) | null;
    mouseDownListener: ((a: any) => void) | null;
    hitArea: PIXI.Rectangle;
    constructor(a: any, b?: any, c?: any);
    onMouseDown(a: any): void;
    onMouseOver(): void;
    onMouseOut(): void;
    draw(): void;
    setChecked(a: any, b?: boolean): void;
    setEnabled(a: any): void;
    setTint(a: any): void;
}
declare namespace Checkbox {
    var CHANGE: string;
}
declare var registermenu: {};
declare class RegisterMenu extends Feature {
    challengeTexture: PIXI.Texture<PIXI.TextureSource<any>> | null;
    hasVerifiedEmail: boolean;
    emailDisabled: boolean;
    isSubmitting: boolean;
    panelWidth: number;
    panelHeight: number;
    background: PIXI.Graphics;
    formPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    closeButton: ImgButton;
    registerTitle: PIXI.Text;
    emailCheck: Checkbox;
    emailTitle: PIXI.Text;
    usernameTitle: PIXI.Text;
    passwordTitle: PIXI.Text;
    errorMessage: PIXI.Text;
    emailField: InputField;
    nameField: InputField;
    passwordField: InputField;
    submitButton: LoginActionButton;
    loadingContainer: PIXI.Container<PIXI.ContainerChild>;
    loadingBackground: PIXI.Graphics;
    loadingText: PIXI.Text;
    emailVerificationContainer: PIXI.Container<PIXI.ContainerChild>;
    emailVerificationBackground: PIXI.Graphics;
    emailVerificationText: PIXI.Text;
    emailVerificationWarning: PIXI.Text;
    emailVerificationField: InputField;
    verifyBox: Checkbox;
    verificationBoxWarning: PIXI.Text;
    emailVerificationButton: LoginActionButton;
    emailVerificationCancelButton: LoginActionButton;
    completedContainer: PIXI.Container<PIXI.ContainerChild>;
    completedPanelWidth: number;
    completedPanelHeight: number;
    completedBackground: PIXI.Graphics;
    completedTitle: PIXI.Text;
    completedHeaderLine: PIXI.Graphics;
    completedText: PIXI.Text;
    completedButton: LoginActionButton;
    constructor();
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    validateForm(): {
        valid: boolean;
        error: string;
    };
    onSubmitButtonReleased(): void;
    reset(): void;
    show(): void;
    hide(): void;
    resetRobotChallenge(): void;
    onCancelButtonReleased(): void;
    onCompletedButtonReleased(): void;
    onCancelEmailVerificationButtonReleased(): void;
    onEmailVerificationButtonReleased(): void;
    submitForm /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    displayLoadingMessage(): void;
    displayEmailVerification(): void;
    displayCompletedMessage(a?: boolean): void;
    displayErrorMessage(a: any): void;
}
declare namespace RegisterMenu {
    var EmailWhitelist: string[];
}
declare var upresetmenu: {};
declare class UPResetMenu extends Feature {
    challengeTexture: PIXI.Texture<PIXI.TextureSource<any>> | null;
    challengeRequestId: number;
    preferredCheck: string;
    panelWidth: number;
    panelHeight: number;
    background: PIXI.Graphics;
    formPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    closeButton: ImgButton;
    accountRecoveryTitle: PIXI.Text;
    emailTitle: PIXI.Text;
    recoverTitle: PIXI.Text;
    captchaTitle: PIXI.Text;
    errorMessage: PIXI.Text;
    emailField: InputField;
    nameCheck: Checkbox;
    passwordCheck: Checkbox;
    robotChallengeField: InputField;
    robotChallengeContainer: PIXI.Container<PIXI.ContainerChild>;
    robotChallenge: PIXI.Sprite;
    submitButton: LoginActionButton;
    loadingContainer: PIXI.Container<PIXI.ContainerChild>;
    loadingBackground: PIXI.Graphics;
    loadingText: PIXI.Text;
    completedContainer: PIXI.Container<PIXI.ContainerChild>;
    completedBackground: PIXI.Graphics;
    completedText: PIXI.Text;
    completedButton: LoginActionButton;
    constructor();
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    show(): void;
    hide(): void;
    resetRobotChallenge(): void;
    validateForm(): {
        valid: boolean;
        error: string;
    };
    onSubmitButtonReleased(): void;
    displayLoadingMessage(): void;
    displayCompletedMessage(): void;
    onCompletedButtonReleased(): void;
    onCancelButtonReleased(): void;
    displayErrorMessage(a: any): void;
    reset(): void;
}
declare namespace UPResetMenu {
    var CHECK_NAME: string;
    var CHECK_PASSWORD: string;
}
declare var visualizer: {};
declare class Visualizer extends PIXI.Container {
    widthPx: any;
    heightPx: any;
    renderBackground: boolean;
    displayAura: boolean;
    team: string;
    facing: any;
    staticPose: any;
    defaultPose: any;
    backgroundTheme: any;
    previewWeaponAngle: number;
    flightReturnAnimationId: string;
    flightReturnFrames: number;
    customization: {};
    isHovered: boolean;
    primaryWeapon: string;
    secondaryWeapon: string;
    equippedWeaponType: any;
    profileWeaponsOnly: boolean;
    previewScale: number;
    viewport: PIXI.Container<PIXI.ContainerChild>;
    viewportMask: PIXI.Graphics;
    backgroundShape: PIXI.Graphics;
    hitArea: PIXI.Rectangle;
    eventMode: string;
    interactiveChildren: boolean;
    interactive: boolean;
    world: any;
    bodyFactory: any;
    canvas: Canvas | undefined;
    player: Player | undefined;
    physicsPlayer: {
        body: any;
        ref: any;
    } | undefined;
    constructor(a: any, b: any, c?: boolean, d?: boolean, e?: boolean, f?: string, g?: {});
    resetScene(): void;
    clearCanvas(): void;
    generateCharacter(a?: {}): void;
    randomizeWeapons(): void;
    setWeapons(a: any, b: any, c?: any, d?: boolean): void;
    setPreviewWeaponAngle(a?: number): void;
    getWeaponCustomizationTexture /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    static getWeaponCustomizationKey /** @param {any} a @param {any} [b] */(a: any, b?: any): string;
    static getWeaponCustomization /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    static isProfileCustomization(a: any): boolean;
    static getProfileCustomization(a: any): any;
    static getProfileWeaponId /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    static normalizeCustomizedWeaponId(a: any): any;
    static getCustomizedWeaponId /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    static resolveDisplayWeapons /** @param {any} a @param {any} [b] */(a: any, b?: any): {
        primary: any;
        secondary: any;
    };
    pickRandom(a: any): any;
    getIdleAnimation(): any;
    getHoverAnimation(): any;
    getEquippedWeapon(): string | null;
    addWeaponHoldAnimation(a: any): any;
    getWeaponHoldAnimation(): string;
    getFlightAnimation(): string;
    getStaticAnimation(): any;
    setPose(a: any, b?: boolean): void;
    getFacingDir(): number;
    applyActiveAnimation(): void;
    beginFlightReturn(): boolean;
    createFlightReturnAnimation(): {
        frames: string;
        frequency: number;
        offsets: {
            x: number;
            y: number;
        }[];
        frameRepeat: boolean;
        motorSpeed: number;
        timeline: any;
    } | null;
    cancelFlightReturn(): void;
    removeFlightReturnAnimation(): void;
    updateFlightReturn(): void;
    createPhysicsPlayer(a: any): {
        body: any;
        ref: any;
    };
    syncBody /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    syncPlayerState(): void;
    layoutPreview(): void;
    getBodyPartPoint /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    initialize(): void;
    drawBackground(a?: boolean): void;
    applyCustomization(a: any): void;
    generateGradient(): void;
    hide(): void;
    show(): void;
    update(a?: number): void;
    settlePose(a?: number): void;
}
declare namespace Visualizer {
    var NextAnimationId: number;
    var CustomizationBodyParts: {
        hair: string;
        face: string;
        torso: string;
        belt: string;
        extra: string;
    };
    var FlightReturnFrameCount: number;
    var FlightReturnMotorSpeed: number;
}
declare var profileactionbutton: {};
declare class ProfileActionButton extends PIXI.Container {
    id: any;
    buttonWidth: number;
    buttonHeight: number;
    enabled: boolean;
    hovered: boolean;
    pressed: boolean;
    tintColor: number;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    label: PIXI.Text;
    cursor: PIXI.Cursor | (string & {}) | undefined;
    pointerId: any;
    constructor(a: any, b?: number, c?: number);
    setText(a: any): void;
    setTint(a: any): void;
    layoutContent(): void;
    draw(): void;
    onMouseDown(a: any): void;
    onMouseUp(a: any): void;
    onMouseOver(): void;
    onMouseOut(): void;
    disable(): void;
    enable(): void;
}
declare var accounttab: {};
declare class AccountTab extends Feature {
    w: any;
    h: any;
    sectionWidth: number;
    ox: number;
    oy: number;
    sections: number;
    currentSection: number;
    accountSettingsTitle: PIXI.Text;
    tableContainerMask: PIXI.Graphics;
    scrollLeftButton: ProfileActionButton;
    scrollRightButton: ProfileActionButton;
    passwordBackground: PIXI.Graphics;
    passwordResetTitle: PIXI.Text;
    oldPasswordTitle: PIXI.Text;
    newPasswordTitle: PIXI.Text;
    repeatPasswordTitle: PIXI.Text;
    savePasswordButton: ProfileActionButton;
    oldPasswordField: InputField;
    newPasswordField: InputField;
    repeatPasswordField: InputField;
    errorMessage: PIXI.Text;
    successMessage: PIXI.Text;
    changeNameBackground: PIXI.Graphics;
    changeNameTitle: PIXI.Text;
    nameField: InputField;
    verificationPasswordField: InputField;
    usernameInfo: PIXI.Text;
    saveUsernameButton: ProfileActionButton;
    goldIcon: PIXI.Sprite;
    goldInfo: PIXI.Text;
    changeUsernameErrorMessage: PIXI.Text;
    changeUsernameSuccessMessage: PIXI.Text;
    emailSending: boolean;
    emailConnected: boolean;
    emailStatusRequest: number;
    connectEmailButton: ProfileActionButton;
    emailConnectedMessage: PIXI.Text;
    deactivationBackground: PIXI.Graphics;
    deactivationTitle: PIXI.Text;
    deactivationInfo: PIXI.Text;
    passwordTitle: PIXI.Text;
    passwordField: InputField;
    deactivateButton: ProfileActionButton;
    deactivationErrorMessage: PIXI.Text;
    emailFocusListener: () => Promise<void>;
    emailPanel: PIXI.Container<PIXI.ContainerChild> | undefined;
    emailField: InputField | undefined;
    sendEmailButton: ProfileActionButton | undefined;
    emailMessage: PIXI.Text | undefined;
    constructor(a: any, b?: any);
    createEmailPanel(): void;
    openEmailPanel(): void;
    closeEmailPanel(): void;
    setEmailConnected(a: any): void;
    refreshEmailConnection(): Promise<void>;
    onSendEmailButtonReleased(): Promise<void>;
    validatePasswordForm(): {
        valid: boolean;
        error: string;
    };
    validateDeactivationForm(): {
        valid: boolean;
        error: string;
    };
    validateNameChangeForm(): {
        valid: boolean;
        error: string;
    };
    onSavePasswordButtonReleased(): Promise<void>;
    onSaveUsernameButtonReleased(): Promise<void>;
    onDeactivateButtonReleased(): Promise<void>;
    displayErrorMessage(a: any): void;
    displayUsernameErrorMessage(a: any): void;
    displayDeactivationErrorMessage(a: any): void;
    load(): void;
}
declare namespace AccountTab {
    var LOGOUT: string;
}
declare var incompleteaccounttab: {};
declare class IncompleteAccountTab extends Feature {
    w: any;
    h: any;
    ox: number;
    oy: number;
    accountSettingsTitle: PIXI.Text;
    autogenDescription: PIXI.Text;
    renameButton: ProfileActionButton;
    constructor(a: any, b?: any);
}
declare var levelbar: {};
declare class LevelBar extends PIXI.Container {
    ox: number;
    w: number;
    trackY: number;
    trackHeight: number;
    frame: PIXI.Graphics;
    background: PIXI.Graphics;
    bar: PIXI.Graphics;
    marker: PIXI.Graphics;
    previousText: PIXI.BitmapText;
    previousXpText: PIXI.BitmapText;
    currentText: PIXI.BitmapText;
    nextText: PIXI.BitmapText;
    nextXpText: PIXI.BitmapText;
    constructor(a?: number);
    load /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
}
declare namespace LevelBar {
    var XPToLevel: (a: any) => number;
}
declare var usermenu: {};
declare class UserMenu extends Feature {
    id: any;
    panelWidth: number;
    panelHeight: number;
    ox: number;
    oy: number;
    playerName: string;
    clanId: number;
    weapons: any[];
    weaponData: any[];
    history: any[];
    historyData: any[];
    twitchUrl: string;
    youtubeUrl: string;
    allowHistoryLoad: boolean;
    display: number;
    background: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    profilePanel: PIXI.Graphics;
    clanPanel: PIXI.Graphics;
    socialPanel: PIXI.Graphics;
    w: number;
    h: number;
    closeButton: ImgButton;
    tabWidth: number;
    tabHeight: number;
    tabY: number;
    tabGap: number;
    tabStartX: number;
    generalStatsButton: PIXI.Graphics;
    generalStatsLabel: PIXI.Text;
    historyButton: PIXI.Graphics;
    historyLabel: PIXI.Text;
    weaponStatsButton: PIXI.Graphics;
    weaponStatsLabel: PIXI.Text;
    contactButton: PIXI.Graphics;
    contactLabel: PIXI.Text;
    creationLabel: PIXI.Text;
    createdText: PIXI.Text;
    activityLabel: PIXI.Text;
    activityText: PIXI.Text;
    visualizer: Visualizer;
    overviewTitle: PIXI.Text;
    clanLabelText: PIXI.Text;
    clanText: PIXI.Text;
    generalContainer: PIXI.Container<PIXI.ContainerChild>;
    levelLabel: PIXI.Text;
    levelText: PIXI.Text;
    rankLabel: PIXI.Text;
    rankText: PIXI.Text;
    ratingIcon: PIXI.Sprite;
    skillLabel: PIXI.Text;
    skillText: PIXI.Text;
    skillRankLabel: PIXI.Text;
    skillRankText: PIXI.Text;
    killsLabel: PIXI.Text;
    killsText: PIXI.Text;
    deathsLabel: PIXI.Text;
    deathsText: PIXI.Text;
    capsLabel: PIXI.Text;
    capsText: PIXI.Text;
    levelIcon: PIXI.Sprite;
    socialTitle: PIXI.Text;
    youtubeButton: PIXI.Graphics;
    youtubeLogo: PIXI.Sprite;
    youtubeTitle: PIXI.Text;
    twitchButton: PIXI.Graphics;
    twitchLogo: PIXI.Sprite;
    twitchTitle: PIXI.Text;
    weaponContainer: PIXI.Container<PIXI.ContainerChild>;
    statsTableWidth: number;
    weaponTableFrame: PIXI.Graphics;
    weaponTitle: PIXI.Text;
    weaponNameLabel: PIXI.Text;
    weaponKillsLabel: PIXI.Text;
    listContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponListContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponListMask: PIXI.Graphics;
    scrollbar: WeaponListScrollbar;
    historyContainer: PIXI.Container<PIXI.ContainerChild>;
    historyTableFrame: PIXI.Graphics;
    historyTitle: PIXI.Text;
    resultLabel: PIXI.Text;
    opponentNameLabel: PIXI.Text;
    pointsLabel: PIXI.Text;
    dateLabel: PIXI.Text;
    historyListContainer: PIXI.Container<PIXI.ContainerChild>;
    matchHistoryListContainer: PIXI.Container<PIXI.ContainerChild>;
    historyListMask: PIXI.Graphics;
    historyScrollbar: WeaponListScrollbar;
    contactContainer: PIXI.Container<PIXI.ContainerChild>;
    friendInvitationText: PIXI.Text;
    friendInvitationButton: LoginActionButton;
    analyticsProfileRequest: any;
    analyticsProfileReady: boolean | undefined;
    constructor();
    load(a: any, b?: string, c?: any): Promise<void>;
    hide(): void;
    maskWeaponList(a: any): void;
    maskHistoryList(a: any): void;
    createStatsTableFrame /** @param {any} a @param {any} [b] */(a: any, b?: any): PIXI.Graphics;
    drawTab(a: any, b?: boolean): void;
    highlightTab /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateTabStates(): void;
    displayGeneralContainer(): void;
    displayWeaponContainer(): void;
    displayHistoryContainer(): Promise<void>;
    displayContactContainer(): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    update(a?: number): void;
    onCloseButtonReleased(): void;
}
declare namespace UserMenu {
    var GENERAL: number;
    var WEAPONS: number;
    var CONTACT: number;
    var HISTORY: number;
}
declare class WeaponItem extends PIXI.Container {
    rowWidth: number;
    id: string;
    name: any;
    kills: any;
    background: PIXI.Graphics;
    iconPlate: PIXI.Graphics;
    icon: string | null;
    nameLabel: PIXI.Text;
    killsLabel: PIXI.Text;
    constructor(a: any, b: any, c?: number);
    drawBackground(a: any): void;
}
declare class WeaponListScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    bh: number;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace WeaponListScrollbar {
    var SCROLL: string;
    var ListHeight: number;
    var ItemHeight: number;
}
declare class MatchItem extends PIXI.Container {
    rowWidth: number;
    id: any;
    name: any;
    result: any;
    points: number;
    date: any;
    background: PIXI.Graphics;
    resultStripe: PIXI.Graphics;
    resultLabel: PIXI.Text;
    nameLabel: PIXI.Text;
    pointsLabel: PIXI.Text;
    dateLabel: PIXI.Text;
    constructor(a: any, b: any, c: any, d: number | undefined, e: any, f?: number);
    drawBackground(a: any): void;
}
declare namespace MatchItem {
    var HEIGHT: number;
    var ResultTintMap: {
        win: number;
        init: number;
        tbd: number;
        error: number;
        error2: number;
        cancelled: number;
        noshow: number;
        noshow_self: number;
        draw: number;
        loss: number;
    };
    var ResultLabelMap: {
        win: string;
        init: string;
        tbd: string;
        error: string;
        error2: string;
        cancelled: string;
        noshow: string;
        noshow_self: string;
        draw: string;
        loss: string;
    };
}
declare var overviewtab: {};
declare class OverviewTab extends Feature {
    w: any;
    h: any;
    ox: number;
    oy: number;
    tabWidth: number;
    tabHeight: number;
    display: number;
    weapons: any[];
    weaponData: any[];
    background: PIXI.Graphics;
    socialPanel: PIXI.Graphics;
    socialLinks: {};
    socialLoadVersion: number;
    generalStatsButton: PIXI.Graphics;
    generalStatsLabel: PIXI.Text;
    historyButton: PIXI.Graphics;
    historyLabel: PIXI.Text;
    weaponStatsButton: PIXI.Graphics;
    weaponStatsLabel: PIXI.Text;
    creationLabel: PIXI.Text;
    createdText: PIXI.Text;
    activityLabel: PIXI.Text;
    activityText: PIXI.Text;
    visualizer: Visualizer;
    overviewTitle: PIXI.Text;
    generalContainer: PIXI.Container<PIXI.ContainerChild>;
    levelLabel: PIXI.Text;
    levelText: PIXI.Text;
    rankLabel: PIXI.Text;
    rankText: PIXI.Text;
    ratingIcon: PIXI.Sprite;
    skillLabel: PIXI.Text;
    skillText: PIXI.Text;
    skillRankLabel: PIXI.Text;
    skillRankText: PIXI.Text;
    killsLabel: PIXI.Text;
    killsText: PIXI.Text;
    deathsLabel: PIXI.Text;
    deathsText: PIXI.Text;
    capsLabel: PIXI.Text;
    capsText: PIXI.Text;
    levelIcon: PIXI.Sprite;
    levelBarTitle: PIXI.Text;
    levelBar: LevelBar;
    goldBackground: PIXI.Graphics;
    goldIcon: PIXI.Sprite;
    goldText: PIXI.Text;
    gemIcon: PIXI.Sprite;
    gemText: PIXI.Text;
    weaponContainer: PIXI.Container<PIXI.ContainerChild>;
    statsTableWidth: number;
    weaponTableFrame: PIXI.Graphics;
    weaponTitle: PIXI.Text;
    weaponNameLabel: PIXI.Text;
    weaponKillsLabel: PIXI.Text;
    listContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponListContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponListMask: PIXI.Graphics;
    scrollbar: WeaponListScrollbar;
    constructor(a: any, b?: any);
    createSocialLink /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    static normalizeSocialUrl /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    updateSocialLink(a: any, b?: string, c?: boolean): void;
    pasteSocialLink(a: any): Promise<void>;
    submitSocial(a: any, b?: any): Promise<boolean>;
    load(): Promise<void>;
    hide(): void;
    maskWeaponList(a: any): void;
    createStatsTableFrame /** @param {any} a @param {any} [b] */(a: any, b?: any): PIXI.Graphics;
    drawTab(a: any, b?: boolean): void;
    highlightTab /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateTabStates(): void;
    displayGeneralContainer(): void;
    displayWeaponContainer(): void;
    update(a?: number): void;
}
declare namespace OverviewTab {
    var GENERAL: number;
    var WEAPONS: number;
}
declare var thumbnail: {};
declare class Thumbnail extends PIXI.Sprite {
    widthPx: any;
    heightPx: any;
    renderResolution: any;
    displayAura: boolean;
    customization: {};
    weaponStats: any[];
    thumbnailTexture: PIXI.RenderTexture;
    secondaryWeapon: any;
    primaryWeapon: any;
    defaultPose: any;
    facing: any;
    weaponAngle: any;
    settleFrames: number;
    needsTextureRefresh: boolean;
    interactive: boolean;
    interactiveChildren: boolean;
    eventMode: string;
    hitArea: PIXI.Rectangle;
    constructor(a: any, b: any, c?: boolean, d?: boolean, e?: {});
    static getVisualizer /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): any;
    static update(a?: number): void;
    randomizeWeapons(): void;
    refreshTexture(a?: number, b?: number): void;
    applyCustomization(a: any, b?: any[]): void;
    setPose(a: any, b?: any): void;
    destroy(a: any): void;

    static visualizer: Visualizer;}
declare namespace Thumbnail {
    export var visualizerWidth: number;
    export var visualizerHeight: number;
    export var visualizerAura: boolean;
    export var visualizerPose: string;
    export var visualizerFacing: number;
    export var instances: any[];
}
declare var clanphotopanel: {};
declare class ClanPhotoPanel extends PIXI.Container {
    panelWidth: number;
    panelHeight: number;
    thumbnailScaleMultiplier: number;
    photoX: number;
    photoY: number;
    photoWidth: number;
    photoHeight: number;
    photoFrameInset: number;
    thumbnailResolution: number;
    members: any[];
    thumbnails: any[];
    highlights: any[];
    shadows: any[];
    landscapeSeed: number;
    blocker: PIXI.Graphics;
    background: PIXI.Graphics;
    title: PIXI.Text;
    subtitle: PIXI.Text;
    stage: PIXI.Graphics;
    stageImage: PIXI.Sprite | undefined;
    photoContainer: PIXI.Container<PIXI.ContainerChild>;
    photoMask: PIXI.Graphics;
    photoFrame: PIXI.Graphics;
    emptyText: PIXI.Text;
    hoverLabel: PIXI.Container<PIXI.ContainerChild>;
    hoverLabelBackground: PIXI.Graphics;
    hoverLabelText: PIXI.Text;
    closeButton: ProfileActionButton;
    loadingBackground: boolean | undefined;
    constructor(a?: number, b?: number);
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    createBackgroundPanel(): PIXI.Graphics;
    resizeBackgroundPanel(): void;
    drawStage(): void;
    drawPhotoMask(): void;
    drawPhotoFrame(): void;
    drawSunGlow /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    drawSkyStreaks /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
    setMembers(a: any, b?: string): void;
    show(): void;
    loadBackground(): Promise<void>;
    hide(): void;
    clearThumbnails(): void;
    renderMembers(): void;
    normalizeMember /** @param {any} a @param {any} [b] */(a: any, b?: any): {
        id: any;
        name: any;
        role: string;
        customization: any;
        weaponStats: any;
        score: number;
        index: null;
    };
    parseNumber /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    parseCustomization(a: any): any;
    isEmptyCustomization(a: any): boolean;
    assignMemberSlots /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    pickStandingPose /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): "salute" | "wave" | null;
    createSlots(a: any): {
        x: number;
        y: number;
        scale: number;
        row: number;
        pose: string | null;
        facing: number;
    }[];
    updateSlotGeometry(a: any): void;
    pickLandscapePalette(a: any): {
        skyTop: number;
        skyMid: number;
        skyLow: number;
        skyNearHorizon: number;
        sun: number;
        cloudLight: number;
        cloudWarm: number;
        cloudShadow: number;
        hillsBack: number;
        hillsFront: number;
        ground: number;
        grass: number;
    };
    drawHillLayer /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any): void;
    hashString(a: any): number;
    createRandom(a: any): () => number;
    randRange /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    addMemberShadow(a: any): void;
    addMemberThumbnail(a: any, b: any, c?: number): void;
    getMemberWeaponAngle /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    getThumbnailHitArea(a: any): PIXI.Rectangle;
    createThumbnailHighlight /** @param {any} a @param {any} [b] */(a: any, b?: any): PIXI.Graphics;
    onMemberSelected /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    stopInteractionEvent(a: any): void;
    showMemberLabel /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onMemberHover /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    onMemberHoverOut /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    moveMemberLabel(a: any): void;
    hideMemberLabel(): void;
    drawMemberLabelBackground(): void;
    formatLabelName(a: any): any;
    formatRoleName(a: any): "Captain" | "Leader" | "Member";
}
declare namespace ClanPhotoPanel {
    var USER_ACCESS: string;
    var HIDE: string;
}
declare var clantab: {};
declare class ClanTab extends Feature {
    w: any;
    h: any;
    memberRowWidth: number;
    ox: number;
    oy: number;
    members: any[];
    clanPhotoMembers: any[];
    clanSettingsTitle: PIXI.Text;
    creationContainer: PIXI.Container<PIXI.ContainerChild>;
    clanCreationBackground: PIXI.Graphics;
    clanCreationInfoPanel: PIXI.Graphics;
    clanCreationFormPanel: PIXI.Graphics;
    clanCreationMenuTitle: PIXI.Text;
    clanCreationTitle: PIXI.Text;
    clanNameField: InputField;
    createClanButton: ProfileActionButton;
    goldIcon: PIXI.Sprite;
    goldInfo: PIXI.Text;
    createClanErrorMessage: PIXI.Text;
    displayContainer: PIXI.Container<PIXI.ContainerChild>;
    clanOverviewBackground: PIXI.Graphics;
    clanHeaderPanel: PIXI.Graphics;
    clanInfoPanel: PIXI.Graphics;
    memberPanel: PIXI.Graphics;
    bannerFrame: PIXI.Graphics;
    uploadText: PIXI.Text;
    nameText: PIXI.Text;
    memberText: PIXI.Text;
    roleLabelText: PIXI.Text;
    hintText: PIXI.Text;
    roleText: PIXI.Text;
    createdText: PIXI.Text;
    membersTitle: PIXI.Text;
    membersHint: PIXI.Text;
    listContainer: PIXI.Container<PIXI.ContainerChild>;
    memberListContainer: PIXI.Container<PIXI.ContainerChild>;
    scrollbar: MemberListScrollbar;
    memberDropdown: MemberDropdown;
    leaveClanButton: ProfileActionButton;
    clanPhotoButton: ProfileActionButton;
    clanPhotoPanel: ClanPhotoPanel;
    leaveClanContainer: PIXI.Container<PIXI.ContainerChild>;
    leaveClanBackground: PIXI.Graphics;
    leaveClanVerificationText: PIXI.Text;
    leaveClanAcceptButton: ProfileActionButton;
    leaveClanDeclineButton: ProfileActionButton;
    leaveClanErrorText: PIXI.BitmapText;
    constructor(a: any, b?: any);
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    resizeClanPhotoPanel /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    load(): Promise<void>;
    displayCreate(): void;
    displayOverview(a: any): Promise<void>;
    showDropdown /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    validateClanCreationForm(): {
        valid: boolean;
        error: string;
    };
    onCreateClanButtonReleased(): Promise<void>;
    onLeaveClanButtonReleased(): Promise<void>;
    onClanPhotoButtonReleased(): void;
    onLeaveClanAcceptButtonReleased(): Promise<void>;
    onleaveClanCancelButtonReleased(): Promise<void>;
    maskMemberList(a: any): void;
    promoteMember(a: any): Promise<void>;
    demoteMember(a: any): Promise<void>;
    removeMember(a: any): Promise<void>;
}
declare namespace ClanTab {
    var SHOW_DROPDOWN: string;
    var ACCESS_PROFILE: string;
    var CLAN_PHOTO_SHOW: string;
    var CLAN_PHOTO_HIDE: string;
    var drawScrollbar: (a: any, b?: any, c?: any) => void;
    var drawMemberRowBackground: (a: any, b: any, c?: boolean, d?: number) => void;
}
declare class MemberListScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    bh: number;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    constructor(a: any, b?: number);
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace MemberListScrollbar {
    var SCROLL: string;
    var ListHeight: number;
    var ItemHeight: number;
}
declare class MemberItem extends PIXI.Container {
    index: any;
    id: any;
    name: any;
    role: any;
    options: any;
    rowWidth: number;
    background: PIXI.Graphics;
    nameLabel: PIXI.Text;
    roleLabel: PIXI.Text | undefined;
    constructor(a: any, b: any, c: any, d: any, e: any, f?: number);
}
declare namespace MemberItem {
    var RowWidth: number;
    var RowHeight: number;
}
declare class MemberDropdown extends PIXI.Container {
    background: PIXI.Graphics;
    itemContainer: PIXI.Graphics;
    constructor();
    display /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
}
declare namespace MemberDropdown {
    var ACTION_PROMOTE: string;
    var ACTION_DEMOTE: string;
    var ACTION_REMOVE: string;
}
declare class MemberDropdownActionRow extends PIXI.Container {
    text: any;
    tintValue: any;
    actionText: PIXI.Text;
    confirmation: boolean;
    confirming: boolean;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    constructor(a: any, b: any, c: any, d?: boolean);
}
declare namespace MemberDropdownActionRow {
    var CONFIRM: string;
    var SELECT: string;
}
declare var settingstab: {};
declare class SettingsTab extends Feature {
    settings: {
        allow_invite: boolean;
    };
    w: number;
    h: number;
    ox: number;
    oy: number;
    initialized: boolean;
    background: PIXI.Graphics;
    settingsTitle: PIXI.Text;
    allowInviteCheck: Checkbox;
    applyButton: ProfileActionButton;
    saveStatus: PIXI.Text;
    constructor(a?: number, b?: number);
    onApplyButtonReleased(): Promise<void>;
    load(): Promise<void>;
}
declare var profilemenu: {};
declare class ProfileMenu extends Feature {
    tab: any;
    panelWidth: number;
    panelHeight: number;
    background: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    tabWidth: number;
    tabHeight: number;
    tabY: number;
    overviewTabButton: PIXI.Graphics;
    overviewTabTitle: PIXI.Text;
    clanTabButton: PIXI.Graphics;
    clanTabTitle: PIXI.Text;
    accountTabButton: PIXI.Graphics;
    accountTabTitle: PIXI.Text;
    settingsTabButton: PIXI.Graphics;
    settingsTabTitle: PIXI.Text;
    closeButton: ImgButton;
    overviewTab: OverviewTab;
    accountTab: AccountTab;
    incompleteAccountTab: IncompleteAccountTab;
    clanTab: ClanTab;
    settingsTab: SettingsTab;
    publicProfileButton: LoginActionButton;
    constructor();
    drawTab(a: any, b?: boolean): void;
    updateTabStates(): void;
    openTab(a: any, b?: boolean): void;
    update(a?: number): void;
    show(): void;
    hide(): void;
    reset(): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    raisePhotoPanelLayer(): void;
    restorePhotoPanelLayer(): void;
}
declare namespace ProfileMenu {
    var TAB_OVERVIEW: string;
    var TAB_CLAN: string;
    var TAB_ACCOUNT: string;
    var TAB_SETTINGS: string;
}
declare var userinput: {}, UserInput: EventDispatcher & {
    pressed: {};
    hasFocus: boolean;
    setFocus: (a: any) => void;
    releaseFocus: () => void;
    emulateKeyDown: (a: any) => void;
    emulateKeyUp: (a: any) => void;
    onKeyDown: (a: any) => void;
    onKeyUp: (a: any) => void;
    getMappedChar: (a: any, b?: any) => any;
    azertyToQwerty: (a: any) => any;
    KEY_DOWN: string;
    KEY_UP: string;
    KEY_PRESS: string;
    BACKSPACE: number;
    ENTER: number;
    NUMERIC: string;
    ALPHANUMERIC: string;
    ALPHA_EXT: string;
    CHAT_SYMBOLS: string;
    WHEEL: string;
    ExclusiveWheel: null;
};
declare var characterMapCTRL: any[];
declare var arrowsInv: {
    LFT: string;
    UP: string;
    RGT: string;
    DWN: string;
}, azertyMap: any[];
declare var characterMapShift: any[];
declare var characterMap: any[];
declare var itemoverview: {};
declare class ItemOverview extends PIXI.Container {
    items: any[];
    listY: number;
    listTopInset: number;
    title: PIXI.Text;
    comingSoon: PIXI.Text;
    background: PIXI.Graphics;
    container: PIXI.Container<PIXI.ContainerChild>;
    containerMask: PIXI.Graphics;
    scrollbar: IOScrollbar;
    constructor(a?: number);
    show(): void;
    hide(): void;
    setTitle(a: any): void;
    select(a: any): void;
    selectAndReveal(a: any, b?: boolean): void;
    revealItem(a: any): void;
    loadItems(a: any, b: string | undefined, c: any, d: any, e?: boolean): void;
    onItemSelected(a: any): void;
}
declare namespace ItemOverview {
    var SELECT: string;
}
declare class IOScrollbar extends PIXI.Container {
    scrolling: boolean;
    h: number;
    bh: number;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollPointerId: number | null;
    scrollButton: PIXI.Graphics;
    wheelListener: (b: any) => void;
    constructor(a?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    setRatio(a: any): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace IOScrollbar {
    var SCROLL: string;
}
declare class IOItem extends PIXI.Container {
    hovered: boolean;
    selected: boolean;
    data: any;
    itemBackground: PIXI.Graphics;
    timeout: boolean;
    itemIcon: any;
    itemIconBase: {
        x: any;
        y: any;
        width: any;
        height: any;
        scaleX: any;
        scaleY: any;
    };
    scaleIconOnHover: boolean;
    weaponDefaultLabel: PIXI.Text;
    weaponProfileLabel: PIXI.Text;
    constructor(a: any, b?: any);
    onMouseOver(): void;
    onMouseOut(): void;
    setItemIconHoverScale(a: any): void;
    select(a?: boolean): void;
    deselect(): void;
    setWeaponStatuses /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    drawBackground(): void;
}
declare namespace IOItem {
    var SELECT: string;
    var getDisplayTitle: (a: any, b?: any) => any;
    var LimbLabels: {
        legleftupper: string;
        legleftlower: string;
        legrightupper: string;
        legrightlower: string;
        armleftupper: string;
        armleftlower: string;
        armrightupper: string;
        armrightlower: string;
    };
}
declare var itempicker: {};
declare class ItemPicker extends PIXI.Container {
    title: any;
    type: any;
    data: any;
    itemTint: number;
    prefix: any;
    callback: any;
    hovered: boolean;
    selected: boolean;
    timeout: boolean;
    interactive: boolean;
    baseOwned: boolean;
    owned: boolean;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    label: PIXI.Text;
    icon: PIXI.Sprite;
    iconBaseScale: {
        x: number;
        y: number;
    } | undefined;
    constructor(a: any, b?: any, c?: any, d?: any);
    select(): void;
    deselect(): void;
    draw(): void;
    displayItem(a: any, b?: boolean): void;
    setIconHoverScale(a: any): void;
    setTint(a: any): void;
}
declare namespace ItemPicker {
    var SELECT: string;
    var IconScales: {
        camocape: number;
        camocape_desert: number;
        camocape_jungle: number;
        camocape_snow: number;
        camocape_winter: number;
        cape_black: number;
    };
    var Labels: {
        "Hair style": string;
        Belt: string;
        "Right upper leg": string;
        "Left upper leg": string;
        "Right lower leg": string;
        "Left lower leg": string;
        Torso: string;
        "Flight aura": string;
        Face: string;
        "Right shoulder": string;
        "Left shoulder": string;
        "Right hand": string;
        "Left hand": string;
        Extra: string;
    };
}
declare var colorpicker: {};
declare class ColorPicker extends PIXI.Container {
    columns: number;
    cellSize: number;
    gap: number;
    padding: number;
    headerHeight: number;
    rows: number;
    pickerWidth: number;
    pickerHeight: number;
    swatches: PIXI.Graphics[];
    selectedColor: number;
    background: PIXI.Graphics;
    title: PIXI.Text;
    preview: PIXI.Graphics;
    constructor();
    drawSwatch(a: any, b?: boolean): void;
    selectColor(a: any, b?: boolean): void;
    setSelectedColor /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
}
declare namespace ColorPicker {
    var COLOR_SELECTED: string;
    var COLORS: number[];
}
declare var purchasepanel: {};
declare class PurchasePanel extends PIXI.Container {
    container: PIXI.Container<PIXI.ContainerChild>;
    w: number;
    h: number;
    overlayWidth: number;
    overlayHeight: number;
    overlayY: number;
    panelX: number;
    panelY: number;
    closeTimeout: number | null;
    activeItem: any;
    background: PIXI.Graphics;
    panel: PIXI.Graphics;
    itemPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    title: PIXI.Text;
    itemGlow: PIXI.Sprite;
    itemIcon: PIXI.Sprite;
    itemName: PIXI.Text;
    goldIcon: PIXI.Sprite;
    itemPrice: PIXI.Text;
    currentTitle: PIXI.Text;
    currentGold: PIXI.Text;
    remainingTitle: PIXI.Text;
    remainingGold: PIXI.Text;
    purchaseButton: LoginActionButton;
    cancelButton: LoginActionButton;
    successContainer: PIXI.Container<PIXI.ContainerChild>;
    successBackground: PIXI.Graphics;
    successInnerPanel: PIXI.Graphics;
    successTitle: PIXI.Text;
    successTitleDesc: PIXI.Text;
    successContainerItemIcon: PIXI.Sprite;
    closeButton: LoginActionButton;
    static fitSprite(a: any, b: any, c: any, d?: number): any;
    constructor();
    display(a: any): Promise<void>;
    onCancelButtonReleased(): void;
    onCloseButtonReleased(): void;
    clearCloseTimeout(): void;
    completePurchase /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onPurchaseButtonReleased(): Promise<void>;
}
declare namespace PurchasePanel {
    var CANCEL: string;
    var UPDATE: string;
    var PURCHASED: string;
    var ITEM_ICON_MAX_WIDTH: number;
    var ITEM_ICON_MAX_HEIGHT: number;
    var SUCCESS_ICON_MAX_WIDTH: number;
    var SUCCESS_ICON_MAX_HEIGHT: number;
    var ITEM_GLOW_SCALE: number;
}
declare var weaponcontainer: {};
declare class WeaponContainer extends PIXI.Container {
    leftX: any;
    topY: any;
    rightX: any;
    footerY: any;
    listY: any;
    listTopInset: number;
    wheelEnabled: boolean;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    customizations: any[];
    weaponItems: any[];
    activeCustomization: any;
    selectedCustomization: any;
    selectedWeapon: any;
    title: PIXI.Text;
    weaponListBackground: PIXI.Graphics;
    weaponContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponMask: PIXI.Graphics;
    scrollbar: IOScrollbar;
    customizationOverview: ItemOverview;
    noCustomText: PIXI.Text;
    saveButton: LoginActionButton;
    profileButton: LoginActionButton;
    saveStatus: PIXI.Text;
    buyButton: LoginActionButton;
    noWeaponsText: PIXI.Text | undefined;
    constructor(a: any, b: any, c: any, d: any, e?: number);
    show(): void;
    hide(): void;
    updateWheelTarget(a: any): void;
    setCustomizations(a: any): void;
    setActiveCustomization(a: any): void;
    updateWeaponStatuses(): void;
    updateWeaponListStatuses(): void;
    isProfileWeapon(a: any): boolean;
    getProfileCustomization(a: any): any;
    compareWeapons /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    getWeaponCustomization(a: any): string | null;
    buildWeaponList(): void;
    selectWeapon(a: any, b?: boolean): void;
    loadCustomizationsForWeapon(a: any, b?: boolean): void;
    onCustomizationSelected(a: any): void;
    updateSelectionActions(): void;
    isOwned(a: any): any;
    setProfileSelected(a: any): void;
    setSavePending(): void;
    setSaveResult(a: any): void;
    findActiveCustomizationId(a: any): any;
    getActiveCustomization(a: any): string | null;
    weaponIdMatches /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
}
declare namespace WeaponContainer {
    var parseData: (a: any) => any;
    var getCustomizationKey: (a: any, b?: any) => string;
    var WEAPON_SELECT: string;
    var PROFILE: string;
    var EQUIP: string;
}
declare class WeaponListItem extends PIXI.Container {
    data: any;
    hovered: boolean;
    selected: boolean;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    customTexture: any;
    icon: any;
    title: PIXI.Text;
    typeLabel: PIXI.Text;
    profileLabel: PIXI.Text;
    iconBase: {
        x: any;
        y: any;
        width: any;
        height: any;
        scaleX: any;
        scaleY: any;
    } | undefined;
    constructor(a: any);
    select(): void;
    setSelected(a: any): void;
    setProfile(a: any): void;
    setCustomization(a: any): void;
    setIconHoverScale(a: any): void;
    draw(): void;
}
declare namespace WeaponListItem {
    var SELECT: string;
}
declare var particlecontainer: {};
declare class ParticleContainer extends PIXI.Container {
    lastUpdate: number;
    terrainMesh: any;
    eventMode: string;
    spritePools: any;
    particleChildren: any[];
    batchPool: any[];
    expiredBatches: any[];
    expiredParticles: any[];
    trailParticles: any[];
    maxPoolSize: number;
    invalidParticleWarnings: Set<any>;
    constructor(a?: any);
    spawn /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    addParticle(a: any): void;
    recycleBatch(a: any): void;
    warnInvalidParticle /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    acquireParticle /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    releaseParticle(a: any): void;
    update(a: any): void;
    updateParticleTrails(a: any): void;
    configureVelocityStretch /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateVelocityStretch(a: any): void;
    updateCollidingParticle /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    checkCollision(a: any, b: any, c: any, d: any, e: any, f?: number): void;
    clear(): void;
    destroy(a: any): void;
}
declare var customizationsuccessfx: {};
declare class CustomizationSuccessFX extends PIXI.Container {
    eventMode: string;
    glow: PIXI.Sprite;
    rings: PIXI.Graphics[];
    arcs: PIXI.Graphics;
    rays: PIXI.Graphics;
    particles: ParticleContainer;
    duration: number | undefined;
    purchase: any;
    charge: number | undefined;
    nextSpark: number | undefined;
    elapsed: number | undefined;
    burst: boolean | undefined;
    target: any;
    targetScaleX: any;
    targetScaleY: any;
    constructor();
    play /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    stop(): void;
    spark(a: any, b: any, c: any, d: any, e: any, f: any, g?: boolean): void;
    update(a: any): void;
}
declare var customizationmenu: {};
declare class CustomizationMenu extends Feature {
    initial: boolean;
    customizationPickers: ItemPicker[];
    display: string;
    rewardToken: any;
    selectedItem: boolean | ItemPicker | null;
    weaponStats: any[];
    previewWeaponOverrides: {
        primary: null;
        secondary: null;
    };
    previewEquippedWeaponType: any;
    goldAnimation: boolean;
    ox: number;
    oy: number;
    panelWidth: number;
    panelHeight: number;
    panelRight: number;
    panelLeft: number;
    gold: number;
    background: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    itemListPanel: PIXI.Graphics;
    itemListHeight: number;
    previewPanelWidth: number;
    previewPanelHeight: number;
    previewPanel: PIXI.Graphics;
    footerPanel: PIXI.Graphics;
    playerContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponContainer: WeaponContainer;
    savedText: PIXI.Text;
    customizationTitle: PIXI.Text;
    errorMessage: PIXI.Text;
    goldIcon: PIXI.Sprite;
    goldText: PIXI.Text;
    goldRewardText: PIXI.Text;
    modeTabWidth: number;
    modeTabHeight: number;
    playerCustomizationButton: PIXI.Graphics;
    playerCustomizationLabel: PIXI.Text;
    weaponCustomizationButton: PIXI.Graphics;
    weaponCustomizationLabel: PIXI.Text;
    submitButton: LoginActionButton;
    purchaseButton: LoginActionButton;
    closeButton: ImgButton;
    rewardButton: LoginActionButton;
    errorRewardMessage: PIXI.Text;
    countdownMessage: PIXI.Text;
    previewChrome: PIXI.Graphics;
    previewLabel: PIXI.Text;
    previewHint: PIXI.Text;
    visualizer: Visualizer;
    pickerGuide: PIXI.Graphics;
    guideStart: PIXI.Point;
    guideTarget: PIXI.Point;
    guideLineStyle: {
        color: number;
        width: number;
        alpha: number;
    };
    guideRingStyle: {
        color: number;
        width: number;
    };
    purchasePanel: PurchasePanel;
    itemOverview: ItemOverview;
    hairPicker: ItemPicker;
    beltPicker: ItemPicker;
    legLeftUpperPicker: ItemPicker;
    legRightUpperPicker: ItemPicker;
    legRightLowerPicker: ItemPicker;
    legLeftLowerPicker: ItemPicker;
    torsoPicker: ItemPicker;
    orbPicker: ItemPicker;
    facePicker: ItemPicker;
    armRightUpperPicker: ItemPicker;
    armLeftUpperPicker: ItemPicker;
    armLeftLowerPicker: ItemPicker;
    armRightLowerPicker: ItemPicker;
    extraPicker: ItemPicker;
    colorPicker: ColorPicker;
    customization: any;
    particleContainer: ParticleContainer;
    successFX: CustomizationSuccessFX;
    hoveredPicker: ItemPicker | null | undefined;
    guidePicker: any;
    guideX: number | undefined;
    guideY: number | undefined;
    guideStartX: number | undefined;
    guideStartY: number | undefined;
    activeCustomization: any;
    rewardInterval: number | null | undefined;
    constructor();
    layoutLoadoutPickers(): void;
    bindPickerGuides(): void;
    updatePickerGuide(): void;
    parseCustomizationData(a: any): any;
    normalizeOrbCustomization(): void;
    getOrbTint(): any;
    syncColorPickerToOrb(): void;
    show(): Promise<void>;
    hide(): void;
    updateVisualizerWeapons(a?: any): void;
    migrateWeaponCustomizationKeys(): void;
    onPreviewWeaponSelected(a: any): void;
    onSelectCustomization(a: any, b?: boolean): void;
    isColorPickerTarget(a: any): boolean;
    onColorPickerPointerDownCapture(a: any): void;
    closeColorPicker(): boolean;
    onCustomizationSelected(a: any): void;
    createWeaponCustomization(a: any, b: any, c?: {}): {
        id: any;
        texture: any;
        data: any;
        cdata: any;
    };
    onEquipWeaponCustomization(a: any): void;
    onDisplayWeaponInProfile(a: any): void;
    displayPurchasePopup(a: any): void;
    onPurchasePanelUpdate(a: any): Promise<void>;
    selectPurchasedCustomization(a: any): boolean;
    reset(): void;
    validateForm(): {
        valid: boolean;
        error: string;
    };
    prepareCustomizationForSubmit(): any;
    onSubmitButtonReleased(): Promise<void>;
    onWeaponSaveButtonReleased(): Promise<void>;
    playSuccessParticles(a: any, b?: boolean): void;
    onPurchaseButtonReleased(): void;
    displayLoadingMessage(): void;
    displayCompletedMessage(): void;
    onCompletedButtonReleased(): void;
    onCancelButtonReleased(): void;
    onRewardButtonReleased(): void;
    disableRewardButton(): void;
    enableRewardButton(): void;
    displayLimitReached(): void;
    displayRewardCountdown(): void;
    triggerRewardedBreak(): void;
    claimRewards(): Promise<void>;
    displayRewardDialog(a?: boolean): void;
    update(a?: number): void;
    displayWarning(a?: string): void;
    displayErrorMessage(a: any): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    drawModeTab(a: any, b?: boolean): void;
    highlightModeTab /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateModeTabs(): void;
}
declare namespace CustomizationMenu {
    var PLAYER: string;
    var WEAPONS: string;
}
declare var inputfield: {};
declare class InputField extends PIXI.Container {
    id: any;
    focus: boolean;
    marker: PIXI.Text;
    text: PIXI.Text;
    passwordText: PIXI.BitmapText;
    previousText: string;
    background: PIXI.Graphics;
    focusIndicator: PIXI.Graphics;
    markingColor: number;
    minimal: boolean;
    textPaddingX: number;
    passwordPaddingX: number;
    passwordMode: boolean;
    allowUnicode: boolean;
    filterEnabled: boolean;
    domInput: HTMLInputElement | HTMLTextAreaElement | null;
    composing: boolean;
    compositionStartText: string;
    focusFrame: number | null;
    boundFocusUpdate: () => void;
    focusAncestors: any[];
    onAncestorRemoved: () => void;
    domPosition: {
        x: number;
        y: number;
    };
    filtered: string;
    inversed: boolean;
    mouseOver: boolean;
    noMouse: boolean;
    interactive: boolean;
    maxChars: number;
    boundGlobalPointerInputListener: any;
    boundGlobalInputListener: ((a: any) => void) | null;
    multiline: boolean;
    centerInput: boolean;
    forceUpperCase: boolean;
    forceLowerCase: boolean;
    autoScaleText: boolean;
    autoResize: boolean;
    configuredWidth: number;
    configuredHeight: number;
    boundOnInput: (a: any) => Promise<void>;
    caretBlinkInterval: number | null;
    caretVisible: boolean;
    menuStyle: boolean | undefined;
    constructor(a: any, b?: boolean, c?: number, d?: boolean);
    onInput(a: any): Promise<void>;
    applyInput /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    preProcessInput(a: any): string;
    isFiltered(a: any): boolean;
    setFilter /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    setUnicodeFilter(a: any): void;
    createDOMInput(): void;
    onDOMInput(): void;
    updateDOMInputPosition(): void;
    updateFocusedInput(): void;
    destroy(a: any): void;
    onMouseDown(a: any): void;
    onGlobalMouseDown(a: any): void;
    setFocus(a: any): void;
    setPassword(a: any): void;
    onMouseOver(a: any): void;
    onMouseOut(a: any): void;
    setMaxChars(a: any): void;
    setMultiline(a?: boolean): void;
    setText(a: any): void;
    getText(): string;
    setDimensions(a: any, b: any, c?: boolean): void;
    refreshBackground(): void;
    setMenuStyle(): void;
    layoutInputContent(): void;
    updateCaretPosition(): void;
    startCaretBlink(): void;
    stopCaretBlink(): void;
    focusAdjacentInput(a?: boolean): void;
    static isFocusable(a: any): boolean;
    static isOnStage(a: any): boolean;
    hideBorders(): void;
    markNone(): void;
    markValid(): void;
    markInvalid(): void;
}
declare namespace InputField {
    var SUBMIT: string;
    var FOCUS: string;
    var CHANGE: string;
    var TAB: number;
    var RegisteredFields: any[];
}
declare var imgbutton: {};
declare class ImgButton extends PIXI.Container {
    type: string;
    enabled: boolean;
    interactive: boolean;
    cursor: string;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    icon: PIXI.Graphics;
    constructor(a?: string, b?: boolean);
    draw(a?: boolean): void;
    mobileSetup(): void;
    onMouseOver(): void;
    onMouseDown(): void;
    onMouseOut(): void;
    setEnabled(a: any): void;
}
declare namespace ImgButton {
    var TYPE_CLOSE: string;
    var TYPE_MINIMIZE: string;
    var CLICK: string;
}
declare var socialmenu: {};
declare class SocialMenu extends Feature {
    autoCollapsed: boolean;
    down: boolean;
    dragging: boolean;
    collapsed: boolean;
    friends: any[];
    friendScrollRatio: number;
    invites: any[];
    inviteScrollRatio: number;
    members: any[];
    memberScrollRatio: number;
    clanInvitations: any[];
    clanInvitationScrollRatio: number;
    autoRefreshFriendsCounter: number;
    ignoreInput: boolean;
    oy: number;
    ox: number;
    friendsLastLoadedDate: number;
    interactive: boolean;
    titleLabel: PIXI.Text;
    listContainer: PIXI.Container<PIXI.ContainerChild>;
    scrollbar: SocialMenuScrollbar;
    friendsButton: SocialMenuTabButton;
    invitationsButton: SocialMenuTabButton;
    clanButton: SocialMenuTabButton;
    clanChatButton: SocialMenuTabButton;
    friendDropdown: FriendDropdown;
    clanDropdown: SocialMemberDropdown;
    friendText: PIXI.Text;
    infoText: PIXI.Text;
    collapseButton: SocialMenuToggleButton;
    dragPointerId: number;
    chatWindow: ChatWindow;
    goldWindow: GoldWindow;
    loadConversationInterval: number | null;
    mode: string | undefined;
    constructor();
    repositionForGame(): void;
    positionCollapsedGameButton(a?: any): void;
    repositionForMenu(): void;
    collapseMenu(a?: boolean, b?: boolean): void;
    maskFriendList(a: any): void;
    maskInvitationList(a: any): void;
    maskClanInvitationList(a: any): void;
    maskMemberList(a: any): void;
    refresh(): Promise<void>;
    loadConversations(): Promise<void>;
    loadFriends(a?: boolean): Promise<void>;
    loadInvitations(a?: boolean): Promise<void>;
    showFriendDropdown /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    showClanDropdown /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    showGoldForm(a: any): void;
    showChat /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    loadInvitees(): Promise<void>;
    loadClanMembers(a?: boolean): Promise<void>;
    loadClanInvitations(a?: boolean): Promise<void>;
    onInvitationsButtonReleased(): void;
    onFriendsButtonReleased(): void;
    onClanButtonReleased(): void;
    onClanChatButtonReleased(): void;
    show(): void;
    hide(): void;
    update(): void;
    collapse(): void;
    expand(): void;
    resize(a: any, b: any, c?: boolean): void;
    drawMenuBackground(): void;
}
declare namespace SocialMenu {
    var REFRESH: string;
    var ACCESS_PROFILE: string;
    var MODE_INVITATIONS: string;
    var MODE_INVITEES: string;
    var MODE_FRIENDS: string;
    var MODE_CLAN_INVITATIONS: string;
    var MODE_CLAN_MEMBERS: string;
    var SHOW_FRIEND_DROPDOWN: string;
    var SHOW_CLAN_DROPDOWN: string;
    var SHOW_CHAT: string;
    var SEND_GOLD: string;
    var MODE_GAME: boolean;
    var MENU_BUTTON_SCALE: number;
    var GAME_BUTTON_SCALE: number;
    var GAME_BUTTON_MARGIN: number;
    var Friends: {};
    var AutoRefreshFriends: number;
    var ListHeight: number;
    var ItemHeight: number;
    var TAB_TOP: number;
    var CONTENT_TOP: number;
    var drawListRow: (a: any, b?: boolean, c?: number) => void;
    var drawStatusDot: (a: any, b?: any) => void;
}
declare class SocialMenuToggleButton extends PIXI.Container {
    hovered: boolean;
    collapsed: boolean;
    eventMode: string;
    cursor: string;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    icon: PIXI.Graphics;
    constructor();
    setCollapsed(a: any): void;
    draw(): void;
}
declare class SocialMenuTabButton extends Button {
    hovered: boolean;
    active: boolean;
    hitArea: PIXI.IHitArea | null | undefined;
    constructor(a: any);
    disable(): void;
    setText(a: any): void;
    draw(): void;
    setTint(a: any): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare class FriendItem extends PIXI.Graphics {
    id: any;
    name: any;
    seen: Date;
    clan: any;
    interactive: boolean;
    nameLabel: PIXI.Text;
    constructor(a: any, b?: any, c?: any, d?: any);
}
declare class ClanMemberItem extends PIXI.Graphics {
    id: any;
    name: any;
    role: any;
    isFriend: boolean;
    seen: Date;
    interactive: boolean;
    nameLabel: PIXI.Text;
    roleLabel: PIXI.Text | undefined;
    constructor(a: any, b?: any, c?: any);
}
declare class AcceptClanInvitationItem extends PIXI.Graphics {
    id: any;
    clanName: any;
    initiatorName: any;
    interactive: boolean;
    nameLabel: PIXI.Text;
    acceptButton: Button;
    cancelButton: Button;
    constructor(a: any, b?: any, c?: any);
    onAccept(): Promise<void>;
    onDecline(): Promise<void>;
}
declare class AcceptInvitationItem extends PIXI.Graphics {
    id: any;
    name: any;
    userId: any;
    interactive: boolean;
    nameLabel: PIXI.Text;
    acceptButton: Button;
    cancelButton: Button;
    constructor(a: any, b?: any, c?: any);
    onAccept(): Promise<void>;
    onDecline(): Promise<void>;
}
declare class SocialMenuScrollbar extends PIXI.Graphics {
    scrolling: boolean;
    start: number;
    h: any;
    bh: number;
    oy: number;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace SocialMenuScrollbar {
    var SCROLL: string;
}
declare class FriendDropdown extends PIXI.Container {
    id: any;
    background: PIXI.Graphics;
    messageRow: FriendDropdownActionRow;
    unfriendRow: FriendDropdownActionRow;
    goldRow: FriendDropdownActionRow;
    clanRow: FriendDropdownActionRow;
    constructor();
    update(a: any): void;
    onUnfriend(): Promise<void>;
    onInviteToClan(): Promise<void>;
}
declare namespace FriendDropdown {
    var Action: {
        MESSAGE: string;
        SEND_GOLD: string;
        UNFRIEND: string;
        CLAN_INVITE: string;
    };
}
declare class FriendDropdownActionRow extends PIXI.Container {
    text: any;
    tintValue: number;
    background: PIXI.Graphics;
    actionText: PIXI.Text;
    confirmation: boolean;
    confirming: boolean;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    constructor(a: any, b: any, c: any, d?: boolean);
}
declare namespace FriendDropdownActionRow {
    var CONFIRM: string;
    var SELECT: string;
}
declare class SocialMemberDropdown extends PIXI.Container {
    id: any;
    background: PIXI.Graphics;
    messageRow: SocialMemberDropdownActionRow;
    constructor();
    onUnfriend(): Promise<void>;
}
declare namespace SocialMemberDropdown {
    var Action: {
        MESSAGE: string;
    };
}
declare class SocialMemberDropdownActionRow extends PIXI.Container {
    text: any;
    tintValue: number;
    background: PIXI.Graphics;
    actionText: PIXI.Text;
    confirmation: boolean;
    confirming: boolean;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    constructor(a: any, b: any, c: any, d?: boolean);
}
declare namespace SocialMemberDropdownActionRow {
    var CONFIRM: string;
    var SELECT: string;
}
declare class GoldWindow extends PIXI.Container {
    id: any;
    dragging: boolean;
    active: boolean;
    interactive: boolean;
    background: PIXI.Graphics;
    ox: number;
    oy: number | PIXI.FederatedPointerEvent;
    title: PIXI.Text;
    errorMsg: PIXI.Text;
    inputField: InputField;
    constructor();
    load(a: any): void;
    onSubmitGold(a: any): Promise<void>;
}
declare class ChatWindow extends PIXI.Graphics {
    id: any;
    dragging: boolean;
    interactive: boolean;
    active: boolean;
    convo: any;
    messages: any[];
    oy: number;
    ox: number;
    title: PIXI.Text;
    scrollbar: SocialMenuScrollbar;
    closeButton: ImgButton;
    inputField: InputField;
    constructor();
    onSubmitMessage(a: any): Promise<void>;
    loadConversation(a: any): void;
}
declare namespace ChatWindow {
    var Conversations: {};
    var CLOSE: string;
    var PutMessage: (a: any, b?: any) => void;
    var UpdateConversations: (a: any) => void;
    var MaxMessages: number;
}
declare var rankingmenu: {};
declare class RankingMenu extends Feature {
    lastRefresh: number;
    panelWidth: number;
    panelHeight: number;
    background: PIXI.Graphics;
    tablePanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    display: string;
    titleText: PIXI.Text;
    closeButton: ImgButton;
    globalRankingButton: PIXI.Graphics;
    globalRankingLabel: PIXI.Text;
    skillRankingButton: PIXI.Graphics;
    skillRankingLabel: PIXI.Text;
    weaponStatsButton: PIXI.Graphics;
    weaponStatsLabel: PIXI.Text;
    globalRankingContainer: PIXI.Container<PIXI.ContainerChild>;
    skillRankingContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponStatsContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponTypeContainer: PIXI.Container<PIXI.ContainerChild>;
    nameText: PIXI.Text;
    levelText: PIXI.Text;
    experienceText: PIXI.Text;
    socialGlText: PIXI.Text;
    globalRankingTableContainerMask: PIXI.Graphics;
    globalRankingTableContainer: PIXI.Container<PIXI.ContainerChild>;
    globalRanking: GlobalRankingScrollbar;
    nameSkillText: PIXI.Text;
    skillTitleText: PIXI.Text;
    skillText: PIXI.Text;
    socialText: PIXI.Text;
    skillRankingTableContainerMask: PIXI.Graphics;
    skillRankingTableContainer: PIXI.Container<PIXI.ContainerChild>;
    skillRanking: SkillRankingScrollbar;
    weaponTypeText: PIXI.Text;
    weaponKillsText: PIXI.Text;
    weaponStatsTableContainerMask: PIXI.Graphics;
    weaponStatsTableContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponStats: WeaponStatsScrollbar;
    weaponTypeIcon: string | null;
    weaponTypeLabel: PIXI.Text;
    weaponTypeNameText: PIXI.Text;
    weaponTypeKillsText: PIXI.Text;
    weaponTypeTableContainerMask: PIXI.Graphics;
    weaponTypeTableContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponType: WeaponTypeStatsScrollbar;
    constructor();
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onCloseButtonReleased(): void;
    show(): Promise<void>;
    hide(): void;
    displayGlobalRanking(): void;
    displaySkillRanking(): void;
    displayWeaponStats(): void;
    updateTabStates(): void;
    displayWeaponUsers(a: any): Promise<void>;
}
declare namespace RankingMenu {
    var GLOBAL_RANKING: string;
    var SKILL_RANKING: string;
    var WEAPON_STATS: string;
    var WEAPON_USERS: string;
    var Columns: {
        name: number;
        level: number;
        experience: number;
        title: number;
        skill: number;
        youtube: number;
        twitch: number;
        kills: number;
    };
    var paintRowBackground: (a: any, b: any, c: any, d: any, e?: boolean) => void;
    var drawRowBackground: (a: any, b?: any, c?: any, d?: any) => void;
    var drawScrollbar: (a: any, b?: any, c?: any) => void;
}
declare class GlobalRankingTableRow extends PIXI.Container {
    index: any;
    interactive: boolean;
    background: PIXI.Graphics;
    icon: PIXI.Sprite;
    rankText: PIXI.Text;
    nameText: PIXI.Text;
    levelText: PIXI.Text;
    experienceText: PIXI.Text;
    ytIcon: PIXI.Sprite;
    twIcon: PIXI.Sprite;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any);
}
declare class GlobalRankingScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace GlobalRankingScrollbar {
    var SCROLL: string;
}
declare class SkillRankingTableRow extends PIXI.Container {
    index: any;
    interactive: boolean;
    background: PIXI.Graphics;
    ratingIcon: PIXI.Sprite;
    rankText: PIXI.Text;
    nameText: PIXI.Text;
    titleText: PIXI.Text;
    skillText: PIXI.Text;
    ytIcon: PIXI.Sprite;
    twIcon: PIXI.Sprite;
    constructor(a: any, b: any, c: any, d: any, e: any, f?: string, g?: string);
}
declare class SkillRankingScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace SkillRankingScrollbar {
    var SCROLL: string;
}
declare class WeaponStatsTableRow extends PIXI.Container {
    id: string;
    index: any;
    interactive: boolean;
    background: PIXI.Graphics;
    icon: string | null;
    nameText: PIXI.Text;
    killsText: PIXI.Text;
    constructor(a: any, b?: any, c?: any);
}
declare class WeaponStatsScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace WeaponStatsScrollbar {
    var SCROLL: string;
}
declare class WeaponTypeStatsTableRow extends PIXI.Container {
    index: any;
    interactive: boolean;
    background: PIXI.Graphics;
    icon: PIXI.Sprite;
    indexText: PIXI.Text;
    nameText: PIXI.Text;
    killsText: PIXI.Text;
    constructor(a: any, b?: any, c?: any, d?: any);
}
declare class WeaponTypeStatsScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace WeaponTypeStatsScrollbar {
    var SCROLL: string;
}
declare var newsmenu: {};
declare class NewsMenu extends Feature {
    panelWidth: number;
    panelHeight: number;
    newsPanelX: number;
    newsPanelY: number;
    newsPanelWidth: number;
    newsPanelHeight: number;
    newsListX: number;
    newsListY: number;
    newsListWidth: number;
    newsListHeight: number;
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    loadError: boolean;
    loading: boolean;
    newsContentHeight: number;
    pageRequestId: number;
    background: PIXI.Graphics;
    newsPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    closeButton: ImgButton;
    newsTitle: PIXI.Text;
    newsItemContainerMask: PIXI.Graphics;
    newsItemContainer: PIXI.Container<PIXI.ContainerChild>;
    newsScrollbar: NewsScrollbar;
    previousPageButton: ProfileActionButton;
    nextPageButton: ProfileActionButton;
    pageLabel: PIXI.Text;
    constructor();
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    show(): Promise<void>;
    loadPage(a: any): Promise<void>;
    renderNews(a: any): void;
    centerPageLabel(): void;
    updatePaginationControls(): void;
    hide(): void;
}
declare namespace NewsMenu {
    var drawScrollbar: (a: any, b?: any) => void;
    var plainText: (a: any) => string;
}
declare class NewsItem extends PIXI.Container {
    background: PIXI.Graphics;
    dateBadge: PIXI.Graphics;
    dateText: PIXI.Text;
    title: PIXI.Text;
    message: PIXI.Text;
    itemHeight: number;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any);
}
declare class NewsScrollbar extends PIXI.Container {
    start: number;
    h: any;
    trackTop: number;
    thumbHeight: number;
    trackHeight: number;
    contentHeight: number;
    thumbTravel: number;
    viewportHeight: any;
    ratio: number;
    maxScroll: number;
    scrolling: boolean;
    dragOffset: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    scrollPointerId: number;
    wheelListener: (c: any) => void;
    scrollable: boolean | undefined;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    pointerY(a: any): any;
    stopScrolling(): void;
    setMetrics /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    drawThumb(): void;
    clampRatio(a: any): number;
    updateThumbPosition(): void;
    setRatio(a: any, b?: boolean): void;
    setThumbY(a: any): void;
    scrollByPixels(a: any): void;
    reset(): void;
}
declare namespace NewsScrollbar {
    var SCROLL: string;
}
declare var pvpmenu: {};
declare class PVPMenu extends Feature {
    panelWidth: number;
    panelHeight: number;
    panelX: number;
    panelY: number;
    background: PIXI.Graphics;
    selectorPanel: PIXI.Graphics;
    arenaPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    startCount: number;
    initializingMatch: boolean;
    startingMatch: boolean;
    findingMatch: boolean;
    errorState: boolean;
    startInterval: number | null;
    closeButton: ImgButton;
    pvpTitle: PIXI.Text;
    pvpDesc: PIXI.Text;
    matchButton: ProfileActionButton;
    cancelButton: ProfileActionButton;
    vsText: PIXI.Text;
    loadingText: PIXI.Text;
    rulesButton: ProfileActionButton;
    rulesPanel: PIXI.Graphics;
    rulesTextTitle: PIXI.Text;
    rulesTextDesc: PIXI.Text;
    startingText: PIXI.Text;
    counterText: PIXI.Text;
    regionList: Dropdown;
    modeList: Dropdown;
    visualizer1: Visualizer;
    p1Name: PIXI.Text;
    shadow1: PIXI.Graphics;
    visualizer2: Visualizer;
    p2Name: PIXI.Text;
    shadow2: PIXI.Graphics;
    opponentGlow: PIXI.Graphics;
    opponentSilhouette: Thumbnail;
    particleContainer: ParticleContainer;
    particles: any[];
    findingTime: number;
    findingEmission: number;
    fxEmission: number;
    fxCounter: number;
    searchTrail: any;
    searchPulse: any;
    disconnectTimeout: number | null;
    selectedRegion: any;
    constructor();
    displayRules(): void;
    hideRules(): void;
    toggleRules(): void;
    hide(): void;
    onModeListSelect(a: any): void;
    show(): Promise<void>;
    update(a?: number): void;
    displayMatch(a: any): void;
    onStartCount(a: any): void;
    onRegionListSelect(a: any): void;
    onMatchButtonReleased(): void;
    attemptConnect(): void;
    onCancelButtonReleased(): void;
    onPVPClientConnect(): void;
    setLoadingText(a: any): void;
    onPVPClientDisconnect(a: any): void;
    onPVPConnectionError(): void;
}
declare namespace PVPMenu {
    var _c: {};
    export { _c as TextCache };
    export var TextFromCache: (a: any) => any;
}
declare var partnermenu: {};
declare class PartnerMenu extends Feature {
    partners: {
        title: string;
        url: string;
    }[];
    background: PIXI.Graphics;
    ox: number;
    oy: number;
    closeButton: ImgButton;
    partnerTitle: PIXI.BitmapText;
    constructor();
    show(): void;
}
declare var serverlistmenu: {};
declare class ServerListMenu extends Feature {
    oy: number;
    ox: number;
    gameList: any[];
    activeMode: string;
    activeRegion: string;
    activePrivate: string;
    activeRanked: string;
    activeCustom: string;
    sortedCol: string;
    playerSort: string;
    nameSort: string;
    regionSort: string;
    modeSort: string;
    panelWidth: number;
    panelHeight: number;
    listPanelX: number;
    listPanelY: number;
    listPanelWidth: number;
    listPanelHeight: number;
    listHeaderY: number;
    listRowsY: number;
    listRowsHeight: number;
    footerY: number;
    background: PIXI.Graphics;
    filterPanel: PIXI.Graphics;
    tablePanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    closeButton: ImgButton;
    serverListingTitle: PIXI.Text;
    passwordLabel: PIXI.Text;
    passwordField: InputField;
    filterPrivate: Checkbox;
    privateIcon: PIXI.Sprite;
    filterRanked: Checkbox;
    rankedIcon: PIXI.Sprite;
    filterCustom: Checkbox;
    customIcon: PIXI.Sprite;
    modeText: PIXI.Text;
    regionText: PIXI.Text;
    nameText: PIXI.Text;
    skillText: PIXI.Text;
    playersText: PIXI.Text;
    modeSorting: PIXI.Graphics;
    regionSorting: PIXI.Graphics;
    nameSorting: PIXI.Graphics;
    playerSorting: PIXI.Graphics;
    skillHeading: PIXI.Graphics;
    serverInfoText: PIXI.Text;
    refreshButton: ProfileActionButton;
    serverListContainer: PIXI.Container<PIXI.ContainerChild>;
    serverListTableContainerMask: PIXI.Graphics;
    serverListTableContainer: PIXI.Container<PIXI.ContainerChild>;
    serverListScrollbar: ServerListScrollbar;
    modeList: Dropdown;
    regionList: Dropdown;
    constructor();
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateSortTabs(): void;
    onModeListSelect(a: any): void;
    onRegionListSelect(a: any): void;
    show(): void;
    hide(): void;
    refresh(): Promise<void>;
    sort(a?: string, b?: string, c?: string, d?: string): void;
    filter(a?: string, b?: string, c?: string, d?: string, e?: string): void;
    setPasswordInvalid(): void;
}
declare namespace ServerListMenu {
    var MODE_ALL: string;
    var REGION_ALL: string;
    var PRIVATE_ALL: string;
    var RANKED_ALL: string;
    var CUSTOM_ALL: string;
    var MODE_DEATHMATCH: string;
    var MODE_TEAM_DEATHMATCH: string;
    var MODE_CAPTURE_THE_FLAG: string;
    var MODE_DODGEBALL: string;
    var MODE_TRAINING: string;
    var MODE_ZOMBIE_SURVIVAL: string;
    var MODE_1V1: string;
    var REGION_NA_EAST: string;
    var REGION_EU_WEST: string;
    var REGION_AS_SOUTH: string;
    var REGION_MAP: {
        [ServerListMenu.REGION_NA_EAST]: string;
        [ServerListMenu.REGION_EU_WEST]: string;
        [ServerListMenu.REGION_AS_SOUTH]: string;
    };
    var SORT_UP: string;
    var SORT_DOWN: string;
    var SORT_DEFAULT: string;
    var COL_MODE: string;
    var COL_REGION: string;
    var COL_NAME: string;
    var COL_PLAYERS: string;
    var drawRowBackground: (a: any, b: any, c?: boolean) => void;
    var normalizeGameList: (a: any) => any;
    var matchesFilters: (a: any, b?: any, c?: any, d?: any, e?: any, f?: any) => boolean;
    var drawScrollbar: (a: any, b?: any, c?: any) => void;
}
declare class ServerListTableRow extends PIXI.Container {
    id: any;
    index: any;
    background: PIXI.Graphics;
    hitArea: PIXI.Rectangle;
    interactive: boolean;
    hovering: boolean;
    modeIcon: PIXI.Sprite;
    regionIcon: PIXI.Sprite;
    regionText: any;
    nameText: any;
    mapText: any;
    ratingTag: PIXI.Sprite;
    playerText: any;
    privateIcon: PIXI.Sprite | undefined;
    rankedIcon: PIXI.Sprite | undefined;
    customIcon: PIXI.Sprite | undefined;
    joinButton: ProfileActionButton;
    spectateButton: Button;
    spectatorText: any;
    mapImageLoaded: boolean;
    mapImage: PIXI.Sprite;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, k?: any, l?: any, m?: any, n?: any);
    loadMapImage(a: any): Promise<void>;
    onImageLoaded(a: any): void;
    displayMapDetails(a: any): void;
    hideMapDetails(): void;
    alignMapImage(): void;
}
declare namespace ServerListTableRow {
    var TextCacheKey: string;
    var JOIN_GAME: string;
    var SPECTATE_GAME: string;
    var DISPLAY_DETAILS: string;
}
declare class ServerListScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace ServerListScrollbar {
    var SCROLL: string;
}
declare var servercustomizationmenu: {};
declare class ServerCustomizationMenu extends Feature {
    ox: number;
    oy: number;
    panelWidth: number;
    panelHeight: number;
    maps: any[];
    drops: any[];
    settings: {
        maps: never[];
        weapons: never[];
        drops: never[];
        shuriken: boolean;
    };
    selectedMode: any;
    backplate: PIXI.Graphics;
    background: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    weaponPanel: PIXI.Graphics;
    mapPanel: PIXI.Graphics;
    dropPanel: PIXI.Graphics;
    serverCustomizationTitle: PIXI.Text;
    weaponTypeLabel: PIXI.Text;
    weaponCheck: Checkbox;
    mapLabel: PIXI.Text;
    mapCheck: Checkbox;
    dropLabel: PIXI.Text;
    dropCheck: Checkbox;
    acceptButton: ProfileActionButton;
    selectedScrollbar: SelectionListScrollbar | null;
    weaponListContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponListTableContainerMask: PIXI.Graphics;
    weaponListTableContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponSelectionListScrollbar: SelectionListScrollbar;
    mapListContainer: PIXI.Container<PIXI.ContainerChild>;
    mapListTableContainerMask: PIXI.Graphics;
    mapListTableContainer: PIXI.Container<PIXI.ContainerChild>;
    mapSelectionListScrollbar: SelectionListScrollbar;
    dropListContainer: PIXI.Container<PIXI.ContainerChild>;
    dropListTableContainerMask: PIXI.Graphics;
    dropListTableContainer: PIXI.Container<PIXI.ContainerChild>;
    dropSelectionListScrollbar: SelectionListScrollbar;
    setShuriken: Checkbox;
    mapImage: PIXI.Sprite;
    constructor();
    show(): void;
    hide(): void;
    onSetShuriken(a: any): void;
    onWeaponSelectionChange /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onMapSelectionChange /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onDropSelectionChange /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onAccept(): void;
    onCancel(): void;
    loadContent(): Promise<void>;
    setMode(a: any): void;
    loadMapImage(a: any): Promise<void>;
    onImageLoaded(a: any): void;
    filterMaps(): void;
}
declare namespace ServerCustomizationMenu {
    var TitleTextStyle: () => PIXI.TextStyle;
    var drawSelectionRowBackground: (a: any, b: any, c: any, d?: boolean) => void;
    var updateSelectionRowVisual: (a: any) => void;
    var ACCEPT: string;
    var CANCEL: string;
    var INIT: string;
    var SHOW: string;
}
declare class WeaponSelectionListTableRow extends PIXI.Container {
    id: any;
    index: any;
    selected: boolean;
    interactive: boolean;
    hovered: boolean;
    background: PIXI.Graphics;
    icon: any;
    nameText: PIXI.Text;
    constructor(a: any, b?: any, c?: any);
    change(): void;
}
declare namespace WeaponSelectionListTableRow {
    var CHANGE: string;
}
declare class MapSelectionListTableRow extends PIXI.Container {
    id: any;
    index: any;
    selected: boolean;
    interactive: boolean;
    hovered: boolean;
    background: PIXI.Graphics;
    icon: PIXI.Sprite;
    nameText: PIXI.Text;
    constructor(a: any, b?: any, c?: any, d?: any);
    change(): void;
}
declare namespace MapSelectionListTableRow {
    var CHANGE: string;
    var HOVER: string;
    var HOVER_END: string;
}
declare class DropSelectionListTableRow extends PIXI.Container {
    id: any;
    index: any;
    selected: boolean;
    interactive: boolean;
    hovered: boolean;
    background: PIXI.Graphics;
    icon: any;
    nameText: PIXI.Text;
    constructor(a: any, b?: any, c?: any, d?: any);
    change(): void;
}
declare namespace DropSelectionListTableRow {
    var CHANGE: string;
}
declare class SelectionListScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace SelectionListScrollbar {
    var SCROLL: string;
}
declare var servercreationmenu: {};
declare class ServerCreationMenu extends Feature {
    panelWidth: number;
    panelHeight: number;
    sectionPanelX: number;
    sectionPanelWidth: number;
    optionsPanelHeight: number;
    modePanelHeight: number;
    namePanelHeight: number;
    price: number;
    duration: string;
    mode: string;
    customization: {
        maps: never[];
        weapons: never[];
        drops: never[];
        shuriken: boolean;
    };
    isPrivate: boolean;
    isRanked: boolean;
    isCustom: boolean;
    onClientConnectBinding: () => void;
    createdServerName: string;
    createdServerId: number;
    background: PIXI.Graphics;
    optionsPanel: PIXI.Graphics;
    modePanel: PIXI.Graphics;
    pricePanel: PIXI.Graphics;
    namePanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    closeButton: ImgButton;
    customizationMenu: ServerCustomizationMenu;
    confirmationPanelWidth: number;
    confirmationPanelHeight: number;
    confirmationBackground: PIXI.Graphics;
    confirmationContainer: PIXI.Container<PIXI.ContainerChild>;
    confirmationAccept: ProfileActionButton;
    confirmationDecline: ProfileActionButton;
    serverCreationConfirmationTitle: PIXI.Text;
    confirmationInfoTitle: PIXI.Text;
    errorMessage: PIXI.Text;
    successPanelWidth: number;
    successPanelHeight: number;
    successBackground: PIXI.Graphics;
    successContainer: PIXI.Container<PIXI.ContainerChild>;
    serverCreationSuccessTitle: PIXI.Text;
    successInfoTitle: PIXI.Text;
    successAccept: ProfileActionButton;
    toLobbyAccept: ProfileActionButton;
    serverCreationTitle: PIXI.Text;
    serverCreationTypeLabel: PIXI.Text;
    customizationButton: ProfileActionButton;
    createButton: ProfileActionButton;
    setPrivate: Checkbox;
    privateIcon: PIXI.Sprite;
    setRanked: Checkbox;
    rankedIcon: PIXI.Sprite;
    setCustom: Checkbox;
    customIcon: PIXI.Sprite;
    serverCreationPriceLabel: PIXI.Text;
    goldIcon: PIXI.Sprite;
    serverCreationPriceValue: PIXI.Text;
    serverCreationNameLabel: PIXI.Text;
    nameField: InputField;
    serverCreationPasswordLabel: PIXI.Text;
    passwordField: InputField;
    serverCreationModeLabel: PIXI.Text;
    modeList: Dropdown;
    serverCreationDurationLabel: PIXI.Text;
    durationList: Dropdown;
    serverList: Dropdown;
    constructor();
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    show(): void;
    onModeListSelect(a: any): void;
    onDurationListSelect(a: any): void;
    onSetPrivate(a: any): void;
    onSetRanked(a: any): void;
    onSetCustom(a: any): void;
    updatePrice(): void;
    onCustomizeServerInit(): void;
    onCreateServerCancel(): void;
    setErrorMessage(a?: string): void;
    onClientConnect(): void;
    onClientDisconnect(): void;
    onCreateServerInit(): Promise<void>;
    hideConfirmationContainer(): void;
    disableCreationInput(): void;
    enableCreationInput(): void;
    onCreateServerConfirm(): Promise<void>;
    setCreatedStatus(a: any): void;
    onSuccessJoinGameAccept(): void;
    onSuccessToLobbyAccept(): void;
}
declare namespace ServerCreationMenu {
    var TitleTextStyle: () => PIXI.TextStyle;
    var DURATION_A: string;
    var DURATION_B: string;
    var DURATION_C: string;
    var DURATION_D: string;
    var DURATION_E: string;
    var DURATION_F: string;
    var DURATION_G: string;
    var DURATION_PRICE_MAP: {
        [ServerCreationMenu.DURATION_A]: number;
        [ServerCreationMenu.DURATION_B]: number;
        [ServerCreationMenu.DURATION_C]: number;
        [ServerCreationMenu.DURATION_D]: number;
        [ServerCreationMenu.DURATION_E]: number;
        [ServerCreationMenu.DURATION_F]: number;
        [ServerCreationMenu.DURATION_G]: number;
    };
}
declare var chatclient: {};
declare class ChatClient extends PIXI.EventEmitter {
    socket: WebSocket | null;
    constructor();
    connect(a: any): void;
    disconnect(): void;
    onOpen(a: any): void;
    onMessage(a: any): void;
    onClose(a: any): void;
    onError(a: any): void;
    compose /** @param {any} [b] */(a?: number, b?: any): string;
    send /** @param {any} [b] */(a?: number, b?: any): void;
    isConnected(): boolean;
}
declare namespace ChatClient {
    var TYPE_LOCAL: number;
    var TYPE_JOIN_CLAN_CHAT: number;
    var TYPE_LEAVE_CLAN_CHAT: number;
    var TYPE_MSG: number;
    var TYPE_STATUS: number;
    var MSG_PUBLIC: number;
    var MSG_CLAN: number;
    var MSG_FRIEND: number;
    var SERVER_DOMAIN: string;
    var SERVER_PORT: number;
    var CONNECT: string;
    var DISCONNECT: string;
    var MESSAGE: string;
    var STATUS: string;
}
declare var clanchatmenu: {};
declare class ClanChatMenu extends Feature {
    client: ChatClient;
    messages: any[];
    lines: any[];
    down: boolean;
    dragging: boolean;
    panelWidth: number;
    panelHeight: number;
    inputHeight: number;
    background: PIXI.Graphics;
    headerBackground: PIXI.Graphics;
    messageBackground: PIXI.Graphics;
    title: PIXI.Text;
    inputField: InputField;
    sendButton: ProfileActionButton;
    closeButton: ImgButton;
    dragPointerId: any;
    ox: number | undefined;
    oy: any;
    constructor();
    bindDragSurface(a: any): void;
    onDragStart(a: any): void;
    onDragEnd(a: any): void;
    onDragMove(a: any): void;
    getDragScale(): {
        x: number;
        y: number;
    };
    onSubmitMessage(a: any): Promise<void>;
    onMessage(a: any): void;
    onStatus(a: any): void;
    addMessage(a: any): void;
    updateConversation(): void;
    addLocalInfoMessage(a: any): void;
    removeMessages(): void;
    onConnect(): void;
    onDisconnect(): void;
    show(): void;
    hide(): void;
}
declare namespace ClanChatMenu {
    var MaxMessages: number;
}
declare var clanmenu: {};
declare class ClanMenu extends Feature {
    searchTimeout: any;
    members: any[];
    clanPhotoMembers: any[];
    panelWidth: number;
    panelHeight: number;
    memberPanelX: number;
    memberPanelY: number;
    memberPanelWidth: number;
    memberPanelHeight: number;
    statsPanelX: number;
    statsPanelY: number;
    statsPanelWidth: number;
    statsPanelHeight: number;
    memberListY: number;
    memberListHeight: number;
    background: PIXI.Graphics;
    memberPanel: PIXI.Graphics;
    statsPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    searchValue: string;
    titleText: PIXI.Text;
    closeButton: ImgButton;
    uploadText: PIXI.Text;
    nameText: PIXI.Text;
    memberText: PIXI.Text;
    statsText: PIXI.Text;
    levelIcon: PIXI.Sprite;
    levelLabel: PIXI.Text;
    levelText: PIXI.Text;
    levelRankLabel: PIXI.Text;
    levelRankText: PIXI.Text;
    skillRankLabel: PIXI.Text;
    skillRankText: PIXI.Text;
    killsLabel: PIXI.Text;
    killsText: PIXI.Text;
    deathsLabel: PIXI.Text;
    deathsText: PIXI.Text;
    ctfLabel: PIXI.Text;
    ctfText: PIXI.Text;
    clanPhotoButton: ProfileActionButton;
    createdText: PIXI.Text;
    listContainer: PIXI.Container<PIXI.ContainerChild>;
    memberListContainer: PIXI.Container<PIXI.ContainerChild>;
    scrollbar: ClanMemberListScrollbar;
    clanPhotoPanel: ClanPhotoPanel;
    constructor();
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    resizeClanPhotoPanel /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    raisePhotoPanelLayer(): void;
    restorePhotoPanelLayer(): void;
    show(a: any): void;
    hide(): void;
    loadClan(a: any): Promise<void>;
    onClanPhotoButtonReleased(): void;
    maskMemberList(a: any): void;
}
declare namespace ClanMenu {
    var ACCESS_PROFILE: string;
    var drawScrollbar: (a: any, b?: any, c?: any) => void;
    var drawMemberRowBackground: (a: any, b: any, c?: boolean) => void;
}
declare class ClanMemberListScrollbar extends PIXI.Container {
    scrolling: boolean;
    start: number;
    h: any;
    bh: number;
    oy: number;
    scrollBar: PIXI.Graphics;
    scrollButton: PIXI.Graphics;
    scrollPointerId: number | null;
    wheelListener: (c: any) => void;
    constructor(a: any, b?: number);
    enableWheel(): void;
    disableWheel(): void;
    scroll(a: any): void;
    reset(): void;
    onMouseOver(): void;
    onMouseOut(): void;
}
declare namespace ClanMemberListScrollbar {
    var SCROLL: string;
    var ItemHeight: number;
}
declare class ClanMemberMenuItem extends PIXI.Container {
    index: any;
    id: any;
    name: any;
    role: any;
    options: any;
    background: PIXI.Graphics;
    nameLabel: PIXI.Text;
    roleLabel: PIXI.BitmapText | undefined;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any);
}
declare namespace ClanMemberMenuItem {
    var RowHeight: number;
}
declare var loadingmenu: {};
declare class LoadingMenu extends Feature {
    panelWidth: number;
    panelHeight: number;
    modalWidth: number;
    modalHeight: number;
    modalX: number;
    modalY: number;
    visualizerSize: number;
    visualizerScale: number;
    previewSize: number;
    previewGap: number;
    background: PIXI.Graphics;
    modalPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    previewPanel: PIXI.Graphics;
    cancelCount: number;
    title: PIXI.Text;
    statusText: PIXI.Text;
    visualizer: Visualizer;
    cancelButton: ProfileActionButton;
    constructor();
    update(a?: number): void;
    show(): void;
    setTitle(a: any): void;
    setConnectionFailed(): void;
    layout(): void;
}
declare namespace LoadingMenu {
    var CANCEL_COUNT: number;
}
declare var renamemenu: {};
declare class RenameMenu extends Feature {
    panelWidth: number;
    panelHeight: number;
    background: PIXI.Graphics;
    formPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    fieldsPanel: PIXI.Graphics;
    ox: number;
    oy: number;
    closeButton: ImgButton;
    loginTitle: PIXI.Text;
    renameDescription: PIXI.Text;
    usernameTitle: PIXI.Text;
    passwordTitle: PIXI.Text;
    errorMessage: PIXI.Text;
    nameField: InputField;
    passwordField: InputField;
    submitButton: LoginActionButton;
    loadingContainer: PIXI.Container<PIXI.ContainerChild>;
    loadingBackground: PIXI.Graphics;
    loadingText: PIXI.Text;
    completedContainer: PIXI.Container<PIXI.ContainerChild>;
    completedBackground: PIXI.Graphics;
    completedHeaderLine: PIXI.Graphics;
    completedText: PIXI.Text;
    completedButton: LoginActionButton;
    constructor();
    show(): void;
    reset(): void;
    validateForm(): {
        valid: boolean;
        error: string;
    };
    onSubmitButtonReleased(): Promise<void>;
    displayLoadingMessage(): void;
    displayCompletedMessage(): void;
    onCompletedButtonReleased(): void;
    onCancelButtonReleased(): void;
    displayErrorMessage(a: any): void;
}
declare var logoutmenu: {};
declare class LogoutMenu extends Feature {
    panelWidth: number;
    panelHeight: number;
    formPanelWidth: number;
    formPanelHeight: number;
    formPanelX: number;
    formPanelY: number;
    actionPanelWidth: number;
    actionPanelHeight: number;
    background: PIXI.Graphics;
    formPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    actionPanel: PIXI.Graphics;
    ox: number;
    oy: number;
    closeButton: ImgButton;
    loginTitle: PIXI.Text;
    autogenDescription: PIXI.Text;
    renameButton: ProfileActionButton;
    logoutButton: ProfileActionButton;
    constructor();
    show(a?: boolean): void;
    reset(): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateTitlePosition(): void;
    layoutButtons(a: any): void;
    onRenameButtonReleased(): void;
    onLogoutButtonReleased(): void;
}
declare var fastdebuglinerenderer: {};
declare class FastDebugLineRenderer extends PIXI.Mesh {
    positionBuffer: PIXI.Buffer;
    colorBuffer: number;
    positionData: Float32Array<ArrayBuffer>;
    colorData: Uint8Array<ArrayBuffer>;
    vertexCapacity: number;
    drawState: {
        vertexCount: number;
    };
    eventMode: string;
    cullable: boolean;
    interactive: boolean;
    constructor(a?: number);
    begin(): void;
    line(a: any, b: any, c: any, d: any, e: any, f?: number): void;
    end(): void;
    ensureVertexCapacity(a: any): void;
    destroy(a: any): void;
    static getShader(): any;
}
declare namespace FastDebugLineRenderer {
    var Shader: PIXI.Shader;
    var GlVertexSource: string;
    var GlFragmentSource: string;
    var GpuSource: string;
}
declare var box2ddebugdraw: {};
declare class Box2DDebugDraw extends FastDebugLineRenderer {
    pixelsPerMeter: any;
    nodeStack: any[];
    seenBodies: Set<any>;
    lowerY: number;
    lowerX: number;
    upperY: number;
    upperX: number;
    constructor(a: any);
    update /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    setViewport(a: any): void;
    aabbIntersectsViewport(a: any): boolean;
    drawTreeAABB /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    drawAABB /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    drawFixture(a: any): void;
    getFixtureColor(a: any): number;
    drawCircle /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    drawPolygon /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    drawEdge /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    drawBodyVelocity(a: any): void;
    static createLegend(): PIXI.Text;
}
declare namespace Box2DDebugDraw {
    var StaticBody: number;
    var KinematicBody: number;
    var CircleShape: number;
    var PolygonShape: number;
    var EdgeShape: number;
    var CircleSegments: number;
    var VelocitySeconds: number;
    var MaxVelocityLength: number;
    var ArrowLength: number;
    var ViewPadding: number;
    var Colors: {
        Static: number;
        Dynamic: number;
        Kinematic: number;
        Sleeping: number;
        Inactive: number;
        Sensor: number;
        Velocity: number;
    };
    var LegendText: string;
}
declare var touchcontrols: {};
declare class TouchStick extends PIXI.Container {
    aim: any;
    onChange: any;
    pointerId: number | null;
    radius: number;
    localPoint: PIXI.Point;
    eventMode: string;
    interactiveChildren: boolean;
    hitArea: PIXI.Circle;
    ring: PIXI.Graphics;
    knob: PIXI.Graphics;
    label: any;
    constructor(a: any, b?: any, c?: any);
    move(a: any): void;
    release(a?: number | null): void;
}
declare class TouchSpectator extends PIXI.Container {
    onGesture: any;
    pointers: Map<any, any>;
    eventMode: string;
    hitArea: PIXI.Rectangle;
    started: number;
    fingers: number;
    tap: boolean;
    distance: any;
    constructor(a: any);
    pinchDistance(): number;
    move(a: any): void;
    release(a: any, b?: boolean): void;
    reset(): void;
}
declare class TouchControls extends PIXI.Container {
    onAction: any;
    onAim: any;
    onInterface: any;
    onCommit: () => void;
    actionSources: any;
    buttons: any;
    enabled: boolean;
    eventMode: string;
    spectator: TouchSpectator;
    gameplay: PIXI.Container<PIXI.ContainerChild>;
    movement: TouchStick;
    targeting: TouchStick;
    toolbar: PIXI.Container<PIXI.ContainerChild>;
    utilityButtons: any[];
    nativeRelease: (f: any) => void;
    resetListener: () => void;
    layoutSettings: any;
    layoutWidth: number | undefined;
    layoutHeight: number | undefined;
    constructor(a: any, b: any, c: any, d?: () => void, e?: () => void);
    static label /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    static capture(a: any): void;
    createAction /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    setAction /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    releasePointer(a: any): void;
    reset(): void;
    sync(a: any, b: any, c: any, d?: boolean): void;
    layout(a?: {}): void;
}
declare var game: {};
declare class Game extends PIXI.Container {
    sessionId: any;
    backgroundNetworkTimeout: number | null;
    backgroundNetworkActive: boolean;
    settings: any;
    clients: {};
    numClients: number;
    trackIndex: number;
    zombieCountdownAnnouncement: any;
    zombieWaveState: {
        active: any;
        wave: any;
        next: any;
        ended: any;
    } | null;
    canvas: Canvas;
    manager: Manager;
    onKeyDownListener: (b: any) => void;
    onKeyUpListener: (b: any) => void;
    onDisplayAdButton: any;
    mode: any;
    mutePref: boolean;
    readyToSpawn: boolean;
    lastSentControls: Player | null;
    inputSeq: number;
    lastSentPointer: number;
    lastSentFacing: number;
    hud: Hud;
    lastInputUpdateTime: number;
    reticle: PIXI.Sprite;
    busyTimeout: number | null;
    reticleLine: PIXI.Sprite | undefined;
    debugDrawEnabled: boolean;
    clientDebugEnabled: boolean;
    gameover: boolean;
    debugDrawLegend: any;
    input: InputState;
    touchControls: TouchControls;
    touchInputChanged: boolean;
    interpreter: Interpreter;
    onGameDataMap: {
        [x: string]: (b: any) => void;
    };
    gameStatusMap: {
        [GameStatus.Player.JOIN]: (b: any) => void;
        [GameStatus.Player.LEAVE]: (b: any) => void;
        [GameStatus.Player.SPEC]: (b: any) => void;
        [GameStatus.Player.LIST]: (b: any) => void;
        [GameStatus.Game.RUNNING]: (b: any) => void;
        [GameStatus.Game.PAUSED]: (b: any) => void;
        [GameStatus.Game.GAMEOVER]: (b: any) => void;
        [GameStatus.Game.COUNTDOWN]: (b: any) => void;
        [GameStatus.Game.LEADER]: (b: any) => void;
        [GameStatus.Game.TEAM]: (b: any) => void;
        [GameStatus.Game.DAMAGE]: (b: any) => void;
        [GameStatus.Settings.WORLD]: (b: any) => void;
    };
    player: any;
    wheelListener: (a: any) => void;
    fireHeld: boolean | undefined;
    roleChangeAt: any;
    joinSpawnAt: any;
    lastRoleTimerSecond: any;
    constructor(a: any);
    onStatus(a: any): void;
    mute(a: any): void;
    step(a: any): void;
    showReticleLine(): void;
    hideReticleLine(): void;
    dispatchInput(a?: boolean): void;
    predictFireFeedback(a: any): void;
    onBinData(a: any): void;
    processBackgroundNetwork(): void;
    onData(a: any): void;
    onResync(a: any): void;
    onInfo(a: any): void;
    onDebug(a: any): void;
    onWaypoints(a: any): void;
    onMessage(a: any): void;
    setSpectator(a: any): void;
    setParticipant /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onRoleStatus(a: any): void;
    updateRoleTimers(): void;
    updateEscapeRoleAction(a?: number): void;
    applyStats(a: any): void;
    onDamageStats(a: any): void;
    applySettings(a: any): void;
    playerJoined /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onMouseWheel(a: any): void;
    onTeamStatus(a: any): void;
    playerLeft(a: any): void;
    shutdown(): void;
    pauseGame(): void;
    resumeGame(): void;
    endGame(a: any): void;
    onStartNewGame(): void;
    onNextGameCountdown(a: any): void;
    onLeaderStatus(a: any): void;
    focus(): void;
    onPlayerSpawn(): void;
    onPlayerDeath(a: any): void;
    onPlayerScore(a: any): void;
    onDbRoundEnd(a: any): void;
    displayHelp(): void;
    onPlayerCombo(): void;
    onPlayerSpree(): void;
    onUpdateEnvironment(): void;
    onSelectItem(a: any): void;
    onModelMessage(a: any): void;
    onKeyUp(a: any): void;
    isZombieSurvivalObserver(): boolean;
    canCycleTrackedPlayers(): any;
    getTrackablePlayerIds(): any[];
    cycleTrackedPlayer(): void;
    onMouseDown(a: any): void;
    onZombieWave(a: any): void;
    isEventFromDisplayObject /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    onMouseUp(a: any): void;
    onMouseMove(a: any): void;
    onRightDown(a: any): void;
    onRightUp(a: any): void;
    onKeyDown(a: any): void;
    requestDisplayChatBubble(): void;
    requestHideChatBubble(): void;
    syncTouchControls(): void;
    onTouchSpectator(a: any, b?: number, c?: number): void;
    onTouchInterface(a: any): void;
    onEscapeMenuAccess(): void;
    onMute(a: any): void;
    onCmdMessage(a: any): void;
    onCmdClear(): void;
    onCmdShutdown(): void;
    onCmdLoad(a: any): void;
    onCmdReady(): void;
    onCmdSpawn(): void;
    onCmdPause(): void;
    onCmdSpectate(): void;
    onCmdJoin(): void;
    onCmdSuicide(): void;
    onCmdLogin(a: any): void;
    onCmdClients(): void;
    onCmdCommands(): void;
    onCmdAccountPunishment /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onCmdKick(a: any): void;
    onCmdBalance(): void;
    onCmdParams(): void;
    onCmdMemStats(): void;
    onCmdWave(): void;
    onCmdSalute(): void;
    onCmdMagic(): void;
    onCmdToss(): void;
    emitAnimationCommand(a: any): void;
    onCmdLogPerf(): void;
    onCmdSpawnBot(a: any): void;
    onCmdDisableBots(a: any): void;
    onCmdImmortal(a: any): void;
    onCmdInvasion(a: any): void;
    onCmdHostile(a: any): void;
    onCmdWaypoints(): void;
    onCmdDebug(): void;
    onCmdDebugClient(): void;
    setDebugDrawEnabled(a: any): boolean;
    onCmdDebugDraw(): void;
    resize(): void;
    onShowConsole(): void;
    onHideConsole(): void;
}
declare namespace Game {
    var ZOMBIE_COUNTDOWN_MILESTONES: number[];
    var INFO_ZS_WAITING_FOR_WAVE: string;
    var formatElapsedTime: (a: any) => string;
    var Muted: Set<any>;
    var MuteScope: any;
    var GetMuteIdentity: (a: any) => any;
    var LoadMutedPlayers: () => void;
    var IsPlayerMuted: (a: any) => boolean;
    var SetPlayerMuted: (a: any, b?: any) => void;
    var WAYPOINTS_PROTOCOL_TYPE: string;
    var getDataType: (a: any) => any;
    var MODE_CTF: string;
    var MODE_DM: string;
    var MODE_TDM: string;
    var MODE_DB: string;
    var MODE_TR: string;
    var MODE_1V1: string;
    var MODE_ZS: string;
    var MATCH_END: string;
    var MATCH_START: string;
    var ANALYTICS_ROLE: string;
    var MODE_MAP: {
        [Game.MODE_CTF]: string;
        [Game.MODE_DM]: string;
        [Game.MODE_TDM]: string;
        [Game.MODE_DB]: string;
        [Game.MODE_TR]: string;
        [Game.MODE_1V1]: string;
        [Game.MODE_ZS]: string;
    };
    var MODE_ICON_MAP: {
        [x: string]: string;
    };
    var MODE_TITLES: {
        [Game.MODE_CTF]: string;
        [Game.MODE_DM]: string;
        [Game.MODE_TDM]: string;
        [Game.MODE_DB]: string;
        [Game.MODE_TR]: string;
        [Game.MODE_1V1]: string;
        [Game.MODE_ZS]: string;
    };
    var EVENT_DEATH: string;
    var RankTitles: string[];
    var MapSkillToIndex: (a: any) => number;
    var MapSkillToTitle: (a: any) => string;
    var MapEventWepToId: (a: any) => string;
    var MapEventWepToIcon: (a: any) => string | null;
    var MapItemToIcon: (a: any) => any;
    var GetWeaponCustomization: (a: any, b?: any) => any;
    var WeaponMapping: {
        "-1": string;
        213: string;
        204: string;
        24: string;
        25: string;
        22: string;
        20: string;
        23: string;
        26: string;
        27: string;
        28: string;
        21: string;
        29: string;
        30: string;
        31: string;
        33: string;
        34: string;
        35: string;
        300: string;
    };
}
declare var serverdetailmenu: {};
declare class ServerDetailMenu extends Feature {
    isPrivate: boolean;
    isRanked: boolean;
    isCustom: boolean;
    maps: any[];
    drops: any[];
    weapons: any[];
    mode: any;
    serverId: string;
    serverName: string;
    currentMap: any;
    oy: number;
    ox: number;
    panelWidth: number;
    panelHeight: number;
    background: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    summaryPanel: PIXI.Graphics;
    weaponPanel: PIXI.Graphics;
    mapPanel: PIXI.Graphics;
    dropPanel: PIXI.Graphics;
    closeButton: ImgButton;
    serverListingTitle: PIXI.Text;
    weaponListContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponListTableContainerMask: PIXI.Graphics;
    weaponListTableContainer: PIXI.Container<PIXI.ContainerChild>;
    weaponSelectionListScrollbar: SelectionListScrollbar;
    mapListContainer: PIXI.Container<PIXI.ContainerChild>;
    mapListTableContainerMask: PIXI.Graphics;
    mapListTableContainer: PIXI.Container<PIXI.ContainerChild>;
    mapSelectionListScrollbar: SelectionListScrollbar;
    dropListContainer: PIXI.Container<PIXI.ContainerChild>;
    dropListTableContainerMask: PIXI.Graphics;
    dropListTableContainer: PIXI.Container<PIXI.ContainerChild>;
    dropSelectionListScrollbar: SelectionListScrollbar;
    modeIcon: PIXI.Sprite;
    regionIcon: PIXI.Sprite;
    serverTitleLabel: PIXI.Text;
    weaponTypeLabel: PIXI.Text;
    mapLabel: PIXI.Text;
    dropLabel: PIXI.Text;
    privateIcon: PIXI.Sprite;
    rankedIcon: PIXI.Sprite;
    customIcon: PIXI.Sprite;
    activePlayersText: PIXI.Text;
    shurikenLabel: PIXI.Text;
    shurikenIcon: PIXI.Sprite;
    passwordLabel: PIXI.Text;
    passwordField: InputField;
    joinButton: ProfileActionButton;
    spectateButton: ProfileActionButton;
    spectateIcon: PIXI.Sprite;
    mapImage: PIXI.Sprite | undefined;
    mapPreviewExpanded: boolean | undefined;
    constructor();
    show(a: any): Promise<void>;
    loadMapImage(a: any): Promise<void>;
    onImageLoaded(a: any): void;
    layoutMapPreview(): void;
    filterMaps(a: any): void;
}
declare namespace ServerDetailMenu {
    var drawDisplayRowBackground: (a: any, b: any, c: any, d?: boolean) => void;
}
declare class WeaponDisplayTableRow extends PIXI.Container {
    id: any;
    index: any;
    interactive: boolean;
    selected: any;
    background: PIXI.Graphics;
    icon: any;
    nameText: PIXI.Text;
    constructor(a: any, b?: any, c?: any, d?: any);
}
declare class MapDisplayTableRow extends PIXI.Container {
    id: any;
    index: any;
    interactive: boolean;
    selected: any;
    background: PIXI.Graphics;
    icon: PIXI.Sprite;
    nameText: PIXI.Text;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any);
}
declare namespace MapDisplayTableRow {
    var HOVER: string;
    var HOVER_END: string;
}
declare class DropDisplayTableRow extends PIXI.Container {
    id: any;
    index: any;
    interactive: boolean;
    selected: any;
    background: PIXI.Graphics;
    icon: any;
    nameText: PIXI.Text;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any);
}
declare var guestprofilemenu: {};
declare class GuestProfileMenu extends Feature {
    panelWidth: number;
    panelHeight: number;
    background: PIXI.Graphics;
    formPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    closeButton: ImgButton;
    guestProfileTitle: PIXI.Text;
    registerTitle: PIXI.Text;
    registerDesc: PIXI.Text;
    loginButton: LoginActionButton;
    registerButton: LoginActionButton;
    constructor();
    setTitle(a: any): void;
    show(): Promise<void>;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
}
declare var highscoremenu: {};
declare class HighscoreMenu extends Feature {
    constructor();
    load(): Promise<void>;
    update(): void;
    refresh(): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
}
declare namespace HighscoreMenu {
    var DISPLAY_SKILL: string;
    var DISPLAY_EXPERIENCE: string;
}
declare var rewardsmenu: {};
declare class RewardsMenu extends Feature {
    panelWidth: number;
    panelHeight: number;
    rewardsPanelX: number;
    rewardsPanelY: number;
    rewardsPanelWidth: number;
    rewardsPanelHeight: number;
    footerPanelX: number;
    footerPanelY: number;
    footerPanelWidth: number;
    footerPanelHeight: number;
    background: PIXI.Graphics;
    rewardsPanel: PIXI.Graphics;
    footerPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    ox: number;
    oy: number;
    title: PIXI.Text;
    rewardsList: PIXI.Container<PIXI.ContainerChild>;
    closeButton: ImgButton;
    treasureIcon: PIXI.Sprite;
    totalAmount: PIXI.Text;
    warningText: PIXI.Text;
    rewardButton: LoginActionButton;
    rewardContainer: PIXI.Container<PIXI.ContainerChild>;
    rewardBackground: PIXI.Graphics;
    rewardDialogPanel: PIXI.Graphics;
    rewardedAmountCounter: PIXI.Text;
    rewardedTreasureIcon: PIXI.Sprite;
    rewardedAmount: PIXI.Text;
    time: number;
    particles: any[];
    animationContainer: PIXI.Sprite;
    particleContainer: ParticleContainer;
    glitterEmission: number;
    constructor();
    update(a?: number): void;
    displayRewardDialog(a: any): void;
    displayRegular(): void;
    layoutWarningText(): void;
    displayWarning(a?: any): void;
    triggerRewardedBreak(): void;
    claimRewards(): Promise<void>;
    disableRewardButton(): void;
    enableRewardButton(): void;
    show(): Promise<void>;
}
declare class RewardRow extends PIXI.Graphics {
    rowWidth: number;
    rowHeight: number;
    active: boolean;
    background: PIXI.Graphics;
    unlockedTitle: any;
    goldIcon: PIXI.Sprite;
    goldAmount: PIXI.Text;
    title: PIXI.Text;
    desc: PIXI.Text;
    constructor(a: any, b?: any);
    setActive(): void;
    setInactive(): void;
    drawRow(): void;
}
declare namespace RewardRow {
    var TYPE: {
        day: string;
        "10m": string;
        "30m": string;
    };
    var TYPE_AMOUNT: {
        day: number;
        "10m": number;
        "30m": number;
    };
    var TYPE_DESC: {
        day: string;
        "10m": string;
        "30m": string;
    };
}
declare var fontstyle: {};
declare var UITheme: {
    TextFontFamily: string[];
    Colors: {
        panel: number;
        panelAlt: number;
        panelDeep: number;
        panelStroke: number;
        hudPanel: number;
        hudCard: number;
        surface: number;
        surfaceAlt: number;
        accent: number;
        accentStrong: number;
        accentSoft: number;
        text: number;
        textMuted: number;
        textSubtle: number;
        warning: number;
        danger: number;
        success: number;
        blue: number;
    };
    ColorMap: {
        16711680: number;
        255: number;
        16776960: number;
        16772608: number;
        16763904: number;
        16759552: number;
        16755200: number;
        16750848: number;
        16746496: number;
        16777215: number;
        15658734: number;
        14540253: number;
        13421772: number;
        11184810: number;
        8947848: number;
        6710886: number;
        5592405: number;
        3355443: number;
        2236962: number;
        65280: number;
        16724736: number;
        16733440: number;
        16766720: number;
        13412864: number;
    };
    remapColor(a: any): any;
    MenuColors: {
        panel: number;
        panelAlt: number;
        hudPanel: number;
        surface: number;
        surfaceAlt: number;
        blue: number;
        rowEven: number;
        rowOdd: number;
        rowHoverEven: number;
        rowHoverOdd: number;
        border: number;
        accent: number;
        brandRed: number;
        text: number;
        muted: number;
        textMuted: number;
        textSubtle: number;
        accentStrong: number;
        accentSoft: number;
        panelDeep: number;
        panelStroke: number;
        hudCard: number;
        success: number;
        danger: number;
        warning: number;
    };
    SocialBackgroundAlpha: number;
    MenuLayout: {
        contentOffset: number;
        contentWidth: number;
        actionWidth: number;
        previewWidth: number;
        gap: number;
        mainY: number;
        mainHeight: number;
        newsY: number;
        newsHeight: number;
        footerY: number;
        footerHeight: number;
        height: number;
        panelHeight: number;
    };
    createUIPanel(a: any, b: any, c?: number, d?: number): PIXI.Graphics;
    resizeUIPanel(a: any, b: any, c: any, d?: number, e?: any): void;
    drawMenuPanel(a: any, b: any, c: any, d?: number, e?: number): void;
    drawMenuButton(a: any, b: any, c: any, d: any, e?: boolean, f?: any, g?: boolean, h?: number): void;
    drawMenuTab(a: any, b: any, c: any, d: any, e?: boolean): void;
    styleMenuTab(a: any, b: any, c: any, d: any, e: any, f?: boolean, g?: any): void;
    paintMenuTab(a: any): void;
    createFooterIcon(a: any): PIXI.Graphics;
    createActionIcon(a: any): PIXI.Graphics;
    createNavigationContent(a: any, b?: any): void;
    drawNavigation(a: any): void;
    styleMenuText(a: any): void;
    menuTextStyle(a: any, b?: any): any;
    menuColor(a: any): any;
    normalizeTextStroke(a: any): void;
    patchTextRendering(): void;
    applyFontStyles(a: any): void;
};
declare var FontStyle: PIXI.TextStyle & {
    LargeDefault: PIXI.TextStyle;
    MediumBlack: PIXI.TextStyle;
    LeaderboardColumn: PIXI.TextStyle;
    LeaderboardData: PIXI.TextStyle;
    LeaderboardFieldTitle: PIXI.TextStyle;
    SmallMenuTextOrange: PIXI.TextStyle;
    SmallMenuTextWhite: PIXI.TextStyle;
    SmallMenuTextOrange2: PIXI.TextStyle;
    LeaderboardPointText: PIXI.TextStyle;
    MediumOrangeTextRegular: PIXI.TextStyle;
    MediumOrangeText: PIXI.TextStyle;
    MediumWhiteText: PIXI.TextStyle;
    SmallRankingTextOrange: PIXI.TextStyle;
    SmallErrorTextRed: PIXI.TextStyle;
    SmallWarningTextRed: PIXI.TextStyle;
    SmallSuccessTextRed: PIXI.TextStyle;
    SmallClanBrowserText: PIXI.TextStyle;
    SmallMenuTextOrange3: PIXI.TextStyle;
    SmallMenuTextOrange4: PIXI.TextStyle;
    SmallMenuTextWhite2: PIXI.TextStyle;
    MediumMenuTextOrange: PIXI.TextStyle;
    ServerListTitle: PIXI.TextStyle;
    MenuTitle: PIXI.TextStyle;
    SmallMenuTextYellow: PIXI.TextStyle;
    MediumMenuTextYellow: PIXI.TextStyle;
    CenteredInfoText: PIXI.TextStyle;
    SmallLabelText: PIXI.TextStyle;
    MediumMenuTextOrange2: PIXI.TextStyle;
    SmallLabelText2: PIXI.TextStyle;
    SmallMenuTextOrange5: PIXI.TextStyle;
    LeaderboardOptionsText: PIXI.TextStyle;
    DropdownItemText: PIXI.TextStyle;
    ButtonTitle: PIXI.TextStyle;
    ChatMessage: PIXI.TextStyle;
    MenuData1: PIXI.TextStyle;
    InputFieldTitle1: PIXI.TextStyle;
    ActivityText: PIXI.TextStyle;
    CreatedText: PIXI.TextStyle;
    OverviewTitle: PIXI.TextStyle;
    LeaderboardTitle: PIXI.TextStyle;
    WeaponMenuTitle: PIXI.TextStyle;
    InputText: PIXI.TextStyle;
    CustomizationItemTextSmall: PIXI.TextStyle;
    SmallLabelText3: PIXI.TextStyle;
    VSText: PIXI.TextStyle;
    VSLoadingText: PIXI.TextStyle;
    VSRulesText: PIXI.TextStyle;
    VSRulesTextTitle: PIXI.TextStyle;
    VSRulesDescText: PIXI.TextStyle;
    VSStartingText: PIXI.TextStyle;
    VSPlayerLabelText: PIXI.TextStyle;
    VSCounterText: PIXI.TextStyle;
    ReadyBarText: PIXI.TextStyle;
    HudTitleBarText: PIXI.TextStyle;
    ZombieWaveLabel: PIXI.TextStyle;
    KillSplashLabel: PIXI.TextStyle;
    KillSplashName: PIXI.TextStyle;
    HudMediumTextWhite: PIXI.TextStyle;
    SmallLabelText4: PIXI.TextStyle;
    HudMediumTextWhite2: PIXI.TextStyle;
    KillSpreeLabel: PIXI.TextStyle;
    KillSpreeTitle: PIXI.TextStyle;
    KillSpreeCount: PIXI.TextStyle;
    ConsoleText: PIXI.TextStyle;
    ActionTableText: PIXI.TextStyle;
    GoldCountText: PIXI.TextStyle;
    AmmoBarText: PIXI.TextStyle;
    StatusBarLabel: PIXI.TextStyle;
    StatusBarValue: PIXI.TextStyle;
    StatusBarCount: PIXI.TextStyle;
    InputFieldText: PIXI.TextStyle;
    WeaponItem: PIXI.TextStyle;
    ChatBubbleText: PIXI.TextStyle;
    SocialDropdownText: PIXI.TextStyle;
    SocialMenuItem: PIXI.TextStyle;
    RankingItem: PIXI.TextStyle;
    ProfileTabText: PIXI.TextStyle;
    CustomizationItem: PIXI.TextStyle;
    ClanTitle: PIXI.TextStyle;
    PVPResultTitle: PIXI.TextStyle;
    PVPResultTitle2: PIXI.TextStyle;
    PVPResultData: PIXI.TextStyle;
    PVPResultDataRank: PIXI.TextStyle;
    PVPResultDataPromo: PIXI.TextStyle;
    PVPVSTitle: PIXI.TextStyle;
    GameoverCountdown: PIXI.TextStyle;
    ServerListData: PIXI.TextStyle;
    ServerListMapName: PIXI.TextStyle;
    PVPDesc: PIXI.TextStyle;
    PlayerLabel: PIXI.TextStyle;
};
declare var pvpresultmenu: {};
declare class PVPResultMenu extends Feature {
    panelWidth: number;
    background: PIXI.Graphics;
    vsTitle: any;
    infoText: any;
    detailText: any;
    ratingText: any;
    goldText: any;
    newRatingText: any;
    visualizer: Visualizer;
    promoText: any;
    promoBadgeLeft: PIXI.Sprite;
    promoBadgeRight: PIXI.Sprite;
    rankArrow: any;
    rankText: any;
    closeButton: ImgButton;
    cancelButton: ProfileActionButton;
    resultRequest: number;
    constructor();
    addPanel /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    addText(a: any, b: any, c: any, d: any, e?: number): any;
    addIcon /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    addRankBadge(a: any): PIXI.Sprite;
    fitText /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    setOutcome(a: any, b: any, c?: number): void;
    update(a?: number): void;
    hide(): void;
    show(): Promise<void>;
}
declare var mapcontentpanel: {};
declare const MAP_TYPES: {
    all: string;
    dm: string;
    tdm: string;
    ctf: string;
    db: string;
    tr: string;
    zs: string;
}, mapType: (a: any) => any;
declare class MapContentPanel extends PIXI.Container {
    ox: number;
    oy: number;
    listY: number;
    listHeight: number;
    listWidth: number;
    mapTitle: PIXI.Text;
    tab: string;
    request: number;
    active: boolean;
    tabs: {};
    message: PIXI.Text;
    typeHeading: PIXI.Text;
    rows: PIXI.Container<PIXI.ContainerChild>;
    rowsMask: PIXI.Graphics;
    scrollbar: ServerListScrollbar;
    rowCount: any;
    constructor();
    load(): Promise<void>;
    clearRows(): void;
    show(): void;
    hide(): void;
}
declare var mappublishpanel: {};
declare class MapPublishPanel extends PIXI.Container {
    ox: number;
    oy: number;
    mapTitle: PIXI.Text;
    uploadMapButton: Button;
    description: PIXI.Text;
    mapImage: PIXI.Sprite;
    constructor();
    onUploadMapClicked(): void;
    processMap(a: any): Promise<void>;
    onImageLoaded(a: any): void;
}
declare var weaponcontentpanel: {};
declare class WeaponContentPanel extends PIXI.Container {
    ox: number;
    oy: number;
    weaponTitle: PIXI.Text;
    constructor();
}
declare var contentmenu: {};
declare class ContentMenu extends Feature {
    initial: boolean;
    display: string;
    rewardToken: any;
    ox: number;
    oy: number;
    panelWidth: number;
    panelHeight: number;
    contentPanelX: number;
    contentPanelY: number;
    contentPanelWidth: number;
    contentPanelHeight: number;
    background: PIXI.Graphics;
    contentPanel: PIXI.Graphics;
    headerLine: PIXI.Graphics;
    contentTitle: PIXI.Text;
    weaponButton: ContentMenuTab;
    weaponLabel: PIXI.Text;
    mapsButton: ContentMenuTab;
    mapsLabel: PIXI.Text;
    mapsContainer: MapContentPanel;
    mapPublishContainer: MapPublishPanel;
    weaponContainer: WeaponContentPanel;
    publishMapButton: ContentActionButton;
    closeButton: ImgButton;
    description: PIXI.Text;
    constructor();
    updateTabStates(): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onpublishMapButtonPressed(): void;
    show(): Promise<void>;
    hide(): void;
    update(): void;
    setMode(a: any): void;
    onCancelButtonReleased(): void;
}
declare namespace ContentMenu {
    var MAPS: string;
    var WEAPONS: string;
}
declare class ContentActionButton extends PIXI.Container {
    id: any;
    buttonWidth: number;
    buttonHeight: number;
    enabled: boolean;
    hovered: boolean;
    pressed: boolean;
    tintColor: number;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    accentGlyph: PIXI.Graphics;
    label: PIXI.Text;
    pressPointerId: any;
    constructor(a: any);
    setText(a: any): void;
    setTint(a: any): void;
    layoutContent(): void;
    draw(): void;
    onMouseDown(a: any): void;
    onMouseUp(a: any): void;
    onMouseOver(): void;
    onMouseOut(): void;
    disable(): void;
    enable(): void;
}
declare var layer: {};
declare class Layer extends PIXI.Container {
    analytics: any;
    mode: any;
    member: boolean;
    w: number;
    h: number;
    features: (ClanBrowserMenu | ClanMenu | ContentMenu | CustomizationMenu | GameMenu | GuestMenu | GuestProfileMenu | HighscoreMenu | LoadingMenu | LoginMenu | LogoutMenu | MemberBrowserMenu | MemberMenu | NewsMenu | PVPMenu | PVPResultMenu | PartnerMenu | ProfileMenu | RankingMenu | RegisterMenu | RenameMenu | RewardsMenu | ServerCreationMenu | ServerDetailMenu | ServerListMenu | UPResetMenu | UserMenu)[];
    updateFeatures: (CustomizationMenu | LoadingMenu | PVPMenu | PVPResultMenu | ProfileMenu | RewardsMenu | UserMenu)[];
    gameMenu: GameMenu;
    guestMenu: GuestMenu;
    memberMenu: MemberMenu;
    memberBrowserMenu: MemberBrowserMenu;
    clanBrowserMenu: ClanBrowserMenu;
    loginMenu: LoginMenu;
    registerMenu: RegisterMenu;
    upResetMenu: UPResetMenu;
    profileMenu: ProfileMenu;
    customizationMenu: CustomizationMenu;
    userMenu: UserMenu;
    rankingMenu: RankingMenu;
    newsMenu: NewsMenu;
    pvpMenu: PVPMenu;
    partnerMenu: PartnerMenu;
    serverListMenu: ServerListMenu;
    serverCreationMenu: ServerCreationMenu;
    clanMenu: ClanMenu;
    loadingMenu: LoadingMenu;
    renameMenu: RenameMenu;
    logoutMenu: LogoutMenu;
    serverDetailMenu: ServerDetailMenu;
    guestProfileMenu: GuestProfileMenu;
    highscoreMenu: HighscoreMenu;
    rewardsMenu: RewardsMenu;
    pvpResultMenu: PVPResultMenu;
    contentMenu: ContentMenu;
    mainMenuHides: (ClanBrowserMenu | ClanMenu | ContentMenu | CustomizationMenu | GuestProfileMenu | LoadingMenu | LoginMenu | MemberBrowserMenu | NewsMenu | PVPMenu | PVPResultMenu | ProfileMenu | RankingMenu | RegisterMenu | RenameMenu | RewardsMenu | ServerCreationMenu | ServerDetailMenu | ServerListMenu | UPResetMenu | UserMenu)[];
    cursor: PIXI.Sprite;
    inputOverlay: PIXI.Sprite;
    interactive: boolean;
    onKeyDownListener: (a: any) => void;
    setup: any;
    socialMenu: SocialMenu | undefined;
    clanChatMenu: ClanChatMenu | undefined;
    constructor();
    setupEventRouting(): void;
    registerAnalyticsPanels(): void;
    setMode(a: any): Promise<void>;
    updateCredentialsIfExpired(a?: boolean): Promise<void>;
    onKeyDown(a: any): void;
    setModeGame(): void;
    setModeMenu(): void;
    update(a: any): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onLoginSubmit(a: any): Promise<void>;
    applyGuestSetup(): void;
    applyMemberSetup(): void;
    onClanChatCancel(): void;
    hideFeature(a: any): void;
    onLoginShow(): void;
    onLoginCancel(): void;
    onRegisterShow(): void;
    onRegisterCancel(): void;
    onLogout(): void;
    onAccountDeactivateLogout(): void;
    onRegisterSubmit(a: any): Promise<void>;
    onRecoverShow(): void;
    onRecoverCancel(): void;
    onRecoverSubmit(a: any): Promise<void>;
    onProfileShow(): void;
    onGuestProfileAccess(): void;
    onGuestCustomizationAccess(): void;
    onGuestProfileHide(): void;
    onSettingsAccess(): void;
    onSettingsHide(): void;
    onContentAccess(): void;
    onContentCancel(): void;
    onProfileAccess(): void;
    onProfileCancel(): void;
    onProfileRename(a: any): Promise<void>;
    onSocialmenuJoinClan(): Promise<void>;
    onClanChatAccess(): void;
    onProfileLeaveClan(): Promise<void>;
    onProfileCreateClan(): Promise<void>;
    onServerCreationShow(): void;
    onServerCreationInit(): void;
    onServerCreationClose(): void;
    onServerCreationRegion(a: any): void;
    onServerCreationJoinLobby(): void;
    onServerCreationInitSession(a: any): void;
    onServerListingShow(): void;
    onServerListClose(): void;
    onServerListRefresh(): void;
    onServerListJoinGame(a: any, b: any, c: any, d?: boolean): Promise<void>;
    onJoinGameMode(): void;
    onServerCreationJoinGame /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    onCustomizationShow(): void;
    onCustomizationCancel(): void;
    onUserAccess(a: any, b?: string, c?: any): void;
    onUserCancel(): void;
    onUserUnfriend(): void;
    onRankingShow(): void;
    onMemberShow(): void;
    onMemberCancel(): void;
    onClanBrowserShow(): void;
    onClanBrowserCancel(): void;
    onRankingCancel(): void;
    onLoadingCancel(): void;
    onNewsAccess(): void;
    onPVPAccess(): void;
    onPVPStart(a: any): void;
    onPVPCancel(): void;
    onPVPConnectionError(a: any): void;
    onNewsCancel(): void;
    onPartnerShow(): void;
    onPartnerCancel(): void;
    onMenuAccess(): void;
    onClanAccess(a: any): void;
    onClanCancel(): void;
    onServerCreateResult(a: any): void;
    onServerReject(a: any): void;
    onServerFull(): void;
    onConnectionError(): void;
    onServerAuthFailed(): Promise<void>;
    onRenameAccess(): void;
    onRenameCompleted(): Promise<void>;
    onRenameCancel(): void;
    onLogoutAccess(a?: boolean): void;
    onLogoutCancel(): void;
    onServerDetailAccess(a: any): void;
    onServerDetailCancel(): void;
    onRewardsAccess(): void;
    onRewardsCancel(): void;
    onRewardsClaimed /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onRewardedAdFinished(a: any): void;
    onRewardedShopAdFinished(a: any, b?: boolean): void;
    onPVPMatch(a: any): void;
    onPVPTryConnect(): Promise<void>;
    onPVPConnect(): void;
    onPVPDisconnect(a: any): void;
    onPVPStartCountdown(): void;
    onPVPCancelCountdown(): void;
    onPVPResultAccess(): void;
    onPVPResultCancel(): void;
    addInputOverlay(): void;
}
declare namespace Layer {
    var MODE_MENU: string;
    var MODE_GAME: string;
    var SETUP_GUEST: string;
    var SETUP_MEMBER: string;
    interface Events {
        DISCONNECT: string;
        LOGIN_ACCESS: string;
        LOGIN_SUBMIT: string;
        LOGIN_CANCEL: string;
        LOGOUT: string;
        RECOVER_ACCESS: string;
        RECOVER_SUBMIT: string;
        RECOVER_CANCEL: string;
        REGISTER_ACCESS: string;
        REGISTER_SUBMIT: string;
        REGISTER_CANCEL: string;
        PROFILE_ACCESS: string;
        PROFILE_CANCEL: string;
        PROFILE_RENAME: string;
        HIDE_MENU: string;
        SHOW_MENU: string;
        UPDATE_CREDENTIAL: string;
        CONTENT_ACCESS: string;
        CONTENT_CANCEL: string;
        CUSTOMIZATION_ACCESS: string;
        CUSTOMIZATION_CANCEL: string;
        USER_ACCESS: string;
        USER_CANCEL: string;
        USER_UNFRIEND: string;
        RANKING_ACCESS: string;
        RANKING_CANCEL: string;
        MEMBER_ACCESS: string;
        MEMBER_CANCEL: string;
        NEWS_ACCESS: string;
        NEWS_CANCEL: string;
        PVP_ACCESS: string;
        PVP_CANCEL: string;
        PVP_CONNECT: string;
        PVP_START: string;
        PVP_START_COUNTDOWN: string;
        PVP_CANCEL_COUNTDOWN: string;
        PARTNER_ACCESS: string;
        PARTNER_CANCEL: string;
        LEAVE_CLAN: string;
        CREATE_CLAN: string;
        JOIN_CLAN: string;
        JOIN_GAME: string;
        JOIN_GAME_FAIL: string;
        JOIN_SERVER: string;
        CREATE_SERVER: string;
        SERVER_LIST_REFRESH: string;
        SERVER_LIST_CANCEL: string;
        SERVER_CREATION_CANCEL: string;
        SERVER_CREATION_INIT: string;
        SERVER_CREATION_REGION: string;
        SERVER_CREATION_JOIN_LOBBY: string;
        SERVER_CREATION_SESSION_INIT: string;
        SERVER_CREATED: string;
        CLAN_CHAT_ACCESS: string;
        CLAN_CHAT_CANCEL: string;
        LOADING_CANCEL: string;
        CLAN_BROWSER_ACCESS: string;
        CLAN_BROWSER_CANCEL: string;
        CLAN_ACCESS: string;
        CLAN_CANCEL: string;
        RENAME_ACCESS: string;
        RENAME_SUBMIT: string;
        RENAME_CANCEL: string;
        RENAME_COMPLETED: string;
        LOGOUT_CANCEL: string;
        LOGOUT_ACCESS: string;
        DISPLAY_HELP: string;
        MUTE_TOGGLE: string;
        SERVER_DETAIL_ACCESS: string;
        SERVER_DETAIL_CANCEL: string;
        MENU_ACCESS: string;
        GUEST_PROFILE_ACCESS: string;
        GUEST_PROFILE_HIDE: string;
        SETTINGS_ACCESS: string;
        SETTINGS_HIDE: string;
        ESCAPE_MENU_ACCESS: string;
        REWARDS_ACCESS: string;
        REWARDS_CLAIMED: string;
        REWARDS_CANCEL: string;
        PVP_RESULT_CANCEL: string;
    }
    var Events: Events;
}
declare var assetloader: {};
declare class AssetLoader {
    target: any;
    dir: any;
    filesLoaded: number;
    totalFiles: number;
    onProgress: any;
    onComplete: any;
    constructor(a: any, b?: any);
    load(a: any): Promise<void>;
}
declare var protocol: {};
declare var Protocol: {
    CONNECT: string;
    CONNECTED: string;
    DISCONNECT: string;
    DISCONNECTED: string;
    ECHO: string;
    ECHO_RESP: string;
    INFO: string;
    SESSION: string;
    Session: {
        REGISTER: string;
        CREATE: string;
        CREATE_RESP: string;
        JOIN_MODE: string;
        JOIN_RESP: string;
        JOIN_GAME: string;
        LEAVE: string;
        LEAVE_RESP: string;
        LIST_GAMES: string;
        LIST_GAMES_RESP: string;
        CLIENT_AUTH: string;
    };
    GAME: string;
    GAME_BIN: string;
    Game: {
        UPDATE: string;
        REQ: string;
        INPUT: string;
        INFO: string;
        MESSAGE: string;
        COMMAND: string;
        ACTION: string;
        STATUS: string;
        TRIGGER_RESPAWN: string;
        WAYPOINTS: string;
        DEBUG: string;
        TRANSFORM: string;
        RESYNC: string;
    };
    SIGNAL_FULL: string;
};
declare var pvpclient: {};
declare class PVPClient extends EventDispatcher {
    connectionTimeout: number | null;
    socket: WebSocket | null;
    allowNextAttempt: boolean;
    server: any;
    constructor();
    setServer(a: any): void;
    connect(): boolean;
    disconnect(): void;
    onOpen(a: any): void;
    onError(a: any): void;
    onMessage(a: any): void;
    onClose(a: any): void;
    emit(a: any): void;
    isConnected(): boolean;

    mapID: any;}
declare namespace PVPClient {
    var compress: (a: any) => string;
    var decompress: (a: any) => any;
    var unpackGameData: (a: any) => {
        t: string;
        d: any;
    };
    var SendBuffer: Uint8Array<ArrayBuffer>;
    var Decoder: TextDecoder;
    var Encoder: TextEncoder;
    var CONNECT: string;
    var DISCONNECT: string;
    var AUTH_FAILED: string;
    var SERVER_FULL: string;
    var CONNECTION_ERROR: string;
    var CODE_AUTH_FAILED: number;
    var CODE_MAX_CLIENTS: number;
    var CODE_DUPLICATE_CLIENT: number;
    var MATCH: number;
    var MATCH_REGISTERED: number;
    var MATCH_CREATED: number;
    var MATCH_ERROR: number;
    var MATCH_SEARCH: number;
    var MATCH_CANCEL: number;
}
declare var menubackground: {};
declare class MenuBackground extends PIXI.Container {
    interactive: boolean;
    interactiveChildren: boolean;
    eventMode: string;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    image: PIXI.Sprite | null;
    particleSeed: number;
    particleTime: number;
    viewportHeight: number;
    viewportWidth: number;
    particleLayer: PIXI.Container<PIXI.ContainerChild>;
    ambientParticles: PIXI.ParticleContainer<PIXI.IParticle>;
    sparkParticles: PIXI.ParticleContainer<PIXI.IParticle>;
    particles: {
        visual: PIXI.Particle;
        spark: boolean;
        glow: boolean;
        initialized: boolean;
    }[];
    imagePanX: number | undefined;
    imagePanY: number | undefined;
    constructor();
    static getParticleTextures(): any;
    random(): number;
    resetParticle(a: any, b?: boolean): void;
    renderParticle(a: any): void;
    updateImagePosition(): void;
    update(a: any): void;
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;

    static ParticleTextures: any;}
declare namespace MenuBackground {
    var IMAGE_OVERSCAN: number;
    var PARTICLE_COUNT: number;
    var MOBILE_PARTICLE_COUNT: number;
    var SPARK_OFFSCREEN_MARGIN: number;
    var PAN_RANGE: number;
    var PAN_SPEED_X: number;
    var PAN_SPEED_Y: number;
}
declare var rendererfactory: {};
declare class RendererFactory {
    static CreateRepeatingTexture(a: any, b: any, c?: boolean): any;
    static Now(): number;
    static CaptureStack(a: any): string;
    static SerializeError(a: any): {
        name: any;
        message: any;
        stack: any;
    };
    static PushRecent /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    static DescribeBufferUsage(a: any): string;
    static ReplaceMethod /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): boolean;
    static GetAdapterInfo(a: any): {} | null;
    static GetDeviceLimits(a: any): {} | null;
    static GetBindGroupBackingBuffer(a: any): any;
    static InstallWebGpuBindGroupBufferFix(a: any): void;
    static InstallWebGpuDiagnostics(a: any): any;
    static GetWebGpuEnvironmentError(): Error | null;
    static LogRenderer(a: any): void;
    static CreateWebGl(a: any): Promise<PIXI.Application<PIXI.Renderer>>;
    static ConsumeRuntimeFallback(): boolean;
    static ConsumeRuntimeReport(): any;
    static InstallRuntimeFallback /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    static Create(a: any, b?: boolean): Promise<boolean | PIXI.Application<PIXI.Renderer>>;
}
declare namespace RendererFactory {
    var RuntimeFallbackKey: string;
    var RuntimeReportKey: string;
    var RecentBufferLimit: number;
    var RecentDestroyedBufferLimit: number;
    var RecentSubmitLimit: number;
}
declare var clientperformancetracker: {};
declare class ClientPerformanceTracker {
    enabled: boolean;
    windowStartedAt: any;
    totalSamples: number | undefined;
    totalMaxMs: number | undefined;
    totalTotalMs: number | undefined;
    renderSamples: number | undefined;
    renderMaxMs: number | undefined;
    renderTotalMs: number | undefined;
    physicsSteps: number | undefined;
    physicsSamples: number | undefined;
    physicsMaxMs: number | undefined;
    physicsTotalMs: number | undefined;
    updateSamples: number | undefined;
    updateMaxMs: number | undefined;
    updateTotalMs: number | undefined;
    constructor();
    setEnabled /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    reset(a: any): void;
    addSample /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    getMetric(a: any): {
        samples: any;
        avgMs: number | null;
        maxMs: number | null;
    };
    record(a: any, b: any, c: any, d: any, e?: number): any;
    static round(a: any, b?: number): number;
}
declare namespace ClientPerformanceTracker {
    var REPORT_INTERVAL_MS: number;
}
declare var physicsconstants: {}, PC: {
    GRAVITY: {
        x: number;
        y: number;
    };
    PM_RATIO: number;
    TEMPO_SCALE: number;
};
declare var editorsession: {};
declare class EditorSession {
    static listen(a: any): () => void;
}
declare var magazineweaponsprite: {};
declare class MagazineWeaponSprite extends PIXI.Sprite {
    reloadDuration: any;
    loadedTexture: PIXI.Texture<PIXI.TextureSource<any>>;
    hasClip: boolean;
    clipDiscarded: boolean;
    reloading: boolean;
    magazineVariant: any;
    reloadClipOrigin: any;
    customTexture: any;
    reloadStartedAt: number | undefined;
    constructor(a: any, b: any, c?: {});
    applyMagazineTexture(): void;
    setCustomTexture(a: any): boolean;
    setAmmoState(a: any): void;
    setReloading(a: any, b?: boolean): void;
    updateReload(a: any): void;
    presentReload(): void;
    static Initialize(a: any): void;
}
declare namespace MagazineWeaponSprite {
    var Variants: Map<any, any>;
    var Definitions: ({
        key: string;
        bounds: number[];
        polygon: number[];
        externalClip?: undefined;
        assembleMagazine?: undefined;
    } | {
        key: string;
        externalClip: boolean;
        bounds: number[];
        polygon: number[];
        assembleMagazine?: undefined;
    } | {
        polygon?: undefined;
        key: string;
        externalClip: boolean;
        assembleMagazine: boolean;
        bounds: number[];
    })[];
}
declare var audiopack: {};
declare const AudioPackURL = "js/dist/audio-5e6177e851d95c74.pack", AudioPackCompressedURL: string;
declare var audiofiles: {};
declare class AudioFiles {
    static Fetch(a: any): string;
    static ResolveOptions(a: any): any;
    static Load(): any;
    static LoadPack(): Promise<boolean>;
}
declare namespace AudioFiles {
    var Sources: any;
    var Folder: string;
    var Loading: any;
    var Silence: string;
}
declare var audiofx: {};
declare const MAX_SIMULTANEOUS_SOUND_INSTANCES = 3, MAX_SIMULTANEOUS_WEAPON_SOUND_INSTANCES = 10, RawHowl: typeof Howl;
declare function createCappedHowl(a: any, b?: number): Howl;
declare function createWeaponHowl(a: any): Howl;
declare const AudioEffects: {
    MainMenuAmbient: {
        audio: Howl;
    };
    ZombieHit: {
        audio: Howl;
    }[];
    ZombieDeath: {
        audio: Howl;
    }[];
    ZombieApproach: {
        audio: Howl;
    }[];
    SoldierHit: {
        audio: Howl;
    }[];
    SoldierDeath: {
        audio: Howl;
    }[];
    ZombieWaveStart: {
        audio: Howl;
    };
    ZombieWaveCountdown: {
        audio: Howl;
    };
    ZombieWaveAmbient: {
        audio: Howl;
    };
    RainAmbient: {
        audio: Howl;
    };
    Strike: {
        audio: Howl;
    };
    Victory: {
        audio: Howl;
    };
    Match: {
        audio: Howl;
    };
    ButtonHover: {
        audio: Howl;
    };
    SubmenuHover: {
        audio: Howl;
    };
    ButtonClick: {
        audio: Howl;
    };
    SMGFire: {
        audio: Howl;
    };
    MAC10Fire: {
        audio: Howl;
    };
    ShotgunFire: {
        audio: Howl;
    };
    ShotgunPump: {
        audio: Howl;
    };
    BarrettFire: {
        audio: Howl;
    };
    RifleFire: {
        audio: Howl;
    };
    AK47Fire: {
        audio: Howl;
    };
    BowFire: {
        audio: Howl;
    };
    CarbineFire: {
        audio: Howl;
    };
    ShockrifleFire: {
        audio: Howl;
    };
    ShockrifleRemove: {
        audio: Howl;
    };
    RLRocketFire: {
        audio: Howl;
    };
    DeagleFire: {
        audio: Howl;
    };
    UziFire: {
        audio: Howl;
    };
    M60Fire: {
        audio: Howl;
    };
    FlamethrowerFire: {
        audio: Howl;
        single: boolean;
        sub_start: number;
        sub_end: number;
    };
    Boomerang: {
        audio: Howl;
        single: boolean;
        sub_start: number;
        sub_end: number;
    };
    BoomerangImpact: {
        audio: Howl;
    };
    BoomerangSlice: {
        audio: Howl;
    };
    EnergyJetFeet: {
        audio: Howl;
        single: boolean;
        sub_start: number;
        sub_end: number;
    };
    ArrowImpact: {
        audio: Howl;
    }[];
    RLImpact: {
        audio: Howl;
    }[];
    X75Fire: {
        audio: Howl;
    };
    X75Impact: {
        audio: Howl;
    }[];
    Walk: {
        audio: Howl;
    };
    Flip: {
        audio: Howl;
    };
    Tap: {
        audio: Howl;
        delta: number;
    };
    ChainsawNeutral: {
        audio: Howl;
    };
    ChainsawEngaged: {
        audio: Howl;
        single: boolean;
        sub_start: number;
        sub_end: number;
    };
    MinigunEngaged: {
        audio: Howl;
        single: boolean;
        sub_start: number;
        sub_end: number;
        immediate: boolean;
    };
    Fly: {
        audio: Howl;
        single: boolean;
        sub_start: number;
        sub_end: number;
    };
    ExplosionCluster: {
        audio: Howl;
    }[];
    ExplosionNade: {
        audio: Howl;
    }[];
    ExplosionNadeLauncher: {
        audio: Howl;
    }[];
    ShurikenDrop: {
        audio: Howl;
        delta: number;
        single: boolean;
    };
    LawLaunch: {
        audio: Howl;
    };
    NadeLauncher: {
        audio: Howl;
    };
    Reload: {
        audio: Howl;
    };
    AmmoPickup: {
        audio: Howl;
    }[];
    RicochetTiny: {
        audio: Howl;
    };
    Thud: {
        audio: Howl;
        delta: number;
    }[];
    LightThud: {
        audio: Howl;
        delta: number;
    };
    HeavyThud: {
        audio: Howl;
        delta: number;
    };
    LaserGunShot1: {
        audio: Howl;
    };
    LaserGunImpact: {
        audio: Howl;
    }[];
    LaserImpact1: {
        audio: Howl;
    };
    PulseGunShot: {
        audio: Howl;
    };
    BotZap: {
        audio: Howl;
    };
    BotDeath: {
        audio: Howl;
    };
    LinkGunEngaged: {
        audio: Howl;
        single: boolean;
        sub_start: number;
        sub_end: number;
    };
    PulseGunImpact: {
        audio: Howl;
    };
    Rico: {
        audio: Howl;
    }[];
    BodyImpact: {
        audio: Howl;
    }[];
    HeavyBodyImpact: {
        audio: Howl;
        delta: number;
        contactVolumeScale: number;
        contactMaximumVolume: number;
    }[];
    Throw: {
        audio: Howl;
    }[];
    WaterSplash: {
        audio: Howl;
    }[];
    SnowballImpact: {
        audio: Howl;
    }[];
    GoldPickup: {
        audio: Howl;
    }[];
    GoldDrop: {
        audio: Howl;
    };
    Objective: {
        audio: Howl;
    };
    GrabObjective: {
        audio: Howl;
    };
    Powerup: {
        audio: Howl;
    };
    Teleport: {
        audio: Howl;
    };
    Spawn: {
        audio: Howl;
    };
    Jump: {
        audio: Howl;
    };
    ItemSpawn: {
        audio: Howl;
    };
    BallBounce: {
        audio: Howl;
    };
};
declare function InitializeAudioEffects(a?: boolean): void;
declare class App extends PIXI.Container {
    analyticsService: Analytics;
    analytics: AnalyticsTracker;
    credential: Credential;
    servers: any[];
    status: {};
    stage: any;
    pixi: boolean | PIXI.Application<PIXI.Renderer> | null;
    settings: {};
    testMode: boolean;
    gameplayStopped: boolean;
    threadUpdate: boolean;
    hasResized: boolean;
    resizeOnLoad: boolean;
    matchStarted: boolean;
    pvpClient: PVPClient;
    gameClient: Client;
    authenticated: boolean;
    user: any;
    game: Game | null;
    background: MenuBackground | null;
    adLoaderBackground: PIXI.Sprite | null;
    onConnectRetryMode: any;
    gameOutputListener: ((a: any) => void) | null;
    gameBinInputListener: ((c: any) => void) | null;
    gameInputListener: ((c: any) => void) | null;
    onMouseDownListener: (a: any) => void;
    onMouseMoveListener: (a: any) => void;
    onMouseUpListener: (a: any) => void;
    onRightDownListener: (a: any) => void;
    onRightUpListener: (a: any) => void;
    onCanvasPointerDownCaptureListener: (a: any) => void;
    activePointerTargets: Map<any, any>;
    inCommercialBreak: boolean;
    startTime: number;
    autoJoinGame: {
        name: any;
        password: any;
        spec: boolean;
    } | null;
    autoJoinOnCreate: boolean;
    pendingTestCreation: {
        mode: any;
        map: any;
        signature: any;
        testId: string;
    } | null;
    pendingTestJoin: boolean;
    lastUpdateTime: any;
    checkInterval: number | null;
    hasLoaded: boolean;
    redrawTimeout: number | null;
    adFaderInterval: number | null;
    adLoaderTimeout: number | null;
    stepCount: number;
    stepCallback: (a: any) => void;
    totalFrameTime: any[];
    logicFrameTime: any[];
    renderFrameTime: any[];
    clientPerformance: ClientPerformanceTracker;
    lastServerReload: number;
    lastBannerReload: number;
    adElement: HTMLElement | null;
    audioLoaded: any;
    view: any;
    interpreter: Interpreter | undefined;
    cursor: PIXI.Cursor | (string & {}) | undefined;
    continueButton: PIXI.Graphics | undefined;
    continueButtonText: PIXI.Text | undefined;
    youtubeLogo: PIXI.Sprite | undefined;
    twitterLogo: PIXI.Sprite | undefined;
    redditLogo: PIXI.Sprite | undefined;
    menu: Menu | null | undefined;
    adPlaying: boolean | undefined;
    constructor();
    load(): Promise<void>;
    proceed(): Promise<void>;
    fetchGuestCredential(a: any): Promise<any>;
    start(): Promise<void>;
    showMenu(a?: boolean): void;
    onStarted(): Promise<void>;
    setFocus(a: any): void;
    onConnect(): void;
    onDisconnect(): Promise<void>;
    onStep(a: any): void;
    onStepDev(a: any): void;
    onRequestChooseServer /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<void>;
    onLayerJoinServer(a: any): void;
    applyServerSettings(a: any): Promise<void>;
    onLayerCreateServer(a: any): void;
    onLayerRenameCompleted(): void;
    onRegisterFailed(): void;
    onClientDisconnectForImmediateReconnect(): void;
    onRequestJoinGameMode(a: any): Promise<void>;
    requestServerList(): Promise<void>;
    requestJoinGame(a: any): void;
    requestJoinGameMode(a: any): void;
    requestLeaveGame(a: any): void;
    onSessionData(a: any): void;
    onClientAuth(a: any): void;
    onServerFull(): void;
    onConnectionError(): void;
    onInfo(a: any): void;
    onPVPMatch(a: any): void;
    onPVPConnect(a: any): void;
    onPVPDisconnect(a: any): void;
    onPVPConnectionError(): void;
    onJoinResp(a: any): void;
    onLeaveResp(a: any): void;
    leaveGame(): Promise<void>;
    onGameData(a: any): void;
    initGameMode(a: any): void;
    onCmdConnect(): void;
    onCmdDisconnect(): void;
    onCmdUnlink(): void;
    onCmdInvalid(a: any): void;
    onDisplayAdButton(): void;
    drawContinuePrompt(): void;
    layoutContinuePrompt(): void;
    setContinuePromptHover(a: any): void;
    dismissContinuePrompt(): boolean;
    onTriggerVideoAd(): void;
    drawBackground(): void;
    onResize(a?: boolean): void;
    onLayerDisconnect(): void;
    onLayerShowSettings(): void;
    onLayerHideSettings(): void;
    onEscapeMenuAccess(): void;
    onRewardsClaimed(): void;
    onLayerMute(a: any): void;
    startMenuAmbient(): void;
    stopMenuAmbient(): void;
    onLayerDisplayHelp(): void;
    onLayerHideMenu(): void;
    onLayerShowMenu(): void;
    onLayerJoinGame(a: any, b: any, c: any, d?: boolean): void;
    onGuestNameChange(a: any): Promise<void>;
    onLayerUpdateCredential /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<void>;
    adStarted(): void;
    adFinished(): void;
    adError(): void;
    muteIfRequired(a: any): void;
    onMouseDown(a: any): void;
    cancelPointer(a: any, b?: any): void;
    releaseMousePointer(a: any): void;
    onCanvasPointerDownCapture(a: any): void;
    onMouseMove(a: any): void;
    onMouseUp(a: any): void;
    onRightDown(a: any): void;
    onRightUp(a: any): void;

    static Credential: Credential;
    static CombinedTextures: CombinedTexturesMap;
    static Analytics: any;
    static AnalyticsPanels: AnalyticsPanels;
    static Console: CommandConsole;
    static Layer: Layer;
    static PlayerClothTextures: any;
    static PlayerTextures: any;
    static PreloaderProgress: any;
    static Stats: Stats;
    static SupplementalTextures: any;}
declare namespace App {
    var UpdatePreloader: (a: any) => void;
    var RemovePreloader: () => void;
    var GenerateTexturesFromSheet: (a: any) => void;
    var LoadSupplementalTextures: () => Promise<void>;
    var LoadEditorTextures: () => Promise<void>;
    var LoadFonts: () => Promise<void>;
    var PokiSDK: any;
    var WhiteLabel_NONE: string;
    var WhiteLabel_CG: string;
    var WhiteLabel_POKI: string;
    var WhiteLabel_POKI_MAIN: string;
    var WhiteLabel_AIP: string;
    export { whitelabel as Domain };
    export var WhiteLabel: string;
    export var PokiSDK: any;
    export var WhiteLabel: string;
    export var PokiSDK: any;
    export { aiptag as AIP };
    export var WhiteLabel: string;
    export var IsMobile: boolean;
    export var TouchActive: boolean;
    export var CMD_CONNECT: string;
    export var CMD_DISCONNECT: string;
    export var CMD_UNLINK: string;
    export var CheckIntervalRate: number;
    export var ServerPreference: string;
    export var RegionPreference: string;
    export var ModePreference: string;
    export var Renderer: any;
    export var Stage: any;
    export var ClientVersion: string;
    export var MinVersion: string;
    export var HasFocus: boolean;
    export var Scale: number;
    export var StartTime: number;
    export var Time: number;
    export var FrameTime: number;
    export var RealFrameTime: number;
    export var MAX_FRAME_DELTA_MS: number;
    export var GetFrameDelta: (a: any, b?: any) => number;
    export var LastRewardCheck: number;
    export var HadRewards: boolean;
    export var ShowRewardedAd: boolean;
    export var AdblockDetected: boolean;
    export var ShowRewardedShopAd: boolean;
    export var WindowResized: boolean;
    export var HelpDisplayed: boolean;
    export var DisplayMatchResultID: number;
    export var ReferenceWidth: number;
    export var ReferenceHeight: number;
    export var SkillIconTextureScale: number;
    export var RankIconTextureScale: number;
    export var DevicePixelRatio: number;
    export var ClientWidth: number;
    export var ClientHeight: number;
    export var ConnectedServer: any;
    export var Servers: any[];
    export var SelectedServer: any;
    export var SelectedMode: any;
    export var TransformedMouseX: number;
    export var TransformedMouseY: number;
    export var GameClient: {};
    export var _g: {};
    export { _g as PVPClient };
    export var AssetTree: {};
    export var Assets: {};
    export var UIVisible: boolean;
    export var FieldHasFocus: boolean;
    export var Autogen: boolean;
    export var FirstRun: boolean;
    export var DisplayFrameTime: boolean;
    export var DisplayAdblockMessage: boolean;
    export var SetCredential: (a: any) => void;
    export var GetCredential: () => {};
    export var GenerateGuestName: (a: any) => any;
    export var _j: {
        HAIR: never[];
        TORSO: never[];
        ORB: never[];
        FACE: never[];
        BELT: never[];
        ARMLEFTLOWER: never[];
        ARMLEFTUPPER: never[];
        ARMRIGHTLOWER: never[];
        ARMRIGHTUPPER: never[];
        LEGLEFTLOWER: never[];
        LEGLEFTUPPER: never[];
        LEGRIGHTLOWER: never[];
        LEGRIGHTUPPER: never[];
        EXTRA: never[];
    };
    export { _j as Customization };
    export var TimeToColourMap: number[];
    export var ContinentMap: {
        Europe: string;
        America: string;
        Asia: string;
        Africa: string;
    };
    export var GetNearestGeoServer: (a: any) => any;
    export var CONTINUE_PROMPT_MAX_WIDTH: number;
    export var CONTINUE_PROMPT_HEIGHT: number;
    export var RESOURCE_FOLDER: string;
    export var RESOURCES: {
        combined: {
            id: string;
            file: string;
        }[];
        seamless: {
            id: string;
            file: string;
        }[];
        player: {
            id: string;
            file: string;
        }[];
        ui: {
            id: string;
            file: string;
        }[];
    };
    export var DefaultCredential: Credential;
    export var DefaultServers: any;
}
declare let whitelabel: string | boolean;
declare class AudioManager {
    muted: boolean;
    parent: any;
    queue: any[];
    voiceState: any;
    currentZombieWaveState: any;
    lastZombieCountdown: any;
    lastZombieWave: any;
    zombieWaveAmbientRequested: boolean;
    currentEnvironment: any;
    approachingZombies: any[];
    zombieApproachTargets: any[];
    zombieApproachPollRemainingMs: number;
    zombieApproachVoiceRemainingMs: number;
    onAgentStateChangeListener: (a: any) => void;
    onAddedListener: (a: any) => void;
    onContactListener: (a: any) => void;
    onRemovedListener: (a: any) => void;
    onCreateEffectListener: (a: any) => void;
    onUpdateEnvironmentListener: (a: any) => void;
    onZombieWaveListener: (a: any) => void;
    constructor(a: any);
    update(a: any): void;
    clear(): void;
    mute(): void;
    unmute(): void;
    onAgentStateChange(a: any): void;
    getVoiceState(a: any): any;
    playVoiceVariation /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    getNextZombieApproachVoiceDelay(): number;
    getApproachingZombies(): any[];
    updateZombieApproachVoices(a: any): void;
    onAgentHealth /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onAgentAlive /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onUpdateEnvironment(a: any): void;
    onZombieWave(a: any): void;
    isAmbientSoundEnabled(): boolean;
    stopAmbientAudio(): void;
    onAdded(a: any): void;
    onCreateEffect(a: any): void;
    onInitUseFX /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onStopUseFX /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onUseFX(a: any, b: any, c?: any): void;
    onRemoved(a: any): void;
    onContact(a: any): void;
    onReload /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
}
declare namespace AudioManager {
    var Cam: any;
    var ZOMBIE_HIT_COOLDOWN_MS: number;
    var SOLDIER_HIT_COOLDOWN_MS: number;
    var ZOMBIE_APPROACH_VOICE_MIN_INTERVAL_MS: number;
    var ZOMBIE_APPROACH_VOICE_MAX_INTERVAL_MS: number;
    var ZOMBIE_APPROACH_POLL_INTERVAL_MS: number;
    var ZOMBIE_APPROACH_MIN_SPEED: number;
    var ZOMBIE_APPROACH_ALIGNMENT: number;
    var ZOMBIE_APPROACH_ALIGNMENT_SQUARED: number;
    var MAX_CONCURRENT_PER_SOUND: number;
    var ActiveSoundIds: WeakMap<WeakKey, any>;
    var SingleEffectIds: WeakMap<WeakKey, any>;
    var CamDistance: (a: any) => number;
    var Stereo: (a: any) => any;
    var PlayAudio: (a: any) => any;
    var PlayEffect: (a: any, b?: any, c?: any) => any;
    var StopEffect: (a: any, b?: any) => void;
}
declare var background: {};
declare class Background extends PIXI.Container {
    interactiveChildren: boolean;
    interactive: boolean;
    eventMode: string;
    lastY: number;
    lastX: number;
    baseCenterY: number;
    baseCenterX: number;
    verticalOffset: number;
    chunkWidth: number;
    texturePadding: number;
    loopChunkCount: number;
    loopWidth: number;
    textureResolution: number;
    maxCacheBytes: number;
    cacheBytes: number;
    bakeResolutionScale: number;
    pendingChunks: any[];
    prewarmWaiters: any[];
    generationFailed: boolean;
    type: any;
    profile: any;
    gradientUpColor: number;
    gradientDownColor: number;
    seed: number;
    layerContainers: any[];
    chunkCaches: any[];
    fallbackChunks: any[];
    bottomFill: any;
    mountains: number | undefined;
    amplitude: number | undefined;
    stepWidth: number | undefined;
    stepHeight: number | undefined;
    varyX: number | undefined;
    varyY: number | undefined;
    constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number);
    setup(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number): void;
    center /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    update(a: any): void;
    draw /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    clear(): void;
    destroy(a: any): void;
    destroyChunkCaches(): void;
    destroyChunk(a: any): void;
    applyParallaxTransforms /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateBottomFill(): void;
    updateVisibleChunks(a?: boolean): void;
    getBaseResolution(a: any): number;
    getChunkResolution(a: any): number;
    estimateChunkBytes /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    getTexturePadding(a: any): number;
    syncLayerChunks(a: any): void;
    attachChunk /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    createFallback /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    prewarm(a?: any): Promise<any>;
    finishPrewarm(a: any): void;
    requestGeneration(): void;
    generateNextChunk(): void;
    createChunk(a: any, b: any, c: any, d?: number): {
        chunkIndex: any;
        texture: any;
        croppedTexture: PIXI.ContainerChild;
        sprite: number;
        repeatSprite: number;
        resolution: number;
        bytes: number;
    };
    sampleSilhouette /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): number;
    wrap /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    terrainNoise /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): number;
    getHeightAt /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    smoothPoints(a: any, b?: number): any;
    addShadowBand /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): void;
    addFillShape /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): void;
    addHighlightBand /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
    addRidgeCap /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
    addDetailBand /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    createBandGraphic(a: any, b: any, c: any, d: any, e?: boolean): PIXI.Mesh<any, PIXI.TextureShader>;
    createAmbientBands /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): PIXI.Mesh<any, PIXI.TextureShader>[];
    createProfile /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): {
        default: {
            renderHeight: number;
            layers: {
                landform: any;
                parallax: any;
                baseY: any;
                height: any;
                featureWidth: any;
                sampleStep: any;
                ridged: any;
                seedOffset: any;
                fillColor: any;
                alpha: any;
                shadowColor: any;
                shadowAlpha: any;
                shadowDepth: any;
                highlightColor: any;
                highlightAlpha: any;
                highlightDepth: any;
                ambientColor: any;
                ambientAlpha: any;
                ambientBandCount: any;
                ambientTop: any;
                ambientHeight: any;
                ambientSpacing: any;
                detailBands: any;
                renderHeight: any;
                primaryWeight: any;
                ridgeWeight: any;
                detailWeight: any;
                smoothSubdivisions: any;
                maxSlopeDelta: any;
                ridgeCapColor: any;
                ridgeCapAlpha: any;
                ridgeCapThickness: any;
            }[];
        };
        stars: {
            renderHeight: number;
            layers: {
                landform: any;
                parallax: any;
                baseY: any;
                height: any;
                featureWidth: any;
                sampleStep: any;
                ridged: any;
                seedOffset: any;
                fillColor: any;
                alpha: any;
                shadowColor: any;
                shadowAlpha: any;
                shadowDepth: any;
                highlightColor: any;
                highlightAlpha: any;
                highlightDepth: any;
                ambientColor: any;
                ambientAlpha: any;
                ambientBandCount: any;
                ambientTop: any;
                ambientHeight: any;
                ambientSpacing: any;
                detailBands: any;
                renderHeight: any;
                primaryWeight: any;
                ridgeWeight: any;
                detailWeight: any;
                smoothSubdivisions: any;
                maxSlopeDelta: any;
                ridgeCapColor: any;
                ridgeCapAlpha: any;
                ridgeCapThickness: any;
            }[];
        };
        dust: {
            renderHeight: number;
            layers: {
                landform: any;
                parallax: any;
                baseY: any;
                height: any;
                featureWidth: any;
                sampleStep: any;
                ridged: any;
                seedOffset: any;
                fillColor: any;
                alpha: any;
                shadowColor: any;
                shadowAlpha: any;
                shadowDepth: any;
                highlightColor: any;
                highlightAlpha: any;
                highlightDepth: any;
                ambientColor: any;
                ambientAlpha: any;
                ambientBandCount: any;
                ambientTop: any;
                ambientHeight: any;
                ambientSpacing: any;
                detailBands: any;
                renderHeight: any;
                primaryWeight: any;
                ridgeWeight: any;
                detailWeight: any;
                smoothSubdivisions: any;
                maxSlopeDelta: any;
                ridgeCapColor: any;
                ridgeCapAlpha: any;
                ridgeCapThickness: any;
            }[];
        };
    };
    applyGradientPalette /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    createLayerDefinition(a: any): {
        landform: any;
        parallax: any;
        baseY: any;
        height: any;
        featureWidth: any;
        sampleStep: any;
        ridged: any;
        seedOffset: any;
        fillColor: any;
        alpha: any;
        shadowColor: any;
        shadowAlpha: any;
        shadowDepth: any;
        highlightColor: any;
        highlightAlpha: any;
        highlightDepth: any;
        ambientColor: any;
        ambientAlpha: any;
        ambientBandCount: any;
        ambientTop: any;
        ambientHeight: any;
        ambientSpacing: any;
        detailBands: any;
        renderHeight: any;
        primaryWeight: any;
        ridgeWeight: any;
        detailWeight: any;
        smoothSubdivisions: any;
        maxSlopeDelta: any;
        ridgeCapColor: any;
        ridgeCapAlpha: any;
        ridgeCapThickness: any;
    };
    getViewportWidth(): number;
    computeSeed /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): number;
    createChunkRng /** @param {any} a @param {any} [b] */(a: any, b?: any): () => number;
    createIndexedRng /** @param {any} a @param {any} [b] */(a: any, b?: any): () => number;
    fractalNoise /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): number;
    valueNoise /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    hash /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
}
declare namespace Background {
    var PendingBackgrounds: Set<any>;
    var GenerationFrame: any;
    var GenerationBudgetMs: number;
    var MaxGenerationsPerFrame: number;
    var GenerateFrame: () => void;
    var ChangeBrightness: (a: any, b?: any) => number;
    var LerpColor: (a: any, b?: any, c?: any) => number;
}
declare class Camera {
    y: number;
    x: number;
    target: any;
    shaking: number;
    scale: number;
    tracking: boolean;
    lastY: number;
    lastX: number;
    count: number;
    minDelta: number;
    constructor();
    position /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    move /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    shake(a: any, b?: number): void;
    jerk /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    hasChanged(): boolean;
}
declare var gradient: {};
declare class Gradient extends PIXI.Graphics {
    w: any;
    h: any;
    c1: string;
    c2: string;
    drawTimeout: number | null;
    constructor(a: any, b?: any);
    resize /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    colors /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    draw(): void;
    offset(a: any): void;
    generateGradient(): PIXI.FillGradient;
}
declare var renderstats: {};
declare class RenderStats extends PIXI.Container {
    stats: PIXI.Text;
    constructor();
    setStats(a: any): void;
}
declare var gameshape: {};
declare var GameShape: {
    BASE: number;
    CIRCLE: number;
    POLYGON: number;
    RECTANGLE: number;
};
declare var gameobject: {};
declare class GameObject {
    id: any;
    type: any;
    p: any;
    g: any;
    audio: any;
    contact: any;
    visual: any;
    presentationSmoothing: any;
    presentedPosition: {
        x: any;
        y: any;
    };
    spawnVisualOffset: any;
    presentationSourceDeltaMs: any;
    constructor(a: any);
    update(a: any): any;
    enablePresentationSmoothing(a?: {}): this;
    setPresentationSmoothingEnabled(a: any): void;
    resetPresentationSmoothing(): void;
    updatePresentationSmoothing(): {
        x: any;
        y: any;
    };
    setPresentedPosition /** @param {any} a @param {any} [b] */(a: any, b?: any): {
        x: any;
        y: any;
    };
    getPresentedPosition(): any;
    getPresentedPositionObject(): any;
    getPresentedX(): any;
    getPresentedY(): any;
    static capOffset(a: any): void;
    static getNow(): number;
    static finiteOrZero(a: any): any;
    static isFiniteNumber(a: any): boolean;
    static clamp /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): number;
}
declare var entitycategory: {};
declare const EntityCategory: {
    STATIC_WORLD: number;
    DYNAMIC_WORLD: number;
    OPEN_WORLD: number;
    BARRIER: number;
    AGENT: number;
    BULLET: number;
    LIMB: number;
    ITEM: number;
    LOCAL: number;
    ZONE: number;
    ENTITY: number;
    GRENADE: number;
    BRIDGE: number;
    PARTICLE: number;
    OBJECTIVE: number;
    THROWN: number;
    BOT: number;
    ITEM_BARRIER: number;
    BOT_BULLET: number;
    LOCAL2: number;
    PLASMA: number;
    THROWN_GRENADE: number;
}, MaskBits: {};
declare var ghost: {};
declare class Ghost {
    id: any;
    prefab: number;
    p: {
        contact: any[];
        prefab: number;
        type: number;
        isBot: boolean;
        id: any;
        fixedRotation: boolean;
        sleepingAllowed: boolean;
        wd: number;
        bu: number;
        gs: number;
        bullet: boolean;
        sh: {
            t: number;
            v: {
                x: number;
                y: number;
            }[];
            c: number;
            fr: number;
            re: number;
            s: boolean;
            d: number;
        }[];
        x: any;
        y: any;
        vx: any;
        vy: any;
        gi: number;
    };
    g: {
        type: number;
        scale: {
            x: number;
            y: number;
        };
        offset: {
            x: number;
            y: number;
        };
        emitters: any[];
        onImpact: never[];
        onRemove: any[];
        onDamage: any[];
    };
    audio: {
        onRemove: {
            audio: Howl;
        }[];
    };
    constructor(a: any);
}
declare namespace Ghost {
    export var Shapes: {
        t: number;
        v: {
            x: number;
            y: number;
        }[];
        c: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _k: {
        onRemove: {
            audio: Howl;
        }[];
    };
    export { _k as Audio };
}
declare var quadmesh: {};
declare class QuadMesh extends PIXI.Mesh {
    constructor(a: any);
}
declare namespace QuadMesh {
    var Geometry: PIXI.Geometry;
    var VertexSource: string;
    var FragmentSource: string;
    var GpuSource: string;
    var CreateShader: (a?: PIXI.Texture<PIXI.BufferImageSource>) => PIXI.Shader;
    var Program: PIXI.Shader;
}
declare var energydragon: {};
declare class EnergyDragon extends PIXI.Sprite {
    target: any;
    trail: any;
    theta: number;
    torsoloweremitter1: any;
    torsoloweremitter2: any;
    torsoloweremitter3: any;
    emitter: any[];
    constructor(a: any, b?: any, c?: any, d?: any);
    update(a: any): void;
}
declare namespace EnergyDragon {
    var Material: {};
    var ID: string;
}
declare var energyvacuum: {};
declare class EnergyVacuum extends PIXI.Sprite {
    target: any;
    trail: any;
    theta: number;
    index: number;
    torsoloweremitter1: any;
    torsoloweremitter2: any;
    emitter: any[];
    constructor(a: any, b?: any, c?: any, d?: any);
    update(a: any): void;
}
declare namespace EnergyVacuum {
    var Material: {};
    var ID: string;
}
declare var energyjetfeet: {};
declare class EnergyJetFeet extends PIXI.Sprite {
    target: any;
    trail: any;
    leftlegemitter: any;
    rightlegemitter: any;
    emitter: any[];
    constructor(a: any, b?: any, c?: any, d?: any);
    update(a: any): void;
}
declare namespace EnergyJetFeet {
    var Material: {};
    var ID: string;
}
declare var energyjetfeet2: {};
declare class EnergyJetFeet2 extends PIXI.Sprite {
    target: any;
    trail: any;
    leftlegemitter: any;
    rightlegemitter: any;
    emitter: any[];
    constructor(a: any, b?: any, c?: any, d?: any);
    update(a: any): void;
}
declare namespace EnergyJetFeet2 {
    var Material: {};
    var ID: string;
}
declare var energyjetfeet3: {};
declare class EnergyJetFeet3 extends PIXI.Sprite {
    target: any;
    trail: any;
    leftlegemitter: any;
    rightlegemitter: any;
    emitter: any[];
    constructor(a: any, b?: any, c?: any, d?: any);
    update(a: any): void;
}
declare namespace EnergyJetFeet3 {
    var Material: {};
    var ID: string;
}
declare var energyjetfeetrope: {};
declare class JetFeetFlameRope extends PIXI.Container {
    phase: number;
    initialized: boolean;
    nodes: any[];
    nodePool: {
        x: number;
        y: number;
        born: number;
    }[];
    lastEmissionRoot: {
        x: number;
        y: number;
    };
    lastEmissionTime: number | null;
    textureShift: number;
    flipBaseFlameX: boolean;
    points: any[];
    previousPoints: any[];
    coreWidths: any[];
    glowWidths: any[];
    baseFlame: PIXI.Sprite;
    glow: any;
    glowCap: PIXI.Graphics;
    core: any;
    coreCap: PIXI.Graphics;
    ropeTextureHeight: any;
    eventMode: string;
    fading: boolean | undefined;
    constructor(a: any, b: any, c?: number);
    createCap /** @param {any} a @param {any} [b] */(a: any, b?: any): PIXI.Graphics;
    createLayer /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    reset(): void;
    clearNodes(): void;
    prependNode /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    compactNodes(a: any): void;
    update(a: any, b: any, c?: boolean): void;
    fade(): void;
    applyTextureShift(a: any): void;
    applyLayerTextureShift /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    updateFade(): boolean;
}
declare namespace JetFeetFlameRope {
    var POINT_COUNT: number;
    var FADE_STEP: number;
    var TEXTURE_SHIFT_STEP: number;
    var NODE_SPACING: number;
    var EMISSION_INTERVAL: number;
    var NODE_LIFETIME: number;
    var BASE_FLAME_OFFSET: number;
    var CAP_SCALE: number;
    var CAP_OFFSET: number;
    var PREVIEW_TRAIL_LENGTH: number;
    var PREVIEW_PULSE_AMOUNT: number;
    var PREVIEW_PULSE_SPEED: number;
    var PREVIEW_POINT_COUNT: number;
}
declare class EnergyJetFeetRope extends PIXI.Container {
    target: any;
    submerged: boolean;
    active: boolean;
    fadingFlames: any[];
    leftFootState: {
        direction: {
            x: number;
            y: number;
        };
        root: {
            x: number;
            y: number;
        };
    };
    rightFootState: {
        direction: {
            x: number;
            y: number;
        };
        root: {
            x: number;
            y: number;
        };
    };
    emitter: any[];
    eventMode: string;
    leftFlame: any;
    rightFlame: any;
    keepAlive: boolean | undefined;
    constructor(a: any, b?: any, c?: any, d?: any);
    createFlames(): void;
    start(): void;
    stop(): void;
    clear(): void;
    getFootState /** @param {any} a @param {any} [b] */(a: any, b?: any): null;
    update(): void;
}
declare namespace EnergyJetFeetRope {
    var Material: {};
    var ID: string;
    var FOOT_OFFSET: number;
}
declare var energychaos: {};
declare class EnergyChaos extends PIXI.Sprite {
    target: any;
    trail: any;
    theta: number;
    index: number;
    torsoloweremitter1: any;
    torsoloweremitter2: any;
    emitter: any[];
    constructor(a: any, b?: any, c?: any, d?: any);
    update(a: any): void;
}
declare namespace EnergyChaos {
    var Material: {};
    var ID: string;
}
declare var energy: {};
declare class Energy extends PIXI.Sprite {
    target: any;
    trail: any;
    emitter: any;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any);
    update(a: any): void;
}
declare namespace Energy {
    export var Material: {};
    var _l: {
        vacuum: typeof EnergyVacuum;
        dragon: typeof EnergyDragon;
        jetfeet: typeof EnergyJetFeet;
        jetfeet2: typeof EnergyJetFeet2;
        jetfeet3: typeof EnergyJetFeet3;
        jetfeetrope: typeof EnergyJetFeetRope;
        chaos: typeof EnergyChaos;
    };
    export { _l as Map };
}
declare var agent: {};
declare class Agent extends GameObject {
    visual: PIXI.Container<PIXI.ContainerChild>;
    animations: {
        _: boolean;
    };
    prevFacing: number;
    facing: number;
    shotReadyAt: any;
    ammoReloadType: any;
    ammoReloadStartedAt: number;
    health: number;
    alive: boolean;
    burning: boolean;
    name: any;
    team: number | null;
    level: any;
    skill: any;
    label: any;
    customization: any;
    killObject: any;
    pendingDeathImpact: {
        id: null;
        velocity: {
            x: number;
            y: number;
        };
    };
    itemGore: {};
    secondaryItemCustomTexture: string;
    primaryItemCustomTexture: string;
    energy: EnergyJetFeetRope | null;
    jetVisualActive: boolean;
    underwaterJetEmitters: any[] | null;
    underwaterJetEmittersActive: boolean;
    onJet: any;
    onRequestHideChatBubble: any;
    onRequestDisplayChatBubble: any;
    onRequestRemoveEmitter: any;
    onRequestCreateEmitter: any;
    onRequestCreateEffect: any;
    onRequestCreateRope: any;
    extraRope: any;
    extra: any;
    bandana: any;
    face: any;
    stateChangeMap: {
        [StateChange.Agent.ALIVE]: (g: any) => {
            i: any;
        };
        [StateChange.Agent.TELEPORT]: (g: any) => void;
        [StateChange.Agent.JET_START]: () => void;
        [StateChange.Agent.JET_STOP]: () => void;
        [StateChange.Agent.HEALTH]: (g: any) => void;
        [StateChange.Agent.BURN]: (g: any) => void;
        [StateChange.Agent.BALL_CHARGE]: (g: any) => void;
        [StateChange.Item.RELOAD]: (g: any) => void;
        [StateChange.Item.INIT_USE]: (g: any) => {
            i: any;
            bowTensionStarted: any;
        } | undefined;
        [StateChange.Item.USE]: (g: any) => {
            i: any;
            bowTensionStarted: null;
        } | undefined;
        [StateChange.Item.STOP_USE]: (g: any) => {
            i: any;
            bowTensionStarted: null;
        } | undefined;
        [StateChange.Item.EQUIP]: (g: any) => void;
        [StateChange.Item.CARRY_PRIMARY]: (g: any) => void;
        [StateChange.Item.CARRY_SECONDARY]: (g: any) => void;
        [StateChange.Item.CARRY_BELT]: (g: any) => void;
        [StateChange.Item.DROP]: (g: any) => void;
        [StateChange.Item.REMOVE_PRIMARY]: (g: any) => void;
        [StateChange.Item.REMOVE_SECONDARY]: (g: any) => void;
        [StateChange.Item.REMOVE_BELT]: (g: any) => void;
        [StateChange.Item.GORE]: (g: any) => void;
    };
    ballCharge: boolean;
    suppressTerrainGore: boolean | undefined;
    jetting: boolean | undefined;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any, f?: any);
    init(): void;
    applyState(a: any): void | null;
    setAnimations(a: any): void;
    setAmmoReload /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    equip(a: any): void;
    carryPrimary(a: any): void;
    carrySecondary(a: any): void;
    carryBelt(a: any): void;
    removePrimary(a: any): void;
    removeSecondary(a: any): void;
    removeBelt(a: any): void;
    drop(a: any): void;
    setItemGore(a: any): void;
    getItemCustomTexture(a: any): any;
    onSpawn(): void;
    onDissolve(): void;
    update(): void;
    setHealth(a: any): void;
    setAlive(a: any): {
        i: any;
    };
    startJetting(): void;
    setJetUnderwaterVisual(a: any): void;
    getUnderwaterJetEmitters(): any[];
    updateUnderwaterJetEmitterOffsets(): void;
    stopUnderwaterJetEmitters(): void;
    startJetVisual(): void;
    ensureJetVisualAttached(): boolean;
    stopJetting(a?: boolean): void;
    shouldKeepJetVisualDuringRoll(): boolean;
    stopJetVisual(a?: boolean): void;
    teleport(a: any): void;
    addEmitter(a: any): void;
    removeEmitter(a: any): void;
}
declare var terrainseams: {};
declare class TerrainSeams {
    physics: any;
    category: any;
    slop: any;
    pointSlop: number;
    normalDot: number;
    world: any;
    supportWorld: any;
    local: any;
    replacement: any;
    bounds: any;
    fixtureBounds: any;
    boundary: {};
    featureEdge: {};
    points: {
        x: number;
        y: number;
    }[];
    fixtures: any[];
    bodies: any[];
    bodyCount: number;
    fixtureCount: number;
    floorFaces: any[];
    floorCount: number;
    intervalStarts: any[];
    intervalEnds: any[];
    group: any[];
    groupCount: number;
    heads: null[];
    tails: null[];
    probe: {
        m_fixtureA: null;
        m_fixtureB: null;
        GetManifold(): any;
        GetWorldManifold(d: any): void;
    };
    step: number;
    playerFixture: any;
    patchLo: number | undefined;
    patchHi: number | null | undefined;
    intervalCount: number | undefined;
    static hasCeilingContact /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): boolean;
    static groundFollowState(a: any): any;
    static groundFollowSupport /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): boolean;
    static isGroundLocomotion /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    static getGroundWalkForce /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): any;
    static groundFollowWeight(a: any): number;
    static groundFollowLength /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): number;
    static groundFollowLengthWeight(a: any): number;
    static followGroundVelocity /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): boolean;
    static groundFollowRay /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): -1 | null;
    static updateCrouchAngle(a: any, b: any, c: any, d: any, e?: number): boolean;
    static updateProneSupport(a: any): boolean;
    static getProneCrawlForce /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): any;
    static getProneAngle(a: any, b: any, c: any, d: any, e?: number, f?: boolean, g?: boolean): any;
    static proneSupportRay /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): -1 | null;
    static setRollAngle /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    static setRollAngleStep /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    static rollSurfacePose /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any): boolean;
    static rollSurfaceFixture(a: any): boolean;
    static rollSurfaceVertex /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any): void;
    static rollSurfaceRay /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): -1 | null;
    static rollSupportRay /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): -1 | 0;
    static rollSupport /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): number;
    constructor(a: any, b?: any);
    beginStep(): void;
    eligible(a: any): any;
    collides /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    addBody(a: any): void;
    playerBounds /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    releaseGeometry(): void;
    releaseGroup(): void;
    available(a: any, b?: boolean): any;
    filter(a: any): any;
    collectFloorFaces(a: any): void;
    hasCoplanarFloor(): boolean;
    filterJunctionCircle /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): boolean;
    orderContacts(a: any): void;
    compatible /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    consolidate /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): boolean;
    buildPatch /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    reconstruct(a: any, b: any, c: any, d: any, e: any, f?: number): boolean;
    liveSupport /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    edge /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    parameter /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): number;
    behind /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    connected /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    recoverFeatures /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    coveredFeature /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): boolean;
    coveredInterval(a: any, b: any, c: any, d: any, e: any, f?: any, g?: boolean): boolean;

    static ceilingManifold: any;
    static ceilingSupport: any;
    static crawlForce: any;
    static crawlManifold: any;
    static groundFollowScratch: any;
    static proneManifold: any;
    static proneRay: any;
    static rollScratch: any;}
declare var actorhitboxes: {};
declare class ActorHitboxes {
    static proneSlopeLowering /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    static create(a: any, b: any, c: any, d: any, e: any, f: any, g?: number): {
        scale: number;
        simplified: boolean;
        dimensions: number;
        proxyBody: any;
        fixtures: never[];
        damageVolumes: never[];
        bodies: never[];
        fixtureRebuilds: number;
        poseRevision: number;
        layout: {
            standing: {
                head: {
                    x: number;
                    y: number;
                    angle: number;
                };
                torso: {
                    x: number;
                    y: number;
                    angle: number;
                };
                legs: {
                    x: number;
                    y: number;
                    angle: number;
                };
            };
            compact: {
                head: {
                    x: number;
                    y: number;
                    angle: number;
                };
                torso: {
                    x: number;
                    y: number;
                    angle: number;
                };
                legs: {
                    x: number;
                    y: number;
                    angle: number;
                };
            };
            crouching: {
                head: {
                    x: number;
                    y: number;
                    angle: number;
                };
                torso: {
                    x: number;
                    y: number;
                    angle: number;
                };
                legs: {
                    x: number;
                    y: number;
                    angle: number;
                };
            };
            prone: {
                y: number;
                headOffset: number;
                legsOffset: number;
                torsoAngle: number;
                legsAngle: number;
            };
        };
    };
    static updatePose /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
}
declare namespace ActorHitboxes {
    var NextContactKey: number;
}
declare var ballcharge: {};
declare class BallCharge {
    static wantsCharge /** @param {any} a @param {any} [b] */(a: any, b?: any): b is never;
    static consumeAmmo /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    static damageFraction /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    static trackContact /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
    static flushImpacts /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    static trackThrownContact /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    static rise /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    static sync /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    static areEnemies /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    static solveContact /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
}
declare namespace BallCharge {
    var RESTITUTION: number;
    var AMMO: number;
    var BOUNCE_COST: number;
    var DURATION: number;
    var RELOAD_SECONDS: number;
    var RISE_SPEED: number;
    var RISE_ACCELERATION: number;
}
declare var player: {};
declare class Player extends Agent {
    g: {
        z: number;
        onImpact: never[];
        onAdd: any[];
        animate: boolean;
    };
    bot: boolean;
    hasBandana: boolean;
    bodyPartScale: number;
    useOptimizedTextures: boolean;
    clanId: any;
    clanName: any;
    audio: {
        onContact: {
            audio: Howl;
            delta: number;
        }[][];
        onAdded: {
            audio: Howl;
        }[];
    };
    input: InputState;
    gearContainer: PIXI.Container<PIXI.ContainerChild>;
    secondaryGearContainer: PIXI.Container<PIXI.ContainerChild>;
    primaryItem: any;
    facingDir: number;
    facing: any;
    virtualFacing: number;
    hasTurned: boolean;
    isLocal: boolean;
    facingChanged: boolean;
    isPlayer: boolean;
    tracking: boolean;
    lastInjuredTime: number;
    spawnProtectedUntil: number;
    age: number;
    pointer: {
        x: number;
        y: number;
    };
    offset: {
        x: number;
        y: number;
    };
    animFns: any[];
    doMagicBound: () => void;
    doTossBound: () => void;
    head: GameObject;
    torsoupper: GameObject;
    torsolower: GameObject;
    armleftupper: GameObject;
    armleftlower: GameObject;
    armrightupper: GameObject;
    armrightlower: GameObject;
    legleftupper: GameObject;
    legleftlower: GameObject;
    legrightupper: GameObject;
    legrightlower: GameObject;
    jetFuel: number;
    maxJetFuel: number;
    proneRight: boolean;
    proneLeft: boolean;
    prone: boolean;
    crouching: boolean;
    jetting: boolean;
    gearArmOffsetY: number;
    gearArmOffsetX: number;
    reloadCount: number;
    presentedAge: number;
    breathDisplace: number;
    breathing: number;
    moveTimer: number;
    weaponBashCount: number;
    punchCount: number;
    gearArmRight: any;
    gearArmLeft: any;
    hostile: boolean;
    hostileHeadGlow: any;
    ragdoll: {
        head: GameObject;
        armrightlower: GameObject;
        armrightupper: GameObject;
        torsoupper: GameObject;
        torsolower: GameObject;
        armleftlower: GameObject;
        armleftupper: GameObject;
        legrightlower: GameObject;
        legrightupper: GameObject;
        legleftlower: GameObject;
        legleftupper: GameObject;
    };
    bodyparts: GameObject[];
    simulationWeaponX: any;
    secondaryItem: any;
    beltItemType: any;
    beltGearContainer: PIXI.Container<PIXI.ContainerChild> | undefined;
    beltAmmoCount: any;
    beltGravityOrigin: PIXI.Point | undefined;
    beltGravityTip: PIXI.Point | undefined;
    beltPresentedAt: number | undefined;
    beltDeathAt: number | null | undefined;
    beltPreviousVx: PIXI.Point | undefined;
    crouchOffsetWeapon: any;
    weaponArmAlignmentOrigin: PIXI.Point | undefined;
    weaponArmAlignmentEnd: PIXI.Point | undefined;
    supportHandTarget: PIXI.Point | undefined;
    upperArmDebugOpacity: any[] | undefined;
    pistolAimPoint: PIXI.Point | undefined;
    pistolLeftShoulder: PIXI.Point | undefined;
    pistolOtherShoulder: PIXI.Point | undefined;
    pistolPoseGuns: any[] | undefined;
    pistolPose: {} | undefined;
    effectPistolPoint: {
        x: number;
        y: number;
    } | undefined;
    pistolArms: PIXI.Container<PIXI.ContainerChild> | undefined;
    pistolArmSources: any[] | undefined;
    pistolArmCopies: any[] | undefined;
    pistolBackArms: PIXI.Container<PIXI.ContainerChild> | undefined;
    pistolRearArms: PIXI.Container<PIXI.ContainerChild> | undefined;
    pistolBackOrigin: PIXI.Point | undefined;
    pistolBackPosition: PIXI.Point | undefined;
    pistolBackMatrix: PIXI.Matrix | undefined;
    pistolShoulder: PIXI.Point | undefined;
    pistolGestureElbow: PIXI.Point | undefined;
    pistolGestureWrist: PIXI.Point | undefined;
    bowHoldingUpperVisual: any;
    bowDrawingUpperVisual: any;
    bowDrawingLowerVisual: any;
    bowHoldingUpperArm: PIXI.Sprite | undefined;
    bowHoldingUpperContainer: PIXI.Container<PIXI.ContainerChild> | undefined;
    bowHoldingShoulder: PIXI.Point | undefined;
    bowDrawingArm: PIXI.Container<PIXI.ContainerChild> | undefined;
    bowDrawingUpperArm: PIXI.Sprite | undefined;
    bowDrawingLowerArm: PIXI.Sprite | undefined;
    _gearArmHiddenForProneEnd: boolean | undefined;
    simulationEffectScope: any;
    presentationPending: boolean | undefined;
    ballChargeEmitters: any[] | null | undefined;
    secondaryGearSway: number | undefined;
    reloadAnimationStopped: boolean | undefined;
    weaponBashFrame: number | undefined;
    weaponRollPoseJustEnded: 0 | boolean | undefined;
    weaponRollPoseActive: number | undefined;
    runSwingWeight: number | undefined;
    runSwingPhase: any;
    runSwingParts: any[] | undefined;
    runSwingGlobal: PIXI.Matrix | undefined;
    runSwingLocal: PIXI.Matrix | undefined;
    runSwingInverse: PIXI.Matrix | undefined;
    runSwingTransform: PIXI.Matrix | undefined;
    calculatedWeaponPose: {} | undefined;
    effectWeaponDisplay: {
        scale: {};
        anchor: {};
    } | undefined;
    effectWeaponPoint: {
        x: number;
        y: number;
    } | undefined;
    armDrawOrderParent: any;
    armDrawOrderFacingLeft: any;
    spawnFadePending: boolean | undefined;
    bowAimMotion: number | undefined;
    breathBaseHeadX: any;
    breathBaseHeadY: any;
    breathBaseTorsoX: any;
    breathPresentedHeadX: any;
    breathPresentedHeadY: any;
    breathPresentedTorsoX: any;
    legDrawOrderParent: any;
    legDrawOrderFacingLeft: any;
    pistolDirectionOrigin: PIXI.Point | undefined;
    pistolDirectionTip: PIXI.Point | undefined;
    effectHandPoint: {
        x: number;
        y: number;
    } | undefined;
    constructor(a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, k: any, l?: string, m?: boolean);
    setHostile(a: any): void;
    updateHostileHeadGlowVisibility(): void;
    applyMapVisualStyle(): void;
    styleVisualForMap(a: any): void;
    cacheBodyPartBaseScale(a: any): void;
    applyBodyPartVisualScale(a: any): void;
    applyBodyPartScale(): void;
    applyLowerArmTextureScale /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    applyLowerArmFacingTexture /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    applyFacingOffset(a: any, b: any, c?: any): void;
    syncLowerLegFacingOffsets(a: any): void;
    syncLowerArmFacingTextures(a: any): void;
    init(): void;
    onSpawn(): void;
    equip /** @param {any} a @param {any} [b] */(a: any, b?: any): null;
    carryPrimary /** @param {any} a @param {any} [b] */(a: any, b?: any): null;
    carrySecondary /** @param {any} a @param {any} [b] */(a: any, b?: any): null;
    carryBelt /** @param {any} a @param {any} [b] */(a: any, b?: any): null;
    updateBeltAmmo(a: any): void;
    setBeltAmmo(a: any): void;
    presentBelt(a: any): void;
    removePrimary(a: any): null;
    removeSecondary(a: any): null;
    removeBelt(a: any): null;
    drop(a: any): void;
    setHealth(a: any): void;
    hasAnim(a: any): boolean;
    setAnimations(a: any): void;
    doMagic(): void;
    doToss(): void;
    setLimbGoreTexture /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    restoreDeadUpperArmOrientation(): void;
    setAlive(a: any): {
        i: any;
    };
    addInjury /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    removeInjuries(a: any): void;
    hideLeftArm(): void;
    hideRightArm(): void;
    restoreCrouchedWeaponOffset(): void;
    applyCrouchedWeaponOffset(): void;
    syncWeaponUpperArms(): void;
    syncWeaponSupportHand(a: any): void;
    restoreUpperArmDebugOpacity(): void;
    applyUpperArmDebugOpacity(): void;
    static getPistolUpperArmLength /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    getPistolShoulder /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    calculatePistolPose(a?: boolean): any;
    getSimulationPistolPoint(a: any, b?: any, c?: any, d?: number): any;
    syncPistolGrip(): void;
    isPistolGestureActive(): any;
    syncPistolGesture(): void;
    isWeaponRollPoseActive(): boolean;
    getWeaponRollRotation(): number;
    syncBowPresentation(): void;
    syncBowHoldingArm(): void;
    getGearArmLeftY(): number;
    getProneLeftGearArmRotationOffset(): number;
    syncProneEndArmVisibility(): void;
    enableLocalPresentationSmoothing(a?: {}): void;
    setLocalPresentationSmoothingEnabled(a: any): void;
    setSpawnProtectionTicks(a: any, b?: number): void;
    isSpawnProtected(a?: number): boolean;
    static getCurrentTime(): number;
    get simulationEffects(): any;
    set simulationEffects(a: any);
    update /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    stopBallChargeVisual(): void;
    updateBallChargeVisual(a: any): void;
    advanceSimulation(a: any): void;
    isRunSwingAllowed(): boolean;
    advanceRunSwing(a: any): void;
    restoreRunSwing(): void;
    presentRunSwing(): void;
    calculateWeaponPose(a: any, b?: boolean): {};
    getWeaponPoseUpperArmRotation /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): null;
    getSimulationWeaponPoint(a: any, b?: any): any;
    static transformPosePoint /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] @param {any} [h] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): null;
    present(a: any, b: any, c: any, d?: boolean): void;
    presentBreathing(a: any): void;
    updateFacing(a: any): void;
    updateFacingDir(a: any, b?: boolean): void;
    getLegFacingLeft(): any;
    invalidateBodyPartDrawOrder(): void;
    swapBodyPartDrawOrder /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    syncLegDrawOrder(a: any): boolean;
    updateBodyOrientation(a?: boolean, b?: any): boolean;
    getWeaponRotation(): number;
    getPrimaryAnchor(a: any): any;
    updateOffset(): void;
    static isFiniteNumber(a: any): boolean;
    static isFiniteVec2(a: any): boolean;
    static sanitizeVec2(a: any, b: any, c?: any): null;
    static getRagdollFollowVelocity(a: any, b?: any): null;
    static getGoreTextureScale(a: any): number;
    static getRagdollAnimation /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    static getMovementAwareRagdollAnimationId /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    static resetRagdollMotion(a: any): void;
    static getRagdollScratch(a: any): any;
    static isDetailedRagdollPoseVisible(a: any, b: any, c: any, d?: number): boolean;
    static updateRagdollSolverLOD(a: any): void;
    static requiresContinuousRagdollPose(a: any): any;
    static shouldUpdateDetailedRagdollPose /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    static getProneEndShoulderTarget /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): number;
    static updateProneEnd /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    static isGroundedStanding(a: any): boolean;
    static getRunSlope(a: any, b?: boolean): number;
    static projectStandingJoint(a: any, b: any, c: any, d: any, e?: number, f?: number, g?: boolean): void;
    static sampleBowDraw /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    static restoreRagdollPose /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    static animateRagdoll(a: any, b?: boolean, c?: boolean): void;
    applyPrimaryItemDisplayScale(): void;

    static BELT_TEXTURES: any;
    static runSlopeManifold: any;}
declare namespace Player {
    var _m: {
        onContact: {
            audio: Howl;
            delta: number;
        }[][];
        onAdded: {
            audio: Howl;
        }[];
    };
    export { _m as Audio };
    export var Input: InputState;
    export var FACING_LEFT: number;
    export var FACING_RIGHT: number;
    export var DEBUG_UPPER_ARM_ORIENTATION: boolean;
    export var FULL_HEALTH: number;
    export var ENERGY: number;
    export var MAX_RAGDOLL_FOLLOW_SPEED: number;
    export var SERVER_TICK_DURATION_MS: number;
    export var OFFSCREEN_RAGDOLL_UPDATE_DIVISOR: number;
    export var RAGDOLL_DETAIL_RADIUS: number;
    export var RAGDOLL_SOLVER_LOD_RADIUS: number;
    export var OFFSCREEN_RAGDOLL_VELOCITY_ITERATIONS: number;
    export var OFFSCREEN_RAGDOLL_SOLVE_INTERVAL_MS: number;
    export var DEAD_RAGDOLL_VELOCITY_ITERATIONS: number;
    export var ZERO_VECTOR: {
        x: number;
        y: number;
    };
    export var RUN_SWING_ARMS: string[];
    export var RUN_SWING_PROPERTIES: string[];
    export var RUN_HUNCH_JOINTS: string[];
    export var ARM_JOINTS: string[];
    export var ROLL_JOINTS: (string | boolean)[][];
    export var LIVE_GORE_TEXTURE_SCALE: number;
    export var DEAD_GORE_TEXTURE_SCALE: number;
    export var BODY_PART_SCALE: number;
    export var WEAPON_DISPLAY_SCALE: number;
    export var MAP_STYLE_TINT: number;
    export var PRONE_LEFT_GEAR_ARM_Y_OFFSET: number;
    export var PRONE_LEFT_GEAR_ARM_ROTATION_OFFSET: number;
    export var AMP_TABLE: {
        head: string[];
        torsoupper: string[];
        torsolower: string[];
        armleftupper: string[];
        armleftlower: string[];
        armrightupper: string[];
        armrightlower: string[];
        legleftupper: string[];
        legleftlower: string[];
        legrightupper: string[];
        legrightlower: string[];
        all: string[];
    };
    export var REV_AMP_TABLE: {
        neckjoint: string[];
        torsojoint: string[];
        rightshoulderjoint: string[];
        leftshoulderjoint: string[];
        rightelbowjoint: string[];
        leftelbowjoint: string[];
        righthipjoint: string[];
        lefthipjoint: string[];
        rightkneejoint: string[];
        leftkneejoint: string[];
    };
}
declare var trainer: {};
declare class Trainer extends Player {
    constructor(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, k?: any);
}
declare var zombie: {};
declare class Zombie extends Player {
    isZombie: boolean;
    contrastGlow: PIXI.Graphics;
    constructor(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, k?: any);
    createContrastGlow(): PIXI.Graphics;
    updateContrastGlowVisibility(): void;
    setAlive(a: any): any;
}
declare namespace Zombie {
    var Prefix: string;
    var TINT: number;
    var GLOW_TINT: number;
}
declare var prefablist: {};
declare const PrefabList: {
    Fist: number;
    ShotgunPellet: number;
    SubmachineGunBullet: number;
    LauncherNade: number;
    BarrettBullet: number;
    ShockRifleBullet: number;
    PulseGunBullet: number;
    FlameThrowerLiquid: number;
    RPGRocket: number;
    RifleBullet: number;
    LaserGunBullet: number;
    AK47Bullet: number;
    Nade: number;
    ClusterNade: number;
    ClusterNadeFragment: number;
    ShurikenBlade: number;
    DesertEagleBullet: number;
    SnowballProjectile: number;
    MinigunBullet: number;
    MAC10Bullet: number;
    Arrow: number;
    RLRocket: number;
    CarbineBullet: number;
    GhostLaser: number;
    Boomerang: number;
    M60Bullet: number;
    UziBullet: number;
    X75Nade: number;
    TinyShrapnel: number;
    GhostBotDebris1: number;
    GhostBotDebris2: number;
    GhostBotDebris3: number;
    Rifle: number;
    Shotgun: number;
    NadeLauncher: number;
    SubmachineGun: number;
    Chainsaw: number;
    Barrett: number;
    ShockRifle: number;
    PulseGun: number;
    FlameThrower: number;
    RPG: number;
    LaserGun: number;
    Shuriken: number;
    LinkGun: number;
    DesertEagle: number;
    Deagle: number;
    Snowball: number;
    AK47: number;
    Minigun: number;
    X75: number;
    MAC10: number;
    Bow: number;
    RocketLauncher: number;
    Carbine: number;
    BoomerangGun: number;
    M60: number;
    Uzi: number;
    Bouncyball: number;
    HealthBox: number;
    NadeBox: number;
    ClusterNadeBox: number;
    SnowballBox: number;
    ShurikenBox: number;
    Flag: number;
    ShotgunAmmo: number;
    RifleAmmo: number;
    AK47Ammo: number;
    BarrettAmmo: number;
    ChainsawAmmo: number;
    DesertEagleAmmo: number;
    FlameThrowerAmmo: number;
    LaserGunAmmo: number;
    LinkGunAmmo: number;
    MAC10Ammo: number;
    MinigunAmmo: number;
    NadeLauncherAmmo: number;
    PulseGunAmmo: number;
    RPGAmmo: number;
    ShockRifleAmmo: number;
    SMGAmmo: number;
    X75Ammo: number;
    Gold: number;
    Ghost: number;
}, AgentMap: {
    1: typeof Zombie;
    2: typeof Trainer;
}, PrefabClasses: {
    1: typeof ShotgunPellet;
    2: typeof SubmachineGunBullet;
    3: typeof LauncherNade;
    4: typeof BarrettBullet;
    5: typeof ShockRifleBullet;
    6: typeof PulseGunBullet;
    7: typeof FlameThrowerLiquid;
    8: typeof RPGRocket;
    9: typeof RifleBullet;
    10: typeof LaserGunBullet;
    12: typeof AK47Bullet;
    20: typeof Nade;
    21: typeof ClusterNade;
    22: typeof ClusterNadeFragment;
    23: typeof ShurikenBlade;
    24: typeof DesertEagleBullet;
    25: typeof SnowballProjectile;
    26: typeof MinigunBullet;
    27: typeof X75Nade;
    28: typeof MAC10Bullet;
    29: typeof Arrow;
    30: typeof RLRocket;
    31: typeof CarbineBullet;
    32: typeof GhostLaser;
    33: typeof Boomerang;
    34: typeof M60Bullet;
    35: typeof UziBullet;
    101: typeof TinyShrapnel;
    102: typeof GhostBotDebris1;
    103: typeof GhostBotDebris2;
    104: typeof GhostBotDebris3;
    200: typeof Rifle;
    201: typeof Shotgun;
    202: typeof NadeLauncher;
    203: typeof SubmachineGun;
    204: typeof Chainsaw;
    205: typeof Barrett;
    207: typeof ShockRifle;
    208: typeof PulseGun;
    209: typeof FlameThrower;
    210: typeof RPG;
    211: typeof LaserGun;
    213: typeof LinkGun;
    214: typeof DesertEagle;
    226: typeof Deagle;
    216: typeof AK47;
    217: typeof Minigun;
    218: typeof X75;
    219: typeof MAC10;
    220: typeof Bow;
    221: typeof RocketLauncher;
    222: typeof Carbine;
    223: typeof BoomerangGun;
    224: typeof M60;
    225: typeof Uzi;
    300: typeof Bouncyball;
    400: typeof HealthBox;
    401: typeof NadeBox;
    402: typeof ClusterNadeBox;
    403: typeof SnowballBox;
    404: typeof ShurikenBox;
    600: typeof Flag;
    700: typeof ShotgunAmmo;
    701: typeof RifleAmmo;
    702: typeof AK47Ammo;
    703: typeof BarrettAmmo;
    704: typeof ChainsawAmmo;
    705: typeof DesertEagleAmmo;
    706: typeof FlameThrowerAmmo;
    707: typeof LaserGunAmmo;
    708: typeof LinkGunAmmo;
    709: typeof MAC10Ammo;
    710: typeof MinigunAmmo;
    711: typeof NadeLauncherAmmo;
    712: typeof PulseGunAmmo;
    713: typeof RPGAmmo;
    714: typeof ShockRifleAmmo;
    715: typeof SMGAmmo;
    716: typeof X75Ammo;
    800: typeof Gold;
    900: typeof Ghost;
};
declare var shockwavefilter: {};
declare class ShockwaveFilter extends PIXI.Filter {
    time: any;
    uniforms: any;
    constructor(a: any);
    apply /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    get center(): any;
    set center(a: any);
    get centerX(): any;
    set centerX(a: any);
    get centerY(): any;
    set centerY(a: any);
    get speed(): any;
    set speed(a: any);
    get amplitude(): any;
    set amplitude(a: any);
    get wavelength(): any;
    set wavelength(a: any);
    get brightness(): any;
    set brightness(a: any);
    get radius(): any;
    set radius(a: any);
}
declare namespace ShockwaveFilter {
    var DEFAULT_OPTIONS: {
        center: {
            x: number;
            y: number;
        };
        speed: number;
        amplitude: number;
        wavelength: number;
        brightness: number;
        radius: number;
        time: number;
    };
    var VertexSource: string;
    var FragmentSource: string;
    var Program: PIXI.GlProgram;
    var GpuSource: string;
    var GpuProgram: PIXI.GpuProgram;
}
declare var particleeffects: {}, PP: {
    AMOUNT: string;
    TEXTURE: string;
    TTL: string;
    TTL_MOD: string;
    SCALE: string;
    SCALE_CHANGE: string;
    SCALE_RANDOM: string;
    VELOCITY_STRETCH: string;
    VELOCITY_STRETCH_AMOUNT: string;
    ALPHA: string;
    ALPHA_CHANGE: string;
    GRAVITY_SCALE: string;
    ROTATION: string;
    ANGULAR: string;
    ANGULAR_RANDOM: string;
    VELOCITY_RANDOM: string;
    ORIGIN: string;
    FOREGROUND: string;
    FILTERS: string;
    ANCHOR: string;
    ANCHOR_RELATIVE: string;
    COLLIDE: string;
    NORMAL: string;
    VELOCITY_MULTIPLIER: string;
    HORIZONTAL_DRAG: string;
    VELOCITY: string;
    EJECTION_ANGLE: string;
    EJECTION_DELTA: string;
    DELTA_RANDOM: string;
    VELOCITY_ALPHA_TTL: string;
    PREFAB: string;
    TYPE: string;
    RAY_DELTA: string;
    LOCAL: string;
    AMOUNT_RANDOM: string;
    SCALE_FACTOR: string;
    NORMAL_MULTIPLIER: string;
    APPEAR: string;
    CAM_JERK: string;
    CAM_SHAKE: string;
    GLOBAL: string;
    AUDIO: string;
    TINT: string;
    DYNAMIC_ALT: string;
    BUFFER_ID: string;
    ROPE: string;
    RANDOM_OFFSET: string;
    TRAIL: string;
};
declare const ParticleEffects: {
    LOCAL_LINK_GUN: number;
    LOCAL_SAW: number;
    LOCAL_PUNCH: number;
    LOCAL_EXP: number;
};
declare var PE: {
    speed: number;
    amplitude: number;
    wavelength: number;
    brightness: number;
    radius: number;
};
declare var burnflamerope: {};
declare class BurnFlameRope extends PIXI.Container {
    target: any;
    ttl: number;
    duration: number;
    alphaDrop: number;
    phase: number;
    flameScale: number;
    flickerTime: number;
    intensity: number;
    flickerSpeed: number;
    lastUpdateTime: number;
    lastRoot: {
        x: number;
        y: number;
    };
    targetPosition: {
        x: number;
        y: number;
    };
    visualCenterOffset: {
        x: number;
        y: number;
    };
    accelerationY: number;
    accelerationX: number;
    lastMotionY: number;
    lastMotionX: number;
    motionY: number;
    motionX: number;
    lastAngle: any;
    angularMotion: number;
    sparkAccumulator: number;
    owner: any;
    onSpark: any;
    persistentBurn: boolean;
    extinguished: boolean;
    points: any[];
    previousPoints: any[];
    coreWidths: any[];
    glowWidths: any[];
    glow: any;
    core: any;
    eventMode: string;
    speedStretch: number | undefined;
    riseX: number | undefined;
    riseY: number | undefined;
    constructor(a: any, b?: any);
    createLayer(a: any): any;
    updateGeometry(): void;
    getPhysicsCullPosition(): {
        x: number;
        y: number;
    };
    updateOffscreen(): void;
    refresh(a?: number): void;
    update(): void;
    updateSparks(a: any, b: any, c?: number): void;
    emitSpark(): void;
    getTargetPosition(): {
        x: number;
        y: number;
    };
    getVisualCenterOffset(a: any): number;
    static clamp /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): number;
    static normalizeAngle(a: any): any;
}
declare namespace BurnFlameRope {
    var POINT_COUNT: number;
    var BASE_NODE_SPACING: number;
    var SEGMENT_SPACING_SCALE: number;
    var SPARK_EMISSION_SCALE: number;
    var NODE_PROFILES: {
        attachmentBlend: any;
        speedLength: number;
        taper: number;
    }[];
    var DEFAULT_TTL: number;
    var FX: any;
}
declare var goreribbon: {};
declare class GoreRibbon extends PIXI.MeshRope {
    target: any;
    points: any;
    nodes: any[];
    nodePool: {
        x: number;
        y: number;
    }[];
    lastSample: {
        x: number;
        y: number;
    };
    lastSampleInitialized: boolean;
    targetPosition: {
        x: number;
        y: number;
    };
    currentMaxLength: number;
    ttl: number;
    alphaDrop: number;
    baseAlpha: number;
    eventMode: string;
    isGoreRibbon: boolean;
    extinguished: boolean | undefined;
    constructor(a: any, b?: any);
    installNarrowGeometry(): void;
    update(): void;
    getTargetAlpha(): number;
    syncTargetFade(): void;
    rebuildLowSpeedPoints /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    clearNodes(): void;
    prependNode /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    sampleMovement(a: any): void;
    rebuildPoints(a: any): void;
    applyUvs(a: any): void;
    collapsePoints(a: any): void;
    getPosition(): {
        x: number;
        y: number;
    };
}
declare namespace GoreRibbon {
    var POINT_COUNT: number;
    var NODE_SPACING: number;
    var MIN_VISIBLE_SPEED: number;
    var LOW_SPEED_GRAVITY_LIMIT: number;
    var STATIONARY_LENGTH: number;
    var LENGTH_PER_SPEED: number;
    var MAX_LENGTH: number;
    var WIDTH_SCALE: number;
    var MIN_TINT_BRIGHTNESS: number;
    var MAX_TINT_BRIGHTNESS: number;
    var FX: {
        tex: string;
    };
}
declare var lightningbeamshader: {};
declare class LightningBeamShader {
    static Create(a: any): PIXI.Shader;
    static CreateBeam /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): PIXI.Mesh<PIXI.MeshGeometry, PIXI.Shader>;
    static UpdateGeometry /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): number;
}
declare namespace LightningBeamShader {
    var HALF_WIDTH: number;
    var MAX_LENGTH: number;
    var VertexSource: string;
    var FragmentSource: string;
    var Program: PIXI.GlProgram;
    var GpuSource: string;
    var GpuProgram: PIXI.GpuProgram;
}
declare var projectiletrailrope: {};
declare class ProjectileTrailRope extends PIXI.MeshRope {
    points: any;
    targetPosition: {
        x: number;
        y: number;
    };
    launchPosition: PIXI.Point;
    historyX: Float32Array<ArrayBuffer>;
    historyY: Float32Array<ArrayBuffer>;
    ttl: number;
    alphaDrop: number;
    eventMode: string;
    isProjectileTrail: boolean;
    fadeComplete: boolean;
    releasing: boolean;
    target: any;
    arrowTrail: boolean | undefined;
    impactRecorded: boolean | undefined;
    nodeSpacing: number | undefined;
    fullAlphaSpeed: number | undefined;
    maxAlpha: number | undefined;
    fadeInRate: number | undefined;
    historyCount: number | undefined;
    lastSampleX: any;
    lastSampleY: any;
    constructor(a: any, b: any, c?: number);
    static configureLengthGradient(a: any): void;
    static getGradientTexture(a: any, b?: boolean): any;
    setRopeWidth(): void;
    getTargetPosition(): {
        x: number;
        y: number;
    };
    reset(a: any, b?: number): void;
    setLaunchPosition /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    recordImpact /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    clearHistory /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    prependHistoryPoint /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    recordPath /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updatePoints /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    getTrailLength /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    approachAlpha /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    static getSpeedAlpha(a: any, b?: number): number;
    update(a?: number): void;
    updateOffscreen(a?: number): void;
    beginFadeOut(): void;
    release(): void;
}
declare namespace ProjectileTrailRope {
    var POINT_COUNT: number;
    var NODE_SPACING: number;
    var DEFAULT_HEAD_WIDTH: number;
    var MIN_VISIBLE_SPEED: number;
    var FULL_ALPHA_SPEED: number;
    var MAX_ALPHA: number;
    var FADE_IN_PER_FRAME: number;
    var FADE_OUT_PER_FRAME: number;
    var SPEED_FADE_OUT_PER_FRAME: number;
    var MAX_LENGTH: number;
    var gradientTexture: any;
}
declare var canvas: {};
declare class Canvas extends PIXI.EventEmitter {
    settings: any;
    performanceMode: boolean;
    manager: any;
    displayed: any[];
    displayedAnimatedStatics: any[];
    displayedLookup: any[];
    displayedStamp: number;
    staticVisibilityPadding: number;
    staticVisibilityBounds: {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    };
    dynamicObjects: any;
    emitters: any;
    players: any;
    stuckArrows: any;
    dissolve: any[];
    ropes: any;
    ropeViewportBounds: {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    };
    projectileTrailPool: any[];
    goreDecals: any[];
    pendingEffects: any[];
    terrainGoreTextureNames: string[];
    staticEmitters: any;
    onBurnFlameSparkBinding: (a: any) => void;
    mapBounds: {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    };
    staticBuffer: any[];
    terrainMesh: {
        segments: never[];
        index: null;
    };
    terrainOutlines: any;
    fb: {
        search: () => never[];
    };
    onStaticObjectAddedBinding: (a: any) => void;
    onGameObjectAddedBinding: (a: any) => void;
    handlers: {
        onStaticObjectAdded: (a: any) => void;
        onGameObjectAdded: (a: any) => void;
        onGameObjectRemoved: (a: any) => void;
        onGameObjectContact: (a: any) => void;
        onUpdateLabel: (b: any) => void;
        onRemoveLabel: (b: any) => void;
        onAgentStateChange: (a: any) => void;
        onClear: () => void;
        onPlayerScore: (a: any) => void;
        onCreateEffect: (b: any) => void;
        onUpdateEnvironment: (a: any) => void;
        onFocus: () => void;
        onPlayerDeath: (a: any) => void;
        onPlayerCombo: () => void;
    };
    gradient: Gradient | PIXI.Sprite;
    zombieGradient: Gradient | PIXI.Sprite;
    world: PIXI.Container<PIXI.ContainerChild>;
    parallax: Parallax;
    zombieParallax: Parallax;
    zombieSurvivalMode: boolean;
    zombieDefeatActive: boolean;
    zombieWaveActive: boolean;
    zombieBackgroundTarget: number;
    zombieBackgroundBlend: number;
    zombieBackgroundKey: any;
    zombieStormPrepared: boolean;
    environmentData: any;
    backgroundsEnabled: boolean;
    background: Background | PIXI.Container<PIXI.ContainerChild>;
    zombieBackground: Background | PIXI.Container<PIXI.ContainerChild>;
    _1: PIXI.Container<PIXI.ContainerChild>;
    _2: PIXI.Container<PIXI.ContainerChild>;
    _3: PIXI.Container<PIXI.ContainerChild>;
    _4: PIXI.Container<PIXI.ContainerChild>;
    _5: PIXI.Container<PIXI.ContainerChild>;
    actorGlowLayer: PIXI.RenderLayer;
    box2dDebugDraw: any;
    waypointGraph: any;
    bgParticleContainer: ParticleContainer;
    fgParticleContainer: ParticleContainer;
    labelContainer: LabelContainer;
    fxMap: {
        [ParticleEffects.LOCAL_PUNCH]: (a: any) => void;
        [ParticleEffects.LOCAL_EXP]: (a: any) => void;
        [ParticleEffects.LOCAL_SAW]: (a: any) => void;
        [ParticleEffects.LOCAL_LINK_GUN]: (a: any) => void;
    };
    worldFilterArea: PIXI.Rectangle;
    energyBoundaryRadius: number;
    hasEnergyBoundary: boolean;
    layers: (Background | PIXI.Container<PIXI.ContainerChild> | Parallax)[];
    cam: Camera;
    mouse: {
        x: number;
        y: number;
    };
    rightdown: boolean;
    lineSize: number;
    minDelta: number;
    zoomFunction: (() => void) | (() => void) | null;
    scaleTarget: number | undefined;
    proneSlideDustPoints: any[] | undefined;
    proneSlideDustEffect: any;
    cameraMotionReset: boolean | undefined;
    deagleSpawnPoint: PIXI.Point | undefined;
    deagleSpawnOrigin: PIXI.Point | undefined;
    localCameraTargetPosition: {
        x: number;
        y: number;
    } | undefined;
    cameraMotionVX: number | undefined;
    cameraMotionVY: number | undefined;
    cameraMotionX: any;
    cameraMotionY: any;
    cameraFollowPlayer: any;
    cameraFollowTarget: any;
    cameraFollowX: any;
    cameraFollowY: any;
    surfaceTime: any;
    constructor(a?: {});
    createBackgroundLayer(): Background | PIXI.Container<PIXI.ContainerChild>;
    createGradientLayer(): Gradient | PIXI.Sprite;
    getViewportRatio(): number;
    updateTransformedMouse(): void;
    setContainerPassive(a: any): void;
    setLayerPassive(a: any): void;
    updateGradientHitArea(): void;
    handleResize(): void;
    createAttributeLabel(a: any): any;
    removeEmitterId /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    prepareEffect /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    hasWaypointGraph(): boolean;
    clearWaypointGraph(): void;
    showWaypointGraph(a: any): void;
    setDebugDrawEnabled(a: any): boolean;
    emitEmitterEffect /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    getEmitterVisualPosition(a: any): any;
    createPointEffect /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    attachStaticVisual(a: any): void;
    detachStaticVisual(a: any): void;
    tickStaticUniforms(a: any, b?: number): void;
    shouldUpdateVisibleStatics(): boolean;
    updateVisibleStatics(a?: number): void;
    updateAllEmitters(a?: number): void;
    updateSpawnProtectionBubbles(): void;
    updateProneSlideDust(a: any): void;
    isWorldPointNearViewport(a: any, b: any, c?: number): boolean;
    updateRopes(a?: number): void;
    isRopePhysicsNearViewport /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    updateGoreDecals(a?: number): void;
    updateDissolve(a?: number): void;
    isPresentationActive(): boolean;
    discardTransientPresentation(): void;
    defaultCamera(): void;
    setManager(a: any): void;
    initDMVictoryAnimation(a: any): void;
    initCTFVictoryAnimation(a: any): void;
    endVictoryAnimation(): void;
    onUpdateEnvironment(a: any): void;
    setBackgroundGradient /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    getDarkestColor /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    setZombieBackgroundGradient /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    setParallax(a: any): void;
    setZombieSurvivalMode(a: any): void;
    setZombieWave(a: any): void;
    setZombieDefeatBackground(): void;
    startZombieStorm(): void;
    applyZombieBackground(): void;
    setZombieBackgroundTarget(a: any): void;
    updateZombieBackgroundTransition(a: any): void;
    applyZombieBackgroundBlend(a: any): void;
    updateEnvironmentLayers(a: any): void;
    onPlayerDeath(a: any): void;
    onPlayerCombo(): void;
    initial(): void;
    onStaticObjectAdded(a: any): void;
    onGameObjectAdded(a: any): void;
    processStaticBuffer(): void;
    buildTerrainOutlines(): void;
    updateVisibleTerrainOutlines /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    clearTerrainOutlines(): void;
    addPlayer(a: any): void;
    addDynamicObject(a: any): void;
    addStaticObject(a: any): void;
    areLineSegmentsOverlapping(a: any, b: any, c?: number): boolean;
    clearTerrainMesh(): void;
    static buildTerrainIndex(a: any): any;
    processTerrainMesh(): void;
    isOverlappingLineSegment(a: any, b: any, c: any, d?: number): boolean;
    getPlayerFromObject(a: any): any;
    getClosestTerrainSurface /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): {
        x: number;
        y: number;
        x1: any;
        y1: any;
        dx: any;
        dy: any;
        layer: any;
        go: any;
        poly: any;
    } | null;
    getPolygonArea(a: any): number;
    getLineIntersection /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): {
        x: any;
        y: any;
    };
    clipPolygonToTerrain /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    clipPolygonToSurface /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    clipPolygonToSurfaceBand /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    destroyTerrainGoreDecal(a: any): void;
    getTerrainSurfaceDisplay(a: any): {
        layer: any;
        z: any;
    };
    createTerrainGoreMesh /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    createTerrainGoreDecals(a: any, b?: number): 0 | 1;
    isTerrainContact(a: any): boolean;
    onDeadBodypartTerrainBounce /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onAgentStateChange(a: any): void;
    onPlayerScore(a: any): void;
    addStuckArrow /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateStuckArrow(a: any): void;
    updateStuckArrows(): void;
    clearStuckArrows(a: any): void;
    onGameObjectRemoved(a: any): void;
    onGameObjectContact(a: any): void;
    isFlameThrowerDamageSource(a: any): boolean;
    suppressPlayerDamageDecals(a: any, b: any, c?: any): boolean;
    isAlliedExplosionTarget /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    onPlayerDamage /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    onBotDamage /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    addEmitter /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateEmitters(a: any, b?: boolean, c?: number): number;
    removeEmitter /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    requestLocalObject /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onSubmerge(a: any): void;
    onSurface(a: any): void;
    punchFx(a: any): void;
    explosionFx(a: any): void;
    tryAddExplosionBurnFlame(a: any, b: any, c?: any): boolean;
    countBurningBodyparts(a: any): number;
    getExplosionBurnChance(a: any, b?: boolean): number;
    ensureSurvivingPlayerExplosionBurnFlame /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): boolean;
    sawFx(a: any): void;
    linkGunFx(a: any): void;
    createRope(a: any, b?: any, c?: any): null;
    alignDeagleBulletSpawn(a: any): void;
    static hasProjectileTrail(a: any): boolean;
    static getProjectileTrailHeadWidth(a: any): 5.25 | 7.5 | 8.25 | 9.75 | 11.25;
    addProjectileTrail(a: any): any;
    releaseProjectileTrail /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    addBurnFlame(a: any): any;
    setAgentBurning /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    tryAddGoreRibbon(a: any, b?: () => number): any;
    applyBurnScorch(a: any, b?: any): boolean;
    restorePlayerBurnScorch(a: any): number;
    removeBurnFlame(a: any): boolean;
    getExplosionBurnTarget /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    onBurnFlameSpark(a: any): void;
    createLinkGunBeam(a: any, b: any, c: any, d: any, e?: number): void;
    presentLinkGunBeam /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any): void;
    createEffect(a: any, b: any, c: any, d?: any): void;
    submitEffect(a: any): void;
    presentEffects(): void;
    presentEffect(a: any): void;
    handleLocalEffect /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    normalizeEffectPoint(a: any): {
        x: number;
        y: any;
    } | null;
    isZeroEffectPoint(a: any): boolean;
    getObjectPhysicsPoint(a: any): {
        x: number;
        y: number;
    } | null;
    getContactBodypart(a: any): any;
    getContactEffectPoint(a: any): any;
    setEffectPhysicsPosition /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    setEffectPosition /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    setEffectVelocity /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    setEffectRotation /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    applyFilters /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onContactFX /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    onAddFX(a: any): void;
    onRemoveFX(a: any): void;
    onRemoveContactFX(a: any): void;
    onTriggerFX(a: any): void;
    onUseFX(a: any, b: any, c?: any): void;
    removeStaticObject(a: any): void;
    removeDynamicObject(a: any): void;
    removeRopesForTarget(a: any): number;
    removeGoreRibbon(a: any): number;
    getCamera(): Camera;
    setScaleTarget(a: any): void;
    doZoom(a: any): void;
    setCameraPosition(): void;
    updateCameraPosition(a?: number): void;
    getCameraTargetPosition(a: any): any;
    resetCameraMotion(): void;
    followLocalPlayerMotion(a: any, b: any, c?: number): void;
    updateCameraMotion /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    applyZIndex(a: any): void;
    applyDisplayZIndex /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    update /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    centerCamera(): void;
    updateWorldFilterArea(): void;
    addFilter(a: any): void;
    updateFilters(a: any, b?: number): void;
    removeFilter(a: any): void;
    onRightDown(): void;
    onRightUp(): void;
    onMouseDown(a: any): void;
    onMouseUp(a: any): void;
    onMouseMove(a: any): void;
    mousePositionFromNormalizedVector(a: any, b?: number): void;
    mousePositionFromEvent(a: any): void;
    isTouchEvent(a: any): boolean;
    onClear(): void;
    onFocus(): void;
}
declare namespace Canvas {
    var ZOMBIE_BACKGROUND_TRANSITION_MS: number;
    var OUTLINE_CHUNK_SIZE: number;
    var CAMERA_MOTION_TRAIL_SECONDS: number;
    var CAMERA_MOTION_MAX_PIXELS: number;
    var CAMERA_MOTION_RESPONSE: number;
    var CAMERA_MOTION_SNAP_PIXELS: number;
    var MouseDownListener: (a: any) => void;
    var MouseUpListener: (a: any) => void;
    var BoundMouseDownListener: any;
    var BoundMouseUpListener: any;
    var BoundRightDownListener: any;
    var BoundRightUpListener: any;
    var EXPLOSION_ALL_BODY_PARTS_CHANCE: number;
    var EXPLOSION_BODY_PART_COUNT: number;
    var EXPLOSION_ADDITIONAL_BURN_CHANCE: number;
    var EXPLOSION_BURN_DECAY: number;
    var MAX_PROJECTILE_TRAIL_POOL_SIZE: number;
    var EFFECT_SNAPSHOT_FIELDS: string[];
}
declare var canvasevent: {};
/** @param {any} a @param {any} [b] */ declare function CanvasEvent(a: any, b?: any): void;
declare namespace CanvasEvent {
    var MOUSE_DOWN: string;
    var MOUSE_UP: string;
    var MOUSE_MOVE: string;
    var RIGHT_DOWN: string;
    var RIGHT_UP: string;
    var REQUEST_LOCAL_OBJECT: string;
    var SCALE: string;
}
declare var fastrope: {};
declare class FastRope extends PIXI.Mesh {
    points: any;
    autoUpdate: boolean;
    target: any;
    targetPosition: {
        x: number;
        y: number;
    };
    ttl: number;
    vy: number;
    vx: number;
    alphaDrop: number;
    delta: number;
    constructor(a: any, b: any, c?: any, d?: any, e?: any);
    update(a?: number): void;
    getTargetPosition(): any;
}
declare namespace FastRope {
    var TextureCache: {};
    var GetCachedTexture: (a: any) => any;
}
declare var blackcape: {};
declare class BlackCape extends FastRope {
    torsoAnchorPosition: {
        x: number;
        y: number;
    };
    attachmentPosition: {
        x: number;
        y: number;
    };
    proneRestDirection: {
        x: number;
        y: number;
    };
    targetScale: number;
    lastFacingSign: number;
    previousPoints: any;
    widthMultipliers: any;
    pointDynamics: any;
    windTime: number;
    windPhase: number;
    physicsCullPadding: number;
    physicsWasCulled: boolean;
    lastAttachmentPosition: {
        x: any;
        y: any;
    };
    constructor(a: any, b?: any);
    update(): void;
    updateOffscreen(): void;
    integrateCloth /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
    installWidthDeformation(): void;
    updateWidthDynamics /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): void;
    getClothDamping /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    getMotionBlend /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): number;
    solveClothConstraints(): void;
    reflectClothHorizontally(): void;
    getFacingSign(): -1 | 1;
    getAttachmentPosition(): {
        x: number;
        y: number;
    };
    getGravityMultiplier(a?: boolean): -1.25 | 0 | 1;
    isProne(): boolean;
    getProneRestDirection(): {
        x: number;
        y: number;
    };
    getPresentedCoordinate /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    getFrameScale(): number;
    getTorsoAnchorPosition(): {
        x: number;
        y: number;
    };
    static finiteOrZero(a: any): number;
    static clamp /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): number;
}
declare namespace BlackCape {
    var FX: {
        tex: string;
    };
    var ID: string;
    var IDLE_DAMPING: number;
    var MOVING_DAMPING: number;
    var FULL_MOTION_SPEED: number;
    var ATTACHMENT_MOTION_WEIGHT: number;
    var GRAVITY_RESPONSE: number;
    var MOVEMENT_WIND_RESPONSE: number;
    var VERTICAL_WIND_RESPONSE: number;
    var AMBIENT_WIND_STRENGTH: number;
    var AMBIENT_WIND_DETAIL: number;
    var IDLE_REARWARD_WIND: number;
    var IDLE_FORWARD_WIND_LIMIT: number;
    var FLUTTER_STRENGTH: number;
    var FLUTTER_FREQUENCY: number;
    var PRONE_WIND_SCALE: number;
    var PRONE_LAY_STIFFNESS: number;
    var ATTACHMENT_INERTIA: number;
    var BEND_STIFFNESS: number;
    var CONSTRAINT_ITERATIONS: number;
    var PHYSICS_CULL_PADDING: number;
    var MAX_ATTACHMENT_DELTA: number;
    var MIN_FRAME_SCALE: number;
    var MAX_FRAME_SCALE: number;
    var MAX_AMBIENT_WIND: number;
    var IDLE_WIDTH_FLUTTER: number;
    var ACTIVE_WIDTH_FLUTTER: number;
    var WIDTH_FLUTTER_FREQUENCY: number;
    var WIDTH_FLUTTER_PHASE: number;
    var WIDTH_GUST_EXPANSION: number;
    var WIDTH_MOTION_NARROWING: number;
    var WIDTH_RESPONSE: number;
    var PRONE_WIDTH_RESPONSE: number;
    var MIN_WIDTH_SCALE: number;
    var MAX_WIDTH_SCALE: number;
    var VertexSource: string;
    var FragmentSource: string;
    var Program: PIXI.GlProgram;
    var GpuSource: string;
    var GpuProgram: PIXI.GpuProgram;
}
declare var bluecape: {};
declare class BlueCape extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace BlueCape {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var camocape: {};
declare class CamoCape extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace CamoCape {
    var FX: {
        tex: string;
    };
    var ID: string;
    var TEXTURE_WIDTH_SCALE: number;
}
declare var camocape_desert: {};
declare class CamoCapeDesert extends CamoCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace CamoCapeDesert {
    var FX: {
        tex: string;
        fallback: string;
    };
    var ID: string;
}
declare var camocape_jungle: {};
declare class CamoCapeJungle extends CamoCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace CamoCapeJungle {
    var FX: {
        tex: string;
        fallback: string;
    };
    var ID: string;
}
declare var camocape_snow: {};
declare class CamoCapeSnow extends CamoCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace CamoCapeSnow {
    var FX: {
        tex: string;
        fallback: string;
    };
    var ID: string;
}
declare var camocape_winter: {};
declare class CamoCapeWinter extends CamoCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace CamoCapeWinter {
    var FX: {
        tex: string;
        fallback: string;
    };
    var ID: string;
}
declare var cape_black: {};
declare class CapeBlack extends CamoCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace CapeBlack {
    var FX: {
        tex: string;
        fallback: string;
    };
    var ID: string;
}
declare var greencape: {};
declare class GreenCape extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace GreenCape {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var redcape: {};
declare class RedCape extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace RedCape {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var yellowcape: {};
declare class YellowCape extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace YellowCape {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var pinkcape: {};
declare class PinkCape extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace PinkCape {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var orangecape: {};
declare class OrangeCape extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace OrangeCape {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var splitcape: {};
declare class SplitCape extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace SplitCape {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var splitcape2: {};
declare class SplitCape2 extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace SplitCape2 {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var splitcape3: {};
declare class SplitCape3 extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace SplitCape3 {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var splitcape4: {};
declare class SplitCape4 extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace SplitCape4 {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var splitcape5: {};
declare class SplitCape5 extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace SplitCape5 {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var redcapecenturion: {};
declare class RedCapeCenturion extends BlackCape {
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace RedCapeCenturion {
    var FX: {
        tex: string;
    };
    var ID: string;
}
declare var extra: {};
declare class Extra {
    constructor();
}
declare namespace Extra {
    var _o: {
        blackcape: typeof BlackCape;
        greencape: typeof GreenCape;
        redcape: typeof RedCape;
        yellowcape: typeof YellowCape;
        bluecape: typeof BlueCape;
        pinkcape: typeof PinkCape;
        orangecape: typeof OrangeCape;
        camocape: typeof CamoCape;
        camocape_jungle: typeof CamoCapeJungle;
        camocape_winter: typeof CamoCapeWinter;
        camocape_desert: typeof CamoCapeDesert;
        camocape_snow: typeof CamoCapeSnow;
        cape_black: typeof CapeBlack;
        splitcape: typeof SplitCape;
        splitcape2: typeof SplitCape2;
        splitcape3: typeof SplitCape3;
        splitcape4: typeof SplitCape4;
        splitcape5: typeof SplitCape5;
        redcape_centurion: typeof RedCapeCenturion;
    };
    export { _o as Map };
}
declare var facefireeyes: {};
declare class FaceFireEyes extends PIXI.Sprite {
    target: any;
    trail: any;
    emitter: any;
    constructor(a: any);
    update(a: any): void;
}
declare namespace FaceFireEyes {
    var ID: string;
}
declare var faceredfireeyes: {};
declare class FaceRedFireEyes extends PIXI.Sprite {
    target: any;
    trail1: any;
    trail2: any;
    emitter1: any;
    emitter2: any;
    emitter: any[];
    constructor(a: any);
    update(a: any): void;
}
declare namespace FaceRedFireEyes {
    var ID: string;
}
declare var facegreenfireeyes: {};
declare class FaceGreenFireEyes extends PIXI.Sprite {
    target: any;
    trail1: any;
    trail2: any;
    emitter1: any;
    emitter2: any;
    emitter: any[];
    constructor(a: any);
    update(a: any): void;
}
declare namespace FaceGreenFireEyes {
    var ID: string;
}
declare var facebluefireeyes: {};
declare class FaceBlueFireEyes extends PIXI.Sprite {
    target: any;
    trail1: any;
    trail2: any;
    emitter1: any;
    emitter2: any;
    emitter: any[];
    constructor(a: any);
    update(a: any): void;
}
declare namespace FaceBlueFireEyes {
    var ID: string;
}
declare var faceyellowfireeyes: {};
declare class FaceYellowFireEyes extends PIXI.Sprite {
    target: any;
    trail1: any;
    trail2: any;
    emitter1: any;
    emitter2: any;
    emitter: any[];
    constructor(a: any);
    update(a: any): void;
}
declare namespace FaceYellowFireEyes {
    var ID: string;
}
declare var facepinkfireeyes: {};
declare class FacePinkFireEyes extends PIXI.Sprite {
    target: any;
    trail1: any;
    trail2: any;
    emitter1: any;
    emitter2: any;
    emitter: any[];
    constructor(a: any);
    update(a: any): void;
}
declare namespace FacePinkFireEyes {
    var ID: string;
}
declare var faceorangefireeyes: {};
declare class FaceOrangeFireEyes extends PIXI.Sprite {
    target: any;
    trail1: any;
    trail2: any;
    emitter1: any;
    emitter2: any;
    emitter: any[];
    constructor(a: any);
    update(a: any): void;
}
declare namespace FaceOrangeFireEyes {
    var ID: string;
}
declare var customface: {};
declare class CustomFace extends PIXI.Sprite {
    constructor();
    update(): void;
}
declare namespace CustomFace {
    var _p: {
        fireeyes: typeof FaceFireEyes;
        fireeyesred: typeof FaceRedFireEyes;
        fireeyesgreen: typeof FaceGreenFireEyes;
        fireeyesblue: typeof FaceBlueFireEyes;
        fireeyesyellow: typeof FaceYellowFireEyes;
        fireeyespink: typeof FacePinkFireEyes;
        fireeyesorange: typeof FaceOrangeFireEyes;
    };
    export { _p as Map };
}
declare var bandanarope: {};
declare class BandanaRope extends PIXI.MeshRope {
    target: any;
    headAnchorPosition: {
        x: number;
        y: number;
    };
    ttl: number;
    alphaDrop: number;
    vy: number;
    vx: number;
    delta: number;
    points: any;
    widthMultipliers: number[];
    physicsWasCulled: boolean | undefined;
    constructor(a: any, b?: any);
    update(a?: number): void;
    getHeadAnchorPosition(): {
        x: number;
        y: number;
    };
    updateOffscreen(): void;
}
declare namespace BandanaRope {
    var FX: any;
}
declare var bullettrailrope: {};
declare class BulletTrailRope extends PIXI.MeshRope {
    target: any;
    ttl: number;
    alphaDrop: number;
    vy: number;
    vx: number;
    delta: number;
    points: any;
    constructor(a: any, b?: any);
    update(): void;
}
declare namespace BulletTrailRope {
    var FX: any;
}
declare var shockrifletailrope: {};
declare class ShockRifleTailRope extends PIXI.MeshRope {
    target: any;
    points: any;
    targetPosition: {
        x: number;
        y: number;
    };
    simulationPoints: any;
    shakeOffsets: Float32Array<any>;
    ttl: number;
    alphaDrop: number;
    eventMode: string;
    renderAboveTarget: boolean;
    constructor(a: any, b?: any);
    getTargetPosition(): {
        x: number;
        y: number;
    };
    setRopeWidth(a: any): void;
    initializeTrail(): void;
    update(a?: number): void;
    onTargetRemoved(): void;
}
declare namespace ShockRifleTailRope {
    var POINT_COUNT: number;
    var NODE_SPACING: number;
    var FOLLOW_STRENGTH: number;
    var SHAKE_AMOUNT: number;
    var SHAKE_RESPONSE: number;
    var WIDTH_SCALE: number;
    var FADE_TICKS: number;
    var FX: {
        tex: string;
    };
}
/** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] @param {any} [h] @param {any} [k] @param {any} [l] @param {any} [m] */ declare function ParticleEmitter(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, k?: any, l?: any, m?: any): void;
declare function AnchorBase(): void;
declare var basesprite: {};
declare class BaseSprite extends PIXI.Container {
    go: any;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    graphicsBuilt: boolean;
    eventMode: string;
    interactiveChildren: boolean;
    constructor(a: any);
    update(): void;
    updateGraphics(): void;
    constructTexturedMesh(a: any): void;
    constructPolyMesh /** @param {any} a @param {any} [c] @param {any} [d] */(a: any, b?: number[], c?: any, d?: any): any;
    constructRectMesh /** @param {any} a @param {any} [c] @param {any} [d] */(a: any, b?: number[], c?: any, d?: any): any;
    constructCircleMesh /** @param {any} a @param {any} [c] @param {any} [d] */(a: any, b?: number[], c?: any, d?: any): any;
    constructColoredMesh(a: any): void;

    static SurfacePrograms: any;}
declare namespace BaseSprite {
    var MeshIDMap: any;
    var DefaultUVs: number[];
    var CreateColoredShapeMesh: (a: any, b?: any, c?: any, d?: any, e?: any, f?: any) => PIXI.Mesh<any, any>;
    var MeshIDGroups: any[];
    var TextureIDMap: any[];
    var ColorMap: any[];
    var NormalizeTintColor: (a: any) => any;
    var GetTintColor: (a: any) => number;
    var GetVertexColor: (a: any, b?: any) => any;
    var BasicShaderCache: WeakMap<WeakKey, any>;
    var MeshTextureCache: WeakMap<WeakKey, any>;
    var GetMeshTexture: (a: any) => any;
    var GetBasicShader: (a: any, b?: any, c?: any) => any;
    var Create: (a: any) => any;
    var CreateMesh: (a: any) => any[] | PIXI.Mesh<PIXI.Geometry, any>;
    var MergeVertices: (a: any, b?: any, c?: any, d?: any) => {
        vertices: any[];
        uvs: any[];
        indices: any[];
        colors: any[];
    };
    var CreateIndexData: (a: any) => Uint32Array<any>;
    var CreateGroupedMesh: (a: any, b?: any) => PIXI.Mesh<PIXI.Geometry, PIXI.Shader>;
    var ShaderCache: {};
    var GetRotatedRectangleVertices: (a: any, b?: any) => ({
        x: any;
        y: number;
    } | {
        x: number;
        y: any;
    })[];
    var ExtractOutline: (a: any) => any[];
    var ColoredVertexSource: string;
    var ColoredFragmentSource: string;
    var DefaultColor: number[];
    var Program: PIXI.GlProgram;
    var TransformVertexSource: string;
    var TransformFragmentSource: string;
    var TransformProgram: PIXI.GlProgram;
    var FluidVertexSource: string;
    var FluidFragmentSource: string;
    var FluidProgram: PIXI.GlProgram;
    var UVTranslateFragmentSource: string;
    var UVRotateFragmentSource: string;
    var UVTranslateProgram: PIXI.GlProgram;
    var TransformUVTranslateProgram: PIXI.GlProgram;
    var UVRotateProgram: PIXI.GlProgram;
    var TransformUVRotateProgram: PIXI.GlProgram;
    var GpuHeader: string;
    var CreateGpuProgram: (a: any, b?: any) => PIXI.GpuProgram;
    var GpuSource: string;
    var TransformGpuSource: string;
    var FluidGpuSource: string;
    var UVTranslateGpuSource: string;
    var TransformUVTranslateGpuSource: string;
    var UVRotateGpuSource: string;
    var TransformUVRotateGpuSource: string;
    var GpuProgram: PIXI.GpuProgram;
    var TransformGpuProgram: PIXI.GpuProgram;
    var FluidGpuProgram: PIXI.GpuProgram;
    var UVTranslateGpuProgram: PIXI.GpuProgram;
    var TransformUVTranslateGpuProgram: PIXI.GpuProgram;
    var UVRotateGpuProgram: PIXI.GpuProgram;
    var TransformUVRotateGpuProgram: PIXI.GpuProgram;
    var CollectSurfaceEffects: (a: any, b?: any) => void;
    var SurfaceNumber: (a: any, b?: any, c?: any, d?: any) => any;
    var SyncSurfaceAnchors: (a: any) => void;
    var CreateSurfaceShader: (a: any, b?: any, c?: any, d?: any) => PIXI.Shader;
    var InitSurfacePrograms: () => void;
}
declare class GoldSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class BallSprite extends PIXI.Sprite {
    charge: number;
    heldLeft: boolean;
    chargeCount: number;
    recharging: boolean;
    constructor();
    pointLeft(): void;
    pointRight(): void;
    setHeldScale(a: any): void;
    advanceCharge /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    setAmmoState(a: any): void;
    animate(a: any): void;
    init(): void;
}
declare class FlagSprite extends PIXI.Sprite {
    flagPole: PIXI.Sprite;
    cloth: string;
    verts: number[];
    mesh: PIXI.MeshSimple;
    p2v: {
        x: number;
        y: number;
    };
    p3v: {
        x: number;
        y: number;
    };
    p2: {
        x: number;
        y: number;
    };
    p3: {
        x: number;
        y: number;
    };
    flagStretch: number;
    time: number;
    d0s: number;
    a0s: number;
    d1s: number;
    a1s: number;
    constructor(a: any);
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(a: any): void;
    constructMesh(): PIXI.MeshSimple;
}
declare class AK47AmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class BarrettAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class ChainsawAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class ClusterNadeBoxSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class DesertEagleAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class FlameThrowerAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class HealthBoxSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class LaserGunAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class LinkGunAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class MAC10AmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class MinigunAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class NadeBoxSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class NadeLauncherAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class PulseGunAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class RifleAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class RPGAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class ShockRifleAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class ShotgunAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class ShurikenBoxSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class SMGAmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class SnowballBoxSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class X75AmmoSprite extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class AK47Sprite extends PIXI.Sprite {
    reloadClipOrigin: PIXI.Point;
    clipDiscarded: boolean;
    reloading: boolean;
    hasClip: boolean;
    loadedTexture: PIXI.Texture<PIXI.TextureSource<any>>;
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    reloadStartedAt: number | undefined;
    constructor(a?: {});
    pointLeft(): void;
    setAmmoState(a: any): void;
    setReloading(a: any, b?: boolean): void;
    updateReload(a: any): void;
    presentReload(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class BarrettSprite extends MagazineWeaponSprite {
    secondaryScale: {
        x: number;
        y: number;
    };
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    nextSmokeAt: number | undefined;
    smokeStartedAt: number | undefined;
    constructor(a?: {});
    pointLeft(): void;
    pointRight(): void;
    onFired(): void;
    updateReload(a: any): void;
    animate(a: any): void;
    init(): void;
}
declare class BoomerangGunSprite extends PIXI.Sprite {
    activeTexture: any;
    customTexture: string | null;
    secondaryScale: {
        x: number;
        y: number;
    };
    secondaryAnchor: {
        x: number;
        y: number;
    };
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    constructor();
    animate(a: any): void;
    pointLeft(): void;
    pointRight(): void;
    init(): void;
    onUse(): void;
    animateReload(): void;
    stopReloadAnimation(): void;
    setCustomTexture(a: any): boolean;
}
declare class BowSprite extends PIXI.Sprite {
    activeTexture: string;
    customTexture: string | null;
    frame: number;
    customOffset: boolean;
    secondaryRotation: number;
    secondaryAnchor: {
        x: number;
        y: number;
    };
    secondaryScale: {
        x: number;
        y: number;
    };
    stretchedHoldingArm: boolean;
    animateWhenUsing: boolean;
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    gearArmOffsetAnimating: {
        x: number;
        y: number;
    };
    usageFrame: number | undefined;
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    animateUsage(a?: boolean): void;
    advanceUsage(): void;
    presentUsage(a?: boolean): void;
    applyDefaultTexture(): void;
    presentDefaultTexture(): void;
    resetUsage(): void;
    setCustomTexture(a: any): boolean;
    init(): void;
}
declare namespace BowSprite {
    var Textures: number[];
    var Anchor: {
        x: number;
        y: number;
    }[];
}
declare class CarbineSprite extends MagazineWeaponSprite {
    secondaryScale: {
        x: number;
        y: number;
    };
    secondaryRotation: number;
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    constructor(a?: {});
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class ChainsawSprite extends PIXI.Sprite {
    gore: PIXI.Sprite;
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    onRequestCreateEffect: any;
    go: any;
    effectAccumulator: number;
    count: number;
    constructor(a?: {});
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
    setGore(a: any): void;
    syncGoreAnchor(): void;
    onAnchorChanged(): void;
    onUse(): void;
}
declare class DeagleSprite extends PIXI.Container {
    anchor: PIXI.Point;
    pistolGrip: boolean;
    dual: boolean;
    gearArmOffset: {
        x: number;
        y: number;
    };
    secondaryRotation: number;
    pistols: PIXI.Sprite[];
    handAnchors: {
        muzzle: PIXI.Sprite;
        eject: PIXI.Container<PIXI.ContainerChild>;
    }[];
    activeHand: number;
    fireAnchor: PIXI.Sprite;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    reloadStartedAt: number | undefined;
    _reloading: any;
    constructor(a?: boolean);
    onAnchorChanged(): void;
    selectHand(a: any): void;
    set reloading(a: any);
    get reloading(): any;
    reloadAmount(a: any): number;
    getHeldGunPose /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    setHeld(): void;
    setFacing(a: any): void;
    pointLeft(): void;
    pointRight(): void;
    updateHandAnchors(a: any): void;
    onUse(a?: number): void;
    animate(a: any): void;
    init(): void;
}
declare class DesertEagleSprite extends PIXI.Sprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class FistSprite extends PIXI.Sprite {
    constructor();
    pointLeft(): void;
    pointRight(): void;
}
declare class FlameThrowerSprite extends PIXI.Sprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class LaserGunSprite extends MagazineWeaponSprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    constructor(a?: {});
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class LinkGunSprite extends PIXI.Sprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    beam: PIXI.Container<PIXI.ContainerChild>;
    beamGlow: PIXI.Graphics;
    beamCore: PIXI.Graphics;
    beamBounds: PIXI.Bounds;
    beamFrame: number;
    onRender: (b: any) => void;
    constructor(a?: {});
    static createBeamFrames(): void;
    updateBeam(a: any): void;
    positionBeam(): void;
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
    onUse(): void;

    static BeamFrames: any;
    static CoreFrames: any;}
declare class M60Sprite extends PIXI.Sprite {
    secondaryScale: {
        x: number;
        y: number;
    };
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    drift: number;
    lastFiredTime: number;
    used: boolean;
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    onUse(): void;
    updateDrift(a: any): void;
    init(): void;
}
declare class MAC10Sprite extends MagazineWeaponSprite {
    secondaryScale: {
        x: number;
        y: number;
    };
    proneOffset: {
        x: number;
        y: number;
    };
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    constructor(a?: {});
    pointLeft(): void;
    setCustomTexture(a: any): boolean;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class MinigunSprite extends PIXI.Sprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class NadeLauncherSprite extends PIXI.Sprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    symmetricGearArmGrip: boolean;
    reloading: boolean;
    reloadDuration: number;
    spentShell: boolean;
    shellEjected: boolean | undefined;
    reloadStartedAt: number | undefined;
    reloadBarrel: PIXI.Sprite | undefined;
    breechAngle: number | undefined;
    simulationEjectionPoint: {} | undefined;
    constructor(a?: {});
    pointLeft(): void;
    pointRight(): void;
    onFired(): void;
    setReloading(a: any, b?: boolean): void;
    prepareBreech(): boolean;
    setBreechAngle(a: any): void;
    onAnchorChanged(): void;
    updateReload(a: any): void;
    presentReload(): void;
    getSimulationAnchor(a: any): any;
    animate(a: any): void;
    init(): void;
}
declare class PulseGunSprite extends PIXI.Sprite {
    secondaryScale: {
        x: number;
        y: number;
    };
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class RifleSprite extends MagazineWeaponSprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    crouchOffsetY: number;
    symmetricGearArmGrip: boolean;
    constructor(a?: {});
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class RocketLauncherSprite extends PIXI.Sprite {
    secondaryScale: {
        x: number;
        y: number;
    };
    secondaryAnchor: {
        x: number;
        y: number;
    };
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class RPGSprite extends PIXI.Sprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class ShockRifleSprite extends PIXI.Sprite {
    secondaryScale: {
        x: number;
        y: number;
    };
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class ShotgunSprite extends PIXI.Sprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    symmetricGearArmGrip: boolean;
    supportHandGrip: {
        x: number;
        y: number;
    };
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class SubmachineGunSprite extends MagazineWeaponSprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    constructor(a?: {});
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class UziSprite extends MagazineWeaponSprite {
    secondaryScale: {
        x: number;
        y: number;
    };
    secondaryAnchor: {
        x: number;
        y: number;
    };
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    gearArmOffset: {
        x: number;
        y: number;
    };
    fixedGearArmGrip: boolean;
    constructor(a?: {});
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare class X75Sprite extends PIXI.Sprite {
    fireAnchor: PIXI.Container<PIXI.ContainerChild>;
    ejectionAnchor: PIXI.Container<PIXI.ContainerChild>;
    constructor();
    pointLeft(): void;
    pointRight(): void;
    animate(a: any): void;
    init(): void;
}
declare var Prefabs: {
    HEAD_SPRITE: string;
    TORSO_UPPER_SPRITE: string;
    TORSO_LOWER_SPRITE: string;
    ARM_LEFTUPPER_SPRITE: string;
    ARM_LEFTLOWER_SPRITE: string;
    ARM_RIGHTUPPER_SPRITE: string;
    ARM_RIGHTLOWER_SPRITE: string;
    LEG_LEFTUPPER_SPRITE: string;
    LEG_LEFTLOWER_SPRITE: string;
    LEG_RIGHTUPPER_SPRITE: string;
    LEG_RIGHTLOWER_SPRITE: string;
    ZOMBIE_HEAD_SPRITE: string;
    ZOMBIE_TORSO_UPPER_SPRITE: string;
    ZOMBIE_TORSO_LOWER_SPRITE: string;
    ZOMBIE_ARM_LEFTUPPER_SPRITE: string;
    ZOMBIE_ARM_LEFTLOWER_SPRITE: string;
    ZOMBIE_ARM_RIGHTUPPER_SPRITE: string;
    ZOMBIE_ARM_RIGHTLOWER_SPRITE: string;
    ZOMBIE_LEG_LEFTUPPER_SPRITE: string;
    ZOMBIE_LEG_LEFTLOWER_SPRITE: string;
    ZOMBIE_LEG_RIGHTUPPER_SPRITE: string;
    ZOMBIE_LEG_RIGHTLOWER_SPRITE: string;
    TINYSHRAPNEL: string;
    LINE_SPRITE: string;
    CIRCLE_SPRITE: string;
    RECTANGLE_SPRITE: string;
};
declare class GhostSprite extends PIXI.Sprite {
    trail: TrailSprite;
    nade: PIXI.Sprite;
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class CircleSprite extends PIXI.Sprite {
    constructor(a: any);
}
declare class LineSprite extends PIXI.Sprite {
    constructor(a: any);
}
declare class GhostBotDebrisSprite1 extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
}
declare class GhostBotDebrisSprite2 extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
}
declare class GhostBotDebrisSprite3 extends PIXI.Sprite {
    constructor();
    animate(a: any): void;
}
declare class TinyShrapnelSprite extends PIXI.Sprite {
    vr: number;
    constructor();
    animate(a: any): void;
}
declare namespace TinyShrapnelSprite {
    var TEXTURE: any;
}
declare class TrailSprite extends PIXI.Sprite {
    constructor();
}
declare class AK47BulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class ArrowSprite extends PIXI.Sprite {
    lastRotation: number;
    currentRotation: number;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class BarrettBulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class BoomerangSprite extends PIXI.Sprite {
    frame: number;
    glow: PIXI.Sprite;
    r: number;
    teamTintInitialized: boolean | undefined;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare namespace BoomerangSprite {
    var TEXTURE: any;
}
declare class CarbineBulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class DesertEagleBulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class FlameThrowerLiquidSprite extends PIXI.Sprite {
    lastY: any;
    lastX: any;
    frame: number;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class GhostLaserSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class LaserGunBulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class LauncherNadeSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare namespace LauncherNadeSprite {
    var TEXTURE: any;
}
declare class M60BulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class MAC10BulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class MinigunBulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class PulseGunBulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare class RifleBulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class RLRocketSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare namespace RLRocketSprite {
    var TEXTURE: any;
}
declare class RPGRocketSprite extends PIXI.Sprite {
    graphic: PIXI.Sprite;
    frame: number | undefined;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare namespace RPGRocketSprite {
    var TEXTURE: any;
}
declare class ShockRifleBulletSprite extends PIXI.Container {
    teamGlow: PIXI.Sprite;
    whiteCore: PIXI.Sprite;
    frame: number;
    teamTintInitialized: boolean | undefined;
    constructor();
    animate(a: any): void;
}
declare class ShotgunPelletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class SubmachineGunBulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class UziBulletSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
}
declare class X75NadeSprite extends PIXI.Sprite {
    frame: number;
    constructor();
    animate(a: any): void;
    init(): void;
}
declare namespace X75NadeSprite {
    var TEXTURE: any;
}
declare class RectangleSprite extends PIXI.Sprite {
    constructor(a: any);
}
declare class ClusterNadeFragmentSprite extends PIXI.Sprite {
    nade: PIXI.Sprite;
    constructor();
}
declare class ClusterNadeSprite extends PIXI.Sprite {
    nade: PIXI.Sprite;
    constructor();
}
declare class NadeSprite extends PIXI.Sprite {
    nade: PIXI.Sprite;
    constructor();
}
declare class ShurikenBladeSprite extends PIXI.Sprite {
    glow: PIXI.Sprite;
    shuriken: PIXI.Sprite;
    constructor(a?: {});
    setTeamColor(a: any): void;
    animate(a: any): void;
}
declare class SnowballProjectileSprite extends PIXI.Sprite {
    trail: TrailSprite;
    snowball: PIXI.Sprite;
    frame: number;
    constructor();
    animate(a: any): void;
}
declare let rdScale: number;
declare const reducedLowerArmTextureScale = 0.9;
/** @param {any} a @param {any} [b] */ declare function GetRagdollTexture(a: any, b?: any): any;
/** @param {any} a @param {any} [b] @param {any} [c] */ declare function GetRagdollTextureId(a: any, b?: any, c?: any): any;
declare function GetFlippedRagdollTextureId(a: any): any;
/** @param {any} a @param {any} [b] */ declare function GetHeadTextureId(a: any, b?: any): any;
declare class HeadSprite extends PIXI.Sprite {
    face: PIXI.Sprite | undefined;
    data: any;
    decal: any;
    z: number;
    constructor(a: any);
    animate(a: any): void;
    init(a: any): void;
}
declare class TorsoUpperSprite extends PIXI.Sprite {
    sprite: PIXI.Sprite;
    decal: any;
    z: number;
    constructor(a: any);
}
declare class TorsoLowerSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ArmLeftUpperSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ArmLeftLowerSprite extends PIXI.Sprite {
    facingLeftTexture: any;
    facingRightTexture: any;
    facingLeftScale: number;
    facingRightScale: number;
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ArmRightUpperSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ArmRightLowerSprite extends PIXI.Sprite {
    facingLeftTexture: any;
    facingRightTexture: any;
    facingLeftScale: number;
    facingRightScale: number;
    decal: any;
    z: number;
    constructor(a: any);
}
declare class LegLeftUpperSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class LegLeftLowerSprite extends PIXI.Sprite {
    facingLeftOffset: {
        x: number;
        y: number;
    };
    facingRightOffset: {
        x: number;
        y: number;
    };
    decal: any;
    z: number;
    constructor(a: any);
}
declare class LegRightUpperSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class LegRightLowerSprite extends PIXI.Sprite {
    facingLeftOffset: {
        x: number;
        y: number;
    };
    facingRightOffset: {
        x: number;
        y: number;
    };
    decal: any;
    z: number;
    constructor(a: any);
}
declare let rdZombieScale: number;
/** @param {any} a @param {any} [b] */ declare function GetZombieHeadTextureId(a: any, b?: any): any;
declare class ZombieHeadSprite extends PIXI.Sprite {
    face: PIXI.Sprite | undefined;
    data: any;
    decal: any;
    z: number;
    constructor(a: any);
    animate(a: any): void;
    init(a: any): void;
}
declare class ZombieTorsoUpperSprite extends PIXI.Sprite {
    sprite: PIXI.Sprite;
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ZombieTorsoLowerSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ZombieArmLeftUpperSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ZombieArmLeftLowerSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ZombieArmRightUpperSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ZombieArmRightLowerSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ZombieLegLeftUpperSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ZombieLegLeftLowerSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ZombieLegRightUpperSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare class ZombieLegRightLowerSprite extends PIXI.Sprite {
    decal: any;
    z: number;
    constructor(a: any);
}
declare var itemlist: {}, ItemList: {
    Fists: string;
    Shotgun: string;
    SubmachineGun: string;
    NadeLauncher: string;
    Barrett: string;
    ShockRifle: string;
    PulseGun: string;
    FlameThrower: string;
    RPG: string;
    Rifle: string;
    LaserGun: string;
    LinkGun: string;
    AK47: string;
    HandGrenade: string;
    ClusterGrenade: string;
    Shuriken: string;
    Snowball: string;
    Chainsaw: string;
    DesertEagle: string;
    Minigun: string;
    X75: string;
    MAC10: string;
    Bow: string;
    RocketLauncher: string;
    Carbine: string;
    BoomerangGun: string;
    M60: string;
    Uzi: string;
    Deagle: string;
    Bouncyball: string;
    HealthBox: string;
    NadeBox: string;
    ClusterNadeBox: string;
    SnowballBox: string;
    ShurikenBox: string;
    Flag: string;
    ShotgunAmmo: string;
    RifleAmmo: string;
    AK47Ammo: string;
    BarrettAmmo: string;
    ChainsawAmmo: string;
    DesertEagleAmmo: string;
    FlameThrowerAmmo: string;
    LaserGunAmmo: string;
    LinkGunAmmo: string;
    MAC10Ammo: string;
    MinigunAmmo: string;
    NadeLauncherAmmo: string;
    PulseGunAmmo: string;
    RPGAmmo: string;
    ShockRifleAmmo: string;
    SMGAmmo: string;
    X75Ammo: string;
    Gold: string;
}, ItemMap: {
    Equip: {
        PRIMARY: number;
        SECONDARY: number;
        BELT: number;
        OTHER: number;
    };
};
declare var shurikenicon: {};
declare class ShurikenIcon extends PIXI.Sprite {
    constructor();
}
declare var clustergrenadeicon: {};
declare class ClusterGrenadeIcon extends PIXI.Sprite {
    constructor();
}
declare var handgrenadeicon: {};
declare class HandGrenadeIcon extends PIXI.Sprite {
    constructor();
}
declare var snowballicon: {};
declare class SnowballIcon extends PIXI.Sprite {
    constructor();
}
declare class SpriteFactory {
}
declare namespace SpriteFactory {
    var CreateSprite: (a: any) => any;
    var ApplyCustomTexture: (a: any, b?: any) => any;
}
declare let SpriteMap: {
    i0: typeof FistSprite;
};
declare var label: {};
declare class Label extends PIXI.Container {
    id: any;
    go: any;
    attached: any;
    edge: boolean;
    team: number;
    chatBubble: PIXI.Sprite | undefined;
    marker: PIXI.Sprite | null;
    tintColor: number;
    text: PIXI.Text;
    hw: number;
    hh: number;
    subText: PIXI.Text;
    skillTag: PIXI.Sprite;
    ratingTag: PIXI.Sprite;
    time: number;
    inClan: boolean;
    clanTag: PIXI.Text | undefined;
    markerTime: number | undefined;
    healthBar: PIXI.Sprite | undefined;
    chatTeam: any;
    constructor(a: any, b?: any, c?: any, d?: any);
    displayChatBubble(): void;
    hideChatBubble(): void;
    setText(a: any): void;
    setSubText(a: any, b?: boolean): void;
    showTitle(a?: boolean): void;
    hideTitle(): void;
    showSubTitle(): void;
    hideSubTitle(): void;
    stealthMode(a: any): void;
    updateHealth(): void;
    update /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
}
declare namespace Label {
    var HealthBarTextures: any[];
    var ZOMBIE_TINT: number;
}
declare var labelcontainer: {};
declare class LabelContainer extends PIXI.Container {
    labels: {};
    flagIndicators: {};
    flagIndicatorsEnabled: boolean;
    visibleTeam: number;
    viewport: {
        inverseScale: number;
        right: number;
        bottom: number;
    };
    constructor();
    update /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    addFlagIndicator(a: any): void;
    removeFlagIndicator(a: any): void;
    updateFlagIndicators /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    clear(): void;
    onUpdateLabel(a: any): void;
    addLabel /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    onRemoveLabel(a: any): void;
    setVisibleTeam(a: any): void;
}
declare var parallax: {};
declare class Parallax extends PIXI.Container {
    maxParticles: number;
    minParticles: number;
    count: number;
    particles: any[];
    intensity: number;
    margin: number;
    _facedirection: boolean;
    rotate: boolean;
    _rotation: number;
    _drop: {
        min: number;
        max: number;
    };
    __scale: {
        min: number;
        max: number;
    };
    _alpha: {
        min: number;
        max: number;
    };
    _direction: {
        min: number;
        max: number;
    };
    _angular: {
        min: number;
        max: number;
    };
    _dirOffset: {
        min: number;
        max: number;
    };
    _dir: number;
    _tint: number;
    lastY: number;
    lastX: number;
    type: string;
    particleContainer: PIXI.ParticleContainer<PIXI.IParticle> | null | undefined;
    _offset: {
        min: number;
        max: number;
    } | undefined;
    constructor();
    clear(): void;
    initialize(a: any): void;
    configureStarParticle /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateStarGlints(a: any): void;
    updateParticleBounds(): void;
    distribute(): void;
    update(a: any, b?: number): void;
}
declare var Customization: {
    HAIR: string;
    ENERGY: string;
    TORSO: string;
    FACE: string;
    BELT: string;
    ARMLEFTLOWER: string;
    ARMLEFTUPPER: string;
    ARMRIGHTLOWER: string;
    ARMRIGHTUPPER: string;
    LEGLEFTLOWER: string;
    LEGLEFTUPPER: string;
    LEGRIGHTLOWER: string;
    LEGRIGHTUPPER: string;
};
declare const GameCommands: {
    CLEAR: string;
    MESSAGE: string;
    SHUTDOWN: string;
    LOAD: string;
    SPAWN: string;
    PAUSE: string;
    SPECTATE: string;
    JOIN: string;
    PREFERENCE: string;
    KILL: string;
    SUICIDE: string;
    EXPLODE: string;
    LOGIN: string;
    CLIENTS: string;
    COMMANDS: string;
    KICK: string;
    MUTE_ACCOUNT: string;
    UNMUTE_ACCOUNT: string;
    BAN_ACCOUNT: string;
    UNBAN_ACCOUNT: string;
    BAN: string;
    BALANCE: string;
    PARAMS: string;
    MEMSTATS: string;
    WAVE: string;
    SALUTE: string;
    MAGIC: string;
    TOSS: string;
    BUSY: string;
    DONE: string;
    LOG_PERF: string;
    SPAWN_BOT: string;
    DISABLE_BOTS: string;
    IMMORTAL: string;
    INVASION: string;
    HOSTILE: string;
    WAYPOINTS: string;
    DEBUG: string;
    DEBUG_CLIENT: string;
    DEBUG_DRAW: string;
    READY: string;
};
/** @param {any} a @param {any} [b] */ declare function GameStatus(a: any, b?: any): void;
declare namespace GameStatus {
    var _q: {
        JOIN: number;
        LEAVE: number;
        SPEC: number;
        LIST: number;
    };
    export { _q as Player };
    export var _s: {
        RUNNING: number;
        PAUSED: number;
        GAMEOVER: number;
        COUNTDOWN: number;
        LEADER: number;
        TEAM: number;
        DAMAGE: number;
    };
    export { _s as Game };
    export var Settings: {
        WORLD: number;
    };
}
declare class ActionTable extends PIXI.Container {
    tableWidth: number;
    tableHeight: number;
    maxChars: number;
    spaceStr: string;
    maxLines: number;
    textFields: any[];
    icons: any[];
    listItemCount: number;
    bravoFlagCount: PIXI.Text | null;
    alphaFlagCount: PIXI.Text | null;
    pLocal: PIXI.Text | undefined;
    constructor();
    register(a: any, b: any, c?: number): void;
    setMode(a: any): void;
    displayCTFUI(): void;
    updateFlagScore(a: any): void;
    updateTDMScore(a: any): void;
    updateDBScore(a: any): void;
    updateTRScore(a: any): void;
    display1V1UI(): void;
    displayDMUI(): void;
    displayTDMUI(): void;
    displayDBUI(): void;
    updateTopListing(a: any): void;
    addRow(a: any, b: any, c?: number): void;
    getWidth(): number;
    getHeight(): number;
}
declare namespace ActionTable {
    var FontRow: {
        fontFamily: string;
        fontSize: number;
    };
}
declare class AmmoBar extends PIXI.Container {
    barWidth: number;
    barHeight: number;
    beltX: number;
    beltWidth: number;
    totalWidth: number;
    value: number;
    maxValue: number;
    beltAmmoAmount: number;
    beltIcon: any;
    compactLayout: boolean;
    background: PIXI.Graphics;
    itemTitle: any;
    ammoIcon: PIXI.Sprite;
    bar: PIXI.Container<PIXI.ContainerChild>;
    numElements: number;
    elements: PIXI.Sprite[];
    ammoCount: any;
    reloadLabelWidth: any;
    shotCooldownBar: PIXI.Container<PIXI.ContainerChild>;
    shotCooldownFill: PIXI.Graphics;
    beltItemTitle: any;
    beltAmmoCount: any;
    constructor();
    setValue(a: any): void;
    positionAmmoCount(): void;
    getValue(): number;
    setShotCooldown(a: any, b: any, c: any, d?: number): void;
    setReloadProgress(a: any, b: any, c?: number): void;
    setMaxValue(a: any): void;
    subtract(): void;
    update(): void;
    setItem(a: any): void;
    setBeltItem(a: any): void;
    setCompactLayout(a: any): void;
    layoutAmmoVisuals(): void;
    layoutBeltIcon(): void;
    decrementBeltValue(): void;
    updateLabel /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateAmmoValue(a: any): void;
    updateBeltValue(a: any): void;
    getWidth(): number;
    getHeight(): number;
}
declare namespace AmmoBar {
    var MAX_VALUE: number;
    var BELT_ICON_VERTICAL_OFFSET: number;
    var AMMO_ICON_X: number;
    var AMMO_ICON_Y: number;
    var AMMO_ELEMENT_X: number;
    var AMMO_ELEMENT_Y: number;
    var AMMO_ELEMENT_GAP: number;
    var COMPACT_HEIGHT: number;
    var COMPACT_BELT_X: number;
    var LabelTextCacheKey: string;
    var AmmoTextCacheKey: string;
    var BeltTextCacheKey: string;
}
declare var damagevignette: {};
declare class DamageVignette extends PIXI.Sprite {
    eventMode: string;
    targetAlpha: number;
    fadeBound: () => void;
    textureWidth: any;
    textureHeight: number | undefined;
    constructor(a: any, b: any, c?: number);
    resize(a: any, b: any, c?: number): void;
    setIntensity(a: any, b?: boolean): void;
    fade(a?: number): void;
    destroy(a: any): void;
}
declare var escapemenu: {};
declare class EscapeMenu extends PIXI.Graphics {
    mute: string;
    interactive: boolean;
    menuWidth: number;
    menuHeight: number;
    sectionLabel: PIXI.Text;
    title: PIXI.Text;
    closeButton: ImgButton;
    muteButton: EscapeMenuButton;
    controlsButton: EscapeMenuButton;
    weaponMenuButton: EscapeMenuButton;
    roleButton: EscapeMenuButton;
    leaveLabel: PIXI.Text;
    escapeButton: EscapeMenuButton;
    constructor();
    drawPanel(): void;
    createCloseButton(): ImgButton;
    setRoleAction(a: any, b: any, c: any, d?: boolean): void;
    getSoundStatus(): "AUDIO ENABLED" | "AUDIO MUTED";
    onMute(): void;
    setMuted(a: any): void;
}
declare namespace EscapeMenu {
    var CLOSE: string;
    var MUTE: string;
    var CONTROLS: string;
    var SETTINGS: string;
    var WEAPONS: string;
    var EXIT: string;
    var CHANGE_ROLE: string;
    var MUTE_NO: string;
    var MUTE_YES: string;
}
declare class EscapeMenuButton extends PIXI.Graphics {
    buttonWidth: number;
    buttonHeight: number;
    iconSize: number;
    danger: boolean;
    compact: boolean;
    pressed: boolean;
    hover: boolean;
    interactive: boolean;
    enabled: boolean;
    cursor: string;
    hitArea: PIXI.Rectangle;
    title: PIXI.Text;
    subtitle: PIXI.Text;
    shortcut: PIXI.Text;
    icon: PIXI.Sprite | undefined;
    eventMode: PIXI.EventMode | undefined;
    constructor(a: any, b: any, c: any, d?: any, e?: boolean, f?: boolean);
    drawBackground(): void;
    scaleIcon(): void;
    setEnabled(a: any): void;
    setSubtitle(a: any): void;
    onMouseOver(): void;
    onMouseOut(): void;
    onMouseDown(): void;
    onMouseUp(): void;
    setIcon(a: any): void;
}
declare class GameoverDisplay extends PIXI.Container {
    _width: number;
    _height: number;
    duelOutcome: boolean;
    victory: boolean;
    prominent: boolean;
    panelOffsetY: number;
    panel: PIXI.Graphics;
    gameoverTitle: PIXI.Text;
    gameoverDetail: PIXI.Text;
    countdownClock: PIXI.Text;
    count: any;
    panelWidth: number | undefined;
    panelHeight: number | undefined;
    panelX: number | undefined;
    constructor();
    setContent(a: any): void;
    updateCountdown(a: any): void;
    drawPanel(): void;
    getWidth(): number;
    getHeight(): number;
    showClock(): void;
    hideClock(): void;
}
declare namespace GameoverDisplay {
    var CountdownTextCache: {};
    var GetCachedCountdownText: (a: any) => any;
}
declare var goldcount: {};
declare class GoldCount extends PIXI.Container {
    cardWidth: number;
    cardHeight: number;
    compactLayout: boolean;
    background: PIXI.Graphics;
    label: any;
    goldIcon: PIXI.Sprite;
    goldText: any;
    gold: number;
    constructor();
    setCompactLayout(a: any): void;
    increment(a: any): void;
    setValue(a: any): void;
    getWidth(): number;
    getHeight(): number;
}
declare namespace GoldCount {
    var LabelTextCacheKey: string;
    var ValueTextCacheKey: string;
    var ICON_X: number;
    var ICON_Y: number;
    var COMPACT_MAX_VALUE_WIDTH: number;
}
declare class HealthBar extends PIXI.Container {
    barWidth: number;
    barHeight: number;
    value: number;
    maxValue: number;
    compactLayout: boolean;
    background: PIXI.Graphics;
    healthIcon: PIXI.Sprite;
    bar: PIXI.Container<PIXI.ContainerChild>;
    numElements: number;
    elements: PIXI.Sprite[];
    valueText: any;
    burnIcon: PIXI.Sprite;
    burning: boolean;
    constructor();
    setValue(a: any): void;
    getValue(): number;
    setBurning(a: any): void;
    setCompactLayout(a: any): void;
    update(): void;
    getWidth(): number;
    getHeight(): number;
}
declare namespace HealthBar {
    var MAX_VALUE: number;
    var TextCacheKey: string;
}
declare var leaderboard: {};
declare class Leaderboard extends PIXI.Container {
    background: PIXI.Graphics;
    spectatorRows: any;
    spectatorContainer: PIXI.Sprite;
    spectatorTitle: PIXI.Text;
    constructor();
    init(): void;
    addSpectator(a: any): boolean;
    removeSpectator(a: any): boolean;
    updateSpectators(): void;
}
declare namespace Leaderboard {
    var TextCacheKey: string;
    var DrawPanel: (a: any, b?: any, c?: any) => void;
    var DrawHeader: (a: any, b: any, c?: string) => {
        titleField: string;
        hintField: PIXI.Text;
    };
    var DrawTableHeader: (a: any, b?: any, c?: any, d?: any) => PIXI.Graphics;
    var DrawTeamCard: (a: any, b?: any, c?: any, d?: any, e?: any, f?: any) => PIXI.Graphics;
    var DrawInfoCard: (a: any, b?: any, c?: any) => void;
    var StyleInfoCard: (a: any) => void;
    var PositionInfoCardIcons: (a: any) => void;
    var StyleTitle: (a: any, b?: any) => void;
    var StyleColumns: (...a: any[]) => void;
    var StyleTeamTitle: (a: any, b?: any) => void;
    var ConfigureRow: (a: any, b?: any, c?: any, d?: any, e?: any, f?: any) => void;
    var AddDeathIndicator: (a: any, b?: any) => void;
    var AddMuteIndicator: (a: any) => void;
    var RefreshMuteIndicator: (a: any) => void;
    var SetRowAlive: (a: any, b?: any) => void;
    var RefreshRowBackground: (a: any, b?: any) => void;
}
declare class LeaderboardRow extends PIXI.Sprite {
    sid: any;
    muteIdentity: any;
    name: any;
    local: any;
    title: any;
    clanId: any;
    clanName: any;
    skill: any;
    interactive: boolean;
    level: any;
    nameField: PIXI.Text;
    ratingTag: PIXI.Sprite;
    skillIndex: number;
    skillTag: PIXI.Sprite;
    constructor(a: any);
    setName(a: any): void;
    setSkill(a: any): void;
    updateCached /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateRatio(): void;
    getskill(): any;
    mark(): void;
    unmark(): void;
}
declare class RowLabel extends PIXI.Container {
    background: PIXI.Graphics;
    eventMode: string;
    interactiveChildren: boolean;
    nameFieldTitle: PIXI.Text;
    levelFieldTitle: PIXI.Text;
    skillFieldTitle: PIXI.Text;
    clanFieldTitle: PIXI.Text;
    descTitle: PIXI.Text;
    nameField: PIXI.Text;
    levelField: PIXI.Text;
    skillField: PIXI.Text;
    clanField: PIXI.Text;
    ratingTag: PIXI.Sprite | null;
    skillTag: PIXI.Sprite | null;
    constructor();
    update /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
}
declare var playerdropdown: {};
declare class PlayerDropdown extends PIXI.Container {
    target: any;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    muteRow: PlayerDropdownActionRow;
    unmuteRow: PlayerDropdownActionRow;
    inviteRow: PlayerDropdownActionRow;
    constructor();
    onInvite(): Promise<void>;
    onMute(): void;
    onUnmute(): void;
    show(): void;
}
declare namespace PlayerDropdown {
    var Action: {
        MUTE: string;
        UNMUTE: string;
        INVITE: string;
    };
}
declare class PlayerDropdownActionRow extends PIXI.Container {
    actionText: PIXI.Text;
    interactive: boolean;
    hitArea: PIXI.Rectangle;
    constructor(a: any, b?: any, c?: any);
}
declare var dm_leaderboard: {};
declare class LeaderboardDM extends Leaderboard {
    _width: number;
    _height: number;
    invalidated: boolean;
    dropdown: PlayerDropdown;
    header: {
        titleField: string;
        hintField: PIXI.Text;
    };
    killslevelField: PIXI.Text;
    damageTitleField: PIXI.Text;
    deathslevelField: PIXI.Text;
    ratiolevelField: PIXI.Text;
    skilllevelField: PIXI.Text;
    table: PIXI.Container<PIXI.ContainerChild>;
    tableHeader: PIXI.Graphics;
    rows: any;
    rowLabel: DMRowLabel;
    constructor();
    validate(): void;
    reset(): void;
    hide(): void;
    updateTeamPoints(): void;
    addClient(a: any): void;
    displayDropdown(a: any): void;
    hideDropdown(): void;
    removeClient(a: any): void;
    displayClientInfo(a: any): void;
    hideClientInfo(): void;
    moveClientInfo(a: any): void;
    updateClient(a: any): void;
    update(): void;
    getWidth(): number;
    getHeight(): number;
}
declare class DMLeaderboardRow extends PIXI.Sprite {
    sid: any;
    muteIdentity: any;
    name: any;
    local: any;
    title: any;
    clanId: any;
    clanName: any;
    skill: any;
    team: any;
    alive: any;
    damage: number;
    ratio: number;
    interactive: boolean;
    kills: any;
    deaths: any;
    level: any;
    leaderboardRow: PIXI.Sprite;
    nameField: PIXI.Text;
    killsField: any;
    damageField: any;
    deathsField: any;
    ratioField: any;
    skillField: any;
    ratingTag: PIXI.Sprite;
    skillIndex: number;
    skillTag: PIXI.Sprite;
    constructor(a: any);
    setName(a: any): void;
    setKills(a: any): void;
    setDamage(a: any): void;
    setDeaths(a: any): void;
    setSkill(a: any): void;
    updateRatio(): void;
    updateCached /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    getKills(): any;
    getDeaths(): any;
    getDamage(): number;
    getRatio(): number;
    getskill(): any;
    mark(): void;
    unmark(): void;
}
declare class DMRowLabel extends PIXI.Container {
    background: PIXI.Graphics;
    eventMode: string;
    interactiveChildren: boolean;
    nameFieldTitle: PIXI.Text;
    levelFieldTitle: PIXI.Text;
    skillFieldTitle: PIXI.Text;
    clanFieldTitle: PIXI.Text;
    descTitle: PIXI.Text;
    nameField: PIXI.Text;
    levelField: PIXI.Text;
    skillField: PIXI.Text;
    clanField: PIXI.Text;
    ratingTag: PIXI.Sprite | null;
    skillTag: PIXI.Sprite | null;
    constructor();
    update /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
}
declare var tdm_leaderboard: {};
declare class LeaderboardTDM extends Leaderboard {
    _width: number;
    _height: number;
    invalidated: boolean;
    dropdown: PlayerDropdown;
    alphaCard: PIXI.Graphics;
    bravoCard: PIXI.Graphics;
    alphaTitleField: PIXI.Text;
    bravoTitleField: PIXI.Text;
    alphaKillsTitleField: PIXI.Text;
    alphaDamageTitleField: PIXI.Text;
    alphaDeathsTitleField: PIXI.Text;
    alphaRatioTitleField: PIXI.Text;
    alphaSkillTitleField: PIXI.Text;
    bravoKillsTitleField: PIXI.Text;
    bravoDamageTitleField: PIXI.Text;
    bravoDeathsTitleField: PIXI.Text;
    bravoRatioTitleField: PIXI.Text;
    bravoSkillTitleField: PIXI.Text;
    alphaFlag: PIXI.Sprite;
    bravoFlag: PIXI.Sprite;
    alphaPoints: PIXI.Text;
    bravoPoints: PIXI.Text;
    bravoPointsTotal: number;
    alphaPointsTotal: number;
    alphaHeader: PIXI.Graphics;
    bravoHeader: PIXI.Graphics;
    table: PIXI.Container<PIXI.ContainerChild>;
    rowsAlpha: any;
    rowsBravo: any;
    rowLabel: TDMRowLabel;
    constructor();
    validate(): void;
    reset(): void;
    getTeamRows(a: any): any;
    hide(): void;
    addClient(a: any): void;
    displayDropdown(a: any): void;
    hideDropdown(): void;
    removeClient(a: any): void;
    displayClientInfo(a: any): void;
    hideClientInfo(): void;
    moveClientInfo(a: any): void;
    updateTeamPoints(a: any): void;
    updateClient /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    update(): void;
    getWidth(): number;
    getHeight(): number;
}
declare namespace LeaderboardTDM {
    var TEAM_ALPHA: number;
    var TEAM_BRAVO: number;
}
declare class LeaderboardTDMRow extends PIXI.Sprite {
    sid: any;
    muteIdentity: any;
    name: any;
    local: any;
    title: any;
    clanId: any;
    clanName: any;
    skill: any;
    team: any;
    alive: any;
    damage: number;
    ratio: number;
    interactive: boolean;
    kills: any;
    deaths: any;
    level: any;
    leaderboardRow: PIXI.Sprite;
    nameField: PIXI.Text;
    killsField: any;
    damageField: any;
    deathsField: any;
    ratioField: any;
    skillField: any;
    ratingTag: PIXI.Sprite;
    skillIndex: number;
    skillTag: PIXI.Sprite;
    constructor(a: any);
    setName(a: any): void;
    setKills(a: any): void;
    setDeaths(a: any): void;
    setDamage(a: any): void;
    setSkill(a: any): void;
    updateRatio(): void;
    updateCached /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    getKills(): any;
    getDeaths(): any;
    getDamage(): number;
    getRatio(): number;
    getSkill(): any;
    mark(): void;
    unmark(): void;
}
declare class TDMRowLabel extends PIXI.Container {
    background: PIXI.Graphics;
    eventMode: string;
    interactiveChildren: boolean;
    nameFieldTitle: PIXI.Text;
    titleFieldTitle: PIXI.Text;
    skillFieldTitle: PIXI.Text;
    clanFieldTitle: PIXI.Text;
    descTitle: PIXI.Text;
    nameField: PIXI.Text;
    titleField: PIXI.Text;
    skillField: PIXI.Text;
    clanField: PIXI.Text;
    ratingTag: PIXI.Sprite | null;
    skillTag: PIXI.Sprite | null;
    constructor();
    update /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
}
declare var ctf_leaderboard: {};
declare class LeaderboardCTF extends Leaderboard {
    _width: number;
    _height: number;
    invalidated: boolean;
    dropdown: PlayerDropdown;
    alphaCard: PIXI.Graphics;
    bravoCard: PIXI.Graphics;
    alphaTitleField: PIXI.Text;
    bravoTitleField: PIXI.Text;
    alphaKillsTitleField: PIXI.Text;
    alphaDamageTitleField: PIXI.Text;
    alphaDeathsTitleField: PIXI.Text;
    alphaRatioTitleField: PIXI.Text;
    alphaPointsTitleField: PIXI.Text;
    alphaSkillTitleField: PIXI.Text;
    bravoKillsTitleField: PIXI.Text;
    bravoDamageTitleField: PIXI.Text;
    bravoDeathsTitleField: PIXI.Text;
    bravoRatioTitleField: PIXI.Text;
    bravoPointsTitleField: PIXI.Text;
    bravoSkillTitleField: PIXI.Text;
    alphaFlag: PIXI.Sprite;
    bravoFlag: PIXI.Sprite;
    alphaPoints: PIXI.Text;
    bravoPoints: PIXI.Text;
    bravoPointsTotal: number;
    alphaPointsTotal: number;
    alphaHeader: PIXI.Graphics;
    bravoHeader: PIXI.Graphics;
    table: PIXI.Container<PIXI.ContainerChild>;
    rowsAlpha: any;
    rowsBravo: any;
    rowLabel: CTFRowLabel;
    constructor();
    validate(): void;
    reset(): void;
    hide(): void;
    getTeamRows(a: any): any;
    addClient(a: any): void;
    displayDropdown(a: any): void;
    hideDropdown(): void;
    removeClient(a: any): void;
    displayClientInfo(a: any): void;
    hideClientInfo(): void;
    moveClientInfo(a: any): void;
    updateTeamPoints(a: any): void;
    updateClient /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    update(): void;
    getWidth(): number;
    getHeight(): number;
}
declare namespace LeaderboardCTF {
    var TEAM_ALPHA: number;
    var TEAM_BRAVO: number;
}
declare class CTFLeaderboardRow extends PIXI.Sprite {
    sid: any;
    muteIdentity: any;
    name: any;
    local: any;
    title: any;
    clanId: any;
    clanName: any;
    skill: any;
    team: any;
    alive: any;
    damage: number;
    ratio: number;
    interactive: boolean;
    kills: any;
    deaths: any;
    points: any;
    level: any;
    leaderboardRow: PIXI.Sprite;
    nameField: PIXI.Text;
    killsField: any;
    damageField: any;
    deathsField: any;
    ratioField: any;
    skillField: any;
    pointsField: any;
    ratingTag: PIXI.Sprite;
    skillIndex: number;
    skillTag: PIXI.Sprite;
    constructor(a: any);
    setName(a: any): void;
    setKills(a: any): void;
    setDeaths(a: any): void;
    setPoints(a: any): void;
    setDamage(a: any): void;
    setSkill(a: any): void;
    updateRatio(): void;
    updateCached /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    getKills(): any;
    getDeaths(): any;
    getPoints(): any;
    getDamage(): number;
    getRatio(): number;
    getSkill(): any;
    mark(): void;
    unmark(): void;
}
declare class CTFRowLabel extends PIXI.Container {
    background: PIXI.Graphics;
    eventMode: string;
    interactiveChildren: boolean;
    nameFieldTitle: PIXI.Text;
    titleFieldTitle: PIXI.Text;
    skillFieldTitle: PIXI.Text;
    clanFieldTitle: PIXI.Text;
    descTitle: PIXI.Text;
    nameField: PIXI.Text;
    titleField: PIXI.Text;
    skillField: PIXI.Text;
    clanField: PIXI.Text;
    ratingTag: PIXI.Sprite | null;
    skillTag: PIXI.Sprite | null;
    constructor();
    update /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
}
declare var db_leaderboard: {};
declare class LeaderboardDB extends Leaderboard {
    _width: number;
    _height: number;
    invalidated: boolean;
    dropdown: PlayerDropdown;
    alphaCard: PIXI.Graphics;
    bravoCard: PIXI.Graphics;
    alphaTitleField: PIXI.Text;
    bravoTitleField: PIXI.Text;
    alphaKillsTitleField: PIXI.Text;
    alphaDamageTitleField: PIXI.Text;
    alphaDeathsTitleField: PIXI.Text;
    alphaRatioTitleField: PIXI.Text;
    alphaSkillTitleField: PIXI.Text;
    bravoKillsTitleField: PIXI.Text;
    bravoDamageTitleField: PIXI.Text;
    bravoDeathsTitleField: PIXI.Text;
    bravoRatioTitleField: PIXI.Text;
    bravoSkillTitleField: PIXI.Text;
    alphaFlag: PIXI.Sprite;
    bravoFlag: PIXI.Sprite;
    alphaPoints: PIXI.Text;
    bravoPoints: PIXI.Text;
    bravoPointsTotal: number;
    alphaPointsTotal: number;
    alphaHeader: PIXI.Graphics;
    bravoHeader: PIXI.Graphics;
    table: PIXI.Container<PIXI.ContainerChild>;
    rowsAlpha: any;
    rowsBravo: any;
    rowLabel: DBRowLabel;
    constructor();
    validate(): void;
    reset(): void;
    getTeamRows(a: any): any;
    hide(): void;
    addClient(a: any): void;
    displayDropdown(a: any): void;
    hideDropdown(): void;
    removeClient(a: any): void;
    displayClientInfo(a: any): void;
    hideClientInfo(): void;
    moveClientInfo(a: any): void;
    registerTeamPoint(a: any): void;
    updateTeamPoints(a: any): void;
    updateClient /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    update(): void;
    getWidth(): number;
    getHeight(): number;
}
declare namespace LeaderboardDB {
    var TEAM_ALPHA: number;
    var TEAM_BRAVO: number;
}
declare class LeaderboardDBRow extends PIXI.Sprite {
    sid: any;
    muteIdentity: any;
    name: any;
    local: any;
    title: any;
    clanId: any;
    clanName: any;
    skill: any;
    team: any;
    alive: any;
    damage: number;
    ratio: number;
    interactive: boolean;
    kills: any;
    deaths: any;
    level: any;
    leaderboardRow: PIXI.Sprite;
    nameField: PIXI.Text;
    killsField: any;
    damageField: any;
    deathsField: any;
    ratioField: any;
    skillField: any;
    ratingTag: PIXI.Sprite;
    skillIndex: number;
    skillTag: PIXI.Sprite;
    constructor(a: any);
    setName(a: any): void;
    setKills(a: any): void;
    setDeaths(a: any): void;
    setDamage(a: any): void;
    setSkill(a: any): void;
    updateRatio(): void;
    updateCached /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    getKills(): any;
    getDeaths(): any;
    getDamage(): number;
    getRatio(): number;
    getSkill(): any;
    mark(): void;
    unmark(): void;
}
declare class DBRowLabel extends PIXI.Container {
    background: PIXI.Graphics;
    eventMode: string;
    interactiveChildren: boolean;
    nameFieldTitle: PIXI.Text;
    titleFieldTitle: PIXI.Text;
    skillFieldTitle: PIXI.Text;
    clanFieldTitle: PIXI.Text;
    descTitle: PIXI.Text;
    nameField: PIXI.Text;
    titleField: PIXI.Text;
    skillField: PIXI.Text;
    clanField: PIXI.Text;
    ratingTag: PIXI.Sprite | null;
    skillTag: PIXI.Sprite | null;
    constructor();
    update /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
}
declare var tr_leaderboard: {};
declare class LeaderboardTR extends Leaderboard {
    _width: number;
    _height: number;
    invalidated: boolean;
    dropdown: PlayerDropdown;
    header: {
        titleField: string;
        hintField: PIXI.Text;
    };
    killsTitleField: PIXI.Text;
    damageTitleField: PIXI.Text;
    deathsTitleField: PIXI.Text;
    ratioTitleField: PIXI.Text;
    skillTitleField: PIXI.Text;
    table: PIXI.Container<PIXI.ContainerChild>;
    tableHeader: PIXI.Graphics;
    rows: any;
    rowLabel: TRRowLabel;
    constructor();
    validate(): void;
    reset(): void;
    hide(): void;
    updateTeamPoints(): void;
    addClient(a: any): void;
    displayDropdown(a: any): void;
    hideDropdown(): void;
    removeClient(a: any): void;
    displayClientInfo(a: any): void;
    hideClientInfo(): void;
    moveClientInfo(a: any): void;
    updateClient(a: any): void;
    update(): void;
    getWidth(): number;
    getHeight(): number;
}
declare class TRLeaderboardRow extends PIXI.Sprite {
    sid: any;
    muteIdentity: any;
    name: any;
    local: any;
    title: any;
    clanId: any;
    clanName: any;
    skill: any;
    team: any;
    alive: any;
    damage: number;
    ratio: number;
    interactive: boolean;
    kills: any;
    deaths: any;
    level: any;
    leaderboardRow: PIXI.Sprite;
    nameField: PIXI.Text;
    killsField: any;
    damageField: any;
    deathsField: any;
    ratioField: any;
    skillField: any;
    ratingTag: PIXI.Sprite;
    skillIndex: number;
    skillTag: PIXI.Sprite;
    constructor(a: any);
    setKills(a: any): void;
    setDamage(a: any): void;
    setDeaths(a: any): void;
    setSkill(a: any): void;
    updateRatio(): void;
    updateCached /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    getKills(): any;
    getDeaths(): any;
    getDamage(): number;
    getRatio(): number;
    getskill(): any;
    mark(): void;
    unmark(): void;
}
declare class TRRowLabel extends PIXI.Container {
    background: PIXI.Graphics;
    eventMode: string;
    interactiveChildren: boolean;
    nameFieldTitle: PIXI.Text;
    titleFieldTitle: PIXI.Text;
    skillFieldTitle: PIXI.Text;
    clanFieldTitle: PIXI.Text;
    descTitle: PIXI.Text;
    nameField: PIXI.Text;
    titleField: PIXI.Text;
    skillField: PIXI.Text;
    clanField: PIXI.Text;
    ratingTag: PIXI.Sprite | null;
    skillTag: PIXI.Sprite | null;
    constructor();
    update /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
}
declare var onevone_leaderboard: {};
declare class Leaderboard1V1 extends Leaderboard {
    _width: number;
    _height: number;
    invalidated: boolean;
    dropdown: PlayerDropdown;
    header: {
        titleField: string;
        hintField: PIXI.Text;
    };
    killsTitleField: PIXI.Text;
    damageTitleField: PIXI.Text;
    deathsTitleField: PIXI.Text;
    ratioTitleField: PIXI.Text;
    skillTitleField: PIXI.Text;
    table: PIXI.Container<PIXI.ContainerChild>;
    tableHeader: PIXI.Graphics;
    rows: any;
    rowLabel: OneVOneRowLabel;
    constructor();
    validate(): void;
    reset(): void;
    hide(): void;
    updateTeamPoints(): void;
    addClient(a: any): void;
    displayDropdown(a: any): void;
    hideDropdown(): void;
    removeClient(a: any): void;
    displayClientInfo(a: any): void;
    hideClientInfo(): void;
    moveClientInfo(a: any): void;
    updateClient(a: any): void;
    update(): void;
    getWidth(): number;
    getHeight(): number;
}
declare class OneVOneLeaderboardRow extends PIXI.Sprite {
    sid: any;
    muteIdentity: any;
    name: any;
    local: any;
    title: any;
    clanId: any;
    clanName: any;
    skill: any;
    team: any;
    alive: any;
    damage: number;
    ratio: number;
    interactive: boolean;
    kills: any;
    deaths: any;
    level: any;
    leaderboardRow: PIXI.Sprite;
    nameField: PIXI.Text;
    killsField: any;
    damageField: any;
    deathsField: any;
    ratioField: any;
    skillField: any;
    ratingTag: PIXI.Sprite;
    skillIndex: number;
    skillTag: PIXI.Sprite;
    constructor(a: any);
    setName(a: any): void;
    setKills(a: any): void;
    setDamage(a: any): void;
    setDeaths(a: any): void;
    setSkill(a: any): void;
    updateRatio(): void;
    updateCached /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    getKills(): any;
    getDeaths(): any;
    getDamage(): number;
    getRatio(): number;
    getskill(): any;
    mark(): void;
    unmark(): void;
}
declare class OneVOneRowLabel extends PIXI.Container {
    background: PIXI.Graphics;
    eventMode: string;
    interactiveChildren: boolean;
    nameFieldTitle: PIXI.Text;
    titleFieldTitle: PIXI.Text;
    skillFieldTitle: PIXI.Text;
    clanFieldTitle: PIXI.Text;
    descTitle: PIXI.Text;
    nameField: PIXI.Text;
    titleField: PIXI.Text;
    skillField: PIXI.Text;
    clanField: PIXI.Text;
    ratingTag: PIXI.Sprite | null;
    skillTag: PIXI.Sprite | null;
    constructor();
    update /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
}
declare class Hud extends PIXI.Container {
    manager: any;
    keyboardMapping: {};
    numSpectators: number;
    textBar: PIXI.Container<PIXI.ContainerChild>;
    textBarInterval: number | null;
    textBarTimeout: number | null;
    specMode: boolean;
    comboBar: PIXI.Container<PIXI.ContainerChild>;
    onKeyDownListener: (a: any) => void;
    onKeyUpListener: (a: any) => void;
    mode: any;
    helpImageFirstDisplay: boolean;
    damageGraphic: DamageVignette;
    statusBar: PIXI.Container<PIXI.ContainerChild>;
    statusBarCompact: boolean;
    healthBar: HealthBar;
    jetBar: JetBar;
    ammoBar: AmmoBar;
    goldCount: GoldCount;
    actionTable: ActionTable;
    gameoverDisplay: GameoverDisplay;
    weaponMenu: WeaponMenu;
    weaponMenuPrefersMinimized: boolean;
    weaponMenuTransitionInterval: number | null;
    weaponMenuDisplayState: string;
    localPlayerAlive: boolean;
    activeSecondaryWeapon: {
        itemId: any;
        customTexture: null;
    } | null;
    activePrimaryWeapon: {
        itemId: any;
        customTexture: null;
    } | null;
    minimizedWeaponMenu: MinimizedWeaponMenu;
    leaderboardUpdateInterval: number;
    hideHelpImageInterval: any;
    displayHelpImageInterval: any;
    cache: {};
    helpImage: PIXI.Container<PIXI.ContainerChild>;
    escapeMenu: EscapeMenu;
    statusBarShadow: PIXI.Graphics | undefined;
    statusBarFrame: PIXI.Graphics | undefined;
    statusBarToggle: PIXI.Container<PIXI.ContainerChild> | undefined;
    statusBarToggleLabel: PIXI.Text | undefined;
    zombieWaveStatus: PIXI.Container<PIXI.ContainerChild> | undefined;
    zombieWaveStatusCompact: any;
    zombieWaveEnded: boolean | undefined;
    zombieWavePreparing: any;
    zombieWavePreparingTimeout: number | null | undefined;
    zombieWaveFrame: PIXI.Graphics | undefined;
    zombieWaveTitle: PIXI.Text | undefined;
    zombieWaveValue: PIXI.Text | undefined;
    zombieWaveTimer: PIXI.Text | undefined;
    weaponMenuTimeout: number | null | undefined;
    spectatorBar: PIXI.Graphics | undefined;
    spectatorBarText: PIXI.Text | undefined;
    spectatorText: PIXI.Text | undefined;
    readyBarText: PIXI.Text | null | undefined;
    readyBar: any;
    leaderboard: Leaderboard1V1 | LeaderboardCTF | LeaderboardDB | LeaderboardDM | LeaderboardTDM | LeaderboardTR | undefined;
    constructor(a: any);
    createStatusBarFrame(): void;
    drawStatusBarFrame(): void;
    createStatusBarToggle(): void;
    positionStatusBarToggle(): void;
    setStatusBarCompact(a: any): void;
    layoutStatusBar(): void;
    createZombieWaveStatus(): void;
    setZombieWaveStatusCompact(a: any): void;
    centerZombieWaveText(): void;
    layoutZombieWaveStatus(): void;
    updateZombieWaveStatus(a: any): void;
    createControlsPanel(): PIXI.Container<PIXI.ContainerChild>;
    refreshControlsPanel(a?: PIXI.Container<PIXI.ContainerChild>): void;
    layoutControlsPanel(): void;
    displayHelpImage(): void;
    hideHelpImage(): void;
    displayEscapeMenu(): void;
    hideEscapeMenu(): void;
    setMuted(a: any): void;
    onKeyDown(a: any): void;
    onKeyUp(a: any): void;
    clearSpectatorNotice(): void;
    applySpecSetup(): void;
    drawSpectatorBar(): void;
    dismissReadyBar(): boolean;
    onReadyBarSelected(): void;
    enableReadyBar(): void;
    setReadyBarHover(a: any): void;
    applyPlayerSetup(): void;
    setGameMode(a: any): void;
    onDisplayProfile(a: any): void;
    updateFlagScore(a: any): void;
    updateTopListing(a: any): void;
    updateTDMScore(a: any): void;
    updateDBScore(a: any): void;
    updateTRScore(a: any): void;
    onPlayerState(a: any): void;
    setAvailableItems(a: any): void;
    displayWeaponMenu(a: any, b?: boolean): void;
    canDisplayWeaponMenu(): boolean;
    clearWeaponMenuTransition(): void;
    getExpandedWeaponMenuLayout(): {
        x: number;
        y: number;
        scale: number;
    };
    getMinimizedWeaponMenuLayout(): {
        x: number;
        y: number;
        scale: number;
    };
    layoutWeaponMenus(): void;
    refreshMinimizedWeaponMenu(): void;
    createActiveWeaponDescriptor(a: any, b?: any): {
        itemId: any;
        customTexture: null;
    } | null;
    rememberSelectedWeapon(a: any): void;
    rememberActiveWeapon /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    hideWeaponMenus(): void;
    displayMinimizedWeaponMenu(): void;
    minimizeWeaponMenu(): void;
    expandWeaponMenu(): void;
    animateWeaponMenuTransition(a: any): void;
    displayDeathWeaponMenu(): void;
    isPointInsideDisplayObject /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    isEventFromDisplayObject /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    blocksGameInput(a: any): boolean;
    onPlayerSpawn(): void;
    isBotActor(a: any): boolean;
    isZombieActor(a: any): boolean;
    getHudActorName(a: any): any;
    getHudActorColor(a: any, b?: number): number;
    isLeaderboardActor(a: any): boolean;
    onPlayerDeath(a: any): void;
    onPlayerLife(a: any): void;
    onPlayerCombo(a: any): void;
    setJet /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    setHealth(a: any): void;
    setItemStatus /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateShotCooldown(a: any): void;
    registerKill(): void;
    registerScore(a: any): void;
    registerDbRoundWin(a: any): void;
    onGameobjectAdded(): void;
    updateTeamStats(a: any): void;
    onModelState(): void;
    setGameoverState(a: any): void;
    setLeaderboard(): void;
    reset(): void;
    emptyLeaderboard(): void;
    setGameoverCount(a: any): void;
    setPlayMode(): void;
    updateTextbarText(a: any): void;
    resetTextbarPresentation(): void;
    drawPlainTextBar(a: any): void;
    layoutTextbarVerticalPosition(): void;
    configureBottomSplash(a: any, b: any, c: any, d: any, e: any, f?: boolean): void;
    configureKillSplash(a: any, b: any, c: any, d: any, e?: boolean): void;
    configureObjectiveSplash(a: any, b: any, c: any, d: any, e?: boolean): void;
    displayObjectiveMessage(a: any): void;
    textBarMessage /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    displayScoredBy(a: any): void;
    displayDbRoundWon(a: any): void;
    displayTrackingMessage(a: any): void;
    displayTeamKilledBy(a: any): void;
    displayTeamKilled(a: any): void;
    displayKilledBy /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    displayKilled /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    displaySuicide(a: any): void;
    displayCombo(a: any): void;
    drawComboBar /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    layoutComboBar(): void;
    showTextBar /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    hideTextBar(): void;
    _reduceTextBarAlpha(): void;
    addClient(a: any): void;
    removeClient(a: any): void;
    addSpectator(a: any): void;
    removeSpectator(a: any): void;
    updateSpectatorText(): void;
    cleanup(): void;
    onFocus(): void;
    onUpdateEnvironment(a: any): void;
}
declare namespace Hud {
    var STATUS_BAR_WIDTH: number;
    var STATUS_BAR_HEIGHT: number;
    var TouchBindings: {
        ctrl_jump: string;
        ctrl_move_left: string;
        ctrl_move_right: string;
        ctrl_crouch: string;
        ctrl_prone: string;
        ctrl_fly: string;
        ctrl_throw: string;
        ctrl_flag: string;
        ctrl_fire: string;
        ctrl_reload: string;
        ctrl_drop: string;
        ctrl_swap: string;
        ctrl_chat: string;
        ctrl_team_chat: string;
        ctrl_help: string;
        ctrl_weapon: string;
        ctrl_leader: string;
    };
    var COMPACT_STATUS_BAR_WIDTH: number;
    var COMPACT_STATUS_BAR_HEIGHT: number;
    var ZOMBIE_STATUS_WIDTH: number;
    var ZOMBIE_STATUS_COMPACT_WIDTH: number;
    var ZOMBIE_TIMER_WIDTH: number;
    var ZOMBIE_STATUS_COMPACT_HEIGHT: number;
    var KILL_SPLASH_MIN_WIDTH: number;
    var KILL_SPLASH_MAX_WIDTH: number;
    var KILL_SPLASH_HEIGHT: number;
    var KILL_SPLASH_BOTTOM_SHIFT: number;
    var OBJECTIVE_SPLASH_PROMINENT_ICON_SIZE: number;
    var KILL_SPLASH_KILL_COLOR: number;
    var KILL_SPLASH_DEATH_COLOR: number;
    var KILL_SPLASH_BOT_COLOR: number;
    var KILL_SPREE_MIN_WIDTH: number;
    var KILL_SPREE_MAX_WIDTH: number;
    var KILL_SPREE_HEIGHT: number;
    var KILL_SPREE_PRESENTATIONS: {
        double: {
            title: string;
            count: number;
            accent: number;
        };
        triple: {
            title: string;
            count: number;
            accent: number;
        };
        quad: {
            title: string;
            count: number;
            accent: number;
        };
        penta: {
            title: string;
            count: number;
            accent: number;
        };
        mega: {
            title: string;
            count: number;
            accent: number;
        };
        monster: {
            title: string;
            count: number;
            accent: number;
        };
        god: {
            title: string;
            count: number;
            accent: number;
        };
    };
    var WEAPON_MENU_TRANSITION_MS: number;
    var TextbarTextCache: {};
    var TextbarTextCacheCount: number;
    var FormatControlBinding: (a: any) => string;
    var READY_BAR_MAX_WIDTH: number;
    var READY_BAR_HEIGHT: number;
    var NOTICE_BAR_MIN_WIDTH: number;
    var NOTICE_BAR_MAX_WIDTH: number;
    var NOTICE_BAR_HEIGHT: number;
    var GetCachedTextbarText: (a: any) => any;
    var GetCachedLeaderboardText: (a: any) => PIXI.Text;
}
/** @param {any} a @param {any} [b] */ declare function HudEvent(a: any, b?: any): void;
declare namespace HudEvent {
    var SELECT_ITEM: string;
    var CHANGE_KEYBOARD_LAYOUT: string;
    var MUTE_SOUND: string;
    var EXIT: string;
    var LEADERBOARD_UPDATE: string;
    var DISPLAY_PROFILE: string;
    var CLOSE_WEAPON_MENU: string;
    var MINIMIZE_WEAPON_MENU: string;
    var OPEN_WEAPON_MENU: string;
    var SIGNAL_READY: string;
}
declare class JetBar extends PIXI.Container {
    barWidth: number;
    barHeight: number;
    value: number;
    maxValue: number;
    compactLayout: boolean;
    background: PIXI.Graphics;
    energyIcon: PIXI.Sprite;
    bar: PIXI.Container<PIXI.ContainerChild>;
    numElements: number;
    elements: PIXI.Sprite[];
    valueText: any;
    constructor();
    setValue(a: any): void;
    getValue(): number;
    setMaxValue(a: any): void;
    setCompactLayout(a: any): void;
    update(): void;
    getWidth(): number;
    getHeight(): number;
}
declare namespace JetBar {
    var MAX_VALUE: number;
    var TextCacheKey: string;
}
declare class Minimap extends PIXI.Container {
    constructor();
    addObject(a: any): void;
}
declare class WeaponMenuPreview {
}
declare namespace WeaponMenuPreview {
    var WIDTH: number;
    var HEIGHT: number;
    var Create: (a: any, b?: string, c?: any) => any;
}
declare class WeaponMenu extends PIXI.Graphics {
    isEmpty: boolean;
    panelWidth: number;
    panelHeight: number;
    rules: PIXI.Graphics;
    menuTitle: PIXI.Text;
    primaryTitle: PIXI.Text;
    secondaryTitle: PIXI.Text;
    closeButton: ImgButton;
    minimizeButton: ImgButton;
    primaryItems: {};
    essentialItemSelected: boolean;
    primaryItemId: any;
    disabledCount: number;
    secondaryCount: number;
    primaryCount: number;
    secondaryItems: {};
    secondaryItemSelected: boolean;
    secondaryItemId: any;
    adblockEnabled: boolean;
    adblockArea: PIXI.Sprite | undefined;
    adblockBackground: PIXI.Graphics | undefined;
    adblockText: PIXI.Text | undefined;
    constructor();
    addItem(a: any): void;
    rearrange(): void;
    refreshSelection(a?: boolean): void;
    selectItem /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
}
declare class MinimizedWeaponMenu extends PIXI.Container {
    panelWidth: number;
    panelHeight: number;
    interactive: boolean;
    cursor: string;
    background: PIXI.Graphics;
    slotContainer: PIXI.Container<PIXI.ContainerChild>;
    emptyText: PIXI.Text;
    restingScale: any;
    team: any;
    constructor();
    setRestingScale(a: any): void;
    setItems /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    normalizeWeapon /** @param {any} a @param {any} [b] */(a: any, b?: any): {
        itemId: any;
        customTexture: any;
        equip: null;
    } | null;
    createItemSlot(a: any): PIXI.Container<PIXI.ContainerChild>;
}
declare class WeaponButton extends PIXI.Sprite {
    itemId: any;
    equip: any;
    interactive: boolean;
    cursor: string;
    cardWidth: number;
    cardHeight: number;
    tintColor: number;
    titleColor: number;
    hover: boolean;
    graphics: PIXI.Graphics;
    lineGraphic: PIXI.Graphics;
    icon: any;
    initialScale: number;
    hoverScale: number;
    selected: boolean;
    title: PIXI.Text;
    enabled: boolean;
    constructor(a: any, b: any, c?: string);
    onMouseOver(a: any): void;
    onMouseOut(): void;
    setIconScale(a: any): void;
    select(): void;
    deselect(): void;
    drawTile(a: any): void;
    drawOutline(a: any): void;
}
declare var gamemodes: {}, GAME_MODES: {
    DEATHMATCH: string;
    TEAM_DEATHMATCH: string;
    CAPTURE_THE_FLAG: string;
    DODGEBALL: string;
    TRAINING: string;
    ZOMBIE_SURVIVAL: string;
    ONE_V_ONE: string;
};
declare var gameattribute: {};
declare function GameAttribute(): void;
declare namespace GameAttribute {
    var SPAWN_PLAYER: number;
    var EMITTER: number;
    var BOUNDARY: number;
    var LETHAL: number;
    var DAMAGE: number;
    var HEAL: number;
    var ITEM: number;
    var REVOLUTE_JOINT: number;
    var WELD_JOINT: number;
    var GRAVITY_SCALE: number;
    var FLAG: number;
    var ACCELERATOR: number;
    var TELEPORT: number;
    var ANIMATION: number;
    var WAYPOINT: number;
    var INSERTION: number;
    var LABEL: number;
    var IMMORTAL: number;
    var FLUID: number;
    var TRANSFORM: number;
    var UV_TRANSLATE: number;
    var UV_ROTATE: number;
    var SPAWN_BOT: number;
    var SLOW: number;
    var DEFORMATION: number;
    var LIQUID: number;
    var T_TRANSFORM: number;
    var T_FLUID: number;
    var T_UV_ROTATE: number;
    var T_UV_TRANSLATE: number;
}
declare function Gold(a: any): void;
declare namespace Gold {
    var _t: {
        onAdded: {
            audio: Howl;
        }[][];
        onRemove: {
            audio: Howl;
        }[][];
        onContact: {
            audio: Howl;
        }[];
    };
    export { _t as Audio };
}
declare function Bouncyball(a: any): void;
declare namespace Bouncyball {
    var _u: {
        onContact: {
            audio: Howl;
        }[];
    };
    export { _u as Audio };
}
declare var flag: {};
declare function Flag(a: any): void;
declare namespace Flag {
    var Sprites: ({
        t: number;
        c: number;
        radius: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
        o?: undefined;
    } | {
        w?: undefined;
        h?: undefined;
        t: number;
        c: number;
        radius: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
        o: {
            x: number;
            y: number;
        };
    })[];
    var Shapes: ({
        t: number;
        c: number;
        radius: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
        o?: undefined;
    } | {
        w?: undefined;
        h?: undefined;
        t: number;
        c: number;
        radius: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
        o: {
            x: number;
            y: number;
        };
    })[];
}
declare function AK47Ammo(a: any): void;
declare namespace AK47Ammo {
    var _w: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _w as Audio };
}
declare function BarrettAmmo(a: any): void;
declare namespace BarrettAmmo {
    var _x: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _x as Audio };
}
declare function ChainsawAmmo(a: any): void;
declare namespace ChainsawAmmo {
    var _y: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _y as Audio };
}
declare function ClusterNadeBox(a: any): void;
declare namespace ClusterNadeBox {
    var _z: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[];
    };
    export { _z as Audio };
}
declare function DesertEagleAmmo(a: any): void;
declare namespace DesertEagleAmmo {
    var _0: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _0 as Audio };
}
declare function FlameThrowerAmmo(a: any): void;
declare namespace FlameThrowerAmmo {
    var _6: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _6 as Audio };
}
declare function HealthBox(a: any): void;
declare namespace HealthBox {
    var _7: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[];
    };
    export { _7 as Audio };
}
declare function LaserGunAmmo(a: any): void;
declare namespace LaserGunAmmo {
    var _8: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _8 as Audio };
}
declare function LinkGunAmmo(a: any): void;
declare namespace LinkGunAmmo {
    var _9: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _9 as Audio };
}
declare function MAC10Ammo(a: any): void;
declare namespace MAC10Ammo {
    var _10: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _10 as Audio };
}
declare function MinigunAmmo(a: any): void;
declare namespace MinigunAmmo {
    var _11: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _11 as Audio };
}
declare function NadeBox(a: any): void;
declare namespace NadeBox {
    var _12: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[];
    };
    export { _12 as Audio };
}
declare function NadeLauncherAmmo(a: any): void;
declare namespace NadeLauncherAmmo {
    var _13: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _13 as Audio };
}
declare function PulseGunAmmo(a: any): void;
declare namespace PulseGunAmmo {
    var _14: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _14 as Audio };
}
declare function RifleAmmo(a: any): void;
declare namespace RifleAmmo {
    var _15: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _15 as Audio };
}
declare function RPGAmmo(a: any): void;
declare namespace RPGAmmo {
    var _16: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _16 as Audio };
}
declare function ShockRifleAmmo(a: any): void;
declare namespace ShockRifleAmmo {
    var _17: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _17 as Audio };
}
declare function ShotgunAmmo(a: any): void;
declare namespace ShotgunAmmo {
    var _18: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _18 as Audio };
}
declare function ShurikenBox(a: any): void;
declare namespace ShurikenBox {
    var _19: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[];
    };
    export { _19 as Audio };
}
declare function SMGAmmo(a: any): void;
declare namespace SMGAmmo {
    var _20: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _20 as Audio };
}
declare function SnowballBox(a: any): void;
declare namespace SnowballBox {
    var _21: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[];
    };
    export { _21 as Audio };
}
declare function X75Ammo(a: any): void;
declare namespace X75Ammo {
    var _22: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _22 as Audio };
}
declare function AK47(a: any): void;
declare namespace AK47 {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _23: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _23 as Audio };
}
declare function Barrett(a: any): void;
declare namespace Barrett {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _24: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _24 as Audio };
}
declare function BoomerangGun(a: any): void;
declare namespace BoomerangGun {
    export var Shapes: {
        t: number;
        c: number;
        v: {
            x: number;
            y: number;
        }[];
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _25: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _25 as Audio };
}
declare function Bow(a: any): void;
declare namespace Bow {
    export var Shapes: {
        t: number;
        c: number;
        v: {
            x: number;
            y: number;
        }[];
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _26: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _26 as Audio };
}
declare function Carbine(a: any): void;
declare namespace Carbine {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _27: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _27 as Audio };
}
declare function Chainsaw(a: any): void;
declare namespace Chainsaw {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _28: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _28 as Audio };
}
declare function Deagle(a: any): void;
declare function DesertEagle(a: any): void;
declare namespace DesertEagle {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _29: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _29 as Audio };
}
declare function FlameThrower(a: any): void;
declare namespace FlameThrower {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _30: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _30 as Audio };
}
declare function LaserGun(a: any): void;
declare namespace LaserGun {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _31: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
        checkAltContact: boolean;
    };
    export { _31 as Audio };
}
declare function LinkGun(a: any): void;
declare namespace LinkGun {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _32: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _32 as Audio };
}
declare function M60(a: any): void;
declare namespace M60 {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _33: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _33 as Audio };
}
declare function MAC10(a: any): void;
declare namespace MAC10 {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _34: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _34 as Audio };
}
declare function Minigun(a: any): void;
declare namespace Minigun {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _35: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _35 as Audio };
}
declare function NadeLauncher(a: any): void;
declare namespace NadeLauncher {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _36: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _36 as Audio };
}
declare function PulseGun(a: any): void;
declare namespace PulseGun {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _37: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _37 as Audio };
}
declare function Rifle(a: any): void;
declare namespace Rifle {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _38: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _38 as Audio };
}
declare function RocketLauncher(a: any): void;
declare namespace RocketLauncher {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _39: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _39 as Audio };
}
declare function RPG(a: any): void;
declare namespace RPG {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _40: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _40 as Audio };
}
declare function ShockRifle(a: any): void;
declare namespace ShockRifle {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _41: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _41 as Audio };
}
declare function Shotgun(a: any): void;
declare namespace Shotgun {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _42: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _42 as Audio };
}
declare function SubmachineGun(a: any): void;
declare namespace SubmachineGun {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _43: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _43 as Audio };
}
declare function Uzi(a: any): void;
declare namespace Uzi {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _44: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _44 as Audio };
}
declare function X75(a: any): void;
declare namespace X75 {
    export var Shapes: {
        t: number;
        c: number;
        w: number;
        h: number;
        fr: number;
        re: number;
        s: boolean;
        d: number;
    }[];
    var _45: {
        onContact: {
            audio: Howl;
            delta: number;
        }[];
    };
    export { _45 as Audio };
}
declare function GhostBotDebris1(a: any): void;
declare function GhostBotDebris2(a: any): void;
declare function GhostBotDebris3(a: any): void;
declare var b2Body: any;
declare function TinyShrapnel(a: any): void;
declare function Prefab(a: any): void;
declare namespace Prefab {
    var ProjectileFields: string[];
}
declare function AK47Bullet(a: any): void;
declare namespace AK47Bullet {
    var _46: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _46 as Audio };
}
declare function Arrow(a: any): void;
declare namespace Arrow {
    var _47: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _47 as Audio };
}
declare function BarrettBullet(a: any): void;
declare namespace BarrettBullet {
    var _48: {
        onContact: {
            audio: Howl;
        }[][];
        onAgentContact: {
            audio: Howl;
        }[];
        checkAltContact: boolean;
    };
    export { _48 as Audio };
}
declare function Boomerang(a: any): void;
declare namespace Boomerang {
    export var Update: (a: any, b?: any) => void;
    var _49: {
        onContact: {
            audio: Howl;
        }[];
        onAgentContact: {
            audio: Howl;
        }[];
    };
    export { _49 as Audio };
}
declare function CarbineBullet(a: any): void;
declare namespace CarbineBullet {
    var _50: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _50 as Audio };
}
declare function DesertEagleBullet(a: any): void;
declare namespace DesertEagleBullet {
    var _51: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _51 as Audio };
}
declare function FlameThrowerLiquid(a: any): void;
declare namespace FlameThrowerLiquid {
    var Shapes: {
        c: number;
        radius: number;
        d: number;
        fr: number;
        re: number;
        minRestitution: boolean;
    }[];
}
declare function GhostLaser(a: any): void;
declare namespace GhostLaser {
    var _52: {
        onAdded: {
            audio: Howl;
        }[];
        onRemove: {
            audio: Howl;
        }[];
    };
    export { _52 as Audio };
}
declare function LaserGunBullet(a: any): void;
declare namespace LaserGunBullet {
    var _53: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _53 as Audio };
}
declare function LauncherNade(a: any): void;
declare namespace LauncherNade {
    var _54: {
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _54 as Audio };
}
declare function M60Bullet(a: any): void;
declare namespace M60Bullet {
    var _55: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _55 as Audio };
}
declare function MAC10Bullet(a: any): void;
declare namespace MAC10Bullet {
    var _56: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _56 as Audio };
}
declare function MinigunBullet(a: any): void;
declare namespace MinigunBullet {
    var _57: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _57 as Audio };
}
declare function PulseGunBullet(a: any): void;
declare namespace PulseGunBullet {
    export var Update: (a: any, b?: any) => void;
    var _58: {
        onContact: {
            audio: Howl;
        }[];
        checkAltContact: boolean;
    };
    export { _58 as Audio };
}
declare function RifleBullet(a: any): void;
declare namespace RifleBullet {
    var _59: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _59 as Audio };
}
declare function RLRocket(a: any): void;
declare namespace RLRocket {
    export var Update: (a: any, b?: any) => void;
    var _60: {
        onRemove: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _60 as Audio };
}
declare function RPGRocket(a: any): void;
declare namespace RPGRocket {
    export var Update: (a: any, b?: any) => void;
    var _61: {
        onRemove: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _61 as Audio };
}
declare function ShockRifleBullet(a: any): void;
declare namespace ShockRifleBullet {
    export var Update: (a: any, b?: any) => void;
    var _62: {
        onRemove: {
            audio: Howl;
        }[];
    };
    export { _62 as Audio };
}
declare function ShotgunPellet(a: any): void;
declare namespace ShotgunPellet {
    export var Contact: {
        damage: number;
    };
    var _63: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _63 as Audio };
}
declare function SubmachineGunBullet(a: any): void;
declare namespace SubmachineGunBullet {
    var _64: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _64 as Audio };
}
declare function UziBullet(a: any): void;
declare namespace UziBullet {
    var _65: {
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _65 as Audio };
}
declare function X75Nade(a: any): void;
declare namespace X75Nade {
    export var Explosive: {
        damage: number;
        radius: number;
        blast: number;
        mod: string;
    };
    var _66: {
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _66 as Audio };
}
declare function ClusterNade(a: any): void;
declare namespace ClusterNade {
    var _67: {
        onAdded: {
            audio: Howl;
        }[][];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _67 as Audio };
}
declare function ClusterNadeFragment(a: any): void;
declare namespace ClusterNadeFragment {
    var _68: {
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _68 as Audio };
}
declare function Nade(a: any): void;
declare namespace Nade {
    var _69: {
        onAdded: {
            audio: Howl;
        }[][];
        onContact: {
            audio: Howl;
            delta: number;
        }[];
        onRemove: {
            audio: Howl;
        }[][];
    };
    export { _69 as Audio };
}
declare function ShurikenBlade(a: any): void;
declare namespace ShurikenBlade {
    export var Shapes: {
        t: number;
        c: number;
        v: {
            x: number;
            y: number;
        }[];
        d: number;
        fr: number;
        re: number;
    }[];
    var _70: {
        onAdded: {
            audio: Howl;
        }[][];
        onContact: {
            audio: Howl;
            delta: number;
            single: boolean;
        }[];
        checkAltContact: boolean;
    };
    export { _70 as Audio };
}
declare function SnowballProjectile(a: any): void;
declare namespace SnowballProjectile {
    var _71: {
        onAdded: {
            audio: Howl;
        }[][];
        onContact: {
            audio: Howl;
        }[][];
        checkAltContact: boolean;
    };
    export { _71 as Audio };
}
declare var physicsmessage: {}, PhysicsMessage: {
    ADD: number;
    REMOVE: number;
    UPDATE: number;
    UPDATE_OBJECT: number;
    ADDED: number;
    REMOVED: number;
    UPDATED: number;
    START: number;
    STOP: number;
    FASTER: number;
    SLOWER: number;
    RESET: number;
    APPLY: number;
    APPLIED: number;
    SUBMERGE: number;
    SURFACE: number;
    UPDATE_OBJECT_BATCH: number;
    ARROW_PIN: number;
};
declare var manager: {};
declare class NetworkBinaryReader {
    buffer: any;
    view: DataView<any>;
    offset: number;
    constructor(a: any);
    ensure(a: any): void;
    readUint8(): any;
    readUint32(): number;
    readFloat64(): number;
    readVarUint(a?: number): number;
    readVarUint32(): number;
    readVarInt32(): number;
    readString(): string;
}
declare class NetworkUpdateBuffer {
    length: number;
    head: number;
    tail: number;
    capacity: number;
    used: number;
    free: any[];
    objects: any[];
    keys: any[];
    latest: Map<any, any>;
    replaceable: Map<any, any>;
    networkIds: Map<any, any>;
    carryingBacklog: boolean;
    scratch: {};
    values: string | undefined;
    constructor();
    grow(): void;
    allocate /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): any;
    remove(a: any): void;
    getKey /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    append /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    appendTransform /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): void;
    finishAppend /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    hasEssentialData(a: any): boolean;
    coalesce /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    shift(): any;
    clear(): void;
}
declare class Manager extends PIXI.EventEmitter {
    sid: any;
    p: PhysicsWorker;
    localUidPool: any;
    inBuffer: NetworkUpdateBuffer;
    bodies: {};
    explosions: any[];
    animated: {};
    animAttribs: any[];
    localPlayer: Player | null;
    players: {};
    playerList: any[];
    teams: any[];
    audioManager: AudioManager;
    resetSimulationDelta: boolean;
    worldInitialized: boolean;
    suspended: boolean;
    simulationTick: number;
    simulationAccumulatorMs: number;
    interpolatedBodies: any[];
    pendingPresentationBodies: any[];
    pendingBodyConnections: {};
    environment: any;
    pendingSyncOps: any[];
    pendingSyncOpTtl: number;
    lastTransformTick: number;
    lastAppliedTick: number;
    networkBodies: {};
    pendingNetworkUpdates: {};
    retiredNetworkRanges: any[];
    lastAckedInputSeq: number;
    debugClientPerformance: boolean;
    lastPhysicsUpdateMs: number | null;
    lastPhysicsSteps: number;
    syncStats: {
        droppedStaleFrames: number;
        queuedMissingStates: number;
        pendingStateExpirations: number;
        droppedStaleCorrections: number;
        correctionDistance: number;
        rawCorrectionDistance: number;
        pendingProjectionDistance: number;
    };
    prediction: PredictionController;
    predictionStats: {
        predictedInputs: number;
        pendingInputs: number;
        ignoredSmallCorrections: number;
        smoothedCorrections: number;
        snappedCorrections: number;
        maxCorrectionDistance: number;
        maxRawCorrectionDistance: number;
        staleCorrectionDrops: number;
        projectedCorrections: number;
        avoidedSnapCorrections: number;
        cappedProjectedCorrections: number;
        skippedProjectionIncreasedCorrection: number;
        maxPendingProjectionDistance: number;
    };
    trackedPlayerSid: any;
    lastScoringPlayerId: any;
    onPlayerSpawn: any;
    physicsMessageMap: {
        [PhysicsMessage.UPDATE_OBJECT]: (a: any) => void;
        [PhysicsMessage.UPDATE_OBJECT_BATCH]: (a: any) => void;
        [PhysicsMessage.UPDATED]: () => void;
        [PhysicsMessage.ADDED]: (a: any) => void;
        [PhysicsMessage.REMOVED]: (a: any) => void;
        [PhysicsMessage.SUBMERGE]: (a: any) => void;
        [PhysicsMessage.SURFACE]: (a: any) => void;
        [PhysicsMessage.ARROW_PIN]: (a: any) => void;
    } | undefined;
    localObjectMap: {
        [ParticleEffects.LOCAL_SAW]: (a: any) => void;
        [ParticleEffects.LOCAL_PUNCH]: (a: any) => void;
        [ParticleEffects.LOCAL_EXP]: (a: any) => void;
        [ParticleEffects.LOCAL_LINK_GUN]: (a: any) => void;
    } | undefined;
    stateChangeAgentMap: {
        [StateChange.Agent.ALIVE]: (a: any, b?: any) => void;
        [StateChange.Agent.HEALTH]: (a: any, b?: any) => void;
        [StateChange.Agent.COMBO]: (a: any, b?: any) => boolean;
        [StateChange.Agent.TELEPORT]: (a: any) => boolean;
        [StateChange.Agent.INSERTION]: () => boolean;
        [StateChange.Agent.MESSAGE]: (a: any, b?: any) => false | undefined;
        [StateChange.Agent.HOSTILE]: (a: any, b?: any) => boolean;
    } | undefined;
    stateChangeModelMap: {
        [StateChange.Model.KILL]: (a: any) => boolean;
        [StateChange.Model.ENVIRONMENT]: (a: any) => boolean;
        [StateChange.Model.ENERGY_RADIUS]: (a: any) => boolean;
        [StateChange.Model.END_DB_MATCH]: (a: any) => boolean;
        [StateChange.Model.INITIAL]: (a: any) => boolean;
        [StateChange.Model.WAVE]: (a: any) => boolean;
    } | undefined;
    stateChangeItemMap: {
        [StateChange.Item.CARRY_OBJECTIVE]: (a: any) => boolean;
        [StateChange.Item.DROP_OBJECTIVE]: (a: any) => boolean;
        [StateChange.Item.SCORE_OBJECTIVE]: (a: any) => boolean;
        [StateChange.Item.RETURN_OBJECTIVE]: (a: any) => boolean;
        [StateChange.Item.GORE]: (a: any, b?: any) => null;
    } | undefined;
    stateChangeMap: {
        [StateChange.Agent.RANGE]: (a: any, b?: any) => any;
        [StateChange.Model.RANGE]: (a: any, b?: any) => boolean;
        [StateChange.Item.RANGE]: (a: any, b?: any) => any;
    } | undefined;
    pendingOwnerUpdate: any;
    networkUpdateScratch: {} | undefined;
    camera: any;
    transformIds: Uint32Array<any> | undefined;
    transformMasks: Uint16Array<any> | undefined;
    transformValues: Float64Array<ArrayBuffer> | undefined;
    pendingStaticSnapshotOps: any;
    awaitingResync: boolean | undefined;
    networkPackets: any[] | undefined;
    networkPacketBytes: number | undefined;
    lastResyncRequestAt: number | undefined;
    waypoints: {} | undefined;
    simulationInProgress: boolean | undefined;
    lastScoringPlayer: any;
    weaponPresentationOwners: any[] | undefined;
    weaponPresentationPass: any;
    constructor(a: any);
    _initMessageMaps(): void;
    isBotActor(a: any, b?: any): boolean;
    getHudActorName(a: any, b?: any): any;
    getHudActorColor(a: any, b?: any, c?: number): number;
    _playWaterSplash(a: any): void;
    _onSubmerge(a: any): void;
    _onSurface(a: any): void;
    _setAuthoritativePlayerSubmerged /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    _onLocalRaycast(a: any): void;
    _onLocalExplosion(a: any): void;
    _onLocalLinkGun(a: any): void;
    _scAgentAlive /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    _scAgentHealth /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    presentAuthoritativeProjectileHit /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    _scAgentCombo /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    _scAgentTeleport(a: any): boolean;
    _scAgentInsertion(): boolean;
    _scAgentMessage /** @param {any} a @param {any} [b] */(a: any, b?: any): false | undefined;
    _scModelKill(a: any): boolean;
    _scModelEnvironment(a: any): boolean;
    _scModelEnergyRadius(a: any): boolean;
    _scModelEndDbMatch(a: any): boolean;
    _scModelInitial(a: any): boolean;
    _scModelWave(a: any): boolean;
    _scItemCarryObjective(a: any): boolean;
    _scItemDropObjective(a: any): boolean;
    _scItemScoreObjective(a: any): boolean;
    _scItemReturnObjective(a: any): boolean;
    _scItemGore /** @param {any} a @param {any} [b] */(a: any, b?: any): null;
    _pendingKey /** @param {any} a @param {any} [b] */(a: any, b?: any): string;
    getPendingBodyConnectionKey /** @param {any} a @param {any} [b] */(a: any, b?: any): string;
    clearPendingBodyConnection /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    attachObjectiveToCarrier(a: any): boolean;
    resolvePendingBodyConnections(a?: number): void;
    preContact /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    contact /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    processBuffer(a?: number, b?: number): void;
    getNetworkUpdateBuffer(): NetworkUpdateBuffer;
    _processAdd(a: any): void;
    _processSyncOp(a: any): boolean;
    _processStateOp(a: any, b?: boolean): boolean;
    _processUpdateOp(a: any, b?: boolean): boolean;
    smoothPresentationCorrection /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    static translatePresentationSamples /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    static decayPresentationCorrection(a: any): void;
    findRetiredNetworkRange(a: any): number;
    isNetworkIdRetired(a: any): boolean;
    setNetworkIdRetired /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    registerNetworkBody /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    _processNetworkUpdate(a: any, b?: boolean): boolean;
    getMissingStateDependency(a: any): any;
    queueMissingSyncOp /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    retryPendingSyncOps(a?: number): void;
    _processRemove(a: any): void;
    _scAgentHostile /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    queueBodyExplosion(a: any, b?: any): boolean;
    _processExplosions(a?: number): void;
    createLocalPlayer /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    createAgent /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    setCamera(a: any): void;
    instantiate(a: any): any;
    createGameObject(a: any): GameObject;
    applySettings(a: any): void;
    getLocalPlayer(): Player | null;
    readBinaryUpdateKey(a: any): any;
    readBinaryUpdateValue(a: any, b?: number): any;
    readBinaryUpdateMap(a: any, b?: number): {};
    readBinaryUpdateOp(a: any): any;
    readBinaryAddParams(a: any): any;
    readBinaryAddOp(a: any): {
        op: string;
    };
    pushSyncPacket(a: any): any;
    pushBinaryUpdatePacket(a: any, b?: any): any;
    pushUpdates(a: any): void;
    pushTransformPacket(a: any, b?: any): boolean;
    ensureTransformCapacity(a: any): void;
    appendUpdates(a: any): void;
    requestNetworkResync(): void;
    enqueueNetworkPacket /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    ingestNetworkPackets(): void;
    requestLocalObject(a: any): void;
    applyStateChange(a: any): false | ((a: any, b?: any) => any) | null;
    clear(): void;
    destroy(): void;
    getPlayerById(a: any): any;
    getLastScoringPlayer(): any;
    trackPlayer(a: any): void;
    setTrackObject(a: any, b?: boolean): void;
    clearTrackedPlayer(a: any): void;
    getTrackObject(): any;
    processNetworkUpdates(): void;
    update(a: any): void;
    static clampSimulationDelta(a: any): number;
    static getFixedSimulationStepMs(): number;
    showPlayerChat(a: any, b: any, c?: boolean): void;
    showBotChat /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onPlayerJet /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    resume(): void;
    suspend(): void;
    applyEnvironment(a: any): void;
    focus(): void;
    mute(a: any): void;
    onPhysicsMessage(a: any): void;
    onPackedUpdateBatch(a: any): void;
    onAdded(a: any): void;
    onPlayerAdded /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    processContacts(a: any, b?: any): boolean;
    captureProjectileImpact(a: any, b: any, c?: any): void;
    applyPhysicsContacts /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onUpdateObject(a: any): void;
    applyPhysicsUpdate /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] @param {any} [h] @param {any} [k] @param {any} [l] @param {any} [m] @param {any} [n] @param {any} [p] @param {any} [r] @param {any} [q] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, k?: any, l?: any, m?: any, n?: any, p?: any, r?: any, q?: any): void;
    preparePresentationSmoothing(a: any): void;
    capturePhysicsPresentation /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    isActorPresentationVisible(a: any): boolean;
    static isPresentationBodyInView /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): boolean;
    updateActorPresentationVisibility(a: any): void;
    resetActorPresentationBody(a: any): void;
    prepareActorFrozenPresentation(a: any): void;
    presentPhysicsBodies(a: any): void;
    static applyPhysicsPresentation(a: any, b: any, c?: number, d?: number): void;
    static shortestAngleDelta /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    finalizePhysicsPresentation(a: any): void;
    updateRagdollPresentation(a: any): void;
    onUpdated(): void;
    onRemoved(a: any): void;
}
declare namespace Manager {
    var DefaultEnvironment: {
        weather: {
            precipitation: {
                type: string;
                intensity: number;
            };
        };
        gravity: {
            x: number;
            y: number;
        };
        gradient: {
            topColor: string;
            bottomColor: string;
            topY: number;
            bottomY: number;
        };
        settings: {
            energy: number;
        };
    };
    var NETWORK_TRANSFORM_FIELDS: {
        name: string;
        bit: number;
        scale: number;
        bytes: number;
        type: string;
    }[];
    var NETWORK_MOTION_FIELDS: string[];
    var NETWORK_TRANSFORM_FIELD_BY_NAME: any;
    var NETWORK_MOTION_MASK: number;
    var NETWORK_PROCESS_BUDGET_MS: number;
    var NETWORK_PROCESS_MAX_OPS: number;
    var NETWORK_MAX_QUEUED_OPS: number;
    var NETWORK_MAX_QUEUED_BYTES: number;
    var NETWORK_UPDATE_MARKER: number;
    var NETWORK_UPDATE_VERSION: number;
    var NETWORK_BINARY_MAX_DEPTH: number;
    var NETWORK_SYNC_MARKER: number;
    var NETWORK_SYNC_VERSION: number;
    var NETWORK_SYNC_HEADER_BYTES: number;
    var NETWORK_BINARY_MAX_OPS: number;
    var NETWORK_BINARY_MAX_COLLECTION_LENGTH: number;
    var NETWORK_VALUE_NULL: number;
    var NETWORK_VALUE_FALSE: number;
    var NETWORK_VALUE_TRUE: number;
    var NETWORK_VALUE_UINT: number;
    var NETWORK_VALUE_SINT: number;
    var NETWORK_VALUE_FLOAT64: number;
    var NETWORK_VALUE_STRING: number;
    var NETWORK_VALUE_ARRAY: number;
    var NETWORK_VALUE_OBJECT: number;
    var NETWORK_VALUE_DECIMAL_100: number;
    var NETWORK_VALUE_DECIMAL_1000: number;
    var NETWORK_VALUE_DECIMAL_10000: number;
    var NETWORK_OP_GENERIC: number;
    var NETWORK_OP_ADD: number;
    var NETWORK_OP_UPDATE: number;
    var NETWORK_BINARY_OPS: (string | null)[];
    var NETWORK_REF_NONE: number;
    var NETWORK_REF_NETWORK_ID: number;
    var NETWORK_REF_STRING_ID: number;
    var NETWORK_BINARY_KEYS: (string | null)[];
    var NETWORK_BINARY_TEXT_DECODER: TextDecoder;
    var BASE_SIMULATION_STEP_MS: number;
    var REMOTE_CORRECTION_MAX_PIXELS: number;
    var REMOTE_CORRECTION_HALF_LIFE_MS: number;
    var REMOTE_CORRECTION_SNAP_PIXELS: number;
    var LOCAL_CORRECTION_MAX_PIXELS: number;
    var LOCAL_CORRECTION_HALF_LIFE_MS: number;
    var LOCAL_CORRECTION_SNAP_PIXELS: number;
    var MAX_CATCH_UP_STEPS: number;
    var STEP_EPSILON_MS: number;
    var PACKED_UPDATE_CONTACTS: number;
    var NETWORK_BINARY_UPDATE_FIELDS: ({
        name: string;
        bit: number;
        scale: number;
        bytes: number;
        type: string;
    } | {
        name: string;
        bit: number;
        type: string;
    })[];
    var NETWORK_BINARY_ADD_FIELDS: any[];
    var NETWORK_BINARY_ADD_PARAM_FIELDS: any[];
}
declare var modelevent: {};
/** @param {any} a @param {any} [b] */ declare function ModelEvent(a: any, b?: any): void;
declare namespace ModelEvent {
    var ENTER_FRAME: string;
    var GAMEOBJECT_ADDED: string;
    var GAMEOBJECT_UPDATED: string;
    var GAMEOBJECT_DELETED: string;
    var GAMEOBJECT_CONTACT: string;
    var UPDATE_LABEL: string;
    var REMOVE_LABEL: string;
    var SAVE_MAP: string;
    var PLAYER_STATE: string;
    var AGENT_STATE: string;
    var PLAYER_ACTION: string;
    var PLAYER_TELEPORT: string;
    var MODEL_STATE: string;
    var ENERGY_RADIUS: string;
    var PLAYER_DEATH: string;
    var PLAYER_SPAWN: string;
    var PLAYER_LIFE: string;
    var CLEAR: string;
    var PLAYER_KILL: string;
    var PLAYER_SCORE: string;
    var CREATE_EFFECT: string;
    var PLAYER_COMBO: string;
    var PLAYER_SPREE: string;
    var UPDATE_ENVIRONMENT: string;
    var FOCUS: string;
    var MESSAGE: string;
    var DB_ROUND_END: string;
    var INITIAL: string;
    var SUBMERGE: string;
    var SURFACE: string;
    var ZOMBIE_WAVE: string;
}
declare var shapeoptions: {};
declare var ShapeOptions: {
    NONE: number;
    CIRCLE: number;
    RECTANGLE: number;
    ROUNDED_RECT: number;
    PLAYER: number;
    COMPOUND: number;
    PARTICLE: number;
    ZOMBIE: number;
};
declare var rayparticle: {};
declare class RayParticle {
    m_type: any;
    cat: number;
    mask: any;
    id: any;
    pos: any;
    vel: any;
    d: number;
    fr: number;
    re: number;
    ld: number;
    gs: number;
    wd: number;
    gi: number;
    r: number;
    constructor(a: any, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number, k?: number, l?: number, m?: number, n?: number, p?: any);
}
declare var shapeplayer: {};
declare class ShapePlayer {
    static Create /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
}
declare var shapezombie: {};
declare class ShapeZombie {
    static Create /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
}
declare var shapecircle: {};
declare class ShapeCircle {
    static Create /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
}
declare var shaperectangle: {};
declare class ShapeRectangle {
    static Create /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
}
declare var shapecompound: {};
declare class ShapeCompound {
    static Create /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
}
declare namespace ShapeCompound {
    var PolyBuffer: {
        x: number;
        y: number;
    }[];
}
declare var bodyfactory: {}, b2Vec2: any, b2AABB: any, b2BodyDef: any;
declare var b2FixtureDef: any, b2FilterData: any, b2Fixture: any, b2World: any, b2PolygonShape: any, b2CircleShape: any, b2Joint: any, b2RevoluteJointDef: any, b2WeldJointDef: any;
declare var BodyFactory: {
    forWorld: (a: any) => any;
    free: (a: any) => void;
    createBody: (a: any) => RayParticle | {
        GetPosition: () => {
            x: any;
            y: any;
        };
        GetUserData: () => any;
        GetAngle: () => any;
        GetType: () => 0;
    };
    getBodyDef: (a: any) => any;
    createRagdoll: (a: any, b: any, c?: number) => number;
    joinBodies: (a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
    weldJoinBodies: (a: any, b?: any, c?: any, d?: any, e?: any) => any;
    createJoint: (a: any, b?: any, c?: any, d?: any, e?: any) => any;
} & {
    ShapeMap: (typeof ShapePlayer | null)[];
};
declare var animations: {};
/** @param {any} a @param {any} [b] */ declare function Animation(a: any, b?: any): void;
declare namespace Animation {
    var STAND: string;
    var WALK_LEFT: string;
    var WALK_RIGHT: string;
    var CROUCH_LEFT: string;
    var CROUCH_RIGHT: string;
    var CROUCH_MOVE_LEFT: string;
    var CROUCH_MOVE_RIGHT: string;
    var HOLD_GUN_LEFT: string;
    var HOLD_GUN_RIGHT: string;
    var SCOPE_GUN_LEFT: string;
    var SCOPE_GUN_RIGHT: string;
    var THROW_NADE_LEFT: string;
    var THROW_NADE_RIGHT: string;
    var ROLL_LEFT: string;
    var ROLL_RIGHT: string;
    var JUMP_LEFT: string;
    var JUMP_RIGHT: string;
    var THROW_LEFT: string;
    var THROW_RIGHT: string;
    var JET_LEFT: string;
    var JET_RIGHT: string;
    var RELOAD_LEFT: string;
    var RELOAD_RIGHT: string;
    var PUNCH_LEFT: string;
    var PUNCH_RIGHT: string;
    var FALL_LEFT: string;
    var FALL_RIGHT: string;
    var PRONE_LEFT: string;
    var PRONE_RIGHT: string;
    var PRONE_SCOPE_LEFT: string;
    var PRONE_SCOPE_RIGHT: string;
    var PRONE_END: string;
    var PRONE_MOVE_LEFT: string;
    var PRONE_MOVE_RIGHT: string;
    var SWITCH_LEFT: string;
    var SWITCH_RIGHT: string;
    var JUMP_LEFT_2: string;
    var JUMP_RIGHT_2: string;
    var SHOOT_BOW_LEFT: string;
    var SHOOT_BOW_RIGHT: string;
    var WAVE_LEFT: string;
    var WAVE_RIGHT: string;
    var SALUTE_LEFT: string;
    var SALUTE_RIGHT: string;
    var CHAT: string;
    var CHAT_END: string;
    var MAGIC_LEFT: string;
    var MAGIC_RIGHT: string;
    var TOSS_LEFT: string;
    var TOSS_RIGHT: string;
    var WEAPON_BASH_LEFT: string;
    var WEAPON_BASH_RIGHT: string;
    var DURATIONS: {};
    var REPEAT: {};
    var ARM_PAIRS: {};
}
declare function StandAnimation(): void;
declare namespace StandAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function WalkLeftAnimation(): void;
declare namespace WalkLeftAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function WalkRightAnimation(): void;
declare namespace WalkRightAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    } | {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    } | {
        joint: string;
        frames: number[];
    };
}
declare function CrouchLeftAnimation(): void;
declare namespace CrouchLeftAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function CrouchRightAnimation(): void;
declare namespace CrouchRightAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function CrouchMoveLeftAnimation(): void;
declare namespace CrouchMoveLeftAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function CrouchMoveRightAnimation(): void;
declare namespace CrouchMoveRightAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function HoldGunLeftAnimation(): void;
declare namespace HoldGunLeftAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function HoldGunRightAnimation(): void;
declare namespace HoldGunRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ScopeGunLeftAnimation(): void;
declare namespace ScopeGunLeftAnimation {
    var gearOffset: {
        x: number;
        y: number;
    };
    var gearOffsetSteps: number;
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ScopeGunRightAnimation(): void;
declare namespace ScopeGunRightAnimation {
    var gearOffset: {
        x: number;
        y: number;
    };
    var gearOffsetSteps: number;
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ThrowNadeLeftAnimation(): void;
declare namespace ThrowNadeLeftAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ThrowNadeRightAnimation(): void;
declare namespace ThrowNadeRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function RollLeftAnimation(): void;
declare function RollRightAnimation(): void;
declare function JumpLeftAnimation(): void;
declare namespace JumpLeftAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function JumpRightAnimation(): void;
declare namespace JumpRightAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function ThrowLeftAnimation(): void;
declare namespace ThrowLeftAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ThrowRightAnimation(): void;
declare namespace ThrowRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function JetLeftAnimation(): void;
declare namespace JetLeftAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function JetRightAnimation(): void;
declare namespace JetRightAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function ReloadLeftAnimation(): void;
declare namespace ReloadLeftAnimation {
    var gearOffset: {
        x: number;
        y: number;
    };
    var gearOffsetSteps: number;
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ReloadRightAnimation(): void;
declare namespace ReloadRightAnimation {
    var gearOffset: {
        x: number;
        y: number;
    };
    var gearOffsetSteps: number;
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function PunchLeftAnimation(): void;
declare namespace PunchLeftAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function PunchRightAnimation(): void;
declare namespace PunchRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function WeaponBashLeftAnimation(): void;
declare namespace WeaponBashLeftAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function WeaponBashRightAnimation(): void;
declare namespace WeaponBashRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function FallLeftAnimation(): void;
declare namespace FallLeftAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function FallRightAnimation(): void;
declare namespace FallRightAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function ProneLeftAnimation(): void;
declare namespace ProneLeftAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function ProneRightAnimation(): void;
declare namespace ProneRightAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function ProneScopeGunLeftAnimation(): void;
declare namespace ProneScopeGunLeftAnimation {
    var gearOffset: {
        x: number;
        y: number;
    };
    var gearOffsetSteps: number;
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ProneScopeGunRightAnimation(): void;
declare namespace ProneScopeGunRightAnimation {
    var gearOffset: {
        x: number;
        y: number;
    };
    var gearOffsetSteps: number;
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ProneEndAnimation(): void;
declare namespace ProneEndAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
    var tlLeftHip: {
        joint: string;
        frames: any[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: any[];
    };
    var tlRightHip: {
        joint: string;
        frames: any[];
    };
    var tlRightKnee: {
        joint: string;
        frames: any[];
    };
}
declare function ProneMoveLeftAnimation(): void;
declare namespace ProneMoveLeftAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function ProneMoveRightAnimation(): void;
declare namespace ProneMoveRightAnimation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function SwitchLeftAnimation(): void;
declare namespace SwitchLeftAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function SwitchRightAnimation(): void;
declare namespace SwitchRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function JumpLeft2Animation(): void;
declare namespace JumpLeft2Animation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function JumpRight2Animation(): void;
declare namespace JumpRight2Animation {
    var tlLeftHip: {
        joint: string;
        frames: number[];
    };
    var tlLeftKnee: {
        joint: string;
        frames: number[];
    };
    var tlRightHip: {
        joint: string;
        frames: number[];
    };
    var tlRightKnee: {
        joint: string;
        frames: number[];
    };
}
declare function ShootBowLeftAnimation(): void;
declare namespace ShootBowLeftAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ShootBowRightAnimation(): void;
declare namespace ShootBowRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function WaveLeftAnimation(): void;
declare namespace WaveLeftAnimation {
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function WaveRightAnimation(): void;
declare namespace WaveRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
}
declare function SaluteLeftAnimation(): void;
declare namespace SaluteLeftAnimation {
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function SaluteRightAnimation(): void;
declare namespace SaluteRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
}
declare function ChatAnimation(): void;
declare function ChatEndAnimation(): void;
declare function MagicLeftAnimation(): void;
declare namespace MagicLeftAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function MagicRightAnimation(): void;
declare namespace MagicRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function TossLeftAnimation(): void;
declare namespace TossLeftAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare function TossRightAnimation(): void;
declare namespace TossRightAnimation {
    var tlLeftShoulder: {
        joint: string;
        frames: number[];
    };
    var tlLeftElbow: {
        joint: string;
        frames: number[];
    };
    var tlRightShoulder: {
        joint: string;
        frames: number[];
    };
    var tlRightElbow: {
        joint: string;
        frames: number[];
    };
}
declare var Animations: {};
declare var damagevolumeindex: {};
declare class DamageVolumeIndex {
    cellSize: number;
    rows: Map<any, any>;
    entries: any[];
    dirtyEntries: any[];
    queryId: number;
    sweepHits: any[];
    sweepHitPool: any[];
    historySnapshots: any[];
    historicalVolume: {
        fixture: null;
        worldCenterX: number;
        worldCenterY: number;
        cos: number;
        sin: number;
        halfWidth: number;
        halfHeight: number;
        skinRadius: number;
        lowerX: number;
        lowerY: number;
        upperX: number;
        upperY: number;
    };
    boundRaycastEntry: (a: any) => void;
    boundAABBEntry: (a: any) => void;
    boundSweepEntry: (a: any) => void;
    activeRayP1: any;
    activeRayP2: any;
    activeRayReport: any;
    activeRayFraction: any;
    activeRayIncludeStartOverlap: boolean | undefined;
    activeAABBLowerX: any;
    activeAABBLowerY: any;
    activeAABBUpperX: any;
    activeAABBUpperY: any;
    activeAABBReport: any;
    activeSweepP1: any;
    activeSweepP2: any;
    activeSweepRadius: any;
    activeSweepFixture: any;
    activeSweepLowerX: number | undefined;
    activeSweepLowerY: number | undefined;
    activeSweepUpperX: any;
    activeSweepUpperY: any;
    constructor(a?: number);
    clear(): void;
    add(a: any): void;
    remove(a: any): void;
    markDirty(a: any): void;
    markAllDirty(): void;
    synchronize(): void;
    synchronizeEntry(a: any): void;
    synchronizePoseDefinition /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    ensureHistorySnapshotCapacity /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    captureHistory(a: any): void;
    raycastHistorical(a: any, b: any, c: any, d: any, e: any, f?: number): boolean;
    static raycastHistoricalVolume /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): number | null;
    removeFromCells(a: any): void;
    visitCell /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    forEachRayCandidate /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    raycast(a: any, b: any, c: any, d?: number, e?: boolean): any;
    raycastEntry(a: any): void;
    forEachAABBCandidate /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): void;
    queryAABB /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): void;
    queryAABBEntry(a: any): void;
    querySweptCircle /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): any[];
    querySweptCircleEntry(a: any): void;
    static compareSweepHits /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    static shouldCollide /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    static raycastVolume(a: any, b: any, c: any, d?: number): boolean;
    static raycastVolumeLocal /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] @param {any} [g] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any): boolean;
    static pointInVolume /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    static segmentIntersectsAABB /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): boolean;
    static toVolumeLocal /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): null;
    static circleOverlapsVolume /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): boolean;
    static sweepCircleVolume /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): number | null;
}
declare namespace DamageVolumeIndex {
    var LocalPoint: {
        x: number;
        y: number;
    };
    var LocalStart: {
        x: number;
        y: number;
    };
    var LocalEnd: {
        x: number;
        y: number;
    };
    var RAY_EPSILON: number;
    var SWEEP_EPSILON: number;
    var SERVER_TICK_MS: number;
    var HISTORY_TICKS: number;
    var HISTORY_POSE_STRIDE: number;
    var POSE_VOLUME_STRIDE: number;
    var INITIAL_HISTORY_CAPACITY: number;
    var HistoricalPoint: {
        x: number;
        y: number;
    };
    var HistoricalNormal: {
        x: number;
        y: number;
    };
}
declare var physicsworker: {};
declare const b2WorldManifold: any, b2ContactListener: any, b2DestructionListener: any, b2Filter: any, b2BodyType: any;
declare class PhysicsWorker {
    terrainSeams: TerrainSeams | null;
    _expSet: Set<any>;
    count: number;
    onMessage: any;
    timeWarp: number;
    deltatime: number;
    world: any;
    boundExplosionQueryResult: (a: any) => boolean;
    boundParticleQueryResult: (a: any) => boolean;
    contactListener: any;
    destructionListener: any;
    beginManifold: any;
    preManifold: any;
    particleSweepPosition: any;
    bodyFactory: any;
    MsgMap: (() => void)[];
    packedUpdateBatch: {
        count: number;
        stride: number;
        ids: any[];
        values: Float64Array<ArrayBuffer>;
        kinds: Uint8Array<ArrayBuffer>;
        animations: any[];
        contacts: any[];
    } | undefined;
    packedUpdateMessage: {
        type: number;
        data: {
            count: number;
            stride: number;
            ids: any[];
            values: Float64Array<ArrayBuffer>;
            kinds: Uint8Array<ArrayBuffer>;
            animations: any[];
            contacts: any[];
        };
    } | undefined;
    contactValidationDirty: boolean | undefined;
    activeDamageRayCallback: any;
    containsFluid: boolean | undefined;
    feetTerrainPoint: {
        x: number;
        y: number;
    } | undefined;
    slideDustManifold: any;
    particlesAdded: {} | undefined;
    ballChargeImpacts: any[] | undefined;
    ballChargeStep: any;
    hasSubmerged: {} | undefined;
    hasSurfaced: {} | undefined;
    solved: {} | undefined;
    damageVolumeIndex: DamageVolumeIndex | undefined;
    boundDamageRayReport: ((a: any, b?: any, c?: any, d?: any) => any) | undefined;
    continuous: {} | undefined;
    contact: {} | undefined;
    fluids: {} | undefined;
    submerged: {} | undefined;
    dynamics: {} | undefined;
    kinematics: {} | undefined;
    particles: {} | undefined;
    entities: {} | undefined;
    anchors: {} | undefined;
    joints: {} | undefined;
    forcesApplied: any[] | undefined;
    expList: any[] | undefined;
    debugValidateContacts: boolean | undefined;
    static getTmpVec2(a?: number, b?: number): any;
    static configureOwnerCollision /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    markOwnerCollisionBounce(a: any): void;
    static isFiniteNumber(a: any): boolean;
    static isFiniteVec2(a: any): boolean;
    static getRayFraction /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): number | null;
    static clampNumber(a: any, b: any, c?: number): number;
    static sanitizeVec2 /** @param {any} a @param {any} [b] */(a: any, b?: any): {
        x: any;
        y: any;
    };
    static sanitizeBodyVelocity /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    static getExplosionDeathVelocity(a: any): {
        x: any;
        y: any;
    };
    static getDeathMomentumImpactPoint /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): {
        x: any;
        y: any;
    } | null;
    static selectDeathMomentumBodies(a: any, b: any, c?: number): any;
    static clearRagdollAnimationState(a: any): void;
    static enableDeadRagdollSleeping(a: any): void;
    constructor(a: any);
    pushMessage(a: any): void;
    getBody(a: any): any;
    static shortestAngleDelta /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    initializePackedUpdateBatch(a?: number): void;
    growPackedUpdateBatch(): void;
    queuePackedUpdate /** @param {any} a @param {any} b @param {any} c @param {any} d @param {any} e @param {any} f @param {any} [r] @param {any} [q] */(a: any, b: any, c: any, d: any, e: any, f: any, g?: number, h?: number, k?: number, l?: number, m?: number, n?: number, p?: number, r?: any, q?: any): void;
    queuePackedContacts /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    flushPackedUpdates(): void;
    unlinkContactNode /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    destroyContact(a: any): any;
    contactHasInvalidFixture(a: any): boolean;
    scrubInvalidContacts(): void;
    validateContactsBeforeStep(): void;
    scrubBodyContacts(a: any): void;
    destroyBody(a: any): void;
    queryActorDamage /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    raycastBullet /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): false | {
        body: any;
        p: any;
        c: any;
        normal: any;
        frac: any;
    };
    raycastBulletHits /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    raycast(a: any, b: any, c: any, d?: boolean): false | {
        p: any;
        c: any;
        normal: any;
        id: any;
    };
    applyLocalRayImpulse /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): boolean;
    explosion /** @param {any} a @param {any} [b] */(a: any, b?: any): any[];
    resetSimulation(): void;
    onDestroyJoint(a: any): void;
    connectBodies(a: any): void;
    disconnectBodies(a: any): void;
    static setObjectiveGravityScale /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    static limitFlagVelocity(a: any, b?: number): void;
    add(a: any): void;
    registerKinematicAnimation /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    setActorsFrozen(a: any): void;
    update(a: any): void;
    updateFacing /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    hasPlayerCeilingTerrainContact(a: any): boolean;
    hasPlayerFeetTerrainContact(a: any, b?: boolean): boolean;
    getPlayerTerrainContactPoints /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    hasPlayerMovementContact(a: any): boolean;
    updateLocalContinuousForce(a: any): void;
    remove /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    submergeParticle /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    surfaceParticle /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onBoundParticleQueryResult(a: any): boolean;
    updateParticles(a: any): void;
    launchArrowDeathPart /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    prepareArrowDeathPin /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    emitArrowPinFlight /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    updateArrowDeathPin(a: any): void;
    pinArrowCorpse /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): boolean;
    onExplosionQueryResult(a: any): boolean;
    simulate(a: any): void;
    applyMovementForce /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    applyForce /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): void;
    clearForces(): void;
    submerge /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    surface /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    beginContact(a: any): void;
    preSolve(a: any): void;
    updatePlayerLinearDamping(a: any): void;
    preparePlayerTerrainContacts(): void;
    finishLocalRagdollFollow(a: any): void;
    filterTerrainSeamContact(a: any): any;
    endContact(a: any): void;
    _buildContactFeedback /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): any;
    _clearState(): void;
}
declare namespace PhysicsWorker {
    var PlayerDampingStartSpeed: number;
    var PlayerDampingSpeedScale: number;
    var _vec2Pool: any[];
    var _vec2PoolIdx: number;
    var MaxExplosionImpulse: number;
    var MaxExplosionVelocity: number;
    var MaxRagdollDeathVelocity: number;
    var MaxNetworkVelocity: number;
    var MaxRagdollAngularVelocity: number;
    var MaxNetworkAngularVelocity: number;
    var DeathMomentumFallbackDistance: number;
    var RAY_EPSILON: number;
    var RAY_EPSILON_SQUARED: number;
    var KinematicAnimationSyncDistance: number;
    var KinematicAnimationSyncAngle: number;
    var KinematicAnimationStopSpeed: number;
    var ExplosionQueryIgnore: number;
    var ExplosionRayCallbackInst: ExplosionRayCallback;
    var RaycastCallbackInst: RaycastCallback;
    var RaycastBulletCallbackInst: RaycastBulletCallback;
    var RaycastBulletCollectCallbackInst: RaycastBulletCollectCallback;
    var ActiveQueryParticle: any;
    var TimeDelta: number;
    var PACKED_UPDATE_STRIDE: number;
    var PACKED_UPDATE_TRANSFORM: number;
    var PACKED_UPDATE_CONTACTS: number;
    var Contact: {
        PRE: number;
        CON: number;
        PST: number;
    };
}
declare class ExplosionRayCallback {
    rayMaskBits: number;
    fix: any;
    frac: number;
    pt: any;
    body: any;
    constructor(a: any, b?: any);
    Set /** @param {any} a @param {any} [b] */(a: any, b?: any): this;
    ReportFixture /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): -1 | 0;
}
declare class RaycastCallback {
    rayMaskBits: number;
    fix: any;
    frac: number;
    pt: any;
    origin: any;
    passThroughLocal: boolean;
    localHits: Map<any, any>;
    localHitPool: any[];
    normal: any;
    constructor(a: any, b?: any);
    Set(a: any, b: any, c?: boolean): this;
    ReportFixture /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): -1 | null;
}
declare namespace RaycastCallback {
    var Passable: number;
}
declare class RaycastBulletCallback {
    rayMaskBits: number;
    fix: any;
    frac: number;
    pt: any;
    origin: any;
    normal: any;
    constructor(a: any, b?: any);
    Set /** @param {any} a @param {any} [b] */(a: any, b?: any): this;
    ReportFixture /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): -1 | null;
}
declare namespace RaycastBulletCallback {
    var Passable: number;
}
declare class RaycastBulletCollectCallback {
    origin: any;
    hits: any[];
    hitPool: any[];
    rayMaskBits: number;
    constructor(a: any);
    Set(a: any): this;
    ReportFixture /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): -1 | 1;
    GetHits(): any[];
}
declare var playerevent: {}, PlayerEvent: {
    WIN_DM: string;
    WIN_CTF: string;
    LOSE_DM: string;
    LOSE_CTF: string;
    WIN_TDM: string;
    LOSE_TDM: string;
    WIN_DB: string;
    LOSE_DB: string;
    WIN_BR: string;
    LOSE_BR: string;
    KILL: string;
    DEATH: string;
    SCORE: string;
    DOUBLE: string;
    TRIPLE: string;
    QUAD: string;
    PENTA: string;
    MEGA: string;
    MONSTER: string;
    GOD: string;
    SPREE: string;
    SELF: string;
    TEAM: string;
    HEAD: string;
    FIRST: string;
    GOLD: string;
    WIN_DB_MATCH: string;
};
declare var predictioncontroller: {};
declare class PredictionController {
    manager: any;
    enabled: boolean;
    smallCorrection: any;
    snapCorrection: any;
    smoothCorrectionLimit: number;
    projectedSnapAvoidanceLimit: number;
    baseWalkForce: any;
    walkForce: any;
    walkMaxSpeed: any;
    groundRollSpeedMultiplier: any;
    moveStartBoost: any;
    moveStartBoostEndSpeed: any;
    walkTurnMultiplier: any;
    crouchTurnForceMultiplier: any;
    jumpAcceleration: any;
    proneJetHorizontalForce: any;
    proneJetVerticalForce: any;
    proneJetAirVerticalMultiplier: any;
    proneJetLiftForce: any;
    proneFlightFriction: any;
    proneFlightFrictionFadeMs: any;
    proneStationaryFriction: any;
    proneSlideFriction: any;
    proneSlideBrakeFriction: any;
    proneSlideSpeed: any;
    jetUpForce: any;
    jetDownForce: any;
    pendingProjectionWindowMs: any;
    pendingProjectionTimeScale: any;
    maxPendingProjection: any;
    maxInputHistory: any;
    serverTickMs: any;
    groundPredictionStableTicks: any;
    inputHistory: any[];
    motionStates: any[];
    walkHistory: Float64Array<ArrayBuffer>;
    walkHistoryCursor: number;
    walkHistoryCount: number;
    walkStepBody: any;
    receivedInputAck: boolean;
    jetStoppedPlayer: any;
    jumpDelay: number;
    jumpAnimation: number;
    groundContactTicks: number;
    groundContactTickAccumulatorMs: number;
    previousHorizontalForce: number;
    allowNextJump: number;
    proneFlightLowFriction: boolean;
    proneFlightFrictionFadeElapsedMs: number;
    stats: {
        predictedInputs: number;
        pendingInputs: number;
        ignoredSmallCorrections: number;
        smoothedCorrections: number;
        snappedCorrections: number;
        maxCorrectionDistance: number;
        maxRawCorrectionDistance: number;
        staleCorrectionDrops: number;
        projectedCorrections: number;
        avoidedSnapCorrections: number;
        cappedProjectedCorrections: number;
        skippedProjectionIncreasedCorrection: number;
        maxPendingProjectionDistance: number;
    };
    pendingJump: boolean | undefined;
    lastJumpHeld: boolean | undefined;
    walkStepX: any;
    walkStepY: any;
    walkStepVelocity: any;
    walkStepVelocityY: any;
    constructor(a: any, b?: {});
    reset(): void;
    clearCorrection(): void;
    recordInput /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    clearCommandHistory(): void;
    recordCommandState(a: any): void;
    reconcileCommandState(a: any): any;
    trimInputHistory(a: any): void;
    applyLocalPrediction(a: any): void;
    recordLocalMotion /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    replayWalkingMotion(a: any): any;
    getPredictedForce(a: any, b: any, c?: {}): {
        x: number;
        y: number;
    };
    getPredictedCrouchForce /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    getPredictedGroundRollForce /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    isPredictedStandingJetActive /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    acceptAuthoritativeJetState /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    applyPredictedProneForce /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): void;
    isPredictedProneJetActive /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    getPredictedProneSlideBrakeAmount /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
    getPredictedProneSlideFriction /** @param {any} a @param {any} [b] */(a: any, b?: any): number | null;
    getPredictedProneFlightFriction /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    acceptAuthoritativeUpdate(a: any): any;
    snapshotInput(a: any): {
        A: boolean;
        D: boolean;
        W: boolean;
        S: boolean;
        X: boolean;
        RM: boolean;
    } | null;
    isMovementInputActive(a: any): boolean;
    getVelocityX(a: any): number;
    updatePredictedGrounded /** @param {any} a @param {any} [b] */(a: any, b?: any): boolean;
    resetGroundContactPrediction(): void;
    hasGroundContact(a: any): boolean;
    getPredictedHorizontalForce /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): any;
    getPredictedJumpHorizontalForce /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): any;
    getLatencyCompensatedTarget /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    capProjectedCorrectionForSmoothing /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): {
        x: any;
        y: any;
    } | null;
    getPendingInputAgeMs(): number;
    getCurrentPhysicsPosition(a: any): {
        x: number;
        y: number;
    } | null;
    getPhysicsRatio(): number;
    isGrounded(a: any): boolean;
    withoutPosition(a: any): any;
    withPosition /** @param {any} a @param {any} [b] */(a: any, b?: any): any;
    static finiteOrZero(a: any): number;
    static clampDeltaMs(a: any): number;
    static distance /** @param {any} a @param {any} [b] */(a: any, b?: any): number;
}
declare var statechange: {}, StateChange: {
    ADD: number;
    Item: {
        RANGE: number;
        EQUIP: number;
        CARRY_PRIMARY: number;
        CARRY_SECONDARY: number;
        CARRY_BELT: number;
        REMOVE_PRIMARY: number;
        REMOVE_SECONDARY: number;
        REMOVE_BELT: number;
        DROP: number;
        USE: number;
        RELOAD: number;
        CARRY_OBJECTIVE: number;
        DROP_OBJECTIVE: number;
        SCORE_OBJECTIVE: number;
        RETURN_OBJECTIVE: number;
        INIT_USE: number;
        GORE: number;
        STOP_USE: number;
    };
    Agent: {
        RANGE: number;
        HEALTH: number;
        ALIVE: number;
        ACTIVE: number;
        JET_START: number;
        JET_STOP: number;
        COMBO: number;
        TELEPORT: number;
        INSERTION: number;
        IDLE: number;
        GOLD: number;
        JET: number;
        MESSAGE: number;
        HOSTILE: number;
        BURN: number;
        BALL_CHARGE: number;
    };
    Model: {
        RANGE: number;
        SPAWN: number;
        KILL: number;
        SCORE: number;
        END: number;
        CLEAR: number;
        LEADER: number;
        TEAM: number;
        EVENT: number;
        ENVIRONMENT: number;
        ENERGY_RADIUS: number;
        END_DB_MATCH: number;
        MESSAGE: number;
        INITIAL: number;
        RESULT: number;
        WAVE: number;
    };
};
declare var team: {};
declare function Team(a: any): void;
declare namespace Team {
    var Names: string[];
    var Colors: string[];
    var HexColors: number[];
    var LabelColors: number[];
    var getHudTextColor: (a: any, b?: number) => number;
}
declare var slider: {};
declare class Slider extends PIXI.Container {
    id: any;
    labelText: any;
    range: any;
    min: any;
    value: number;
    size: number;
    round: boolean;
    pointerId: any;
    onMouseMoveListener: ((a: any) => void) | null;
    background: PIXI.Graphics;
    sliderButton: PIXI.Graphics;
    label: PIXI.Text;
    valueLabel: PIXI.Text;
    volumeMinLabel: PIXI.Text;
    volumeMaxLabel: PIXI.Text;
    mouseDownListener: any;
    constructor(a: any, b: any, c: any, d: any, e: any, f?: number);
    onMouseDown(a: any): void;
    onMouseMove(a: any): void;
    getOutputValue(): any;
    onMouseUp(a: any): void;
    updateSliderButtonPosition(): void;
    setValue(a: any): void;
    globalToValue(a: any): any;
}
declare namespace Slider {
    var CHANGE: string;
}
declare var controlstab: {};
declare class ControlsTab extends PIXI.Container {
    settings: any;
    forceRefresh: boolean;
    marginLeft: number;
    marginTop: number;
    columnWidth: number;
    rowSpacing: number;
    groupId: string;
    controls: any[];
    controlsByBinding: any;
    qwertyButton: ProfileActionButton;
    azertyButton: ProfileActionButton;
    touchLeftHanded: Checkbox | undefined;
    touchAimFire: Checkbox | undefined;
    constructor(a: any, b?: number, c?: number);
    createTouchSettings(a: any): void;
    createPresetButton /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): ProfileActionButton;
    createColumn(a: any): void;
    onBindingChanged(a: any): void;
    applyBindings(a: any): void;
    applyDefaultBindings(a: any): void;
    getSettings(): any;
    enableInput(): void;
    disableInput(): void;
}
declare var dropdown: {};
declare class Dropdown extends PIXI.Container {
    id: any;
    itemTextStyle: any;
    selectWidth: any;
    dropWidth: any;
    selectHeight: number;
    cleanItemList: boolean;
    arrowDivider: boolean;
    drawSelectorFrame: boolean;
    uppercaseSelected: boolean;
    selectorFill: number;
    selectorFillAlpha: number;
    title: PIXI.Text;
    hover: boolean;
    displaySelectedIcon: boolean;
    itemContainer: PIXI.Container<PIXI.ContainerChild>;
    selectedIcon: PIXI.Sprite | undefined;
    itemWidth: number;
    background: PIXI.Graphics;
    itemContainerBackground: PIXI.Graphics;
    items: any;
    selected: PIXI.Text;
    selectedId: any;
    interactive: boolean;
    expanded: boolean;
    dropdownIcon: PIXI.Sprite;
    icon: PIXI.Sprite | undefined;
    constructor(a: any, b: any, c: any, d: any, e?: boolean, f?: any);
    setSelectorLayout(a: any): void;
    formatSelectedTitle(a: any): any;
    disable(): void;
    enable(): void;
    clear(): void;
    addItem /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] @param {any} [f] */(a: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
    onMouseDown(): void;
    setTint(a: any): void;
    onMouseOver(): void;
    onMouseOut(): void;
    getValue(): any;
    setValue(a: any): void;
    expand(): void;
    collapse(): void;
    onItemSelected(a: any): void;
    getItem(a: any, b: any, c: any, d: any, e?: number, f?: number): PIXI.Container<PIXI.ContainerChild>;
    draw(): void;
}
declare namespace Dropdown {
    var CloneItemTextStyle: (a?: any) => any;
    var Instances: any[];
    var CollapseInstances: () => void;
    var RemoveInstances: () => void;
    var AddInstance: (a: any) => void;
    var RemoveInstance: (a: any) => void;
}
declare var editorspanel: {};
declare class EditorsPanel extends PIXI.Container {
    interactive: boolean;
    background: PIXI.Graphics;
    closeButton: ImgButton;
    links: PIXI.Container<PIXI.ContainerChild>[];
    constructor();
    createLabel /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    createLink /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] @param {any} [e] */(a: any, b?: any, c?: any, d?: any, e?: any): PIXI.Container<PIXI.ContainerChild>;
}
declare namespace EditorsPanel {
    var CLOSE: string;
}
declare var feedbackpanel: {};
declare class FeedbackPanel extends PIXI.Container {
    panelWidth: number;
    panelHeight: number;
    interactive: boolean;
    background: PIXI.Graphics;
    closeButton: ImgButton;
    titleText: any;
    headerLine: PIXI.Graphics;
    titleLabel: any;
    titleField: InputField;
    descriptionLabel: any;
    descriptionField: InputField;
    statusText: any;
    submitButton: ProfileActionButton;
    constructor();
    createLabel /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): any;
    show(): void;
    hide(): void;
    onSubmitButtonReleased(): Promise<void>;
    displayStatus /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
}
declare namespace FeedbackPanel {
    var CLOSE: string;
}
declare var graphicstab: {};
declare class GraphicsTab extends PIXI.Container {
    settings: any;
    forceRefresh: boolean;
    startPerformanceMode: any;
    startWebglFallback: any;
    resolutionChanged: boolean;
    aaUpdated: boolean;
    startResolution: any;
    marginLeft: number;
    marginTop: number;
    columnWidth: number;
    graphicsTitle: PIXI.Text;
    performanceMode: Checkbox;
    webglFallback: Checkbox;
    reticleLine: Checkbox;
    enableShockwaves: Checkbox;
    chatLinesSlider: Slider;
    chatOpacitySlider: Slider;
    enableAA: Checkbox;
    chatTextSizeSlider: Slider;
    resolutionSlider: Slider;
    resolutionTitle: PIXI.Text;
    hideOverlayButtons: Checkbox;
    constructor(a: any, b?: number);
    getSettings(): any;
    stylizeSlider(a: any): void;
    checkIfRefreshNeeded(): boolean;
}
declare var keyinput: {};
declare class KeyInput extends PIXI.Container {
    id: any;
    labelText: any;
    key: any;
    group: any;
    rowWidth: number;
    fixed: boolean;
    maxKeys: number;
    capturedKeys: any[];
    comboCaptureTimeout: number | null;
    enabled: boolean;
    hasFocus: boolean;
    interactive: boolean;
    cursor: string;
    hitArea: PIXI.Rectangle;
    background: PIXI.Graphics;
    keyBackground: PIXI.Graphics;
    label: PIXI.Text;
    keyField: PIXI.Text;
    _mousedownListener: (a: any) => void;
    keyDownListener: (a: any) => void;
    constructor(a: any, b: any, c: any, d: any, e?: number);
    draw(a?: boolean): void;
    positionKeyText(): void;
    onMouseDown(a: any): void;
    setFocus(a: any): void;
    onKeyDown(a: any): void;
    setFixed(): void;
    setMaximumKeys(a: any): void;
    clearComboCaptureTimeout(): void;
    enable(): void;
    disable(): void;
    setKey(a: any, b: any, c?: boolean): void;
}
declare namespace KeyInput {
    var CHANGE: string;
    var RegisterInput: (a: any) => void;
    var DisableAll: () => void;
    var RegisteredGroups: {};
}
declare var settingspanel: {};
declare class SettingsPanel extends PIXI.Container {
    settings: any;
    interactive: boolean;
    outerWidth: any;
    outerHeight: any;
    panelWidth: any;
    panelHeight: any;
    panelX: number;
    contentPanelX: number;
    contentPanelY: number;
    contentPanelWidth: number;
    contentPanelHeight: number;
    activeTab: any;
    maxScroll: number;
    scrollOffset: number;
    viewportHeight: number;
    viewportWidth: number;
    tabWidth: number;
    background: PIXI.Graphics;
    contentPanel: PIXI.Graphics;
    tabViewport: PIXI.Container<PIXI.ContainerChild>;
    tabContent: PIXI.Container<PIXI.ContainerChild>;
    tabMask: PIXI.Graphics;
    scrollTrack: PIXI.Graphics;
    scrollThumb: PIXI.Graphics;
    scrollPointerId: number;
    scrollDragOffset: number;
    scrollDragging: boolean;
    headerLine: PIXI.Graphics;
    titleText: PIXI.Text;
    closeButton: ImgButton;
    controlsTab: ControlsTab;
    graphicsTab: GraphicsTab;
    soundTab: SoundTab;
    controlsTabButton: PIXI.Container<PIXI.ContainerChild>;
    graphicsTabButton: PIXI.Container<PIXI.ContainerChild>;
    soundTabButton: PIXI.Container<PIXI.ContainerChild>;
    applyButton: ProfileActionButton;
    privacyButton: ProfileActionButton;
    thumbHeight: number | undefined;
    constructor(a: any, b?: any);
    createTabButton /** @param {any} a @param {any} [b] @param {any} [c] @param {any} [d] */(a: any, b?: any, c?: any, d?: any): PIXI.Container<PIXI.ContainerChild>;
    drawTabButton /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    drawTabs(): void;
    show(): void;
    hide(): void;
    setScrollOffset(a: any): void;
    dragScroll(a: any): void;
    displayTab(a: any, b?: boolean): void;
    onApplyButtonReleased(): void;
    applySettings(a: any): void;
    onCloseButtonReleased(): void;
}
declare namespace SettingsPanel {
    var Tabs: {
        GRAPHICS: string;
        CONTROLS: string;
        SOUND: string;
    };
    var CLOSE: string;
}
declare var soundtab: {};
declare class SoundTab extends PIXI.Container {
    settings: any;
    forceRefresh: boolean;
    marginLeft: number;
    marginTop: number;
    soundTitle: PIXI.Text;
    soundCheck: Checkbox;
    ambientCheck: Checkbox;
    volumeSlider: Slider;
    constructor(a: any, b?: number, c?: number);
    stylizeSlider(a: any): void;
    getSettings(): any;
}
declare var menu: {};
declare class Menu extends PIXI.Container {
    container: PIXI.Container<PIXI.ContainerChild>;
    topContainer: PIXI.Container<PIXI.ContainerChild>;
    active: boolean;
    updating: boolean;
    guestMode: boolean;
    visualizerLoadVersion: number;
    newsFlashText: string;
    backgroundImage: PIXI.Graphics;
    backgroundGraphics: PIXI.Graphics;
    actionPanel: PIXI.Graphics;
    regionPanel: PIXI.Graphics;
    modePanel: PIXI.Graphics;
    selectorLines: PIXI.Graphics;
    settingsBackgroundGraphics: PIXI.Graphics;
    settingsPanel: SettingsPanel;
    settingsViewport: MenuPanelViewport;
    backgroundNewsGraphics: PIXI.Graphics;
    darkNewsBackground: PIXI.Graphics;
    newsArtwork: PIXI.Container<PIXI.ContainerChild>;
    infoText: PIXI.Text;
    infoTextDisc: PIXI.Text;
    submenuPanelWidth: number;
    submenuPanelHeight: number;
    submenuPanel: PIXI.Graphics;
    settingsIcon: SubmenuButton;
    newsIcon: SubmenuButton;
    wikiIcon: SubmenuButton;
    utilsIcon: SubmenuButton;
    editorIcon: SubmenuButton;
    editorsPanel: EditorsPanel;
    editorsViewport: MenuPanelViewport;
    feedbackIcon: SubmenuButton;
    feedbackPanel: FeedbackPanel;
    feedbackViewport: MenuPanelViewport;
    versionText: PIXI.Text;
    newsDescription: PIXI.Text;
    topAuthPanelWidth: number;
    topAuthPanelHeight: number;
    topAuthButtonWidth: number;
    topAuthButtonHeight: number;
    topAuthPanel: PIXI.Graphics;
    topLoginButton: PIXI.Graphics;
    topRegisterButton: PIXI.Graphics;
    supportButton: PIXI.Container<PIXI.ContainerChild>;
    supportButtonLogo: PIXI.Sprite;
    supportButtonLogoRight: PIXI.Sprite;
    supportButtonLabel: PIXI.Text;
    topDiscordIcon: PIXI.Container<PIXI.ContainerChild>;
    topSocialIcons: PIXI.Container<PIXI.ContainerChild>[];
    gameStatsTitle: PIXI.Text;
    gameStatsLight: PIXI.Graphics;
    gameStatsDivider: PIXI.Graphics;
    menuLogo: PIXI.Sprite;
    gameStats: PIXI.Text;
    gameStatsPlayers: PIXI.Text;
    newsFlash: PIXI.Text;
    registerHintTitle: PIXI.Text;
    visualizerPanel: PIXI.Graphics;
    visualizer: Visualizer;
    rewardButton: LoginActionButton;
    treasureIcon: PIXI.Sprite;
    serverListButton: MenuActionButton;
    serverCreateButton: MenuActionButton;
    regionIcon: PIXI.Sprite;
    modeIcon: PIXI.Sprite;
    regionData: PIXI.Text;
    modeData: PIXI.Text;
    interactive: boolean;
    nameTitle: PIXI.Text;
    levelIcon: PIXI.Sprite;
    skillIcon: PIXI.Sprite;
    nameField: InputField;
    skillText: PIXI.Text;
    clanText: PIXI.Text;
    joinButton: MenuActionButton;
    pvpButton: MenuActionButton;
    registerGuestText: PIXI.Text;
    modeContainer: PIXI.Container<PIXI.ContainerChild>;
    serverContainer: PIXI.Container<PIXI.ContainerChild>;
    serverList: Dropdown;
    modeList: Dropdown;
    particleContainer: ParticleContainer;
    adblockArea: PIXI.Sprite | undefined;
    closeAdButton: ImgButton | undefined;
    adblockBackground: PIXI.Graphics | undefined;
    adblockText: PIXI.Text | undefined;
    mode: any;
    constructor();
    createTopAuthButton /** @param {any} a @param {any} [b] @param {any} [c] */(a: any, b?: any, c?: any): PIXI.Graphics;
    createSubmenuButton /** @param {any} a @param {any} [b] */(a: any, b?: any): PIXI.Container<PIXI.ContainerChild>;
    createTopSocialIcon(a: any): PIXI.Container<PIXI.ContainerChild>;
    showSettings(): void;
    showFeedback(): void;
    hideFeedback(): void;
    showEditors(): void;
    hideEditors(): void;
    hideSettings(): void;
    setServerHeadline(a: any): void;
    setServerStatus(a: any): void;
    setServerData(a: any): void;
    setLobbyDataText(): void;
    selectServer(a: any): void;
    selectMostPopulatedMode(): void;
    onServerListButtonReleased(): void;
    onServerCreateButtonReleased(): void;
    setPlayerData(a: any): void;
    loadVisualizerWeapons /** @param {any} a @param {any} [b] */(a: any, b?: any): Promise<void>;
    init(): void;
    showRewardButton(): void;
    hideRewardButton(): void;
    checkRewards(a?: boolean): Promise<void>;
    setMode /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    onJoinButtonReleased(): void;
    onMainMenuButtonReleased(): void;
    onModeButtonReleased(a: any): void;
    onServerButtonReleased(a: any): void;
    resize(): void;
    hideItems(): void;
    showItems(): void;
    onNamefieldFocus(a: any): void;
    step(a: any): void;
}
declare namespace Menu {
    var JOIN_GAME_MODE: string;
    var JOIN_SERVER: string;
    var MODE_MAIN: string;
    var GUEST_NAME_CHANGE: string;
    var PROFILE_ACCESS: string;
    var RENAME_ACCESS: string;
    var CUSTOMIZATION_ACCESS: string;
    var SERVER_LISTING_ACCESS: string;
    var SERVER_CREATION_ACCESS: string;
    var REWARDS_ACCESS: string;
    var NEWS_ACCESS: string;
    var SETTINGS_ACCESS: string;
    var PVP_ACCESS: string;
    var LOGIN_ACCESS: string;
    var REGISTER_ACCESS: string;
    var LAYOUT_CHANGE: string;
}
declare class MenuActionButton extends ProfileActionButton {
    clickInterval: any;
    clickTimeout: any;
    primary: boolean;
    cursor: string;
    menuIcon: PIXI.Graphics;
    constructor(a: any, b: any, c: any, d: any, e?: boolean, f?: any);
    layoutContent(): void;
    draw(): void;
    onMouseDown(a: any): void;
    onMouseUp(a: any): void;
    withinClickInterval(): boolean;
}
declare function User(): void;
declare var commandconsole: {};
declare class CommandConsole extends PIXI.Container {
    settings: any;
    maxLines: any;
    targetAlpha: any;
    interactiveChildren: boolean;
    messages: any[];
    lines: any[];
    interpreters: any[];
    enterReleaseRequired: boolean;
    onConsoleKeyUpListener: (a: any) => void;
    active: boolean;
    textScale: number;
    chatTextSize: number;
    consoleTextScale: number;
    lineDistance: number;
    consoleInput: InputField;
    channelLabel: PIXI.Text;
    fadeInterval: number | null;
    fadeTimeout: number | null;
    fadeDelay: number | undefined;
    teamChat: boolean | undefined;
    commandMode: boolean | undefined;
    constructor();
    log /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    cancelFade(a?: boolean): void;
    update(): void;
    getInputY(): any;
    updateInactivePosition(): void;
    setTextSize(a: any): void;
    startFade(): void;
    startInterval(): void;
    step(): void;
    isActive(): boolean;
    setChatChannel(a: any): void;
    setCommandMode(a: any): void;
    onConsoleKeyInput(a: any): Promise<void> | undefined;
    setActive(a: any, b?: boolean, c?: boolean): boolean;
    onConsoleInputFocus(a: any): void;
    onConsoleInput(a: any): void;
    addInputString(a: any): void;
    reset(): void;
    linkInterpreter(a: any): void;
    unlinkInterpreter(a: any): void;
    static normalizeTextSize(a: any): number;
}
declare namespace CommandConsole {
    var DEFAULT_TEXT_SCALE: number;
    var MIN_TEXT_SIZE: number;
    var MAX_TEXT_SIZE: number;
    var FontMessage: {
        fontFamily: string;
        fontSize: number;
    };
    var INPUT: string;
    var SHOW: string;
    var HIDE: string;
}
declare function DevLog(): void;
declare var orderedcontainer: {};
declare function OrderedContainer(): void;
declare namespace OrderedContainer {
    var _72: {};
    export { _72 as Storage };
    export var prototype: {
        add: (a: any, b?: any) => any;
        remove: (a: any) => void;
        removeIndex: (a: any) => void;
        getLast: () => any;
        getIndex: (a: any) => any;
        getIdByIndex: (a: any) => any;
        moveToIndex: (a: any, b?: any) => void;
        getIndexById: (a: any) => number;
        swapByIndex: (a: any, b?: any) => void;
        getById: (a: any) => any;
        setById: (a: any, b?: any) => void;
        getSize: () => any;
        iterate: (a: any) => void;
        clear: () => void;
        sortMethod: (a: any) => void;
        sortMethodMultiple: () => void;
        _compareMethodMultiple: (a: any, b?: any) => -1 | 0 | 1;
        sortMember: (a: any) => void;
        sortMemberMultiple: () => void;
        _compareMemberMultiple: (a: any, b?: any) => -1 | 0 | 1;
    };
}
declare class Interpreter extends PIXI.EventEmitter {
    _target: any;
    _commands: {};
    _default: any;
    _validate: (b: any) => boolean;
    _process: (b: any) => void;
    _dispatchDefault: (b: any) => void;
    constructor(a: any);
    parse(a: any): void;
    addCommand /** @param {any} a @param {any} [b] */(a: any, b?: any): void;
    removeCommand(a: any): void;
    setDefaultCommand(a: any): void;
}
declare namespace Interpreter {
    var INVALID_COMMAND: string;
}
declare var stats: {};
declare class Stats extends PIXI.Sprite {
    textures: any[];
    constructor();
    setPing(a: any): void;
}
declare let app: App;
declare var customevent: {};
/** @param {any} a @param {any} [b] */ declare function CustomEvent(a: any, b?: any): void;
declare var timer: {};
/** @param {any} a @param {any} [b] */ declare function Timer(a: any, b?: any): void;
declare var uidpool: {};
/** @param {any} a @param {any} [b] */ declare function UIDpool(a: any, b?: any): void;
declare namespace UIDpool {
    var CHARSET: string[];
}
export { AK47, AK47Ammo, AK47AmmoSprite, AK47Bullet, AK47BulletSprite, AK47Sprite, APIClient, AcceptClanInvitationItem, AcceptInvitationItem, AccountTab, ActionTable, ActorHitboxes, Agent, AgentMap, AmmoBar, Analytics, AnalyticsConsent, AnalyticsPanels, AnalyticsTracker, AnchorBase, Animation, Animations, App, ArmLeftLowerSprite, ArmLeftUpperSprite, ArmRightLowerSprite, ArmRightUpperSprite, Arrow, ArrowSprite, AssetLoader, AudioEffects, AudioFiles, AudioManager, AudioPackCompressedURL, AudioPackURL, Background, BallCharge, BallSprite, BandanaRope, Barrett, BarrettAmmo, BarrettAmmoSprite, BarrettBullet, BarrettBulletSprite, BarrettSprite, Base62Charset, Base62Decode, Base62Encode, BaseSprite, BlackCape, BlueCape, BodyFactory, Boomerang, BoomerangGun, BoomerangGunSprite, BoomerangSprite, Bouncyball, Bow, BowSprite, Box2DDebugDraw, BulletTrailRope, BurnFlameRope, Button, CTFLeaderboardRow, CTFRowLabel, Camera, CamoCape, CamoCapeDesert, CamoCapeJungle, CamoCapeSnow, CamoCapeWinter, Canvas, CanvasEvent, CapeBlack, Carbine, CarbineBullet, CarbineBulletSprite, CarbineSprite, Chainsaw, ChainsawAmmo, ChainsawAmmoSprite, ChainsawSprite, ChatAnimation, ChatClient, ChatEndAnimation, ChatWindow, Checkbox, CircleSprite, Clamp, ClanBrowserMenu, ClanBrowserScrollbar, ClanChatMenu, ClanMemberItem, ClanMemberListScrollbar, ClanMemberMenuItem, ClanMenu, ClanPhotoPanel, ClanService, ClanTab, ClanTableRow, Client, ClientPerformanceTracker, ClusterGrenadeIcon, ClusterNade, ClusterNadeBox, ClusterNadeBoxSprite, ClusterNadeFragment, ClusterNadeFragmentSprite, ClusterNadeSprite, ColorPicker, CommandConsole, ContentActionButton, ContentMenu, ControlsTab, CrouchLeftAnimation, CrouchMoveLeftAnimation, CrouchMoveRightAnimation, CrouchRightAnimation, CustomEvent, CustomFace, Customization, CustomizationMenu, CustomizationSuccessFX, DBRowLabel, DMLeaderboardRow, DMRowLabel, DamageVignette, DamageVolumeIndex, Deagle, DeagleSprite, DesertEagle, DesertEagleAmmo, DesertEagleAmmoSprite, DesertEagleBullet, DesertEagleBulletSprite, DesertEagleSprite, DevLog, DropDisplayTableRow, DropSelectionListTableRow, Dropdown, EditorSession, EditorsPanel, Energy, EnergyChaos, EnergyDragon, EnergyJetFeet, EnergyJetFeet2, EnergyJetFeet3, EnergyJetFeetRope, EnergyVacuum, EntityCategory, EscapeMenu, EscapeMenuButton, EventDispatcher, ExplosionRayCallback, Extra, FaceBlueFireEyes, FaceFireEyes, FaceGreenFireEyes, FaceOrangeFireEyes, FacePinkFireEyes, FaceRedFireEyes, FaceYellowFireEyes, FallLeftAnimation, FallRightAnimation, FastDebugLineRenderer, FastRope, Feature, FeedbackPanel, FistSprite, Flag, FlagSprite, FlameThrower, FlameThrowerAmmo, FlameThrowerAmmoSprite, FlameThrowerLiquid, FlameThrowerLiquidSprite, FlameThrowerSprite, FontStyle, FraglineAnalyticsConfig, FriendDropdown, FriendDropdownActionRow, FriendItem, GAME_MODES, Game, GameAttribute, GameCommands, GameMenu, GameObject, GameShape, GameStatus, GameoverDisplay, GetFlippedRagdollTextureId, GetHeadTextureId, GetRagdollTexture, GetRagdollTextureId, GetZombieHeadTextureId, Ghost, GhostBotDebris1, GhostBotDebris2, GhostBotDebris3, GhostBotDebrisSprite1, GhostBotDebrisSprite2, GhostBotDebrisSprite3, GhostLaser, GhostLaserSprite, GhostSprite, GlobalRankingScrollbar, GlobalRankingTableRow, Gold, GoldCount, GoldSprite, GoldWindow, GoreRibbon, Gradient, GraphicsTab, GreenCape, GuestMenu, GuestMenuButton, GuestProfileMenu, HandGrenadeIcon, HeadSprite, HealthBar, HealthBox, HealthBoxSprite, HighscoreMenu, HoldGunLeftAnimation, HoldGunRightAnimation, Hud, HudEvent, IOItem, IOScrollbar, ImgButton, IncompleteAccountTab, InitializeAudioEffects, InputDevice, InputField, InputState, Interpreter, Intersect, Intersect3, ItemList, ItemMap, ItemOverview, ItemPicker, JetBar, JetFeetFlameRope, JetLeftAnimation, JetRightAnimation, JumpLeft2Animation, JumpLeftAnimation, JumpRight2Animation, JumpRightAnimation, KeyInput, Label, LabelContainer, LaserGun, LaserGunAmmo, LaserGunAmmoSprite, LaserGunBullet, LaserGunBulletSprite, LaserGunSprite, LauncherNade, LauncherNadeSprite, Layer, Leaderboard, Leaderboard1V1, LeaderboardCTF, LeaderboardDB, LeaderboardDBRow, LeaderboardDM, LeaderboardRow, LeaderboardTDM, LeaderboardTDMRow, LeaderboardTR, LegLeftLowerSprite, LegLeftUpperSprite, LegRightLowerSprite, LegRightUpperSprite, LevelBar, LightningBeamShader, LineSprite, LinkGun, LinkGunAmmo, LinkGunAmmoSprite, LinkGunSprite, LoadingMenu, LoginActionButton, LoginMenu, LogoutMenu, M60, M60Bullet, M60BulletSprite, M60Sprite, MAC10, MAC10Ammo, MAC10AmmoSprite, MAC10Bullet, MAC10BulletSprite, MAC10Sprite, MAP_TYPES, MAX_SIMULTANEOUS_SOUND_INSTANCES, MAX_SIMULTANEOUS_WEAPON_SOUND_INSTANCES, MagazineWeaponSprite, MagicLeftAnimation, MagicRightAnimation, Manager, MapContentPanel, MapDisplayTableRow, MapPublishPanel, MapSelectionListTableRow, MaskBits, MatchItem, MemberBrowserMenu, MemberBrowserScrollbar, MemberDropdown, MemberDropdownActionRow, MemberItem, MemberListScrollbar, MemberMenu, MemberMenuButton, MemberTableRow, Menu, MenuActionButton, MenuBackground, MenuPanelViewport, Minigun, MinigunAmmo, MinigunAmmoSprite, MinigunBullet, MinigunBulletSprite, MinigunSprite, Minimap, MinimizedWeaponMenu, ModelEvent, Nade, NadeBox, NadeBoxSprite, NadeLauncher, NadeLauncherAmmo, NadeLauncherAmmoSprite, NadeLauncherSprite, NadeSprite, NetworkBinaryReader, NetworkUpdateBuffer, NewsItem, NewsMenu, NewsScrollbar, OneVOneLeaderboardRow, OneVOneRowLabel, OrangeCape, OrderedContainer, OverviewTab, PC, PE, PP, PVPClient, PVPMenu, PVPResultMenu, Parallax, ParticleContainer, ParticleEffects, ParticleEmitter, PartnerMenu, PhysicsMessage, PhysicsWorker, PinkCape, Player, PlayerDropdown, PlayerDropdownActionRow, PlayerEvent, PredictionController, Prefab, PrefabClasses, PrefabList, Prefabs, ProfileActionButton, ProfileMenu, ProjectileTrailRope, ProneEndAnimation, ProneLeftAnimation, ProneMoveLeftAnimation, ProneMoveRightAnimation, ProneRightAnimation, ProneScopeGunLeftAnimation, ProneScopeGunRightAnimation, Protocol, PulseGun, PulseGunAmmo, PulseGunAmmoSprite, PulseGunBullet, PulseGunBulletSprite, PulseGunSprite, PunchLeftAnimation, PunchRightAnimation, PurchasePanel, QuadMesh, RLRocket, RLRocketSprite, RPG, RPGAmmo, RPGAmmoSprite, RPGRocket, RPGRocketSprite, RPGSprite, RandomBrightColor, RankingMenu, RawHowl, RayParticle, RaycastBulletCallback, RaycastBulletCollectCallback, RaycastCallback, RectangleSprite, RedCape, RedCapeCenturion, RegisterMenu, Registry, ReloadLeftAnimation, ReloadRightAnimation, RenameMenu, RenderStats, RendererFactory, RewardRow, RewardsMenu, Rifle, RifleAmmo, RifleAmmoSprite, RifleBullet, RifleBulletSprite, RifleSprite, RocketLauncher, RocketLauncherSprite, RollLeftAnimation, RollRightAnimation, RowLabel, SMGAmmo, SMGAmmoSprite, SaluteLeftAnimation, SaluteRightAnimation, ScopeGunLeftAnimation, ScopeGunRightAnimation, SelectionListScrollbar, ServerCreationMenu, ServerCustomizationMenu, ServerDetailMenu, ServerListMenu, ServerListScrollbar, ServerListTableRow, ServerService, ServiceBase, SettingsPanel, SettingsTab, ShapeCircle, ShapeCompound, ShapeOptions, ShapePlayer, ShapeRectangle, ShapeZombie, ShockRifle, ShockRifleAmmo, ShockRifleAmmoSprite, ShockRifleBullet, ShockRifleBulletSprite, ShockRifleSprite, ShockRifleTailRope, ShockwaveFilter, ShootBowLeftAnimation, ShootBowRightAnimation, ShortAngle, Shotgun, ShotgunAmmo, ShotgunAmmoSprite, ShotgunPellet, ShotgunPelletSprite, ShotgunSprite, ShurikenBlade, ShurikenBladeSprite, ShurikenBox, ShurikenBoxSprite, ShurikenIcon, SkillRankingScrollbar, SkillRankingTableRow, Slider, SnowballBox, SnowballBoxSprite, SnowballIcon, SnowballProjectile, SnowballProjectileSprite, SocialMemberDropdown, SocialMemberDropdownActionRow, SocialMenu, SocialMenuScrollbar, SocialMenuTabButton, SocialMenuToggleButton, SoundTab, SplitCape, SplitCape2, SplitCape3, SplitCape4, SplitCape5, SpriteFactory, SpriteMap, StandAnimation, StateChange, Stats, SubmachineGun, SubmachineGunBullet, SubmachineGunBulletSprite, SubmachineGunSprite, SwitchLeftAnimation, SwitchRightAnimation, TDMRowLabel, TRLeaderboardRow, TRRowLabel, Team, TerrainSeams, TextCache, ThrowLeftAnimation, ThrowNadeLeftAnimation, ThrowNadeRightAnimation, ThrowRightAnimation, Thumbnail, Timer, TinyShrapnel, TinyShrapnelSprite, ToPrecision, TorsoLowerSprite, TorsoUpperSprite, TossLeftAnimation, TossRightAnimation, TouchControls, TouchSpectator, TouchStick, TrailSprite, Trainer, UIDpool, UITheme, UPResetMenu, User, UserInput, UserMenu, UserService, Uzi, UziBullet, UziBulletSprite, UziSprite, Visualizer, WalkLeftAnimation, WalkRightAnimation, WaveLeftAnimation, WaveRightAnimation, WeaponBashLeftAnimation, WeaponBashRightAnimation, WeaponButton, WeaponContainer, WeaponContentPanel, WeaponDisplayTableRow, WeaponItem, WeaponListItem, WeaponListScrollbar, WeaponMenu, WeaponMenuPreview, WeaponSelectionListTableRow, WeaponStatsScrollbar, WeaponStatsTableRow, WeaponTypeStatsScrollbar, WeaponTypeStatsTableRow, X75, X75Ammo, X75AmmoSprite, X75Nade, X75NadeSprite, X75Sprite, XPProgression, YellowCape, Zombie, ZombieArmLeftLowerSprite, ZombieArmLeftUpperSprite, ZombieArmRightLowerSprite, ZombieArmRightUpperSprite, ZombieHeadSprite, ZombieLegLeftLowerSprite, ZombieLegLeftUpperSprite, ZombieLegRightLowerSprite, ZombieLegRightUpperSprite, ZombieTorsoLowerSprite, ZombieTorsoUpperSprite, accounttab, actorhitboxes, agent, analytics, analyticsconfig, analyticsconsent, analyticstracker, animations, apiConfig, apiDomain, apiclient, app, arrowsInv, assetloader, audiofiles, audiofx, audiopack, azertyMap, b2AABB, b2Body, b2BodyDef, b2BodyType, b2CircleShape, b2ContactListener, b2DestructionListener, b2Filter, b2FilterData, b2Fixture, b2FixtureDef, b2Joint, b2PolygonShape, b2RevoluteJointDef, b2Vec2, b2WeldJointDef, b2World, b2WorldManifold, background, ballcharge, bandanarope, basesprite, blackcape, bluecape, bodyfactory, box2ddebugdraw, bullettrailrope, burnflamerope, button, camocape, camocape_desert, camocape_jungle, camocape_snow, camocape_winter, canvas, canvasevent, cape_black, characterMap, characterMapCTRL, characterMapShift, chatclient, checkbox, clanbrowsermenu, clanchatmenu, clanmenu, clanphotopanel, clanservice, clantab, client, clientperformancetracker, clustergrenadeicon, colorpicker, commandconsole, contentmenu, controlstab, createCappedHowl, createWeaponHowl, ctf_leaderboard, customevent, customface, customizationmenu, customizationsuccessfx, damagevignette, damagevolumeindex, db_leaderboard, dm_leaderboard, dp, dropdown, editorsession, editorspanel, energy, energychaos, energydragon, energyjetfeet, energyjetfeet2, energyjetfeet3, energyjetfeetrope, energyvacuum, entitycategory, escapemenu, eventdispatcher, extra, facebluefireeyes, facefireeyes, facegreenfireeyes, faceorangefireeyes, facepinkfireeyes, faceredfireeyes, faceyellowfireeyes, fastAtan2, fastSplice, fastdebuglinerenderer, fastrope, feature, feedbackpanel, flag, fontstyle, game, gameattribute, gamemenu, gamemodes, gameobject, gameshape, getDir, getDomain, ghost, goldcount, goreribbon, gradient, graphicstab, greencape, guestmenu, guestprofilemenu, handgrenadeicon, highscoremenu, imgbutton, incompleteaccounttab, inputdevice, inputfield, inputstate, itemlist, itemoverview, itempicker, keyinput, label, labelcontainer, layer, leaderboard, levelbar, lightningbeamshader, loadingmenu, loginmenu, logoutmenu, mag, magazineweaponsprite, manager, mapType, mapcontentpanel, mappublishpanel, memberbrowsermenu, membermenu, menu, menubackground, menupanelviewport, modelevent, newsmenu, norm, numberWithPeriods, onevone_leaderboard, orangecape, orderedcontainer, overviewtab, parallax, parsedUrl, particlecontainer, particleeffects, partnermenu, perp, physicsconstants, physicsmessage, physicsworker, pinkcape, player, playerdropdown, playerevent, polyArea, polyAreaTri, polyBounds, polyCenter, polyCenterArr, polyRotateCopy, predictioncontroller, prefablist, profileactionbutton, profilemenu, project, projectiletrailrope, protocol, purchasepanel, pvpclient, pvpmenu, pvpresultmenu, quadmesh, rankingmenu, rayparticle, rdScale, rdZombieScale, redcape, redcapecenturion, reducedLowerArmTextureScale, registermenu, registry, renamemenu, rendererfactory, renderstats, rewardsmenu, servercreationmenu, servercustomizationmenu, serverdetailmenu, serverlistmenu, serverservice, servicebase, setCookie, settingspanel, settingstab, shapecircle, shapecompound, shapeoptions, shapeplayer, shaperectangle, shapezombie, shockrifletailrope, shockwavefilter, shurikenicon, slider, snowballicon, socialmenu, soundtab, splitcape, splitcape2, splitcape3, splitcape4, splitcape5, statechange, stats, tdm_leaderboard, team, terrainseams, textcache, thumbnail, timer, touchcontrols, tr_leaderboard, trainer, uidpool, uintToArr, upresetmenu, userinput, usermenu, userservice, util, visualizer, weaponcontainer, weaponcontentpanel, whitelabel, xorshift128, xorshift128_seed, xpprogression, yellowcape, zombie };
export * as PIXI from "pixi.js";
//# sourceMappingURL=lib.d.ts.map