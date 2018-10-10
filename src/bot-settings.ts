import { Bot } from ".";

export class BotSettings {
  private _token: string;
  private _prefix: string;
  private _extras: object;
  private _game: string;
  private _notifyUnknownCommand: boolean;
  private readonly defaultPrefix: string = ".";
  private _owner: string;
  private _botLogChannel: string;

  private readonly prefixKey = "prefix";

  constructor(private bot: Bot, owner: string) {
    this._owner = owner;
  }

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }

  get prefix(): string {
    return this._prefix || this.defaultPrefix;
  }

  set prefix(prefix: string) {
    this._prefix = prefix || this.defaultPrefix;
  }

  get botLogChannel() {
    return this._botLogChannel || "bot-log";
  }

  set botLogChannel(channelname: string) {
    this._botLogChannel = channelname;
  }

  public getGuildPrefix(guildid: string) {
    // return this.bot.database.get<string>(
    //   guildid + "." + this.prefixKey,
    //   this.defaultPrefix
    // );
    return this.bot.database.get<string>(this.prefixKey, {
      defaultValue: this.prefix,
      guildId: guildid
    });
  }

  public setGuildPrefix(guildid: string, prefix: string) {
    return this.bot.database.set(guildid + "." + this.prefixKey, prefix, {
      merge: false
    });
  }

  get extras(): object {
    return this._extras;
  }

  set extras(extras: object) {
    this._extras = extras;
  }

  get game(): string {
    return this._game;
  }

  set game(game: string) {
    this._game = game;
  }

  get notifyUnknownCommand(): boolean {
    return this._notifyUnknownCommand;
  }

  set notifyUnknownCommand(notifyUnknownCommand: boolean) {
    this._notifyUnknownCommand = notifyUnknownCommand;
  }

  get owner(): string {
    return this._owner;
  }
}

export default BotSettings;
