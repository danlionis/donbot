export class BotSettings {
  private _token: string;
  private _prefix: string;
  private readonly defaultPrefix: string = "."

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

}

export default BotSettings;