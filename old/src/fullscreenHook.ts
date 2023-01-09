export default function hookFullscreen() {
  /* Hook for improved fullscreen. */
  window.addEventListener("keydown", (e) => {
    if (e.key == "F11") {
      e.preventDefault();
      if (document.fullscreenElement) document.exitFullscreen();
      else document.querySelector("html").requestFullscreen();
    }
  });
}
