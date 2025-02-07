import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/features";
import { navigationService } from '../../router';
interface AuthState {
  user: IUser | null;
  authToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: IUser | null) => void;
  setTokens: (
    tokens: { authToken: string; } | null
  ) => void;
  clearTokens: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    
    (set) => ({
      user: null,
      authToken: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setTokens: (tokens) =>
        set({
          authToken: tokens?.authToken ?? null
        }),

      clearTokens: () =>
        set({
          authToken: null
        }),

      logout: () => {
        set({
          user: null,
          authToken: null,
          isAuthenticated: false,
        });
        navigationService.goToLogin();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        authToken: state.authToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
