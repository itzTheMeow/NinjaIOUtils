import config from "./config";

export default function hookPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const tst = setInterval(function () {
    try {
      App.RemovePreloader = function () {
        let b = 1;
        preloader.style.pointerEvents = "none";
        const c = setInterval(() => {
          0 < b - 0.05
            ? ((preloader.style.opacity = String(b)), (b -= 0.05))
            : (preloader.remove(), clearInterval(c));
        }, 1000 / 60);
      };
      clearInterval(tst);
    } catch {}
  }, 10);

  const st = document.createElement("style");
  st.innerHTML = "#preloader{cursor:default!important;}#texresetbtn{cursor:pointer!important;}";
  document.head.appendChild(st);

  preloader.style.top = preloader.style.left = "0px"; // small visual fix
  const reset = document.createElement("button");
  reset.id = "texresetbtn";
  Object.entries({
    backgroundColor: "#FF0000",
    border: "1px solid rgba(255,255,255,0.7)",
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    opacity: "0.5",
    borderRadius: "6px",
    padding: "2px",
    color: "white",
  }).forEach((s) => {
    reset.style[s[0]] = s[1];
  });
  reset.innerText = "Skip Loading Texture Packs";
  reset.onclick = () => {
    app.proceed();
    (window as any).SKIP_TEX_LOAD = true;
    reset.remove();
  };
  preloader.appendChild(reset);
}
