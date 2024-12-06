import axios from "axios";

const APP_URL = process.env.REACT_APP_BACKEND_URL;

export interface LoginResponse {
    data: {
        token: string;
        user: {
            username: string;
        }
    }
}

export interface RegisterResponse {
    data: {
        message: string;
    };
}


export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${APP_URL}/auth/login`, { email, password });
    if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token)
    }
    return response.data;
}

export const registerApi = async (name: string, email: string, password: string, phone: string): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(`${APP_URL}/auth/register`, { name, email, password, phone });
    return response.data;
};

export const logoutApi = (): void => {
    localStorage.removeItem('token')
}

export const getCurrentUser = (): string | null => {
    return localStorage.getItem('token')
}