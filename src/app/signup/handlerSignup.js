import { redirect } from "next/navigation";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export async function handlerSignup (nuevoUsuario, setError) {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.status === 200) {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Tu cuenta ha sido registrada correctamente.',
          icon: 'success',
          confirmButtonText: 'Ir al login',
        }).then(() => {
          window.location.href = "/login";
        });
      } else {
        setError("Error al registrar usuario.");
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      setError("Error en la solicitud de registro. Inténtelo de nuevo más tarde.");
    }
  };