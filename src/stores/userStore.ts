import { create } from "zustand";
import type { AuthUser } from "./types";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

export const userStore = create<AuthUser>((set) => {
  const initialToken = getCookie(import.meta.env.VITE_TOKEN_KEY);
  return {
    //estado inicial
    user: null,
    token: initialToken || null,
    isAuthenticated: !!initialToken,
    userTypeStore: null,

    //acciones
    login: (token, user) => {
      setCookie(import.meta.env.VITE_TOKEN_KEY, token, 7);
      set({ token, user, isAuthenticated: true });
    },

    logout: () => {
      removeCookie(import.meta.env.VITE_TOKEN_KEY);
      set({token: null, user: null, isAuthenticated: false});
    },

    updateUser: (partialUser) => {
      set((state) => ({
        user: state.user ? { ...state.user, ...partialUser } : null,
      }));
    },

    setToken: (token) => {
        if (token) {
            setCookie(import.meta.env.VITE_TOKEN_KEY, token, 7);
        } else {
            removeCookie(import.meta.env.VITE_TOKEN_KEY);
        }

        set({ token, isAuthenticated: !!token})
    },

    setUserTypeStore: (userTypeStore) => {
      set({ userTypeStore });
    },

  };
});
