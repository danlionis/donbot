import * as Discord from 'discord.js';
import { TextCommand } from '../mixins/command';
import { BotSettings } from '../bot-settings';

export class WatchTogether extends TextCommand {

  constructor() {
    super();
  }

  static get is() {
    return "wtg";
  }

  static get description() {
    return "sends a watch2gether link"
  }

  static get help() {
    return "huiffee";
  }

  static run(message: Discord.Message, parsedMessage: ParsedMessage) {
    message.channel.send(BotSettings.WATCHTOGETHER_LINK)
  }
}

export default WatchTogether;
