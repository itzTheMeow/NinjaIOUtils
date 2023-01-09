declare module "lib" {
    export function EventDispatcher(): this;
    export class EventDispatcher {
        _listeners: {};
        addListener: (a: any, b: any) => void;
        removeListener: (a: any, b: any) => void;
        dispatchEvent: (a: any) => void;
        hasListener: (a: any, b: any) => boolean;
    }
    export class APIClient {
        static getNews(): Promise<any>;
        static getServers(): Promise<any>;
        static getGames(): Promise<any>;
        static getMaps(): Promise<any>;
        static getItemDrops(): Promise<any>;
        static getRanking(): Promise<any>;
        static getRankingType(a: any, b: any): Promise<any>;
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
        static getLastResult(a: any, b: any): Promise<any>;
        static getMatchHistory(a: any): Promise<any>;
        static postClaimShopReward(a: any): Promise<any>;
        static postClaimRewards(a: any): Promise<any>;
        static postLogin(a: any, b: any): Promise<any>;
        static postAutoRegistration(): Promise<any>;
        static postRegistration(a: any, b: any, c: any): Promise<any>;
        static postSettings(a: any, b: any): Promise<any>;
        static postRecovery(a: any, b: any, c: any): Promise<any>;
        static postCustomization(a: any, b: any): Promise<any>;
        static postAutogenRename(a: any, b: any, c: any): Promise<any>;
        static renewPassword(a: any, b: any, c: any): Promise<any>;
        static deactivateAccount(a: any, b: any): Promise<any>;
        static getCustomization(a: any): Promise<any>;
        static postInviteFriend(a: any, b: any): Promise<any>;
        static postAcceptFriend(a: any, b: any): Promise<any>;
        static postDeclineFriend(a: any, b: any): Promise<any>;
        static postUnfriend(a: any, b: any): Promise<any>;
        static postFriendMessage(a: any, b: any, c: any): Promise<any>;
        static postPurchase(a: any, b: any, c: any): Promise<any>;
        static postUsername(a: any, b: any, c: any): Promise<any>;
        static postFriendGold(a: any, b: any, c: any): Promise<any>;
        static postCreateGame(a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any): Promise<any>;
        static postSocial(a: any, b: any, c: any): Promise<any>;
        static getClanByClanId(a: any): Promise<any>;
        static getClanByAccountId(a: any): Promise<any>;
        static getClanList(): Promise<any>;
        static getClanSearch(a: any): Promise<any>;
        static getClanMembers(a: any): Promise<any>;
        static getClanInvitations(a: any): Promise<any>;
        static postCreateClan(a: any, b: any): Promise<any>;
        static postLeaveMember(a: any): Promise<any>;
        static postInviteMember(a: any, b: any): Promise<any>;
        static postAcceptInviteMember(a: any, b: any): Promise<any>;
        static postDeclineInviteMember(a: any, b: any): Promise<any>;
        static postRemoveMember(a: any, b: any): Promise<any>;
        static postPromoteMember(a: any, b: any): Promise<any>;
        static postDemoteMember(a: any, b: any): Promise<any>;
        static postBanner(a: any, b: any): Promise<any>;
    }
    export namespace APIClient {
        const ChallengeURL: string;
    }
    export class Client extends EventDispatcher {
        pinger: number;
        socket: WebSocket;
        time: number;
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
        connectionTimeout: number;
        allowNextAttempt: boolean;
        setServer(a: any): void;
        connect(): void;
        disconnect(a?: boolean): void;
        onOpen(a: any): void;
        onError(a: any): void;
        onMessage(a: any): void;
        onClose(a: any): void;
        emit(a: any): void;
        isConnected(): boolean;
        onEchoResponse(): void;
    }
    export namespace Client {
        function compress(a: any): Uint8Array;
        function decompress(a: any): {
            data: {
                t: string;
                d: any;
            };
            type: any;
        };
        function unpackGameData(a: any): {
            t: string;
            d: any;
        };
        const SendBuffer: Uint8Array;
        const CONNECT: string;
        const DISCONNECT: string;
        const AUTH_FAILED: string;
        const SERVER_FULL: string;
        const CONNECTION_ERROR: string;
        const CODE_AUTH_FAILED: number;
        const CODE_MAX_CLIENTS: number;
        const CODE_DUPLICATE_CLIENT: number;
        namespace DefaultServer {
            const id: string;
            const uid: string;
            const name: string;
            const domain: string;
            const title: string;
            const address: string;
            const port: string;
            const secure: string;
            const region: string;
            const status: string;
            const players: string;
            const games: string;
            namespace modes {
                const deathmatch: string;
                const teamDeathmatch: string;
                const captureTheFlag: string;
                const dodgeball: string;
            }
        }
    }
    export class Feature extends PIXI.Graphics {
        constructor();
        hides: any[];
        container: PIXI.Container<PIXI.DisplayObject>;
        show(): void;
        hide(): void;
        resize(a: any, b: any): void;
        update(): void;
    }
    export class GameMenu extends Feature {
        discButtonBackground: PIXI.Graphics;
        discTitle: PIXI.Text;
        helpButtonBackground: PIXI.Graphics;
        helpTitle: PIXI.Text;
        movementJoystick: any;
        targetingJoystick: any;
        minmax: PIXI.Sprite;
    }
    export class GuestMenu extends Feature {
        background: PIXI.Graphics;
        discordButton: PIXI.Sprite;
        joinDiscordText: PIXI.Text;
        zapperButton: PIXI.Sprite;
        getZapperText: PIXI.BitmapText;
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
        settingsButton: GuestMenuButton;
        setMode(a: any): void;
        mode: any;
    }
    export namespace GuestMenu {
        const MODE_NONE: string;
        const MODE_LOGIN: string;
        const MODE_REGISTER: string;
        const MODE_RANKING: string;
        const MODE_MEMBER: string;
        const MODE_CLAN: string;
        const MODE_SHOP: string;
        const MODE_PARTNER: string;
        const MODE_GUEST_PROFILE: string;
        const MODE_SETTINGS: string;
    }
    export class GuestMenuButton extends PIXI.Graphics {
        constructor(a: string, b: any, c: any, d?: any, e?: boolean);
        active: boolean;
        rectWidth: number;
        rectHeight: number;
        hitArea: PIXI.Rectangle;
        backgroundEnabled: PIXI.Graphics;
        backgroundDisabled: PIXI.Graphics;
        backgroundHover: PIXI.Graphics;
        activeBackground: PIXI.Graphics;
        icon: PIXI.Sprite;
        label: PIXI.Text;
        setActive(a?: boolean): void;
    }
    export namespace GuestMenuButton {
        const BUTTON_PRESSED: string;
    }
    export class MemberMenu extends Feature {
        background: PIXI.Graphics;
        discordButton: PIXI.Sprite;
        joinDiscordText: PIXI.Text;
        zapperButton: PIXI.Sprite;
        getZapperText: PIXI.BitmapText;
        logoutButton: PIXI.Graphics;
        logoutIcon: PIXI.Sprite;
        logoutText: PIXI.Text;
        playButton: MemberMenuButton;
        profileButton: MemberMenuButton;
        shopButton: MemberMenuButton;
        rankingButton: MemberMenuButton;
        memberButton: MemberMenuButton;
        clanButton: MemberMenuButton;
        settingsButton: MemberMenuButton;
        setMode(a: any): void;
        mode: any;
        onLogout(): void;
    }
    export namespace MemberMenu {
        const MODE_NONE_1: string;
        export { MODE_NONE_1 as MODE_NONE };
        const MODE_RANKING_1: string;
        export { MODE_RANKING_1 as MODE_RANKING };
        const MODE_SHOP_1: string;
        export { MODE_SHOP_1 as MODE_SHOP };
        const MODE_MEMBER_1: string;
        export { MODE_MEMBER_1 as MODE_MEMBER };
        const MODE_CLAN_1: string;
        export { MODE_CLAN_1 as MODE_CLAN };
        export const MODE_PROFILE: string;
        const MODE_SETTINGS_1: string;
        export { MODE_SETTINGS_1 as MODE_SETTINGS };
    }
    export class MemberMenuButton extends PIXI.Graphics {
        constructor(a: string, b: any, c: any, d?: any, e?: boolean);
        active: boolean;
        rectWidth: number;
        rectHeight: number;
        hitArea: PIXI.Rectangle;
        backgroundEnabled: PIXI.Graphics;
        backgroundDisabled: PIXI.Graphics;
        backgroundHover: PIXI.Graphics;
        activeBackground: PIXI.Graphics;
        icon: PIXI.Sprite;
        label: PIXI.Text;
        setActive(a?: boolean): void;
    }
    export namespace MemberMenuButton {
        const BUTTON_PRESSED_1: string;
        export { BUTTON_PRESSED_1 as BUTTON_PRESSED };
    }
    export class MemberBrowserMenu extends Feature {
        searchTimeout: number;
        background: PIXI.Graphics;
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
        nameFieldTableContainer: PIXI.Container<PIXI.DisplayObject>;
        nameFieldScrollbar: MemberBrowserScrollbar;
        onSearch(): Promise<void>;
        search(): Promise<void>;
    }
    export class MemberTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any, e: any, f: any);
        index: any;
        background: PIXI.Graphics;
        icon: PIXI.Sprite;
        nameText: PIXI.BitmapText;
        skillRankText: PIXI.BitmapText;
        rankText: PIXI.BitmapText;
    }
    export class MemberBrowserScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace MemberBrowserScrollbar {
        const SCROLL: string;
    }
    export class ClanBrowserMenu extends Feature {
        searchTimeout: number;
        lastRefresh: number;
        clans: any[];
        clanPropSort: string;
        clanPropDir: {
            name: number;
            skill: number;
            members: number;
            experience: number;
        };
        background: PIXI.Graphics;
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
        nameFieldTableContainer: PIXI.Container<PIXI.DisplayObject>;
        nameFieldScrollbar: ClanBrowserScrollbar;
        onSearch(a?: boolean): void;
        search(): Promise<void>;
        sortClans(a: any, b?: number): void;
    }
    export class ClanTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any, e: any, f: any, g: any);
        index: any;
        background: PIXI.Graphics;
        icon: PIXI.Sprite;
        nameText: PIXI.Text;
        membersText: PIXI.Text;
        skillText: PIXI.Text;
        experienceText: PIXI.Text;
        setIndex(a?: number): void;
    }
    export class ClanBrowserScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace ClanBrowserScrollbar {
        const SCROLL_1: string;
        export { SCROLL_1 as SCROLL };
    }
    export class Button extends PIXI.Graphics {
        constructor(a: any, b?: any, c?: any, d?: any);
        id: any;
        value: string;
        enabled: boolean;
        pressed: boolean;
        clickInterval: any;
        hoverImage: PIXI.Sprite;
        image: PIXI.Sprite;
        clickTimeout: any;
        edge: PIXI.Graphics;
        setText(a: any, b: any, c: any): void;
        text: PIXI.Text;
        redraw(): void;
        draw(): void;
        withinClickInterval(): boolean;
        onMouseDown(a: any): void;
        onMouseUp(a: any): void;
        onMouseOver(): void;
        onMouseOut(): void;
        disable(): void;
        enable(): void;
        setValue(a: any): void;
        setSize(a: any, b: any): void;
        setTint(a: any): void;
    }
    export namespace Button {
        const BUTTON_PRESSED_2: string;
        export { BUTTON_PRESSED_2 as BUTTON_PRESSED };
        export const BUTTON_RELEASED: string;
    }
    export class LoginMenu extends Feature {
        storeCredentialFlag: boolean;
        background: PIXI.Graphics;
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
        submitButton: Button;
        loadingContainer: PIXI.Container<PIXI.DisplayObject>;
        loadingBackground: PIXI.Graphics;
        loadingText: PIXI.Text;
        completedContainer: PIXI.Container<PIXI.DisplayObject>;
        completedBackground: PIXI.Graphics;
        completedText: PIXI.Text;
        completedButton: Button;
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
    export class Checkbox extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any);
        id: any;
        labelText: any;
        checked: any;
        tex_unchecked: any;
        tex_checked: any;
        icon: PIXI.Sprite;
        label: PIXI.Text;
        pointerDownListener: any;
        mouseDownListener: any;
        onMouseDown(a: any): void;
        setChecked(a: any, b?: boolean): void;
        setEnabled(a: any): void;
        setTint(a: any): void;
    }
    export namespace Checkbox {
        const CHANGE: string;
    }
    export class RegisterMenu extends Feature {
        challengeTexture: PIXI.Texture<PIXI.Resource>;
        hasVerifiedEmail: boolean;
        emailDisabled: boolean;
        background: PIXI.Graphics;
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
        submitButton: Button;
        loadingContainer: PIXI.Container<PIXI.DisplayObject>;
        loadingBackground: PIXI.Graphics;
        loadingText: PIXI.BitmapText;
        emailVerificationContainer: PIXI.Container<PIXI.DisplayObject>;
        emailVerificationBackground: PIXI.Graphics;
        emailVerificationText: PIXI.BitmapText;
        emailVerificationWarning: PIXI.BitmapText;
        emailVerificationField: InputField;
        verifyBox: Checkbox;
        verificationBoxWarning: PIXI.BitmapText;
        emailVerificationButton: Button;
        emailVerificationCancelButton: Button;
        completedContainer: PIXI.Container<PIXI.DisplayObject>;
        completedBackground: PIXI.Graphics;
        completedText: PIXI.BitmapText;
        completedButton: Button;
        validateForm(): {
            valid: boolean;
            error: string;
        };
        onSubmitButtonReleased(): void;
        reset(): void;
        resetRobotChallenge(): void;
        onCancelButtonReleased(): void;
        onCompletedButtonReleased(): void;
        onCancelEmailVerificationButtonReleased(): void;
        onEmailVerificationButtonReleased(): void;
        submitForm(a: any, b: any, c: any): void;
        displayLoadingMessage(): void;
        displayEmailVerification(): void;
        displayCompletedMessage(a?: boolean): void;
        displayErrorMessage(a: any): void;
    }
    export namespace RegisterMenu {
        const EmailWhitelist: string[];
    }
    export class UPResetMenu extends Feature {
        challengeTexture: PIXI.Texture<PIXI.Resource>;
        preferredCheck: string;
        background: PIXI.Graphics;
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
        robotChallengeContainer: PIXI.Container<PIXI.DisplayObject>;
        robotChallenge: PIXI.Sprite;
        submitButton: Button;
        loadingContainer: PIXI.Container<PIXI.DisplayObject>;
        loadingBackground: PIXI.Graphics;
        loadingText: PIXI.Text;
        completedContainer: PIXI.Container<PIXI.DisplayObject>;
        completedBackground: PIXI.Graphics;
        completedText: PIXI.Text;
        completedButton: Button;
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
    export namespace UPResetMenu {
        const CHECK_NAME: string;
        const CHECK_PASSWORD: string;
    }
    export class Visualizer extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c?: boolean, d?: boolean, e?: boolean, f?: string);
        renderBackground: boolean;
        displayAura: boolean;
        customExtra: boolean;
        customFace: boolean;
        customAura: boolean;
        w: any;
        h: any;
        s: number;
        team: string;
        numParticles: number;
        customization: {};
        customAuraFx: {};
        customFaceFx: {};
        customExtraFx: {};
        offsetY: number;
        offsetX: number;
        time: number;
        head: PIXI.Sprite;
        face: PIXI.Sprite;
        torsoUpper: PIXI.Sprite;
        torsoLower: PIXI.Sprite;
        armLeftUpper: PIXI.Sprite;
        armLeftLower: PIXI.Sprite;
        armRightUpper: PIXI.Sprite;
        armRightLower: PIXI.Sprite;
        legLeftUpper: PIXI.Sprite;
        legLeftLower: PIXI.Sprite;
        legRightUpper: PIXI.Sprite;
        legRightLower: PIXI.Sprite;
        bandana: PIXI.Sprite;
        extra: PIXI.Container<PIXI.DisplayObject>;
        ninja: PIXI.Container<PIXI.DisplayObject>;
        marker: PIXI.Graphics;
        aura: PIXI.Sprite;
        bodyparts: PIXI.Sprite[];
        topParticles: PIXI.ParticleContainer;
        generateCharacter(): void;
        initialize(): void;
        maskGraphic: PIXI.Graphics;
        gradientTexture: boolean | PIXI.Texture<PIXI.Resource>;
        background: PIXI.Graphics;
        backgroundParticles: PIXI.Container<PIXI.DisplayObject>;
        foregroundParticles: PIXI.ParticleContainer;
        drawBackground(a?: boolean): void;
        applyCustomization(a: any): void;
        generateGradientTexture(): boolean | PIXI.Texture<PIXI.Resource>;
        hide(): void;
        show(): void;
        update(): void;
        initializeCustomEnergyFx(): void;
        initializeCustomFaceFx(): void;
        initializeCustomExtraFx(): void;
        updateCustom(): void;
        updateJetFeet(): void;
        updateJetFeet2(): void;
        updateVacuum(): void;
        updateDragon(): void;
        updateFireEyes(): void;
        updateCape(): void;
    }
    export class AccountTab extends Feature {
        constructor(a: any, b: any);
        w: any;
        h: any;
        ox: number;
        oy: number;
        sections: number;
        currentSection: number;
        accountSettingsTitle: PIXI.Text;
        tableContainerMask: PIXI.Graphics;
        scrollLeftButton: Button;
        scrollRightButton: Button;
        passwordBackground: PIXI.Graphics;
        passwordResetTitle: PIXI.BitmapText;
        oldPasswordTitle: PIXI.BitmapText;
        newPasswordTitle: PIXI.BitmapText;
        repeatPasswordTitle: PIXI.BitmapText;
        savePasswordButton: Button;
        oldPasswordField: InputField;
        newPasswordField: InputField;
        repeatPasswordField: InputField;
        errorMessage: PIXI.BitmapText;
        successMessage: PIXI.BitmapText;
        changeNameBackground: PIXI.Graphics;
        changeNameTitle: PIXI.BitmapText;
        nameField: InputField;
        verificationPasswordField: InputField;
        usernameInfo: PIXI.BitmapText;
        saveUsernameButton: Button;
        goldIcon: PIXI.Sprite;
        goldInfo: PIXI.BitmapText;
        changeUsernameErrorMessage: PIXI.BitmapText;
        changeUsernameSuccessMessage: PIXI.BitmapText;
        deactivationBackground: PIXI.Graphics;
        deactivationTitle: PIXI.BitmapText;
        deactivationInfo: PIXI.BitmapText;
        passwordTitle: PIXI.BitmapText;
        passwordField: InputField;
        deactivateButton: Button;
        deactivationErrorMessage: PIXI.BitmapText;
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
    export namespace AccountTab {
        const LOGOUT: string;
    }
    export class IncompleteAccountTab extends Feature {
        constructor(a: any, b: any);
        w: any;
        h: any;
        ox: number;
        oy: number;
        accountSettingsTitle: PIXI.Text;
        autogenDescription: PIXI.Text;
        renameButton: Button;
    }
    export class LevelBar extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        ox: number;
        w: number;
        background: PIXI.Graphics;
        bar: PIXI.Graphics;
        previousText: PIXI.BitmapText;
        previousXpText: PIXI.BitmapText;
        currentText: PIXI.BitmapText;
        nextText: PIXI.BitmapText;
        nextXpText: PIXI.BitmapText;
        load(a: any, b: any, c: any): void;
    }
    export namespace LevelBar {
        function XPToLevel(a: any): number;
    }
    export class UserMenu extends Feature {
        id: any;
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
        w: number;
        h: number;
        closeButton: ImgButton;
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
        generalContainer: PIXI.Container<PIXI.DisplayObject>;
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
        weaponContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponTitle: PIXI.Text;
        weaponNameLabel: PIXI.Text;
        weaponKillsLabel: PIXI.Text;
        listContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponListContainer: PIXI.Container<PIXI.DisplayObject>;
        scrollbar: WeaponListScrollbar;
        historyContainer: PIXI.Container<PIXI.DisplayObject>;
        historyTitle: PIXI.Text;
        resultLabel: PIXI.Text;
        opponentNameLabel: PIXI.Text;
        pointsLabel: PIXI.Text;
        historyListContainer: PIXI.Container<PIXI.DisplayObject>;
        matchHistoryListContainer: PIXI.Container<PIXI.DisplayObject>;
        historyScrollbar: WeaponListScrollbar;
        contactContainer: PIXI.Container<PIXI.DisplayObject>;
        friendInvitationText: PIXI.Text;
        friendInvitationButton: Button;
        load(a: any, b?: string, c?: any): Promise<void>;
        maskWeaponList(a: any): void;
        maskHistoryList(a: any): void;
        displayGeneralContainer(): void;
        displayWeaponContainer(): void;
        displayHistoryContainer(): Promise<void>;
        displayContactContainer(): void;
        onCloseButtonReleased(): void;
    }
    export namespace UserMenu {
        const GENERAL: number;
        const WEAPONS: number;
        const CONTACT: number;
        const HISTORY: number;
    }
    export class WeaponItem extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any);
        id: string;
        name: any;
        kills: any;
        background: PIXI.Graphics;
        icon: string;
        nameLabel: PIXI.Text;
        killsLabel: PIXI.Text;
    }
    export class WeaponListScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        bh: number;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace WeaponListScrollbar {
        const SCROLL_2: string;
        export { SCROLL_2 as SCROLL };
        export const ListHeight: number;
        export const ItemHeight: number;
    }
    export class MatchItem extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: number, e: any);
        id: any;
        name: any;
        result: any;
        points: number;
        date: any;
        background: PIXI.Graphics;
        resultLabel: PIXI.Text;
        nameLabel: PIXI.Text;
        pointsLabel: PIXI.Text;
        dateLabel: PIXI.Text;
    }
    export namespace MatchItem {
        const HEIGHT: number;
        namespace ResultTintMap {
            const win: number;
            const init: number;
            const tbd: number;
            const error: number;
            const error2: number;
            const cancelled: number;
            const noshow: number;
            const noshow_self: number;
            const draw: number;
            const loss: number;
        }
        namespace ResultLabelMap {
            const win_1: string;
            export { win_1 as win };
            const init_1: string;
            export { init_1 as init };
            const tbd_1: string;
            export { tbd_1 as tbd };
            const error_1: string;
            export { error_1 as error };
            const error2_1: string;
            export { error2_1 as error2 };
            const cancelled_1: string;
            export { cancelled_1 as cancelled };
            const noshow_1: string;
            export { noshow_1 as noshow };
            const noshow_self_1: string;
            export { noshow_self_1 as noshow_self };
            const draw_1: string;
            export { draw_1 as draw };
            const loss_1: string;
            export { loss_1 as loss };
        }
    }
    export class OverviewTab extends Feature {
        constructor(a: any, b: any);
        w: any;
        h: any;
        ox: number;
        oy: number;
        display: number;
        weapons: any[];
        weaponData: any[];
        background: PIXI.Graphics;
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
        generalContainer: PIXI.Container<PIXI.DisplayObject>;
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
        weaponContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponTitle: PIXI.Text;
        weaponNameLabel: PIXI.Text;
        weaponKillsLabel: PIXI.Text;
        youtubeLogo: PIXI.Sprite;
        youtubeTitle: PIXI.Text;
        youtubeField: InputField;
        pasteYoutubeButton: Button;
        saveYoutubeButton: Button;
        twitchLogo: PIXI.Sprite;
        twitchTitle: PIXI.Text;
        twitchField: InputField;
        pasteTwitchButton: Button;
        saveTwitchButton: Button;
        listContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponListContainer: PIXI.Container<PIXI.DisplayObject>;
        scrollbar: WeaponListScrollbar;
        submitSocial(a: any, b: any): Promise<any>;
        load(): Promise<void>;
        maskWeaponList(a: any): void;
        displayGeneralContainer(): void;
        displayWeaponContainer(): void;
    }
    export namespace OverviewTab {
        const GENERAL_1: number;
        export { GENERAL_1 as GENERAL };
        const WEAPONS_1: number;
        export { WEAPONS_1 as WEAPONS };
    }
    export class ClanTab extends Feature {
        constructor(a: any, b: any);
        w: any;
        h: any;
        ox: number;
        oy: number;
        members: any[];
        clanSettingsTitle: PIXI.Text;
        creationContainer: PIXI.Container<PIXI.DisplayObject>;
        clanCreationBackground: PIXI.Graphics;
        clanCreationMenuTitle: PIXI.Text;
        clanCreationTitle: PIXI.Text;
        clanNameField: InputField;
        createClanButton: Button;
        goldIcon: PIXI.Sprite;
        goldInfo: PIXI.Text;
        createClanErrorMessage: PIXI.Text;
        displayContainer: PIXI.Container<PIXI.DisplayObject>;
        clanOverviewBackground: PIXI.Graphics;
        uploadText: PIXI.Text;
        nameText: PIXI.Text;
        memberText: PIXI.Text;
        roleLabelText: PIXI.Text;
        hintText: PIXI.Text;
        roleText: PIXI.Text;
        createdText: PIXI.Text;
        membersTitle: PIXI.Text;
        membersHint: PIXI.Text;
        listContainer: PIXI.Container<PIXI.DisplayObject>;
        memberListContainer: PIXI.Container<PIXI.DisplayObject>;
        scrollbar: MemberListScrollbar;
        memberDropdown: MemberDropdown;
        leaveClanButton: Button;
        leaveClanContainer: PIXI.Container<PIXI.DisplayObject>;
        leaveClanBackground: PIXI.Graphics;
        leaveClanVerificationText: PIXI.Text;
        leaveClanAcceptButton: Button;
        leaveClanDeclineButton: Button;
        leaveClanErrorText: PIXI.BitmapText;
        load(): Promise<void>;
        displayCreate(): void;
        displayOverview(a: any): Promise<void>;
        showDropdown(a: any, b: any, c: any): void;
        validateClanCreationForm(): {
            valid: boolean;
            error: string;
        };
        onCreateClanButtonReleased(): Promise<void>;
        onLeaveClanButtonReleased(): Promise<void>;
        onLeaveClanAcceptButtonReleased(): Promise<void>;
        onleaveClanCancelButtonReleased(): Promise<void>;
        maskMemberList(a: any): void;
        promoteMember(a: any): Promise<void>;
        demoteMember(a: any): Promise<void>;
        removeMember(a: any): Promise<void>;
    }
    export namespace ClanTab {
        const SHOW_DROPDOWN: string;
        const ACCESS_PROFILE: string;
    }
    export class MemberListScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        bh: number;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace MemberListScrollbar {
        const SCROLL_3: string;
        export { SCROLL_3 as SCROLL };
        const ListHeight_1: number;
        export { ListHeight_1 as ListHeight };
        const ItemHeight_1: number;
        export { ItemHeight_1 as ItemHeight };
    }
    export class MemberItem extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any);
        id: any;
        name: any;
        role: any;
        options: any;
        background: PIXI.Graphics;
        nameLabel: PIXI.Text;
        roleLabel: PIXI.Text;
    }
    export class MemberDropdown extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        background: PIXI.Graphics;
        itemContainer: PIXI.Graphics;
        display(a: any, b: any): void;
    }
    export namespace MemberDropdown {
        const ACTION_PROMOTE: string;
        const ACTION_DEMOTE: string;
        const ACTION_REMOVE: string;
    }
    export class MemberDropdownActionRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d?: boolean);
        text: any;
        tintValue: any;
        actionText: PIXI.Text;
        confirmation: boolean;
        confirming: boolean;
        hitArea: PIXI.Rectangle;
    }
    export namespace MemberDropdownActionRow {
        const CONFIRM: string;
        const SELECT: string;
    }
    export class SettingsTab extends Feature {
        constructor(a: any, b: any);
        settings: {
            allow_invite: boolean;
        };
        w: any;
        h: any;
        ox: number;
        oy: number;
        initialized: boolean;
        background: PIXI.Graphics;
        settingsTitle: PIXI.Text;
        allowInviteCheck: Checkbox;
        applyButton: Button;
        onApplyButtonReleased(): Promise<void>;
        load(): Promise<void>;
    }
    export class ProfileMenu extends Feature {
        tab: any;
        background: PIXI.Graphics;
        ox: number;
        oy: number;
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
        publicProfileButton: Button;
        openTab(a: any, b?: boolean): void;
        reset(): void;
    }
    export namespace ProfileMenu {
        const TAB_OVERVIEW: string;
        const TAB_CLAN: string;
        const TAB_ACCOUNT: string;
        const TAB_SETTINGS: string;
    }
    export class ItemOverview extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        items: any[];
        title: PIXI.Text;
        comingSoon: PIXI.Text;
        background: PIXI.Graphics;
        container: PIXI.Container<PIXI.DisplayObject>;
        containerMask: PIXI.Graphics;
        scrollbar: IOScrollbar;
        show(): void;
        hide(): void;
        setTitle(a: any): void;
        select(a: any): void;
        loadItems(a: any, b: string, c: any, d: any): void;
        onItemSelected(a: any): void;
    }
    export namespace ItemOverview {
        const SELECT_1: string;
        export { SELECT_1 as SELECT };
    }
    export class IOScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        scrolling: boolean;
        h: number;
        bh: number;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (a: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace IOScrollbar {
        const SCROLL_4: string;
        export { SCROLL_4 as SCROLL };
    }
    export class IOItem extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any);
        selected: boolean;
        data: any;
        itemBackground: PIXI.Graphics;
        timeout: boolean;
        onMouseOver(): void;
        onMouseOut(): void;
        select(): void;
        deselect(): void;
        drawBackground(a: any, b: any): void;
    }
    export namespace IOItem {
        const SELECT_2: string;
        export { SELECT_2 as SELECT };
    }
    export class ItemPicker extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any);
        title: any;
        type: any;
        data: any;
        itemTint: number;
        prefix: any;
        callback: any;
        selected: boolean;
        timeout: boolean;
        owned: boolean;
        hitArea: PIXI.Rectangle;
        background: PIXI.Graphics;
        icon: PIXI.Sprite;
        select(): void;
        deselect(): void;
        draw(): void;
        displayItem(a: any, b?: boolean): void;
        setTint(a: any): void;
    }
    export namespace ItemPicker {
        const SELECT_3: string;
        export { SELECT_3 as SELECT };
    }
    export class ColorPicker extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any);
        size: any;
        barColors: any[];
        sliceColors: any[];
        dragSlice: boolean;
        dragBar: boolean;
        barWidth: number;
        texSlice: PIXI.Texture<PIXI.Resource>;
        texBar: PIXI.Texture<PIXI.Resource>;
        barPointer: PIXI.Graphics;
        background: PIXI.Graphics;
        colorPointer: PIXI.Graphics;
        colorSlice: ImageData;
        colorBar: ImageData;
        canvas: HTMLCanvasElement;
        drawColorSlice(a: any): ImageData;
        drawColorBar(): ImageData;
        initContext(a: any, b: any): boolean;
        context: CanvasRenderingContext2D;
        onColorBarDown(a: any): void;
        onColorBarMove(a: any): void;
        updateColorSlice(a: any, b: any): void;
        onColorSliceDown(a: any): void;
        onColorSliceMove(a: any): void;
        setSelectedColor(a: any, b: any, c: any): void;
        onMouseUp(a: any): void;
    }
    export namespace ColorPicker {
        const COLOR_SELECTED: string;
        const COLORS: number[];
    }
    export class PurchasePanel extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        container: PIXI.Container<PIXI.DisplayObject>;
        w: number;
        h: number;
        activeItem: any;
        background: PIXI.Graphics;
        title: PIXI.Text;
        itemIcon: PIXI.Sprite;
        itemName: PIXI.Text;
        goldIcon: PIXI.Sprite;
        itemPrice: PIXI.Text;
        currentTitle: PIXI.Text;
        currentGold: PIXI.Text;
        remainingTitle: PIXI.Text;
        remainingGold: PIXI.Text;
        purchaseButton: Button;
        cancelButton: Button;
        successContainer: PIXI.Graphics;
        successTitle: PIXI.Text;
        successTitleDesc: PIXI.Text;
        successContainerItemIcon: PIXI.Sprite;
        display(a: any): Promise<void>;
        onCancelButtonReleased(): void;
        onPurchaseButtonReleased(): Promise<void>;
    }
    export namespace PurchasePanel {
        const CANCEL: string;
        const UPDATE: string;
    }
    export class WeaponContainer extends PIXI.Graphics {
        constructor();
        title: PIXI.Text;
    }
    export class CustomizationMenu extends Feature {
        initial: boolean;
        customizationPickers: ItemPicker[];
        display: string;
        rewardToken: any;
        selectedItem: boolean | ItemPicker;
        goldAnimation: boolean;
        ox: number;
        oy: number;
        gold: number;
        background: PIXI.Graphics;
        playerContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponContainer: WeaponContainer;
        savedText: PIXI.Text;
        customizationTitle: PIXI.Text;
        errorMessage: PIXI.Text;
        goldIcon: PIXI.Sprite;
        goldText: PIXI.Text;
        goldRewardText: PIXI.Text;
        playerCustomizationButton: PIXI.Graphics;
        playerCustomizationLabel: PIXI.Text;
        weaponCustomizationButton: PIXI.Graphics;
        weaponCustomizationLabel: PIXI.Text;
        submitButton: Button;
        purchaseButton: Button;
        closeButton: ImgButton;
        rewardButton: PIXI.Sprite;
        errorRewardMessage: PIXI.Text;
        countdownMessage: PIXI.Text;
        visualizer: Visualizer;
        purchasePanel: PurchasePanel;
        customization: any;
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
        particleContainer: ParticleContainer;
        show(): Promise<void>;
        activeCustomization: any;
        onSelectCustomization(a: any, b?: boolean): void;
        onCustomizationSelected(a: any): void;
        displayPurchasePopup(a: any): void;
        reset(): void;
        validateForm(): {
            valid: boolean;
            error: string;
        };
        onSubmitButtonReleased(): Promise<void>;
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
        rewardInterval: any;
        triggerRewardedBreak(): void;
        claimRewards(): Promise<void>;
        displayRewardDialog(a?: boolean): void;
        displayWarning(a?: string): void;
        displayErrorMessage(a: any): void;
    }
    export namespace CustomizationMenu {
        export const PLAYER: string;
        const WEAPONS_2: string;
        export { WEAPONS_2 as WEAPONS };
    }
    export class InputField extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: boolean, c?: number, d?: boolean);
        id: any;
        focus: boolean;
        marker: PIXI.Text;
        text: PIXI.Text | PIXI.BitmapText;
        passwordText: PIXI.BitmapText;
        previousText: string;
        background: PIXI.Graphics;
        markingColor: number;
        minimal: boolean;
        passwordMode: boolean;
        filterEnabled: boolean;
        filtered: string;
        inversed: boolean;
        mouseOver: boolean;
        noMouse: boolean;
        maxChars: number;
        boundGlobalPointerInputListener: any;
        boundGlobalInputListener: any;
        centerInput: boolean;
        forceUpperCase: boolean;
        forceLowerCase: boolean;
        configuredWidth: number;
        configuredHeight: number;
        boundOnInput: any;
        onInput(a: any): Promise<void>;
        applyInput(a: any, b: any, c: any, d: any): void;
        preProcessInput(a: any): string;
        isFiltered(a: any): boolean;
        setFilter(a: any, b: any): void;
        onMouseDown(a: any): void;
        onGlobalMouseDown(a: any): void;
        setFocus(a: any): void;
        setPassword(a: any): void;
        onMouseOver(a: any): void;
        onMouseOut(a: any): void;
        setMaxChars(a: any): void;
        setText(a: any): void;
        getText(): string;
        setDimensions(a: any, b: any, c?: boolean): void;
        hideBorders(): void;
        markNone(): void;
        markValid(): void;
        markInvalid(): void;
    }
    export namespace InputField {
        export const SUBMIT: string;
        export const FOCUS: string;
        const CHANGE_1: string;
        export { CHANGE_1 as CHANGE };
    }
    export class SocialMenu extends Feature {
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
        listContainer: PIXI.Container<PIXI.DisplayObject>;
        scrollbar: SocialMenuScrollbar;
        friendsButton: Button;
        invitationsButton: Button;
        clanButton: Button;
        clanChatButton: Button;
        friendDropdown: FriendDropdown;
        clanDropdown: SocialMemberDropdown;
        friendText: PIXI.Text;
        infoText: PIXI.Text;
        collapseButton: PIXI.Sprite;
        chatWindow: ChatWindow;
        goldWindow: GoldWindow;
        loadConversationInterval: number;
        repositionForGame(): void;
        repositionForMenu(): void;
        collapseMenu(a?: boolean, b?: boolean): void;
        maskFriendList(a: any): void;
        maskInvitationList(a: any): void;
        maskClanInvitationList(a: any): void;
        maskMemberList(a: any): void;
        refresh(): Promise<void>;
        loadConversations(): Promise<void>;
        loadFriends(a?: boolean): Promise<void>;
        mode: string;
        loadInvitations(a?: boolean): Promise<void>;
        showFriendDropdown(a: any, b: any): void;
        showClanDropdown(a: any, b: any): void;
        showGoldForm(a: any): void;
        showChat(a: any, b: any): void;
        loadInvitees(): Promise<void>;
        loadClanMembers(a?: boolean): Promise<void>;
        loadClanInvitations(a?: boolean): Promise<void>;
        onInvitationsButtonReleased(): void;
        onFriendsButtonReleased(): void;
        onClanButtonReleased(): void;
        onClanChatButtonReleased(): void;
        collapse(): void;
        expand(): void;
        resize(a: any, b: any, c?: boolean): void;
    }
    export namespace SocialMenu {
        export const REFRESH: string;
        const ACCESS_PROFILE_1: string;
        export { ACCESS_PROFILE_1 as ACCESS_PROFILE };
        export const MODE_INVITATIONS: string;
        export const MODE_INVITEES: string;
        export const MODE_FRIENDS: string;
        export const MODE_CLAN_INVITATIONS: string;
        export const MODE_CLAN_MEMBERS: string;
        export const SHOW_FRIEND_DROPDOWN: string;
        export const SHOW_CLAN_DROPDOWN: string;
        export const SHOW_CHAT: string;
        export const SEND_GOLD: string;
        export const MODE_GAME: boolean;
        export const Friends: {};
        export const AutoRefreshFriends: number;
        const ListHeight_2: number;
        export { ListHeight_2 as ListHeight };
        const ItemHeight_2: number;
        export { ItemHeight_2 as ItemHeight };
    }
    export class FriendItem extends PIXI.Graphics {
        constructor(a: any, b: any, c: any, d: any);
        id: any;
        name: any;
        seen: Date;
        clan: any;
        nameLabel: PIXI.Text;
    }
    export class ClanMemberItem extends PIXI.Graphics {
        constructor(a: any, b: any, c: any);
        id: any;
        name: any;
        role: any;
        isFriend: boolean;
        seen: Date;
        nameLabel: PIXI.Text;
        roleLabel: PIXI.Text;
    }
    export class AcceptClanInvitationItem extends PIXI.Graphics {
        constructor(a: any, b: any, c: any);
        id: any;
        clanName: any;
        initiatorName: any;
        nameLabel: PIXI.Text;
        acceptButton: Button;
        cancelButton: Button;
        onAccept(): Promise<void>;
        onDecline(): Promise<void>;
    }
    export class AcceptInvitationItem extends PIXI.Graphics {
        constructor(a: any, b: any, c: any);
        id: any;
        name: any;
        userId: any;
        nameLabel: PIXI.Text;
        acceptButton: Button;
        cancelButton: Button;
        onAccept(): Promise<void>;
        onDecline(): Promise<void>;
    }
    export class SocialMenuScrollbar extends PIXI.Graphics {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        bh: number;
        oy: number;
        hitArea: PIXI.Rectangle;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace SocialMenuScrollbar {
        const SCROLL_5: string;
        export { SCROLL_5 as SCROLL };
    }
    export class FriendDropdown extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        id: any;
        background: PIXI.Graphics;
        messageRow: FriendDropdownActionRow;
        unfriendRow: FriendDropdownActionRow;
        goldRow: FriendDropdownActionRow;
        clanRow: FriendDropdownActionRow;
        update(a: any): void;
        onUnfriend(): Promise<void>;
        onInviteToClan(): Promise<void>;
    }
    export namespace FriendDropdown {
        namespace Action {
            export const MESSAGE: string;
            const SEND_GOLD_1: string;
            export { SEND_GOLD_1 as SEND_GOLD };
            export const UNFRIEND: string;
            export const CLAN_INVITE: string;
        }
    }
    export class FriendDropdownActionRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d?: boolean);
        text: any;
        tintValue: any;
        actionText: PIXI.Text;
        confirmation: boolean;
        confirming: boolean;
        hitArea: PIXI.Rectangle;
    }
    export namespace FriendDropdownActionRow {
        const CONFIRM_1: string;
        export { CONFIRM_1 as CONFIRM };
        const SELECT_4: string;
        export { SELECT_4 as SELECT };
    }
    export class SocialMemberDropdown extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        id: any;
        background: PIXI.Graphics;
        messageRow: SocialMemberDropdownActionRow;
        onUnfriend(): Promise<void>;
    }
    export namespace SocialMemberDropdown {
        export namespace Action_1 {
            const MESSAGE_1: string;
            export { MESSAGE_1 as MESSAGE };
        }
        export { Action_1 as Action };
    }
    export class SocialMemberDropdownActionRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d?: boolean);
        text: any;
        tintValue: any;
        actionText: PIXI.Text;
        confirmation: boolean;
        confirming: boolean;
        hitArea: PIXI.Rectangle;
    }
    export namespace SocialMemberDropdownActionRow {
        const CONFIRM_2: string;
        export { CONFIRM_2 as CONFIRM };
        const SELECT_5: string;
        export { SELECT_5 as SELECT };
    }
    export class GoldWindow extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        id: any;
        dragging: boolean;
        active: boolean;
        background: PIXI.Graphics;
        ox: number;
        oy: number | PIXI.FederatedPointerEvent;
        title: PIXI.BitmapText;
        errorMsg: PIXI.BitmapText;
        inputField: InputField;
        load(a: any): void;
        onSubmitGold(a: any): Promise<void>;
    }
    export class ChatWindow extends PIXI.Graphics {
        constructor();
        id: any;
        dragging: boolean;
        active: boolean;
        convo: any;
        messages: PIXI.BitmapText[];
        oy: number;
        ox: number;
        title: PIXI.BitmapText;
        scrollbar: SocialMenuScrollbar;
        closeButton: PIXI.Sprite;
        inputField: InputField;
        onSubmitMessage(a: any): Promise<void>;
        loadConversation(a: any): void;
    }
    export namespace ChatWindow {
        const Conversations: {};
        const CLOSE: string;
        function PutMessage(a: any, b: any): void;
        function UpdateConversations(a: any): void;
        const MaxMessages: number;
    }
    export class ImgButton extends PIXI.Sprite {
        constructor(a?: string, b?: boolean);
        type: string;
        enabled: boolean;
        mobileSetup(): void;
        onMouseOver(): void;
        onMouseDown(): void;
        onMouseOut(): void;
        setEnabled(a: any): void;
    }
    export namespace ImgButton {
        const TYPE_CLOSE: string;
        const CLICK: string;
    }
    export class RankingMenu extends Feature {
        lastRefresh: number;
        background: PIXI.Graphics;
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
        globalRankingContainer: PIXI.Container<PIXI.DisplayObject>;
        skillRankingContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponStatsContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponTypeContainer: PIXI.Container<PIXI.DisplayObject>;
        nameText: PIXI.Text;
        levelText: PIXI.Text;
        experienceText: PIXI.Text;
        socialGlText: PIXI.Text;
        globalRankingTableContainerMask: PIXI.Graphics;
        globalRankingTableContainer: PIXI.Container<PIXI.DisplayObject>;
        globalRanking: GlobalRankingScrollbar;
        nameSkillText: PIXI.Text;
        skillTitleText: PIXI.Text;
        skillText: PIXI.Text;
        socialText: PIXI.Text;
        skillRankingTableContainerMask: PIXI.Graphics;
        skillRankingTableContainer: PIXI.Container<PIXI.DisplayObject>;
        skillRanking: SkillRankingScrollbar;
        weaponTypeText: PIXI.Text;
        weaponKillsText: PIXI.Text;
        weaponStatsTableContainerMask: PIXI.Graphics;
        weaponStatsTableContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponStats: WeaponStatsScrollbar;
        weaponTypeIcon: string;
        weaponTypeLabel: PIXI.Text;
        weaponTypeNameText: PIXI.Text;
        weaponTypeKillsText: PIXI.Text;
        weaponTypeTableContainerMask: PIXI.Graphics;
        weaponTypeTableContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponType: WeaponTypeStatsScrollbar;
        onCloseButtonReleased(): void;
        show(): Promise<void>;
        displayGlobalRanking(): void;
        displaySkillRanking(): void;
        displayWeaponStats(): void;
        displayWeaponUsers(a: any): Promise<void>;
    }
    export namespace RankingMenu {
        const GLOBAL_RANKING: string;
        const SKILL_RANKING: string;
        const WEAPON_STATS: string;
        const WEAPON_USERS: string;
    }
    export class GlobalRankingTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any, e: any, f: any, g: any);
        index: any;
        background: PIXI.Graphics;
        icon: PIXI.Sprite;
        rankText: PIXI.Text;
        nameText: PIXI.Text;
        levelText: PIXI.Text;
        experienceText: PIXI.Text;
        ytIcon: PIXI.Sprite;
        twIcon: PIXI.Sprite;
    }
    export class GlobalRankingScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace GlobalRankingScrollbar {
        const SCROLL_6: string;
        export { SCROLL_6 as SCROLL };
    }
    export class SkillRankingTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any, e: any, f?: string, g?: string);
        index: any;
        background: PIXI.Graphics;
        ratingIcon: PIXI.Sprite;
        rankText: PIXI.Text;
        nameText: PIXI.Text;
        titleText: PIXI.Text;
        skillText: PIXI.Text;
        ytIcon: PIXI.Sprite;
        twIcon: PIXI.Sprite;
    }
    export class SkillRankingScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace SkillRankingScrollbar {
        const SCROLL_7: string;
        export { SCROLL_7 as SCROLL };
    }
    export class WeaponStatsTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any);
        id: string;
        index: any;
        background: PIXI.Graphics;
        icon: string;
        nameText: PIXI.Text;
        killsText: PIXI.Text;
    }
    export class WeaponStatsScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace WeaponStatsScrollbar {
        const SCROLL_8: string;
        export { SCROLL_8 as SCROLL };
    }
    export class WeaponTypeStatsTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any);
        index: any;
        background: PIXI.Graphics;
        icon: PIXI.Sprite;
        indexText: PIXI.Text;
        nameText: PIXI.Text;
        killsText: PIXI.Text;
    }
    export class WeaponTypeStatsScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace WeaponTypeStatsScrollbar {
        const SCROLL_9: string;
        export { SCROLL_9 as SCROLL };
    }
    export class NewsMenu extends Feature {
        background: PIXI.Graphics;
        ox: number;
        oy: number;
        closeButton: ImgButton;
        newsTitle: PIXI.Text;
        newsItemContainer: PIXI.Container<PIXI.DisplayObject>;
        show(): Promise<void>;
    }
    export class NewsItem extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any);
        background: PIXI.Graphics;
        title: PIXI.Text;
        message: PIXI.Text;
    }
    export class PVPMenu extends Feature {
        background: PIXI.Graphics;
        ox: number;
        oy: number;
        startCount: number;
        initializingMatch: boolean;
        startingMatch: boolean;
        findingMatch: boolean;
        errorState: boolean;
        startInterval: number;
        closeButton: ImgButton;
        pvpTitle: PIXI.Text;
        matchButton: Button;
        cancelButton: Button;
        vsText: PIXI.Text;
        loadingText: PIXI.Text;
        rulesText: PIXI.Text;
        rulesPanel: PIXI.Graphics;
        rulesTextTitle: PIXI.Text;
        rulesTextDesc: PIXI.Text;
        startingText: PIXI.Text;
        counterText: PIXI.Text;
        regionList: any;
        modeList: any;
        visualizer1: Visualizer;
        p1Name: PIXI.Text;
        shadow1: PIXI.Graphics;
        visualizer2: Visualizer;
        p2Name: PIXI.Text;
        shadow2: PIXI.Graphics;
        ninjaSprite: PIXI.Sprite;
        particleContainer: ParticleContainer;
        particles: any[];
        fxCounter: number;
        disconnectTimeout: any;
        displayRules(): void;
        show(): Promise<void>;
        selectedRegion: any;
        displayMatch(a: any): void;
        onStartCount(a: any): void;
        onRegionListSelect(a: any): void;
        onMatchButtonReleased(): void;
        attemptConnect(): void;
        onCancelButtonReleased(): void;
        onPVPClientConnect(): void;
        onPVPClientDisconnect(a: any): void;
        onPVPConnectionError(): void;
    }
    export class PartnerMenu extends Feature {
        partners: {
            title: string;
            url: string;
        }[];
        background: PIXI.Graphics;
        ox: number;
        oy: number;
        closeButton: ImgButton;
        partnerTitle: PIXI.BitmapText;
    }
    export class ServerListMenu extends Feature {
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
        background: PIXI.Graphics;
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
        playersText: PIXI.Text;
        modeSorting: PIXI.Graphics;
        regionSorting: PIXI.Graphics;
        nameSorting: PIXI.Graphics;
        playerSorting: PIXI.Graphics;
        serverInfoText: PIXI.Text;
        refreshButton: Button;
        serverListContainer: PIXI.Container<PIXI.DisplayObject>;
        serverListTableContainerMask: PIXI.Graphics;
        serverListTableContainer: PIXI.Container<PIXI.DisplayObject>;
        serverListScrollbar: ServerListScrollbar;
        modeList: any;
        regionList: any;
        onModeListSelect(a: any): void;
        onRegionListSelect(a: any): void;
        refresh(): Promise<void>;
        sort(a?: string, b?: string, c?: string, d?: string): void;
        filter(a?: string, b?: string, c?: string, d?: string, e?: string): void;
        setPasswordInvalid(): void;
    }
    export namespace ServerListMenu {
        const MODE_ALL: string;
        const REGION_ALL: string;
        const PRIVATE_ALL: string;
        const RANKED_ALL: string;
        const CUSTOM_ALL: string;
        const MODE_DEATHMATCH: string;
        const MODE_TEAM_DEATHMATCH: string;
        const MODE_CAPTURE_THE_FLAG: string;
        const MODE_DODGEBALL: string;
        const MODE_TRAINING: string;
        const MODE_ZOMBIE_SURVIVAL: string;
        const MODE_1V1: string;
        const REGION_NA_EAST: string;
        const REGION_EU_WEST: string;
        const REGION_AS_SOUTH: string;
        const REGION_MAP: {
            [x: string]: string;
        };
        const SORT_UP: string;
        const SORT_DOWN: string;
        const SORT_DEFAULT: string;
        const COL_MODE: string;
        const COL_REGION: string;
        const COL_NAME: string;
        const COL_PLAYERS: string;
    }
    export class ServerListTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, k: any, m: any);
        id: any;
        index: any;
        background: PIXI.Graphics;
        hitArea: PIXI.Rectangle;
        modeIcon: PIXI.Sprite;
        regionIcon: PIXI.Sprite;
        regionText: PIXI.BitmapText;
        nameText: PIXI.BitmapText;
        mapText: PIXI.BitmapText;
        playerText: PIXI.BitmapText;
        privateIcon: PIXI.Sprite;
        rankedIcon: PIXI.Sprite;
        customIcon: PIXI.Sprite;
        joinButton: Button;
    }
    export namespace ServerListTableRow {
        const JOIN_GAME: string;
        const DISPLAY_DETAILS: string;
    }
    export class ServerListScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace ServerListScrollbar {
        const SCROLL_10: string;
        export { SCROLL_10 as SCROLL };
    }
    export class ServerCustomizationMenu extends Feature {
        ox: number;
        oy: number;
        maps: any[];
        drops: any[];
        settings: {
            maps: any[];
            weapons: any[];
            drops: any[];
            shuriken: boolean;
        };
        selectedMode: any;
        background: PIXI.Graphics;
        serverCustomizationTitle: PIXI.Text;
        weaponTypeLabel: PIXI.Text;
        mapLabel: PIXI.Text;
        dropLabel: PIXI.Text;
        acceptButton: Button;
        weaponListContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponListTableContainerMask: PIXI.Graphics;
        weaponListTableContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponSelectionListScrollbar: SelectionListScrollbar;
        mapListContainer: PIXI.Container<PIXI.DisplayObject>;
        mapListTableContainerMask: PIXI.Graphics;
        mapListTableContainer: PIXI.Container<PIXI.DisplayObject>;
        mapSelectionListScrollbar: SelectionListScrollbar;
        dropListContainer: PIXI.Container<PIXI.DisplayObject>;
        dropListTableContainerMask: PIXI.Graphics;
        dropListTableContainer: PIXI.Container<PIXI.DisplayObject>;
        dropSelectionListScrollbar: SelectionListScrollbar;
        setShuriken: Checkbox;
        onSetShuriken(a: any): void;
        onWeaponSelectionChange(a: any, b: any): void;
        onMapSelectionChange(a: any, b: any): void;
        onDropSelectionChange(a: any, b: any): void;
        onAccept(): void;
        onCancel(): void;
        loadContent(): Promise<void>;
        setMode(a: any): void;
        filterMaps(): void;
    }
    export namespace ServerCustomizationMenu {
        export const ACCEPT: string;
        const CANCEL_1: string;
        export { CANCEL_1 as CANCEL };
        export const INIT: string;
        export const SHOW: string;
    }
    export class WeaponSelectionListTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any);
        id: any;
        index: any;
        selected: boolean;
        background: PIXI.Graphics;
        icon: any;
        nameText: PIXI.Text;
    }
    export namespace WeaponSelectionListTableRow {
        const CHANGE_2: string;
        export { CHANGE_2 as CHANGE };
    }
    export class MapSelectionListTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any);
        id: any;
        index: any;
        selected: boolean;
        background: PIXI.Graphics;
        icon: PIXI.Sprite;
        nameText: PIXI.Text;
    }
    export namespace MapSelectionListTableRow {
        const CHANGE_3: string;
        export { CHANGE_3 as CHANGE };
    }
    export class DropSelectionListTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any);
        id: any;
        index: any;
        selected: boolean;
        background: PIXI.Graphics;
        icon: any;
        nameText: PIXI.Text;
    }
    export namespace DropSelectionListTableRow {
        const CHANGE_4: string;
        export { CHANGE_4 as CHANGE };
    }
    export class SelectionListScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace SelectionListScrollbar {
        const SCROLL_11: string;
        export { SCROLL_11 as SCROLL };
    }
    export class ServerCreationMenu extends Feature {
        price: number;
        duration: string;
        mode: string;
        customization: {
            maps: any[];
            weapons: any[];
            drops: any[];
            shuriken: boolean;
        };
        isPrivate: boolean;
        isRanked: boolean;
        isCustom: boolean;
        onClientConnectBinding: any;
        createdServerName: string;
        createdServerId: number;
        background: PIXI.Graphics;
        ox: number;
        oy: number;
        closeButton: ImgButton;
        customizationMenu: ServerCustomizationMenu;
        confirmationBackground: PIXI.Graphics;
        confirmationContainer: PIXI.Container<PIXI.DisplayObject>;
        confirmationAccept: Button;
        confirmationDecline: Button;
        serverCreationConfirmationTitle: PIXI.BitmapText;
        confirmationInfoTitle: PIXI.BitmapText;
        errorMessage: PIXI.BitmapText;
        successBackground: PIXI.Graphics;
        successContainer: PIXI.Container<PIXI.DisplayObject>;
        serverCreationSuccessTitle: PIXI.BitmapText;
        successInfoTitle: PIXI.BitmapText;
        successAccept: Button;
        toLobbyAccept: Button;
        serverCreationTitle: PIXI.Text;
        serverCreationTypeLabel: PIXI.BitmapText;
        customizationButton: Button;
        createButton: Button;
        setPrivate: Checkbox;
        privateIcon: PIXI.Sprite;
        setRanked: Checkbox;
        rankedIcon: PIXI.Sprite;
        setCustom: Checkbox;
        customIcon: PIXI.Sprite;
        serverCreationPriceLabel: PIXI.BitmapText;
        goldIcon: PIXI.Sprite;
        serverCreationPriceValue: PIXI.BitmapText;
        serverCreationNameLabel: PIXI.BitmapText;
        nameField: InputField;
        serverCreationPasswordLabel: PIXI.BitmapText;
        passwordField: InputField;
        serverCreationModeLabel: PIXI.BitmapText;
        modeList: any;
        serverCreationDurationLabel: PIXI.BitmapText;
        durationList: any;
        serverList: any;
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
    export namespace ServerCreationMenu {
        const DURATION_A: string;
        const DURATION_B: string;
        const DURATION_C: string;
        const DURATION_D: string;
        const DURATION_E: string;
        const DURATION_F: string;
        const DURATION_G: string;
        const DURATION_PRICE_MAP: {
            [x: string]: number;
        };
    }
    export class ChatClient extends PIXI.utils.EventEmitter<string | symbol, any> {
        constructor();
        socket: WebSocket;
        connect(a: any): void;
        disconnect(): void;
        onOpen(a: any): void;
        onMessage(a: any): void;
        onClose(a: any): void;
        onError(a: any): void;
        compose(a: number, b: any): string;
        send(a: number, b: any): void;
        isConnected(): boolean;
    }
    export namespace ChatClient {
        export const TYPE_LOCAL: number;
        export const TYPE_JOIN_CLAN_CHAT: number;
        export const TYPE_LEAVE_CLAN_CHAT: number;
        export const TYPE_MSG: number;
        export const TYPE_STATUS: number;
        export const MSG_PUBLIC: number;
        export const MSG_CLAN: number;
        export const MSG_FRIEND: number;
        export const SERVER_DOMAIN: string;
        export const SERVER_PORT: number;
        const CONNECT_1: string;
        export { CONNECT_1 as CONNECT };
        const DISCONNECT_1: string;
        export { DISCONNECT_1 as DISCONNECT };
        const MESSAGE_2: string;
        export { MESSAGE_2 as MESSAGE };
        export const STATUS: string;
    }
    export class ClanChatMenu extends Feature {
        client: ChatClient;
        messages: any[];
        lines: PIXI.BitmapText[];
        down: boolean;
        dragging: boolean;
        background: PIXI.Graphics;
        ox: number;
        oy: number | PIXI.FederatedPointerEvent;
        title: PIXI.BitmapText;
        inputField: InputField;
        closeButton: PIXI.Sprite;
        onSubmitMessage(a: any): Promise<void>;
        onMessage(a: any): void;
        onStatus(a: any): void;
        addMessage(a: any): void;
        updateConversation(): void;
        addLocalInfoMessage(a: any): void;
        removeMessages(): void;
        onConnect(): void;
        onDisconnect(): void;
    }
    export namespace ClanChatMenu {
        const MaxMessages_1: number;
        export { MaxMessages_1 as MaxMessages };
    }
    export class ClanMenu extends Feature {
        searchTimeout: any;
        members: any[];
        background: PIXI.Graphics;
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
        createdText: PIXI.Text;
        listContainer: PIXI.Container<PIXI.DisplayObject>;
        memberListContainer: PIXI.Container<PIXI.DisplayObject>;
        scrollbar: ClanMemberListScrollbar;
        show(a: any): void;
        loadClan(a: any): Promise<void>;
        maskMemberList(a: any): void;
    }
    export namespace ClanMenu {
        const ACCESS_PROFILE_2: string;
        export { ACCESS_PROFILE_2 as ACCESS_PROFILE };
    }
    export class ClanMemberListScrollbar extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b?: number);
        scrolling: boolean;
        start: number;
        h: any;
        bh: number;
        oy: number;
        scrollBar: PIXI.Graphics;
        scrollButton: PIXI.Graphics;
        wheelListener: (c: any) => void;
        enableWheel(): void;
        disableWheel(): void;
        scroll(a: any): void;
        reset(): void;
        onMouseOver(): void;
        onMouseOut(): void;
    }
    export namespace ClanMemberListScrollbar {
        const SCROLL_12: string;
        export { SCROLL_12 as SCROLL };
        const ListHeight_3: number;
        export { ListHeight_3 as ListHeight };
        const ItemHeight_3: number;
        export { ItemHeight_3 as ItemHeight };
    }
    export class ClanMemberMenuItem extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any);
        id: any;
        name: any;
        role: any;
        options: any;
        background: PIXI.Graphics;
        nameLabel: PIXI.BitmapText;
        roleLabel: PIXI.BitmapText;
    }
    export class LoadingMenu extends Feature {
        background: PIXI.Graphics;
        cancelCount: number;
        title: PIXI.Text;
        visualizer: Visualizer;
        cancelButton: Button;
        setTitle(a: any): void;
    }
    export namespace LoadingMenu {
        const CANCEL_COUNT: number;
    }
    export class RenameMenu extends Feature {
        background: PIXI.Graphics;
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
        submitButton: Button;
        loadingContainer: PIXI.Container<PIXI.DisplayObject>;
        loadingBackground: PIXI.Graphics;
        loadingText: PIXI.Text;
        completedContainer: PIXI.Container<PIXI.DisplayObject>;
        completedBackground: PIXI.Graphics;
        completedText: PIXI.Text;
        completedButton: Button;
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
    export class LogoutMenu extends Feature {
        background: PIXI.Graphics;
        ox: number;
        oy: number;
        closeButton: ImgButton;
        loginTitle: PIXI.Text;
        autogenDescription: PIXI.Text;
        renameButton: Button;
        logoutButton: Button;
        reset(): void;
        onRenameButtonReleased(): void;
        onLogoutButtonReleased(): void;
    }
    export class Game extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any);
        sessionId: any;
        settings: any;
        clients: {};
        numClients: number;
        canvas: any;
        manager: any;
        onKeyDownListener: (b: any) => void;
        onKeyUpListener: (b: any) => void;
        onDisplayAdButton: any;
        mode: any;
        ignoreMovementJoystickViewing: boolean;
        readyToSpawn: boolean;
        lastJoystickNV: {
            x: number;
            y: number;
        };
        mutePref: boolean;
        lastSent: string;
        hud: any;
        lastInputUpdateTime: number;
        reticle: PIXI.Sprite;
        animTimeout: any;
        busyTimeout: number;
        reticleLine: PIXI.Sprite;
        gameover: boolean;
        input: any;
        interpreter: any;
        onGameDataMap: {
            [x: string]: (b: any) => void;
        };
        gameStatusMap: {
            [x: number]: (b: any) => void;
        };
        frameCount: number;
        player: any;
        timeSinceLastUpdate: number;
        onStatus(a: any): void;
        mute(a: any): void;
        step(a: any): void;
        showReticleLine(): void;
        hideReticleLine(): void;
        dispatchInput(): void;
        dispatchInputIfInDelta(): void;
        onBinData(a: any): void;
        onData(a: any): void;
        onInfo(a: any): void;
        onMessage(a: any): void;
        setSpectator(a: any): void;
        setParticipant(a: any): void;
        applyStats(a: any): void;
        applySettings(a: any): void;
        playerJoined(a: any, b: any): void;
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
        onMouseDown(): void;
        onMouseUp(): void;
        onMouseMove(a: any): void;
        onRightDown(): void;
        onRightUp(): void;
        onKeyDown(a: any): void;
        requestDisplayChatBubble(): void;
        requestHideChatBubble(): void;
        updateJoystickMoveState(a: any): void;
        updateJoystickTargetState(a: any): void;
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
        onCmdKill(a: any): void;
        onCmdLogin(a: any): void;
        onCmdClients(): void;
        onCmdCommands(): void;
        onCmdKick(a: any): void;
        onCmdBalance(): void;
        onCmdParams(): void;
        onCmdMemStats(): void;
        onCmdWave(): void;
        onCmdSalute(): void;
        onCmdMagic(): void;
        onCmdToss(): void;
        onCmdLogPerf(): void;
        onCmdSpawnBot(a: any): void;
        onCmdImmortal(a: any): void;
        resize(): void;
        onShowConsole(): void;
        onHideConsole(): void;
    }
    export namespace Game {
        export const Muted: any[];
        export const MODE_CTF: string;
        export const MODE_DM: string;
        export const MODE_TDM: string;
        export const MODE_DB: string;
        export const MODE_TR: string;
        const MODE_1V1_1: string;
        export { MODE_1V1_1 as MODE_1V1 };
        export const MODE_ZS: string;
        export const MATCH_END: string;
        export const MATCH_START: string;
        export const MODE_MAP: {
            [x: string]: string;
        };
        export const MODE_TITLES: {
            [x: string]: string;
        };
        export const EVENT_DEATH: string;
        export const RankTitles: string[];
        export function MapSkillToIndex(a: any): number;
        export function MapSkillToTitle(a: any): string;
        export function MapEventWepToId(a: any): string;
        export function MapEventWepToIcon(a: any): string;
        export const WeaponMapping: {
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
        };
    }
    export class ServerDetailMenu extends Feature {
        isPrivate: boolean;
        isRanked: boolean;
        isCustom: boolean;
        maps: any[];
        drops: any[];
        weapons: any[];
        mode: any;
        serverId: string;
        serverName: string;
        oy: number;
        ox: number;
        background: PIXI.Graphics;
        closeButton: ImgButton;
        serverListingTitle: PIXI.Text;
        weaponListContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponListTableContainerMask: PIXI.Graphics;
        weaponListTableContainer: PIXI.Container<PIXI.DisplayObject>;
        weaponSelectionListScrollbar: SelectionListScrollbar;
        mapListContainer: PIXI.Container<PIXI.DisplayObject>;
        mapListTableContainerMask: PIXI.Graphics;
        mapListTableContainer: PIXI.Container<PIXI.DisplayObject>;
        mapSelectionListScrollbar: SelectionListScrollbar;
        dropListContainer: PIXI.Container<PIXI.DisplayObject>;
        dropListTableContainerMask: PIXI.Graphics;
        dropListTableContainer: PIXI.Container<PIXI.DisplayObject>;
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
        joinButton: Button;
        show(a: any): Promise<void>;
        filterMaps(a: any): void;
    }
    export class WeaponDisplayTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any);
        id: any;
        index: any;
        selected: any;
        background: PIXI.Graphics;
        icon: any;
        nameText: PIXI.Text;
    }
    export class MapDisplayTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any, e: any);
        id: any;
        index: any;
        selected: any;
        background: PIXI.Graphics;
        icon: PIXI.Sprite;
        nameText: PIXI.Text;
    }
    export class DropDisplayTableRow extends PIXI.Container<PIXI.DisplayObject> {
        constructor(a: any, b: any, c: any, d: any, e: any);
        id: any;
        index: any;
        selected: any;
        background: PIXI.Graphics;
        icon: any;
        nameText: PIXI.Text;
    }
    export class GuestProfileMenu extends Feature {
        background: PIXI.Graphics;
        ox: number;
        oy: number;
        closeButton: ImgButton;
        guestProfileTitle: PIXI.Text;
        profileItemContainer: PIXI.Container<PIXI.DisplayObject>;
        registerDesc: PIXI.Text;
        loginButton: Button;
        registerButton: Button;
        setTitle(a: any): void;
        show(): Promise<void>;
    }
    export class HighscoreMenu extends Feature {
        display: string;
        skillRanking: any[];
        experienceRanking: any[];
        thumbnailContainer: PIXI.Container<PIXI.DisplayObject>;
        background: PIXI.Graphics;
        topTitle: PIXI.Text;
        skillButtonBg: PIXI.Graphics;
        skillButton: PIXI.Text;
        experienceButtonBg: PIXI.Graphics;
        experienceButton: PIXI.Text;
        load(): Promise<void>;
        refresh(): void;
    }
    export namespace HighscoreMenu {
        const DISPLAY_SKILL: string;
        const DISPLAY_EXPERIENCE: string;
    }
    export class ParticleContainer extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        lastUpdate: number;
        spawnDirect(a: any): void;
        spawn(a: any, b: any): void;
        update(): void;
        checkCollision(a: any): void;
        clear(): void;
    }
    export namespace ParticleContainer {
        namespace FB {
            function search(): any[];
        }
        const Segments: any[];
        function AddLineSegment(a: any): void;
        function ProcessCollisionMesh(): void;
    }
    export class RewardsMenu extends Feature {
        background: PIXI.Graphics;
        ox: number;
        oy: number;
        title: PIXI.Text;
        rewardsList: PIXI.Container<PIXI.DisplayObject>;
        closeButton: ImgButton;
        treasureIcon: PIXI.Sprite;
        totalAmount: PIXI.Text;
        warningText: PIXI.Text;
        rewardButton: PIXI.Sprite;
        rewardContainer: PIXI.Container<PIXI.DisplayObject>;
        rewardBackground: PIXI.Graphics;
        rewardedAmountCounter: PIXI.Text;
        rewardedTreasureIcon: PIXI.Sprite;
        rewardedAmount: PIXI.Text;
        time: number;
        particles: any[];
        animationContainer: PIXI.Sprite;
        particleContainer: ParticleContainer;
        displayRewardDialog(a: any): void;
        displayRegular(): void;
        displayWarning(): void;
        triggerRewardedBreak(): void;
        claimRewards(): Promise<void>;
        disableRewardButton(): void;
        enableRewardButton(): void;
        show(): Promise<void>;
    }
    export class RewardRow extends PIXI.Graphics {
        constructor(a: any, b: any);
        unlockedTitle: any;
        goldIcon: PIXI.Sprite;
        goldAmount: PIXI.Text;
        title: PIXI.Text;
        desc: PIXI.Text;
        setActive(): void;
        setInactive(): void;
    }
    export namespace RewardRow {
        const TYPE: {
            day: string;
            "10m": string;
            "30m": string;
        };
        const TYPE_AMOUNT: {
            day: number;
            "10m": number;
            "30m": number;
        };
        const TYPE_DESC: {
            day: string;
            "10m": string;
            "30m": string;
        };
    }
    export class PVPResultMenu extends Feature {
        background: PIXI.Graphics;
        vsTitle: PIXI.Text;
        title: PIXI.Text;
        infoText: PIXI.Text;
        ratingIcon: PIXI.Sprite;
        promoBadgeLeft: PIXI.Sprite;
        promoBadgeRight: PIXI.Sprite;
        promoText: PIXI.Text;
        rankText: PIXI.Text;
        ratingText: PIXI.Text;
        goldIcon: PIXI.Sprite;
        goldText: PIXI.Text;
        newRatingText: PIXI.Text;
        visualizer: Visualizer;
        closeButton: ImgButton;
        cancelButton: Button;
        show(): Promise<void>;
    }
    export class Layer extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        mode: any;
        member: boolean;
        w: number;
        h: number;
        features: (GameMenu | GuestMenu | MemberMenu | MemberBrowserMenu | ClanBrowserMenu | LoginMenu | RegisterMenu | UPResetMenu | UserMenu | ProfileMenu | CustomizationMenu | RankingMenu | NewsMenu | PVPMenu | ServerListMenu | PartnerMenu | ServerCreationMenu | ClanMenu | LoadingMenu | RenameMenu | LogoutMenu | ServerDetailMenu | GuestProfileMenu | HighscoreMenu | RewardsMenu | PVPResultMenu)[];
        updateFeatures: (UserMenu | ProfileMenu | CustomizationMenu | PVPMenu | LoadingMenu | RewardsMenu | PVPResultMenu)[];
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
        mainMenuHides: (MemberBrowserMenu | ClanBrowserMenu | LoginMenu | RegisterMenu | UPResetMenu | UserMenu | ProfileMenu | CustomizationMenu | RankingMenu | NewsMenu | PVPMenu | ServerListMenu | ServerCreationMenu | ClanMenu | LoadingMenu | RenameMenu | ServerDetailMenu | GuestProfileMenu | RewardsMenu | PVPResultMenu)[];
        cursor: PIXI.Sprite;
        inputOverlay: PIXI.Sprite;
        onKeyDownListener: any;
        setupEventRouting(): void;
        setMode(a: any): Promise<void>;
        updateCredentialsIfExpired(a?: boolean): Promise<void>;
        onKeyDown(a: any): void;
        setModeGame(): void;
        setModeMenu(): void;
        update(): void;
        resize(a: any, b: any): void;
        onLoginSubmit(a: any): Promise<void>;
        applyGuestSetup(): void;
        setup: any;
        applyMemberSetup(): void;
        socialMenu: SocialMenu;
        clanChatMenu: ClanChatMenu;
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
        onServerListJoinGame(a: any, b: any, c: any): Promise<void>;
        onJoinGameMode(): void;
        onServerCreationJoinGame(a: any, b: any, c: any): void;
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
        onLogoutAccess(): void;
        onLogoutCancel(): void;
        onServerDetailAccess(a: any): void;
        onServerDetailCancel(): void;
        onRewardsAccess(): void;
        onRewardsCancel(): void;
        onRewardsClaimed(a: any, b: any): void;
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
    export namespace Layer {
        export const MODE_MENU: string;
        const MODE_GAME_1: string;
        export { MODE_GAME_1 as MODE_GAME };
        export const SETUP_GUEST: string;
        export const SETUP_MEMBER: string;
        export namespace Events {
            const DISCONNECT_2: string;
            export { DISCONNECT_2 as DISCONNECT };
            export const LOGIN_ACCESS: string;
            export const LOGIN_SUBMIT: string;
            export const LOGIN_CANCEL: string;
            const LOGOUT_1: string;
            export { LOGOUT_1 as LOGOUT };
            export const RECOVER_ACCESS: string;
            export const RECOVER_SUBMIT: string;
            export const RECOVER_CANCEL: string;
            export const REGISTER_ACCESS: string;
            export const REGISTER_SUBMIT: string;
            export const REGISTER_CANCEL: string;
            export const PROFILE_ACCESS: string;
            export const PROFILE_CANCEL: string;
            export const PROFILE_RENAME: string;
            export const HIDE_MENU: string;
            export const SHOW_MENU: string;
            export const UPDATE_CREDENTIAL: string;
            export const CUSTOMIZATION_ACCESS: string;
            export const CUSTOMIZATION_CANCEL: string;
            export const USER_ACCESS: string;
            export const USER_CANCEL: string;
            export const USER_UNFRIEND: string;
            export const RANKING_ACCESS: string;
            export const RANKING_CANCEL: string;
            export const MEMBER_ACCESS: string;
            export const MEMBER_CANCEL: string;
            export const NEWS_ACCESS: string;
            export const NEWS_CANCEL: string;
            export const PVP_ACCESS: string;
            export const PVP_CANCEL: string;
            export const PVP_CONNECT: string;
            export const PVP_START: string;
            export const PVP_START_COUNTDOWN: string;
            export const PVP_CANCEL_COUNTDOWN: string;
            export const PARTNER_ACCESS: string;
            export const PARTNER_CANCEL: string;
            export const LEAVE_CLAN: string;
            export const CREATE_CLAN: string;
            export const JOIN_CLAN: string;
            const JOIN_GAME_1: string;
            export { JOIN_GAME_1 as JOIN_GAME };
            export const JOIN_GAME_FAIL: string;
            export const JOIN_SERVER: string;
            export const CREATE_SERVER: string;
            export const SERVER_LIST_REFRESH: string;
            export const SERVER_LIST_CANCEL: string;
            export const SERVER_CREATION_CANCEL: string;
            export const SERVER_CREATION_INIT: string;
            export const SERVER_CREATION_REGION: string;
            export const SERVER_CREATION_JOIN_LOBBY: string;
            export const SERVER_CREATION_SESSION_INIT: string;
            export const SERVER_CREATED: string;
            export const CLAN_CHAT_ACCESS: string;
            export const CLAN_CHAT_CANCEL: string;
            export const LOADING_CANCEL: string;
            export const CLAN_BROWSER_ACCESS: string;
            export const CLAN_BROWSER_CANCEL: string;
            export const CLAN_ACCESS: string;
            export const CLAN_CANCEL: string;
            export const RENAME_ACCESS: string;
            export const RENAME_SUBMIT: string;
            export const RENAME_CANCEL: string;
            export const RENAME_COMPLETED: string;
            export const LOGOUT_CANCEL: string;
            export const LOGOUT_ACCESS: string;
            export const JOYSTICK_MOVE_STATE: string;
            export const JOYSTICK_TARGET_STATE: string;
            export const DISPLAY_HELP: string;
            export const MUTE_TOGGLE: string;
            export const SERVER_DETAIL_ACCESS: string;
            export const SERVER_DETAIL_CANCEL: string;
            export const MENU_ACCESS: string;
            export const GUEST_PROFILE_ACCESS: string;
            export const GUEST_PROFILE_HIDE: string;
            export const SETTINGS_ACCESS: string;
            export const SETTINGS_HIDE: string;
            export const ESCAPE_MENU_ACCESS: string;
            export const REWARDS_ACCESS: string;
            export const REWARDS_CLAIMED: string;
            export const REWARDS_CANCEL: string;
            export const PVP_RESULT_CANCEL: string;
        }
    }
    export namespace Protocol {
        const CONNECT_2: string;
        export { CONNECT_2 as CONNECT };
        export const CONNECTED: string;
        const DISCONNECT_3: string;
        export { DISCONNECT_3 as DISCONNECT };
        export const DISCONNECTED: string;
        export const ECHO: string;
        export const ECHO_RESP: string;
        export const INFO: string;
        export const SESSION: string;
        export namespace Session {
            export const REGISTER: string;
            export const CREATE: string;
            export const CREATE_RESP: string;
            export const JOIN_MODE: string;
            export const JOIN_RESP: string;
            const JOIN_GAME_2: string;
            export { JOIN_GAME_2 as JOIN_GAME };
            export const LEAVE: string;
            export const LEAVE_RESP: string;
            export const LIST_GAMES: string;
            export const LIST_GAMES_RESP: string;
            export const CLIENT_AUTH: string;
        }
        export const GAME: string;
        export const GAME_BIN: string;
        export namespace Game {
            const UPDATE_1: string;
            export { UPDATE_1 as UPDATE };
            export const REQ: string;
            export const INPUT: string;
            const INFO_1: string;
            export { INFO_1 as INFO };
            const MESSAGE_3: string;
            export { MESSAGE_3 as MESSAGE };
            export const COMMAND: string;
            export const ACTION: string;
            const STATUS_1: string;
            export { STATUS_1 as STATUS };
            export const TRIGGER_RESPAWN: string;
        }
        export const SIGNAL_FULL: string;
    }
    export class Thumbnail extends PIXI.Sprite {
        constructor(a: any, b: any, c?: boolean, d?: boolean);
        displayAura: boolean;
        w: any;
        h: any;
        s: number;
        numParticles: number;
        customization: {};
        offsetY: number;
        offsetX: number;
        time: number;
        head: PIXI.Sprite;
        face: PIXI.Sprite;
        torsoUpper: PIXI.Sprite;
        torsoLower: PIXI.Sprite;
        armLeftUpper: PIXI.Sprite;
        armLeftLower: PIXI.Sprite;
        armRightUpper: PIXI.Sprite;
        armRightLower: PIXI.Sprite;
        legLeftUpper: PIXI.Sprite;
        legLeftLower: PIXI.Sprite;
        legRightUpper: PIXI.Sprite;
        legRightLower: PIXI.Sprite;
        bandana: PIXI.Sprite;
        ninja: PIXI.Container<PIXI.DisplayObject>;
        aura: PIXI.Sprite;
        bodyparts: PIXI.Sprite[];
        generateCharacter(): void;
        initializeCustomFaceFx(a: any): void;
        applyCustomization(a: any): void;
    }
    export namespace FontStyle {
        namespace LargeDefault {
            const fontName: string;
            const fontSize: number;
            const fill: number;
            const strokeThickness: number;
            const lineJoin: string;
            const padding: number;
            const fontStyle: string;
            const fontWeight: string;
        }
        namespace MediumBlack {
            const fontName_1: string;
            export { fontName_1 as fontName };
            const fontSize_1: number;
            export { fontSize_1 as fontSize };
            const fill_1: number;
            export { fill_1 as fill };
            const strokeThickness_1: number;
            export { strokeThickness_1 as strokeThickness };
            const lineJoin_1: string;
            export { lineJoin_1 as lineJoin };
            const padding_1: number;
            export { padding_1 as padding };
            const fontStyle_1: string;
            export { fontStyle_1 as fontStyle };
            const fontWeight_1: string;
            export { fontWeight_1 as fontWeight };
        }
        namespace LeaderboardColumn {
            const fontName_2: string;
            export { fontName_2 as fontName };
            const fontSize_2: number;
            export { fontSize_2 as fontSize };
            const fill_2: number;
            export { fill_2 as fill };
            const strokeThickness_2: number;
            export { strokeThickness_2 as strokeThickness };
            const lineJoin_2: string;
            export { lineJoin_2 as lineJoin };
            const padding_2: number;
            export { padding_2 as padding };
            const fontStyle_2: string;
            export { fontStyle_2 as fontStyle };
            const fontWeight_2: string;
            export { fontWeight_2 as fontWeight };
        }
        namespace LeaderboardData {
            const fontName_3: string;
            export { fontName_3 as fontName };
            const fontSize_3: number;
            export { fontSize_3 as fontSize };
            const fill_3: number;
            export { fill_3 as fill };
            const strokeThickness_3: number;
            export { strokeThickness_3 as strokeThickness };
            const lineJoin_3: string;
            export { lineJoin_3 as lineJoin };
            const padding_3: number;
            export { padding_3 as padding };
            const fontStyle_3: string;
            export { fontStyle_3 as fontStyle };
            const fontWeight_3: string;
            export { fontWeight_3 as fontWeight };
        }
        namespace LeaderboardFieldTitle {
            const fontName_4: string;
            export { fontName_4 as fontName };
            const fontSize_4: number;
            export { fontSize_4 as fontSize };
            const fill_4: number;
            export { fill_4 as fill };
            const strokeThickness_4: number;
            export { strokeThickness_4 as strokeThickness };
            const lineJoin_4: string;
            export { lineJoin_4 as lineJoin };
            const padding_4: number;
            export { padding_4 as padding };
        }
        namespace SmallMenuTextOrange {
            const fontName_5: string;
            export { fontName_5 as fontName };
            const fontSize_5: number;
            export { fontSize_5 as fontSize };
            const fill_5: number;
            export { fill_5 as fill };
            const strokeThickness_5: number;
            export { strokeThickness_5 as strokeThickness };
            const lineJoin_5: string;
            export { lineJoin_5 as lineJoin };
            const padding_5: number;
            export { padding_5 as padding };
            const fontWeight_4: string;
            export { fontWeight_4 as fontWeight };
        }
        namespace SmallMenuTextWhite {
            const fontName_6: string;
            export { fontName_6 as fontName };
            const fontSize_6: number;
            export { fontSize_6 as fontSize };
            const fill_6: number;
            export { fill_6 as fill };
            const strokeThickness_6: number;
            export { strokeThickness_6 as strokeThickness };
            const lineJoin_6: string;
            export { lineJoin_6 as lineJoin };
            const padding_6: number;
            export { padding_6 as padding };
        }
        namespace SmallMenuTextOrange2 {
            const fontName_7: string;
            export { fontName_7 as fontName };
            const fontSize_7: number;
            export { fontSize_7 as fontSize };
            export const lineHeight: number;
            const fill_7: number;
            export { fill_7 as fill };
            const strokeThickness_7: number;
            export { strokeThickness_7 as strokeThickness };
            const lineJoin_7: string;
            export { lineJoin_7 as lineJoin };
            const padding_7: number;
            export { padding_7 as padding };
            const fontWeight_5: string;
            export { fontWeight_5 as fontWeight };
        }
        namespace LeaderboardPointText {
            const fontName_8: string;
            export { fontName_8 as fontName };
            const fontSize_8: number;
            export { fontSize_8 as fontSize };
            const fill_8: number;
            export { fill_8 as fill };
            const strokeThickness_8: number;
            export { strokeThickness_8 as strokeThickness };
            const lineJoin_8: string;
            export { lineJoin_8 as lineJoin };
            const padding_8: number;
            export { padding_8 as padding };
        }
        namespace MediumOrangeText {
            const fontName_9: string;
            export { fontName_9 as fontName };
            const fontSize_9: number;
            export { fontSize_9 as fontSize };
            const lineHeight_1: number;
            export { lineHeight_1 as lineHeight };
            const fill_9: number;
            export { fill_9 as fill };
            const strokeThickness_9: number;
            export { strokeThickness_9 as strokeThickness };
            const lineJoin_9: string;
            export { lineJoin_9 as lineJoin };
            const padding_9: number;
            export { padding_9 as padding };
            const fontStyle_4: string;
            export { fontStyle_4 as fontStyle };
            const fontWeight_6: string;
            export { fontWeight_6 as fontWeight };
        }
        namespace SmallRankingTextOrange {
            const fontName_10: string;
            export { fontName_10 as fontName };
            const fontSize_10: number;
            export { fontSize_10 as fontSize };
            const lineHeight_2: number;
            export { lineHeight_2 as lineHeight };
            const fill_10: number;
            export { fill_10 as fill };
            const strokeThickness_10: number;
            export { strokeThickness_10 as strokeThickness };
            const lineJoin_10: string;
            export { lineJoin_10 as lineJoin };
            const padding_10: number;
            export { padding_10 as padding };
        }
        namespace SmallClanBrowserText {
            const fontName_11: string;
            export { fontName_11 as fontName };
            const fontSize_11: number;
            export { fontSize_11 as fontSize };
            const lineHeight_3: number;
            export { lineHeight_3 as lineHeight };
            const fill_11: number;
            export { fill_11 as fill };
            const strokeThickness_11: number;
            export { strokeThickness_11 as strokeThickness };
            const lineJoin_11: string;
            export { lineJoin_11 as lineJoin };
            const padding_11: number;
            export { padding_11 as padding };
        }
        namespace SmallMenuTextOrange3 {
            const fontName_12: string;
            export { fontName_12 as fontName };
            const fontSize_12: number;
            export { fontSize_12 as fontSize };
            const fill_12: number;
            export { fill_12 as fill };
            const lineHeight_4: number;
            export { lineHeight_4 as lineHeight };
            const strokeThickness_12: number;
            export { strokeThickness_12 as strokeThickness };
            const lineJoin_12: string;
            export { lineJoin_12 as lineJoin };
            const padding_12: number;
            export { padding_12 as padding };
            const fontWeight_7: string;
            export { fontWeight_7 as fontWeight };
        }
        namespace SmallMenuTextOrange4 {
            const fontName_13: string;
            export { fontName_13 as fontName };
            const fontSize_13: number;
            export { fontSize_13 as fontSize };
            const fill_13: number;
            export { fill_13 as fill };
            const strokeThickness_13: number;
            export { strokeThickness_13 as strokeThickness };
            const lineJoin_13: string;
            export { lineJoin_13 as lineJoin };
            const padding_13: number;
            export { padding_13 as padding };
            const fontStyle_5: string;
            export { fontStyle_5 as fontStyle };
            const fontWeight_8: string;
            export { fontWeight_8 as fontWeight };
        }
        namespace SmallMenuTextWhite2 {
            const fontName_14: string;
            export { fontName_14 as fontName };
            const fontSize_14: number;
            export { fontSize_14 as fontSize };
            const fill_14: number;
            export { fill_14 as fill };
            const strokeThickness_14: number;
            export { strokeThickness_14 as strokeThickness };
            const lineJoin_14: string;
            export { lineJoin_14 as lineJoin };
            const lineHeight_5: number;
            export { lineHeight_5 as lineHeight };
            const padding_14: number;
            export { padding_14 as padding };
        }
        namespace MediumMenuTextOrange {
            const fontName_15: string;
            export { fontName_15 as fontName };
            const fontSize_15: number;
            export { fontSize_15 as fontSize };
            const fill_15: number;
            export { fill_15 as fill };
            const strokeThickness_15: number;
            export { strokeThickness_15 as strokeThickness };
            const lineHeight_6: number;
            export { lineHeight_6 as lineHeight };
            const lineJoin_15: string;
            export { lineJoin_15 as lineJoin };
            const padding_15: number;
            export { padding_15 as padding };
            const fontStyle_6: string;
            export { fontStyle_6 as fontStyle };
            const fontWeight_9: string;
            export { fontWeight_9 as fontWeight };
        }
        namespace ServerListTitle {
            const fontName_16: string;
            export { fontName_16 as fontName };
            const fontSize_16: number;
            export { fontSize_16 as fontSize };
            const lineHeight_7: number;
            export { lineHeight_7 as lineHeight };
            const strokeThickness_16: number;
            export { strokeThickness_16 as strokeThickness };
            const fill_16: number;
            export { fill_16 as fill };
            const lineJoin_16: string;
            export { lineJoin_16 as lineJoin };
            const padding_16: number;
            export { padding_16 as padding };
        }
        namespace MenuTitle {
            const fontName_17: string;
            export { fontName_17 as fontName };
            const fontSize_17: number;
            export { fontSize_17 as fontSize };
            const fill_17: number;
            export { fill_17 as fill };
            const strokeThickness_17: number;
            export { strokeThickness_17 as strokeThickness };
            const lineJoin_17: string;
            export { lineJoin_17 as lineJoin };
            const padding_17: number;
            export { padding_17 as padding };
            const fontStyle_7: string;
            export { fontStyle_7 as fontStyle };
            const fontWeight_10: string;
            export { fontWeight_10 as fontWeight };
        }
        namespace SmallMenuTextYellow {
            const fontName_18: string;
            export { fontName_18 as fontName };
            const fontSize_18: number;
            export { fontSize_18 as fontSize };
            const lineHeight_8: number;
            export { lineHeight_8 as lineHeight };
            const fill_18: number;
            export { fill_18 as fill };
            const strokeThickness_18: number;
            export { strokeThickness_18 as strokeThickness };
            const lineJoin_18: string;
            export { lineJoin_18 as lineJoin };
            const padding_18: number;
            export { padding_18 as padding };
            const fontStyle_8: string;
            export { fontStyle_8 as fontStyle };
            const fontWeight_11: string;
            export { fontWeight_11 as fontWeight };
        }
        namespace SmallLabelText {
            const fontName_19: string;
            export { fontName_19 as fontName };
            const fontSize_19: number;
            export { fontSize_19 as fontSize };
            const fill_19: number;
            export { fill_19 as fill };
            const lineJoin_19: string;
            export { lineJoin_19 as lineJoin };
            const strokeThickness_19: number;
            export { strokeThickness_19 as strokeThickness };
            const padding_19: number;
            export { padding_19 as padding };
        }
        namespace MediumMenuTextOrange2 {
            const fontName_20: string;
            export { fontName_20 as fontName };
            const fontSize_20: number;
            export { fontSize_20 as fontSize };
            const fill_20: number;
            export { fill_20 as fill };
            const strokeThickness_20: number;
            export { strokeThickness_20 as strokeThickness };
            const lineHeight_9: number;
            export { lineHeight_9 as lineHeight };
            const lineJoin_20: string;
            export { lineJoin_20 as lineJoin };
            const padding_20: number;
            export { padding_20 as padding };
        }
        namespace SmallLabelText2 {
            export const fontFamily: string;
            const fontSize_21: number;
            export { fontSize_21 as fontSize };
            const fill_21: number;
            export { fill_21 as fill };
            const lineJoin_21: string;
            export { lineJoin_21 as lineJoin };
            const strokeThickness_21: number;
            export { strokeThickness_21 as strokeThickness };
            const padding_21: number;
            export { padding_21 as padding };
            const fontStyle_9: string;
            export { fontStyle_9 as fontStyle };
        }
        namespace SmallMenuTextOrange5 {
            const fontName_21: string;
            export { fontName_21 as fontName };
            const fontSize_22: number;
            export { fontSize_22 as fontSize };
            const lineHeight_10: number;
            export { lineHeight_10 as lineHeight };
            const fill_22: number;
            export { fill_22 as fill };
            const strokeThickness_22: number;
            export { strokeThickness_22 as strokeThickness };
            const lineJoin_22: string;
            export { lineJoin_22 as lineJoin };
            const padding_22: number;
            export { padding_22 as padding };
            const fontStyle_10: string;
            export { fontStyle_10 as fontStyle };
            const fontWeight_12: string;
            export { fontWeight_12 as fontWeight };
        }
        namespace LeaderboardOptionsText {
            const fontName_22: string;
            export { fontName_22 as fontName };
            const fontSize_23: number;
            export { fontSize_23 as fontSize };
            const fill_23: number;
            export { fill_23 as fill };
            const strokeThickness_23: number;
            export { strokeThickness_23 as strokeThickness };
            const lineJoin_23: string;
            export { lineJoin_23 as lineJoin };
            export const wordWrap: boolean;
            export const wordWrapWidth: number;
            const padding_23: number;
            export { padding_23 as padding };
        }
        namespace DropdownItemText {
            const fontFamily_1: string;
            export { fontFamily_1 as fontFamily };
            const fontSize_24: number;
            export { fontSize_24 as fontSize };
            const fill_24: number;
            export { fill_24 as fill };
            const lineJoin_24: string;
            export { lineJoin_24 as lineJoin };
            const strokeThickness_24: number;
            export { strokeThickness_24 as strokeThickness };
            export const align: string;
            const padding_24: number;
            export { padding_24 as padding };
        }
        namespace ButtonTitle {
            const fontName_23: string;
            export { fontName_23 as fontName };
            const fontSize_25: number;
            export { fontSize_25 as fontSize };
            const fill_25: number;
            export { fill_25 as fill };
            const lineJoin_25: string;
            export { lineJoin_25 as lineJoin };
            const strokeThickness_25: number;
            export { strokeThickness_25 as strokeThickness };
            const padding_25: number;
            export { padding_25 as padding };
            const fontStyle_11: string;
            export { fontStyle_11 as fontStyle };
            const fontWeight_13: string;
            export { fontWeight_13 as fontWeight };
        }
        namespace ChatMessage {
            const fontName_24: string;
            export { fontName_24 as fontName };
            const fontSize_26: number;
            export { fontSize_26 as fontSize };
            export const multiline: boolean;
            const align_1: string;
            export { align_1 as align };
        }
        namespace MenuData1 {
            const fontSize_27: number;
            export { fontSize_27 as fontSize };
            const fontFamily_2: string;
            export { fontFamily_2 as fontFamily };
            const fill_26: number;
            export { fill_26 as fill };
            const lineJoin_26: string;
            export { lineJoin_26 as lineJoin };
            const strokeThickness_26: number;
            export { strokeThickness_26 as strokeThickness };
            const align_2: string;
            export { align_2 as align };
            const padding_26: number;
            export { padding_26 as padding };
            const fontStyle_12: string;
            export { fontStyle_12 as fontStyle };
        }
        namespace InputFieldTitle1 {
            const fontName_25: string;
            export { fontName_25 as fontName };
            const fontSize_28: number;
            export { fontSize_28 as fontSize };
            const fill_27: number;
            export { fill_27 as fill };
            const lineHeight_11: number;
            export { lineHeight_11 as lineHeight };
            const strokeThickness_27: number;
            export { strokeThickness_27 as strokeThickness };
            const lineJoin_27: string;
            export { lineJoin_27 as lineJoin };
            const padding_27: number;
            export { padding_27 as padding };
        }
        namespace ActivityText {
            const fontName_26: string;
            export { fontName_26 as fontName };
            const fontSize_29: number;
            export { fontSize_29 as fontSize };
            const fill_28: number;
            export { fill_28 as fill };
            const strokeThickness_28: number;
            export { strokeThickness_28 as strokeThickness };
            const padding_28: number;
            export { padding_28 as padding };
        }
        namespace CreatedText {
            const fontName_27: string;
            export { fontName_27 as fontName };
            const fontSize_30: number;
            export { fontSize_30 as fontSize };
            const fill_29: number;
            export { fill_29 as fill };
            const strokeThickness_29: number;
            export { strokeThickness_29 as strokeThickness };
            const padding_29: number;
            export { padding_29 as padding };
        }
        namespace OverviewTitle {
            const fontName_28: string;
            export { fontName_28 as fontName };
            const fontSize_31: number;
            export { fontSize_31 as fontSize };
            const fill_30: number;
            export { fill_30 as fill };
            const strokeThickness_30: number;
            export { strokeThickness_30 as strokeThickness };
            const lineJoin_28: string;
            export { lineJoin_28 as lineJoin };
            const padding_30: number;
            export { padding_30 as padding };
            const fontStyle_13: string;
            export { fontStyle_13 as fontStyle };
            const fontWeight_14: string;
            export { fontWeight_14 as fontWeight };
        }
        namespace LeaderboardTitle {
            const fontName_29: string;
            export { fontName_29 as fontName };
            const fontSize_32: number;
            export { fontSize_32 as fontSize };
            const fill_31: number;
            export { fill_31 as fill };
            const strokeThickness_31: number;
            export { strokeThickness_31 as strokeThickness };
            const lineJoin_29: string;
            export { lineJoin_29 as lineJoin };
            const padding_31: number;
            export { padding_31 as padding };
            const fontStyle_14: string;
            export { fontStyle_14 as fontStyle };
            const fontWeight_15: string;
            export { fontWeight_15 as fontWeight };
        }
        namespace WeaponMenuTitle {
            const fontName_30: string;
            export { fontName_30 as fontName };
            const fontSize_33: number;
            export { fontSize_33 as fontSize };
            const fill_32: number;
            export { fill_32 as fill };
            const strokeThickness_32: number;
            export { strokeThickness_32 as strokeThickness };
            const lineJoin_30: string;
            export { lineJoin_30 as lineJoin };
            const padding_32: number;
            export { padding_32 as padding };
            const fontStyle_15: string;
            export { fontStyle_15 as fontStyle };
        }
        namespace InputText {
            const fontName_31: string;
            export { fontName_31 as fontName };
            const fontSize_34: number;
            export { fontSize_34 as fontSize };
            const fill_33: number;
            export { fill_33 as fill };
            const lineJoin_31: string;
            export { lineJoin_31 as lineJoin };
            const strokeThickness_33: number;
            export { strokeThickness_33 as strokeThickness };
            const align_3: string;
            export { align_3 as align };
            const padding_33: number;
            export { padding_33 as padding };
        }
        namespace CustomizationItemTextSmall {
            const fontName_32: string;
            export { fontName_32 as fontName };
            const fontSize_35: number;
            export { fontSize_35 as fontSize };
            const fill_34: number;
            export { fill_34 as fill };
            const lineJoin_32: string;
            export { lineJoin_32 as lineJoin };
            const strokeThickness_34: number;
            export { strokeThickness_34 as strokeThickness };
            const padding_34: number;
            export { padding_34 as padding };
        }
        namespace SmallLabelText3 {
            const fontName_33: string;
            export { fontName_33 as fontName };
            const fontSize_36: number;
            export { fontSize_36 as fontSize };
            const fill_35: number;
            export { fill_35 as fill };
            const lineJoin_33: string;
            export { lineJoin_33 as lineJoin };
            const strokeThickness_35: number;
            export { strokeThickness_35 as strokeThickness };
            const padding_35: number;
            export { padding_35 as padding };
        }
        namespace VSText {
            const fontName_34: string;
            export { fontName_34 as fontName };
            const fontSize_37: number;
            export { fontSize_37 as fontSize };
            const lineHeight_12: number;
            export { lineHeight_12 as lineHeight };
            const fill_36: number;
            export { fill_36 as fill };
            const strokeThickness_36: number;
            export { strokeThickness_36 as strokeThickness };
            const lineJoin_34: string;
            export { lineJoin_34 as lineJoin };
            const padding_36: number;
            export { padding_36 as padding };
            const fontStyle_16: string;
            export { fontStyle_16 as fontStyle };
            const fontWeight_16: string;
            export { fontWeight_16 as fontWeight };
        }
        namespace VSLoadingText {
            const fontName_35: string;
            export { fontName_35 as fontName };
            const fontSize_38: number;
            export { fontSize_38 as fontSize };
            const lineHeight_13: number;
            export { lineHeight_13 as lineHeight };
            const fill_37: number;
            export { fill_37 as fill };
            const strokeThickness_37: number;
            export { strokeThickness_37 as strokeThickness };
            const lineJoin_35: string;
            export { lineJoin_35 as lineJoin };
            const padding_37: number;
            export { padding_37 as padding };
            const fontStyle_17: string;
            export { fontStyle_17 as fontStyle };
            const fontWeight_17: string;
            export { fontWeight_17 as fontWeight };
        }
        namespace VSRulesText {
            const fontName_36: string;
            export { fontName_36 as fontName };
            const fontSize_39: number;
            export { fontSize_39 as fontSize };
            const lineHeight_14: number;
            export { lineHeight_14 as lineHeight };
            const fill_38: number;
            export { fill_38 as fill };
            const strokeThickness_38: number;
            export { strokeThickness_38 as strokeThickness };
            const lineJoin_36: string;
            export { lineJoin_36 as lineJoin };
            const padding_38: number;
            export { padding_38 as padding };
            const fontWeight_18: string;
            export { fontWeight_18 as fontWeight };
        }
        namespace VSRulesTextItalic {
            const fontName_37: string;
            export { fontName_37 as fontName };
            const fontSize_40: number;
            export { fontSize_40 as fontSize };
            const lineHeight_15: number;
            export { lineHeight_15 as lineHeight };
            const fill_39: number;
            export { fill_39 as fill };
            const strokeThickness_39: number;
            export { strokeThickness_39 as strokeThickness };
            const lineJoin_37: string;
            export { lineJoin_37 as lineJoin };
            const padding_39: number;
            export { padding_39 as padding };
            const fontWeight_19: string;
            export { fontWeight_19 as fontWeight };
            const fontStyle_18: string;
            export { fontStyle_18 as fontStyle };
        }
        namespace VSRulesDescText {
            const fontName_38: string;
            export { fontName_38 as fontName };
            const fontSize_41: number;
            export { fontSize_41 as fontSize };
            const fill_40: number;
            export { fill_40 as fill };
            const strokeThickness_40: number;
            export { strokeThickness_40 as strokeThickness };
            const lineJoin_38: string;
            export { lineJoin_38 as lineJoin };
            const lineHeight_16: number;
            export { lineHeight_16 as lineHeight };
            const padding_40: number;
            export { padding_40 as padding };
            const fontStyle_19: string;
            export { fontStyle_19 as fontStyle };
            const align_4: string;
            export { align_4 as align };
        }
        namespace VSStartingText {
            const fontName_39: string;
            export { fontName_39 as fontName };
            const fontSize_42: number;
            export { fontSize_42 as fontSize };
            const lineHeight_17: number;
            export { lineHeight_17 as lineHeight };
            const fill_41: number;
            export { fill_41 as fill };
            const strokeThickness_41: number;
            export { strokeThickness_41 as strokeThickness };
            const lineJoin_39: string;
            export { lineJoin_39 as lineJoin };
            const padding_41: number;
            export { padding_41 as padding };
            const fontStyle_20: string;
            export { fontStyle_20 as fontStyle };
            const fontWeight_20: string;
            export { fontWeight_20 as fontWeight };
        }
        namespace VSPlayerLabelText {
            const fontName_40: string;
            export { fontName_40 as fontName };
            const fontSize_43: number;
            export { fontSize_43 as fontSize };
            const lineHeight_18: number;
            export { lineHeight_18 as lineHeight };
            const fill_42: number;
            export { fill_42 as fill };
            const strokeThickness_42: number;
            export { strokeThickness_42 as strokeThickness };
            const lineJoin_40: string;
            export { lineJoin_40 as lineJoin };
            const padding_42: number;
            export { padding_42 as padding };
            const fontStyle_21: string;
            export { fontStyle_21 as fontStyle };
            const fontWeight_21: string;
            export { fontWeight_21 as fontWeight };
        }
        namespace VSCounterText {
            const fontName_41: string;
            export { fontName_41 as fontName };
            const fontSize_44: number;
            export { fontSize_44 as fontSize };
            const lineHeight_19: number;
            export { lineHeight_19 as lineHeight };
            const fill_43: number;
            export { fill_43 as fill };
            const strokeThickness_43: number;
            export { strokeThickness_43 as strokeThickness };
            const lineJoin_41: string;
            export { lineJoin_41 as lineJoin };
            const padding_43: number;
            export { padding_43 as padding };
            const fontStyle_22: string;
            export { fontStyle_22 as fontStyle };
            const fontWeight_22: string;
            export { fontWeight_22 as fontWeight };
        }
        namespace ReadyBarText {
            const fontName_42: string;
            export { fontName_42 as fontName };
            const fontSize_45: number;
            export { fontSize_45 as fontSize };
            const lineHeight_20: number;
            export { lineHeight_20 as lineHeight };
            const fill_44: number;
            export { fill_44 as fill };
            const strokeThickness_44: number;
            export { strokeThickness_44 as strokeThickness };
            const lineJoin_42: string;
            export { lineJoin_42 as lineJoin };
            const padding_44: number;
            export { padding_44 as padding };
            const fontStyle_23: string;
            export { fontStyle_23 as fontStyle };
            const fontWeight_23: string;
            export { fontWeight_23 as fontWeight };
        }
        namespace HudTitleBarText {
            const fontName_43: string;
            export { fontName_43 as fontName };
            const fontSize_46: number;
            export { fontSize_46 as fontSize };
            const lineHeight_21: number;
            export { lineHeight_21 as lineHeight };
            const fill_45: number;
            export { fill_45 as fill };
            const strokeThickness_45: number;
            export { strokeThickness_45 as strokeThickness };
            const lineJoin_43: string;
            export { lineJoin_43 as lineJoin };
            const padding_45: number;
            export { padding_45 as padding };
            const fontStyle_24: string;
            export { fontStyle_24 as fontStyle };
            const fontWeight_24: string;
            export { fontWeight_24 as fontWeight };
        }
        namespace HudMediumTextWhite {
            const fontName_44: string;
            export { fontName_44 as fontName };
            const fontSize_47: number;
            export { fontSize_47 as fontSize };
            const fill_46: number;
            export { fill_46 as fill };
            const strokeThickness_46: number;
            export { strokeThickness_46 as strokeThickness };
            const lineJoin_44: string;
            export { lineJoin_44 as lineJoin };
            const lineHeight_22: number;
            export { lineHeight_22 as lineHeight };
            const padding_46: number;
            export { padding_46 as padding };
        }
        namespace SmallLabelText4 {
            const fontName_45: string;
            export { fontName_45 as fontName };
            const fontSize_48: number;
            export { fontSize_48 as fontSize };
            const fill_47: number;
            export { fill_47 as fill };
            const lineJoin_45: string;
            export { lineJoin_45 as lineJoin };
            const strokeThickness_47: number;
            export { strokeThickness_47 as strokeThickness };
            const padding_47: number;
            export { padding_47 as padding };
            const fontStyle_25: string;
            export { fontStyle_25 as fontStyle };
        }
        namespace HudMediumTextWhite2 {
            const fontName_46: string;
            export { fontName_46 as fontName };
            const fontSize_49: number;
            export { fontSize_49 as fontSize };
            const fill_48: number;
            export { fill_48 as fill };
            const strokeThickness_48: number;
            export { strokeThickness_48 as strokeThickness };
            const lineJoin_46: string;
            export { lineJoin_46 as lineJoin };
            const lineHeight_23: number;
            export { lineHeight_23 as lineHeight };
            const padding_48: number;
            export { padding_48 as padding };
            const fontStyle_26: string;
            export { fontStyle_26 as fontStyle };
            const fontWeight_25: string;
            export { fontWeight_25 as fontWeight };
        }
        namespace HudComboText {
            const fontName_47: string;
            export { fontName_47 as fontName };
            const fontSize_50: number;
            export { fontSize_50 as fontSize };
            const fill_49: number;
            export { fill_49 as fill };
            const strokeThickness_49: number;
            export { strokeThickness_49 as strokeThickness };
            const lineJoin_47: string;
            export { lineJoin_47 as lineJoin };
            const lineHeight_24: number;
            export { lineHeight_24 as lineHeight };
            const padding_49: number;
            export { padding_49 as padding };
            const fontStyle_27: string;
            export { fontStyle_27 as fontStyle };
            const fontWeight_26: string;
            export { fontWeight_26 as fontWeight };
        }
        namespace ConsoleText {
            const fontName_48: string;
            export { fontName_48 as fontName };
            const fontSize_51: number;
            export { fontSize_51 as fontSize };
            const fill_50: number;
            export { fill_50 as fill };
            const strokeThickness_50: number;
            export { strokeThickness_50 as strokeThickness };
            const lineJoin_48: string;
            export { lineJoin_48 as lineJoin };
            const lineHeight_25: number;
            export { lineHeight_25 as lineHeight };
            const padding_50: number;
            export { padding_50 as padding };
            const fontStyle_28: string;
            export { fontStyle_28 as fontStyle };
            const align_5: string;
            export { align_5 as align };
        }
        namespace ActionTableText {
            const fontName_49: string;
            export { fontName_49 as fontName };
            const fontSize_52: number;
            export { fontSize_52 as fontSize };
            const fill_51: number;
            export { fill_51 as fill };
            const strokeThickness_51: number;
            export { strokeThickness_51 as strokeThickness };
            const lineJoin_49: string;
            export { lineJoin_49 as lineJoin };
            const lineHeight_26: number;
            export { lineHeight_26 as lineHeight };
            const padding_51: number;
            export { padding_51 as padding };
            const fontStyle_29: string;
            export { fontStyle_29 as fontStyle };
            const align_6: string;
            export { align_6 as align };
        }
        namespace AmmoBarText {
            const fontName_50: string;
            export { fontName_50 as fontName };
            const fontSize_53: number;
            export { fontSize_53 as fontSize };
            const fill_52: number;
            export { fill_52 as fill };
            const strokeThickness_52: number;
            export { strokeThickness_52 as strokeThickness };
            const lineJoin_50: string;
            export { lineJoin_50 as lineJoin };
            const lineHeight_27: number;
            export { lineHeight_27 as lineHeight };
            const padding_52: number;
            export { padding_52 as padding };
            const fontStyle_30: string;
            export { fontStyle_30 as fontStyle };
            const align_7: string;
            export { align_7 as align };
        }
        namespace InputFieldText {
            const fontName_51: string;
            export { fontName_51 as fontName };
            const fontSize_54: number;
            export { fontSize_54 as fontSize };
            const fill_53: number;
            export { fill_53 as fill };
            const strokeThickness_53: number;
            export { strokeThickness_53 as strokeThickness };
            const lineJoin_51: string;
            export { lineJoin_51 as lineJoin };
            const lineHeight_28: number;
            export { lineHeight_28 as lineHeight };
            const padding_53: number;
            export { padding_53 as padding };
            const fontStyle_31: string;
            export { fontStyle_31 as fontStyle };
            const align_8: string;
            export { align_8 as align };
        }
        namespace WeaponItem {
            const fontName_52: string;
            export { fontName_52 as fontName };
            const fontSize_55: number;
            export { fontSize_55 as fontSize };
            const fill_54: number;
            export { fill_54 as fill };
            const strokeThickness_54: number;
            export { strokeThickness_54 as strokeThickness };
            const lineJoin_52: string;
            export { lineJoin_52 as lineJoin };
            const fontStyle_32: string;
            export { fontStyle_32 as fontStyle };
        }
        namespace ChatBubbleText {
            const fontName_53: string;
            export { fontName_53 as fontName };
            const fontSize_56: number;
            export { fontSize_56 as fontSize };
            const fill_55: number;
            export { fill_55 as fill };
            const strokeThickness_55: number;
            export { strokeThickness_55 as strokeThickness };
            const lineJoin_53: string;
            export { lineJoin_53 as lineJoin };
            const lineHeight_29: number;
            export { lineHeight_29 as lineHeight };
            const padding_54: number;
            export { padding_54 as padding };
            const fontStyle_33: string;
            export { fontStyle_33 as fontStyle };
            const align_9: string;
            export { align_9 as align };
        }
        namespace SocialDropdownText {
            const fontName_54: string;
            export { fontName_54 as fontName };
            const fontSize_57: number;
            export { fontSize_57 as fontSize };
            const fill_56: number;
            export { fill_56 as fill };
            const strokeThickness_56: number;
            export { strokeThickness_56 as strokeThickness };
            const padding_55: number;
            export { padding_55 as padding };
            const fontStyle_34: string;
            export { fontStyle_34 as fontStyle };
            const fontWeight_27: string;
            export { fontWeight_27 as fontWeight };
        }
        namespace SocialMenuItem {
            const fontName_55: string;
            export { fontName_55 as fontName };
            const fontSize_58: number;
            export { fontSize_58 as fontSize };
            const fill_57: number;
            export { fill_57 as fill };
            const strokeThickness_57: number;
            export { strokeThickness_57 as strokeThickness };
            const padding_56: number;
            export { padding_56 as padding };
            const fontStyle_35: string;
            export { fontStyle_35 as fontStyle };
            const fontWeight_28: string;
            export { fontWeight_28 as fontWeight };
        }
        namespace RankingItem {
            const fontName_56: string;
            export { fontName_56 as fontName };
            const fontSize_59: number;
            export { fontSize_59 as fontSize };
            const fill_58: number;
            export { fill_58 as fill };
            const strokeThickness_58: number;
            export { strokeThickness_58 as strokeThickness };
            const padding_57: number;
            export { padding_57 as padding };
            const fontStyle_36: string;
            export { fontStyle_36 as fontStyle };
        }
        namespace ProfileTabText {
            const fontName_57: string;
            export { fontName_57 as fontName };
            const fontSize_60: number;
            export { fontSize_60 as fontSize };
            const fill_59: number;
            export { fill_59 as fill };
            const strokeThickness_59: number;
            export { strokeThickness_59 as strokeThickness };
            const lineJoin_54: string;
            export { lineJoin_54 as lineJoin };
            const fontWeight_29: string;
            export { fontWeight_29 as fontWeight };
            const fontStyle_37: string;
            export { fontStyle_37 as fontStyle };
        }
        namespace CustomizationItem {
            const fontName_58: string;
            export { fontName_58 as fontName };
            const fontSize_61: number;
            export { fontSize_61 as fontSize };
            const fill_60: number;
            export { fill_60 as fill };
            const strokeThickness_60: number;
            export { strokeThickness_60 as strokeThickness };
            const padding_58: number;
            export { padding_58 as padding };
            const fontWeight_30: string;
            export { fontWeight_30 as fontWeight };
            const fontStyle_38: string;
            export { fontStyle_38 as fontStyle };
        }
        namespace ClanTitle {
            const fontName_59: string;
            export { fontName_59 as fontName };
            const fontSize_62: number;
            export { fontSize_62 as fontSize };
            const lineHeight_30: number;
            export { lineHeight_30 as lineHeight };
            const fill_61: number;
            export { fill_61 as fill };
            const strokeThickness_61: number;
            export { strokeThickness_61 as strokeThickness };
            const lineJoin_55: string;
            export { lineJoin_55 as lineJoin };
            const padding_59: number;
            export { padding_59 as padding };
            const fontStyle_39: string;
            export { fontStyle_39 as fontStyle };
            const fontWeight_31: string;
            export { fontWeight_31 as fontWeight };
        }
        namespace PVPResultTitle {
            const fontName_60: string;
            export { fontName_60 as fontName };
            const fontSize_63: number;
            export { fontSize_63 as fontSize };
            const lineHeight_31: number;
            export { lineHeight_31 as lineHeight };
            const fill_62: number;
            export { fill_62 as fill };
            const strokeThickness_62: number;
            export { strokeThickness_62 as strokeThickness };
            const lineJoin_56: string;
            export { lineJoin_56 as lineJoin };
            const padding_60: number;
            export { padding_60 as padding };
            const fontWeight_32: string;
            export { fontWeight_32 as fontWeight };
        }
        namespace PVPResultTitle2 {
            const fontName_61: string;
            export { fontName_61 as fontName };
            const fontSize_64: number;
            export { fontSize_64 as fontSize };
            const lineHeight_32: number;
            export { lineHeight_32 as lineHeight };
            const fill_63: number;
            export { fill_63 as fill };
            const strokeThickness_63: number;
            export { strokeThickness_63 as strokeThickness };
            const lineJoin_57: string;
            export { lineJoin_57 as lineJoin };
            const padding_61: number;
            export { padding_61 as padding };
            const fontWeight_33: string;
            export { fontWeight_33 as fontWeight };
        }
        namespace PVPResultData {
            const fontName_62: string;
            export { fontName_62 as fontName };
            const fontSize_65: number;
            export { fontSize_65 as fontSize };
            const lineHeight_33: number;
            export { lineHeight_33 as lineHeight };
            const fill_64: number;
            export { fill_64 as fill };
            const strokeThickness_64: number;
            export { strokeThickness_64 as strokeThickness };
            const lineJoin_58: string;
            export { lineJoin_58 as lineJoin };
            const padding_62: number;
            export { padding_62 as padding };
            const fontStyle_40: string;
            export { fontStyle_40 as fontStyle };
            const fontWeight_34: string;
            export { fontWeight_34 as fontWeight };
        }
        namespace PVPResultDataRank {
            const fontName_63: string;
            export { fontName_63 as fontName };
            const fontSize_66: number;
            export { fontSize_66 as fontSize };
            const lineHeight_34: number;
            export { lineHeight_34 as lineHeight };
            const fill_65: number;
            export { fill_65 as fill };
            const strokeThickness_65: number;
            export { strokeThickness_65 as strokeThickness };
            const lineJoin_59: string;
            export { lineJoin_59 as lineJoin };
            const align_10: string;
            export { align_10 as align };
            const padding_63: number;
            export { padding_63 as padding };
            const fontStyle_41: string;
            export { fontStyle_41 as fontStyle };
            const fontWeight_35: string;
            export { fontWeight_35 as fontWeight };
        }
        namespace PVPResultDataPromo {
            const fontName_64: string;
            export { fontName_64 as fontName };
            const fontSize_67: number;
            export { fontSize_67 as fontSize };
            const lineHeight_35: number;
            export { lineHeight_35 as lineHeight };
            const fill_66: number;
            export { fill_66 as fill };
            const strokeThickness_66: number;
            export { strokeThickness_66 as strokeThickness };
            const lineJoin_60: string;
            export { lineJoin_60 as lineJoin };
            const align_11: string;
            export { align_11 as align };
            const padding_64: number;
            export { padding_64 as padding };
            const fontStyle_42: string;
            export { fontStyle_42 as fontStyle };
            const fontWeight_36: string;
            export { fontWeight_36 as fontWeight };
        }
        namespace PVPVSTitle {
            const fontName_65: string;
            export { fontName_65 as fontName };
            const fontSize_68: number;
            export { fontSize_68 as fontSize };
            const lineHeight_36: number;
            export { lineHeight_36 as lineHeight };
            const fill_67: number;
            export { fill_67 as fill };
            const strokeThickness_67: number;
            export { strokeThickness_67 as strokeThickness };
            const align_12: string;
            export { align_12 as align };
            const lineJoin_61: string;
            export { lineJoin_61 as lineJoin };
            const padding_65: number;
            export { padding_65 as padding };
            const fontWeight_37: string;
            export { fontWeight_37 as fontWeight };
        }
        namespace GameoverCountdown {
            const fontName_66: string;
            export { fontName_66 as fontName };
            const fontSize_69: number;
            export { fontSize_69 as fontSize };
            const align_13: string;
            export { align_13 as align };
            const fill_68: number;
            export { fill_68 as fill };
            const strokeThickness_68: number;
            export { strokeThickness_68 as strokeThickness };
            const fontStyle_43: string;
            export { fontStyle_43 as fontStyle };
            const fontWeight_38: string;
            export { fontWeight_38 as fontWeight };
            const padding_66: number;
            export { padding_66 as padding };
        }
    }
    export class PVPClient extends EventDispatcher {
        connectionTimeout: number;
        socket: WebSocket;
        allowNextAttempt: boolean;
        server: {
            port: number;
            domain: string;
            secure: boolean;
        };
        setServer(a: any): void;
        connect(): boolean;
        disconnect(): void;
        onOpen(a: any): void;
        onError(a: any): void;
        onMessage(a: any): void;
        onClose(a: any): void;
        emit(a: any): void;
        isConnected(): boolean;
    }
    export namespace PVPClient {
        export function compress(a: any): Uint8Array;
        export function decompress(a: any): any;
        export function unpackGameData(a: any): {
            t: string;
            d: any;
        };
        const SendBuffer_1: Uint8Array;
        export { SendBuffer_1 as SendBuffer };
        const CONNECT_3: string;
        export { CONNECT_3 as CONNECT };
        const DISCONNECT_4: string;
        export { DISCONNECT_4 as DISCONNECT };
        const AUTH_FAILED_1: string;
        export { AUTH_FAILED_1 as AUTH_FAILED };
        const SERVER_FULL_1: string;
        export { SERVER_FULL_1 as SERVER_FULL };
        const CONNECTION_ERROR_1: string;
        export { CONNECTION_ERROR_1 as CONNECTION_ERROR };
        const CODE_AUTH_FAILED_1: number;
        export { CODE_AUTH_FAILED_1 as CODE_AUTH_FAILED };
        const CODE_MAX_CLIENTS_1: number;
        export { CODE_MAX_CLIENTS_1 as CODE_MAX_CLIENTS };
        const CODE_DUPLICATE_CLIENT_1: number;
        export { CODE_DUPLICATE_CLIENT_1 as CODE_DUPLICATE_CLIENT };
        export const MATCH: number;
        export const MATCH_REGISTERED: number;
        export const MATCH_CREATED: number;
        export const MATCH_ERROR: number;
        export const MATCH_SEARCH: number;
        export const MATCH_CANCEL: number;
    }
    export class App extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        credential: {};
        servers: any[];
        status: {};
        stage: PIXI.Container<PIXI.DisplayObject>;
        pixi: PIXI.Application<PIXI.ICanvas>;
        settings: {};
        gameplayStopped: boolean;
        threadUpdate: boolean;
        hasResized: boolean;
        resizeOnLoad: boolean;
        matchStarted: boolean;
        pvpClient: PVPClient;
        gameClient: Client;
        authenticated: boolean;
        user: User;
        game: Game;
        background: any;
        adLoaderBackground: PIXI.Sprite;
        onConnectRetryMode: any;
        gameOutputListener: any;
        gameBinInputListener: (b: any) => void;
        gameInputListener: (b: any) => void;
        onMouseDownListener: any;
        onMouseMoveListener: any;
        inCommercialBreak: boolean;
        startTime: number;
        autoJoinGame: {
            name: any;
            password: any;
        };
        autoJoinOnCreate: boolean;
        checkInterval: number;
        lastUpdateTime: number;
        hasLoaded: boolean;
        redrawTimeout: any;
        adFaderInterval: any;
        adLoaderTimeout: number;
        stepCount: number;
        stepCallback: (a: any) => void;
        totalFrameTime: any[];
        logicFrameTime: any[];
        renderFrameTime: any[];
        lastServerReload: number;
        lastBannerReload: number;
        adElement: HTMLElement;
        load(): Promise<void>;
        proceed(): Promise<void>;
        view: PIXI.ICanvas;
        interpreter: any;
        fetchGuestCredential(a: any): Promise<any>;
        start(): Promise<void>;
        continueButton: PIXI.Sprite;
        continueButtonText: PIXI.Text;
        gradient: any;
        sky: PIXI.Graphics;
        pokiLogo: PIXI.Sprite;
        youtubeLogo: PIXI.Sprite;
        twitterLogo: PIXI.Sprite;
        redditLogo: PIXI.Sprite;
        onMouseDown(): void;
        onMouseMove(a: any): void;
        showMenu(): void;
        menu: Menu;
        setFocus(a: any): void;
        onConnect(): void;
        onDisconnect(): Promise<void>;
        onStep(a: any): void;
        onStepDev(a: any): void;
        onRequestChooseServer(a: any, b: any): Promise<void>;
        onLayerJoinServer(a: any): void;
        applyServerSettings(a: any): Promise<void>;
        onLayerCreateServer(a: any): void;
        onLayerRenameCompleted(): void;
        onJoystickMoveState(a: any): void;
        onJoystickTargetState(a: any): void;
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
        adPlaying: boolean;
        onCmdConnect(): void;
        onCmdDisconnect(): void;
        onCmdUnlink(): void;
        onCmdInvalid(a: any): void;
        onDisplayAdButton(): void;
        onTriggerVideoAd(): void;
        drawBackground(): void;
        onResize(a?: boolean): void;
        onLayerDisconnect(): void;
        onLayerShowSettings(): void;
        onLayerHideSettings(): void;
        onEscapeMenuAccess(): void;
        onRewardsClaimed(): void;
        onLayerMute(a: any): void;
        onLayerDisplayHelp(): void;
        onLayerHideMenu(): void;
        onLayerShowMenu(): void;
        onLayerJoinGame(a: any, b: any, c: any): void;
        onGuestNameChange(a: any): Promise<void>;
        onLayerUpdateCredential(a: any, b: any): Promise<void>;
        adStarted(): void;
        adFinished(): void;
        adError(): void;
        muteIfRequired(a: any): void;
    }
    export namespace App {
        export function UpdatePreloader(a: any): void;
        export function RemovePreloader(): void;
        export function GenerateTexturesFromSheet(a: any): void;
        export const CrazySDK: any;
        export const PokiSDK: any;
        export const WhiteLabel_NONE: string;
        export const WhiteLabel_CG: string;
        export const WhiteLabel_POKI: string;
        export const WhiteLabel_POKI_MAIN: string;
        export { whitelabel as Domain };
        import WhiteLabel = WhiteLabel_POKI_MAIN;
        export { WhiteLabel };
        export const IsMobile: any;
        export const CMD_CONNECT: string;
        export const CMD_DISCONNECT: string;
        export const CMD_UNLINK: string;
        export const CheckIntervalRate: number;
        export const ServerPreference: string;
        export const ModePreference: string;
        export const Renderer: any;
        export const Stage: any;
        export const Console: any;
        export const Stats: any;
        export const Layer: Layer;
        export const ClientVersion: string;
        export const MinVersion: string;
        export const HasFocus: boolean;
        export const Scale: number;
        export const StartTime: number;
        import Time = StartTime;
        export { Time };
        export const FrameTime: number;
        export const LastRewardCheck: number;
        export const HadRewards: boolean;
        export const ShowRewardedAd: boolean;
        export const AdblockDetected: boolean;
        export const ShowRewardedShopAd: boolean;
        export const WindowResized: boolean;
        export const HelpDisplayed: boolean;
        export const DisplayMatchResultID: number;
        export const ReferenceWidth: number;
        export const ReferenceHeight: number;
        export const DevicePixelRatio: number;
        export const ClientWidth: number;
        export const ClientHeight: number;
        export const ConnectedServer: {};
        export const Servers: any[];
        export const SelectedServer: any;
        export const SelectedMode: any;
        export const TransformedMouseX: number;
        export const TransformedMouseY: number;
        export const GameClient: {};
        export const PVPClient: {};
        export const AssetTree: {};
        export const Assets: {};
        export const UIVisible: boolean;
        export const FieldHasFocus: boolean;
        export const Autogen: boolean;
        export const FirstRun: boolean;
        export const Credential: {};
        export const DisplayFrameTime: boolean;
        export function GenerateGuestName(a: any): any;
        export namespace Customization {
            const HAIR: any[];
            const TORSO: any[];
            const ORB: any[];
            const FACE: any[];
            const BELT: any[];
            const ARMLEFTLOWER: any[];
            const ARMLEFTUPPER: any[];
            const ARMRIGHTLOWER: any[];
            const ARMRIGHTUPPER: any[];
            const LEGLEFTLOWER: any[];
            const LEGLEFTUPPER: any[];
            const LEGRIGHTLOWER: any[];
            const LEGRIGHTUPPER: any[];
            const EXTRA: any[];
        }
        export const TimeToColourMap: number[];
        export namespace ContinentMap {
            const Europe: string;
            const America: string;
            const Asia: string;
            const Africa: string;
        }
        export function GetNearestGeoServer(a: any): any;
        export const RESOURCE_FOLDER: string;
        export namespace RESOURCES {
            const combined: {
                id: string;
                file: string;
            }[];
            const seamless: {
                id: string;
                file: string;
            }[];
            const fonts: {
                id: string;
                file: string;
            }[];
        }
        export const DefaultCredential: any;
        export const DefaultServers: any;
    }
    import * as PIXI from "pixi.js";
    function User(): void;
    class User {
        name: string;
        skill: number;
        premium: boolean;
        admin: boolean;
        team: number;
        customization: {
            hair: string;
            energy: string;
        };
    }
    class Menu extends PIXI.Container<PIXI.DisplayObject> {
        constructor();
        container: PIXI.Container<PIXI.DisplayObject>;
        active: boolean;
        updating: boolean;
        guestMode: boolean;
        backgroundImage: PIXI.Graphics;
        backgroundGraphics: PIXI.Graphics;
        settingsBackgroundGraphics: PIXI.Graphics;
        settingsPanel: any;
        backgroundNewsGraphics: PIXI.Graphics;
        snowman: PIXI.Sprite;
        poseImage: PIXI.Sprite;
        darkNewsBackground: PIXI.Graphics;
        infoText: PIXI.Text;
        infoTextDisc: PIXI.Text;
        newsIcon: PIXI.Sprite;
        newsText: PIXI.Text;
        wikiIcon: PIXI.Sprite;
        wikiText: PIXI.Text;
        versionText: PIXI.Text;
        newsDescription: PIXI.Text;
        icon: PIXI.Sprite;
        contactInfo: PIXI.Text;
        gameStatsTitle: PIXI.Text;
        gameStats: PIXI.Text;
        newsFlash: PIXI.Text;
        registerHintTitle: PIXI.Text;
        visualizer: Visualizer;
        modeTitle: PIXI.BitmapText;
        rewardButton: PIXI.Sprite;
        treasureIcon: PIXI.Sprite;
        menuShuriken: PIXI.Sprite;
        serverListButton: Button;
        serverCreateButton: Button;
        regionData: PIXI.Text;
        modeData: PIXI.Text;
        nameTitle: PIXI.Text;
        levelIcon: PIXI.Sprite;
        skillIcon: PIXI.Sprite;
        nameField: InputField;
        skillText: PIXI.Text;
        clanText: PIXI.Text;
        joinButton: Button;
        pvpButton: Button;
        modeContainer: PIXI.Container<PIXI.DisplayObject>;
        serverContainer: PIXI.Container<PIXI.DisplayObject>;
        serverList: any;
        modeList: any;
        particleContainer: ParticleContainer;
        showSettings(): void;
        hideSettings(): void;
        setServerHeadline(a: any): void;
        setServerStatus(a: any): void;
        setServerData(a: any): void;
        setLobbyDataText(): void;
        selectServer(a: any): void;
        onServerListButtonReleased(): void;
        onServerCreateButtonReleased(): void;
        setPlayerData(a: any): void;
        init(): void;
        showRewardButton(): void;
        hideRewardButton(): void;
        checkRewards(a?: boolean): Promise<void>;
        setMode(a: any, b: any): void;
        mode: any;
        onJoinButtonReleased(): void;
        onMainMenuButtonReleased(): void;
        onModeButtonReleased(a: any): void;
        onServerButtonReleased(a: any): void;
        resize(): void;
        hideItems(): void;
        showItems(): void;
        onNamefieldFocus(a: any): void;
        step(): void;
    }
    namespace Menu {
        export const JOIN_GAME_MODE: string;
        const JOIN_SERVER_1: string;
        export { JOIN_SERVER_1 as JOIN_SERVER };
        export const MODE_MAIN: string;
        export const GUEST_NAME_CHANGE: string;
        const PROFILE_ACCESS_1: string;
        export { PROFILE_ACCESS_1 as PROFILE_ACCESS };
        const RENAME_ACCESS_1: string;
        export { RENAME_ACCESS_1 as RENAME_ACCESS };
        const CUSTOMIZATION_ACCESS_1: string;
        export { CUSTOMIZATION_ACCESS_1 as CUSTOMIZATION_ACCESS };
        export const SERVER_LISTING_ACCESS: string;
        export const SERVER_CREATION_ACCESS: string;
        const REWARDS_ACCESS_1: string;
        export { REWARDS_ACCESS_1 as REWARDS_ACCESS };
        const NEWS_ACCESS_1: string;
        export { NEWS_ACCESS_1 as NEWS_ACCESS };
        const PVP_ACCESS_1: string;
        export { PVP_ACCESS_1 as PVP_ACCESS };
    }
    let whitelabel: string | boolean;
    export { };
}
