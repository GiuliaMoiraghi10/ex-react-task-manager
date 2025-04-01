import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetails() {
    // raccolgo gli id con useParams()
    const { id } = useParams()

    // prendo tutte le tasks da GlobalContext
    const { tasks } = useContext(GlobalContext)

    // prendo task singola tramite id preso graxie a useParams
    const task = tasks.find(task => task.id === parseInt(id)) // trasformo stringa in numero

    // se non trovo la task tramite id (query utente), mi ritorna errore
    if (!task) {
        return (
            <h1 className="font-bold text-center text-2xl p-10">Task non trovata</h1>
        )
    }

    // funzione bottone
    const handleTaskDelete = () => {
        console.log('Elimina task con id:', task.id)
    }


    return (
        <>
            <h2 className="font-semibold text-xl text-center mb-6 mt-10">Dettaglio Task</h2>
            <div className="detail">
                <p className="mb-5"><strong className="text-pink-300">Nome:</strong> {task.title} </p>
                <p className="mb-5"><strong className="text-pink-300">Descrizione:</strong> {task.description} </p>
                <p className="mb-5"><strong className="text-pink-300">Stato:</strong> {task.status} </p>
                <p className="mb-5"><strong className="text-pink-300">Data creazione:</strong> {new Date(task.createdAt).toLocaleDateString()} </p>
                <button onClick={handleTaskDelete}>Elimina Task</button>
            </div>
        </>
    )
}