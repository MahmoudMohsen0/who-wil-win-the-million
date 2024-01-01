import Option from "./Option";
import { FieldProps } from "../lib/Types";

function Field({
    text,
    question,
    clicked,
    index,
    deleteThisOption,
    isQuestion = false,
    dispatch,
}: 
FieldProps) {
    const isCorrect = question.correct === index;
    const id = typeof index === "number" ? `o-${index}` : "questionField";
    const isClicked = clicked === id;

    const correctOrWrongAnimation = !isClicked
        ? ""
        : isCorrect
        ? "toggleSuccess"
        : "toggleDanger";

    const headingClassName = deleteThisOption ? "fadeOut" : "";
    function handleClicked(id: string, src?: string) {
        if (dispatch)
            dispatch({
                type: "optionIsClicked",
                payload: id,
                audio: { effectSrc: src },
            });
    }

    return (
        <div
            className={`field ${correctOrWrongAnimation}`}
            onClick={() => {
                if ((!handleClicked && isQuestion) || !dispatch) return;

                if (isCorrect && !deleteThisOption) {
                    handleClicked(id, "sounds/right-answer.mp3");

                    setTimeout(() => {
                        dispatch({
                            type: "optionIsCorrect",
                            payload: question.id,
                        });
                    }, 500);
                }
                if (!isCorrect && !deleteThisOption) {
                    handleClicked(id, "sounds/wrong-answer.mp3");

                    setTimeout(() => {
                        dispatch({
                            type: "optionIsWrong",
                        });
                    }, 500);
                }
            }}
        >
            <h3 className={headingClassName}>{text}</h3>
            <Option />
        </div>
    );
}

export default Field;
