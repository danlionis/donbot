import * as Discord from 'discord.js';
import { BOT_LOGIN_TOKEN as BOT_TOKEN, BOT_CMD_PREFIX } from './bot-settings.js';
import parseMessage from './utils/message-parser';
import valid from './utils/message-validator';
import Command from './command';

import Clear from './commands/clear';

class Rainbot extends Discord.Client {

  BOT_CMD_PREFIX: string;

  constructor() {
    super();

    this.BOT_CMD_PREFIX = BOT_CMD_PREFIX

    // console.log(commands);

    this.on('message', (message: Discord.Message) => {
      if (!valid(message)) return;
      let command = parseMessage(message);
      console.log(command);
    })

    this.registerCommand(Clear)
  }

  // registerCommand(commandClass: Command) {
  //   let class = new commandClass();
  // }

  registerCommand<C extends Command>(command: new() => C) {
    
  }

  registerCommands(commands: Array<Command>) {
    commands.forEach((command) => {
      console.log(command.is);
    });
  }

  private init() {
    this.login(BOT_TOKEN).then(() => {
      console.log(`Bot connected ${this.user.tag}`);
    }).catch((error) => {
      console.log(error);
    })
  }
}

export { Rainbot as Bot }