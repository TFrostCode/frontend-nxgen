import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br text-black">
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <h1 className="text-6xl font-extrabold mb-4 animate-bounce">
          🚀 ¡Bienvenido al Sistema!
        </h1>
        <p className="text-xl font-medium max-w-lg mb-6">
          Dale click a los botones de la izquierda para navegar por el sistema.
          <br />
          <span className="text-indigo-600 font-semibold">
            ¡Explora y disfruta de la experiencia!
          </span>
        </p>
        <Link
          to="/dashboard/profile"
          className="mt-4 px-6 py-3 bg-white text-indigo-800 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition-all "
        >
          Ver Perfil
        </Link>
      </div>
    </div>
  );
}
