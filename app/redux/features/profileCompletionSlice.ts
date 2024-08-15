import axiosInstance from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {

    },

    loading: false,
    message: '',
    error: ''
}


export const updateProfile = createAsyncThunk(
    'profileCompletion/updateProfile',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch('/user/update-user-profile', data)
            console.log(data);

            return response.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const profileCompletionSlice = createSlice({
    name: 'profileCompletion',
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(updateProfile.pending, state => {
            state.loading = true;
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.message = action.payload.message || 'User updated!'
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'We were not able to update user.'
        })

    },
}
)

export default profileCompletionSlice.reducer;