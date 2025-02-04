import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAlertStore } from "@/features/GlobalAlert/store";
import { ERROR_EXPIRED_SESSION_TEXTS } from "@/utils/constants/alerts";
import { useAuthStore } from "@/store/auth";

const alertStore = useAlertStore.getState();

// Create an Axios instance with base configuration
const serviceApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVICE_URL,
  withCredentials: true,
});

// Request interceptor to add the token to requests
serviceApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const publicAuthToken = import.meta.env.VITE_AUTH_TOKEN;
    const { authToken, sessionToken } = useAuthStore.getState();

    config.headers.Authorization = `Bearer ${authToken || publicAuthToken}`;
    if (sessionToken) config.headers.session = sessionToken;

    return config;
  }
);

// Interceptor to handle responses
serviceApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();

      alertStore.setTitle(ERROR_EXPIRED_SESSION_TEXTS.title);
      alertStore.setDescription(ERROR_EXPIRED_SESSION_TEXTS.description);
      alertStore.setOnCloseCallback(logout);
      alertStore.openAlert();
    }

    return Promise.reject(error);
  }
);

export { serviceApi };
