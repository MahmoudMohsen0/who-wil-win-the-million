import { useEffect, useRef } from "react";
import { AudioT } from "../lib/Types";

function EffectsAudioPlayer({ audio }: { audio: AudioT }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audio.effectsAudioSrc);
        }

        if (audio.effectsAudioIsOn && audio.effectsAudioSrc) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        //CleanUp the Audio when the component unmount
        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, [audio.effectsAudioIsOn, audio.effectsAudioSrc]);
    return <></>;
}

export default EffectsAudioPlayer;
