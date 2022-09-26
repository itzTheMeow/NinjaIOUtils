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
    public dlWEBM: Button;
    public dlMP4: Button;
    public donedl: Button;
    public previd: Button;
    public recordingSince = 0;
    public preContainer: Container;
    public postContainer: Container;

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

      this.container.addChild((this.preContainer = new PIXI.Container()));
      this.container.addChild((this.postContainer = new PIXI.Container()));
      this.postContainer.visible = false;

      this.startButton = new Button("start_rec");
      this.setupStartButton();
      this.startButton.scale.x = this.startButton.scale.y = 0.75;
      this.startButton.x = this.mx + 10;
      this.startButton.y = this.my += this.title.height + 10;
      this.startButton.addListener(Button.BUTTON_RELEASED, () => {
        if (this.recordingSince && this.recorder) this.recorder.stop();
        else this.onRecStart();
      });
      this.preContainer.addChild(this.startButton);

      this.mx = 18;
      this.my = this.title.height + 16;
      this.donedl = new Button("dl_done");
      this.donedl.setText("Done");
      this.donedl.setTint(config.Colors.yellow);
      this.donedl.scale.x = this.donedl.scale.y = 0.7;
      this.donedl.x = this.mx;
      this.donedl.y = this.my;
      this.donedl.addListener(Button.BUTTON_RELEASED, () => {
        this.preContainer.visible = true;
        this.postContainer.visible = false;
        this.stream = this.recorder = this.recordedChunks = null;
      });
      this.postContainer.addChild(this.donedl);
      this.previd = new Button("dl_prev");
      this.previd.setText("Preview");
      this.previd.setTint(config.Colors.green);
      this.previd.scale.x = this.previd.scale.y = 0.7;
      this.previd.x = this.donedl.x + this.donedl.width + 6;
      this.previd.y = this.my;
      this.previd.addListener(Button.BUTTON_RELEASED, () =>
        window.open(
          URL.createObjectURL(new Blob(this.recordedChunks, { type: "video/webm" })),
          "_blank"
        )
      );
      this.postContainer.addChild(this.previd);

      this.dlWEBM = new Button("dl_webm");
      this.dlWEBM.setText("Download WEBM");
      this.dlWEBM.scale.x = this.dlWEBM.scale.y = 0.7;
      this.dlWEBM.x = this.mx;
      this.dlWEBM.y = this.my += this.donedl.height + 8;
      this.dlWEBM.addListener(Button.BUTTON_RELEASED, () => {
        this.dlBlob(new Blob(this.recordedChunks, { type: "video/webm" }));
      });
      this.postContainer.addChild(this.dlWEBM);
      this.dlMP4 = new Button("dl_mp4");
      this.dlMP4.setText("Convert to MP4 (slow)");
      this.dlMP4.scale.x = this.dlMP4.scale.y = 0.7;
      this.dlMP4.x = this.dlWEBM.x + this.dlWEBM.width + 6;
      this.dlMP4.y = this.dlWEBM.y;
      this.dlMP4.addListener(Button.BUTTON_RELEASED, async () => {
        try {
          this.dlMP4.setText("Starting...");
          const worker = new Worker(
            URL.createObjectURL(
              new Blob([await fetch(`${config.api}/ffmpeg.js`).then((r) => r.text())], {
                type: "application/javascript",
              })
            )
          );
          worker.onmessage = async (e) => {
            try {
              const msg = e.data as {
                type: "ready" | "done" | "stdout" | "stderr";
                data: string | { MEMFS: { name: string; data: Uint8Array }[] };
              };
              switch (msg.type) {
                case "ready":
                  this.dlMP4.setText("Converting...");
                  console.log(`[ConversionWorker] Worker ready!`);
                  worker.postMessage({
                    bypass: true,
                    type: "run",
                    arguments: [
                      "-i",
                      "video.webm",
                      "-vf",
                      "crop=trunc(iw/2)*2:trunc(ih/2)*2",
                      /*"-c:v",
                      "h264",
                      "-c:a",
                      "aac", // or vorbis
                      "-b:v",
                      "6400k", // video bitrate
                      "-b:a",
                      "4800k", // audio bitrate
                      "-strict",
                      "experimental",*/
                      "-preset",
                      "ultrafast",
                      "vid.mp4",
                    ],
                    MEMFS: [
                      {
                        name: "video.webm",
                        data: await new Blob(this.recordedChunks, {
                          type: "video/webm",
                        }).arrayBuffer(),
                      },
                    ],
                  });
                  break;
                case "stdout":
                case "stderr":
                  console.log(`[ConversionWorker.${msg.type}] ${msg.data}`);
                  if (msg.data == "Conversion failed!") {
                    this.dlMP4.setText("Error!");
                  }
                  break;
                case "done":
                  this.dlMP4.setText("Convert to MP4 (slow)");
                  if (typeof msg.data !== "string" && msg.data.MEMFS) {
                    this.dlBlob(new Blob([msg.data.MEMFS[0].data], { type: "video/mp4" }));
                  }
                  break;
              }
            } catch (err) {
              alert(`Error with conversion: ${err}, ${err.stack}`);
            }
          };
        } catch (err) {
          alert(`Error creating conversion worker: ${err}, ${err.stack}`);
        }
      });
      this.postContainer.addChild(this.dlMP4);
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

    public stream: MediaStream;
    public recorder: MediaRecorder;
    public recordedChunks: Blob[];
    public onRecStart() {
      this.recordingSince = Date.now();
      this.updateTitle();
      this.startButton.setText("Stop Recording");
      this.startButton.setTint(config.Colors.red);

      try {
        this.stream = new MediaStream();
        const howlStream = Howler.ctx.createMediaStreamDestination();
        Howler.masterGain.connect(howlStream); // redirect the HowlerJS (audio)
        const vid = App.Renderer.view.captureStream(); // capture the game screen
        this.stream.addTrack(howlStream.stream.getTracks()[0]);
        this.stream.addTrack(vid.getTracks()[0]);

        this.recordedChunks = [];
        this.recorder = new MediaRecorder(this.stream, { bitsPerSecond: 40000000 });
        this.recorder.ondataavailable = (e) => this.recordedChunks.push(e.data);
        this.recorder.onstop = () => this.onRecStop();
        this.recorder.start();
      } catch (err) {
        alert(`Error starting recording: ${err}, ${err.stack}`);
      }
    }
    public onRecStop() {
      this.recordingSince = 0;
      this.updateTitle();
      this.setupStartButton();

      this.preContainer.visible = false;
      this.postContainer.visible = true;
      this.dlMP4.setText("Convert to MP4 (slow)");
    }

    public dlBlob(blob: Blob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `NinjaRecording-${new Date()
        .toISOString()
        .split(".")[0]
        .replace("T", "-")
        .replace(/:/g, ".")}.${blob.type.split("/").pop()}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
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
