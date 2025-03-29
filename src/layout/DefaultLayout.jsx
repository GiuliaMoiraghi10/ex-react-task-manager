import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function Defaultlayout() {
    return (
        <main>
            <NavBar />
            <Outlet />
        </main>
    )
}