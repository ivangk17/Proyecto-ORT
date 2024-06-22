"use client";
import { useEffect, useState } from "react";
import Publicacion from "./Publicacion";

export default function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(0);

  const user = sessionStorage.getItem('user');
  if (!user) {
      window.location.href = '/login';
      return null;
  } 

  const role = JSON.parse(user).role;
  if (role !== 'admin') {
      window.location.href = '/';
      return null;
  }

  useEffect(() => {
    fetchPublicaciones();
  }, [page, pageSize]);

  const fetchPublicaciones = () => {
    fetch(`http://localhost:3000/api/publicaciones/noValidas?page=${page}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setPublicaciones(data.publicaciones);
        setTotal(data.total);
      });
  };

  const handleValidate = (id) => {
    const token = sessionStorage.getItem('token');
  
    fetch(`http://localhost:3000/api/publicaciones/validar/${id}`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => fetchPublicaciones())
      .catch(error => console.error('Error:', error));
  };

  const handleReject = (id) => {
    const token = sessionStorage.getItem('token');

    fetch(`http://localhost:3000/api/publicaciones/rechazar/${id}`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => fetchPublicaciones())
      .catch(error => console.error('Error:', error));
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div
      className="min-h-screen flex flex-col justify-between mx-auto max-w-screen-xl bg-center bg-no-repeat overflow-hidden relative"
      style={{
        backgroundImage: `url('/img/eduwave_login.jpg')`,
        backgroundSize: "cover",
      }}
    >
      {total === 0 ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex bg-blue-900 h-20 text-center items-center">
            <h1 className="text-5xl text-white p-5">
              <strong>
                No hay publicaciones por validar.
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
                    id={publicacion['_id']}
                    name={publicacion.username}
                    materias={publicacion.materias}
                    description={publicacion.description}
                    precio={publicacion.precio}
                    telefono={publicacion.telefono}
                    onValidate={handleValidate}
                    onReject={handleReject}
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