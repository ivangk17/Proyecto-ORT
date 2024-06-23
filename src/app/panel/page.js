"use client";
import { useEffect, useState } from "react";
import PublicacionesList from "./PublicacionesList";
import Paginado from "../Paginado";
import { useAuth } from "../../context/AuthContext";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


export default function PublicacionesNoValidadasPage() {
  const { token, user } = useAuth();
  const [publicaciones, setPublicaciones] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(-1);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
      return null;
    } 

    const role = JSON.parse(user).role;
    if (role !== 'admin') {
        window.location.href = '/';
        return null;
    }

    if(token){
      fetchPublicaciones();
    }
    
  }, [page, pageSize]);

  const fetchPublicaciones = () => {
    fetch(`http://localhost:3000/api/publicaciones/noValidas?page=${page}&pageSize=${pageSize}`,
     {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    })
    .then((response) => response.json())
    .then((data) => {
      setPublicaciones(data.publicaciones);
      setTotal(data.total);
    })
    .catch((error) => console.error('Error fetching publications:', error));
  };

  const handleValidate = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de validar esta publicación como correcta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, validar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
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
          .then(() => {
            fetchPublicaciones();
            Swal.fire({
              icon: 'success',
              title: '¡Validación exitosa!',
              text: 'La publicación ha sido validada correctamente.',
              confirmButtonText: 'Aceptar'
            });
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al validar la publicación.',
              confirmButtonText: 'Aceptar'
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se ha validado la publicación.',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  };
  const handleReject = async (publicacionId) => {
    const { value: razon } = await Swal.fire({
        title: 'Ingrese la Razón de Rechazo',
        input: 'textarea',
        inputLabel: 'Razón',
        inputPlaceholder: 'Escriba la razón de rechazo...',
        inputAttributes: {
            'aria-label': 'Razón de rechazo'
        },
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (razon) => {
            if (!razon) {
                Swal.showValidationMessage('Debe ingresar una razón de rechazo');
            }
            return razon;
        },
        allowOutsideClick: () => !Swal.isLoading()
    });

    if (razon) {
        try {
            const response = await fetch(`http://localhost:3000/api/publicaciones/rechazar/${publicacionId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body:JSON.stringify({reason:razon})    
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Publicación Rechazada',
                    text: 'La publicación ha sido rechazada correctamente.',
                    confirmButtonText: 'Aceptar'
                })
                .then(() => {
                  fetchPublicaciones();
              });
            } else {
                throw new Error('Error en el rechazo de la publicación');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al intentar rechazar la publicación. Inténtelo de nuevo más tarde.',
                confirmButtonText: 'Aceptar'
            });
        }
    }
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