

export async function handlerPublicar (publicacion, token) {
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

        window.location.href = "/perfil";
        console.log("entro ok");

      } else {
        // Registro fallido, manejar el error
       /*  setError("Error al registrar usuario."); */
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      /* setError("Error en la solicitud de registro. Inténtelo de nuevo más tarde."); */
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