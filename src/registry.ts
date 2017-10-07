import { TextCommand } from './types/command';

import { } from 'module';


export class Registry {

  private static textCommands: Array<typeof TextCommand> = new Array();;

  constructor() {
  }

  addTextCommand(command: typeof TextCommand) {
    Registry.textCommands.push(command)
  }


  getTextCommand(message: ParsedMessage): typeof TextCommand {
    for (var i = 0; i < Registry.textCommands.length; i++) {
      let command: typeof TextCommand = Registry.textCommands[i];
      console.log(message.is, command.is);
      if (message.is === command.is) {
        return command;
      }
    }

    return null;
  }

  static getAllTextCommands(): Array<typeof TextCommand> {
    return this.textCommands;
  }
}

export default Registry;