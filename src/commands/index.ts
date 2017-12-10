import { Help } from './help';
import { Random, Choice } from './general';
import { ChangePrefix, Playing, Servers, GiveAdmin } from './admin';
import { TimeMute, TimeDeaf, Clear, Poll, Ban, SoftBan, BanTest } from './moderation';
import { Join, Pause, Stop, Disconenct, Resume, Volume } from './music';
import { Test, TrollMove } from './test';
// import { WatchTogether } from './other/watchtogether';
import { AltF4 } from './fun';

export {
  Test,
  Clear,
  Help,
  // WatchTogether,
  ChangePrefix
}

export let defaultCommands = [
  Ban,
  BanTest,
  SoftBan,
  Clear,
  Test,
  // WatchTogether,
  ChangePrefix,
  AltF4,
  Join,
  Stop,
  Disconenct,
  Playing,
  // GiveAdmin,
  Poll,
  Volume,
  TimeMute,
  TimeDeaf,
  Random,
  Choice,
  TrollMove,
  Servers,
  GiveAdmin
]

export let musicCommands = [
  Join,
  Stop,
  Disconenct,
  Volume,
  Pause,
  Resume
]