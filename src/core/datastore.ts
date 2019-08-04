import * as fs from "fs";
import { Datastore, FileStore } from "kvbox";

export class DatastoreManager {
  private handles: Map<string, Datastore> = new Map();

  private store: FileStore;

  constructor() {
    fs.mkdirSync("shared/data", { recursive: true });

    this.store = new FileStore({ path: "shared/data/db.json" });
  }

  public namespace(namespace: string): Datastore {
    if (this.handles.has(namespace)) {
      return this.handles.get(namespace);
    }

    const ds = new Datastore({
      store: this.store,
      namespace: namespace
    });
    this.handles.set(namespace, ds);
    return ds;
  }
}
