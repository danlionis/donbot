export class BotSettings {
  private _token: string;
  private _prefix: string;
  private _extras: Object;
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

  get extras(): Object {
    return this._extras;
  }

  set extras(extras: Object) {
    this._extras = extras;
  }

}

export default BotSettings;