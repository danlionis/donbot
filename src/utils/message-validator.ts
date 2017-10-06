import * as Discord from 'discord.js';
import { BOT_CMD_PREFIX } from '../bot-settings';

export default function validate(message: Discord.Message): boolean {
  if (message.author.bot) return false;
  if (!message.content.startsWith(BOT_CMD_PREFIX)) return false;

  return true;
}