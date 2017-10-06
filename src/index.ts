import * as Discord from 'discord.js';
import { BOT_TOKEN, BOT_CMD_PREFIX } from './bot-settings.js';
import parseMessage from './utils/message-parser';
import valid from './utils/message-validator';


class Rainbot extends Discord.Client {

  BOT_CMD_PREFIX: string;

  constructor() {
    super();

    this.BOT_CMD_PREFIX = BOT_CMD_PREFIX

    this.login(BOT_TOKEN).then(() => {
      console.log(`Bot connected ${this.user.tag}`);
    }).catch((error) => {
      console.log(error);
    })

    this.on('message', (message: Discord.Message) => {
      if (!valid(message)) return;
      let command: Command = parseMessage(message);
      console.log(command);
    })
  }
}

export { Rainbot as Bot }