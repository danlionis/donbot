import { Guild, TextChannel } from "discord.js";
import * as rl from "readline";
import { Bot } from "../bot";

export class Cli {
  private i: rl.ReadLine;
  private currentGuild: Guild = null;
  private currentTextChannel: TextChannel = null;

  constructor(private bot: Bot) {
    this.currentGuild = bot.guilds.first();
    const tc = this.currentGuild.channels
      .array()
      .filter((c) => c.type === "text") as TextChannel[];
    this.currentTextChannel = tc[0];

    this.i = rl.createInterface(process.stdin, process.stdout, null);

    this.refreshPrompt();
    this.i.prompt();

    this.i.on("line", (cmd) => {
      this.command(cmd);
    });

    this.i.on("resume", () => {
      console.log("\n");
      this.i.prompt();
    });
  }

  private get getAllTextChannels(): TextChannel[] {
    return this.currentGuild.channels
      .array()
      .filter((c) => c.type === "text") as TextChannel[];
  }

  private refreshPrompt() {
    this.i.setPrompt(
      `${this.currentGuild.name}@${this.currentTextChannel.name} $ `
    );
  }

  private command(cmd: string) {
    const parts = cmd.split(" ");
    const start = parts.shift();
    switch (start) {
      case "s":
        this.serverHandler(parts);
        break;
      case "tc":
        this.textChannelHandler(parts);
        break;
      case "send":
        this.sendMessage(parts);
        break;
      // case "chat":
      //   this.startChat();
      //   break;
      default:
        console.error("Cannot find command");
    }
    this.i.prompt();
  }

  private startChat() {
    this.i.pause();

    const chatInterface = rl.createInterface(
      process.stdin,
      process.stdout,
      null,
      true
    );

    chatInterface.setPrompt("");

    this.bot.on("message", (msg) => {
      if (msg.member.user.id === this.bot.user.id) {
        return;
      }
      if (msg.channel === this.currentTextChannel) {
        console.log(`[${msg.member.displayName}]: ${msg.content}`);
      }
    });

    chatInterface.on("line", (msg) => {
      if (msg === ":q") {
        chatInterface.close();
        this.i.resume();
      } else if (msg) {
        this.currentTextChannel.send(msg);
      }
    });
  }

  private sendMessage(parts: string[]) {
    const msg = parts.join(" ");
    this.currentTextChannel.send(msg);
  }

  private serverHandler(parts: string[]) {
    switch (parts[0]) {
      case undefined:
        this.showCurrentServer();
        break;
      case "all":
        this.showAllServers();
    }
  }

  private textChannelHandler(parts: string[]) {
    const start = parts.shift();
    switch (start) {
      case undefined:
        this.showCurrentTextChannel();
        break;
      case "all":
        this.showAllTextChannels();
        break;
      case "switch":
        this.switchCurrentTextChannel(parts[0]);
        break;
    }
  }

  private switchCurrentTextChannel(tc: string) {
    console.log("switch");
    const index = Number.parseInt(tc);
    const textChannel = this.getAllTextChannels[index];

    if (textChannel) {
      this.currentTextChannel = textChannel;
      this.refreshPrompt();
    } else {
      console.warn("TextChannel does not exist");
    }
  }

  private showCurrentTextChannel() {
    console.log(this.currentTextChannel.name);
  }

  private showAllTextChannels() {
    console.table(
      this.currentGuild.channels
        .filter((c) => c.type === "text")
        .map((c) => c.name)
    );
  }

  private showCurrentServer() {
    if (this.currentGuild) {
      console.log(this.currentGuild.name);
    } else {
      console.log("no server available");
    }
  }

  private showAllServers() {
    console.log("All Servers");
    console.table(this.bot.guilds.map((g) => g.name));
  }
}
