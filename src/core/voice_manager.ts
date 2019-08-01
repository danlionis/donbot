import * as Discord from "discord.js";
import { Duration } from "../utils/duration";
import { Bot } from "./bot";

export class VoiceManager {
  private bot: Bot;

  private timeouts: Discord.Collection<
    string,
    NodeJS.Timeout
  > = new Discord.Collection();

  constructor(bot: Bot) {
    this.bot = bot;
    bot.on("voiceStateUpdate", this.onVoiceStateUpdate.bind(this));
  }

  public check() {
    this.bot.voiceConnections.forEach((v) => {
      // disconnect if every other person in the channel is deafed
      const othersDeaf = v.channel.members
        .filter((m) => !m.user.bot)
        .every((m) => m.deaf);

      if (v.channel.members.array().length === 1 || othersDeaf) {
        this.startTimeout(v);
      } else {
        if (v.dispatcher && !v.dispatcher.paused) {
          this.clearTimeout(v.channel.guild);
        }
      }
    });
  }

  public startTimeout(v: Discord.VoiceConnection) {
    if (!this.timeouts.has(v.channel.guild.id)) {
      console.log("starting timeout");
      const t = this.bot.setTimeout(() => {
        v.disconnect();
      }, 30 * Duration.SECOND);
      this.timeouts.set(v.channel.guild.id, t);
    }
  }

  public clearTimeout(g: Discord.Guild) {
    if (this.timeouts.has(g.id)) {
      console.log("clear timeout");
      this.bot.clearTimeout(this.timeouts.get(g.id));
      this.timeouts.delete(g.id);
    }
  }

  private onVoiceStateUpdate(
    oldMember: Discord.GuildMember,
    newMember: Discord.GuildMember
  ) {
    this.check();
  }
}
