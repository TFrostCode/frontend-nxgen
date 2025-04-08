export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard/index",
    icon: "dashboard",
    roles: ["admin", "user"],
  },
  {
    name: "Configuración",
    icon: "configuracion",
    roles: ["user", "admin"],
    subItems: [
      {
        name: "Perfil",
        href: "#",
        roles: ["user" , "admin"],
      },
      {
        name: "Ajustes",
        href: "#",
        roles: ["user", "admin"],
      },
    ],
  },
  {
    name: "Administrador",
    href: "/dashboard/users",
    icon: "administrador",
    roles: ["admin"],
  },
];
