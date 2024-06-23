import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export async function handlerPublicar(publicacion, token) {
    try {
        const response = await fetch("http://localhost:3000/api/publicaciones/publicar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(publicacion),
        });

        if (response.status === 200) {
            Swal.fire({
                title: '¡Publicación Exitosa!',
                text: 'Tu publicación ha sido realizada correctamente, recuerde que la misma no se hara visible hasta tanto un administrador la valide.',
                icon: 'success',
                confirmButtonText: 'Ir a mi publicacion',
            }).then(() => {
                window.location.href = "/perfil";
            });
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Hubo un problema al publicar tu contenido. Inténtalo de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'Entendido',
            });
        }
    } catch (error) {
        console.error("Error en la solicitud de publicación:", error);
        Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema al intentar publicar. Inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Entendido',
        });
    }
};

  export async function tienePublicacion (userId) {
    try {
      const response = await fetch(`http://localhost:3000/api/publicaciones/byUser/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
    
        if (data) {
          window.location.href = "/perfil";
          return;
        }

      } else {
        console.error("Error: ", response.status, response.statusText);
      }
      
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      /* setError("Error en la solicitud de registro. Inténtelo de nuevo más tarde."); */
    }
  };