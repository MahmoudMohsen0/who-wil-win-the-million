import { useReducer } from "react";
import Header from "./components/Header";
import HelperTools from "./components/HelperTools";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Prizes from "./components/Prizes";
import Question from "./components/Question";
import Answers from "./components/Answers";
import { prizes, questions as questionData } from "./db/data";
import { InitialState, Action, QuestionT } from "./lib/Types";
import Progress from "./components/Progress";
import PlayerWon from "./components/PlayerWon";
import PlayerLost from "./components/PlayerLost";
import Modal from "./components/Modal";
import { getRandomNum } from "./components/Modal";
import ModalCall from "./components/ModalCall";
import BackgroundAudioPlayer from "./components/BackgroundAudioPlayer";
import EffectsAudioPlayer from "./components/EffectsAudioPlayer";

////<reference types="vite-plugin-svgr/client" />;

const initState: InitialState = {
    answeredQuestions: [],
    nextQuestions: questionData,
    currentQuestion: questionData[0],
    optionClicked: "",
    didUserWin: false,
    gameFinished: false,
    withdraw: false,
    askTheAudience: { hasAsked: false, count: 0 },
    deleteTwoOptions: {
        hasDeleted: false,
        count: 0,
        firstOption: null,
        secondOption: null,
    },
    callYourFriend: { hasAsked: false, isOpen: false },
    audio: {
        backgroundAudioIsOn: false,
        backgroundAudioSrc: "../src/sounds/under-1000.mp3",
        // backgroundAudioSrc: "../src/sounds/rightanswer.mp3",
        effectsAudioIsOn: false,
        effectsAudioSrc: "",
    },
};

const findIndexOfQuestions = (arr: QuestionT[], targetId: string) => {
    return arr.findIndex((ele) => ele.id === targetId);
};

const filterFound = (arr: QuestionT[], targetId: string) => {
    const index = findIndexOfQuestions(arr, targetId);
    return arr.filter((_, i) => i !== index);
};

const getOneOptionWrong = (indexCorrect: number): number => {
    const result = getRandomNum(0, 3);
    if (result !== indexCorrect && typeof result === "number") {
        return result;
    }
    return getOneOptionWrong(indexCorrect);
};

const reducer = (state: InitialState, action: Action): InitialState => {
    let answeredIndex;
    let answeredQuestionsArr;
    let filtered;
    let answeredQ;
    switch (action.type) {
        case "optionIsCorrect":
            if (!action.payload) return { ...state };
            answeredIndex = findIndexOfQuestions(
                state.nextQuestions,
                action.payload
            );
            answeredQ = state.nextQuestions[answeredIndex];
            filtered = filterFound(state.nextQuestions, action.payload);
            answeredQuestionsArr = [...state.answeredQuestions, answeredQ];
            // Player Won and game Ended
            if (answeredQuestionsArr.length === 15 && filtered.length === 0) {
                return {
                    ...state,
                    answeredQuestions: answeredQuestionsArr,
                    nextQuestions: filtered,
                    gameFinished: true,
                    didUserWin: true,
                    optionClicked: "",
                    deleteTwoOptions: {
                        ...state.deleteTwoOptions,
                        firstOption: null,
                        secondOption: null,
                    },
                    // audio: {
                    //     ...state.audio,
                    //     backgroundAudioSrc: "../src/sounds/success-page.mp3",
                    // },
                };
            }
            // Game is still Going and option is correct
            return {
                ...state,
                answeredQuestions: answeredQuestionsArr,
                nextQuestions: filtered,
                optionClicked: "",
                currentQuestion: filtered[0],
                withdraw:
                    answeredQuestionsArr.length % 5 === 0 &&
                    answeredQuestionsArr.length !== 0,

                deleteTwoOptions: {
                    ...state.deleteTwoOptions,
                    firstOption: null,
                    secondOption: null,
                },
                // audio: {
                //     isOn: state.audio.isOn,
                //     src: "../src/sounds/background.mp3",
                // },
            };
        case "optionIsClicked":
            if (!action.payload)
                return {
                    ...state,
                };
            return {
                ...state,
                optionClicked: action.payload,
                // audio: {
                //     ...state.audio,
                //     // src: action.audio?.src ?? "",
                // },
            };
        case "optionIsWrong":
            return {
                ...state,
                didUserWin: false,
                gameFinished: true,

                deleteTwoOptions: {
                    ...state.deleteTwoOptions,
                    firstOption: null,
                    secondOption: null,
                },
                // audio: { ...state.audio, src: "../src/sounds/wronganswer.mp3" },
            };

        case "withdraw":
            return {
                ...state,
                gameFinished: true,
                didUserWin: true,
                audio: {
                    ...state.audio,
                    backgroundAudioIsOn: false,
                    effectsAudioIsOn: state.audio.effectsAudioIsOn,
                    effectsAudioSrc: "",
                },
            };
        //pending animaiton
        case "askTheAudience":
            return {
                ...state,
                askTheAudience: {
                    hasAsked: true,
                    count: state.askTheAudience.count++,
                },
                audio: {
                    ...state.audio,
                    backgroundAudioIsOn: false,
                    effectsAudioIsOn: state.audio.effectsAudioIsOn,
                    effectsAudioSrc: "../src/sounds/ask-the-audience.mp3",
                },
            };
        //pending
        case "callYourFriend":
            return {
                ...state,
                callYourFriend: {
                    hasAsked: true,
                    isOpen: action?.isOpen ?? false,
                },
                audio: {
                    // ...state.audio,
                    backgroundAudioIsOn: action.audio?.bgIsOn ?? false,
                    effectsAudioIsOn: action.audio?.effectIsOn ?? false,
                    backgroundAudioSrc: state.audio.backgroundAudioSrc,
                    effectsAudioSrc: action.audio?.effectSrc ?? "",
                },
            };
        // done
        case "deleteTwoOptions":
            return {
                ...state,
                deleteTwoOptions: {
                    hasDeleted: true,
                    firstOption: state.currentQuestion.correct,
                    secondOption: getOneOptionWrong(
                        state.currentQuestion.correct
                    ),
                    count: state.deleteTwoOptions.count++,
                },
                audio: {
                    ...state.audio,
                    effectsAudioSrc: "../src/sounds/50-50.mp3",
                    backgroundAudioIsOn:
                        state.audio.backgroundAudioIsOn ||
                        state.audio.effectsAudioIsOn,
                    effectsAudioIsOn: state.audio.effectsAudioIsOn,
                },
            };
        case "toggleOnOffSounds":
            return {
                ...state,
                audio: {
                    ...state.audio,
                    backgroundAudioIsOn: !state.audio.backgroundAudioIsOn,
                    effectsAudioIsOn: !state.audio.backgroundAudioIsOn,
                    effectsAudioSrc: "",
                },
            };
        // case "playfriendVoice":
        //     return {
        //         ...state,
        //         audio: {
        //             ...state.audio,
        //             backgroundAudioIsOn: false,
        //             effectsAudioIsOn: true,
        //             effectsAudioSrc: action.audio?.effectSrc ?? "",
        //         },
        //     };

        case "changeAudioAfterDelay":
            return {
                ...state,
                audio: {
                    ...state.audio,
                    effectsAudioIsOn: false,
                    backgroundAudioIsOn:
                        state.audio.backgroundAudioIsOn ||
                        state.audio.effectsAudioIsOn,
                    effectsAudioSrc: "",
                },
            };
        case "reset":
            return {
                ...initState,
            };

        default:
            throw new Error();
    }
};

