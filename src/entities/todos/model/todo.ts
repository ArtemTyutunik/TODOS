import {createSlice} from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState: [{label: 'title'}],
    reducers: {}
})

export const todosReducer = todosSlice.reducer