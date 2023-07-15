import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, RootReducer} from '@shared/interfacesAndTypes';

interface initialState {
  user: IUser | null,
  isAuth: boolean,
  errorMessage: string | null,
  isError: boolean,
}

const configureInitialState = (): initialState => {
  const storageRes = localStorage.getItem('user');
  return storageRes? {
    user: JSON.parse(storageRes),
    isAuth: true,
    isError: false,
    errorMessage: null,
  } : {
    user: null,
    isAuth: false,
    isError: false,
    errorMessage: null,
  };
};

const userSlice = createSlice({
  name: 'authorization',
  initialState: {...configureInitialState()},
  reducers: {
    authUser: (state, {payload}: PayloadAction<IUser>) => {
      return {...state, isAuth: true, user: {...payload}, isError: false};
    },
    signUpUser: (state, {payload}: PayloadAction<IUser>) => {
      return {...state, isAuth: true, user: {...payload}, isError: false};
    },
    logOutUser: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    authWithError: ( state, {payload}: PayloadAction<string>) => {
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const userIdSelector = (state: RootReducer) => state.userReducer.user?.user_id || ''

export const {authUser, logOutUser, authWithError, signUpUser} = userSlice.actions;
