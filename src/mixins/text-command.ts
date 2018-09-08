import { ColorResolvable, Message, PermissionResolvable } from "discord.js";
import { Bot } from "../";
import { CommandHandler } from "../command-handler";
import { ParsedMessage } from "../utils/parser";

export type PERMISSION =
  | "ADMINISTRATOR"
  | "CREATE_INSTANT_INVITE"
  | "KICK_MEMBERS"
  | "BAN_MEMBERS"
  | "MANAGE_CHANNELS"
  | "MANAGE_GUILD"
  | "ADD_REACTIONS"
  | "VIEW_AUDIT_LOG"
  | "VIEW_CHANNEL"
  | "READ_MESSAGES"
  | "SEND_MESSAGES"
  | "SEND_TTS_MESSAGES"
  | "MANAGE_MESSAGES"
  | "EMBED_LINKS"
  | "ATTACH_FILES"
  | "READ_MESSAGE_HISTORY"
  | "MENTION_EVERYONE"
  | "USE_EXTERNAL_EMOJIS"
  | "EXTERNAL_EMOJIS"
  | "CONNECT"
  | "SPEAK"
  | "MUTE_MEMBERS"
  | "DEAFEN_MEMBERS"
  | "MOVE_MEMBERS"
  | "USE_VAD"
  | "CHANGE_NICKNAME"
  | "MANAGE_NICKNAMES"
  | "MANAGE_ROLES"
  | "MANAGE_ROLES_OR_PERMISSIONS"
  | "MANAGE_WEBHOOKS"
  | "MANAGE_EMOJIS";

export interface TextCommandConfig {
  command: string;
  description?: string;
  usage?: string;
  permissions?: PERMISSION[];
  roles?: string[];
  minRole?: string;
  aliases?: string[];
  ownerOnly?: boolean;
  args?: Argument[];
  flags?: Flag[];
  group?: string;
  color?: ColorResolvable;
  enabled?: boolean;
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
  short?: string;
  long: string;
  description?: string;
}

export abstract class TextCommand {
  private _command: string;
  private _description: string;
  private _usage: string;
  private _permissions: PERMISSION[];
  private _roles: string[];
  private _minRole: string;
  private _aliases: string[];
  private _ownerOnly: boolean;
  private _args: Argument[];
  private _flags: Flag[];
  private _group: string;
  private _color: ColorResolvable;
  private _enabled: boolean;

  private _counter = 0;

  constructor({
    command,
    description,
    usage,
    permissions = [],
    roles = [],
    minRole = "",
    aliases = [],
    ownerOnly = false,
    args = [],
    flags = [],
    group = "unknown",
    color = "#FFEE58",
    enabled = true
  }: TextCommandConfig) {
    this._command = command;
    this._description = description;
    this._usage = usage;
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
    this._group = group;
    this._color = color;

    this._flags.push({
      name: "help",
      short: "h",
      long: "help",
      description: "Send this help message"
    });
    this._flags.push({
      name: "stats",
      long: "stats",
      description: "Send a stats for the command"
    });

    this._enabled = enabled;
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
  public get usage(): string {
    return this._usage;
  }

  public get color(): ColorResolvable {
    return this._color;
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

  public get group(): string {
    return this._group;
  }

  public get enabled(): boolean {
    return this._enabled;
  }

  public get counter(): number {
    return this._counter;
  }

  public disable() {
    this._enabled = false;
  }
  public enable() {
    this._enabled = true;
  }

  public increaseCounter() {
    this._counter += 1;
  }

  /**
   * Run the command
   * @param message {Discord.Message} - raw message
   * @param parsedMessage {ParsedMessage} - parsed message
   * @param registry {Registry} - registry
   */
  public abstract async run(
    bot: Bot,
    message: Message,
    parsedMessage: ParsedMessage
  ): Promise<any>;
}

export default TextCommand;
