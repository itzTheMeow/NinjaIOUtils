import { UserInput } from "lib";
import { App, PIXI } from "typings";

export default function Scrollbar() {
  class _Scrollbar extends PIXI.Container {
    public scrolling = false;
    public oy = 0;
    private scrollBar = new PIXI.Graphics();
    private scrollButton = new PIXI.Graphics();
    private wheelListener: (c: { data: { delta: number } }) => any;

    constructor(public h: number, public start = 0) {
      super();

      this.scrollBar.setStrokeStyle({ width: 1, color: 16777215, alpha: 0.4 });
      this.scrollBar.roundRect(0, -5, 20, this.h, 4);
      this.scrollBar.fill();
      this.scrollBar.x = 0;
      this.scrollBar.y = 0;
      this.scrollBar.interactive = !0;
      this.scrollBar.alpha = 0.5;
      this.addChild(this.scrollBar);
      this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);

      this.scrollButton.setStrokeStyle({ width: 1, color: 16777215, alpha: 0.4 });
      this.scrollButton.roundRect(0, 0, 16, 32, 4);
      this.scrollButton.fill({ color: 16777215, alpha: 0.2 });
      this.scrollButton.hitArea = new PIXI.Rectangle(0, 0, 0, 0);
      this.addChild(this.scrollButton);
      this.scrollButton.x = 2;
      this.scrollButton.y = -3 + (this.h - 39) * this.start;
      this.scrollBar.on("mouseover", () => {
        this.scrollBar.alpha = 1;
      });
      this.scrollBar.on("mouseout", () => {
        this.scrollBar.alpha = 0.5;
      });
      this.scrollBar.on("mouseupoutside", () => {
        this.scrolling = !1;
      });
      this.scrollBar.on("mousedown", (c) => {
        c.stopPropagation();
        this.scrolling = !0;
        this.oy = c.data.global.y / App.Scale;
      });
      this.scrollBar.on("mouseup", (c) => {
        c.stopPropagation();
        this.scrolling = !1;
      });
      this.scrollBar.on("mousemove", (c) => {
        this.scroll(c.data.global.y / App.Scale);
      });
      this.scrollBar.on("pointerup", () => {
        this.scrolling = !1;
      });
      this.scrollBar.on("pointerupoutside", () => {
        this.scrolling = !1;
      });
      this.scrollBar.on("pointerdown", (c) => {
        this.scrolling = !0;
        this.oy = c.data.global.y / App.Scale;
        this.scroll(c.data.global.y / App.Scale);
      });
      this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
      this.wheelListener = (c) => {
        this.scrolling = !0;
        this.scroll(this.oy + 0.2 * c.data.delta);
        this.scrolling = !1;
      };
    }
    enableWheel() {
      UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
        UserInput.addListener(UserInput.WHEEL, this.wheelListener);
    }
    disableWheel() {
      UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
    }
    scroll(a) {
      if (this.scrolling) {
        let b = this.scrollButton.y + (a - this.oy);
        -3 > b ? (b = -3) : b > this.h - 39 && (b = this.h - 39);
        let c = this.h / (this.h - 39);
        this.scrollButton.y = b;
        this.oy = a;
        this.emit(Scrollbar.SCROLL, (1 / this.h) * (b + 3) * c);
      }
    }
    reset() {
      this.scrollButton.y = -3 + (this.h - 39) * this.start;
    }
    onMouseOver() {
      this.scrollButton.alpha = 1;
    }
    onMouseOut() {
      this.scrollButton.alpha = 0.5;
    }
  }
  const Scrollbar = _Scrollbar as typeof _Scrollbar & { SCROLL: any };
  Scrollbar.SCROLL = "scroll";
  return Scrollbar;
}
