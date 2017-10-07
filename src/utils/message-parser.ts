import * as Discord from 'discord.js';

export default function parseMessage(message: Discord.Message): ParsedMessage {


  let args = message.content.split(" ");
  for (var i = 0; i < args.length; i++) {
    if (args[i] == '') {
      args.splice(i, 1);
      i--;
    }
  }
  let is = args.shift().toLowerCase().substr(1);

  
  let msg: ParsedMessage = {
    is,
    args
  };
  console.log("\t[Message Parser] parsed message", msg);

  return msg;

}