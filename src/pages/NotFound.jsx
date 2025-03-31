import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <section className="min-h-full min-w-full">
            <div className="flex flex-col justify-center items-center p-20">
                <h2 className="text-2xl">404</h2>
                <strong>Pagina non trovata</strong>
                <Link to='/tasks' className="text-white bg-pink-300 p-2 mt-10 rounded-md">Torna alla home</Link>
            </div>
        </section>
    )
}