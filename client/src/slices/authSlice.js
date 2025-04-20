import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    signupData : null,
    loading : false,
    accessToken : localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : null,
    refreshToken : localStorage.getItem("refreshToken") ? JSON.parse(localStorage.getItem("refreshToken")) : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState : initialState,
    reducers: {
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
})

export const {setSignupData, setAccessToken, setRefreshToken, setLoading} = authSlice.actions
export default authSlice.reducer