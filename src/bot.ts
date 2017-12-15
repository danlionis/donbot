import * as Discord from "discord.js";

import { setInterval } from "timers";
import { BotSettings } from "./bot-settings";
import { CommandHandler } from "./command-handler";
import { defaultCommands, musicCommands } from "./commands";
import { TextCommand } from "./mixins";
import { Registry } from "./Registry";
import { messageValid } from "./utils/validator";

export interface BotConfig {
  token?: string;
  prefix?: string;
  buildInCommands?: boolean;
  buildInMusicCommands?: boolean;
  buildInFilters?: boolean;
  extras?: object;
  game?: string;
  notifyUnknownCommand?: boolean;
  owner?: string;
}

export class Bot extends Discord.Client {

  public registry: Registry;
  public settings: BotSettings;
  public handler: CommandHandler;

  // private instances: number = 0;

  private readonly defaultGame: string;

  /**
   * Creates a new bot instance which is the core of this module
   * @param param0
   */
  constructor({
    token = "", prefix = "", buildInCommands = true,
    buildInMusicCommands = false, buildInFilters = true, game = null,
    extras = {}, notifyUnknownCommand = true, owner = "" }: BotConfig) {

    super();
    this.registry = new Registry();
    this.settings = new BotSettings(owner);
    this.handler = new CommandHandler(this, this.settings, this.registry);
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

    this.on("ready", this.ready);
    this.on("message", this.messages);
  }

  /**
   * Connect the bot to the server
   * @param token bot login token
   */
  public connect(token: string = this.settings.token) {
    // Check if a login token was provided
    if (!this.settings.token && !token) {
      return console.log("please provide a login token");
    } else {
      this.settings.token = token;
    }

    this.login(this.settings.token).catch((error) => {
      console.log(error);
    });
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

    Invite Link: https://discordapp.com/oauth2/authorize?client_id=${this.user.id}&scope=bot&permissions=8
    `);

    setInterval(() => {
      this.voiceChecker();
    }, 60 * 1000);
  }

  private registerCommmands(commands: any[]) {
    commands.forEach((command) => {
      this.registry.addTextCommand(command);
    });
  }

  private messages(message: Discord.Message) {
    // ignore messages from other bots
    if (message.author.bot) return;

    // check if message is no private message
    if (message.channel.type === "dm") return;

    // check if message if formatted like a command
    if (!messageValid(message, this.settings.prefix)) return;

    // handle the message
    this.handler.handleCommand(message);
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
