import { useState, useRef } from 'react'

export default function AddTask() {

    // creo variabili per input controllati e input non controllati
    const [taskTitle, setTaskTitle] = useState('')
    const descriptionRef = useRef()
    const statusRef = useRef()

    return (
        <div>
            <h2 className="font-semibold text-xl text-center mb-6 mt-10">Aggiungi Task</h2>
            <form>
                <label>
                    Nome Task:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)}
                    />
                </label>
                <label>
                    Descrizione:
                    <textarea ref={descriptionRef}></textarea>
                </label>
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