import * as Discord from 'discord.js';
import { BotSettings } from '../';
import { ParsedMessage } from '../types';


export default function parseMessage(message: Discord.Message): ParsedMessage {

  let args = message.content.split(" ");
  // remove empty args
  for (var i = 0; i < args.length; i++) {
    if (args[i] == '') {
      args.splice(i, 1);
      i--;
    }
  }
  let is = args.shift().toLowerCase().substr(BotSettings.BOT_CMD_PREFIX.length);


  let msg: ParsedMessage = {
    is,
    args
  };
  console.log("\t[Message Parser] parsed message", msg);

  return msg;

}