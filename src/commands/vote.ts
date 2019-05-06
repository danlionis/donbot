import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";
import { CommandContext } from "../parser/context";
import { can_modify } from "../validator/permission";

interface VotemuteData {
  votes: string[];
  target: Discord.GuildMember;
  required_votes: number;
}

const Votemute = new Command({
  name: "mute",
  about: "Vote to mute a member"
})
  .handler(async (bot, msg, matches, ctx: CommandContext<VotemuteData>) => {
    // check if vote already in progresss

    if (!ctx.data) {
      msg.channel.send("No vote in progress!");
      return CommandResult.Failed;
    }

    // if member has already voted
    if (ctx.data.votes.indexOf(msg.member.id) >= 0) {
      return CommandResult.Success;
    }

    ctx.data.votes.push(msg.member.id);

    if (ctx.data.votes.length >= ctx.data.required_votes) {
      msg.channel.send("muting member " + ctx.data.target.displayName);
      ctx.data.target.setMute(true);
      ctx.reset();
    } else {
      msg.channel.send(
        `Votes ${ctx.data.votes.length}/${ctx.data.required_votes}`
      );
    }
  })
  .subcommand(
    new Command({
      name: "clear",
      about: "Clears a running votemute",
      permissions: ["MUTE_MEMBERS"]
    }).handler(async (bot, msg, matches, ctx) => {
      Votemute.context.reset();
    })
  )
  .subcommand(
    new Command({ name: "new", about: "Create a new votemute" })
      .arg(
        new Arg({
          name: "TARGET",
          positional: true,
          can_mention: true,
          help: "Mention user you want to mute",
          required: true
        })
      )
      .arg(
        new Arg({
          name: "TIME",
          short: "t",
          long: "time",
          help: "Runtime of the vote (in seconds)",
          default: 120,
          takes_value: true
        })
      )
      .arg(
        new Arg({
          name: "REQUIRED",
          short: "r",
          long: "required",
          takes_value: true,
          help: "Required votes to be sucessful"
        })
      )
      .handler(async (bot, msg, matches, ctx: CommandContext<VotemuteData>) => {
        const target = matches.value_of("TARGET");
        const time = parseInt(matches.value_of("TIME"), 10);

        if (Votemute.context.data) {
          msg.reply("There is a vote already in progress");
          return CommandResult.Failed;
        }

        if (!can_modify(bot, msg.member, target)) {
          return CommandResult.PermissionDenied;
        }
        let required_votes = parseInt(matches.value_of("REQUIRED"), 10);

        if (msg.member.voiceChannel) {
          required_votes =
            Math.floor(msg.member.voiceChannel.members.array().length / 2) + 1;
        }

        // set parent command context, because this subcommand has its own context
        Votemute.context.data = ctx.data = {
          target,
          votes: [msg.member.id],
          required_votes
        };

        // send message if vote was unsuccessful
        Votemute.context.expire_in(time, (c: VotemuteData) => {
          msg.channel.send(
            `Votemute unsuccessful, missing ${c.required_votes -
              c.votes.length}`
          );
        });

        msg.channel.send(
          `Starting votemute against member: ${ctx.data.target.displayName} (${
            ctx.data.required_votes
          } votes required)`
        );
      })
  );

export let Vote = new Command({
  name: "vote",
  about: "Start a vote"
}).subcommand(Votemute);
