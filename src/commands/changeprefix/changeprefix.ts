import { TextCommand } from '../../mixins';
import { BotSettings } from '../../bot-settings';
import * as Discord from 'discord.js';

import { ParsedMessage } from '../../types';

export class ChangePrefix extends TextCommand {
  static get is() {
    return "prefix"
  }

  static get permissions() {
    return [
      "ADMINISTRATOR"
    ]
  }

  static run(messsage: Discord.Message, parsedMessage: ParsedMessage) {
    BotSettings.BOT_CMD_PREFIX = parsedMessage.args[0]
    messsage.reply(`Changed command prefix to ${BotSettings.BOT_CMD_PREFIX}`)
  }
}

export default ChangePrefix;