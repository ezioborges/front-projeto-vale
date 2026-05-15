import { AuthResponse, RegisterPayload } from "@/types/api";
import api from "./api";

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<AuthResponse>("/users/", payload);
  return data;
}
