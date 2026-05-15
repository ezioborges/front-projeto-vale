import type { User } from "../types/user";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  role?: User["role"];
};

export type AuthResponse = {
  access: string;
  refresh: string;
  user: User;
};
