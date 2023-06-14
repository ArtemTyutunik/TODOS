import {fetchRequest} from '@shared/api/services/constants';

//@ts-ignore
const processRequest = async (response) => {
  if (!response.ok) {
    const data = await response.text()
    if (response.status == 500) {
      throw new Error('Sorry unexpected error. Try later.')
    }
    throw new Error(data)
  } else {
    return response.json()
  }
}

export const loginWithLoginAndPassword = (login: string, password: string ) => new Promise((resolve, reject) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({login, password}),
  }

  fetchRequest('auth', options)
      // @ts-ignore
      .then(processRequest)
      .then((refactor) => {
        resolve(refactor)
      })
      .catch((error) => reject(error.message))
})

export const signUpWithLoginAndPassword = (login: string, password: string ) => new Promise( (resolve, reject) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({login, password}),
  }

  fetchRequest('sign_up', options)
      .then(processRequest)
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error.message)
      })
})
