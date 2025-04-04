import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUsers} from "~/funciones/data"; // Asegúrate de importar la función createUser
import { Link } from "@remix-run/react";


export default function ListUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const usersList = await getUsers();
        setUsers(usersList || []);
      } catch (error) {
        toast.error("Error al cargar usuarios");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-lg">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Fecha de Creación</th>
                <th className="px-6 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user?.id??-1} className="hover:bg-gray-700 transition">
                    <td className="px-6 py-4">{user?.name??""}</td>
                    <td className="px-6 py-4">{user?.email ?? "Email no visible"}</td>
                    <td className="px-6 py-4">
                      {new Date(user?.created??"").toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        
        <Link to="">Crear Usuario</Link>
      </div>
      
    </div>
  );
}