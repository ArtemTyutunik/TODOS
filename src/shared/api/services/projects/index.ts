import {fetchRequest} from '@shared/api/services/constants';
import {IProject} from '@shared/interfacesAndTypes';
import getUserId from '@shared/helpers/getUserId';


export const getInboxId = async (): Promise<Response> => {
  const userId = getUserId()
  const response = await fetchRequest(`project/get_inboxID?user_id=${userId}`)

  return await response.json()
}

export const getProjects = async () => {
  const userId = getUserId()
  const response = await fetchRequest(`project/get_all?user_id=${userId}`)

  return await response.json()
}

export const addProjectToUserData = async (project: IProject) => {
  const userId = getUserId()
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  }

  return await fetchRequest(`project/create?user_id=${userId}`, options)
}

export const deleteProjectRequest = async (id: string) => {
  const userId = getUserId()
  const options = {
    method: 'DELETE',
  }

  const response = await fetchRequest(`project/delete?user_id=${userId}&id=${id}`, options)

  return await response.json()
}


export const editProjectRequest = async (project: IProject) => {
  const userId = getUserId()
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  }

  return await fetchRequest(`project/update?user_id=${userId}`, options)
}
