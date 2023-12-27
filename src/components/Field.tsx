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
}: // handleClicked,
FieldProps) {
    const isCorrect = question.correct === index;
    const id = typeof index === "number" ? `o-${index}` : "questionField";
    const isClicked = clicked === id;

    const correctOrWrongAnimation = !isClicked
        ? ""
        : isCorrect
        ? "toggleSuccess"
        : "toggleDanger";

    // console.log(deleteThisOption);
    // if (correctOrWrongAnimation === "toggleSuccess") {
    //     if (dispatch) {
    //         dispatch({
    //             type: "toggleOnOffSounds",
    //             audio: { src: "../src/right.mp3" },
    //         });
    //     }
    // }
    // if (correctOrWrongAnimation === "toggleDanger") {
    // }

    const headingClassName = deleteThisOption ? "fadeOut" : "";
    function handleClicked(id: string, src?: string) {
        if (dispatch)
            dispatch({
                type: "optionIsClicked",
                payload: id,
                audio: { src: src ?? "" },
            });
    }

    return (
        <div
            className={`field ${correctOrWrongAnimation}`}
            onClick={() => {
                if ((!handleClicked && isQuestion) || !dispatch) return;

                if (isCorrect && !deleteThisOption) {
                    handleClicked(id, "../src/sounds/right.mp3");

                    setTimeout(() => {
                        dispatch({
                            type: "optionIsCorrect",
                            payload: question.id,
                        });
                    }, 500);
                }
                if (!isCorrect && !deleteThisOption) {
                    handleClicked(id, "../src/sounds/wronganswer.mp3");

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
