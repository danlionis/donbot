import { ChangePrefix, Playing, Servers, Shutdown } from "./admin";
import { Arg } from "./args";
import { ClearDb, GetDb, ReloadDb, SetDb } from "./database";
import { AltF4, TextToSpeech, TrollMove } from "./fun";
import { Choice, Random } from "./general";
import { Help, Status } from "./help";
import {
  Ban,
  Clear,
  Deaf,
  MoveHere,
  MoveTo,
  Mute,
  Poll,
  SoftBan
} from "./moderation";
import {
  Disconenct,
  Join,
  Pause,
  Resume,
  Stop,
  Volume,
  Youtube
} from "./music";
import { Ping, Test } from "./test";

export { Help };

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
  MoveHere,
  MoveTo,
  Deaf,
  Random,
  Choice,
  TrollMove,
  Servers,
  Youtube,
  Status,
  TextToSpeech,
  Ping,
  Shutdown
];

export let databaseCommands = [GetDb, SetDb, ClearDb, ReloadDb];

export let musicCommands = [Join, Stop, Disconenct, Volume, Pause, Resume];
