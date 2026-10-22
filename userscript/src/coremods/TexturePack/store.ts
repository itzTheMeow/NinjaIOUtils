import localForage from "localforage";
import type { TexturePackMod } from ".";
import {
  textureAtlasFetchJSON,
  TextureAtlasType,
  TexturePackManifestEntry,
} from "./utils";
import { fetchBlob, sha256 } from "../../utils";
import { compact, defer, Mutex } from "es-toolkit";
import Ninja from "../../api/Ninja";
import { UITheme } from "lib";

export class TexturePackModStore {
  public lock = new Mutex();
  public instance = localForage.createInstance({
    name: "nutils_texpack_store_v1",
  });
  constructor(private parent: TexturePackMod) {}

  /** Acquire and return a function to release the lock. Also re-renders the texture tab. */
  public async acquireLock() {
    await this.lock.acquire();
    this.parent.texTab?.rerender();
    return defer(() => {
      this.lock.release();
      this.parent.texTab?.rerender();
    });
  }

  private _installed: InstalledPack[] | null = null;
  /** Get the currently installed texture packs, optionally by type. */
  public async getInstalled(type?: TextureAtlasType) {
    const list = await (async () => {
      if (this._installed) return this._installed;
      return (this._installed =
        (await this.instance.getItem<InstalledPack[]>("installed_packs")) ||
        []);
    })();

    return type
      ? list.filter((i) =>
          type == TextureAtlasType.Assets ? i.hasCombined : i.hasSeamless,
        )
      : list;
  }

  /** Installs a pack from a manifest entry. */
  public async installPackFromManifest(pack: TexturePackManifestEntry) {
    console.debug("fetching zip to install from manifest...");
    const zip = await this.parent.manifest.fetchZip(pack);
    console.debug("installing pack from manifest");
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
    using _ = await this.acquireLock();
    const pack: InstalledPack = {
      ...meta,
      fromManifest,
    };
    console.debug(`installing pack: ${pack.id}`);

    // save the zip in the cache
    await this.instance.setItem(`zip:${pack.hash}`, zip);
    console.debug(`cached zip: ${pack.hash}`);

    // add the pack to the install list
    const installed = await this.getInstalled();
    installed.push(pack);
    await this.instance.setItem(
      "installed_packs",
      (this._installed = installed),
    );
    console.debug("updated install list", installed);

    this.reconcileAtlases();
  }
  /** Uninstall a pack given its ID. */
  public async uninstallPack(id: string) {
    using _ = await this.acquireLock();
    console.debug(`uninstalling pack: ${id}`);

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
    console.debug("pack uninstalled");

    this.reconcileAtlases();
  }

  private _atlases: { [key in TextureAtlasType]?: Blob } = {};
  /** Returns a unique hash key for the specific configuration that will generate a texture atlas. */
  public async atlasKey(type: TextureAtlasType) {
    // to be unique we have to combine the metadata JSON and the current installed pack hashes
    const json = await textureAtlasFetchJSON(type),
      installed = await this.getInstalled(type);

    // hash the json and the hashes of the installed packs in order
    return await sha256(
      JSON.stringify({ json, hashes: installed.map((i) => i.hash) }),
    );
  }
  /** Returns a specific texture atlas, or null if it is unmodified. */
  public async getAtlas(type: TextureAtlasType): Promise<Blob | null> {
    using _ = await this.acquireLock();

    if (this._atlases?.[type]) return this._atlases[type];
    // we have to force here so we dont get softlocked
    await this.reconcileAtlases(true);
    return this._atlases?.[type] ?? null;
  }
  /** Regenerates any needed texture atlases. */
  public async reconcileAtlases(force = false) {
    console.debug(`reconciling atlases, force: ${String(force)}`);

    // just reconcile
    if (force) return await this._reconcile();
    // otherwise wait for the lock
    using _ = await this.acquireLock();
    await this._reconcile();
  }

  /** Runs the reconcile loop. Must be called while the lock is held or with `force`. */
  private async _reconcile() {
    // gc when this is over
    using _ = defer(() => this.gc());
    const installed = await this.getInstalled();
    // stop if nothing installed
    if (!installed.length) {
      console.debug("no installed packs, exiting reconciler");
      this._atlases = null;
      return;
    }

    for (const type of Object.values(TextureAtlasType)) {
      console.debug(`reconciling atlas for ${type}`);
      try {
        const packs = await this.getInstalled(type);
        // no installed packs that modify this atlas
        if (!packs.length) {
          if (this._atlases?.[type]) delete this._atlases[type];
          console.debug("no pack modifies this atlas");
          continue;
        }

        console.debug("looking up atlas...");
        const atlasKey = await this.atlasKey(type),
          existingAtlas = await this.instance.getItem<Blob>(
            `atlas:${atlasKey}`,
          );
        if (existingAtlas) {
          console.debug(`found existing atlas: ${atlasKey}`);
          this._atlases = { ...this._atlases, [type]: existingAtlas };
          continue;
        }
        console.debug(`generating new atlas ${atlasKey}...`);

        const zips = compact(
            await Promise.all(
              packs.map((pack) =>
                this.instance.getItem<Blob>(`zip:${pack.hash}`),
              ),
            ),
          ),
          { json, pngURL } = await textureAtlasFetchJSON(type),
          original = await fetchBlob(pngURL);
        console.debug(
          `extracted all information for atlas generation, size: ${zips.reduce((i, z) => i + z.size, 0)}`,
        );

        const atlas = await this.parent.worker.generateAtlas({
          type,
          original,
          json,
          zips,
        });
        console.debug(`generated new atlas, size: ${atlas.size}`);
        await this.instance.setItem(`atlas:${atlasKey}`, atlas);
        this._atlases = { ...this._atlases, [type]: atlas };
      } catch (err) {
        console.error(err);
        Ninja.log(
          `Failed to generate texture atlas for ${type}!`,
          UITheme.MenuColors.danger,
        );
      }
    }

    console.debug("finished reconciling atlase");
  }

  /** Run garbage-collection and clean up any non-installed zips. */
  public async gc() {
    using _ = await this.acquireLock();
    console.debug("running gc...");

    const installed = await this.getInstalled(),
      atlasKeys = await Promise.all(
        Object.values(TextureAtlasType).map((t) => this.atlasKey(t)),
      );

    for (const key of await this.instance.keys()) {
      const [prefix, suffix] = key.split(":");
      if (!prefix || !suffix) continue;
      if (prefix == "zip") {
        // remove any zips whos hashes we dont have installed
        if (!installed.some((i) => i.hash == suffix)) {
          await this.instance.removeItem(key);
          console.debug(`removed stale zip: ${suffix}`);
        }
      } else if (prefix == "atlas") {
        // remove any atlases that dont match our atlas keys
        if (!atlasKeys.some((k) => k == suffix)) {
          await this.instance.removeItem(key);
          console.debug(`removed stale atlas: ${suffix}`);
        }
      }
    }
    console.debug("gc complete");
  }
}

export interface InstalledPack extends TexturePackManifestEntry {
  /** If this pack was installed from the manifest. */
  fromManifest: boolean;
}
