import React from 'react';

export default function QuienesSomos() {
  return (
    <div className="mx-auto max-w-screen-xl h-screen flex items-center justify-center bg-center bg-no-repeat overflow-hidden" 
    style={{ 
        backgroundImage: `url('/img/eduwave_login.jpg')`
    }}>
    <div className="container mx-auto p-4 max-w-full w-full">
        <div className="section mb-10 max-w-3xl w-full mx-auto bg-white bg-opacity-90 p-6 rounded-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">¿Quiénes Somos?</h1>
            <div className="copete text-lg text-gray-600">
                <p>
                    En <strong>Eduwave</strong> estamos comprometidos a redefinir la educación mediante una plataforma que combine tecnología de vanguardia con un enfoque centrado en el estudiante. Nuestro objetivo es inspirar el amor por el aprendizaje, capacitando a individuos para que alcancen su máximo potencial y se conviertan en líderes del mañana.
                </p>
                <br />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">¿Por qué elegirnos?</h1>
                <div className="space-y-2">
                    <p>
                        <strong>Compromiso con la Excelencia Educativa</strong>
                    </p>
                    <p>
                        <strong>Innovación Constante</strong>
                    </p>
                    <p>
                        <strong>Accesibilidad y Flexibilidad</strong>
                    </p>
                    <p>
                        <strong>Apoyo y Comunidad</strong>
                    </p>
                </div>
                <br />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Contáctanos</h1>
                <p>eduwave-edu@edu.com</p>
            </div>
        </div>
    </div>
</div>



    
  );
}