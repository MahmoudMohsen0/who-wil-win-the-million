// import { PrizesT } from "../lib/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

type prizeProps = {
    value: number;
    index: number;
    clrYellow?: boolean;
    correctQsLength: number;
};

function prize({
    value,
    index,
    clrYellow = false,
    correctQsLength,
}: prizeProps) {
    const isPastPrize = correctQsLength >= index + 1;
    const isCurrentPrize = correctQsLength === index;
    const styles = {
        color: clrYellow ? (isCurrentPrize ? "#e13b3b" : "#feda00") : "white",
        background: isCurrentPrize ? "#feda00" : "",
    };

    return (
        <div className="prize" style={styles}>
            <span>{index + 1}</span>
            <FontAwesomeIcon
                icon={faStar}
                size="xl"
                className={`stars ${isPastPrize ? "visible" : "hidden"}`}
                style={{ color: "#feda00" }}
            />
            <span>{value}</span>
        </div>
    );
}

export default prize;
