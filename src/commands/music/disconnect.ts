import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

let roles = [
  "DJ"
]

export class Disconenct extends TextCommand {
  constructor() {
    super({
      command: "disconnect",
      description: "disconnects from your channel",
      roles: roles,
      aliases: [
        "dc"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let con = bot.getVoiceConnection(message);
    if (!con) {
      return;
    }
    bot.registry.executeCommand("stop", bot, message, parsedMessage);
    con.disconnect();
  }
}