import { Link, type MetaFunction } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { User } from "../models/user";

export const meta: MetaFunction = () => {
  return [
    { title: "Perfil" },
    { name: "description", content: "Perfil de usuario" },
  ];
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener datos del usuario del localStorage
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (!userData || !token) {
      window.location.href = "/login";
      return;
    }

    setUser(JSON.parse(userData));
    setLoading(false);

    // Opcional: Verificar el token con el servidor
    verifyToken(token);
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(
        "https://pocketbase.nxgen.dev/api/collections/users/auth-refresh",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Token inválido");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
    } catch (error) {
      console.error("Error verificando token:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src="/img/cat-login.jpg"
                alt="Perfil"
                className="w-20 h-20 rounded-full mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {user?.name || "Usuario"}
                </h1>
                <p className="text-blue-300">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
            >
              Cerrar sesión
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">
                Información personal
              </h2>
              <div className="space-y-3">
                <p>
                  <span className="text-blue-300">Usuario:</span>{" "}
                  {user?.name}
                </p>
                <p>
                  <span className="text-blue-300">Email:</span> {user?.email}
                </p>
                <p>
                  <span className="text-blue-300">Creado:</span>{" "}
                  {new Date(user?.created || "").toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">
                Configuración
              </h2>
              <div className="space-y-4">
                <Link
                  to="/change-password"
                  className="block text-blue-400 hover:text-blue-300"
                >
                  Cambiar contraseña
                </Link>
                <Link
                  to="/edit-profile"
                  className="block text-blue-400 hover:text-blue-300"
                >
                  Editar perfil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}