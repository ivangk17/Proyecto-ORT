
import React from 'react';
const faqs = [

    {
        pregunta: "¿Cómo encuentro un profesor adecuado para mí?",
        respuesta: "Puedes utilizar la herramienta de filtros en la sección 'Publicacion' y filtrar los resultados según la materia, nivel educativo, ubicación, precio y disponibilidad."
    },
    {
        pregunta: "¿Cuáles son las tarifas de los profesores?",
        respuesta: "Las tarifas varían según cada profesor. Puedes ver los precios en los perfiles de los profesores y elegir el que mejor se adapte a tu presupuesto."
    },
    
    {
        pregunta: "¿Cómo me registro como profesor en EduWave?",
        respuesta: "Para registrarte como profesor, haz clic en 'Registro' y listo solo tienes que completa el formulario con tu información."
    },

    {
        pregunta: "¿Puedo fijar mis propias tarifas?",
        respuesta: "Sí, como profesor, puedes establecer tus propias tarifas basadas en tu experiencia, especialización y nivel educativo que ofreces."
    },

    {
        pregunta: "¿Cómo contacto con el soporte de EduWave?",
        respuesta: "Puedes ponerte en contacto con nuestro equipo de soporte a través de la sección 'Contacto' en nuestra página web o enviando un correo a soporte@eduwave.com."
    },
    {
        pregunta: "¿Qué medidas de seguridad toma EduWave para proteger mis datos?",
        respuesta: "Tomamos muy en serio la seguridad de tus datos. Utilizamos encriptación SSL y otras medidas de seguridad para proteger tu información personal y financiera."
    },
    {
        pregunta: "¿Qué debo hacer si tengo un problema con un profesor o estudiante?",
        respuesta: "Si tienes algún problema, puedes reportarlo a nuestro equipo de soporte a través de la sección 'Contacto'. Investigaremos el problema y tomaremos las medidas adecuadas para resolverlo."
    }
];


export default function Faq() {
  return (
    <div
      className="min-h-screen flex flex-col justify-between mx-auto max-w-screen-xl bg-center bg-no-repeat overflow-hidden relative"
      style={{
        backgroundImage: `url('/img/eduwave_login.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto p-4 max-w-full w-full">
        <div className="section mb-10 max-w-3xl w-full mx-auto bg-white bg-opacity-75 p-6 rounded-lg">
          <div className="container mx-auto p-4 max-w-full w-full">
            <div className="-mx-4 flex flex-wrap justify-center">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
                  <span className="mb-2 block text-lg font-semibold text-primary">
                    FAQ
                  </span>
                  <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                    Alguna Pregunta?
                  </h2>
                  <p className="text-base text-body-color dark:text-dark-6">
                    Aquí encontrarás las preguntas más frecuentes que nuestros
                    usuarios nos hacen.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                      <h2 className="font-medium">{faq.pregunta}</h2>
                      <svg
                        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <p className="mt-4 px-4 leading-relaxed text-gray-700">
                      {faq.respuesta}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
