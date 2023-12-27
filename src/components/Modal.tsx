// import React from "react";
export const getRandomNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomPercentage = () => {
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

const getRandomThreeIndexs = (index: number) => {
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

const mixRandomWithCorrectIndex = (
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
    // console.log(randomArr);
    // console.log(final);

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

type ModalProps = {
    correctIndex: number;
    deleteTwoOptions: {
        hasDeleted: boolean;
        firstOption: null | number;
        secondOption: null | number;
        count: number;
    };
    askTheAudience: { hasAsked: boolean; count: number };
};

function Modal({ correctIndex, deleteTwoOptions, askTheAudience }: ModalProps) {
    const mixed = mixRandomWithCorrectIndex(
        correctIndex,
        deleteTwoOptions.firstOption ?? undefined,
        deleteTwoOptions.secondOption ?? undefined
    );

    // console.log(mixed);
    const [a, b, c, d] = mixed;

    const isOpen =
        askTheAudience.hasAsked && askTheAudience.count === 1 ? "open" : "";

    return (
        <div className={`modal ${isOpen} ${isOpen ? "people" : ""}`}>
            <div className={`modal__content ${isOpen}`}>
                {/* box number 1 */}
                <div className={`modal__box ${isOpen}`}>
                    <div className={`modal__bar ${isOpen}`}>
                        <div
                            className={`modal__box__inner ${isOpen}`}
                            style={{ height: `${a}%` }}
                        >
                            <span>{a}%</span>
                        </div>
                    </div>
                    <div className={`modal__numbers ${isOpen}`}>1</div>
                </div>

                {/* box number 2 */}
                <div className={`modal__box ${isOpen}`}>
                    <div className={`modal__bar ${isOpen}`}>
                        <div
                            className={`modal__box__inner ${isOpen}`}
                            style={{ height: `${b}%` }}
                        >
                            <span>{b}%</span>
                        </div>
                    </div>
                    <div className={`modal__numbers ${isOpen}`}>2</div>
                </div>

                {/* box number 3 */}
                <div className={`modal__box ${isOpen}`}>
                    <div className={`modal__bar ${isOpen}`}>
                        <div
                            className={`modal__box__inner ${isOpen}`}
                            style={{ height: `${c}%` }}
                        >
                            <span>{c}%</span>
                        </div>
                    </div>
                    <div className={`modal__numbers ${isOpen}`}>3</div>
                </div>

                {/* box number 4 */}
                <div className={`modal__box ${isOpen}`}>
                    <div className={`modal__bar ${isOpen}`}>
                        <div
                            className={`modal__box__inner ${isOpen}`}
                            style={{ height: `${d}%` }}
                        >
                            <span>{d}%</span>
                        </div>
                    </div>
                    <div className={`modal__numbers ${isOpen}`}>4</div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
