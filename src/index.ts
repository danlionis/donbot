import * as Discord from 'discord.js';
import { BOT_TOKEN, BOT_CMD_PREFIX } from './bot-settings.js';
import parseMessage from './utils/message-parser';
import valid from './utils/message-validator';


class Rainbot extends Discord.Client {

  // LOGIN_TOKEN: string;
  COMMAND_PREFIX: string;

  constructor() {
    super();

    // this.LOGIN_TOKEN = BOT_TOKEN;
    // this.COMMAND_PREFIX = BOT_CMD_PREFIX;

    // this.login(BOT_TOKEN).then(() => {
    //   console.log(`Bot connected ${this.user.tag}`);
    // }).catch((error) => {
    //   console.log(error);
    // })

    this.on('message', (message: Discord.Message) => {
      if (!valid(message)) return;
      let command: Command = parseMessage(message);
      console.log(command);
    })
  }

  initialize({ BOT_LOGIN_TOKEN }: Bot) {
    console.log(BOT_LOGIN_TOKEN);
    this.login(BOT_LOGIN_TOKEN).then((_) => {
      console.log(`Rainbot connected with user ${this.user.tag}`);
    }).catch((err) => {
      console.log(err);
    })
  }
}

export { Rainbot as Bot }