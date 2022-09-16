import axios from "axios";

export async function getTextureJSON(url: string): Promise<{
  animations: { [key: string]: string[] };
  frames: {
    [key: string]: {
      frame: { x: number; y: number; w: number; h: number };
      rotated: boolean;
      trimmed: boolean;
      spriteSourceSize: { x: number; y: number; w: number; h: number };
      sourceSize: { w: number; h: number };
    };
  };
  meta: {
    app: string;
    version: string;
    image: string;
    format: string;
    size: { w: number; h: number };
    scale: string;
  };
}> {
  return (await axios.get(url)).data;
}

export async function getTextureURLs() {
  const mainPage = String((await axios.get("https://ninja.io")).data);
  const scriptURL = mainPage
    .split(`<script async src="`)
    .find((u) => u.startsWith("."))
    .split(`"></script>`)[0]
    .replace(/^./, "https://ninja.io");
  const scriptText = String((await axios.get(scriptURL)).data);

  const RESOURCE_FOLDER = scriptText
    .match(/App\.RESOURCE_FOLDER="(.*?)";/)[1]
    .replace(/^./, "")
    .replace(/^\//, "");
  const RESOURCES = eval(`(${scriptText.match(/App\.RESOURCES=({.*});/)[1]})`) as {
    combined: { id: string; file: string }[];
    seamless: { id: string; file: string }[];
    fonts: { id: string; file: string }[];
  };
  const combinedJSON = await getTextureJSON(
    `https://ninja.io/${RESOURCE_FOLDER}/${RESOURCES.combined[0].id}/${RESOURCES.combined[0].file}`
  );
  const combinedURL = `https://ninja.io/${RESOURCE_FOLDER}/${RESOURCES.combined[0].id}/${combinedJSON.meta.image}`;
  const seamlessJSON = await getTextureJSON(
    `https://ninja.io/${RESOURCE_FOLDER}/${RESOURCES.seamless[0].id}/${RESOURCES.seamless[0].file}`
  );
  const seamlessURL = `https://ninja.io/${RESOURCE_FOLDER}/${RESOURCES.seamless[0].id}/${seamlessJSON.meta.image}`;

  return {
    combinedURL,
    combined: combinedJSON,
    seamlessURL,
    seamless: seamlessJSON,
  };
}
