import * as Discord from "discord.js";
import { handle_cmd } from "../command_handler";
import { Arg, Command, CommandResult } from "../parser";

const PermsCommand = new Command({
  name: "command",
  about: "Enable/Disable a command"
})
  .arg(
    new Arg({
      name: "COMMAND",
      positional: true,
      help: "Command you want to manage"
    })
  )
  .arg(
    new Arg({
      name: "STATUS",
      positional: true,
      help: "New command status",
      possible_values: ["on", "off"]
    })
  )
  .handler(async (bot, msg, matches) => {
    const cmd = bot.find_command(matches.value_of("COMMAND"));
    const status = matches.value_of("STATUS");

    if (cmd) {
      if (status === "on") {
        bot.perms.allow_cmd(cmd);
      } else if (status === "off") {
        bot.perms.deny_cmd(cmd);
      }
    }

    let res = `DISABLED COMMANDS:\n`;
    res += bot.perms
      .get_disabled_commands()
      .map((c) => "\t" + c)
      .join("\n");

    msg.channel.send(res, { code: true });
  });

const PermsUser = new Command({ name: "user" })
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
      possible_values: ["allow", "deny", "reset"],
      help: "Allow, deny or reset explicit permission"
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      positional: true,
      take_multiple: true,
      help: "Command / Subcommands"
    })
  )
  .handler(async (bot, msg, matches) => {
    const member = matches.value_of("MEMBER") as Discord.GuildMember;
    const status = matches.value_of("STATUS");

    if (status) {
      const cmd = bot.find_command(
        (matches.value_of("COMMAND") as string[]).join(" ")
      );
      if (status === "allow") {
        bot.perms.allow_user_cmd(member, cmd);
      } else if (status === "deny") {
        bot.perms.deny_user_cmd(member, cmd);
      } else {
        bot.perms.reset_user_cmd(member, cmd);
      }
    }

    let res = `Explicit user permissions: ${member.displayName}\n`;
    res += "\nALLOWED:\n";
    res += bot.perms
      .get_user_allowed(member)
      .map((p) => "\t" + p)
      .join("\n");

    res += "\nDENIED:\n";
    res += bot.perms
      .get_user_denied(member)
      .map((p) => "\t" + p)
      .join("\n");

    msg.channel.send(res, { code: true });
    return CommandResult.Success;
  });

export let Perms = new Command({
  name: "perms",
  about: "Manage Command permissions",
  owner_only: true
})
  .subcommand(PermsCommand)
  .subcommand(PermsUser);

export let Exec = new Command({
  name: "exec",
  about: "Execute a command for another user",
  owner_only: true
})
  .arg(
    new Arg({
      name: "MEMBER",
      positional: true,
      required: true,
      can_mention: true
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      positional: true,
      take_multiple: true,
      required: true
    })
  )
  .handler(async (bot, msg, matches) => {
    msg.member = matches.value_of("MEMBER") as Discord.GuildMember;
    msg.author = msg.member.user;
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
    console.log("del");
    msg
      .delete()
      .then(() => console.log("deleted"))
      .catch((e) => console.log(e));

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
