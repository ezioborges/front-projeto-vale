import axios from "axios";
import { readStoredSession } from "@/utils/session";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const session = readStoredSession();

  if (session?.access) {
    config.headers.Authorization = `Bearer ${session.access}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url;
    const method = error?.config?.method;
    // Simple, consistent error log for network/HTTP issues
    console.error("API error", { status, method, url, error });
    return Promise.reject(error);
  },
);

export default api;
