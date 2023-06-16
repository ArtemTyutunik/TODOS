const BASE_URL = process.env.NODE_ENV === 'production' ?
    'https://fast-scrubland-15893.herokuapp.com/api/' :
    'http://localhost:4444/api/'

export const fetchRequest = async (url: string, options: RequestInit = {}) => {
  return await fetch(`${BASE_URL}${url}`, options)
}
