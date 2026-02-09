import type { User } from "../types/types"

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    userTypeStore: string | null;

}

interface AuthActions {
    login: (token: string, user: User) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    setToken: (token: string) => void;
    setUserTypeStore: (userTypeStore: string) => void;
    checkTokenExpiration: () => void;
}

export type AuthUser = AuthState & AuthActions;