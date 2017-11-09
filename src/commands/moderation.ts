import * as Discord from 'discord.js';
import { Bot } from '../';
import { TextCommand } from '../mixins';
import { ParsedMessage } from '../types';

export class Clear extends TextCommand {

  constructor() {
    super({
      command: "clear",
      aliases: [
        "cls"
      ],
      help: "clear <silent?>",
      description: "Clears the last 100 chat messages",
      permissions: [
        "MANAGE_MESSAGES"
      ]
    });
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    message.channel.fetchMessages({ limit: 99 }).then((messages) => {

      // console.log(messages.map(m => m.createdAt.getTime()));

      // Filter all messages newer than 14 days 
      let time = new Date().getTime() - 14 * 24 * 60 * 60 * 1000;
      messages = messages.filter(m => m.createdAt.getTime() > time)

      if (messages.array().length >= 2) {
        message.channel.bulkDelete(messages.filter(m => !m.pinned));
        if (parsedMessage.args[0] !== "silent" && parsedMessage.args[0] !== "s") {
          message.channel.send(`Messages cleared by ${message.author.toString()}`)
        }
      }
    })
  }
}

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

export class TimeMute extends TextCommand {
  constructor() {
    super({
      command: "timemute",
      description: "mute a member for a given time",
      permissions: [
        "MUTE_MEMBERS"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let muteUser = message.mentions.members.first();
    let regexDays = /\d+d/;
    let regexHours = /\d+h/;
    let regexMinutes = /\d+m/;
    let regexSeconds = /\d+s/;

    let time = parsedMessage.args[1] as string;

    let days = +(time.match(regexDays) || "0d")[0].slice(0, -1);
    let hours = +(time.match(regexHours) || "0h")[0].slice(0, -1);
    let minutes = +(time.match(regexMinutes) || "0m")[0].slice(0, -1);
    let seconds = +(time.match(regexSeconds) || "0s")[0].slice(0, -1);


    console.log(days, hours, minutes, seconds);

    let muteTime = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);

    muteUser.setMute(true);

    setTimeout(function () {
      muteUser.setMute(false);
    }, muteTime);
  }
}

export class TimeDeaf extends TextCommand {
  constructor() {
    super({
      command: "timedeaf",
      description: "deaf a member for a given time",
      permissions: [
        "DEAFEN_MEMBERS"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let user = message.mentions.members.first();
    let regexDays = /\d+d/;
    let regexHours = /\d+h/;
    let regexMinutes = /\d+m/;
    let regexSeconds = /\d+s/;

    let time = parsedMessage.args[1] as string;

    let days = +(time.match(regexDays) || "0d")[0].slice(0, -1);
    let hours = +(time.match(regexHours) || "0h")[0].slice(0, -1);
    let minutes = +(time.match(regexMinutes) || "0m")[0].slice(0, -1);
    let seconds = +(time.match(regexSeconds) || "0s")[0].slice(0, -1);


    console.log(days, hours, minutes, seconds);

    let muteTime = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);

    user.setDeaf(true);

    setTimeout(function () {
      user.setDeaf(false);
    }, muteTime);
  }
}
