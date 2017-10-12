export class BotSettings {
  static BOT_LOGIN_TOKEN: string;
  private static prefix: string;
  static WATCHTOGETHER_LINK: string;

  static get BOT_CMD_PREFIX(): string {
    return this.prefix;
  }

  static set BOT_CMD_PREFIX(prefix: string) {
    this.prefix = prefix || ".";
  }
}

export default BotSettings;