import React from "react";

function Button({
    children,
    sound = false,
    fifty = false,
    withdraw = false,
    disabled = false,
    handleFunc,
}: {
    children: React.ReactNode;
    sound?: boolean;
    fifty?: boolean;
    withdraw?: boolean;
    disabled?: boolean;
    handleFunc: () => void;
}) {
    const classNameStyles = sound
        ? "sound"
        : fifty
        ? "fifty"
        : withdraw
        ? "can-withdraw-money"
        : "";
    const disabledClass = disabled ? "disabled" : "";
    return (
        <button
            type="button"
            className={`btn ${classNameStyles} ${disabledClass}`}
            onClick={() => handleFunc()}
        >
            {children}
        </button>
    );
}

export default Button;
