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
  const defaultConfig: Config = {
    token: null,
    prefix: ".",
    owner_id: null,
    bot_name: "donbot",
    role: null,
    command_depth: 10,
    standard_module: true,
    voice_module: true
  };

  let res: Config;
  try {
    const file = fs.readFileSync(
      path.resolve("./shared/config/config.bot.yaml"),
      "utf8"
    );
    res = { ...defaultConfig, ...yaml.safeLoad(file) };
  } catch {
    res = { ...defaultConfig };
  }

  return res;
}
