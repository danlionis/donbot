import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

export class Test extends TextCommand {
  constructor() {
    super({
      command: "test",
      help: "huifee",
      description: "beschreibung",
      permissions: [
        "ADMINSTRATOR"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    super.run(bot, message, parsedMessage);
    message.reply("Test Command")
  }  
}
