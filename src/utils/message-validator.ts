import * as Discord from 'discord.js';

export default function validate(message: Discord.Message, cmdPrefix: string): boolean {
  /**
   * test if the autor is a bot
   */
  if (message.author.bot) return false;

  /**
   * check if command has right prefix
   */
  if (!message.content.startsWith(cmdPrefix)) return false;

  /**
   * test if the message is in a good format
   */
  let regex = /.[a-zA-Z]+\s*(\s*.+\s*)*/;
  console.log("\t[Message Validator] nicely formatted", regex.test(message.content));
  if (!regex.test(message.content)) return false;

  return true;
}