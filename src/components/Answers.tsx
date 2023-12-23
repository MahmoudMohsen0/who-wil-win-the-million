// import { faL } from "@fortawesome/free-solid-svg-icons";
import { MyDispatch, QuestionT } from "../lib/Types";
import Field from "./Field";

type AnswerProps = {
    question: QuestionT;
    optionClicked: string;
    deleteTwoOptions: {
        hasDeleted: boolean;
        firstOption: null | number;
        secondOption: null | number;
        count: number;
    };
    dispatch: MyDispatch;
};

function Answers({
    question,
    optionClicked,
    deleteTwoOptions,
    dispatch,
}: AnswerProps) {
    function handleClicked(id: string) {
        dispatch({ type: "optionIsClicked", payload: id });
    }
    const cantDelete = (i: number) =>
        deleteTwoOptions.firstOption === i ||
        deleteTwoOptions.secondOption === i;

    return (
        <div className="answers">
            {question.options.map((option, i) => {
                return (
                    <Field
                        text={"( " + (i + 1) + " ) " + option}
                        index={i}
                        deleteThisOption={
                            deleteTwoOptions.hasDeleted &&
                            !cantDelete(i) &&
                            deleteTwoOptions.firstOption !== null &&
                            deleteTwoOptions.secondOption !== null
                        }
                        dispatch={dispatch}
                        clicked={optionClicked}
                        question={question}
                        handleClicked={handleClicked}
                        key={"o-" + i}
                    />
                );
            })}
        </div>
    );
}

export default Answers;
