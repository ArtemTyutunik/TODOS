const BASE_URL = 'https://fast-scrubland-15893.herokuapp.com/api/'

export const fetchRequest = (url: string, options: RequestInit = {}) => new Promise((resolve, reject) => {
  fetch(`${BASE_URL}${url}`, options)
      .then((res) => resolve(res))
      .catch((error) => reject(error))
})
