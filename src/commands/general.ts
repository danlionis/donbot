import * as Discord from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";

export class Random extends TextCommand {

  constructor() {
    super({
      command: "random",
      description: "chooses a random number",
      aliases: [
        "r",
      ],
      args: [
        { name: "range", pattern: /\d-\d/ },
      ],
    });
  }

  public async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {

    let min = 1;
    let max = 10;
    const regexValid = /^\d+$/;

    // test if command provided a range e.g. [p]random 6-45
    if (parsedMessage.args.range.exists) {
      const args = parsedMessage.args.range.value[0].split("-");
      min = +args[0];
      max = +args[1];
    } else if (parsedMessage.rawArgs.length > 0 && regexValid.test(parsedMessage.rawArgs[0])) {
      max = +parsedMessage.rawArgs[0];
    }

    let count = 1;
    if (parsedMessage.rawArgs.length > 1 && regexValid.test(parsedMessage.rawArgs[1])) {
      count = Math.min(+parsedMessage.rawArgs[1], 200);
    }

    console.log(count);

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
      average = Math.round(average / numbers.length * 10) / 10;

      const embed = new Discord.RichEmbed();
      embed.setTitle("Random Generator");
      embed.addField("Rolls", count, true);
      embed.addField("Average", average, true);
      embed.addField("Numbers", `\`\`\`${numbers.join(", ")}\`\`\``);
      message.channel.send(embed);
    } else {
      message.reply(`Your random nubmer is ${numbers.toString()}`);
    }
  }
}

export class Choice extends TextCommand {

  constructor() {
    super({
      command: "choice",
      description: "choose one from all arguments",
    });
  }

  public async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    if (parsedMessage.rawArgs.length <= 1) {
      return message.reply("Not enough choices given. Please provide at least 2");
    }
    const random = Math.floor(Math.random() * parsedMessage.rawArgs.length);
    message.reply(`Your choice is: ${parsedMessage.rawArgs[random]}`);
  }
}
