import * as Discord from 'discord.js';
import { BOT_CMD_PREFIX } from '../bot-settings';

export default function validate(message: Discord.Message): boolean {
  /**
   * test if the autor is a bot
   */
  if (message.author.bot) return false;

  /**
   * check if command has right prefix
   */
  if (!message.content.startsWith(BOT_CMD_PREFIX)) return false;

  /**
   * test if the message is in a good format
   */
  let regex = /.[a-zA-Z]+\s*(\s*.+\s*)*/;
  console.log("regex", regex.test(message.content));
  if (!regex.test(message.content)) return false;

  return true;
}