export default function getScrollbar() {
  class _Scrollbar extends PIXI.Container {
    public scrolling = false;
    public oy = 0;
    private scrollBar: Graphics;
    private scrollButton: Graphics;
    private wheelListener: (c: { data: { delta: number } }) => any;

    constructor(public h: number, public start = 0) {
      super();
      this.scrollBar = new PIXI.Graphics();
      this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
      this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
      this.scrollBar.endFill();
      this.scrollBar.x = 0;
      this.scrollBar.y = 0;
      this.scrollBar.interactive = !0;
      this.scrollBar.alpha = 0.5;
      this.addChild(this.scrollBar);
      this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
      this.scrollButton = new PIXI.Graphics();
      this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
      this.scrollButton.beginFill(16777215, 0.2);
      this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
      this.scrollButton.endFill();
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
        this.scroll(c.data.global.y);
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
        this.scroll(c.data.global.y);
      });
      this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y));
      this.wheelListener = (c) => {
        this.scrolling = true;
        this.scroll(this.oy + 0.2 * c.data.delta);
        this.scrolling = false;
      };
    }
    enableWheel() {
      UserInput.hasListener(UserInput.WHEEL, this.wheelListener) ||
        UserInput.addListener(UserInput.WHEEL, this.wheelListener);
    }
    disableWheel() {
      UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
    }
    scroll(a: number) {
      if (this.scrolling) {
        a /= App.Scale;
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
  const Scrollbar = _Scrollbar as typeof _Scrollbar & { SCROLL: string };
  Scrollbar.SCROLL = "scroll";
  return Scrollbar;
}
