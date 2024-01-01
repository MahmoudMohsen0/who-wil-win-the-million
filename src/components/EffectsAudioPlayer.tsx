import { AudioT } from "../lib/Types";
import useAudio from "./useAudio";

function EffectsAudioPlayer({ audio }: { audio: AudioT }) {
    useAudio(audio.effectsAudioSrc, audio.effectsAudioIsOn);
    return <></>;
}
export default EffectsAudioPlayer;
