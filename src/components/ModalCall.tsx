import Progress from "./Progress";
import KeyDownBtn from "./KeyDownBtn";
import Timer from "./Timer";
import { useState, useEffect, useCallback } from "react";

function ModalCall() {
    const [keysPressed, setKeysPressed] = useState<{
        ArrowRight: boolean;
        ArrowLeft: boolean;
    }>({
        ArrowRight: false,
        ArrowLeft: false,
    });
    const [countKeyRightAndLeftPressed, setCountKeyRightAndLeftPressed] =
        useState(0);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                if (!keysPressed[event.key]) {
                    setKeysPressed((prevState) => ({
                        ...prevState,
                        [event.key]: true,
                    }));

                    // Set a timeout to clear the keysPressed state after 5 milliseconds
                    setTimeoutId(setTimeout(() => clearKeysPressed(), 5));
                }
            }
        },
        [keysPressed]
    );

    const handleKeyUp = useCallback(() => {
        // Clear the timeout if a key is released before the 5 milliseconds elapse
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setKeysPressed({ ArrowRight: false, ArrowLeft: false });
    }, [timeoutId]);

    const clearKeysPressed = () => {
        setKeysPressed({ ArrowRight: false, ArrowLeft: false });
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown as EventListener);
        document.addEventListener("keyup", handleKeyUp as EventListener);

        // Remove the event listeners when the component unmounts
        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown as EventListener
            );
            document.removeEventListener("keyup", handleKeyUp as EventListener);
        };
    }, [handleKeyDown, handleKeyUp]); // Include handleKeyDown and handleKeyUp in the dependency array

    useEffect(() => {
        // Check if both ArrowRight and ArrowLeft are pressed
        if (keysPressed.ArrowRight && keysPressed.ArrowLeft) {
            setCountKeyRightAndLeftPressed((prev) => prev + 1);
        }
    }, [keysPressed]);
    console.log(countKeyRightAndLeftPressed);

    const isOpen = "open";

    return (
        <div className="ModalCall">
            <div className={`modal ${isOpen}`}>
                <div className={`modal__content ${isOpen} modal-call`}>
                    <Timer />
                    <Progress
                        correctQsLength={countKeyRightAndLeftPressed}
                        max={40}
                    />
                    <h2>
                        اضغظ علي زرار اليمين و اليسار في نفس الوقت علي الكيبورد
                    </h2>
                    <div className="btns">
                        <KeyDownBtn
                            name="زرار يمين"
                            isDown={keysPressed.ArrowRight}
                        />
                        <KeyDownBtn
                            name="زرار يسار"
                            isDown={keysPressed.ArrowLeft}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCall;

// import Progress from "./Progress";
// import KeyDownBtn from "./KeyDownBtn";
// import Timer from "./Timer";
// import { useState, useEffect, useCallback } from "react";

// function ModalCall() {
//     const [isKeyDown, setIsKeyDown] = useState<{
//         ArrowRight: boolean;
//         ArrowLeft: boolean;
//     }>({
//         ArrowRight: false,
//         ArrowLeft: false,
//     });
//     const [countKeyRightAndLeftPressed, setCountKeyRightAndLeftPressed] =
//         useState(0);

//     const [isDelayActive, setIsDelayActive] = useState(false);

//     const handleKeyDown = useCallback(
//         (event: KeyboardEvent) => {
//             if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
//                 if (!isDelayActive) {
//                     setIsKeyDown((prevState) => ({
//                         ...prevState,
//                         [event.key]: true,
//                     }));
//                 }
//             }
//         },
//         [isDelayActive]
//     );

//     const handleKeyUp = useCallback((event: KeyboardEvent) => {
//         if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
//             setIsKeyDown((prevState) => ({
//                 ...prevState,
//                 [event.key]: false,
//             }));

//             setIsDelayActive(true);
//             setTimeout(() => {
//                 setIsDelayActive(false);
//             }, 500); // Adjust the delay duration (in milliseconds) as needed
//         }
//     }, []);

//     useEffect(() => {
//         document.addEventListener("keydown", handleKeyDown);
//         document.addEventListener("keyup", handleKeyUp);

//         return () => {
//             document.removeEventListener("keydown", handleKeyDown);
//             document.removeEventListener("keyup", handleKeyUp);
//         };
//     }, [handleKeyDown, handleKeyUp]);

//     useEffect(() => {
//         if (isKeyDown.ArrowRight && isKeyDown.ArrowLeft) {
//             setCountKeyRightAndLeftPressed((prev) => prev + 1);
//         }
//     }, [isKeyDown]);

//     const isOpen = "open";

//     return (
//         <div className="ModalCall">
//             <div className={`modal ${isOpen}`}>
//                 <div className={`modal__content ${isOpen} modal-call`}>
//                     <Timer />
//                     <Progress
//                         correctQsLength={countKeyRightAndLeftPressed}
//                         max={40}
//                     />
//                     <h2>
//                         اضغظ علي زرار اليمين و اليسار في نفس الوقت علي الكيبورد
//                     </h2>
//                     <div className="btns">
//                         <KeyDownBtn
//                             name="زرار يمين"
//                             isDown={isKeyDown.ArrowRight}
//                         />
//                         <KeyDownBtn
//                             name="زرار يسار"
//                             isDown={isKeyDown.ArrowLeft}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
