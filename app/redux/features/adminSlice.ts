'use client'
import axiosInstance from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { setUserProfile } from "./userSlice";
import { setIsAuthenticated } from "./authSlice";
import toast from "react-hot-toast";
import { getAllCandidates } from "./candidateSlice";

interface initState {
    isAuthenticated: string,
    profile: object,
    pendingCandidates: Array<object>,
    allParties: Array<object>,
    message: string,
    error: string,
    loading: boolean,
    toastId: undefined | string

}

const initialState: initState = {
    isAuthenticated: '',
    profile: {

    },
    pendingCandidates: [],
    allParties: [],
    message: '',
    error: '',
    loading: false,
    toastId: undefined,
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
            dispatch(setIsAuthenticated(true));
            dispatch(setUserProfile(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    })

export const approveOrRejectCandidate = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'admin/approveOrRejectCandidate',
    async (data: { id: number, status: string, setShow: React.Dispatch<React.SetStateAction<boolean>> }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.put(`/admin/candidates/approve-or-reject-candidate/${data.id}`, { status: data.status });
            data.setShow(false);
            dispatch(getPendingCandidate());
            dispatch(getAllCandidates())
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message || 'Request failed.' })
        }
    }
)

export const addPoliticalParty = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'admin/addPoliticalParty',
    async (data: any, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.post('/admin/create-political-party', data.party)
            data.setDisplay(false)
            dispatch(allPoliticalParties());
            return response.data;
        } catch (error: any) {
            console.log(error.message)
            return rejectWithValue({ message: error?.message })
        }
    }
)

export const allPoliticalParties = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'admin/allPoliticalParties',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/all-political-parties');
            console.log(response)
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error?.message })
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
        builder.addCase(loginAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.message = 'Authenticated!';
            localStorage.setItem('x_auth_token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
        });

        builder.addCase(loginAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Authentication error.';
        });


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

        // add political party builder
        builder.addCase(addPoliticalParty.pending, state => {
            state.loading = true;
        })
        builder.addCase(addPoliticalParty.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message || 'Political Party added successfully.'
            toast.success(state.message)
        })
        builder.addCase(addPoliticalParty.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Error occurred while adding a Political Party.';
            toast.error(state.error)
        })

        // all political parties builder
        builder.addCase(allPoliticalParties.pending, state => {
            state.loading = true;
        })
        builder.addCase(allPoliticalParties.fulfilled, (state, action) => {
            state.loading = false;
            state.allParties = action.payload?.allParties;
            state.message = action.payload?.message;
        })
        builder.addCase(allPoliticalParties.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Error occurred while fetching all political parties.';
        })

        // approve or reject builder
        builder.addCase(approveOrRejectCandidate.pending, state => {
            state.loading = true;
        })
        builder.addCase(approveOrRejectCandidate.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
            toast.success(state.message);
        })
        builder.addCase(approveOrRejectCandidate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Error occurred while submitting request.';
            toast.error(state.error);
        })
    },
})

export default adminSlice.reducer;