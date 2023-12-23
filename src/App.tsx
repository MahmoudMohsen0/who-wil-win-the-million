import Header from "./components/Header";
import HelperTools from "./components/HelperTools";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Prizes from "./components/Prizes";
import Question from "./components/Question";
import Answers from "./components/Answers";
import { prizes, questions as questionData } from "./db/data";
import { useReducer } from "react";
import { InitialState, Action, QuestionT } from "./lib/Types";
import Progress from "./components/Progress";
import PlayerWon from "./components/PlayerWon";
import PlayerLost from "./components/PlayerLost";
import Modal from "./components/Modal";
import { getRandomNum } from "./components/Modal";
import ModalCall from "./components/ModalCall";

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
            };
        case "optionIsClicked":
            if (!action.payload) return { ...state };
            return {
                ...state,
                optionClicked: action.payload,
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
            };
        case "reset":
            return {
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
                    firstOption: null,
                    secondOption: null,
                    count: 0,
                },
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
                    </Main>
                ) : (
                    <Main>
                        <PlayerLost dispatch={dispatch} />
                    </Main>
                )
            ) : (
                <>
                    <Main>
                        <HelperTools
                            withdraw={withdraw}
                            askTheAudience={askTheAudience}
                            deleteTwoOptions={deleteTwoOptions}
                            dispatch={dispatch}
                            answeredQuestionsLength={answeredQuestionsLength}
                        />
                        <Modal
                            deleteTwoOptions={deleteTwoOptions}
                            correctIndex={currentQuestion.correct}
                            askTheAudience={askTheAudience}
                        />
                        <ModalCall />
                        <Progress correctQsLength={answeredQuestionsLength} />
                        <Prizes correctQsLength={answeredQuestionsLength} />
                        <Question question={currentQuestion} />
                        <Answers
                            question={currentQuestion}
                            deleteTwoOptions={deleteTwoOptions}
                            dispatch={dispatch}
                            optionClicked={optionClicked}
                        />
                    </Main>
                </>
            )}

            <Footer />
        </div>
    );
}

export default App;
