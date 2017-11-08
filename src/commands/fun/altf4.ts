import { TextCommand } from '../../mixins';
import { Bot, ParsedMessage } from '../../';
import * as Discord from 'discord.js';

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
    setTimeout(function() {
      message.member.setDeaf(false);
    }, 1000 * 60);
  }
}