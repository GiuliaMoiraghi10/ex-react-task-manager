import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function Defaultlayout() {
    return (
        <main className="min-h-screen min-w-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
            <NavBar />
            <Outlet />
        </main>
    )
}