import { Link, type MetaFunction } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useAuthStore } from "~/store/authStore";
import { toast } from "react-hot-toast";

export const meta: MetaFunction = () => {
  return [
    { title: "Perfil" },
    { name: "description", content: "Perfil de usuario" },
  ];
};

export default function Profile() {
  const { user, token, isAuthenticated, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      window.location.href = "/auth/login";
      return;
    }

    const verifyToken = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pocketbase.nxgen.dev/api/collections/users/auth-refresh",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Token inválido");
        }

        const data = await response.json();
        useAuthStore.setState({
          token: data.token,
          isAuthenticated: true,
        });
      } catch (error) {
        toast.error("La sesión ha expirado");
        logout();
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, isAuthenticated, logout]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-black text-lg">Cargando perfil...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-black text-lg">
          No autenticado. Redirigiendo a login...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={
                `https://pocketbase.nxgen.dev/api/files/_pb_users_auth_/${user.id}/${user.avatar}?token=${token}` ||
                "/img/cat-login.jpg"
              }
              alt={user.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {user.name || "Usuario"}
              </h1>
              <p className="text-blue-300">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
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
                <span className="text-blue-300">Usuario:</span> {user.name}
              </p>
              <p>
                <span className="text-blue-300">Email:</span> {user.email}
              </p>
              <p>
                <span className="text-blue-300">Creado:</span>{" "}
                {new Date(user.created).toLocaleDateString()}
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
  );
}
