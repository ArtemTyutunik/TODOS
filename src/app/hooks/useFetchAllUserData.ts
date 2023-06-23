import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchTasks} from '@entities/todos/store/todo'
import {fetchUserTags} from '@shared/api/services/tags';
import {ITag, ITodo} from '@shared/interfacesAndTypes';
import {userIdSelector} from '@entities/user/model/store';
import {getUserTags} from '@entities/tag/store/tagStore';
import {getUserTodos} from '@shared/api/services/todos';
import {fetchAllFavoritesThunkCreator} from '@features/addToFavorites/model/thunks';
import {getInboxId, getProjects} from '@shared/api/services/projects';
import {getProjectsAction} from '@entities/projects/model/store';

export const useFetchAllUserData = (): [boolean] => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true)
  const userId = useSelector(userIdSelector)
  const [isMinimumTimeEnd, setIsMinimumTimeEnd] = useState(false)
  const getTodos = async () => {
    const onFulfilledTodosRequest = (result: ITodo[]) => {
      dispatch(fetchTasks(result))
    }

    try {
      const todos = await getUserTodos<ITodo[]>(userId)
      onFulfilledTodosRequest(todos)
    } catch (e) {
      console.log(e)
    }
  }

  const getTags = async () => {
    const onFulfilledTagsRequest = (result: ITag[]) => {
      dispatch(getUserTags(result))
    }

    fetchUserTags(userId)
        //@ts-ignore
        .then(onFulfilledTagsRequest)
  }

  const getFavorites = async () => {
    try {
      //@ts-ignore
      dispatch(fetchAllFavoritesThunkCreator(userId))
    } catch (e) {
      console.log(e)
    }
  }

  const getUserInboxId = async () => {
    try {
      const inboxId = await getInboxId(userId)
      localStorage.setItem('inboxID', inboxId + '')
    } catch (error) {
      console.log(error)
    }
  }

  const getUserProjects = async () => {
    try {
      const projects = await getProjects(userId)
      dispatch(getProjectsAction(projects))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const pageLoader = document.querySelector('.loader-container')
    const userInboxID = localStorage.getItem('inboxID')
    if (!userInboxID) {
      getUserInboxId()
    }

    const timeoutId = setTimeout(() => {
      setIsMinimumTimeEnd(true)
      isFetching && pageLoader?.remove()
    }, 700)


    Promise.all([getTodos(), getTags(), getFavorites(), getUserProjects()])
        .then(() => {
          setIsFetching(false)
          isMinimumTimeEnd && pageLoader?.remove()
        })


    return () => clearTimeout(timeoutId)
  }, [])

  return [isFetching && isMinimumTimeEnd]
}
