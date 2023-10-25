//it is only use to store user creadentials to local storage if user is authenticated and remove from them.

import { createSlice } from "@reduxjs/toolkit";

//it will check the local storage first if its found userInfo then he will use otherwise null
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;