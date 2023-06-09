import { useEffect, useState, useRef } from "react";
import "./PlayerScore.css";

enum ScoreState {
    static = 0,
    increasing = 1,
    decreasing = 2,
}

type PlayerScoreProps = {
    score: number
};

function PlayerScore({ score }: PlayerScoreProps) {
    const [displayScore, setDisplayScore] = useState(score);
    const incrementInterval = useRef<number | undefined>();
    const [scoreState, setScoreState] = useState<ScoreState>(ScoreState.static);

    useEffect(() => {
        // clear currently running interval, as the new one can take over any remaining changes
        clearInterval(incrementInterval.current);
        // If display score is somehow still aligned with actual score just return
        if (displayScore === score) return;
        // create display score proxy as the interval will not receive updated displayScore from useState
        let displayScoreProxy = displayScore;
        incrementInterval.current = setInterval(() => {
            // Increment is finished
            if (displayScoreProxy === score)
            {
                clearInterval(incrementInterval.current);
                SetScoreState(ScoreState.static);
                return;
            }
            // Increment should lower score
            if (displayScoreProxy > score){
                displayScoreProxy--;
                SetScoreState(ScoreState.decreasing);
            }
            // Increment should increase score
            if (displayScoreProxy < score){
                displayScoreProxy++;
                SetScoreState(ScoreState.increasing);
            }
            setDisplayScore(displayScoreProxy);
        }, 75);
    }, [score])

    // Perform state check before setting state to reduce re-renders
    const SetScoreState = (newState: ScoreState) => {
        setScoreState(prevState => {
            if (prevState === newState) return prevState;
            return newState;
        });
    }

    return (
        <h3 className={`score ${ScoreState[scoreState]}`}>{displayScore}</h3>
    );
}

export default PlayerScore;
