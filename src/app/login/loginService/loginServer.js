export async function handlerLogin(user, setInicio, setError, setToken, setUser) {

    const url = "http://localhost:3000/api/users/login";
  
    try {
      const request = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
  
      if (request.status === 200) {
        const response = (await request.json())
        const token = response.token;
        const usuario = response.user;
        setToken(token);
        setUser(JSON.stringify(usuario));
        
      } else {
        setError('Credenciales inválidas');
        console.error('Failed to authenticate', request.status);
      }
    } catch (error) {
      setError('Error al realizar la solicitud');
      console.error('Error al realizar la solicitud', error);
    } finally {
      setInicio(false);
    }
  }