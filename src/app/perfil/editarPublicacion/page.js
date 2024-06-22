"use client";

import Select from 'react-select';
import { useState, useEffect } from 'react';
import { options } from '../publicar/select/options';

export default function PageEditar() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [materiasSeleccionadas, setMaterias] = useState([]);
    const [publicacionId, setPublicacionId] = useState();
    const [formData, setFormData] = useState({
        telefono: '',
        precio: '',
        description: ''
    });
    const [validacionCompleta, setValidacionCompleta] = useState(false);

    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.href = '/login';
        return null;
    } 

    const role = JSON.parse(user).role;
    if (role !== 'profesor') {
        window.location.href = '/';
        return null;
    }

    const token = sessionStorage.getItem('token');
    const userId = JSON.parse(user)['_id'];

    useEffect(() => {
        const fetchPublicacion = async () => {
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

        fetchPublicacion();
    }, [userId, token]);

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

    const handleSubmit  = async (event) => {
        event.preventDefault();
        const publicacion = {
            _id: publicacionId,
            telefono: formData.telefono,
            precio: formData.precio,
            description: formData.description,
            materias: materiasSeleccionadas
        };
        try {
            const response = await fetch(`http://localhost:3000/api/publicaciones/${publicacionId}/update`, {
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
        <>
            <div className="mx-auto max-w-screen-xl h-screen flex items-center justify-center bg-center bg-no-repeat" 
                style={{ 
                    backgroundImage: `url('/img/eduwave_login.jpg')`
                }}>
                <div className="mx-auto max-w-lg bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Editar</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Ingresa los datos solicitados para empezar a publicar.
                        <br />
                        Recorda que una vez editada tu publicación, se hará visible cuando un administrador la valide
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="relative">
                            <div className="flex space-x-4">
                                <input
                                    name="telefono"
                                    type="text"
                                    className="w-1/2 rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                                    placeholder="Teléfono celular"
                                    pattern="^\+?\d{0,4}?\s?\d{10}$"
                                    title="Por favor ingresa un número de teléfono válido. Debe comenzar con un signo + y contener al menos 10 dígitos."
                                    required
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                />
                                <input
                                    name="precio"
                                    type="number"
                                    className="w-1/2 rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                                    placeholder="Precio de sus clases"
                                    min="100"
                                    step="50"
                                    title="Por favor ingresa un precio válido."
                                    required
                                    value={formData.precio}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <textarea
                                name="description"
                                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                                placeholder="Ingresa una breve descripción de sus servicios"
                                rows="5"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="relative">
                            <Select
                                name="materias"
                                isMulti
                                value={selectedOptions}
                                onChange={handleChange}
                                options={options}
                                className="w-full"
                                placeholder="Selecciona tus opciones"
                            /> 
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Editar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
