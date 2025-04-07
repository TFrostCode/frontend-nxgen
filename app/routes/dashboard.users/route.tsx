import { ActionFunctionArgs } from "@remix-run/node";
import ListUsers from "./listUsers";
import { redirect } from "@remix-run/node";
import { createUser } from "~/funciones/data";

export const action = async ( {request}: ActionFunctionArgs) => {
  const form = await request.formData();
  
  if (form.get("_action") === "createUser") {
  const data = {
    "email": form.get("email"),
    "emailVisibility": true,
    "verified": true,
    "password": form.get("password"),
    "passwordConfirm": form.get("passwordConfirm"),
    "name": form.get("name"),
    "rol": form.get("rol"),
  };

  try {
    await createUser(data);
    return redirect("/dashboard/users"); // o donde necesites
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return { error: "No se pudo crear el usuario" };
  }
}
};

export default function Users() {
  return (
    <div className="min-h-screen w-full p-6 bg-white shadow-2xl rounded-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600 text-xl">
            Administra y gestiona los usuarios del sistema.
          </p>
        </div>
        <img
          src="/img/cat-login.jpg"
          alt=""
          className="h-20 w-20 rounded-full"
        />
      </div>
      <div>
        <ListUsers />
      </div>
    </div>
  );
}
