import {ITodo} from '@shared/interfaces';
import {fetchRequest} from '@shared/api/services/constants';

export const getUserTodos = (userId: string) => new Promise((resolve, reject) => {
  fetchRequest(`get_all/${userId}`)
      // @ts-ignore
      .then((result) => result.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error))
})

export const deleteTodoById = (id: number, userId: string) => new Promise(() => {
  const url = `delete?user_id=${userId}&todo_id=${id}`
  const options = {
    method: 'DELETE',
  }

  fetchRequest(url, options)
      .then((result) => console.log(result))
      .catch((error) => console.log(error))
})

export const postNewTodo = (data: ITodo, userId: string) => new Promise((resolve, reject) => {
  const whiteList = ['label', 'id', 'description', 'done', 'priority', 'Label', 'date', 'user_id']
  const url = `create_todo?user_id=${userId}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data, whiteList),
  }
  fetchRequest(url, options)
      .then((result) => resolve(result))
      .catch((error) => reject(error))
})

export const sendUpdatedTodo = (updatedData: any, userId: string) => new Promise((resolve) => {
  const url = `update?user_id=${userId}`
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData, (key, value) => value === undefined ? null : value),
  }
  fetchRequest(url, options)
      .then((response) => resolve(response))
})

export const fetchUserTags = (userId: string) => new Promise((resolve, reject) => {
  const url = `get_tags?user_id=${userId}`;
  fetchRequest(url)
      //@ts-ignore
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error))
})

export const createNewUserTag = async (newTag: string, userId: string) => {
  const options = {
    method: 'POST',
  }
  fetchRequest(`add_tag?user_id=${userId}&tag=${newTag}`, options)
}

