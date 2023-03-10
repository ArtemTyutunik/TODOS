import {createSlice} from '@reduxjs/toolkit';
import {ITodo} from '@shared/interfaces';

interface IInitialState {
    todos: ITodo[]
}

const initialState:IInitialState = {
  todos: [],
};

const findTaskById = (state:IInitialState, id: number) => state.todos.find((task) => task.id === id);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      return {...state, todos: [action.payload, ...state.todos]};
    },
    toggleTaskComplete: (state, action) => {
      const completedTask = findTaskById(state, action.payload);
            completedTask!.done = !completedTask!.done;
    },
    editTask: (state, action) => {
      const editTask = findTaskById(state, action.payload.id);
            editTask!.label = action.payload.label;
            editTask!.description = action.payload?.description;
            editTask!.date = action.payload?.date;
            editTask!.priority = action.payload?.priority;
            editTask!.Label = action.payload?.Label;
    },
    deleteTask: (state, action) => {
      const deletedTaskIndex = state.todos.findIndex((task) => task.id === action.payload);
      state.todos = [...state.todos.slice(0, deletedTaskIndex), ...state.todos.slice(deletedTaskIndex + 1)];
    },
    createDuplicate: (state, action) => {
      const originTask = findTaskById(state, action.payload);
      const duplicate = {...originTask!, id: Date.now()};
      return {...state, todos: [duplicate, ...state.todos]};
    },
    setPriority: (state, action) => {
      const task = findTaskById(state, action.payload.id);
            task!.priority = action.payload.priority;
    },
    dispatchNewDate: (state, action) => {
      const task = findTaskById(state, action.payload.id);
      if (task) {
        task.date = action.payload.newDate
      }
    },
  },
});

export const todosReducer = todosSlice.reducer;

export const {addNewTask,
  toggleTaskComplete,
  editTask,
  deleteTask,
  createDuplicate,
  setPriority,
  dispatchNewDate} = todosSlice.actions;
