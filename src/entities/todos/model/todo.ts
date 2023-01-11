import {createSlice} from "@reduxjs/toolkit";
import {ITodo} from "../ui/todo";

interface IInitialState {
    todos: ITodo[]
}

const initialState:IInitialState = {
    todos: []
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addNewTask: (state, action) => {
            state.todos.push(action.payload)
        }
    }
})

export const todosReducer = todosSlice.reducer;

export const {addNewTask} = todosSlice.actions