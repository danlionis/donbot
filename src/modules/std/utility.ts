import { handle_cmd } from "../../core/command_handler";
import { Module } from "../../core/module";
import { Arg, Command, CommandResult } from "../../parser";

/**
 * Usage:
 * [prefix]try [command to execute] catch [command to execute instead]
 */
export const TryCatch = new Command({
  name: "try",
  about:
    "try to execute a command, execute some other on failure (view source for explanation)",
  danger: true,
  hidden: true
})
  .arg(
    new Arg({
      name: "QUERY",
      positional: true,
      required: true,
      type: "string",
      take_multiple: true
    })
  )
  .handler(async (bot, msg, matches, _, recursion_depth) => {
    const query: string[] = matches.value_of("QUERY");
    const catch_pos = query.indexOf("catch");

    let try_statement: string;
    if (catch_pos !== -1) {
      try_statement = query.slice(0, catch_pos).join(" ");
    } else {
      try_statement = query.join(" ");
    }

    let res: CommandResult;
    res = await handle_cmd(bot, try_statement, msg, recursion_depth);

    if (res === CommandResult.Success) {
      return CommandResult.Success;
    } else if (catch_pos !== -1) {
      const catch_statement = query.slice(catch_pos + 1).join(" ");
      res = await handle_cmd(bot, catch_statement, msg, recursion_depth);
      return res;
    } else {
      return CommandResult.Failed;
    }
  });

export const RerunLast = new Command({
  name: "rerun",
  about: "rerun last successfull command",
  danger: true,
  hidden: true,
  no_log: true,
  aliases: ["!"]
}).handler(async (bot, msg, matches, _, recursion_depth) => {
  const member_cmds = bot.cmd_logs.filter(
    (l) => l.user === msg.author.tag && l.result === CommandResult.Success
  );

  if (member_cmds.length === 0) {
    msg.reply("No recent commands");
    return CommandResult.Failed;
  }

  const last_cmd = member_cmds[member_cmds.length - 1].content;

  return handle_cmd(bot, last_cmd, msg);
});

export const Async = new Command({
  name: "async",
  about:
    "Execute commands asyncronously. Useful for chaining where you dont want to wait for a command to finish ",
  danger: true,
  hidden: true
})
  .arg(
    new Arg({
      name: "COMMAND",
      required: true,
      positional: true,
      take_multiple: true,
      help: "command to execute asyncronously"
    })
  )
  .handler((bot, msg, matches, _, recursion_depth) => {
    const cmd = (matches.value_of("COMMAND") as string[]).join(" ");
    handle_cmd(bot, cmd, msg, recursion_depth + 1);
  });

export let Chain = new Command({
  name: "chain",
  hidden: true,
  danger: true,
  about:
    "Splits and evaluates commands at execution time (for usage in aliases, use ';' in other cases)"
})
  .arg(
    new Arg({
      name: "RESUME",
      short: "r",
      long: "resume",
      help: "Resume execution after a failed command"
    })
  )
  .arg(
    new Arg({
      name: "SEPARATOR",
      help: "separate the following commands by this symbol",
      default: " + ",
      long: "separator",
      short: "s",
      takes_value: true
    })
  )
  .arg(
    new Arg({
      name: "COMMANDS",
      help: "command to execute",
      positional: true,
      required: true,
      take_multiple: true
    })
  )
  .handler(async (bot, msg, matches, _, recursion_depth) => {
    const input: string[] = matches.value_of("COMMANDS");

    const commands: string[] = input
      .join(" ")
      .split(matches.value_of("SEPARATOR"));

    for (let i = 0; i < commands.length; i++) {
      const content = commands[i].trim();

      const res = await handle_cmd(bot, content, msg, recursion_depth + 1);

      // break if there was an error and the resume flag was not set
      if (!matches.value_of("RESUME") && res !== CommandResult.Success) {
        return res;
        break;
      }
    }
  });

export let Delay = new Command({
  name: "delay",
  about: "Delays a command vor a given amount of seconds",
  danger: true
})
  .arg(
    new Arg({
      name: "TIME",
      positional: true,
      required: true,
      type: "number",
      help: "Time to delay (in seconds)"
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      // required: true,
      take_multiple: true,
      positional: true,
      help: "Command to execute after the time"
    })
  )
  .handler((bot, msg, matches, _, recursion_depth) => {
    return new Promise((resolve, reject) => {
      const delay_cmd: string[] = matches.value_of("COMMAND") as string[];

      let delay_time: number = parseInt(matches.value_of("TIME"), 10);

      delay_time = Math.min(120, delay_time);

      setTimeout(() => {
        if (delay_cmd) {
          handle_cmd(bot, delay_cmd.join(" "), msg, recursion_depth + 1).then(
            (res) => {
              resolve(res);
            }
          );
        }
      }, delay_time * 1000);
    });
  });

export let Repeat = new Command({
  name: "repeat",
  about: "Repeats a command for a given amout of times",
  danger: true
})
  .arg(
    new Arg({
      name: "AMOUNT",
      positional: true,
      required: true,
      type: "number",
      help: "Amount of times the command should be repeated"
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      take_multiple: true,
      positional: true,
      required: true,
      help: "This command gets repeated"
    })
  )
  .arg(
    new Arg({
      name: "FORCE",
      long: "force",
      short: "f",
      hidden: true,
      help:
        "bypass command limit and dangerous commands (requires owner permission)"
    })
  )
  .handler(async (bot, msg, matches, _, recursion_depth) => {
    const repeat_cmd: string[] = matches.value_of("COMMAND") as string[];
    const alias = bot.resolveAlias(repeat_cmd[0]);
    const force: boolean = matches.value_of("FORCE");

    const cmd = bot.findCommand(alias);

    if (!cmd) {
      bot.reply_command_not_found(repeat_cmd[0], msg);
      return CommandResult.Failed;
    }

    // if (repeat_cmd[0] === Repeat.config.name) {
    if (cmd.config.danger) {
      // if (!bot.is_owner(msg.author.id) && !force) {
      if (!(force && bot.isOwner(msg.author.id))) {
        msg.reply(
          `Cannot execute dangerous command '${
            cmd.full_cmd_name
          }' in conjunction with 'repeat'`,
          { code: true }
        );
        return CommandResult.Error;
      }
    }

    let repeat_amout: number = matches.value_of("AMOUNT");

    // limit the repeat amount to 20 repetitions to avoid spamming
    repeat_amout = Math.min(repeat_amout, 20);

    for (let i = 0; i < repeat_amout; i++) {
      let content = repeat_cmd.join(" ");
      content = content.replace("{i}", i.toString());
      content = content.replace("{i+1}", (i + 1).toString());
      content = content.replace("{i-1}", (repeat_amout - i).toString());
      const res = await handle_cmd(bot, content, msg, recursion_depth + 1);
      if (res !== CommandResult.Success) {
        break;
      }
    }
  });

export let Delete = new Command({
  name: "delete",
  permissions: ["MANAGE_MESSAGES"],
  about: "Delete your message and still execute a command",
  danger: true,
  aliases: ["del"]
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
    if (msg.deletable) {
      msg.delete().catch(() => {});
    }
    const exec_cmd: string = (matches.value_of("COMMAND") as string[]).join(
      " "
    );

    await handle_cmd(bot, exec_cmd, msg);
  });

export const UtilityModule: Module = {
  name: "utility",
  commands: [Async, Chain, Delay, Delete, Repeat, RerunLast, TryCatch]
};

export default UtilityModule;
