import axios from "axios";
import { getCookie } from "../utils/cookie";
import { tokenExpiredUtils } from "../utils/tokenExpiredUtils";



import Swal from "sweetalert2";
import { userStore } from "../stores/userStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

api.interceptors.request.use(
    async config => {
        
        const token = getCookie(import.meta.env.VITE_TOKEN_KEY);
        
        if(token){

            if(tokenExpiredUtils(token)) {
                
                userStore.getState().logout();

                await Swal.fire({
                    title: 'Sesión caducada',
                    text: 'Tu sesión ha expirado por seguridad. Ingresa nuevamente.',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                });
                window.location.href = "/login";
                return Promise.reject(new Error('Token expired'));
            }

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message;
        const errorMessage = Array.isArray(message) ? message.join(", ") : message || "Error del servidor";

        if (error.response?.status === 401) {
            window.location.href = "/login";
        }

        console.error('API error: ', error);
        return Promise.reject(new Error(errorMessage));
    }
);

export default api;