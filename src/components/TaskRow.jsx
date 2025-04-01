/* Questo componente rappresenta una sola riga della tabella
mostra le proprietà: title, status e createdAt (no description)
*/

import { memo } from 'react'
import { Link } from 'react-router-dom'

const TaskRow = memo(({ task }) => {

    // creo variabile x impostare classi colori allo status
    const statusClass = task.status.replace(" ", "").toLowerCase()

    return (
        <tr>
            <td><Link to={`/tasks/${task.id}`}>{task.title}</Link></td>
            <td className={statusClass}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
})

export default TaskRow


