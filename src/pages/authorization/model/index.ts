import {createSlice} from "@reduxjs/toolkit";

const configureInitialState = () => {
    const storageRes = localStorage.getItem('user');
    return storageRes? {
        user:JSON.parse(storageRes),
        isAuth: true
    } : {
        user: {},
        isAuth: false
    }
}

const userSlice = createSlice({
    name: 'authorization',
    initialState: {...configureInitialState(), isError: false, errorMessage: null},
    reducers: {
        authUser: (state, action) => {
            state.isAuth = true;
            state.user = {...action.payload}
            state.isError = false
            state.errorMessage = null
        },
        logOutUser: (state) => {
            state.isAuth = false;
            state.user = {}
        },
        authWithError: ( state, action) => {
            state.isError = true
            state.errorMessage = action.payload
        }
    }
})

export const userReducer = userSlice.reducer;

export const {authUser,logOutUser,authWithError} = userSlice.actions