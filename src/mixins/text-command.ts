import * as Discord from 'discord.js';

export class TextCommand {

  constructor() {
    console.log("constructor of a command");
  }

  static get is(): string {
    return undefined;
  }

  static get description(): string {
    return undefined;
  }

  static get help(): string {
    return undefined;
  }

  static run(message: Discord.Message, parsedMessage: ParsedMessage): void {
    message.channel.send("there is no command with this name");
  }

}

export default TextCommand;