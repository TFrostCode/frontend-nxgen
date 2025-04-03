import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  collectionId: string;
  collectionName: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  name: string;
  avatar: string;
  created: string;
  updated: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  register: (token: string, user: User) => void;
  logout: () => void;
  validateSession: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => {
        if (!token || !user?.id) {
          console.error('Token o usuario inválido');
          return;
        }
        set({ token, user, isAuthenticated: true });
      },
      register: (token, user) => {
        get().login(token, user);
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
      validateSession: () => {
        const { token, user } = get();
        return !!token && !!user?.id;
      },
    }),
    {
      name: 'auth-storage',
      // Opcional: puedes usar un serializer seguro para el user
      partialize: (state) => ({ 
        token: state.token,
        user: state.user 
      }),
    }
  )
);