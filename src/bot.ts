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



export class Bot extends Discord.Client {

  public registry: Registry;
  public settings: BotSettings;

  /**
   * 
   * @param {string} token login token for the bot
   * @param {string} prefix prefix for bot commands
   * @param opts options for bot
   */
  constructor({ token = "", prefix = "", buildInCommands = true, buildInFilters = true, extras = {} }: BotConfig) {
    super();
    this.registry = new Registry();
    this.settings = new BotSettings();

    this.settings.prefix = prefix;
    this.settings.token = token;
    this.settings.extras = extras;
    console.log(this.settings.extras);
    // BotSettings.WATCHTOGETHER_LINK = (<any>opts).WATCHTOGETHER_LINK || null;



    if (buildInCommands) this.registerCommmands(builtInCommands);
    if (buildInFilters) this.registerFilters(builtInFilters);

    this.on('ready', this.ready)
  }

  private ready() {
    this.messages();
  }

  private registerCommmands(commands: Array<any>) {
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
    this.settings.token = token;
  }

  /**
   * set the command prefix
   */
  public set commandPrefix(prefix: string) {
    this.settings.prefix = prefix;
  }

  public get commandPrefix() {
    return this.settings.prefix;
  }

  /**
   * connect the bot
   * @param {string} token login token for the bot 
   */
  public connect(token: string = this.settings.token) {

    /**
     * check if a login token is given
     */
    if (!this.settings.token && !token) {
      return console.log("please provide a login token");
    } else {
      this.settings.token = token;
    }

    this.login(this.settings.token).then(() => {
      console.log(`Bot connected ${this.user.tag}`);
    }).catch((error) => {
      console.log(error);
    })
  }

  private messages() {
    this.on('message', (message: Discord.Message) => {
      console.log("[EVENT]: Message");
      /**
       * check if message is valid
       */
      if (!valid(message, this.settings.prefix)) return;

      /**
       * parse message
       */
      let parsedMessage = parseMessage(message, this.settings.prefix);

      /**
       * get command associated with message
       */
      let command: TextCommand = this.registry.getTextCommand(parsedMessage.is);


      if (!command) {
        return message.reply(`404 Command not found. Type ${this.settings.prefix}help for a list of commands`);
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
        command.run(this, message, parsedMessage);
      }
    })
  }
}

export default Bot;