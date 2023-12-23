import { QuestionT } from "../lib/Types";
import Field from "./Field";

type QuestionProps = {
    question: QuestionT;
};

function Question({ question }: QuestionProps) {
    return (
        <div className="question">
            <Field
                text={question.question}
                isQuestion={true}
                question={question}
            />
        </div>
    );
}

export default Question;
