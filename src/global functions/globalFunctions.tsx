import { QuestionT } from "../lib/Types";
// import { getRandomNum } from "../components/Modal";

export const getRandomNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomPercentage = () => {
    const correctRange = getRandomNum(45, 60);
    const resArr = [correctRange];
    const totalPercent = 100;
    let remain = totalPercent - correctRange;
    let n = 2;
    while (remain > 0 && n > 0) {
        const wrongRange = getRandomNum(0, remain);
        resArr.push(wrongRange);
        n--;
        remain -= wrongRange;
    }
    if (remain === 0 && n === 1 && resArr.length < 4) {
        resArr.push(0);
    }
    resArr.push(remain);
    // console.log(resArr);
    // console.log()
    return resArr;
};

export const getRandomThreeIndexs = (index: number) => {
    const res: number[] = [];
    while (res.length < 3) {
        const random = getRandomNum(0, 3);
        if (
            random !== index &&
            res[0] !== random &&
            res[1] !== random &&
            res[2] !== random
        ) {
            res.push(random);
        }
    }
    return res;
};

export const mixRandomWithCorrectIndex = (
    correctIndex: number,
    deletedIndexOne?: number,
    deletedIndexTwo?: number
) => {
    const [correct, wrongA, wrongB, wrongC] = randomPercentage();
    const [iOne, iTwo, iThree] = getRandomThreeIndexs(correctIndex);
    const randomArr: number[] = [];
    randomArr[iOne] = wrongA;
    randomArr[iTwo] = wrongB;
    randomArr[iThree] = wrongC;
    const final = [0, 0, 0, 0];
    final[correctIndex] = correct;

    const finalFinalReally: number[] = final.map((item, i) => {
        return correctIndex !== i ? randomArr[i] : item;
    });

    const correctReduce = finalFinalReally
        .filter((_, i) => i !== deletedIndexTwo)
        .reduce((acc, curr) => acc + curr, 0);
    const filteredArr = finalFinalReally.map((_, i) => {
        if (i === deletedIndexOne) {
            return correctReduce;
        }
        if (i === deletedIndexTwo) {
            return randomArr[i];
        }
        return 0;
    });
    return typeof deletedIndexOne === "number" &&
        typeof deletedIndexTwo === "number"
        ? filteredArr
        : finalFinalReally;
};

export const findIndexOfQuestions = (arr: QuestionT[], targetId: string) => {
    return arr.findIndex((ele) => ele.id === targetId);
};

export const filterFound = (
    arr: QuestionT[],
    targetId: string,
    targetIndex?: number
) => {
    const index = targetIndex
        ? targetIndex
        : findIndexOfQuestions(arr, targetId);
    return arr.filter((_, i) => i !== index);
};

export const getOneOptionWrong = (indexCorrect: number): number => {
    const result = getRandomNum(0, 3);
    if (result !== indexCorrect && typeof result === "number") {
        return result;
    }
    return getOneOptionWrong(indexCorrect);
};

export const getItemFromLocal = (keyName: string) => {
    return JSON.parse(localStorage.getItem(keyName) ?? "[]");
};

export const setItemToLocal = (keyName: string, arrObjs: [QuestionT[]]) => {
    return localStorage.setItem(keyName, JSON.stringify(arrObjs));
};
