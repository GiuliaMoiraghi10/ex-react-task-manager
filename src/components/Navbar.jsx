import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div>
            <nav>
                <NavLink to='/tasks'>Home</NavLink>
                <NavLink to='add-task'>Add Task</NavLink>
            </nav>
        </div>
    )
}