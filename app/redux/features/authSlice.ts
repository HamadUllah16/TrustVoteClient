import axiosInstance from "@/app/utils/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface init {
    loading: boolean,
    isAuthenticated: boolean,
    message: any,
    error: any
}

const initialState: init = {
    loading: false,
    isAuthenticated: false,
    message: '',
    error: ''
}
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/user/logout');
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data: any, { rejectWithValue }) => {
        try {
            // Use the axiosInstance that already handles token and response
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/login`, data);
            // The interceptor will have already processed the response,
            // so we just return the response data directly
            if (response.status === 200) {
                return response.data;
            }
        } catch (error: any) {
            // The interceptor should already handle the response error,
            // but you can still reject the error with a meaningful message
            return rejectWithValue(error.message || 'An error occurred during login');
        }
    }
);


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/register', data.credentials);

            if (response.status === 200) {
                return response.data
            }
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending, state => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            localStorage.setItem('x_auth_token', action.payload?.x_auth_token);
            state.isAuthenticated = true;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message || 'Error while logging in';
            state.loading = false;
        })

        // register user builder

        builder.addCase(registerUser.pending, state => {
            state.loading = true;
            state.error = '';
            state.message = '';
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message || 'User account creation successful.'
        })
        builder.addCase(registerUser.rejected, state => {
            state.error = 'User registeration failed.'
        })
    },
}
)

export default authSlice.reducer;
export const { setIsAuthenticated } = authSlice.actions;