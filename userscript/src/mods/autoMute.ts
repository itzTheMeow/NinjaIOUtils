import Mod from "../api/Mod";
import Ninja from "../api/Ninja";
import { Game } from "lib";
import { app } from "typings";
import config from "../config";

export class AutoMuteMod extends Mod<{
  muteBelowEnabled: boolean;
  muteBelowLevel: number;
  enableLogs: boolean;
  enableRemoveBubble: boolean;
  doNotMuteGuests: boolean;
  permanentMuteList: string[];
}> {
  private muteEnabled: boolean = true;
  private levelLimit: number = 15;
  private enableLogs: boolean = true;
  private enableRemoveBubble: boolean = true;
  private doNotMuteGuests: boolean = true;
  private permanentMuteList: string[] = [];
  private originalDisplayChatBubble: Function | null = null;

  constructor() {
    super({
      id: "AutoMute",
      name: "Auto Mute",
      description: "Constantly mutes players you mute. Can be configured to mute all players below a set level and remove chat bubble above muted players.",
      author: "Lumen",
      icon: "mute_icon",
    });

    this.implementConfig(
      {
        muteBelowEnabled: true,
        muteBelowLevel: 15,
        enableLogs: true,
        enableRemoveBubble: true,
        doNotMuteGuests: true,
        permanentMuteList: [],
      },
      {
        muteBelowEnabled: "Enable muting players with level not higher than Level limit",
        muteBelowLevel: "Level limit",
        enableLogs: "Enable muting logs in chat",
        enableRemoveBubble: "Enable removing chat bubble above muted players",
        doNotMuteGuests: "Do not add guests to Mute List",
        permanentMuteList: {
          name: "Permanently muted players",
          removableElements: true,
        },
      }
    );
  }
  
  private loadConfig(): void {
    this.muteEnabled = this.config.get("muteBelowEnabled");
    this.levelLimit = Number(this.config.get("muteBelowLevel")) || 10;
    this.enableLogs = this.config.get("enableLogs");
    this.enableRemoveBubble = this.config.get("enableRemoveBubble");
    if (this.enableRemoveBubble) {
      this.overrideChatBubble();
    } else {
      this.restoreChatBubble();
    }
    this.doNotMuteGuests = this.config.get("doNotMuteGuests");
    const permMuteList = this.config.get("permanentMuteList");
    this.permanentMuteList = Array.isArray(permMuteList) ? permMuteList : [];
  }

  public override configChanged(key: string): void {
    super.configChanged(key);
    this.loadConfig();
  }

  private async checkAndMutePlayer(player: { name: string; sid: string; level: number }): Promise<void> {
    try {
      if (this.permanentMuteList.includes(player.name)) {
        this.mutePlayer(player, "permanently muted");
        return;
      }

      if (this.muteEnabled && player.level < this.levelLimit) {
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

  private onPlayerJoined(e: CustomEvent): void {
    if (Ninja.isGuest()) {
      return;
    }
    const player = e.data.detail;
    if (player.name !== app.credential.username) {
      this.checkAndMutePlayer(player);
    }
  }

  private onManualMute(e: CustomEvent): void {
    if (Ninja.isGuest()) {
      return;
    }
    const player = e.data.detail;
    if (this.doNotMuteGuests && player.name.endsWith(" (guest)")) {
      return;
    }
    if (!this.permanentMuteList.includes(player.name)) {
      this.permanentMuteList.push(player.name);
      this.config.set("permanentMuteList", this.permanentMuteList);
      this.configChanged("permanentMuteList");
      if (this.enableLogs) {
        Ninja.log(`${player.name} is added to mute list.`, config.Colors.green);
      }
    }
  }

  private onGameplayStopped(): void {
    Game.Muted = [];
  }

  private overrideChatBubble(): void {
    if (!Label) {
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

  public load(): void {
    if (!this.originalDisplayChatBubble) {
      this.originalDisplayChatBubble = Label.prototype.displayChatBubble
    }
    if (Ninja.isGuest()) {
      this.log("Not supported for guests.", config.Colors.red);
      return;
    }
    this.loadConfig();
    Ninja.events.addListener("pj", this.onPlayerJoined.bind(this));
    Ninja.events.addListener("pm", this.onManualMute.bind(this));
    Ninja.events.addListener("gameplayStopped", this.onGameplayStopped.bind(this));

    super.load();
  }

  public unload(): void {
    console.log(this.originalDisplayChatBubble)
    console.log(Label.prototype.displayChatBubble)
    this.restoreChatBubble();
    console.log(this.originalDisplayChatBubble)
    console.log(Label.prototype.displayChatBubble)
    Ninja.events.removeListener("pj", this.onPlayerJoined.bind(this));
    Ninja.events.removeListener("pm", this.onManualMute.bind(this));
    Ninja.events.removeListener("gameplayStopped", this.onGameplayStopped.bind(this));

    super.unload();
  }
}
