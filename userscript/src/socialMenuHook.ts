import config from "./config";

export default function hookSocialMenu() {
  const menu = App.Layer.socialMenu;

  class RecordingMenu extends Feature {
    public mx = 0;
    public my = 0;
    public down = false;
    public dragging = false;
    public title: Container;
    public background: Graphics;
    public closeButton: Sprite;
    public startButton: Button;
    public recordingSince = 0;

    constructor() {
      super();
      this.background = new PIXI.Graphics();
      this.background.lineStyle(1, 16777215, 0.1, 0);
      this.background.beginFill(3355443, 0.9);
      this.background.drawRoundedRect(0, 0, 400, 320, 4);
      this.background.interactive = true;
      this.container.addChild(this.background);
      this.background.on("mousedown", (a) => {
        a.stopPropagation();
        this.down = true;
        this.ox = a.data.global.x;
        this.oy = a.data.global.y;
      });
      this.background.on("mouseup", (a) => {
        a.stopPropagation();
        this.down = this.dragging = false;
      });
      this.background.on("mousemove", (a) => {
        if (this.down) {
          let b = a.data.global.x;
          a = a.data.global.y;
          let c = b - this.ox,
            d = a - this.oy;
          this.x += c;
          this.y += d;
          this.ox = b;
          this.oy = a;
          0 < Math.sqrt(c * c + d * d) && (this.dragging = true);
        }
      });

      this.title = new PIXI.BitmapText("Screen Recorder", {
        fontName: "Open Sans",
        fontSize: 28,
      });
      this.title.x = this.mx = 8;
      this.title.y = this.my = 6;
      this.title.tint = config.Colors.red;
      this.container.addChild(this.title);
      setInterval(() => this.updateTitle(), 900);

      this.closeButton = new PIXI.Sprite(App.CombinedTextures.exit);
      this.closeButton.scale.x = this.closeButton.scale.y = 0.8;
      this.closeButton.alpha = 0.5;
      this.closeButton.interactive = true;
      this.closeButton.x = this.width - 28;
      this.closeButton.y = 2;
      this.closeButton.on("mousedown", (a) => {
        this.closeButton.alpha = 0.5;
        this.parent.removeChild(this);
        AudioEffects.ButtonClick.audio.play();
      });
      this.closeButton.on("mouseover", (a) => {
        this.closeButton.alpha = 1;
        AudioEffects.ButtonHover.audio.play();
      });
      this.closeButton.on("mouseout", (a) => {
        this.closeButton.alpha = 0.5;
      });
      this.container.addChild(this.closeButton);

      this.startButton = new Button("start_rec");
      this.setupStartButton();
      this.startButton.scale.x = this.startButton.scale.y = 0.75;
      this.startButton.x = this.mx + 10;
      this.startButton.y = this.my += this.title.height + 10;
      this.startButton.addListener(Button.BUTTON_RELEASED, () => {
        if (this.recordingSince) this.onRecStop();
        else this.onRecStart();
      });
      this.container.addChild(this.startButton);
    }
    public updateTitle() {
      const timeRec = Math.floor((Date.now() - this.recordingSince) / 1000);
      this.title.text = this.recordingSince
        ? `Recording... (${Math.floor(timeRec / 60)
            .toString()
            .padStart(2, "0")}:${Math.floor(timeRec % 60)
            .toString()
            .padStart(2, "0")})`
        : `Screen Recorder`;
    }
    public setupStartButton() {
      this.startButton.setText("Start Recording");
      this.startButton.setTint(config.Colors.green);
    }

    public onRecStart() {
      this.recordingSince = Date.now();
      this.updateTitle();
      this.startButton.setText("Stop Recording");
      this.startButton.setTint(config.Colors.red);
    }
    public onRecStop() {
      this.recordingSince = 0;
      this.updateTitle();
      this.setupStartButton();
    }
  }

  class SocialMenuDropdown extends PIXI.Container {
    public background: Graphics;
    constructor() {
      super();
      this.background = new PIXI.Graphics();
      this.background.clear();
      this.background.lineStyle(1, 16777215, 0.4, 0.3);
      this.background.beginFill(5592405, 0.9);
      this.background.drawRoundedRect(0, 0, 110, 64, 4);
      this.background.endFill();
      this.addChild(this.background);

      const clanChatBtn = new SocialMenuDropdownActionRow(
        "Clan Chat",
        () => menu.onClanChatButtonReleased.bind(menu)(),
        config.Colors.white
      );
      const recordBtn = new SocialMenuDropdownActionRow(
        "Record",
        () => {
          menu.addChild(menu.recMenu);
          menu.recMenu.x = -Math.abs(menu.width - menu.recMenu.width) / 2;
          menu.recMenu.y = -Math.abs(menu.height - menu.recMenu.height) / 2;
        },
        config.Colors.red
      );

      clanChatBtn.x = 10;
      clanChatBtn.y = 4;
      recordBtn.x = 10;
      recordBtn.y = 34;

      this.addChild(clanChatBtn);
      this.addChild(recordBtn);
    }
  }
  class SocialMenuDropdownActionRow extends PIXI.Container {
    public actionText: Container;
    constructor(text: string, onclick: () => any, color: number) {
      super();
      this.text = text;
      this.actionText = new PIXI.BitmapText(this.text, { fontName: "Open Sans", fontSize: 24 });
      this.hitArea = new PIXI.Rectangle(0, 0, 100, 30);
      this.actionText.tint = color;
      this.actionText.alpha = 0.7;
      this.interactive = true;
      this.on("mouseover", () => (this.actionText.alpha = 1));
      this.on("mouseout", () => (this.actionText.alpha = 0.7));
      this.on("mousedown", (e) => {
        e.stopPropagation();
        onclick();
      });
      this.addChild(this.actionText);
    }
  }
  menu.clanChatButton.destroy();
  const dropdownMenu = new SocialMenuDropdown();
  menu.recMenu = new RecordingMenu();

  menu.dropdownButton = new Button("drop");
  menu.dropdownButton.setText("V");
  menu.dropdownButton.scale.x = menu.dropdownButton.scale.y = 0.7;
  menu.dropdownButton.addListener(Button.BUTTON_RELEASED, () => {
    if (dropdownMenu.parent) return menu.container.removeChild(dropdownMenu);
    menu.container.addChild(dropdownMenu);
    dropdownMenu.x = menu.dropdownButton.x - dropdownMenu.width + menu.dropdownButton.width;
    dropdownMenu.y =
      menu.dropdownButton.y + menu.dropdownButton.parent.y + menu.dropdownButton.height;
  });
  menu.dropdownButton.x = menu.clanButton.x + menu.clanButton.width + 6;
  menu.dropdownButton.y = 8;
  menu.container.addChild(menu.dropdownButton);
}
