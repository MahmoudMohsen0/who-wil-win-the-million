// import FieldSvg from "../assets/question.svg?react";
// import { useState } from "react";
import Option from "./Option";
import { MyDispatch, QuestionT } from "../lib/Types";

type FieldProps = {
    text: string;
    question: QuestionT;
    clicked?: string;
    index?: number;
    deleteThisOption: boolean;
    dispatch?: MyDispatch;
    handleClicked?: (id: string) => void;
};

function Field({
    text,
    question,
    clicked,
    index,
    deleteThisOption,
    dispatch,
    handleClicked,
}: FieldProps) {
    const isCorrect = question.correct === index;
    const id = typeof index === "number" ? `o-${index}` : "questionField";
    const isClicked = clicked === id;

    const correctOrWrongAnimation = !isClicked
        ? ""
        : isCorrect
        ? "toggleSuccess"
        : "toggleDanger";

    // console.log(deleteThisOption);
    const headingClassName = deleteThisOption ? "fadeOut" : "";

    return (
        <div
            className={`field ${correctOrWrongAnimation}`}
            onClick={() => {
                if (!handleClicked || !dispatch) return;
                handleClicked(id);

                if (isCorrect && !deleteThisOption) {
                    setTimeout(() => {
                        dispatch({
                            type: "optionIsCorrect",
                            payload: question.id,
                        });
                    }, 1000);
                    console.log("correct");
                }
                if (!isCorrect && !deleteThisOption) {
                    setTimeout(() => {
                        dispatch({ type: "optionIsWrong" });
                    }, 1000);
                }
            }}
        >
            <h3 className={headingClassName}>{text}</h3>
            <Option />
        </div>
    );
}

export default Field;
