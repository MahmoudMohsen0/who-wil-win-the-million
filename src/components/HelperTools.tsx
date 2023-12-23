import Button from "./Button";
import FiftyChance from "../assets/50.svg?react";
import NoAudio from "../assets/No_Audio.svg?react";
import Call from "../assets/call.svg?react";
import People from "../assets/People.svg?react";
// import Audio from "../assets/audio.svg?react";
import Withdraw from "../assets/withdraw.svg?react";

type HelperToolsProps = {
    withdraw: boolean;
    answeredQuestionsLength: number;
    askTheAudience: { hasAsked: boolean; count: number };
    deleteTwoOptions: {
        hasDeleted: boolean;
        firstOption: null | number;
        secondOption: null | number;
        count: number;
    };
    dispatch: ({ type }: { type: string }) => void;
};
function HelperTools({
    withdraw,
    answeredQuestionsLength,
    askTheAudience,
    deleteTwoOptions,
    dispatch,
}: HelperToolsProps) {
    const handleSound = () => {};
    const handleWithdraw = () => {
        const canWithdraw =
            answeredQuestionsLength % 5 === 0 && answeredQuestionsLength !== 0;
        if (canWithdraw) {
            dispatch({ type: "withdraw" });
        }
    };
    const handlePeople = () => {
        dispatch({ type: "askTheAudience" });
    };
    const handleFiftyChance = () => {
        if (deleteTwoOptions.count === 0) {
            dispatch({ type: "deleteTwoOptions" });
        }
    };
    const handleCall = () => {};

    return (
        <section className="helper-tools">
            <Button sound={true} handleFunc={handleSound}>
                <NoAudio />
            </Button>
            <Button withdraw={withdraw} handleFunc={handleWithdraw}>
                <Withdraw />
            </Button>
            <Button
                handleFunc={handlePeople}
                disabled={askTheAudience.count > 1 || askTheAudience.hasAsked}
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
            <Button handleFunc={handleCall}>
                <Call />
            </Button>
        </section>
    );
}

export default HelperTools;
