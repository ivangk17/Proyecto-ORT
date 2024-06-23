"use client";
import { useState } from 'react';
import { handlerPublicar, tienePublicacion } from './handlerPublicar';
import FormPublicar from './FormPublicar'
import { useAuth } from '../../../context/AuthContext';

export default function PagePublicar() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [materiasSeleccionadas, setMaterias] = useState([]);
    const {token, user} = useAuth();

    if (!user) {
        window.location.href = '/login';
        return null;
    }

    const role = JSON.parse(user).role;
    if (role !== 'profesor') {
        window.location.href = '/';
        return null;
    }

    const userId = JSON.parse(user)['_id'];

    tienePublicacion(userId);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
        const materias = selected.map(option => option.value);
        setMaterias(materias);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const publicacion = {
            user_id: userId,
            telefono: formData.get("telefono"),
            precio: formData.get("precio"),
            description: formData.get("description"),
            materias: materiasSeleccionadas
        };
        await handlerPublicar(publicacion, token);
    };

    return (
        <div 
            className="min-h-screen flex flex-col flex items-center justify-center mx-auto max-w-screen-xl bg-center bg-no-repeat overflow-hidden relative"
            style={{
                backgroundImage: `url('/img/eduwave_login.jpg')`,
                backgroundSize: "cover",
            }}
        >
            <div className="mx-auto max-w-lg bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Publicar</h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Ingresa los datos solicitados para empezar a publicar.
                    <br />
                    Recuerda que tu publicación será visible cuando un administrador la valide
                </p>

                <FormPublicar
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    selectedOptions={selectedOptions}
                />
            </div>
        </div>
    );
}