import {fetchRequest} from '@shared/api/services/constants';
import getUserId from '@shared/helpers/getUserId';


export const setNewAvatar = async (file: File, email: string) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('nickname', email)

  const options = {
    method: 'POST',
    body: formData,
  }

  const response = await fetchRequest('user/set_avatar', options)

  if (!response.ok) {
    throw new Error('error on server')
  }

  return await response.text()
}

export const confirmEmail = async (emailToken: string) => {
  const body = {
    emailToken: emailToken,
  }
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return await fetchRequest('user/confirm_email', options)
}

export const resendEmail = async (login: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return await fetchRequest(`user/resend_email?login=${login}`, options)
}

export const getVerifiedStatus = async (): Promise<boolean> => {
  const userId = getUserId()
  const response = await fetchRequest('user/get_verification_status?user_id=' + userId)
  return await response.json()
}

export interface SearchedUser {
  name: string
  login: string
  picture: string
  regType: string
}

export const searchUsers = async (query: string, projectId: string) => {
  const response = await fetchRequest(`user/get_users_by_nickname?login=${query}&projectId=${projectId}`)

  return await response.json()
}

export const addToMembers = async (userId: string, projectId: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return await fetchRequest(`project/${projectId}/add_user/${userId}`, options)
}
