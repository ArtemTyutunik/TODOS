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
    initialState: configureInitialState(),
    reducers: {
        authUser: (state, action) => {
            state.isAuth = true;
            state.user = {...action.payload}
        }
    }
})

export const userReducer = userSlice.reducer;

export const authUserAction = userSlice.actions.authUser