import { useState, useRef } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState('');
  const nameInput = useRef();

  function handleClick(){
    setPlayerName(nameInput.current.value)
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity' }</h2> {/* shortcut, se true output quel valore altrimenti unknown entity */}
      <p>
        <input ref={nameInput} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
