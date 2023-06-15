import {fetchRequest} from '@shared/api/services/constants';
import {ITag} from '@shared/interfacesAndTypes';

export const fetchUserTags = async <T>(userId: string): Promise<T> => {
  const url = `get_tags?user_id=${userId}`;

  const response = await fetchRequest(url)
  return await response.json();
}

export const createNewUserTag = async (newTag: ITag, userId: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTag.settings),
  }

  fetchRequest(`/add_tag?user_id=${userId}&tag=${newTag.name}&id=${newTag.id}`, options)
}

export const deleteUserTag = async (tagId: string, userId: string) => {
  const options = {
    method: 'DELETE',
  }
  fetchRequest(`delete_tag?user_id=${userId}&id=${tagId}`, options)
}

export const editUserTag = async (tag: ITag, userId: string) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag.settings),
  }
  fetchRequest(`update_tag?user_id=${userId}&tag=${tag.name}&id=${tag.id}`, options)
}

