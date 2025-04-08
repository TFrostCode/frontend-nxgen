import { useNavigate } from "@remix-run/react";
import {
  ExclamationTriangleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";

interface ErrorProps {
  title?: string;
  message?: string;
  subMessage?: string;
  showBackButton?: boolean;
}
export default function ErrorLayout({
  title = "¡Error!",
  message = "Algo salió mal",
  subMessage = "Por favor, intenta nuevamente o regresa a la página anterior.",
  showBackButton = true,
}: ErrorProps) {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center p-6 text-white">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white bg-opacity-10"
          />
        ))}
      </div>

      <div className="max-w-md w-full relative z-10 text-center">
        <div className="mx-auto mb-6">
          <ExclamationTriangleIcon className="h-24 w-24 text-yellow-400 mx-auto" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
          {title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-4">{message}</p>

        <p className="text-gray-400 mb-8">{subMessage}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showBackButton && (
            <button
              onClick={handleGoBack}
              className="px-6 py-3 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Regresar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
