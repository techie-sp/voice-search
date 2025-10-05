import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { ToastService } from "../utils/ToastService";

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com", // Base URL for DummyJSON API
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    console.log("[API] Request:", config.method, config.url, config.data || "");
    return config;
  },
  (error: AxiosError) => {
    console.error("[API] Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("[API] Response:", response.status, response.data);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.warn("[API] Response error:", error.response.status, error.response.data);
    } else {
      console.warn("[API] Network / timeout error:", error.message);
      ToastService.show("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default api;
