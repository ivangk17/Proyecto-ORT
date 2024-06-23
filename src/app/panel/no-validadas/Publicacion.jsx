import Image from 'next/image';

export default function Publicacion(props) {
  return (
    <div className="bg-blue-900 text-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col justify-between h-full">
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
        <div className="mt-4">
          {props.reason ? (
            <p className="text-xs text-red-500">Razon de rechazo: {props.reason}</p>
          ) : (
            <div className="flex justify-end items-center space-x-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => props.onValidate(props.id)}
              >
                Validar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => props.onReject(props.id)}
              >
                Rechazar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

