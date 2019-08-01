import { Datastore, FileStore } from "kvbox";

export class DatastoreManager {
  private handles: Map<string, Datastore> = new Map();

  private store = new FileStore({ path: "shared/data/db.json" });

  constructor() {}

  public namespace(namespace: string): Datastore {
    if (this.handles.has(namespace)) {
      return this.handles.get(namespace);
    }

    return new Datastore({
      store: this.store,
      namespace: namespace
    });
  }
}
