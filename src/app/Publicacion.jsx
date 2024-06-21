import Image from 'next/image';
//asda
export default function Publicacion(props) {
    return (
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
                <h2 className="text-xl font-bold">{props.name}</h2>
                <p className="mt-2">{props.description}</p>
                <h3 className="mt-4 font-semibold">Materias</h3>
                <div className="flex flex-wrap">
                    {props.materias.map((materia, index) => (
                        <span key={index} className="bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mt-2">{materia}</span>
                    ))}
                </div>
                <div className="mt-4 flex">
                    <a href={`tel:${props.telefono}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2">Contactar</a>
                </div>
            </div>
        </div>
    );
}
