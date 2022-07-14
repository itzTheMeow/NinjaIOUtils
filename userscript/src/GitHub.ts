interface TreeFetchResponse {
  sha: string;
  url: string;
  tree: {
    path: string;
    mode: string;
    type: "blob" | "tree";
    sha: string;
    size?: number; // 'blob' only
    url: string;
  }[];
  truncated: boolean;
}
interface BlobFetchResponse {
  sha: string;
  node_id: string;
  size: number;
  url: string;
  content: string;
  encoding: "base64"; // all i can find
}

interface TexturePackMetadata {
  id: string;
  name: string;
  author: string;
  description: string;
}
export interface TexturePack extends TexturePackMetadata {
  textureURL: string | null;
  terrainURL: string | null;
}
// insanely cringe but whatever ig
const GHeaders = {
  Authorization: atob("Z2hwXzlTR0l6cUdvRWJZdlo2dzJjUXRBYmxTNTZtVEZWQjM5RnZLYQ=="),
};

export async function fetchGithubTree(
  tree = "https://api.github.com/repos/itzTheMeow/NinjaIOUtils/git/trees/master"
) {
  return (await fetch(tree, {
    headers: GHeaders,
  }).then((r) => r.json())) as TreeFetchResponse;
}
export async function fetchGithubBlob(blob: string) {
  return (await fetch(blob, {
    headers: GHeaders,
  }).then((r) => r.json())) as BlobFetchResponse;
}
export async function getTextureImage(img: string) {
  if (!img) return "";
  const file = await fetchGithubBlob(img);
  return `data:image/png;base64,${file.content}`;
}
export async function fetchTexturePacks() {
  const packList = (
    await fetchGithubTree((await fetchGithubTree()).tree.find((t) => t.path == "texturepacks").url)
  ).tree;
  const texturePacks: TexturePack[] = await Promise.all(
    packList
      .filter((p) => p.path.endsWith(".json"))
      .map(async (pak) => {
        const pakid = pak.path.slice(0, pak.path.length - ".json".length);
        const meta = JSON.parse(
          atob((await fetchGithubBlob(pak.url)).content)
        ) as TexturePackMetadata;
        const texture = packList.find((p) => p.path == `${pakid}_textures.png`);
        const terrain = packList.find((p) => p.path == `${pakid}_terrain.png`);
        return {
          id: meta.id,
          name: meta.name,
          author: meta.author,
          description: meta.description,
          textureURL: texture ? texture.url : null,
          terrainURL: terrain ? terrain.url : null,
        };
      })
  );
  return texturePacks;
}
