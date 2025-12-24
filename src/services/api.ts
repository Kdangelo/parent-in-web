import axios from "axios";
import { getCookie } from "../utils/cookie";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

api.interceptors.request.use(
    config => {
        const token = getCookie(import.meta.env.VITE_TOKEN_KEY);
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