import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import * as reducers from './reducers';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const preloadedState = {};

export const store = configureStore({
  reducer: {...reducers},
  devTools: process.env.NODE_ENV !== 'production',
  middleware: customizedMiddleware,
  preloadedState,
});

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export type RootReducer = ReturnType<typeof store.getState>
