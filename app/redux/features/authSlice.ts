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


export const loginCandidate = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'auth/loginCandidate',
    async (data: any, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/login-candidate`, data);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message || 'An error occurred during login' });
        }
    }
);

export const loginUser = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'auth/loginUser',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/login`, data);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message || 'An error occurred during login' });
        }
    }
);


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/register`, data);
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
        // login user builder

        builder.addCase(loginUser.pending, state => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            localStorage.setItem('x_auth_token', action.payload?.x_auth_token);
            localStorage.setItem('role', action.payload?.role);
            state.isAuthenticated = true;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload?.message || 'Error while logging in';
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

        // login candidate builder
        builder.addCase(loginCandidate.pending, state => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(loginCandidate.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            localStorage.setItem('x_auth_token', action.payload?.token);
            localStorage.setItem('role', action.payload?.role)
            state.isAuthenticated = true;
        })
        builder.addCase(loginCandidate.rejected, (state, action) => {
            state.error = action.payload?.message || 'Error while logging in';
            state.loading = false;
        })

    },
}
)

export default authSlice.reducer;
export const { setIsAuthenticated } = authSlice.actions;