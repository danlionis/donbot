import * as Discord from "discord.js";
import { handle_cmd } from "../command_handler";
import { Arg, Command, CommandResult } from "../parser";
import { CommandContext } from "../parser/context";
import { Duration } from "../utils/duration";
import { find_voice_channel } from "../utils/fuzzy_finder";
import { can_modify } from "../validator/permission";

export let Mute = new Command({
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
      help: "Mute duration"
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

export let Silence = new Command({
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

export let Clear = new Command({
  name: "clear",
  about: "Clears the chat",
  permissions: ["MANAGE_MESSAGES"]
})
  .arg(
    new Arg({
      name: "COUNT",
      help: "The amount of messages to delete",
      positional: true,
      default: 10
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

export let Move = new Command({
  name: "move",
  about: "Mass Mover",
  permissions: ["MOVE_MEMBERS"]
})
  .subcommand(
    new Command({ name: "from", about: "Move members to own channel" })
      .arg(
        new Arg({
          name: "TARGET",
          help: "Target user where your whole channel will move to",
          positional: true,
          type: "member",
          required: true
        })
      )
      .handler(async (bot, msg, matches) => {
        const target = matches.value_of("TARGET");
        let channel: Discord.VoiceChannel;

        if (target instanceof Discord.GuildMember) {
          channel = target.voiceChannel;
        } else {
          channel = find_voice_channel(
            msg.guild.channels
              .filter((c) => c.type === "voice")
              .array() as Discord.VoiceChannel[],
            target
          );
        }

        if (!channel) {
          msg.reply("Target not found");
          return CommandResult.Failed;
        }

        console.log(channel.name);

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
          help: "Target user where your whole channel will move to",
          type: "member",
          positional: true,
          required: true
        })
      )
      .handler(async (bot, msg, matches) => {
        const target = matches.value_of("TARGET");
        let channel: Discord.VoiceChannel;
        if (target instanceof Discord.GuildMember) {
          channel = target.voiceChannel;
        } else {
          channel = find_voice_channel(
            msg.guild.channels
              .filter((c) => c.type === "voice")
              .array() as Discord.VoiceChannel[],
            target
          );
        }

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

export let Delete = new Command({
  name: "delete",
  permissions: ["MANAGE_MESSAGES"],
  about: "Delete your message and still execute a command",
  danger: true
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
