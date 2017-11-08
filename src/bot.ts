import * as Discord from 'discord.js';
import parseMessage from './utils/message-parser';
import valid from './utils/message-validator';

import { TextCommand, ChatFilter } from './mixins';
import { defaultCommands, musicCommands } from './commands';
import builtInFilters from './filters';
import { Registry } from './Registry';
import { BotSettings } from './bot-settings';

import { BotConfig } from './types';

export class Bot extends Discord.Client {

  public registry: Registry;
  public settings: BotSettings;

  private instances: number = 0;

  private readonly defaultGame: string;

  /**
   * 
   * @param {string} token login token for the bot
   * @param {string} prefix prefix for bot commands
   * @param opts options for bot
   */
  constructor({ token = "", prefix = "", buildInCommands = true, buildInMusicCommands = false, buildInFilters = true, game = null, extras = {}, notifyUnknownCommand = true, owner = "" }: BotConfig) {
    super();
    this.registry = new Registry();
    this.settings = new BotSettings();
    this.defaultGame = `${this.settings.prefix}help for help`;

    // init settings
    this.settings.prefix = prefix;
    this.settings.token = token;
    this.settings.game = game;
    this.settings.extras = extras;
    this.settings.notifyUnknownCommand = notifyUnknownCommand;
    this.settings.owner = owner;

    if (buildInCommands) this.registerCommmands(defaultCommands);
    if (buildInMusicCommands) this.registerCommmands(musicCommands);
    // if (buildInFilters) this.registerFilters(builtInFilters);

    this.on('ready', this.ready)
    this.on('message', this.messages)
  }

  private ready() {
    if (this.settings.game) {
      this.user.setGame(this.settings.game);
    }

    console.log(`
    Bot Started as ${this.user.tag}
    ${this.guilds.array().length} servers
    ${this.channels.array().length} channels
    ${this.users.array().length} users

    OwnerId: ${this.settings.owner}
    `);
  }

  private registerCommmands(commands: Array<any>) {
    commands.forEach(command => {
      this.registry.addTextCommand(command);
    });
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

    this.login(this.settings.token).catch((error) => {
      console.log(error);
    })
  }

  private messages(message: Discord.Message) {
    if (message.author.bot || message.channel.type === "dm") return;
    /**
     * check if message is a valid command
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


    // if the command wasn't found or a normal user tried to execute an ownerOnly command
    if (!command || (command.onwerOnly && message.author.id !== this.settings.owner)) {
      if (this.settings.notifyUnknownCommand) {
        return message.reply(`404 Command not found. Type ${this.settings.prefix}help for a list of commands`);
        // return message.reply(`\`\`\`404 Command not found. Type ${this.settings.prefix}help for a list of commands \`\`\``)
      }
      return;
    }

    let allowed = false;

    //allow for bot owner
    if (message.author.id === this.settings.owner) {
      allowed = true;
    }

    // allow for server owner
    // if (message.member.hasPermission("ADMINISTRATOR")) {
    //   allowed = true;
    // }


    if (command.permissions.length > 0 && message.member.hasPermission(command.permissions as Discord.PermissionResolvable[])) {
      allowed = true;
    }

    if (command.permissions.length == 0 && command.roles.length == 0 && !command.minRole) {
      allowed = true;
    }

    /**
     * check if member has a required role
     */
    if (message.member.roles.some(r => command.roles.indexOf(r.name) != -1)) {
      allowed = true;
    }

    if (command.minRole) {
      let minRole = message.guild.roles.find("name", command.minRole) || message.guild.defaultRole;
      if (message.member.highestRole.comparePositionTo(minRole) >= 0) {
        allowed = true;
      }
    }

    if (!allowed) {
      return message.reply("You don't have permission to execute this command");
    }
    command.run(this, message, parsedMessage);
  }

  public set game(game: string) {
    console.log("game", game);
    this.user.setGame(game);
    this.settings.game = game;
  }

  public refresh() {
    this.game = this.defaultGame;
  }

  public getVoiceConnection(message: Discord.Message): Discord.VoiceConnection {
    return this.voiceConnections.find(vc => vc.channel.guild.id === message.guild.id)
  }
}

export default Bot;