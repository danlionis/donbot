import * as Discord from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";

export class AltF4 extends TextCommand {
  constructor() {
    super({
      command: "altf4",
      description: "surprise",
      permissions: [
        // "DEAFEN_MEMBERS"
      ],
    });
  }

  public async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    message.member.setDeaf(true);
    message.member.setMute(true);
    setTimeout(() => {
      message.member.setDeaf(false);
      message.member.setMute(false);
    }, 1000 * 60);
  }
}
export class TrollMove extends TextCommand {

  constructor() {
    super({
      command: "nerv",
      description: "Testnachricht senden",
      permissions: [
        "ADMINISTRATOR",
      ],
      // minRole: "Mod"
    });
  }

  public async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    const channels = message.guild.channels.filter((c) => c.type === "voice").array();
    const member = message.mentions.members.first() || message.member;

    if (!member.voiceChannel) {
      return message.reply("User has to be connected to a voice channel");
    }

    const voiceChannel = member.voiceChannel;
    channels.push(voiceChannel);

    move();

    function move() {
      const c = channels.shift();

      if (!c) return;

      member.setVoiceChannel(c).then(() => {
        setTimeout(() => {
          move();
        }, 500);
      });
    }
  }
}
