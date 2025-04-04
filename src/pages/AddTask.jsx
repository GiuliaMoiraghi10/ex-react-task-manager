import { useState, useRef, useMemo, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { Navigate, useNavigate } from 'react-router-dom'

// variabile con caratteri vietati per il titolo
const symbols = '"!@#$%^&*()-_=+[]{}|;:/,.<>?/`~"'

export default function AddTask() {

    const navigate = useNavigate()

    // prenso la funzione addTask dal GlobalContext
    const { addTask } = useContext(GlobalContext)

    // creo variabili per input controllati e input non controllati
    const [taskTitle, setTaskTitle] = useState('')
    const descriptionRef = useRef()
    const statusRef = useRef()

    // funzione per gestire gli errori
    // faccio useMemo per evitare stato aggiuntivo nell'useEffect
    // useMemo ricalcola ogni volta che cambia taskTitle
    const taskTitleError = useMemo(() => {
        if (!taskTitle.trim()) // se ritorna una stringa vuota
            return 'Il titolo della Task non può essere vuoto'
        if ([...taskTitle].some(char => symbols.includes(char))) // se il titolo contiene almeno uno dei caratteri speciali
            return 'Il titolo della Task non può contenere caratteri speciali'
        return '' // se non ci sono errori ritorna stringa vuota
    }, [taskTitle])

    // handleSubmit x evitare refresh del form
    const handleSubmit = async event => {
        event.preventDefault()

        // variabile per aggiungere nuova task dal form
        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        // stampo in console la nuova task
        // console.log('Nuova Task da aggiungere:', newTask)

        try {
            await addTask(newTask)
            alert('Task aggiunta con successo!')
            navigate('/tasks')
            setTaskTitle('') // resetto titolo della task
            descriptionRef.current.value = '' // resetto input non controllati
            statusRef.current.value = ''
        } catch (error) {
            alert("Errore durante l'aggiunta della task", error.message)
        }
    }

    return (
        <div>
            <h2 className="font-semibold text-xl text-center mb-6 mt-10">Aggiungi Task</h2>
            <form onSubmit={handleSubmit}>
                {/* Nome Task */}
                <label>
                    Nome Task:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)}
                    />
                </label>
                {/* se c'è un errore, lo mostro sotto l'input in rosso */}
                {taskTitleError && <p className='text-red-500 mb-3'>{taskTitleError}</p>}

                {/* Descrizione Task */}
                <label>
                    Descrizione:
                    <textarea ref={descriptionRef}></textarea>
                </label>

                {/* Stato Task */}
                <label>
                    Stato:
                    <select ref={statusRef}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>
                <button type='submit'>Aggiungi Task</button>
            </form>
        </div>
    )
}