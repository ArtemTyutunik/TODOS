import {configureStore} from "@reduxjs/toolkit";
const reducer = {};

const preloadedState = {};

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
})