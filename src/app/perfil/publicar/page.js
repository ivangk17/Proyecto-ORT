"use client";

import Select from 'react-select';
import { useState, useEffect } from 'react';
import { options } from './select/options';
import { handlerPublicar, tienePublicacion } from './publicarService/publicarServer';

export default function PagePublicar() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [materiasSeleccionadas, setMaterias] = useState([]);

    const user = sessionStorage.getItem('user');
    if (!user) {
      window.location.href = '/login';
      return;
    } 

    const role = JSON.parse(user).role;
    if (role !== 'profesor') {
      window.location.href = '/';
      return;
    }
    const token = sessionStorage.getItem('token');
    const userId = JSON.parse(user)['_id'];
    
    tienePublicacion(userId)



    const handleChange = (selected) => {
        setSelectedOptions(selected);
        const materias = selected.map(option => option.value); 
        setMaterias(materias);
    };

    const handleSubmit  = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const publicacion = {
            user_id: userId,
            telefono: formData.get("telefono"),
            precio: formData.get("precio"),
            description: formData.get("description"),
            materias: materiasSeleccionadas
        };
        console.log(token);
        await handlerPublicar(publicacion, token);
      };
   

    return(
        <>
        <div className="mx-auto max-w-screen-xl h-screen flex items-center justify-center bg-center bg-no-repeat" 
            style={{ 
                backgroundImage: `url('/img/eduwave_login.jpg')`
            }}>
            <div className="mx-auto max-w-lg bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Publicar</h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Ingresa los datos solicitados para empezar a publicar.
                    <br />
                    Recorda que tu publicación será visible cuando un administrador la valide
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
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <textarea
                            name="description"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            placeholder="Ingresa una breve descripción de sus servicios"
                            rows="5"
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
                        Publicar
                    </button>
                </form>
            </div>
        </div>

        </>
    );
}