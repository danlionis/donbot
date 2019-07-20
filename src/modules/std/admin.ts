import { exec } from "child_process";
import * as Discord from "discord.js";
import { handle_cmd } from "../../core/command_handler";
import { Module } from "../../core/module";
import { Arg, Command, CommandResult } from "../../parser";

const Exec = new Command({
  name: "exec",
  about: "Execute a command on the host machine",
  owner_only: true
})
  .arg(
    new Arg({
      name: "COMMAND",
      help: "Command to execute",
      positional: true,
      required: true,
      type: "string",
      take_multiple: true
    })
  )
  .handler((bot, msg, matches) => {
    const cmd: string[] = matches.value_of("COMMAND");
    // const args: string[] = matches.value_of("ARGS");

    let res = "";

    return new Promise((resolve) => {
      const handle = exec(cmd.join(" "));
      handle.stdout.on("data", (data) => {
        res += data;
      });

      handle.stderr.on("data", (data) => {
        res += data;
      });

      handle.on("error", (err) => {
        msg.reply(err, { code: true });
        resolve(CommandResult.Error);
      });

      handle.on("close", (code) => {
        if (res) {
          msg.reply(res.substr(0, 1950), { code: true });
        }
        msg.reply(`process '${cmd.join(" ")}' exited with code ${code}`, {
          code: true
        });
        resolve(CommandResult.Success);
      });
    });
  });

const Runas = new Command({
  name: "runas",
  about: "Run a command as another user",
  owner_only: true
})
  .arg(
    new Arg({
      name: "MEMBER",
      positional: true,
      type: "member",
      required: true
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

const Eval = new Command({
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

const Game = new Command({
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

export const AdminModule: Module = {
  name: "admin",
  commands: [Game, Eval, Exec, Runas]
};

export default AdminModule;
