import { TextCommand, ChatFilter } from './mixins';


export class Registry {

  private textCommands: Array<typeof TextCommand> = new Array();
  private chatFilters: Array<typeof ChatFilter> = new Array();

  constructor() {
  }

  /**
   * Adds a new command to the registry
   * @param constructor Constructor of the command class
   */
  addTextCommand(constructor: typeof TextCommand) {
    this.textCommands.push(constructor)
    console.log("[Registry] + (textCommand)", constructor.is);
  }

  /**
   * Adds a new filter to the registry
   * @param constructor Constructor of the filter class
   */
  addChatFilter(constructor: typeof ChatFilter) {
    this.chatFilters.push(constructor);
    console.log("[Registry] + (filter)", constructor.filter);
  }


  /**
   * get the command class associated with the command name
   * @param {string} name command name
   */
  getTextCommand(name: string): typeof TextCommand {
    for (var i = 0; i < this.textCommands.length; i++) {
      let command: typeof TextCommand = this.textCommands[i];
      if (name === command.is) {
        return command;
      }
    }

    return null;
  }

  getAllTextCommands(): Array<typeof TextCommand> {
    return this.textCommands;
  }
}

export default Registry;