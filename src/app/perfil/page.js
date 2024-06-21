"use client";
import React, { useState, useEffect } from 'react';

export default function PageUsuario() {
  const [publication, setPublication] = useState(null);

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem('user'))['_id']; 
    console.log(userId);

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
  <div>
    <p>Descripción: {publication.description}</p>

    <p>Precio: ${publication.precio}</p>
    <p>Teléfono: {publication.telefono}</p>
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