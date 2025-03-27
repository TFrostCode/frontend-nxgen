import { Form, Link, useNavigate, type MetaFunction } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Página de inicio de sesión" },
  ];
};

export default function Login() {
  const [user, setUser] = useState({
    identity: "holitas@gmailcom",
    password: "kelitayMartin",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://pocketbase.nxgen.dev/api/collections/users/auth-with-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identity: user.identity,
            password: user.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error de autenticación");
      }

      const data = await response.json();

      // Guardar el token y datos del usuario
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.record));

      // Redirigir al perfil
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error de autenticación:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className=" flex flex-row rounded-xl shadow-2xl overflow-hidden bg-gray-800">
        {/* Sección de formulario */}
        <div className=" p-8">
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
          {error && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">
              {error}
            </div>
          )}

          <Form method="post" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="bg-contain">
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
                  </span>
                </div>
                <input
                  id="identity"
                  onChange={(e) =>
                    setUser({ ...user, identity: e.target.value })
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
                  <span className="bg-contain">
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
                  </span>
                </div>
                <input
                  id="password"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Recuérdame
                </label>
              </div>

              <Link
                to="#"
                className="text-sm text-blue-400 hover:text-blue-300 transition duration-200"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div> */}

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span>Iniciar sesión</span>
              <span className="bg-contain">
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
              </span>
            </button>

            <div className="text-center text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/registro"
                className="font-medium text-blue-400 hover:text-blue-300 transition duration-200"
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
