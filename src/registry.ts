import { TextCommand } from './mixins/command';


export class Registry {

  private textCommands: Array<typeof TextCommand> = new Array();;

  constructor() {
  }

  /**
   * Adds a new command to the registry
   * @param constructor Constructor of the command class
   */
  addTextCommand(constructor: typeof TextCommand) {
    this.textCommands.push(constructor)
  }


  getTextCommand(name: string): typeof TextCommand {
    for (var i = 0; i < this.textCommands.length; i++) {
      let command: typeof TextCommand = this.textCommands[i];
      console.log(name, command.is);
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