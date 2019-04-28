import * as fs from "fs";
import * as yaml from "js-yaml";
import { promisify } from "util";

export interface Config {
  token: string;
  owner_id: string;
  prefix: string;
}

export function load_config(): Config {
  let file = fs.readFileSync(
    __dirname + "/../shared/config/config.bot.yaml",
    "utf8"
  );

  const doc: Partial<Config> = yaml.safeLoad(file);

  file = fs.readFileSync(__dirname + "/../config/config.bot.yaml", "utf8");
  const res: Config = { ...doc, ...yaml.safeLoad(file) };

  return res;
}
