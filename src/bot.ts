import * as Discord from 'discord.js';
import parseMessage from './utils/message-parser';
import valid from './utils/message-validator';

import { TextCommand } from './types/command';
import builtInCommands from './commands';
import { Registry } from './registry';

import { BotSettings } from './bot-settings';

class Bot extends Discord.Client {

  private BOT_LOGIN_TOKEN: string;
  private BOT_CMD_PREFIX: string;
  private registry: Registry;

  /**
   * 
   * @param opts
   */
  constructor(token: string, prefix: string, opts?: Object) {
    super();

    this.BOT_CMD_PREFIX = prefix;
    this.BOT_LOGIN_TOKEN = token;
    BotSettings.BOT_CMD_PREFIX = this.BOT_CMD_PREFIX;
    BotSettings.BOT_CMD_PREFIX = this.BOT_CMD_PREFIX;
    BotSettings.WATCHTOGETHER_LINK = (<any>opts).WATCHTOGETHER_LINK;

    this.registry = new Registry();
    this.registerCommmands(builtInCommands)
  }
  
  private registerCommmands(commands: Array<typeof TextCommand>) {
    commands.forEach(command => {
      this.registry.addTextCommand(command);
    });
  }

  public set loginToken(token: string) {
    this.BOT_LOGIN_TOKEN = token;
  }

  public set commandPrefix(prefix: string) {
    this.BOT_CMD_PREFIX = prefix;
  }


  private connect(token: string = undefined) {

    /**
     * check if a login token is given
     */
    if (!this.BOT_LOGIN_TOKEN && !token) {
      return console.log("please provide a login token");
    } else {
      this.BOT_LOGIN_TOKEN = token || this.BOT_LOGIN_TOKEN;
    }

    this.login(this.BOT_LOGIN_TOKEN).then(() => {
      console.log(`Bot connected ${this.user.tag}`);
      this.messages();
    }).catch((error) => {
      console.log(error);
    })
  }

  private messages() {
    this.on('message', (message: Discord.Message) => {
      /**
       * check if message is valid
       */
      if (!valid(message, this.BOT_CMD_PREFIX)) return;

      /**
       * parse message
       */
      let parsedMessage = parseMessage(message);

      /**
       * get command associated with message
       */
      let command = this.registry.getTextCommand(parsedMessage);

      /**
       * execute command if it exists
       */
      if (!command) {
        return;
      }
      if (command.run) {
        command.run(message, parsedMessage);
        // console.log("[Command run]", command.run);
      }
    })
  }
}

export default Bot;
export { BotSettings, Bot };