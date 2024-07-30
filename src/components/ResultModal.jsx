import { forwardRef, useRef, useImperativeHandle } from "react"
/* per usare forwardRef va passato come argomento la funzione con le props e dopo la virgola il secondo argomento sarà ref
 usiamo questi passaggi per non usare la prop open sul <dialog> perchè non metterebbe in primo piano il modale come vorremmo
 a livello di stile css, eseguiamo invece il metodo showModal() nel componente padre grazie a useRef() */
 const ResultModal = forwardRef(function ({targetTime, timeRemaining, onReset}, ref) {
    const dialog = useRef(); //per staccare dall'altro componente questo facciamo riferimento a questo ref all'interno del nostro
    const userLost = timeRemaining <= 0;
    const formattedRemainingTime = (timeRemaining/1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100 );

// definisce una collezione di metodi da esporre al componente esterno, così da chiamarli fuori. Come farebbe un API.
    useImperativeHandle(ref, () => { 
        return{
            open() {
                dialog.current.showModal();//se fuori chiamo open si applicherà showModal
            }
        }
    })

    return(
        <dialog className="result-modal" ref={dialog} onClose={onReset}> {/* l'onClose va messo per chi preme ESC altrimenti non resetto  */}
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your Score: {score} / 100</h2>}
            <p>Target time was: <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}> {/*All'interno di un dialog un bottone che submitta un form con questo metodo lo chiude*/}
                <button>Close</button>
            </form>
        </dialog>
    )
})

export default ResultModal;