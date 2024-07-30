import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(); //il cambiamento di ref a differenza dello state non provoca la riesecuzione del codice del componente
  const dialog = useRef();
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      // useRef ritorna sempre un oggetto con una proprietà di nome current
      setTimerExpired(true);
      dialog.current.open(); //punta al metodo open che ho definito io dentro al componente con useImperativeHandle()
    }, targetTime * 1000);
    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
    setTimerStarted(false);
  }

  return (
    <>
    <ResultModal ref={dialog} targetTime={targetTime} result={"Lost"} /> {/*Di default dialog è invisibile quindi non serve il condiz.*/}
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerStarted ? "Timer is running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
