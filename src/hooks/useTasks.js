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

    const removeTask = async taskId => {
        const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        })

        const { success, message } = await response.json()
        if (!success) throw new Error(message)
        setTasks(prev => prev.filter(task => task.id !== taskId)) // filtro le task in cui non ci sarà più quella che ho eliminato
    }

    const updateTask = async updatedTask => {
        const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, { // oltre a fetch passo un oggetto di configurazione
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask) // converto l'oggetto in stringa
        })

        const { success, message, task: newTask } = await response.json() // destrutturo la risposta in success, message e task
        if (!success) throw new Error(message) // se non va a buon fine lancia errore
        setTasks(prevTask => prevTask.map( // modifico task precedente con map in cui tutte le task restano uguali, tranne quella modificata che sarà una nuova task
            oldTask => oldTask.id === newTask.id ? newTask : oldTask)) // se id della oldTask è l'id nella newTask, ritorna la newTask, altrimenti ritorna la oldTask
    }

    return { tasks, addTask, removeTask, updateTask } // mi ritorna la lista delle tasks
}

