import {createSlice} from "@reduxjs/toolkit";
import {ITodo} from "../ui/todo";

const initialState: ITodo[] = []

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {}
})

export const todosReducer = todosSlice.reducer