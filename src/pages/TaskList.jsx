import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow'

export default function TaskList() {

    // prendo task da GlobalContext
    const { tasks } = useContext(GlobalContext)
    console.log(tasks)

    return (
        <>
            <h2 className="font-semibold text-xl text-center mb-6 mt-10">Elenco Task</h2>
            <div className="flex justify-center">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Stato</th>
                            <th>Data creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks &&
                            tasks.map((task) => {
                                return <TaskRow key={task.id} task={task} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}