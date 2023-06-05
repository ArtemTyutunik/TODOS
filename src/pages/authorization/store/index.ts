import {createSlice} from '@reduxjs/toolkit';
import {RootReducer} from '@shared/interfacesAndTypes';

const configureInitialState = () => {
  const storageRes = localStorage.getItem('user');
  return storageRes? {
    user: JSON.parse(storageRes),
    isAuth: true,
  } : {
    user: {},
    isAuth: false,
  };
};

const userSlice = createSlice({
  name: 'authorization',
  initialState: {...configureInitialState(),
    isError: false,
    errorMessage: null,
  },
  reducers: {
    authUser: (state, action) => {
      return {...state, isAuth: true, user: {...action.payload}};
    },
    signUpUser: (state, action) => {
      return {...state, isAuth: true, user: {...action.payload}};
    },
    logOutUser: (state) => {
      state.isAuth = false;
      state.user = {};
    },
    authWithError: ( state, action) => {
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userIdSelector = (state: RootReducer) => state.userReducer.user.user_id

export const {authUser, logOutUser, authWithError, signUpUser} = userSlice.actions;
