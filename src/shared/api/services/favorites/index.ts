import {fetchRequest} from '@shared/api/services/constants';
import {IFavorite} from '@shared/interfacesAndTypes';
import getUserId from '@shared/helpers/getUserId';

const userId = getUserId()

export const fetchUserFavorites = async <T>(): Promise<T> => {
  const url = `favorite/get?user_id=${userId}`;

  const response = await fetchRequest(url);

  return await response.json();
}


export const addUserFavorite = async (newFavorite: IFavorite) => {
  const url = `favorite/add?user_id=${userId}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFavorite),
  }

  return await fetchRequest(url, options)
}

export const deleteUserFavorite = async (itemId: string) => {
  const options = {
    method: 'DELETE',
  }
  const url = `favorite/delete?user_id=${userId}&favorite_id=${itemId}`;

  return await fetchRequest(url, options)
}
