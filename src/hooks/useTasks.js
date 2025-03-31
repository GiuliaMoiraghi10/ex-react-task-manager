import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {

    // creo stato per le task
    const [tasks, setTasks] = useState([])

    // faccio il fetch per prendere le task da URL
    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error))
    }, [])

    // creo funzioni addTask, removeTask, updateTask

    // addTask - aggiunge una nuova task alla lista
    // la funzione prende in input un oggetto newTask e lo invia al server
    const addTask = async newTask => {
        const response = await fetch(`${VITE_API_URL}/tasks`, { // oltre a fetch passo un oggetto di configurazione
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask) // converto l'oggetto in stringa
        })

        const { success, message, task } = await response.json() // destrutturo la risposta in success, message e task
        if (!success) throw new Error(message) // se non va a buon fine lancia errore
        setTasks(prevTasks => [...prevTasks, task]) // aggiorna lo stato delle tasks
    }

    const removeTask = () => {

    }

    const updateTask = () => {

    }

    return { tasks, addTask, removeTask, updateTask } // mi ritorna la lista delle tasks
}

