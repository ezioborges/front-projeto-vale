import api from "../services/api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/api";

export async function login(payload: LoginPayload) {
  const { data } = await api.post<AuthResponse>("/login/", payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<AuthResponse>("/users/", payload);
  return data;
}
