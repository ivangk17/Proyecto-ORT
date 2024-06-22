export default function Paginado({ page, totalPages, setPage }) {
    return (
        <div
            className="flex justify-between bg-white py-4 px-6 w-full absolute bottom-5"
            style={{ backgroundColor: 'rgba(100, 100, 255, 0.8)' }}
        >
            <button
                onClick={() => setPage(page => Math.max(page - 1, 1))}
                disabled={page === 1}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Anterior
            </button>
            <span className="text-white">
                <strong>
                    Página {page} de {totalPages}
                </strong>
            </span>
            <button
                onClick={() => setPage(page => Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Siguiente
            </button>
        </div>
    );
}