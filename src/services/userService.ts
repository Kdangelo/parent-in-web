/**
 * Implementa la lógica de servicios para el manejo del perfil de usuario:
 *  - getUserProfile
 *  - updateUserProfile
 *  - changeUserPassword
 */

import type { User, UserCreate, UserVerify } from "../types/types";
import api from "./api";

export const loginUserService = async (values: User) => {
  const response = await api.post("/auth/login", values);
  return response.data;
};

export const createUserService = async (values: UserCreate) => {
  const newUser = {
    email: values.email,
    name: values.name,
    lastName: values.lastName,
    password: values.password,
  };

  const response = await api.post("/auth/register", newUser);
  return response.data;
};

export const sendUserVerificationCodeService = async (values: UserVerify) => {
  const response = await api.post("/auth/verify-email", values);
  return response.data;
};

export const resendVerificationCode = async (email: string) => {
    const response = await api.post("/auth/resend-verification", {email});
    return response.data;
};

export const getUserProfile = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};

export const updateUserProfile = async (
  id: string,
  data: Partial<User>
) => {
  const response = await api.patch<User>(`/users/${id}`, data);
  return response.data;
};
