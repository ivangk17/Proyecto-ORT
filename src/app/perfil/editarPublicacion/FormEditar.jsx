import Select from 'react-select';
import { options } from '../publicar/mockOptions';

export default function FormEditar({ handleSubmit, handleInputChange, handleChange, formData, selectedOptions }) {
    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="relative">
                <div className="flex space-x-4">
                    <input
                        name="telefono"
                        type="text"
                        className="w-1/2 rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                        placeholder="Teléfono celular"
                        pattern="^\+?\d{0,4}?\s?\d{10}$"
                        title="Por favor ingresa un número de teléfono válido. Debe comenzar con un signo + y contener al menos 10 dígitos."
                        required
                        value={formData.telefono}
                        onChange={handleInputChange}
                    />
                    <input
                        name="precio"
                        type="number"
                        className="w-1/2 rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                        placeholder="Precio de sus clases"
                        min="100"
                        step="50"
                        title="Por favor ingresa un precio válido."
                        required
                        value={formData.precio}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="relative">
                <textarea
                    name="description"
                    className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                    placeholder="Ingresa una breve descripción de sus servicios"
                    rows="5"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>
            <div className="relative">
                <Select
                    name="materias"
                    isMulti
                    value={selectedOptions}
                    onChange={handleChange}
                    options={options}
                    className="w-full"
                    placeholder="Selecciona tus opciones"
                    required
                /> 
            </div>

            <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
                Editar
            </button>
        </form>
    );
}