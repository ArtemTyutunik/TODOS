import {configureStore} from "@reduxjs/toolkit";
import {drawerReducer} from "../../entities/drawer/model";
import {todosReducer} from "../../entities/todos/model/todo";

const reducer = {
    todosReducer,
    drawerReducer
};

const preloadedState = {};

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
})

export type RootReducer = ReturnType<typeof store.getState>