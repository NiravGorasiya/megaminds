import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, 
    headers: {
        "Content-Type": "application/json", 
    },
    timeout: 10000, 
});

const tokenExemptRoutes = ['/login', '/register'];

axiosInstance.interceptors.request.use(
    (config:any) => {
        if (config.url && !tokenExemptRoutes.some((route) => config.url.includes(route))) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`; 
            } else {
                console.warn('No token found. Ensure the user is logged in.');
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
