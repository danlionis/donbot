import * as fs from "fs";
import * as yaml from "js-yaml";
import * as path from "path";
import { promisify } from "util";

export interface Config {
  token: string;
  prefix: string;
  owner_id: string;
  bot_name: string;
}

export function load_config(): Config {
  let file = fs.readFileSync(
    __dirname + "/../shared/config/config.bot.yaml",
    "utf8"
  );

  const doc: Config = yaml.safeLoad(file);

  let res: Config;
  try {
    file = fs.readFileSync(
      path.resolve(__dirname + "/../config/config.bot.yaml"),
      "utf8"
    );
    res = { ...doc, ...yaml.safeLoad(file) };
  } catch {
    res = { ...doc };
  }
  return res;
}
