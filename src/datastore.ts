import * as fs from "fs";
import * as path from "path";
import { Bot } from ".";

export interface DatastoreOptions {
  seperator?: string;
}

interface GetOptions<T> {
  guildId?: string;
  defaultValue?: T;
}

interface SetOptions<T> {
  guildId?: string;
  merge?: boolean;
}

interface DeleteOptions<T> {
  value?: string;
  guildId?: string;
}

export class Datastore {
  private root = {};
  private readonly dir;
  private readonly seperator;

  constructor(filename: string, opts: DatastoreOptions = {}) {
    const { seperator } = opts;
    this.dir = path.resolve(filename);
    this.seperator = seperator || ".";
    this.createFileIfNotExist();
    this.loadData();
  }

  public get data() {
    return this.root;
  }

  public has(key: string) {
    const pathSegments = this.getPathSegments(key);
    let result = true;
    pathSegments.reduce((o, i) => {
      if (!o[i]) {
        result = false;
        return "";
      }
      return o[i];
    }, this.root);

    return result;
  }

  public get<T>(key: string, getOptions?: GetOptions<T>): T {
    const { guildId, defaultValue } = getOptions;
    if (guildId) {
      key = `${guildId}.${key}`;
    }
    const pathSegments = this.getPathSegments(key);
    let result = pathSegments.reduce((o, i) => {
      if (!o[i]) {
        return "";
      }
      return o[i];
    }, this.root);

    if (!result) {
      result = defaultValue || null;
    }
    return result as T;
  }

  /**
   * Save a value in the database
   * The Path can be seperated by dot-notation
   *
   * @param key key where the value is going to be saved
   * @param value value to save
   */
  public async _set_legacy<T>(
    key: string,
    value: T,
    merge = false
  ): Promise<T> {
    const pathSegments = this.getPathSegments(key);

    let ref = this.root;

    for (let i = 0; i < pathSegments.length - 1; i++) {
      const p = pathSegments[i];
      if (!ref[p]) {
        ref[p] = {};
      }
      // shift reference
      ref = ref[p];
    }

    const lastSegment = pathSegments[pathSegments.length - 1];

    if (typeof value === "object" && !(value instanceof Array)) {
      value = Object.assign({}, value);
      if (merge) {
        ref[lastSegment] = Object.assign(ref[lastSegment], value as T);
      } else {
        ref[lastSegment] = value;
      }
    } else {
      ref[lastSegment] = value;
    }

    const saved = await this.saveToFile();
    return new Promise<T>((resolve) => {
      resolve(value);
    });
  }

  public async delete<T>(key: string, deleteOptions?: DeleteOptions<T>) {
    const { guildId, value } = deleteOptions;

    if (value) {
      const result = this.get<any[]>(key, { guildId });
      result.splice(result.indexOf(value));
    }

    this.saveToFile();

  }

  public async set<T>(key: string, value: T, setOptions?: SetOptions<T>) {
    const { merge, guildId } = setOptions;
    let ref = this.root;

    if (guildId) {
      key = `${guildId}.${key}`;
    }

    const pathSegments = this.getPathSegments(key);

    for (let i = 0; i < pathSegments.length - 1; i++) {
      const p = pathSegments[i];
      if (!ref[p]) {
        ref[p] = {};
      }
      // shift reference
      ref = ref[p];
    }

    const lastSegment = pathSegments[pathSegments.length - 1];

    if (value instanceof Array) {
      // Value is an Array
      if (merge && ref[lastSegment] instanceof Array) {
        (ref[lastSegment] as any[]).push(...value);
      } else {
        ref[lastSegment] = value;
      }
    } else if (value instanceof Object) {
      // Value is an Object
      // clone object
      value = Object.assign({}, value);

      if (merge) {
        ref[lastSegment] = Object.assign(ref[lastSegment], value);
      } else {
        ref[lastSegment] = value;
      }
    } else {
      // Value is a simply type
      ref[lastSegment] = value;
    }
    await this.saveToFile();
    return value;
  }

  public async reload() {
    return this.loadData();
  }

  public clear() {
    this.root = {};
    return this.saveToFile();
  }

  private getPathSegments(key: string) {
    return key.split(this.seperator);
  }

  private loadData() {
    return new Promise<any>((resolve, reject) => {
      fs.readFile(this.dir, "utf8", (err, file) => {
        if (err) {
          reject(err);
        } else {
          this.root = JSON.parse(file);
          resolve(file);
        }
      });
    });
  }

  private saveToFile(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.dir, JSON.stringify(this.root), (err) => {
        if (!err) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  }

  private createFileIfNotExist() {
    if (!fs.existsSync(this.dir)) {
      fs.writeFileSync(this.dir, "{}");
    }
  }
}

export default Datastore;
