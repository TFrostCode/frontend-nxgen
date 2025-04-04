import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.nxgen.dev');

// Crear un usuario
export async function createUser(data:any) {
    try {
        const user = await pb.collection('users').create(data);
        return user;
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
}

// Obtener todos los usuarios
export async function getUsers() {
    try {
        const users = await pb.collection('users').getFullList();
        
        return users;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

// Obtener un usuario por ID
export async function getUserById(id:any) {
    try {
        const user = await pb.collection('users').getOne(id);
        return user;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
    }
}

// Actualizar un usuario
export async function updateUser(id:number, data:any) {
    try {
        const updatedUser = await pb.collection('users').update(id.toString(), data);
        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
    }
}

// Eliminar un usuario
export async function deleteUser(id:number) {
    try {
        await pb.collection('users').delete(id.toString());
        console.log('Usuario eliminado');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
}