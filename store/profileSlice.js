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
        }
    }
})

console.log(initialState);



export const { userProfile } = profileSlice.actions
export default profileSlice.reducer