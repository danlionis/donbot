import * as Discord from 'discord.js';
import * as colors from 'colors/safe';

export interface ParsedTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ParsedMessage {
  is: string;
  args?: Array<any>;
}

export namespace Parser {

  export function parseTime(time: string): ParsedTime {
    let regexDays = /\d+d/;
    let regexHours = /\d+h/;
    let regexMinutes = /\d+m/;
    let regexSeconds = /\d+s/;

    let days = +(time.match(regexDays) || "0d")[0].slice(0, -1);
    let hours = +(time.match(regexHours) || "0h")[0].slice(0, -1);
    let minutes = +(time.match(regexMinutes) || "0m")[0].slice(0, -1);
    let seconds = +(time.match(regexSeconds) || "0s")[0].slice(0, -1);

    return { days, hours, minutes, seconds };
  }

  export function parseMessage(message: Discord.Message, cmdPrefix: string): ParsedMessage {

    let args = message.content.split(" ");
    // remove empty args
    for (var i = 0; i < args.length; i++) {
      if (args[i] == '') {
        args.splice(i, 1);
        i--;
      }
    }
    let is = args.shift().toLowerCase().substr(cmdPrefix.length);

    let msg: ParsedMessage = {
      is,
      args
    };
    console.log(`${colors.yellow("[C]")} by ${colors.blue(message.author.tag)}: ${msg.is} [${msg.args.join(",")}]`);

    return msg;

  }
}

export default Parser;