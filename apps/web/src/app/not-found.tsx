export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center px-4">
                <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Página no encontrada
                </h2>
                <p className="text-gray-500 mb-6">
                    La página que buscás no existe o fue movida.
                </p>
                <a
                    href="/"
                    className="inline-flex items-center bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
                >
                    Volver al inicio
                </a>
            </div>
        </div>
    );
}
