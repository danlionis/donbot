import * as Discord from 'discord.js';

declare module "donbot" {


  class Bot {
    registry: Registry;
    settings: BotSettings;
    /**
     *
     * @param {string} token login token for the bot
     * @param {string} prefix prefix for bot commands
     * @param opts options for bot
     */
    constructor({ token, prefix, buildInCommands, buildInFilters }: BotConfig);
    private ready();
    private registerCommmands<T>(commands);
    private registerFilters(filters);
    /**
     * set the login token
     */
    loginToken: string;
    /**
     * set the command prefix
     */
    commandPrefix: string;
    /**
     * connect the bot
     * @param {string} token login token for the bot
     */
    connect(token?: string): void;
    private messages();
  }

  class BotSettings {
    private _token;
    private _prefix;
    private readonly defaultPrefix;
    token: string;
    prefix: string;
  }

  class Registry {
    private textCommands;
    private chatFilters;
    constructor();
    /**
     * Adds a new command to the registry
     * @param constructor Constructor of the command class
     */
    addTextCommand<T extends TextCommand>(constructor: new () => T): void;
    /**
     * get the command class associated with the command name
     * @param {string} name command name
     */
    getTextCommand(name: string): TextCommand;
    getAllTextCommands(): Array<TextCommand>;
  }

  class TextCommand {
    private _command;
    private _description;
    private _help;
    private _permissions;
    constructor(config?: TextCommandConfig);
    /**
     * get the name of the command
     */
    readonly is: string;
    /**
     * get the description of the command
     */
    readonly description: string;
    /**
     * get the help text of the command
     */
    readonly help: string;
    /**
     * get required permissions for the command
     */
    readonly permissions: Array<string | number>;
    /**
     * Run the command
     * @param message {Discord.Message} - raw message
     * @param parsedMessage {ParsedMessage} - parsed message
     * @param registry {Registry} - registry
     */
    run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage): Promise<void>;
  }

  interface ParsedMessage {
    is: string;
    args?: Array<any>;
  }

  interface BotConfig {
    token?: string;
    prefix?: string;
    buildInCommands?: boolean;
    buildInFilters?: boolean;
  }

  interface TextCommandConfig {
    command: string;
    description?: string;
    help?: string;
    permissions?: Array<string | number>;
  }

}