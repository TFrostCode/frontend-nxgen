import { useLocation } from "@remix-run/react";
import { useAuthStore } from "../../store/authStore";
import SidebarItem from "./Sidebar-item";
import { navigation } from "./navigation";
import { icons, type IconType } from "./icons";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-60"
      } bg-[#111827] border-r border-gray-800 h-screen fixed shadow-lg transition-all duration-300 flex flex-col z-50`}
    >
      <div className="flex items-center px-4 py-4">
        <img
          src="/img/cat-login.jpg"
          alt="Logo"
          className="h-9 w-9 rounded-full border border-gray-700 cursor-pointer"
          onClick={toggleSidebar}
        />
        {!isCollapsed && (
          <span className="ml-3 text-xl font-bold text-white">Frontend</span>
        )}
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto px-2 py-6 space-y-2">
        {navigation
          .filter((item) => item.roles.includes(user?.rol ?? ""))
          .map(({ name, href, icon, subItems }) => {
            const isActive =
              location.pathname === href ||
              subItems?.some((sub) => location.pathname === sub.href);
            const Icon = icons[icon as keyof typeof icons] as IconType;
            return (
              <SidebarItem
                key={name}
                name={name}
                href={href}
                Icon={Icon}
                subItems={subItems}
                isActive={isActive || false}
                isCollapsed={isCollapsed}
              />
            );
          })}
      </div>

      <div className="border-t border-gray-800 p-4 mt-auto">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <img
            src="/img/cat-login.jpg"
            alt="Logo"
            className="h-9 w-9 rounded-full border border-gray-700 cursor-pointer"
          />
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-white">NexGen</p>
              <p className="text-xs text-gray-400">Bienvenido</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}