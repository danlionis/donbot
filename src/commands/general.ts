import * as Discord from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";

export class Counter extends TextCommand {
  private db_key: string = "counters";
  constructor() {
    super({
      command: "counter",
      minRole: "Member"
    });
  }

  public async run(
    bot: Bot,
    message: Discord.Message,
    parsedMessage: ParsedMessage
  ) {
    if (parsedMessage.rawArgs[0] === "new") {
      return this.newCounter(bot, message, parsedMessage);
    }

    if (parsedMessage.rawArgs[0] === "add") {
      return this.addToCounter(bot, message, parsedMessage);
    }

    if (parsedMessage.rawArgs[0] === "list") {
      return this.listCounters(bot, message, parsedMessage);
    }

    return message.reply("Unknown method");

    // if (parsedMessage.rawArgs[0] === "delete") {
    //   return this.deleteCounter(bot, message, parsedMessage);
    // }
  }

  private newCounter(
    bot: Bot,
    message: Discord.Message,
    parsedMessage: ParsedMessage
  ) {
    const counterName = parsedMessage.rawArgs[1];
    const key = `${this.db_key}.${counterName}`;
    if (bot.database.has(key, { guildId: message.guild.id })) {
      return message.reply("this counter already exists");
    }

    bot.database.set(key, 0, {
      guildId: message.guild.id
    });
    return message.reply(`Created counter: ${counterName}`);
  }

  private addToCounter(
    bot: Bot,
    message: Discord.Message,
    parsedMessage: ParsedMessage
  ) {
    const counterName = parsedMessage.rawArgs[1];
    const key = `${this.db_key}.${counterName}`;

    // Error if the counter does not exist
    if (!bot.database.has(key, { guildId: message.guild.id })) {
      return message.reply(
        `this counter does not exist, but you can create it with \`${
          this.is
        } new ${counterName}\``
      );
    }

    const value =
      (bot.database.get(key, { guildId: message.guild.id }) as number) + 1;
    bot.database.set(key, value, { guildId: message.guild.id });
    const embed = new Discord.RichEmbed()
      .setTitle(`Counter`)
      .addField(counterName, value);
    return message.channel.send(embed);
  }

  private listCounters(
    bot: Bot,
    message: Discord.Message,
    parsedMessage: ParsedMessage
  ) {
    const counters = bot.database.get(this.db_key, {
      guildId: message.guild.id
    });

    const embed = new Discord.RichEmbed().setTitle("Counters");

    for (const c in counters) {
      if (counters.hasOwnProperty(c)) {
        if (c.startsWith("_")) {
          continue;
        }
        const value = counters[c];
        embed.addField(c, value);
      }
    }
    return message.channel.send(embed);
  }

  /**
   * NOT WORKING
   * @param bot
   * @param message
   * @param parsedMessage
   */
  private deleteCounter(
    bot: Bot,
    message: Discord.Message,
    parsedMessage: ParsedMessage
  ) {
    const counterName = parsedMessage.rawArgs[1];
    const key = `${this.db_key}.${counterName}`;

    console.log(key);
    if (!bot.database.has(key, { guildId: message.guild.id })) {
      return message.reply("no counter to delete");
    }

    const value = bot.database.get(key, { guildId: message.guild.id });

    bot.database.delete(key, { guildId: message.guild.id });

    const hiddenKey = `${this.db_key}._${counterName}`;
    bot.database.set(hiddenKey, value, { guildId: message.guild.id });
  }
}

export class Random extends TextCommand {
  constructor() {
    super({
      command: "random",
      description: "chooses a random number",
      usage: "random <number / range>",
      aliases: ["r"],
      args: [{ name: "range", pattern: /\d-\d/ }]
    });
  }

  public async run(
    bot: Bot,
    message: Discord.Message,
    parsedMessage: ParsedMessage
  ) {
    let min = 1;
    let max = 10;
    const regexValid = /^\d+$/;

    // test if command provided a range e.g. [p]random 6-45
    if (parsedMessage.args.range.exists) {
      const args = parsedMessage.args.range.value.split("-");
      min = +args[0];
      max = +args[1];
    } else if (
      parsedMessage.rawArgs.length > 0 &&
      regexValid.test(parsedMessage.rawArgs[0])
    ) {
      max = +parsedMessage.rawArgs[0];
    }

    let count = 1;
    if (
      parsedMessage.rawArgs.length > 1 &&
      regexValid.test(parsedMessage.rawArgs[1])
    ) {
      count = Math.min(+parsedMessage.rawArgs[1], 200);
    }

    const numbers: number[] = [];

    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max + 1 - min) + min));
    }

    if (count > 1) {
      let average: number = 0;
      numbers.forEach((num) => {
        average += num;
      });

      // round average to 1 decimal
      average = Math.round((average / numbers.length) * 10) / 10;

      const embed = new Discord.RichEmbed();
      embed.setTitle("Random Generator");
      embed.addField("Rolls", count, true);
      embed.addField("Average", average, true);
      embed.addField("Numbers", `\`\`\`${numbers.join(", ")}\`\`\``);
      message.channel.send(embed);
    } else {
      message.reply(`Your random nubmer is \`${numbers.toString()}\``);
    }
  }
}

export class Choice extends TextCommand {
  constructor() {
    super({
      command: "choice",
      description: "choose one from all arguments",
      usage: "choice [args]"
    });
  }

  public async run(
    bot: Bot,
    message: Discord.Message,
    parsedMessage: ParsedMessage
  ) {
    if (parsedMessage.rawArgs.length <= 1) {
      return message.reply(
        "Not enough choices given. Please provide at least 2"
      );
    }
    const random = Math.floor(Math.random() * parsedMessage.rawArgs.length);
    message.reply(`Your choice is: \`${parsedMessage.rawArgs[random]}\``);
  }
}
