export class BotSettings {
  private _token: string;
  private _prefix: string;
  private _extras: Object;
  private _game: string;
  private _notifyUnknownCommand: boolean;
  private readonly defaultPrefix: string = "."
  private _owner: string;

  get token(): string {
    return this._token
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

  get extras(): Object {
    return this._extras;
  }

  set extras(extras: Object) {
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

  set owner(owner: string) {
    this._owner = owner;
  }

}

export default BotSettings;