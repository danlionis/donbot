import * as Discord from 'discord.js';
import { TextCommand } from '../../mixins/';
import { ParsedMessage } from '../../types';



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

  static get permissions() {
    return [
      "ADMINISTRATOR",
      "MANAGE_CHANNELS"
    ]
  }

  static run(message: Discord.Message, parsedMessage: ParsedMessage) {
    console.log("run command");
    message.reply('test command');
  }
}

export default Test;
