import { useEffect, useReducer } from "react";
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
import ModalCall from "./components/ModalCall";
import BackgroundAudioPlayer from "./components/BackgroundAudioPlayer";
import EffectsAudioPlayer from "./components/EffectsAudioPlayer";
import { asyncFunc } from "./global functions/asyncOperations";
import {
    findIndexOfQuestions,
    filterFound,
    getOneOptionWrong,
    getItemFromLocal,
} from "./global functions/globalFunctions";
////<reference types="vite-plugin-svgr/client" />;

const currentGameQuestion = () => {
    let quizGames: [QuestionT[]] | [] = getItemFromLocal("quizGames"); // []
    // const gamesLength: number = quizGames.length;
    if (quizGames.length === 0) {
        quizGames = [[...questionData]];
        localStorage.setItem("quizGames", JSON.stringify(quizGames));
    }
    return quizGames[quizGames.length - 1];
};

const gameQuestions: QuestionT[] = currentGameQuestion();

const initState: InitialState = {
    answeredQuestions: [],
    nextQuestions: gameQuestions,
    currentQuestion: gameQuestions[0],
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
        appAudioIsOn: false,
        backgroundAudioIsOn: false,
        backgroundAudioSrc: "../src/sounds/background-audio.mp3",
        effectsAudioIsOn: false,
        effectsAudioSrc: "",
    },
};
// const gameQuestionsOnReset: QuestionT[] = currentGameQuestion();

const reducer = (state: InitialState, action: Action): InitialState => {
    let answeredIndex;
    let answeredQuestionsArr;
    let filtered;
    let answeredQ;
    let nextGameQuestions: QuestionT[];
    const playEffect = {
        ...state.audio,
        backgroundAudioIsOn: false,
        effectsAudioIsOn: state.audio.appAudioIsOn,
    };
    const playBackground = {
        ...state.audio,
        effectsAudioSrc: "",
        backgroundAudioIsOn: state.audio.appAudioIsOn,
        effectsAudioIsOn: false,
    };

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
                audio: {
                    ...playBackground,
                },
            };
        case "optionIsClicked":
            if (!action.payload)
                return {
                    ...state,
                };
            return {
                ...state,
                optionClicked: action.payload,
                audio: {
                    ...playEffect,
                    effectsAudioSrc: action.audio?.effectSrc ?? "",
                },
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
                audio: {
                    ...playBackground,
                },
            };

        case "withdraw":
            return {
                ...state,
                gameFinished: true,
                didUserWin: true,
            };

        case "askTheAudience":
            return {
                ...state,
                askTheAudience: {
                    hasAsked: true,
                    count: state.askTheAudience.count++,
                },
                audio: {
                    ...playEffect,
                    effectsAudioSrc: "../src/sounds/ask-the-audience.mp3",
                },
            };

        case "callYourFriend":
            return {
                ...state,
                callYourFriend: {
                    hasAsked: true,
                    isOpen: action?.OpenTarget ?? false,
                },
                audio: {
                    ...state.audio,
                    backgroundAudioIsOn: action.audio?.bgIsOn ?? false,
                    effectsAudioIsOn: action.audio?.effectIsOn ?? false,
                    backgroundAudioSrc: state.audio.backgroundAudioSrc,
                    effectsAudioSrc: action.audio?.effectSrc ?? "",
                },
            };

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
                    ...playEffect,
                    effectsAudioSrc: "../src/sounds/50-50.mp3",
                },
            };

        case "toggleOnOffSounds":
            return {
                ...state,
                audio: {
                    ...state.audio,
                    appAudioIsOn: !state.audio.appAudioIsOn,
                    backgroundAudioIsOn: !state.audio.appAudioIsOn,
                    effectsAudioIsOn: !state.audio.appAudioIsOn,
                    effectsAudioSrc: "",
                },
            };

        case "changeAudioAfterDelay":
            return {
                ...state,
                audio: {
                    ...playBackground,
                },
            };

        case "changeBackgroundAudioTo":
            return {
                ...state,
                audio: {
                    ...playBackground,
                    backgroundAudioSrc: action.audio?.bgSrc ?? "",
                },
            };

        case "reset":
            console.log("reseted");
            nextGameQuestions = currentGameQuestion();
            return {
                ...initState,
                nextQuestions: nextGameQuestions,
                currentQuestion: nextGameQuestions[0],
                callYourFriend: { hasAsked: false, isOpen: false },
                audio: {
                    ...state.audio,
                    backgroundAudioIsOn: state.audio.appAudioIsOn,
                    backgroundAudioSrc: initState.audio.backgroundAudioSrc,
                    effectsAudioIsOn: state.audio.appAudioIsOn,
                },
            };

        default:
            console.log(action);
            throw new Error();
    }
};

function App() {
    const [
        {
            nextQuestions,
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

    useEffect(() => {
        // get next game questions
        asyncFunc()
            .then((res) => {
                if (Array.isArray(res)) {
                    const games: [QuestionT[]] = JSON.parse(
                        localStorage.getItem("quizGames") ?? `[${questionData}]`
                    );
                    games.push(res);
                    localStorage.setItem("quizGames", JSON.stringify(games));
                }
            })
            .catch((e) => console.log(e));
    }, [nextQuestions]);

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
                        <BackgroundAudioPlayer audio={audio} />
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
                        <Progress
                            correctQsLength={answeredQuestionsLength}
                            currentQuestion={currentQuestion}
                            dispatch={dispatch}
                        />
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
