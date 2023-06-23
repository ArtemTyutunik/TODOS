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

const FavoriteItem = ({favorite}: {favorite: IFavorite}) => {
  const item = useTagById(favorite.itemId)
  const navigate = useNavigate()
  const {deleteFromFavorites} = useToggleFavorite(item?.id)

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteFromFavorites()
  }

  return item ? (<DrawerListItem onClick={() => navigate('/tags/' + item?.id)}>
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <TagIcon background={item?.settings.background}/>
      <Typography marginLeft={'10px'}>
        {item?.name}
      </Typography>
    </Box>
    <CustomIconButton className={'hover_content'}
      onClick={onDelete}>
      <DeleteOutlineIcon sx={{color: '#808080', fontSize: '18px'}}/>
    </CustomIconButton>
  </DrawerListItem> ) : null
}

export default FavoritesList;
