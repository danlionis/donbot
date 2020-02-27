import * as Discord from "discord.js";
// import Fuse from "fuse.js";
import { Command } from "../parser";

export function find_voice_channel(
  channels: Discord.VoiceChannel[],
  query: string
): Discord.VoiceChannel | undefined {
  // TODO: find better fuzzy search library

  return channels[0];

  // const options: Fuse.FuseOptions<Discord.VoiceChannel> = {
  //   keys: ["name"]
  //   // tokenize: true,
  //   // matchAllTokens: true,
  // };
  // const fuse = new Fuse(channels, options);

  // // splitting and joining required for the finder to work, increases correct match rate drastically
  // const res: Discord.VoiceChannel[] = fuse.search(query.split("").join(" "));

  // return res ? res[0] : undefined;
}

export function find_command(cmds: Command[], query: string): Command {
  return cmds[0];

  // const options: Fuse.FuseOptions<Command> = {
  //   keys: ["full_cmd_name"],
  //   tokenize: true,
  //   matchAllTokens: true
  // };

  // const fuse = new Fuse(cmds, options);

  // const res: Command[] = fuse.search(query.split("").join(" "));
  // return res ? res[0] : undefined;
}
