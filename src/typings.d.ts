declare interface Bot {
  BOT_LOGIN_TOKEN: string,
  BOT_CMD_PREFIX: string
}

declare interface CommandType {
  is: string;
  args?: Array<any>;
  help?: string;
}

declare interface ParsedMessage {
  is: string;
  args?: Array<any>;
}

declare interface MessageBundle {
  // rawMessage: Discord.Message;
  parsedMessage: ParsedMessage;
  commandPrefix: string;
}
