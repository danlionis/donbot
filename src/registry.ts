import { TextCommand, ChatFilter } from './mixins';
import { Help } from './commands';
import { Bot } from './bot';
import { ParsedMessage } from './types';

import * as Discord from 'discord.js';

import * as colors from 'colors/safe';

export class Registry {

  textCommands: Array<TextCommand> = new Array();
  private chatFilters: Array<ChatFilter> = new Array();

  private _helpCommand: TextCommand;

  constructor() {
    this.addTextCommand(Help);

  }

  /**
   * Adds a new command to the registry
   * @param constructor Constructor of the command class
   */
  addTextCommand<T extends TextCommand>(constructor: new () => T) {
    let cmd: TextCommand = new constructor();
    this.textCommands.push(cmd);
    console.log(colors.yellow("[R]"), "+", colors.blue("(C)"), cmd.is);
  }

  /**
   * get the command class associated with the command name
   * @param {string} name command name
   */
  getTextCommand(name: string): TextCommand {

    // find a textCommand where any aliase equals the provided name
    return this.textCommands.find(tc => tc.aliases.some(a => a === name));
  }

  // get textCommands(): Array<TextCommand> {
  //   return this.textCommands;
  // }

  executeCommand(command: string, bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let cmd = this.textCommands.find(tc => tc.is === command);
    cmd.run(bot, message, parsedMessage);

  }


}

export default Registry;