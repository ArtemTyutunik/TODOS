import {createSlice} from '@reduxjs/toolkit';
import {ITodo} from '@shared/interfacesAndTypes';
import {RootReducer} from '@shared/interfacesAndTypes';

interface IInitialState {
  todos: ITodo[],
  isFetched: boolean
}

const initialState: IInitialState = {
  todos: [],
  isFetched: false,
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
      return {...state, todos: [...action.payload], isFetched: true};
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
    addNewTodoTag: (state, action) => {
      const task = findTaskById(state, action.payload.id);
      if (task) {
        return updateTodoInState(state, {...task, tags: [...task.tags || [], action.payload.tag]})
      }
    },
    deleteTodoTag: (state, action) => {
      const task = findTaskById(state, action.payload.id);
      if (task) {
        const {tags} = task
        const index = tags?.map((tag) => tag.name).indexOf(action.payload.tag.name)
        return updateTodoInState(state, {...task,
          tags: [...tags!.slice(0, index), ...tags!.slice(index!+1)],
        })
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
  addNewTodoTag,
  fetchTasks,
  deleteTodoTag} = todosSlice.actions;

export const allTodosSelector = (state: RootReducer) => state.todosReducer.todos
