import {fetchRequest} from '@shared/api/services/constants';


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

export const getVerifiedStatus = async (login: string): Promise<boolean> => {
  const response = await fetchRequest('user/get_verification_status?login=' + login)
  return await response.json()
}
