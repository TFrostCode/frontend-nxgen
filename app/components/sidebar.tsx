import { Link, useLocation } from "@remix-run/react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Configuración", href: "/settings", icon: SettingsIcon },
  { name: "Administrador", href: "administrar", icon: Administrador },
];

function Administrador() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5v-6l-10 5L2 11v6z" />
    </svg>
  );
}
function DashboardIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}


function SettingsIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 
        2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 
        1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 
        1.51V21a2 2 0 0 1-2 2 2 2 0 0 
        1-2-2v-.09A1.65 1.65 0 0 0 9 
        19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 
        0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 
        1.65 0 0 0 .33-1.82 1.65 1.65 0 0 
        0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 
        1 2-2h.09A1.65 1.65 0 0 0 4.6 
        9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 
        2 0 0 1 0-2.83 2 2 0 0 1 
        2.83 0l.06.06a1.65 1.65 0 0 
        0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 
        2 0 0 1 2-2 2 2 0 0 1 
        2 2v.09a1.65 1.65 0 0 0 1 
        1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 
        2 0 0 1 2.83 0 2 2 0 0 
        1 0 2.83l-.06.06a1.65 1.65 0 0 
        0-.33 1.82V9a1.65 1.65 0 0 0 
        1.51 1H21a2 2 0 0 1 2 2 
        2 2 0 0 1-2 2h-.09a1.65 
        1.65 0 0 0-1.51 1z"
      />
    </svg>
  );
}

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-[#111827] border-r border-gray-800 pt-16 h-screen fixed shadow-lg">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all
                    ${
                      active
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  <div
                    className={`p-2 rounded-md transition-all ${
                      active
                        ? "bg-white/10 text-white"
                        : "group-hover:bg-gray-700 group-hover:text-white"
                    }`}
                  >
                    <item.icon />
                  </div>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer user/logo area */}
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
