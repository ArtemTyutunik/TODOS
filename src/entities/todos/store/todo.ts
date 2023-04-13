import {createSlice} from '@reduxjs/toolkit';
import {ITodo} from '@shared/interfaces';

interface IInitialState {
    todos: ITodo[]
}

const initialState: IInitialState = {
  todos: [],
};

const findTaskById = (state: IInitialState, id: number) => state.todos.find((task) => task.id === id);

const updateTodoInState = (state: IInitialState, todo: ITodo) => {
  const index = state.todos.findIndex((element) => element.id === todo.id)
  if (index !== undefined) {
    return {...state,
      todos: [...state.todos.slice(0, index), todo, ...state.todos.slice(index+1)],
    }
  }
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTasks: (state, action) => {
      return {...state, todos: [...action.payload, ...state.todos]};
    },
    addNewTask: (state, action) => {
      return {...state, todos: [...state.todos, action.payload]};
    },
    toggleTaskComplete: (state, action) => {
      const completedTask = findTaskById(state, action.payload);
            completedTask!.done = !completedTask!.done;
    },
    editTask: (state, action) => {
      return updateTodoInState(state, action.payload)
    },
    deleteTask: (state, action) => {
      const deletedTaskIndex = state.todos.findIndex((task) => task.id === action.payload);
      state.todos = [...state.todos.slice(0, deletedTaskIndex), ...state.todos.slice(deletedTaskIndex + 1)];
    },
    setPriority: (state, action) => {
      const task = findTaskById(state, action.payload.id);
      if (task) {
        return updateTodoInState(state, {...task, priority: action.payload.priority})
      }
    },
    dispatchNewDate: (state, action) => {
      const task = findTaskById(state, action.payload.id);
      if (task) {
        return updateTodoInState(state, {...task, date: action.payload.newDate})
      }
    },
  },
});

export const todosReducer = todosSlice.reducer;

export const {addNewTask,
  toggleTaskComplete,
  editTask,
  deleteTask,
  setPriority,
  dispatchNewDate,
  fetchTasks} = todosSlice.actions;
