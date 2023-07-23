
const configureAvatarSymbols = (userName: string | undefined, login: string | undefined) => {
  if (!login) return null

  if (userName) {
    const [firstName = '', lastName = ''] = userName.split(' ')
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  } else {
    return login[0].toUpperCase()
  }
}

export default configureAvatarSymbols;
