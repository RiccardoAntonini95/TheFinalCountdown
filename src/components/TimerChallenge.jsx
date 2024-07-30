import { useRef, useState } from "react"

export default function TimerChallenge({title, targetTime}){
    const timer = useRef(); //il cambiamento di ref a differenza dello state non provoca la riesecuzione del codice del componente
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);


    function handleStart() {
        timer.current = setTimeout(() => { // useRef ritorna sempre un oggetto con una proprietà di nome current
            setTimerExpired(true)
        }, targetTime * 1000)
        setTimerStarted(true)
    }

    function handleStop() {
        clearTimeout(timer.current);
        setTimerStarted(false)
    }

    return(
        <section className="challenge">
            <h2>{title}</h2>
            {timerExpired && <p>You Lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1? 's' : ''}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerStarted? 'active' : ''}>
               {timerStarted? 'Timer is running...' : 'Timer Inactive'}
            </p>

        </section>
    )
}