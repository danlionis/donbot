import * as Discord from 'discord.js';
import { Bot } from '../';
import { TextCommand } from '../mixins';
import { ParsedMessage } from '../utils/parser';

export class AltF4 extends TextCommand {
  constructor() {
    super({
      command: "altf4",
      description: "surprise",
      permissions: [
        // "DEAFEN_MEMBERS"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    message.member.setDeaf(true);
    message.member.setMute(true);
    setTimeout(function() {
      message.member.setDeaf(false);
      message.member.setMute(false);
    }, 1000 * 60);
  }
}