import { Link, useNavigate } from "@remix-run/react";
import { useAuthStore } from "~/store/authStore";
import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-50 shadow">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-white hover:opacity-80 transition"
          >
            <img src="/img/cat-login.jpg" alt=""  className="h-8 w-8 rounded-full"/>
            <span className="text-xl font-bold tracking-wide">Frontend</span>
          </Link>

          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition">
              <BellIcon className="h-6 w-6" />
            </button>

            {/* Menú de usuario */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full text-white hover:bg-gray-700 transition"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-medium uppercase">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="hidden sm:inline">{user?.name || "Usuario"}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition"
                  >
                    Tu perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
