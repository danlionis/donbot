import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";

import { promisify } from "util";

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
    // const res = bot.resolve_alias("timer 20 timer hat bendet");

    const asyncTimeout = promisify(setTimeout);

    const result = matches.value_of("RESULT");
    if (result) {
      return parseInt(result, 10) || 0;
    }

    const sent = await msg.channel.send("Loading |", { code: true });

    const symbols = "|/-\\".split("");
    let symbol_i = 1;

    if (sent instanceof Discord.Message) {
      for (let i = 0; i < 20; i++) {
        await sent.edit(`Loading ${symbols[symbol_i]}`, { code: true });
        symbol_i += 1;

        await asyncTimeout(500);

        if (symbol_i === symbols.length) {
          symbol_i = 0;
        }
      }
      sent.delete();
    }
  })
  .subcommand(
    new Command({
      name: "first",
      about: "this is a subcommand"
    })
  );
