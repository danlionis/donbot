import { Guild, Message, RichEmbed, TextChannel } from "discord.js";
import { Bot } from ".";

export class Logger {
  constructor(private bot: Bot) {}

  public async logToChannel(guild: Guild, content: string | RichEmbed) {
    const c = await this.getChannel(guild);
    return c.send(content);
  }

  private log(message?: any, ...optionalParameters: any[]) {
    const time = this.getDateTime();
    console.log(time, message, ...optionalParameters);
  }

  private getDateTime() {
    const d = new Date();

    const date = d.toLocaleDateString();
    const time = d.toLocaleTimeString();

    return `<${date} ${time}>`;
  }

  private async getChannel(guild: Guild) {
    let c: TextChannel = guild.channels.find(
      "name",
      this.bot.settings.botLogChannel
    ) as TextChannel;
    if (!c) {
      c = (await guild.createChannel(
        this.bot.settings.botLogChannel,
        "text"
      )) as TextChannel;

      c.overwritePermissions(guild.roles.find("name", "@everyone"), {
        SEND_MESSAGES: false
      });
      c.overwritePermissions(this.bot.user.id, { SEND_MESSAGES: true });
    }
    return c;
  }
}
