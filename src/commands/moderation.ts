import { Message, RichEmbed } from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";
import { parseTime } from "../utils/parser";

export class Clear extends TextCommand {

  constructor() {
    super({
      command: "clear",
      aliases: [
        "cls",
      ],
      help: "clear <silent?>",
      description: "Clears the last 100 chat messages",
      permissions: [
        "MANAGE_MESSAGES",
      ],
      flags: [
        { name: "silent", short: "s", long: "silent" },
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    message.channel.fetchMessages({ limit: 99 }).then((messages) => {

      // console.log(messages.map(m => m.createdAt.getTime()));

      // Filter all messages newer than 14 days
      const time = new Date().getTime() - 14 * 24 * 60 * 60 * 1000;
      messages = messages.filter((m) => m.createdAt.getTime() > time);

      if (messages.array().length >= 2) {
        message.channel.bulkDelete(messages.filter((m) => !m.pinned));
        if (parsedMessage.flags.silent) {
          message.channel.send(`Messages cleared by ${message.author.toString()}`);
        }
      }
    });
  }
}

export class Poll extends TextCommand {

  constructor() {
    super({
      command: "poll",
      aliases: [
        "vote",
      ],
      description: "start a new vote",
      help: "poll [title...]",
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    message.delete();
    const embed = new RichEmbed();

    embed.setFooter(`Poll by ${message.member.displayName}`)
      .setAuthor(parsedMessage.rawArgs.join(" "))
      .setColor("#2196F3");

    message.channel.send(embed).then((poll: Message) => {
      poll.react("👍").then((_1) => {
        poll.react("👎").then((_2) => {
          poll.react("🤷");
        });
      });
    });
  }
}

export class Mute extends TextCommand {
  constructor() {
    super({
      command: "mute",
      description: "mute a member for a given time",
      permissions: [
        "MUTE_MEMBERS",
      ],
      aliases: [
        "timemute",
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const muteUser = message.mentions.members.first();
    const { days, hours, minutes, seconds } = parseTime(parsedMessage.rawArgs[1]);

    const muteTime = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);

    muteUser.setMute(true);

    setTimeout(() => {
      muteUser.setMute(false);
    }, muteTime);
  }
}

export class Deaf extends TextCommand {
  constructor() {
    super({
      command: "deaf",
      description: "deaf a member for a given time",
      permissions: [
        "DEAFEN_MEMBERS",
      ],
      aliases: [
        "timedeaf",
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const user = message.mentions.members.first();
    const { days, hours, minutes, seconds } = parseTime(parsedMessage.rawArgs[1]);
    const muteTime = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);

    user.setDeaf(true);

    setTimeout(() => {
      user.setDeaf(false);
    }, muteTime);
  }
}

export class Ban extends TextCommand {
  constructor() {
    super({
      command: "ban",
      description: "bans one or more user",
      permissions: [
        "BAN_MEMBERS",
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const bans = message.mentions.members;

    bans.filter((user) => !bot.isOwnerId(user.id));

    bans.forEach((user) => {
      if (message.member.highestRole.comparePositionTo(user.highestRole) > 0 || bot.isOwnerId(message.author.id)) {
        user.ban();
      } else {
        message.reply("You don't have permission to ban this user");
      }
    });
  }
}

export class SoftBan extends TextCommand {
  constructor() {
    super({
      command: "softban",
      description: "softbans one or more user",
      permissions: [
        "BAN_MEMBERS",
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const bans = message.mentions.members;

    bans.forEach(async (user) => {
      if (message.member.highestRole.comparePositionTo(user.highestRole) > 0 || bot.isOwnerId(message.author.id)) {
        const banned = await user.ban();
        banned.guild.unban(banned);
      } else {
        message.reply("You don't have permission to ban this user");
      }
    });
  }
}

export class Kick extends TextCommand {
  constructor() {
    super({
      command: "softban",
      description: "softbans one or more user",
      permissions: [
        "KICK_MEMBERS",
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const kicks = message.mentions.members;

    kicks.forEach((user) => {
      user.kick();
    });
  }
}
