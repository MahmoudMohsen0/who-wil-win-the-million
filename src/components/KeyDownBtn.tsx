function KeyDownBtn({ name, isDown }: { name: string; isDown: boolean }) {
    return (
        <button
            className={`key-down-btn ${
                isDown ? "key-down-btn-with-keyboard" : ""
            }`}
            role="button"
        >
            {name}
        </button>
    );
}

export default KeyDownBtn;
