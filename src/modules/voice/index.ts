import { Module } from "../../core/module";
import { Disconnect, ILoveRadio, Join, Volume } from "./voice";

export const VoiceModule: Module = {
  name: "voice",
  commands: [Join, Disconnect, ILoveRadio, Volume]
};

export default VoiceModule;
