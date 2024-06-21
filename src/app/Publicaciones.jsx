"use client";
import { useEffect, useState } from "react";
import Publicacion from "./Publicacion";

export default function Publicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9); // Ajusta a 6 por página
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/api/publicaciones/validas?page=${page}&pageSize=${pageSize}`)
            .then((response) => response.json())
            .then((data) => {
                setPublicaciones(data.publicaciones);
                setTotal(data.total);
            });
    }, [page, pageSize]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="min-h-screen flex flex-col justify-between mx-auto max-w-screen-xl bg-center bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: `url('/img/eduwave_login.jpg')`,
                backgroundSize: "cover",
            }}
        >
            <div className="container mx-auto p-6 rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {publicaciones.map((publicacion, index) => (
                        <div key={index} className="min-h-full">
                            <Publicacion 
                                name={publicacion.username}
                                materias={publicacion.materias}
                                description={publicacion.description}
                                precio={publicacion.precio}
                                telefono={publicacion.telefono}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex justify-between bg-white py-4 px-6 w-full">
                <button 
                    onClick={() => setPage(page => Math.max(page - 1, 1))}
                    disabled={page === 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Anterior
                </button>
                <span>Página {page} de {totalPages}</span>
                <button 
                    onClick={() => setPage(page => Math.min(page + 1, totalPages))}
                    disabled={page === totalPages}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
