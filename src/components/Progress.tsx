function Progress({
    correctQsLength,
    max = 15,
}: {
    correctQsLength: number;
    max?: number;
}) {
    return (
        <div className="progress-section">
            <progress value={correctQsLength} max={max} dir="ltr"></progress>
            <p>{correctQsLength}%</p>
        </div>
    );
}

export default Progress;
