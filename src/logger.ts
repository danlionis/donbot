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
    let channel: TextChannel = guild.channels.find(
      (c) => c.name === this.bot.settings.botLogChannel
    ) as TextChannel;
    if (!channel) {
      channel = await this.createChannel(guild);
    }
    return channel;
  }

  private async createChannel(guild: Guild) {
    const channel = (await guild.createChannel(
      this.bot.settings.botLogChannel,
      "text"
    )) as TextChannel;

    // nobody should be allowed to send messages into the channel
    channel.overwritePermissions(
      guild.roles.find((r) => r.name === "@everyone"),
      {
        SEND_MESSAGES: false
      }
    );
    // allow the bot to send messages
    channel.overwritePermissions(this.bot.user.id, { SEND_MESSAGES: true });

    return channel;
  }
}
