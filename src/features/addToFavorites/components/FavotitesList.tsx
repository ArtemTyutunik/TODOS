import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, ListItemButton, Typography} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {IFavorite} from '@shared/interfacesAndTypes';
import {useTagById} from '@entities/tag';
import TagIcon from '@shared/tagIcon';
import CustomIconButton from '@shared/components/CustomIconButton';
import {useToggleFavorite} from '@features/addToFavorites';

const FavoritesList = ({favorites}: {favorites: IFavorite[]}) => {
  return (
    <div>
      {
        favorites.map((favorite) => <FavoriteItem favorite={favorite}
          key={favorite.itemId}/>)
      }
    </div>
  );
};

const FavoriteItemStyles = {
  'margin': '0 10px',
  'padding': '6px 8px',
  'borderRadius': '4px',
  'display': 'flex',
  'justifyContent': 'space-between',
  '& .delete_favorite-icon': {
    opacity: 0,
  },
  '&:hover': {
    '& .delete_favorite-icon': {
      opacity: 1,
    },
  },
}

const FavoriteItem = ({favorite}: {favorite: IFavorite}) => {
  const item = useTagById(favorite.itemId)
  const navigate = useNavigate()
  const {deleteFromFavorites} = useToggleFavorite(item?.id)

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteFromFavorites()
  }

  return item ? (<ListItemButton sx={FavoriteItemStyles}
    onClick={() => navigate('/tags/' + item?.id)}>
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <TagIcon background={item?.settings.background}/>
      <Typography marginLeft={'10px'}>
        {item?.name}
      </Typography>
    </Box>
    <CustomIconButton className={'delete_favorite-icon'}
      onClick={onDelete}>
      <DeleteOutlineIcon sx={{color: '#808080', fontSize: '18px'}}/>
    </CustomIconButton>
  </ListItemButton> ) : null
}

export default FavoritesList;
