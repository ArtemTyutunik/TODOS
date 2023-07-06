import {fetchRequest} from '@shared/api/services/constants';


const processRequest = async (response: Response) => {
  if (!response.ok) {
    const data = await response.text()
    if (response.status == 500) {
      throw new Error('Sorry unexpected error. Try later.')
    }
    throw data
  } else {
    return await response.json()
  }
}

export const loginWithLoginAndPassword = async (login: string, password: string ) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({login, password}),
  }

  const response = await fetchRequest('auth', options)

  return await processRequest(response)
}

export const signUpWithLoginAndPassword = async (login: string, password: string ) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({login, password}),
  }

  const response = await fetchRequest('sign_up', options)

  return await processRequest(response)
}
type userAccount = {
  name: string,
  picture: string
}
export const signUpWithGoogleService = async (login: string, data: userAccount) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({login, ...data}),
  }

  console.log(data)

  const response = await fetchRequest('sign_up', options)

  return await processRequest(response)
}
