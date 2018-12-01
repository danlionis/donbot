import * as colors from "colors/safe";
import { Message } from "discord.js";
import { Argument, Flag } from "../mixins/text-command";

export interface ParsedTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ParsedMessage {
  is: string;
  rawArgs?: string[];
  args?: ParsedArgumentObject;
  flags?: ParsedFlagObject;
}

export interface ParsedArgument {
  readonly name: string;
  /**
   * All arguments that matched with the pattern
   */
  readonly values: string[];
  /**
   * The first argument that matched with the pattern
   */
  readonly value: string;
  /**
   * If this is true then the returned value was a default value 
   */
  readonly default: boolean;
  readonly exists: boolean;
}

export interface ParsedArgumentObject {
  [key: string]: ParsedArgument;
}

export interface ParsedFlagObject {
  [key: string]: boolean;
}

export interface ParsedYtUrl {
  readonly id: string;
  readonly url: string;
}

export function parseTime(time: string): ParsedTime {
  const regexDays = /\d+d/;
  const regexHours = /\d+h/;
  const regexMinutes = /\d+m/;
  const regexSeconds = /\d+s/;

  const days = +(time.match(regexDays) || "0d")[0].slice(0, -1);
  const hours = +(time.match(regexHours) || "0h")[0].slice(0, -1);
  const minutes = +(time.match(regexMinutes) || "0m")[0].slice(0, -1);
  const seconds = +(time.match(regexSeconds) || "0s")[0].slice(0, -1);

  return { days, hours, minutes, seconds };
}

export function parseMessage(
  message: Message,
  cmdPrefix: string
): ParsedMessage {
  const args = message.content.split(" ");
  // remove empty args
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "") {
      args.splice(i, 1);
      i--;
    }
  }
  const is = args
    .shift()
    .toLowerCase()
    .substr(cmdPrefix.length);

  const msg: ParsedMessage = {
    is,
    rawArgs: args
  };
  return msg;
}

export function parseArguments(
  cmdArgs: Argument[],
  args: string[]
): ParsedArgumentObject {
  const parsed: ParsedArgumentObject = {};

  // For each expected argument look if one was provided
  cmdArgs.forEach((parseArg, i) => {
    let found: string[] = args.filter((arg) => {
      return parseArg.pattern.test(arg);
    });

    let isDefault = false;
    let exist = true;

    if (found.length === 0) {
      found = [parseArg.default];
      exist = false;
      if (parseArg.default) {
        isDefault = true;
        exist = true;
      }
    }

    const a: ParsedArgument = {
      name: parseArg.name,
      values: found,
      value: found[0],
      default: isDefault,
      exists: exist
    };

    parsed[parseArg.name] = a;
  });

  return parsed;
}

export function parseFlags(
  cmdFlags: Flag[],
  flags: string[]
): ParsedFlagObject {
  const parsed: ParsedFlagObject = {};

  cmdFlags.forEach((parseFlag, i) => {
    const found = flags.find((flag) => {
      // return if argument is either a long or a short flag
      return flag === "--" + parseFlag.long || flag === "-" + parseFlag.short;
    });

    parsed[parseFlag.name] = found ? true : false;
  });

  return parsed;
}

export function parseYtURL(url: string) {
  const regexHostname = /(youtube.com|youtu.be|youtube-nocookie.com)/i;
  const regexVidId = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;

  let id: string;

  if (!url.match(regexHostname)) {
    return null;
  }

  const matches = url.match(regexVidId);

  if (matches && matches.length === 2 && matches[1].length === 11) {
    id = matches[1];
  }

  const parsed: ParsedYtUrl = {
    id,
    url
  };

  return parsed;
}
