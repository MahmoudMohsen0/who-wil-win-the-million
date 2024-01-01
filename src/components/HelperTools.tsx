import Button from "./Button";
import FiftyChance from "../../public/assets/50.svg?react";
import NoAudio from "../../public/assets/No_Audio.svg?react";
import Call from "../../public/assets/call.svg?react";
import People from "../../public/assets/People.svg?react";
import Audio from "../../public/assets/audio.svg?react";
import Withdraw from "../../public/assets/withdraw.svg?react";
import { HelperToolsProps, MyDispatch } from "../lib/Types";

const trigerAfterSeconds = (num: number, myDispatch: MyDispatch) => {
    setTimeout(() => {
        myDispatch({ type: "changeAudioAfterDelay" });
    }, num);
};

function HelperTools({
    withdraw,
    answeredQuestionsLength,
    askTheAudience,
    deleteTwoOptions,
    audio,
    callYourFriend,
    dispatch,
}: HelperToolsProps) {
    const handleReset = () => {
        dispatch({ type: "reset" });
    };
    const handleSound = () => {
        dispatch({
            type: "toggleOnOffSounds",
        });
    };
    const handleWithdraw = () => {
        const canWithdraw =
            answeredQuestionsLength % 5 === 0 && answeredQuestionsLength !== 0;
        if (canWithdraw) {
            dispatch({ type: "withdraw" });
        }
    };
    const handlePeople = () => {
        dispatch({ type: "askTheAudience", OpenTarget: true });
        trigerAfterSeconds(9000, dispatch);
    };
    const handleFiftyChance = () => {
        if (deleteTwoOptions.count === 0) {
            dispatch({ type: "deleteTwoOptions" });
            trigerAfterSeconds(2000, dispatch);
        }
    };
    const handleCall = () => {
        dispatch({
            type: "callYourFriend",
            OpenTarget: true,
            audio: {
                bgIsOn: false,
                effectIsOn: audio.appAudioIsOn,
                effectSrc: "sounds/phone-a-friend.mp3",
            },
        });
    };

    return (
        <section className="helper-tools">
            <div className="setting">
                <Button settingBtn={true} handleFunc={handleReset}>
                    <h2>Reset</h2>
                </Button>
                <Button settingBtn={true} handleFunc={handleSound}>
                    {audio.appAudioIsOn ? <Audio /> : <NoAudio />}
                </Button>
                <Button withdraw={withdraw} handleFunc={handleWithdraw}>
                    <Withdraw />
                </Button>
            </div>

            <div className="hints">
                <Button
                    handleFunc={handlePeople}
                    disabled={askTheAudience.hasAsked}
                >
                    <People />
                </Button>
                <Button
                    fifty={true}
                    handleFunc={handleFiftyChance}
                    disabled={deleteTwoOptions.hasDeleted}
                >
                    <FiftyChance />
                </Button>
                <Button
                    handleFunc={handleCall}
                    disabled={callYourFriend?.hasAsked}
                >
                    <Call />
                </Button>
            </div>
        </section>
    );
}

export default HelperTools;
