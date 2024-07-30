import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(); //il cambiamento di ref a differenza dello state non provoca la riesecuzione del codice del componente
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

  if(timeRemaining <= 0){
    dialog.current.open(); //si riferisce al metodo showModal() definito all'interno del componente resultModal
    clearInterval(timer.current);
  }

  function handleStart() {
    timer.current = setInterval(() => {// grazie ad interval otterremo quanto tempo manca allo stop
        setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
    }, 10);
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
    <ResultModal ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} result={"Lost"} onReset={handleReset}/> {/*Di default dialog è invisibile quindi non serve il condiz.*/}
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Timer is running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
