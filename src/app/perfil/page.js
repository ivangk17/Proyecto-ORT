"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
   <div className="bg-blue-900 text-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col items-center w-96">
     <div className="flex-shrink-0">
       <Image
         src="/img/profesor.jpg"
         alt="profesor"
         width={100}
         height={100}
         className="rounded-full"
       />
     </div>
     <div className="ml-4 flex-grow w-full">
       <p className="mt-2">{publication.description}</p>
       <p className="mt-2">Precio: ${publication.precio}</p>
       <p className="mt-2">Teléfono: {publication.telefono}</p>
       <h3 className="mt-4 font-semibold">Materias</h3>
       <div className="flex flex-wrap">
         {publication.materias && publication.materias.map((materia, index) => (
           <span key={index} className="bg-blue-700 px-3 py-1 text-xs font-semibold text-white mr-2 mt-2">
             {materia}
           </span>
         ))}
       </div>
       <div className="mt-4">
         {publication.validate ? (
           <div>
             <p className="text-green-500 mb-4 text-left">La publicación fue validada y ahora es visible para todos los usuarios.</p>
             <a href={`/`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
               Editar
             </a>
           </div>
         ) : publication.rejected ? (
           <div>
             <p className="text-red-500 mb-4 text-left">La publicación fue rechazada.</p>
             <a href={`/`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">
               Editar
             </a>
           </div>
         ) : publication.edited ? (
           <div>
             <p className="text-yellow-500 mb-4 text-left">La publicación fue editada y está siendo validada por los administradores.</p>
           </div>
         ) : (
           <p className="text-yellow-500 text-left">La publicación está siendo validada.</p>
         )}
       </div>
     </div>
   </div>
 ) : (
   <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-blue-100 w-96 h-auto">
     <div className="px-6 py-4">
       <div className="font-bold text-xl mb-2 overflow-ellipsis overflow-hidden whitespace-nowrap">
         No tiene ninguna publicación.
       </div>
       <p className="text-gray-700 text-base overflow-ellipsis overflow-hidden whitespace-nowrap">
         Actualmente no tiene ninguna publicación subida.
       </p>
     </div>
     <div className="px-6 pt-4 pb-2">
       <Link
         href={"/perfil/publicar"}
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       >
         Agregar publicación
       </Link>
     </div>
   </div>
 )}
</div>
  );
}