import * as Discord from 'discord.js';
import { TextCommand } from '../../mixins/text-command';
import { BotSettings } from '../../bot-settings';

import { ParsedMessage } from '../../types';


export class Clear extends TextCommand {

  constructor() {
    super();
  }

  static get is() {
    return "clear";
  }

  static get help() {
    return `${BotSettings.BOT_CMD_PREFIX}clear <silent>`;
  }

  static get description() {
    return "clears the last 100 chat messages"
  }

  static get permissions(): Array<string> {
    return [
      "MANAGE_MESSAGES"
    ]
  }
  static run(message: Discord.Message, parsedMessage: ParsedMessage) {
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
