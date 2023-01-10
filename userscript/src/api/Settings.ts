export default class Settings<Store extends Record<string, any> = {}> {
  constructor(public key = "niou_settings", public defaults: Store) {}

  public getStore(): Store {
    return JSON.parse(localStorage.getItem(this.key) || "{}");
  }
  public get(key: keyof Store) {
    return this.getStore()[key] ?? this.defaults[key];
  }
  public set<K extends keyof Store>(key: K, value: Store[K]) {
    return localStorage.setItem(this.key, JSON.stringify({ ...this.getStore(), [key]: value }));
  }
}
