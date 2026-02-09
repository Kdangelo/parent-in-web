import { useCallback, useEffect, useState } from "react";
import { userStore } from "../stores/userStore";
import { getUserProfile, updateUserProfile } from "../services/userService";
import type { User } from "../types/types";

export const useAuth = () => {

    const { user, isAuthenticated, token, login, logout, updateUser, setUserTypeStore, userTypeStore } = userStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadProfile = useCallback(async () => {

        if(!token) return;
        setIsLoading(true);
        setError(null);

        try {
            const profile = await getUserProfile();
            updateUser(profile);
        } catch (error) {
            if(error instanceof Error) setError(error.message);
            logout();
        } finally {
            setIsLoading(false);
        }
    },[token, logout, updateUser]);

    const handleUpdateProfile = useCallback(async (data: Partial<User>) => {
        
        if (!token || !user?.id) return;
        setIsLoading(true);
        setError(null);

        try {
            const payload: User = { ...user, ...data, id: user.id };
            const updatedUser = await updateUserProfile(user.id, payload);
            updateUser(updatedUser);
        } catch (error) {
            setError('Falló la actualizacion del perfil');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [token, user, updateUser]);

    useEffect(() => {
        if(token && !user) {
            loadProfile();
        }
    }, [token, user, loadProfile]);

    return {
        user,
        isAuthenticated,
        token,
        isLoading,
        error,
        login,
        logout,
        updateUser: handleUpdateProfile,
        loadProfile,
        setUserTypeStore,
        userTypeStore,
    }
}