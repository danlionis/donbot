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
    let wtgLink = (<any>bot.settings.extras)["watchtogether_link"];
    let embed = new Discord.RichEmbed()
    embed
      .setColor("#FACD3B")
      .addField(`${message.member.displayName} invited you to Watch2Gether`, wtgLink)
      .setTimestamp()
    if (message.member.voiceChannel && parsedMessage.args[0] === "p") {
      message.member.voiceChannel.members.map((member) => {
        member.send(embed);
      })
    } else {
      message.channel.send(embed);
    }
    message.delete();
  }
}

export default WatchTogether;
