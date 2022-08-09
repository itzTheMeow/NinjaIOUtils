import { SETTINGS } from "./settings/settings";
import { inGame } from "./utils";

export const frameDisplay = document.createElement("div");
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
  frameDisplay.style[e[0]] = e[1];
});
frameDisplay.textContent = "...";
document.body.appendChild(frameDisplay);

export function showFPS() {
  let lastUpdate = Date.now(),
    frames = 0;
  if (SETTINGS.showFPS) frameDisplay.style.display = "block";
  function updateCounter() {
    const now = Date.now(),
      elapsed = now - lastUpdate;
    if (elapsed < 500) {
      frames++;
    } else {
      let fps = `${Math.round(frames / (elapsed / 1000))} FPS`;
      if (inGame()) fps += ` - ${App.Stats.ping || 0}ms`;
      if (frameDisplay.innerText !== fps) frameDisplay.innerText = fps;
      frames = 0;
      lastUpdate = now;
      frameDisplay.style.display = "block";
    }
    if (!SETTINGS.showFPS) return (frameDisplay.style.display = "none");
  }
  app._stepCallback = app._stepCallback || app.stepCallback;
  app.stepCallback = function (d) {
    updateCounter();
    return app._stepCallback(d);
  };
}
