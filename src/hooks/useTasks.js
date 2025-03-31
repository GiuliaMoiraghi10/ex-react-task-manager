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
    const addTask = () => {

    }

    const removeTask = () => {

    }

    const updateTask = () => {

    }

    return { tasks, addTask, removeTask, updateTask } // mi ritorna la lista delle tasks
}

