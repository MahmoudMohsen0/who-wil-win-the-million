import { useEffect } from "react";
import { MyDispatch } from "../lib/Types";

function PlayerLost({ dispatch }: { dispatch: MyDispatch }) {
    useEffect(() => {
        dispatch({
            type: "changeBackgroundAudioTo",
            audio: { bgSrc: "../src/sounds/loser-page.mp3" },
        });
    }, [dispatch]);

    return (
        <div className="player-lost">
            <h2>أنت خسرت يا Loser😁</h2>
            <button
                className="res-btn lose"
                onClick={() => dispatch({ type: "reset" })}
            >
                حاول مره تانية
            </button>
        </div>
    );
}

export default PlayerLost;
