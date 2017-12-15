import { Bot } from "./bot";
import { Help } from "./commands";
import { TextCommand } from "./mixins";
import { ParsedMessage } from "./utils/parser";

import * as Discord from "discord.js";

import * as colors from "colors/safe";

export class Registry {

  public textCommands: TextCommand[] = new Array();

  private _helpCommand: TextCommand;

  constructor() {
    this.addTextCommand(Help);
  }

  /**
   * Adds a new command to the registry
   * @param constructor Constructor of the command class
   */
  public addTextCommand<T extends TextCommand>(constructor: new () => T) {
    const cmd: TextCommand = new constructor();
    this.textCommands.push(cmd);
    console.log(colors.yellow("[R]"), "+", colors.blue("(C)"), constructor.name);
  }

  /**
   * get the command class associated with the command name
   * @param {string} name command name
   */
  public getTextCommand(name: string): TextCommand {
    // find a textCommand where any aliase equals the provided name
    return this.textCommands.find((tc) => tc.aliases.some((a) => a === name));
  }

  /**
   * Execute a command
   * @param command exact command name
   * @param bot
   * @param message
   * @param parsedMessage
   */
  public executeCommand(command: string, bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    const cmd = this.textCommands.find((tc) => tc.is === command);
    return cmd.run(bot, message, parsedMessage);
  }

}

export default Registry;
