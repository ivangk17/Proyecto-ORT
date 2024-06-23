"use client";
import { useAuth } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';
import { options } from '../publicar/mockOptions';
import FormEditar from './FormEditar';

export default function PageEditar() {
    const { token, user } = useAuth();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [materiasSeleccionadas, setMaterias] = useState([]);
    const [publicacionId, setPublicacionId] = useState();
    const [formData, setFormData] = useState({
        telefono: '',
        precio: '',
        description: ''
    });
    const [validacionCompleta, setValidacionCompleta] = useState(false);

    

    

    useEffect(() => {

        if (!user) {
            window.location.href = '/login';
            return false;
        } 
    
        const role = JSON.parse(user).role;
        if (role !== 'profesor') {
            window.location.href = '/';
            return false;
        }
        
        fetchPublicacion();
    }, [token]);

    const fetchPublicacion = async () => {
        const userId = JSON.parse(user)['_id'];
        try {
            const response = await fetch(`http://localhost:3000/api/publicaciones/byUser/${userId}`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const publicacion = await response.json();
                if (publicacion.validate || publicacion.rejected) {
                    setFormData({
                        telefono: publicacion.telefono,
                        precio: publicacion.precio,
                        description: publicacion.description
                    });
                    const selected = options.filter(option => publicacion.materias.includes(option.value));
                    setSelectedOptions(selected);
                    setMaterias(publicacion.materias);
                    setPublicacionId(publicacion['_id']);
                    setValidacionCompleta(true); // Marcar la validación completa como verdadera
                } else {
                    window.location.href = '/perfil';
                }
            } else {
                window.location.href = '/perfil';
            }
        } catch (error) {
            console.error("Error fetching the publication:", error);
            window.location.href = '/perfil';
        }
    };

    const handleChange = (selected) => {
        setSelectedOptions(selected);
        const materias = selected.map(option => option.value); 
        setMaterias(materias);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const publicacion = {
            _id: publicacionId,
            telefono: formData.telefono,
            precio: formData.precio,
            description: formData.description,
            materias: materiasSeleccionadas
        };
        try {
            const response = await fetch(`http://localhost:3000/api/publicaciones/update/${publicacionId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(publicacion),
            });
            if(response.status === 200){
                window.location.href = '/perfil';
            }
        } catch (error) {
            console.error("Error en la solicitud de registro:", error);
        }
    };

    if (!validacionCompleta) {
        return null;
    }

    return (
        <div 
            className="min-h-screen flex flex-col flex items-center justify-center mx-auto max-w-screen-xl bg-center bg-no-repeat overflow-hidden relative"
            style={{
                backgroundImage: `url('/img/eduwave_login.jpg')`,
                backgroundSize: "cover",
            }}
        >
            <div className="mx-auto max-w-lg bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Editar</h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Ingresa los datos solicitados para empezar a publicar.
                    <br />
                    Recorda que una vez editada tu publicación, se hará visible cuando un administrador la valide
                </p>

                <FormEditar
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    handleChange={handleChange}
                    formData={formData}
                    selectedOptions={selectedOptions}
                />
            </div>
        </div>
    );
}