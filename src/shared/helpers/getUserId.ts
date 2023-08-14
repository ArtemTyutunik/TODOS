

const getUserId = (): string => {
  const {user_id: userId} = JSON.parse(localStorage.getItem('user') || '{}')

  return userId
}

export default getUserId;
