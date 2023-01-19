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
        },
        toggleTaskComplete: (state, action) => {
            const completedTask = state.todos.find(task => task.id === action.payload)
            completedTask!.done = !completedTask!.done
        }
    }
})

export const todosReducer = todosSlice.reducer;

export const {addNewTask,toggleTaskComplete} = todosSlice.actions