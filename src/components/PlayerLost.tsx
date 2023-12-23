function PlayerLost({
    dispatch,
}: {
    dispatch: ({ type }: { type: string }) => void;
}) {
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
