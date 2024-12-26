import axiosInstance from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setIsAuthenticated } from "./authSlice";
import { getRelevantCandidates } from "./candidateSlice";


const initialState = {
    userProfile: {
        _id: '',
        profilePicture: '',
        role: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        profileCompletion: false,
        status: '',
        constituency: '',
        provincialConstituency: '',
        province: '',
        cnicFront: '',
        cnicBack: '',
        naVote: '',
        paVote: '',
        partyAffiliation: '',
        dateOfBirth: '',
        gender: '',
        cnicNumber: '',
        constituencyType: '',
        manifesto: '',
        codeOfConduct: false,
        assetDeclaration: '',
        educationalCertificates: ''
    },
    searchedCandidates: [],

    loading: false,
    message: '',
    error: '',

    showLogin: false,
}


export const searchCandidatesOffConstituency = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'user/getCandidatesOffConstituency',
    async (data: { constituency: string, electionSessionId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/candidate/candidates-off-constituency', data);
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const castVote = createAsyncThunk
    <
        any,
        { candidateId: string, votingSessionPublicKey: string },
        { rejectValue: { message: string } }
    >(
        'user/castVote',
        async (data: any, { rejectWithValue, dispatch }) => {
            try {
                const response = await axiosInstance.post('/user/cast-a-vote', data);
                dispatch(getRelevantCandidates())
                dispatch(getUserProfile());
                return response;
            } catch (error: any) {
                return rejectWithValue({ message: error.response?.data?.message })
            }
        }
    )

export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.get('/user/get-user-profile')
            dispatch(setIsAuthenticated(true))
            dispatch(setShowLogin(false))
            return response.data
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setShowLogin: (state, action) => {
            state.showLogin = action.payload;
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        }

    },

    extraReducers(builder) {
        builder.addCase(getUserProfile.pending, state => {
            state.loading = true;
        })
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userProfile = action.payload;
            state.message = action.payload?.message || 'User profile fetched.'
        })
        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Profile fetching failed.'
        })

        // cast a vote builder
        builder.addCase(castVote.pending, state => {
            state.loading = true;
        })
        builder.addCase(castVote.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
        })
        builder.addCase(castVote.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Could not cast a vote.'
        })

        // search candidates based off constituency
        builder.addCase(searchCandidatesOffConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(searchCandidatesOffConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
            state.searchedCandidates = action.payload?.candidates;
        })
        builder.addCase(searchCandidatesOffConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Could not get candidates.';
        })
    },

})

export default userSlice.reducer;
export const { setShowLogin, setUserProfile } = userSlice.actions;
