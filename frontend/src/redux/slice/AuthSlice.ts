import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi, getCurrentUser, registerApi } from "../../services/authservices";
import { AuthState } from "../../types/auth";

const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await loginApi(email, password);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Invalid email or password');
        }
    }
);

const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password, phone }: { name: string; email: string; password: string; phone: string }, thunkAPI) => {
        try {
            const response = await registerApi(name, email, password, phone);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Registration failed');
        }
    }
);

const initialState: AuthState = {
    isAuthenticated: !!getCurrentUser(),
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            logoutApi();
            localStorage.removeItem('token');
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
         .addCase(login.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.data.user;
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.error = action.payload as string;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.data;
            state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.error = action.payload as string;
        });
    }
});

export const { logout } = authSlice.actions;
export { login, register };
export default authSlice.reducer;
