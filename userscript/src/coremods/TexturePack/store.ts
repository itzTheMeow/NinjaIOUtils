import localForage from "localforage";

export class TexturePackModStore {
  public instance = localForage.createInstance({
    name: "nutils_texpack_store",
  });
  constructor() {}
}
