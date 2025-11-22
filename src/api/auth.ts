import api from "@/lib/axios";
import { AuthResponse, LoginPayload, RegisterPayload } from "@/lib/types";

export const loginUser = async (
  credentials: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/login", credentials);
  return response.data;
};

export const registerUser = async (
  data: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/register", data);
  return response.data;
};
