import Mod from "../api/Mod";
import Ninja, { NinjaEvents } from "../api/Ninja";

interface Config {
  showTime: boolean;
  gameTime: boolean;
}

export class FPSDisplayMod extends Mod<Config> {
  private showTime: boolean = false;
  private gameTime: boolean = false;

  /** Time of joining the current game. */
  private joinedAt = Date.now();
  private frameDisplay: HTMLDivElement;
  private lastUpdate = Date.now();
  private frames = 0;

  constructor() {
    super({
      id: "FPSDisplay",
      name: "FPS Display",
      author: "Meow",
      description: "Displays your FPS and ping at the top of the screen.",
      icon: "energy_icon",
      recommend: true,
    });
    this.implementConfig(
      {
        showTime: false,
        gameTime: false,
      },
      {
        showTime: "Show Current Time",
        gameTime: "Show Game Time Elapsed",
      }
    );
  }
  public override loadConfig(key: keyof Config) {
    switch (key) {
      case "showTime":
        this.showTime = this.config.get("showTime");
        break;
      case "gameTime":
        this.gameTime = this.config.get("gameTime");
        break;
    }
  }
  public load() {
    this.frameDisplay = document.createElement("div");
    Object.entries({
      padding: "0.3rem 0.4rem",
      font: "16px Arial",
      position: "fixed",
      top: "0px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderBottomLeftRadius: "6px",
      borderBottomRightRadius: "6px",
      pointerEvents: "none",
      userSelect: "none",
    }).forEach((e) => {
      this.frameDisplay.style[e[0]] = e[1];
    });
    this.frameDisplay.textContent = "...";
    this.lastUpdate = Date.now();
    document.body.appendChild(this.frameDisplay);
    Ninja.events.addListener(NinjaEvents.STEP, this.updater);
    Ninja.events.addListener(NinjaEvents.GAME_JOIN, this.onJoin);
    super.load();
  }
  public unload() {
    Ninja.events.removeListener(NinjaEvents.STEP, this.updater);
    Ninja.events.removeListener(NinjaEvents.GAME_JOIN, this.onJoin);
    this.frameDisplay.remove();
    super.unload();
  }

  private update() {
    const now = Date.now(),
      elapsed = now - this.lastUpdate;
    if (elapsed < 500) {
      this.frames++;
    } else {
      let fps = `${Math.round(this.frames / (elapsed / 1000))} FPS`;
      if (this.showTime) fps = `${new Date().toLocaleTimeString()} - ` + fps;
      if (Ninja.inGame()) {
        fps += ` - ${Math.round(Ninja.serverLatency || 0)}ms`;
        if (this.gameTime) {
          const elapsed = (Date.now() - this.joinedAt) / 1000,
            minutes = Math.floor(elapsed / 60),
            seconds = Math.floor(elapsed % 60);
          fps += ` - ${[minutes, seconds].map((t) => t.toString().padStart(2, "0")).join(":")}`;
        }
      }
      if (this.frameDisplay.innerText !== fps) this.frameDisplay.innerText = fps;
      this.frames = 0;
      this.lastUpdate = now;
      this.frameDisplay.style.display = "block";
    }
  }
  private updater = this.update.bind(this);

  private _onJoin() {
    this.joinedAt = Date.now();
  }
  private onJoin = this._onJoin.bind(this);
}
