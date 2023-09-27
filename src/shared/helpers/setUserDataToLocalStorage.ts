import {IUser} from '@shared/interfacesAndTypes';

const setUserDataToLocalStorage = (user: IUser) => {
  const {accessToken, login, name, picture = '', user_id: userId, emailIsVerified = false} = user

  localStorage.setItem('user', JSON.stringify({accessToken, login, name, user_id: userId, picture}))
  localStorage.setItem('verified', emailIsVerified + '')
}

export default setUserDataToLocalStorage;
