import { ChangePrefix, Playing, Servers } from "./admin";
import { Arg } from "./args";
import { AltF4, TrollMove } from "./fun";
import { Choice, Random } from "./general";
import { Help } from "./help";
import { Ban, Clear, Deaf, Mute, Poll, SoftBan } from "./moderation";
import { Disconenct, Join, Pause, Resume, Stop, Volume, Youtube } from "./music";
import { Test } from "./test";

export {
  Help,
};

export let defaultCommands = [
  Arg,
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
  Youtube,
];

export let musicCommands = [
  Join,
  Stop,
  Disconenct,
  Volume,
  Pause,
  Resume,
];
