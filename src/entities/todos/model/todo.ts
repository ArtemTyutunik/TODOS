import {createSlice} from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {}
})

export const todosReducer = todosSlice.reducer