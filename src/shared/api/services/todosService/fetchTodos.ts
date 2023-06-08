import {ITag, ITodo} from '@shared/interfacesAndTypes';
import {fetchRequest} from '@shared/api/services/constants';

export const getUserTodos = (userId: string) => new Promise((resolve, reject) => {
  const transformTodo = (todo: ITodo) => {
    const {tags} = todo
    const transformedTags = tags?.map((tag: string | ITag) => {
      return typeof tag !== 'string' ? tag?.id : tag
    })

    return {...todo, tags: transformedTags}
  }

  fetchRequest(`get_all/${userId}`)
      // @ts-ignore
      .then((result) => result.json())
      .then((result) => resolve(result.map(transformTodo)))
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
  const url = `create_todo?user_id=${userId}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
  const url = `/get_tags?user_id=${userId}`;

  fetchRequest(url)
      .then((response) => {
        //@ts-ignore
        return response.json()
      })
      .then( (result) => resolve(result.map((tag: ITag) => {
        const id = tag?.id || Date.now() + ''
        return {...tag, id}
      })))
      .catch((error) => reject(error))
})

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

export const deleteUserTag = async (tagMame: string, userId: string) => {
  const options = {
    method: 'DELETE',
  }
  fetchRequest(`/delete_tag?user_id=${userId}&tag=${tagMame}`, options)
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

