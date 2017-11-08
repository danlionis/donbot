import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

let roles = [
  "DJ"
]

export class Join extends TextCommand {

  constructor() {
    super({
      command: "join",
      description: "join your voice channel",
      roles: roles
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let con = bot.getVoiceConnection(message);

    if (!message.member.voiceChannel) {
      return message.reply("You have to be in a Voice Channel")
    }
    if (con && con.channel.id === message.member.voiceChannel.id) {
      return message.reply("The Bot is already connected to your VoiceChannel")
    }

    return message.member.voiceChannel.join();
  }
}