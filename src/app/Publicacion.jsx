import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from 'react-icons/fa';

export default function Publicacion(props) {
  return (
    <div className="bg-blue-900 text-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col justify-between">
      <div className="flex items-center">
        <Image
          src="/img/profesor.jpg"
          alt="profesor"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-sm font-bold">{props.name}</h2>
          <p className="text-xs mt-2">{props.description}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Materias</h3>
        <div className="flex flex-wrap">
          {props.materias.map((materia, index) => (
            <span
              key={index}
              className="bg-blue-700 px-3 py-1 text-xs font-semibold text-white mr-2 mt-2"
            >
              {materia}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-3">
          <div>
            <span className="text-sm font-semibold">Honorarios: ${props.precio}</span>
          </div>
          <Link
            target="_blank"
            href={`https://web.whatsapp.com/send?phone=${props.telefono}&text=Hola ${props.name}, vi tu publicación en EduWave y me gustaría saber más sobre tus clases`}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-xs flex items-center"
          >
            <FaWhatsapp size={10} />
            <span className="ml-1">Enviar WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
