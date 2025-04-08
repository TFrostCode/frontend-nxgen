import { useState } from "react";
import { Outlet } from "@remix-run/react";
import Navbar from "~/components/navbar";
import Sidebar from "~/components/SideBar/sidebar";
import { useAuthStore } from "~/store/authStore";
import Error from "~/components/error";

export default function DashboardLayout() {
  const { user, isAuthenticated } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar el Sidebar

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev); // Alterna entre colapsado y expandido
  };

  if (!isAuthenticated || !user) {
    return (
      <Error
        title="Acceso denegado"
        message="No estás autenticado"
        subMessage="Por favor, inicia sesión para acceder al dashboard."
      />
    );
  }

  if(user?.rol !== "admin" && user?.rol !== "user") {
    return(
      <Error 
        title="Acceso denegado"
        message="No tienes permiso para acceder al dashboard"
        subMessage="Por favor, inicia sesión para acceder al dashboard."
      />
    )
  }

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

        <main className="p-6 pt-24">
          <div className="container min-h-screen mx-auto bg-white rounded-lg p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}