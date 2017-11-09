import * as Discord from 'discord.js';
import { Bot } from '../';
import { TextCommand } from '../mixins';
import { ParsedMessage } from '../types';

export class Random extends TextCommand {

  constructor() {
    super({
      command: "random",
      description: "chooses a random number",
      aliases: [
        "r"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {

    let min = 1;
    let max = 10;
    let regex = /\d-\d/;

    if (regex.test(parsedMessage.args[0])) {
      let args = parsedMessage.args[0].split("-");
      min = +args[0];
      max = +args[1];
    } else if (parsedMessage.args.length > 0) {
      max = +parsedMessage.args[0];
    }

    let count = 1;
    if (parsedMessage.args.length > 1) {
      count = Math.min(+parsedMessage.args[1], 200);
    }

    console.log(count);

    let numbers: Array<number> = [];
    for (var i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max + 1 - min) + min));
    }

    let average: number = 0;;

    console.log(numbers);

    numbers.forEach(num => {
      average += num;
    });

    average = average / numbers.length;

    message.reply(`\nRolls: \`${count}\` \nAverage: \`${average}\` \nNumbers: \`${numbers.toString()}\``);

  }
}

export class Choice extends TextCommand {

  constructor() {
    super({
      command: "choice",
      description: "choose one from all arguments",
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    if (parsedMessage.args.length <= 1) {
      return message.reply("Not enough choices given. Please provide at least 2");
    }

    let random = Math.floor(Math.random() * parsedMessage.args.length)

    message.reply(`Your choice is: ${parsedMessage.args[random]}`);

  }
}