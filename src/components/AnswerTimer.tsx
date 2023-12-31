import { useEffect, useState } from "react";
import { MyDispatch, QuestionT } from "../lib/Types";

const defaultTime = 90; // Default Time In Seconds
const defaultInMillSeconds = 1000 * defaultTime;

function AnswerTimer({
    classAnimation,
    myClassesNames = "",
    syncWith,
    dispatch,
}: {
    classAnimation: string;
    myClassesNames?: string;
    syncWith: QuestionT;
    dispatch: MyDispatch;
}) {
    const [startAnimation, setStartAnimation] = useState("");
    const [time, setTime] = useState(defaultInMillSeconds);
    const minutes = new Date(time).getMinutes();
    const seconds = new Date(time).getSeconds();

    useEffect(() => {
        const initialTime = Date.now();
        const futureTime = initialTime + defaultInMillSeconds;
        setTime(futureTime - initialTime);

        const timeOutId = setInterval(() => {
            const timeNow = Date.now();
            const remaningTime = futureTime - timeNow + 1000;

            if (remaningTime <= 0) {
                clearInterval(timeOutId);
                dispatch({ type: "optionIsWrong" });
                return;
            }
            if (remaningTime <= 1000) {
                setStartAnimation(classAnimation);
            }

            setTime(remaningTime);
        }, 1000);

        return () => clearInterval(timeOutId);
    }, [classAnimation, syncWith, dispatch]);

    return (
        <h2
            className={`answers__time animation ${myClassesNames} ${startAnimation}`}
        >
            <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </h2>
    );
}

export default AnswerTimer;
