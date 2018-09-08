import { Message } from "discord.js";

export function selfDestructMessage(
  message: Message,
  timeInSeconds: number = 60
) {
  setTimeout(() => {
    message.delete();
  }, timeInSeconds * 1000);
}
