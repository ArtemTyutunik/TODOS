
const configureAvatarSymbols = (userName: string | undefined, login: string | undefined) => {
  if (!login) return null

  if (userName) {
    const userDataList = userName.split(' ')

    if (userDataList.length === 1) {
      return `${userDataList[0][0]}`.toUpperCase()
    } else {
      const [firstName, lastName] = userDataList
      return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }
  } else {
    return login[0].toUpperCase()
  }
}

export default configureAvatarSymbols;
