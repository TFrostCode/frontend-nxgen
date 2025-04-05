export default function CreateUsers() {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Crear Usuario</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Ingresa el nombre del usuario"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Ingresa el correo electrónico"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Ingresa la contraseña"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    );
  }