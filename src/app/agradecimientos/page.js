import React from "react";
import Link from "next/link";
import Image from "next/image";

const developers = [
  {
    name: "Rodolfo Hugo Conci",
    image: "/img/rodo.png",
    description:
      "Rodolfo, CEO y Fundador, se encargó de la arquitectura inicial del proyecto y contribuyó tanto en el frontend como en el backend, estableciendo las bases para el desarrollo posterior.",
    linkedin: "https://www.linkedin.com/in/rodolfo-hugo-conci/",
  },
  {
    name: "Heber Moises Penayo Tescione",
    image: "/img/heber.png",
    description:
      "Heber trabajó en la implementación tanto del backend como del frontend, creando APIs robustas y asegurando una comunicación eficiente entre ambas partes.",
    linkedin: "https://www.linkedin.com/in/hebertescione/",
  },
  {
    name: "Ivan Gabriel Kraselnik",
    image: "/img/ivancin.png",
    description:
      "Ivan se dedicó al desarrollo del frontend, asegurando una experiencia de usuario fluida y responsiva.",
    linkedin: "https://www.linkedin.com/in/ivan-gabriel-kraselnik/",
  },
  {
    name: "Ignacio Parejo",
    image: "/img/nachito.png",
    description:
      "Ignacio se encargó de las pruebas y la calidad del software, asegurando que cada funcionalidad cumpla con los estándares requeridos.",
    linkedin: "https://www.linkedin.com/in/ignacioparejo/",
  },
  {
    name: "Matias Rinaldi",
    image: "/img/nano.png",
    description:
      "Matias trabajó en la documentación y la implementación de mejoras continuas basadas en el feedback del equipo y los usuarios.",
    linkedin: "https://www.linkedin.com/in/matias-rinaldi/",
  },
];

export default function Agradecimientos() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl font-bold mb-8">Agradecimientos</h1>
        <p className="text-lg mb-8">
          Este proyecto no habría sido posible sin el esfuerzo y la dedicación
          de nuestro increíble equipo de desarrolladores. Aquí están las
          personas que hicieron esto posible:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((dev, index) => (
            <Link
              href={dev.linkedin}
              className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform"
              target="_blank"
            >
              <div key={index}>
                <Image
                  src={dev.image}
                  alt={dev.name}
                  width={100}
                  height={100}
                  className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-purple-600"
                />
                <h2 className="text-xl font-semibold mb-2 text-purple-600">
                  {dev.name}
                </h2>
                <p className="text-gray-700">{dev.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
