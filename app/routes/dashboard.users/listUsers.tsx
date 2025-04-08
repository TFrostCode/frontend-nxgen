import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { createUser, deleteUser, getUsers, updateUser } from "~/funciones/data"; // Necesitaremos esta función
import { Form} from "@remix-run/react";
// Importa los íconos de Tailwind Heroicons
import {
  MagnifyingGlassIcon,
  PencilIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import Modal from "~/components/modal";
import { form } from "framer-motion/client";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Crud() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [modalActive, setModalActive] = useState(false);
  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    "password": "",
    "passwordConfirm": "",
    "email": "",
    "emailVisibility": true,
    "name": "",
    "rol": "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async () => {
    // Crea una validacion para el correo completo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("El correo electrónico no es válido");
      return;
    }
    if( !isEditing && ( formData.password !== formData.passwordConfirm)) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if(!isEditing && (formData.email === "" || formData.name === "" || formData.rol === "" || formData.password === "" || formData.passwordConfirm === "")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    if(!isEditing && (formData.password?.length < 8)) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    try {
      if (isEditing && currentUserId) {

        const updateData: Partial<typeof formData> = { ...formData };
        if (!updateData.password || updateData.password.trim() === "") {
          delete updateData.password;
          delete updateData.passwordConfirm;
        }

        const updatedUser = await updateUser(currentUserId, updateData);
        if (updatedUser) {
          toast.success("Usuario actualizado correctamente");
          setUsers(users.map(user => user.id === currentUserId ? { ...user, ...formData } : user));
          handleCloseModal();
        }
      } else {
        console.log(formData);
        const user = await createUser(formData);
        if (user) {
          toast.success("Usuario creado correctamente");
          setUsers([...users, user]);
          handleCloseModal();
        }
      }
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      toast.error("Error al guardar usuario");
    }
  };

  const handleOpenEditModal = (user: any) => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      rol: user.rol || "",
      password: user.password,
      passwordConfirm: user.password,
      emailVisibility: true
    });
    console.log(typeof user.id)
    setCurrentUserId(user.id);
    setIsEditing(true);
    setModalActive(true);
  };

  const handleDeleteUser = async (userId: string) => {
    setModalDeleteActive(true);
    // if (!confirmation) return;
    try {
      await deleteUser(userId);
      toast.success("Usuario eliminado correctamente");
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      toast.error("Error al eliminar usuario");
    }
    setModalDeleteActive(false);
    setCurrentUserId(null);
  };

  const handleOpenCreateModal = () => {
    // Limpiar el formulario para crear un nuevo usuario
    setFormData({
      name: "",
      email: "",
      rol: "",
      password: "",
      passwordConfirm: "",
      emailVisibility: true
    });
    
    setCurrentUserId(null);
    setIsEditing(false);
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
    setIsEditing(false);
    setCurrentUserId(null);
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const usersList = await getUsers();
        setUsers(usersList || []);
        setFilteredUsers(usersList || []);
      } catch (error) {
        toast.error("Error al cargar usuarios");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Filtrar usuarios por búsqueda
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reiniciar la paginación al buscar
  }, [search, users]);

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-gray-600 text-lg animate-pulse">
          Cargando usuarios...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Lista de Usuarios
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          onClick={handleOpenCreateModal}
        >
          <UserPlusIcon className="h-5 w-5" /> Crear Usuario
        </button>
        <Modal
          size="md"
          title={isEditing ? "Editar Usuario" : "Crear Usuario"}
          activeModal={modalActive}
          closeModal={handleCloseModal}
          onSave={handleSaveUser}
          buttonSaveName={isEditing ? "Actualizar Usuario" : "Crear Usuario"}
        >
          <Form method="post" ref={formRef} className="space-y-4 grid grid-cols-2 gap-4">
            <div className="pt-4">
              <label className="text-black">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                required
                placeholder="Ingrese su nombre"
                className="w-full text-[14px] bg-white text-gray-700 font-light border p-2 rounded-md"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label className="text-black">Rol</label>
              <select name="rol" id="" required value={formData.rol} onChange={handleChange} className="w-full text-[14px] bg-white text-gray-700 font-light border p-2 rounded-md">
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </div>
            <div>
              <label className="text-black">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                required
                placeholder="Ingrese su email"
                className="w-full text-[14px] bg-white text-gray-700 border p-2 rounded-md"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-black">{isEditing ? "Nueva Contraseña (opcional)" : "Contraseña"}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                required={!isEditing}
                placeholder="Contraseña"
                className="w-full text-[14px] bg-white text-gray-700 border p-2 rounded-md"
                onChange={handleChange}
              />
            </div>

            <div className="col-span-1">
              <label className="text-black">{isEditing ? "Confirmar Nueva Contraseña" : "Confirmar Contraseña"}</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                required={!isEditing}
                placeholder="Confirmar contraseña"
                className="w-full text-[14px] bg-white text-gray-700 border p-2 rounded-md"
                onChange={handleChange}
              />
            </div>
          </Form>
        </Modal>

        <Modal
          size="sizeDelete"
          title="¿Estás seguro que deseas eliminar al usuario?"
          activeModal={modalDeleteActive}
          closeModal={() => setModalDeleteActive(false)}
          onSave={() => handleDeleteUser(currentUserId ?? "")}
          buttonSaveName="Sí, estoy seguro"
        > </Modal>
      </div>

      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full text-gray-800">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Fecha de Creación</th>
              <th className="px-6 py-3 text-left">Rol</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr
                  key={user?.id ?? -1}
                  className="hover:bg-gray-100 transition-all"
                >
                  <td className="px-6 py-4">{user?.name ?? "Sin nombre"}</td>
                  <td className="px-6 py-4">
                    {user?.email ?? "Email no visible"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user?.created ?? "").toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{user?.rol ?? "Sin nombre"}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="flex items-center justify-center bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
                        onClick={() => {
                          handleOpenEditModal(user)
                          setCurrentUserId(user.id)
                        }}
                        title="Editar"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
                        onClick={() => {
                          setModalDeleteActive(true)
                          setCurrentUserId(user.id)
                        }}
                        title="Eliminar"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      {/* Aquí puedes añadir otros botones como eliminar si lo necesitas */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            className={`p-2 rounded-full ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <span className="text-gray-700 font-semibold">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className={`p-2 rounded-full ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}