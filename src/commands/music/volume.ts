import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

let roles = [
  "DJ"
]

export class Volume extends TextCommand {
  constructor() {
    super({
      command: "volume",
      description: "set the volume from 1-10",
      roles: roles,
      aliases: [
        "dc"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let con = bot.getVoiceConnection(message);

    if (!con) return;

    let volumeMultiplier = 10
    let volume: number = parsedMessage.args[0];

    if (!volume) {
      message.reply(`Volume is set to ${con.dispatcher.volume * volumeMultiplier}`)
    } else if (volume >= 1 && volume <= volumeMultiplier && con.dispatcher) {
      con.dispatcher.setVolume(volume / volumeMultiplier);
      message.reply(`Changed volume to ${volume}`);
    }
    console.log(volume);
  }
}