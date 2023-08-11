import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites, getAllFavorites} from '@features/addToFavorites';
import {useEffect, useState} from 'react';
import {deleteFromFavoritesAction} from '@features/addToFavorites/model/store';
import {configureFavoriteItem} from '@shared/helpers';
import {addUserFavorite, deleteUserFavorite} from '@shared/api/services/favorites';
import {userIdSelector} from '@entities/user/model/store';


type ReturnInterface = {
    isFavorite: boolean,
    toggleFavorite: () => void,
    deleteFromFavorites: () => void,
    addNewFavorite: () => void,}

const useToggleFavorite = (id: string): ReturnInterface => {
  const allFavorites = useSelector(getAllFavorites)
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    setIsFavorite(!!allFavorites.find((item) => item.itemId === id))
  }, [allFavorites])

  const deleteFromFavorites = () => {
    if (allFavorites.find((item) => item.itemId === id)) {
      try {
        deleteUserFavorite(userId, id)
        dispatch(deleteFromFavoritesAction(id))
      } catch (e) {
        console.log(e)
      }
    }
  }

  const addNewFavorite = () => {
    if (!allFavorites.find((item) => item.itemId === id)) {
      const favoriteItem = configureFavoriteItem('tag', id)
      try {
        addUserFavorite(userId, favoriteItem)
        dispatch(addToFavorites(favoriteItem))
      } catch (e) {
        console.log(e)
      }
    }
  }

  const toggleFavorite = () => {
    isFavorite ? deleteFromFavorites() :
        addNewFavorite()
  }

  return {isFavorite, toggleFavorite, deleteFromFavorites, addNewFavorite}
}

export default useToggleFavorite;
