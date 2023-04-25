const BASE_URL = 'http://localhost:4444/api/'

export const fetchRequest = (url: string, options: RequestInit = {}) => new Promise((resolve, reject) => {
  fetch(`${BASE_URL}${url}`, options)
      .then((res) => resolve(res))
      .catch((error) => reject(error))
})
