import { AudioT } from "../lib/Types";
import useAudio from "./useAudio";

function BackgroundAudioPlayer({ audio }: { audio: AudioT }) {
    useAudio(audio.backgroundAudioSrc, audio.backgroundAudioIsOn);
    return <></>;
}
export default BackgroundAudioPlayer;
