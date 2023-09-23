import {useState} from 'react';
import {SearchedUser, searchUsers} from '@shared/api/services/user';


const useSearchUsers = (): [SearchedUser[], boolean, (query: string, projectId: string) => Promise<void>] => {
  const [users, setUsers] = useState<SearchedUser[]>([])
  const [loading, setLoading] = useState(false)

  const getUsers = async (query: string, projectId: string) => {
    setLoading(true)
    console.log(query, projectId)
    const users = await searchUsers(query, projectId)

    setTimeout(() => {
      setLoading(false)
      setUsers(users)
    }, 300)
  }

  return [users, loading, getUsers]
}

export default useSearchUsers
