import { ChatFilter } from '../../mixins';
import * as Discord from 'discord.js';

export class Test extends ChatFilter {

  static get filter(): string {
    return "test"
  }

  static run(message: Discord.Message) {
    message.channel.send("test");
  }
}

export default Test;