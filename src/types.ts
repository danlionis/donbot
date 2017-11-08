export interface ParsedMessage {
  is: string;
  args?: Array<any>;
}

export interface BotConfig {
  token?: string;
  prefix?: string;
  buildInCommands?: boolean;
  buildInMusicCommands?: boolean;
  buildInFilters?: boolean;
  extras?: Object;
  game?: string;
  notifyUnknownCommand?: boolean;
  owner?: string;
}

export interface TextCommandConfig {
  command: string;
  description?: string;
  help?: string;
  permissions?: Array<string>;
  roles?: Array<string>;
  minRole?: string;
  aliases?: Array<string>;
  ownerOnly?: boolean;
}

export interface ChatFilterConfig {
  filter: string;
  description?: string;
  aliases?: Array<string>;
}