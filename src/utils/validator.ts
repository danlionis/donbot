import * as Discord from "discord.js";

export function messageValid(message: Discord.Message, cmdPrefix: string): boolean {

  /**
   * check if command has right prefix
   */
  const sub = message.content.substr(0, cmdPrefix.length);
  if (sub !== cmdPrefix) return false;

  const prefix = escape(cmdPrefix);
  /**
   * test if the message is in a good format
   */
  const expression = prefix + "[a-zA-Z]+\s*(\s*.+\s*)*";
  const regexp = new RegExp(expression);
  return regexp.test(message.content);
}

function escape(str: string) {
  const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
  return str.replace(matchOperatorsRe, "\\$&");
}
