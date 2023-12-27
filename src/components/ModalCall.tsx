import Progress from "./Progress";
import KeyDownBtn from "./KeyDownBtn";
import Timer from "./Timer";
import { useState, useEffect, useCallback } from "react";
import { AudioT, MyDispatch, QuestionT } from "../lib/Types";

type ModalCallProps = {
    callYourFriend: { hasAsked: boolean; isOpen: boolean };
    currentQuestion: QuestionT;
    audio: AudioT;
    dispatch: MyDispatch;
};

function ModalCall({
    callYourFriend,
    currentQuestion,
    audio,
    dispatch,
}: ModalCallProps) {
    const [keysPressed, setKeysPressed] = useState<{
        ArrowRight: boolean;
        ArrowLeft: boolean;
    }>({
        ArrowRight: false,
        ArrowLeft: false,
    });
    const [countKeyRightAndLeftPressed, setCountKeyRightAndLeftPressed] =
        useState(0);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [bothClicked, setBothClicked] = useState(false);
    const [innerWidth, setInnerWidth] = useState<number | null>(null);
    const [time, setTime] = useState(5);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                if (!keysPressed[event.key]) {
                    setKeysPressed((prevState) => ({
                        ...prevState,
                        [event.key]: true,
                    }));

                    // Set a timeout to clear the keysPressed state after 5 milliseconds
                    setTimeoutId(setTimeout(() => clearKeysPressed(), 25));
                }
            }
        },
        [keysPressed]
    );

    const handleKeyUp = useCallback(() => {
        // Clear the timeout if a key is released before the 5 milliseconds elapse
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        clearKeysPressed();
    }, [timeoutId]);

    const clearKeysPressed = () => {
        setKeysPressed({ ArrowRight: false, ArrowLeft: false });
        setBothClicked(false);
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown as EventListener);
        document.addEventListener("keyup", handleKeyUp as EventListener);

        // Remove the event listeners when the component unmounts
        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown as EventListener
            );
            document.removeEventListener("keyup", handleKeyUp as EventListener);
        };
    }, [handleKeyDown, handleKeyUp]); // Include handleKeyDown and handleKeyUp in the dependency array

    useEffect(() => {
        // Check if both ArrowRight and ArrowLeft are pressed
        if (keysPressed.ArrowRight && keysPressed.ArrowLeft) {
            setCountKeyRightAndLeftPressed((prev) => prev + 1);
            setBothClicked(true);
        }
    }, [keysPressed]);

    useEffect(() => setInnerWidth(window.innerWidth), []);

    const isOpen = callYourFriend.isOpen ? "open friend" : "";
    const isViewOnSmallScreen =
        innerWidth && innerWidth > 1000
            ? "اضغظ علي زرار اليمين و اليسار في نفس الوقت علي الكيبورد"
            : "اضغظ علي زرار اليمين و اليسار في نفس الوقت";

    const miniGameFinished = time <= 0;
    const playerReachTheTarget = countKeyRightAndLeftPressed >= 10; // if player press 50 times friend voice will be on
    const playerWin = !miniGameFinished && playerReachTheTarget;
    const playerLost = miniGameFinished && !playerReachTheTarget;

    useEffect(() => {
        if (playerWin) {
            dispatch({
                type: "callYourFriend",
                audio: {
                    bgIsOn: false,
                    effectIsOn: audio.backgroundAudioIsOn,
                    effectSrc: `../src/sounds/answer-${
                        currentQuestion.correct + 1
                    }.mp3`,
                },
            }),
                setTimeout(
                    () =>
                        dispatch({
                            type: "callYourFriend",
                            audio: {
                                bgIsOn: audio.backgroundAudioIsOn,
                                effectIsOn: false,
                            },
                        }),
                    15000
                );
        }
        if (playerLost) {
            dispatch({
                type: "changeAudioAfterDelay",
                // audio: { bgIsOn: audio.backgroundAudioIsOn },
            });
            setTimeout(
                () =>
                    dispatch({
                        type: "callYourFriend",
                        audio: {
                            bgIsOn: audio.backgroundAudioIsOn,
                            effectIsOn: false,
                        },
                    }),
                1200
            );
        }
    }, [playerWin, playerLost, currentQuestion, audio, dispatch]);

    const playerWinClass = playerWin ? "close success" : "";
    const playerLostClass = playerLost ? "close danger" : "";

    console.log(time);

    return (
        <div className="ModalCall ">
            <div
                className={`modal ${isOpen} ${playerWinClass} ${playerLostClass}`}
            >
                <div
                    className={`modal__content ${isOpen} modal-call ${playerWinClass} ${playerLostClass}`}
                >
                    {!miniGameFinished && !playerReachTheTarget && (
                        <>
                            <Timer time={time} setTime={setTime} />
                            <Progress
                                correctQsLength={countKeyRightAndLeftPressed}
                                max={50}
                            />
                            <h2>{isViewOnSmallScreen}</h2>
                            <div className="btns">
                                <KeyDownBtn
                                    name="زرار اليمين"
                                    isDown={
                                        bothClicked
                                            ? true
                                            : keysPressed.ArrowRight
                                    }
                                />
                                <KeyDownBtn
                                    name="زرار اليسار"
                                    isDown={
                                        bothClicked
                                            ? true
                                            : keysPressed.ArrowLeft
                                    }
                                />
                            </div>
                        </>
                    )}
                    {miniGameFinished &&
                        playerReachTheTarget &&
                        !audio.effectsAudioIsOn && (
                            <h3>الإجابة هي {currentQuestion.correct + 1}</h3>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ModalCall;
