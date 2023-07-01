import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {getAllFavorites} from '@features/addToFavorites/model/store';
import FavoritesList from '@features/addToFavorites/components/FavotitesList';
import DrawerToggleList from '@shared/components/DrawerToggleList';


const Favorites = () => {
  const favorites = useSelector(getAllFavorites)
  const [isExpanded, setIsExpanded] = useState(false)

  const onClickHandler = () => setIsExpanded((prevState) => !prevState)
  return favorites.length ? (
      <>
        <DrawerToggleList title={'Favorites'}
          isExpanded={isExpanded}
          onArrowClick={onClickHandler}/>
        {
          isExpanded && <FavoritesList favorites={favorites}/>
        }
      </>
  ) : null
}

export default Favorites;
