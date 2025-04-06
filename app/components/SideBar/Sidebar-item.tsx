import { useState } from "react";
import { Link, useLocation } from "@remix-run/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import type { IconType } from "./icons";

interface SidebarItemProps {
  name: string;
  href?: string;
  Icon: IconType;
  subItems?: { name: string; href: string; roles: string[] }[];
  isActive: boolean;
  isCollapsed: boolean;
}

export default function SidebarItem({
  name,
  href,
  Icon,
  subItems = [],
  isActive,
  isCollapsed,
}: SidebarItemProps) {
  const location = useLocation();
  const [open, setOpen] = useState(isActive);

  const toggle = () => setOpen((prev) => !prev);

  const itemClasses = `group flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-all ${
    isActive
      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
      : "text-gray-400 hover:bg-gray-800 hover:text-white"
  }`;

  const linkContent = (
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-8" />
      {!isCollapsed && <span>{name}</span>}
    </div>
  );

  return (
    <div className={`w-full relative ? ${isCollapsed ? "flex" : ""}`}>
      {subItems.length > 0 ? (
        <>
          <button onClick={toggle} className={itemClasses}>
            {linkContent}
            {!isCollapsed &&
              (open ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              ))}
          </button>
          <div
            className={`${
              isCollapsed
                ? "fixed left-16 ml-4 w-48 bg-gray-900 p-2  shadow-lg z-50"
                : "ml-6 mt-1"
            } space-y-1 overflow-hidden transition-all duration-300 ${
              open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {subItems.map((item) => {
              const isSubActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-sm rounded-md px-4 py-2 transition-all duration-300 ${
                    isSubActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <Link to={href || "#"} className={itemClasses}>
          {linkContent}
        </Link>
      )}
    </div>
  );
}