function App() {
    const [
        {
            answeredQuestions,
            currentQuestion,
            optionClicked,
            didUserWin,
            gameFinished,
            withdraw,
            askTheAudience,
            deleteTwoOptions,
            callYourFriend,
            audio,
        },
        dispatch,
    ] = useReducer(reducer, initState);
    const answeredQuestionsLength = answeredQuestions.length;
    const prizeValue = prizes[answeredQuestionsLength - 1];
    // console.log(askTheAudience);

    return (
        <div
            className={`wrapper ${
                didUserWin && gameFinished ? "bg-image" : ""
            }`}
        >
            <Header />

            {gameFinished ? (
                didUserWin ? (
                    <Main>
                        <PlayerWon
                            prizeValue={prizeValue.toString()}
                            dispatch={dispatch}
                        />
                        <EffectsAudioPlayer audio={audio} />
                        <BackgroundAudioPlayer audio={audio} />
                    </Main>
                ) : (
                    <Main>
                        <PlayerLost dispatch={dispatch} />
                        <EffectsAudioPlayer audio={audio} />
                        {/* <BackgroundAudioPlayer audio={audio} />d */}
                    </Main>
                )
            ) : (
                <>
                    <Main>
                        {/* Start Not visible when quiz is playing  */}
                        <Modal
                            deleteTwoOptions={deleteTwoOptions}
                            correctIndex={currentQuestion.correct}
                            askTheAudience={askTheAudience}
                        />
                        {callYourFriend.isOpen && (
                            <ModalCall
                                callYourFriend={callYourFriend}
                                currentQuestion={currentQuestion}
                                audio={audio}
                                dispatch={dispatch}
                            />
                        )}
                        <BackgroundAudioPlayer audio={audio} />
                        <EffectsAudioPlayer audio={audio} />
                        {/* End Not visible when quiz is playing  */}

                        <HelperTools
                            withdraw={withdraw}
                            askTheAudience={askTheAudience}
                            deleteTwoOptions={deleteTwoOptions}
                            callYourFriend={callYourFriend}
                            audio={audio}
                            answeredQuestionsLength={answeredQuestionsLength}
                            dispatch={dispatch}
                        />
                        <Progress correctQsLength={answeredQuestionsLength} />
                        <Prizes correctQsLength={answeredQuestionsLength} />
                        <Question question={currentQuestion} />
                        <Answers
                            question={currentQuestion}
                            deleteTwoOptions={deleteTwoOptions}
                            optionClicked={optionClicked}
                            dispatch={dispatch}
                        />
                    </Main>
                </>
            )}

            <Footer />
        </div>
    );
}

export default App;
