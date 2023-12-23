import Prize from "./prize";
import { prizes } from "../db/data";
function Prizes({ correctQsLength }: { correctQsLength: number }) {
    return (
        <aside className="prizes">
            {prizes.map((item, i) => {
                return (i + 1) % 5 ? (
                    <Prize
                        key={item + i}
                        value={item}
                        index={i}
                        correctQsLength={correctQsLength}
                    />
                ) : (
                    <Prize
                        key={item + i}
                        value={item}
                        index={i}
                        clrYellow={true}
                        correctQsLength={correctQsLength}
                    />
                );
            })}
        </aside>
    );
}

export default Prizes;
