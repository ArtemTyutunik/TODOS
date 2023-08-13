const BASE_URL = process.env.NODE_ENV === 'production' ?
    'https://todos-backend-nodejs.fly.dev/' :
    'http://localhost:3000/'

export const fetchRequest = async (url: string, options: RequestInit = {}) => {
  return await fetch(`${BASE_URL}${url}`, options)
}
