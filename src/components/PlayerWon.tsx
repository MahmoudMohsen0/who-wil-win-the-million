import { useEffect } from "react";
import confetti from "canvas-confetti";
import { MyDispatch } from "../lib/Types";

function PlayerWon({
    prizeValue,
    dispatch,
}: {
    prizeValue: string;
    dispatch: MyDispatch;
}) {
    useEffect(() => {
        dispatch({
            type: "changeBackgroundAudioTo",
            audio: { bgSrc: "sounds/winner-page.mp3" },
        });
        const duration = 1 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            // launch a few confetti from the left edge
            confetti({
                particleCount: 7,
                angle: 90,
                spread: 100,
                origin: { x: 0 },
            });
            // and launch a few from the right edge
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            });
            // launch a few confetti random
            confetti({
                particleCount: 40,
                startVelocity: 30,
                spread: 360,
                origin: {
                    x: Math.random(),
                    // since they fall down, start a bit higher than random
                    y: Math.random() - 0.2,
                },
            });

            // keep going until we are out of time
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        // Trigger confetti effect when the component mounts
        frame();

        // Optionally, clean up the confetti after a certain time
        const timeoutId = setTimeout(() => {
            confetti.reset();
        }, duration + 5000); // Add some extra time for confetti to settle

        // Clean up the timeout on component unmount
        return () => clearTimeout(timeoutId);
    }, [dispatch]);

    return (
        <div className="player-won">
            <h2> مبروك أنت كسبت {prizeValue}$</h2>
            <button
                className="res-btn win"
                onClick={() => dispatch({ type: "reset" })}
            >
                العب مره تانية
            </button>
        </div>
    );
}

export default PlayerWon;
