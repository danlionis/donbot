import * as botSettings from '../bot-settings.json';

export const BOT_TOKEN = (<any>botSettings).BOT_TOKEN;
export const BOT_CMD_PREFIX = (<any>botSettings).BOT_CMD_PREFIX;

export default {
  BOT_TOKEN,
  BOT_CMD_PREFIX
}