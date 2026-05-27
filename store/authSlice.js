import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    session: null,
    isAuthenticated: false,

}

console.log(initialState);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.session = action.payload
            state.user = action.payload
            state.isAuthenticated = !!action.payload
        },
        logout(state) {
            state.session = null
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
