import * as Discord from "discord.js";
import { Module } from "../../core/module";
import { Arg, Command, CommandResult } from "../../parser";
import { Duration } from "../../utils/duration";

const VoteMute = new Command({
  name: "mute",
  about: "Vote to mute a member",
})
  .arg(
    new Arg({
      name: "TARGET",
      type: "member",
      positional: true,
      required: true,
      help: "Member you want to mute",
    })
  )
  .arg(
    new Arg({
      name: "TTL",
      short: "t",
      long: "time",
      default: 5,
      takes_value: true,
      help: "How long the vote should last (in minutes)s",
      type: "number",
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const target: Discord.GuildMember = matches.value_of("TARGET");
    const ttl: number = matches.value_of("TTL");
    const votes = new Map<string, string>();

    if (!target.voiceChannel) {
      msg.reply("Target is not connected to a voice channel", { code: true });
      return CommandResult.Failed;
    }

    const required = Math.ceil(target.voiceChannel.members.array().length / 2);

    const embed = new Discord.RichEmbed()
      .setAuthor(msg.member.user.tag)
      .addField("Target", target)
      .addField("Time (m)", ttl)
      .addField("Required", required)
      .setTitle("VoteMute started");

    const sent = await msg.channel.send(embed);

    let count = 0;
    const voted = new Set<string>();

    if (sent instanceof Discord.Message) {
      await sent.react("🔇");
      const collector = sent.createReactionCollector(() => true, {
        time: Duration.MINUTE * ttl,
      });
      collector.on("collect", (reaction) => {
        // only accept the bots reaction
        if (reaction.count !== 1) {
          count++;
        }
        if (count >= required) {
          collector.stop();
        }
      });
      collector.on("end", () => {
        if (count >= required) {
          target.setMute(true);
        }
      });
    }
  });

const VoteElect = new Command({
  name: "elect",
  about: "start an election",
})
  .arg(
    new Arg({
      name: "TTL",
      short: "t",
      long: "time",
      default: 5,
      takes_value: true,
      help: "How long the vote should last (in minutes)s",
      type: "number",
    })
  )
  .arg(
    new Arg({
      name: "CHOICES",
      positional: true,
      required: true,
      take_multiple: true,
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const choices: string[] = matches.value_of("CHOICES");
    const ttl: number = matches.value_of("TTL");
    const votes: Map<string, number> = new Map();

    let res = "Election started: \n\n";

    choices.forEach((c, i) => {
      votes.set((i + 1).toString(), 0);
      res += `${i + 1}: ${c}\n`;
    });

    res += "\nType the number of your choice in this chat";

    msg.channel.send(res, { code: true });

    const voted = new Set<string>();

    const collector = msg.channel.createMessageCollector(
      (m: Discord.Message) => {
        // dont filter creator (for stopping the vote)
        // allow only members that havent voted yet
        return m.member.id === msg.member.id || !voted.has(m.member.id);
      },
      { time: Duration.MINUTE * ttl }
    );

    collector.on("collect", (m) => {
      if (m.member.id === msg.member.id && m.content === "stop") {
        collector.stop();
        return;
      }

      if (!votes.has(m.content)) {
        return;
      }

      if (voted.has(m.member.id)) {
        return;
      }

      votes.set(m.content, votes.get(m.content) + 1);
      voted.add(m.member.id);
    });

    collector.on("end", () => {
      let result = "";
      votes.forEach((v, k) => {
        const i = Number.parseInt(k, 10) - 1;
        result += `${choices[i]}: ${v}\n`;
      });

      msg.channel.send(result, { code: true });
    });
  });

// const Votedeaf = new Command({
//   name: "deaf",
//   about: "Vote to deaf a member"
// })
//   .arg(
//     new Arg({
//       name: "TARGET",
//       type: "member",
//       positional: true,
//       required: true,
//       help: "Member you want to mute"
//     })
//   )
//   .handler(async (bot, msg, matches) => {
//     const target: Discord.GuildMember = matches.value_of("TARGET");
//     if (!can_modify(bot, msg.member, target)) {
//       return CommandResult.PermissionDenied;
//     }

//     const sent = await msg.channel.send(`Mute member ${target.toString()}?`);

//     if (!(sent instanceof Discord.Message)) return;

//     sent.react("👍");
//     sent.react("👎");
//   });

// interface VotemuteData {
//   votes: string[];
//   target: Discord.GuildMember;
//   required_votes: number;
// }

// const Votemute = new Command({
//   name: "mute",
//   about: "Vote to mute a member"
// })
//   .handler(async (bot, msg, matches, ctx: CommandContext<VotemuteData>) => {
//     // check if vote already in progresss

//     if (!ctx.data) {
//       msg.channel.send("No vote in progress!");
//       return CommandResult.Failed;
//     }

//     // if member has already voted
//     if (ctx.data.votes.indexOf(msg.member.id) >= 0) {
//       return CommandResult.Success;
//     }

//     ctx.data.votes.push(msg.member.id);

//     if (ctx.data.votes.length >= ctx.data.required_votes) {
//       msg.channel.send("muting member " + ctx.data.target.displayName);
//       ctx.data.target.setMute(true);
//       ctx.reset();
//     } else {
//       msg.channel.send(
//         `Votes ${ctx.data.votes.length}/${ctx.data.required_votes}`
//       );
//     }
//   })
//   .subcommand(
//     new Command({
//       name: "clear",
//       about: "Clears a running votemute",
//       permissions: ["MUTE_MEMBERS"]
//     }).handler(async (bot, msg, matches, ctx) => {
//       Votemute.context.reset();
//     })
//   )
//   .subcommand(
//     new Command({ name: "new", about: "Create a new votemute" })
//       .arg(
//         new Arg({
//           name: "TARGET",
//           positional: true,
//           help: "Mention user you want to mute",
//           type: "member",
//           required: true
//         })
//       )
//       .arg(
//         new Arg({
//           name: "TIME",
//           short: "t",
//           long: "time",
//           help: "Runtime of the vote (in seconds)",
//           default: 120,
//           takes_value: true
//         })
//       )
//       .arg(
//         new Arg({
//           name: "REQUIRED",
//           short: "r",
//           long: "required",
//           takes_value: true,
//           help: "Required votes to be sucessful"
//         })
//       )
//       .handler(async (bot, msg, matches, ctx: CommandContext<VotemuteData>) => {
//         const target = matches.value_of("TARGET") as Discord.GuildMember;

//         if (!target) {
//           msg.reply("Target not found", { code: true });
//           return CommandResult.Failed;
//         }

//         if (!target.voiceChannel) {
//           msg.reply("Target not connected to a voice channel", { code: true });
//           return CommandResult.Failed;
//         }

//         const time = parseInt(matches.value_of("TIME"), 10);

//         if (Votemute.context.data) {
//           msg.reply("There is a vote already in progress");
//           return CommandResult.Failed;
//         }

//         let required_votes = parseInt(matches.value_of("REQUIRED"), 10) || 5;

//         if (msg.member.voiceChannel) {
//           required_votes =
//             Math.floor(msg.member.voiceChannel.members.array().length / 2) + 1;
//         }

//         // set parent command context, because this subcommand has its own context
//         Votemute.context.data = ctx.data = {
//           target,
//           votes: [msg.member.id],
//           required_votes
//         };

//         // send message if vote was unsuccessful
//         Votemute.context.expire_in(time, (c: VotemuteData) => {
//           msg.channel.send(
//             `Votemute unsuccessful, missing ${c.required_votes -
//               c.votes.length}`
//           );
//         });

//         msg.channel.send(
//           `Starting votemute against member: ${ctx.data.target.displayName} (${
//             ctx.data.required_votes
//           } votes required)`
//         );
//       })
//   );

const Vote = new Command({
  name: "vote",
  about: "Start a vote",
})
  .subcommand(VoteElect)
  .subcommand(VoteMute);

export const VoteModule: Module = {
  name: "vote",
  commands: [Vote],
};

export default VoteModule;
