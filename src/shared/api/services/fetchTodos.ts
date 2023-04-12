import {ITodo} from '@shared/interfaces';

const BASE_URL = 'http://localhost:4444/api/'

export const fetchRequest = <T>(url: string, options: RequestInit = {}): Promise<T> => new Promise((resolve, reject) => {
  fetch(`${BASE_URL}${url}`, options)
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((error) => reject(error))
})

export const getUserTodos = (userId: string) => new Promise((resolve, reject) => {
  fetchRequest<ITodo[]>(`get_all/${userId}`)
      .then((result) => resolve(result))
      .catch((error) => reject(error))
})

export const deleteTodoById = (id: number) => new Promise(() => {
  const options = {
    method: 'DELETE',
  }

  fetchRequest(`/delete/${id}`, options)
      .then((result) => console.log(result))
      .catch((error) => console.log(error))
})

export const postNewTodo = (userId: string, data: ITodo) => new Promise((resolve, reject) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...data, user_id: userId}),
  }
  fetchRequest('create_todo', options)
      .then((result) => resolve(result))
      .catch((error) => reject(error))
})


