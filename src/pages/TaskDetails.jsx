import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from '../components/Modal'
import EditTaskModal from "../components/EditTaskModal";


export default function TaskDetails() {
    // raccolgo gli id con useParams()
    const { id } = useParams()

    // prendo tutte le tasks da GlobalContext
    const { tasks, removeTask, updateTask } = useContext(GlobalContext)

    // prendo task singola tramite id preso graxie a useParams
    const task = tasks.find(task => task.id === parseInt(id)) // trasformo stringa in numero

    const navigate = useNavigate()

    // variabile per modale - inizialmente false perchè non si vede
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    // se non trovo la task tramite id (query utente), mi ritorna errore
    if (!task) {
        return (
            <h1 className="font-bold text-center text-2xl p-10">Task non trovata</h1>
        )
    }

    // funzione bottoni x eliminare e modificare
    const handleTaskDelete = async () => {
        // console.log('Elimina task con id:', task.id)
        try {
            await removeTask(task.id)
            alert('Task eliminata!')
            navigate('/tasks')
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleTaskUpdate = async updatedTask => {
        try {
            await updateTask(updatedTask)
            setShowEditModal(false)
            alert('Task modificata!')
            navigate('/tasks')
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }


    return (
        <>
            <h2 className="font-semibold text-xl text-center mb-6 mt-10">Dettaglio Task</h2>
            <div className="detail">
                <p className="mb-5"><strong className="text-pink-300">Nome:</strong> {task.title} </p>
                <p className="mb-5"><strong className="text-pink-300">Descrizione:</strong> {task.description} </p>
                <p className="mb-5"><strong className="text-pink-300">Stato:</strong> {task.status} </p>
                <p className="mb-5"><strong className="text-pink-300">Data creazione:</strong> {new Date(task.createdAt).toLocaleDateString()} </p>
                <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
                <button onClick={() => setShowEditModal(true)}>Modifica Task</button>


                {/* Modale di eliminazione */}
                <Modal
                    title='Conferma eliminazione'
                    content={<p>Elimini la task?</p>}
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleTaskDelete}
                    confirmText="Elimina"
                />

                {/* Modale di modifica task */}
                <EditTaskModal
                    task={task}
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleTaskUpdate}
                />
            </div>
        </>
    )
}