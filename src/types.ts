export interface ParsedMessage {
  is: string;
  args?: Array<any>;
}

export interface BotConfig {
  token?: string;
  prefix?: string;
  buildInCommands?: boolean;
  buildInFilters?: boolean;
}