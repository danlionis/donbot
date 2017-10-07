import * as botSettings from '../bot-settings.json';

export const BOT_LOGIN_TOKEN = (<any>botSettings).BOT_LOGIN_TOKEN;
export const BOT_CMD_PREFIX = (<any>botSettings).BOT_CMD_PREFIX;

export default {
  BOT_LOGIN_TOKEN,
  BOT_CMD_PREFIX
}