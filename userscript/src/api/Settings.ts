export default class Settings<Store extends Record<string, any> = { _: "" }> {
  constructor(public key = "niou_settings", public defaults: Store) {}

  public getStore(fillDefaults = false): Store {
    const store = JSON.parse(localStorage.getItem(this.key) || "{}");
    if (fillDefaults) return { ...this.defaults, ...store };
    else return store;
  }
  public get<K extends keyof Store>(key: K): Store[K] {
    return this.getStore()[key] ?? this.defaults[key];
  }
  public set<K extends keyof Store>(key: K, value: Store[K]) {
    return localStorage.setItem(this.key, JSON.stringify({ ...this.getStore(), [key]: value }));
  }
}
