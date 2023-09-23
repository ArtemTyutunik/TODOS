const BASE_URL = process.env.NODE_ENV === 'production' ?
    'https://todos-backend-nodejs.fly.dev/' :
    'http://localhost:3000/'

export const HOST_URL = process.env.NODE_ENV === 'production' ?
    'https://https://my-todos-three.vercel.app/' :
    'http://localhost:5173/'

const user = JSON.parse(localStorage.getItem('user') || '{}')
export const fetchRequest = async (url: string, defaultOptions: RequestInit = {}) => {
  const options = {
    ...defaultOptions,
    headers: {
      ...defaultOptions.headers,
      Authorization: `Bearer ${user.accessToken}`,
    },
  }

  const response = await fetch(`${BASE_URL}${url}`, options)

  if (response.ok) {
    return response
  }

  if (response.status === 403) {
    const newAccessToken = await response.json()
    localStorage.setItem('user', JSON.stringify({...user, accessToken: newAccessToken}))
    try {
      return await fetch(`${BASE_URL}${url}`, options)
    } catch (e) {
      console.log(e)
    }
  }

  if (response.status === 401) {
    localStorage.removeItem('user')
    window.location.reload()
  }

  return response
}
