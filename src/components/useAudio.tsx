import { useEffect, useRef } from "react";

function useAudio(audioSrc: string, isPlaying: boolean) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audioSrc);
        }

        const audioRefSrc = audioRef.current?.src.toString();
        const regex = /\/[\w-]+.mp3/g;
        const matchedRef = audioRefSrc?.match(regex);
        const matchedSrc = audioSrc.match(regex);
        const matchedRefRes = matchedRef ? matchedRef[0] : "";
        const matchedSrcRes = matchedSrc ? matchedSrc[0] : "";

        if (audioRef.current && matchedRefRes !== matchedSrcRes) {
            audioRef.current.src = audioSrc;
            audioRef.current.load();
        }
        const setId = setTimeout(() => {
            if (audioRef.current && audioSrc && isPlaying) {
                audioRef.current.play().catch((error) => console.error(error));
            }

            if (audioRef.current && !isPlaying) {
                audioRef.current.pause();
            }
        }, 50);
        return () => clearTimeout(setId);
    }, [audioSrc, isPlaying]);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return [audioRef];
}

export default useAudio;
