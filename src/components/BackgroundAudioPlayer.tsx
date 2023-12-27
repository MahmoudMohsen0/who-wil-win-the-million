import { useEffect, useRef } from "react";
import { AudioT } from "../lib/Types";

function BackgroundAudioPlayer({ audio }: { audio: AudioT }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audio.backgroundAudioSrc);
        }

        if (audio.backgroundAudioIsOn && audio.backgroundAudioSrc) {
            audioRef.current.play();
            audioRef.current.loop = true;
        } else {
            audioRef.current.pause();
        }
        //CleanUp the Audio when the component unmount
        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, [audio.backgroundAudioIsOn, audio.backgroundAudioSrc]);
    return <></>;
}

export default BackgroundAudioPlayer;
