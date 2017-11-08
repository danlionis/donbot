import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

export class ChangePrefix extends TextCommand {

  constructor() {
    super({
      command: "prefix",
      description: "set a new prefix for all commands",
      help: "prefix [new prefix]",
      ownerOnly: true
    })
  }
  
  async run(bot: Bot, messsage: Discord.Message, parsedMessage: ParsedMessage) {
    bot.settings.prefix = parsedMessage.args[0]
    messsage.reply(`Changed command prefix to ${bot.settings.prefix}`)
  }
}

export default ChangePrefix;