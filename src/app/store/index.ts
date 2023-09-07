import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import * as reducers from '../reducers';
import {useDispatch} from 'react-redux';

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

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootReducer = ReturnType<typeof store.getState>
