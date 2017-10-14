import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

export class Clear extends TextCommand {

  constructor() {
    super({
      command: "clear",
      help: "clear <silent?>",
      description: "Clears the last 100 chat messages",
      permissions: [
        "MANAGE_MESSAGES"
      ]
    });
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    message.channel.fetchMessages({ limit: 99 }).then((messages) => {
      if (messages.array().length >= 2) {
        message.channel.bulkDelete(messages);
        if (parsedMessage.args[0] !== "silent" && parsedMessage.args[0] !== "s") {
          message.channel.send(`Messages cleared by ${message.author.toString()}`)
        }
      }
    })
  }
}

export default Clear;
