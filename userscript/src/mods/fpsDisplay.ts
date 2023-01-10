import Mod from "../api/Mod";
import Ninja, { Listener } from "../api/Ninja";

export class FPSDisplayMod extends Mod<{
  showTime: boolean;
}> {
  frameDisplay = document.createElement("div");
  lastUpdate = Date.now();
  frames = 0;
  listener: Listener;

  constructor() {
    super({
      id: "FPSDisplay",
      name: "FPS Display",
      author: "Meow",
      description: "Displays your FPS and ping at the top of the screen.",
      icon: "energy_icon",
    });
    this.implementConfig({
      showTime: false,
    });
  }
  public load() {
    Object.entries({
      padding: "0.3rem 0.4rem",
      font: "16px Arial",
      display: "none",
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
    this.listener = Ninja.onstep(() => this.update());
    super.load();
  }
  public unload() {
    Ninja.offstep(this.listener);
    document.body.removeChild(this.frameDisplay);
    super.unload();
  }

  public update() {
    const now = Date.now(),
      elapsed = now - this.lastUpdate;
    if (elapsed < 500) {
      this.frames++;
    } else {
      let fps = `${Math.round(this.frames / (elapsed / 1000))} FPS`;
      if (Ninja.inGame()) fps += ` - ${Ninja.serverLatency || 0}ms`;
      if (this.frameDisplay.innerText !== fps) this.frameDisplay.innerText = fps;
      this.frames = 0;
      this.lastUpdate = now;
      this.frameDisplay.style.display = "block";
    }
  }
}
