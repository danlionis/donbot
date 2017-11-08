import { ChatFilter } from '../../mixins';
import * as Discord from 'discord.js';
import { Bot } from '../../bot';

export class Test extends ChatFilter {

  constructor() {
    super({
      filter: "poll: "
    })
  }

  async run(bot: Bot, message: Discord.Message) {

  }

}

export default Test;