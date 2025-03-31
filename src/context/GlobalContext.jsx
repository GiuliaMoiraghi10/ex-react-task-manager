import { createContext } from "react";
import useTasks from "../hooks/useTasks";

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const taskData = useTasks() // creo variabile che racchiude tutte le operazioni fatte con le task dentro useTasks.js

    // ritorno tutto il global context con tutte le prop che voglio vedere nelle altre pagine (disponibili per tutti i children)
    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    )
}