/**
 * File for local development
 */

import { Arg, Bot, Command, handle_cmd } from "./src";

const client = new Bot();

client.login();
const Test = new Command({
  name: "test",
  owner_only: true
});

const Noop = new Command({
  name: "noop",
  about: "Execute a command",
  danger: true
})
  .arg(
    new Arg({
      name: "QUERY",
      positional: true,
      required: true,
      take_multiple: true
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const query: string[] = matches.value_of("QUERY");
    return handle_cmd(bot, query.join(" "), msg, context);
  });

const Context = new Command({
  name: "context",
  aliases: ["ctx"],
  owner_only: true
})
  .arg(
    new Arg({
      name: "SILENT",
      short: "s",
      long: "silent"
    })
  )
  .arg(
    new Arg({
      name: "QUERY",
      positional: true,
      required: true,
      take_multiple: true
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const query: string[] = matches.value_of("QUERY");
    if (matches.value_of("SILENT")) {
      context.flags.silent = true;
    }
    return handle_cmd(bot, query.join(" "), msg, context);
  });

client.registerCommands(Test, Context, Noop);
