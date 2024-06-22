"use client";
import { useEffect, useState } from "react";
import PublicacionesList from "./PublicacionesList";
import Paginado from "./Paginado";
import FiltroMateria from "./FiltroMateria";

export default function PublicacionesPage() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [total, setTotal] = useState(-1);
    const [materia, setMateria] = useState("");

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
        setPage(1);
    };

    return (
        <div
            className="min-h-screen flex flex-col justify-between mx-auto max-w-screen-xl bg-center bg-no-repeat overflow-hidden relative"
            style={{
                backgroundImage: `url('/img/eduwave_login.jpg')`,
                backgroundSize: "cover",
            }}
        >
            <FiltroMateria handleMateriaChange={handleMateriaChange} />
            {total === 0 ? (
            <div className="flex-grow flex items-center justify-center">
               <div className="bg-blue-900 h-20 text-center items-center flex">
                   <h1 className="text-5xl text-white p-5">
                       <strong>
                           No hay publicaciones para la materia seleccionada
                       </strong>
                   </h1>
               </div>
           </div>
            ) : (
                <>
                    <PublicacionesList publicaciones={publicaciones} />
                    <Paginado 
                        page={page} 
                        totalPages={totalPages} 
                        setPage={setPage} 
                    />
                </>
            )}
        </div>
    );
}
