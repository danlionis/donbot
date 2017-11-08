import { TextCommand } from './text-command';
import { ChatFilterConfig } from '../types';
import { Bot } from '../bot';
import * as Discord from 'discord.js';

export class ChatFilter {

  private _filter: string;
  private _description: string;
  private _aliases: Array<string>;

  constructor({ filter, description, aliases }: ChatFilterConfig) {
    this._filter = filter;
    this._description = description;
    aliases.unshift(filter);
    this._aliases = aliases;
  }

  public get filter(): string {
    return this._filter;
  }
  public get description(): string {
    return this._description;
  }
  public get aliases(): Array<string> {
    return this._aliases;
  }

  public async run(bot: Bot, message: Discord.Message) {

  };

}