/**
 * Implementa la lógica de servicios para el manejo del perfil de usuario:
 *  - getUserProfile
 *  - updateUserProfile
 *  - changeUserPassword
 */

import type { User, UserCreate, UserVerify } from "../types/types";
import api from "./api";
import { AxiosError } from "axios";

export const loginUserService = async (values: User) => {
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;

  try {
    const response = await api.post(url, JSON.stringify(values), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    if (
      error.response &&
      typeof error.response.data === "object" &&
      error.response.data !== null &&
      "message" in error.response.data
    ) {
      const data = error.response.data as { message: string | string[] };
      const message = Array.isArray(data.message)
        ? data.message.join(", ")
        : data.message;

      throw new Error(message);
    }
  }
};

export const createUserService = async (values: UserCreate) => {
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/auth/register`;

  const newUser = {
    email: values.email,
    name: values.name,
    password: values.password,
  };

  try {
    const response = await api.post(url, JSON.stringify(newUser), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    if (
      error.response &&
      typeof error.response.data === "object" &&
      error.response.data !== null &&
      "message" in error.response.data
    ) {
      const data = error.response.data as { message: string | string[] };
      const message = Array.isArray(data.message)
        ? data.message.join(", ")
        : data.message;

      throw new Error(message);
    }
  }
};

export const sendUserVerificationCodeService = async (values: UserVerify) => {
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/auth/verify-email`;

  try {

    const response = await api.post(url, JSON.stringify(values), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;

  } catch (err) {
    const error = err as AxiosError;
    if (
      error.response &&
      typeof error.response.data === "object" &&
      error.response.data !== null &&
      "message" in error.response.data
    ) {
      const data = error.response.data as { message: string | string[] };
      const message = Array.isArray(data.message)
        ? data.message.join(", ")
        : data.message;

      throw new Error(message);
    }
  }
};

export const getUserProfile = async (token: string): Promise<User> => {
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/auth/me`;

  const response = await api.get<User>(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // axios responses don't have 'ok'; check HTTP status instead
  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      response.statusText || `Request failed with status ${response.status}`
    );
  }

  return response.data;
};

export const updateUserProfile = async (
  data: User,
  token: string,
  id: string
) => {
  const url: string = `${import.meta.env.VITE_API_BASE_URL}/users/${id}`;

  const response = await api.patch<User>(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      response.statusText || `Request failed with status ${response.status}`
    );
  }

  return response.data;
};
