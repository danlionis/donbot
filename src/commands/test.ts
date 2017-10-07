import * as Discord from 'discord.js';
import { TextCommand } from '../types/command';

export class Test extends TextCommand {

  constructor() {
    super();
  }

  static get is() {
    return "test";
  }

  static get description() {
    return "test description"
  }

  static get help() {
    return "huiffee";
  }

  static get args() {
    return [
      {
        name: "arg1",
        aliases: [
          "a"
        ]
      }
    ]
  }


  static run(message: Discord.Message, parsedMessage: ParsedMessage) {
    message.reply('test command');
  }
}

export default Test;
