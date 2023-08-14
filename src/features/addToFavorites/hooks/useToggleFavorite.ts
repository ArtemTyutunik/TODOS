import {useSelector} from 'react-redux';
import {getAllFavorites} from '@features/addToFavorites';
import {useEffect, useState} from 'react';
import {configureFavoriteItem} from '@shared/helpers';
import {addUserFavoriteThunk, deleteUserFavoriteThunk} from '@features/addToFavorites/model/thunks';
import {useAppDispatch} from '@app/store';


type ReturnInterface = {
    isFavorite: boolean,
    toggleFavorite: () => void,
    deleteFromFavorites: () => void,
    addNewFavorite: () => void,}

const useToggleFavorite = (id: string): ReturnInterface => {
  const allFavorites = useSelector(getAllFavorites)
  const dispatch = useAppDispatch()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    setIsFavorite(!!allFavorites.find((item) => item.itemId === id))
  }, [allFavorites])

  const deleteFromFavorites = () => {
    if (allFavorites.find((item) => item.itemId === id)) {
      dispatch(deleteUserFavoriteThunk(id))
    }
  }

  const addNewFavorite = () => {
    if (!allFavorites.find((item) => item.itemId === id)) {
      const favoriteItem = configureFavoriteItem('tag', id)
      dispatch(addUserFavoriteThunk(favoriteItem))
    }
  }

  const toggleFavorite = () => {
    isFavorite ? deleteFromFavorites() :
        addNewFavorite()
  }

  return {isFavorite, toggleFavorite, deleteFromFavorites, addNewFavorite}
}

export default useToggleFavorite;
