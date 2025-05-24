import Mod from "../api/Mod";
import Ninja, { NinjaEvents } from "../api/Ninja";

export class FPSDisplayMod extends Mod<{
  showTime: boolean;
}> {
  private showTime: boolean = false;

  frameDisplay: HTMLDivElement;
  lastUpdate = Date.now();
  frames = 0;

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
      },
      {
        showTime: "Show Current Time",
      }
    );
  }
  public override loadConfig(key: string): void {
    //TODO: clean this up
    this.showTime = this.config.get("showTime");
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
    super.load();
  }
  public unload() {
    Ninja.events.removeListener(NinjaEvents.STEP, this.updater);
    this.frameDisplay.remove();
    super.unload();
  }

  public update() {
    const now = Date.now(),
      elapsed = now - this.lastUpdate;
    if (elapsed < 500) {
      this.frames++;
    } else {
      let fps = `${Math.round(this.frames / (elapsed / 1000))} FPS`;
      if (this.showTime) fps = `${new Date().toLocaleTimeString()} - ` + fps;
      if (Ninja.inGame()) fps += ` - ${Math.round(Ninja.serverLatency || 0)}ms`;
      if (this.frameDisplay.innerText !== fps) this.frameDisplay.innerText = fps;
      this.frames = 0;
      this.lastUpdate = now;
      this.frameDisplay.style.display = "block";
    }
  }
  public updater = this.update.bind(this);
}
