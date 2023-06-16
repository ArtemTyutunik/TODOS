import {ITag, ITodo} from '@shared/interfacesAndTypes';
import {fetchRequest} from '@shared/api/services/constants';

export const getUserTodos = async <T>(userId: string): Promise<T> => {
  const transformTodo = (todo: ITodo) => {
    const {tags} = todo
    const transformedTags = tags?.map((tag: string | ITag) => {
      return typeof tag !== 'string' ? tag?.id : tag
    })

    return {...todo, tags: transformedTags}
  }

  const response = await fetchRequest(`get_all/${userId}`)
  const data = await response.json()

  return data.map(transformTodo)
}

export const deleteTodoById = async (id: number, userId: string) => {
  const url = `delete?user_id=${userId}&todo_id=${id}`
  const options = {
    method: 'DELETE',
  }

  return await fetchRequest(url, options)
}

export const postNewTodo = async (data: ITodo, userId: string) => {
  const url = `create_todo?user_id=${userId}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  return await fetchRequest(url, options)
}

export const sendUpdatedTodo = async (updatedData: unknown, userId: string) => {
  const url = `update?user_id=${userId}`
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData, (key, value) => value === undefined ? null : value),
  }
  return await fetchRequest(url, options)
}
