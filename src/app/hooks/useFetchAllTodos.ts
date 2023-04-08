import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchTasks} from '@entities/todos/store/todo';

export const useFetchAllTodos = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchingData = () => new Promise((resolve) => {
      setIsFetching(true)
      fetch('http://localhost:4444/api/get_all/1234')
          .then((res) => res.json())
          .then((res) => resolve(res))
    })

    fetchingData().then((res) => {
      setIsFetching(false)
      dispatch(fetchTasks(res))
    })
  }, [])

  return [isFetching]
}
