import axiosInstance from "@/app/utils/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { setIsAuthenticated } from "./authSlice";
import toast from "react-hot-toast";
import { setUserProfile } from "./userSlice";

const initialState = {
    allCandidates: [],
    approvedCandidates: [],
    pendingCandidates: [],
    myCandidates: [],
    myProvincialCandidates: [],
    resultCandidates: [],

    loading: false,
    error: '',
    message: ''
}
const resource = '/candidate';

export const createCandidateProfile = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'candidate/createCandidateProfile',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/register-candidate`, data.profile)
            if (response.status === 201) {
                data.router.push('/candidate/login')
                return response.data;
            }
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const updateCandidateProfile = createAsyncThunk(
    'candidate/completeCandidateProfile',
    async (data: any, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_ENDPOINT}/candidate/update-profile`, data.profile, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    'x_auth_token': data.token
                }
            });
            if (response.status === 200) {
                dispatch(getCandidateProfile());
                // setUserProfile({ profile: data.profile })
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getCandidateProfile = createAsyncThunk(
    'candidate/getCandidateProfile',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.get('/candidate/get-candidate-profile')
            dispatch(setIsAuthenticated(true));
            dispatch(setUserProfile(response.data))
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getAllCandidates = createAsyncThunk(
    'candidate/getAllCandidates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/candidate/all-candidates');
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getApprovedCandidates = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'candidate/getApprovedCandidates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/candidate/approved-candidates');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data.message || 'error fetching approved candidates.' })
        }
    }
)

export const getPendingCandidates = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'candidate/getPendingCandidates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('candidate/pending-candidates');
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message || 'error getting pending candidates' })
        }
    }
)

export const getRelevantCandidates = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'candidate/relevantCandidates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance('/candidate/my-candidates');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const getProvincialRelevantCandidates = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'candidate/provincialCandidates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/candidate/my-provincial-candidates');
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

export const approvedCandidatesForResults = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'candidate/approvedCandidateForResults',
    async (data: { electionSessionId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/candidate/approved-candidates-for-results', data);
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error?.message })
        }
    }
)

const candidateSlice = createSlice({
    name: 'candidate',
    initialState: initialState,
    reducers: {
        updateCandidateVote: (state, action) => {
            console.log('updateCandidateVote invoked')
            const voterId = action.payload?.voterId;
            const candidateId = action.payload?.candidateId;
            if (state.resultCandidates.length > 0) {
                let candidate: any;
                candidate = state.resultCandidates.find((candidate: any) => candidate._id === candidateId);
                if (candidate) {
                    candidate.votes[0].voters.push(voterId)
                }
                else {
                    console.log('no candidate found or voter already voted. ')
                }
            }
            else {
                console.log('result candidates are empty, fetch them')
            }
        }
    },
    extraReducers(builder) {
        // create candidate profile builder

        builder.addCase(createCandidateProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createCandidateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message || 'Candidate profile created. Login to continue.'
        })
        builder.addCase(createCandidateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Could not create a candidate profile.'
        })

        // get candidate profile builder
        builder.addCase(getCandidateProfile.pending, state => {
            state.loading = true;
        })
        builder.addCase(getCandidateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message || 'Candidate Profile fetched.'
        })
        builder.addCase(getCandidateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Could not fetch Candidate Profile'
            toast.error(state.error);
        })

        // update candidate profile builder
        builder.addCase(updateCandidateProfile.pending, state => {
            state.loading = true;
        })
        builder.addCase(updateCandidateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message || 'Your profile has been updated'
            toast.success(state.message);
        })
        builder.addCase(updateCandidateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Could not update your profile'
            toast.error(state.error)
        })

        // get all candidates builder
        builder.addCase(getAllCandidates.pending, state => {
            state.loading = true;
        })
        builder.addCase(getAllCandidates.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action)
            state.message = action.payload?.message;
            state.allCandidates = action.payload?.allCandidates;
        })
        builder.addCase(getAllCandidates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch All Candidates'
        })

        // get approved candidates builder
        builder.addCase(getApprovedCandidates.pending, state => {
            state.loading = true;
        })
        builder.addCase(getApprovedCandidates.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
            state.approvedCandidates = action.payload?.candidates;
        })
        builder.addCase(getApprovedCandidates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'builder error in fetching approved candidates'
        })

        // get pending candidates builder
        builder.addCase(getPendingCandidates.pending, state => {
            state.loading = true;
        })
        builder.addCase(getPendingCandidates.fulfilled, (state, action) => {
            state.loading = false;
            state.pendingCandidates = action.payload;
            state.message = 'pending candidates fetched';
        })
        builder.addCase(getPendingCandidates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'builder error in fetching pending candidates';
        })

        // my candidates builder
        builder.addCase(getRelevantCandidates.pending, state => {
            state.loading = true;
        })
        builder.addCase(getRelevantCandidates.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
            state.myCandidates = action.payload?.candidates;
        })
        builder.addCase(getRelevantCandidates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Error fetching relevant candidates.'
        })

        // my provincial candidates builder
        builder.addCase(getProvincialRelevantCandidates.pending, state => {
            state.loading = true;
        })
        builder.addCase(getProvincialRelevantCandidates.fulfilled, (state, action) => {
            state.loading = false;
            state.myProvincialCandidates = action.payload?.candidates;
            state.message = action.payload?.message;
        })
        builder.addCase(getProvincialRelevantCandidates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Error fetching relevant provincial candidates';
        })

        // approved candidates for results builder
        builder.addCase(approvedCandidatesForResults.pending, state => {
            state.loading = true;
        })
        builder.addCase(approvedCandidatesForResults.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
            state.resultCandidates = action.payload?.candidates;
        })
        builder.addCase(approvedCandidatesForResults.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message!;
        })
    },
})

export default candidateSlice.reducer;

export const { updateCandidateVote } = candidateSlice.actions;