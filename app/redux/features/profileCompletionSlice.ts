import axiosInstance from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "./userSlice";
import axios from "axios";

const initialState = {
    user: {

    },
    allParties: [],
    loading: false,
    message: '',
    error: ''
}


export const updateProfile = createAsyncThunk(
    'profileCompletion/updateProfile',
    async (data: any, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_ENDPOINT}/user/update-user-profile`, data.profile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x_auth_token': data.token
                }
            })
            if (response.status === 200) {
                dispatch(getUserProfile());
                data.router.push('/user/dashboard');
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const allPoliticalParties = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'user/allPoliticalParties',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/user/all-political-parties');
            console.log(response)
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error?.message })
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
            state.message = action.payload?.message || 'User updated!'
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'We were not able to update user.'
        })

        // all political parties builder
        builder.addCase(allPoliticalParties.pending, state => {
            state.loading = true;
        })
        builder.addCase(allPoliticalParties.fulfilled, (state, action) => {
            state.loading = false;
            state.allParties = action.payload?.allParties;
            state.message = action.payload?.message
        })
        builder.addCase(allPoliticalParties.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Error occurred while fetching all political parties.';
        })

    },
}
)

export default profileCompletionSlice.reducer;