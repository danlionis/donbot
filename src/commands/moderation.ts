import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";
import { find_voice_channel } from "../utils/fuzzy_finder";

export let Silence = new Command({
  name: "silence",
  about: "Control the mute status in you channel",
  permissions: ["MUTE_MEMBERS"]
})
  .subcommand(
    new Command({ name: "on", about: "mutes everyone" }).handler(
      async (bot, msg, matches) => {
        if (msg.member.voiceChannel) {
          msg.member.voiceChannel.members.forEach((m) => {
            if (m.id !== msg.member.id) {
              m.setMute(true);
            }
          });
        }
      }
    )
  )
  .subcommand(
    new Command({ name: "off", about: "mutes everyone" }).handler(
      async (bot, msg, matches) => {
        if (msg.member.voiceChannel) {
          msg.member.voiceChannel.members.forEach((m) => {
            if (m.id !== msg.member.id) {
              m.setMute(false);
            }
          });
        }
      }
    )
  );

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
          can_mention: true,
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
          positional: true,
          can_mention: true,
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
