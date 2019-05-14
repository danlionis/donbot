// import * as fs from "fs";
// import * as path from "path";
// import { Provider } from "./provider";

// export interface DatastoreOptions {
//   seperator?: string;
// }

// interface HasOptions {
//   guildId?: string;
// }

// interface GetOptions<T> {
//   guildId?: string;
//   defaultValue?: T;
// }

// interface SetOptions<T> {
//   guildId?: string;
//   merge?: boolean;
// }

// interface DeleteOptions<T> {
//   value?: string;
//   guildId?: string;
// }

// export class Datastore extends Provider {
//   private root = {};
//   private readonly dir;
//   private readonly seperator;

//   constructor(filename: string, opts: DatastoreOptions = {}) {
//     super();
//     const { seperator } = opts;
//     this.dir = path.resolve(filename);
//     this.seperator = seperator || ".";
//     this.createFileIfNotExist();
//     this.loadData();
//   }

//   public get data() {
//     return this.root;
//   }

//   public has(key: string) {
//     const pathSegments = this.getPathSegments(key);
//     let result = true;
//     pathSegments.reduce((o, i) => {
//       if (o[i] === undefined) {
//         result = false;
//         return "";
//       }
//       return o[i];
//     }, this.root);

//     return result;
//   }

//   public get<T>(key: string, defaultValue: T): T {
//     const pathSegments = this.getPathSegments(key);
//     let result = pathSegments.reduce((o, i) => {
//       if (o[i] === undefined) {
//         return "";
//       }
//       return o[i];
//     }, this.root);

//     if (result === "") {
//       result = defaultValue || null;
//     }
//     return result as T;
//   }
//   public async delete<T>(key: string): Promise<T> {
//     const result: T = this.get(key, null);

//     delete this.data[key];

//     this.saveToFile();

//     return result;
//   }

//   public async set<T>(key: string, value: T) {
//     let ref = this.root;

//     const pathSegments = this.getPathSegments(key);

//     for (let i = 0; i < pathSegments.length - 1; i++) {
//       const p = pathSegments[i];
//       if (!ref[p]) {
//         ref[p] = {};
//       }
//       // shift reference
//       ref = ref[p];
//     }

//     const lastSegment = pathSegments[pathSegments.length - 1];

//     if (value instanceof Array) {
//       // Value is an Array
//       if (merge && ref[lastSegment] instanceof Array) {
//         (ref[lastSegment] as any[]).push(...value);
//       } else {
//         ref[lastSegment] = value;
//       }
//     } else if (value instanceof Object) {
//       // Value is an Object
//       // clone object
//       value = Object.assign({}, value);

//       if (merge) {
//         ref[lastSegment] = Object.assign(ref[lastSegment], value);
//       } else {
//         ref[lastSegment] = value;
//       }
//     } else {
//       // Value is a simply type
//       ref[lastSegment] = value;
//     }
//     await this.saveToFile();
//     return value;
//   }

//   public async reload() {
//     return this.loadData();
//   }

//   public clear() {
//     this.root = {};
//     return this.saveToFile();
//   }

//   private getPathSegments(key: string) {
//     return key.split(this.seperator);
//   }

//   private loadData() {
//     return new Promise<any>((resolve, reject) => {
//       fs.readFile(this.dir, "utf8", (err, file) => {
//         if (err) {
//           reject(err);
//         } else {
//           this.root = JSON.parse(file);
//           resolve(file);
//         }
//       });
//     });
//   }

//   private saveToFile(): Promise<boolean> {
//     return new Promise((resolve, reject) => {
//       fs.writeFile(this.dir, JSON.stringify(this.root), (err) => {
//         if (!err) {
//           resolve(true);
//         } else {
//           reject(err);
//         }
//       });
//     });
//   }

//   private createFileIfNotExist() {
//     if (!fs.existsSync(this.dir)) {
//       fs.writeFileSync(this.dir, "{}");
//     }
//   }
// }

// export default Datastore;
