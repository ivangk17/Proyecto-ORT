import Publicacion from "./Publicacion";

export default function PublicacionesList(props) {
    return (
        <div className="container mx-auto p-6 rounded-lg shadow-lg overflow-hidden flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {props.publicaciones.map((publicacion, index) => (
                <div key={index} className="min-h-full">
                <Publicacion
                    id={publicacion['_id']}
                    name={publicacion.username}
                    materias={publicacion.materias}
                    description={publicacion.description}
                    precio={publicacion.precio}
                    telefono={publicacion.telefono}
                    onValidate={props.handleValidate}
                    onReject={props.handleReject}
                />
                </div>
            ))}
            </div>
        </div>
    );
}
