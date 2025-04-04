import { Link } from "@remix-run/react";

export default function Index() {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br text-black">
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb">
            🚀 ¡Bienvenido al Sistema!
          </h1>
          <p className="text-lg font-medium max-w-lg mb-6 animate-slide-in">
            Nos emociona tenerte aquí y ayudarte a llevar tus proyectos a otro
            nivel. ¡Prepárate para comenzar con lo mejor!
          </p>
  
          <Link
            to="/profile"
            className="mt-4 px-6 py-3 bg-white text-indigo-800 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition-all animate-bounce"
          >
            Ver Perfil
          </Link>
        </div>
      </div>
    );
  }
  