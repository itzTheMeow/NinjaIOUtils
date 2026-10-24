export default class Settings<Store extends Record<string, any> = { _: "" }> {
  private storeCache: Store | null = null;

  public constructor(
    public key = "niou_settings",
    public defaults: Store,
  ) {
    // invalidate the local cache if another tab writes the settings store
    window.addEventListener("storage", (e) => {
      if (e.key == null || e.key == this.key) this.invalidateCache();
    });
  }

  /** Invalidate the in-memory kv cache. */
  public invalidateCache() {
    this.storeCache = null;
  }

  private parseStore(): Store {
    let store: Store;
    try {
      store = JSON.parse(localStorage.getItem(this.key) || "{}");
    } catch (err) {
      console.error(
        `Failed to parse settings stored at '${this.key}', resetting to defaults.`,
        err,
      );
      store = <Store>{};
    }
    return (this.storeCache = store);
  }

  public getStore(fillDefaults = false): Store {
    const store = this.storeCache ?? this.parseStore();
    if (fillDefaults) return { ...this.defaults, ...store };
    else return store;
  }
  public get<K extends keyof Store>(key: K): Store[K] {
    return this.getStore()[key] ?? this.defaults[key];
  }
  public set<K extends keyof Store>(key: K, value: Store[K]) {
    const store = { ...this.getStore(), [key]: value };
    try {
      localStorage.setItem(this.key, JSON.stringify(store));
    } catch (err) {
      console.error(`Failed to persist settings at '${this.key}'.`, err);
    }
    this.storeCache = store;
  }
}
