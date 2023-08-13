import {fetchRequest} from '@shared/api/services/constants';
import {ITag} from '@shared/interfacesAndTypes';

export const fetchUserTags = async <T>(userId: string): Promise<T> => {
  const url = `tag/get?user_id=${userId}`;

  const response = await fetchRequest(url)
  return await response.json();
}

export const createNewUserTag = async (newTag: ITag, userId: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTag),
  }

  fetchRequest(`tag/add?user_id=${userId}`, options)
}

export const deleteUserTag = async (tagId: string, userId: string) => {
  const options = {
    method: 'DELETE',
  }
  fetchRequest(`tag/delete?user_id=${userId}&tag_id=${tagId}`, options)
}

export const editUserTag = async (tag: ITag, userId: string) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  }
  fetchRequest(`tag/update?user_id=${userId}`, options)
}

