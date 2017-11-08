import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

export class OutputCommand extends TextCommand {
  
  constructor() {
    super({
      command: "outputcommand",
      aliases: [
        "oc"
      ],
      description: "Outputs the contents of a command to the console",
      permissions: [
        "ADMINISTRATOR"
      ],
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    super.run(bot, message, parsedMessage);
    message.reply("Test Command")
  }
}
