import {fetchRequest} from '@shared/api/services/constants';


export const setNewAvatar = async (file: File, email: string) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('nickname', email)

  const options = {
    method: 'POST',
    body: formData,
  }

  const response = await fetchRequest('set_avatar', options)

  if (!response.ok) {
    throw new Error('error on server')
  }

  return await response.text()
}
