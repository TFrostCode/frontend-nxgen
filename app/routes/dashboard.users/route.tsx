import { Outlet } from "@remix-run/react";
import ListUsers from "./listUsers";

export default function Users() {
  return (
    <div className="p-6 bg-white shadow-2xl rounded-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
        <h1 className="text-4xl font-semibold text-gray-800">Gestión de Usuarios</h1>
        <p className="text-gray-600 text-xl">Administra y gestiona los usuarios del sistema.</p>
        </div>
        <img src="/img/cat-login.jpg" alt=""  className="h-20 w-20 rounded-full"/>
      </div>
      <div className="">
        <ListUsers />
      </div>
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
