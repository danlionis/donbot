import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';



export class WatchTogether extends TextCommand {

  constructor() {
    super({
      command: "wtg",
      description: "sends a watchtogether link"
    });
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    // message.channel.send(BotSettings.WATCHTOGETHER_LINK)
    message.member.voiceChannel.members.map((member) => {
      member.send("asdlöfj")
    })
    message.delete();
    // console.log(message.member.voiceChannel.members.array());
  }
}

export default WatchTogether;
