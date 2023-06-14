import {createSlice} from '@reduxjs/toolkit';
import {IFavorite, RootReducer} from '@shared/interfacesAndTypes';

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
    getAllFavoritesAction: (state, action) => {
      return {...state, favorites: [...action.payload]}
    },
    addToFavorites: (state, action) => {
      return {...state, favorites: [...state.favorites, action.payload]}
    },
    deleteFromFavoritesAction: (state, action) => {
      return {...state, favorites: state.favorites.filter((favorite) => favorite.itemId !== action.payload)}
    },
  },
})


export const favoriteReducer = favoriteSlice.reducer

export const {getAllFavoritesAction, addToFavorites, deleteFromFavoritesAction} = favoriteSlice.actions

export const getAllFavorites = (state: RootReducer) => state.favoriteReducer.favorites
