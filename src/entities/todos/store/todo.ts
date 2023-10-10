import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITodo, Priority, tagIdType, TodoId} from '@shared/interfacesAndTypes';
import {RootReducer} from '@shared/interfacesAndTypes';

interface IInitialState {
  todos: ITodo[],
  isFetched: boolean,
  isErrorFetching: boolean,
  isRequestPending: boolean
}

const initialState: IInitialState = {
  todos: [],
  isFetched: false,
  isErrorFetching: false,
  isRequestPending: false,
};

const findTaskById = (state: IInitialState, id: number) => state.todos.find((task) => task.id === id);

const updateTodoInState = (state: IInitialState, todo: ITodo) => {
  const index = state.todos.findIndex((element) => element.id === todo.id)
  if (index !== -1) {
    return {...state,
      todos: [...state.todos.slice(0, index), todo, ...state.todos.slice(index+1)],
    }
  }
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
      return {...state, isRequestPending: payload}
    },
    fetchTasks: (state, {payload}: PayloadAction<ITodo[]>) => {
      return {...state, todos: [...payload], isFetched: true};
    },
    updateTodos: (state, {payload}: PayloadAction<ITodo[]> ) => {
      return {...state, todos: [...payload]}
    },
    fetchWithError: (state) => {
      return {...state, isErrorFetching: true}
    },
    removeFetchError: (state) => {
      return {...state, isErrorFetching: false, isFetched: false}
    },
    addNewTask: (state, {payload}: PayloadAction<ITodo>) => {
      return {...state, todos: [...state.todos, payload]};
    },
    toggleTaskComplete: (state, {payload}: PayloadAction<TodoId>) => {
      const completedTask = findTaskById(state, payload);
      if (completedTask) {
        completedTask.done = !completedTask.done;
      }
    },
    editTask: (state, {payload}: PayloadAction<ITodo>) => {
      return updateTodoInState(state, payload)
    },
    deleteTask: (state, {payload}: PayloadAction<TodoId>) => {
      const deletedTaskIndex = state.todos.findIndex((task) => task.id === payload);
      state.todos = [...state.todos.slice(0, deletedTaskIndex), ...state.todos.slice(deletedTaskIndex + 1)];
    },
    setPriority: (state, {payload}: PayloadAction<{ id: number, priority: Priority }>) => {
      const task = findTaskById(state, payload.id);
      if (task) {
        return updateTodoInState(state, {...task, priority: payload.priority})
      }
    },
    addNewTodoTag: (state, {payload}: PayloadAction<{id: TodoId, tagId: tagIdType}>) => {
      const task = findTaskById(state, payload.id);
      if (task) {
        return updateTodoInState(state, {...task, tags: [...task.tags || [], payload.tagId]})
      }
    },
    deleteTodoTag: (state, {payload}: PayloadAction<{id: TodoId, tagId: tagIdType}>) => {
      const task = findTaskById(state, payload.id);
      if (task) {
        const {tags} = task
        const index = tags?.indexOf(payload.tagId)
        return updateTodoInState(state, {...task,
          tags: [...tags!.slice(0, index), ...tags!.slice(index!+1)],
        })
      }
    },
    dispatchNewDate: (state, {payload}: PayloadAction<{id: TodoId, newDate: string | undefined}>) => {
      const task = findTaskById(state, payload.id);
      if (task) {
        return updateTodoInState(state, {...task, date: payload.newDate})
      }
    },
    toggleIsCurrent: (state, {payload}: PayloadAction<ITodo>) => {
      return updateTodoInState(state, payload)
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
  deleteTodoTag,
  toggleIsCurrent,
  fetchWithError,
  updateTodos,
  setIsLoading,
  removeFetchError} = todosSlice.actions;

export const allTodosSelector = (state: RootReducer) => state.todosReducer.todos
export const isErrorFetchingSelector = (state: RootReducer) => state.todosReducer.isErrorFetching
