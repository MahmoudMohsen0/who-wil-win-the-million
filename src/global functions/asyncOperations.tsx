import { QuestionT } from "../lib/Types";
import { allQuestions } from "../db/data";

const isMyArrayItemsUniqueAsync = async (arr: QuestionT[]) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i].question === arr[j].question && i !== j) {
                return false;
            }
        }
    }
    return true;
};

const getRandomNumAsync = async (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const findIndexOfQuestionsAsync = async (
    arr: QuestionT[],
    targetId: string
) => {
    return arr.findIndex((ele) => ele.id === targetId);
};

const filterFoundAsync = async (arr: QuestionT[], targetIndex: number) => {
    return arr.filter((_, i) => i !== targetIndex);
};

const getItemFromLocalAsync = async (keyName: string) => {
    return JSON.parse(localStorage.getItem(keyName) ?? "[]");
};

const setItemToLocalAsync = async (
    keyName: string,
    arrOfObjs: QuestionT[] | number
) => {
    return localStorage.setItem(keyName, JSON.stringify(arrOfObjs));
};

const saveToLocalStorageAsync = async () => {
    const allQuestionsLocal: QuestionT[] = await getItemFromLocalAsync(
        "allQuestionsLocal"
    );

    if (allQuestionsLocal.length === 0) {
        setItemToLocalAsync("allQuestionsLocal", allQuestions);
    }
};

const getGameQuestionsAsync = async () => {
    // if allQuestionsLocal is empty set new one on local Storage with all questions
    // and set playedQuestion Local to empty array
    await saveToLocalStorageAsync();

    let allQuestionsLocal: QuestionT[] = await getItemFromLocalAsync(
        "allQuestionsLocal"
    ); // [...allQuestions] on first mount

    const gameQuestions: QuestionT[] = [];
    const quizGames: [QuestionT[]] = JSON.parse(
        localStorage.getItem("quizGames") ?? "[[]]"
    );
    if (
        allQuestionsLocal.length === 0 ||
        quizGames.length >= allQuestions.length / 15
    ) {
        localStorage.removeItem("allQuestionsLocal");
        localStorage.setItem(
            "quizGames",
            JSON.stringify([quizGames[quizGames.length - 1]])
        );
        await saveToLocalStorageAsync();
        allQuestionsLocal = await getItemFromLocalAsync("allQuestionsLocal");
    }
    while (gameQuestions.length < 15) {
        allQuestionsLocal = await getItemFromLocalAsync("allQuestionsLocal");
        const randomIndex = await getRandomNumAsync(
            0,
            allQuestionsLocal.length - 1
        );
        const randomQuestion: QuestionT = allQuestionsLocal[randomIndex];
        const isOnGame = await findIndexOfQuestionsAsync(
            gameQuestions,
            randomQuestion.id
        );
        if (isOnGame === -1) {
            gameQuestions.push(randomQuestion);
            const filterFoundedQuestionsFromAllQuestionLocal =
                await filterFoundAsync(
                    await getItemFromLocalAsync("allQuestionsLocal"),
                    randomIndex
                );
            await setItemToLocalAsync(
                "allQuestionsLocal",
                filterFoundedQuestionsFromAllQuestionLocal
            );
        }
    }
    const isUnique = await isMyArrayItemsUniqueAsync(gameQuestions);
    if (isUnique) {
        return gameQuestions;
    }
    throw new Error("error");
};

export async function asyncFunc() {
    try {
        const response: QuestionT[] = await new Promise((res, rej) => {
            getGameQuestionsAsync()
                .then((gameQuestions) => res(gameQuestions))
                .catch((e) => rej(e));
        });

        if (typeof response !== "string" && Array.isArray(response)) {
            return response;
        }

        throw new Error();
    } catch (err) {
        console.log(err);
    }
}
