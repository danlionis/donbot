import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

export class TimeMute extends TextCommand {
  constructor() {
    super({
      command: "timemute",
      description: "timemutes a ",
      permissions: [
        "MUTE_MEMBERS"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let muteUser = message.mentions.members.first();
    let regexDays = /\d+d/;
    let regexHours = /\d+h/;
    let regexMinutes = /\d+m/;
    let regexSeconds = /\d+s/;

    let time = parsedMessage.args[1] as string;

    let days = +(time.match(regexDays) || "0d")[0].slice(0, -1);
    let hours = +(time.match(regexHours) || "0h")[0].slice(0, -1);
    let minutes = +(time.match(regexMinutes) || "0m")[0].slice(0, -1);
    let seconds = +(time.match(regexSeconds) || "0s")[0].slice(0, -1);


    console.log(days, hours, minutes, seconds);

    let muteTime = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);

    muteUser.setMute(true);

    setTimeout(function () {
      muteUser.setMute(false);
    }, muteTime);
  }
}