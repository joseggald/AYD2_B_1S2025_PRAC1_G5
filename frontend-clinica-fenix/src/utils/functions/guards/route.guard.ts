import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

interface GuardOptions {
  requireAuth?: boolean;
  redirectTo?: string;
  fallbackRoute?: string;
  unauthorized?: string;
}

/**
 * Creates a route guard for authentication, roles, and permissions.
 *
 * @param {Object} options - Configuration options for the guard.
 * @param {boolean} [options.requireAuth=true] - Whether authentication is required.
 * @param {string} [options.redirectTo="/login"] - URL to redirect if authentication fails.
 * @param {string} [options.unauthorized="/unauthorized"] - URL to redirect if authorization fails.
 * @returns {() => Promise<{ userProfile?: string }>} A guard function to use in routes.
 *
 * @example
 * // Usage example in a route:
 * export const Route = createFileRoute('/compras/approvals')({
 *   component: ApprovalsPage,
 *   beforeLoad: createGuard({
 *     roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
 *     permissions: [PERMISSIONS.SYSTEM.READ, PERMISSIONS.SYSTEM.WRITE],
 *     requireAllRoles: false,
 *     requireAllPermissions: true
 *   })
 * })
 */
export const createGuard = (options: GuardOptions = {}) => {
  const {
    requireAuth = true,
    redirectTo = "/login",
  } = options;

  return async () => {
    const auth = useAuthStore.getState();

    // Check authentication
    if (requireAuth && !auth.isAuthenticated) {
      throw redirect({
        to: redirectTo,
        search: {
          redirect: window.location.pathname,
          message: "Please login to access this page",
        },
      });
    }
    return {
      userProfile: auth.user,
    };
  };
};
