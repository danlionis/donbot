import { Module } from "../../core/module";
import { Disconnect, ILoveRadio, Join, Pause, Unpause, Volume } from "./voice";
import YoutubeModule from "./youtube";

export const VoiceModule: Module = {
  name: "voice",
  commands: [Join, Disconnect, ILoveRadio, Volume, Pause, Unpause],
  submodules: [YoutubeModule],
};

export default VoiceModule;
