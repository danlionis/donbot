import * as fs from "fs";
import { Box, FileStore } from "kvbox";

export class DatastoreManager {
  private handles: Map<string, Box> = new Map();

  private store: FileStore;

  constructor() {
    this.store = new FileStore({ path: "shared/data/db.json" });
  }

  public namespace(namespace: string): Box {
    if (this.handles.has(namespace)) {
      return this.handles.get(namespace);
    }

    const ds = new Box({
      store: this.store,
      namespace: namespace
    });
    this.handles.set(namespace, ds);
    return ds;
  }
}
