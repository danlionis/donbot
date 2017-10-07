declare module "*.json" {
  const value: Object;
  export = value;
}

declare interface Bot {
  BOT_LOGIN_TOKEN: string,
  BOT_CMD_PREFIX: string
}

declare interface CommandType {
  is?: string;
  command: string;
  args?: Array<any>;
  help?: string;
}

declare interface ParsedMessage {
  is: string;
  args?: Array<any>;
}