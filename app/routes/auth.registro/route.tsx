import { Form, Link, type MetaFunction, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "~/store/authStore";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export const meta: MetaFunction = () => {
  return [
    { title: "Registro" },
    { name: "description", content: "Página de registro de usuario" },
  ];
};

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.dismiss();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      setIsSubmitting(false);
      return;
    }

    try {
      const registerPromise = fetch(
        "https://pocketbase.nxgen.dev/api/collections/users/records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.get("email"),
            name: formData.get("name"),
            username: formData.get("username"),
            password,
            passwordConfirm: confirmPassword,
            emailVisibility: false,
            rol: "user",
          }),
        }
      );

      await toast.promise(
        registerPromise.then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Error al registrar el usuario");
          }
          return data;
        }),
        {
          loading: "Registrando tu cuenta...",
          success: "¡Registro exitoso! Iniciando sesión...",
          error: (err: Error) => err.message || "Error en el registro",
        }
      );

      const authPromise = fetch(
        "https://pocketbase.nxgen.dev/api/collections/users/auth-with-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identity: formData.get("email"),
            password,
          }),
        }
      );

      await toast.promise(
        authPromise.then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            throw new Error("Error al iniciar sesión automáticamente");
          }
          return data;
        }),
        {
          loading: "Iniciando sesión...",
          success: (data) => {
            register(data.token, data.record);
            setTimeout(() => navigate("/dashboard/index"), 2000);
            return "¡Bienvenido!";
          },
          error: (err: Error) => err.message || "Error al autenticar",
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
      <div className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-gray-800">
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">Registro</h1>
              <img
                src="/img/dog-register.png"
                alt="cat-login"
                className="w-16 h-16 ml-3 rounded-full"
              />
            </div>
            <p className="text-blue-200 mt-2">
              Completa tus datos para registrarte
            </p>
          </div>

          <Form method="post" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="w-5 h-5 text-blue-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Nombre de usuario"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Correo electrónico"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="w-5 h-5 text-blue-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Contraseña (mínimo 8 caracteres)"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="w-5 h-5 text-blue-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Confirmar contraseña"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center py-3 text-white bg-blue-600 rounded-lg transition duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </Form>

          <p className="text-center text-gray-400 text-sm mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/auth/login" className="text-blue-400 hover:underline" viewTransition>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
