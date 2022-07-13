export function initFrameDisplay() {
  const frameDisplay = document.createElement("div");
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
}
