import { useState, useRef } from 'react'
import Modal from './Modal'

export default function EditTaskModal({ show, onClose, task, onSave }) {

    // variabile per prendere la task da modificare
    // editedTask è inizialmente = alla task da modificare data in pasto alla modale
    const [editedTask, setEditedTask] = useState(task)

    // variabile per modificare la task data in pasto alla modale
    // prende la chiave e l'evento degli input
    const changeEditedTask = (key, event) => {
        setEditedTask(prevTask => ({ ...prevTask, [key]: event.target.value }))
    }

    // funzione per form - useRef
    const editFormRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        onSave(editedTask)
    }

    return (
        <Modal
            title='Modifica Task'
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <label>
                        Nome Task:
                        <input
                            type='text'
                            value={editedTask.title}
                            onChange={e => changeEditedTask('title', e)}
                        />
                    </label>
                    <label>
                        Descrizione:
                        <textarea
                            value={editedTask.description}
                            onChange={e => changeEditedTask('description', e)}
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            value={editedTask.status}
                            onChange={e => changeEditedTask('status', e)}
                        >
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </form>
            }
            confirmText='Salva'
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )

}