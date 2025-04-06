export default function Error403Page() {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700">
        <h1 className="text-6xl font-bold">403</h1>
        <p className="text-2xl mt-4">Acceso Denegado</p>
        <p className="text-gray-500 mt-2">No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }
  