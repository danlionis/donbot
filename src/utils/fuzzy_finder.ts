import * as Discord from "discord.js";
// import Fuse from "fuse.js";
import ls from "js-levenshtein";
import { Command } from "../parser";

export function find_voice_channel(
  channels: Discord.VoiceChannel[],
  query: string
): Discord.VoiceChannel | undefined {
  channels.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const channelNames = channels.map((c) => c.name);

  const distances: number[] = channelNames.map((c) => fuzzyScore(c, query));

  const minDistance = Math.min(...distances);

  const index = distances.indexOf(minDistance);

  return channels[index];
}

export function find_command(cmds: Command[], query: string): Command {
  const cmdNames = cmds.map((c) => c.config.name);

  const distances: number[] = cmdNames.map((c) => ls(c, query));

  const minDistance = Math.min(...distances);

  const index = distances.indexOf(minDistance);

  return cmds[index];
}

/**
 * Basic fuzzyScore algorithm
 * lower score means better match
 * best match: 0
 * worst match: Infinity
 */
function fuzzyScore(target: string, query: string): number {
  target = target.toLowerCase();
  query = query.toLowerCase();
  let it = 0;
  let iq = 0;
  let score = 0;

  let lastMatch = -1;
  let matchCount = 0;

  while (iq < query.length) {
    while (it < target.length) {
      if (query[iq] === target[it]) {
        lastMatch = it;
        matchCount += 1;
        break;
      }
      score += 1;
      it += 1;
    }
    iq += 1;
    it = lastMatch + 1;
  }

  score = score / (matchCount * target.length);

  return score;
}
