import {createSlice} from "@reduxjs/toolkit";
import {ITodo} from "../../../shared/interfaces";

interface IInitialState {
    todos: ITodo[]
}

const initialState:IInitialState = {
    todos: []
}

const findTaskById = (state:IInitialState, id: number) => state.todos.find(task => task.id === id)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addNewTask: (state, action) => {
            state.todos.push(action.payload)
        },
        toggleTaskComplete: (state, action) => {
            const completedTask = findTaskById(state, action.payload)
            completedTask!.done = !completedTask!.done
        },
        editTask: (state, action) => {
            const editTask = findTaskById(state, action.payload.id)
            editTask!.label = action.payload.label;
            editTask!.description = action.payload?.description
        },
        deleteTask: (state, action) => {
            const deletedTaskIndex = state.todos.findIndex(task => task.id === action.payload)
            state.todos = [...state.todos.slice(0, deletedTaskIndex), ...state.todos.slice(deletedTaskIndex + 1)]
        },
        createDuplicate: (state, action) => {
            const originTask = findTaskById(state, action.payload)
            const duplicate = {...originTask!, id: Date.now()}
            state.todos.push(duplicate)
        },
        setPriority: (state, action) => {
            const task = findTaskById(state, action.payload.id)
            task!.priority = action.payload.priority
        }
    }
})

export const todosReducer = todosSlice.reducer;

export const {addNewTask,toggleTaskComplete, editTask,deleteTask,createDuplicate, setPriority} = todosSlice.actions