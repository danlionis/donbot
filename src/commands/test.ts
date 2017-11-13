import * as Discord from 'discord.js';
import { Bot } from '../';
import { TextCommand } from '../mixins';
import { ParsedMessage } from '../types';

export class Test extends TextCommand {

  constructor() {
    super({
      command: "test",
      aliases: [
        "testing"
      ],
      description: "Testnachricht senden",
      permissions: [
        // "ADMINISTRATOR"
      ],
      // minRole: "Mod"
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    super.run(bot, message, parsedMessage);
    message.reply("Test Command")
  }
}

export class TrollMove extends TextCommand {

  constructor() {
    super({
      command: "nerv",
      description: "Testnachricht senden",
      permissions: [
        "ADMINISTRATOR"
      ],
      // minRole: "Mod"
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let channels = message.guild.channels.filter(c => c.type === "voice").array();
    let member = message.mentions.members.first() || message.member;

    if (!member.voiceChannel) {
      return message.reply("User has to be connected to a voice channel")
    }

    let voiceChannel = member.voiceChannel;
    channels.push(voiceChannel);

    move();

    function move() {
      let c = channels.shift();

      if (!c) return;

      member.setVoiceChannel(c);
      setTimeout(function () {
        move();
      }, 500);
    }
  }
}