import { useEffect, useState } from "react";

function Timer({
    time,
    setTime,
}: {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
}) {
    const [circleOneStyles, setCircleOneStyles] = useState({});
    const [circleTwoStyles, setCircleTwoStyles] = useState({});
    const [circleThreeStyles, setCircleThreeStyles] = useState({});

    useEffect(() => {
        const seconds = 1000 * 30; // change the time here
        const initialTime = Date.now();
        const futureTime = initialTime + seconds;
        const fiveSeconds = 5000;

        const intervalId = setInterval(() => {
            const timeNow = Date.now();
            const remainingTime = futureTime - timeNow;
            const angle = Math.floor((remainingTime / seconds) * 360);

            const remainInSeconds = Math.ceil(remainingTime / 1000);
            const remainSeconds = remainInSeconds > 0 ? remainInSeconds : 0;
            setTime(remainSeconds);

            if (remainingTime <= 0) {
                setCircleOneStyles({ display: "none" });
                setCircleTwoStyles({ display: "none" });
                setCircleThreeStyles({ display: "none" });
                clearInterval(intervalId);
                return;
            }

            setCircleOneStyles({ transform: `rotate(${angle}deg)` });
            if (remainingTime <= fiveSeconds) {
                setCircleOneStyles({
                    transform: `rotate(${angle}deg)`,
                    backgroundColor: "red",
                });
            }

            if (angle >= 180) {
                setCircleThreeStyles({ display: "none" });
            }

            if (angle < 180) {
                setCircleTwoStyles({ transform: `rotate(${angle}deg)` });
                setCircleThreeStyles({ display: "block" });
            }
        }, 0);

        return () => {
            clearInterval(intervalId);
        };
    }, [setTime]);

    return (
        <div id="timer">
            <div className="semiCircle" style={circleTwoStyles}></div>
            <div className="semiCircle" style={circleOneStyles}></div>
            <div className="semiCircle" style={circleThreeStyles}></div>
            <div className="outerCircle">
                {time < 10 ? `0${time}` : time} : 00
            </div>
        </div>
    );
}

export default Timer;
