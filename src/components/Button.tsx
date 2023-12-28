import React from "react";

function Button({
    children,
    settingBtn = false,
    fifty = false,
    withdraw = false,
    disabled = false,
    handleFunc,
}: {
    children: React.ReactNode;
    settingBtn?: boolean;
    fifty?: boolean;
    withdraw?: boolean;
    disabled?: boolean;
    handleFunc: () => void;
}) {
    const classNameStyles = settingBtn
        ? "bg-setting-btn"
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
