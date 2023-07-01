import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchUserFavorites} from '@shared/api/services/favorites';
import {IFavorite} from '@shared/interfacesAndTypes';

export const fetchAllFavoritesThunkCreator = createAsyncThunk(
    'favorites/fetchAllFavorites',
    async (userId: string) => {
      return await fetchUserFavorites<IFavorite[]>(userId);
    },
)
