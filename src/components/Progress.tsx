import { MyDispatch, QuestionT } from "../lib/Types";
import AnswerTimer from "./AnswerTimer";

function Progress({
    correctQsLength,
    currentQuestion,
    max = 15,
    dispatch,
}: {
    correctQsLength: number;
    max?: number;
    currentQuestion?: QuestionT;
    dispatch: MyDispatch;
}) {
    return (
        <div className="progress-section">
            <progress value={correctQsLength} max={max} dir="ltr"></progress>
            <div className="progress__info" dir="ltr">
                <p>{correctQsLength}%</p>
                {currentQuestion && (
                    <AnswerTimer
                        classAnimation="danger"
                        syncWith={currentQuestion}
                        dispatch={dispatch}
                    />
                )}
            </div>
        </div>
    );
}

export default Progress;
