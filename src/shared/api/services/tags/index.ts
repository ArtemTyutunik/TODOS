import {fetchRequest} from '@shared/api/services/constants';
import {ITag} from '@shared/interfacesAndTypes';
import getUserId from '@shared/helpers/getUserId';


export const fetchUserTags = async <T>(): Promise<T> => {
  const userId = getUserId()
  const url = `tag/get?user_id=${userId}`;

  const response = await fetchRequest(url)
  return await response.json();
}

export const createNewUserTag = async (newTag: ITag) => {
  const userId = getUserId()

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTag),
  }

  fetchRequest(`tag/add?user_id=${userId}`, options)
}

export const deleteUserTag = async (tagId: string) => {
  const userId = getUserId()

  const options = {
    method: 'DELETE',
  }
  fetchRequest(`tag/delete?user_id=${userId}&tag_id=${tagId}`, options)
}

export const editUserTag = async (tag: ITag) => {
  const userId = getUserId()

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  }
  fetchRequest(`tag/update?user_id=${userId}`, options)
}

