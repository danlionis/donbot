import { Clear, Poll, TimeMute } from './moderation';
import { Test } from './testing/test';
import { Help, Game, GiveAdmin, ChangePrefix } from './admin';
import { WatchTogether } from './other/watchtogether';
import { AltF4 } from './fun';
import { Join, Stop, Disconenct, Volume } from './music';

export {
  Test,
  Clear,
  Help,
  WatchTogether,
  ChangePrefix
}

export let defaultCommands = [
  Clear,
  Test,
  WatchTogether,
  ChangePrefix,
  AltF4,
  Join,
  Stop,
  Disconenct,
  Game,
  GiveAdmin,
  Poll,
  Volume,
  TimeMute
]

export let musicCommands = [
  Join,
  Stop,
  Disconenct,
  Volume
]