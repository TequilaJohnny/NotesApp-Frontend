import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/api';
import { toast } from 'react-toastify';

interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    status: 'idle',
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await axiosInstance.post('/auth/login', { email, password });
        console.log(response.data);
        return response.data.access_token;
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async ({ email, username, password }: { email: string; username: string; password: string }) => {
        const response = await axiosInstance.post('/auth/register', { email, username, password });
        return response.data.access_token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('access_token');
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = 'idle';
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem('access_token', action.payload);
            }
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to login';
        })
        .addCase(register.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = 'idle';
            state.token = action.payload;
            localStorage.setItem('access_token', action.payload);
            toast.success('Registered successfully');
        })
        .addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Registration failed';
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
