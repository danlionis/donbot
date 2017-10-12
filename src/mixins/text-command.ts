import * as Discord from 'discord.js';
import { Registry } from '../registry';
import { Bot } from '../';
import { ParsedMessage } from '../types';


class TextCommand {

  constructor() {
    console.log("constructor of a command");
  }

  /**
   * get the name of the command
   */
  public static get is(): string {
    return undefined;
  }

  /**
   * get the description of the command
   */
  public static get description(): string {
    return undefined;
  }

  /**
   * get the help text of the command
   */
  public static get help(): string {
    return undefined;
  }

  /**
   * get required permissions for the command
   */
  public static get permissions(): Array<string> {
    return null;
  }

  /**
   * Run the command
   * @param message {Discord.Message} - raw message
   * @param parsedMessage {ParsedMessage} - parsed message
   * @param registry {Registry} - registry
   */
  public static run(message: Discord.Message, parsedMessage: ParsedMessage, bot?: Bot): void {
    message.channel.send("there is no command with this name");
  }

}

export default TextCommand;
export {
  TextCommand,
};