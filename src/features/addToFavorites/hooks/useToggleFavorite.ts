import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites, getAllFavorites} from '@features/addToFavorites';
import {useEffect, useState} from 'react';
import {deleteFromFavorites} from '@features/addToFavorites/model/store';
import {configureFavoriteItem} from '@shared/helpers';


const useToggleFavorite = (id: string): [boolean, () => void] => {
  const allFavorites = useSelector(getAllFavorites)
  const dispatch = useDispatch()

  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    setIsFavorite(!!allFavorites.find((item) => item.itemId === id))
  }, [allFavorites])

  const addNewFavorite = () => {
    const favoriteItem = configureFavoriteItem('tag', id)
    dispatch(addToFavorites(favoriteItem))
  }

  const toggleFavorite = () => {
    isFavorite ? dispatch(deleteFromFavorites(id)) :
        addNewFavorite()
  }

  return [isFavorite, toggleFavorite]
}

export default useToggleFavorite;
