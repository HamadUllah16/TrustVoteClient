import axiosInstance from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { setUserProfile } from "./userSlice";
import { setIsAuthenticated } from "./authSlice";

const initialState = {
    isAuthenticated: '',
    profile: {

    },
    pendingCandidates: [],
    message: '',
    error: '',
    loading: false
}

export const loginAdmin = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'admin/loginAdmin',
    async (data: any, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/admin/login`, data.credentials)
            if (response.status === 200) {
                data.router.push('/admin/dashboard');
                dispatch(setIsAuthenticated(true));
                dispatch(getAdminProfile());
                return response.data;
            }
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || 'An error occurred.'
            });
        }
    }
)

export const getAdminProfile = createAsyncThunk(
    'admin/getAdminProfile',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.get('/admin/get-admin-profile')
            dispatch(setUserProfile(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    })

export const approveOrRejectCandidate = createAsyncThunk(
    'admin/approveOrRejectCandidate',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/candidate/approve-or-reject-candidate/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const getPendingCandidate = createAsyncThunk(
    'admin/getPendingCandidates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/candidates/pending')
            return response.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(loginAdmin.pending, state => {
            state.loading = true;
        })
        builder.addCase(loginAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.message = 'Admin login successful'
            localStorage.setItem('x_auth_token', action.payload.token)
            localStorage.setItem('role', action.payload.role)
        })
        builder.addCase(loginAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Error authenticating Admin'
        })

        // get pending candidates builder
        builder.addCase(getPendingCandidate.pending, state => {
            state.loading = true;
        })
        builder.addCase(getPendingCandidate.fulfilled, (state, action) => {
            state.loading = false;
            state.pendingCandidates = action.payload;
            state.message = 'Pending candidates fetched.'
        })
        builder.addCase(getPendingCandidate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Could not fetch Pending Candidates'
        })
    },
})

export default adminSlice.reducer;