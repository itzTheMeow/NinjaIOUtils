import localForage from "localforage";
import type { TexturePackMod } from ".";
import { TextureAtlasType, TexturePackManifestEntry } from "./utils";

export class TexturePackModStore {
  public instance = localForage.createInstance({
    name: "nutils_texpack_store_v1",
  });
  constructor(private parent: TexturePackMod) {}

  private _atlases: { [key in TextureAtlasType]?: Blob } = {};
  public async getAtlas(type: TextureAtlasType): Promise<Blob | null> {
    if (this._atlases?.[type]) return this._atlases[type];
    throw "Unimplemented.";
  }

  private _installed: InstalledPack[] | null = null;
  public async getInstalled() {
    if (this._installed) return this._installed;
    return (this._installed =
      (await this.instance.getItem<InstalledPack[]>("installed_packs")) || []);
  }

  /** Installs a pack from a manifest entry. */
  public async installPackFromManifest(pack: TexturePackManifestEntry) {
    const zip = await this.parent.manifest.fetchZip(pack);
    return await this.installPack(pack, zip, true);
  }
  /** Install a custom pack from an uploaded zip file. */
  public async installCustomPack(zip: Blob) {}

  /** Installs a pack from a zip file. */
  public async installPack(
    meta: TexturePackManifestEntry,
    zip: Blob,
    fromManifest = false,
  ) {
    const pack: InstalledPack = {
      ...meta,
      fromManifest,
    };

    // save the zip in the cache
    await this.instance.setItem(`zip:${pack.hash}`, zip);

    // add the pack to the install list
    const installed = await this.getInstalled();
    installed.push(pack);
    this.instance.setItem("installed_packs", (this._installed = installed));

    await this.gc();
  }
  /** Uninstall a pack given its ID. */
  public async uninstallPack(id: string) {
    const installed = await this.getInstalled(),
      packIndex = installed.findIndex((i) => i.id == id),
      pack = installed[packIndex];
    if (packIndex == -1 || !pack) {
      console.error(`Tried to uninstall pack ${id} that wasnt installed!`);
      return;
    }

    // remove from install list
    installed.splice(packIndex, 1);
    await this.instance.setItem(
      "installed_packs",
      (this._installed = installed),
    );

    // gc in the background
    this.gc();
  }

  /** Run garbage-collection and clean up any non-installed zips. */
  public async gc() {
    const installed = await this.getInstalled();
    for (const key of await this.instance.keys()) {
      // only clean up zip files
      if (!key.startsWith("zip:")) continue;
      // remove any zips whos hashes we dont have installed
      if (!installed.some((i) => i.hash == key.split(":").pop()))
        await this.instance.removeItem(key);
    }
  }
}

export interface InstalledPack extends TexturePackManifestEntry {
  /** If this pack was installed from the manifest. */
  fromManifest: boolean;
}
