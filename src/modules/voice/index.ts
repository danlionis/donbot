import { Module } from "../../core/module";
import { Disconnect, ILoveRadio, Join, Pause, Unpause, Volume } from "./voice";

export const VoiceModule: Module = {
  name: "voice",
  commands: [Join, Disconnect, ILoveRadio, Volume, Pause, Unpause]
};

export default VoiceModule;
