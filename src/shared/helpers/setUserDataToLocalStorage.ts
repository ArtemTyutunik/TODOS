import {IUser} from '@shared/interfacesAndTypes';

const setUserDataToLocalStorage = (user: IUser) => {
  const {accessToken, login, name, picture = '', user_id: userId} = user

  localStorage.setItem('user', JSON.stringify({accessToken, login, name, user_id: userId, picture}))
}

export default setUserDataToLocalStorage;
