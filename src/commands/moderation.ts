import { Message, RichEmbed, TextChannel } from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";
import { parseTime } from "../utils/parser";

export class Clear extends TextCommand {
  constructor() {
    super({
      command: "clear",
      aliases: ["cls"],
      usage: "clear <amount>",
      description: "Clears the last 10 chat messages",
      permissions: ["MANAGE_MESSAGES"],
      group: "moderation",
      args: [{ name: "count", default: 10, pattern: /^[0-9][0-9]?$/ }]
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const limit = parseInt(parsedMessage.args.count.value, 10) + 1;
    let messages = await message.channel.fetchMessages({ limit });
    const time = new Date().getTime() - 14 * 24 * 60 * 60 * 1000;

    messages = messages.filter((m) => m.createdAt.getTime() > time);
    messages = messages.filter((m) => !m.pinned);

    if (messages.array().length >= 2) {
      await message.channel.bulkDelete(messages);
    }
  }
}

export class Poll extends TextCommand {
  constructor() {
    super({
      command: "poll",
      aliases: ["vote"],
      description: "start a new vote",
      usage: "poll [title]",
      group: "moderation"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    message.delete();
    const embed = new RichEmbed();

    embed
      .setFooter(`Poll by ${message.member.displayName}`)
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
      permissions: ["MUTE_MEMBERS"],
      aliases: ["timemute"],
      args: [
        {
          name: "time",
          pattern: /^(?!$)(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/,
          default: "10m"
        }
      ],
      group: "moderation",
      color: "#ff5722"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const muteUsers = message.mentions.members;
    const { days, hours, minutes, seconds } = parseTime(
      parsedMessage.args.time.value
    );

    const muteTime =
      days * 24 * 60 * 60 * 1000 +
      hours * 60 * 60 * 1000 +
      minutes * 60 * 1000 +
      seconds * 1000;

    const content = new RichEmbed()
      .setAuthor(message.member.user.tag, message.member.user.avatarURL)
      .setColor(this.color)
      .setTimestamp()
      .addField(
        "Target",
        muteUsers
          .array()
          .map((u) => u.user.tag)
          .join(", "),
        true
      )
      .addField("Action", `Mute for ${parsedMessage.args.time.value}`, true);

    bot.logger.logToChannel(message.guild, content);

    muteUsers.forEach((u) => {
      u.setMute(true);
    });

    setTimeout(() => {
      muteUsers.forEach((u) => {
        u.setMute(false);
      });
    }, muteTime);
  }
}

export class Deaf extends TextCommand {
  constructor() {
    super({
      command: "deaf",
      description: "deaf a member for a given time",
      permissions: ["DEAFEN_MEMBERS"],
      aliases: ["timedeaf"],
      args: [
        // { name: "time", pattern: /(\d+d)?(\d+h)?(\d+m)?(\d+s)?/, default: "10m" },
        {
          name: "time",
          pattern: /^(?!$)(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/,
          default: "10m"
        }
      ],
      group: "moderation",
      color: "#ff5722"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const deafUsers = message.mentions.members;
    const { days, hours, minutes, seconds } = parseTime(
      parsedMessage.args.time.value
    );
    const muteTime =
      days * 24 * 60 * 60 * 1000 +
      hours * 60 * 60 * 1000 +
      minutes * 60 * 1000 +
      seconds * 1000;

    const content = new RichEmbed()
      .setAuthor(message.member.user.tag, message.member.user.avatarURL)
      .setColor(this.color)
      .setTimestamp()
      .addField(
        "Target",
        deafUsers
          .array()
          .map((u) => u.toString())
          .join(", "),
        true
      )
      .addField("Action", `Deaf for ${parsedMessage.args.time.value}`, true);

    bot.logger.logToChannel(message.guild, content);

    deafUsers.forEach((user) => {
      user.setDeaf(true);
    });

    setTimeout(() => {
      deafUsers.forEach((user) => {
        user.setDeaf(false);
      });
    }, muteTime);
  }
}

export class Ban extends TextCommand {
  constructor() {
    super({
      command: "ban",
      description: "bans one or more user",
      permissions: ["BAN_MEMBERS"],
      group: "moderation",
      color: "#b71c1c"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const bans = message.mentions.members;

    bans.filter((user) => !bot.isOwnerId(user.id));

    const content = new RichEmbed()
      .setAuthor(message.member.user.tag, message.member.user.avatarURL)
      .setColor(this.color)
      .setTimestamp()
      .addField(
        "Target",
        bans
          .array()
          .map((u) => u.user.tag)
          .join(", "),
        true
      )
      .addField("Action", `Ban`);
    bot.logger.logToChannel(message.guild, content);

    bans.forEach((user) => {
      if (
        message.member.highestRole.comparePositionTo(user.highestRole) > 0 ||
        bot.isOwnerId(message.author.id)
      ) {
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
      permissions: ["BAN_MEMBERS"],
      group: "moderation"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const bans = message.mentions.members;

    bans.forEach(async (user) => {
      if (
        message.member.highestRole.comparePositionTo(user.highestRole) > 0 ||
        bot.isOwnerId(message.author.id)
      ) {
        const banned = await user.ban();
        banned.guild.unban(banned);

        const content = new RichEmbed()
          .setAuthor(message.member.user.tag, message.member.user.avatarURL)
          .setColor(message.member.displayHexColor)
          .setTimestamp()
          .addField(
            "Target",
            bans
              .array()
              .map((u) => u.user.tag)
              .join(", "),
            true
          )
          .addField("Action", `SoftBan`);

        bot.logger.logToChannel(message.guild, content);
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
      permissions: ["KICK_MEMBERS"],
      group: "moderation"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const kicks = message.mentions.members;

    const content = new RichEmbed()
      .setAuthor(message.member.user.tag, message.member.user.avatarURL)
      .setColor(message.member.displayHexColor)
      .setTimestamp()
      .addField(
        "Target",
        kicks
          .array()
          .map((u) => u.user.tag)
          .join(", "),
        true
      )
      .addField("Action", `Kick`);

    bot.logger.logToChannel(message.guild, content);

    kicks.forEach((user) => {
      user.kick();
    });
  }
}

export class MoveTo extends TextCommand {
  constructor() {
    super({
      command: "moveto",
      aliases: ["to"],
      permissions: ["MOVE_MEMBERS"],
      group: "moderation"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const channel = message.mentions.members.first().voiceChannel;

    const allowed = channel.permissionsFor(message.author).has("CONNECT");
    if (!allowed) {
      return message.reply(`Insufficient permissions to join voice channel!`);
    }

    if (!channel) {
      return message.reply(`Target user is not in a voice channel`);
    }

    message.member.voiceChannel.members.forEach((m) => {
      m.setVoiceChannel(channel);
    });
  }
}

export class MoveHere extends TextCommand {
  constructor() {
    super({
      command: "movehere",
      aliases: ["here"],
      permissions: ["MOVE_MEMBERS"],
      group: "moderation"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const channel = message.member.voiceChannel;

    const allowed = channel.permissionsFor(message.author).has("CONNECT");
    if (!allowed) {
      return message.reply(`Insufficient permissions move out of channel!`);
    }

    if (!channel) {
      return message.reply(`You have to be in a voicechannel `);
    }

    message.mentions.members.first().voiceChannel.members.forEach((m) => {
      m.setVoiceChannel(channel);
    });
  }
}
