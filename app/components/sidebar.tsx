import { Link, useLocation } from "@remix-run/react";
import {
  HomeIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"; // Importa más iconos si es necesario
import { useAuthStore } from "../store/authStore";

const icons = {
  dashboard: HomeIcon,
  configuracion: Cog6ToothIcon,
  administrador: UserGroupIcon,
};

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard/index",
    icon: "dashboard",
    roles: ["admin", "user"],
  },
  {
    name: "Configuración",
    href: "#",
    icon: "configuracion",
    roles: ["user"],
  },
  {
    name: "Administrador",
    href: "/dashboard/users",
    icon: "administrador",
    roles: ["admin"],
  },
];

/**
 * Sidebar component renders a vertical navigation bar for desktop screens.
 * It contains links to various sections of the dashboard with navigation icons.
 * Highlights the active link based on the current URL path.
 * Includes a footer with a logo and welcome message.
 */

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuthStore();
  console.log(user);

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-[#111827] border-r border-gray-800 pt-16 h-screen fixed shadow-lg">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="px-4 py-6 space-y-2">
            {navigation
              .filter((item) => item.roles.includes(user?.rol ?? ""))
              .map(({ name, href, icon }) => {
                // Ocultar "Administrador" si el rol del usuario no es 'admin'
                const active = location.pathname === href;
                const IconComponent =
                  icons[icon as keyof typeof icons] || HomeIcon;

                return (
                  <Link
                    key={name}
                    to={href}
                    className={`group flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all
                    ${
                      active
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                   viewTransition>
                    {IconComponent && (
                      <IconComponent
                        className={`h-6 w-6 ${
                          active ? "text-white" : "text-gray-400"
                        }`}
                      />
                    )}
                    <span>{name}</span>
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center space-x-3">
            <img
              src="/img/cat-login.jpg"
              alt="Logo"
              className="h-9 w-9 rounded-full border border-gray-700"
            />
            <div>
              <p className="text-sm font-medium text-white">NexGen</p>
              <p className="text-xs text-gray-400">Bienvenido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
