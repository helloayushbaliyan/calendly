import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        userProfile: (state, action) => {
            state.profile = action.payload
        },
        clearProfile(state) {
            state.profile = null
        }
    }
})


export const { userProfile, clearProfile } = profileSlice.actions
export default profileSlice.reducer