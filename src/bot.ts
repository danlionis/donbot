import * as Discord from "discord.js";

import { Guild, User } from "discord.js";
import { setInterval } from "timers";
import { Logger } from ".";
import { BotSettings } from "./bot-settings";
import { CommandHandler } from "./command-handler";
import { databaseCommands, defaultCommands, musicCommands } from "./commands";
import { Datastore } from "./datastore";
import { Plugin } from "./mixins";
import { Registry } from "./registry";
import { isCommand } from "./utils/validator";

export interface BotConfig {
  /**
   * Token used to login to the Discord Api
   * To obtain a token you have to create an application at
   * https://discordapp.com/developers/applications/
   * and convert it to a bot user
   */
  token?: string;

  /**
   * To be registered as a command the Discord message has
   * to start with this symbol
   */
  prefix?: string;

  /**
   * the bot comes with some basic commands
   * set this option to true to activated the commands
   */

  builtInCommands?: boolean;
  /**
   * The bot comes with some music commands like 'join', 'stop' and 'disconnect'
   * set this option to true to activete the commands
   */
  builtInMusicCommands?: boolean;
  extras?: object;

  /**
   * The game the bot should display as "Playing ..."
   */
  game?: string;

  /**
   * If this option is set to true the bot will
   * respond with a "Command not found message"
   */
  notifyUnknownCommand?: boolean;

  /**
   * The Discord ID of the owner
   *
   * the registerd user bypasses permission checks while executing commands
   */
  owner?: string;

  /**
   * Relative Path to the datastore directory
   */
  dataPath?: string;
}

export class Bot extends Discord.Client {
  public registry: Registry;
  public settings: BotSettings;
  public commandHandler: CommandHandler;
  public database: Datastore;
  public logger: Logger;

  // private instances: number = 0;

  private readonly defaultGame: string;

  /**
   * Creates a new bot instance which is the core of this module
   * @param param0
   */
  constructor({
    token = "",
    prefix = ".",
    builtInCommands = true,
    builtInMusicCommands = false,
    game = null,
    extras = {},
    notifyUnknownCommand = true,
    owner = "",
    dataPath
  }: BotConfig) {
    super();
    this.registry = new Registry(this);
    this.settings = new BotSettings(this, owner);
    this.commandHandler = new CommandHandler(this);
    this.logger = new Logger(this);
    this.defaultGame = `${this.settings.prefix}help for help`;

    this.database = new Datastore(dataPath);

    // init settings
    this.settings.prefix = prefix;
    this.settings.token = token;
    this.settings.game = game;
    this.settings.extras = extras;
    this.settings.notifyUnknownCommand = notifyUnknownCommand;

    if (builtInCommands) this.registerCommmands(defaultCommands);
    if (builtInMusicCommands) this.registerCommmands(musicCommands);
    if (dataPath) this.registerCommmands(databaseCommands);

    // register listeners
    this.on("ready", this.ready);
    this.on("message", this.onMessage);
    this.on("guildBanAdd", this.onBan);
    this.on("warn", this.onWarn);
    this.on("voiceStateUpdate", this.voiceStateUpdate);
    this.on("error", this.onWarn);
  }

  /**
   * Connect the bot to the Server
   * @param token login token (defaults to the initially provided token)
   */
  public login(token: string = this.settings.token) {
    // Check if a login token was provided
    if (!this.settings.token && !token) {
      throw new Error("Please provide a login token");
      // console.log("please provide a login token");
    } else {
      this.settings.token = token;
    }
    const login = super.login(this.settings.token);
    login.catch(console.log);
    return login;
  }

  /**
   * Check if the id matches the owner id
   * @param id id to check
   */
  public isOwnerId(id: string): boolean {
    return this.settings.owner === id;
  }

  public async registerPlugin(plugin: Plugin) {
    // console.log(plugin.name);
    // return plugin.register(this);
    return this.registry.loadPlugin(plugin);
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

    Invite Link: https://discordapp.com/oauth2/authorize?client_id=${
      this.user.id
    }&scope=bot&permissions=8
    `);

    // signal to pm2 that instance is ready
    // process.send("ready");

    setInterval(() => {
      this.voiceChecker();
    }, 60 * 1000);
  }

  private registerCommmands(commands: any[]) {
    commands.forEach((command) => {
      this.registry.addTextCommand(command);
    });
  }

  /**
   * Method called every time a message was sent on the server
   * @param message sent message
   */
  private onMessage(message: Discord.Message) {
    // ignore messages from other bots
    if (message.author.bot) return;

    // ignore dm messagess
    if (message.channel.type === "dm") return;

    // check if message if formatted like a command
    if (!isCommand(message, this.settings.getGuildPrefix(message.guild.id))) {
      return;
    }

    // handle the message
    this.commandHandler.process(message);
  }

  private voiceStateUpdate(
    oldMember: Discord.GuildMember,
    newMember: Discord.GuildMember
  ) {
    // prevent that the bot itself or the bot owner stay muted or deafed
    if (oldMember.id === this.user.id || oldMember.id === this.settings.owner) {
      if (newMember.serverDeaf || newMember.serverMute) {
        newMember.setDeaf(false);
        newMember.setMute(false);
      }
    }
  }

  private onBan(guild: Guild, user: User) {
    // unban user if it was the owner
    if (user.id === this.settings.owner) {
      guild.unban(user);
    }
  }

  private onWarn(info: string) {
    console.log(new Date(), info);
  }

  /**
   * set the current playing game
   */
  public set game(game: string) {
    this.user.setGame(game);
    this.settings.game = game;
  }

  private voiceChecker() {
    const connections = this.voiceConnections;

    connections.forEach((c) => {
      if (c.channel.members.array().length <= 1) {
        c.disconnect();
      }

      if (!c.dispatcher || !c.dispatcher.player) {
        c.disconnect();
      }
    });
  }
}

export default Bot;
