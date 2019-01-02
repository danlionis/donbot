import Bot from "../bot";

export interface Plugin {
  name: string;
  register(bot: Bot): Promise<boolean>;
}
