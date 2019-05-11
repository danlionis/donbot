import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";

export let Test = new Command({
  name: "test",
  about: "This is just a test command"
  // permission: ["MUTE_MEMBERS"]
})
  .arg(
    new Arg({
      name: "NUMBERS",
      long: "nums",
      short: "n",
      type: "number",
      takes_value: true
    })
  )
  .arg(
    new Arg({
      name: "MEMBER",
      type: "member",
      long: "member",
      short: "m",
      takes_value: true
    })
  )
  .arg(
    new Arg({
      name: "DURATION",
      type: "duration",
      long: "duration",
      short: "d",
      takes_value: true
    })
  )
  .arg(
    new Arg({
      name: "MULNUM",
      type: "number",
      positional: true,
      take_multiple: true
    })
  )
  .arg(
    new Arg({
      name: "RESULT",
      type: "number",
      default: 0,
      long: "result",
      short: "r",
      takes_value: true
    })
  )
  .handler(async (bot, msg, matches) => {
    console.log(matches);
    const result = matches.value_of("RESULT");
    return parseInt(result, 10) || 0;
  })
  .subcommand(
    new Command({
      name: "first",
      about: "this is a subcommand"
    })
  );
