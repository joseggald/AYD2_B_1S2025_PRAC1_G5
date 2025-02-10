import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

interface PublicGuardOptions {
  redirectTo?: string;
}

export const createPublicGuard = (options: PublicGuardOptions = {}) => {
  const { redirectTo = "/home" } = options;

  return async () => {
    const { isAuthenticated } = useAuthStore.getState();
    
    if (isAuthenticated) {
      throw redirect({
        to: redirectTo
      });
    }

    return {};
  };
};