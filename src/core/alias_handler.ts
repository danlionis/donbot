import Datastore from "kvbox";
import { format_string } from "../utils/formatter";
import { Bot } from "./bot";

export interface Alias {
  key: string;
  expansion: string;
  flags: {
    skip_permission: boolean;
  };
}

export class AliasHandler {
  public readonly store: Datastore;

  constructor(private bot: Bot) {
    this.store = bot.datastore.namespace("alias");
  }

  public add(alias: Alias) {
    // replace escaped variables with normal variables
    alias.expansion = alias.expansion.replace("\\$", "$");

    return this.store.set(alias.key, alias);
  }

  public async resolve(query: string): Promise<Alias> {
    const keys = query.split(" ");
    const key = keys.shift();
    const a = await this.store.get<Alias>(key);

    if (!a) {
      return null;
    }

    a.expansion = format_string(a.expansion, ...keys).trim();
    // a.expansion = "noop " + a.expansion; // append every expansion with a noop, not sure yet if this is the way to go
    return a;
  }

  public async has(key: string) {
    return this.store.has(key);
  }

  public async remove(key: string) {
    return this.store.delete(key);
  }

  public async clear() {
    return this.store.clear();
  }
}
