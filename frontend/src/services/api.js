import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
    baseURL: `http://${window.location.hostname}:5000`, // URL do Flask
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        config.headers['Pragma'] = 'no-cache';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default api;
