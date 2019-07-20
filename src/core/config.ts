import * as fs from "fs";
import * as yaml from "js-yaml";
import * as path from "path";

export interface Config {
  token: string;
  prefix: string;
  owner_id: string;
  bot_name: string;
  role: string;
  command_depth: number;
  standard_module: boolean;
  voice_module: boolean;
}

export function load_config(): Config {
  let file = fs.readFileSync(
    // __dirname + "../../shared/config/config.bot.yaml",
    path.resolve("./shared/config/config.bot.yaml"),
    "utf8"
  );

  const doc: Config = yaml.safeLoad(file);

  let res: Config;
  try {
    file = fs.readFileSync(
      path.resolve("./config/config.bot.yaml"),

      "utf8"
    );
    res = { ...doc, ...yaml.safeLoad(file) };
  } catch {
    res = { ...doc };
  }

  // console.log("config: path ", path.resolve("./config/config.bot.yaml"));
  return res;
}
