import {IProject, ITodo} from '@shared/interfacesAndTypes';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {userIdSelector} from '@entities/user/model/store';
import {getProjectTodosRequest} from '@shared/api/services/projects';


const useProjectTodos = (id: IProject['id'])
    : [data: ITodo[], loading: boolean, error: boolean] => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const userId = useSelector(userIdSelector)

  useEffect(() => {
    const fetchRequest = async () => {
      const result = await getProjectTodosRequest(userId, id)
      setData(result)
      setLoading(false)
    }

    fetchRequest()
        .catch(() => setError(true))
  }, [])

  return [data, loading, error]
}

export default useProjectTodos;
