import {configureStore} from "@reduxjs/toolkit";
import {drawerReducer} from "../../entities/drawer/model";

const reducer = {
    drawerReducer
};

const preloadedState = {};

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
})

export type RootReducer = ReturnType<typeof store.getState>