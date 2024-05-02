import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import {BASE_URL} from "@/libs/difinition";


// Define a type for the user profile

type UserProfile = {
	avatar: string;
	bio: string;
	created_at: string;
	updated_at: string;
};

// Define the initial state using that type

type initialStateType = {
    status: 'idle' | 'loading' | 'success' | 'failed',
    userProfile: UserProfile | null,
    error: string | undefined
}

const initialState: initialStateType = {
    status: 'idle',
    userProfile: null,
    error: undefined
};

// create asyn thunk
export const fetchUserProfile = createAsyncThunk("userProfile/fetchUserProfile", async () => {
    const response = await fetch(`${BASE_URL}/api/user/profile/`,{
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    });
    const data = await response.json();
    return data;
})

 const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.status = 'success';
            state.userProfile = action.payload;
        });
        builder.addCase(fetchUserProfile.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
})

export default userProfileSlice.reducer;

// create selector
export const selectAvatar = (state: RootState) => state.userProfile.userProfile?.avatar;
export const selectBio = (state: RootState) => state.userProfile.userProfile?.bio;

