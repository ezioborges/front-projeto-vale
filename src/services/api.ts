import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
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
