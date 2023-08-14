import {createAsyncThunk} from '@reduxjs/toolkit';
import {addUserFavorite, deleteUserFavorite, fetchUserFavorites} from '@shared/api/services/favorites';
import {IFavorite} from '@shared/interfacesAndTypes';
import {addToFavorites} from '@features/addToFavorites';
import {deleteFromFavoritesAction} from '@features/addToFavorites/model/store';

export const fetchAllFavoritesThunk = createAsyncThunk(
    'favorites/fetchAllFavorites',
    async () => {
      return await fetchUserFavorites<IFavorite[]>();
    },
)

export const addUserFavoriteThunk = createAsyncThunk(
    'favorites/addUserFavorite',
    async (newFavorite: IFavorite, {dispatch}) => {
      try {
        await addUserFavorite(newFavorite)
        dispatch(addToFavorites(newFavorite))
      } catch (e) {
        console.log(e)
      }
    })

export const deleteUserFavoriteThunk = createAsyncThunk(
    'favorites/deleteUserFavorite',
    async (favoriteItemId: string, {dispatch}) => {
      try {
        await deleteUserFavorite(favoriteItemId)
        dispatch(deleteFromFavoritesAction(favoriteItemId))
      } catch (e) {
        console.log(e)
      }
    },
)
