import axiosInstance from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setIsAuthenticated } from "./authSlice";

const initialState = {
    userProfile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        profileCompletion: ''
    },

    loading: false,
    message: '',
    error: '',

    showLogin: false,
}

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

    },

})

export default userSlice.reducer;
export const { setShowLogin } = userSlice.actions;
