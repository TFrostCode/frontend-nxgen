import { Form, Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "~/store/authStore";

export const meta = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Página de inicio de sesión" },
  ];
};

export default function Login() {
  const [credentials, setCredentials] = useState({
    identity: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.dismiss();

    try {
      const loginPromise = fetch(
        "https://pocketbase.nxgen.dev/api/collections/users/auth-with-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      await toast.promise(
        loginPromise.then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Error de autenticación");
          }
          return data;
        }),
        {
          loading: "Verificando credenciales...",
          success: (data) => {
            login(data.token, data.record);
            setTimeout(() => navigate("/dashboard/index"), 1500);
            return "Inicio de sesión exitoso!";
          },
          error: (err: Error) => err.message || "Credenciales incorrectas",
        }
      );
    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-row rounded-xl shadow-2xl overflow-hidden bg-gray-800">
        {/* Sección de formulario */}
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
              <img
                src="/img/cat-login.jpg"
                alt="cat-login"
                className="w-16 h-16 ml-2 rounded-full"
              />
            </div>
            <p className="text-blue-200 mt-2">Ingresa tus credenciales</p>
          </div>

          <Form method="post" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <input
                  id="identity"
                  onChange={(e) =>
                    setCredentials({ ...credentials, identity: e.target.value })
                  }
                  name="identity"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Nombre de usuario"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    });
                  }}
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center space-x-2 ${
                isSubmitting ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
            >
              {isSubmitting ? (
                <>
                  <span>Iniciando sesión...</span>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </>
              ) : (
                <>
                  <span>Iniciar sesión</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/registro"
                className="font-medium text-blue-400 hover:text-blue-300 transition duration-200"
                viewTransition
              >
                Regístrate
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
