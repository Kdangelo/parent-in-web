import type { User } from "../types/types"

export type AuthUser = {
    logged: boolean,
    user: User | null;
}