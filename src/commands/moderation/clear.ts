import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

export class Clear extends TextCommand {

  constructor() {
    super({
      command: "clear",
      aliases: [
        "cls"
      ],
      help: "clear <silent?>",
      description: "Clears the last 100 chat messages",
      permissions: [
        "MANAGE_MESSAGES"
      ]
    });
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    message.channel.fetchMessages({ limit: 99 }).then((messages) => {

      // console.log(messages.map(m => m.createdAt.getTime()));

      // Filter all messages newer than 14 days 
      let time = new Date().getTime() - 14 * 24 * 60 * 60 * 1000;
      messages = messages.filter(m => m.createdAt.getTime() > time)

      if (messages.array().length >= 2) {
        message.channel.bulkDelete(messages.filter(m => !m.pinned));
        if (parsedMessage.args[0] !== "silent" && parsedMessage.args[0] !== "s") {
          message.channel.send(`Messages cleared by ${message.author.toString()}`)
        }
      }
    })
  }
}

export default Clear;
