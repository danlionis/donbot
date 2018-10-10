import { Message, VoiceConnection } from "discord.js";
import { Bot } from "../bot";
import { ParsedMessage } from "./parser";

const langKey = "tts.lang";
const volumeKey = "tts.volume";

export async function textToSpeech(
  bot: Bot,
  message: Message,
  parsedMessage: ParsedMessage,
  text: string
) {
  let tts;
  const guildLangKey = message.guild.id + "." + langKey;

  // dynamic import 'google-tts-api'
  try {
    tts = await import("google-tts-api");
  } catch (error) {
    console.log("This command requires a peer dependency of 'google-tts-api'!");
    return message.reply(
      "There was an error executing this command. Please look at the log for more information"
    );
  }

  if (!text) {
    return message.channel.send("Please provide a message");
  }
  const locale: string = bot.database.get(guildLangKey, { defaultValue: "en" });

  text.trim().substr(0, 200);

  const url = await tts(text, locale, 1);

  console.log(url);

  const vc: VoiceConnection = await bot.registry.executeCommand(
    "join",
    bot,
    message,
    parsedMessage
  );

  if (vc) {
    try {
      const dispatcher = vc.playArbitraryInput(url, {
        volume: bot.database.get(volumeKey, { guildId: message.guild.id })
      });
      dispatcher.on("end", (_) => {
        vc.disconnect();
      });
    } catch (error) {
      console.log(error);
    }
  }
}
