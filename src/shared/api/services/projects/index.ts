import {fetchRequest} from '@shared/api/services/constants';
import {IProject} from '@shared/interfacesAndTypes';

export const getInboxId = async (userId: string): Promise<Response> => {
  const response = await fetchRequest(`get_inboxID?user_id=${userId}`)

  return await response.json()
}

export const getProjects = async (userId: string) => {
  const response = await fetchRequest(`get_projects?user_id=${userId}`)

  return await response.json()
}

export const addProjectToUserData = async (project: IProject, userId: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  }

  return await fetchRequest(`add_project?user_id=${userId}`, options)
}

export const deleteProjectRequest = async (userId: string, id: string) => {
  const options = {
    method: 'DELETE',
  }

  return await fetchRequest(`delete_project?user_id=${userId}&id=${id}`, options)
}


export const getProjectTodosRequest = async (userId: string, projectId: string) => {
  const response = await fetchRequest(`get_project?user_id=${userId}&id=${projectId}`)

  return await response.json()
}
