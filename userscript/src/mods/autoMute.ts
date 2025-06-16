import { Game, Label } from "lib";
import { app } from "typings";
import Mod from "../api/Mod";
import Ninja, { NinjaEvents } from "../api/Ninja";
import config from "../config";

export class AutoMuteMod extends Mod<{
  muteBelowEnabled: boolean;
  muteBelowLevel: number;
  enableLogs: boolean;
  enableRemoveBubble: boolean;
  ignoreDuels: boolean;
  doNotMuteSpectators: boolean;
  permanentMuteList: string[];
}> {
  private muteEnabled: boolean = true;
  private levelLimit: number = 15;
  private enableLogs: boolean = true;
  private enableRemoveBubble: boolean = true;
  private ignoreDuels: boolean = false;
  private doNotMuteSpectators: boolean = false;
  private permanentMuteList: string[] = [];
  private originalDisplayChatBubble: (() => void) | null = null;
  private skipPlayersJoinedCheck: boolean = false;

  private onPlayerJoinedBound = this.onPlayerJoined.bind(this);
  private onManualMuteBound = this.onManualMute.bind(this);
  private onManualUnmuteBound = this.onManualUnmute.bind(this);
  private onGameStartBound = this.onGameStart.bind(this);
  private onGameplayStoppedBound = this.onGameplayStopped.bind(this);

  constructor() {
    super({
      id: "AutoMute",
      name: "Auto Mute",
      description:
        "Constantly mutes players you mute. Can be configured to mute all players below a set level and remove chat bubble above muted players.",
      author: "Lumen",
      icon: "mute_icon",
      noGuests: true,
    });

    this.implementConfig(
      {
        muteBelowEnabled: true,
        muteBelowLevel: 15,
        enableLogs: true,
        enableRemoveBubble: true,
        ignoreDuels: false,
        doNotMuteSpectators: false,
        permanentMuteList: [],
      },
      {
        muteBelowEnabled: "Enable muting players with level not higher than Level limit",
        muteBelowLevel: "Level limit",
        enableLogs: "Enable muting logs in chat",
        enableRemoveBubble: "Enable removing chat bubble above muted players",
        ignoreDuels: "Do not mute anyone in 1v1",
        doNotMuteSpectators: "Do not mute spectators",
        permanentMuteList: {
          name: "Permanent mute list",
          removableElements: true,
        },
      }
    );
  }

  public override loadConfig(key: string): void {
    switch (key) {
      case "muteBelowEnabled":
        this.muteEnabled = this.config.get("muteBelowEnabled");
        break;
      case "muteBelowLevel":
        this.levelLimit = Number(this.config.get("muteBelowLevel")) || 10;
        break;
      case "enableLogs":
        this.enableLogs = this.config.get("enableLogs");
        break;
      case "enableRemoveBubble":
        this.enableRemoveBubble = this.config.get("enableRemoveBubble");
        if (this.enableRemoveBubble) {
          this.overrideChatBubble();
        } else {
          this.restoreChatBubble();
        }
        break;
      case "ignoreDuels":
        this.ignoreDuels = this.config.get("ignoreDuels");
        if (this.ignoreDuels) {
          Ninja.events.addListener(NinjaEvents.GAME_START, this.onGameStartBound);
        } else {
          Ninja.events.removeListener(NinjaEvents.GAME_START, this.onGameStartBound);
          this.skipPlayersJoinedCheck = false;
        }
        break;
      case "doNotMuteSpectators":
        this.doNotMuteSpectators = this.config.get("doNotMuteSpectators");
        break;
      case "permanentMuteList":
        const permMuteList = this.config.get("permanentMuteList");
        this.permanentMuteList = Array.isArray(permMuteList) ? permMuteList : [];
        break;
    }
  }

  private async checkAndMutePlayer(player: {
    name: string;
    sid: string;
    level: number;
  }): Promise<void> {
    try {
      if (this.permanentMuteList.includes(player.name)) {
        this.mutePlayer(player, "mute list");
        return;
      }

      if (this.muteEnabled && player.level <= this.levelLimit) {
        this.mutePlayer(player, `level ${player.level}`);
      }
    } catch (err) {
      console.error(`Error checking level for player ${player.name}:`, err);
    }
  }

  private mutePlayer(player: { name: string; sid: string }, reason: string): void {
    if (!Game.Muted.includes(player.sid)) {
      Game.Muted.push(player.sid);
      if (this.enableLogs) {
        Ninja.log(`Muted ${player.name} (${reason}).`, config.Colors.green);
      }
    }
  }

  private onPlayerJoined(e: any): void {
    if (this.skipPlayersJoinedCheck) return;
    const player = e.data.detail;
    if (this.doNotMuteSpectators && player.spec) return;
    if (player.name !== app.credential.username) {
      this.checkAndMutePlayer(player);
    }
  }

  private onManualMute(e: any): void {
    const player = e.data.detail;
    if (!this.permanentMuteList.includes(player.name)) {
      this.permanentMuteList.push(player.name);
      this.config.set("permanentMuteList", this.permanentMuteList);
      this.configChanged("permanentMuteList");
      if (this.enableLogs) {
        Ninja.log(`${player.name} is added to mute list.`, config.Colors.green);
      }
    }
  }

  private onManualUnmute(e): void {
    const player = e.data.detail;
    const ind = this.permanentMuteList.indexOf(player.name);
    if (ind !== -1) {
      this.permanentMuteList.splice(ind, 1);
      this.config.set("permanentMuteList", this.permanentMuteList);
      this.configChanged("permanentMuteList");
      if (this.enableLogs) {
        Ninja.log(`${player.name} is removed from mute list.`, config.Colors.green);
      }
    }
  }

  private onGameplayStopped(): void {
    if (this.ignoreDuels) {
      Ninja.events.addListener("gs", this.onGameStartBound);
    }
    Game.Muted.length = 0;
  }

  private overrideChatBubble(): void {
    if (!Label.prototype.displayChatBubble) {
      return;
    }
    const original = this.originalDisplayChatBubble;
    Label.prototype.displayChatBubble = async function () {
      if (this.go && Game.Muted.includes(this.go.sid)) return;
      await original.apply(this);
    };
  }

  private restoreChatBubble(): void {
    if (this.originalDisplayChatBubble) {
      Label.prototype.displayChatBubble = this.originalDisplayChatBubble;
    }
  }

  private async onGameStart(): Promise<void> {
    const mode = app.game.mode;
    this.skipPlayersJoinedCheck = mode === "1v1" && this.ignoreDuels;
    Ninja.events.removeListener(NinjaEvents.GAME_START, this.onGameStartBound);
  }

  public load(): void {
    if (!this.originalDisplayChatBubble) {
      this.originalDisplayChatBubble = Label.prototype.displayChatBubble;
    }
    Ninja.events.addListener(NinjaEvents.PLAYER_JOINED, this.onPlayerJoinedBound);
    Ninja.events.addListener(NinjaEvents.PLAYER_MUTED, this.onManualMuteBound);
    Ninja.events.addListener(NinjaEvents.PLAYER_UNMUTED, this.onManualUnmuteBound);
    Ninja.events.addListener(NinjaEvents.GAMEPLAY_STOPPED, this.onGameplayStoppedBound);

    super.load();
  }

  public unload(): void {
    this.restoreChatBubble();
    Ninja.events.removeListener(NinjaEvents.PLAYER_JOINED, this.onPlayerJoinedBound);
    Ninja.events.removeListener(NinjaEvents.PLAYER_MUTED, this.onManualMuteBound);
    Ninja.events.removeListener(NinjaEvents.PLAYER_UNMUTED, this.onManualUnmuteBound);
    Ninja.events.removeListener(NinjaEvents.GAMEPLAY_STOPPED, this.onGameplayStoppedBound);
    Ninja.events.removeListener(NinjaEvents.GAME_START, this.onGameStartBound);

    super.unload();
  }
}
