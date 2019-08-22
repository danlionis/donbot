import * as fs from "fs";
import * as yaml from "js-yaml";
import * as path from "path";

export interface Config {
  /**
   * Token used for login
   */
  token: string;

  /**
   * Default prefix used for invoke commands
   */
  prefix: string;

  /**
   * Owner id. The user with this id skips any permission checks
   */
  ownerId: string;

  botName: string;
  adminRole: string;
  botRole: string;

  /**
   * Number of commands that need to be nested until execution stops
   */
  commandDepth: number;

  /**
   * register the standard module
   */
  useStdModule: boolean;

  /**
   * register the voice module
   */
  useVoiceModule: boolean;

  /**
   * Reissue commands when the source message is edited
   */
  handleEdits: boolean;
}

export function load_config(): Config {
  const defaultConfig: Config = {
    token: undefined,
    prefix: ".",
    ownerId: undefined,
    botName: "donbot",
    adminRole: undefined,
    botRole: undefined,
    commandDepth: 10,
    useStdModule: true,
    useVoiceModule: true,
    handleEdits: true
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
