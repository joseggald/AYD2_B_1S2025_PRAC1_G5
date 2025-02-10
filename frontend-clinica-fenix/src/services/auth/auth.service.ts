import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAlertStore } from "@/features/GlobalAlert/store";
import { ERROR_EXPIRED_SESSION_TEXTS } from "@/utils/constants/alerts";
import { useAuthStore } from "@/store/auth";
import { navigationService } from '../../router';

const alertStore = useAlertStore.getState();
// Create an Axios instance with base configuration
const serviceApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVICE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add the token to requests
serviceApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    
    const { authToken } = useAuthStore.getState();
    if (!authToken) {
      return config;
    }
    
    config.headers.Authorization = `Bearer ${authToken}`;
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
      alertStore.openAlert();
      logout();
      navigationService.goToLogin();
    }
    return Promise.reject(error);
  }
);


export { serviceApi };
