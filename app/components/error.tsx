import { useNavigate } from "@remix-run/react";
import { motion } from "framer-motion";
import {
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  HomeIcon,
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

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center p-6 text-white relative overflow-hidden">
      {/* Partículas animadas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white bg-opacity-10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              transition: {
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-md w-full relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icono principal con animación */}
        <motion.div
          className="mx-auto mb-6"
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <ExclamationTriangleIcon className="h-24 w-24 text-yellow-400 mx-auto" />
        </motion.div>

        {/* Contenido con animaciones escalonadas */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-4"
          variants={itemVariants}
        >
          {message}
        </motion.p>

        <motion.p className="text-gray-400 mb-8" variants={itemVariants}>
          {subMessage}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          {showBackButton && (
            <motion.button
              onClick={handleGoBack}
              className="px-6 py-3 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Regresar
            </motion.button>
          )}

        </motion.div>
      </motion.div>
    </div>
  );
}
