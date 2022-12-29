import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {drawerReducer} from "../../entities/drawer/model";
import {todosReducer} from "../../entities/todos/model/todo";
import {userReducer} from "../../pages/authorization/model";

const reducer = {
    todosReducer,
    drawerReducer,
    userReducer
};
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

const preloadedState = {};

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: customizedMiddleware,
    preloadedState
})

export type RootReducer = ReturnType<typeof store.getState>