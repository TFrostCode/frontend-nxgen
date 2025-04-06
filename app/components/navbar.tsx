import { Link, useNavigate } from "@remix-run/react";
import { useAuthStore } from "~/store/authStore";
import { useState } from "react";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function Navbar({
  toggleSidebar,
  isCollapsed,
}: {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}) {
  const navigate = useNavigate();
  const { user, logout, token } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed left-0 w-full z-20 shadow">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              isCollapsed ? "ml-20" : "ml-60"
            }`}
          >
            <button
              onClick={toggleSidebar}
              className="text-gray-200 hover:text-white transition"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="text-gray-400 hover:text-white transition">
              <BellIcon className="h-6 w-6" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 mr-2 rounded-full text-white hover:bg-gray-700 transition"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-medium uppercase">
                  <img
                    src={
                      `https://pocketbase.nxgen.dev/api/files/_pb_users_auth_/${user?.id}/${user?.avatar}?token=${token}` ||
                      "/img/cat-login.jpg"
                    }
                    alt={user?.name}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
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