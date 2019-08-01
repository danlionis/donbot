import * as Discord from "discord.js";
import { Bot } from "../../core/bot";
import { Module } from "../../core/module";
import { Arg, Command, CommandResult } from "../../parser";
import { Duration } from "../../utils/duration";
import { find_voice_channel } from "../../utils/fuzzy_finder";
import { can_modify } from "../../validator/permission";

const Mute = new Command({
  name: "mute",
  about: "Mute members",
  permissions: ["MUTE_MEMBERS"]
})
  .arg(
    new Arg({
      name: "TARGET",
      positional: true,
      required: true,
      type: "member",
      help: "Member you want to mute"
    })
  )
  .arg(
    new Arg({
      name: "TIME",
      positional: true,
      type: "duration",
      help: "Mute duration",
      default: new Duration("5m")
    })
  )
  .handler(async (bot, msg, matches) => {
    const target = matches.value_of("TARGET") as Discord.GuildMember;

    if (!target.voiceChannel) {
      return CommandResult.Failed;
    }

    if (!can_modify(bot, msg.member, target, { same_role: true })) {
      return CommandResult.PermissionDenied;
    }

    const millis: number = matches.value_of("TIME") || 10 * Duration.MINUTE;

    target.setMute(true);

    setTimeout(() => {
      target.setMute(false);
    }, millis);
  });

const Silence = new Command({
  name: "silence",
  about: "Control the mute status in you channel",
  permissions: ["MUTE_MEMBERS"]
})
  .arg(
    new Arg({
      name: "ACTION",
      positional: true,
      possible_values: ["on", "off"],
      default: "on"
    })
  )
  .handler(async (bot, msg, matches) => {
    const action = matches.value_of("ACTION");

    if (!msg.member.voiceChannel) {
      return CommandResult.Failed;
    }

    if (action === "on") {
      msg.member.voiceChannel.members
        .filter((m) => m !== msg.member)
        .filter((m) => can_modify(bot, msg.member, m))
        .forEach((m) => {
          m.setMute(true);
        });
      return CommandResult.Success;
    }

    if (action === "off") {
      msg.member.voiceChannel.members.forEach((m) => {
        m.setMute(false);
      });
      return CommandResult.Success;
    }
  });

const Clear = new Command({
  name: "clear",
  about: "Clears the chat",
  permissions: ["MANAGE_MESSAGES"],
  aliases: ["cls"]
})
  .arg(
    new Arg({
      name: "COUNT",
      help: "The amount of messages to delete",
      positional: true,
      default: 10,
      type: "number"
    })
  )
  .handler(async (bot, msg, matches) => {
    let limit = parseInt(matches.value_of("COUNT"), 10) + 1;
    limit = Math.min(limit, 100);
    let messages = await msg.channel.fetchMessages({ limit });
    const time = new Date().getTime() - 14 * 24 * 60 * 60 * 1000; // last 2 weeks

    messages = messages.filter((m) => m.createdAt.getTime() > time);
    messages = messages.filter((m) => !m.pinned);

    if (messages.array().length >= 2) {
      await msg.channel.bulkDelete(messages);
    }
  });

const Move = new Command({
  name: "move",
  about: "Mass Mover",
  permissions: ["MOVE_MEMBERS"]
})
  .subcommand(
    new Command({ name: "from", about: "Move members to own channel" })
      .arg(
        new Arg({
          name: "TARGET",
          help: "Target voice channel",
          positional: true,
          required: true
        })
      )
      .handler(async (bot, msg, matches) => {
        const target = matches.value_of("TARGET");
        const channel = find_voice_channel(
          msg.guild.channels
            .filter((c) => c.type === "voice")
            .array() as Discord.VoiceChannel[],
          target
        );

        if (!channel) {
          msg.reply("Target not found");
          return CommandResult.Failed;
        }

        if (!msg.member.voiceChannel) {
          msg.reply("you have to be in a voice channel");
          return CommandResult.Failed;
        }

        // no permission check because we dont change channels
        channel.members.forEach((m) => {
          m.setVoiceChannel(msg.member.voiceChannel);
        });

        return CommandResult.Success;
      })
  )
  .subcommand(
    new Command({
      name: "to",
      about: "Move members to other channel"
    })
      .arg(
        new Arg({
          name: "TARGET",
          help: "Target channel",
          positional: true,
          required: true
        })
      )
      .handler(async (bot, msg, matches) => {
        const target = matches.value_of("TARGET");
        const channel = find_voice_channel(
          msg.guild.channels
            .filter((c) => c.type === "voice")
            .array() as Discord.VoiceChannel[],
          target
        );

        if (!channel) {
          msg.reply("Target not found");
          return CommandResult.Failed;
        }

        const allowed = channel.permissionsFor(msg.author).has("CONNECT");
        if (!allowed) {
          return CommandResult.PermissionDenied;
        }

        if (!msg.member.voiceChannel) {
          msg.reply("you have to be in a voice channel");
          return CommandResult.Failed;
        }

        msg.member.voiceChannel.members.forEach((m) => {
          m.setVoiceChannel(channel);
        });
      })
  )
  .handler(async (bot, msg, matches) => {
    return CommandResult.SendHelp;
  });

export const Logs = new Command({
  name: "logs",
  about: "view the latest executed commands",
  permissions: ["VIEW_AUDIT_LOG"]
})
  .arg(
    new Arg({
      name: "COUNT",
      short: "c",
      long: "count",
      help: "Output the last N lines",
      takes_value: true,
      type: "number",
      default: 10
    })
  )
  .arg(
    new Arg({
      name: "JSON",
      long: "json",
      help: "Show output as JSON"
    })
  )
  .handler((bot, msg, matches) => {
    const count: number = matches.value_of("COUNT");
    const json: boolean = matches.value_of("JSON");

    let cmd_logs = bot.getLogs();

    if (count < cmd_logs.length) {
      cmd_logs = cmd_logs.slice(cmd_logs.length - count);
    }

    let res = "";
    if (json) {
      res = JSON.stringify(cmd_logs, null, 1) || "[]";
    } else {
      res = cmd_logs
        .map(
          (l) =>
            `${new Date(l.timestamp)} ${l.user}: ${l.content} [${
              CommandResult[l.result]
            }]`
        )
        .join("\n");
    }
    msg.channel.send(res, { code: "json" });
  });

export const ModerationModule: Module = {
  name: "moderation",
  commands: [Mute, Move, Clear, Silence, Logs]
};

export default ModerationModule;
