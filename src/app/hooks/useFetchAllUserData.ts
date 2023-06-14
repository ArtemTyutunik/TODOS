import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchTasks} from '@entities/todos/store/todo'
import {fetchUserTags} from '@shared/api/services/tags';
import {ITag, ITodo} from '@shared/interfacesAndTypes';
import {userIdSelector} from '@entities/user/model/store';
import {getUserTags} from '@entities/tag/store/tagStore';
import {getUserTodos} from '@shared/api/services/todos';
import {fetchUserFavorites} from '@shared/api/services/favorites';
import {getAllFavoritesAction} from '@features/addToFavorites/model/store';

export const useFetchAllUserData = (): [boolean] => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true)
  const userId = useSelector(userIdSelector)

  const getTodos = () => {
    const onFulfilledTodosRequest = (result: ITodo[]) => {
      dispatch(fetchTasks(result))
    }

    getUserTodos(userId)
        //@ts-ignore
        .then(onFulfilledTodosRequest)
        .catch((error) => console.log(error))
  }

  const getTags = () => {
    const onFulfilledTagsRequest = (result: ITag[]) => {
      dispatch(getUserTags(result))
    }

    fetchUserTags(userId)
        //@ts-ignore
        .then(onFulfilledTagsRequest)
  }

  const getFavorites = () => {
    fetchUserFavorites(userId)
        .then((result) => dispatch(getAllFavoritesAction(result)))
  }


  useEffect(() => {
    const pageLoader = document.querySelector('.loader-container')
    Promise.all([getTodos(), getTags(), getFavorites()])
        .then(() => {
          setIsFetching(false)
          pageLoader?.remove()
        })
  }, [])

  return [isFetching]
}
