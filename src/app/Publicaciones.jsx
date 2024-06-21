"use client";
import { useEffect, useState } from "react";
import Publicacion from "./Publicacion";

export default function Publicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/publicaciones/validas")
            .then((response) => response.json())
            .then((data) => {
                setPublicaciones(data);
            });
    }, []);

    return (
        <div
            className="mx-auto max-w-screen-xl h-screen flex items-center justify-center bg-center bg-no-repeat overflow-hidden"
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
        </div>
    );
}
