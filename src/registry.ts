import { TextCommand, ChatFilter } from './mixins';

export class Registry {

  private textCommands: Array<TextCommand> = new Array();
  private chatFilters: Array<ChatFilter> = new Array();

  constructor() {
  }

  /**
   * Adds a new command to the registry
   * @param constructor Constructor of the command class
   */
  addTextCommand<T extends TextCommand>(constructor: new() => T) {

    let cmd: TextCommand = new constructor();
    
    this.textCommands.push(cmd);
    console.log("[Registry] + (textCommand)", cmd.is);
  }

  /**
   * Adds a new filter to the registry
   * @param constructor Constructor of the filter class
   */
  addChatFilter(constructor: typeof ChatFilter) {
    // this.chatFilters.push(constructor);
    // console.log("[Registry] + (filter)", constructor.filter);
  }


  /**
   * get the command class associated with the command name
   * @param {string} name command name
   */
  getTextCommand(name: string): TextCommand {
    for (var i = 0; i < this.textCommands.length; i++) {
      let command: TextCommand = this.textCommands[i];
      if (name === command.is) {
        return command;
      }
    }

    return null;
  }

  getAllTextCommands(): Array<TextCommand> {
    return this.textCommands;
  }
}

export default Registry;