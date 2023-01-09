import config from "./config";

export default async function checkUpdate() {
  try {
    const newest = await fetch(`${config.api}/ver`).then((r) => r.text());
    const num = (str: string) => Number(str.replace(/\./, ""));
    if (num(newest) > num(config.ver)) {
      App.Console.log(
        `Hey! A new version of NinjaIOUtils is available. (${newest})`,
        config.Colors.red
      );
    }
  } catch {}
}
