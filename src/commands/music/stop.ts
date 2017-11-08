import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

let roles = [
  "DJ"
]

export class Stop extends TextCommand {
  constructor() {
    super({
      command: "stop",
      description: "stop streaming",
      roles: roles
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage): Promise<any> {
    let con = bot.getVoiceConnection(message);

    if (!con) {
      message.reply("Es konnte keine Verbindung hergestellt werden")
    } else if (con.player.dispatcher) {
      con.player.dispatcher.end()
    }
  }
}