import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";

export let Context = new Command({
  name: "ctx",
  about: "Context Test",
  owner_only: true
}).handler(async (bot, msg, matches, ctx) => {
  if (!ctx.data) {
    ctx.data = 0;
    ctx.expire_in(10);
  }

  ctx.data += 1;

  // ctx.data += 1;
  console.log(ctx.data);
});

export let Error = new Command({
  name: "error",
  about: "this errors everything",
  permissions: ["KICK_MEMBERS"]
});
// .arg(new Arg({ name: "FIRST", long: "first", positional: true }))
// .arg(new Arg({ name: "SECOND", short: "s" }));

export let Test = new Command({
  name: "test",
  about: "This is just a test command"
  // permission: ["MUTE_MEMBERS"]
})
  .arg(
    new Arg({ name: "FLAG" })
      .long("flag")
      .short("f")
      .help("this tests a flag")
  )
  .arg(
    new Arg({
      name: "RESULT",
      long: "result",
      short: "r",
      takes_value: true,
      help: "Return with specific result",
      possible_values: ["0", "1", "2", "3", "4"]
    })
  )
  .arg(
    new Arg({
      name: "VALUE",
      long: "value",
      short: "v",
      takes_value: true,
      help: "this tests a flag with a value"
    })
  )
  .arg(new Arg({ name: "VERYLONGARGUMENT", positional: true }))
  .arg(
    new Arg({
      name: "POS",
      positional: true,
      // required: true,
      help: "this tests a positional argument"
    })
  )
  .arg(
    new Arg({
      name: "MULT",
      positional: true,
      take_multiple: true,
      help: "postitional arg with multiple input"
    })
  )
  .arg(
    new Arg({
      name: "hidden",
      long: "hidden",
      hidden: true
    })
  )
  .arg(
    new Arg({
      name: "DELETE",
      long: "delete",
      short: "del"
    })
  )
  .handler(async (bot, msg, matches) => {
    if (matches.value_of("DELETE")) {
      msg.delete();
    }

    switch (matches.value_of("RESULT")) {
      case "0":
        return CommandResult.Success;
      case "1":
        return CommandResult.Error;
      case "2":
        return CommandResult.SendHelp;
      case "3":
        return CommandResult.PermissionDenied;
      case "4":
        return CommandResult.Failed;
    }

    return CommandResult.Success;
  })
  .subcommand(
    new Command({
      name: "first"
      // permission: ["MUTE_MEMBERS"]
    })
  )
  .subcommand(
    new Command({
      name: "second",
      about: "this is a subcommand with args"
    })
      .arg(
        new Arg({ name: "FLAG" })
          .long("flag")
          .short("f")
          .help("this tests a flag")
      )
      .arg(
        new Arg({
          name: "VALUE",
          long: "value",
          short: "v",
          takes_value: true,
          help: "this tests a flag with a value"
        })
      )
      .arg(
        new Arg({
          name: "POS",
          positional: true,
          help: "this tests a positional argument"
        })
      )
  );
