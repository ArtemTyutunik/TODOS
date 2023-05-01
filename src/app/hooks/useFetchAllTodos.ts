import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchTasks} from '@entities/todos/store/todo';
import {getUserTodos} from '@shared/api/services/todosService/fetchTodos';
import {ITodo} from '@shared/interfaces';

export const useFetchAllTodos = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false)

  const onFulfilled = (result: ITodo[]) => {
    setIsFetching(false)
    dispatch(fetchTasks(result))
  }

  useEffect(() => {
    setIsFetching(true)
    getUserTodos()
        //@ts-ignore
        .then(onFulfilled)
        .catch((error) => console.log(error))
  }, [])

  return [isFetching]
}
