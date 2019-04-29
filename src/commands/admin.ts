import * as Discord from "discord.js";
import { handle_cmd } from "../command_handler";
import { Arg, Command, CommandResult } from "../parser";

export let Perms = new Command({
  name: "perms",
  about: "Manage Command permissions",
  owner_only: true
}).subcommand(
  new Command({ name: "user" })
    .arg(
      new Arg({
        name: "MEMBER",
        positional: true,
        required: true,
        can_mention: true,
        help: "User that should be managed"
      })
    )
    .arg(
      new Arg({
        name: "STATUS",
        positional: true,
        required: true,
        possible_values: ["allow", "deny"],
        help: "Allow or deny"
      })
    )
    .arg(
      new Arg({
        name: "COMMAND",
        positional: true,
        required: true,
        take_multiple: true,
        help: "Command / Subcommands"
      })
    )
    .handler(async (bot, msg, matches) => {
      const allow = matches.value_of("STATUS") === "allow";
      const cmd = bot.find_command(
        (matches.value_of("COMMAND") as string[]).join(" ")
      );
      const member = matches.value_of("MEMBER") as Discord.GuildMember;
      bot.set_perm(member, cmd, allow);
      console.log(bot._perms);
    })
);

export let Exec = new Command({
  name: "exec",
  about: "Let the bot execute a command",
  owner_only: true
})
  .arg(
    new Arg({
      name: "COMMAND",
      positional: true,
      take_multiple: true,
      required: true
    })
  )
  .handler(async (bot, msg, matches) => {
    msg.author = bot.user;
    msg.member = bot.guilds.find((g) => g === msg.guild).member(bot.user);
    handle_cmd(bot, (matches.value_of("COMMAND") as string[]).join(" "), msg);
  });

export let Alias = new Command({
  name: "alias",
  about: "Manage command aliases",
  owner_only: true
})
  .subcommand(
    new Command({ name: "set", about: "Set a new alias" })
      .arg(
        new Arg({
          name: "ALIAS",
          positional: true,
          required: true,
          help: "New Alias"
        })
      )
      .arg(
        new Arg({
          name: "COMMAND",
          positional: true,
          required: true,
          take_multiple: true,
          help: "Comman to execute when alias is called"
        })
      )
      .handler(async (bot, msg, matches) => {
        const alias = matches.value_of("ALIAS");
        const cmd = (matches.value_of("COMMAND") as string[]).join(" ");

        if (bot.registry.map((c) => c.config.name).indexOf(alias) >= 0) {
          msg.channel.send(`Cannot set alias. Command ${alias} already exists`);
          return CommandResult.Failed;
        }

        bot.set_alias(alias, cmd);
      })
  )
  .subcommand(
    new Command({ name: "list", about: "List all aliases" }).handler(
      async (bot, msg) => {
        let res = "ALIASES:\n";
        res += bot.aliases.map((a) => `${a.key} -> ${a.value}`).join("\n");
        msg.channel.send(res, { code: true });
      }
    )
  )
  .subcommand(
    new Command({ name: "remove", about: "Remove an alias" })
      .arg(
        new Arg({
          name: "ALIAS",
          required: true,
          positional: true,
          help: "Alias to remove"
        })
      )
      .handler(async (bot, msg, matches) => {})
  );

export let Delete = new Command({
  name: "delete",
  permissions: ["MANAGE_MESSAGES"],
  about: "Delete your message and still execute a command"
})
  .arg(
    new Arg({
      name: "COMMAND",
      take_multiple: true,
      required: true,
      help: "Command to execute",
      positional: true
    })
  )
  .handler(async (bot, msg, matches) => {
    msg.delete();

    const exec_cmd: string = (matches.value_of("COMMAND") as string[]).join(
      " "
    );

    const res = await handle_cmd(bot, exec_cmd, msg);
    return res;
  });

export let Eval = new Command({
  name: "eval",
  about: "Execute javascript",
  owner_only: true
})
  .arg(
    new Arg({
      name: "INPUT",
      positional: true,
      take_multiple: true,
      required: true
    })
  )
  .handler(async (bot, msg, matches) => {
    const input = (matches.value_of("INPUT") as string[]).join(" ");
    const res = isolate_eval(input);
    console.log("eval: ", res);

    msg.channel.send(JSON.stringify(res), { code: "json" });
  });

const isolate_eval = (input: string) => {
  try {
    // tslint:disable-next-line: no-eval
    return eval(input);
  } catch (err) {
    return err.toString();
  }
};

export let Game = new Command({
  name: "game",
  about: "Set the current game",
  owner_only: true
})
  .arg(
    new Arg({
      name: "RESET",
      long: "reset",
      short: "r",
      help: "Resets the game"
    })
  )
  .arg(
    new Arg({
      name: "GAME",
      positional: true,
      take_multiple: true
    })
  )
  .arg(
    new Arg({
      name: "TYPE",
      long: "type",
      short: "t",
      takes_value: true,
      help: "Activity type",
      possible_values: ["WATCHING", "PLAYING", "LISTENING", "STREAMING"],
      default: "PLAYING"
    })
  )
  .handler(async (bot, msg, matches) => {
    if (matches.value_of("RESET")) {
      bot.user.setActivity("");
      return CommandResult.Success;
    }
    if (matches.value_of("GAME")) {
      const game = (matches.value_of("GAME") as string[]).join(" ");
      // const type = matches.value_of("TYPE");
      const type = bot.user.presence.game
        ? bot.user.presence.game.type
        : "PLAYING";
      bot.user.setActivity(game, { type });

      return CommandResult.Success;
    }
    if (matches.value_of("TYPE")) {
      if (!bot.user.presence.game) {
        return CommandResult.Error;
      }

      const current = bot.user.presence.game.name;
      bot.user.setPresence({
        game: { name: current, type: matches.value_of("TYPE") }
      });

      return CommandResult.Success;
    }

    return CommandResult.SendHelp;
  });
