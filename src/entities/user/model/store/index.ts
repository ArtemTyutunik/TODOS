import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, RootReducer} from '@shared/interfacesAndTypes';

interface initialState {
  user: IUser | null,
  isAuth: boolean,
  errorMessage: string | null,
  isError: boolean,
  verified: boolean | 'unset',
}

const getVerifiedStatus = (): boolean | 'unset' => {
  const storageValue = localStorage.getItem('verified')
  console.log(storageValue)
  return storageValue ? JSON.parse(storageValue) : 'unset';
}

const configureInitialState = (): initialState => {
  const storageRes = localStorage.getItem('user');
  return storageRes? {
    user: JSON.parse(storageRes),
    isAuth: true,
    isError: false,
    errorMessage: null,
    verified: getVerifiedStatus(),
  } : {
    user: null,
    isAuth: false,
    isError: false,
    errorMessage: null,
    verified: 'unset',
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
      return {...state, user: null, isAuth: false, verified: 'unset'}
    },
    authWithError: ( state, {payload}: PayloadAction<string>) => {
      state.isError = true;
      state.errorMessage = payload;
    },
    setUserPicture: (state, {payload}: PayloadAction<string>) => {
      if (state.user) {
        return {...state, user: {...state.user, picture: payload}}
      } else return state
    },
    authVerified: (state, {payload}: PayloadAction<boolean>) => {
      return {...state, verified: payload}
    },
  },
});

export const userReducer = userSlice.reducer;

export const userIdSelector = (state: RootReducer) => state.userReducer.user?.user_id || ''

export const isVerifiedSelector = (state: RootReducer) => state.userReducer.verified

export const {authUser,
  setUserPicture,
  logOutUser,
  authWithError,
  signUpUser,
  authVerified} = userSlice.actions;
