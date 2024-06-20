import { redirect } from "next/navigation";

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
        console.log("ok");
        window.location.href = "/login";
      } else {
        // Registro fallido, manejar el error
        setError("Error al registrar usuario.");
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      setError("Error en la solicitud de registro. Inténtelo de nuevo más tarde.");
    }
  };