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

let isShowingExpiredAlert = false;

api.interceptors.request.use(
    async config => {
        
        const { logout } = userStore.getState();

        const token = getCookie(import.meta.env.VITE_TOKEN_KEY);
        
        
        if(token && tokenExpiredUtils(token)) {
            
            if (isShowingExpiredAlert) {
                return Promise.reject("Token expirado (alerta ya mostrada)");
            }

            isShowingExpiredAlert = true;
            await Swal.fire({
                icon: "warning",
                title: "Sesión expirada",
                text: "Debes volver a iniciar sesión",
                confirmButtonText: 'Ir a la página de login',
                allowOutsideClick: false, // Evita que la cierren haciendo clic fuera
                allowEscapeKey: false, // Evita que la cierren con la tecla Escape
            });

            logout();
            isShowingExpiredAlert = false; 
            window.location.href = "/login";

            return Promise.reject("Sesión expirada");
        }

        if(token){
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