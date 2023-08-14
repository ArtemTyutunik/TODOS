import {ITag, ITodo} from '@shared/interfacesAndTypes';
import {fetchRequest} from '@shared/api/services/constants';
import getUserId from '@shared/helpers/getUserId';

const userId = getUserId()

export const getUserTodos = async <T>(userId: string): Promise<T> => {
  const transformTodo = (todo: ITodo) => {
    const {tags} = todo
    const projectId = todo.projectId !== null ? todo.projectId : localStorage.getItem('inboxID')
    const transformedTags = tags?.map((tag: string | ITag) => {
      return typeof tag !== 'string' ? tag?.id : tag
    })

    return {...todo, tags: transformedTags, projectId: projectId}
  }

  const response = await fetchRequest(`todo/get_all?user_id=${userId}`)
  console.log(response)
  const data = await response.json()

  return data.map(transformTodo)
}

export const deleteTodoById = async (id: number) => {
  const url = `todo/delete?user_id=${userId}&todo_id=${id}`
  const options = {
    method: 'DELETE',
  }

  return await fetchRequest(url, options)
}

export const postNewTodo = async (data: ITodo) => {
  const url = `todo/create?user_id=${userId}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  return await fetchRequest(url, options)
}

export const sendUpdatedTodo = async (updatedData: Partial<ITodo>) => {
  const url = `todo/update?user_id=${userId}`
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData, (key, value) => value === undefined ? null : value),
  }
  return await fetchRequest(url, options)
}


export const deleteSelectedTodo = async (userId: string, todosId: ITodo['id'][]) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todosId),
  }

  const METHOD = 'delete'

  const response = await fetchRequest(`todo/mapping?user_id=${userId}&method=${METHOD}`, options)

  return await response.json()
}


export const completeSelectedTodo = async (userId: string, todosId: ITodo['id'][]) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todosId),
  }

  const METHOD = 'complete'

  const response = await fetchRequest(`todo/mapping?user_id=${userId}&method=${METHOD}`, options)

  return await response.json()
}
