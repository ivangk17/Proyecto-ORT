"use client";
import { useEffect, useState } from "react";
import PublicacionesList from "./PublicacionesList";
import Paginado from "../Paginado";

export default function PublicacionesNoValidadasPage() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(-1);

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
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-blue-900 h-20 text-center items-center flex">
              <h1 className="text-5xl text-white p-5">
                  <strong>
                      No hay publicaciones para validar.
                  </strong>
              </h1>
          </div>
      </div>
      ) : (
        <>
          <PublicacionesList 
            publicaciones={publicaciones}
            handleReject={handleReject}
            handleValidate={handleValidate}
          />
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