import type { User } from "../types/types"

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

interface AuthActions {
    login: (token: string, user: User) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    setToken: (token: string) => void;
}

export type AuthUser = AuthState & AuthActions;