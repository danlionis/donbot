import { Help } from './help';
import { Random, Choice } from './general';
import { ChangePrefix, Playing, Servers, GiveAdmin } from './admin';
import { Mute, Deaf, Clear, Poll, Ban, SoftBan } from './moderation';
import { Join, Pause, Stop, Disconenct, Resume, Volume } from './music';
import { Test, TrollMove } from './test';
import { AltF4 } from './fun';

export {
  Help
}

export let defaultCommands = [
  Ban,
  SoftBan,
  Clear,
  Test,
  ChangePrefix,
  AltF4,
  Disconenct,
  Playing,
  Poll,
  Mute,
  Deaf,
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