import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import ToggleArrowIcon from '@shared/components/toggleArrowIcon';
import {useSelector} from 'react-redux';
import {getAllFavorites} from '@features/addToFavorites/model/store';
import FavoritesList from '@features/addToFavorites/components/FavotitesList';

const favoritesWrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
  marginTop: '25px',
  marginBottom: '10px',
}

const Favorites = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const favorites = useSelector(getAllFavorites)

  return favorites.length > 0 ? (
    <>
      <Box sx={favoritesWrapper}>
        <Typography sx={(theme) => ({color: theme.text.main, fontSize: '16px'})}>
                Favorites
        </Typography>
        <ToggleArrowIcon isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          sx={{transform: 'rotate(180deg)'}}/>
      </Box>
      {isExpanded && <FavoritesList favorites={favorites}/>}
    </>
  ) : null
};

export default Favorites;
