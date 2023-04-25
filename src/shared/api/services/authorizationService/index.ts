import {fetchRequest} from '@shared/api/services/constants';


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
      .then((response) => response.json())
      .then((response) => {
        resolve(response)
      })
      .catch((error) => reject(error))
})

export const signUpWithLoginAndPassword = (login: string, password: string ) => new Promise((resolve, reject) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({login, password}),
  }

  fetchRequest('sign_in', options)
      // @ts-ignore
      .then((result) => result.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error))
})
