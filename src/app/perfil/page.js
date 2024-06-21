"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
export default function PageUsuario() {
  const [publication, setPublication] = useState(null);
  
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

  useEffect(() => {

    const userId = JSON.parse(user)['_id'];
    console.log(userId);

    if (!userId) {
      window.location.href = '/login';
      return;
    }

    fetch(`http://localhost:3000/api/publicaciones/byUser/${userId}`)
      .then(response => response.json())
      .then(data => 
      setPublication(data))
      .catch(error => console.error('Error fetching publication:', error));
  }, []); 
  return (
    <div className="mx-auto max-w-screen-xl h-screen flex items-center justify-center bg-center bg-no-repeat" 
     style={{ backgroundImage: "url('/img/eduwave_login.jpg')" }}> 
    {publication ? (
        <div className="bg-blue-900 text-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col md:flex-row items-center md:items-start">
            <div className="flex-shrink-0">
                <Image
                    src="/img/profesor.jpg"
                    alt="profesor"
                    width={100}
                    height={100}
                    className="rounded-full"
                />
            </div>
            <div className="ml-4 flex-grow">
                <h2 className="text-xl font-bold">{publication.name}</h2>
                <p className="mt-2">{publication.description}</p>
                <p className="mt-2">Precio: ${publication.precio}</p>
                <p className="mt-2">Teléfono: {publication.telefono}</p>
                <h3 className="mt-4 font-semibold">Materias</h3>
                <div className="flex flex-wrap">
                    {publication.materias.map((materia, index) => (
                        <span key={index} className="bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mt-2">{materia}</span>
                    ))}
                </div>
                <div className="mt-4 flex">
                    <a href={`/`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2">Editar</a>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <p>No tiene publicaciones.</p>
            <button>Botón</button> 
        </div>
    )}
</div>
  );
}