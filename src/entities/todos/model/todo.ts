import {createSlice} from "@reduxjs/toolkit";
import {ITodo} from "../../../shared/interfaces";

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
        },
        toggleTaskComplete: (state, action) => {
            const completedTask = state.todos.find(task => task.id === action.payload)
            completedTask!.done = !completedTask!.done
        },
        editTask: (state, action) => {
            const editTask = state.todos.find(task => task.id === action.payload.id)
            editTask!.label = action.payload.label;
            editTask!.description = action.payload?.description
        }
    }
})

export const todosReducer = todosSlice.reducer;

export const {addNewTask,toggleTaskComplete, editTask} = todosSlice.actions