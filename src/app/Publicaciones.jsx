"use client";
import { useEffect, useState } from "react";
import Publicacion from "./Publicacion";
import Select from "react-select";
import { options } from "./perfil/publicar/select/options";

export default function Publicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9); // Ajusta a 9 por página
    const [total, setTotal] = useState(0);
    const [materia, setMateria] = useState(""); // Estado para la materia

    useEffect(() => {
        fetch(`http://localhost:3000/api/publicaciones/validas?page=${page}&pageSize=${pageSize}&materia=${materia}`)
            .then((response) => response.json())
            .then((data) => {
                setPublicaciones(data.publicaciones);
                setTotal(data.total);
            });
    }, [page, pageSize, materia]);

    const totalPages = Math.ceil(total / pageSize);

    const handleMateriaChange = (selectedOption) => {
        setMateria(selectedOption ? selectedOption.value : "");
        setPage(1); // Reiniciar a la primera página cuando se cambia la materia
    };

    return (
        <div 
            className="min-h-screen flex flex-col justify-between mx-auto max-w-screen-xl bg-center bg-no-repeat overflow-hidden relative"
            style={{
                backgroundImage: `url('/img/eduwave_login.jpg')`,
                backgroundSize: "cover",
            }}
        >
            <div className="flex justify-end mt-5 mr-5">
                <div className="w-1/5">
                    <Select
                        onChange={handleMateriaChange}
                        options={options}
                        className="w-full"
                        placeholder="Filtrar por materia"
                        isClearable
                    />
                </div>
            </div>
        {total === 0 ? (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex bg-blue-900 h-20 text-center items-center">
                    <h1 className="text-5xl text-white p-5">      
                        <strong>
                            No hay publicaciones para la materia seleccionada
                        </strong>
                    </h1>
                </div>
            </div>
        ) : (
            <>
                <div className="container mx-auto p-6 rounded-lg shadow-lg overflow-hidden flex-grow">

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
                <div 
                    className="flex justify-between bg-white py-4 px-6 w-full absolute bottom-5"
                    style={{ backgroundColor: 'rgba(100, 100, 255, 0.8)' }} // Fondo semitransparente
                >
                    <button 
                        onClick={() => setPage(page => Math.max(page - 1, 1))}
                        disabled={page === 1}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Anterior
                    </button>
                    <span className="text-white">
                        <strong>
                            Página {page} de {totalPages}
                        </strong>
                    </span>
                    <button 
                        onClick={() => setPage(page => Math.min(page + 1, totalPages))}
                        disabled={page === totalPages}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Siguiente
                    </button>
                </div>
            </>
        )}
        </div>
    );
}
