import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFavorite, RootReducer} from '@shared/interfacesAndTypes';
import {fetchAllFavoritesThunkCreator} from '@features/addToFavorites/model/thunks';

interface initialStateInterface {
  favorites: IFavorite[],
}

const initialState: initialStateInterface = {
  favorites: [],
}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    addToFavorites: (state, {payload}: PayloadAction<IFavorite>) => {
      return {...state, favorites: [...state.favorites, payload]}
    },
    deleteFromFavoritesAction: (state, {payload}: PayloadAction<string>) => {
      return {...state, favorites: state.favorites.filter((favorite) => favorite.itemId !== payload)}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllFavoritesThunkCreator.fulfilled, (state, {payload}) => {
      return {...state, favorites: [...payload]}
    })
  },
})


export const favoriteReducer = favoriteSlice.reducer

export const {addToFavorites, deleteFromFavoritesAction} = favoriteSlice.actions

export const getAllFavorites = (state: RootReducer) => state.favoriteReducer.favorites
