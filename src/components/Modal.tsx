import { mixRandomWithCorrectIndex } from "../global functions/globalFunctions";
import { ModalProps } from "../lib/Types";

function Modal({ correctIndex, deleteTwoOptions, askTheAudience }: ModalProps) {
    const mixed = mixRandomWithCorrectIndex(
        correctIndex,
        deleteTwoOptions.firstOption ?? undefined,
        deleteTwoOptions.secondOption ?? undefined
    );

    // console.log(mixed);
    const [a, b, c, d] = mixed;

    const isOpen =
        askTheAudience.hasAsked && askTheAudience.isOpen ? "open" : "";

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
