import {createSlice} from '@reduxjs/toolkit';
import {RootReducer} from '@app/store';

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
    tags: []},
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
    // @ts-ignore
    getUserTags: (state, action) => {
      return {...state, tags: [...action.payload]}
    },
    // @ts-ignore
    //Fixme
    addNewUserTag: (state, action) => {
      return {...state, tags: [...state.tags, action.payload]}
    },
    deleteTag: (state, action) => {
      return {...state, tags: [...state.tags.filter((tag) => tag !== action.payload)]}
    },
  },
});

export const userReducer = userSlice.reducer;

export const userIdSelector = (state: RootReducer) => state.userReducer.user.user_id
export const userTags = (state: RootReducer) => state.userReducer.tags

export const {authUser, logOutUser, authWithError, signUpUser, addNewUserTag, getUserTags, deleteTag} = userSlice.actions;
