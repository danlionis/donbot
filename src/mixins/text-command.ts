import * as Discord from 'discord.js';
import { Bot } from '../';
import { ParsedMessage, TextCommandConfig } from '../types';


export class TextCommand {

  private _command: string;
  private _description: string;
  private _help: string
  private _permissions: Array<string>
  private _roles: Array<string>;
  private _minRole: string;
  private _aliases: Array<string>;
  private _ownerOnly: boolean;


  constructor({ command = "", description = "", help = "", permissions = [], roles = [], minRole = "", aliases = [], ownerOnly = false }: TextCommandConfig) {
    this._command = command;
    this._description = description;
    this._help = help;
    this._permissions = permissions.map(p => p.toUpperCase());
    this._roles = roles;
    this._minRole = minRole;
    this._ownerOnly = ownerOnly;
    aliases.unshift(command);
    this._aliases = aliases;
  }

  public get onwerOnly(): boolean {
    return this._ownerOnly;
  }

  /**
   * get the name of the command
   */
  public get is(): string {
    return this._command;
  }

  /**
   * get all possilbe aliases for this command
   */
  public get aliases(): Array<string> {
    return this._aliases;
  }

  /**
   * get the description of the command
   */
  public get description(): string {
    return this._description;
  }

  /**
   * get the help text of the command
   */
  public get help(): string {
    return this._help;
  }

  /**
   * get required permissions for the command
   */
  public get permissions(): Array<string | number> {
    return this._permissions;
  }

  public get roles(): Array<string> {
    return this._roles;
  }

  public get minRole(): string {
    return this._minRole;
  }

  /**
   * Run the command
   * @param message {Discord.Message} - raw message
   * @param parsedMessage {ParsedMessage} - parsed message
   * @param registry {Registry} - registry
   */
  //TODO: args
  // public async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage): Promise<any> {
  //   return message.channel.send("there is no command with this name");
  // }
  public async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage): Promise<any> {
    if (parsedMessage.args[0] === "-h") {
      message.author.send(this.help);
    }
  }

}

export default TextCommand;