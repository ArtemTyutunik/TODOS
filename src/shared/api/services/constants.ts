const BASE_URL = process.env.NODE_ENV === 'production' ?
    'https://fast-scrubland-15893.herokuapp.com/api/' :
    'http://localhost:4444/api/'

console.log(BASE_URL)
export const fetchRequest = (url: string, options: RequestInit = {}) => new Promise((resolve, reject) => {
  fetch(`${BASE_URL}${url}`, options)
      .then((res) => resolve(res))
      .catch((error) => reject(error))
})
