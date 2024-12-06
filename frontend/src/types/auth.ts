export interface User {
    username: string
}

export interface AuthState {
    isAuthenticated: boolean;
    error: string | null;
    user :any;
}