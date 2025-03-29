import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="shadow-lg">
            <nav className="flex flex-wrap gap-8 px-5 py-5 bg-pink-500 text-white">
                <NavLink to='/tasks' className="hover:text-pink-900">Home</NavLink>
                <NavLink to='add-task' className="hover:text-pink-900">Add Task</NavLink>
            </nav>
        </div>
    )
}