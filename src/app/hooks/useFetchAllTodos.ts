import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchTasks} from '@entities/todos/store/todo';
import {fetchUserTags, getUserTodos} from '@shared/api/services/todosService/fetchTodos';
import {ITodo} from '@shared/interfaces';
import {getUserTags, userIdSelector} from '@pages/authorization/store';

export const useFetchAllTodos = (): [boolean] => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true)
  const userId = useSelector(userIdSelector)

  const onFulfilledTodosRequest = (result: ITodo[]) => {
    dispatch(fetchTasks(result))
  }

  const getTodos = () => {
    getUserTodos(userId)
        //@ts-ignore
        .then(onFulfilledTodosRequest)
        .catch((error) => console.log(error))
  }

  const onFulfilledTagsRequest = (result: string[]) => {
    dispatch(getUserTags(result))
  }

  const getTags = () => {
    fetchUserTags(userId)
        //@ts-ignore
        .then(onFulfilledTagsRequest)
  }

  useEffect(() => {
    Promise.all([getTodos(), getTags()])
        .then(() => {
          setIsFetching(false)
        })
  }, [])

  return [isFetching]
}
