import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { APP_CONFIG } from "@/constants/config";

let getAuthToken: (() => Promise<string | null>) | null = null;

export const setAuthTokenGetter = (getter: () => Promise<string | null>) => {
  getAuthToken = getter;
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (getAuthToken && !config.headers.Authorization) {
      try {
        const token = await getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to retrieve auth token for request:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "An unexpected server error occurred.";
    return Promise.reject(new Error(message));
  }
);
