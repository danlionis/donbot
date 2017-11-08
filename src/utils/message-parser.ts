import * as Discord from 'discord.js';
import { Bot } from '../';
import { ParsedMessage } from '../types';
import * as colors from "colors/safe"


export default function parseMessage(message: Discord.Message, cmdPrefix: string): ParsedMessage {

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
  // console.log("[Message Parser] parsed message", msg);
  console.log(`${colors.yellow("[C]")} by ${colors.blue(message.author.tag)}: ${msg.is} [${msg.args.join(",")}]`);

  return msg;

}