import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";

export let Yeet = new Command({
  name: "yeet",
  about: "YEET",
  permissions: ["MOVE_MEMBERS"]
})
  .arg(
    new Arg({
      name: "TARGET",
      can_mention: true,
      positional: true,
      required: true
    })
  )
  .handler(async (bot, msg, matches) => {
    const m = matches.value_of("TARGET") as Discord.GuildMember;
    const author_higher =
      m.highestRole.position <= msg.member.highestRole.position;

    if (!author_higher) {
      return CommandResult.PermissionDenied;
    }

    let channels = bot.channels
      .filter((_c) => _c.type === "voice")
      .array() as Discord.VoiceChannel[];

    channels = channels.filter(
      (_c) =>
        _c.permissionsFor(m).has("CONNECT") &&
        _c.permissionsFor(msg.member).has("CONNECT")
    );

    const c = channels[Math.floor(Math.random() * channels.length)];

    m.setVoiceChannel(c);
  });
