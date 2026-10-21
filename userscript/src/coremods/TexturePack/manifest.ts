import type { TexturePackMod } from ".";
import config from "../../config";
import { TexturePackManifest } from "./utils";

export class TexturePackModManifest {
  /** Base GitHub URL. */
  public get baseURL() {
    return `https://raw.githubusercontent.com/${config.packRepo}/${config.packBranch}`;
  }
  constructor(private parent: TexturePackMod) {}

  /** Shorthand to get manifest-specific keys from the db. */
  private async getItem<T extends any>(key: string) {
    return await this.parent.store.instance.getItem<T>(`manifest:${key}`);
  }
  private async setItem<T extends any>(key: string, item: T) {
    return await this.parent.store.instance.setItem(`manifest:${key}`, item);
  }

  private readonly MANIFEST_CACHE_TTL = 30 * 60 * 1000; // 30min
  public async fetchManifest() {
    const cached = await this.getItem<CachedManifest>("cached");
    if (cached && Date.now() > cached.expiresAt) return cached.data;

    try {
      const res = await fetch(
        `${this.baseURL}/manifest.json`,
        // use the etag to stop the request if it hasnt changed
        cached?.etag
          ? { headers: { "If-None-Match": cached.etag } }
          : undefined,
      );
      if (res.status == 304 && cached) {
        cached.expiresAt = Date.now() + this.MANIFEST_CACHE_TTL;
        await this.setItem("cached", cached);
        return cached.data;
      }
      if (!res.ok) throw new Error(`manifest fetch failed: ${res.status}`);
      const data = (await res.json()) as TexturePackManifest;
      await this.setItem("cached", {
        fetchedAt: Date.now() + this.MANIFEST_CACHE_TTL,
        etag: res.headers.get("etag") || null,
        data,
      });
      return data;
    } catch (err) {
      console.error(err);
      // return cached data if we cant make the request
      if (cached) return cached.data;
      throw err;
    }
  }
}

/** The cached manifest from github. */
interface CachedManifest {
  expiresAt: number;
  etag: string | null;
  data: TexturePackManifest;
}
