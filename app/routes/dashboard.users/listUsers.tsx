import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUsers } from "~/funciones/data";
import { Link } from "@remix-run/react";

// Importa los íconos de Tailwind Heroicons
import {
  MagnifyingGlassIcon,
  PencilIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

export default function Crud() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const usersList = await getUsers();
        setUsers(usersList || []);
        setFilteredUsers(usersList || []);
      } catch (error) {
        toast.error("Error al cargar usuarios");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Filtrar usuarios por búsqueda
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reiniciar la paginación al buscar
  }, [search, users]);

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-gray-600 text-lg animate-pulse">
          Cargando usuarios...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Lista de Usuarios
        </h2>
        <Link
          to="#"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          <UserPlusIcon className="h-5 w-5" /> Crear Usuario
        </Link>
      </div>

      {/* Buscador */}
      {/* <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-3 text-gray-400" />
      </div> */}

      {/* Tabla de Usuarios */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full text-gray-800">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Fecha de Creación</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr
                  key={user?.id ?? -1}
                  className="hover:bg-gray-100 transition-all"
                >
                  <td className="px-6 py-4">{user?.name ?? "Sin nombre"}</td>
                  <td className="px-6 py-4">
                    {user?.email ?? "Email no visible"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user?.created ?? "").toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                      <PencilIcon className="h-5 w-5" /> Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-gray-700 font-semibold">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
