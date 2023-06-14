import {fetchRequest} from '@shared/api/services/constants';
import {IFavorite} from '@shared/interfacesAndTypes';

export const fetchUserFavorites = (userId: string) => new Promise((resolve, reject) => {
  const url = `get_favorites?user_id=${userId}`;

  fetchRequest(url)
      .then((response) => {
        //@ts-ignore
        return response.json()
      })
      .then((result) => resolve(result))
      .catch((error) => reject(error))
})


export const addUserFavorite = (userId: string, newFavorite: IFavorite) => new Promise((resolve, reject) => {
  const url = `add_favorite?user_id=${userId}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFavorite),
  }
  fetchRequest(url, options)
      .then((result) => resolve(result))
      .catch((error) => reject(error))
})

export const deleteUserFavorite = (userId: string, itemId: string) => new Promise((resolve, reject) => {
  const options = {
    method: 'DELETE',
  }
  const url = `delete_favorite?user_id=${userId}&itemId=${itemId}`;

  fetchRequest(url, options)
      .then((result) => resolve(result))
      .catch((error) => reject(error))
})
