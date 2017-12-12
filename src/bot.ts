import * as Discord from 'discord.js';
import valid from './utils/message-validator';

import { TextCommand } from './mixins';
import { defaultCommands, musicCommands } from './commands';
import { Registry } from './Registry';
import { BotSettings } from './bot-settings';
import { Parser } from './utils/parser';
import { Validator } from './utils/validator';
import { setInterval } from 'timers';

export interface BotConfig {
  token?: string;
  prefix?: string;
  buildInCommands?: boolean;
  buildInMusicCommands?: boolean;
  buildInFilters?: boolean;
  extras?: Object;
  game?: string;
  notifyUnknownCommand?: boolean;
  owner?: string;
}

export class Bot extends Discord.Client {

  public registry: Registry;
  public settings: BotSettings;

  private instances: number = 0;

  private readonly defaultGame: string;

  /**
   * 
   * @param param0 
   */
  constructor({ token = "", prefix = "", buildInCommands = true, buildInMusicCommands = false, buildInFilters = true, game = null, extras = {}, notifyUnknownCommand = true, owner = "" }: BotConfig) {
    super();
    this.registry = new Registry();
    this.settings = new BotSettings(owner);
    this.defaultGame = `${this.settings.prefix}help for help`;

    // init settings
    this.settings.prefix = prefix;
    this.settings.token = token;
    this.settings.game = game;
    this.settings.extras = extras;
    this.settings.notifyUnknownCommand = notifyUnknownCommand;

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
    ID: ${this.user.id}
    ${this.guilds.array().length} servers
    ${this.channels.array().length} channels
    ${this.users.array().length} users

    OwnerId: ${this.settings.owner}

    Invite Link: https://discordapp.com/oauth2/authorize?client_id=${this.user.id}&scope=bot&permissions=8
    `);

    setInterval(() => {
      this.voiceChecker();
    }, 60 * 1000)
  }

  private registerCommmands(commands: Array<any>) {
    commands.forEach(command => {
      this.registry.addTextCommand(command);
    });
  }


  /**
   * Connect the bot to the server
   * @param token bot login token
   */
  public connect(token: string = this.settings.token) {

    /*
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
    // ignore messages from other bots
    if (message.author.bot) return;

    // check if message is no private message
    if (message.channel.type === "dm") return;

    // check if message if formatted like a command
    if (!Validator.messageValid(message, this.settings.prefix)) return;

    // parse the message

    // let parsedMessage = parseMessage(message, this.settings.prefix);
    let parsedMessage = Parser.parseMessage(message, this.settings.prefix);

    //get command from the registry
    let command: TextCommand = this.registry.getTextCommand(parsedMessage.is);


    // if the command wasn't found or a normal user tried to execute an ownerOnly command
    if (!command || (command.onwerOnly && message.author.id !== this.settings.owner)) {
      if (this.settings.notifyUnknownCommand) {
        return message.reply(`404 Command not found. Type ${this.settings.prefix}help for a list of commands`);
      }
      return;
    }

    let allowed = false;

    //allow for bot owner
    if (message.author.id === this.settings.owner) {
      allowed = true;
    }

    // allow if user has required permissions
    if (command.permissions.length > 0 && message.member.hasPermission(command.permissions as Discord.PermissionResolvable[])) {
      allowed = true;
    }

    // allow if user has at least the min role
    if (command.permissions.length == 0 && command.roles.length == 0 && !command.minRole) {
      allowed = true;
    }

    // allow if the user has some of the allowed roles
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

  /**
   * 
   * @param message 
   */
  public getVoiceConnection(guildId: string): Discord.VoiceConnection {
    return this.voiceConnections.find(vc => vc.channel.guild.id === guildId)
  }

  /**
   * Check if the id matches the owner id
   * @param id id to check
   */
  public isOwnerId(id: string): boolean {
    return this.settings.owner === id;
  }

  public voiceChecker() {
    let connections = this.voiceConnections

    connections.forEach(c => {
      if (c.channel.members.array().length <= 1) {
        c.disconnect();
      }

      if (!c.dispatcher || !c.dispatcher.player) {
        c.disconnect()
      }

    })
  }
}

export default Bot;