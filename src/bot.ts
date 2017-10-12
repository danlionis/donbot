import * as Discord from 'discord.js';
import parseMessage from './utils/message-parser';
import valid from './utils/message-validator';

import { TextCommand, ChatFilter } from './mixins';
import builtInCommands from './commands';
import builtInFilters from './filters';
import { Registry } from './Registry';
import { BotSettings } from './bot-settings';

import { BotConfig } from './types';

// import { BotConfig, BotOptions } from '../types';



class Bot extends Discord.Client {

  public registry: Registry;
  public settings: BotSettings;

  /**
   * 
   * @param {string} token login token for the bot
   * @param {string} prefix prefix for bot commands
   * @param opts options for bot
   */
  constructor({ token, prefix, buildInCommands = true, buildInFilters = true }: BotConfig) {
    super();
    this.registry = new Registry();
    this.settings = new BotSettings();

    BotSettings.BOT_CMD_PREFIX = prefix;
    BotSettings.BOT_LOGIN_TOKEN = token;
    // BotSettings.WATCHTOGETHER_LINK = (<any>opts).WATCHTOGETHER_LINK || null;



    if (buildInCommands) this.registerCommmands(builtInCommands);
    if (buildInFilters) this.registerFilters(builtInFilters);

    this.on('ready', this.ready)
  }

  private ready() {
    this.messages();
  }

  private registerCommmands(commands: Array<typeof TextCommand>) {
    commands.forEach(command => {
      this.registry.addTextCommand(command);
    });
  }

  private registerFilters(filters: Array<typeof ChatFilter>) {
    filters.forEach((filter) => {
      this.registry.addChatFilter(filter);
    })
  }

  /**
   * set the login token
   */
  public set loginToken(token: string) {
    BotSettings.BOT_LOGIN_TOKEN = token;
  }

  /**
   * set the command prefix
   */
  public set commandPrefix(prefix: string) {
    BotSettings.BOT_CMD_PREFIX = prefix;
  }

  public get commandPrefix(){
    return BotSettings.BOT_CMD_PREFIX;
  }

  /**
   * connect the bot
   * @param {string} token login token for the bot 
   */
  public connect(token: string = BotSettings.BOT_LOGIN_TOKEN) {

    /**
     * check if a login token is given
     */
    if (!BotSettings.BOT_LOGIN_TOKEN && !token) {
      return console.log("please provide a login token");
    } else {
      BotSettings.BOT_LOGIN_TOKEN = token;
    }

    this.login(BotSettings.BOT_LOGIN_TOKEN).then(() => {
      console.log(`Bot connected ${this.user.tag}`);
    }).catch((error) => {
      console.log(error);
    })
  }

  private messages() {
    this.on('message', (message: Discord.Message) => {
      /**
       * check if message is valid
       */
      if (!valid(message, BotSettings.BOT_CMD_PREFIX)) return;
      if (!valid(message, BotSettings.BOT_CMD_PREFIX)) return;

      /**
       * parse message
       */
      let parsedMessage = parseMessage(message);

      /**
       * get command associated with message
       */
      let command = this.registry.getTextCommand(parsedMessage.is);

      if (!command) {
        return message.reply(`404 Command not found. Type ${BotSettings.BOT_CMD_PREFIX}help for a list of commands`);
      }

      let permission = true;
      if (command.permissions) {
        permission = message.member.hasPermission(command.permissions as Discord.PermissionResolvable[]);
      }
      /**
       * return if user does not have the required permissions
       */
      if (!permission) {
        return message.reply("Denied");
      }
      if (command.run) {
        command.run(message, parsedMessage, this);
      }
    })
  }
}

export default Bot;
export { Bot };