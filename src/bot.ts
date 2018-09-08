import * as Discord from "discord.js";

import { Guild, User } from "discord.js";
import { setInterval } from "timers";
import { Logger } from ".";
import { BotSettings } from "./bot-settings";
import { CommandHandler } from "./command-handler";
import { databaseCommands, defaultCommands, musicCommands } from "./commands";
import { Datastore } from "./datastore";
import { Registry } from "./registry";
import { isCommand } from "./utils/validator";

import * as readline from "readline";
import { Cli } from "./utils/cli";

export interface BotConfig {
  /**
   * login token
   */
  token?: string;
  /**
   * command prefix
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
  game?: string;
  notifyUnknownCommand?: boolean;
  owner?: string;
  dataPath?: string;
}

export class Bot extends Discord.Client {
  public registry: Registry;
  public settings: BotSettings;
  public commandHandler: CommandHandler;
  public database: Datastore;
  public logger: Logger;
  private cli: Cli;

  // private instances: number = 0;

  private readonly defaultGame: string;

  /**
   * Creates a new bot instance which is the core of this module
   * @param param0
   */
  constructor({
    token = "",
    prefix = "",
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

    this.on("ready", this.ready);
    this.on("message", this.onMessage);
    this.on("guildBanAdd", this.onBan);
    this.on("warn", this.onWarn);
    this.on("voiceStateUpdate", this.voiceStateUpdate);
  }

  /**
   * Connect the bot
   * @param token bot token
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

    // initialize the cli for console commands
    this.cli = new Cli(this);
  }

  private registerCommmands(commands: any[]) {
    commands.forEach((command) => {
      this.registry.addTextCommand(command);
    });
  }

  /**
   * Method called every time a message is sent
   * @param message sent message
   */
  private onMessage(message: Discord.Message) {
    // ignore messages from other bots
    if (message.author.bot) return;

    // ignore dm messages
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
    console.log("game", game);
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
