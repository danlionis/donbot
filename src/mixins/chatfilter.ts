import * as Discord from 'discord.js';

export class ChatFilter {

  public static get filter(): string {
    return undefined;
  }

  public static run(message: Discord.Message) {
    console.log("[Chatfilter] triggered");
  }
}

export default ChatFilter;