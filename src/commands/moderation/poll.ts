import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

export class Poll extends TextCommand {

  constructor() {
    super({
      command: "poll",
      aliases: [
        "vote"
      ],
      description: "start a new vote",
      help: "poll [title...]"
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    message.delete();
    let embed = new Discord.RichEmbed();

    embed.setFooter(`Poll by ${message.member.displayName}`)
      .setAuthor(parsedMessage.args.join(" "))
      .setColor("#2196F3");

    message.channel.send(embed).then((poll: Discord.Message) => {
      poll.react("👍").then(success => {
        poll.react("👎").then(success => {
          poll.react("🤷")
        })
      })
    })
  }
}
