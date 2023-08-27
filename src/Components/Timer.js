import { useState, useEffect, useRef, useContext } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsContext from '../Context/SettingsContext';

const colors = {
    wheat: "#E9B44C",
    lightCoral: "#df928e",
    oldRose: "#9b2915",
    platinum: "#d1dede",
    eerieBlack: "#1d201f"
}


const Timer = () => {

    const timeDataContext = useContext(SettingsContext);
    const timeData = timeDataContext.settings;
    const timeDataRef = useRef(timeData);

    const [secondsLeft, setSecondsLeft] = useState(timeData.round.workTime*60);
    const [isPaused, setIsPaused] = useState(true);
    const [round, setRound] = useState(1);
    const [mode, setMode] = useState("work")
    const isPausedRef = useRef(isPaused);
    const secondsLeftRef = useRef(secondsLeft);
    const roundRef = useRef(round);
    const modeRef = useRef(mode);

    let minutes, seconds, percentage;
    useEffect(() => {
        if (isPausedRef.current) {
            return ;
        }

        timeDataRef.current = timeDataContext.settings;

        const interval = setInterval(() => {
            
            secondsLeftRef.current--;
            setSecondsLeft(secondsLeftRef.current);
            

            if (modeRef.current === "work") {
                if (secondsLeftRef.current === 0 && roundRef.current < timeData.rounds) {
                    modeRef.current = "break";
                    setMode(modeRef.current);
                    secondsLeftRef.current = timeDataRef.current.break[round-1]*60;
                    setSecondsLeft(secondsLeftRef.current);
                    
                } else if (secondsLeftRef.current === 0 && roundRef.current === timeData.rounds) {
                    modeRef.current = "break";
                    setMode(modeRef.current);
                    secondsLeftRef.current = timeDataRef.current.break[round-1]*60;
                    setSecondsLeft(secondsLeftRef.current);
                }
            } else if (modeRef.current === "break") {
                if (secondsLeftRef.current === 0 && roundRef.current < timeData.rounds) {
                    modeRef.current = "work";
                    setMode(modeRef.current);
                    secondsLeftRef.current = timeDataRef.current.break[round-1]*60;
                    setSecondsLeft(secondsLeftRef.current);
                    roundRef.current++;
                    setRound(roundRef.current);
                } else if (secondsLeftRef.current === 0 && roundRef.current === timeData.rounds) {
                    roundRef.current = 1;
                    setRound(roundRef.current);
                    modeRef.current = "work";
                    setMode(modeRef.current);
                    secondsLeftRef.current = timeDataRef.current.break[roundRef.current-1]*60;
                    setSecondsLeft(secondsLeftRef.current);
                }
            }
           

        }, 1000);

        return () => clearInterval(interval)
    });

    minutes = Math.floor(secondsLeft / 60);
    seconds = secondsLeft % 60;

    if (mode === "work") {
        percentage = secondsLeft/(timeData.round.workTime*60)*100;
    } else if (mode === "break") {
        percentage = secondsLeft/(timeData.break[round-1]*60)*100;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return (
        <div>
            <h1 className="heading" style={{marginTop: 0}}>Timer</h1>
            <CircularProgressbar className={"timer__progress"} value={percentage} text={minutes + ":" + seconds} styles={buildStyles({
                textColor: colors.wheat,
                trailColor: colors.oldRose,
                pathColor: colors.wheat,
                strokeLinecap: 'butt',
                strokeWidth: 8
            })}/>
            <div style={{ marginTop : "20px" }}>
                {isPaused
                    ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false; console.log("Play clicked!");}} />
                    : <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true; console.log("Pause clicked!");}} />
                }
            </div>
            <p class="mode-info">{mode === "work" ? "Work" : "Take a Break"}</p>
            <p class="round-info">Round {round} of {timeData.rounds}</p>
        </div>
    )
}

export default Timer;