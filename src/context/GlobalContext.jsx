import { createContext, useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    // creo stato per le task
    const [tasks, setTasks] = useState([])

    // faccio il fetch per prendere le task da URL
    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error))
    }, [])

    // ritorno tutto il global context con tutte le prop che voglio vedere nelle altre pagine (disponibili per tutti i children)
    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    )
}