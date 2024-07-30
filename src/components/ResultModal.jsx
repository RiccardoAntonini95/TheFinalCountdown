import { forwardRef } from "react"
// per usare forwardRef va passato come argomento la funzione con le props e dopo la virgola il secondo argomento sarà ref
//usiamo questi passaggi per non usare la prop open sul <dialog> perchè non metterebbe in primo piano il modale come vorremmo
// a livello di stile css, eseguiamo invece il metodo showModal() nel componente padre grazie a useRef()
 const ResultModal = forwardRef(function ({result, targetTime}, ref) {
    return(
        <dialog className="result-modal" ref={ref}> 
            <h2>You {result}</h2>
            <p>Target time was: <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>x seconds left.</strong></p>
            <form method="dialog"> {/*All'interno di un dialog un bottone che submitta un form con questo metodo lo chiude*/}
                <button>Close</button>
            </form>
        </dialog>
    )
})

export default ResultModal;