'use client'
import axiosInstance from "@/app/utils/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface init {
    loading: boolean,
    isAuthenticated: boolean,
    message: any,
    error: any,
    exists: boolean | null,
    checkExistsLoading: boolean
}

const initialState: init = {
    loading: false,
    isAuthenticated: false,
    message: '',
    error: '',
    exists: null,
    checkExistsLoading: false
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
            return rejectWithValue({ message: error.response?.data?.message });
        }
    }
);

export const loginUserEmailCheck = createAsyncThunk<
    { message: string; exists: boolean }, // Type for success response
    { email: string, role: string }, // Type for the email argument
    { rejectValue: { message: string; exists: boolean } } // Type for rejection value
>(
    'auth/loginUserEmailCheck',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/login/email-check`, { email: data.email, role: data.role });
            if (response.status === 200) {
                return response.data; // response.data must match the shape { message: string, exists: boolean }
            } else {
                return rejectWithValue({ message: 'Unexpected status code', exists: false });
            }
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || 'Unknown error occurred',
                exists: error.response?.data?.exists || false
            });
        }
    }
);


export const registerUser = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'auth/registerUser',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/register`, data.account);
            if (response.status === 200) {
                data.router.push('/user/login')
                return response.data
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setExists: (state, action) => {
            state.exists = action.payload;
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
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
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

        builder.addCase(loginUserEmailCheck.pending, (state) => {
            state.checkExistsLoading = true;
            state.error = null;
        })
        builder.addCase(loginUserEmailCheck.fulfilled, (state, action) => {
            state.checkExistsLoading = false;
            state.exists = action.payload.exists;
            state.message = action.payload.message;
        })
        builder.addCase(loginUserEmailCheck.rejected, (state, action) => {
            state.checkExistsLoading = false;
            state.error = action.payload?.message || 'Something went wrong';
            state.exists = action.payload?.exists || false;
        })


    },
}
)

export default authSlice.reducer;
export const { setIsAuthenticated, setExists } = authSlice.actions;