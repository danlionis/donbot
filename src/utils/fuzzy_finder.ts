import * as Discord from "discord.js";
import * as Fuse from "fuse.js";

export function find_voice_channel(
  channels: Discord.VoiceChannel[],
  query: string
): Discord.VoiceChannel | undefined {
  const options: Fuse.FuseOptions<Discord.VoiceChannel> = {
    keys: ["name"],
    tokenize: true,
    matchAllTokens: true
  };
  const fuse = new Fuse(channels, options);

  // splitting and joining required for the finder to work, increases correct match rate drastically
  const res = fuse.search(query.split("").join(" "));

  return res ? res[0] : undefined;
}
