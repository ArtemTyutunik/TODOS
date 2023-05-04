import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchTasks} from '@entities/todos/store/todo';
import {getUserTodos} from '@shared/api/services/todosService/fetchTodos';
import {ITodo} from '@shared/interfaces';
import {userIdSelector} from '@pages/authorization/store';

export const useFetchAllTodos = (): [boolean] => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false)
  const userId = useSelector(userIdSelector)

  const onFulfilled = (result: ITodo[]) => {
    dispatch(fetchTasks(result))
    setIsFetching(false)
  }

  useEffect(() => {
    setIsFetching(true)
    getUserTodos(userId)
        //@ts-ignore
        .then(onFulfilled)
        .catch((error) => console.log(error))
  }, [])

  return [isFetching]
}
