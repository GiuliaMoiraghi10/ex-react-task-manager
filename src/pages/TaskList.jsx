import { useContext, useState, useMemo, useCallback } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow'

// funzione di debounce
function debounce(callback, delay) {
    let timer
    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

export default function TaskList() {

    // prendo task da GlobalContext
    const { tasks } = useContext(GlobalContext)
    console.log(tasks)

    // state x ordinamento task
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)

    // creo variabile con icone per indicare ordine
    const sortIcon = sortOrder === 1 ? '⭣' : '⭡'

    // variabile di stato per ricerca task
    const [searchQuery, setSearchQuery] = useState('')

    // variabile per debounceSearch
    const debounceSearch = useCallback(debounce(setSearchQuery, 500), [])

    // funzione che prende campo e controlla se sortBy è uguale a stringa
    // se clicco sulla stessa colonna vado a fare un setSortOrder
    const handleSort = (campo) => {
        if (sortBy === campo) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(campo)
            setSortOrder(1)
        }
    }

    // funzione useMemo che ha come dipendenze tasks, sortBy e sortOrder.
    // ogni volta che cambiano, si renderizza
    const filteredAndSortedTasks = useMemo(() => {
        return [...tasks]
            .filter((task => task.title.toLowerCase().includes(searchQuery.toLowerCase())))
            .sort((a, b) => {
                let comparison

                if (sortBy === 'title') {
                    comparison = a.title.localeCompare(b.title)
                } else if (sortBy === 'status') {
                    const statusOptions = ['To do', 'Doing', 'Done']
                    const indexA = statusOptions.indexOf(a.status)
                    const indexB = statusOptions.indexOf(b.status)
                    comparison = indexA - indexB
                } else if (sortBy === 'createdAt') {
                    const dataA = new Date(a.createdAt).getTime()
                    const dataB = new Date(b.createdAt).getTime()
                    comparison = dataA - dataB
                }

                return comparison * sortOrder
            })

    }, [tasks, sortBy, sortOrder, searchQuery])


    return (
        <>
            <h2 className="font-semibold text-xl text-center mb-6 mt-10">Lista Task</h2>
            <div className="flex justify-center">
                <input
                    className='search'
                    type="text"
                    placeholder='Cerca una Task'
                    onChange={e => debounceSearch(e.target.value)}
                />
            </div>
            <div className="flex justify-center">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('title')}>Nome {sortBy === 'title' && sortIcon}</th>
                            <th onClick={() => handleSort('status')}>Stato {sortBy === 'status' && sortIcon}</th>
                            <th onClick={() => handleSort('createdAt')}>Data creazione {sortBy === 'createdAt' && sortIcon}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedTasks &&
                            filteredAndSortedTasks.map((task) => {
                                return <TaskRow key={task.id} task={task} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}