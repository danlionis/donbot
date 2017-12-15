import { Message, PermissionResolvable } from "discord.js";
import { Bot } from "../";
import { CommandHandler } from "../command-handler";
import { ParsedMessage } from "../utils/parser";

export interface TextCommandConfig {
  command: string;
  description?: string;
  help?: string;
  permissions?: Array<string | number>;
  roles?: string[];
  minRole?: string;
  aliases?: string[];
  ownerOnly?: boolean;
  args?: Argument[];
  flags?: Flag[];
}

export interface Argument {
  name: string;
  pattern: RegExp;
  value?: string;
  default?: any;
  description?: string;
}

export interface Flag {
  name: string;
  short: string;
  long: string;
  description?: string;
}

export abstract class TextCommand {

  private _command: string;
  private _description: string;
  private _help: string;
  private _permissions: Array<string | number>;
  private _roles: string[];
  private _minRole: string;
  private _aliases: string[];
  private _ownerOnly: boolean;
  private _args: Argument[];
  private _flags: Flag[];

  constructor({
    command, description = "empty", help = "empty",
    permissions = [], roles = [], minRole = "", aliases = [],
    ownerOnly = false, args = [], flags = [],
  }: TextCommandConfig) {
    this._command = command;
    this._description = description;
    this._help = help;
    this._permissions = permissions.map((p) => {
      if (typeof p === "string") {
        p.toUpperCase();
      }
      return p;
    });
    this._roles = roles;
    this._minRole = minRole;
    this._ownerOnly = ownerOnly;
    aliases.push(command);
    this._aliases = aliases;
    this._args = args.map((arg) => {
      arg.pattern = new RegExp(arg.pattern);
      return arg;
    });
    this._flags = flags.map((flag) => {
      flag.short = flag.short.toLowerCase();
      flag.long = flag.long.toLowerCase();
      return flag;
    });

    this._flags.push({ name: "help", short: "h", long: "help" });

  }

  public get onwerOnly(): boolean {
    return this._ownerOnly;
  }

  /**
   * Main name of the command
   */
  public get is(): string {
    return this._command;
  }

  /**
   * All names for the command
   */
  public get aliases(): string[] {
    return this._aliases;
  }

  /**
   * Command description
   */
  public get description(): string {
    return this._description;
  }

  /**
   * Command help
   */
  public get help(): string {
    return this._help;
  }

  /**
   * User permissions required by the command
   */
  public get permissions(): Array<string | number> {
    return this._permissions;
  }

  public get roles(): string[] {
    return this._roles;
  }

  public get minRole(): string {
    return this._minRole;
  }

  public get args(): Argument[] {
    return this._args;
  }

  public get flags(): Flag[] {
    return this._flags;
  }

  /**
   * Run the command
   * @param message {Discord.Message} - raw message
   * @param parsedMessage {ParsedMessage} - parsed message
   * @param registry {Registry} - registry
   */
  public abstract async run(bot: Bot, message: Message, parsedMessage: ParsedMessage): Promise<any>;

}

export default TextCommand;
