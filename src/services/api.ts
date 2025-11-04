import axios from "axios";
import { getCookie } from "../utils/cookie";

const url = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    url,
    headers: {
        'Content-Type': 'application/json'
    },
});

api.interceptors.request.use(
    config => {
        const token = getCookie('authToken');
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
        console.error('API error: ', error);
        return Promise.reject(error);
    }
);


export default api;