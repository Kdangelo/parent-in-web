/**
 * Implementa la lógica de servicios para el manejo del perfil de usuario:
 *  - getUserProfile
 *  - updateUserProfile
 *  - changeUserPassword
 */

import type { User } from "../types/types";
import api from "./api";



export const getUserProfile = async (token: string): Promise<User> => {

    const url: string = `${import.meta.env.VITE_API_BASE_URL}/auth/me`;

    const response = await api.get<User>(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    // axios responses don't have 'ok'; check HTTP status instead
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText || `Request failed with status ${response.status}`);
    }

    return response.data;
}

export const updateUserProfile = async (data: User, token: string, id: string) => {
    
    const url: string = `${import.meta.env.VITE_API_BASE_URL}/users/${id}`;

    const response = await api.patch<User>(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

     if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText || `Request failed with status ${response.status}`);
    }

    return response.data;
}