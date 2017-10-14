import * as Discord from 'discord.js';
import { Bot } from '../';

export default function validate(message: Discord.Message, cmdPrefix: string): boolean {
  /**
   * test if the autor is a bot
   */
  if (message.author.bot) return false;

  /**
   * check if command has right prefix
   */
  let sub = message.content.substr(0, cmdPrefix.length);
  if (sub !== cmdPrefix) return false;

  let prefix = escape(cmdPrefix);
  /**
   * test if the message is in a good format
   */
  let expression = prefix + "[a-zA-Z]+\s*(\s*.+\s*)*"
  let regexp = new RegExp(expression);
  console.log("\t[Message Validator] nicely formatted", regexp.test(message.content));
  if (!regexp.test(message.content)) return false;

  return true;
}

function escape(str: string) {
  const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

  return str.replace(matchOperatorsRe, '\\$&')
}