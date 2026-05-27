import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    session: null,
    user: null,
    accessToken: null,
    isAuthenticated: false,

}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.session = action.payload;
            state.user = action.payload?.user;
            state.accessToken = action.payload?.session.access_token;
            state.isAuthenticated = !!action.payload?.session;
            console.log("Login:", state);


        },
        logout(state) {
            state.session = null;
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.loading = false;
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
