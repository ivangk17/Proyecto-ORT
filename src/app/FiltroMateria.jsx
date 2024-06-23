import Select from "react-select";
import { options } from "./perfil/publicar/mockOptions";

export default function FiltroMateria({ handleMateriaChange }) {
    return (
        <div className="flex justify-end mt-3 mr-5">
            <div className="w-1/5">
                <Select
                    onChange={handleMateriaChange}
                    options={options}
                    className="w-full"
                    placeholder="Filtrar por materia"
                    isClearable
                />
            </div>
        </div>
    );
}