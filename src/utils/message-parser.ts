import * as Discord from 'discord.js';
import { BOT_CMD_PREFIX } from '../bot-settings';

export default function parseMessage(message: Discord.Message) {


  let args = message.content.split(" ");
  for (var i = 0; i < args.length; i++) {
    if (args[i] == '') {
      args.splice(i, 1);
      i--;
    }
  }
  let command = args.shift().toLowerCase().substr(1);

  let msg: Command = {
    args,
    command
  };

  return msg;

}