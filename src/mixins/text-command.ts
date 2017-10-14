import * as Discord from 'discord.js';
import { Bot } from '../';
import { ParsedMessage, TextCommandConfig } from '../types';


export class TextCommand {

  private _command: string;
  private _description: string;
  private _help: string
  private _permissions: Array<string | number>

  constructor({ command = "", description = "", help = "", permissions = [] }: TextCommandConfig) {
    this._command = command;
    this._description = description;
    this._help = help;
    this._permissions = permissions;
  }


  /**
   * get the name of the command
   */
  public get is(): string {
    return this._command;
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
  public async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage): Promise<void> {
    if (parsedMessage.args[0] === "-h" || "h") {
      message.author.send(this.help);
    }
  }

}

export default TextCommand;