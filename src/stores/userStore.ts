import { create } from "zustand";
import type { AuthUser } from "./types";

export const userStore = create<AuthUser>(() => ({
    logged: false,
    user: null
}))