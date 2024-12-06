import axiosInstance from "../axiosInstance/axiosInstance";

const APP_URL = process.env.REACT_APP_BACKEND_URL;

export interface BookResponse {
    data: {
        message: string;
        data: {
            title: string;
            author: string;
        }
    }
}

interface Book {
    _id: number;
    title: string;
    author: string;
}

interface BookListResponse {
    success: boolean;
    data: {
        message: string;
        data: Book[];
    };
}

export const addBookApi = async (author: string, title: string): Promise<BookResponse> => {
    const response = await axiosInstance.post<BookResponse>(`${APP_URL}/book/create`, { author, title });
    return response.data;
}

export const listBookApi = async (): Promise<Book[]> => {
    const response = await axiosInstance.get<BookListResponse>(`${APP_URL}/book/all`);
    return response.data.data.data;
};